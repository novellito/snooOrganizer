import { useEffect } from 'react';

export const useWindowEvent = (
  event: string,
  callback: EventListenerOrEventListenerObject
) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

export const useGlobalMessage = (
  callback: EventListenerOrEventListenerObject
): void => useWindowEvent('message', callback);
