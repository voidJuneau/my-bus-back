const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://cabvlkfxydjwhn:c73832f43ee0d5ee23f9b68988e4c7babf241b364ceede7087279162254a12e5@ec2-54-224-120-186.compute-1.amazonaws.com:5432/daohhucgl2gdqd",
  ssl: {
    rejectUnauthorized: false
  }
});

// /lines/agency_id/stop/stop_id
module.exports = async (req, res) => {
    const command = 
    "SELECT DISTINCT r.route_id, r.agency_id, r.route_short_name, r.route_long_name " +
        "FROM stop AS s " +
        "JOIN stop_time AS st ON (s.stop_id = st.stop_id) " +
        "JOIN trip AS t ON (st.trip_id = t.trip_id) " +
        "JOIN route AS r ON (t.route_id = r.route_id)" +
        `WHERE s.stop_id = '${req.params.stopId}' AND ` +
          `LOWER(s.agency_id) LIKE LOWER('${req.params.agencyId}')`
  try {
    const client = await pool.connect();
    const result = await client.query(command);
    client.release();
    const results = { 'results': (result) ? result.rows : null};
    res.status(200).json( results.results );
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
};