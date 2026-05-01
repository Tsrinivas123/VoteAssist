import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

export default function PollingBooth() {
  const [epicNo, setEpicNo] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!epicNo) return;
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        name: "Govt. Senior Secondary School",
        room: "Room No. 4",
        address: "Sector 14, Main Road, New Delhi",
        officer: "Mr. Sharma (BLO)",
        phone: "+91 9876543210"
      });
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Find Your Polling Booth</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Enter your EPIC (Voter ID) number to locate where you need to vote.</p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input 
            type="text" 
            value={epicNo}
            onChange={(e) => setEpicNo(e.target.value)}
            placeholder="Enter EPIC No. (e.g. ABC1234567)"
            className="flex-1 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white uppercase"
          />
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2"
          >
            <Search size={20} />
            Search
          </button>
        </form>
      </div>
      
      {result && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-900/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 rounded-xl mt-1">
              <MapPin size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{result.name}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{result.room}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{result.address}</p>
              
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-indigo-100 dark:border-gray-700 inline-block">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Booth Level Officer (BLO)</p>
                <p className="font-semibold text-gray-900 dark:text-white">{result.officer}</p>
                <p className="text-indigo-600 dark:text-indigo-400">{result.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
