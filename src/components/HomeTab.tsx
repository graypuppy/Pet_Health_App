import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, Shield, Syringe, Bot, Languages, BookHeart, PhoneCall, ChevronRight, Bell } from 'lucide-react';
import AIAssistant from './AIAssistant';
import PetTranslator from './PetTranslator';

export default function HomeTab() {
  const [showAI, setShowAI] = useState(false);
  const [showTranslator, setShowTranslator] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-500 text-white p-6 pt-10 rounded-b-3xl shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full p-1 shadow-inner">
              <img 
                src="https://picsum.photos/seed/goldenretriever/200/200" 
                alt="Pet Avatar" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Max</h1>
              <p className="text-emerald-100 text-sm font-medium">金毛寻回犬 · 3岁2个月</p>
            </div>
          </div>
          <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
            <Bell size={20} />
          </button>
        </div>
      </header>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto pb-24">
        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-4">
          <StatusCard 
            icon={<Shield className="text-blue-500" size={24} />}
            title="驱虫状态"
            status="安全"
            date="下次: 2026-04-15"
            color="bg-blue-50"
          />
          <StatusCard 
            icon={<Syringe className="text-rose-500" size={24} />}
            title="疫苗状态"
            status="已接种"
            date="下次: 2026-10-20"
            color="bg-rose-50"
          />
        </div>

        {/* Main Grid Actions */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3 px-1">健康服务</h2>
          <div className="grid grid-cols-4 gap-3">
            <ActionItem icon={<Stethoscope size={28} className="text-emerald-600" />} label="全面检查" bg="bg-emerald-100" />
            <ActionItem icon={<Bot size={28} className="text-indigo-600" />} label="AI 助手" bg="bg-indigo-100" onClick={() => setShowAI(true)} />
            <ActionItem icon={<Languages size={28} className="text-amber-600" />} label="宠物翻译" bg="bg-amber-100" onClick={() => setShowTranslator(true)} />
            <ActionItem icon={<BookHeart size={28} className="text-purple-600" />} label="宠物百科" bg="bg-purple-100" />
          </div>
        </div>

        {/* SOS Banner */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-5 text-white shadow-lg flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <PhoneCall size={28} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg">紧急咨询 (SOS)</h3>
              <p className="text-red-100 text-sm">24小时在线兽医急救指导</p>
            </div>
          </div>
          <ChevronRight className="text-white/70" />
        </motion.div>

        {/* Recent Updates / Tips */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3 px-1">今日贴士</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex space-x-3">
              <img src="https://picsum.photos/seed/dogfood/100/100" alt="Tip" className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <div>
                <h4 className="font-bold text-gray-800 text-sm">春季换毛期护理指南</h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">春天到了，狗狗开始大量掉毛。建议每天梳理1-2次，可以有效减少家里的狗毛，同时促进狗狗皮肤血液循环...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
        {showTranslator && <PetTranslator onClose={() => setShowTranslator(false)} />}
      </AnimatePresence>
    </div>
  );
}

function StatusCard({ icon, title, status, date, color }: { icon: React.ReactNode, title: string, status: string, date: string, color: string }) {
  return (
    <div className={`${color} rounded-2xl p-4 flex flex-col justify-between shadow-sm border border-white/50`}>
      <div className="flex justify-between items-start mb-2">
        <div className="bg-white p-2 rounded-xl shadow-sm">
          {icon}
        </div>
        <span className="text-xs font-bold text-gray-700 bg-white/50 px-2 py-1 rounded-full">{status}</span>
      </div>
      <div>
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{date}</p>
      </div>
    </div>
  );
}

function ActionItem({ icon, label, bg, onClick }: { icon: React.ReactNode, label: string, bg: string, onClick?: () => void }) {
  return (
    <div className="flex flex-col items-center space-y-2 cursor-pointer group" onClick={onClick}>
      <div className={`${bg} w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
}
