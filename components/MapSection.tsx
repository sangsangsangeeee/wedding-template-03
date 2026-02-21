import React, { useState, useRef, useEffect } from 'react';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WEDDING_INFO, TRANSPORT_INFO } from '../constants';

declare global {
  interface Window {
    naver: any;
  }
}

const MapSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const mapElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapElement.current || !window.naver || !window.naver.maps) {
      console.warn('Naver maps SDK is not loaded. Skipping map initialization.');
      return;
    }

    const { lat, lng } = WEDDING_INFO.mapCoordinates;
    const location = new window.naver.maps.LatLng(lat, lng);

    const mapOptions = {
      center: location,
      zoom: 16,
      minZoom: 14,
      maxZoom: 19,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new window.naver.maps.Map(mapElement.current, mapOptions);

    new window.naver.maps.Marker({
      position: location,
      map: map,
    });
  }, []);

  const transportInfo = TRANSPORT_INFO;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(WEDDING_INFO.address);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto relative">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50 bg-ink/80 text-paper px-4 py-2 rounded-full shadow-lg text-sm font-body whitespace-nowrap"
          >
            주소가 복사되었습니다
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full aspect-square bg-gray-100 mb-6 shadow-inner rounded-sm overflow-hidden border border-gray-100 relative">
        <div ref={mapElement} className="w-full h-full" />
      </div>

      <div className="text-center mb-8 w-full px-4">
        <h3 className="text-xl font-bold font-body text-ink mb-1 whitespace-pre-line">{WEDDING_INFO.venue}</h3>
        <p className="text-sm text-ink/70 mb-4">{WEDDING_INFO.address}</p>
        
        <button 
          onClick={handleCopyAddress}
          className="flex items-center justify-center gap-2 mx-auto bg-[#F5F1E8] border border-ink/10 text-ink px-6 py-2 rounded-full font-hand text-xl hover:bg-ink/5 transition-all shadow-sm active:scale-95"
        >
          <Copy size={16} /> 주소 복사
        </button>
      </div>

      {/* Accordion Directions */}
      <div className="w-full bg-white/50 rounded-lg border-2 border-dashed border-ink/10 overflow-hidden">
        {transportInfo.map((item, index) => (
          <div key={index} className="border-b border-ink/10 last:border-0">
            <button 
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between py-4 px-6 hover:bg-white/50 transition-colors"
            >
              <span className="font-hand text-xl text-ink">{item.title}</span>
              {expandedIndex === index ? <ChevronUp size={16} className="text-ink/50"/> : <ChevronDown size={16} className="text-ink/50"/>}
            </button>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-white/30"
                >
                  <div className="pb-4 px-6 font-body text-sm text-ink/80 leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapSection;