import {globalThisShim as globalThis} from '../globalThis/browser';

export const usingBrowserWebSocket = true;
export const nextTick = (() => {
  const isPromiseAvailable =
    typeof Promise === 'function' && typeof Promise.resolve === 'function';
  if (isPromiseAvailable) {
    return (cb: () => void) => Promise.resolve().then(cb);
  } else {
    return (
      cb: () => void,
      setTimeoutFn: (fn: () => void, timeout: number) => void
    ) => setTimeoutFn(cb, 0);
  }
})();

const WS = globalThis.WebSocket || globalThis.MozWebSocket;

const isReactNative =
  typeof navigator !== 'undefined' &&
  typeof navigator.product === 'string' &&
  navigator.product.toLowerCase() === 'reactnative';

export class WebSocket extends WS {
  constructor(
    url: string | URL,
    protocols?: string | string[],
    options?: Record<string, unknown>
  ) {
    if (isReactNative) {
      super(url, protocols, options);
    } else {
      super(url, protocols);
    }
  }
}
