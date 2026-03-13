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
- **dfn[u]**：$u$ 被搜索到的绝对时间戳（搜索序）。
- **low[u]**：$u$ 通过一条后向边或横叉边能到达的**最小 dfn 祖先**。

---

## 二、 <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 强连通分量 (SCC) 的逻辑验证

强连通分量的本质是 DFS 树上的一个子结构，满足任意两点互达。

### 1. 判定准则：为什么 `low[u] == dfn[u]` 是根？
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
如何查询无向图中两点间所有简单路径的交集？

<details>
<summary>Check Solution</summary>

**解析**：
1. **构建圆方树**：
   - 原图点为“圆点”。
   - 每个 v-BCC 建立一个“方点”，向该 BCC 内的所有圆点连边。
2. **性质**：圆方树上圆点 $u, v$ 路径上的所有**圆点**，即为原图中 $u, v$ 间所有简单路径的必经点。

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

</details>

### 练习 3：寻找所有桥并输出
给定大规模无向图，输出所有桥。

<details>
<summary>Check Solution</summary>

**解析**：
直接使用 Tarjan 的桥判定准则。注意在有重边的情况下，不能简单判断 `v == p`，而应判断**边的编号**。

```cpp
// 核心逻辑：处理重边
if (edge_id == (in_edge ^ 1)) continue;
```

</details>
