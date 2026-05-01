import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VotingSimulation() {
  const [step, setStep] = useState('auth'); // auth, voting, voted
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidates = [
    { id: 1, name: "Candidate A", party: "Party Alpha", symbol: "🌟" },
    { id: 2, name: "Candidate B", party: "Party Beta", symbol: "🌺" },
    { id: 3, name: "Candidate C", party: "Party Gamma", symbol: "🚲" },
    { id: 4, name: "NOTA", party: "None of the above", symbol: "❌" },
  ];

  const handleVote = () => {
    if (!selectedCandidate) return;
    setStep('voted');
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">EVM Simulation</h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border-4 border-gray-200 dark:border-gray-700 max-w-xl mx-auto">
        {step === 'auth' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Verify Identity</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">In a real booth, the polling officer verifies your ID and applies indelible ink to your finger.</p>
            <button 
              onClick={() => setStep('voting')}
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30"
            >
              Proceed to Voting Compartment
            </button>
          </div>
        )}

        {step === 'voting' && (
          <div>
            <div className="flex justify-between items-center mb-6 p-4 bg-gray-100 dark:bg-slate-900 rounded-xl">
              <span className="font-bold text-gray-700 dark:text-gray-300">Ready</span>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
            </div>
            
            <div className="space-y-3 mb-8">
              {candidates.map(c => (
                <div key={c.id} className="flex items-center gap-4 bg-gray-50 dark:bg-slate-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="text-3xl">{c.symbol}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg dark:text-white">{c.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{c.party}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedCandidate(c.id)}
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${
                      selectedCandidate === c.id 
                        ? 'bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.8)]' 
                        : 'bg-blue-100 border-blue-200 hover:bg-blue-200 dark:bg-blue-900/50 dark:border-blue-800'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full ${selectedCandidate === c.id ? 'bg-white/50' : 'bg-transparent'}`}></div>
                  </button>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleVote}
              disabled={!selectedCandidate}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                selectedCandidate 
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
              }`}
            >
              CAST VOTE
            </button>
          </div>
        )}

        {step === 'voted' && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-8 shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
            <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">BEEP!</h2>
            <p className="text-xl font-medium dark:text-white mb-8">Your vote has been recorded successfully.</p>
            <button 
              onClick={() => {setStep('auth'); setSelectedCandidate(null);}}
              className="px-6 py-2 bg-gray-200 dark:bg-slate-700 rounded-lg font-medium dark:text-white"
            >
              Restart Simulation
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
