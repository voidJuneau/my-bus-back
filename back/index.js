// Bring in our dependencies
const app = require('express')();
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 5000

//  Connect all our routes to our application
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'back/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'back/build', 'index.html'));
  });
}

// Turn on that server!
const server = app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
});