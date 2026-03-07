# 最小生成树 (MST)

对于一个无向带权图 $G = (V, E)$，其生成树是包含 $V$ 中所有顶点的树。边权之和最小的生成树即为最小生成树（Minimum Spanning Tree）。

## Kruskal 算法

### 原理 (基于边)
1. 将所有边按权值从小到大排序。
2. 依次选择边，如果这条边连接的两个顶点不在同一个连通分量中（使用**并查集**判断），则选择这条边并合并两个分量。
3. 直到选择了 $n-1$ 条边。

- **复杂度**：$O(m \log m)$。
- **适用范围**：稀疏图。

### 代码模板 (C++)
```cpp
struct Edge { int u, v, w; } edges[MAXM];
bool cmp(Edge a, Edge b) { return a.w < b.w; }

int kruskal(int n, int m) {
    sort(edges, edges + m, cmp);
    for (int i = 1; i <= n; i++) fa[i] = i;
    int res = 0, cnt = 0;
    for (int i = 0; i < m; i++) {
        int fu = find(edges[i].u), fv = find(edges[i].v);
        if (fu != fv) {
            fa[fu] = fv;
            res += edges[i].w;
            cnt++;
        }
    }
    return (cnt == n - 1) ? res : -1; // -1 表示不连通
}
```

## Prim 算法

### 原理 (基于点)
1. 从任意点开始，维护一个已加入生成树的点集 $S$。
2. 每次寻找一个不在 $S$ 中且到 $S$ 的距离最短的点 $v$，将其加入 $S$ 并更新其他点到 $S$ 的距离。
3. 重复 $n-1$ 次。

- **复杂度**：$O(n^2)$（普通实现）或 $O(m \log n)$（优先队列优化）。
- **适用范围**：稠密图。

## 对比总结
- **Kruskal**：结构简单，适合边少的图，依赖并查集。
- **Prim**：适合边稠密的图，逻辑类似于 Dijkstra。
