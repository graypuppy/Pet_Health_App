import React, { useState } from 'react';
import { Home, Activity, Users, BookOpen, User, PlusCircle } from 'lucide-react';
import HomeTab from './components/HomeTab';
import HealthTab from './components/HealthTab';
import CommunityTab from './components/CommunityTab';
import WikiTab from './components/WikiTab';
import ProfileTab from './components/ProfileTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab />;
      case 'health': return <HealthTab />;
      case 'community': return <CommunityTab />;
      case 'wiki': return <WikiTab />;
      case 'profile': return <ProfileTab />;
      default: return <HomeTab />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 scroll-smooth">
        {renderTab()}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-2 py-2 pb-safe flex justify-between items-center z-50">
        <NavItem 
          icon={<Home size={24} />} 
          label="首页" 
          isActive={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
        />
        <NavItem 
          icon={<Activity size={24} />} 
          label="健康" 
          isActive={activeTab === 'health'} 
          onClick={() => setActiveTab('health')} 
        />
        <NavItem 
          icon={<Users size={24} />} 
          label="社区" 
          isActive={activeTab === 'community'} 
          onClick={() => setActiveTab('community')} 
        />
        <NavItem 
          icon={<BookOpen size={24} />} 
          label="百科" 
          isActive={activeTab === 'wiki'} 
          onClick={() => setActiveTab('wiki')} 
        />
        <NavItem 
          icon={<User size={24} />} 
          label="我的" 
          isActive={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
        />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 space-y-1 transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <div className={`${isActive ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
