# Weapp-WebSocket

use new Websocket(url,protocols) in weapp

## Quick Start

```sh
yarn add 
```

```js
import { WeappWebSocket } from 'weapp-websocket'
const ws = new WeappWebSocket('ws://127.0.0.1:3000/graphql',['graphql-ws'])

ws.close()
ws.close(code)
ws.close(code, reason)
ws.send(data)
ws.addEventListener('close', (event) => { })
ws.onclose = (event) => { }
addEventListener('error', (event) => { })

onerror = (event) => { }
addEventListener('message', (event) => { })

onmessage = (event) => { }
```

## Options

```js
constructor(
    url: string | URL,
    protocols?: string | string[],
    options?: Partial<
      Omit<WechatMiniprogram.ConnectSocketOption, 'url' | 'protocols'>
    >,
    connectSocket = wx.connectSocket
)
// so you can use 
uni.connectSocket
Taro.connectSocket 
// etc...
```

Api refer:

<https://developer.mozilla.org/en-US/docs/Web/API/WebSocket>

options refer:

<https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.connectSocket.html>
