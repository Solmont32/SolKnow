---
title: 最短路理论体系：松弛、对偶与势能函数
---

import { Compass, Navigation, Zap, Layers, AlertCircle, Share2, Link, Workflow, Activity, ShieldCheck, Sigma, BookOpen, Clock, Target } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <Compass className="inline-block mr-2 mb-1 text-blue-600" /> 最短路理论 (Shortest Path Theory)

最短路问题不仅是离散数学的经典课题，更是**对偶理论**在图论中的完美体现。本章将从形式化松弛 (Relaxation) 理论出发，深入探讨从 Dijkstra 的贪心收敛到 Johnson 算法的势能变换。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 形式化松弛理论 (Formal Relaxation Theory)

最短路算法的核心在于对**三角不等式 (Triangle Inequality)** 的迭代满足。对于带权图 $G=(V, E, w)$，令 $\delta(s, v)$ 为源点 $s$ 到 $v$ 的真实最短距离。

### 1. 松弛算子与不变性 (Invariant)
**定义 (Relaxation)**：对于边 $(u, v) \in E$，松弛操作 $\text{RELAX}(u, v, w)$ 定义为：
$$\text{if } d[v] > d[u] + w(u, v) \text{ then } d[v] = d[u] + w(u, v)$$

<KnowledgeCard title="引理 1.1：下界不变性 (Lower-bound Property)" icon={<ShieldCheck size={20} />}>
对于所有 $v \in V$，在初始化 $d[s]=0, d[v \neq s]=\infty$ 后，执行任意次数的松弛操作，始终满足 $d[v] \ge \delta(s, v)$。且一旦 $d[v]$ 达到 $\delta(s, v)$，它将不再改变。
**证明要点**：
对松弛次数施加归纳法。初始时成立。假设在第 $k$ 次松弛前成立，考虑 $\text{RELAX}(u, v, w)$。
由归纳假设 $d[u] \ge \delta(s, u)$，则 $d[u] + w(u, v) \ge \delta(s, u) + w(u, v)$。
由三角不等式 $\delta(s, u) + w(u, v) \ge \delta(s, v)$，故 $d[u] + w(u, v) \ge \delta(s, v)$。
松弛后 $d[v] = \min(d[v]_{old}, d[u] + w(u, v)) \ge \delta(s, v)$。
</KnowledgeCard>

### 2. 路径松弛性质 (Path-Relaxation Property)
**引理 1.2**：设 $p = \langle v_0, v_1, \dots, v_k \rangle$ 是从 $v_0=s$ 到 $v_k$ 的一条最短路径。若对该路径上的边依次执行松弛操作 $\text{RELAX}(v_0, v_1), \text{RELAX}(v_1, v_2), \dots, \text{RELAX}(v_{k-1}, v_k)$，则无论这些操作之间插入了多少其他松弛操作，最终必有 $d[v_k] = \delta(s, v_k)$。

### 3. Bellman-Ford 收敛性证明
**定理 1.3**：若图 $G$ 不含从 $s$ 可达的负权环，则在执行 $|V|-1$ 轮全边松弛后，对于所有从 $s$ 可达的 $v \in V$，均有 $d[v] = \delta(s, v)$。
**证明**：
考虑 $s \to v$ 的一条最短路 $p$。由于无负环，$p$ 最多包含 $|V|-1$ 条边。
在第 $i$ 轮全边松弛中，必包含了对 $p$ 中第 $i$ 条边 $(v_{i-1}, v_i)$ 的松弛。
根据**路径松弛性质**，第 $i$ 轮后 $d[v_i] = \delta(s, v_i)$。
当 $i = |V|-1$ 时，$d[v] = \delta(s, v)$ 获证。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 核心算法深度分析

