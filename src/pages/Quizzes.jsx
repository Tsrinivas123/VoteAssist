import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight } from 'lucide-react';

const questions = [
  {
    q: "Who conducts the elections in India?",
    options: ["Supreme Court", "Parliament", "Election Commission of India", "President"],
    a: 2
  },
  {
    q: "What does NOT serve as valid proof of identity for voting?",
    options: ["Aadhaar Card", "Gym Membership Card", "Passport", "Driving License"],
    a: 1
  }
];

export default function Quizzes() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const handleOption = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    
    if (idx === questions[currentQ].a) {
      setScore(score + 10);
    }
    
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOpt(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-2xl"
        >
          <Trophy size={64} className="mx-auto text-yellow-500 mb-6" />
          <h2 className="text-3xl font-bold mb-2 dark:text-white">Quiz Completed!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">You scored {score} points</p>
          <button 
            onClick={() => {setCurrentQ(0); setScore(0); setShowResult(false); setSelectedOpt(null);}}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white">Knowledge Check</h1>
        <div className="px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full font-bold">
          Score: {score}
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Question {currentQ + 1} of {questions.length}</p>
        <h2 className="text-2xl font-semibold mb-8 dark:text-white">
          {questions[currentQ].q}
        </h2>
        
        <div className="space-y-4">
          {questions[currentQ].options.map((opt, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-lg ";
            
            if (selectedOpt === null) {
              btnClass += "border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:text-white";
            } else if (idx === questions[currentQ].a) {
              btnClass += "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            } else if (selectedOpt === idx) {
              btnClass += "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            } else {
              btnClass += "border-gray-200 dark:border-gray-700 opacity-50 dark:text-white";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOption(idx)}
                disabled={selectedOpt !== null}
                className={btnClass}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
