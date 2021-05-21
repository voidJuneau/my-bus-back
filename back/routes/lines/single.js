const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://cabvlkfxydjwhn:c73832f43ee0d5ee23f9b68988e4c7babf241b364ceede7087279162254a12e5@ec2-54-224-120-186.compute-1.amazonaws.com:5432/daohhucgl2gdqd",
  ssl: {
    rejectUnauthorized: false
  }
});

// /lines/agency_id/route_id
module.exports = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM route \
        WHERE LOWER(agency_id) = LOWER('${req.params.agencyId}') AND \
          route_id = '${req.params.routeId}'`);
    const results = { 'results': (result) ? result.rows : null};
    res.status(200).json( results.results[0] );
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
};