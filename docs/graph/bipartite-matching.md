---
title: 二分图理论：匹配、覆盖与稳定婚姻
---

import { GitMerge, Zap, Activity, ShieldCheck, Users, Link, Target, Layout, Sigma, CheckCircle, BookOpen, Workflow } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <GitMerge className="inline-block mr-2 mb-1 text-pink-500" /> 二分图匹配 (Bipartite Matching)

二分图匹配不仅是组合优化的核心，更是**对偶性 (Duality)** 的直观体现。本章将从 Berge 增广路定理出发，探讨 Kőnig 定理、Hall 结婚定理，以及在博弈论中广泛应用的稳定婚姻算法。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 核心理论体系

### 1. Kőnig 定理：匹配与覆盖的对偶
在二分图中：
$$\text{最大匹配数} = \text{最小顶点覆盖数}$$
这一结论是**最大流最小割定理**在二分图上的特例。

### 2. Hall 结婚定理 (Hall's Marriage Theorem)
二分图 $G=(L \cup R, E)$ 存在覆盖 $L$ 的匹配的充要条件是：
$$\forall S \subseteq L, |N(S)| \ge |S|$$
其中 $N(S)$ 是 $S$ 的邻域。
- **直观理解**：任何一个子集都有足够多的外部连接点。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 稳定婚姻问题 (Gale-Shapley)

在带权匹配的背景下，若每方都有偏好列表，寻找一个**稳定匹配**（不存在任何一对男女相互偏好优于当前伴侣）。

### 1. 算法流程 (男方求婚视角)
1. 每个未订婚的男性向其偏好列表中最优先且未拒绝过他的女性求婚。
2. 女性在所有求婚者中选择最偏好的一个暂时订婚，拒绝其余人。
3. 被拒绝的男性继续向下一位求婚。

### 2. 结论
- **收敛性**：算法必在 $O(n^2)$ 内结束。
- **最优性**：该算法产生的是**男方最优**的稳定匹配。

---

## 三、 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 一般图匹配：带花树算法 (Blossom Algorithm)

二分图没有奇环，因此 DFS 找增广路是可靠的。但在一般图中，**奇环**的存在会导致增广路搜索进入死循环。
- **核心思想**：当发现奇环（花）时，将其缩为一个点，并在找到增广路后再展开。
- **复杂度**：$O(V^2 E)$。

---

## 四、 工业级 C++ 实现 (Hopcroft-Karp 范式)

```cpp
/**
 * @brief Hopcroft-Karp 算法：二分图最大匹配
 * 复杂度: O(E sqrt{V})
 */
struct HopcroftKarp {
    vector<int> g[N], match_l, match_r, dist;
    int n, m;

    bool bfs() {
        queue<int> q;
        dist.assign(n + 1, -1);
        for (int i = 1; i <= n; ++i) {
            if (match_l[i] == 0) {
                dist[i] = 0; q.push(i);
            }
        }
        bool found = false;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int v : g[u]) {
                if (match_r[v] == 0) found = true;
                else if (dist[match_r[v]] == -1) {
                    dist[match_r[v]] = dist[u] + 1;
                    q.push(match_r[v]);
                }
            }
        }
        return found;
    }

    bool dfs(int u) {
        for (int v : g[u]) {
            if (match_r[v] == 0 || (dist[match_r[v]] == dist[u] + 1 && dfs(match_r[v]))) {
                match_l[u] = v; match_r[v] = u;
                return true;
            }
        }
        dist[u] = -1;
        return false;
    }

    int solve() {
        int res = 0;
        while (bfs()) {
            for (int i = 1; i <= n; ++i)
                if (match_l[i] == 0 && dfs(i)) res++;
        }
        return res;
    }
};
```

---

## 五、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：完美匹配判定
给定 $2n$ 个点，判定是否存在大小为 $n$ 的匹配。

<details>
<summary>Check Solution</summary>

**解析**：
直接运行 Hopcroft-Karp 或 Dinic，检查结果是否等于 $n$。
- **高级视角**：利用 **Tutte 矩阵** 和随机化算法（Schwartz-Zippel Lemma）可以在 $O(n^\omega)$ 时间内判定（$\omega$ 为矩阵乘法常数）。

</details>

### 练习 2：最少不相交路径覆盖 (DAG)
在 DAG 中用最少的路径覆盖所有顶点。

<details>
<summary>Check Solution</summary>

**解析**：
1. **拆点**：每个点 $u$ 拆为 $u_{out}$ 和 $u_{in}$。
2. **连边**：若原图有 $u \to v$，则连边 $u_{out} \to v_{in}$。
3. **结论**：路径数 = $n$ - 最大匹配数。
   - **直观理解**：每增加一个匹配边，就减少了一个路径的起点。

</details>

### 练习 3：最大独立集 (一般图)
一般图的最大独立集是 NP-Hard 的，为什么二分图可以做？

<details>
<summary>Check Solution</summary>

**解析**：
因为二分图具有**全单模性 (Total Unimodularity)**，其对应的线性规划松弛解必然是整数。这使得最大匹配（对偶问题）可以通过多项式时间算法解决，进而通过 $V - \text{MaxMatch}$ 得到结果。

</details>
