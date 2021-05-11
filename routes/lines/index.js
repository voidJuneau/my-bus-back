const lines = require('express').Router();
const all = require('./all');
const single = require('./single');

// /lines
lines.get('/', all);

// /lines/agency_id/route_short_name
lines.get('/:agencyId/:lineId', single);

module.exports = lines;