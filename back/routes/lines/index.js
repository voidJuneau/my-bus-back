const lines = require('express').Router();
const all = require('./all');
const count = require('./count');
const single = require('./single');
const byStop = require('./byStop')

// /lines
lines.get('/', all);

// /lines/count
lines.get('/count', count);

lines.get('/test', (req, res) => {
    console.log(req.params)
    res.status(200).json({test: "test"})
})

// /lines/agency_id/route/route_id
lines.get('/:agencyId/route/:routeId', single);

// /lines/agency_id/stop/stop_id
lines.get('/:agencyId/stop/:stopId', byStop)

module.exports = lines;