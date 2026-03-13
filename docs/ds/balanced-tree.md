---
title: 平衡树 (Balanced Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, Move, RotateCcw, Shuffle, Layers, Scissors, Repeat, TrendingUp, MemoryStick } from 'lucide-react';

# 平衡树 (Balanced Tree): 动态维护有序集

<KnowledgeCard type="info" title="结构抽象：增强型 BST">
平衡二叉搜索树（BBST）在满足二叉搜索树性质的同时，通过特定的拓扑调整机制维护树的高度。
- **BST 性质**: $\forall u, v \in ls(u) \implies val(v) < val(u); v \in rs(u) \implies val(v) > val(u)$。
- **增强 (Augmentation)**: 每个节点维护子树信息 $\mathcal{F}(u) = \mathcal{G}(val(u), \mathcal{F}(ls), \mathcal{F}(rs))$，使得所有区间操作可映射为对特定子树的 $O(1)$ 合并。
</KnowledgeCard>

---

## 1. 伸展树 (Splay): 势能分析与自适应

Splay 的核心在于通过伸展操作（Splaying）将目标节点提升至根节点，同时显著压缩路径上的树高。

### 1.1 双旋策略 (Zig-Zig) 的优越性

在连续三点成链时，传统的 Zig-Zig 操作若仅进行两次单旋，无法改变路径的线性特征。Splay 规定：若父节点与祖父节点同向，**先旋转父节点，再旋转当前节点**。这一改进使得伸展路径上的所有节点深度减半。

### 1.2 均摊复杂度证明：势能分析法

**定理**：Splay 操作的均摊复杂度为 $O(\log N)$。
**证明**：
定义节点的秩 $r(u) = \log_2(size(u))$，系统势能 $\Phi = \sum_{i=1}^n r(i)$。
1. **Zig (单旋)**: 均摊代价 $A \le 1 + 3(r'(u) - r(u))$。
2. **Zig-Zig (同向双旋)**: 均摊代价 $A \le 3(r'(u) - r(u))$。
3. **Zig-Zag (异向双旋)**: 均摊代价 $A \le 3(r'(u) - r(u))$。
对于 $m$ 次操作，总代价为 $\sum A + \Phi_{start} - \Phi_{end}$。由于 $r(root) = \log_2 N$，单次伸展总均摊代价为 $O(\log N)$。

---

## 2. FHQ-Treap: 随机化平衡的一致性

FHQ-Treap 将随机权值与二叉搜索树结合，其平衡性由概率统计保证。

### 2.1 期望高度收敛证明

**命题**：随机权值 Treap 的期望高度为 $O(\log N)$。
**证明**：
考虑节点 $i$ 是 $j$ 的祖先。在 $val$ 处于 $[rank(i), rank(j)]$ 之间的所有节点中，$i$ 必须是第一个被插入（或具有最大随机权值）的。
该概率为 $P(i \to j) = \frac{1}{|rank(i) - rank(j)| + 1}$。
期望深度 $E[D_j] = \sum_{i=1}^n P(i \to j) \approx \int_1^j \frac{1}{x} dx + \int_1^{n-j} \frac{1}{x} dx = O(\log N)$。

---

## 3. 工业级优化：空间局部性与内存池

### 3.1 内存池 (Node Pooling)

频繁的 `new` 和 `delete` 会导致严重的堆内存碎片和系统调用开销。
**优化方案**：预分配大数组作为空闲链表（Freelists）。

```cpp
int pool[N], top;
int new_node(int v) {
    int u = top ? pool[top--] : ++idx;
    tr[u].val = v; tr[u].prio = rand();
    return u;
}
void del_node(int u) { pool[++top] = u; }
```

### 3.2 Cache-Oblivious 思想

虽然 BBST 默认是动态指针结构，但在静态或半静态场景下，通过 **B-Tree** 或 **Van Emde Boas 树** 布局可以显著减少 Cache Miss，利用空间局部性加速访问。

---

## 4. 教材化例题与解析

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
```

</details>

### 例题 2：动态排名与前驱后继

<details>
<summary>Check Solution (FHQ-Treap 实现)</summary>

```cpp
void split(int u, int v, int &l, int &r) {
    if (!u) { l = r = 0; return; }
    push_down(u); // 若带区间标记
    if (tr[u].val <= v) {
        l = u; split(tr[u].rs, v, tr[u].rs, r);
    } else {
        r = u; split(tr[u].ls, v, l, tr[u].ls);
    }
    push_up(u);
}
```

</details>

---

## 5. 综合练习与解答

1. **[普通平衡树]** 使用 FHQ-Treap 实现插入、删除、查询排名。
<details>
<summary>Check Solution</summary>

```cpp
void insert(int v) {
    int l, r; split(root, v, l, r);
    root = merge(merge(l, new_node(v)), r);
}
void remove(int v) {
    int l, m, r;
    split(root, v, l, r);
    split(l, v - 1, l, m);
    m = merge(tr[m].ls, tr[m].rs);
    root = merge(merge(l, m), r);
}
```

</details>

2. **[区间哈希]** 在平衡树上维护字符串，支持动态插入与哈希校验。
<details>
<summary>Check Solution</summary>

**核心逻辑**：子树哈希合并 $H(u) = (H(ls) \cdot P^{sz(rs)+1} + val(u) \cdot P^{sz(rs)} + H(rs)) \pmod M$。

</details>

3. **[进阶] LCT (Link-Cut Tree)**：动态维护森林的连通性与路径信息。
<details>
<summary>Check Solution</summary>

**核心思想**：由 Splay 维护的辅助树与实链剖分。通过 `access` 操作将根到 $u$ 的路径变为实链。

</details>

---

_编者注：平衡树的演进代表了从“绝对高度平衡”到“统计平衡”与“自适应平衡”的思想跃迁。FHQ-Treap 以其函数式的优雅，成为了现代可持久化结构的首选。_
