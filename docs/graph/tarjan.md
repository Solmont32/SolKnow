---
title: Tarjan 算法：连通性、双连通分量与 2-SAT
---

import { GitMerge, Layers, ShieldAlert, Share2, Zap, LayoutGrid, CircleDot, Network, GitBranch, Sigma, BookOpen, Target, Workflow } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <GitMerge className="inline-block mr-2 mb-1 text-purple-600" /> Tarjan 算法与连通性 (Connectivity)

Tarjan 算法是图论中处理连通性的基石。它不仅能在线性时间内求出强连通分量 (SCC)，更能通过 DFS 树的属性判定割点、桥以及各种双连通分量 (BCC)。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 形式化理论体系

### 1. DFS 树边集分类 (Edge Classification)
在有向图的 DFS 过程中，边集 $E$ 被划分为四类，这是拓扑分析的关键：
- **树边 (Tree Edge)**：DFS 遍历直接经过的边。
- **后向边 (Back Edge)**：指向祖先节点的边，预示着**环路 (Cycle)** 的存在。
- **前向边 (Forward Edge)**：指向子树中已访问非直系后裔的边。
- **横叉边 (Cross Edge)**：指向已访问但非祖先也非后裔节点的边。

### 2. 时间戳与追溯值
**定义 1.1 (dfn)**：$dfn[u]$ 为节点 $u$ 在 DFS 过程中的访问序。
**定义 1.2 (low)**：$low[u]$ 定义为 $u$ 所在的子树仅通过**一条非树边**能到达的最小 $dfn$ 值：
$$low[u] = \min \begin{cases} dfn[u] \\ \min \{ dfn[v] \mid (u, v) \text{ 为后向边/横叉边} \} \\ \min \{ low[v] \mid (u, v) \text{ 为树边} \} \end{cases}$$

---

## 二、 <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 连通性性质推导

### 1. 割点 (Cut-vertex) 的判定
**定理 2.1**：在无向图 $G$ 的 DFS 树中，节点 $u$ 是割点当且仅当满足以下任一条件：
1. **$u$ 为根节点**：且在 DFS 树中至少有两个子节点。
2. **$u$ 非根节点**：且存在至少一个子节点 $v$，满足 $low[v] \ge dfn[u]$。

**推导要点**：
- 若 $low[v] \ge dfn[u]$，说明 $v$ 及其子树没有办法跳过 $u$ 访问到 $u$ 的祖先。一旦删去 $u$，$v$ 所在的分支将与图的其余部分断开。

### 2. 桥 (Bridge) 的判定
**定理 2.2**：无向边 $(u, v)$ 是桥当且仅当 $(u, v)$ 是 DFS 树上的树边，且满足：
$$low[v] > dfn[u]$$

**证明**：
若 $low[v] > dfn[u]$，说明从 $v$ 子树出发的所有边都无法到达 $u$ 或 $u$ 之前的节点。因此，除了树边 $(u, v)$ 之外，不存在任何路径连接 $v$ 的子树与 $u$ 所在的外部区域。

### 3. 强连通分量 (SCC) 的逻辑验证
**命题**：如果 $low[u] = dfn[u]$，则 $u$ 是一个强连通分量在 DFS 树中最先被访问的节点（根）。

**逻辑验证**：
1. 若 $low[u] = dfn[u]$，说明从 $u$ 的子树出发，没有任何边能跳回 $u$ 的祖先。
2. 因此，$u$ 及其子树中能够互相到达的节点形成了一个封闭的连通区域。
3. 利用**栈 (Stack)** 结构，我们在回溯时如果发现该条件成立，弹出栈中直至 $u$ 的所有节点，这些节点即构成一个 SCC。

---

## 三、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 2-SAT 约束满足问题

2-SAT 是一类特殊的布尔约束满足问题，每个约束形如 $(x_i \lor x_j)$。

### 1. 构图逻辑
$(x_i \lor x_j) \iff (\neg x_i \to x_j) \land (\neg x_j \to x_i)$。
- 为每个变量 $x$ 建立两个点：$V_{x, true}$ 和 $V_{x, false}$。
- 添加有向边表示逻辑推导。

### 2. 判定与构造
- **判定**：若 $V_{x, true}$ 和 $V_{x, false}$ 在同一个 SCC 中，则无解。
- **构造解**：比较 $SCC\_ID(V_{x, true})$ 和 $SCC\_ID(V_{x, false})$。在 Tarjan 缩点后的反拓扑序中，**选择 ID 较小（即拓扑序较后）的点**。

