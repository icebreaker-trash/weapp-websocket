import { WeappWebSocket } from '@/index'

const defaultMockOptions = {
  message: 'onMessage',
  errMsg: 'onError',
  code: 1000,
  reason: 'mockReason'
}

function createMockTask(
  options?: WechatMiniprogram.ConnectSocketOption,
  mockOptions: {
    message: string
    errMsg: string
    code: number
    reason: string
  } = defaultMockOptions
): WechatMiniprogram.SocketTask {
  return {
    close(opt) {
      opt.success?.({
        errMsg: 'ok'
      })
    },
    send(opt) {
      opt.success?.({
        errMsg: 'ok'
      })
    },
    onClose(fn) {
      fn?.({
        code: mockOptions.code,
        reason: mockOptions.reason
      })
    },
    onError(fn) {
      fn?.({
        errMsg: mockOptions.errMsg
      })
    },
    onMessage(fn) {
      fn?.({
        data: mockOptions.message
      })
    },
    onOpen(fn) {
      fn?.({
        header: {},
        profile: {
          connectEnd: 0,
          connectStart: 0,
          cost: 0,
          domainLookupEnd: 0,
          domainLookupStart: 0,
          fetchStart: 0,
          handshakeCost: 0,
          rtt: 0
        }
      })
    }
  }
}

describe('[Default]', () => {
  test('should be defined', () => {
    expect(WeappWebSocket).toBeDefined()
  })

  test('common usage', () => {
    const ws = new WeappWebSocket(
      'ws://127.0.0.1:3000/graphql',
      ['graphql-ws'],
      {},
      createMockTask
    )
    ws.onopen = function (res: any) {
      expect(this).toBe(ws)
      expect(res.header).toBeDefined()
      expect(res.profile).toBeDefined()
    }

    ws.onerror = function (res: any) {
      expect(this).toBe(ws)
      expect(res.errMsg).toBeDefined()
      expect(res.errMsg).toBe(defaultMockOptions.errMsg)
    }

    ws.onmessage = function (res: any) {
      expect(this).toBe(ws)
      expect(res.data).toBeDefined()
    }

    ws.onclose = function (res: any) {
      expect(this).toBe(ws)
      expect(res.errMsg).toBeDefined()
    }
  })

  test('remove onopen', () => {
    const ws = new WeappWebSocket(
      'ws://127.0.0.1:3000/graphql',
      ['graphql-ws'],
      {},
      createMockTask
    )
    ws.onopen = function (res: any) {}
    // @ts-ignore
    expect(ws.eventMap.open.length).toBe(1)
    ws.onopen = null
    // @ts-ignore
    expect(ws.eventMap.open.length).toBe(0)
  })

  test('add and remove listener', () => {
    const ws = new WeappWebSocket(
      'ws://127.0.0.1:3000/graphql',
      ['graphql-ws'],
      {},
      createMockTask
    )
    function initNoop(res: any) {}
    ws.onopen = initNoop
    // @ts-ignore
    expect(ws.eventMap.open.length).toBe(1)
    function noop() {}
    ws.addEventListener('open', noop)
    // @ts-ignore
    expect(ws.eventMap.open.length).toBe(2)
    ws.removeEventListener('open', noop)
    // @ts-ignore
    expect(ws.eventMap.open.length).toBe(1)
    // @ts-ignore
    expect(ws.eventMap.open[0]).toBe(initNoop)
  })

  test('invoke sequnce', () => {
    const result: number[] = []
    const ws = new WeappWebSocket(
      'ws://127.0.0.1:3000/graphql',
      ['graphql-ws'],
      {},
      createMockTask
    )
    ws.onopen = function () {
      result.push(1)
    }

    ws.addEventListener('open', () => {
      result.push(2)
    })

    ws.addEventListener('open', () => {
      result.push(3)
    })

    ws.dispatchEvent('open')

    expect(result).toEqual([1, 2, 3])
  })
})
