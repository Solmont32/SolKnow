---
title: 图论算法 (Graph Theory) 专项强化练习
sidebar_label: 图论算法专项强化
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Layers, GitBranch, Network } from 'lucide-react';

# 图论算法 (Graph Theory) 专项强化练习

> **“图论是建模现实世界复杂关系的通用语言。”** —— 本专题对标《算法导论》与《图论算法理论、实现及应用》深度，涵盖从基础遍历、最短路、MST，到高阶 Tarjan 强连通、网络流与二分图匹配的工业级实现。

---

## 🪜 练习阶梯与评价标准

| 等级 | 难度目标 | 核心考察点 | 期望达成 |
| :--- | :--- | :--- | :--- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 基础建模与遍历 | 链式前向星、Dijkstra、Kruskal | 能够 10 分钟内完成标准建图与最短路 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 拓扑性质与连通性 | Tarjan SCC、割点/桥、拓扑排序 | 能够处理有向无环图与双连通分量转换 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span> | 流网络与匹配建模 | Dinic 最大流、最小割、二分图多重匹配 | 具备将复杂约束转化为流网络的能力 |

---

## 📂 核心习题库

### 1. 最短路径与生成树 (Path & Tree)

#### 练习 1：单源最短路 (Dijkstra + 堆优化)
**题目描述**：给定 $n$ 个点 $m$ 条有向边，求起点 $S$ 到所有点的最短距离。
- **限制**：$n, m \le 2 \times 10^5$，边权 $\ge 0$。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现**：
```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <cstring>

using namespace std;

typedef pair<int, int> PII;
const int N = 200010, M = 200010;
int h[N], e[M], w[M], ne[M], idx;
int dist[N];
bool st[N];

void add(int a, int b, int c) {
    e[idx] = b, w[idx] = c, ne[idx] = h[a], h[a] = idx++;
}

int dijkstra(int s, int n) {
    memset(dist, 0x3f, sizeof dist);
    dist[s] = 0;
    priority_queue<PII, vector<PII>, greater<PII>> heap;
    heap.push({0, s});

    while (heap.size()) {
        auto t = heap.top();
        heap.pop();
        int ver = t.second, d = t.first;
        if (st[ver]) continue;
        st[ver] = true;

        for (int i = h[ver]; i != -1; i = ne[i]) {
            int j = e[i];
            if (dist[j] > d + w[i]) {
                dist[j] = d + w[i];
                heap.push({dist[j], j});
            }
        }
    }
    return dist[n] == 0x3f3f3f3f ? -1 : dist[n];
}
```
</details>

#### 练习 2：最小生成树 (Kruskal 算法)
**题目描述**：给定无向图，求 MST 的权值之和。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现**：
```cpp
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 100010, M = 200010;
struct Edge {
    int a, b, w;
    bool operator< (const Edge& W) const { return w < W.w; }
} edges[M];
int p[N];

int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) cin >> edges[i].a >> edges[i].b >> edges[i].w;
    sort(edges, edges + m);
    for (int i = 1; i <= n; i++) p[i] = i;

    int res = 0, cnt = 0;
    for (int i = 0; i < m; i++) {
        int a = find(edges[i].a), b = find(edges[i].b), w = edges[i].w;
        if (a != b) {
            p[a] = b;
            res += w, cnt++;
        }
    }
    if (cnt < n - 1) puts("impossible");
    else cout << res << endl;
}
```
</details>

---

### 2. 连通性与拓扑逻辑 (Connectivity)

#### 练习 3：强连通分量 (Tarjan 算法)
**题目描述**：给定有向图，求其中的强连通分量 (SCC)，并缩点转化为 DAG。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现**：
```cpp
#include <iostream>
#include <vector>
#include <stack>

using namespace std;

const int N = 10010;
int dfn[N], low[N], timestamp;
int scc_cnt, id[N], scc_size[N];
bool in_stack[N];
stack<int> stk;
vector<int> g[N];

void tarjan(int u) {
    dfn[u] = low[u] = ++timestamp;
    stk.push(u), in_stack[u] = true;
    for (int v : g[u]) {
        if (!dfn[v]) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
        } else if (in_stack[v]) low[u] = min(low[u], dfn[v]);
    }
    if (dfn[u] == low[u]) {
        scc_cnt++;
        int y;
        do {
            y = stk.top(); stk.pop();
            in_stack[y] = false;
            id[y] = scc_cnt;
            scc_size[scc_cnt]++;
        } while (y != u);
    }
}
```
</details>

