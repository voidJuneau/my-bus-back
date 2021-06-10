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

// /stops/agency_id/route/route_id
// ?query=q&limit=5&page=1
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

  let command = 
  `SELECT DISTINCT s.stop_id, s.stop_code, s.stop_name, s.stop_desc, s.stop_lat, s.stop_lon, s.agency_id 
      FROM stop AS s 
      JOIN stop_time AS st ON (s.stop_id = st.stop_id) 
      JOIN trip AS t ON (st.trip_id = t.trip_id) 
      JOIN route AS r ON (t.route_id = r.route_id) 
      WHERE r.route_id = '${req.params.routeId}' AND 
        LOWER(s.agency_id) LIKE LOWER('${req.params.agencyId}') AND 
        stop_code IS NOT NULL `
  if (query) { 
    command += `LOWER(stop_name) LIKE LOWER('%${query}%') OR ` +
               `LOWER(stop_desc) LIKE LOWER('%${query}%') `;
    if (parseInt(query)) {
      command += `OR stop_id = '${query}' OR ` +
                  `stop_code = '${query}'`;
    }
  }
  if (limit)
    command += `LIMIT ${limit} OFFSET ${offset}`;

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