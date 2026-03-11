---
title: 平衡树 (Balanced Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import { GitBranch, Move, RotateCcw, Shuffle, Layers, Scissors, Repeat } from 'lucide-react';

# 平衡树 (Balanced Tree): 动态维护有序集

<KnowledgeCard type="info" title="核心目标">
平衡二叉搜索树（BBST）旨在通过特定的调整机制，确保树的高度始终维持在 $O(\log N)$，从而保证插入、删除和查询操作的效率。
</KnowledgeCard>

---

## 1. 平衡维护策略分类

平衡树的维护逻辑可分为三大流派：

| 策略 | 代表结构 | 核心原理 | 优点 | 缺点 |
| :--- | :--- | :--- | :--- | :--- |
| **旋转式 (Rotation)** | AVL, Red-Black, **Splay** | 利用左旋/右旋改变节点层级 | 严格平衡 (AVL) 或自适应访问 (Splay) | 实现复杂，Splay 常数大 |
| **分裂合并式 (Split-Merge)** | **FHQ-Treap** | 基于随机权值的分裂与合并 | 极易实现，天然支持可持久化 | 依赖随机数，常数稍大 |
| **重构式 (Rebuilding)** | Scapegoat Tree | 局部不平衡时暴力重建子树 | 无需旋转，思想朴素 | 复杂度为均摊 $O(\log N)$ |

---

## 2. Splay (伸展树)

### 2.1 伸展操作与势能分析
Splay 的核心在于 `splay(x, k)`，将节点 $x$ 旋转至 $k$ 的下方。
**定理**：采用 Zig-Zig 和 Zig-Zag 双旋策略，Splay 操作的均摊复杂度为 $O(\log N)$。

```cpp
void rotate(int x) {
    int y = tr[x].p, z = tr[y].p;
    int k = (tr[y].s[1] == x);
    tr[z].s[tr[z].s[1] == y] = x; tr[x].p = z;
    tr[y].s[k] = tr[x].s[k ^ 1]; tr[tr[x].s[k ^ 1]].p = y;
    tr[x].s[k ^ 1] = y; tr[y].p = x;
    push_up(y); push_up(x);
}
```

### 2.2 维护序列：区间操作
Splay 维护序列时，第 $k$ 个元素对应树中中序遍历的第 $k$ 个节点。区间 $[L, R]$ 可通过将 $L-1$ 伸展至根，$R+1$ 伸展至根的右子节点来提取（即根右儿子的左子树）。

---

## 3. FHQ-Treap (无旋 Treap)

### 3.1 概率平衡证明
Treap 给每个节点分配随机权值 $priority$，使其在满足 BST 性质的同时满足大根堆性质。
**证明**：随机插入 $N$ 个节点形成的 Treap，其期望高度为 $O(\log N)$。

### 3.2 核心操作：Split & Merge
```cpp
void split(int u, int val, int &l, int &r) { // 按值分裂
    if (!u) { l = r = 0; return; }
    if (tr[u].v <= val) {
        l = u; split(tr[u].r, val, tr[u].r, r);
    } else {
        r = u; split(tr[u].l, val, l, tr[u].l);
    }
    push_up(u);
}
```

---

## 4. 空间压缩与性能优化

- **节点回收 (Garbage Collection)**：对于频繁删除操作的平衡树，可将废弃节点索引存入栈中，下次申请时重用。
- **动态树 (LCT) 预演**：平衡树是维护动态图连通性的基石。

---

## 5. 经典例题

### 例题 1：普通平衡树 (Top 6 操作)
<details>
<summary>Check Solution (FHQ-Treap)</summary>

**要求**：插入、删除、求 $x$ 的排名、求排名 $k$ 的数、求前驱、求后继。

```cpp
// 核心逻辑演示
void insert(int v) {
    int l, r;
    split(root, v, l, r);
    root = merge(merge(l, new_node(v)), r);
}

void remove(int v) {
    int l, r, p;
    split(root, v, l, r);
    split(l, v - 1, l, p);
    p = merge(tr[p].l, tr[p].r); // 删除一个节点
    root = merge(merge(l, p), r);
}
```
</details>

### 例题 2：区间最大子段和 (动态版)
<details>
<summary>Check Solution</summary>

**题目描述**：在平衡树上维护区间，支持插入、删除、修改，查询区间最大子段和。
**解析**：在每个节点维护 `sum`, `lmax`, `rmax`, `tmax`，类似于线段树的合并逻辑，但在平衡树旋转/分裂时更新。
</details>

---

## 6. 综合练习

1. **[维护序列]** 实现区间翻转与区间加。
2. **[性能优化]** 实现带节点回收池的平衡树。
3. **[进阶]** **文艺平衡树+最大子段和**：NOI 维修数列。

---

## 📺 扩展学习

<div className="bilibili-embed-inner">
  <BilibiliEmbed bvid="BV1pE41197be" />
</div>
