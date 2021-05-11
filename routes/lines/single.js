const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// /lines/agency_id/route_short_name
module.exports = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM route \
        WHERE LOWER(agency_id) = LOWER('${req.params.agencyId}') AND \
          route_short_name = '${req.params.lineId}'`);
    const results = { 'results': (result) ? result.rows : null};
    res.status(200).json( results.results[0] );
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
};