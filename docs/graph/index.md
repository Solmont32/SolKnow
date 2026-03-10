---
title: 图论建模与连通性
---

import { Network, GitBranch, Map, Share2, Target, Zap } from 'lucide-react';

# <Network className="inline-block mr-2 mb-1 text-blue-600" /> 图论建模与连通性 (Graph Theory & Connectivity)

图论不仅仅是研究节点与边的数学分支，更是计算机科学中**最强大的建模语言**。从社交网络、交通规划到编译器优化与人工智能状态空间，万物皆可图化。

## 一、 <Target className="inline-block mr-2 mb-1 text-blue-500" /> 图论建模方法论

在解决实际问题时，构建图模型通常遵循以下三部曲：

1.  **实体映射（点）**：确定问题中的基本单位（如城市、状态、变量）。
2.  **关系定义（边）**：定义单位间的相互作用（如道路、转移条件、依赖关系）。
3.  **权值抽象**：确定关系的度量（如距离、时间、代价、流量）。

### 常见建模模式
-   **状态空间图**：搜索算法的核心，每个点代表一个状态，边代表动作。
-   **约束依赖图**：如拓扑排序处理编译依赖或排课问题。
-   **分层图**：通过增加维度（层）来处理有限次特殊操作（如“免费 $k$ 次”最短路）。
-   **差分约束**：将代数不等式组转化为最短路问题。

## 二、 <GitBranch className="inline-block mr-2 mb-1 text-blue-500" /> 核心体系架构

本章节系统化涵盖了从基础遍历到高级连通性的工业级算法实现：

### 1. 基础与建模
-   [**图的存储 (Representation)**](representation)：邻接矩阵、邻接表与**链式前向星**。
-   [**图的遍历 (Traversal)**](traversal)：DFS/BFS 及其状态机理解。
-   [**拓扑排序 (Topological Sort)**](topo-sort)：处理 DAG 依赖与动态规划基础。

### 2. 路径与树
-   [**最短路算法 (Shortest Path)**](shortest-path)：Dijkstra, Bellman-Ford, SPFA, Floyd 及分层图应用。
-   [**最小生成树 (MST)**](mst)：Kruskal, Prim 算法及切分定理。

### 3. 连通性分析 (Connectivity)
-   [**强连通分量 (SCC)**](tarjan)：有向图中的 Tarjan 算法与缩点技巧。
-   [**割点与桥 (Bridges/Cut-points)**](tarjan#割点与桥)：无向图连通性分析。
-   [**网络流基础 (Network Flow)**](network-flow)：最大流、最小割及其扩展模型。

---

## 三、 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 学习路线建议

1.  **初阶**：掌握 `vector` 存图与 BFS/DFS 搜索，理解连通块概念。
2.  **中阶**：精通 Dijkstra 与 Kruskal，能处理简单的拓扑排序依赖。
3.  **高阶**：熟练运用 Tarjan 缩点转化 DAG，掌握分层图建模与网络流。

---

## 四、 练习库

- [算法竞赛练习：最短路专题](/docs/exercises/cs/algorithm-shortest-path)
- [算法竞赛练习：最小生成树专题](/docs/exercises/cs/algorithm-mst)
- [算法竞赛练习：拓扑排序专题](/docs/exercises/cs/algorithm-topo-sort)
- [算法竞赛练习：连通性专题 (Tarjan)](/docs/exercises/cs/algorithm-scc)
