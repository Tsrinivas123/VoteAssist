import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Trophy, BookOpen, Target, CreditCard, Calendar, MapPin, User, FileText, AlertCircle, Clock } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingElection = {
    name: "General Elections (Lok Sabha)",
    date: "April 15, 2029",
    daysLeft: 1079,
    status: "Upcoming"
  };

  const voterDetails = {
    name: "Rahul Sharma",
    epicNo: "ABC1234567",
    age: 28,
    gender: "Male",
    constituency: "New Delhi (ND-01)",
    partNo: "45",
    serialNo: "312",
    pollingStation: "Govt. Senior Secondary School, Sector 14, Room 4",
    status: "Active"
  };

  const applications = [
    { id: "APP-2026-8921", type: "Form 6 (New Registration)", date: "12 Feb 2026", status: "Approved", icon: <CheckCircle2 className="text-green-500" /> },
    { id: "APP-2026-9045", type: "Form 8 (Address Update)", date: "05 Mar 2026", status: "In Progress", icon: <Clock className="text-amber-500" /> }
  ];

  const renderDigitalID = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 shadow-2xl text-white relative overflow-hidden border border-indigo-400/30"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
            <CreditCard size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg uppercase tracking-wider">Elector's Photo Identity Card</h3>
            <p className="text-indigo-200 text-xs uppercase tracking-widest">Election Commission of India</p>
          </div>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md border border-white/20">
          {voterDetails.status}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-24 h-32 bg-indigo-900/50 rounded-xl border-2 border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
          <User size={48} className="text-indigo-300 opacity-50" />
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-y-4 gap-x-2 text-sm w-full">
          <div>
            <p className="text-indigo-200 text-xs uppercase mb-1">Elector Name</p>
            <p className="font-bold text-base">{voterDetails.name}</p>
          </div>
          <div>
            <p className="text-indigo-200 text-xs uppercase mb-1">EPIC No.</p>
            <p className="font-mono font-bold text-base bg-black/20 inline-block px-2 py-0.5 rounded">{voterDetails.epicNo}</p>
          </div>
          <div>
            <p className="text-indigo-200 text-xs uppercase mb-1">Age / Gender</p>
            <p className="font-medium">{voterDetails.age} / {voterDetails.gender}</p>
          </div>
          <div>
            <p className="text-indigo-200 text-xs uppercase mb-1">Assembly Constituency</p>
            <p className="font-medium">{voterDetails.constituency}</p>
          </div>
          <div className="col-span-2">
            <p className="text-indigo-200 text-xs uppercase mb-1">Part / Serial No.</p>
            <p className="font-medium">{voterDetails.partNo} / {voterDetails.serialNo}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">Citizen Portal Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your electoral profile and stay updated.</p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-1 rounded-xl flex shadow-sm border border-gray-200 dark:border-gray-700">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'applications' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
          >
            Applications
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - ID and Stats */}
          <div className="lg:col-span-2 space-y-8">
            {renderDigitalID()}
            
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-indigo-500" />
                <h2 className="text-xl font-bold dark:text-white">Your Polling Station</h2>
              </div>
              <div className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg dark:text-white mb-2">Government Senior Secondary School</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Sector 14, Main Road, New Delhi</p>
                <div className="flex gap-4">
                  <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-sm">
                    <span className="text-gray-500 dark:text-gray-400 block text-xs uppercase mb-1">Room No.</span>
                    <span className="font-bold dark:text-white">4</span>
                  </div>
                  <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-sm">
                    <span className="text-gray-500 dark:text-gray-400 block text-xs uppercase mb-1">Booth Level Officer</span>
                    <span className="font-bold dark:text-white">Mr. Sharma</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Countdown & Actions */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 shadow-xl text-white">
              <div className="flex justify-between items-start mb-4">
                <Calendar size={28} className="opacity-80" />
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md">
                  {upcomingElection.status}
                </span>
              </div>
              <h3 className="font-bold text-xl mb-1">{upcomingElection.name}</h3>
              <p className="text-amber-100 mb-6">{upcomingElection.date}</p>
              
              <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-md text-center border border-white/10">
                <p className="text-4xl font-black mb-1 tracking-tight">{upcomingElection.daysLeft}</p>
                <p className="text-amber-100 text-sm uppercase tracking-wider font-semibold">Days Remaining</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-4 dark:text-white flex items-center gap-2">
                <Trophy className="text-purple-500" size={20} />
                Learning Progress
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Modules Completed</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Quiz Score</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">850 / 1000</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-slate-900/50 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold dark:text-white">Track Applications</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Status of your submitted forms and requests</p>
            </div>
            <Link to="/registration" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2">
              <FileText size={16} />
              New Form
            </Link>
          </div>
          
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {applications.map((app, idx) => (
              <div key={idx} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-6">
                <div className="p-3 bg-gray-100 dark:bg-slate-900 rounded-2xl shrink-0">
                  <FileText size={28} className="text-indigo-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{app.type}</h3>
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-900 px-3 py-1 rounded-full text-sm font-medium">
                      {app.icon}
                      <span className="dark:text-gray-300">{app.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><span className="font-medium text-gray-700 dark:text-gray-300">Ref:</span> {app.id}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> Submitted: {app.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
