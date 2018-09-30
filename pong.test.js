const pong = require('./pong')

test('Ping 4321 returns error', done => {
    pong.ping(['4321'], function(response) {
            expect(response).toBe(-1);
            done();
    });
});

test('Ping 127.0.0.1 returns a number', done => {
    pong.ping(['127.0.0.1'], function(response) {
            expect(response).toBeGreaterThan(0);
            done();
    });
});

test('Ping 8.8.8.8 returns a number', done => {
    pong.ping(['8.8.8.8'], function(response) {
            expect(response).toBeGreaterThan(0);
            done();
    });
});


test('Ping 192.0.2.1 returns Time-Out', done => {
    pong.ping(['192.0.2.1'], function(response) {
            expect(response).toBe(-1);
            done();
    });
});


