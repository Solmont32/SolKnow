---
title: 图论算法：结构、对偶与建模精要
sidebar_position: 1
---

import { Network, Sigma, Workflow, Box, ShieldCheck, Zap, Activity, Compass } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <Network className="inline-block mr-2 mb-1 text-blue-600" /> 图论算法精要 (Graph Theory Essentials)

图论（Graph Theory）不仅是研究离散结构的数学分支，更是计算机科学中描述非线性关系、状态空间转移与约束满足的核心语言。本版块旨在从**教材化**视角，系统性地构建从基础遍历到复杂流网络、从组合对偶到拓扑分析的理论体系。

---

## 1. <Box className="inline-block mr-2 mb-1 text-indigo-500" /> 理论架构模型 (Architectural Model)

图论学习可以划分为四个递进的层级，每一层都建立在前一层的拓扑性质之上：

- **层级 I：拓扑感知 (Topology Awareness)**
  - 图的存储（矩阵 vs 链表）、DFS/BFS 搜索序、拓扑排序。
  - **核心命题**：连通性、环路判定、欧拉回路与哈密顿路径。
- **层级 II：最优性路径 (Optimality Paths)**
  - 最短路理论（Dijkstra/Bellman-Ford/Floyd）、最小生成树（Prim/Kruskal/Boruvka）。
  - **数学本质**：动态规划在循环图上的不动点求解与贪心拟阵论（Matroid Theory）。
- **层级 III：约束与流 (Constraints & Flows)**
  - 网络流（最大流、最小割、费用流）、二分图匹配（匈牙利、HK、Gale-Shapley）。
  - **数学本质**：线性规划的对偶性（LP Duality）及其在离散图上的投影。
- **层级 IV：连通性深度分析 (Deep Connectivity)**
  - SCC (Tarjan/Kosaraju)、双连通分量 (BCC)、2-SAT 约束满足。
  - **数学本质**：图的强/弱连通序关系与其缩点后的 DAG 结构转换。

---

## 2. <Sigma className="inline-block mr-2 mb-1 text-purple-500" /> 图论建模哲学：节点与边的本质

在高级建模中，图不再仅仅是点的集合，而是**状态与决策**的抽象：

<KnowledgeCard title="建模三要素" icon={<Zap size={20} />}>

1.  **节点 (Vertex)**：代表一个**确定的状态**。在分层图中，节点是 $(v, state)$ 的二元组。
2.  **边 (Edge)**：代表一次**合法的决策/转移**。边权代表转移的代价、概率或容量约束。
3.  **图结构**：代表**约束的集合**。最短路寻求最优决策序列，最大流寻求整体系统吞吐量。

</KnowledgeCard>

---

## 3. <Workflow className="inline-block mr-2 mb-1 text-green-500" /> 学习路线图

以下是推荐的深度进阶路径，点击下方模块进入详细文档：

- **[图的存储与建模](./representation.md)**：链式前向星与状态空间构建。
- **[最短路理论体系](./shortest-path.md)**：从三角不等式到势能函数重标定。
- **[最小生成树与瓶颈理论](./mst.md)**：切分定理、回路定理与重构树。
- **[网络流理论与对偶范式](./network-flow.md)**：最大流最小割、权闭合子图与费用流对偶。
- **[二分图匹配与覆盖](./bipartite-matching.md)**：Kőnig 定理、Hall 定理与稳定婚姻。
- **[强连通分量与连通性分析](./tarjan.md)**：Tarjan 的时间戳魔法与 2-SAT 判定。

---

## 4. <Activity className="inline-block mr-2 mb-1 text-red-500" /> 复杂度边界总览

| 问题分类 | 核心算法 | 时间复杂度 | 空间复杂度 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **最短路 (SSSP)** | Dijkstra (Heap) | $O(E \log V)$ | $O(V+E)$ | 权值 $\ge 0$ |
| **最小生成树 (MST)** | Kruskal | $O(E \log E)$ | $O(V+E)$ | 贪心序排序 |
| **最大流 (Max-Flow)** | Dinic | $O(V^2 E)$ | $O(V+E)$ | 二分图匹配时 $O(E\sqrt{V})$ |
| **强连通分量 (SCC)** | Tarjan | $O(V+E)$ | $O(V+E)$ | 单次 DFS 线性收敛 |

---

> **教授寄语**：*“图论之美在于其‘牵一发而动全身’的联动性。理解了最大流与最小割的对偶，你就理解了优化问题的阴阳两面。”*
