import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Election Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    const newMessages = [...messages, { text: userMessage, isBot: false }];
    setMessages(newMessages);
    setInput("");
    
    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase();
      let responseText = "I'm not sure I understand. I can help you with voter registration, eligibility, finding your polling booth, or understanding EVMs.";
      
      if (lowerInput.includes("register") || lowerInput.includes("form 6")) {
        responseText = "To register to vote, you need to fill out Form 6. You can do this online on the Voter Service Portal or submit a physical copy to your local Electoral Registration Officer. Check the 'Registration' tab for a step-by-step guide!";
      } else if (lowerInput.includes("age") || lowerInput.includes("eligible") || lowerInput.includes("eligibility")) {
        responseText = "To be eligible to vote in India, you must be an Indian citizen and at least 18 years old on January 1st of the year the electoral roll is revised.";
      } else if (lowerInput.includes("evm") || lowerInput.includes("machine") || lowerInput.includes("how to vote") || lowerInput.includes("simulation")) {
        responseText = "When you vote, you'll use an EVM (Electronic Voting Machine). You simply press the blue button next to the candidate of your choice. A red light will blink and you'll hear a beep confirming your vote. Try our 'Simulation' tab to practice!";
      } else if (lowerInput.includes("booth") || lowerInput.includes("where") || lowerInput.includes("location") || lowerInput.includes("epic")) {
        responseText = "You can find your exact polling booth by entering your EPIC (Voter ID) number in our 'Booth Finder' section. It will show you the exact room and officer details.";
      } else if (lowerInput.includes("fake") || lowerInput.includes("news") || lowerInput.includes("whatsapp")) {
        responseText = "Fake news spreads quickly during elections. Always verify sensational headlines with official sources or fact-checking websites like AltNews before forwarding them on WhatsApp. Check our 'Fake News' tab for tips!";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        responseText = "Hello there! I'm here to help you navigate the Indian election process. Ask me about registration, voting, or booth locations!";
      }

      setMessages(prev => [...prev, { text: responseText, isBot: true }]);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all z-50 animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden flex flex-col"
            style={{ maxHeight: '600px', height: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Election Assistant</h3>
                  <p className="text-xs text-indigo-100">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-md transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isBot 
                      ? 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm' 
                      : 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 bg-gray-100 dark:bg-slate-900 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm dark:text-white"
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center"
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
