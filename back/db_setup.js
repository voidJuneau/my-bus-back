const { Pool } = require('pg');
const fs = require('fs');
const readline = require('readline');
const express = require('express')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {

  console.log("process.env.DATABASE_URL: " + process.env.DATABASE_URL)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://cabvlkfxydjwhn:c73832f43ee0d5ee23f9b68988e4c7babf241b364ceede7087279162254a12e5@ec2-54-224-120-186.compute-1.amazonaws.com:5432/daohhucgl2gdqd",
    ssl: {
      rejectUnauthorized: false
    }
});

schema = {
  // agency: "agency_id text,agency_name text,agency_url text,agency_timezone text,agency_lang float,agency_phone text,agency_fare_url text",
  // route: "route_id text,agency_id text,route_short_name integer,route_long_name text,route_desc text,route_type integer,route_url text,route_color text,route_text_color text",
  // stop_time: "trip_id integer,arrival_time text,departure_time text,stop_id integer,stop_sequence integer,stop_headsign interger,pickup_type interger,drop_off_type integer,shape_dist_traveled float,agency_id text",
  stop: "stop_id integer,stop_code interger,stop_name text,stop_desc text,stop_lat float,stop_lon float ,zone_id integer,stop_url text,location_type integer,parent_station interger,stop_timezone text,wheelchair_boarding integer,agency_id text",
  trip: "route_id text,service_id integer,trip_id integer,trip_headsign text,trip_short_name text,direction_id integer,block_id integer,shape_id integer,wheelchair_accessible integer,bikes_allowed integer,agency_id text"
}


const run = async() => {
  try {
    const client = await pool.connect();
    for (const table of Object.keys(schema)) {
      const result = await client.query(`CREATE TABLE ${table} (${schema[table]})`);
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      console.log(result)
      client.release();
    }
  } catch (err) {
    console.error(err);
  }
}
run();

res.render('pages/index')
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))