import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function AnimatedNumber({ value, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const numericValue = Number.parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, '');
  const minimumDigits = value.match(/^0/) ? 2 : 1;
  const count = useMotionValue(reduceMotion ? numericValue : 0);
  const display = useTransform(count, (latest) => `${Math.round(latest).toString().padStart(minimumDigits, '0')}${suffix}`);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      count.set(numericValue);
      return undefined;
    }
    const controls = animate(count, numericValue, { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] });
    return controls.stop;
  }, [count, inView, numericValue, reduceMotion]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
