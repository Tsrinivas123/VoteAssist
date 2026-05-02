import { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { validateEpicFormat } from '../utils/validators';

export default function PollingBooth() {
  const [epicNo, setEpicNo] = useState('');
  const [status, setStatus] = useState('idle'); // idle, validating, valid, invalid
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!epicNo) return;
    
    setStatus('validating');
    
    // Simulate network delay for UX
    setTimeout(() => {
      const cleanEpic = epicNo.trim().toUpperCase();
      if (validateEpicFormat(cleanEpic)) {
        setStatus('valid');
      } else {
        setStatus('invalid');
        setErrorMsg('Invalid Voter ID format. It should be 3 letters followed by 7 digits (e.g., ABC1234567).');
      }
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Secure EPIC Verification
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Validate your Voter ID format and securely access official electoral portals without compromising your private data.
        </p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 mb-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        
        <form onSubmit={handleSearch} className="relative z-10">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 ml-1">
            Enter your EPIC (Voter ID) Number
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input 
                type="text" 
                value={epicNo}
                onChange={(e) => {
                  setEpicNo(e.target.value.toUpperCase());
                  if(status !== 'idle') setStatus('idle');
                }}
                placeholder="e.g., ABC1234567"
                className={`w-full bg-gray-50 dark:bg-slate-900 border-2 rounded-xl px-6 py-4 text-lg outline-none transition-colors uppercase font-mono tracking-widest ${
                  status === 'invalid' 
                    ? 'border-red-400 focus:ring-red-500' 
                    : status === 'valid'
                    ? 'border-green-400 focus:ring-green-500'
                    : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:text-white'
                }`}
              />
              {status === 'valid' && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />}
              {status === 'invalid' && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" />}
            </div>
            
            <button 
              type="submit"
              disabled={status === 'validating' || !epicNo}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md flex justify-center items-center gap-2 disabled:opacity-70 min-w-[160px]"
            >
              {status === 'validating' ? (
                <span className="animate-pulse flex items-center gap-2">Verifying...</span>
              ) : (
                <><ShieldCheck size={20} /> Validate</>
              )}
            </button>
          </div>
          
          {/* Feedback Messages */}
          {status === 'invalid' && (
            <p className="text-red-500 mt-3 text-sm font-medium flex items-center gap-1.5 ml-1 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={16} /> {errorMsg}
            </p>
          )}
          {status === 'valid' && (
            <p className="text-green-600 dark:text-green-400 mt-3 text-sm font-bold flex items-center gap-1.5 ml-1 animate-in fade-in slide-in-from-top-1">
              <CheckCircle2 size={16} /> Valid format detected
            </p>
          )}
        </form>
      </div>

      {/* Official Verification Flow (Only shown if valid) */}
      {status === 'valid' && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-800 animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8 shadow-inner">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            <div className="p-4 bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 rounded-2xl shadow-sm">
              <ShieldAlert size={36} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Privacy & Security Notice</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                For strict privacy and security reasons, personal voter details and exact polling booth locations cannot be fetched or stored directly by third-party applications. We do not store or access your personal voter data.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://electoralsearch.eci.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Verify on Official ECI Website <ExternalLink size={18} />
                </a>
                
                <Link 
                  to="/dashboard"
                  className="bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-gray-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Generate Digital Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Trust Footer */}
      <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-12 bg-white/50 dark:bg-slate-800/50 py-4 px-6 rounded-3xl mx-auto">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-green-500" />
          <span>We adhere to strict data privacy guidelines. No EPIC data is saved on our servers.</span>
        </div>
        <p className="font-bold text-xs mt-1 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full">
          Disclaimer: This is a demo system. Real data is verified via official ECI sources.
        </p>
      </div>
    </div>
  );
}
