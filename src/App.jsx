import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import { LanguageProvider } from './context/LanguageContext';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const VoterRegistration = lazy(() => import('./pages/VoterRegistration'));
const Flashcards = lazy(() => import('./pages/Flashcards'));
const Quizzes = lazy(() => import('./pages/Quizzes'));
const VotingSimulation = lazy(() => import('./pages/VotingSimulation'));
const FakeNews = lazy(() => import('./pages/FakeNews'));
const PollingBooth = lazy(() => import('./pages/PollingBooth'));

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/registration" element={<VoterRegistration />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/simulation" element={<VotingSimulation />} />
                <Route path="/fake-news" element={<FakeNews />} />
                <Route path="/booth-finder" element={<PollingBooth />} />
              </Routes>
            </Suspense>
          </main>
          
          <Chatbot />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
