import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function VoterRegistration() {
  const [activeStep, setActiveStep] = useState(0);
  
  // Form State
  const [age, setAge] = useState('');
  const [isCitizen, setIsCitizen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheckEligibility = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age: parseInt(age, 10), isCitizen })
      });
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({ isEligible: false, nextStep: "Error connecting to the server. Please ensure the backend is running." });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Smart Eligibility Check",
      id: "eligibility"
    },
    {
      title: "Required Documents",
      id: "documents",
      content: "Gather your proof of age (Birth certificate, PAN, Aadhaar) and proof of residence (Passport, Ration card, Electricity bill)."
    },
    {
      title: "Form 6 Submission",
      id: "form6",
      content: "Fill out Form 6 online on the Voter Service Portal or submit a physical copy to your Electoral Registration Officer (ERO)."
    },
    {
      title: "Verification",
      id: "verification",
      content: "A Booth Level Officer (BLO) may visit your residence to verify the details you provided."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Voter Registration Guide
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
          Verify your eligibility instantly and follow the steps to get your Voter ID card.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row min-h-[450px]">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-gray-50 dark:bg-slate-900/50 p-6 border-r border-gray-100 dark:border-gray-700">
            <ul className="space-y-3">
              {steps.map((step, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left px-5 py-4 rounded-xl transition-all flex items-center justify-between ${
                      activeStep === idx
                        ? 'bg-indigo-600 text-white font-bold shadow-lg scale-105'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-slate-800 font-medium'
                    }`}
                  >
                    {step.title}
                    {activeStep === idx && <ChevronRight size={18} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Content Area */}
          <div className="w-full md:w-2/3 p-8 lg:p-12 flex flex-col justify-center">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {steps[activeStep].title}
              </h2>
              
              {/* Step 0: Smart Checker */}
              {activeStep === 0 && (
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-400">Find out if you can vote in the upcoming elections using our AI eligibility checker.</p>
                  
                  <form onSubmit={handleCheckEligibility} className="space-y-5 bg-gray-50 dark:bg-slate-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">How old are you?</label>
                      <input 
                        type="number" 
                        required
                        min="1" max="120"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
                        placeholder="e.g. 21"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        id="citizen"
                        checked={isCitizen}
                        onChange={(e) => setIsCitizen(e.target.checked)}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 dark:bg-slate-800 dark:border-gray-600"
                      />
                      <label htmlFor="citizen" className="text-gray-700 dark:text-gray-300 font-medium">I am a citizen of India</label>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={loading || !age}
                      className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2 shadow-md"
                    >
                      {loading ? <><Loader2 className="animate-spin" size={20} /> Checking...</> : 'Check Eligibility'}
                    </button>
                  </form>

                  {/* Result Box */}
                  {result && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`p-5 rounded-2xl border ${result.isEligible ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'}`}
                    >
                      <div className="flex items-start gap-3">
                        {result.isEligible ? <CheckCircle2 className="text-green-600 mt-1" size={24} /> : <XCircle className="text-red-600 mt-1" size={24} />}
                        <div>
                          <h4 className={`font-bold text-lg mb-1 ${result.isEligible ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                            {result.isEligible ? 'You are Eligible!' : 'Not Eligible Yet'}
                          </h4>
                          <p className={`text-sm ${result.isEligible ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                            {result.nextStep}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Other Steps */}
              {activeStep > 0 && (
                <div className="space-y-8">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed bg-gray-50 dark:bg-slate-900/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    {steps[activeStep].content}
                  </p>
                  
                  {activeStep === 2 && (
                    <a 
                      href="https://voters.eci.gov.in/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all"
                    >
                      Visit NVSP Portal to Apply <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
