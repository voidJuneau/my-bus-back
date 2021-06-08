const lines = require('express').Router();
const all = require('./all');
const count = require('./count');
const single = require('./single');
const byLine = require('./byLine');

// /lines
lines.get('/', all);

// /lines/count
lines.get('/count', count);

// /lines/stop_id
lines.get('/:stopId', single);

// /lines/agency_id/route/route_id
lines.get('/:agencyId/route/:routeId', byLine)

module.exports = lines;