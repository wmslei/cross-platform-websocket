import {globalThisShim as globalThis} from '../globalThis/index.js';

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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const WebSocket = globalThis.WebSocket || globalThis.MozWebSocket;
