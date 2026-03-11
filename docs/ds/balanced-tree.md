---
title: 平衡树 (Balanced Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, Move, RotateCcw, Shuffle, Layers, Scissors, Repeat, TrendingUp } from 'lucide-react';

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
在连续三点成链时，传统的 Zig-Zig 操作若仅进行两次单旋，无法改变路径的线性特征。Splay 规定：若父节点与祖父节点同向，**先旋转父节点，再旋转当前节点**。

### 1.2 均摊复杂度证明：势能分析法
**定理**：Splay 操作的均摊复杂度为 $O(\log N)$。
**证明概要**：
定义节点的秩 $r(u) = \log(size(u))$，系统的势能 $\Phi = \sum r(u)$。
1. 一次 Zig 操作的均摊代价为 $1 + 3(r'(u) - r(u))$。
2. 一次 Zig-Zig 操作的均摊代价 $\le 3(r'(u) - r(u))$。
通过对伸展路径上的所有步进行累加，利用伸缩求和，可得总均摊代价为 $O(r(root) - r(u)) = O(\log N)$。

---

## 2. FHQ-Treap: 随机化与非旋转

Treap 将 Binary Search Tree (BST) 的有序性与 Heap 的随机性结合，FHQ-Treap 进一步将其抽象为 `Split` 与 `Merge` 两个原语。

### 2.1 概率平衡性证明
每个节点分配一个独立同分布的随机权值 $prio(u)$。
**定理**：随机权值 Treap 的期望高度为 $O(\log N)$。
**证明**：
节点 $i$ 是 $j$ 的祖先，当且仅当在 $val$ 处于 $[v_i, v_j]$（或 $[v_j, v_i]$）之间的所有节点中，$i$ 的 $prio$ 最大。
该概率为 $P(i \to j) = \frac{1}{|rank(i) - rank(j)| + 1}$。
节点 $j$ 的期望深度 $E[D_j] = \sum_{i=1}^n P(i \to j) = \sum_{i=1}^j \frac{1}{j-i+1} + \sum_{i=j+1}^n \frac{1}{i-j+1} \approx H_j + H_{n-j+1} = O(\log N)$。

---

## 3. 教材化例题与解析

### 例题 1：区间翻转 (文艺平衡树)
<details>
<summary>Check Solution (Splay 实现)</summary>

**题目描述**：支持区间翻转。
**数据完整性**：翻转算子满足 $f \circ f = id$，且满足对左右子树的分配律。

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
    if (tr[u].val <= v) {
        l = u;
        split(tr[u].rs, v, tr[u].rs, r);
    } else {
        r = u;
        split(tr[u].ls, v, l, tr[u].ls);
    }
    push_up(u);
}

int merge(int l, int r) {
    if (!l || !r) return l | r;
    if (tr[l].prio > tr[r].prio) {
        tr[l].rs = merge(tr[l].rs, r);
        push_up(l); return l;
    } else {
        tr[r].ls = merge(l, tr[r].ls);
        push_up(r); return r;
    }
}
```
</details>

---

## 4. 综合练习与解答

1. **[普通平衡树]** 使用 FHQ-Treap 实现插入、删除、查询排名、查询数值、前驱、后继。
<details>
<summary>Check Solution</summary>

```cpp
// 插入 val
split(root, val, l, r);
root = merge(merge(l, new_node(val)), r);

// 删除一个 val
split(root, val, l, r);
split(l, val - 1, l, m);
m = merge(tr[m].ls, tr[m].rs); // 只删掉根节点
root = merge(merge(l, m), r);
```
</details>

2. **[区间哈希]** 在平衡树上维护字符串，支持任意位置插入、删除字符，以及查询子串哈希。
<details>
<summary>Check Solution</summary>

**核心逻辑**：每个节点维护子树的哈希值 $H(u) = (H(ls) \cdot P^{size(rs)+1} + val(u) \cdot P^{size(rs)} + H(rs)) \pmod M$。
通过 `split` 提取区间 $[L, R]$ 对应的子树，直接获取其 `hash` 字段。
</details>

3. **[进阶]** **可持久化平衡树**：实现支持历史版本回滚的有序集合。
<details>
<summary>Check Solution</summary>

**核心逻辑**：基于 FHQ-Treap，在 `split` 和 `merge` 涉及节点修改时，新建节点（路径复制）。
```cpp
int copy(int u) {
    if (!u) return 0;
    int v = ++idx;
    tr[v] = tr[u];
    return v;
}
// 在 split 中调用: u = copy(u);
```
</details>

---

_编者注：平衡树的演进代表了从“绝对高度平衡”（如 AVL/红黑树）到“统计平衡”与“自适应平衡”的思想跃迁。FHQ-Treap 以其函数式的优雅，成为了现代可持久化结构的首选。_
