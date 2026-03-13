---
title: 网络流深度理论：对偶性、单位网络与建模进阶
---

import { GitMerge, Zap, Activity, ShieldCheck, Layers, Landmark, ArrowRightLeft, Maximize, Sigma, Workflow, BookOpen, Target } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <GitMerge className="inline-block mr-2 mb-1 text-blue-500" /> 网络流理论 (Network Flow Theory)

网络流不仅是组合优化的核心，更是**线性规划 (Linear Programming)** 在图结构上的投影。本章将从形式化对偶性出发，系统性地构建流网络的性质证明、割集收敛性分析及其在单位网络中的复杂度界限。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 形式化理论体系

### 1. 流网络与可行流
**定义 (Flow Network)**：一个流网络 $G=(V, E, c, s, t)$ 是一个有向图，其中 $c(u, v) \ge 0$ 为容量函数，$s, t$ 分别为源点和汇点。

**定义 (Feasible Flow)**：函数 $f: V \times V \to \mathbb{R}$ 满足以下性质时称为可行流：
1. **容量限制 (Capacity Constraint)**：$\forall u, v \in V, f(u, v) \le c(u, v)$。
2. **斜对称性 (Skew Symmetry)**：$\forall u, v \in V, f(u, v) = -f(v, u)$。
3. **流量守恒 (Flow Conservation)**：$\forall u \in V \setminus \{s, t\}, \sum_{v \in V} f(u, v) = 0$。

### 2. 割集与流量收敛性
**定义 (Cut)**：网络 $G$ 的一个割 $(S, T)$ 是对顶点集 $V$ 的一个划分，使得 $s \in S, t \in T$。

**引理 (Net Flow Across a Cut)**：穿过任意割 $(S, T)$ 的净流量等于流的价值 $|f|$。
$$\text{Proof: } f(S, T) = \sum_{u \in S} \sum_{v \in T} f(u, v) = \sum_{u \in S} \left( \sum_{v \in V} f(u, v) - \sum_{v \in S} f(u, v) \right)$$
根据守恒律，当 $u \neq s$ 时 $\sum_{v \in V} f(u, v) = 0$；而 $f(S, S) = 0$（由于斜对称性）。
故 $f(S, T) = \sum_{v \in V} f(s, v) = |f|$。

---

## 二、 <ShieldCheck className="inline-block mr-2 mb-1 text-indigo-500" /> 最大流最小割定理 (Max-Flow Min-Cut Theorem)

该定理是网络流理论的基石，建立了组合优化中原问题与对偶问题的桥梁。

### 1. 核心命题
以下三个命题是等价的：
1. $f$ 是 $G$ 的一个最大流。
2. 残量网络 $G_f$ 不包含任何增广路径。
3. 存在某个割 $(S, T)$，使得 $|f| = c(S, T)$。

### 2. 逻辑验证：割集的收敛性
由于对于任意流 $f$ 和任意割 $(S, T)$，始终满足 $|f| \le c(S, T)$。
当增广路径消失时，令 $S$ 为 $G_f$ 中从 $s$ 可达的点集，$T = V \setminus S$。
此时对于 $\forall u \in S, v \in T$，必有 $c_f(u, v) = 0$（否则 $v$ 可达），即 $f(u, v) = c(u, v)$。
由引理知 $|f| = f(S, T) = c(S, T)$，达到上界。

---

## 三、 <Workflow className="inline-block mr-2 mb-1 text-green-500" /> 特殊网络的复杂度边界

### 1. 单位网络 (Unit Network)
若图中所有边的容量均为 $1$：
- **一般图**：Dinic 复杂度为 $O(E \min(V^{2/3}, E^{1/2}))$。
- **二分图匹配**：Dinic 复杂度为 $O(E \sqrt{V})$，等价于 Hopcroft-Karp。

### 2. 节点容量限制
若每个节点 $v$ 也有通过能力上限 $C_v$，则通过**节点分裂**：
- 连边 $(v_{in}, v_{out})$，容量为 $C_v$。
- 原本进入 $v$ 的边连向 $v_{in}$，离开 $v$ 的边连向 $v_{out}$。

---

## 三、 <Landmark className="inline-block mr-2 mb-1 text-purple-500" /> 建模进阶：最小费用最大流 (MCMF)

### 1. 费用流对偶：势能函数
在费用流中，为了处理负权边并使用 Dijkstra，我们引入势能 $h(u)$。
- **新费用**：$w'_{uv} = w_{uv} + h(u) - h(v) \ge 0$。
- **更新**：每次增广后，$h(u) = h(u) + dist(u)$。

