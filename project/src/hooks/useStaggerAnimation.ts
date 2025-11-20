import { useEffect, useRef, useState } from 'react';

export const useStaggerAnimation = (itemCount: number, threshold = 0.1, baseDelay = 100) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const getItemClass = (index: number, baseClasses: string) => {
    const delay = index * baseDelay;
    return `${baseClasses} transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`;
  };

  const getItemStyle = (index: number) => ({
    transitionDelay: isVisible ? `${index * baseDelay}ms` : '0ms',
  });

  return { elementRef, isVisible, getItemClass, getItemStyle };
};
