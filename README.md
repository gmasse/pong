# pong

## Test

```shell
HDR='Content-type: application/json'
MSG='{"jsonrpc": "2.0", "method": "ping", "params": ["8.8.8.8"], "id": 1}'
```

```shell
curl -H $HDR -d $MSG http://localhost:3000/
```

or in loop,
```shell
while true; do curl -H $HDR -d $MSG http://localhost:3000/ ; echo ; sleep 1 ; done
```
