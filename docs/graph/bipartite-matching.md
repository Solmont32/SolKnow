---
title: 二分图匹配：博弈论、匹配定理与对偶性证明
---

import { GitBranch, Zap, Activity, ShieldCheck, Layers, Landmark, ArrowRightLeft, Maximize, Sigma, Workflow, BookOpen, Target, Network } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <GitBranch className="inline-block mr-2 mb-1 text-blue-500" /> 二分图匹配 (Bipartite Matching)

二分图匹配是组合数学中最具优雅特性的领域之一。本章将从 Berge 增广路定理出发，建立 Hall 婚姻定理的严密证明，并深入探讨二分图下的各种覆盖与独立集对偶性质。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 核心定理与形式化证明

### 1. Berge 增广路定理 (Berge's Lemma)
**定理**：匹配 $M$ 是图 $G$ 的最大匹配，当且仅当 $G$ 中不存在关于 $M$ 的增广路径。
<KnowledgeCard title="证明要点" icon={<ShieldCheck size={20} />}>
**必要性**：显然，若存在增广路，通过取反操作可获得更大的匹配。
**充分性**：设 $M$ 不是最大匹配，$M^*$ 是最大匹配。考虑对称差 $M \oplus M^*$。其分量只能是偶环或路径。由于 $|M^*| > |M|$，必存在至少一条路径，其包含 $M^*$ 的边多于 $M$。这条路径即为关于 $M$ 的增广路径。
</KnowledgeCard>

### 2. Hall 婚姻定理 (Hall's Marriage Theorem)
**定理**：二分图 $G=(X \cup Y, E)$ 存在覆盖 $X$ 的匹配，当且仅当对于 $X$ 的任意子集 $S$，均满足 $|N(S)| \ge |S|$，其中 $N(S)$ 是 $S$ 的邻居集合。
<KnowledgeCard title="证明 (归纳法)" icon={<BookOpen size={20} />}>
对 $|X|$ 施加归纳法。
1. **基础步**：$|X|=1$ 时显然。
2. **归纳步**：
   - **情况 A**：对于任意非空真子集 $S \subset X$，均有 $|N(S)| > |S|$。选一对相邻的 $(x, y)$ 匹配，删去后剩余图仍满足 Hall 条件。
   - **情况 B**：存在某个真子集 $S \subset X$ 使得 $|N(S)| = |S|$。由归纳假设，$S$ 可与 $N(S)$ 完美匹配。对于 $X \setminus S$，考虑其在 $Y \setminus N(S)$ 中的邻居。可以证明 $X \setminus S$ 亦满足 Hall 条件，故整体可匹配。
</KnowledgeCard>

---

## 二、 <Layers className="inline-block mr-2 mb-1 text-purple-500" /> 对偶性体系 (Kőnig's Theorem)

在二分图中，几个核心指标存在完美的对偶关系：

### 1. Kőnig 定理
**定理**：二分图中的最大匹配数 = 最小点覆盖数。
- **推论 1**：最大独立集数 = 总顶点数 - 最小点覆盖数（最大匹配数）。
- **推论 2**：最小边覆盖数 = 总顶点数 - 最大匹配数。

### 2. 最大权匹配：KM 算法 (Kuhn-Munkres)
KM 算法通过引入**顶标 (Vertex Label)** 将最大权匹配转化为相等子图下的完美匹配。
- **顶标性质**：$lx[u] + ly[v] \ge w(u, v)$。
- **相等子图**：仅包含满足 $lx[u] + ly[v] = w(u, v)$ 的边的子图。

---

## 三、 工业级 C++ 实现 (匈牙利算法)

```cpp
/**
 * @brief 匈牙利算法 (Hungarian Algorithm)
 * 复杂度: O(VE)
 */
bool dfs(int u, vector<int>& match, vector<bool>& vis) {
    for (int v : adj[u]) {
        if (!vis[v]) {
            vis[v] = true;
            if (match[v] == -1 || dfs(match[v], match, vis)) {
                match[v] = u;
                return true;
            }
        }
    }
    return false;
}

int max_match(int n_left) {
    int res = 0;
    match.assign(n_right, -1);
    for (int i = 0; i < n_left; ++i) {
        vis.assign(n_right, false);
        if (dfs(i, match, vis)) res++;
    }
    return res;
}
```

---

## 四、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：棋盘覆盖 - 骨牌铺满
给定 $N \times M$ 的棋盘，某些格子有障碍。求最多能放多少块 $1 \times 2$ 的骨牌。

<details>
<summary>Check Solution</summary>

**解析**：
1. **二分图判定**：棋盘是典型的二分图。
2. **建模**：相邻的非障碍格子连边。
3. **求解**：最大匹配数。

</details>

### 练习 2：最小路径点不相交覆盖
在 DAG 中找最少路径覆盖所有点。

<details>
<summary>Check Solution</summary>

**解析**：
见网络流章节练习 1。二分图匹配是其特殊且高效的解法。
最小路径数 = 总顶点数 - 最大匹配数。

</details>

### 练习 3：Hall 定理应用 - 循环赛判定
有 $n$ 支队伍参加循环赛，已知每支队伍目前的得分及剩余比赛。判定是否可能使某支队伍 $k$ 最终得分最高。

<details>
<summary>Check Solution</summary>

**解析**：
1. **上限设定**：设队伍 $k$ 赢得所有剩余比赛，得分为 $W$。
2. **约束**：其他队伍 $i$ 最终得分不能超过 $W$。
3. **建模**：
   - 左侧节点：每场比赛 $(i, j)$。
   - 右侧节点：每支队伍 $i$。
   - 比赛 $(i, j)$ 向队伍 $i$ 和 $j$ 连边，表示赢家。
4. **求解**：最大流是否等于剩余比赛总数。

</details>

### 练习 4：最大权完美匹配 - 任务分配
$n$ 个人分配 $n$ 个任务，已知每个人完成每个任务的效率。求总效率最大方案。

<details>
<summary>Check Solution</summary>

**解析**：
标准 KM 算法或费用流（流量设为 $n$）。

</details>
