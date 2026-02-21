import React, { useState } from 'react';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOCATION_NAME, LOCATION_ADDRESS } from '../constants';

const MapSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);

  const transportInfo = [
    { title: '지하철', content: '2호선 숲속역 3번 출구 도보 5분' },
    { title: '버스', content: '초록버스 1234번, 가든 입구 하차' },
    { title: '자가용', content: '네비게이션에 "그랜드 포레스트 가든" 검색 (주차 200대 가능)' },
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(LOCATION_ADDRESS);
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

      <div className="bg-white p-2 shadow-lg rotate-[-1deg] w-full relative mb-6">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 bg-yellow-50/20 pointer-events-none z-10 mix-blend-multiply"></div>
        
        <div className="relative aspect-video w-full overflow-hidden bg-[#E8F4F8] flex items-center justify-center border-2 border-gray-100">
             <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(LOCATION_ADDRESS)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                title="Map"
                className="w-full h-full opacity-90 grayscale-[0.1]"
            ></iframe>
        </div>
      </div>

      <div className="text-center mb-8 w-full px-4">
        <h3 className="text-xl font-bold font-body text-ink mb-1">{LOCATION_NAME}</h3>
        <p className="text-sm text-ink/70 mb-4">{LOCATION_ADDRESS}</p>
        
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