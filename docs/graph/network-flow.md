---
title: 网络流进阶
---

import { GitMerge, Zap, Activity, ShieldCheck, Layers, Landmark } from 'lucide-react';

# <GitMerge className="inline-block mr-2 mb-1 text-blue-500" /> 网络流进阶 (Advanced Network Flow)

本篇在基础最大流之上，探讨复杂的网络建模技巧与最小费用最大流算法。

## 一、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 建模技巧：点边转化

### 1. 点权转化为边权 (Node Splitting)
**场景**：每个点 $u$ 有通过能力的限制 $cap(u)$。
**做法**：将点 $u$ 拆分为入点 $u_{in}$ 和出点 $u_{out}$。
-   所有进入 $u$ 的边连向 $u_{in}$。
-   所有从 $u$ 出发的边连向 $u_{out}$。
-   在 $u_{in}$ 和 $u_{out}$ 之间连一条容量为 $cap(u)$ 的有向边。

### 2. 最大权闭合子图 (Project Selection)
**场景**：有若干项目，选项目 $i$ 获益 $w_i$（可正可负），但项目间有依赖关系：选 $i$ 必须选 $j$。
**建模**：
1.  建立源点 $S$ 和汇点 $T$。
2.  若 $w_i > 0$，连边 $(S, i)$，容量为 $w_i$。
3.  若 $w_i < 0$，连边 $(i, T)$，容量为 $-w_i$。
4.  若选 $i$ 依赖 $j$，连边 $(i, j)$，容量为 $\infty$。
**结论**：**最大收益 = 所有正收益之和 - 最小割容量**。

---

## 二、 <Landmark className="inline-block mr-2 mb-1 text-amber-500" /> 最小费用最大流 (MCMF)

当网络中的边除了容量 $c$ 外，还有单位流量费用 $cost$ 时，我们需要在保证流量最大的前提下，使总费用 $\sum f(i, j) \cdot cost(i, j)$ 最小。

### 1. 算法：SPFA 增广
核心思想：将 Dinic 中的 BFS 替换为 **SPFA**，寻找关于“单位费用”的最短路作为增广路。
-   **反向边处理**：反向边的容量为 0，费用为 $-cost$。

### 2. C++ 实现模板
```cpp
struct MCMF {
    struct Edge { int to, nxt, cap, flow, cost; } e[M];
    int head[N], dist[N], pre[N], edge[N], tot = 1;
    bool in_q[N];

    void add(int u, int v, int c, int w) {
        e[++tot] = {v, head[u], c, 0, w}; head[u] = tot;
        e[++tot] = {u, head[v], 0, 0, -w}; head[v] = tot;
    }

    bool spfa(int s, int t, int &flow, int &cost) {
        memset(dist, 0x3f, sizeof(dist));
        memset(in_q, 0, sizeof(in_q));
        queue<int> q; q.push(s); dist[s] = 0; in_q[s] = 1;
        pre[t] = -1;
        while (!q.empty()) {
            int u = q.front(); q.pop(); in_q[u] = 0;
            for (int i = head[u]; i; i = e[i].nxt) {
                if (e[i].cap > e[i].flow && dist[e[i].to] > dist[u] + e[i].cost) {
                    dist[e[i].to] = dist[u] + e[i].cost;
                    pre[e[i].to] = u; edge[e[i].to] = i;
                    if (!in_q[e[i].to]) { q.push(e[i].to); in_q[e[i].to] = 1; }
                }
            }
        }
        if (pre[t] == -1) return false;
        int d = 1e9;
        for (int i = t; i != s; i = pre[i]) d = min(d, e[edge[i]].cap - e[edge[i]].flow);
        flow += d; cost += d * dist[t];
        for (int i = t; i != s; i = pre[i]) {
            e[edge[i]].flow += d;
            e[edge[i] ^ 1].flow -= d;
        }
        return true;
    }

    pair<int, int> solve(int s, int t) {
        int flow = 0, cost = 0;
        while (spfa(s, t, flow, cost));
        return {flow, cost};
    }
};
```

---

## 三、 综合建模案例：有向无环图 (DAG) 最小路径覆盖

**问题**：给定一个 DAG，求最少需要多少条路径才能覆盖所有顶点。
**模型转化**：
1.  拆点：将每个点 $u$ 拆分为 $u_{in}$ 和 $u_{out}$。
2.  连边：原图边 $(u, v)$ 变为网络中的 $(u_{out}, v_{in})$，容量为 1。
3.  源汇：$S \to u_{out}$，容量 1；$v_{in} \to T$，容量 1。
**结论**：**最小路径数 = 总顶点数 - 二分图最大匹配数**。

---

## 四、 配套练习（答案折叠）

### 练习 1（建模）
如何求一个图的“最大权独立集”？（已知该图是二分图）

<details>
<summary>点击查看过程与答案</summary>

**分析**：
在二分图中：
1. 最大权独立集 = 所有权值之和 - 最小权顶点覆盖。
2. 最小权顶点覆盖可以通过最小割求解。
**建模**：
- $S \to U_i$，容量为点权。
- $W_j \to T$，容量为点权。
- 若 $U_i, W_j$ 有边，连 $U_i \to W_j$ 容量 $\infty$。
最大收益 = 总权值 - 最小割。

**答案**：转化为二分图的最小割问题，利用“总权值 - 最小割”求解。

</details>

### 练习 2（算法应用）
在 MCMF 中，如果存在负权环，SPFA 会发生什么？

<details>
<summary>点击查看过程与答案</summary>

**分析**：SPFA 会进入死循环，无法得出最短路。在普通的网络流问题中，由于流量限制，负权环通常需要先进行消圈处理（Cycle Canceling）或利用初始流消除负权边。

**答案**：SPFA 无法终止，算法失效。

</details>
