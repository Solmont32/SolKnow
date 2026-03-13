---
title: 平衡树 (Balanced Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, Move, RotateCcw, Shuffle, Layers, Scissors, Repeat, TrendingUp, MemoryStick, Box, ShieldCheck } from 'lucide-react';

# 平衡树 (Balanced Tree): 动态维护有序集

<KnowledgeCard type="info" title="结构抽象：增强型 BST">
平衡二叉搜索树（BBST）在满足二叉搜索树性质的同时，通过特定的拓扑调整机制维护树的高度。
- **BST 性质**: $\forall u, v \in ls(u) \implies val(v) < val(u); v \in rs(u) \implies val(v) > val(u)$。
- **增强 (Augmentation)**: 每个节点维护子树信息 $\mathcal{F}(u) = \mathcal{G}(val(u), \mathcal{F}(ls), \mathcal{F}(rs))$。
</KnowledgeCard>

---

## 1. 拓扑一致性验证 (Topological Consistency)

平衡树的核心在于**旋转 (Rotation)**。旋转必须保持 BST 性质：
- **右旋 (Rotate Right)**: $u$ 是 $v$ 的左子，$v$ 变 $u$ 的右子，$u$ 原右子变 $v$ 的左子。
- **性质验证**: 
  - 旋转前: $ls(u) < u < rs(u) < v < rs(v)$
  - 旋转后: $ls(u) < u < (rs(u) < v < rs(v))$
  - BST 全序关系保持不变。

---

## 2. 伸展树 (Splay): 势能分析与自适应

### 2.1 双旋策略 (Zig-Zig) 的性质证明

**定理 (Zig-Zig 优越性)**：先旋转父节点 $p$ 再旋转当前节点 $u$，路径上所有节点的深度减半。
**证明要点**：
设 $w(u)$ 为子树大小。双旋后，除了 $u$ 以外的所有节点在势能函数 $\Phi = \sum \log w(i)$ 中的增量均为负值。这导致了路径的“折叠”效应。

### 2.2 均摊复杂度证明：势能分析法 (Access Lemma)

**定理**：Splay 操作的均摊复杂度为 $O(\log N)$。
**证明概要**：
定义节点的秩 $r(u) = \log_2(size(u))$，系统势能 $\Phi = \sum_{i=1}^n r(i)$。
1. **Zig (单旋)**: $A \le 1 + 3(r'(u) - r(u))$。
2. **Zig-Zig/Zag-Zag**: $A \le 3(r'(u) - r(u))$。
单次伸展的总均摊代价为 $\sum A \le 3(r(root) - r(u)) + 1 = O(\log N)$。

---

## 3. 复杂度分析与空间分配证明

### 3.1 空间分配证明 (Systematic Space Allocation)

**定理**：标准平衡树（Splay, Treap, AVL）的空间复杂度为 $\Theta(N)$。
**证明**：
1. 每个元素对应一个独立的节点。
2. 每个节点存储常数个信息：$val, ls, rs, p, sz, prio$。
3. 空间 $S(N) = \sum_{i=1}^N \text{sizeof}(Node) = O(N)$。
**注意**：在可持久化 Treap 中，单次操作由于路径复制产生 $O(\log N)$ 个新节点，总空间为 $O(N + M \log N)$。

---

## 4. FHQ-Treap: 随机化平衡的一致性

### 4.1 期望高度收敛分析

**命题**：随机权值 Treap 的期望高度为 $O(\log N)$。
**证明**：节点 $i$ 是 $j$ 的祖先的概率 $P(i \to j) = \frac{1}{|rank(i) - rank(j)| + 1}$。期望深度 $E[D_j] = \sum_{i=1}^n P(i \to j) \approx 2 \ln N$。

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
```

</details>

### 例题 2：动态图连通性 (LCT 基础)

<details>
<summary>Check Solution</summary>

**核心逻辑**：LCT (Link-Cut Tree) 维护的是一组虚实链。通过 `access(x)` 操作将根到 $x$ 的路径变为实链，并用 Splay 维护该实链。

</details>

---

## 6. 综合练习与解答

1. **[最大异或路径]** 在树上支持动态加边、删边，查询两点间路径异或最大值。
<details>
<summary>Check Solution</summary>

**LCT + 线性基**：LCT 维护路径，Splay 节点维护其子树内所有权值的线性基（Linear Basis）。

</details>

2. **[进阶] 替罪羊树 (Scapegoat Tree) 的重构一致性**
<details>
<summary>Check Solution</summary>

**重构判定**：$\max(sz[ls], sz[rs]) > \alpha \cdot sz[u]$。当触发重构时，将子树中序遍历存入数组，再通过二分法重新构建完全平衡的二叉树。

</details>

---

_编者注：平衡树的演进代表了从“绝对高度平衡”到“统计平衡”与“自适应平衡”的思想跃迁。理解不同平衡机制背后的数学支撑，是架构高性能复杂结构的前提。_
