---
title: 平衡树 (Balanced Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, Move, RotateCcw, Shuffle, Layers, Scissors, Repeat } from 'lucide-react';

# 平衡树 (Balanced Tree): 动态维护有序集

<KnowledgeCard type="info" title="结构抽象：增强型 BST">
平衡二叉搜索树（BBST）在满足二叉搜索树性质的同时，通过特定的拓扑调整机制维护树的高度。
- **BST 性质**: $v(left) < v(root) < v(right)$。
- **增强 (Augmentation)**: 每个节点维护子树信息（如 $size, sum, \max$），使得所有区间操作均可降维为对特定子树的操作。
</KnowledgeCard>

---

## 1. 伸展树 (Splay): 势能分析与自适应

Splay 的核心在于通过伸展操作将目标节点提升至根节点。

### 1.1 双旋操作的必要性
在连续三点成链时，传统的 Zig-Zig 操作若仅进行单旋，无法有效压缩树高。
- **定理**: 采用特殊的双旋（Zig-Zig/Zig-Zag）策略，Splay 操作的均摊复杂度为 $O(\log N)$。
- **证明 (势能法)**: 定义 $\Phi = \sum \log(size(i))$。通过计算一次双旋前后的势能变化，可以抵消单次旋转的高额代价，最终分摊到 $O(\log N)$。

### 1.2 区间维护的艺术
通过 `splay(L-1, 0)` 和 `splay(R+1, root)`，区间 $[L, R]$ 对应的子树会被完整隔离在 `ch[ch[root][1]][0]` 中。

---

## 2. FHQ-Treap: 随机化与非旋转

Treap 将 Binary Search Tree (BST) 与 Heap 结合。

### 2.1 概率平衡性
每个节点分配一个随机权值 $priority$。
- **定理**: 随机插入 $N$ 个节点构成的 Treap，其平均深度为 $O(\log N)$。
- **证明**: 节点 $i$ 是 $j$ 的祖先的概率为 $\frac{1}{|v_i - v_j| + 1}$。通过求和公式 $\sum \frac{1}{i}$，可得深度为 $H_n \approx \ln N$。

### 2.2 Split & Merge 的高度抽象
所有平衡维护均通过这两个原语实现，无需任何旋转，且天然支持**可持久化**。

---

## 3. 教材化例题与解析

### 例题 1：区间翻转 (文艺平衡树)
<details>
<summary>Check Solution (Splay)</summary>

**题目描述**：支持区间翻转。
**解析**：在节点上打翻转标记 $rev$，每次访问子节点前 `push_down`。

```cpp
void push_down(int x) {
    if (tr[x].rev) {
        swap(tr[x].s[0], tr[x].s[1]);
        tr[tr[x].s[0]].rev ^= 1;
        tr[tr[x].s[1]].rev ^= 1;
        tr[x].rev = 0;
    }
}
```
</details>

### 例题 2：序列编辑器 (NOI 维修数列)
<details>
<summary>Check Solution</summary>

**题目描述**：支持插入、删除、修改、翻转、求和、最大子段和。
**解析**：综合性最强的平衡树题目。需要维护 `lmax, rmax, tmax` 标记以及区间赋值标记。由于涉及大量删除，建议结合**节点回收池**。

```cpp
int nodes[N], top; // 回收池
int new_node() { return top ? nodes[top--] : ++idx; }
void del_node(int u) { if(u) nodes[++top] = u, del_node(ls[u]), del_node(rs[u]); }
```
</details>

---

## 4. 综合练习

1. **[基础]** 使用 FHQ-Treap 实现普通平衡树的 6 大操作。
2. **[区间]** 在平衡树上维护一个字符串，支持在任意位置插入、删除字符，以及查询子串的哈希值。
3. **[进阶]** **可持久化平衡树**：实现一个支持历史版本回滚的有序集合。

---

_编者注：平衡树是数据结构中的“变形金刚”。从 Splay 的灵活伸展到 FHQ-Treap 的优雅分裂，它们为动态序列的处理提供了近乎无限的可能性。_
