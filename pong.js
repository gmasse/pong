var jayson = require('jayson');
var net = require('net');
var sysping = require('ping');

// create a server
var server = jayson.server({
    ping: function(args, callback) {
        target = args[0];

        if (!net.isIPv4(target)) {
//            console.log('ping ' + target + ': ' + 'Invalid IPv4');
            return callback({code: -32000, message: 'Invalid IPv4'});
        }

        sysping.promise.probe(target, {
            timeout: 2,
            min_reply: 1
        }).then(function (res) {
            if (res.alive == true) {
//                console.log('ping ' + res.numeric_host + ': ' + res.time);
                return callback(null, res.time);
            } else {
//                console.log('ping ' + res.numeric_host + ': ' + 'Time-out');
                return callback({code: -32000, message: 'Time-out'});
            }
        });
    }
});

module.exports = server;
