---
title: 平衡树 (Balanced Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, Move, RotateCcw, Shuffle, Layers, Scissors, Repeat, TrendingUp, MemoryStick, Box } from 'lucide-react';

# 平衡树 (Balanced Tree): 动态维护有序集

<KnowledgeCard type="info" title="结构抽象：增强型 BST">
平衡二叉搜索树（BBST）在满足二叉搜索树性质的同时，通过特定的拓扑调整机制维护树的高度。
- **BST 性质**: $\forall u, v \in ls(u) \implies val(v) < val(u); v \in rs(u) \implies val(v) > val(u)$。
- **增强 (Augmentation)**: 每个节点维护子树信息 $\mathcal{F}(u) = \mathcal{G}(val(u), \mathcal{F}(ls), \mathcal{F}(rs))$，使得所有区间操作可映射为对特定子树的 $O(1)$ 合并。
</KnowledgeCard>

---

## 1. 伸展树 (Splay): 势能分析与自适应

Splay 的核心在于通过伸展操作（Splaying）将目标节点提升至根节点，同时显著压缩路径上的树高。

### 1.1 双旋策略 (Zig-Zig) 的性质证明

**定理 (Zig-Zig 优越性)**：在连续三点成链时（祖父 $g$, 父 $p$, 子 $u$ 同向），若先旋转 $u$（单旋两次），树高几乎不变；若先旋转 $p$ 再旋转 $u$，路径上所有节点的深度减半。

**证明要点**：
设 $w(u)$ 为子树大小。单旋两次后，路径上某些节点的子树大小依然接近原图。而双旋后，除了 $u$ 以外的所有节点在势能函数 $\Phi = \sum \log w(i)$ 中的增量均为负值。这直接导致了路径的“折叠”效应，使得树形态向平衡态收敛。

### 1.2 均摊复杂度证明：势能分析法 (Access Lemma)

