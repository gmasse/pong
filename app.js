var pong = require('./pong')

pong.ping(['8.8.8.8'], function (value) {
    console.log("return: " + value);
});