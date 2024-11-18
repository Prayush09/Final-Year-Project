import React from "react";
import { motion } from "framer-motion";

interface LampContainerProps {
  className?: string; // Optional to allow custom styling
}

export const LampContainer: React.FC<LampContainerProps> = ({ className }) => {
  return (
    <motion.div
      className={`w-full h-1 blur bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${className}`}
      layoutId="lamp-border"
      initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 0.65, y: 1}}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
    />
  );
};
