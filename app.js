var ping = require('ping');
 
var hosts = ['127.0.0.1', '8.8.8.8', '4332', 'google.com'];
hosts.forEach(function(host) {
    ping.promise.probe(host, {
        timeout: 2,
        min_reply: 1,
//        extra: ["-i 2"],
    }).then(function (res) {
        if (res.alive == true) {
            console.log('ping ' + res.numeric_host + ': ' + res.time);
        } else {
            console.log('ping ' + res.numeric_host + ': ' + 'Time-out');
        }
    });
});
