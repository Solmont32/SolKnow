---
title: 最短路算法与状态建模
---

import { Compass, Navigation, Zap, Layers, AlertCircle, Share2 } from 'lucide-react';

# <Compass className="inline-block mr-2 mb-1 text-blue-600" /> 最短路算法 (Shortest Path)

最短路算法不仅用于求地理上的路径，更是**状态转移代价最小化**的底层引擎。在图论建模中，每一个点往往代表一个状态，每一条边则代表一次动作。

## 一、 <Navigation className="inline-block mr-2 mb-1 text-blue-500" /> 问题分类与建模

1.  **单源最短路 (SSSP)**：从一点出发到所有点的最短路。
2.  **全源最短路 (APSP)**：任意两点间的最短路。
3.  **状态建模**：
    -   **分层图最短路**：处理具有“限制次数”的特殊权力（如 $k$ 次免费边）。
    -   **差分约束**：将变量间的代数不等式（$x_j - x_i \le w$）转化为边权关系。

---

## 二、 核心算法：Dijkstra (非负权单源)

Dijkstra 是一种基于**贪心与松弛**的算法。它的核心前提是边权非负。

-   **堆优化复杂度**：$O((n+m) \log n)$。

```cpp
vector<long long> dijkstra(int n, int s, const vector<vector<pair<int, int>>>& g) {
    const long long INF = 1e18;
    vector<long long> dist(n + 1, INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    dist[s] = 0; pq.push({0, s});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& [v, w] : g[u])
            if (dist[v] > d + w) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
    }
    return dist;
}
```

---

## 三、 负权图处理：Bellman-Ford / SPFA

当图中包含负权边时，Dijkstra 失效。需使用基于多次全图松弛的算法。

-   **负环判定**：若 $n-1$ 轮松弛后仍能更新，则存在从起点可达的负环。
-   **SPFA 警示**：最坏情况下 SPFA 退化为 $O(nm)$，在网格图或特定构造图上极易被卡。

---

## 四、 <Layers className="inline-block mr-2 mb-1 text-purple-500" /> 全源最短路：Floyd-Warshall

Floyd 算法是一种**动态规划**。
-   **状态**：`dp[k][i][j]` 表示中间点只允许使用 $1 \dots k$ 时，$i$ 到 $j$ 的最短路。
-   **转移**：`dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])`。
-   **复杂度**：$O(n^3)$。

---

## 五 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 建模实战：分层图

**场景**：有 $n$ 个城市，$m$ 条带权路。你拥有 $k$ 次将任意一条路费用减半的特权。求从起点到终点的最小花费。

**方法**：
1.  建立 $k+1$ 层拓扑结构相同的图。
2.  层内连接普通边 $(u, v, w)$。
3.  层间（从 $i$ 层到 $i+1$ 层）连接特殊边 $(u, v, w/2)$。
4.  答案为 $\min_{0 \le i \le k} \{ dist[i][T] \}$。

---

## 六、 配套练习（答案折叠）

### 练习 1（选型）
若图有 500 个点，需要频繁查询任意两点间的最短路，应使用哪种算法？

<details>
<summary>点击查看过程与答案</summary>

**分析**：$n=500$ 时，$n^3 = 1.25 \times 10^8$，勉强可以通过，且 Floyd 预处理一次后查询仅需 $O(1)$。
**答案**：Floyd-Warshall。

</details>

### 练习 2（计算）
点 1 到点 2 的边权为 5，点 1 到点 3 的边权为 10，点 3 到点 2 的边权为 -10。Dijkstra 能否算出 1 到 2 的正确最短路？

<details>
<summary>点击查看过程与答案</summary>

**分析**：Dijkstra 第一次取出点 2 确定 $dist[2]=5$ 后便不再更新点 2。但实际最短路为 $1 \to 3 \to 2 = 0$。
**答案**：不能。负边权破坏了 Dijkstra 的贪心正确性。

</details>

### 练习 3（进阶）
如何在 Dijkstra 中记录并还原出最短路径的具体节点序列？

<details>
<summary>点击查看过程与答案</summary>

**分析**：在每次成功松弛 `dist[v] > dist[u] + w` 时，记录 `pre[v] = u`。
**答案**：使用 `pre` 数组记录前驱节点，最后从终点逆序回溯即可。

</details>
