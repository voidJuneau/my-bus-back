const cars = require('express').Router();
const all = require('./all');
const single = require('./single');

cars.get('/', all);
cars.get('/:carId', single);



// routes/cars/index.js
const findObject = require('../../utils/findObject');

cars.param('carId', findObject('car'));

module.exports = cars;