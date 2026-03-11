---
title: Tarjan 算法与连通性理论
---

import { GitMerge, Layers, ShieldAlert, Share2, Zap, LayoutGrid, CircleDot, Network, GitBranch } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <GitMerge className="inline-block mr-2 mb-1 text-purple-600" /> Tarjan 算法与连通性 (Connectivity)

Tarjan 算法是图论中处理连通性的核心工具。通过一次 DFS 遍历，它能在线性时间内提取图的深层拓扑特征，如强连通分量 (SCC)、双连通分量 (BCC) 以及割点与桥。

---

## 一、 <Layers className="inline-block mr-2 mb-1 text-blue-500" /> 核心机制：DFS 树与时间戳

在 DFS 过程中，图的边被分为四类：
1. **树边 (Tree Edge)**：DFS 森林中的边。
2. **回边 (Back Edge)**：指向祖先节点的边（环的核心）。
3. **前向边 (Forward Edge)**：指向子树中已访问节点的边。
4. **横叉边 (Cross Edge)**：指向已访问但非祖先节点的边。

### 关键属性定义
- **dfn[u]**：深度优先搜索序（时间戳），表示 $u$ 被访问的次序。
- **low[u]**：通过子树及至多一条**回边**能到达的最小 $dfn$ 值。

---

## 二、 <ShieldAlert className="inline-block mr-2 mb-1 text-red-500" /> 无向图连通性

### 1. 割点 (Cut-point) 与 桥 (Bridge)
- **桥判定**：若 $low[v] > dfn[u]$，则 $(u, v)$ 为桥。
- **割点判定**：
  - 若 $u$ 为根，且拥有至少两个子树，则为割点。
  - 若 $u$ 不为根，且存在子节点 $v$ 使得 $low[v] \ge dfn[u]$，则为割点。

### 2. 双连通分量与圆方树 (Block-cut Tree)
<KnowledgeCard title="圆方树构造" icon={<CircleDot size={20} />}>
对于每个**点双连通分量 (v-BCC)**，新建一个**方点**，并将其与该分量内的所有**圆点**（原图点）连边。
**性质**：
1. 圆方树点数不超过 $2n$。
2. 任意两点间的路径经过的方点集，即为原图中路径经过的所有 v-BCC。
3. 它将复杂的连通关系转化为简单的树形结构，是处理无向图路径约束的利器。
</KnowledgeCard>

---

## 三、 <LayoutGrid className="inline-block mr-2 mb-1 text-green-500" /> 有向图连通性：SCC 与 2-SAT

### 1. 强连通分量 (SCC)
SCC 是有向图中极大互相可达的点集。
**缩点技巧**：将每个 SCC 压缩为一个点，原图转化为 **DAG**。这是解决有向图问题（如最长路、可达性）的标准预处理。

### 2. 2-SAT 问题：逻辑约束的图论转化
**问题定义**：给定 $n$ 个布尔变量 $x_i$，及 $m$ 个约束 $(A \lor B)$。
**建模**：
- $(x_i = true \lor x_j = false) \iff (x_i = false \to x_j = false) \land (x_j = true \to x_i = true)$。
- **结论**：若存在 $i$ 使得 $x_i$ 与 $\neg x_i$ 属于同一个 SCC，则无解。

<ComplexityAnalysis time="O(V + E)" space="O(V + E)" />

---

## 四、 工业级 C++ 实现 (SCC 缩点模板)

```cpp
#include <vector>
#include <stack>
#include <algorithm>

using namespace std;

struct SCC {
    int n, timer, scc_cnt;
    vector<vector<int>> g;
    vector<int> dfn, low, id;
    vector<bool> in_st;
    stack<int> st;

    SCC(int _n) : n(_n), timer(0), scc_cnt(0), g(n + 1), dfn(n + 1), low(n + 1), id(n + 1), in_st(n + 1) {}

    void add_edge(int u, int v) { g[u].push_back(v); }

    void tarjan(int u) {
        dfn[u] = low[u] = ++timer;
        st.push(u); in_st[u] = true;
        for (int v : g[u]) {
            if (!dfn[v]) {
                tarjan(v);
                low[u] = min(low[u], low[v]);
            } else if (in_st[v]) {
                low[u] = min(low[u], dfn[v]);
            }
        }
        if (low[u] == dfn[u]) {
            scc_cnt++;
            while (true) {
                int v = st.top(); st.pop();
                in_st[v] = false;
                id[v] = scc_cnt;
                if (u == v) break;
            }
        }
    }
};
```

---

## 五、 配套练习 (折叠解答)

### 练习 1：边双连通性加边
给定一个无向图，最少加几条边使其变成边双连通图？

<details>
<summary>查看解析</summary>

**分析**：
1. 找出所有桥，并将其删除，得到若干个**边双连通分量 (e-BCC)**。
2. 将每个 e-BCC 缩成一个点，原来的桥作为边，得到一棵**树**（或森林）。
3. 统计树中度数为 1 的节点（叶子节点）数量 $L$。
**结论**：答案为 $\lceil L/2 \rceil$（即 $\frac{L+1}{2}$）。

</details>

### 练习 2：2-SAT 的最小字典序解
在 2-SAT 中，如果需要求出字典序最小的解，能否使用 Tarjan？

<details>
<summary>查看解析</summary>

**分析**：
Tarjan 缩点只能判定是否有解，且只能给出任意一组可行解。
**方案**：
若要求字典序最小，通常需要使用 **暴力 DFS + 回溯**。按顺序尝试 $x_1 = false, x_1 = true \dots$，在尝试每个赋值时，通过隐含边进行推导，若发生冲突则回溯。

</details>

### 练习 3：圆方树上的路径查询
如何求无向图中两点间的所有路径必经的点？

<details>
<summary>查看解析</summary>

**分析**：
1. 必经的点即为这两点路径上的所有**割点**。
2. 构造圆方树。
3. 在圆方树上，两点 $u, v$（圆点）之间的简单路径上，所有的**圆点**（除了 $u, v$ 本身）即为必经割点。
4. 使用 LCA 可以在 $O(\log N)$ 时间内处理查询。

</details>
