---
title: 搜索与启发式算法 (Search & Heuristics)
sidebar_position: 1
---

import { Search, Zap, Target, Thermometer, Trophy, Swords, Layers } from 'lucide-react';

# <Search className="inline-block mr-2 mb-1 text-blue-500" /> 搜索与启发式算法

搜索是解决复杂决策、最优化以及路径寻找问题的通用方法。本章从严密的状态空间建模出发，进阶到复杂的剪枝优化，最后深入现代启发式搜索（A*, IDA*）、博弈搜索与随机化策略（模拟退火）。

## 核心内容

- **<Layers className="inline-block mr-2 mb-1 text-blue-400" /> [状态空间建模](heuristic-search#零-系统化状态空间建模与复杂度控制)**：理解 $S, A, T$ 形式化定义与对称性破缺。
- **<Search className="inline-block mr-2 mb-1 text-blue-400" /> [搜索优化与剪枝](heuristic-search#一-搜索树优化系统化剪枝策略)**：掌握可行性、最优性与搜索顺序三大剪枝准则。
- **<Target className="inline-block mr-2 mb-1 text-blue-400" /> [启发式搜索 (A* / IDA*)](heuristic-search#二-启发式搜索-a-与-ida)**：利用可接受性估价函数引导搜索。
- **<Swords className="inline-block mr-2 mb-1 text-blue-400" /> [博弈搜索](heuristic-search#三-博弈搜索-adversarial-search)**：理解 Minimax 决策与 Alpha-Beta 剪枝优化。
- **<Thermometer className="inline-block mr-2 mb-1 text-blue-400" /> [模拟退火 (Simulated Annealing)](heuristic-search#四-现代启发式模拟退火-simulated-annealing)**：处理全局最优化问题的随机化策略。

## 学习路径

1. 理解状态空间建模与搜索树复杂度控制。
2. 掌握三种基本剪枝：可行性、最优性、搜索顺序。
3. 学习 A* 的估价函数 $h(n)$ 设计原则与最优性证明。
4. 掌握博弈搜索中的对抗决策逻辑。
5. 熟练运用迭代加深与 IDA* 进行时空权衡。

---

## 🎯 关联练习与实战

<div className="solknow-card border border-green-200 p-4 rounded-lg bg-green-50/10">
  <div className="flex items-center gap-2 mb-2 text-green-600 font-bold">
    <Trophy size={18} />
    <span>算法竞赛习题库：搜索与启发式专题</span>
  </div>
  <p className="text-sm text-gray-600">包含 DFS 剪枝、BFS 优化、A* 搜索、IDA* 与博弈搜索专项练习。</p>
  <a href="/docs/exercises/cs/algorithm-search" className="button button--outline button--success button--sm">进入练习库 →</a>
</div>

---

*“搜索的本质是在庞大的解空间中，通过智慧的约束找到那道唯一的解。”*
