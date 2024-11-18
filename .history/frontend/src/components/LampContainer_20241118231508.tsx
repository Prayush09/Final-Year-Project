import React from "react";
import { motion } from "framer-motion";

interface LampContainerProps {
  className?: string; // Optional to allow custom styling
}

export const LampContainer: React.FC<LampContainerProps> = ({ className }) => {
  return (
    <motion.div
      className={`w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${className}`}
      layoutId="lamp-border"
    />
  );
};
