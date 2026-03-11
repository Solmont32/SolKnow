---
title: 搜索与启发式算法 (Search & Heuristics)
sidebar_position: 1
---

import { Search, Zap, Target, Thermometer, Trophy } from 'lucide-react';

# <Search className="inline-block mr-2 mb-1 text-blue-500" /> 搜索与启发式算法

搜索是解决复杂决策、最优化以及路径寻找问题的通用方法。本章从基础的剪枝优化，进阶到双向搜索，最后深入现代启发式搜索（A*, IDA*）与随机化启发式（模拟退火）。

## 核心内容

- **<Search className="inline-block mr-2 mb-1 text-blue-400" /> [搜索优化与剪枝](heuristic-search#一-剪枝优化-pruning-strategies)**：如何减少不必要的搜索空间。
- **<Zap className="inline-block mr-2 mb-1 text-blue-400" /> [双向搜索 / Meet-in-the-middle](heuristic-search#二-双向搜索-bidirectional-search)**：平衡深度，寻找交汇点。
- **<Target className="inline-block mr-2 mb-1 text-blue-400" /> [启发式搜索 (A* / IDA*)](heuristic-search#三-启发式搜索-heuristic-search-a--ida)**：利用估价函数引导搜索方向。
- **<Thermometer className="inline-block mr-2 mb-1 text-blue-400" /> [模拟退火 (Simulated Annealing)](heuristic-search#四-模拟退火-simulated-annealing)**：处理全局最优化问题的随机化策略。

## 学习路径

1. 理解状态空间建模 ($S, A, T$)。
2. 掌握三种基本剪枝：可行性、最优性、搜索顺序。
3. 学习 A* 的估价函数 $h(n)$ 设计原则（可接受性）。
4. 熟练掌握模拟退火的参数调优。

---

## 🎯 关联练习与实战

<div className="solknow-card border border-green-200 p-4 rounded-lg bg-green-50/10">
  <div className="flex items-center gap-2 mb-2 text-green-600 font-bold">
    <Trophy size={18} />
    <span>算法竞赛习题库：搜索与启发式专题</span>
  </div>
  <p className="text-sm text-gray-600">包含 DFS 剪枝、BFS 优化、A* 搜索、IDA* 与模拟退火专项练习。</p>
  <a href="/docs/exercises/cs/algorithm-search" className="button button--outline button--success button--sm">进入练习库 →</a>
</div>

---

*“搜索的本质是在庞大的解空间中，通过智慧的约束找到那道唯一的解。”*