### 2. 经典模型：上下界网络流
若边 $(u, v)$ 有流量下界 $l_{uv}$ 和上界 $c_{uv}$：
- **无源汇可行流**：建立新源点 $S', T'$，调整容量为 $c-l$，并通过 $S', T'$ 平衡每个点的入流量与出流量。

---

## 四、 工业级 C++ 实现 (MCMF Dijkstra 版)

```cpp
/**
 * @brief 最小费用最大流 (MCMF) Dijkstra + 势能优化
 * 复杂度: O(F E log V), 其中 F 为最大流量
 */
template<typename Cap = int, typename Cost = int>
struct MCMF {
    struct Edge { int to, rev; Cap cap; Cost cost; };
    vector<vector<Edge>> adj;
    vector<Cost> dist, h;
    vector<int> prevv, preve;

    void add_edge(int u, int v, Cap cap, Cost cost) {
        adj[u].push_back({v, (int)adj[v].size(), cap, cost});
        adj[v].push_back({u, (int)adj[u].size() - 1, 0, -cost});
    }

    pair<Cap, Cost> solve(int s, int t, Cap f) {
        Cap res_f = 0; Cost res_c = 0;
        h.assign(adj.size(), 0);
        while (f > 0) {
            priority_queue<pair<Cost, int>, vector<pair<Cost, int>>, greater<>> pq;
            dist.assign(adj.size(), numeric_limits<Cost>::max());
            dist[s] = 0; pq.push({0, s});
            while (!pq.empty()) {
                auto [d, v] = pq.top(); pq.pop();
                if (dist[v] < d) continue;
                for (int i = 0; i < adj[v].size(); ++i) {
                    auto& e = adj[v][i];
                    if (e.cap > 0 && dist[e.to] > dist[v] + e.cost + h[v] - h[e.to]) {
                        dist[e.to] = dist[v] + e.cost + h[v] - h[e.to];
                        prevv[e.to] = v; preve[e.to] = i;
                        pq.push({dist[e.to], e.to});
                    }
                }
            }
            if (dist[t] == numeric_limits<Cost>::max()) break;
            for (int v = 0; v < adj.size(); ++v) h[v] += dist[v];
            Cap d = f;
            for (int v = t; v != s; v = prevv[v]) d = min(d, adj[prevv[v]][preve[v]].cap);
            f -= d; res_f += d; res_c += d * h[t];
            for (int v = t; v != s; v = prevv[v]) {
                auto& e = adj[prevv[v]][preve[v]];
                e.cap -= d; adj[v][e.rev].cap += d;
            }
        }
        return {res_f, res_c};
    }
};
```

---

## 五、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：最小割模型 - 方格取数 (2)
给定 $N \times M$ 的方格，每个点有权值。选择某些点，使得选出的点互不相邻，且总权值最大。

<details>
<summary>Check Solution</summary>

**解析**：
1. **二分图性质**：方格图是天然的二分图（按 $x+y$ 奇偶性染色）。
2. **转化**：最大独立集 = 总权值 - 最小覆盖。
3. **建模**：
   - $S \to \text{黑点}$，容量为点权。
   - $\text{白点} \to T$，容量为点权。
   - 相邻黑白点连边，容量 $\infty$。
4. **计算**：$\sum \text{Weight} - \text{MaxFlow}$。

</details>

### 练习 2：费用流模型 - 修理店问题
有 $n$ 个顾客需要修理 $m$ 种仪器，修理工 $j$ 修仪器 $i$ 耗时 $t_{ij}$。求平均等待时间最少。

<details>
<summary>Check Solution</summary>

**解析**：
关键在于：修理工 $j$ 修第 $k$ 个人的贡献是其耗时加上后面所有人的等待时间。
- 将每个修理工 $j$ 拆成 $n$ 个点 $V_{j, k}$，表示“修理工 $j$ 在修倒数第 $k$ 个仪器”。
- 连边 $(i, V_{j, k})$，权值为 $k \times t_{ij}$，容量为 $1$。
- 求最小费用流量为 $n$ 的流。

</details>

### 练习 3：上下界可行流 - 矩阵填充
给定矩阵行列之和的范围，判定是否存在满足要求的非负整数矩阵。

<details>
<summary>Check Solution</summary>

**解析**：
这是一个典型的**有源汇上下界可行流**问题。
1. **建模**：行看作点 $R_i$，列看作点 $C_j$。
2. **约束**：$S \to R_i$ 容量为 $[RowSum_i, RowSum_i]$，各行各列交点 $R_i \to C_j$ 容量为 $[L_{ij}, R_{ij}]$。
3. **转化**：构建附加源汇 $S', T'$，若附加边满流则存在可行矩阵。

</details>
