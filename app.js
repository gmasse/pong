const app = require('./pong')


var ping = app.getMethod('ping').getHandler();


ping(['4321'], function(err, response) {
    console.log(err + ' - ' + response);
        });

