const { Pool } = require('pg');
const fs = require('fs');
const readline = require('readline');
const express = require('express')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000

const limitTime = (time) => {
  if (time.indexOf(":") != 2) return time;
  const hour = parseInt(time.substring(0, 2));
  if (hour < 24) return time;
  return (hour-24) + time.substring(2);
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {

  // console.log("process.env.DATABASE_URL: " + process.env.DATABASE_URL)
  const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
  });

  schema = {
    // agency: "agency_id text,agency_name text,agency_url text,agency_timezone text,agency_lang text,agency_phone text,agency_fare_url text,agency_email text",
    // route: "route_id text,agency_id text,route_short_name text,route_long_name text,route_desc text,route_type integer,route_url text,route_color text,route_text_color text",
    // stop: "stop_id integer,stop_code integer,stop_name text,stop_desc text,stop_lat float,stop_lon float ,zone_id integer,stop_url text,location_type integer,parent_station integer,stop_timezone text,wheelchair_boarding integer,agency_id text",
    // trip: "route_id text,service_id text,trip_id text,trip_headsign text,trip_short_name text,direction_id integer,block_id text,shape_id integer,wheelchair_accessible integer,bikes_allowed integer,agency_id text",
    stop_time: "trip_id text,arrival_time time,departure_time time,stop_id integer,stop_sequence integer,stop_headsign integer,pickup_type integer,drop_off_type integer,shape_dist_traveled float,agency_id text",
  }

  const run = async() => {
    console.log("started");
    try {
      const client = await pool.connect();
      for (const table of Object.keys(schema)) {
        // Create DB
        // const result = await client.query(`CREATE TABLE ${table} (${schema[table]})`);
        // const results = { 'results': (result) ? result.rows : null};
        // res.render('pages/index', results );
        // client.release();

        // Insert values
        let data;
        try {
          data = fs.readFileSync(table==="agency"?`burt/${table}.txt`:`burt/${table}s.txt`, 'utf8')
        } catch (err) {
          // console.error(err);
          return
        }
        data = data.split("\n")
        header = data[0]
        for (let i = 1; i < data.length; i++) { // ignore the first line (header)
          if (!data[i]) continue; // for last empty row
          const line = data[i].split(",").map(a => a.trim() === ""?"Null":`'${limitTime(a.trim())}'`).join(",") // to allow empty value for integer
          // console.log(header)
          // console.log(line)
          const result = await client.query(`INSERT INTO ${table}(${header}) VALUES (${line})`);
          // console.log(result)
        }
      }
      console.log("finished");
      setTimeout(() => console.log("setTimeout finished"), 2147483647)
    } catch (err) {
      res.send("Error " + err);
      console.log(err);
    }
  }
  run()
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))