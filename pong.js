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
                                        callback({code: -32000, message: 'Time-out'});
                                } else {
                                        console.log(target + ": " + error.toString());
                                        callback({message: error.toString()});
                                }
                        } else {
                                callback(null, ms);
                        }
                });
        }
});

server.http().listen(3000, function() {
  console.log('Server listening on http://localhost:3000');
});
