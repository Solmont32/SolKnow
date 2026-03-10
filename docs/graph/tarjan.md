---
title: Tarjan 算法与图的连通性
---

import { GitMerge, Layers, ShieldAlert, Share2, Zap } from 'lucide-react';

# <GitMerge className="inline-block mr-2 mb-1 text-purple-600" /> Tarjan 算法与图的连通性 (Connectivity)

Tarjan 算法是图论中的一颗璀璨明珠，它通过一次深度优先搜索 (DFS) 的遍历，能够在线性时间内揭示有向图与无向图的深层拓扑结构。

## 一、 核心概念：DFS 树与时间戳

在 DFS 过程中，访问节点的顺序形成了 **DFS 树**。

-   **dfn[u]**：点 $u$ 的**时间戳**，即第几个被访问。
-   **low[u]**：点 $u$ 的**回溯值**。定义为以 $u$ 为根的子树通过至多一条**返祖边**能到达的最小 $dfn$。

---

## 二、 <Layers className="inline-block mr-2 mb-1 text-purple-500" /> 有向图：强连通分量 (SCC)

在有向图中，若两个点 $u, v$ 互相可达，则称其强连通。极大强连通点集称为 **强连通分量 (Strongly Connected Components)**。

### 1. 算法逻辑
-   **入栈**：当首次访问 $u$ 时，将其入栈。
-   **判定**：当 DFS 回溯到 $u$ 且满足 $dfn[u] = low[u]$ 时，栈中从 $u$ 到栈顶的所有节点构成一个 SCC。

### 2. C++ 模板
```cpp
struct SCC {
    int n, timer, scc_cnt;
    vector<vector<int>> g;
    vector<int> dfn, low, id, st;
    vector<bool> in_st;

    SCC(int _n) : n(_n), timer(0), scc_cnt(0), g(n + 1), dfn(n + 1), low(n + 1), id(n + 1), in_st(n + 1) {}

    void add(int u, int v) { g[u].push_back(v); }

    void tarjan(int u) {
        dfn[u] = low[u] = ++timer;
        st.push_back(u);
        in_st[u] = true;
        for (int v : g[u]) {
            if (!dfn[v]) {
                tarjan(v);
                low[u] = min(low[u], low[v]);
            } else if (in_st[v]) {
                low[u] = min(low[u], dfn[v]);
            }
        }
        if (dfn[u] == low[u]) {
            scc_cnt++;
            while (true) {
                int x = st.back(); st.pop_back();
                in_st[x] = false;
                id[x] = scc_cnt;
                if (x == u) break;
            }
        }
    }
};
```

---

## 三、 <ShieldAlert className="inline-block mr-2 mb-1 text-red-500" /> 无向图：割点与桥 (Cut-points & Bridges)

在无向图中，连通性分析不仅关注“哪些点连通”，更关注“删掉谁后不再连通”。

### 1. 割点 (Articulation Point)
**定义**：若删去节点 $u$ 及相关边后，原图连通块增加，则 $u$ 为割点。

**判定准则**：
-   若 $u$ 是根节点：在 DFS 树中至少有两个子节点。
-   若 $u$ 不是根节点：至少存在一个子节点 $v$ 满足 $low[v] \ge dfn[u]$。

### 2. 桥 / 割边 (Bridge)
**定义**：若删去边 $e$ 后，原图连通块增加，则 $e$ 为桥。

**判定准则**：
-   对于边 $(u, v)$，若满足 $low[v] > dfn[u]$，则该边为桥。

### 3. C++ 实现（割点与桥）
```cpp
vector<int> cut; // 存储所有割点
vector<pair<int, int>> bridges; // 存储所有桥

void tarjan(int u, int p) {
    dfn[u] = low[u] = ++timer;
    int child = 0;
    for (auto v : g[u]) {
        if (v == p) continue; // 不回跳父节点
        if (!dfn[v]) {
            child++;
            tarjan(v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] >= dfn[u] && u != root) is_cut[u] = true;
            if (low[v] > dfn[u]) bridges.push_back({u, v});
        } else low[u] = min(low[u], dfn[v]);
    }
    if (u == root && child >= 2) is_cut[u] = true;
}
```

---

## 四、 连通性进阶：双连通分量 (BCC)

### 1. 边双连通分量 (e-BCC)
-   **定义**：不含桥的极大连通子图。
-   **性质**：任意两点间至少有两条边不相交路径。删去任意一条边后，图依然连通。

### 2. 点双连通分量 (v-BCC)
-   **定义**：不含割点的极大连通子图。
-   **性质**：任意两点间至少有两条点不相交路径。

---

## 五、 易错点清单

1.  **有向图与无向图混淆**：有向图更新 `low` 需判断 `in_st`，无向图更新 `low` 需避免直接跳回父节点。
2.  **重边处理**：在求桥时，若图中存在重边，不能简单的通过 `v == p` 判断，需通过边编号 `i ^ 1` 判断。
3.  **根节点判定**：割点判定中，根节点的逻辑是独立的（子节点数 $\ge 2$）。

---

## 六、 配套练习（答案折叠）

### 练习 1（理论）
在一个有 10 个点的**无向环**图中，有多少个割点和桥？

<details>
<summary>点击查看过程与答案</summary>

**分析**：环图中任意删去一个点或一条边，剩余部分依然连通。
**答案**：0 个割点，0 条桥。

</details>

### 练习 2（计算）
有向图边：$1 \to 2, 2 \to 3, 3 \to 1, 3 \to 4$。请写出其所有 SCC。

<details>
<summary>点击查看过程与答案</summary>

**分析**：$1, 2, 3$ 构成一个环，互相可达。$4$ 只能被 $3$ 到达，无法回到其他点。
**答案**：SCC1: $\{1, 2, 3\}$，SCC2: $\{4\}$。

</details>

### 练习 3（进阶）
若一个无向连通图不存在桥，我们称它为什么？

<details>
<summary>点击查看过程与答案</summary>

**分析**：桥的定义是删去后不连通。没有桥意味着它是“边双连通”的。
**答案**：边双连通图。

</details>
