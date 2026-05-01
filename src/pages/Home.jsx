import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, BookOpen, ShieldCheck, MapPin, Target } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  const features = [
    { icon: <BookOpen className="text-indigo-500" size={32} />, title: t('registration'), desc: 'Step-by-step guide to get your Voter ID.', path: '/registration' },
    { icon: <Target className="text-purple-500" size={32} />, title: t('simulation'), desc: 'Experience the EVM process virtually.', path: '/simulation' },
    { icon: <MapPin className="text-pink-500" size={32} />, title: t('boothFinder'), desc: 'Locate your polling booth easily.', path: '/booth-finder' },
    { icon: <ShieldCheck className="text-teal-500" size={32} />, title: t('fakeNews'), desc: 'Learn to identify and report fake news.', path: '/fake-news' },
  ];

  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white dark:from-indigo-900/20 dark:via-slate-900 dark:to-slate-900"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl px-4"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold text-sm">
            🇮🇳 Indian Election Assistant 2026
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 dark:text-white">
            {t('welcome')} <br />
            <span className="text-gradient">With Confidence.</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            {t('subtitle')} We make democracy accessible, understandable, and secure for every citizen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
              {t('getStarted')} <ArrowRight size={20} />
            </Link>
            <Link to="/simulation" className="px-8 py-4 rounded-xl glassmorphism dark:glassmorphism-dark font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
              Try EVM Simulation
            </Link>
          </div>
        </motion.div>
        
        {/* Floating elements animation */}
        <div className="absolute top-1/4 left-10 animate-float opacity-50 hidden lg:block">
          <div className="w-20 h-20 bg-indigo-200 dark:bg-indigo-800 rounded-full blur-2xl"></div>
        </div>
        <div className="absolute bottom-10 right-20 animate-float opacity-50 hidden lg:block" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 bg-purple-200 dark:bg-purple-800 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Indian Electoral Journey</h2>
          <p className="text-gray-600 dark:text-gray-400">Milestones of the world's largest democracy.</p>
        </div>
        
        <div className="relative border-l-4 border-indigo-200 dark:border-indigo-800 ml-4 md:ml-1/2">
          {[
            { year: "1950", title: "Election Commission Established", desc: "The Election Commission of India was formed on 25th January 1950." },
            { year: "1951-52", title: "First General Elections", desc: "Over 173 million voters participated in the first democratic elections." },
            { year: "1989", title: "Voting Age Reduced", desc: "The voting age was lowered from 21 to 18 years, empowering the youth." },
            { year: "1998", title: "Introduction of EVMs", desc: "Electronic Voting Machines were used for the first time on an experimental basis." },
            { year: "2013", title: "NOTA & VVPAT", desc: "Introduction of 'None of the Above' option and Voter Verifiable Paper Audit Trail." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="mb-10 ml-8 relative"
            >
              <span className="absolute -left-11 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white ring-4 ring-white dark:ring-slate-900">
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-bold text-gray-900 dark:text-white">
                {item.title} 
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 ml-3">
                  {item.year}
                </span>
              </h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Everything You Need to Vote</h2>
          <p className="text-gray-600 dark:text-gray-400">Interactive tools to guide you through the electoral process.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={feature.path} className="block h-full p-6 rounded-2xl glassmorphism dark:glassmorphism-dark hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="mb-4 inline-block p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
