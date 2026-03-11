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
*证明（反证法）*：若存在更短子路径 $p'_{ij}$，则用 $p'_{ij}$ 替换 $p$ 中的 $p_{ij}$ 可得到更短的 $v_1 \to v_k$ 路径，与原假设矛盾。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 算法选型矩阵与复杂度边界

<ComplexityAnalysis 
  data={[
    { algorithm: "BFS (Unit weight)", complexity: "O(V + E)", space: "O(V)", note: "仅限等权图" },
    { algorithm: "Dijkstra (Binary Heap)", complexity: "O(E log V)", space: "O(V + E)", note: "不可处理负权边" },
    { algorithm: "Dijkstra (Fibonacci Heap)", complexity: "O(E + V log V)", space: "O(V + E)", note: "理论最优，常数较大" },
    { algorithm: "Bellman-Ford", complexity: "O(VE)", space: "O(V)", note: "可处理负权边与负环" },
    { algorithm: "SPFA", complexity: "O(kE) [Average]", space: "O(V)", note: "易被特殊构造的数据卡成 O(VE)" },
    { algorithm: "Floyd-Warshall", complexity: "O(V³)", space: "O(V²)", note: "全源最短路，插点 DP" }
  ]}
/>

---

## 三、 <Activity className="inline-block mr-2 mb-1 text-green-500" /> 核心算法深度解析

### 1. Dijkstra 算法：贪心与非负性保证
Dijkstra 维护一个集合 $S$，其中包含已确定最短路的顶点。
**贪心策略**：每次从未确定集合 $V-S$ 中选取 $dist$ 最小的节点 $u$，并对其出边进行松弛。

<KnowledgeCard title="Dijkstra 最优性证明要点" icon={<BookOpen size={20} />}>
**证明思路 (归纳法)**：
假设 $S$ 中的点均已获得最短路值。当选取 $u \in V-S$ 时，若存在更短路径 $s \to x \to u$（其中 $x \in V-S$），由于所有边权 $w \ge 0$，则 $dist(x)$ 必然小于等于 $dist(u)$。而算法保证了 $u$ 是 $V-S$ 中最小的，产生矛盾。
**结论**：只要存在负权边，贪心策略失效。
</KnowledgeCard>

### 2. Bellman-Ford 与 SPFA：松弛定理
所有基于松弛的算法都遵循：$dist[v] = \min(dist[v], dist[u] + w(u, v))$。
- **Bellman-Ford**：进行 $n-1$ 轮全边松弛。若第 $n$ 轮仍能松弛，说明存在负环。
- **SPFA**：仅对发生变化的节点进行松弛，利用队列维护。

---

## 四、 <Link className="inline-block mr-2 mb-1 text-amber-500" /> 建模进阶：差分约束与分层图

### 1. 差分约束系统 (System of Difference Constraints)
将不等式 $x_j - x_i \le w_{ij}$ 转化为图论语言：从 $i$ 向 $j$ 连一条权值为 $w_{ij}$ 的有向边。
- **求最大值**：跑 $s$ 到各点的最短路（限制越多，值越小）。
- **求最小值**：跑 $s$ 到各点的最长路（条件越多，值越大）。

### 2. 分层图最短路 (Layered Graph)
适用于“有 $K$ 次机会改变边权”的问题。
**核心思想**：状态定义从 $dist[u]$ 扩展为 $dist[u][k]$，表示到达节点 $u$ 且已使用了 $k$ 次特权的代价。
**转移方程**：
1. **不使用特权**：$dist[v][k] = \min(dist[v][k], dist[u][k] + w(u, v))$
2. **使用特权**：$dist[v][k+1] = \min(dist[v][k+1], dist[u][k] + w'(u, v))$

---

## 五、 工业级 C++ 模版 (堆优化 Dijkstra)

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

/**
 * @brief 工业级堆优化 Dijkstra 模板
 * 复杂度: O(E log V)
 * 适用: 非负权单源最短路
 */
const long long INF = 0x3f3f3f3f3f3f3f3fLL;

struct Edge {
    int to;
    long long w;
};

struct Node {
    int u;
    long long d;
    bool operator>(const Node& other) const { return d > other.d; }
};

vector<long long> dijkstra(int n, int s, const vector<vector<Edge>>& adj) {
    vector<long long> dist(n + 1, INF);
    priority_queue<Node, vector<Node>, greater<Node>> pq;

    dist[s] = 0;
    pq.push({s, 0});

    while (!pq.empty()) {
        Node top = pq.top(); pq.pop();
        int u = top.u;
        if (top.d > dist[u]) continue; // 懒惰删除：若当前距离已不是最优，跳过

        for (const auto& e : adj[u]) {
            if (dist[u] + e.w < dist[e.to]) {
                dist[e.to] = dist[u] + e.w;
                pq.push({e.to, dist[e.to]});
            }
        }
    }
    return dist;
}
```

---

## 六、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与深度解析

### 练习 1：边权取对数转换
给定正权图，求一条路径使得边权**乘积**最小。

<details>
<summary>Check Solution</summary>

**解析**：
最小化 $\prod w_i$ 等价于最小化 $\ln(\prod w_i) = \sum \ln w_i$。
1. **转化**：建立新权值 $w'_{ij} = \ln w_{ij}$。
2. **算法**：由于 $w > 0$ 则 $\ln w$ 可能为负，但若原意是求**正数乘积最小**，通常 $w \ge 1$（此时 $\ln w \ge 0$ 用 Dijkstra），若存在 $0 < w < 1$，则会出现负边权，需使用 SPFA 检查负环。
3. **还原**：最终答案为 $e^{dist[T]}$。

</details>

### 练习 2：瓶颈路径问题 (Minimax Path)
求一条路径，使得路径上经过的**最大边权**在所有路径中最小。

<details>
<summary>Check Solution</summary>

**方案一：二分答案 + BFS/DFS (通用)**
1. 二分可能的最大权值 $W$。
2. 仅保留 $w \le W$ 的边，检查连通性。复杂度 $O((V+E) \log (\max W))$。

**方案二：Kruskal 变体 (MST 思想)**
1. 将边按权值从小到大排序。
2. 逐一加边，直到 $S$ 与 $T$ 首次连通。此时加入的边权即为答案。

**方案三：Dijkstra 变体**
修改松弛操作：$dist[v] = \min(dist[v], \max(dist[u], w(u, v)))$。

</details>

### 练习 3：第 K+1 大边最小化 (分层图经典)
[POJ 3662] 给定图，可以免费修建 $K$ 条路，求剩下的路中最大权值的最小值。

<details>
<summary>Check Solution</summary>

**解析**：
这是 **二分答案 + 最短路** 的经典组合。
1. **二分**：设当前猜测的最大权值为 $L$。
2. **建图**：若原边权 $w_i > L$，则该边权值设为 1（表示需要消耗一次免费名额）；若 $w_i \le L$，则权值设为 0。
3. **判定**：运行 $0/1 \text{ BFS}$ 或 Dijkstra。若 $dist[T] \le K$，说明存在方案使得超过 $L$ 的边数不超过 $K$，即 $L$ 可行。

</details>
