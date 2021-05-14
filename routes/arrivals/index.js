const arrivals = require('express').Router();

const all = require('./all');

// /arrivals
arrivals.get('/', all);

module.exports = arrivals;