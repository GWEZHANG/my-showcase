import { Zap, Code, Database } from 'lucide-react';

export const projects = [
  {
    id: 1,
    title: "通用 AI 交易操作系统",
    desc: "从加密市场到全资产类别。多智能体决策 · 统一风控 · 低延迟执行。",
    icon: Code, // 使用 Lucide 图标组件
    tags: ["Go","Gin","React","Vite", "TailwindCss"],
    link: "/nofzg", // 替换你的真实链接
    color: "from-blue-500 to-cyan-400" // 专属流光色
  },
  {
    id: 2,
    title: "正则测试实验室",
    desc: "可视化正则表达式匹配过程，内置常用正则库，开发者必备。",
    icon: Zap,
    tags: ["Regex", "Utility"],
    link: "https://google.com",
    color: "from-purple-500 to-pink-400"
  },
  {
    id: 3,
    title: "Base64 转换器",
    desc: "图片、文本与 Base64 编码的极速互转，本地处理保护隐私。",
    icon: Database,
    tags: ["Privacy", "Encoder"],
    link: "https://google.com",
    color: "from-emerald-400 to-green-500"
  }
];