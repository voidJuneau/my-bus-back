const stops = require('express').Router();
const all = require('./all');
const count = require('./count');
const single = require('./single');
const byLine = require('./byLine');
const byLineCount = require('./byLineCount');

// /stops
stops.get('/', all);

// /stops/count
stops.get('/count', count);

// /stops/stop_id
stops.get('/:stopId', single);

// /stops/agency_id/route/route_id
stops.get('/:agencyId/route/:routeId', byLine)

// /stops/agency_id/route/route_id/count
stops.get('/:agencyId/route/:routeId/count', byLineCount)

module.exports = stops;