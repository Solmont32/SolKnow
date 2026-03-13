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

## 1. 结构拓扑一致性校验 (Topological Consistency)

平衡树的核心在于**旋转 (Rotation)**。旋转必须保持 BST 性质并满足拓扑不变性：

### 1.1 旋转不变量方程
设 $u$ 为 $v$ 的左子节点，$B$ 为 $u$ 的右子树。右旋后：
1. $u$ 成为 $v$ 的父节点。
2. $B$ 成为 $v$ 的左子树。
**校验逻辑**：
- **全序保持**: 旋转前 $A < u < B < v < C$；旋转后依然满足 $A < u < (B < v < C)$。
- **信息维护**: 必须先更新原子节点（旋转后的子节点）的信息，再更新新父节点的信息。

---

## 2. 伸展树 (Splay): 均摊复杂度证明

Splay 的核心在于其双旋（Zig-Zig）策略，这使得它能够自适应地调整结构。

### 2.1 势能分析证明 (The Access Lemma)

**定理**：Splay 操作的均摊代价为 $O(\log N)$。

**证明步骤**：
1. 定义节点的秩 $r(u) = \log_2(size(u))$，系统势能 $\Phi = \sum_{i=1}^n r(i)$。
2. **Zig-Zig/Zag-Zag (双旋)** 的均摊代价 $A$：
   - 设 $u$ 为当前节点，$p$ 为父节点，$g$ 为祖父节点。
   - $A = 实际代价(2) + \Delta \Phi = 2 + (r'(u) + r'(p) + r'(g) - r(u) - r(p) - r(g))$。
   - 由于 $r'(u) = r(g)$ 且 $r(u) < r(p)$，利用对数函数的凹性可证明：
   - $A \le 3(r'(u) - r(u))$。
3. **总代价**: 单次伸展由若干次双旋和最多一次单旋组成。
   - $A_{total} = \sum A_i \le 3(r(root) - r(start)) + 1$。
   - 由于 $r(root) = \log N$ 且 $r(start) \ge 0$，故均摊复杂度为 $O(\log N)$。

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
<summary>Check Solution (Splay 完整实现)</summary>

```cpp
#include <iostream>
#include <algorithm>

const int N = 100010;
struct SplayNode {
    int s[2], p, v, sz;
    bool rev;
    void init(int _v, int _p) { v = _v; p = _p; sz = 1; }
} tr[N];
int root, idx;

void push_up(int x) { tr[x].sz = tr[tr[x].s[0]].sz + tr[tr[x].s[1]].sz + 1; }

void push_down(int x) {
    if (tr[x].rev) {
        std::swap(tr[x].s[0], tr[x].s[1]);
        tr[tr[x].s[0]].rev ^= 1;
        tr[tr[x].s[1]].rev ^= 1;
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
            if ((tr[y].s[1] == x) ^ (tr[z].s[1] == y)) rotate(x);
            else rotate(y);
        rotate(x);
    }
    if (!k) root = x;
}
```

</details>

### 例题 2：普通平衡树 (Treap / FHQ-Treap)

<details>
<summary>Check Solution (FHQ-Treap 实现)</summary>

**核心逻辑**：通过 `split` 和 `merge` 操作替代旋转，代码极其简洁且支持可持久化。

```cpp
#include <random>

const int N = 100010;
struct FHQNode {
    int l, r, val, key, sz;
} tr[N];
int root, idx;
std::mt19937 rng(1337);

void push_up(int u) { tr[u].sz = tr[tr[u].l].sz + tr[tr[u].r].sz + 1; }

void split(int u, int v, int &l, int &r) {
    if (!u) { l = r = 0; return; }
    if (tr[u].val <= v) {
        l = u; split(tr[u].r, v, tr[u].r, r);
    } else {
        r = u; split(tr[u].l, v, l, tr[u].l);
    }
    push_up(u);
}

int merge(int l, int r) {
    if (!l || !r) return l + r;
    if (tr[l].key > tr[r].key) {
        tr[l].r = merge(tr[l].r, r);
        push_up(l); return l;
    } else {
        tr[r].l = merge(l, tr[r].l);
        push_up(r); return r;
    }
}
```

</details>

---

## 6. 综合练习与解答

1. **[最大异或路径]** 在树上支持动态加边、删边，查询两点间路径异或最大值。
<details>
<summary>Check Solution</summary>

**LCT + 线性基**：LCT 维护路径，Splay 节点维护其子树内所有权值的线性基（Linear Basis）。

```cpp
struct Basis {
    int b[31];
    void insert(int x) {
        for (int i = 30; i >= 0; i--) {
            if (!(x >> i)) continue;
            if (!b[i]) { b[i] = x; return; }
            x ^= b[i];
        }
    }
};
// LCT Node 增加 Basis 成员，并在 push_up 时合并子节点与自身的 Basis
```

</details>

2. **[进阶] 替罪羊树 (Scapegoat Tree) 的重构一致性**
<details>
<summary>Check Solution</summary>

**重构判定**：$\max(sz[ls], sz[rs]) > \alpha \cdot sz[u]$。当触发重构时，将子树中序遍历存入数组，再通过二分法重新构建完全平衡的二叉树。

```cpp
void flatten(int u, std::vector<int> &v) {
    if (!u) return;
    flatten(tr[u].l, v);
    v.push_back(tr[u].val);
    flatten(tr[u].r, v);
}
int rebuild(int l, int r, const std::vector<int> &v) {
    if (l > r) return 0;
    int mid = (l + r) >> 1;
    int u = newNode(v[mid]);
    tr[u].l = rebuild(l, mid - 1, v);
    tr[u].r = rebuild(mid + 1, r, v);
    push_up(u);
    return u;
}
```

</details>

---

_编者注：平衡树的演进代表了从“绝对高度平衡”到“统计平衡”与“自适应平衡”的思想跃迁。理解不同平衡机制背后的数学支撑，是架构高性能复杂结构的前提。_
