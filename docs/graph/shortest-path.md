---
title: 最短路算法与图论建模
---

import { Compass, Navigation, Zap, Layers, AlertCircle, Share2, Link, Workflow, Activity } from 'lucide-react';

# <Compass className="inline-block mr-2 mb-1 text-blue-600" /> 最短路算法 (Shortest Path)

在离散数学中，最短路问题不仅是几何意义上的距离最小化，更是**状态空间中转移代价的最优化**。本篇将从基础算法演进至工业级建模技巧。

---

## 一、 <Workflow className="inline-block mr-2 mb-1 text-blue-500" /> 数学定义与形式化描述

给定加权有向图 $G = (V, E, w)$，其中 $w: E \to \mathbb{R}$ 为权函数。路径 $p = (v_0, v_1, \dots, v_k)$ 的权值为 $w(p) = \sum_{i=1}^k w(v_{i-1}, v_i)$。
**最短路权值** $\delta(u, v)$ 定义为：
- $\min \{w(p) : u \xrightarrow{p} v\}$ （若存在路径）
- $\infty$ （若不存在路径）
- $-\infty$ （若存在从 $u$ 可达且可达 $v$ 的负权环）

---

## 二、 <Navigation className="inline-block mr-2 mb-1 text-blue-500" /> 核心算法矩阵

| 算法 | 类型 | 边权约束 | 复杂度 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **BFS** | 单源 (SSSP) | 无权 / 等权 | $O(V+E)$ | 最小步数搜索 |
| **Dijkstra** | 单源 (SSSP) | **非负权** | $O(E \log V)$ | 绝大多数非负权图 |
| **Bellman-Ford** | 单源 (SSSP) | 无限制 | $O(VE)$ | 负权边、负环检测 |
| **SPFA** | 单源 (SSSP) | 无限制 | 平均 $O(kE)$ | 稀疏图、差分约束 |
| **Floyd-Warshall**| 全源 (APSP) | 无限制 | $O(V^3)$ | 小规模图全源路径 |

---

## 三、 <Link className="inline-block mr-2 mb-1 text-purple-500" /> 建模进阶：差分约束系统

**定义**：给定 $n$ 个变量 $x_1, \dots, x_n$ 和 $m$ 个约束条件 $x_j - x_i \le w_{ij}$。求一组可行解。

**转化逻辑**：
1. 不等式 $x_j \le x_i + w_{ij}$ 与最短路中的**松弛操作** $dist[j] \le dist[i] + w_{ij}$ 形式一致。
2. 建立图：对于每个约束，连边 $(i, j)$，权值为 $w_{ij}$。
3. **结论**：
   - 若图中无负环，则 $dist[i]$ 即为一组可行解。
   - 若图中存在负环，则该不等式组**无解**。

---

## 四、 <Layers className="inline-block mr-2 mb-1 text-amber-500" /> 建模进阶：分层图 (Layered Graph)

当问题包含 **$K$ 次决策机会**（如免费过路、费用减半）时，单层图无法表达“决策状态”。

**构造法则**：
1. 建立 $K+1$ 层原图的拷贝。
2. **层内边**：连接 $(u_i, v_i, w)$，表示普通移动。
3. **层间边**：连接 $(u_i, v_{i+1}, 0)$ 或 $(u_i, v_{i+1}, w/2)$，表示使用了一次决策权力。
4. **终点**：答案通常为 $\min_{i=0}^K \{dist[T_i]\}$。

---

## 五、 <Activity className="inline-block mr-2 mb-1 text-green-500" /> 工业级 C++ 实现 (Dijkstra + 路径还原)

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

const long long INF = 1e18;

struct Edge {
    int to;
    int weight;
};

/**
 * @brief Dijkstra 算法实现 (堆优化版)
 * @param start 起点
 * @param g 邻接表表示的图
 * @param dist 存储最短距离
 * @param parent 存储路径前驱，用于路径还原
 */
void dijkstra(int start, const vector<vector<Edge>>& g, vector<long long>& dist, vector<int>& parent) {
    int n = g.size();
    dist.assign(n, INF);
    parent.assign(n, -1);
    
    using Node = pair<long long, int>; // {distance, vertex}
    priority_queue<Node, vector<Node>, greater<Node>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d > dist[u]) continue;

        for (const auto& edge : g[u]) {
            if (dist[u] + edge.weight < dist[edge.to]) {
                dist[edge.to] = dist[u] + edge.weight;
                parent[edge.to] = u;
                pq.push({dist[edge.to], edge.to});
            }
        }
    }
}

/**
 * @brief 还原最短路径
 */
vector<int> restore_path(int target, const vector<int>& parent) {
    vector<int> path;
    for (int v = target; v != -1; v = parent[v])
        path.push_back(v);
    reverse(path.begin(), path.end());
    return path;
}
```

---

## 六、 配套练习 (折叠解答)

### 练习 1：最短路计数
给定一个无权图，如何计算从 $S$ 到 $T$ 的最短路径条数？

<details>
<summary>查看解析</summary>

**分析**：
由于是无权图，最短路即 BFS 的层数。
1. 在 BFS 过程中，维护 `count[v]`。
2. 初始化 `count[S] = 1`。
3. 当遍历到边 $(u, v)$ 时：
   - 若 `dist[v]` 未访问：`dist[v] = dist[u] + 1`, `count[v] = count[u]`。
   - 若 `dist[v] == dist[u] + 1`：`count[v] += count[u]`。
**复杂度**：$O(V+E)$。

</details>

### 练习 2：多约束差分
变量满足 $x_i - x_j \le 5$ 且 $x_i - x_j \ge 2$。如何建边？

<details>
<summary>查看解析</summary>

**分析**：
差分约束要求形式为 $A - B \le C$。
1. $x_i - x_j \le 5 \implies$ 连边 $(j, i, 5)$。
2. $x_i - x_j \ge 2 \implies x_j - x_i \le -2 \implies$ 连边 $(i, j, -2)$。
注意负权边的出现意味着必须使用 SPFA 或 Bellman-Ford。

</details>

### 练习 3：边权取对数
给定一个正权图，求一条路径使得路径上所有边权的**乘积**最小。

<details>
<summary>查看解析</summary>

**分析**：
最小化 $\prod w_i$ 等价于最小化 $\log(\prod w_i) = \sum \log(w_i)$。
1. 将所有边权 $w$ 替换为 $\log(w)$。
2. 运行 Dijkstra 算法。
3. 最终结果为 $\exp(dist[T])$。

</details>
