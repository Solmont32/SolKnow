---
title: 最小生成树
---

# 最小生成树 (Minimum Spanning Tree, MST)

最小生成树是图论竞赛中的核心模型之一，常用于“用最小代价联通所有点”类题目。

## 一、问题定义与性质

给定无向连通带权图 $G=(V,E)$，一棵生成树是包含全部 $|V|$ 个点、且恰有 $|V|-1$ 条边的无环连通子图。  
边权和最小的生成树称为最小生成树（MST）。

常用判定与性质：

- 图不连通时不存在 MST（只能得到最小生成森林）。
- MST 不一定唯一；若所有边权互不相同，则 MST 唯一。
- 任意 MST 都满足切分定理与环路定理：

1. 切分定理：跨越任意割的最小权边一定可在某棵 MST 中。
2. 环路定理：任意环上的最大权边不可能属于某棵 MST（若唯一最大）。

## 二、Kruskal 算法（按边扩展）

### 1. 思路

1. 将所有边按权值从小到大排序。
2. 依次扫描边 $(u,v,w)$，若 $u,v$ 当前不连通，则选这条边并合并连通块。
3. 选满 $n-1$ 条边即得到 MST。

核心数据结构是并查集（DSU），用于快速判断“加边是否成环”。

### 2. 复杂度

- 排序主导复杂度：$O(m\log m)$。
- 并查集合并/查询均摊近似 $O(1)$（严格写为 $O(\alpha(n))$）。
- 适合稀疏图和边集输入。

### 3. 模板代码（C++）

```cpp
struct Edge {
    int u, v, w;
    bool operator<(const Edge& other) const { return w < other.w; }
};

struct DSU {
    vector<int> fa, sz;
    DSU(int n): fa(n + 1), sz(n + 1, 1) {
        iota(fa.begin(), fa.end(), 0);
    }
    int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
    bool unite(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return false;
        if (sz[x] < sz[y]) swap(x, y);
        fa[y] = x;
        sz[x] += sz[y];
        return true;
    }
};

long long kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    DSU dsu(n);
    long long ans = 0;
    int cnt = 0;
    for (auto &e : edges) {
        if (dsu.unite(e.u, e.v)) {
            ans += e.w;
            cnt++;
            if (cnt == n - 1) break;
        }
    }
    return (cnt == n - 1) ? ans : -1; // -1 表示原图不连通
}
```

## 三、Prim 算法（按点扩展）

### 1. 思路

从任意起点出发，每次把“当前生成树到外部点的最小代价边”对应的点加入树中，直到所有点被加入。

它与 Dijkstra 形式相似，但含义不同：

- Dijkstra 的 `dist[v]` 是源点到 $v$ 的最短路。
- Prim 的 `dist[v]` 是当前树到 $v$ 的最小连边权。

### 2. 复杂度

- 邻接矩阵朴素 Prim：$O(n^2)$，适合稠密图。
- 邻接表 + 堆优化 Prim：$O(m\log n)$。

### 3. 模板代码（堆优化）

```cpp
long long prim(int n, const vector<vector<pair<int,int>>>& g) {
    const long long INF = (1LL << 60);
    vector<long long> dist(n + 1, INF);
    vector<char> vis(n + 1, 0);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<pair<long long,int>>> pq;

    dist[1] = 0;
    pq.push({0, 1});
    long long ans = 0;
    int cnt = 0;

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (vis[u]) continue;
        vis[u] = 1;
        ans += d;
        cnt++;

        for (auto [v, w] : g[u]) {
            if (!vis[v] && w < dist[v]) {
                dist[v] = w;
                pq.push({dist[v], v});
            }
        }
    }
    return (cnt == n) ? ans : -1;
}
```

## 四、算法选型对比

1. 边集输入、稀疏图：优先 Kruskal。
2. 邻接矩阵、稠密图：优先朴素 Prim。
3. 题目要求在线加边或动态维护：通常不再是基础 MST，需并查集扩展/动态树结构。

## 五、典型例题（教材风格）

### 例题 1：基础计算

图边为：

- $(1,2,1)$
- $(1,3,4)$
- $(2,3,2)$
- $(2,4,5)$
- $(3,4,3)$

求 MST 权值和。

解：按 Kruskal 排序后依次选 $(1,2,1)$、$(2,3,2)$、$(3,4,3)$，共 3 条边联通 4 点。  
最小权值和为 $1+2+3=6$。

### 例题 2：不连通判定

若图有 5 个点，但最多只能选到 3 条不成环边，能否构成 MST？

解：不能。5 个点的生成树必须有 4 条边。只能选到 3 条边说明图不连通。  
竞赛代码中应返回 `-1` 或按题意输出 `orz`。

### 例题 3：唯一性辨析

若某图中存在两条权值相同且可替换的关键边，MST 是否唯一？

解：通常不唯一。唯一性常依赖“每个割的最小边唯一”或“所有边权互异”等充分条件。

### 例题 4：与最短路区分

最短路树与最小生成树是否等价？

解：不等价。最短路树优化的是“源点到各点路径长度”；MST 优化的是“全树总权值”。

## 六、配套练习（答案折叠）

专题训练见：[`算法竞赛练习：最小生成树专题`](/docs/exercises/cs/algorithm-mst)

### 练习 1（基础）

给定边：$(1,2,2),(1,3,3),(2,3,1),(2,4,4),(3,4,5)$，求 MST 权值和。

<details>

<summary>点击查看过程与答案</summary>

Kruskal 选边顺序：$(2,3,1)$、$(1,2,2)$、$(2,4,4)$。  
共 3 条边联通 4 点，总权值 $1+2+4=7$。

**答案**：7。

</details>

### 练习 2（提高）

简述为什么 Kruskal 中“只要两端点不连通就可加边”是正确的。

<details>

<summary>点击查看过程与答案</summary>

因为当前按权值从小到大扫描，跨越某个割时先遇到的可用边一定是该割的最小候选，满足切分定理。  
因此不会错过某棵 MST 的最优选择。

**答案**：本质依据是切分定理，选择当前最小可行跨割边是安全操作。

</details>

### 练习 3（挑战）

若题目给出一个连通图并要求“删去若干边使剩余图连通且总权值最小”，如何转化？

<details>

<summary>点击查看过程与答案</summary>

该问题等价于在原图中选择 $n-1$ 条边保持连通且总权最小，即直接求 MST。  
若是“保留最大总权且连通”，则是总边权减去最小删边代价，可转为最大生成树或补集视角处理。

**答案**：直接转化为 MST 模型求解。

</details>
