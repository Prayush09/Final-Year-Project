import { motion, useAnimationFrame } from 'framer-motion';
import { useState } from 'react';

export function MovingBorder() {
  const [rotation, setRotation] = useState(0);

  useAnimationFrame((t) => {
    setRotation((t / 20) % 360); // Maintain dynamic rotation speed
  });

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: `linear-gradient(${rotation}deg, 
          #8D4DE8,    /* Vibrant Purple */
          #00EFFF,    /* Neon Cyan */
          #8D4DE8     /* Bright Pink to complete loop */
        )`,
        padding: '3px',
        filter: 'blur(5px)', // Glowing effect
        opacity: 0.9, // High opacity for vibrant visibility
      }}
    />
  );
}