---

## 三、 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 边双连通分量 (e-BCC) 与桥

<KnowledgeCard title="桥的判定准则" icon={<ShieldAlert size={20} />}>
边 $(u, v)$ 是桥 $\iff$ $low[v] > dfn[u]$。
这意味着从 $v$ 出发的任何路径都无法回到 $u$ 或其祖先，除去 $(u, v)$ 后 $v$ 所在子树即孤立。
</KnowledgeCard>

---

## 四、 工业级 C++ 实现 (点双连通分量 v-BCC)

```cpp
/**
 * @brief v-BCC 点双连通分量
 * 能够求出所有点双、割点并构建圆方树
 */
struct TarjanBCC {
    int n, timer, bcc_cnt;
    vector<int> dfn, low, is_cut;
    vector<vector<int>> adj, bcc;
    stack<pair<int, int>> st;

    void dfs(int u, int p = -1) {
        dfn[u] = low[u] = ++timer;
        int child = 0;
        for (int v : adj[u]) {
            if (v == p) continue;
            if (!dfn[v]) {
                child++;
                st.push({u, v});
                dfs(v, u);
                low[u] = min(low[u], low[v]);
                if (low[v] >= dfn[u]) {
                    is_cut[u] = true;
                    bcc_cnt++;
                    vector<int> current_bcc;
                    while (true) {
                        auto edge = st.top(); st.pop();
                        current_bcc.push_back(edge.second);
                        if (edge.first == u && edge.second == v) break;
                    }
                    current_bcc.push_back(u);
                    bcc.push_back(current_bcc);
                }
            } else if (dfn[v] < dfn[u]) {
                st.push({u, v});
                low[u] = min(low[u], dfn[v]);
            }
        }
        if (p == -1 && child < 2) is_cut[u] = false;
    }
};
```

---

## 五、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：圆方树 (Block-Cut Tree)
如何查询无向图中两点间所有简单路径的必经点？

<details>
<summary>Check Solution</summary>

**解析**：
1. **构建圆方树**：
   - 原图中的 $N$ 个点为“圆点”。
   - 对每个 v-BCC 建立一个“方点”，向该 BCC 内的所有圆点连边。
2. **性质**：
   - 任意两点 $u, v$ 在原图中的**所有简单路径交集**即为圆方树上 $u, v$ 路径中的所有**圆点**。
3. **计算**：通过 LCA 求得树上路径，统计路径上的圆点数量。

```cpp
/**
 * @brief 构建圆方树核心逻辑
 */
void build_tree() {
    for (int i = 1; i <= bcc_cnt; ++i) {
        int square_node = n + i;
        for (int u : bcc[i]) {
            tree[square_node].push_back(u);
            tree[u].push_back(square_node);
        }
    }
}
```

</details>

### 练习 2：2-SAT 应用 - 排班问题
有 $N$ 对任务，每对任务只能选一个执行，且存在某些冲突。

<details>
<summary>Check Solution</summary>

**解析**：
这是标准的 2-SAT。
- 设 $x_i$ 为任务 $i$ 的第一种方案，$\neg x_i$ 为第二种。
- 若 $A$ 与 $B$ 冲突，则连边 $A \to \neg B$ 和 $B \to \neg A$。
- 跑 Tarjan 判定并构造解。

```cpp
// 判定逻辑
for (int i = 1; i <= n; ++i) {
    if (scc[i * 2] == scc[i * 2 + 1]) return false; // 冲突
}
```

</details>

### 练习 3：寻找所有桥并输出 (处理重边)
给定大规模无向图，输出所有桥。注意图中可能存在重边。

<details>
<summary>Check Solution</summary>

**解析**：
直接使用 Tarjan 的桥判定准则。在有重边的情况下，不能简单判断 `v == p`，而应判断**进入该点的边的编号**，避免通过当前边的反向边回到父亲。

```cpp
void dfs(int u, int in_edge) {
    dfn[u] = low[u] = ++timer;
    for (auto& e : adj[u]) {
        if (e.id == (in_edge ^ 1)) continue; // 关键：跳过反向边
        if (!dfn[e.to]) {
            dfs(e.to, e.id);
            low[u] = min(low[u], low[e.to]);
            if (low[e.to] > dfn[u]) is_bridge[e.id] = true;
        } else {
            low[u] = min(low[u], dfn[e.to]);
        }
    }
}
```

</details>
