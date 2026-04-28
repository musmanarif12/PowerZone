'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface CountUpProps {
  to: number;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ to, duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 40, damping: 20 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      count.set(to);
    }
  }, [isInView, to, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [rounded]);

  return <span ref={ref}>{displayValue}</span>;
};

export default CountUp;
