const lines = require('express').Router();
const all = require('./all');
const count = require('./count');
const single = require('./single');
const byLine = require('./byLine');

// /stops
lines.get('/', all);

// /stops/count
lines.get('/count', count);

// /stops/stop_id
lines.get('/:stopId', single);

// /stops/agency_id/route_id
lines.get('/:agencyId/:routeId', byLine)

module.exports = lines;