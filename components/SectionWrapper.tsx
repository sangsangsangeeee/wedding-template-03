import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateY: 15, transformOrigin: "left center" }}
      animate={isInView ? { opacity: 1, rotateY: 0 } : { opacity: 0, rotateY: 15 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`min-h-screen w-full relative overflow-hidden bg-paper ${className}`}
      style={{ perspective: 1000 }}
    >
      {children}
      {/* Page edge shadow effect */}
      <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-gray-200/20 to-transparent pointer-events-none z-10" />
    </motion.div>
  );
};

export default SectionWrapper;