---
title: 最小生成树：贪心理论、重构树与连通性一致性证明
---

import { TreeDeciduous, Zap, GitBranch, ShieldCheck, Activity, Layers, Target, Sigma, BookOpen, Clock, Workflow, Network } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <TreeDeciduous className="inline-block mr-2 mb-1 text-green-600" /> 最小生成树 (Minimum Spanning Tree)

最小生成树问题是**拟阵 (Matroid)** 理论在图论中的直观应用。本章不仅涵盖经典的 Kruskal 与 Prim 算法，更深入探讨连通性的一致性证明、Kruskal 重构树的瓶颈映射，以及有向图下的朱-刘算法。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 核心理论与连通性证明

MST 的正确性建立在两个核心性质之上：**切分定理 (Cut Property)** 和 **回路定理 (Cycle Property)**。

### 1. 切分定理与贪心选择
<KnowledgeCard title="切分定理 (Cut Property) 证明" icon={<ShieldCheck size={20} />}>
**定理**：对于图 $G$ 的任意切分 $(S, V \setminus S)$，割集中权值最小的边 $e = (u, v)$ 必属于某棵 MST。
**证明 (替换法)**：
假设存在一棵 MST $T$ 不包含 $e$。
1. 由于 $T$ 是生成树，必存在一条路径 $p$ 连通 $u, v$。该路径必跨越割集 $(S, V \setminus S)$，设其跨越边为 $e'$。
2. 构造 $T' = T \setminus \{e'\} \cup \{e\}$。
3. 由于 $w(e) \le w(e')$，故 $w(T') \le w(T)$。
4. 因为 $T$ 已是 MST，$w(T')$ 必等于 $w(T)$。
5. 因此 $T'$ 也是一棵包含 $e$ 的 MST。
</KnowledgeCard>

### 2. 连通性一致性校验 (Connectivity Invariant)
在 Kruskal 算法中，我们通过并查集 (DSU) 维护连通性。
- **不变性**：在任意时刻，已选边集构成的每个连通分量本身都是其所含顶点集的 MST。
- **最终状态**：当选择了 $|V|-1$ 条边且无环时，由树的性质知图必连通。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 进阶结构：Kruskal 重构树

Kruskal 重构树 (ExKruskal Tree) 是处理**瓶颈路径问题**的利器。

### 1. 构造过程
在执行 Kruskal 时，若要合并两个集合 $u, v$：
1. 新建一个节点 $X$，点权 $val[X] = w(u, v)$。
2. 将 $u, v$ 所在集合的根节点分别作为 $X$ 的左右儿子。
3. $X$ 成为新集合的根。

### 2. 性质推导
- **堆性质**：重构树是一个大根堆（对于最小生成树）。
- **瓶颈映射**：原图中 $u, v$ 之间所有路径中最大边权的最小值，等于重构树上 $LCA(u, v)$ 的点权。
- **可达性范围**：从 $u$ 出发只经过权值 $\le K$ 的边能到达的点集，是重构树中 $u$ 的某个祖先 $P$ ($val[P] \le K$ 且 $val[parent(P)] > K$) 的子树中的所有叶子节点。

---

## 三、 <Network className="inline-block mr-2 mb-1 text-indigo-500" /> 有向最小生成树：朱-刘算法

### 1. 核心思想：环路缩减 (Cycle Contraction)
有向 MST（树形图）不能直接用贪心，因为入边选择受根节点制约。
- **收敛分析**：每次缩环都会减少至少一个节点，最多执行 $N$ 次，总复杂度 $O(NM)$。

---

## 四、 工业级 C++ 实现 (Kruskal 重构树)

```cpp
/**
 * @brief Kruskal 重构树构造
 * val[node] 存储边权，1~n 为叶子，n+1~2n-1 为辅助点
 */
void build_ex_kruskal() {
    sort(edges.begin(), edges.end());
    int cur_idx = n; // 新节点索引
    for (auto& e : edges) {
        int fu = find(e.u), fv = find(e.v);
        if (fu != fv) {
            cur_idx++;
            val[cur_idx] = e.w;
            fa[fu] = fa[fv] = cur_idx;
            adj[cur_idx].push_back(fu);
            adj[cur_idx].push_back(fv);
            if (--components == 1) break;
        }
    }
}
```

---

## 五、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：次小生成树 (Second Best MST)
求权值之和严格大于 MST 且最小的生成树。

<details>
<summary>Check Solution</summary>

**解析**：
1. 首先求出 MST。
2. 遍历所有非树边 $(u, v, w)$。
3. 替换 MST 中 $u \to v$ 路径上的最大边 $w_{max}$。
4. 若 $w > w_{max}$，则 $w(T) - w_{max} + w$ 是一个候选值。
5. 若 $w = w_{max}$，则需替换路径上的**严格次大边**。

</details>

### 练习 2：瓶颈生成树
求一棵生成树，使其最大边权最小。

<details>
<summary>Check Solution</summary>

**解析**：
**定理**：任何一棵最小生成树都是瓶颈生成树。反之不一定成立。
直接运行 Kruskal 算法，最后一笔加入的边权即为最小瓶颈。

</details>

### 练习 3：生成树计数 (Matrix Tree Theorem)
给定无向图，求生成树的总数。

<details>
<summary>Check Solution</summary>

**解析**：
1. **Kirchhoff 矩阵** $L = D - A$。
   - $D$：度数矩阵（对角线为点度数）。
   - $A$：邻接矩阵。
2. **定理**：$L$ 的任意一个 $n-1$ 阶主余子式的行列式值即为生成树数量。
3. **计算**：高斯消元求行列式，复杂度 $O(n^3)$。

</details>

### 练习 4：边带限制的 MST - 最小度限制生成树
求一棵生成树，使得根节点 $s$ 的度数恰好为 $k$，且总权值最小。

<details>
<summary>Check Solution</summary>

**解析**：
1. 去掉 $s$ 后，图分为若干连通块。每个连通块至少连一条边到 $s$ 以保证连通。
2. 假设连通块数为 $m$。若 $m > k$，无解。
3. 先构造 $m$ 度限制 MST。
4. 逐步增加度数至 $k$：每次找一条边 $(s, v)$ 替换掉形成的环中的非 $s$ 关联最大边，使得权值增量最小。

</details>
