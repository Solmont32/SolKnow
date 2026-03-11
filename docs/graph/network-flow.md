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
1. **容量限制 (Capacity Constraint)**：$f(u, v) \le c(u, v)$。
2. **斜对称性 (Skew Symmetry)**：$f(u, v) = -f(v, u)$。
3. **流量守恒 (Flow Conservation)**：对于所有 $u \in V - \{s, t\}$，$\sum_{v \in V} f(u, v) = 0$。

### 2. 残量网络与增广路 (Residual Network)
- **残量网络 $G_f$**：边 $(u, v)$ 的残量为 $c_f(u, v) = c(u, v) - f(u, v)$。
- **增广路**：残量网络中从 $s$ 到 $t$ 的简单路径。

### 3. 最大流最小割定理
**定理**：在一个流网络中，下列三个条件等价：
1. $f$ 是 $G$ 的一个最大流。
2. 残量网络 $G_f$ 不包含增广路。
3. 存在一个割 $(S, T)$，使得 $f$ 的值等于 $c(S, T)$。
*意义*：最小割是网络传输能力的绝对瓶颈，最大流是对该瓶颈的完美填充。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-green-500" /> 核心算法：Dinic 范式

Dinic 算法通过**分层图**减少了增广路搜索的盲目性，是目前工业界处理大规模网络流的首选。

<ComplexityAnalysis 
  data={[
    { algorithm: "Dinic (General Graph)", complexity: "O(V²E)", space: "O(V + E)", note: "实践中常数极小，远快于理论界" },
    { algorithm: "Dinic (Unit Capacities)", complexity: "O(E min(V^{2/3}, E^{1/2}))", space: "O(V + E)", note: "在单位容量网络中性能卓越" },
    { algorithm: "Dinic (Bipartite Matching)", complexity: "O(E sqrt{V})", space: "O(V + E)", note: "与 Hopcroft-Karp 复杂度一致" }
  ]}
/>

### 核心优化策略
- **分层图 BFS**：建立 $level$ 数组，确保 DFS 仅沿最短路径增广。
- **当前弧优化 (Current Arc)**：避免在同一层内重复扫描已无法增广的边（这是 Dinic 达到理论复杂度的关键）。
- **多路增广**：一次 DFS 尽可能多地回溯流量。

---

## 三、 <Landmark className="inline-block mr-2 mb-1 text-purple-500" /> 建模范式：从图论到逻辑约束

### 1. 最大权闭合子图 (Max Weight Closure)
**定义**：给定带权点，若选点 $u$ 则必须选其所有后继点。求最大总权值。
**建模方案**：
- 建立源点 $S$ 连向所有**正权点**，容量为点权。
- 建立所有**负权点**连向汇点 $T$，容量为点权的绝对值。
- 原图依赖关系 $(u, v)$ 连边 $u \to v$，容量 $\infty$。
**结论**：$\text{最大权} = \sum \text{正权和} - \text{最小割}$。

### 2. 最小路径覆盖 (Minimum Path Cover)
在 DAG 中用最少的路径覆盖所有顶点。
**转化**：拆点构造二分图，$\text{路径数} = \text{顶点数} - \text{最大匹配数}$。

### 3. 流量上下界 (Bounded Flow)
要求 $l(u, v) \le f(u, v) \le c(u, v)$。
**转化**：引入新源汇 $S', T'$，计算出入流量缺口，通过寻找 $S' \to T'$ 的满流来判定可行性。

---

## 四、 工业级 C++ 实现 (Dinic 完美版)

```cpp
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

/**
 * @brief Dinic 算法实现 (包含当前弧优化)
 * 复杂度: O(V^2 E)
 */
class Dinic {
public:
    struct Edge {
        int to, rev;
        long long cap;
    };
    vector<vector<Edge>> adj;
    vector<int> level, ptr;

    Dinic(int n) : adj(n), level(n), ptr(n) {}

    void add_edge(int from, int to, long long cap) {
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

    long long dfs(int v, int t, long long pushed) {
        if (pushed == 0 || v == t) return pushed;
        for (int& cid = ptr[v]; cid < adj[v].size(); ++cid) {
            auto& edge = adj[v][cid];
            int tr = edge.to;
            if (level[v] + 1 != level[tr] || edge.cap == 0) continue;
            long long tr_pushed = dfs(tr, t, min(pushed, edge.cap));
            if (tr_pushed == 0) continue;
            edge.cap -= tr_pushed;
            adj[tr][edge.rev].cap += tr_pushed;
            return tr_pushed;
        }
        return 0;
    }

    long long max_flow(int s, int t) {
        long long flow = 0;
        while (bfs(s, t)) {
            fill(ptr.begin(), ptr.end(), 0);
            while (long long pushed = dfs(s, t, 1e18)) {
                flow += pushed;
            }
        }
        return flow;
    }
};
```

---

## 五、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：最大流最小割的对偶性
[经典] 在一个 $N \times M$ 的方格中放置不互相攻击的骑士（跳日字），最多放多少个？

<details>
<summary>Check Solution</summary>

**分析**：
1. **性质分析**：骑士在方格图中只能从黑格跳向白格，具有天然的**二分性**。
2. **建模**：最大不攻击骑士数 = 总格子数 - 最小冲突数。
3. **转化**：在一个二分图中，最小冲突数即为**最小点覆盖**，由于 $\text{最小点覆盖} = \text{最大匹配}$。
4. **结论**：结果 = 总可用空格 - 最大匹配。

</details>

### 练习 2：最小费用流的应用
在一个网格图中，移动每个点都有一定的代价，如何以最小代价使得网格中 $K$ 对起点和终点相连？

<details>
<summary>Check Solution</summary>

**分析**：
1. **多源多汇转化**：引入虚源 $S$ 连向所有起点，虚汇 $T$ 接收所有终点。
2. **容量控制**：设置 $S \to \text{起点}$ 容量为 1，控制路径数量为 $K$。
3. **费用控制**：将网格中的移动步数/代价设为边的 `cost`。
4. **算法**：运行 **MCMF (Minimum Cost Maximum Flow)**。

</details>

### 练习 3：欧拉定向问题
给定一个混合图（既有有向边又有无向边），问是否能为所有无向边定向，使得每个点的入度等于出度。

<details>
<summary>Check Solution</summary>

**分析**：
1. **基础检查**：若某点度数为奇数，必不可行。
2. **预处理**：先随意定向，计算 $D_i = \text{in\_degree} - \text{out\_degree}$。
3. **差量补齐**：
   - 若 $D_i > 0$，从 $i \to T$ 连边，容量 $D_i / 2$。
   - 若 $D_i < 0$，从 $S \to i$ 连边，容量 $-D_i / 2$。
4. **边调整**：对于原无向边 $(u, v)$，连边 $u \to v$，容量 1。
5. **判定**：若 $S$ 发出的边全部满流，则存在合法定向。

</details>
