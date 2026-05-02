import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Election AI Assistant. I can help you with eligibility, registration, and EVM instructions. How can I help today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const quickReplies = ["Am I eligible?", "How to register?", "Find my booth"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendText = (userMessage) => {
    if (!userMessage.trim()) return;
    
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    
    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase();
      let responseText = "I'm not sure I understand. I can help you with voter registration, eligibility, finding your polling booth, or understanding EVMs.";
      
      if (lowerInput.includes("register") || lowerInput.includes("form 6")) {
        responseText = "To register to vote, you need to fill out Form 6. You can do this online on the Voter Service Portal or submit a physical copy to your local Electoral Registration Officer. Check the 'Registration' tab for a step-by-step guide!";
      } else if (lowerInput.includes("am i eligible") || lowerInput.includes("age") || lowerInput.includes("eligible") || lowerInput.includes("eligibility")) {
        responseText = "To be eligible to vote in India, you must be an Indian citizen and at least 18 years old on January 1st of the year the electoral roll is revised. You can use our Eligibility Checker in the Registration tab!";
      } else if (lowerInput.includes("evm") || lowerInput.includes("machine") || lowerInput.includes("how to vote") || lowerInput.includes("how to use evm") || lowerInput.includes("simulation")) {
        responseText = "When you vote, you'll use an EVM (Electronic Voting Machine). You simply press the blue button next to the candidate of your choice. A red light will blink and you'll hear a beep confirming your vote. Try our 'Simulation' tab to practice!";
      } else if (lowerInput.includes("booth") || lowerInput.includes("where") || lowerInput.includes("where is my booth") || lowerInput.includes("location") || lowerInput.includes("epic")) {
        responseText = "You can find your exact polling booth by entering your EPIC (Voter ID) number in our 'Booth Finder' section. It will show you the exact room and officer details. Remember, we guide you to official sources for security!";
      } else if (lowerInput.includes("fake") || lowerInput.includes("news") || lowerInput.includes("whatsapp")) {
        responseText = "Fake news spreads quickly during elections. Always verify sensational headlines with official sources or fact-checking websites like AltNews before forwarding them on WhatsApp. Check our 'Fake News' tab for tips!";
      } else if (lowerInput.includes("score") || lowerInput.includes("dashboard") || lowerInput.includes("readiness")) {
        responseText = "Your Voter Readiness Score helps you track how prepared you are for election day! It increases as you complete your profile, verify your booth, and take the Masterclass quiz.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        responseText = "Hello there! I'm here to help you navigate the Indian election process. Ask me about registration, voting, or booth locations!";
      }

      setMessages(prev => [...prev, { text: responseText, isBot: true }]);
    }, 800);
  };

  const handleSend = () => {
    handleSendText(input);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all z-50 animate-bounce focus:outline-none focus:ring-4 focus:ring-indigo-300"
        style={{ animationDuration: '3s' }}
        aria-label="Open Chatbot"
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden flex flex-col"
            style={{ maxHeight: '650px', height: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-wide">Election AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <p className="text-xs text-indigo-100 font-medium">Online</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-slate-900/50 scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex items-end gap-2 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.isBot && <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0"><Bot size={14} className="text-indigo-600 dark:text-indigo-400" /></div>}
                  <div className={`max-w-[75%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isBot 
                      ? 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm' 
                      : 'bg-indigo-600 text-white rounded-br-none shadow-md'
                  }`}>
                    {msg.text}
                  </div>
                  {!msg.isBot && <div className="w-6 h-6 rounded-full bg-indigo-200 dark:bg-indigo-800 flex items-center justify-center shrink-0"><User size={14} className="text-indigo-700 dark:text-indigo-300" /></div>}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-gray-50 dark:bg-slate-900/80 border-t border-gray-200 dark:border-gray-700 flex gap-2 overflow-x-auto scrollbar-hide snap-x">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendText(reply)}
                  className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors shadow-sm snap-start"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 flex gap-2 items-end">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about elections..."
                className="flex-1 bg-gray-100 dark:bg-slate-900 border border-transparent rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm dark:text-white transition-all shadow-inner"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
