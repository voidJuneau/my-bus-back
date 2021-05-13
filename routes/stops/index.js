const lines = require('express').Router();
const all = require('./all');
const single = require('./single');
const byLine = require('./byLine');

// /stops
lines.get('/', all);

// /stops/stop_id
lines.get('/:stopId', single);

// /stop/agency_id/route_id
lines.get('/:agencyId/:route_id', byLine)

module.exports = lines;