const { Pool } = require('pg');
const dotenv = require('dotenv');
const querystring = require('querystring');

DEFAULT_LMIT = 5;

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// /lines
module.exports = async (req, res) => {
  const query = req.query.query;
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  // When only page # set, no limit size - use default one
  if (page && !limit)
    limit = DEFAULT_LMIT;
  // When only limit size it set, set the page as the first page
  if (!page && limit)
    page = 1;
  // page is 1 indexed, calculate 0 indexed offset as the total previous items
  const offset = (page - 1) * limit;

  let command = "SELECT * FROM route ";
  if (query) { 
    command += `WHERE LOWER(route_id) LIKE LOWER('%${query}%') OR ` +
                `LOWER(agency_id) LIKE LOWER('%${query}%') OR ` +
                `LOWER(route_short_name) LIKE LOWER('%${query}%') OR ` +
                `LOWER(route_long_name) LIKE LOWER('%${query}%') `
  }
  command += "ORDER BY agency_id DESC, route_short_name ";
  if (limit)
    command += `LIMIT ${limit} OFFSET ${offset}`;
  
  try {
    const client = await pool.connect();
    const result = await client.query(command);
    const results = { 'results': (result) ? result.rows : null};
    res.status(200).json( results.results );
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
};