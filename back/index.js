// Bring in our dependencies
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

// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'front/build')));
//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'front/build', 'index.html'));
//   });
// }

// Turn on that server!
const server = app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
});