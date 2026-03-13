---
title: 动态规划 (Dynamic Programming)
---

import { Brain, Network, Workflow, Target, Zap, Microscope, BookOpen, Calculator, Code2 } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 动态规划深度建模 (Dynamic Programming Deep Modeling)

动态规划 (DP) 是解决**多阶段决策过程优化问题**的核心数学方法。其本质是将复杂问题分解为相互重叠的子问题，通过存储子问题的解（记忆化）来规避冗余计算，从而在多项式时间内达成最优决策。

---

## <Microscope className="inline-block mr-2" /> 1. DP 的公理化基础 (Axiomatic Foundations)

一个问题能否使用动态规划求解，取决于其是否满足以下三个核心性质。我们将这些性质视为 DP 的“三要素”：

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <KnowledgeCard type="info" title="最优子结构">
    问题的最优解包含其子问题的最优解。即全局最优解可以通过局部最优解构造而成。
  </KnowledgeCard>
  <KnowledgeCard type="warning" title="无后效性">
    “未来与过去无关”。当前状态一旦确定，其后的决策仅受当前值影响，而不受历史路径干扰。
  </KnowledgeCard>
  <KnowledgeCard type="success" title="子问题重叠">
    在递归过程中，相同的子问题会被多次访问。通过存储结果，我们将复杂度从指数级降至多项式级。
  </KnowledgeCard>
</div>

---

## <BookOpen className="inline-block mr-2" /> 2. 教材化建模范式 (Textbook Modeling Paradigm)

在 SolKnow 体系中，我们遵循严密的 **"State-Transition-Initialization" (STI)** 建模流程：

1.  **状态空间定义 (State Space)**: 形式化定义 $dp[i][j \dots]$。
    - 阶段 (Stage): 决策进行的步数或规模。
    - 状态 (State): 描述每个阶段演进特征的变量。
2.  **决策与转移 (Decision & Transition)**:
    - 识别决策 (Choices): 在当前状态下可以采取的行为。
    - 状态转移方程: 建立当前状态与前驱状态之间的函数映射 $f(curr) = \text{opt}\{ g(prev) + \text{cost} \}$。
3.  **最优性证明 (Optimality Proof)**: 利用数学归纳法或反证法验证最优子结构的正确性。
4.  **计算序与优化 (Ordering & Optimization)**: 确定状态依赖图 (DAG)，选择递推或记忆化搜索，并评估时空复杂度。

---

## <Workflow className="inline-block mr-2" /> 3. 知识版图 (Knowledge Map)

我们将 DP 划分为以下核心模块，每个模块均配备严密的数学推导与 C++ 工业级实现：

| 模块                                     | 核心特征           | 典型应用               | 复杂度分析                            |
| :--------------------------------------- | :----------------- | :--------------------- | :------------------------------------ |
| **[线性 DP](./linear-dp.md)**            | 阶段随下标线性增长 | LIS, LCS, 编辑距离     | $O(N^2)$ 或 $O(N \log N)$             |
| **[背包问题](./knapsack.md)**            | 带约束的价值最大化 | 0/1, 完全, 多重背包    | $O(NW)$                               |
| **[区间 DP](./range-dp.md)**             | 区间长度为演进阶段 | 石子合并, 矩阵链乘     | $O(N^3)$                              |
| **[树形 DP](./tree-dp.md)**              | 在拓扑树上进行决策 | 最大独立集, 树上背包   | $O(N)$ 或 $O(NW)$                     |
| **[状压 DP](./state-compression-dp.md)** | 位运算压缩集合状态 | TSP, 蒙德里安的梦想    | $O(2^N \cdot N^k)$                    |
| **[数位 DP](./digit-dp.md)**             | 数字组成的约束计数 | 统计区间内特定数字     | $O(\text{digits} \cdot \text{state})$ |
| **[DP 优化](./optimization.md)**         | 利用数学性质降维   | 斜率优化, 四边形不等式 | $\to O(N)$ 或 $O(N \log N)$           |

---

## <Calculator className="inline-block mr-2" /> 4. 从数学到工程的跨越

> "DP 的精髓不在于背诵方程，而在于**对问题阶段的深刻拆解**。"

在本教材中，我们将通过：

- **LaTeX 形式化推导**: 确保逻辑严密。
- **折叠式 C++ 实现**: 保持页面整洁，强调自主思考。
- **复杂度评估**: 培养工业级的时空权衡意识。

准备好进入多阶段决策的数学世界了吗？从最基础的 [线性 DP](./linear-dp.md) 开始。
