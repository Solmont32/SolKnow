---
title: 平衡树 (Balanced Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, Move, RotateCcw, Shuffle, Layers, Scissors, Repeat, TrendingUp, MemoryStick, Box, ShieldCheck, CheckCircle2 } from 'lucide-react';

# 平衡树 (Balanced Tree): 动态维护有序集

<KnowledgeCard type="info" title="结构抽象：增强型 BST">
平衡二叉搜索树（BBST）在满足二叉搜索树性质的同时，通过特定的拓扑调整机制维护树的高度。
- **BST 性质**: $\forall u, v \in ls(u) \implies val(v) < val(u); v \in rs(u) \implies val(v) > val(u)$。
- **增强 (Augmentation)**: 每个节点维护子树信息 $\mathcal{F}(u) = \mathcal{G}(val(u), \mathcal{F}(ls), \mathcal{F}(rs))$。
</KnowledgeCard>

---

## 1. 结构拓扑一致性与单调性校验

平衡树的核心在于**旋转 (Rotation)** 或 **分裂与合并 (Split & Merge)**。这些操作必须严格保持 BST 的单调性。

### 1.1 旋转不变量与单调性证明

设 $u$ 为 $v$ 的左子节点，$B$ 为 $u$ 的右子树。右旋后：
**单调性保持证明 (Monotonicity Preservation)**：
1. 旋转前：$val(ls(u)) < val(u) < val(rs(u)=B) < val(v) < val(rs(v))$。
2. 旋转后：$ls(u)$ 仍为 $u$ 的左子树，$v$ 及其右子树整体变为 $u$ 的右子树，而 $B$ 变为 $v$ 的左子树。
3. 验证：$val(ls(u)) < val(u) < (val(B) < val(v) < val(rs(v)))$。
**结论**：全序关系（单调性）在拓扑变换中严格保持。

### 1.2 分治边界验证 (Split & Merge Boundary)

在 FHQ-Treap 中，`split(u, v, &l, &r)` 将树划分为两部分：
1. **左子树 $l$**：所有节点的 $val \le v$。
2. **右子树 $r$**：所有节点的 $val > v$。
**一致性校验**：通过递归边界处理（`!u` 时返回空）与按值路由，确保原树中的每个节点**有且仅有一次**出现在 $l$ 或 $r$ 中，无信息丢失。

---

## 2. 复杂度分析与均摊证明

### 2.1 伸展树 (Splay): 势能分析证明

**定理**：Splay 操作的均摊代价为 $O(\log N)$。
定义势能 $\Phi = \sum_{i=1}^n \log_2(size(i))$。通过对 Zig-Zig 和 Zig-Zag 变换的 $\Delta \Phi$ 计算，可以证明单次 Access 的均摊代价受限于 $3(r(root) - r(start)) + 1$。

---

## 3. FHQ-Treap: 随机化平衡的一致性

### 3.1 期望高度收敛分析

**命题**：随机权值 Treap 的期望高度为 $O(\log N)$。
**证明**：节点 $i$ 是 $j$ 的祖先的概率取决于它们在随机权值序列中的相对位置。期望深度 $E[D_j] \approx 2 \ln N$。由于权值是独立同分布的随机变量，结构的平衡性具有极强的概率保障。

---

## 4. 教材化例题与解析

### 例题 1：区间翻转 (文艺平衡树)
<details>
<summary>Check Solution (Splay 完整实现)</summary>

**核心逻辑**：将区间 $[l, r]$ 旋转到一棵子树中，通过打懒标记 `rev` 实现 $O(\log N)$ 翻转。
```cpp
void push_down(int x) {
    if (tr[x].rev) {
        std::swap(tr[x].s[0], tr[x].s[1]);
        tr[tr[x].s[0]].rev ^= 1;
        tr[tr[x].s[1]].rev ^= 1;
        tr[x].rev = 0;
    }
}
```
</details>

### 例题 2：名次树操作 (FHQ-Treap)
<details>
<summary>Check Solution</summary>

**解析**：支持插入、删除、查排名、查数值、求前驱后继。
```cpp
void insert(int v) {
    int l, r;
    split(root, v, l, r);
    root = merge(merge(l, newNode(v)), r);
}
```
</details>

---

## 5. 综合练习与解答

1. **[树上路径]** 配合 LCT 维护树上路径信息（如路径最大值）。
<details>
<summary>Check Solution</summary>

**核心逻辑**：LCT 本质上是辅助树（Splay）维护实链。通过 `access` 和 `make_root` 将路径提取到一棵 Splay 中进行处理。
</details>

2. **[可持久化]** 实现可持久化 Treap，支持回滚到历史版本。
<details>
<summary>Check Solution</summary>

**一致性保证**：在 `split` 和 `merge` 过程中，任何修改节点的操作都必须先 `copyNode`。这样可以保证历史版本的拓扑单调性不被破坏。
```cpp
int copyNode(int u) {
    int v = ++idx;
    tr[v] = tr[u];
    return v;
}
```
</details>

---

_编者注：平衡树的演进代表了从“绝对高度平衡”到“统计平衡”与“自适应平衡”的思想跃迁。掌握其背后的数学支撑，是架构高性能复杂结构的前提。_
