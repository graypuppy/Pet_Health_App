import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, Volume2, Loader2, Languages } from 'lucide-react';

const translations = [
  "我饿了，快给我吃的！🥩",
  "陪我玩一会儿嘛！🎾",
  "这里是我的地盘！🐕",
  "我有点害怕，抱抱我。🥺",
  "今天天气真好，我们出去散步吧！☀️",
  "别碰我，我想自己待会儿。😾"
];

export default function PetTranslator({ onClose }: { onClose: () => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsTranslating(true);
      
      // Simulate translation delay
      setTimeout(() => {
        setIsTranslating(false);
        const randomTranslation = translations[Math.floor(Math.random() * translations.length)];
        setResult(randomTranslation);
      }, 2000);
    } else {
      setResult(null);
      setIsRecording(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[100] bg-gray-900 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <header className="px-4 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3 text-white">
            <Languages size={24} className="text-amber-400" />
            <h2 className="font-bold text-lg">宠物翻译器</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition text-white">
            <X size={20} />
          </button>
        </header>

        {/* Main Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-12 relative">
          
          {/* Visualizer / Status */}
          <div className="relative flex items-center justify-center w-64 h-64">
            {isRecording && (
              <>
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-20"
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.2, 0.8] }} 
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-4 bg-amber-400 rounded-full blur-lg opacity-30"
                />
              </>
            )}
            
            <div className={`w-40 h-40 rounded-full flex flex-col items-center justify-center z-10 transition-colors duration-500 ${
              isRecording ? 'bg-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.5)]' : 'bg-gray-800 border-4 border-gray-700'
            }`}>
              {isTranslating ? (
                <Loader2 size={48} className="text-white animate-spin" />
              ) : (
                <Mic size={48} className={isRecording ? 'text-white animate-pulse' : 'text-gray-400'} />
              )}
              
              {isRecording && (
                <span className="text-white font-mono mt-2 font-bold tracking-widest">{formatTime(timer)}</span>
              )}
            </div>
          </div>

          {/* Result Area */}
          <div className="h-32 w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isTranslating && (
                <motion.p 
                  key="translating"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-amber-400 font-medium text-lg animate-pulse"
                >
                  正在分析声纹特征...
                </motion.p>
              )}
              
              {result && !isTranslating && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl w-full text-center relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <Volume2 size={14} className="mr-1" /> 翻译结果
                  </div>
                  <p className="text-white text-xl font-bold leading-relaxed">{result}</p>
                </motion.div>
              )}
              
              {!isRecording && !isTranslating && !result && (
                <motion.p 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 text-center"
                >
                  点击下方按钮开始录音，<br/>让AI帮你听懂毛孩子的心声
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="pb-12">
            <button 
              onClick={handleRecord}
              disabled={isTranslating}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-90 ${
                isRecording 
                  ? 'bg-rose-500 hover:bg-rose-600 shadow-[0_0_20px_rgba(243,24,73,0.4)]' 
                  : 'bg-white hover:bg-gray-100 shadow-lg'
              } ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRecording ? (
                <div className="w-6 h-6 bg-white rounded-sm" />
              ) : (
                <Mic size={32} className="text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
