import React from "react";
import { motion } from "framer-motion";

interface LampContainerProps {
  className?: string; // Optional to allow custom styling
}

export const LampContainer: React.FC<LampContainerProps> = ({ className }) => {
  return (
    <div className="relative w-full">
      <motion.div
        className={`absolute bottom-[-5px] left-0 w-full h-1 blur-[4px] bg-gradient-to-r from-indigo-700 via-purple-700 to-red-300 ${className}`}
        layoutId="lamp-border"
        initial={{ scaleX: 0, opacity: 0.5 }}
        animate={{ scaleX: 1, opacity: 0.65 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "center" }}
      />
    </div>
  );
};
