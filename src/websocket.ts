import {
  usingBrowserWebSocket,
  WebSocket as WS,
} from './websocket-constructor/index.js';

const isReactNative =
  typeof navigator !== 'undefined' &&
  typeof navigator.product === 'string' &&
  navigator.product.toLowerCase() === 'reactnative';

export class WebSocket {
  private ws: WS;
  constructor(
    url: string | URL,
    protocols?: string | string[],
    options?: {headers?: {[header: string]: string}}
  ) {
    if (usingBrowserWebSocket && !isReactNative) {
      this.ws = new WS(url, protocols);
    } else {
      this.ws = new WS(url, protocols, options);
    }
  }

  set onopen(cb: (evt: unknown) => void) {
    this.ws.onopen = cb;
  }

  set onclose(cb: (evt: unknown) => void) {
    this.ws.onclose = cb;
  }

  set onerror(cb: (evt: unknown) => void) {
    this.ws.onerror = cb;
  }

  set onmessage(cb: (data: unknown) => void) {
    this.ws.onmessage = e => cb(e.data);
  }

  send(data: string, opts?: {compress?: boolean}) {
    if (usingBrowserWebSocket) {
      this.ws.send(data);
    } else {
      this.ws.send(data, opts ?? {});
    }
  }

  close() {
    this.ws.close();
  }
}
