---
title: 最短路算法：理论体系与建模进阶
---

import { Compass, Navigation, Zap, Layers, AlertCircle, Share2, Link, Workflow, Activity, ShieldCheck, Sigma, BookOpen, Clock, Target } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <Compass className="inline-block mr-2 mb-1 text-blue-600" /> 最短路算法 (Shortest Path Theory)

最短路问题不仅是图论建模的基础，更是**动态规划 (DP)** 在特殊状态空间（有环图）下的表现形式。本章将从严格的数学定义出发，深入探讨从非负权图贪心策略到负权图松弛理论的演进。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 形式化定义与公理化性质

### 1. 最短路权值定义

给定带权有向图 $G = (V, E, w)$，路径 $p = \langle v_0, v_1, \dots, v_k \rangle$ 的权值 $w(p) = \sum_{i=1}^k w(v_{i-1}, v_i)$。
单源最短路权值 $\delta(s, v)$ 为：

$$
\delta(s, v) = \begin{cases}
\min \{w(p) : s \xrightarrow{p} v\} & \text{if a path exists} \\
\infty & \text{if } v \text{ is unreachable} \\
-\infty & \text{if a reachable negative cycle exists}
\end{cases}
$$

### 2. 最短路的最优子结构 (Optimal Substructure)

**定理**：若 $p = \langle v_1, v_2, \dots, v_k \rangle$ 是从 $v_1$ 到 $v_k$ 的最短路，则对于任意 $1 \le i \le j \le k$，子路径 $p_{ij} = \langle v_i, \dots, v_j \rangle$ 也是从 $v_i$ 到 $v_j$ 的最短路。
_证明 (反证法)_：若存在更短子路径 $p'_{ij}$，则用 $p'_{ij}$ 替换 $p$ 中的 $p_{ij}$ 可得到更短的 $v_1 \to v_k$ 路径，与 $p$ 是最短路的前提矛盾。

### 3. 三角不等式 (Triangle Inequality)

对于任意边 $(u, v) \in E$，最短路权值满足：$\delta(s, v) \le \delta(s, u) + w(u, v)$。这是所有最短路算法收敛的数学依据。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 算法选型矩阵与复杂度边界

<ComplexityAnalysis
data={[
{ algorithm: "BFS (Unit weight)", complexity: "O(V + E)", space: "O(V)", note: "仅限等权图" },
{ algorithm: "Dijkstra (Binary Heap)", complexity: "O(E log V)", space: "O(V + E)", note: "不可处理负权边" },
{ algorithm: "Bellman-Ford", complexity: "O(VE)", space: "O(V)", note: "可处理负权边与负环" },
{ algorithm: "SPFA", complexity: "O(kE) [Avg]", space: "O(V)", note: "Bellman-Ford 的队列优化版" },
{ algorithm: "Floyd-Warshall", complexity: "O(V³)", space: "O(V²)", note: "全源最短路，插点 DP" },
{ algorithm: "Johnson", complexity: "O(VE + VE log V)", space: "O(V+E)", note: "含负权边的全源最短路" }
]}
/>

---

## 三、 <Activity className="inline-block mr-2 mb-1 text-green-500" /> 核心算法深度解析

### 1. Dijkstra 算法：贪心与非负性

Dijkstra 维护一个集合 $S$，其中包含已确定最短路的顶点。
<KnowledgeCard title="Dijkstra 正确性证明" icon={<BookOpen size={20} />}>
**证明要点**：
假设 $S$ 是当前已确定最短路的点集。算法每次选取 $u \in V \setminus S$ 中 $dist[u]$ 最小的点。
若存在另一条更短路径 $s \to \dots \to x \to y \to \dots \to u$（其中 $x \in S, y \notin S$），则 $dist[y] = dist[x] + w(x, y)$。由于所有边权 $w \ge 0$，且 $dist[u]$ 是 $V \setminus S$ 中最小的，必有 $dist[u] \le dist[y]$。因此该替代路径不可能更短。
**结论**：若存在负权边，贪心序失效，必须使用松弛算法。
</KnowledgeCard>

### 2. Floyd-Warshall：动态规划视角

状态定义：$dp[k][i][j]$ 表示经过前 $k$ 个节点作为中间点时，$i$ 到 $j$ 的最短距离。
转移方程：$dp[k][i][j] = \min(dp[k-1][i][j], dp[k-1][i][k] + dp[k-1][k][j])$。
空间优化：由于 $k$ 层仅依赖 $k-1$ 层，可压缩至 $O(V^2)$。

