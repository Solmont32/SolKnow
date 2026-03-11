---
title: 并查集 (Disjoint Set Union)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitMerge, Users, Zap, ShieldCheck, Sigma, Network } from 'lucide-react';

# 并查集 (DSU): 集合关系的维护艺术

<KnowledgeCard type="info" title="数学定义：等价关系">
并查集（Disjoint Set Union, DSU）是一种维护**等价关系 (Equivalence Relation)** 的高效数据结构。对于集合 $S$ 上的二元关系 $\sim$，它支持：
1. **Reflexivity (自反性)**: $a \sim a$
2. **Symmetry (对称性)**: $a \sim b \iff b \sim a$
3. **Transitivity (传递性)**: $a \sim b \land b \sim c \implies a \sim c$
并查集通过维护**连通分量 (Connected Components)** 来动态判定两个元素是否属于同一个等价类。
</KnowledgeCard>

---

## 1. 系统化抽象数据类型 (ADT) 推导

并查集维护了一个集合序列的划分 $P = \{S_1, S_2, \dots, S_k\}$。设 $U = \{1, 2, \dots, n\}$ 为全集。

### 1.1 基本操作定义
- **Find(x)**: 返回包含 $x$ 的唯一集合代表元 $\text{rep}(S_i)$。
- **Union(x, y)**: 若 $\text{rep}(S_i) \neq \text{rep}(S_j)$，则 $P \leftarrow (P \setminus \{S_i, S_j\}) \cup \{S_i \cup S_j\}$。

### 1.2 数据完整性证明
**命题**：并查集森林结构始终是一组互不相交的树，且根节点是该集合的唯一代表。
**证明**：
1. **初始状态**：每个节点自成一根，满足条件。
2. **归纳步**：`Union(x, y)` 仅在 $x, y$ 的根节点 $r_x, r_y$ 不同时，将 $p[r_y] = r_x$。此操作仅合并两棵树且未引入环，故森林性质保持。

---

## 2. 时空复杂度摊还证明

### 2.1 路径压缩与按秩合并
**定理**：同时使用路径压缩和按秩（Rank/Size）合并，单次操作的均摊时间复杂度为 $O(\alpha(N))$，其中 $\alpha$ 是反阿克曼函数。

### 2.2 势能分析概要 (Tarjan 证明思路)
定义节点的秩 $rank(x)$ 为以 $x$ 为根时树的最大高度上界。
定义势能函数 $\Phi(x)$ 取决于 $rank(x)$ 与其父节点秩之差。
1. **路径压缩**：每次 `find(x)` 会改变路径上所有节点的父节点，导致势能显著释放，补偿了遍历路径的代价。
2. **收敛性**：由于秩的变化受限于 $\log N$ 或更小的层级划分，通过阿克曼函数的迭代定义，可以证明总代价被 $\alpha(N)$ 严格约束。

---

## 3. 教材化例题与解析

### 例题 1：食物链 (综合逻辑关系)
<details>
<summary>Check Solution (扩展域做法)</summary>

**题目描述**：有 A, B, C 三类动物，A 吃 B，B 吃 C，C 吃 A。给定描述，判断假话。
**核心逻辑**：利用扩展域（Domain Expansion）维护逻辑冲突。

```cpp
// 域定义：x (自身), x+n (被x吃的), x+2n (吃x的)
if (t == 1) { // x, y 是同类
    if (dsu.same(x, y + n) || dsu.same(x, y + 2 * n)) ans++; // 冲突
    else dsu.unite(x, y), dsu.unite(x + n, y + n), dsu.unite(x + 2 * n, y + 2 * n);
} else { // x 吃 y
    if (dsu.same(x, y) || dsu.same(x, y + 2 * n)) ans++; // 冲突
    else dsu.unite(x, y + n), dsu.unite(x + n, y + 2 * n), dsu.unite(x + 2 * n, y);
}
```
</details>

### 例题 2：动态加边连通性
<details>
<summary>Check Solution</summary>

**题目描述**：给定 $N$ 个点和 $M$ 条边 $(u, v, w)$，查询两点何时连通。
**解析**：Kruskal 重构树基础。按权值排序后依次合并。

```cpp
for (auto& edge : edges) {
    if (dsu.find(edge.u) != dsu.find(edge.v)) {
        dsu.unite(edge.u, edge.v);
        // 记录此时的 w 为连通临界值
    }
}
```
</details>

---

## 4. 综合练习与解答

1. **[连通块维护]** 维护每个连通块的最小、最大元素及成员总数。
<details>
<summary>Check Solution</summary>

```cpp
struct Node { int p, sz, mi, ma; };
void unite(int x, int y) {
    int rx = find(x), ry = find(y);
    if (rx != ry) {
        p[ry] = rx;
        sz[rx] += sz[ry];
        mi[rx] = min(mi[rx], mi[ry]);
        ma[rx] = max(ma[rx], ma[ry]);
    }
}
```
</details>

2. **[带权并查集]** 维护节点到根的距离 $d[x]$。
<details>
<summary>Check Solution</summary>

```cpp
int find(int x) {
    if (p[x] == x) return x;
    int root = find(p[x]);
    d[x] += d[p[x]]; // 路径压缩时更新权值
    p[x] = root;
    return root;
}
```
</details>

3. **[进阶] 可撤销并查集 (Undoable DSU)**
<details>
<summary>Check Solution</summary>

**核心逻辑**：不使用路径压缩，仅用按秩合并。使用栈记录每次 `unite` 修改的 `p` 和 `sz` 状态。
```cpp
struct Operation { int u, v, add_rank; };
stack<Operation> st;

void unite(int u, int v) {
    u = find(u), v = find(v);
    if (u == v) return;
    if (rank[u] < rank[v]) swap(u, v);
    st.push({u, v, rank[u] == rank[v]});
    p[v] = u;
    rank[u] += (rank[u] == rank[v]);
}

void undo() {
    auto t = st.top(); st.pop();
    p[t.v] = t.v;
    rank[t.u] -= t.add_rank;
}
```
</details>

---

_编者注：并查集的复杂性隐藏在其极简的 API 之下。它是维护等价类关系的终极方案，而其与反阿克曼函数的深刻联系，更是计算复杂性理论中最为迷人的篇章之一。_