### 1. Dijkstra 的贪心收敛性
<KnowledgeCard title="非负权前提下的归纳证明" icon={<BookOpen size={20} />}>
**命题**：每次从 $V \setminus S$ 中取出 $d[u]$ 最小的点，必有 $d[u] = \delta(s, u)$。
**证明**：假设 $u$ 是第一个不满足该命题的点。考虑 $s \to u$ 的真实最短路 $p$。路径 $p$ 必在某处离开 $S$，设第一条跨越 $S$ 与 $V \setminus S$ 的边为 $(x, y)$。
由于 $x \in S$，有 $d[x] = \delta(s, x)$。松弛后 $d[y] = \delta(s, x) + w(x, y) = \delta(s, y)$。
因为边权非负，$\delta(s, y) \le \delta(s, u)$。而算法选取了 $u$ 而非 $y$，说明 $d[u] \le d[y]$。
从而 $d[u] = d[y] = \delta(s, u)$，与假设矛盾。
</KnowledgeCard>

### 2. Johnson 算法：势能函数的妙用
Johnson 算法通过重标定 (Reweighting) 消除负边权：
- 定义新边权 $w'(u, v) = w(u, v) + h(u) - h(v)$。
- **目标**：寻找 $h(v)$ 使得 $w'(u, v) \ge 0$。由三角不等式知，$h(v)$ 可由 SSSP（如 Bellman-Ford）求得。
- **路径等价性**：$w'(p) = w(p) + h(s) - h(t)$，因此 SSSP 的序关系保持不变。

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

### 练习 2：分层图建模 - 魔法飞行
在 $N$ 个城市之间飞行，可以使 $K$ 条航线的费用变为 $0$。求从 $1$ 到 $N$ 的最小费用。

<details>
<summary>Check Solution</summary>

**解析**：
建立 $K+1$ 层图。节点 $(u, k)$ 表示在 $u$ 点且已使用了 $k$ 次免费机会。
- **层内边**：$(u, k) \xrightarrow{w} (v, k)$。
- **层间边**：$(u, k) \xrightarrow{0} (v, k+1)$。
最终结果为 $\min_{k=0}^K \{ d(N, k) \}$。

```cpp
/**
 * @brief 分层图 Dijkstra 范式
 */
struct Node {
    int u, k; long long d;
    bool operator>(const Node& o) const { return d > o.d; }
};

void solve() {
    priority_queue<Node, vector<Node>, greater<Node>> pq;
    memset(dist, 0x3f, sizeof dist);
    dist[1][0] = 0;
    pq.push({1, 0, 0});

    while (!pq.empty()) {
        auto [u, k, d] = pq.top(); pq.pop();
        if (d > dist[u][k]) continue;
        for (auto& e : adj[u]) {
            // 正常走边
            if (dist[e.v][k] > d + e.w) {
                dist[e.v][k] = d + e.w;
                pq.push({e.v, k, dist[e.v][k]});
            }
            // 使用免费机会
            if (k < K && dist[e.v][k+1] > d) {
                dist[e.v][k+1] = d;
                pq.push({e.v, k+1, dist[e.v][k+1]});
            }
        }
    }
}
```

</details>

### 练习 3：第 K 短路问题 (A* Algorithm)
求 $s \to t$ 的第 $K$ 短路径权值。

<details>
<summary>Check Solution</summary>

**解析**：
利用 $A^*$ 搜索。
- **启发式函数 $h(u)$**：$u$ 到 $t$ 的真实最短路（在反图上以 $t$ 为源跑一次 Dijkstra 预处理）。
- **优先级**：$f(u) = g(u) + h(u)$。
- **核心结论**：当汇点 $t$ 第 $K$ 次被弹出优先队列时，当前的 $g(t)$ 即为第 $K$ 短路。

```cpp
/**
 * @brief A* 启发式搜索求第 K 短路
 */
struct State {
    int u; long long g, f;
    bool operator>(const State& o) const { return f > o.f; }
};

long long a_star(int s, int t, int k) {
    if (s == t) k++; // 起点即终点特判
    priority_queue<State, vector<State>, greater<State>> pq;
    pq.push({s, 0, h[s]});
    int cnt = 0;
    while (!pq.empty()) {
        auto [u, g, f] = pq.top(); pq.pop();
        if (u == t) {
            if (++cnt == k) return g;
        }
        for (auto& e : adj[u]) {
            pq.push({e.v, g + e.w, g + e.w + h[e.v]});
        }
    }
    return -1;
}
```

</details>
