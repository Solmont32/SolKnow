---
title: 搜索算法与启发式策略 (Search Algorithms & Heuristics)
---

import { Search, Zap, Target, Thermometer, Box, ArrowRightCircle, Layers, ShieldCheck, Activity, Cpu, Database } from 'lucide-react';

# <Target className="inline-block mr-2 mb-1 text-purple-500" /> 搜索算法与启发式策略

搜索 (Search) 是解决复杂决策、组合最优化及路径规划问题的普适性框架。在计算复杂性理论视角下，许多 NP-Hard 问题在缺乏多项式时间解法时，必须遍历**状态空间 (State Space)**。本章旨在探讨如何通过严密的数学建模、状态空间压缩、估价函数诱导以及时空权衡，将指数级复杂度降至工程可接受范围。

---

## 零、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 系统化状态空间建模与优化

一个完备的搜索问题可形式化为五元组 $\mathcal{M} = \langle S, A, T, s_0, G \rangle$。优化搜索效率的第一步在于对 $S$ 的精简与高效表示。

### 1. 状态压缩与位运算 (State Compression)
当状态由多个二进制特征（如集合包含关系、开关状态）组成时，利用位掩码 (Bitmask) 可实现 $O(1)$ 的状态转移与空间极小化。
- **集合表示**：$S \subseteq \{0, \dots, n-1\}$ 可映射为整数 $mask = \sum_{i \in S} 2^i$。
- **技巧**：`mask & (1 << i)` (判断), `mask | (1 << i)` (添加), `mask ^ (1 << i)` (翻转)。

### 2. 对称性破缺与等效压缩 (Symmetry Breaking)
若状态空间存在群作用下的对称性（如旋转、镜像、全排列等效），应仅保留其**等效类代表元 (Canonical Form)**。
- **实例**：在 $N$ 皇后问题中，通过旋转 90/180/270 度对称的解只算一个。
- **实现**：通过定义某种标准全序，在搜索分支产生时强制执行 $s_1 < s_2 < \dots$，从而消除重复路径。

---

## 一、 <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 搜索树优化：系统化剪枝策略

剪枝 (Pruning) 的核心是在搜索树遍历中，利用逻辑断言提前终止对无效子树的访问。

### 1. 剪枝分类与形式化准则

| 策略类别 | 判定准则 (Predicate) | 优化逻辑 |
| :--- | :--- | :--- |
| **可行性剪枝 (Feasibility)** | $\nexists \, \tau: s \xrightarrow{\tau} G$ | 若当前状态已无法满足约束，立即回溯。 |
| **最优性剪枝 (Optimality)** | $g(s) + f_{low}(s) \ge \text{ans}_{best}$ | 若当前代价 + 理想最小余下代价已劣于已知最优，则剪枝。 |
| **搜索顺序 (Ordering)** | $\arg \max_{a \in A} P(T(s, a) \rightsquigarrow G)$ | 优先探索“成功率高”或“约束强”的分支，及早更新 `ans_best`。 |
| **记忆化搜索 (Memoization)** | $s \in \text{Visited}[S]$ | 利用哈希表或数组记录已处理状态，避免重复搜索。 |

### 2. 例题：[生日蛋糕 - 深度综合剪枝]
> 给定体积 $V$ 和层数 $M$，要求蛋糕表面积最小（不含底面积）。各层半径 $R_i$ 和高度 $H_i$ 均为正整数，且满足 $R_i > R_{i+1}, H_i > H_{i+1}$。

<details>
<summary>C++ 高级剪枝分析与实现</summary>

**优化点**：
1. **范围确定**：由 $V = \sum R_i^2 H_i$，得 $R_u \in [u, \min(\sqrt{V_{rem}}, R_{u+1}-1)]$。
2. **可行性剪枝**：预处理每一层最小体积 $minV[i]$ 和表面积 $minS[i]$。若 $V_{cur} + minV[u] > V_{total}$，剪。
3. **最优性剪枝**：若 $S_{cur} + minS[u] \ge ans$，剪。
4. **数学推导剪枝**：利用 $S_{side} = \sum 2R_i H_i = \sum \frac{2R_i^2 H_i}{R_i} > \frac{2V_{rem}}{R_u}$。若 $S_{cur} + \frac{2V_{rem}}{R_u} \ge ans$，剪。