### 3. Bellman-Ford 与松弛性质

**收敛性质**：在一个含有 $n$ 个点的图中，不含负环的最短路最多包含 $n-1$ 条边。
**判定负环**：若在第 $n$ 次全边松弛中仍有 $dist$ 减小，则图中必然存在从源点可达的负环。

---

## 四、 <Link className="inline-block mr-2 mb-1 text-amber-500" /> 建模进阶：Johnson 算法与差分约束

### 1. Johnson 算法：权值重标定 (Reweighting)

为了在含负权边的图上跑全源最短路，Johnson 算法通过势能函数 $h(v)$ 将边权 $w(u, v)$ 转化为 $w'(u, v) = w(u, v) + h(u) - h(v) \ge 0$。

1. 新增源点 $s'$ 连向所有点，边权 0。
2. 跑一遍 Bellman-Ford 求得 $s'$ 到各点的最短路作为 $h(v)$。
3. 转化边权后，对每个点跑 Dijkstra。
4. 最终距离还原：$dist(u, v) = dist'(u, v) + h(v) - h(u)$。

### 2. 差分约束系统 (System of Difference Constraints)

将不等式 $x_j - x_i \le w_{ij}$ 转化为边 $i \to j$ 权值 $w_{ij}$。

- **最大值问题**：$\max(x_i - x_j)$ 对应 $j \to i$ 的最短路。
- **无解判定**：对应图中存在负环。

---

## 五、 工业级 C++ 模板 (全能型 Dijkstra)

```cpp
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

/**
 * @brief 工业级堆优化 Dijkstra
 * 复杂度: O(E log V)
 * 能够处理大规模稀疏图
 */
template<typename T = long long>
struct Dijkstra {
    const T INF = numeric_limits<T>::max();
    struct Edge { int to; T w; };
    vector<vector<Edge>> adj;

    Dijkstra(int n) : adj(n + 1) {}

    void add_edge(int u, int v, T w) { adj[u].push_back({v, w}); }

    vector<T> solve(int s, int n) {
        vector<T> dist(n + 1, INF);
        using P = pair<T, int>;
        priority_queue<P, vector<P>, greater<P>> pq;

        dist[s] = 0;
        pq.push({0, s});

        while(!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if(d > dist[u]) continue;
            for(auto& e : adj[u]) {
                if(dist[u] + e.w < dist[e.to]) {
                    dist[e.to] = dist[u] + e.w;
                    pq.push({dist[e.to], e.to});
                }
            }
        }
        return dist;
    }
};
```

---

## 六、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：负权边下的最短路

给定一个含负权边但不含负环的图，求单源最短路。

<details>
<summary>Check Solution</summary>

**解析**：
不能使用 Dijkstra，必须使用 **Bellman-Ford** 或其优化版 **SPFA**。

1. **SPFA 流程**：使用队列维护待松弛的点。
2. **风险点**：SPFA 在网格图或特殊构造的“菊花图”中复杂度会退化为 $O(VE)$。
3. **安全选择**：若数据规模较小，Bellman-Ford 更稳健。

</details>

### 练习 2：最长路问题 (DAG Longest Path)

求一个 DAG 中两点间的最长路径。

<details>
<summary>Check Solution</summary>

**解析**：

1. **取负法**：将所有边权 $w$ 变为 $-w$，然后跑最短路。
2. **DP 法**：利用拓扑序，状态转移为 $f[v] = \max(f[v], f[u] + w(u, v))$。
   _注意：若图中含正环，最长路问题是 NP-Hard 的。_

</details>

### 练习 3：分层图建模 - 飞行路线

有 $n$ 个城市和 $m$ 条航线，可以免费乘坐 $k$ 次航线。求 $s \to t$ 最小花费。

<details>
<summary>Check Solution</summary>

**解析**：
构建 $k+1$ 层图。

1. **同层连边**：第 $i$ 层内按照原图连边，权值为航线价格。
2. **跨层连边**：从第 $i$ 层的 $u$ 向第 $i+1$ 层的 $v$ 连边，权值为 $0$（代表使用了一次免费机会）。
3. **目标**：求第 $0$ 层 $s$ 到各层 $t$ 的最短路最小值。
   **复杂度**：$O(kE \log (kV))$。

</details>
