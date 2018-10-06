# pong
[![Build Status](https://travis-ci.com/gmasse/pong.svg?branch=master)](https://travis-ci.com/gmasse/pong)

## Installation

### Docker style

```shell
git clone https://github.com/gmasse/pong.git
cd pong
docker build -t netpong .
docker run -p 49160:3000 -d netpong
```

### Alternative

```shell
git clone https://github.com/gmasse/pong.git
cd pong
npm install
npm start
```


## Test

```shell
HDR='Content-type: application/json'
MSG='{"jsonrpc": "2.0", "method": "ping", "params": ["8.8.8.8"], "id": 1}'
```

```shell
curl -H "$HDR" -d "$MSG" http://localhost:3000/
```

or in loop,
```shell
while true; do curl -H "$HDR" -d "$MSG" http://localhost:3000/ ; echo ; sleep 1 ; done
```
