const models = require('express').Router();
const all = require('./all');
const single = require('./single');
const cars = require('./cars');

models.use('/:modelId/cars', cars);
models.get('/:modelId', single);
models.get('/', all);



// routes/models/index.js
const findObject = require('../../utils/findObject');

models.param('modelId', findObject('model'));

module.exports = models;