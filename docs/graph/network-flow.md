---
title: 网络流算法与复杂建模
---

import { GitMerge, Zap, Activity, ShieldCheck, Layers, Landmark, ArrowRightLeft, Maximize, Sigma, Workflow } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <GitMerge className="inline-block mr-2 mb-1 text-blue-500" /> 网络流 (Network Flow)

网络流是组合优化与运筹学中的皇冠，它不仅解决了实体的流量分配，还通过**对偶性 (Duality)** 建立了与割、覆盖问题的深刻数学映射。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 形式化定义与定理

### 1. 流网络 (Flow Network)
一个流网络 $G=(V, E)$ 是一个有向图，每条边 $(u, v)$ 有一个非负容量 $c(u, v) \ge 0$。存在源点 $s$ 和汇点 $t$。

### 2. 三大基本性质
- **容量限制**：$0 \le f(u, v) \le c(u, v)$。
- **斜对称性**：$f(u, v) = -f(v, u)$。
- **流量守恒**：除 $s, t$ 外，任意节点 $u$ 满足 $\sum_{v \in V} f(u, v) = 0$。

### 3. 最大流最小割定理 (Max-Flow Min-Cut Theorem)
> **定理**：在一个流网络中，$s-t$ 最大流的流量等于 $s-t$ 最小割的容量。
> **直观理解**：系统的最大产出上限取决于系统的最细瓶颈。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-green-500" /> 核心算法：Dinic 算法

Dinic 算法是工业界处理最大流的标准选择，其核心在于**分层图**与**多路增广**。

### 优化机制
1. **分层图 (Level Graph)**：通过 BFS 标记每个节点到源点的最短距离。增广时只走 $level[v] = level[u] + 1$ 的边，避免无效环路。
2. **当前弧优化 (Current Arc Optimization)**：在一次 BFS 分层内，如果一条弧已经增广过且无法再提供流量，后续直接跳过。

<ComplexityAnalysis time="O(V^2E)" space="O(V + E)" note="在二分图中为 O(E \sqrt{V})" />

---

## 三、 <Landmark className="inline-block mr-2 mb-1 text-purple-500" /> 高级建模范式

### 1. 最大权闭合子图 (Maximum Weight Closure)
**问题**：选出一组点，使得若点 $u$ 被选中，其所有后继点也必须被选中。求点权和最大。
**建模**：
- $S \to$ 正权点，容量为点权。
- 负权点 $\to T$，容量为点权的绝对值。
- 原图中的边改为容量 $\infty$。
**结论**：最大权 = 正权和 - 最小割。

### 2. 项目选择问题 (Project Selection)
与闭合子图类似，实验获利与仪器成本的经典对立。

### 3. 有上下界的网络流 (Bounded Flow)
要求 $l(u, v) \le f(u, v) \le c(u, v)$。
**转化**：利用辅助源汇 $S', T'$ 补齐流量缺口。若 $S', T'$ 关联边满流，则存在可行流。

---

## 四 <Activity className="inline-block mr-2 mb-1 text-amber-500" /> 最小费用最大流 (MCMF)

当边除了容量还有单位费用 $d(u, v)$ 时，寻找流量最大且 $\sum f \cdot d$ 最小的方案。
**算法**：将 Dinic 中的 BFS 替换为 **SPFA**（寻找费用最短路）。
*注：若无负权边，可结合势能法 (Johnson) 使用 Dijkstra 优化。*

---

## 五、 工业级 C++ 实现 (Dinic 模板)

```cpp
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

const long long INF = 1e18;

struct Dinic {
    struct Edge { int to, rev; long long cap; };
    vector<vector<Edge>> g;
    vector<int> level, iter;

    Dinic(int n) : g(n), level(n), iter(n) {}

    void add_edge(int from, int to, long long cap) {
        g[from].push_back({to, (int)g[to].size(), cap});
        g[to].push_back({from, (int)g[from].size() - 1, 0});
    }

    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        level[s] = 0; queue<int> q; q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& e : g[u]) {
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[u] + 1; q.push(e.to);
                }
            }
        }
        return level[t] != -1;
    }

    long long dfs(int u, int t, long long f) {
        if (u == t) return f;
        for (int& i = iter[u]; i < g[u].size(); ++i) {
            Edge& e = g[u][i];
            if (e.cap > 0 && level[u] < level[e.to]) {
                long long d = dfs(e.to, t, min(f, e.cap));
                if (d > 0) { e.cap -= d; g[e.to][e.rev].cap += d; return d; }
            }
        }
        return 0;
    }

    long long max_flow(int s, int t) {
        long long flow = 0;
        while (bfs(s, t)) {
            fill(iter.begin(), iter.end(), 0);
            long long f; while ((f = dfs(s, t, INF)) > 0) flow += f;
        }
        return flow;
    }
};
```

---

## 六、 配套练习 (折叠解答)

### 练习 1：最小割与二者选一
有 $n$ 个任务，可以交给 A 或 B 完成。交给 A 获利 $a_i$，交给 B 获利 $b_i$。某些任务对 $(i, j)$ 若交给不同的人会产生额外损失 $w$。求最大获利。

<details>
<summary>点击查看解析</summary>

**分析**：
1. **转化为最小割**：最大获利 = $\sum a_i + \sum b_i$ - 最小总损失。
2. **建图**：
   - $S \to i$，容量 $a_i$。
   - $i \to T$，容量 $b_i$。
   - $i \leftrightarrow j$，容量 $w$。
3. **解释**：最小割将点集分为 $S$ 集和 $T$ 集。若点 $i \in S$，代表交给 A 完成；若 $i \in T$，代表交给 B。割掉 $S \to i$ 意味着放弃 $a_i$（由 B 完成）。

</details>

### 练习 2：混合图欧拉回路
给定一个既有有向边又有无向边的图，判断是否存在欧拉回路。

<details>
<summary>点击查看解析</summary>

**分析**：
1. **预处理**：无向边先任意定向，计算每个点的出入度之差 $D(u)$。若 $D(u)$ 为奇数，必无解。
2. **建模**：利用网络流调整无向边的方向。
   - 若 $D(u) > 0$，从 $u \to T$，容量 $D(u)/2$。
   - 若 $D(u) < 0$，从 $S \to u$，容量 $-D(u)/2$。
   - 无向边 $u \to v$ 对应网络流边 $(u, v)$，容量 1。
3. **判断**：若最大流等于所有正偏差之和，则存在。

</details>

### 练习 3：平均费用最小环
给定一个有向图，求一个环，使得环上权值的**平均值**最小。

<details>
<summary>点击查看解析</summary>

**分析**：
1. **二分答案 $X$**：判定是否存在环使得 $\frac{\sum w_i}{k} < X$。
2. **转化**：$\sum (w_i - X) < 0$。
3. **判定**：将所有边权减去 $X$，使用 SPFA 判定图中是否存在**负权环**。

</details>
