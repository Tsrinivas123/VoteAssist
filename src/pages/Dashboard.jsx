import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Trophy, CreditCard, Calendar, MapPin, User, FileText, Clock, Shield, ExternalLink, ShieldAlert } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [hasSetupProfile, setHasSetupProfile] = useState(false);
  
  // Dynamic User Input State without fake defaults
  const [voterDetails, setVoterDetails] = useState({
    name: "",
    epicNo: "",
    age: "",
    gender: "Male",
    state: "",
    constituency: "",
    status: "Active"
  });

  const handleProfileSetup = (e) => {
    e.preventDefault();
    if(voterDetails.name && voterDetails.epicNo && voterDetails.age && voterDetails.state && voterDetails.constituency) {
      setHasSetupProfile(true);
    }
  };

  const upcomingElection = {
    name: "General Elections (Lok Sabha)",
    date: "April 15, 2029",
    daysLeft: 1079,
    status: "Upcoming"
  };

  const applications = [
    { id: "APP-2026-8921", type: "Form 6 (New Registration)", date: "12 Feb 2026", status: "Approved", icon: <CheckCircle2 className="text-green-500" /> },
    { id: "APP-2026-9045", type: "Form 8 (Address Update)", date: "05 Mar 2026", status: "In Progress", icon: <Clock className="text-amber-500" /> }
  ];

  if (!hasSetupProfile) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-700 text-center"
        >
          <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400">
            <Shield size={36} />
          </div>
          <h1 className="text-3xl font-extrabold mb-4 dark:text-white">Setup Your Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Enter your details to generate your personalized digital voter dashboard. Your privacy is protected.</p>
          
          <form onSubmit={handleProfileSetup} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input required type="text" value={voterDetails.name} onChange={e => setVoterDetails({...voterDetails, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white" placeholder="e.g. Rahul Sharma" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">EPIC Number (Voter ID)</label>
              <input required type="text" value={voterDetails.epicNo} onChange={e => setVoterDetails({...voterDetails, epicNo: e.target.value.toUpperCase()})} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white uppercase" placeholder="e.g. ABC1234567" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Age</label>
                <input required type="number" min="18" value={voterDetails.age} onChange={e => setVoterDetails({...voterDetails, age: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white" placeholder="18+" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                <select value={voterDetails.gender} onChange={e => setVoterDetails({...voterDetails, gender: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">State</label>
                <input required type="text" value={voterDetails.state} onChange={e => setVoterDetails({...voterDetails, state: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white" placeholder="e.g. Delhi" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Constituency</label>
                <input required type="text" value={voterDetails.constituency} onChange={e => setVoterDetails({...voterDetails, constituency: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white" placeholder="e.g. New Delhi" />
              </div>
            </div>
            <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md mt-4">
              Generate Digital Profile
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
              <ShieldAlert size={14} />
              <span>We do not access or store real voter data.</span>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  const renderDigitalID = () => (
    <div className="space-y-3">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 md:p-8 shadow-2xl text-white relative overflow-hidden border border-indigo-400/30"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
              <CreditCard size={28} />
            </div>
            <div>
              <h3 className="font-bold text-xl uppercase tracking-wider">Digital Voter Profile (Demo)</h3>
              <p className="text-indigo-200 text-xs uppercase tracking-widest mt-1">Simulated Election Application</p>
            </div>
          </div>
          <div className="bg-green-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase backdrop-blur-md border border-green-400/30 text-green-100 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            {voterDetails.status}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-32 h-40 bg-indigo-900/50 rounded-2xl border-2 border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
            <User size={64} className="text-indigo-300 opacity-50" />
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-y-6 gap-x-4 text-sm w-full">
            <div>
              <p className="text-indigo-200 text-xs uppercase tracking-wider mb-1">Elector Name</p>
              <p className="font-bold text-lg">{voterDetails.name}</p>
            </div>
            <div>
              <p className="text-indigo-200 text-xs uppercase tracking-wider mb-1">EPIC No.</p>
              <p className="font-mono font-bold text-lg bg-black/20 inline-block px-3 py-1 rounded-lg border border-white/10">{voterDetails.epicNo}</p>
            </div>
            <div>
              <p className="text-indigo-200 text-xs uppercase tracking-wider mb-1">Age / Gender</p>
              <p className="font-medium text-base">{voterDetails.age} / {voterDetails.gender}</p>
            </div>
            <div>
              <p className="text-indigo-200 text-xs uppercase tracking-wider mb-1">State</p>
              <p className="font-medium text-base">{voterDetails.state}</p>
            </div>
            <div className="col-span-2 bg-white/10 p-3 rounded-xl border border-white/10">
              <p className="text-indigo-200 text-xs uppercase tracking-wider mb-1">Assembly Constituency</p>
              <p className="font-bold text-base">{voterDetails.constituency}</p>
            </div>
          </div>
        </div>
      </motion.div>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center flex justify-center items-center gap-1.5 px-4">
        <ShieldAlert size={14} className="shrink-0" />
        This is a simulated profile generated for educational purposes and does not represent official government data.
      </p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Welcome, {voterDetails.name.split(' ')[0]} 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your electoral profile and stay updated.</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-1.5 rounded-xl flex shadow-sm border border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'applications' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
          >
            Applications
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Success Banner */}
            <div className="col-span-1 lg:col-span-3">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full text-green-600 dark:text-green-300">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 dark:text-green-300">Profile created successfully!</h4>
                    <p className="text-sm text-green-700 dark:text-green-400">Next Step: Verify your polling booth on the official website below.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column - ID and Stats */}
            <div className="lg:col-span-2 space-y-8">
              {renderDigitalID()}
              
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <MapPin size={120} />
                </div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <MapPin size={24} />
                  </div>
                  <h2 className="text-2xl font-bold dark:text-white">Find Your Official Polling Booth</h2>
                </div>
                <div className="relative z-10">
                  <p className="text-gray-600 dark:text-gray-400 mb-8 font-medium leading-relaxed max-w-lg">
                    For accurate, secure, and up-to-date polling station details, please verify your EPIC number directly through the official Election Commission portal.
                  </p>
                  <a 
                    href="https://electoralsearch.eci.gov.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Find My Booth <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Countdown & Actions */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Calendar size={80} />
                </div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <span className="bg-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase backdrop-blur-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    {upcomingElection.status}
                  </span>
                </div>
                <h3 className="font-bold text-2xl mb-2 relative z-10 leading-tight">{upcomingElection.name}</h3>
                <p className="text-amber-100 mb-8 font-medium relative z-10">{upcomingElection.date}</p>
                
                <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-md text-center border border-white/10 relative z-10">
                  <p className="text-5xl font-black mb-2 tracking-tight">{upcomingElection.daysLeft}</p>
                  <p className="text-amber-100 text-sm uppercase tracking-widest font-bold">Days Remaining</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-xl mb-6 dark:text-white flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-purple-600 dark:text-purple-400">
                    <Trophy size={20} />
                  </div>
                  Voter Readiness
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300">Profile Completeness</span>
                      <span className="font-black text-indigo-600 dark:text-indigo-400">100%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full shadow-inner" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300">Masterclass Quiz</span>
                      <span className="font-black text-purple-600 dark:text-purple-400">850 / 1000</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full shadow-inner" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Privacy Notice Footer */}
            <div className="col-span-1 lg:col-span-3 mt-4">
              <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-800 py-4 px-6 rounded-2xl mx-auto text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                <Shield size={20} className="text-indigo-500 shrink-0" />
                <span><strong>Data Privacy Notice:</strong> We do not access or store real voter data. Users are strictly guided to official sources for verification.</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'applications' && (
          <motion.div 
            key="applications"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-8 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-slate-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold dark:text-white">Track Applications</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Status of your submitted forms and requests</p>
              </div>
              <Link to="/registration" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all flex items-center gap-2">
                <FileText size={18} />
                Submit New Form
              </Link>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {applications.map((app, idx) => (
                <div key={idx} className="p-6 md:p-8 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl shrink-0 text-indigo-600 dark:text-indigo-400">
                    <FileText size={32} />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl">{app.type}</h3>
                      <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border ${app.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800'}`}>
                        {app.icon}
                        <span>{app.status}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <span className="flex items-center gap-1.5"><span className="text-gray-400">Ref:</span> <span className="font-mono text-gray-700 dark:text-gray-300">{app.id}</span></span>
                      <span className="hidden md:inline">•</span>
                      <span className="flex items-center gap-1.5"><Calendar size={16} /> Submitted: {app.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
