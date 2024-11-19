import { motion, useAnimationFrame } from 'framer-motion';
import { useState } from 'react';

export function MovingBorder() {
  const [rotation, setRotation] = useState(0);

  useAnimationFrame((t) => {
    setRotation((t / 10) % 360); // Increased rotation speed for more dynamic movement
  });

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: `linear-gradient(${rotation}deg, 
          rgba(255, 92, 92, 1),     /* Bright Red */
          rgba(255, 195, 0, 1),     /* Vibrant Yellow */
          rgba(0, 204, 204, 1),     /* Teal */
          rgba(153, 102, 255, 1),   /* Lavender */
          rgba(255, 92, 92, 1)      /* Bright Red to complete loop */
        )`,
        padding: '3px',
        filter: 'blur(5px)', // Enhanced blur for emphasis
        opacity: 0.9, // Slightly higher opacity for more visibility
      }}
    />
  );
}
