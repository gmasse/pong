var jayson = require('jayson');
var ping = require('net-ping');

// create a server
var server = jayson.server({
        ping: function(args, callback) {
                target = args[0];

                var options = {
                        retries: 0,
                        timeout: 2000
                };

                var session = ping.createSession(options);

                session.on ("error", function(error) {
                        console.trace(error.toString());
                });

                session.pingHost(target, function(error, target, sent, rcvd) {
                        var ms = rcvd - sent;
                        if(error) {
                                if(error instanceof ping.RequestTimedOutError) {
//                                        console.log(target + ": Time-out");
                                        callback({code: -32000, message: 'Time-out'});
                                } else {
//                                        console.log(target + ": " + error.toString());
                                        callback({message: error.toString()});
                                }
                        } else {
//                                console.log(target + ": " + ms);
                                callback(null, ms);
                        }
                });
        }
});

module.exports = server;
