---
title: 最短路算法与建模进阶
---

import { Compass, Navigation, Zap, Layers, AlertCircle, Share2, Link, Workflow, Activity, ShieldCheck, Sigma } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <Compass className="inline-block mr-2 mb-1 text-blue-600" /> 最短路算法 (Shortest Path)

最短路问题是图论建模中最具生命力的研究方向之一。它不仅解决几何空间中的距离问题，更是**状态空间中转移代价的最优化**。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 形式化定义

给定加权图 $G = (V, E, w)$，其中 $w: E \to \mathbb{R}$ 为权函数。路径 $p = (v_0, v_1, \dots, v_k)$ 的权值为 $w(p) = \sum_{i=1}^k w(v_{i-1}, v_i)$。
**最短路权值** $\delta(u, v)$ 定义为：
- $\min \{w(p) : u \xrightarrow{p} v\}$ （若存在通路）
- $\infty$ （若不可达）
- $-\infty$ （若存在从 $u$ 可达且可达 $v$ 的**负权环**）

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 核心算法矩阵

| 算法 | 类型 | 边权约束 | 复杂度 | 核心思想 |
| :--- | :--- | :--- | :--- | :--- |
| **BFS** | SSSP | 无权 / 等权 | $O(V+E)$ | 逐层扩张 (Level Expansion) |
| **Dijkstra** | SSSP | **非负权** | $O(E \log V)$ | 贪心策略 + 优先级队列 |
| **Bellman-Ford** | SSSP | 无限制 | $O(VE)$ | 动态规划 + 松弛操作 |
| **SPFA** | SSSP | 无限制 | 平均 $O(kE)$ | 队列优化版 Bellman-Ford |
| **Floyd-Warshall**| APSP | 无限制 | $O(V^3)$ | 插点 DP ($k$ 为中间跳板) |

---

## 三、 <Activity className="inline-block mr-2 mb-1 text-green-500" /> 核心算法深度解析

### 1. Floyd-Warshall：插点 DP 的精髓
状态定义：$dp[k][i][j]$ 表示仅允许使用前 $k$ 个点作为中间跳板，从 $i$ 到 $j$ 的最短路。
**转移方程**：
$dp[k][i][j] = \min(dp[k-1][i][j], \ dp[k-1][i][k] + dp[k-1][k][j])$
*注：空间上可压缩至二维数组。*

### 2. SPFA 与 负环判定
SPFA (Shortest Path Faster Algorithm) 是 Bellman-Ford 的启发式队列优化。
**负环准则**：若某个点入队次数超过 $n$ 次（或路径边数 $\ge n$），则图中必然存在负环。

---

## 四、 <Link className="inline-block mr-2 mb-1 text-amber-500" /> 建模进阶：差分约束系统

**定义**：给定 $m$ 个不等式 $x_j - x_i \le w_{ij}$，求变量 $x$ 的可行解。

<KnowledgeCard title="差分约束与最短路映射" icon={<ShieldCheck size={20} />}>
不等式 $x_j \le x_i + w_{ij}$ 与最短路的松弛性质 $dist[j] \le dist[i] + w(i, j)$ 结构完全对等。
1. **建图**：对于每个约束，建立 $i \to j$ 的有向边，权值为 $w_{ij}$。
2. **求解**：运行单源最短路（如 SPFA）。
3. **结论**：
   - 若无负环，$dist[i]$ 即为满足约束的一组解。
   - 若有负环，说明不等式组相互矛盾，**无解**。
</KnowledgeCard>

---

## 五、 <Layers className="inline-block mr-2 mb-1 text-indigo-500" /> 建模进阶：分层图 (Layered Graph)

当决策过程中伴随**有限次特殊操作**（如：免费 $K$ 次、翻倍 $K$ 次）时，需要构建分层图。

**构造法则**：
1. **状态复制**：将原图复制 $K+1$ 层。
2. **决策转换**：
   - **普通移动**：层内连边 $(u_i, v_i, w)$。
   - **使用特殊权利**：层间连边 $(u_i, v_{i+1}, 0)$ 或 $(u_i, v_{i+1}, w')$。
3. **结果**：答案为 $\min_{i=0}^K \{dist[T_i]\}$。

---

## 六、 工业级 C++ 实现 (堆优化 Dijkstra)

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

const long long INF = 1e18;

struct Edge {
    int to, weight;
};

vector<long long> dijkstra(int n, int start, const vector<vector<Edge>>& adj) {
    vector<long long> dist(n + 1, INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;

        for (auto& e : adj[u]) {
            if (dist[u] + e.weight < dist[e.to]) {
                dist[e.to] = dist[u] + e.weight;
                pq.push({dist[e.to], e.to});
            }
        }
    }
    return dist;
}
```

---

## 七、 配套练习 (折叠解答)

### 练习 1：边权取对数
给定正权图，求一条路径使得边权**乘积**最小。

<details>
<summary>点击查看解析</summary>

**分析**：
最小化 $\prod w_i$ 等价于最小化 $\sum \log(w_i)$。
1. 将所有边权 $w$ 替换为 $\log(w)$。
2. 运行 Dijkstra 算法。
3. 最终答案为 $\exp(dist[T])$。
*注意：$\log(w)$ 始终非负当 $w \ge 1$；若有 $0 < w < 1$，会出现负权边，需改用 SPFA。*

</details>

### 练习 2：路径上的最大边权最小
如何求一条从 $S$ 到 $T$ 的路径，使得路径上经过的**最大边权**最小？

<details>
<summary>点击查看解析</summary>

**方案一：二分答案**
1. 二分最大边权 $X$。
2. 将所有 $w > X$ 的边暂时屏蔽，检查 $S, T$ 是否连通。

**方案二：修改 Dijkstra**
1. 松弛操作改为：$dist[v] = \min(dist[v], \max(dist[u], w(u, v)))$。
2. 运行 Dijkstra 即可。

</details>

### 练习 3：第 $K+1$ 长边的最小值
在分层图中，如果允许 $K$ 条边免费，求路径上剩下的边中最大权的最小值。

<details>
<summary>点击查看解析</summary>

**分析**：
这是一个典型的“二分 + 最短路”组合。
1. 二分最大边权限制 $L$。
2. 建图：若原边权 $w > L$，则视为权值为 1 的边（需使用一次免费机会）；若 $w \le L$，视为权值为 0。
3. 运行最短路，若 $dist[T] \le K$，则 $L$ 可行。

</details>
