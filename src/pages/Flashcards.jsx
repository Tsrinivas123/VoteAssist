import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ArrowRight, ArrowLeft } from 'lucide-react';

const cards = [
  { q: "What is the minimum voting age in India?", a: "18 years" },
  { q: "Which form is used for new voter registration?", a: "Form 6" },
  { q: "What does EVM stand for?", a: "Electronic Voting Machine" },
  { q: "What does VVPAT stand for?", a: "Voter Verifiable Paper Audit Trail" },
];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Election Masterclass
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Tap the cards to flip them and test your knowledge of the Indian electoral system.
        </p>
      </div>
      
      <div className="w-full max-w-2xl relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full aspect-[4/3] md:aspect-[21/9] perspective-1000 mb-10 cursor-pointer group" 
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="w-full h-full relative preserve-3d"
              animate={{ rotateX: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of Card (Question) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl border-4 border-indigo-50 dark:border-slate-700 transition-colors group-hover:border-indigo-200 dark:group-hover:border-indigo-900" style={{ backfaceVisibility: 'hidden' }}>
                <div className="absolute top-6 left-6 text-indigo-500/30">
                  <span className="text-6xl font-serif font-black">Q</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 dark:text-white z-10 leading-snug">
                  {cards[currentIndex].q}
                </h2>
                <div className="absolute bottom-6 flex items-center gap-2 text-indigo-500 font-medium animate-pulse">
                  <RefreshCw size={18} />
                  <span>Tap to reveal answer</span>
                </div>
              </div>
              
              {/* Back of Card (Answer) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 rounded-[2rem] shadow-2xl text-white border-4 border-indigo-400" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
                 <div className="absolute top-6 left-6 text-white/20">
                  <span className="text-6xl font-serif font-black">A</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-center z-10 leading-tight drop-shadow-lg">
                  {cards[currentIndex].a}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Controls */}
      <div className="flex items-center gap-8 bg-white/50 dark:bg-slate-800/50 p-4 rounded-full backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
        <button 
          onClick={prevCard} 
          className="p-4 rounded-full bg-white dark:bg-slate-700 text-gray-800 dark:text-white shadow-md hover:shadow-xl hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="font-bold text-2xl text-indigo-600 dark:text-indigo-400">
            {currentIndex + 1}
          </span>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            of {cards.length}
          </span>
        </div>
        
        <button 
          onClick={nextCard} 
          className="p-4 rounded-full bg-white dark:bg-slate-700 text-gray-800 dark:text-white shadow-md hover:shadow-xl hover:scale-110 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <ArrowRight size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
