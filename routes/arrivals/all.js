const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
const axios = require('axios');

const DEFAULT_LIMIT = require("../common").DEFAULT_LIMIT;

const requestSettings = {
  method: 'GET',
  // url: 'https://opendata.hamilton.ca/GTFS-RT/GTFS_ServiceAlerts.pb',
  url: 'https://opendata.hamilton.ca/GTFS-RT/GTFS_TripUpdates.pb',
  // url: 'https://opendata.hamilton.ca/GTFS-RT/GTFS_VehiclePositions.pb',
  encoding: null
};

const realtimeRequest = () => {
  console.log('start')
  axios.get('https://opendata.hamilton.ca/GTFS-RT/GTFS_TripUpdates.pb')
  .then(function (body) {
    console.log(typeof body.data)
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body.data);
    console.log(feed)
    return feed;
  }).catch(error => console.log(error));
}

const mock = [
  {
    "trip": {
    "tripId": "1525929",
    "scheduleRelationship": "SCHEDULED",
    "routeId": "4424"
    },
    "stopTimeUpdate": [
    {
    "arrival": {
    "delay": -74,
    "time": "1620995146"
    },
    "departure": {
    "delay": -74,
    "time": "1620995146"
    },
    "stopId": "356095",
    "scheduleRelationship": "SCHEDULED"
    },
    {
    "arrival": {
    "delay": -80,
    "time": "1620995260"
    },
    "departure": {
    "delay": -80,
    "time": "1620995260"
    },
    "stopId": "356007",
    "scheduleRelationship": "SCHEDULED"
    },
    {
    "arrival": {
    "time": "1620995363"
    },
    "departure": {
    "time": "1620995363"
    },
    "stopId": "1280",
    "scheduleRelationship": "SCHEDULED"
    },
    ],
  }
]

// /arrivals
module.exports = (req, res) => {
  try {
    request(requestSettings, function (error, response, body) {
      const data = [];
      if (!error && response.statusCode == 200) {
        var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
        // console.log(feed.entity[0].tripUpdate.stopTimeUpdate[0])
        feed.entity.forEach(function(entity) {
          if (entity.tripUpdate) {
            data.push(entity.tripUpdate);
          }
        });
      }
    res.status(200).json( data );
    });

    // axios.get('https://opendata.hamilton.ca/GTFS-RT/GTFS_TripUpdates.pb')
    // .then(function (body) {
    //   console.log(typeof body.data)
    //   var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body.data);
    //   res.status(200).json(feed);

    // }).catch(error => console.log(error));

  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
};