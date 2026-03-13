---
title: 最短路理论体系：松弛、对偶与代数拓扑证明
---

import { Compass, Navigation, Zap, Layers, AlertCircle, Share2, Link, Workflow, Activity, ShieldCheck, Sigma, BookOpen, Clock, Target, Binary, Box } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <Compass className="inline-block mr-2 mb-1 text-blue-600" /> 最短路理论 (Shortest Path Theory)

最短路问题不仅是离散数学的经典课题，更是**对偶理论**与**路径代数 (Path Algebra)** 在图结构上的完美体现。本章将从形式化松弛理论出发，建立路径拓扑的代数证明体系，并深入探讨从 Dijkstra 的贪心收敛到 Johnson 算法的势能变换。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 路径代数与拓扑证明 (Algebraic Topology of Paths)

为了建立系统化的证明，我们引入 **(min, +) 半环 (Tropical Semiring)**。

### 1. 代数结构：Dioid 结构
最短路问题可以抽象为矩阵乘法在 $( \mathbb{R} \cup \{ \infty \}, \min, + )$ 上的运算：
- **加法 $\oplus$**：定义为 $\min(a, b)$。
- **乘法 $\otimes$**：定义为 $a + b$。
- **单位元**：加法单位元为 $\infty$，乘法单位元为 $0$。

在这种代数体系下，邻接矩阵 $A$ 的 $k$ 次幂 $A^{(k)}$ 的元素 $a_{ij}^{(k)}$ 恰好代表从 $i$ 到 $j$ 经过最多 $k$ 条边的最短路径长度。

<KnowledgeCard title="引理 1.1：Kleene 闭包与最短路收敛性" icon={<Binary size={20} />}>
若图中不含负权环，则最短路矩阵 $D$ 等于邻接矩阵的 Kleene 闭包：
$$D = I \oplus A \oplus A^{(2)} \oplus \dots \oplus A^{(n-1)}$$
**证明要点**：
由于无负环，任意最短路径最多包含 $n-1$ 条边。对于 $k \ge n-1$，$A^{(k)}$ 的项不会产生更小的值（即 $\oplus$ 运算下的“更优”）。因此该级数在 $n-1$ 步内收敛。
</KnowledgeCard>

### 2. 形式化松弛算子与收敛性分析 (Relaxation Convergence)
**定义**：对于边 $(u, v) \in E$，松弛操作 $\text{RELAX}(u, v, w)$ 定义为：
$$d[v] = \min(d[v], d[u] + w(u, v))$$

<KnowledgeCard title="引理 1.2：下界不变性与路径松弛性质" icon={<ShieldCheck size={20} />}>
**1. 下界不变性 (Lower-bound Property)**：
对于所有 $v \in V$，在初始化 $d[s]=0, d[v \neq s]=\infty$ 后，执行任意序列的松弛操作，始终满足 $d[v] \ge \delta(s, v)$。
*证明*：初始状态成立。假设对边 $(u, v)$ 松弛前 $d[u] \ge \delta(s, u)$ 且 $d[v] \ge \delta(s, v)$。松弛后 $d'[v] = \min(d[v], d[u] + w(u, v)) \ge \min(\delta(s, v), \delta(s, u) + w(u, v)) = \delta(s, v)$（由三角不等式）。

**2. 路径松弛性质 (Path-relaxation Property)**：
设 $p = \langle v_0, v_1, \dots, v_k \rangle$ 是从 $s=v_0$ 到 $v_k$ 的最短路径。若对 $p$ 的边序列进行松弛操作（即便中间穿插其他边），则 $d[v_k] = \delta(s, v_k)$。
*推论*：Bellman-Ford 算法通过 $n-1$ 轮全边松弛，保证了所有最短路径（长度最多 $n-1$）被正确识别。
</KnowledgeCard>

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 核心算法深度分析与收敛性

### 1. Dijkstra 算法：贪心收敛性证明
Dijkstra 算法本质上是在非负权图上维护一个**已确定集合 $S$**。每次选取 $V \setminus S$ 中 $d[u]$ 最小的点，其贪心选择的正确性由非负权带来的“距离单调递增性”保证。

<KnowledgeCard title="非负权前提下的完备证明" icon={<BookOpen size={20} />}>
**定理**：每次从 $V \setminus S$ 中取出 $d[u]$ 最小的点加入 $S$，必有 $d[u] = \delta(s, u)$。
**证明 (矛盾法)**：
设 $u$ 是第一个加入 $S$ 但 $d[u] > \delta(s, u)$ 的点。考虑 $s \to u$ 的真实最短路 $p$。
1. 路径 $p$ 必在某处离开 $S$，设第一条跨越 $S$ 与 $V \setminus S$ 的边为 $(x, y)$。
2. 由于 $x \in S$ 且 $u$ 是第一个出错点，有 $d[x] = \delta(s, x)$。
3. 松弛 $(x, y)$ 后 $d[y] = \delta(s, x) + w(x, y) = \delta(s, y)$。
4. 因为边权非负，$\delta(s, y) \le \delta(s, u)$。
5. 算法选取了 $u$ 而非 $y$，说明 $d[u] \le d[y]$。
6. 结合以上知 $d[u] \le \delta(s, y) \le \delta(s, u)$。与假设 $d[u] > \delta(s, u)$ 矛盾。
</KnowledgeCard>

