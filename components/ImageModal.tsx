import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../types';

interface ImageModalProps {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 text-paper hover:text-accent transition-colors z-50 p-2 bg-white/10 rounded-full"
      >
        <X size={32} />
      </button>

      <div
        className="relative w-full max-w-5xl flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-0 md:-left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-paper transition-all z-50 backdrop-blur-sm border border-white/20"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-0 md:-right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-paper transition-all z-50 backdrop-blur-sm border border-white/20"
        >
          <ChevronRight size={32} />
        </button>

        {/* Image Display */}
        <div className="relative w-full flex flex-col items-center">
             <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex flex-col items-center"
                >
                    <div className="bg-white p-3 md:p-5 rounded-sm shadow-2xl max-h-[75vh] overflow-hidden rotate-0 md:rotate-1 transition-transform">
                        <img 
                            src={images[currentIndex].url} 
                            alt={images[currentIndex].caption} 
                            className="max-h-[65vh] w-auto object-contain min-w-[300px]"
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <h3 className="font-hand text-3xl text-paper tracking-wider mb-2">
                            {images[currentIndex].caption}
                        </h3>
                        <div className="flex justify-center gap-2 mt-2">
                            {images.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-accent scale-125' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
             </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageModal;