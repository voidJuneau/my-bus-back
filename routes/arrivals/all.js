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

// /stops
// /stops?query=q&limit=5&page=1
module.exports = async (req, res) => {
  try {
    const data = [];

    await request(requestSettings, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
        // console.log(feed.entity[0].tripUpdate.stopTimeUpdate[0])
        feed.entity.forEach(function(entity) {
          if (entity.tripUpdate) {
            data.push(entity.tripUpdate);
            console.log(entity.tripUpdate)
          }
        });
      }
    });

    res.status(200).json( data );
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
};