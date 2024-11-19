import { motion, useAnimationFrame } from 'framer-motion';
import { useState } from 'react';

export function MovingBorder() {
  const [rotation, setRotation] = useState(0);

  useAnimationFrame((t) => {
    setRotation(t / 15);
  });

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: `linear-gradient(${rotation}deg, 
          rgba(167, 139, 250, 1), 
          rgba(99, 102, 241, 1),
          rgba(147, 51, 234, 1),
          rgba(167, 139, 250, 1)
        )`,
        padding: '2px',
        filter: 'blur(3px)',
        opacity: 0.8,
      }}
    />
  );
}