const { Pool } = require('pg');
const dotenv = require('dotenv');

const hhmmssToDate = require("../../utils/hhmmssToDate");

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://cabvlkfxydjwhn:c73832f43ee0d5ee23f9b68988e4c7babf241b364ceede7087279162254a12e5@ec2-54-224-120-186.compute-1.amazonaws.com:5432/daohhucgl2gdqd",
  ssl: {
    rejectUnauthorized: false
  }
});

// /lines/agency_id/route_id
module.exports = async (req, res) => {
  const { agencyId, routeId } = req.params
  try {
    const client = await pool.connect();
    let command = 
      `SELECT * FROM route \
      WHERE LOWER(agency_id) = LOWER('${agencyId}') AND \
      route_id = '${routeId}'`
    let result = await client.query(command);

    if (!result) {
      res.status(200).json( null );
    } else {
      let line = {...result.rows[0]}

      // Aditional data for a line
      // Get first stop
      let stopId = "141" // if it's Go transit, set the first stop as Hamilton go GO always
      if (agencyId.toLowerCase() !== "go") {
        command = 
          `SELECT DISTINCT s.stop_id
            FROM stop_time AS st
            INNER JOIN stop AS s ON (st.stop_id = s.stop_id) 
            INNER JOIN trip AS t ON (st.trip_id = t.trip_id) 
            INNER JOIN route AS r ON (t.route_id = r.route_id)
            WHERE r.route_id = '${routeId}' AND 
              LOWER(s.agency_id) LIKE LOWER('${agencyId}')
              LIMIT 1`
        result = await client.query(command);
        stopId = result.rows[0].stop_id
      }

      // get stop_times on one stop
      command = 
        `SELECT DISTINCT st.departure_time
          FROM stop_time AS st
            INNER JOIN stop AS s ON (st.stop_id = s.stop_id) 
            INNER JOIN trip AS t ON (st.trip_id = t.trip_id) 
            INNER JOIN route AS r ON (t.route_id = r.route_id)
          WHERE r.route_id = '${routeId}' AND 
            s.stop_id = '${stopId}' AND 
            LOWER(s.agency_id) LIKE LOWER('${agencyId}')
            ORDER BY departure_time`

      // all buses
      result = await client.query(command);
      console.log(result.rows)
      const times = result.rows.map(t => hhmmssToDate(t.departure_time))
      // Assume the first and last bus of the day is as the schedule
      let first = times[0];
      let last = times[times.length-1];
      // Calculate the gap on the last bus, until the next days' first bus
      const nextFirst = new Date(first);
      nextFirst.setDate(first.getDate()+1)
      let dayGap = nextFirst - last;
      // Check all the gaps on the timetable,
      // find the buses rest time, also the min/max gap
      let minGap = dayGap;
      let maxGap = 0;
      for (let i=1; i<times.length; i++) {
        const gap = times[i] - times[i-1];
        if (gap > dayGap) { // this two buses are last/first of two days
          maxGap = dayGap
          dayGap = gap
          first = times[i]
          last = times[i-1]
        } else if (gap > maxGap) { // smaller then day gap, but larger then max gap
          maxGap = gap
        } else if (gap < minGap && gap > 1000 * 60 * 4) { // new min gap, ignoring pratical duplates
          minGap = gap
        }
      };
      const firstHour = first.getHours()
      const lastHour = last.getHours()
      line = { ...line, 
        first: `${firstHour}:${first.getMinutes()}`, 
        // If the last hour is after midnight, add 24 for better understanding
        last: `${lastHour > firstHour ? lastHour : lastHour+24}:${("0" + last.getMinutes()).slice(-2)}`, 
        min_gap: Math.round(minGap / 1000 / 60), 
        max_gap: Math.round(maxGap / 1000 / 60),
        day_gap: Math.round(dayGap / 1000 / 60) };
        line.times = times
      res.status(200).json( line );
    }

    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
};