---
title: 图的存储与状态建模
---

import { Database, Layers, Share2, Zap, LayoutList, GitBranch, Sigma } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <Database className="inline-block mr-2 mb-1 text-blue-500" /> 图的存储与状态建模 (Representation & Modeling)

图论算法的效率不仅取决于算法逻辑，更取决于如何高效地在计算机内存中表达图 $G=(V, E)$，以及如何将具体业务逻辑映射为图的节点与边。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 形式化定义

一个**有向带权图**定义为五元组 $G = (V, E, w, s, t)$，其中：
- $V = \{v_1, v_2, \dots, v_n\}$ 是有限非空节点集。
- $E \subseteq V \times V$ 是边集。
- $w: E \to \mathbb{R}$ 是边权函数。
- $s, t \in V$ 分别为源点与汇点（可选）。

---

## 二、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 核心存储方案

### 1. 邻接矩阵 (Adjacency Matrix)
使用二维数组 $A \in \mathbb{R}^{n \times n}$，其中 $A_{ij} = w(v_i, v_j)$。若无边则 $A_{ij} = \infty$。
- **理论复杂度**：查询 $O(1)$，空间 $O(V^2)$。
- **现代视角**：在并行计算（GPU）或线性代数方法（如 PageRank）中极具优势，但在稀疏图中空间浪费严重。

### 2. 链式前向星 (Static Linked List)
这是竞赛中最优的静态邻接表实现，具有极高的缓存命中率。

```cpp
/**
 * @brief 链式前向星模板
 * M: 边数的最大值, N: 点数的最大值
 */
int head[N], ver[M], nxt[M], edge[M], tot = 1; // tot=1 方便成对变换 (i^1)

void add(int u, int v, int w) {
    ver[++tot] = v; edge[tot] = w;
    nxt[tot] = head[u]; head[u] = tot;
}
```

---

## 三、 <GitBranch className="inline-block mr-2 mb-1 text-purple-500" /> 状态空间建模：节点分裂与隐式图

高级图论问题的难点往往在于“如何构图”。

### 1. 节点分裂 (Node Splitting)
当节点本身具有限制（如点容量、点权）时，可将点 $u$ 分裂为 $u_{in}$ 和 $u_{out}$：
- 连边 $(u_{in}, u_{out})$，权值为原点权。
- 原本进入 $u$ 的边连向 $u_{in}$，原本离开 $u$ 的边从 $u_{out}$ 出发。

### 2. 分层图建模 (Layered Graph)
若某种资源（如“免费次数”、“血量”）有限，可将图复制为 $K$ 层。
- **状态定义**：$V_{i, k}$ 表示在节点 $i$ 且剩余 $k$ 单位资源。
- **跨层连边**：若在 $i \to j$ 消耗资源，则连边 $(V_{i, k}, V_{j, k-1})$。

### 3. 隐式图 (Implicit Graph)
对于如棋盘游戏、拼图（15-puzzle）等问题，图的节点和边不需要显式存储，而是通过函数动态生成。
- **状态表示**：位压缩（Bitmask）或字符串哈希。

---

## 四、 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 工业级建模案例

### 案例 1：网格图向有向图的转化
给定 $N \times M$ 的网格，某些格子不可达。

<KnowledgeCard title="建模技巧" icon={<LayoutList size={20} />}>
- **节点映射**：$ID(x, y) = (x-1) \times M + y$。
- **边**：对于相邻格 $(x_1, y_1)$ 和 $(x_2, y_2)$，若均可达，则连边。
- **注意**：网格图通常是**稀疏图**，边数 $\approx 4NM$，务必使用邻接表。
</KnowledgeCard>

---

## 五、 <Sigma className="inline-block mr-2 mb-1 text-red-500" /> 课后练习 (折叠解答)

### 练习 1：动态加边与查询
如果图是动态加边的，且需要查询两点是否连通，邻接矩阵和并查集哪个更优？

<details>
<summary>Check Solution</summary>

**解析**：
- **邻接矩阵**：加边 $O(1)$，但查询连通性需要 $O(V)$ 或 $O(V^2)$。
- **并查集 (DSU)**：加边和查询几乎均为 $O(\alpha(V))$。
- **结论**：动态连通性首选并查集；若涉及路径权值，可考虑 LCT（Link-Cut Tree）。

</details>

### 练习 2：反向图的存储
在 Tarjan 算法或 Kosaraju 算法中，需要遍历反向图。链式前向星如何优雅实现？

<details>
<summary>Check Solution</summary>

**解析**：
有两种方案：
1. **直接存两份**：`head1` 和 `head2`，分别存储原图和反向图。
2. **利用 XOR 技巧**：加边时按 `add(u, v), add(v, u)` 顺序加入，则 `i^1` 即为其反向边。但注意这种方法存的是无向边或特定语义的反向边。

```cpp
// 推荐方案 1
void add_rev(int u, int v) {
    ver_rev[++tot_rev] = v;
    nxt_rev[tot_rev] = head_rev[u];
    head_rev[u] = tot_rev;
}
```

</details>