```cpp
#include <iostream>
#include <cmath>
#include <algorithm>

using namespace std;

int n, m, ans = 1e9;
int minv[25], mins[25];

void dfs(int u, int v, int s, int r, int h) {
    if (u == 0) {
        if (v == n) ans = min(ans, s);
        return;
    }
    // 剪枝组合
    if (v + minv[u] > n) return;
    if (s + mins[u] >= ans) return;
    if (s + 2 * (n - v) / r >= ans) return; // 数学推导最优性剪枝

    for (int i = min((int)sqrt(n - v), r - 1); i >= u; i--) {
        if (u == m) s = i * i;
        for (int j = min((n - v) / (i * i), h - 1); j >= u; j--) {
            dfs(u - 1, v + i * i * j, s + 2 * i * j, i, j);
        }
    }
}

int main() {
    cin >> n >> m;
    for (int i = 1; i <= m; i++) {
        minv[i] = minv[i - 1] + i * i * i;
        mins[i] = mins[i - 1] + 2 * i * i;
    }
    dfs(m, 0, 0, sqrt(n), n);
    cout << (ans == 1e9 ? 0 : ans) << endl;
    return 0;
}
```
</details>

---

## 二、 <Zap className="inline-block mr-2 mb-1 text-yellow-500" /> 双向搜索与折半查找 (Bidirectional & Meet-in-the-middle)

对于分支因子为 $b$，目标深度为 $d$ 的搜索树：
- **单向搜索**：$O(b^d)$
- **双向搜索**：从起点与终点同步扩展，相遇点深度各为 $d/2$，复杂度降为 $O(2 \cdot b^{d/2})$。

**折半搜索 (Meet-in-the-middle)** 是其在组合问题中的典型应用。例如：$N=40$ 的子集和问题，单搜 $2^{40} \approx 10^{12}$ 超时，拆分为 $2^{20} + 2^{20} \approx 2 \cdot 10^6$，配合二分查找或哈希表实现 $O(2^{N/2} \cdot \log(2^{N/2}))$。

---

## 三、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 估价函数设计与启发式引导 (A* & IDA*)

启发式搜索利用**估价函数 (Heuristic Function)** $h(n)$ 引导搜索方向。

### 1. 估价函数的理论基石
$f(n) = g(n) + h(n)$
- $g(n)$：起始点到当前点的实际代价。
- $h(n)$：当前点到目标的预测代价。

**关键性质**：
- **可接受性 (Admissibility)**：$\forall n, 0 \le h(n) \le h^*(n)$。保证 A* 找到全局最优解。
- **一致性 (Consistency)**：$h(n) \le c(n, a, n') + h(n')$。保证 $f(n)$ 沿路径非递减，节点仅需扩展一次。

### 2. 设计策略：松弛问题 (Relaxation)
设计 $h(n)$ 的常用方法是**忽略某些约束**。
- **八数码问题**：忽略“只能移动到空格”的约束 $\Rightarrow$ 曼哈顿距离。
- **TSP 问题**：忽略“必须形成环”的约束 $\Rightarrow$ 最小生成树 (MST) 代价。

---

## 四、 <Cpu className="inline-block mr-2 mb-1 text-orange-500" /> 时空权衡：迭代加深与 IDA*

在大规模状态空间中，BFS 的空间消耗（指数级）常成为瓶颈。

### 1. 迭代加深 (Iterative Deepening DFS, IDDFS)
IDDFS 每次限定搜索深度 $d$，若未找到解则 $d \gets d+1$。它结合了 DFS 的低空间复杂度 ($O(d)$) 与 BFS 的最短路特性。

### 2. IDA*：启发式迭代加深
IDA* 将深度限制替换为 $f(n) = g(n) + h(n)$ 的限制。
- **优点**：无需维护 Open/Closed 表，空间消耗极低。
- **应用场景**：状态空间巨大且最优解深度有限的问题（如魔方、N-Puzzle）。

---

## 五、 <Database className="inline-block mr-2 mb-1 text-indigo-500" /> 状态存储与哈希技巧 (Space-Time Tradeoffs)

