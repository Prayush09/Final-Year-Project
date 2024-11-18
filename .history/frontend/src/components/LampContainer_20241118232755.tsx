import React from "react";
import { motion } from "framer-motion";

interface LampContainerProps {
  className?: string; // Optional to allow custom styling
}

export const LampContainer: React.FC<LampContainerProps> = ({ className }) => {
  return (
    <motion.div
      className={`w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${className}`}
      layoutId="lamp-border"
      initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
    />
  );
};