#### 练习 4：拓扑排序 (Kahn 算法)
**题目描述**：给定 DAG，输出其拓扑序列。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现**：
```cpp
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

void topsort(int n, vector<int> g[], int d[]) {
    queue<int> q;
    vector<int> res;
    for (int i = 1; i <= n; i++) if (!d[i]) q.push(i);
    while (q.size()) {
        int t = q.front(); q.pop();
        res.push_back(t);
        for (int v : g[t]) if (--d[v] == 0) q.push(v);
    }
    if (res.size() < n) puts("-1");
    else {
        for (int x : res) printf("%d ", x);
    }
}
```
</details>

---

### 3. 网络流与二分图 (Flow & Matching)

#### 练习 5：最大流 (Dinic 算法)
**题目描述**：给定源点 $S$ 和汇点 $T$，求网络的最大流量。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现**：
```cpp
#include <iostream>
#include <cstring>
#include <queue>

using namespace std;

const int N = 10010, M = 200010, INF = 1e9;
int h[N], e[M], f[M], ne[M], idx;
int q[N], d[N], cur[N];
int n, m, S, T;

void add(int a, int b, int c) {
    e[idx] = b, f[idx] = c, ne[idx] = h[a], h[a] = idx++;
    e[idx] = a, f[idx] = 0, ne[idx] = h[b], h[b] = idx++;
}

bool bfs() {
    memset(d, -1, sizeof d);
    int hh = 0, tt = 0;
    q[0] = S, d[S] = 0, cur[S] = h[S];
    while (hh <= tt) {
        int t = q[hh++];
        for (int i = h[t]; i != -1; i = ne[i]) {
            int ver = e[i];
            if (d[ver] == -1 && f[i]) {
                d[ver] = d[t] + 1;
                cur[ver] = h[ver];
                if (ver == T) return true;
                q[++tt] = ver;
            }
        }
    }
    return false;
}

int find(int u, int limit) {
    if (u == T) return limit;
    int flow = 0;
    for (int i = cur[u]; i != -1 && flow < limit; i = ne[i]) {
        cur[u] = i;
        int ver = e[i];
        if (d[ver] == d[u] + 1 && f[i]) {
            int t = find(ver, min(f[i], limit - flow));
            if (!t) d[ver] = -1;
            f[i] -= t, f[i ^ 1] += t, flow += t;
        }
    }
    return flow;
}

int dinic() {
    int r = 0, flow;
    while (bfs()) while (flow = find(S, INF)) r += flow;
    return r;
}
```
</details>

#### 练习 6：二分图最大匹配 (匈牙利算法)
**题目描述**：给定二分图，求其最大匹配数。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现**：
```cpp
#include <iostream>
#include <cstring>

using namespace std;

const int N = 510, M = 100010;
int h[N], e[M], ne[M], idx;
int match[N];
bool st[N];

void add(int a, int b) {
    e[idx] = b, ne[idx] = h[a], h[a] = idx++;
}

bool find(int x) {
    for (int i = h[x]; i != -1; i = ne[i]) {
        int j = e[i];
        if (!st[j]) {
            st[j] = true;
            if (match[j] == 0 || find(match[j])) {
                match[j] = x;
                return true;
            }
        }
    }
    return false;
}
```
</details>

---

## 🏆 训练建议
1. **建图是第一步**：掌握“拆点”、“分层图”、“补图”等高级建图技巧是解决复杂问题的关键。
2. **理解算法背后的数学**：Dinic 的分层 BFS 保证了增广路径的性质，Tarjan 的 Low/Dfn 刻画了搜索树的回溯能力。
3. **复杂度分析**：网络流的理论复杂度虽高，但在实际竞赛中由于常数极小，通常能处理远超理论限制的数据。