**定理**：Splay 操作的均摊复杂度为 $O(\log N)$。
**证明**：
定义节点的秩 $r(u) = \log_2(size(u))$，系统势能 $\Phi = \sum_{i=1}^n r(i)$。
1. **Zig (单旋)**: 均摊代价 $A \le 1 + 3(r'(u) - r(u))$。
2. **Zig-Zig (同向双旋)**: 均摊代价 $A \le 3(r'(u) - r(u))$。
3. **Zig-Zag (异向双旋)**: 均摊代价 $A \le 3(r'(u) - r(u))$。
对于 $m$ 次操作，总代价为 $\sum A + \Phi_{start} - \Phi_{end}$。由于 $r(root) = \log_2 N$，单次伸展总均摊代价为 $O(\log N)$。
**推论 (Static Optimality)**：Splay 在处理具有高度局部性的访问序列时，其表现优于任何静态平衡树（如 AVL）。

---

## 2. FHQ-Treap: 随机化平衡的一致性

FHQ-Treap 将随机权值（Priority）与二叉搜索树（Key）结合，通过满足堆性质来保证平衡。

### 2.1 期望高度收敛分析

**命题**：随机权值 Treap 的期望高度为 $O(\log N)$。
**证明**：
考虑节点 $i$ 是 $j$ 的祖先。在 $Key$ 处于 $[rank(i), rank(j)]$ 之间的所有节点中，$i$ 必须是第一个被插入（或具有最大随机权值）的。
该概率为 $P(i \to j) = \frac{1}{|rank(i) - rank(j)| + 1}$。
期望深度 $E[D_j] = \sum_{i=1}^n P(i \to j) \approx \sum_{k=1}^j \frac{1}{k} + \sum_{k=1}^{n-j} \frac{1}{k} \approx \ln j + \ln(n-j) = O(\log N)$。
**方差分析**：可以证明其高度的方差极小，发生退化为 $O(N)$ 的概率是指数级衰减的。

---

## 3. 多维操作逻辑验证：K-D Tree

平衡树的思想可推广至多维空间。**K-D Tree (K-Dimensional Tree)** 是典型的多维平衡树。

### 3.1 划分逻辑与复杂性

- **划分策略**: 在每一层交替使用不同维度的中位数进行切分。
- **查询性质**: 
  - $K$ 维空间中的矩形范围查询复杂度为 $O(N^{1-1/K})$。
  - 对于 2D 空间，复杂度为 $O(\sqrt{N})$。
- **平衡维护**: 由于 K-D Tree 难以进行旋转，通常采用 **替罪羊树 (Scapegoat Tree)** 的思想：当子树不平衡（$\max(sz[ls], sz[rs]) > \alpha \cdot sz[u]$）时，直接拍扁重构。

---

## 4. 工业级优化：空间局部性与内存池

### 4.1 内存池 (Node Pooling)

```cpp
int pool[N], top;
int new_node(int v) {
    int u = top ? pool[top--] : ++idx;
    tr[u].val = v; tr[u].prio = rand();
    tr[u].ls = tr[u].rs = 0; tr[u].sz = 1;
    return u;
}
void del_node(int u) { pool[++top] = u; }
```

---

## 5. 教材化例题与解析

### 例题 1：区间翻转 (文艺平衡树)

<details>
<summary>Check Solution (Splay 实现)</summary>

```cpp
void push_down(int x) {
    if (tr[x].rev) {
        swap(tr[x].s[0], tr[x].s[1]);
        if (tr[x].s[0]) tr[tr[x].s[0]].rev ^= 1;
        if (tr[x].s[1]) tr[tr[x].s[1]].rev ^= 1;
        tr[x].rev = 0;
    }
}
void rotate(int x) {
    int y = tr[x].p, z = tr[y].p;
    int k = (tr[y].s[1] == x);
    tr[z].s[tr[z].s[1] == y] = x; tr[x].p = z;
    tr[y].s[k] = tr[x].s[k ^ 1]; tr[tr[x].s[k ^ 1]].p = y;
    tr[x].s[k ^ 1] = y; tr[y].p = x;
    push_up(y); push_up(x);
}
void splay(int x, int k) {
    while (tr[x].p != k) {
        int y = tr[x].p, z = tr[y].p;
        if (z != k)
            (tr[y].s[1] == x) ^ (tr[z].s[1] == y) ? rotate(x) : rotate(y);
        rotate(x);
    }
    if (!k) root = x;
}
```

</details>

### 例题 2：权重平衡树 (WBT) 与区间 K 大

<details>
<summary>Check Solution (WBT / Size Balanced Tree 思想)</summary>

**核心逻辑**：通过维持 $sz[ls] \ge \delta \cdot sz[rs]$ 这一比例来保证平衡，而非随机化或势能。常用于高性能场景。

</details>

---

## 6. 综合练习与解答

1. **[普通平衡树]** 实现插入、删除、查询排名、查询前驱后继。
<details>
<summary>Check Solution (FHQ-Treap)</summary>

```cpp
void split(int u, int v, int &l, int &r) {
    if (!u) { l = r = 0; return; }
    if (tr[u].val <= v) { l = u; split(tr[u].rs, v, tr[u].rs, r); }
    else { r = u; split(tr[u].ls, v, l, tr[u].ls); }
    push_up(u);
}
int merge(int l, int r) {
    if (!l || !r) return l | r;
    if (tr[l].prio > tr[r].prio) {
        tr[l].rs = merge(tr[l].rs, r); push_up(l); return l;
    } else {
        tr[r].ls = merge(l, tr[r].ls); push_up(r); return r;
    }
}
```

</details>

2. **[K-D Tree 邻近搜索]** 给定 $N$ 个点，查询与目标点 $(x, y)$ 距离最近的点。
<details>
<summary>Check Solution</summary>

**核心策略**：维护当前最短距离 $D_{min}$。在搜索子树前，计算目标点到该子树边界矩形（Bounding Box）的最短距离，若该距离 $\ge D_{min}$ 则剪枝。

</details>

3. **[进阶] 可持久化 Splay?**
<details>
<summary>Check Solution</summary>

**结论**：Splay 难以高效持久化。因为 Splay 操作会修改访问路径上的所有节点（即使是查询），这会导致单次操作产生 $O(\log N)$ 的路径复制，且其势能分析在持久化场景下失效。建议使用 **FHQ-Treap** 进行可持久化。

</details>

---

_编者注：平衡树的演进代表了从“绝对高度平衡”到“统计平衡”与“自适应平衡”的思想跃迁。理解不同平衡机制背后的数学支撑，是架构高性能复杂结构的前提。_
