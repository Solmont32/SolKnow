---
title: 网络流算法：理论深度与建模范式
---

import { GitMerge, Zap, Activity, ShieldCheck, Layers, Landmark, ArrowRightLeft, Maximize, Sigma, Workflow, BookOpen, Target } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <GitMerge className="inline-block mr-2 mb-1 text-blue-500" /> 网络流理论 (Network Flow Theory)

网络流是图论中兼具工业实用性与数学美感的领域。它不仅解决了资源的最优分配问题，其背后的**最大流最小割定理 (Max-Flow Min-Cut Theorem)** 更是凸优化理论中对偶性 (Duality) 的经典体现。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 形式化公理系统

### 1. 流网络与可行流

给定有向图 $G=(V, E)$，每条边 $(u, v)$ 有容量 $c(u, v) \ge 0$。一个**可行流** $f: V \times V \to \mathbb{R}$ 必须满足：

1. **容量限制 (Capacity Constraint)**：$\forall u, v \in V, f(u, v) \le c(u, v)$。
2. **斜对称性 (Skew Symmetry)**：$\forall u, v \in V, f(u, v) = -f(v, u)$。
3. **流量守恒 (Flow Conservation)**：对于所有 $u \in V - \{s, t\}$，$\sum_{v \in V} f(u, v) = 0$。

### 2. 残量网络与增广路 (Residual Network)

- **残量网络 $G_f$**：由具有剩余容量的边组成的图。边 $(u, v)$ 的残量为 $c_f(u, v) = c(u, v) - f(u, v)$。
  - 注意：若 $f(u, v) > 0$，则在 $G_f$ 中存在反向边 $(v, u)$，其容量为 $f(u, v)$，代表可“回退”的流量。
- **增广路 (Augmenting Path)**：残量网络 $G_f$ 中从源点 $s$ 到汇点 $t$ 的一条简单路径。

### 3. 最大流最小割定理 (Max-Flow Min-Cut Theorem)

**定理**：对于一个流网络 $G$，下列三个陈述是等价的：

1.  $f$ 是 $G$ 的一个最大流。
2.  残量网络 $G_f$ 不包含任何增广路。
3.  $|f| = c(S, T)$，其中 $(S, T)$ 是 $G$ 的某个最小割。

<KnowledgeCard title="定理证明简述" icon={<BookOpen size={20} />}>
**(1) $\Rightarrow$ (2)**：若存在增广路，则可以沿着该路径增加流量，与 $f$ 是最大流矛盾。
**(2) $\Rightarrow$ (3)**：若 $G_f$ 无增广路，定义 $S$ 为 $G_f$ 中从 $s$ 可达的点集，$T = V \setminus S$。显然 $s \in S, t \in T$。对于任意 $u \in S, v \in T$，必有 $f(u, v) = c(u, v)$（否则 $v$ 在 $G_f$ 中可达），且 $f(v, u) = 0$（否则 $u$ 可由 $v$ 在残量图中回退到达）。因此通过割的净流量 $\sum_{u \in S, v \in T} f(u, v) = \sum c(u, v) = c(S, T)$。
**(3) $\Rightarrow$ (1)**：由于任何流的值都不可能超过任意割的容量（$|f| \le c(S, T)$），若相等，则 $f$ 必为最大流。
</KnowledgeCard>

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-green-500" /> 算法收敛性与复杂度分析

### 1. 整数性定理 (Integrality Theorem)

若流网络中所有容量均为整数，则存在一个最大流，其每一条边上的流量也均为整数。这是解决组合优化问题的数学基础。

### 2. Edmonds-Karp 算法收敛性

Edmonds-Karp 算法通过 BFS 寻找最短增广路。其复杂度为 $O(VE^2)$，且**即使容量为实数也能收敛**。
**关键证明点**：在 $G_f$ 中，$s$ 到任意节点 $v$ 的最短距离 $d_f(s, v)$ 是单调不减的。每次增广至少会使一条边从残量网络中消失，且该边恢复时距离必然增加。

### 3. Dinic 算法：分层图优化

Dinic 算法通过**分层图**减少了增广路搜索的盲目性，并引入当前弧优化。

<ComplexityAnalysis
data={[
{ algorithm: "Ford-Fulkerson", complexity: "O(E|f|)", space: "O(V+E)", note: "依赖于流量大小，实数容量可能不收敛" },
{ algorithm: "Edmonds-Karp", complexity: "O(VE²)", space: "O(V+E)", note: "最短增广路，与流量无关" },
{ algorithm: "Dinic (General)", complexity: "O(V²E)", space: "O(V+E)", note: "分层图 + 当前弧优化，实践性能极佳" },
{ algorithm: "ISAP", complexity: "O(V²E)", space: "O(V+E)", note: "改进的预流推进思想，单次 BFS" }
]}
/>

---

## 三 <Landmark className="inline-block mr-2 mb-1 text-purple-500" /> 建模范式与复杂约束

### 1. 最大权闭合子图 (Max Weight Closure)

给定带权点集，选择点 $u$ 必须选择其所有后继点。
**转化结论**：$\text{最大权} = \sum_{w_i > 0} w_i - \text{最小割}$。

- $S \to v$ (若 $w_v > 0$)，容量 $w_v$。
- $v \to T$ (若 $w_v < 0$)，容量 $|w_v|$。
- 原图依赖 $u \to v$，容量 $\infty$。

