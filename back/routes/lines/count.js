var request = require('request');
const { Pool } = require('pg');
const dotenv = require('dotenv');

const DEFAULT_LIMIT = require("../common").DEFAULT_LIMIT;

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://cabvlkfxydjwhn:c73832f43ee0d5ee23f9b68988e4c7babf241b364ceede7087279162254a12e5@ec2-54-224-120-186.compute-1.amazonaws.com:5432/daohhucgl2gdqd",
  ssl: {
    rejectUnauthorized: false
  }
});

// /lines/count
// /lines/count?query=q
module.exports = async (req, res) => {
  const query = req.query.query;
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  // When only page # set, no limit size - use default one
  if (page && !limit)
    limit = DEFAULT_LIMIT;
  // When only limit size it set, set the page as the first page
  if (!page && limit)
    page = 1;
  // page is 1 indexed, calculate 0 indexed offset as the total previous items
  const offset = (page - 1) * limit;

  let command = "SELECT count(*) FROM route ";
  if (query) { 
    command += `WHERE LOWER(route_id) LIKE LOWER('%${query}%') OR ` +
                `LOWER(agency_id) LIKE LOWER('%${query}%') OR ` +
                `LOWER(route_short_name) LIKE LOWER('%${query}%') OR ` +
                `LOWER(route_long_name) LIKE LOWER('%${query}%') `
  }
  
  try {
    const client = await pool.connect();
    const result = await client.query(command);
    client.release();
    const results = { 'results': (result) ? result.rows[0].count : null};
    res.status(200).json( results.results );
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
};