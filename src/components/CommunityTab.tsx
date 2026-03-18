import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, AlertTriangle, MapPin, Play } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    user: 'Max妈妈',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    content: '今天带Max去公园玩飞盘，开心得像个两百斤的孩子！🐶🥏',
    media: 'https://picsum.photos/seed/dogpark/400/300',
    isVideo: true,
    likes: 128,
    comments: 32,
    time: '2小时前',
  },
  {
    id: 2,
    user: '铲屎官老李',
    avatar: 'https://picsum.photos/seed/user2/100/100',
    content: '求助：我家猫咪最近总是吐毛球，吃化毛膏也没用，大家有什么好办法吗？',
    media: null,
    isVideo: false,
    likes: 45,
    comments: 89,
    time: '5小时前',
  },
  {
    id: 3,
    user: '布偶猫Cici',
    avatar: 'https://picsum.photos/seed/user3/100/100',
    content: '新买的猫爬架到了，主子很满意！',
    media: 'https://picsum.photos/seed/cat/400/400',
    isVideo: false,
    likes: 342,
    comments: 56,
    time: '昨天',
  },
];

const mockSOS = [
  {
    id: 1,
    title: '寻狗启事 - 柯基',
    location: '朝阳区望京SOHO附近',
    time: '1小时前',
    desc: '黄白色柯基，名叫“土豆”，走失时戴着红色项圈。',
    urgent: true,
  },
  {
    id: 2,
    title: '紧急求助：狗狗误食巧克力',
    location: '在线求助',
    time: '15分钟前',
    desc: '刚吃了一小块黑巧克力，现在有点发抖，离医院还有半小时路程，该怎么急救？',
    urgent: true,
  }
];

export default function CommunityTab() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white px-4 pt-12 pb-2 shadow-sm z-10 sticky top-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">宠友圈</h1>
          <button className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-sm font-bold flex items-center">
            发布动态
          </button>
        </div>
        <div className="flex space-x-6 border-b border-gray-100">
          <button 
            className={`pb-3 text-sm font-bold relative ${activeTab === 'feed' ? 'text-gray-900' : 'text-gray-500'}`}
            onClick={() => setActiveTab('feed')}
          >
            推荐
            {activeTab === 'feed' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full" />}
          </button>
          <button 
            className={`pb-3 text-sm font-bold relative ${activeTab === 'sos' ? 'text-rose-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('sos')}
          >
            SOS 互助
            {activeTab === 'sos' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-rose-500 rounded-t-full" />}
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'feed' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            {mockPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </motion.div>
        )}

        {activeTab === 'sos' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-4">
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start space-x-3 mb-6">
              <AlertTriangle className="text-rose-500 shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-rose-800 text-sm">SOS 紧急求助说明</h3>
                <p className="text-xs text-rose-600/80 mt-1">此板块仅用于宠物走失、突发疾病等紧急情况。发布后将推送给附近3公里内的宠友及合作医院。</p>
                <button className="mt-3 bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:bg-rose-600 transition">
                  发布紧急求助
                </button>
              </div>
            </div>

            <h2 className="font-bold text-gray-800 mb-2">附近求助</h2>
            {mockSOS.map(sos => (
              <SOSCard key={sos.id} sos={sos} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function PostCard({ post }: any) {
  return (
    <div className="bg-white p-4 mb-2 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
          <div>
            <h4 className="font-bold text-gray-800 text-sm">{post.user}</h4>
            <span className="text-xs text-gray-400">{post.time}</span>
          </div>
        </div>
        <button className="text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-1 rounded-full">关注</button>
      </div>
      
      <p className="text-gray-700 text-sm mb-3 leading-relaxed">{post.content}</p>
      
      {post.media && (
        <div className="relative rounded-2xl overflow-hidden mb-3 aspect-video bg-gray-100">
          <img src={post.media} alt="Post media" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          {post.isVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="bg-white/30 backdrop-blur-md p-3 rounded-full">
                <Play className="text-white fill-white" size={24} />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-gray-500 pt-2 border-t border-gray-50">
        <button className="flex items-center space-x-1 hover:text-rose-500 transition">
          <Heart size={20} />
          <span className="text-xs font-medium">{post.likes}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-emerald-500 transition">
          <MessageCircle size={20} />
          <span className="text-xs font-medium">{post.comments}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-500 transition">
          <Share2 size={20} />
          <span className="text-xs font-medium">分享</span>
        </button>
      </div>
    </div>
  );
}

function SOSCard({ sos }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-rose-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
        紧急
      </div>
      <h3 className="font-bold text-gray-800 text-base pr-8">{sos.title}</h3>
      <div className="flex items-center space-x-4 mt-2 mb-3">
        <span className="flex items-center text-xs text-gray-500">
          <MapPin size={12} className="mr-1 text-gray-400" />
          {sos.location}
        </span>
        <span className="text-xs text-gray-400">{sos.time}</span>
      </div>
      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-xl">{sos.desc}</p>
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 bg-rose-50 text-rose-600 py-2 rounded-xl text-sm font-bold hover:bg-rose-100 transition">
          提供线索
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition">
          转发扩散
        </button>
      </div>
    </div>
  );
}
