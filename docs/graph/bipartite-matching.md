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

### 1. 二分图的形式化定义
图 $G=(V, E)$ 是二分图，当且仅当其顶点集可划分为两个互不相交的独立集 $U$ 和 $V$。
**等价判定定理**：图 $G$ 是二分图 $\iff$ 图中不存在任何**奇数长度的环**。

### 2. Berge 增广路定理
**定理**：匹配 $M$ 是最大匹配的充要条件是：图中不存在关于 $M$ 的**增广路**（Augmenting Path）。
*增广路定义*：始于未匹配点，边在 $M$ 与 $E \setminus M$ 中交替出现，且终点也是未匹配点的路径。通过将路径上的匹配状态取反，可立即使匹配数 $+1$。

### 3. Hall 结婚定理 (Hall's Marriage Theorem)
**定理**：二分图 $G=(U \cup V, E)$ 存在覆盖 $U$ 的匹配，当且仅当对于任意子集 $S \subseteq U$，其邻域 $N(S) = \{v \in V \mid \exists u \in S, (u, v) \in E\}$ 满足：
$$|N(S)| \ge |S|$$

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 算法选型与复杂度边界

<ComplexityAnalysis 
  data={[
    { algorithm: "Hungary (DFS)", complexity: "O(VE)", space: "O(V + E)", note: "实现最简，中小规模首选" },
    { algorithm: "Hopcroft-Karp (BFS+DFS)", complexity: "O(E sqrt{V})", space: "O(V + E)", note: "大规模二分图，分层增广" },
    { algorithm: "Dinic (Flow based)", complexity: "O(E sqrt{V})", space: "O(V + E)", note: "理论复杂度与 HK 一致" }
  ]}
/>

---

## 三、 <Layout className="inline-block mr-2 mb-1 text-indigo-500" /> Kőnig 定理与四项核心指标

在**无权二分图**中，以下四项指标存在深刻的对偶关系：

1. **最大匹配数 = 最小顶点覆盖数**
   - *构造证明*：从左侧未匹配点出发跑增广路，左侧未访问点 + 右侧已访问点 = 最小覆盖。
2. **最大独立集数 = 总点数 - 最大匹配数**
   - *推论*：在一个独立集中，任意两点互不相连。
3. **最小边覆盖数 = 总点数 - 最大匹配数**
   - *前提*：图中无孤立点。
4. **DAG 最小不相交路径覆盖 = 原图顶点数 - 拆点二分图最大匹配数**

---

## 四、 工业级 C++ 实现 (匈牙利算法范式)

```cpp
#include <vector>
#include <algorithm>

using namespace std;

/**
 * @brief 匈牙利算法实现
 * 复杂度: O(VE)
 * 应用: 二分图最大匹配
 */
class BipartiteMatcher {
private:
    int n_left, n_right;
    vector<vector<int>> adj;
    vector<int> match_left_to_right;
    vector<int> match_right_to_left;
    vector<bool> visited;

    bool find_path(int u) {
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                // 若右侧点未匹配，或已匹配点能找到新增广路
                if (match_right_to_left[v] == -1 || find_path(match_right_to_left[v])) {
                    match_right_to_left[v] = u;
                    match_left_to_right[u] = v;
                    return true;
                }
            }
        }
        return false;
    }

public:
    BipartiteMatcher(int nl, int nr) : n_left(nl), n_right(nr), 
        adj(nl + 1), match_left_to_right(nl + 1, -1), 
        match_right_to_left(nr + 1, -1), visited(nr + 1) {}

    void add_edge(int u, int v) { adj[u].push_back(v); }

    int solve() {
        int matching_size = 0;
        for (int i = 1; i <= n_left; ++i) {
            fill(visited.begin(), visited.end(), false);
            if (find_path(i)) matching_size++;
        }
        return matching_size;
    }

    int get_match(int u) { return match_left_to_right[u]; }
};
```

---

## 五 <Link className="inline-block mr-2 mb-1 text-amber-500" /> 建模进阶：最大权独立集

**问题描述**：二分图中每个点有权值 $w_i$，选出一组点集 $S$，使得 $S$ 中任意两点互不连接，且 $\sum_{i \in S} w_i$ 最大。

<KnowledgeCard title="最大权独立集转化" icon={<ShieldCheck size={20} />}>
**结论**：$\text{最大权独立集} = \sum w_i - \text{最小权点覆盖}$。
**最小权点覆盖建模**：
1. $S \to \text{左侧点}$，容量为权值 $w_i$。
2. $\text{右侧点} \to T$，容量为权值 $w_i$。
3. 原图中边 $(u, v)$ 改为容量 $\infty$ 的有向边。
4. **最小权点覆盖** 即为该网络流的**最小割**（最大流）。
</KnowledgeCard>

---

## 六、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：矩阵中的 0-1 覆盖
给定一个 $0-1$ 矩阵，求最少需要选多少行和列，才能覆盖矩阵中所有的 $1$。

<details>
<summary>Check Solution</summary>

**解析**：
1. **建模**：每一行看作左侧点，每一列看作右侧点。
2. **连边**：若格子 $(i, j)$ 为 $1$，则连接左侧点 $i$ 与右侧点 $j$。
3. **转化**：覆盖矩阵中的 $1$ 等价于覆盖图中的边。
4. **结论**：本题即求**最小顶点覆盖**，根据 Kőnig 定理，答案为该二分图的**最大匹配数**。

</details>

### 练习 2：最小路径覆盖 (可相交路径)
在 DAG 中求最少需要多少条路径覆盖所有点，路径可以经过同一点多次。

<details>
<summary>Check Solution</summary>

**解析**：
1. **预处理**：运行 **Floyd 传递闭包**。若 $u$ 可达 $v$，则连边 $u \to v$。
2. **原因**：在新图中，一条边 $u \to v$ 代表了原图中的一条路径（可能跨越多个中间点）。
3. **转化**：在闭包图上运行**不可相交路径覆盖**（拆点二分图最大匹配）。
4. **结论**：$\text{路径数} = n - \text{最大匹配数}$。

</details>

### 练习 3：稳定婚姻问题 (Gale-Shapley)
如何判定在一个稳定匹配问题中，不存在“私奔对” (Unstable pair)？

<details>
<summary>Check Solution</summary>

**解析**：
Gale-Shapley 算法通过“男子求婚，女子筛选”的贪心策略，保证了每一轮中，男子的处境在变差（名单下移），而女子的处境在变好（持有更优人选）。
1. **稳定性判定**：对于任意男子 $m$ 和非其配偶的女子 $w$，若 $m$ 相比现配偶更喜欢 $w$，且 $w$ 相比现配偶更喜欢 $m$，则存在不稳定对。
2. **结论**：该算法必然收敛于一个稳定状态，且是“男子最优，女子最劣”的匹配。

</details>
