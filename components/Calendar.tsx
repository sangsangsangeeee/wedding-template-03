import React from 'react';
import { CALENDAR_DAYS } from '../constants';
import { motion } from 'framer-motion';

const Calendar: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="font-hand text-4xl mb-6 text-ink">2026년 6월</h3>
      
      <div className="relative p-6 bg-white shadow-sm rotate-1 max-w-sm w-full">
        {/* Hand-drawn Grid Lines (SVG) */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
           {/* Horizontal Lines */}
           {[1, 2, 3, 4, 5, 6].map(i => (
             <path 
               key={`h-${i}`} 
               d={`M 10 ${i * 50} Q ${150 + Math.random() * 20} ${i * 50 + Math.random() * 5}, 300 ${i * 50}`} 
               stroke="#E5E7EB" 
               strokeWidth="2" 
               strokeLinecap="round" 
               className="w-full"
               style={{ vectorEffect: 'non-scaling-stroke' }}
             />
           ))}
        </svg>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4 relative z-10">
          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
             <div key={day} className="text-center font-hand text-lg text-ink/60">{day}</div>
          ))}
          
          {CALENDAR_DAYS.map((day, idx) => {
             // 7th is the wedding day (June 7, 2026)
             const isWeddingDay = day === 7;
             return (
              <div key={idx} className="h-10 flex items-center justify-center relative font-body text-ink">
                {day}
                {isWeddingDay && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                    className="absolute inset-0 border-2 border-accent rounded-full w-8 h-8 m-auto opacity-80"
                    style={{ 
                        borderRadius: '50% 40% 60% 30% / 40% 50% 60% 50%', // Imperfect circle
                        transform: 'rotate(-10deg)'
                    }}
                  />
                )}
              </div>
             );
          })}
        </div>
        
        {/* Tape Effect */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-peach/60 rotate-2 backdrop-blur-sm shadow-sm z-20"></div>
      </div>
      
      {/* Additional Doodles */}
      <div className="mt-8 font-hand text-2xl text-ink/80 text-center">
        <p>소중한 날, 초대합니다</p>
        <p className="text-sm font-body mt-2 text-ink/60">일요일 오후 3시</p>
      </div>
    </div>
  );
};

export default Calendar;