---
title: 最短路理论体系：松弛、对偶与势能函数
---

import { Compass, Navigation, Zap, Layers, AlertCircle, Share2, Link, Workflow, Activity, ShieldCheck, Sigma, BookOpen, Clock, Target } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <Compass className="inline-block mr-2 mb-1 text-blue-600" /> 最短路理论 (Shortest Path Theory)

最短路问题不仅是离散数学的经典课题，更是**对偶理论**在图论中的完美体现。本章将从形式化松弛 (Relaxation) 理论出发，深入探讨从 Dijkstra 的贪心收敛到 Johnson 算法的势能变换。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 形式化理论体系

### 1. 三角不等式与松弛操作
对于边 $(u, v) \in E$，最短路权值 $\delta(s, v)$ 必须满足：
$$\delta(s, v) \le \delta(s, u) + w(u, v)$$
**松弛操作 (Relaxation)**：对于估计值 $d[v]$，若执行 $d[v] = \min(d[v], d[u] + w(u, v))$，其本质是向不动点 $\delta$ 的逼近。

### 2. 线性规划对偶 (LP Duality)
单源最短路问题可建模为如下线性规划：
- **目标**：$\max \sum_{v \in V} d[v]$
- **约束**：$d[v] - d[u] \le w(u, v), \forall (u, v) \in E$ 且 $d[s] = 0$。
此问题的对偶即为**最小费用流**的一种特殊形式。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 核心算法深度证明

### 1. Dijkstra 的贪心收敛性
<KnowledgeCard title="非负权前提下的归纳证明" icon={<BookOpen size={20} />}>
**命题**：每次从 $V \setminus S$ 中取出 $d[u]$ 最小的点，必有 $d[u] = \delta(s, u)$。
**证明**：假设 $u$ 是第一个不满足该命题的点。考虑 $s \to u$ 的真实最短路 $p$。路径 $p$ 必在某处离开 $S$，设第一条跨越 $S$ 与 $V \setminus S$ 的边为 $(x, y)$。
由于 $x \in S$，有 $d[x] = \delta(s, x)$。松弛后 $d[y] = \delta(s, x) + w(x, y) = \delta(s, y)$。
因为边权非负，$\delta(s, y) \le \delta(s, u)$。而算法选取了 $u$ 而非 $y$，说明 $d[u] \le d[y]$。
从而 $d[u] = d[y] = \delta(s, u)$，与假设矛盾。
</KnowledgeCard>

### 2. Johnson 算法：势能函数的妙用
为了处理负权边并运行全源 Dijkstra，我们引入势能函数 $h(v)$：
- 定义新边权 $w'(u, v) = w(u, v) + h(u) - h(v)$。
- **目标**：寻找 $h(v)$ 使得 $w'(u, v) \ge 0$。
- **解法**：由三角不等式 $h(v) \le h(u) + w(u, v)$ 知，$h(v)$ 可取源点到各点的最短路长度。

---

## 三、 <Activity className="inline-block mr-2 mb-1 text-green-500" /> 建模进阶：差分约束系统

差分约束系统是形式化逻辑向图论转化的桥梁。

### 1. 标准形式
给定 $m$ 个约束：$x_j - x_i \le c_k$。
- **转化**：连边 $(i, j)$，权值为 $c_k$。
- **结论**：若图中存在**负环**，则系统无解；否则最短路即为一组可行解。

### 2. 技巧：最大值 vs 最小值
- 求 $x_i - x_j$ 的**最大值**：跑 $j \to i$ 的最短路。
- 求 $x_i - x_j$ 的**最小值**：跑 $j \to i$ 的最长路（等价于不等式取反跑最短路）。

---

## 四、 工业级 C++ 实现 (带负环判定)

```cpp
/**
 * @brief SPFA 算法：支持负权边与负环判定
 * 复杂度: 平均 O(kE), 最坏 O(VE)
 */
bool spfa(int s, int n, vector<long long>& dist) {
    dist.assign(n + 1, INF);
    vector<int> cnt(n + 1, 0);
    vector<bool> in_queue(n + 1, false);
    queue<int> q;

    dist[s] = 0; q.push(s); in_queue[s] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop(); in_queue[u] = false;
        for (auto& e : adj[u]) {
            if (dist[e.to] > dist[u] + e.w) {
                dist[e.to] = dist[u] + e.w;
                if (!in_queue[e.to]) {
                    q.push(e.to); in_queue[e.to] = true;
                    if (++cnt[e.to] >= n) return false; // 存在负环
                }
            }
        }
    }
    return true;
}
```

---

## 五 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：最短路计数 (Modulo $10^9+7$)
给定无向图，求 $1$ 到各点的最短路条数。

<details>
<summary>Check Solution</summary>

**解析**：
在 Dijkstra 或 BFS 的过程中维护 `cnt[v]`。
- 若 `dist[v] > dist[u] + w`：更新 `dist[v]` 并设 `cnt[v] = cnt[u]`。
- 若 `dist[v] == dist[u] + w`：`cnt[v] = (cnt[v] + cnt[u]) % MOD`。

```cpp
// C++ 核心逻辑
if (dist[v] > d + w) {
    dist[v] = d + w;
    cnt[v] = cnt[u];
    pq.push({dist[v], v});
} else if (dist[v] == d + w) {
    cnt[v] = (cnt[v] + cnt[u]) % MOD;
}
```

</details>

### 练习 2：分层图建模 - 魔法药剂
可以使 $K$ 条边的权值变为 $0$。

<details>
<summary>Check Solution</summary>

**解析**：
建立 $K+1$ 层图。
- 节点 $(u, k)$ 表示在 $u$ 点且剩余 $k$ 次魔法。
- 边 $(u, k) \xrightarrow{w} (v, k)$。
- 边 $(u, k) \xrightarrow{0} (v, k-1)$。
**复杂度**：$O(K(V+E) \log (KV))$。

</details>

### 练习 3：第 K 短路问题 (A*)
求 $s \to t$ 的第 $K$ 短路径权值。

<details>
<summary>Check Solution</summary>

**解析**：
利用 $A^*$ 搜索。
- **估价函数 $h(u)$**：$u$ 到 $t$ 的真实最短路（反向 Dijkstra 预处理）。
- **优先级**：$f(u) = g(u) + h(u)$。
- **停止条件**：当 $t$ 第 $K$ 次从堆中弹出时，其 $g(t)$ 即为所求。

</details>
