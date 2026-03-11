---
title: 动态规划 (Dynamic Programming)
---

import { Brain, Network, Workflow, Target, Zap, Microscope } from 'lucide-react';

# 动态规划深度建模 (Dynamic Programming Deep Modeling)

动态规划 (DP) 是解决**多阶段决策过程优化问题**的核心数学方法。其本质是将复杂问题分解为相互重叠的子问题，通过存储子问题的解（记忆化）来规避冗余计算，从而在多项式时间内达成最优决策。

---

## <Microscope className="inline-block mr-2" /> 1. DP 的公理化基础

一个问题能否使用动态规划求解，取决于其是否满足以下三个核心性质：

1.  **最优子结构 (Optimal Substructure)**: 问题的最优解包含其子问题的最优解。即局部最优可以推导出全局最优。
2.  **无后效性 (No After-Effect)**: 即“未来与过去无关”。一旦某个阶段的状态被确定，它之后的决策仅取决于当前状态，而与到达该状态的路径无关。
3.  **子问题重叠 (Overlapping Subproblems)**: 在递归下降过程中，相同的子问题会被多次计算。DP 通过“空间换时间”的策略（表格法）消除此类冗余。

---

## <Network className="inline-block mr-2" /> 2. 建模四步法 (The 4-Step Paradigm)

在 SolKnow 的体系中，我们提倡标准化的建模流程：

1.  **状态定义 (State Design)**: 确定 $dp[i][j \dots]$ 的物理意义。通常 $i$ 代表阶段（如序列位置、树节点、时间戳），$j \dots$ 代表约束（如体积、个数、集合状态）。
2.  **状态转移方程 (Transition Equation)**: 推导 $dp[curr]$ 如何由 $dp[prev]$ 转化而来。这是问题的数学核心。
3.  **边界与初始化 (Initialization)**: 确定最小子问题的解（如 $dp[0] = 0$）及非法状态的赋值（如 $\pm \infty$）。
4.  **计算顺序与优化 (Order & Optimization)**: 确保计算当前状态时，所需的前置状态已计算完毕。评估时空复杂度并进行常数级或阶数级优化。

---

## <Workflow className="inline-block mr-2" /> 3. 知识版图 (Knowledge Map)

| 模块 | 核心特征 | 典型应用 |
| :--- | :--- | :--- |
| **[线性 DP](./linear-dp.md)** | 阶段随序列下标线性增长 | LIS, LCS, 编辑距离 |
| **[区间 DP](./range-dp.md)** | 以区间长度为阶段，由小区间推大区间 | 石子合并, 矩阵链乘 |
| **[树形 DP](./tree-dp.md)** | 在树结构上进行递归决策 | 树上最大独立集, 树上背包 |
| **[状压 DP](./state-compression-dp.md)** | 利用位运算压缩集合状态 | TSP, 蒙德里安的梦想 |
| **[数位 DP](./digit-dp.md)** | 解决与数字组成相关的计数问题 | 统计 $[L, R]$ 内满足条件的数 |
| **[DP 优化](./optimization.md)** | 利用单调性、凸性、数据结构降维 | 斜率优化, 四边形不等式 |

---

## <Zap className="inline-block mr-2" /> 4. 学习建议

> "DP 的精髓不在于背诵方程，而在于**对问题阶段的深刻拆解**。"
>
> —— 每一个初学者都应从**记忆化搜索 (Memory Search)** 开始理解 DP，逐步过渡到**递推 (Tabulation)**，最后掌握各种**时空优化技巧**。

在本章中，我们将通过严格的数学推导、精选的 C++ 工业级代码以及由浅入深的折叠练习，带你领略动态规划的艺术。
