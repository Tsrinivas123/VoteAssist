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
    <div className="max-w-2xl mx-auto py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Election Flashcards</h1>
      
      <div className="w-full aspect-[3/2] perspective-1000 mb-8 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden flex items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700" style={{ backfaceVisibility: 'hidden' }}>
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-white">
              {cards[currentIndex].q}
            </h2>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 backface-hidden flex items-center justify-center p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl text-white" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              {cards[currentIndex].a}
            </h2>
          </div>
        </motion.div>
      </div>
      
      <div className="flex items-center gap-6">
        <button onClick={prevCard} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <span className="font-medium text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {cards.length}
        </span>
        <button onClick={nextCard} className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all dark:text-white">
          <ArrowRight size={24} />
        </button>
      </div>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <RefreshCw size={14} /> Click card to flip
      </p>
    </div>
  );
}
