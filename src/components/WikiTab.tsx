import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Book, Bone, Stethoscope, HeartHandshake, ChevronRight } from 'lucide-react';

const categories = [
  { id: 'diet', name: '饮食营养', icon: <Bone size={24} className="text-amber-500" />, color: 'bg-amber-50' },
  { id: 'health', name: '疾病防治', icon: <Stethoscope size={24} className="text-rose-500" />, color: 'bg-rose-50' },
  { id: 'behavior', name: '行为训练', icon: <HeartHandshake size={24} className="text-indigo-500" />, color: 'bg-indigo-50' },
  { id: 'daily', name: '日常护理', icon: <Book size={24} className="text-emerald-500" />, color: 'bg-emerald-50' },
];

const articles = [
  { id: 1, title: '幼犬到家第一周，你需要准备什么？', category: '日常护理', views: '1.2w', image: 'https://picsum.photos/seed/puppy/200/200' },
  { id: 2, title: '猫咪乱尿怎么办？行为纠正指南', category: '行为训练', views: '8k', image: 'https://picsum.photos/seed/catlitter/200/200' },
  { id: 3, title: '常见寄生虫及驱虫时间表', category: '疾病防治', views: '2.5w', image: 'https://picsum.photos/seed/vet/200/200' },
  { id: 4, title: '自制狗饭食谱：鸡胸肉蔬菜泥', category: '饮食营养', views: '5k', image: 'https://picsum.photos/seed/dogfood2/200/200' },
];

export default function WikiTab() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-emerald-500 px-4 pt-12 pb-6 shadow-md z-10 sticky top-0 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white mb-4">宠物百科</h1>
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索疾病、症状、饲养技巧..." 
            className="w-full bg-white/20 text-white placeholder-white/70 border-none rounded-2xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-white/70" size={20} />
        </div>
      </header>

      <div className="p-4 flex-1 overflow-y-auto pb-24 space-y-6 mt-2">
        {/* Categories */}
        <div>
          <h2 className="font-bold text-gray-800 mb-3 px-1">全部分类</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map(cat => (
              <motion.div 
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center space-y-2 cursor-pointer"
              >
                <div className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-gray-700">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <div>
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="font-bold text-gray-800">精选文章</h2>
            <button className="text-emerald-600 text-xs font-bold flex items-center">
              查看全部 <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article }: any) {
  return (
    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex space-x-4 cursor-pointer hover:shadow-md transition-shadow">
      <img src={article.image} alt={article.title} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
      <div className="flex-1 flex flex-col justify-between py-1">
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-snug">{article.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{article.category}</span>
          <span className="text-xs text-gray-400">{article.views} 阅读</span>
        </div>
      </div>
    </div>
  );
}
