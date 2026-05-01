import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';

export default function VoterRegistration() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Eligibility Check",
      content: "You must be an Indian citizen and 18 years of age or older on the qualifying date (usually January 1st of the year of revision of electoral roll)."
    },
    {
      title: "Required Documents",
      content: "Gather your proof of age (Birth certificate, PAN, Aadhaar) and proof of residence (Passport, Ration card, Electricity bill)."
    },
    {
      title: "Form 6 Submission",
      content: "Fill out Form 6 online on the Voter Service Portal or submit a physical copy to your Electoral Registration Officer (ERO)."
    },
    {
      title: "Verification",
      content: "A Booth Level Officer (BLO) may visit your residence to verify the details you provided."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Voter Registration Guide</h1>
        <p className="text-gray-600 dark:text-gray-400">Everything you need to know to get your Voter ID card.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 bg-gray-50 dark:bg-slate-900/50 p-6 border-r border-gray-100 dark:border-gray-700">
            <ul className="space-y-2">
              {steps.map((step, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                      activeStep === idx
                        ? 'bg-indigo-600 text-white font-medium shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    Step {idx + 1}
                    {activeStep === idx && <ChevronRight size={16} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full md:w-2/3 p-8 flex items-center min-h-[300px]">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                {steps[activeStep].title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {steps[activeStep].content}
              </p>
              
              {activeStep === 2 && (
                <a 
                  href="https://voters.eci.gov.in/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-xl font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  Visit NVSP Portal <ExternalLink size={16} />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
