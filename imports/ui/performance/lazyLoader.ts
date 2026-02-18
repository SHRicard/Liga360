import { lazy } from 'react';
import type { ComponentType } from 'react';

export const createLazyComponent = <T extends ComponentType<unknown>>(
  importFunction: () => Promise<{ default: T }>
) => {
  const LazyComponent = lazy(importFunction);
  const preload = () => importFunction();
  (LazyComponent as unknown as T & { preload: typeof preload }).preload =
    preload;
  return LazyComponent as unknown as T & { preload: typeof preload };
};

export const preloadCriticalAssets = () => {
  const criticalAssets = ['/logo.svg', '/favicon.ico'];

  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = asset;
    document.head.appendChild(link);
  });
};

export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  if (!('IntersectionObserver' in window)) {
    return {
      observe: () => {},
      unobserve: () => {},
      disconnect: () => {},
    };
  }

  return new IntersectionObserver(callback, {
    rootMargin: '10px',
    threshold: 0.1,
    ...options,
  });
};