### 1. Zobrist Hashing
一种针对棋类或复杂状态的增量式哈希。为每个位置的每个可能值预分配一个 64 位随机数。
$Hash(S') = Hash(S) \oplus Rand[pos][val_{old}] \oplus Rand[pos][val_{new}]$。
极大地加速了状态判重。

### 2. 状态压缩与 Bloom Filter
在极大规模搜索中，若无法精确存储所有状态，可利用位图或布隆过滤器实现常数级冲突率的概率性剪枝。

---

## 🎯 综合练习与实战

### 练习 1：[第 k 短路 - A* 算法应用]
> 给定有向图，求从起点 $S$ 到终点 $T$ 的第 $k$ 短路径长度。

<details>
<summary>Check Solution: A* + 反向 Dijkstra 估价</summary>

**思路**：
1. **估价函数**：$h(x)$ 定义为 $x$ 到 $T$ 的最短路长度。可以通过在反向图上运行 Dijkstra 预处理。
2. **搜索过程**：使用优先队列维护 $(f(x), g(x), x)$。当终点 $T$ 第 $k$ 次被从队列中弹出时，对应的 $g(x)$ 即为结果。

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

const int MAXN = 1005;
struct Edge { int to, w; };
vector<Edge> g[MAXN], rg[MAXN];
int dist[MAXN], cnt[MAXN], n, m, s, t, k;

void dijkstra() {
    fill(dist, dist + MAXN, 1e9);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    dist[t] = 0;
    pq.push({0, t});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& e : rg[u]) {
            if (dist[e.to] > dist[u] + e.w) {
                dist[e.to] = dist[u] + e.w;
                pq.push({dist[e.to], e.to});
            }
        }
    }
}

int a_star() {
    if (dist[s] == 1e9) return -1;
    priority_queue<pair<int, pair<int, int>>, vector<pair<int, pair<int, int>>>, greater<pair<int, pair<int, int>>>> pq;
    pq.push({dist[s], {0, s}});
    while (!pq.empty()) {
        auto cur = pq.top(); pq.pop();
        int f = cur.first, g_val = cur.second.first, u = cur.second.second;
        cnt[u]++;
        if (cnt[t] == k) return g_val;
        if (cnt[u] > k) continue; 

        for (auto& e : g[u]) {
            pq.push({g_val + e.w + dist[e.to], {g_val + e.w, e.to}});
        }
    }
    return -1;
}
```
</details>

### 练习 2：[埃及分数 - IDA* 深度搜索]
> 将分数 $a/b$ 分解为若干互不相同的单位分数（分子为 1）之和，要求项数最少。若项数相同，则最后分母最小。

<details>
<summary>Check Solution: IDA* 策略分析</summary>

**IDA* 建模**：
1. **层数限制**：限定分解出的项数 $d$。
2. **估价函数**：若当前剩余 $res = a/b$，且已选的最大分母为 $low$，则至少还需要 $\lceil res / (1/low) \rceil$ 项。若该值超过剩余项数，剪枝。
3. **分母范围**：下一项 $1/i$ 需满足 $1/i < res$ 且 $1/i \times \text{rem\_steps} > res$。

```cpp
typedef long long ll;
ll ans[105], path[105], limit;

ll gcd(ll a, ll b) { return b ? gcd(b, a % b) : a; }

bool dfs(ll d, ll a, ll b, ll last) {
    if (d == limit) {
        if (a == 0) return true;
        return false;
    }
    ll start = max(last + 1, (b + a - 1) / a);
    bool found = false;
    for (ll i = start; ; i++) {
        if (b * (limit - d) <= a * i) break; 
        path[d] = i;
        ll na = a * i - b, nb = b * i;
        ll g = gcd(na, nb);
        if (dfs(d + 1, na / g, nb / g, i)) {
            if (!found || path[limit - 1] < ans[limit - 1]) {
                for (int j = 0; j < limit; j++) ans[j] = path[j];
            }
            found = true;
        }
    }
    return found;
}
```
</details>

---

*“在有限的算力面前，搜索的艺术即是『有原则地放弃』。通过 $h(n)$ 洞察未来，通过剪枝约束当下，方能于万亿状态中取敌首级。”*
