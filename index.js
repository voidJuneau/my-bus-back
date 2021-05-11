// Bring in our dependencies
const app = require('express')();
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5000

//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
});