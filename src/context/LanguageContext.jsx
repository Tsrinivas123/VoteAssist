import { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    home: 'Home',
    dashboard: 'Dashboard',
    registration: 'Registration',
    flashcards: 'Flashcards',
    quizzes: 'Quizzes',
    simulation: 'Simulation',
    fakeNews: 'Fake News',
    boothFinder: 'Booth Finder',
    welcome: 'Empowering Your Vote',
    subtitle: 'Your complete guide to the Indian election process, step by step.',
    getStarted: 'Get Started',
    progress: 'Your Progress',
    // add more as needed
  },
  hi: {
    home: 'होम',
    dashboard: 'डैशबोर्ड',
    registration: 'पंजीकरण',
    flashcards: 'फ़्लैशकार्ड',
    quizzes: 'प्रश्नोत्तरी',
    simulation: 'सिमुलेशन',
    fakeNews: 'फ़ेक न्यूज़',
    boothFinder: 'बूथ खोजक',
    welcome: 'अपने वोट को सशक्त बनाएं',
    subtitle: 'भारतीय चुनाव प्रक्रिया के लिए आपका पूरा मार्गदर्शक, कदम दर कदम।',
    getStarted: 'शुरू करें',
    progress: 'आपकी प्रगति',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
