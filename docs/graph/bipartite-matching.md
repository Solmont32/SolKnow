---
title: 二分图匹配
---

import { GitMerge, Zap, Activity, ShieldCheck, Users } from 'lucide-react';

# <GitMerge className="inline-block mr-2 mb-1 text-pink-500" /> 二分图匹配 (Bipartite Matching)

二分图匹配是图论中处理“分配”与“关联”问题的核心工具。

## 一、 <Activity className="inline-block mr-2 mb-1 text-pink-400" /> 基本概念

### 1. 二分图 (Bipartite Graph)
若图 $G$ 的顶点集 $V$ 可分为两个互不相交的子集 $U, W$，使得图中的每条边 $(u, w)$ 满足 $u \in U$ 且 $w \in W$，则称 $G$ 为二分图。
-   **判定准则**：一个图是二分图，当且仅当其不存在奇环。

### 2. 匹配 (Matching)
匹配是图中的一个边集 $M$，使得 $M$ 中任意两条边均不共用端点。
-   **最大匹配**：包含边数最多的匹配。
-   **完美匹配**：匹配点集覆盖了原图的所有顶点。

---

## 二、 核心理论：增广路 (Augmenting Path)

### 1. 交替路与增广路
-   **交替路**：从一个未匹配点出发，交替经过“非匹配边”和“匹配边”的路径。
-   **增广路**：起点和终点均为未匹配点的交替路。

### 2. Berge 定理
**一个匹配是最大匹配，当且仅当不存在关于该匹配的增广路。**
-   **直观理解**：沿着增广路进行“取反”操作（匹配边变非匹配，非匹配变匹配），匹配数会增加 1。

---

## 三、 匈牙利算法 (Kuhn's Algorithm)

匈牙利算法基于增广路，通过 DFS 为每个点寻找“备选方案”。

### C++ 实现
```cpp
struct BipartiteMatcher {
    int n, m;
    vector<vector<int>> g;
    vector<int> match;
    vector<bool> vis;

    BipartiteMatcher(int _n, int _m) : n(_n), m(_m), g(n + 1), match(m + 1, 0), vis(m + 1) {}

    void add(int u, int v) { g[u].push_back(v); }

    bool dfs(int u) {
        for (int v : g[u]) {
            if (!vis[v]) {
                vis[v] = true;
                if (!match[v] || dfs(match[v])) {
                    match[v] = u;
                    return true;
                }
            }
        }
        return false;
    }

    int solve() {
        int res = 0;
        for (int i = 1; i <= n; i++) {
            fill(vis.begin(), vis.end(), false);
            if (dfs(i)) res++;
        }
        return res;
    }
};
```

---

## 四、 二分图的三大性质定理

在二分图中，以下指标存在深刻的对偶关系：

1.  **最大匹配数 = 最小顶点覆盖数 (Konig's Theorem)**
    -   顶点覆盖：选取最少的点，使得每条边至少有一个端点被选中。
2.  **最大独立集 = 总点数 - 最小顶点覆盖**
    -   独立集：选取最多的点，使得任意两点间没有边。
3.  **最小边覆盖 = 总点数 - 最大匹配数**
    -   边覆盖：选取最少的边，使得每个点都被至少一条边覆盖。

---

## 五、 配套练习（答案折叠）

### 练习 1（判定）
一个 5 个点的完全图 $K_5$ 是否是二分图？

<details>
<summary>点击查看过程与答案</summary>

**分析**：$K_5$ 中包含长度为 3 的环（三角形），即奇环。
**答案**：不是。

</details>

### 练习 2（建模）
在一个 $N \times M$ 的棋盘上放置最多的“车”，使得它们互不攻击（某些格子不能放），如何转化为二分图匹配？

<details>
<summary>点击查看过程与答案</summary>

**分析**：
-   将每一行看作左侧集合 $U$ 中的点。
-   将每一列看作右侧集合 $W$ 中的点。
-   如果在 $(r, c)$ 处可以放车，则在 $U_r$ 与 $W_c$ 之间连边。
-   最大匹配即为最多能放置的车数，因为匹配保证了同一行、同一列只选一个。

**答案**：转化为行列二分图的最大匹配问题。

</details>
