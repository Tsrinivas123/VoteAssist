import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VoterRegistration from './pages/VoterRegistration';
import Flashcards from './pages/Flashcards';
import Quizzes from './pages/Quizzes';
import VotingSimulation from './pages/VotingSimulation';
import FakeNews from './pages/FakeNews';
import PollingBooth from './pages/PollingBooth';
import Chatbot from './components/Chatbot';
import { LanguageProvider } from './context/LanguageContext';

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
          </main>
          
          <Chatbot />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
