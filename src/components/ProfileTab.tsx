import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Settings, FileText, Heart, Bell, ChevronRight, LogOut } from 'lucide-react';

export default function ProfileTab() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col h-full bg-gray-50 items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">欢迎来到 Pet Health</h2>
          <p className="text-gray-500 mb-8 text-sm">登录以管理您的宠物健康记录和参与社区互动</p>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-md hover:bg-emerald-600 transition-colors"
          >
            一键登录 / 注册
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-emerald-500 px-4 pt-12 pb-24 shadow-md relative rounded-b-[40px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">我的主页</h1>
          <button className="text-white/80 hover:text-white transition">
            <Settings size={24} />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <img 
            src="https://picsum.photos/seed/user1/200/200" 
            alt="User Avatar" 
            className="w-16 h-16 rounded-full border-2 border-white/50 object-cover"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="text-xl font-bold text-white">Max妈妈</h2>
            <p className="text-emerald-100 text-sm mt-1">ID: 8847291</p>
          </div>
        </div>
      </header>

      <div className="px-4 flex-1 overflow-y-auto pb-24 -mt-16 relative z-10 space-y-4">
        {/* Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 grid grid-cols-3 divide-x divide-gray-100 text-center">
          <div>
            <p className="text-xl font-black text-gray-800">12</p>
            <p className="text-xs text-gray-500 mt-1">我的发布</p>
          </div>
          <div>
            <p className="text-xl font-black text-gray-800">45</p>
            <p className="text-xs text-gray-500 mt-1">获赞</p>
          </div>
          <div>
            <p className="text-xl font-black text-gray-800">8</p>
            <p className="text-xs text-gray-500 mt-1">收藏</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <MenuItem icon={<FileText className="text-blue-500" />} label="我的病历" />
          <MenuItem icon={<Heart className="text-rose-500" />} label="我的收藏" />
          <MenuItem icon={<Bell className="text-amber-500" />} label="消息通知" badge="3" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <MenuItem icon={<Settings className="text-gray-500" />} label="通用设置" />
          <MenuItem icon={<User className="text-indigo-500" />} label="账号与安全" />
        </div>

        <button 
          onClick={() => setIsLoggedIn(false)}
          className="w-full bg-white text-rose-500 font-bold py-4 rounded-2xl shadow-sm border border-gray-100 hover:bg-rose-50 transition flex items-center justify-center space-x-2"
        >
          <LogOut size={20} />
          <span>退出登录</span>
        </button>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, badge }: { icon: React.ReactNode, label: string, badge?: string }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 transition">
      <div className="flex items-center space-x-3">
        <div className="bg-gray-50 p-2 rounded-xl">
          {icon}
        </div>
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        {badge && (
          <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </div>
  );
}
