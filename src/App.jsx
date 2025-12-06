import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, BadgeDollarSign,Bot, Database,Github, Twitter, Mail, ArrowUpRight } from 'lucide-react';
//import { projects } from '../data/projects.ts';


// --- 数据 ---
const projects = [
  {
    id: 1,
    title: "通用 AI 交易操作系统",
    desc: "从加密市场到全资产类别。多智能体决策 · 统一风控 · 低延迟执行。",
    icon: Bot, 
    tags: ["Go","Gin","React","Vite", "TailwindCss"],
    link: "/nofzg", 
    color: "from-blue-500 to-cyan-400" 
  },
  {
    id: 2,
    title: "Polymarket策略套利框架",
    desc: "API框架化，降低开发门槛，让每个人都能轻松将自己的策略自动化。",
    icon: Zap,
    tags: ["Python", "Js"],
    link: "#",
    color: "from-purple-500 to-pink-400"
  },
  {
    id: 3,
    title: "更多有趣开发，敬请期待...",
    desc: "致力于一切有趣的技术，致富的策略，自动化思路",
    icon: Database,
    tags: ["Privacy", "Encoder"],
    link: "#",
    color: "from-emerald-400 to-green-500"
  }
];


// --- 组件：打字机效果 ---
const Typewriter = ({ text, delay = 100, infinite = true }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
    } else if (infinite) {
       timeout = setTimeout(() => {
         setCurrentIndex(0);
         setCurrentText('');
       }, 3000); 
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <span>{currentText}<span className="animate-pulse">|</span></span>;
};

// --- 组件：聚光灯卡片 ---
const SpotlightCard = ({ project, index }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative w-full"
    >
      <Link 
        to={project.link} 
        className="block relative h-full overflow-hidden rounded-xl border border-dark-700 bg-dark-800 p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        ref={divRef}
      >
        <div
          className="absolute transition duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color} bg-opacity-10 shadow-lg shadow-${project.color}/20 ring-1 ring-white/10`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-500 transition-colors transform group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>

          <h3 className="mb-2 text-xl font-bold text-white transition-all group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400">
            {project.title}
          </h3>

          <p className="flex-grow mb-6 text-sm leading-relaxed text-gray-400">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium text-gray-300 border rounded-full bg-dark-700/50 border-dark-700/50 backdrop-blur-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// --- 主页面 ---
function App() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* 1. 动态光球背景 */}
      <div className="absolute top-0 bg-purple-500 rounded-full -left-4 w-72 h-72 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 bg-blue-500 rounded-full -right-4 w-72 h-72 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bg-indigo-500 rounded-full -bottom-8 left-20 w-72 h-72 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* 2. 新增：科技感网格背景 */}
      

      <div className="relative z-10 w-full max-w-5xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-10 mb-16 text-center"
        >
          <div className="inline-block p-1 mb-6 rounded-full shadow-2xl bg-gradient-to-tr from-purple-500 to-blue-500 shadow-purple-500/20">
            <div className="flex items-center justify-center w-24 h-24 text-4xl border-4 rounded-full bg-dark-900 border-dark-900">
              👨‍💻
            </div>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Developer Toolkit
          </h1>
          
          {/* 3. 新增：打字机效果区域 */}
          <div className="h-8 mb-4">
             <p className="font-mono text-xl md:text-2xl text-blue-400/90">
                <Typewriter text="Code. Build. Ship. 🚀" delay={150} />
             </p>
          </div>
          
          <p className="max-w-xl mx-auto text-lg leading-relaxed text-gray-400">
             这里收藏了我日常开发中打造的专属“军火库”。
             <br/>简单好用，拒绝繁琐。
          </p>

          {/* 4. 新增：流光社交按钮 */}
          <div className="flex justify-center gap-4 mt-8">
            {[
              { Icon: Github, href: "https://github.com/GWEZHANG" },
              { Icon: Twitter, href: "https://x.com/zgw0113" },
              { Icon: Mail, href: "#" }
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href}
                className="relative p-3 overflow-hidden transition-all duration-300 border group rounded-xl bg-dark-800 border-dark-700 hover:border-gray-600"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>
                <item.Icon className="relative z-10 w-5 h-5 text-gray-400 transition-colors group-hover:text-white" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <SpotlightCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="pt-8 pb-10 mt-24 text-sm text-center text-gray-600 border-t border-white/5"
        >
          <p>Designed for Developers © 2025</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;