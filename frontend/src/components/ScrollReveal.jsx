import React, { useEffect, useRef, useState } from 'react';

const hiddenByDirection = {
  up: 'opacity-0 translate-y-8',
  down: 'opacity-0 -translate-y-8',
  left: 'opacity-0 -translate-x-8',
  right: 'opacity-0 translate-x-8',
  zoom: 'opacity-0 scale-95',
};

const ScrollReveal = ({
  as: Component = 'div',
  className = '',
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  once = true,
  threshold = 0.18,
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, threshold]);

  const hidden = hiddenByDirection[direction] || hiddenByDirection.up;

  return (
    <Component
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
      className={`transform-gpu transition-all ease-out will-change-transform ${visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : hidden} ${className}`.trim()}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
