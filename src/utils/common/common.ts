/**
 *
 * @param {HTMLElement} el
 * @param {Function} cb
 * @return {ResizeObserver}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any;
export function useResize(el: HTMLElement, cb: Func) {
  const observer = new ResizeObserver((entries) => {
    cb(entries[0].contentRect);
  });
  observer.observe(el);
  return observer;
}
