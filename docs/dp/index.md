# 动态规划 (Dynamic Programming)

import { Code2, Infinity, Zap, Layers, GitBranch, Binary, Target } from 'lucide-react';

> **"Those who cannot remember the past are condemned to repeat it."** — *George Santayana*

动态规划（Dynamic Programming, DP）不仅是一种算法，更是一种**解决多阶段决策过程最优化问题的数学范式**。其核心在于将复杂问题分解为具有**重叠子问题**特征的子任务，并利用**最优子结构**性质，通过空间换时间的策略实现计算效率的指数级跃迁。

---

## 核心理论基石

### 1. 有向无环图 (DAG) 与 DP 的本质
从本质上讲，任何一个 DP 问题都可以抽象为在一个**有向无环图 (DAG)** 上的递推过程。
- **节点**：代表问题的每一个状态。
- **有向边**：代表状态之间的转移关系。
- **拓扑序**：状态转移必须遵循拓扑排序，即计算状态 $S$ 时，其所有依赖状态必须已完成计算。

### 2. 最优子结构 (Optimal Substructure)
若原问题的最优解包含了子问题的最优解，则称该问题具有最优子结构。这是能够使用 DP 的前提——局部最优可以推导出全局最优。

### 3. 无后效性 (No-aftereffect) —— 形式化定义
**“未来与过去无关，只取决于现在。”**
对于当前状态 $S_k$，无论通过何种决策序列到达该状态，其后继状态 $S_{k+1}$ 的演变仅取决于 $S_k$ 本身。若违反此性质，需通过**状态压缩**或**维度扩展**将历史必要信息整合入当前状态。

---

## 教材化知识体系

本模块旨在构建系统化的 DP 建模能力，涵盖从基础序列模型到高阶结构优化的全路径：

| 模块 | 核心方法论 | 复杂度范式 | 难度 |
| :--- | :--- | :--- | :--- |
| <Code2 size={18} className="inline-block mr-1 text-blue-500" /> [线性 DP](linear-dp) | 前缀状态、序列匹配 | $O(N) \sim O(N^2)$ | ⭐ |
| <Zap size={18} className="inline-block mr-1 text-amber-500" /> [背包问题](knapsack) | 维度压缩、单调队列优化 | $O(NW)$ | ⭐⭐ |
| <Layers size={18} className="inline-block mr-1 text-purple-500" /> [区间 DP](range-dp) | 局部合并、断点枚举 | $O(N^3) \to O(N^2)$ | ⭐⭐ |
| <GitBranch size={18} className="inline-block mr-1 text-green-500" /> [树形 DP](tree-dp) | 子树规约、换根技巧 | $O(N)$ | ⭐⭐⭐ |
| <Binary size={18} className="inline-block mr-1 text-cyan-500" /> [状压 DP](state-compression-dp) | 集合表征、位运算加速 | $O(2^N \cdot poly(N))$ | ⭐⭐⭐ |
| <Target size={18} className="inline-block mr-1 text-rose-500" /> [高阶优化](optimization) | 决策单调性、数据结构加速 | 理论最优界 | ⭐⭐⭐⭐ |

---

## 建模三步走

1. **状态表征 (State Representation)**：定义 `dp[...]` 的物理含义。要求：**完整性**（涵盖所有必要信息）与**简洁性**（最小化状态空间）。
2. **转移方程 (Transition Equation)**：寻找状态间的逻辑纽带。思考：“到达当前状态的最后一步决策是什么？”
3. **边界与拓扑序 (Boundary & Order)**：确定初始状态（Base Case）并确保计算顺序满足 DAG 依赖。

---

## 延伸阅读
- [动态规划中的数学美感](/blog/2026-03-07-major-upgrade)
- [动态规划 (DP) 专项强化练习库](/docs/exercises/cs/algorithm-dp-comprehensive)
