import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { validateEpicFormat } from '../utils/validators';

export default function VotingSimulation() {
  const [step, setStep] = useState('auth'); // auth, verified, voting, printing, voted
  const [epicNumber, setEpicNumber] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const candidates = [
    { id: 1, name: "Arjun Singh", party: "Development Party", symbol: "🌟" },
    { id: 2, name: "Priya Patel", party: "Progressive Alliance", symbol: "🌺" },
    { id: 3, name: "Rahul Kumar", party: "Citizen First Front", symbol: "🚲" },
    { id: 4, name: "NOTA", party: "None of the Above", symbol: "❌" },
  ];

  const handleVerify = (e) => {
    e.preventDefault();
    if (!epicNumber) return;
    
    if (!validateEpicFormat(epicNumber)) {
      setErrorMsg('Invalid format. Use 3 letters and 7 digits (e.g., ABC1234567)');
      return;
    }
    setErrorMsg('');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('verified');
      setTimeout(() => setStep('voting'), 2500);
    }, 1500);
  };

  const handleVote = (id) => {
    setSelectedCandidate(id);
    setStep('printing');
    
    // Simulate VVPAT printing and beep
    setTimeout(() => {
      setStep('voted');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Electronic Voting Machine (EVM)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Experience the exact voting procedure step-by-step.</p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden border-4 border-gray-200 dark:border-gray-700 max-w-2xl mx-auto relative min-h-[500px] flex flex-col">
        
        {/* Status Bar */}
        <div className="bg-gray-100 dark:bg-slate-900 px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-green-600 dark:text-green-500" />
            <span className="font-bold text-sm text-gray-700 dark:text-gray-300 tracking-wider">SECURE BOOTH</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{step === 'voting' ? 'EVM Active' : 'Waiting'}</span>
            <div className={`w-3 h-3 rounded-full ${step === 'voting' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`}></div>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Verification */}
            {step === 'auth' && (
              <motion.div 
                key="auth"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm mx-auto"
              >
                <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
                  <Fingerprint size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-center dark:text-white">Verify Identity</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-8">Enter your EPIC (Voter ID) number to enter the polling booth.</p>
                
                <form onSubmit={handleVerify} className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="e.g. ABC1234567" 
                    value={epicNumber}
                    onChange={(e) => { setEpicNumber(e.target.value.toUpperCase()); setErrorMsg(''); }}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-gray-600 rounded-xl font-mono text-center text-xl tracking-widest uppercase focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                  />
                  {errorMsg && <p className="text-red-500 text-sm font-bold text-center">{errorMsg}</p>}
                  <button 
                    type="submit" 
                    disabled={!epicNumber || isVerifying}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md flex justify-center items-center gap-2 disabled:opacity-50"
                  >
                    {isVerifying ? <span className="animate-pulse">Verifying Database...</span> : 'Proceed to Booth'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Ink Applied */}
            {step === 'verified' && (
              <motion.div 
                key="verified"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Identity Verified</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">Indelible ink has been applied to your left index finger.</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-4 animate-pulse">Entering Voting Compartment...</p>
              </motion.div>
            )}

            {/* Step 3: EVM Machine */}
            {step === 'voting' && (
              <motion.div 
                key="voting"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <div className="bg-[#e5e7eb] dark:bg-[#1e293b] p-6 rounded-2xl border-b-8 border-r-8 border-gray-300 dark:border-slate-900 shadow-inner">
                  <div className="space-y-3">
                    {candidates.map((c, idx) => (
                      <div key={c.id} className="flex items-center gap-4 bg-white dark:bg-slate-700 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600">
                        <div className="w-8 font-bold text-gray-400 dark:text-gray-500 text-center">{idx + 1}</div>
                        <div className="text-3xl w-12 text-center">{c.symbol}</div>
                        <div className="flex-1 border-l-2 border-gray-200 dark:border-gray-600 pl-4">
                          <h3 className="font-bold text-lg dark:text-white leading-tight uppercase">{c.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">{c.party}</p>
                        </div>
                        
                        <div className="w-12 flex justify-center">
                          <div className={`w-4 h-4 rounded-full ${selectedCandidate === c.id ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-red-900/20'}`}></div>
                        </div>

                        <button 
                          onClick={() => handleVote(c.id)}
                          className="w-16 h-12 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-[inset_0_-4px_0_rgba(0,0,0,0.2),0_4px_0_rgba(0,0,0,0.2)] active:shadow-[inset_0_2px_0_rgba(0,0,0,0.2),0_0px_0_rgba(0,0,0,0.2)] active:translate-y-[4px] transition-all"
                          aria-label={`Vote for ${c.name}`}
                        ></button>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-center mt-6 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                  <AlertCircle size={16} /> Press the Blue Button to Cast Vote
                </p>
              </motion.div>
            )}

            {/* Step 4: VVPAT Printing */}
            {step === 'printing' && (
              <motion.div 
                key="printing"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <div className="w-48 h-64 bg-gray-200 dark:bg-slate-900 rounded-xl relative overflow-hidden border-4 border-gray-300 dark:border-gray-700 flex justify-center shadow-inner">
                  <div className="absolute top-0 w-full h-8 bg-black"></div>
                  {/* Paper Slip Animation */}
                  <motion.div 
                    initial={{ y: -150 }} animate={{ y: 30 }} transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-36 h-48 bg-white absolute shadow-md p-4 flex flex-col items-center justify-center border border-gray-200"
                  >
                    <span className="text-4xl mb-4">{candidates.find(c => c.id === selectedCandidate)?.symbol}</span>
                    <span className="font-bold text-black text-center text-sm uppercase">{candidates.find(c => c.id === selectedCandidate)?.name}</span>
                    <span className="text-xs text-gray-500 mt-2">VVPAT SLIP</span>
                  </motion.div>
                  {/* Glass Window Overlay */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] border-8 border-transparent"></div>
                </div>
                <h3 className="text-xl font-bold mt-8 dark:text-white animate-pulse text-red-600">BEEEEEP!</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Printing VVPAT Slip for 7 seconds...</p>
              </motion.div>
            )}

            {/* Step 5: Final Confirmation */}
            {step === 'voted' && (
              <motion.div 
                key="voted"
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold mb-4 dark:text-white">Vote Cast Successfully</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">Thank you for participating in the democratic process. Your vote is secure and confidential.</p>
                <button 
                  onClick={() => {setStep('auth'); setEpicNumber(''); setSelectedCandidate(null);}}
                  className="px-8 py-3 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors shadow-sm"
                >
                  Start Over
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
