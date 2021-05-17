// Bring in our dependencies
const app = require('express')();
const routes = require('./routes');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const querystring = require('querystring');

dotenv.config();
const PORT = process.env.PORT || 5000

// Getting paramaters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
const server = app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
});

module.exports = server;