### 2. Bellman-Ford 与 SPFA：动态规划的视角
Bellman-Ford 算法可以看作是状态转移方程：
$$dp[k][v] = \min_{(u, v) \in E} \{ dp[k-1][u] + w(u, v) \}$$
其中 $dp[k][v]$ 表示经过最多 $k$ 条边到达 $v$ 的最短路。SPFA (Shortest Path Faster Algorithm) 则是其队列优化版本，利用“只有被松弛的点才可能松弛后续点”的观测。

### 3. Johnson 算法：势能变换 (Reweighting)
Johnson 算法通过引入势能函数 $h(v)$ 重新标定边权：
$$w'(u, v) = w(u, v) + h(u) - h(v)$$
**收敛性分析**：
- **非负性**：选择 $h(v)$ 为从超级源点到 $v$ 的最短路，由三角不等式 $h(v) \le h(u) + w(u, v)$，得 $w'(u, v) \ge 0$。
- **路径不变性**：对于路径 $p = \langle v_0, \dots, v_k \rangle$，其新权值为 $w'(p) = w(p) + h(v_0) - h(v_k)$。对于固定的 $s, t$，所有路径的增量相同，不改变最短路结构。

---

## 三、 <Activity className="inline-block mr-2 mb-1 text-green-500" /> 建模进阶：差分约束系统

差分约束系统是将逻辑约束转化为路径拓扑一致性校验的标准模型。

### 1. 连通性一致性校验
对于约束 $x_j - x_i \le c_k$，连边 $(i, j, c_k)$。
- **存在解条件**：图中不含**负权环**。
- **逻辑一致性**：若存在负权环 $v_1 \to v_2 \to \dots \to v_1$，则累加不等式得 $0 \le \sum c_k < 0$，产生逻辑悖论。

---

## 四、 工业级 C++ 实现 (SPFA 带负环判定)

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
                    if (++cnt[e.to] >= n) return false; // 判定负环
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
在 Dijkstra 过程中维护 `cnt[v]`。
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

```cpp
/**
 * @brief 分层图 Dijkstra 范式
 */
void solve() {
    priority_queue<Node, vector<Node>, greater<Node>> pq;
    dist[1][0] = 0; pq.push({1, 0, 0});
    while (!pq.empty()) {
        auto [u, k, d] = pq.top(); pq.pop();
        if (d > dist[u][k]) continue;
        for (auto& e : adj[u]) {
            if (dist[e.v][k] > d + e.w) {
                dist[e.v][k] = d + e.w; pq.push({e.v, k, dist[e.v][k]});
            }
            if (k < K && dist[e.v][k+1] > d) {
                dist[e.v][k+1] = d; pq.push({e.v, k+1, dist[e.v][k+1]});
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
- **核心结论**：当汇点 $t$ 第 $K$ 次被弹出优先队列时，当前的 $g(t)$ 即为第 $K$ 短路。

</details>

### 练习 4：负环判定进阶 - 01 分数规划
给定带权图，每条边有收益 $a_i$ 和成本 $b_i$，找一个环使得 $\frac{\sum a_i}{\sum b_i}$ 最大。

<details>
<summary>Check Solution</summary>

**解析**：
二分答案 $L$。判定是否存在环满足 $\frac{\sum a_i}{\sum b_i} \ge L \Rightarrow \sum (a_i - L \cdot b_i) \ge 0$。
建立新图，边权为 $w_i = a_i - L \cdot b_i$，跑最长路判定是否存在正环（或取反跑最短路判定负环）。

```cpp
bool check(double mid) {
    for (int i = 1; i <= m; ++i) {
        new_w[i] = a[i] - mid * b[i];
    }
    return has_positive_cycle(); // SPFA 判定
}
```

</details>

### 练习 5：最短路径树 (SPT) 计数
求一个图有多少棵生成树，使得树上根节点到各点的距离等于图中的最短路距离。

<details>
<summary>Check Solution</summary>

**解析**：
首先跑一次源点 $s$ 的最短路。
对于每个点 $v \neq s$，统计满足 $dist[v] = dist[u] + w(u, v)$ 的入边数量 $in\_cnt[v]$。
根据乘法原理，总 SPT 数量为 $\prod_{v \neq s} in\_cnt[v]$。

</details>
