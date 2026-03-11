---
title: 二分图理论：匹配、覆盖与对偶性
---

import { GitMerge, Zap, Activity, ShieldCheck, Users, Link, Target, Layout, Sigma, CheckCircle, BookOpen, Workflow } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <GitMerge className="inline-block mr-2 mb-1 text-pink-500" /> 二分图匹配 (Bipartite Matching)

二分图匹配不仅是组合优化的核心，更是网络流理论在特殊结构下的精简表现。它通过一系列对偶定理揭示了匹配（Matching）、覆盖（Covering）与独立集（Independent Set）之间的对称之美。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 核心理论体系

### 1. 二分图判定定理

**定理**：无向图 $G$ 是二分图的充要条件是 $G$ 中不存在任何**奇环** (Odd Cycle)。
**证明要点**：利用 BFS/DFS 进行染色（二染色），若在染色过程中发现相邻节点颜色相同，则必存在奇环。

### 2. Berge 增广路定理

**定理**：匹配 $M$ 是最大匹配 $\iff$ 图中不存在关于 $M$ 的**增广路**。
_直观理解_：增广路始于未匹配点，交替经过非匹配边和匹配边，并终于另一个未匹配点。通过将增广路上的边状态反转，匹配数必然增加 $1$。

### 3. Hall 结婚定理 (Hall's Marriage Theorem)

**定理**：二分图 $G=(L \cup R, E)$ 存在覆盖 $L$ 的匹配 $\iff \forall S \subseteq L, |N(S)| \ge |S|$，其中 $N(S)$ 是 $S$ 的邻域。

<KnowledgeCard title="Kőnig 定理证明简述" icon={<BookOpen size={20} />}>
**定理**：在二分图中，**最大匹配数 = 最小顶点覆盖数**。
**构造性证明**：

1. 跑一遍最大匹配，记为 $M$。
2. 从左侧所有未匹配点出发，跑增广路（仅标记访问过的点）。
3. 令 $L_{vis}, R_{vis}$ 分别为左右侧被访问的点集。
4. **最小覆盖集 $C = (L \setminus L_{vis}) \cup R_{vis}$**。
5. 可以证明 $|C| = |M|$ 且 $C$ 覆盖了所有边。
   </KnowledgeCard>

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 算法选型与复杂度边界

<ComplexityAnalysis
data={[
{ algorithm: "Hungary (DFS)", complexity: "O(VE)", space: "O(V + E)", note: "实现最简，中小规模首选" },
{ algorithm: "Hopcroft-Karp", complexity: "O(E sqrt{V})", space: "O(V + E)", note: "分层增广，大规模图效率极高" },
{ algorithm: "Dinic (Flow based)", complexity: "O(E sqrt{V})", space: "O(V + E)", note: "在单位容量网络中表现卓越" }
]}
/>

---

## 三、 <Layout className="inline-block mr-2 mb-1 text-indigo-500" /> 四项核心指标与 Dilworth 定理

1. **最大匹配数 = 最小顶点覆盖数**。
2. **最大独立集数 = 总点数 - 最大匹配数**。
3. **最小边覆盖数 = 总点数 - 最大匹配数**（无孤立点）。
4. **Dilworth 定理**：偏序集的最少不相交链覆盖数 = 其最大反链长度。
   - 在 DAG 中，**最小不相交路径覆盖 = 顶点数 - 拆点二分图最大匹配数**。

---

## 四、 工业级 C++ 实现 (匈牙利算法)

```cpp
#include <vector>
#include <algorithm>

using namespace std;

/**
 * @brief 匈牙利算法实现
 * 复杂度: O(VE)
 */
class BipartiteMatcher {
    int nl, nr;
    vector<vector<int>> adj;
    vector<int> match_r, vis;
    int timer;

    bool dfs(int u) {
        for (int v : adj[u]) {
            if (vis[v] == timer) continue;
            vis[v] = timer;
            if (match_r[v] == -1 || dfs(match_r[v])) {
                match_r[v] = u;
                return true;
            }
        }
        return false;
    }

public:
    BipartiteMatcher(int _nl, int _nr) : nl(_nl), nr(_nr),
        adj(nl + 1), match_r(nr + 1, -1), vis(nr + 1, 0), timer(0) {}

    void add_edge(int u, int v) { adj[u].push_back(v); }

    int solve() {
        int res = 0;
        for (int i = 1; i <= nl; i++) {
            timer++;
            if (dfs(i)) res++;
        }
        return res;
    }
};
```

---

## 五、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：最大权独立集 (二分图)

给定二分图，每个点有正权值，选出一组互不相邻的点使得权值和最大。

<details>
<summary>Check Solution</summary>

**解析**：

1. **转化**：最大权独立集 = 总权值 - 最小权顶点覆盖。
2. **建模**：
   - $S \to L_i$，容量 $w(L_i)$。
   - $R_j \to T$，容量 $w(R_j)$。
   - 原图边 $L_i \to R_j$，容量 $\infty$。
3. **计算**：$\sum w - \text{MaxFlow}$。

</details>

### 练习 2：最小路径覆盖 (可相交)

在 DAG 中求最少路径数覆盖所有点，路径可相交。

<details>
<summary>Check Solution</summary>

**解析**：

1. **传递闭包**：若 $u \to \dots \to v$，则在图中补边 $u \to v$。
2. **转化**：在补全后的图中求**不可相交路径覆盖**。
3. **结论**：路径数 = $n$ - 拆点二分图最大匹配。

</details>

### 练习 3：矩阵 0-1 覆盖

给定 $0-1$ 矩阵，最少选多少行和列覆盖所有 $1$？

<details>
<summary>Check Solution</summary>

**解析**：

1. **建模**：行看作左侧点，列看作右侧点。若 $(i, j)=1$，连边 $i \to j$。
2. **结论**：本题即求最小顶点覆盖，由 Kőnig 定理知，答案等于最大匹配数。

</details>
