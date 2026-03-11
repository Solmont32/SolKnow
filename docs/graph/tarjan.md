---
title: Tarjan 算法与图的连通性进阶
---

import { GitMerge, Layers, ShieldAlert, Share2, Zap, LayoutGrid, CircleDot } from 'lucide-react';

# <GitMerge className="inline-block mr-2 mb-1 text-purple-600" /> Tarjan 算法与连通性 (Connectivity)

Tarjan 算法是图论中处理连通性的核心工具。通过一次 DFS 遍历，它能在线性时间内提取图的深层拓扑特征，如强连通分量 (SCC)、双连通分量 (BCC) 以及割点与桥。

---

## 一、 <Layers className="inline-block mr-2 mb-1 text-blue-500" /> 核心机制：时间戳与回溯值

在 DFS 树中，每个点 $u$ 拥有两个关键属性：
- **dfn[u]**：深度优先搜索序（时间戳）。
- **low[u]**：通过子树及至多一条**非树边**（返祖边）能到达的最小 $dfn$ 值。

**基本判准**：若 $low[v] \ge dfn[u]$，说明 $v$ 及其子树无法跳过 $u$ 回到更高层，这暗示了连通性的断裂点。

---

## 二、 <ShieldAlert className="inline-block mr-2 mb-1 text-red-500" /> 无向图：割点、桥与双连通分量

### 1. 割点与桥的严格定义
- **割点 (Cut-point)**：删去该点后，图的连通块数量增加。
- **桥 (Bridge)**：删去该边后，图的连通块数量增加。

### 2. 双连通分量 (BCC)
- **边双连通分量 (e-BCC)**：不含桥的极大连通子图。任意两点间至少有两条**边不相交**路径。
- **点双连通分量 (v-BCC)**：不含割点的极大连通子图。任意两点间至少有两条**点不相交**路径。

### 3. <CircleDot className="inline-block mr-2 mb-1 text-amber-500" /> 圆方树 (Block-cut Tree)
**构造逻辑**：
1. 原图中的每个点称为**圆点**。
2. 为每个点双连通分量 (v-BCC) 新建一个**方点**。
3. 将 v-BCC 中的所有圆点与该方点连边。
**性质**：圆方树是一棵树，且圆点与圆点、方点与方点之间不直接相连。它完美描述了无向图的割点结构。

---

## 三、 <LayoutGrid className="inline-block mr-2 mb-1 text-green-500" /> 有向图：SCC 与 2-SAT

### 1. 强连通分量 (SCC)
在有向图中，极大互相可达的点集。
- **缩点技巧**：将每个 SCC 看作一个点，原图转化为 **DAG (有向无环图)**，从而可以使用拓扑排序或动态规划。

### 2. 2-SAT 问题建模
**场景**：有 $n$ 个布尔变量 $x_i$，给定若干约束 $(x_i = A \lor x_j = B)$。
**建模**：
1. 为每个变量 $x_i$ 建立两个节点 $x_i$ 和 $\neg x_i$。
2. 约束 $A \lor B$ 等价于 $\neg A \to B$ 和 $\neg B \to A$。
3. **判别**：若存在 $i$ 使得 $x_i$ 与 $\neg x_i$ 属于同一个 SCC，则无解。

---

## 四、 工业级 C++ 实现 (点双连通分量 v-BCC)

```cpp
#include <vector>
#include <stack>
#include <algorithm>

using namespace std;

struct vBCC {
    int n, timer, bcc_cnt;
    vector<vector<int>> g, bccs;
    vector<int> dfn, low;
    stack<pair<int, int>> st;

    vBCC(int _n) : n(_n), timer(0), bcc_cnt(0), g(n + 1), dfn(n + 1), low(n + 1) {}

    void add_edge(int u, int v) {
        g[u].push_back(v);
        g[v].push_back(u);
    }

    void tarjan(int u, int p) {
        dfn[u] = low[u] = ++timer;
        for (int v : g[u]) {
            if (v == p) continue;
            if (!dfn[v]) {
                st.push({u, v});
                tarjan(v, u);
                low[u] = min(low[u], low[v]);
                if (low[v] >= dfn[u]) {
                    bcc_cnt++;
                    vector<int> current_bcc;
                    while (true) {
                        auto edge = st.top(); st.pop();
                        current_bcc.push_back(edge.second);
                        if (edge.first == u && edge.second == v) break;
                    }
                    current_bcc.push_back(u);
                    bccs.push_back(current_bcc);
                }
            } else if (dfn[v] < dfn[u]) {
                st.push({u, v});
                low[u] = min(low[u], dfn[v]);
            }
        }
    }
};
```

---

## 五、 配套练习 (折叠解答)

### 练习 1：缩点应用
给一个有向图，最少加几条边使其变成强连通图？

<details>
<summary>查看解析</summary>

**分析**：
1. 使用 Tarjan 缩点，得到一个 DAG。
2. 统计 DAG 中入度为 0 的点数 $P$ 和出度为 0 的点数 $Q$。
**结论**：答案为 $\max(P, Q)$。特别地，若缩点后只有一个点，答案为 0。

</details>

### 练习 2：桥的判定
为什么求桥时不需要判断 `in_st` 栈？

<details>
<summary>查看解析</summary>

**分析**：
`in_st` 是为了处理有向图中横叉边能否贡献 `low` 值。在无向图中，我们只关心树边和返祖边，且不直接通过父节点回跳。
**判定**：$low[v] > dfn[u]$ 即可确定 $(u, v)$ 是桥。

</details>

### 练习 3：2-SAT 解的构造
在 2-SAT 中，如果确定有解，如何输出一组可行解？

<details>
<summary>查看解析</summary>

**分析**：
1. 缩点后，比较 $id[x_i]$ 和 $id[\neg x_i]$。
2. 按照缩点后的**逆拓扑序**进行选择。
**结论**：若 $id[x_i] < id[\neg x_i]$，则 $x_i$ 取真（具体取值取决于具体实现中的 $id$ 分配顺序，通常 Tarjan 的 SCC ID 是逆拓扑序）。

</details>
