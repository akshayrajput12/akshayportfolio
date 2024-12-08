// Performance Optimization Utilities

// Memoization Utility
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Debounce Utility
export const debounce = <F extends (...args: any[]) => any>(
  func: F, 
  delay: number
): (...args: Parameters<F>) => void => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Throttle Utility
export const throttle = <F extends (...args: any[]) => any>(
  func: F, 
  limit: number
): (...args: Parameters<F>) => void => {
  let inThrottle: boolean;
  
  return (...args: Parameters<F>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image Lazy Loading
export const lazyLoadImage = (
  imgElement: HTMLImageElement, 
  src: string, 
  placeholderSrc?: string
) => {
  if (placeholderSrc) {
    imgElement.src = placeholderSrc;
  }
  
  const img = new Image();
  img.src = src;
  img.onload = () => {
    imgElement.src = src;
    imgElement.classList.add('loaded');
  };
};

// Performance Metrics
export const measurePerformance = () => {
  const metrics = {
    ttfb: performance.timing.responseStart - performance.timing.navigationStart,
    fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
    loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart
  };
  
  console.log('Performance Metrics:', metrics);
  return metrics;
};
