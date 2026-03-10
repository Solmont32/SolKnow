---
title: 平衡树 (Balanced Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import { GitBranch, Move, RotateCcw, Shuffle, Layers, Scissors, Repeat } from 'lucide-react';

# 平衡树 (Balanced Tree)

<KnowledgeCard type="info" title="核心目标">
平衡树（主要是平衡二叉搜索树，BST）旨在通过特定的调整机制（旋转或分裂重构），确保树的高度始终维持在 $O(\log N)$，从而保证插入、删除和查询操作的效率。
</KnowledgeCard>

---

## 1. Splay (伸展树)

Splay 是一种通过**伸展操作 (Splaying)** 将节点提升至根位置的自适应平衡树。其核心在于：频繁访问的节点会靠近根部。

### 1.1 旋转操作 (Rotate)
核心在于保持 BST 性质的同时改变节点层级。设 $x$ 为要旋转的节点，$y$ 为其父节点。
- **Zig (单旋)**：当 $y$ 为根时，直接通过一次旋转提升 $x$。
- **Zig-Zig (同向双旋)**：$x, y, z$ 在同一直线上。需先旋转 $y$，再旋转 $x$。
- **Zig-Zag (异向双旋)**：$x, y, z$ 呈折线状。需旋转两次 $x$。

<KnowledgeCard type="warning" title="关键细节">
在 Splay 中，同向旋转必须**先旋转父节点**再旋转当前节点，否则树的高度无法得到有效压缩，复杂度将退化。
</KnowledgeCard>

```cpp
struct Node {
    int s[2], p, v;
    int sz, rev; // 区间翻转标记
} tr[MAXN];

void push_up(int x) { tr[x].sz = tr[tr[x].s[0]].sz + tr[tr[x].s[1]].sz + 1; }

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

---

## 2. FHQ-Treap (无旋 Treap)

由范浩强发明，通过 `Split`（分裂）和 `Merge`（合并）两个核心操作维护平衡。

### 2.1 分裂方式
- **按值分裂 (By Value)**：用于维护普通 BST，支持插入、删除、排名查询。
- **按排名分裂 (By Size)**：用于维护序列（如区间翻转、区间修改）。

### 2.2 核心实现
```cpp
void split(int u, int sz, int &l, int &r) { // 按排名分裂
    if (!u) { l = r = 0; return; }
    push_down(u);
    if (tr[tr[u].l].sz < sz) {
        l = u;
        split(tr[u].r, sz - tr[tr[u].l].sz - 1, tr[u].r, r);
    } else {
        r = u;
        split(tr[u].l, sz, l, tr[u].l);
    }
    push_up(u);
}

int merge(int l, int r) {
    if (!l || !r) return l + r;
    if (tr[l].key > tr[r].key) {
        push_down(l);
        tr[l].r = merge(tr[l].r, r);
        push_up(l); return l;
    } else {
        push_down(r);
        tr[r].l = merge(l, tr[r].l);
        push_up(r); return r;
    }
}
```

---

## 3. 经典例题

### 例题 1：文艺平衡树 (区间翻转)
给定序列 $1, 2, \dots, n$，$m$ 次操作，每次翻转区间 $[l, r]$。

<details>
<summary>Check Solution (Splay Implementation)</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010;
int n, m;
struct Node {
    int s[2], p, v;
    int sz, rev;
} tr[N];
int root, idx;

void push_up(int x) { tr[x].sz = tr[tr[x].s[0]].sz + tr[tr[x].s[1]].sz + 1; }

void push_down(int x) {
    if (tr[x].rev) {
        swap(tr[x].s[0], tr[x].s[1]);
        tr[tr[x].s[0]].rev ^= 1;
        tr[tr[x].s[1]].rev ^= 1;
        tr[x].rev = 0;
    }
}

void rotate(int x) {
    int y = tr[x].p, z = tr[y].p;
    int k = tr[y].s[1] == x;
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

void insert(int v) {
    int u = root, p = 0;
    while (u) p = u, u = tr[u].s[v > tr[u].v];
    u = ++idx;
    if (p) tr[p].s[v > tr[p].v] = u;
    tr[u].p = p; tr[u].v = v; tr[u].sz = 1;
    splay(u, 0);
}

int get_kth(int k) {
    int u = root;
    while (1) {
        push_down(u);
        if (tr[tr[u].s[0]].sz >= k) u = tr[u].s[0];
        else if (tr[tr[u].s[0]].sz + 1 == k) return u;
        else k -= tr[tr[u].s[0]].sz + 1, u = tr[u].s[1];
    }
}

void output(int u) {
    push_down(u);
    if (tr[u].s[0]) output(tr[u].s[0]);
    if (tr[u].v >= 1 && tr[u].v <= n) printf("%d ", tr[u].v);
    if (tr[u].s[1]) output(tr[u].s[1]);
}

int main() {
    scanf("%d%d", &n, &m);
    for (int i = 0; i <= n + 1; i++) insert(i); // 哨兵节点
    while (m--) {
        int l, r;
        scanf("%d%d", &l, &r);
        l = get_kth(l), r = get_kth(r + 2);
        splay(l, 0); splay(r, l);
        tr[tr[r].s[0]].rev ^= 1;
    }
    output(root);
    return 0;
}
```
</details>

---

## 4. 练习库

- **练习 1：NOI 维修数列** - 综合考察平衡树对区间的维护（翻转、求和、最大子段和）。
- **练习 2：二逼平衡树 (树套树)** - 考察在外部线段树节点上维护平衡树。

---

## 📺 扩展学习

<div className="bilibili-embed-inner">
  <BilibiliEmbed bvid="BV1pE41197be" />
</div>
