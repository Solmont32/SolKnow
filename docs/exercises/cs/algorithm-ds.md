---
title: 练习库：高级数据结构
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 练习库：高级数据结构

本库包含线段树、树状数组、平衡树与可持久化结构的深度练习题，旨在通过实战巩固理论知识。

---

## 1. 线段树 (Segment Tree)

### 练习 1：区间乘法与加法 (P3373)
维护一个序列，支持区间加、区间乘、区间求和。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
using namespace std;

typedef long long LL;
const int N = 100010;
int n, m, p;
int a[N];
struct Node {
    int l, r;
    LL sum, add, mul;
} tr[N << 2];

void pushup(int u) {
    tr[u].sum = (tr[u << 1].sum + tr[u << 1 | 1].sum) % p;
}

void eval(Node &u, int add, int mul) {
    u.sum = (u.sum * mul + (LL)(u.r - u.l + 1) * add) % p;
    u.mul = (u.mul * mul) % p;
    u.add = (u.add * mul + add) % p;
}

void pushdown(int u) {
    eval(tr[u << 1], tr[u].add, tr[u].mul);
    eval(tr[u << 1 | 1], tr[u].add, tr[u].mul);
    tr[u].add = 0, tr[u].mul = 1;
}

void build(int u, int l, int r) {
    if (l == r) tr[u] = {l, r, a[l], 0, 1};
    else {
        tr[u] = {l, r, 0, 0, 1};
        int mid = l + r >> 1;
        build(u << 1, l, mid), build(u << 1 | 1, mid + 1, r);
        pushup(u);
    }
}

void update(int u, int l, int r, int add, int mul) {
    if (tr[u].l >= l && tr[u].r <= r) eval(tr[u], add, mul);
    else {
        pushdown(u);
        int mid = tr[u].l + tr[u].r >> 1;
        if (l <= mid) update(u << 1, l, r, add, mul);
        if (r > mid) update(u << 1 | 1, l, r, add, mul);
        pushup(u);
    }
}

LL query(int u, int l, int r) {
    if (tr[u].l >= l && tr[u].r <= r) return tr[u].sum;
    pushdown(u);
    int mid = tr[u].l + tr[u].r >> 1;
    LL sum = 0;
    if (l <= mid) sum = query(u << 1, l, r);
    if (r > mid) sum = (sum + query(u << 1 | 1, l, r)) % p;
    return sum;
}
```
</details>

---

## 2. 平衡树 (Balanced Tree)

### 练习 1：列队 (Splay / Treap)
维护一个动态序列，支持插入、删除、区间翻转。

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
    int size, flag;
    void init(int _v, int _p) {
        v = _v, p = _p;
        size = 1;
    }
} tr[N];
int root, idx;

void pushup(int x) {
    tr[x].size = tr[tr[x].s[0]].size + tr[tr[x].s[1]].size + 1;
}

void pushdown(int x) {
    if (tr[x].flag) {
        swap(tr[x].s[0], tr[x].s[1]);
        tr[tr[x].s[0]].flag ^= 1;
        tr[tr[x].s[1]].flag ^= 1;
        tr[x].flag = 0;
    }
}

void rotate(int x) {
    int y = tr[x].p, z = tr[y].p;
    int k = tr[y].s[1] == x;
    tr[z].s[tr[z].s[1] == y] = x, tr[x].p = z;
    tr[y].s[k] = tr[x].s[k ^ 1], tr[tr[x].s[k ^ 1]].p = y;
    tr[x].s[k ^ 1] = y, tr[y].p = x;
    pushup(y), pushup(x);
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

---

## 3. 可持久化结构 (Persistent)

### 练习 1：最大异或和 (Persistent Trie)
支持在给定历史版本中查询与 $x$ 异或最大的数。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 600010, M = N * 25;
int n, m;
int s[N];
int tr[M][2], max_id[M];
int root[N], idx;

void insert(int i, int k, int p, int q) {
    if (k < 0) {
        max_id[q] = i;
        return;
    }
    int v = s[i] >> k & 1;
    if (p) tr[q][v ^ 1] = tr[p][v ^ 1];
    tr[q][v] = ++idx;
    insert(i, k - 1, tr[p][v], tr[q][v]);
    max_id[q] = max(max_id[tr[q][0]], max_id[tr[q][1]]);
}

int query(int root, int val, int k, int limit) {
    if (k < 0) return s[max_id[root]] ^ val;
    int v = val >> k & 1;
    if (max_id[tr[root][v ^ 1]] >= limit)
        return query(tr[root][v ^ 1], val, k - 1, limit);
    return query(tr[root][v], val, k - 1, limit);
}
```
</details>
