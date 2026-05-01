import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function FakeNews() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Combat Fake News</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Learn how to identify and stop the spread of misinformation during elections.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-3xl p-8 border border-red-100 dark:border-red-900/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 rounded-xl">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-400">Red Flags</h2>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-3 text-red-900 dark:text-red-200">
              <span className="font-bold">•</span>
              Outrageous or sensational headlines designed to trigger strong emotions.
            </li>
            <li className="flex gap-3 text-red-900 dark:text-red-200">
              <span className="font-bold">•</span>
              No reliable source or author mentioned.
            </li>
            <li className="flex gap-3 text-red-900 dark:text-red-200">
              <span className="font-bold">•</span>
              Manipulated images or old videos taken out of context.
            </li>
            <li className="flex gap-3 text-red-900 dark:text-red-200">
              <span className="font-bold">•</span>
              "Forwarded many times" tag on WhatsApp.
            </li>
          </ul>
        </div>
        
        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-3xl p-8 border border-teal-100 dark:border-teal-900/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-teal-100 dark:bg-teal-800 text-teal-600 dark:text-teal-300 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-2xl font-bold text-teal-800 dark:text-teal-400">How to Verify</h2>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-3 text-teal-900 dark:text-teal-200">
              <span className="font-bold">1.</span>
              Cross-check with official Election Commission channels or reputed news sites.
            </li>
            <li className="flex gap-3 text-teal-900 dark:text-teal-200">
              <span className="font-bold">2.</span>
              Use fact-checking websites (e.g., AltNews, BoomLive).
            </li>
            <li className="flex gap-3 text-teal-900 dark:text-teal-200">
              <span className="font-bold">3.</span>
              Perform a reverse image search on suspicious photos.
            </li>
            <li className="flex gap-3 text-teal-900 dark:text-teal-200">
              <span className="font-bold">4.</span>
              Report suspicious content on social media platforms.
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 text-center shadow-xl border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 dark:text-white">Remember the Golden Rule</h3>
        <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium">
          "Pause and verify before you share."
        </p>
      </div>
    </div>
  );
}
