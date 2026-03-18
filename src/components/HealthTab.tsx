import { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, FileText, Activity, Plus, Clock } from 'lucide-react';

const weightData = [
  { name: '10月', weight: 28.5 },
  { name: '11月', weight: 29.0 },
  { name: '12月', weight: 29.2 },
  { name: '1月', weight: 28.8 },
  { name: '2月', weight: 29.5 },
  { name: '3月', weight: 29.3 },
];

export default function HealthTab() {
  const [activeSegment, setActiveSegment] = useState('overview');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white px-4 pt-12 pb-4 shadow-sm z-10 sticky top-0">
        <h1 className="text-2xl font-bold text-gray-900">健康管理</h1>
        <div className="flex space-x-2 mt-4 bg-gray-100 p-1 rounded-xl">
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeSegment === 'overview' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveSegment('overview')}
          >
            数据概览
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeSegment === 'records' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveSegment('records')}
          >
            病历/记录
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeSegment === 'schedule' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveSegment('schedule')}
          >
            日程提醒
          </button>
        </div>
      </header>

      <div className="p-4 flex-1 overflow-y-auto pb-24">
        {activeSegment === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Weight Chart */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-gray-800 flex items-center">
                  <Activity size={18} className="mr-2 text-emerald-500" />
                  体重趋势 (kg)
                </h2>
                <span className="text-emerald-600 font-bold text-lg">29.3</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      labelStyle={{ color: '#6b7280', fontWeight: 'bold' }}
                    />
                    <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                <h3 className="text-amber-800 font-bold text-sm mb-1">日均运动量</h3>
                <p className="text-2xl font-black text-amber-600">1.5 <span className="text-sm font-medium">小时</span></p>
                <p className="text-xs text-amber-600/70 mt-2">较上周 +10%</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <h3 className="text-blue-800 font-bold text-sm mb-1">饮水量</h3>
                <p className="text-2xl font-black text-blue-600">850 <span className="text-sm font-medium">ml</span></p>
                <p className="text-xs text-blue-600/70 mt-2">达标</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeSegment === 'records' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-gray-800">近期病历</h2>
              <button className="text-emerald-600 text-sm font-medium flex items-center">
                <Plus size={16} className="mr-1" /> 添加
              </button>
            </div>
            
            <RecordCard 
              date="2026-02-10" 
              title="常规体检" 
              hospital="瑞鹏宠物医院 (朝阳店)" 
              doctor="李医生"
              status="健康"
              icon={<FileText className="text-emerald-500" />}
            />
            <RecordCard 
              date="2025-11-05" 
              title="肠胃炎就诊" 
              hospital="美联众睿动物医院" 
              doctor="张医生"
              status="已康复"
              icon={<FileText className="text-rose-500" />}
            />
          </motion.div>
        )}

        {activeSegment === 'schedule' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-gray-800">即将到来</h2>
              <button className="text-emerald-600 text-sm font-medium flex items-center">
                <Plus size={16} className="mr-1" /> 添加
              </button>
            </div>

            <ScheduleCard 
              date="明天 10:00" 
              title="体内驱虫" 
              desc="拜宠清 1粒" 
              type="medication"
            />
            <ScheduleCard 
              date="4月15日 14:30" 
              title="洗澡美容" 
              desc="萌宠生活馆" 
              type="grooming"
            />
            <ScheduleCard 
              date="10月20日" 
              title="年度疫苗" 
              desc="狂犬 + 卫佳捌" 
              type="vaccine"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function RecordCard({ date, title, hospital, doctor, status, icon }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
      <div className="bg-gray-50 p-3 rounded-xl">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800">{title}</h3>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{hospital} · {doctor}</p>
        <div className="mt-2 inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
          {status}
        </div>
      </div>
    </div>
  );
}

function ScheduleCard({ date, title, desc, type }: any) {
  const colors = {
    medication: 'bg-blue-50 border-blue-100 text-blue-600',
    grooming: 'bg-purple-50 border-purple-100 text-purple-600',
    vaccine: 'bg-rose-50 border-rose-100 text-rose-600',
  };
  
  const colorClass = colors[type as keyof typeof colors] || 'bg-gray-50 border-gray-100 text-gray-600';

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Clock size={24} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
      </div>
      <div className="text-right">
        <span className="text-sm font-bold text-gray-700">{date}</span>
      </div>
    </div>
  );
}
