const app = require('./pong')


var ping = app.getMethod('ping').getHandler();


    test('Ping 4321 returns error', done => {
        ping(['4321'], function(err, response) {
                expect(err).not.toBeNull();
                expect(response).toBeUndefined();
                done();
        });
    });

    test('Ping 127.0.0.1 returns a number', done => {
        ping(['127.0.0.1'], function(err, response) {
                expect(err).toBeNull();
                expect(response).toBeGreaterThan(0);
                done();
        });
    });

    test('Ping 192.0.2.1 returns Time-Out', done => {
        ping(['192.0.2.1'], function(err, response) {
                expect(err).not.toBeNull();
                expect(err.code).toBe(-32000);
                done();
        });
    });


