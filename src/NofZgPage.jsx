import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// -----------------------------------------------------------------------------
// 图标组件 (使用 SVG 以减少依赖)
// -----------------------------------------------------------------------------
const Icons = {
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  ),
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
  ),
  Trophy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Terminal: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
  ),
  Chart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  )
};

// -----------------------------------------------------------------------------
// 通用 UI 组件
// -----------------------------------------------------------------------------

// 磨砂玻璃卡片
const BentoCard = ({ children, className = "", title, subtitle, icon: Icon }) => (
  <div className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-neutral-900/80 ${className}`}>
    <div className="relative z-10 flex flex-col h-full">
      {/* 头部：图标与标题 */}
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="flex items-center justify-center w-10 h-10 transition-transform duration-500 rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 group-hover:scale-110 group-hover:bg-white/10">
            <Icon />
          </div>
        )}
        <div>
          {title && <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>}
          {subtitle && <p className="text-xs font-medium tracking-wider uppercase text-neutral-400">{subtitle}</p>}
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="flex-1 text-sm leading-relaxed text-neutral-400">
        {children}
      </div>
    </div>

    {/* 背景光效装饰 */}
    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px] transition-all duration-500 group-hover:bg-blue-500/20"></div>
  </div>
);

// 标签组件
const Badge = ({ children, color = "blue" }) => {
  const styles = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    neutral: "bg-white/5 text-neutral-400 border-white/10",
  };
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[color]}`}>
      {children}
    </span>
  );
};

