var ping = require('net-ping');
var raw = require ('raw-socket');


module.exports.raw = function (args) {
    var target = args[0];
    //var count = 3;
    var sleep = 200;

    var options = {
        protocol: raw.Protocol.ICMP
    };

    var socket = raw.createSocket (options);

    socket.on ("close", function () {
        console.log ("socket closed");
        process.exit (-1);
    });

    socket.on ("error", function (error) {
        console.log ("error: " + error.toString ());
        process.exit (-1);
    });

    socket.on ("message", function (buffer, source) {
        console.log ("received " + buffer.length + " bytes from " + source);
        console.log ("data: " + buffer.toString ("hex"));
    });

    // ICMP echo (ping) request
    var buffer = new Buffer ([
        0x08, 0x00, 0x00, 0x00, 0x00, 0x01, 0x0a, 0x09,
        0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68,
        0x69, 0x6a, 0x6b, 0x6c, 0x6d, 0x6e, 0x6f, 0x70,
        0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x61,
        0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69]);

    raw.writeChecksum (buffer, 2, raw.createChecksum (buffer));

    function ping () {
        //for (var i = 0; i < count; i++) {
            socket.send (buffer, 0, buffer.length, target, function (error, bytes) {
                if (error) {
                    console.log (error.toString ());
                } else {
                    console.log ("sent " + bytes + " bytes to " + target);
                }
            });
        //}

        //setTimeout (ping, sleep);
    }

    ping ();
};


module.exports.ping = function (args, callback) {
    target = args[0];

    var options = {
        retries: 0,
        timeout: 2000
    };

    var session = ping.createSession(options);

    session.on ("error", function(error) {
        console.trace(error.toString());
    });

    var output;
    session.pingHost(target, function(error, target, sent, rcvd) {
        var ms = rcvd - sent;
//        console.log('session: %o', session);
        if(error) {
            if(error instanceof ping.RequestTimedOutError) {
                console.log(target + ": Time-out");
                return callback(-1);
            } else {
                console.log(target + ": " + error.toString());
                return callback(-1);
            }
        } else {
            console.log(target + ": " + ms);
            return callback(ms);
        }
    });
};
