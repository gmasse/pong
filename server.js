const pong = require('./pong')

pong.http().listen(3000, function() {
  console.log('Server listening on http://localhost:3000');
});
