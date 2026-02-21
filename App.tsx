import React, { useState } from 'react';
import FloatingParticles from './components/FloatingParticles';
import SectionWrapper from './components/SectionWrapper';
import WatercolorBlob from './components/WatercolorBlob';
import Calendar from './components/Calendar';
import MapSection from './components/MapSection';
import ImageModal from './components/ImageModal';
import { WEDDING_INFO, GALLERY_IMAGES, INVITATION_TITLE, INVITATION_PARAGRAPHS } from './constants';
import { Heart, Music, Image as ImageIcon, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Display only the first 4 images in the grid
  const displayedImages = GALLERY_IMAGES.slice(0, 4);

  return (
    <div className="font-body text-ink bg-paper min-h-screen overflow-x-hidden selection:bg-accent selection:text-paper">
      <FloatingParticles />
      
      {/* Audio Control (Sticky) */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-peach text-ink/70"
      >
        <Music size={20} className={isPlaying ? "text-accent animate-pulse" : "text-gray-400"} />
      </button>

      {/* --- COVER SECTION --- */}
      <SectionWrapper className="flex flex-col items-center justify-center text-center p-6">
        {/* Updated Blob Colors for Autumn Theme */}
        <WatercolorBlob color="#F2E6D8" className="w-64 h-64 -top-10 -left-10" /> 
        <WatercolorBlob color="#C85C42" className="w-72 h-72 top-20 -right-20 delay-700 opacity-20" />
        <WatercolorBlob color="#8FA3AD" className="w-48 h-48 bottom-20 left-10 delay-1000 opacity-30" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 max-w-md w-full"
        >
          {/* Main Illustration Area */}
          <div className="w-full aspect-[3/4] bg-white border-8 border-white shadow-xl rotate-1 mb-8 relative overflow-hidden group">
            {/* Note: In a real environment, you would use the local file path. 
                Using the specific provided image style URL or placeholder. */}
            <img 
              src="/assets/hero.jpeg"
              alt="Autumn Wedding Illustration" 
              className="w-full h-full object-cover opacity-95 transition-all duration-[3s] ease-in-out group-hover:scale-105"
            />
            {/* Overlay to warm up the image if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent mix-blend-overlay"></div>
            
            {/* Animated Sketch Overlay Effect */}
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute inset-0 bg-paper"
            />
          </div>

          <h1 className="font-hand text-6xl mb-4 text-ink drop-shadow-sm">우리의 동화</h1>
          <div className="flex items-center justify-center gap-4 text-xl font-bold tracking-widest uppercase text-ink/80">
            <span>{WEDDING_INFO.groom}</span>
            <Heart size={16} className="text-accent fill-accent animate-bounce" />
            <span>{WEDDING_INFO.bride}</span>
          </div>
          <p className="mt-4 text-ink/70 text-sm tracking-wide">{`${WEDDING_INFO.date.getFullYear()}년 ${WEDDING_INFO.date.getMonth() + 1}월 ${WEDDING_INFO.date.getDate()}일`} • {WEDDING_INFO.location}</p>
        </motion.div>
        
        <div className="absolute bottom-10 animate-bounce text-ink/40 hidden md:block">
           <p className="font-hand text-2xl">아래로 내려주세요</p>
        </div>
      </SectionWrapper>

      {/* --- LETTER SECTION --- */}
      <SectionWrapper className="flex items-center justify-center p-6">
        <WatercolorBlob color="#F2E6D8" className="w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-lg w-full bg-white p-8 shadow-lg relative border border-gray-100">
           {/* Letter Paper Lines */}
           <div className="absolute inset-0 p-8 flex flex-col gap-8 pointer-events-none opacity-10">
              {Array.from({length: 15}).map((_, i) => (
                <div key={i} className="w-full h-px bg-ink"></div>
              ))}
           </div>

           <div className="relative z-10 text-center space-y-6">
             <h2 className="font-hand text-4xl text-accent mb-8">{INVITATION_TITLE}</h2>
             {INVITATION_PARAGRAPHS.map((paragraph, index) => (
               <p key={index} className="leading-loose text-lg text-ink/80">
                 {paragraph.split('\n').map((line, i, arr) => (
                   <React.Fragment key={i}>
                     {line}
                     {i < arr.length - 1 && <br />}
                   </React.Fragment>
                 ))}
               </p>
             ))}
             
             <div className="pt-8 flex justify-end items-end gap-2">
               <div className="font-hand text-2xl text-ink/60 transform -rotate-6">드림</div>
               <div className="font-hand text-3xl">{WEDDING_INFO.groom} & {WEDDING_INFO.bride}</div>
               {/* Stamp */}
               <div className="w-12 h-12 border-2 border-accent rounded-full flex items-center justify-center text-accent font-bold text-xs transform rotate-12 opacity-80" style={{borderStyle: 'dashed'}}>
                 LOVE
               </div>
             </div>
           </div>
        </div>
      </SectionWrapper>

      {/* --- GALLERY SECTION --- */}
      <SectionWrapper className="py-20 px-4 md:p-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-12">
            <ImageIcon className="text-mint" />
            <h2 className="font-hand text-5xl text-ink">소중한 순간들</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full p-2 max-w-3xl">
            {displayedImages.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ rotate: img.rotation }}
                whileHover={{ scale: 1.05, zIndex: 10, cursor: 'pointer' }}
                onClick={() => setSelectedImageIndex(index)}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-full max-w-sm mx-auto group cursor-pointer"
              >
                {/* Stacked Photos Behind */}
                <div 
                    className="absolute inset-0 bg-white shadow-sm border border-gray-100 transition-transform duration-300"
                    style={{ transform: `rotate(${index % 2 === 0 ? 4 : -3}deg) translate(${index % 2 === 0 ? 8 : -6}px, 6px)` }}
                ></div>
                <div 
                    className="absolute inset-0 bg-white shadow-sm border border-gray-100 transition-transform duration-300"
                    style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg) translate(${index % 2 === 0 ? -4 : 4}px, 4px)` }}
                ></div>

                {/* Main Photo Card */}
                <div className="relative bg-white p-3 shadow-md z-10 transition-shadow duration-300 group-hover:shadow-xl">
                  {/* Masking Tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-peach/80 backdrop-blur-[1px] shadow-sm transform -rotate-2 z-20"></div>
                  
                  <div className="aspect-square overflow-hidden mb-2 relative">
                    <div className="absolute inset-0 bg-sepia-20 pointer-events-none mix-blend-overlay opacity-20"></div>
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover filter contrast-[0.9] brightness-105" />
                    
                    {/* Show "more photos" hint on the last image if there are more */}
                    {index === 3 && GALLERY_IMAGES.length > 4 && (
                      <div className="absolute inset-0 bg-ink/60 flex items-center justify-center group-hover:bg-ink/40 transition-colors">
                         <span className="font-hand text-3xl text-paper drop-shadow-md">
                           +{GALLERY_IMAGES.length - 4} 더보기
                         </span>
                      </div>
                    )}
                  </div>
                  <p className="font-hand text-2xl text-center text-ink/80 mt-2">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* --- CALENDAR & LOCATION SECTION --- */}
      <SectionWrapper className="flex flex-col md:flex-row items-center justify-center gap-12 p-6 md:p-20">
        <WatercolorBlob color="#8FA3AD" className="w-[500px] h-[500px] -bottom-20 -right-20 opacity-20" />
        
        <div className="w-full max-w-md">
           <Calendar />
        </div>
        
        <div className="w-full h-px bg-ink/10 md:w-px md:h-96"></div>
        
        <div className="w-full max-w-md">
           <MapSection />
        </div>
      </SectionWrapper>

      {/* --- GUESTBOOK SECTION --- */}
      <SectionWrapper className="flex flex-col items-center justify-center p-8 bg-[#F5F1E8]">
        <h2 className="font-hand text-5xl mb-8">방명록</h2>
        <div className="max-w-2xl w-full bg-white p-1 rounded-lg shadow-xl relative">
          {/* Notebook binding spiral visualization */}
          <div className="absolute -left-4 top-4 bottom-4 w-8 flex flex-col justify-between items-center z-20">
             {Array.from({length: 10}).map((_, i) => (
               <div key={i} className="w-6 h-6 rounded-full border-4 border-gray-300 bg-white shadow-inner"></div>
             ))}
          </div>

          <div className="bg-paper p-8 min-h-[400px] relative border-l-2 border-gray-200 ml-2">
             <div className="space-y-6">
                <div className="bg-[#FFF9E6] p-4 shadow rotate-1 relative">
                  <p className="font-hand text-xl">"결혼 정말 축하해! 너무 잘 어울린다!"</p>
                  <p className="text-right text-xs mt-2 text-ink/60">- 고모</p>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent/50 rounded-full"></div>
                </div>
                
                <div className="bg-[#E8F1F5] p-4 shadow -rotate-1 w-3/4 ml-auto">
                  <p className="font-hand text-xl">"이따 식장에서 보자~ 축하해!"</p>
                  <p className="text-right text-xs mt-2 text-ink/60">- 친구 민수</p>
                </div>
             </div>

             <div className="mt-12 pt-8 border-t border-dashed border-gray-300">
               <h3 className="font-hand text-2xl mb-4 flex items-center gap-2">
                 <MessageCircle size={20} /> 축하 메시지 남기기
               </h3>
               <textarea 
                 className="w-full p-4 bg-white/50 border border-gray-300 rounded-lg font-hand text-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none placeholder-ink/30"
                 rows={3}
                 placeholder="따뜻한 축하의 말을 남겨주세요..."
               ></textarea>
               <button className="mt-4 bg-ink text-paper px-8 py-2 rounded-full font-hand text-xl hover:bg-opacity-90 w-full transition-transform active:scale-95 shadow-lg">
                 메시지 등록
               </button>
             </div>
          </div>
        </div>
      </SectionWrapper>
      
      {/* Footer */}
      <footer className="bg-paper p-10 text-center font-hand text-xl text-ink/50">
        <p>저희의 시작을 함께해주셔서 감사합니다.</p>
        <p className="text-sm font-body mt-2">© 2026 {WEDDING_INFO.groom} & {WEDDING_INFO.bride}</p>
      </footer>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <ImageModal 
            images={GALLERY_IMAGES} 
            initialIndex={selectedImageIndex} 
            onClose={() => setSelectedImageIndex(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;