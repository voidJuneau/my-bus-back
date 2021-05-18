const express = require('express');
const routes = require('./routes');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

//  Connect all our routes to our application
app.use('/', routes);

const server = app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
});