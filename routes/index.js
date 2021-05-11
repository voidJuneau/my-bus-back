const routes = require('express').Router();
const lines = require('./lines');

routes.use('/lines', lines);
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;