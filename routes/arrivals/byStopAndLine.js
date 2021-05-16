const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// /arrivals/agency_id/stop_id/route_id
module.exports = async (req, res) => {
  const stopId = req.params.stopId;
  const routeId = req.params.routeId;
  const agencyId = req.params.agencyId.toLowerCase();
  let url;
  switch (agencyId) {
    case "hsr":
      url = "https://opendata.hamilton.ca/GTFS-RT/GTFS_TripUpdates.pb";
      break;
    case "burlington":
      url = "http://opendata.burlington.ca/gtfs-rt/GTFS_TripUpdates.pb";
      break;
    case "go":
      break;
    default:
      res.status(400).json({ error: "Invalid agency ID"});
  }
  const requestSettings = {
    method: 'GET',
    url,
    encoding: null
  };
  if (agencyId !== "go") {
    try {
      request(requestSettings, function (error, response, body) {
        const updates = [];
        if (!error && response.statusCode == 200) {
          var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
          // console.log(feed.entity[0].tripUpdate.stopTimeUpdate[0])
          feed.entity.forEach(function(entity) {
            if (entity.tripUpdate && entity.tripUpdate.trip.routeId === routeId) {
              entity.tripUpdate.stopTimeUpdate.some(u => {
                if (u.stopId === stopId) 
                  updates.push(u);
                  // There are only one update for that stop on one trip
                  return true;
              });
            }
          });
        }
        res.status(200).json( updates );
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({error: err});
    }
  } else { // go does not provide realtime data. service scheduled data instead
    const command = 
    "SELECT DISTINCT st.arrival_time, st.departure_time " +
        "FROM stop_time AS st " +
        "INNER JOIN stop AS s ON (st.stop_id = s.stop_id) " +
        "INNER JOIN trip AS t ON (st.trip_id = t.trip_id) " +
        "INNER JOIN route AS r ON (t.route_id = r.route_id)" +
        `WHERE r.route_id = '${routeId}' AND ` +
          `s.stop_id = '${stopId}' AND ` +
          `LOWER(s.agency_id) LIKE LOWER('${agencyId}')`
    try {
      const client = await pool.connect();
      const result = await client.query(command);
      let results = [];
      if (result && result.rows) {
        result.rows.forEach(update => {
          let d = new Date();
          let [hours, minutes, seconds] = update.arrival_time.split(':');
          d.setHours(hours);
          d.setMinutes(minutes);
          d.setSeconds(seconds);
          // if the bus is already gone, change it as tomorrow's one
          if (d < Date.now())
            d.setDate(d.getDate() + 1);
          // stores only time first, for sorting
          results.push(d);
        });
        results.sort((a, b) => a.valueOf() - b.valueOf());
        results = results.map(d => ({
          arrival: {
            delay: 0,
            time: d.valueOf() // for json delivery
          },
          departure: {
            delay: 0,
            time: d.valueOf()
          },
          stopId,
          scheduleRelationship: "SCHEDULED"
        }))
      }
      res.status(200).json( results );
    } catch (err) {
      console.error(err);
      res.status(500).json({error: err});
    }
  }
};