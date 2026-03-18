import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AIAssistant({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: '你好！我是你的宠物健康AI助手。你可以问我关于宠物疾病、日常护理、饮食营养等问题。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `作为一名专业的宠物医生和宠物健康专家，请回答以下问题：${userMessage}`,
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || '抱歉，我暂时无法回答这个问题。' }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: '抱歉，网络出现了一些问题，请稍后再试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[100] bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl"
      >
        {/* Header */}
        <header className="bg-white px-4 py-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Bot className="text-indigo-600" size={24} />
            </div>
            <div>
              <h2 className="font-bold text-gray-800">AI 智能问诊</h2>
              <p className="text-xs text-green-500 font-medium flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                在线
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <X size={20} className="text-gray-600" />
          </button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-emerald-100 ml-2' : 'bg-indigo-100 mr-2'}`}>
                  {msg.role === 'user' ? <User size={16} className="text-emerald-600" /> : <Bot size={16} className="text-indigo-600" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-500 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] flex-row">
                <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-indigo-100 mr-2">
                  <Bot size={16} className="text-indigo-600" />
                </div>
                <div className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-500 rounded-tl-none shadow-sm flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-xs">正在思考...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 border-t border-gray-100 pb-safe">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-full p-1 border border-gray-200">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="描述宠物的症状或问题..."
              className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none text-gray-800"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-full flex items-center justify-center transition ${
                input.trim() && !isLoading ? 'bg-emerald-500 text-white shadow-md' : 'bg-gray-200 text-gray-400'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
