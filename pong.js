var ping = require('net-ping');

module.exports.ping = async function (args, callback) {
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
