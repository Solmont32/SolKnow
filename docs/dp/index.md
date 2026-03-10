# 动态规划 (Dynamic Programming) 系统建模

import { Code2, Infinity, Zap, Layers, GitBranch, Binary, Target, ShieldCheck, Microscope } from 'lucide-react';

> **"A problem well-stated is a problem half-solved."** —— 动态规划不仅是一种算法，更是一套**多阶段决策过程的数学建模范式**。

动态规划的核心在于将复杂问题拆解为具备**重叠子问题**特征的子任务，并利用**最优子结构**性质，通过空间换时间的策略实现计算效率的指数级跃迁。

---

## <Microscope className="inline-block mr-2 text-blue-500" /> 建模三位一体 (Modeling Trinity)

系统化构建一个 DP 模型通常遵循以下严谨路径：

### 1. 状态表征 (State Representation)
*定义：$S = \{v_1, v_2, \dots, v_k\}$。*
- **物理意义**：明确 `dp[i][j]` 究竟代表什么（如：前 $i$ 个元素在约束 $j$ 下的最大收益）。
- **无后效性 (No-aftereffect)**：当前状态必须包含影响未来的所有历史信息，使得“未来只取决于现在”。
- **精简性**：在保证无后效性的前提下，尽可能压缩状态维度。

### 2. 转移方程 (Transition Equation)
*定义：$f(S_{curr}) = \text{opt}_{S_{prev} \to S_{curr}} \{ f(S_{prev}) + \text{cost} \}$。*
- **最后一步决策**：思考“到达当前状态的最后一刻，我做了什么选择？”
- **子问题划分**：确保转移来源的集合 $S_{prev}$ 是完备且互斥的（或虽有重复但不影响最值）。

### 3. 边界与拓扑序 (Boundary & Topology)
- **初始态 (Base Case)**：定义最简单子问题的解（如 $dp[0] = 0$）。
- **计算序**：确保在计算 $f(S_{curr})$ 时，所有依赖的 $f(S_{prev})$ 已处于完成态。本质上是在 **有向无环图 (DAG)** 上进行递推。

---

## <ShieldCheck className="inline-block mr-2 text-green-500" /> 教材化知识体系

本模块旨在构建系统化的 DP 建模能力，涵盖从基础序列模型到高阶结构优化的全路径：

| 模块 | 核心方法论 | 复杂度范式 | 建模重点 |
| :--- | :--- | :--- | :--- |
| <Code2 size={18} className="inline-block mr-1 text-blue-500" /> [线性 DP](linear-dp) | 前缀状态、序列匹配 | $O(N) \sim O(N^2)$ | 线性前缀推导 |
| <Zap size={18} className="inline-block mr-1 text-amber-500" /> [背包问题](knapsack) | 维度压缩、单调队列 | $O(NW)$ | 组合约束表征 |
| <Layers size={18} className="inline-block mr-1 text-purple-500" /> [区间 DP](range-dp) | 局部合并、断点枚举 | $O(N^3) \to O(N^2)$ | 递归收缩特征 |
| <GitBranch size={18} className="inline-block mr-1 text-green-500" /> [树形 DP](tree-dp) | 子树规约、换根技巧 | $O(N)$ | 层次拓扑依赖 |
| <Binary size={18} className="inline-block mr-1 text-cyan-500" /> [状压 DP](state-compression-dp) | 集合表征、位运算 | $O(2^N \cdot poly(N))$ | 集合状态压缩 |
| <Target size={18} className="inline-block mr-1 text-rose-500" /> [高阶优化](optimization) | 决策单调性、凸壳维护 | 理论最优界 | 消除冗余计算 |

---

## <Infinity className="inline-block mr-2 text-purple-500" /> 算法的三大基本属性

1. **最优子结构 (Optimal Substructure)**：原问题的最优解包含子问题的最优解。
2. **重叠子问题 (Overlapping Subproblems)**：在递归过程中，相同的子问题会被多次计算。
3. **无后效性 (No-aftereffect)**：即马尔可夫性质，过去的操作不影响未来的最优决策，只通过当前状态起作用。

---

## 延伸阅读
- [动态规划中的数学美感](/blog/2026-03-07-major-upgrade)
- [动态规划 (DP) 专项强化练习库](/docs/exercises/cs/algorithm-dp-comprehensive)
