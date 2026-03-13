---
title: 并查集 (Disjoint Set Union)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitMerge, Users, Zap, ShieldCheck, Sigma, Network, Database, Boxes } from 'lucide-react';

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

## 2. 复杂度分析与空间分配证明

### 2.1 空间分配证明 (Systematic Space Allocation)

**定理**：标准并查集的空间复杂度为 $\Theta(N)$。
**证明**：
并查集维护两个主要数组：父节点数组 $p[]$ 和秩数组 $rank[]$（或 $size[]$）。
1. 每个节点在全集 $U = \{1, \dots, N\}$ 中仅出现一次。
2. 每一个节点 $i \in U$ 对应且仅对应数组 $p$ 和 $rank$ 中的一个索引。
3. 因此，总空间 $S(N) = \text{sizeof}(int) \times 2N + \text{const}$，即 $O(N)$。
**推论**：对于可撤销并查集，由于不使用路径压缩而改用栈记录操作，空间复杂度为 $O(N + M)$，其中 $M$ 为操作次数。

### 2.2 时空复杂度摊还证明

**定理**：同时使用路径压缩和按秩合并，单次操作的均摊时间复杂度为 $O(\alpha(N))$。

**势能分析 (Potential Method) 概要**：
定义节点的秩 $x.rank$。定义势能函数 $\Phi = \sum_{x \in U} \phi(x)$。
1. **Union 操作**：增加一个节点的秩最多导致 $\alpha(N)$ 的势能变化。
2. **Find 操作**：路径压缩将节点直接指向根，跨越了多个秩层级，导致大量的 $\phi(x)$ 减小。这种势能的释放足以支付 $O(\text{路径长度})$ 的实际代价，使得均摊代价仅为 $O(\alpha(N))$。
*注：反阿克曼函数 $\alpha(N)$ 增长极慢，对于宇宙中可观测到的 $N$，其值均不超过 5。*

---

## 3. 拓扑一致性验证 (Topological Consistency)

在维护带权并查集或动态连通性时，必须保证：
- **路径压缩的一致性**：$d(x, root) = d(x, p(x)) \oplus d(p(x), root)$。在递归 `find` 返回时，先更新父节点的权值，再更新当前节点的权值。
- **合并的对称性**：`unite(x, y)` 与 `unite(y, x)` 在逻辑上等价，但在物理实现中（按秩合并）应保证合并方向不影响等价类的连通性拓扑。

---

## 4. 教材化例题与解析

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

### 例题 2：动态加边连通性 (Kruskal 重构树基础)

<details>
<summary>Check Solution</summary>

**题目描述**：给定 $N$ 个点和 $M$ 条边 $(u, v, w)$，查询两点何时连通。
**解析**：按权值排序后依次合并。新建节点 $node_{M+i}$ 作为 $find(u)$ 和 $find(v)$ 的父节点，权值为 $w$。

```cpp
int newNode(int w) {
    val[++tot] = w;
    return tot;
}
// 在 unite 中
int u = find(x), v = find(y);
if (u != v) {
    int root = newNode(w);
    fa[u] = fa[v] = root;
    ch[root][0] = u; ch[root][1] = v;
}
```

</details>

---

## 5. 综合练习与解答

1. **[连通块维护]** 维护每个连通块的最小、最大元素及成员总数。
<details>
<summary>Check Solution</summary>

```cpp
struct Node { int p, sz, mi, ma; };
void unite(int x, int y) {
    int rx = find(x), ry = find(y);
    if (rx != ry) {
        if (sz[rx] < sz[ry]) swap(rx, ry); // 按大小合并优化
        p[ry] = rx;
        sz[rx] += sz[ry];
        mi[rx] = min(mi[rx], mi[ry]);
        ma[rx] = max(ma[rx], ma[ry]);
    }
}
```

</details>

2. **[进阶] 可撤销并查集 (Undoable DSU)**
<details>
<summary>Check Solution</summary>

**核心逻辑**：**禁止路径压缩**（因为它会改变树的拓扑结构且难以撤销），仅用**按秩合并**（保证树高 $O(\log N)$）。使用栈记录每次修改。

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
    if (st.empty()) return;
    auto t = st.top(); st.pop();
    p[t.v] = t.v;
    rank[t.u] -= t.add_rank;
}
```

</details>

---

_编者注：并查集的复杂性隐藏在其极简的 API 之下。它是维护等价类关系的终极方案，而其与反阿克曼函数的深刻联系，更是计算复杂性理论中最为迷人的篇章之一。_
