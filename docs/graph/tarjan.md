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
在 DFS 过程中，有向图的边被划分为四类，这是判定连通性的数学基础：
- **树边 (Tree Edge)**：DFS 搜索树中的边。
- **回边 (Back Edge)**：指向当前路径上祖先节点的边。
- **前向边 (Forward Edge)**：指向子树中已访问节点的非树边。
- **横叉边 (Cross Edge)**：指向已访问但非祖先节点的边。

### 2. 关键属性：dfn 与 low
- **dfn[u]**：$u$ 被访问的绝对次序（时间戳）。
- **low[u]**：$u$ 及其子树通过至多一条**回边**能到达的最小 $dfn$ 值。
**核心公式**：
$$low[u] = \min \begin{cases} dfn[u] \\ \min \{low[v] \mid (u, v) \text{ is Tree Edge}\} \\ \min \{dfn[v] \mid (u, v) \text{ is Back/Cross Edge (and } v \in \text{Stack)}\} \end{cases}$$

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 算法矩阵与复杂度分析

<ComplexityAnalysis 
  data={[
    { algorithm: "Tarjan (SCC)", complexity: "O(V + E)", space: "O(V + E)", note: "一次 DFS + 辅助栈" },
    { algorithm: "Tarjan (BCC)", complexity: "O(V + E)", space: "O(V + E)", note: "点双与边双分量判定" },
    { algorithm: "Kosaraju (SCC)", complexity: "O(V + E)", space: "O(V + E)", note: "两次 DFS，逻辑更直观" },
    { algorithm: "Gabow (SCC)", complexity: "O(V + E)", space: "O(V + E)", note: "利用双栈优化" }
  ]}
/>

---

## 三、 <ShieldAlert className="inline-block mr-2 mb-1 text-red-500" /> 无向图连通性：割点、桥与圆方树

### 1. 割点与桥的判定
- **桥 (Bridge)**：若存在树边 $(u, v)$ 使得 $low[v] > dfn[u]$，则 $(u, v)$ 为桥。
- **割点 (Cut-point)**：
  - 若 $u$ 为根且有两个以上子树，则 $u$ 是割点。
  - 若 $u$ 非根且存在子边 $(u, v)$ 满足 $low[v] \ge dfn[u]$，则 $u$ 是割点。

### 2. 圆方树 (Block-cut Tree)
圆方树是将无向图连通块结构抽象化的终极武器。
- **圆点**：原图节点。
- **方点**：代表一个点双连通分量 (v-BCC)。
**性质**：任意两个圆点间的路径在圆方树上经过的所有**方点**，即为原图中这两点路径所经过的所有 v-BCC。

---

## 四、 <LayoutGrid className="inline-block mr-2 mb-1 text-green-500" /> 有向图连通性：SCC 缩点与 2-SAT

### 1. 强连通分量 (SCC)
SCC 是有向图中极大互相可达的点集。
**缩点技巧 (Condensation)**：将每个 SCC 缩为一个点。
**推论**：任何有向图缩点后必然得到一个 **DAG (有向无环图)**。

### 2. 2-SAT 问题判定
对于逻辑约束 $(A \lor B)$，转化为蕴含关系 $(\neg A \to B) \land (\neg B \to A)$。
- **解的存在性**：若 $\forall i$，变量 $x_i$ 与其反面 $\neg x_i$ 不在同一个 SCC 中，则原布尔表达式有解。

---

## 五、 工业级 C++ 实现 (SCC 缩点模板)

```cpp
#include <vector>
#include <stack>
#include <algorithm>

using namespace std;

/**
 * @brief Tarjan 算法实现强连通分量
 * 复杂度: O(V + E)
 */
class TarjanSCC {
private:
    int n, timer, scc_count;
    vector<vector<int>> adj;
    vector<int> dfn, low, scc_id;
    vector<bool> in_stack;
    stack<int> st;

    void dfs(int u) {
        dfn[u] = low[u] = ++timer;
        st.push(u);
        in_stack[u] = true;

        for (int v : adj[u]) {
            if (dfn[v] == 0) {
                dfs(v);
                low[u] = min(low[u], low[v]);
            } else if (in_stack[v]) {
                low[u] = min(low[u], dfn[v]);
            }
        }

        if (low[u] == dfn[u]) {
            scc_count++;
            while (true) {
                int node = st.top(); st.pop();
                in_stack[node] = false;
                scc_id[node] = scc_count;
                if (node == u) break;
            }
        }
    }

public:
    TarjanSCC(int _n) : n(_n), timer(0), scc_count(0), 
        adj(n + 1), dfn(n + 1, 0), low(n + 1, 0), 
        scc_id(n + 1, 0), in_stack(n + 1, false) {}

    void add_edge(int u, int v) { adj[u].push_back(v); }

    void solve() {
        for (int i = 1; i <= n; ++i) {
            if (dfn[i] == 0) dfs(i);
        }
    }

    int get_scc_id(int u) { return scc_id[u]; }
    int get_count() { return scc_count; }
};
```

---

## 六、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：边双连通分量的转化
给定无向图，最少加几条边可以使其变为边双连通图？

<details>
<summary>Check Solution</summary>

**解析**：
1. **缩点**：找出所有的桥，删除它们后将得到的每个连通块缩为一个点。
2. **生成树**：原来的桥将这些缩点连接成一棵树（或森林）。
3. **统计叶子**：令度数为 1 的节点（叶子）总数为 $L$。
4. **结论**：为了覆盖所有叶子，最少需要 $\lceil L/2 \rceil$ 条新边。

</details>

### 练习 2：SCC 缩点后的动态规划
在有向图中，每个点有权值，求一条路径使得经过的权值和最大（可重复经过点和边）。

<details>
<summary>Check Solution</summary>

**解析**：
1. **缩点**：运行 Tarjan 算法求出所有 SCC。
2. **权值叠加**：每个 SCC 缩为一个新点，其权值为该分量内所有原点权值之和。
3. **建 DAG**：对于原边 $(u, v)$，若 $ID(u) \neq ID(v)$，则在新点之间连边。
4. **求解**：在缩点后的 DAG 上运行**拓扑排序 + DP**（最长路）。

</details>

### 练习 3：割点对网络鲁棒性的影响
如何在线性时间内求出一个图中所有的关键节点，使得移除该节点后图的连通分量数增加？

<details>
<summary>Check Solution</summary>

**解析**：
该“关键节点”即为图的**割点 (Articulation Point)**。
1. **算法**：运行 Tarjan 割点判定算法。
2. **统计**：
   - 对于根节点 $R$，若 DFS 树中有超过 1 个儿子，则 $R$ 是割点。
   - 对于非根节点 $u$，若存在儿子 $v$ 满足 $low[v] \ge dfn[u]$，则 $u$ 是割点。
3. **复杂度**：$O(V + E)$。

</details>
