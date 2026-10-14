import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const FacilityGalleryModal = ({ images = [], initialIndex = 0, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Prev / Next Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
        >
          <ChevronRight size={28} />
        </button>

        <div className="max-w-4xl w-full flex flex-col items-center justify-center space-y-4">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            src={currentImg.src || currentImg.img || currentImg}
            alt={currentImg.title || 'MediCare Plus Hospital Facility'}
            className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border-2 border-white/20"
          />

          <div className="text-center text-white space-y-1">
            <h4 className="text-lg font-bold font-poppins">{currentImg.title || `Facility Photo ${currentIndex + 1}`}</h4>
            <p className="text-xs text-slate-400">{currentImg.caption || currentImg.desc || 'Hospital infrastructure photo'}</p>
            <span className="inline-block text-[11px] text-teal-400 font-semibold pt-1">
              Image {currentIndex + 1} of {images.length}
            </span>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default FacilityGalleryModal;
