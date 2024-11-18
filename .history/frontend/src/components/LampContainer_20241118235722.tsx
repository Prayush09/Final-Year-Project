import React from "react";
import { motion } from "framer-motion";

interface LampContainerProps {
  className?: string; // Optional to allow custom styling
}

export const LampContainer: React.FC<LampContainerProps> = ({ className }) => {
  return (
    <div className="relative w-full">
      <motion.div
        className={`absolute bottom-[-8px] left-0 w-full h-1 blur-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${className}`}
        layoutId="lamp-border"
        initial={{ scaleX: 0, opacity: 0.7 }}
        animate={{ scaleX: 1, opacity: 0.85 }}
        transition={{
          delay: 0.2,
          duration: 0.9,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "center",
          boxShadow: "0 0 15px rgba(238, 130, 238, 0.8)", // Adding a soft shadow
        }}
      />
    </div>
  );
};
