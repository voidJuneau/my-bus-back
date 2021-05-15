const arrivals = require('express').Router();

const all = require('./all');
const byStopAndLine = require('./byStopAndLine');

// /arrivals
arrivals.get('/', all);

// /arrivals/agency_id/stop/stop_id/route/route_id
arrivals.get('/:agencyId/stop/:stopId/route/:routeId', byStopAndLine);

module.exports = arrivals;