import React from 'react';

interface WatercolorBlobProps {
  color?: string;
  className?: string;
  delay?: number;
}

const WatercolorBlob: React.FC<WatercolorBlobProps> = ({ 
  color = "#FFD1DC", 
  className = "",
  delay = 0 
}) => {
  return (
    <div 
      className={`absolute opacity-70 blur-xl mix-blend-multiply transition-all duration-1000 ease-in-out animate-pulse ${className}`}
      style={{ 
        backgroundColor: color, 
        animationDelay: `${delay}s`,
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' 
      }}
    />
  );
};

export default WatercolorBlob;