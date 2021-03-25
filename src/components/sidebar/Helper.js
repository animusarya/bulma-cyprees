/* eslint-disable no-return-assign */
import { useState, useRef, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export function usePrevious(value) {
  const ref = useRef();
  // eslint-disable-next-line no-void
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

export function useMeasure() {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect)),
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
}
