var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var requestSettings = {
  method: 'GET',
  // url: 'https://opendata.hamilton.ca/GTFS-RT/GTFS_ServiceAlerts.pb',
  url: 'https://opendata.hamilton.ca/GTFS-RT/GTFS_TripUpdates.pb',
  // url: 'https://opendata.hamilton.ca/GTFS-RT/GTFS_VehiclePositions.pb',
  encoding: null
};
request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
    console.log(feed.entity)
    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        console.log(entity.trip_update);
      }
    });
  }
});