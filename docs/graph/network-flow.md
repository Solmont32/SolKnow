---
title: 网络流基础
---

import { GitMerge, Zap, Activity, ShieldCheck } from 'lucide-react';

# <GitMerge className="inline-block mr-2 mb-1 text-blue-500" /> 网络流基础 (Network Flow)

网络流是图论中一类具有实际物理背景的模型，广泛应用于资源分配、匹配问题和路径规划。

## 一、 <Activity className="inline-block mr-2 mb-1 text-blue-400" /> 基本概念

### 1. 网络与流
一个**网络** $G=(V, E)$ 是一个有向图，包含：
- **源点 (Source)** $S$：产生流的点。
- **汇点 (Sink)** $T$：消耗流的点。
- **容量 (Capacity)** $c(u, v)$：边 $(u, v)$ 上允许通过的最大流量。
- **流量 (Flow)** $f(u, v)$：实际通过该边的流量。

### 2. 三大性质
- **容量限制**: $0 \le f(u, v) \le c(u, v)$。
- **斜对称性**: $f(u, v) = -f(v, u)$。
- **流量守恒**: 除 $S, T$ 外，任意点的流入量等于流出量。

## 二、 残量网络 (Residual Network)

### 1. 定义
**残量网络** $G_f$ 描述了当前网络中“还能推多少流”的状态。
- 若 $f(u, v) < c(u, v)$，则存在一条边 $(u, v)$，容量为 $c(u, v) - f(u, v)$。
- 若 $f(u, v) > 0$，则存在一条反向边 $(v, u)$，容量为 $f(u, v)$。

### 2. 核心作用
**反向边**是网络流算法实现“撤销”操作的核心。如果没有反向边，贪心算法一旦走错路径将无法修正。

## 三、 最大流算法：Dinic

Dinic 算法是目前竞赛中最主流的最大流算法，通过“分层图”和“当前弧优化”大幅提升效率。

### 1. 算法步骤
1. **BFS 分层**：在残量网络上计算每个点到源点的距离 $d[u]$。若 $T$ 不可达，结束。
2. **DFS 增广**：在分层图上寻找增广路。仅当 $d[v] = d[u] + 1$ 时才向 $v$ 推流。
3. **重复执行**。

### 2. 优化手段
- **当前弧优化**：记录 `cur[u]` 表示 $u$ 点目前推到了哪条出边，避免重复扫描已满或死路的出边。

### 3. 代码实现 (C++ 模板)
```cpp
struct Edge {
    int to, nxt;
    long long cap;
} e[M];
int head[N], d[N], cur[N], tot = 1;

void add(int u, int v, long long w) {
    e[++tot] = {v, head[u], w}; head[u] = tot;
    e[++tot] = {u, head[v], 0}; head[v] = tot;
}

bool bfs() {
    memset(d, 0, sizeof(d));
    queue<int> q; q.push(S); d[S] = 1; cur[S] = head[S];
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = head[u]; i; i = e[i].nxt) {
            if (e[i].cap && !d[e[i].to]) {
                d[e[i].to] = d[u] + 1;
                cur[e[i].to] = head[e[i].to];
                q.push(e[i].to);
                if (e[i].to == T) return true;
            }
        }
    }
    return false;
}

long long dfs(int u, long long flow) {
    if (u == T || !flow) return flow;
    long long res = 0;
    for (int &i = cur[u]; i; i = e[i].nxt) {
        int v = e[i].to;
        if (d[v] == d[u] + 1 && e[i].cap) {
            long long k = dfs(v, min(flow, e[i].cap));
            if (!k) d[v] = 0; // 优化：该点已无法增广
            e[i].cap -= k;
            e[i ^ 1].cap += k;
            res += k; flow -= k;
            if (!flow) break;
        }
    }
    return res;
}
```

## 四、 最小割 (Minimum Cut)

### 1. 最大流最小割定理
在一个网络中，最大流的流量等于最小割的容量。
- **割**：将点集切分为 $S \in A, T \in B$ 两部分。
- **容量**：所有从 $A$ 指向 $B$ 的边的容量之和。

---

## 配套练习（答案折叠）

### 练习 1（理论）
为什么反向边的初始容量通常设为 0？

<details>
<summary>点击查看过程与答案</summary>

反向边代表的是“已经推送流量的撤销权力”。
在初始状态下，没有任何流量被推送，因此没有可以撤销的量，容量为 0。

**答案**：因为初始状态没有流量可以被撤销。

</details>

### 练习 2（计算）
给出一个简单的 $S \to A(5), S \to B(3), A \to T(2), B \to T(4), A \to B(1)$ 的网络，求其最大流。

<details>
<summary>点击查看过程与答案</summary>

1. 路径 $S \to A \to T$：增广 2，剩余 $S \to A(3), A \to T(0)$。
2. 路径 $S \to B \to T$：增广 3，剩余 $S \to B(0), B \to T(1)$。
3. 路径 $S \to A \to B \to T$：增广 1，剩余 $S \to A(2), B \to T(0)$。
总流量：$2+3+1 = 6$。

**答案**：最大流为 6。

</details>