### 2. 最小割的性质：最小边数割

若要求在保证最小割容量的前提下，使得**割边数量最少**。
**方案**：将每条边的权值 $w$ 修改为 $w' = w \times (E+1) + 1$。

- 此时最小割 $C = \sum (w_i \times (E+1) + 1) = \text{OldCut} \times (E+1) + \text{EdgeCount}$。
- 由于 $\text{EdgeCount} \le E < E+1$，优先保证 $\text{OldCut}$ 最小，其次保证 $\text{EdgeCount}$ 最小。

---

## 四、 工业级 C++ 实现 (Dinic 范式)

```cpp
#include <vector>
#include <queue>
#include <algorithm>
#include <limits>

using namespace std;

/**
 * @brief Dinic 算法工业级模板
 * 包含：当前弧优化、分层图 BFS、多路增广 DFS
 */
template<typename T = long long>
class Dinic {
    const T INF = numeric_limits<T>::max();
    struct Edge {
        int to, rev;
        T cap;
    };
    vector<vector<Edge>> adj;
    vector<int> level, ptr;

public:
    Dinic(int n) : adj(n), level(n), ptr(n) {}

    void add_edge(int from, int to, T cap) {
        adj[from].push_back({to, (int)adj[to].size(), cap});
        adj[to].push_back({from, (int)adj[from].size() - 1, 0});
    }

    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        level[s] = 0;
        queue<int> q; q.push(s);
        while (!q.empty()) {
            int v = q.front(); q.pop();
            for (auto& edge : adj[v]) {
                if (edge.cap > 0 && level[edge.to] == -1) {
                    level[edge.to] = level[v] + 1;
                    q.push(edge.to);
                }
            }
        }
        return level[t] != -1;
    }

    T dfs(int v, int t, T pushed) {
        if (pushed == 0 || v == t) return pushed;
        for (int& cid = ptr[v]; cid < adj[v].size(); ++cid) {
            auto& edge = adj[v][cid];
            if (level[v] + 1 != level[edge.to] || edge.cap == 0) continue;
            T tr_pushed = dfs(edge.to, t, min(pushed, edge.cap));
            if (tr_pushed == 0) continue;
            edge.cap -= tr_pushed;
            adj[edge.to][edge.rev].cap += tr_pushed;
            return tr_pushed;
        }
        return 0;
    }

    T max_flow(int s, int t) {
        T flow = 0;
        while (bfs(s, t)) {
            fill(ptr.begin(), ptr.end(), 0);
            while (T pushed = dfs(s, t, INF)) flow += pushed;
        }
        return flow;
    }
};
```

---

## 五、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：最大流最小割的方案构造

求出最大流后，如何输出最小割集中的所有边？

<details>
<summary>Check Solution</summary>

**解析**：

1. **运行最大流**：得到最终的残量网络 $G_f$。
2. **BFS 标记**：从源点 $s$ 开始在 $G_f$ 中进行一次 BFS/DFS，标记所有可达点，记为集合 $S$。
3. **识别割边**：遍历原图中所有有向边 $(u, v)$，若 $u \in S$ 且 $v \notin S$，则该边属于最小割集。
   _注意：对于最小费用最大流，割的构造更为复杂。_

</details>

### 练习 2：混合图欧拉回路

给定既有有向边又有无向边的图，问是否能为无向边定向使其构成欧拉回路。

<details>
<summary>Check Solution</summary>

**解析 (网络流建模)**：

1. **预处理**：先对无向边随意定向。计算每个点的出入度差 $D_i = out\_i - in\_i$。
2. **必要条件**：所有点的总度数必须为偶数且 $D_i$ 必须为偶数。
3. **平衡流量**：
   - 若 $D_i > 0$，从 $i \to T$ 连边，容量 $D_i/2$。
   - 若 $D_i < 0$，从 $S \to i$ 连边，容量 $-D_i/2$。
   - 对于原无向边 $(u, v)$，连边 $u \to v$，容量 1（代表可以反转该边的方向来改变出入度）。
4. **结论**：若源点 $S$ 发出的所有边满流，则存在欧拉回路。

</details>

### 练习 3：Project Selection Problem (经典建模)

有 $n$ 个项目和 $m$ 个仪器。做项目 $i$ 收益为 $p_i$，需要仪器集合 $R_i$。买仪器 $j$ 代价为 $c_j$。求最大利润。

<details>
<summary>Check Solution</summary>

**解析**：
这就是**最大权闭合子图**的直接应用。

1. **点集**：项目为正权点，仪器为负权点。
2. **连边**：从项目 $i$ 向其所需的所有仪器 $j$ 连容量为 $\infty$ 的边。
3. **计算**：$\sum p_i - \text{MinCut}$。
   **C++ 代码片段**：

```cpp
// 伪代码：建图逻辑
for(int i=1; i<=n; ++i) dinic.add_edge(S, i, p[i]), total_profit += p[i];
for(int j=1; j<=m; ++j) dinic.add_edge(j+n, T, c[j]);
for(auto requirement : req) dinic.add_edge(requirement.proj, requirement.instr + n, INF);
long long ans = total_profit - dinic.max_flow(S, T);
```

</details>