// -----------------------------------------------------------------------------
// 主页面组件
// -----------------------------------------------------------------------------
const NofZgPage = () => {
  // 简单的淡入动画状态
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <div className="min-h-screen font-sans bg-neutral-950 text-neutral-200 selection:bg-blue-500/30">
      
      {/* 顶部导航 (返回按钮) */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-neutral-950/80 backdrop-blur-xl">
        <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium transition-colors text-neutral-400 hover:text-white">
            <Icons.ArrowLeft />
            <span>返回主页</span>
          </Link>
          <span className="font-mono text-xs text-neutral-600">v1.0.0 RELEASE</span>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        
        {/* ================= HERO SECTION ================= */}
        <section className={`mx-auto max-w-4xl px-6 py-20 text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-6">
            <Badge color="blue">Agentic Trading OS</Badge>
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
            NOF-ZG
          </h1>
          <p className="max-w-2xl mx-auto mb-10 text-lg leading-relaxed text-neutral-400 md:text-xl">
            从加密市场到全资产类别。<br className="hidden md:block" />
            <span className="text-white">多智能体决策</span> · <span className="text-white">统一风控</span> · <span className="text-white">低延迟执行</span>
          </p>
          
          {/* 简单的滚动提示 */}
          <div className="animate-bounce text-neutral-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </div>
        </section>

        {/* ================= BENTO GRID (核心能力) ================= */}
        <section className="px-6 py-12 mx-auto max-w-7xl">
          <h2 className="sr-only">Core Features</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2">
            
            {/* 1. 多智能体竞赛 (大卡片) */}
            <BentoCard 
              className="md:col-span-2 md:row-span-2" 
              title="多智能体竞赛框架" 
              subtitle="Arena System"
              icon={Icons.Trophy}
            >
              <p className="mb-6">
                这不仅仅是简单的交易，而是模型之间的战争。GPT 与 DeepSeek 等模型实时对战，系统根据实时 ROI 动态分配权重。
              </p>
              
              {/* 模拟 UI: AI 对战面板 */}
              <div className="p-4 rounded-xl bg-black/40 ring-1 ring-white/10">
                <div className="flex items-center justify-between mb-3 text-xs text-neutral-500">
                  <span>LIVE BATTLE</span>
                  <span className="text-green-500 animate-pulse">● Realtime</span>
                </div>
                {/* Agent A */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span className="text-blue-400">Agent GPT-5</span>
                    <span className="text-white">ROI +142%</span>
                  </div>
                  <div className="w-full h-2 overflow-hidden rounded-full bg-neutral-800">
                    <div className="h-full w-[75%] rounded-full bg-blue-500/80"></div>
                  </div>
                </div>
                {/* Agent B */}
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span className="text-purple-400">Agent DeepSeek-V3</span>
                    <span className="text-white">ROI +168%</span>
                  </div>
                  <div className="w-full h-2 overflow-hidden rounded-full bg-neutral-800">
                    <div className="h-full w-[88%] rounded-full bg-purple-500/80"></div>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* 2. AI 自学习 */}
            <BentoCard 
              className="md:col-span-1 md:row-span-1" 
              title="AI 自学习" 
              subtitle="Self-Evolving"
              icon={Icons.Brain}
            >
              <p className="mb-4">
                每次决策前分析最近 20 个交易周期。识别最佳/最差资产，避免连续亏损模式。
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge color="neutral">自适应策略</Badge>
                <Badge color="neutral">模式识别</Badge>
              </div>
            </BentoCard>

            {/* 3. 已支持交易所 */}
            <BentoCard 
              className="md:col-span-1 md:row-span-1" 
              title="多交易所支持" 
              subtitle="Integrations"
              icon={Icons.Zap}
            >
              <div className="flex flex-col gap-3 mt-2">
                {['Binance Futures', 'Hyperliquid', 'Aster DEX'].map((ex, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 px-3 rounded-lg bg-white/5">
                    <div className={`h-2 w-2 rounded-full ${i===0 ? 'bg-yellow-400': i===1 ? 'bg-cyan-400' : 'bg-pink-400'}`}></div>
                    <span className="font-mono text-sm text-neutral-300">{ex}</span>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>
        </section>

        {/* ================= DETAIL FEATURES (左右布局) ================= */}
        <section className="px-6 py-20 mx-auto space-y-24 max-w-7xl">
          
          {/* Feature 1: 风控系统 */}
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="w-full md:w-1/2">
               <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-900/20 text-emerald-400 ring-1 ring-emerald-500/20">
                 <Icons.Shield />
               </div>
              <h3 className="mb-4 text-3xl font-bold tracking-tight text-white">统一风控系统</h3>
              <p className="mb-6 leading-relaxed text-neutral-400">
                这不是建议，是强制执行。系统内置严格的风险回报计算，单资产限制与杠杆动态调整。
              </p>
              <ul className="space-y-3 text-neutral-400">
                {[
                  '强制 ≥ 1:2 止损止盈比', 
                  '保证金使用率上限 90%', 
                  '山寨币 ≤ 1.5x 净值限制'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icons.Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* 模拟代码块/配置图 */}
            <div className="w-full md:w-1/2">
              <div className="overflow-hidden rounded-2xl bg-[#1e1e1e] border border-white/10 shadow-2xl">
                <div className="flex items-center gap-1.5 bg-[#252526] px-4 py-3 border-b border-black">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-2 font-mono text-xs text-neutral-500">risk_config.json</span>
                </div>
                <div className="p-6 font-mono text-sm leading-6">
                  <div className="text-purple-400">"max_leverage"<span className="text-white">:</span> <span className="text-yellow-300">50</span>,</div>
                  <div className="text-purple-400">"risk_reward_ratio"<span className="text-white">:</span> <span className="text-yellow-300">2.0</span>,</div>
                  <div className="text-purple-400">"margin_limit"<span className="text-white">:</span> <span className="text-yellow-300">0.9</span>,</div>
                  <div className="text-purple-400">"protection"<span className="text-white">:</span> <span className="text-green-400">true</span>,</div>
                  <div className="mt-2 text-gray-500">// Auto-reject orders exceeding risk params</div>
                </div>
              </div>
            </div>
          </div>

           {/* Feature 2: 数据层 & 监控 */}
           <div className="flex flex-col items-center gap-12 md:flex-row-reverse">
            <div className="w-full md:w-1/2">
               <div className="flex items-center justify-center w-12 h-12 mb-2 text-indigo-400 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-900/20 ring-1 ring-indigo-500/20">
                 <Icons.Chart />
               </div>
              <h3 className="mb-4 text-3xl font-bold tracking-tight text-white">通用市场数据层</h3>
              <p className="mb-6 leading-relaxed text-neutral-400">
                跨越 Binance、Hyperliquid 和 Aster DEX 的统一数据接口。支持 3 分钟实时数据与 4 小时趋势数据的多帧分析。
              </p>
              <div className="flex flex-wrap gap-2">
                {['EMA20/50', 'MACD', 'RSI (7/14)', 'ATR', '流动性过滤'].map(tag => (
                  <Badge key={tag} color="neutral">{tag}</Badge>
                ))}
              </div>
            </div>
            
            {/* 模拟仪表盘截图占位 */}
            <div className="relative w-full md:w-1/2 group">
              <div className="absolute transition duration-500 -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur group-hover:opacity-40"></div>
              <div className="relative flex items-center justify-center w-full overflow-hidden border aspect-video rounded-xl border-white/10 bg-neutral-900">
                { 
                   <img src="../public/details-page.png" className="object-cover" />
                }
              </div>
            </div>
          </div>

        </section>

        {/* ================= TECH STACK ================= */}
        <section className="py-20 border-t border-white/5 bg-neutral-900/30">
          <div className="px-6 mx-auto text-center max-w-7xl">
            <h3 className="mb-10 text-lg font-medium text-neutral-400">Powering the Future of Trading</h3>
            <div className="flex flex-wrap justify-center gap-8 transition-all md:gap-16 opacity-70 grayscale hover:grayscale-0 hover:opacity-100">
               {/* 简单的文本 Logo，实际项目中可以用 SVG Logo */}
               {['Go / Gin', 'SQLite', 'React 18', 'TypeScript', 'Vite', 'TailwindCSS', 'Zustand'].map((tech) => (
                 <span key={tech} className="font-mono text-xl font-bold text-white">{tech}</span>
               ))}
            </div>
          </div>
        </section>

        {/* ================= ROADMAP ================= */}
        <section className="max-w-4xl px-6 py-24 mx-auto">
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-center text-white">路线图</h2>
          <div className="relative pl-8 ml-4 space-y-12 border-l border-white/10 md:ml-0 md:pl-12">
            
            {/* Item 1 */}
            <div className="relative">
              <span className="absolute -left-[41px] md:-left-[57px] flex h-6 w-6 items-center justify-center rounded-full bg-green-500 ring-4 ring-neutral-950">
                <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <h4 className="text-xl font-bold text-white">加密货币市场</h4>
              <p className="mt-2 text-neutral-400">现已全面运行。Binance, Hyperliquid, Aster DEX。</p>
            </div>

            {/* Item 2 */}
            <div className="relative">
              <span className="absolute -left-[41px] md:-left-[57px] flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 ring-4 ring-neutral-950 border border-white/20"></span>
              <h4 className="text-xl font-bold text-neutral-200">股票市场</h4>
              <p className="mt-2 text-neutral-500">美股、A股、港股数据接入中。</p>
            </div>

            {/* Item 3 */}
            <div className="relative">
              <span className="absolute -left-[41px] md:-left-[57px] flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 ring-4 ring-neutral-950 border border-white/20"></span>
              <h4 className="text-xl font-bold text-neutral-500">全资产类别</h4>
              <p className="mt-2 text-neutral-600">期货、期权、外汇市场的统一 API 扩展。</p>
            </div>
          </div>
        </section>
        
        {/* ================= FOOTER ================= */}
        <footer className="py-12 text-sm text-center border-t border-white/5 text-neutral-600">
          <p>© 2025 NOF-ZG Agentic Trading OS. All rights reserved.</p>
        </footer>

      </main>
    </div>
  );
};

export default NofZgPage;