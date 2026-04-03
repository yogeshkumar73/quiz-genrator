import React from 'react';
import { motion } from 'motion/react';

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 md:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};
