---
title: 平衡树 (Balanced Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import { GitBranch, Move, RotateCcw, Shuffle } from 'lucide-react';

# 平衡树 (Balanced Tree)

<KnowledgeCard type="info" title="核心目标">
平衡树（主要是平衡二叉搜索树，BST）旨在通过特定的调整机制（旋转或分裂重构），确保树的高度始终维持在 $O(\log N)$，从而保证插入、删除和查询操作的效率。
</KnowledgeCard>

---

## 1. Treap (Tree + Heap)

Treap 结合了**二叉搜索树**（按键值排序）和**堆**（按随机优先级排序）的性质。

### 1.1 FHQ-Treap (无旋 Treap)
由范浩强发明，通过 `Split`（分裂）和 `Merge`（合并）两个核心操作维护平衡。它不仅实现简单，且天然支持**可持久化**。

- **Split(node, val, &l, &r)**：将以 `node` 为根的树按值 `val` 分为两棵树 `l` 和 `r`。
- **Merge(l, r)**：将两棵树合并，需满足 `l` 的最大键值 $\le r$ 的最小键值。

```cpp
struct Node {
    int l, r, val, key, sz;
} tr[MAXN];

void split(int u, int val, int &l, int &r) {
    if (!u) { l = r = 0; return; }
    if (tr[u].val <= val) {
        l = u;
        split(tr[u].r, val, tr[u].r, r);
    } else {
        r = u;
        split(tr[u].l, val, l, tr[u].l);
    }
    push_up(u);
}

int merge(int l, int r) {
    if (!l || !r) return l + r;
    if (tr[l].key > tr[r].key) { // 满足堆性质
        tr[l].r = merge(tr[l].r, r);
        push_up(l); return l;
    } else {
        tr[r].l = merge(l, tr[r].l);
        push_up(r); return r;
    }
}
```

---

## 2. Splay (伸展树)

Splay 通过 `Splay(x, goal)` 操作，将节点 `x` 通过旋转提升至 `goal` 的子节点位置。

<KnowledgeCard type="tip" title="Splay 的优势">
Splay 可以极其灵活地维护**区间信息**（如区间翻转）。它是动态树（LCT）的核心组成部分。
</KnowledgeCard>

### 旋转操作 (Rotate)
核心在于保持 BST 性质的同时改变节点层级。

```cpp
void rotate(int x) {
    int y = tr[x].p, z = tr[y].p;
    int k = (tr[y].r == x); // x 是 y 的左还是右
    tr[z].s[tr[z].r == y] = x; tr[x].p = z;
    tr[y].s[k] = tr[x].s[k ^ 1]; tr[tr[x].s[k ^ 1]].p = y;
    tr[x].s[k ^ 1] = y; tr[y].p = x;
    push_up(y); push_up(x);
}
```

---

## 3. 经典例题

### 例题 1：普通平衡树 (Template)
支持插入、删除、查询排名、查询数值、前驱、后继。

<details>
<summary>Check Solution (FHQ-Treap Implementation)</summary>

```cpp
#include <iostream>
#include <random>
using namespace std;

const int MAXN = 1e5 + 5;
struct Node {
    int l, r, val, key, sz;
} tr[MAXN];
int cnt, root;
mt19937 rnd(114514);

int new_node(int v) {
    tr[++cnt] = {0, 0, v, (int)rnd(), 1};
    return cnt;
}

void push_up(int u) { tr[u].sz = tr[tr[u].l].sz + tr[tr[u].r].sz + 1; }

void split(int u, int val, int &l, int &r) {
    if (!u) { l = r = 0; return; }
    if (tr[u].val <= val) {
        l = u; split(tr[u].r, val, tr[u].r, r);
    } else {
        r = u; split(tr[u].l, val, l, tr[u].l);
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

void insert(int v) {
    int l, r;
    split(root, v, l, r);
    root = merge(merge(l, new_node(v)), r);
}

void del(int v) {
    int l, r, p;
    split(root, v, l, r);
    split(l, v - 1, l, p);
    p = merge(tr[p].l, tr[p].r); // 删除一个节点
    root = merge(merge(l, p), r);
}

int get_rank(int v) {
    int l, r;
    split(root, v - 1, l, r);
    int res = tr[l].sz + 1;
    root = merge(l, r);
    return res;
}

int get_val(int u, int rank) {
    if (rank == tr[tr[u].l].sz + 1) return tr[u].val;
    if (rank <= tr[tr[u].l].sz) return get_val(tr[u].l, rank);
    return get_val(tr[u].r, rank - tr[tr[u].l].sz - 1);
}
```
</details>

---

## 4. 练习库

- [练习 1：列队 (Splay / Treap)](/docs/exercises/cs/algorithm-ds#2-平衡树-balanced-tree)

---

## 📺 扩展学习

<div className="bilibili-embed-inner">
  <BilibiliEmbed bvid="BV1pE41197be" />
</div>
