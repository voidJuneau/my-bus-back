const routes = require('express').Router();
const lines = require('./lines');
const stops = require('./stops');

routes.use('/lines', lines);
routes.use('/stops', stops);
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;