import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, Shield, Syringe, Bot, Languages, BookHeart, PhoneCall, ChevronRight, Bell, ChevronDown, Check, Plus, X } from 'lucide-react';
import AIAssistant from './AIAssistant';
import PetTranslator from './PetTranslator';
import { usePet } from '../contexts/PetContext';

export default function HomeTab() {
  const [showAI, setShowAI] = useState(false);
  const [showTranslator, setShowTranslator] = useState(false);
  const [showPetSelector, setShowPetSelector] = useState(false);
  const { currentPet } = usePet();

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-500 text-white p-6 pt-10 rounded-b-3xl shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="flex justify-between items-center relative z-10">
          <div 
            className="flex items-center space-x-4 cursor-pointer hover:bg-white/10 p-2 -ml-2 rounded-2xl transition"
            onClick={() => setShowPetSelector(true)}
          >
            <div className="w-16 h-16 bg-white rounded-full p-1 shadow-inner relative">
              <img 
                src={currentPet?.avatar} 
                alt="Pet Avatar" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 bg-emerald-600 rounded-full p-0.5 border-2 border-white">
                <ChevronDown size={12} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{currentPet?.name}</h1>
              <p className="text-emerald-100 text-sm font-medium">{currentPet?.breed} · {currentPet?.age}</p>
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
            date={`下次: ${currentPet?.nextDeworming}`}
            color="bg-blue-50"
          />
          <StatusCard 
            icon={<Syringe className="text-rose-500" size={24} />}
            title="疫苗状态"
            status="已接种"
            date={`下次: ${currentPet?.nextVaccine}`}
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
        {showPetSelector && <PetSelector onClose={() => setShowPetSelector(false)} />}
      </AnimatePresence>
    </div>
  );
}

function PetSelector({ onClose }: { onClose: () => void }) {
  const { pets, currentPetId, setCurrentPetId } = usePet();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/50 flex items-end justify-center"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-white w-full max-w-md rounded-t-3xl p-6 pb-12"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">切换宠物</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-4">
          {pets.map(pet => (
            <div 
              key={pet.id}
              onClick={() => {
                setCurrentPetId(pet.id);
                onClose();
              }}
              className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                currentPetId === pet.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 hover:border-emerald-200'
              }`}
            >
              <img src={pet.avatar} alt={pet.name} className="w-14 h-14 rounded-full object-cover mr-4" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{pet.name}</h3>
                <p className="text-sm text-gray-500">{pet.breed} · {pet.age}</p>
              </div>
              {currentPetId === pet.id && (
                <div className="bg-emerald-500 text-white p-1 rounded-full">
                  <Check size={16} />
                </div>
              )}
            </div>
          ))}
          
          <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 font-bold flex items-center justify-center hover:bg-gray-50 hover:border-emerald-300 hover:text-emerald-600 transition-colors">
            <Plus size={20} className="mr-2" />
            添加新宠物
          </button>
        </div>
      </motion.div>
    </motion.div>
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
