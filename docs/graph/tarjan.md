---
title: Tarjan 算法：连通性理论与拓扑转换
---

import { GitMerge, Layers, ShieldAlert, Share2, Zap, LayoutGrid, CircleDot, Network, GitBranch, Sigma, BookOpen, Target, Workflow } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <GitMerge className="inline-block mr-2 mb-1 text-purple-600" /> Tarjan 算法与连通性 (Connectivity)

Tarjan 算法是图论中处理连通性的核心工具。它通过一次深度优先搜索 (DFS)，利用栈结构与时间戳判定，在线性时间内揭示图的深层拓扑特征，如强连通分量 (SCC)、双连通分量 (BCC) 以及关键的割点与桥。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 核心理论体系

### 1. DFS 树与边分类

在 DFS 过程中，有向图的边被划分为四类：

- **树边 (Tree Edge)**：搜索树中的边。
- **回边 (Back Edge)**：指向当前路径上祖先节点的边。
- **前向边 (Forward Edge)**：指向子树中已访问节点的非树边。
- **横叉边 (Cross Edge)**：指向已访问但非祖先节点的边。

### 2. 核心属性：dfn 与 low

- **dfn[u]**：节点 $u$ 被访问的时间戳。
- **low[u]**：节点 $u$ 及其子树通过**至多一条**回边或横叉边（且终点在当前栈中）能到达的最小 $dfn$ 值。

<KnowledgeCard title="SCC 判定原理" icon={<BookOpen size={20} />}>
**定理**：若 $low[u] = dfn[u]$，则以 $u$ 为根的子树中所有仍在栈中的节点构成一个强连通分量。
**证明要点**：
$low[u] = dfn[u]$ 意味着 $u$ 的子树无法通过任何边回溯到 $u$ 之前的祖先。而 $u$ 又是其子树中第一个被访问的点，因此子树内部形成的环流无法溢出 $u$，故构成极大强连通区域。
</KnowledgeCard>

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 算法矩阵与复杂度分析

<ComplexityAnalysis
data={[
{ algorithm: "Tarjan (SCC)", complexity: "O(V + E)", space: "O(V + E)", note: "辅助栈一次 DFS，可直接得出拓扑序" },
{ algorithm: "Tarjan (v-BCC)", complexity: "O(V + E)", space: "O(V + E)", note: "点双连通分量，割点判定" },
{ algorithm: "Tarjan (e-BCC)", complexity: "O(V + E)", space: "O(V + E)", note: "边双连通分量，桥判定" },
{ algorithm: "Kosaraju", complexity: "O(V + E)", space: "O(V + E)", note: "两次 DFS，适合理论证明" }
]}
/>

---

## 三、 <ShieldAlert className="inline-block mr-2 mb-1 text-red-500" /> 无向图：割点与桥的判定

### 1. 割点 (Articulation Point)

**条件**：

- 若 $u$ 是 DFS 树的根：至少有两个子树。
- 若 $u$ 非根：存在子节点 $v$ 使得 $low[v] \ge dfn[u]$。
  _直观理解_：$low[v] \ge dfn[u]$ 说明 $v$ 的子树没有指向 $u$ 的祖先的回边，移除 $u$ 后 $v$ 的子树将与外界断开。

### 2. 桥 (Bridge)

**条件**：存在子节点 $v$ 使得 $low[v] > dfn[u]$。

---

## 四、 <LayoutGrid className="inline-block mr-2 mb-1 text-green-500" /> SCC 缩点与 DAG 转换

强连通分量的一个核心性质是：**任何有向图在缩点（SCC Condensation）后必然得到一个 DAG**。

- **拓扑序**：Tarjan 算法求出的 SCC ID 顺序（按出栈逆序）天然对应着缩点后 DAG 的一个**反拓扑序**。
- **应用**：将复杂图转化为 DAG 后，可以运行动态规划。

---

## 五、 工业级 C++ 实现 (SCC 模板)

```cpp
#include <vector>
#include <stack>
#include <algorithm>

using namespace std;

/**
 * @brief 强连通分量 Tarjan 算法
 * 包含：缩点、SCC 计数、反拓扑序 ID
 */
class TarjanSCC {
    int n, timer, scc_cnt;
    vector<vector<int>> adj;
    vector<int> dfn, low, scc_id;
    vector<bool> in_stack;
    stack<int> st;

    void dfs(int u) {
        dfn[u] = low[u] = ++timer;
        st.push(u); in_stack[u] = true;
        for (int v : adj[u]) {
            if (!dfn[v]) {
                dfs(v);
                low[u] = min(low[u], low[v]);
            } else if (in_stack[v]) {
                low[u] = min(low[u], dfn[v]);
            }
        }
        if (low[u] == dfn[u]) {
            scc_cnt++;
            while (true) {
                int v = st.top(); st.pop();
                in_stack[v] = false;
                scc_id[v] = scc_cnt;
                if (u == v) break;
            }
        }
    }

public:
    TarjanSCC(int _n) : n(_n), timer(0), scc_cnt(0),
        adj(n + 1), dfn(n + 1, 0), low(n + 1, 0),
        scc_id(n + 1, 0), in_stack(n + 1, false) {}

    void add_edge(int u, int v) { adj[u].push_back(v); }
    void solve() {
        for (int i = 1; i <= n; i++) if (!dfn[i]) dfs(i);
    }
    int get_id(int u) { return scc_id[u]; }
};
```

---

## 六、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：2-SAT 问题判定

给定一组变量 $x_i$ 及其约束 $(x_i \lor x_j)$，判定是否存在一组布尔赋值。

<details>
<summary>Check Solution</summary>

**解析**：

1. **构图**：将 $(A \lor B)$ 转化为 $(\neg A \to B)$ 和 $(\neg B \to A)$。
2. **SCC 分解**：运行 Tarjan。
3. **判定**：若存在变量 $i$ 使得 $x_i$ 和 $\neg x_i$ 在同一个 SCC 中，则无解。
4. **构造解**：选择 SCC ID 较小（即拓扑序较后）的状态。

</details>

### 练习 2：缩点后的 DAG 动态规划

在有向图中，每个点有权值，求一条路径使得权值和最大（可重复经过点和边）。

<details>
<summary>Check Solution</summary>

**解析**：

1. **缩点**：由于同一个 SCC 内部的点可以互相到达并全部选取，将 SCC 缩为一个新点。
2. **权值转换**：新点权值 = 原 SCC 内所有点权值之和。
3. **DAG 最长路**：在新图上运行拓扑排序 + DP。$dp[v] = \max(dp[u] + val[v])$。

</details>

### 练习 3：无向图加边使其边双连通

给定无向图，最少增加几条边使其没有桥？

<details>
<summary>Check Solution</summary>

**解析**：

1. **边双缩点**：找出所有桥，缩点后得到一棵树。
2. **统计叶子**：设度数为 1 的节点数为 $L$。
3. **结论**：最少加边数为 $\lceil L/2 \rceil$。

</details>
