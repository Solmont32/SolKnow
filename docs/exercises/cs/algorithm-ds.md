---
title: 练习库：高级数据结构
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 练习库：高级数据结构

本库包含线段树、树状数组、并查集、ST 表、堆、平衡树与可持久化结构的深度练习题，旨在通过实战巩固理论知识。

---

## 1. 基础结构：并查集与堆 (Basic DS)

### 练习 1：合并集合 (P3367 - 并查集模板)
维护 $N$ 个集合，支持合并两个集合、查询两个元素是否在同一集合。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
using namespace std;

const int N = 100010;
int p[N];

int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

int main() {
    int n, m;
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) p[i] = i;
    while (m--) {
        int z, x, y;
        scanf("%d%d%d", &z, &x, &y);
        if (z == 1) p[find(x)] = find(y);
        else {
            if (find(x) == find(y)) puts("Y");
            else puts("N");
        }
    }
    return 0;
}
```
</details>

### 练习 2：堆排序 (P3378 - 堆模板)
维护一个最小堆，支持插入、查询最小值、删除最小值。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 1000010;
int h[N], sz;

void down(int u) {
    int t = u;
    if (u * 2 <= sz && h[u * 2] < h[t]) t = u * 2;
    if (u * 2 + 1 <= sz && h[u * 2 + 1] < h[t]) t = u * 2 + 1;
    if (u != t) {
        swap(h[u], h[t]);
        down(t);
    }
}

void up(int u) {
    while (u / 2 && h[u / 2] > h[u]) {
        swap(h[u / 2], h[u]);
        u /= 2;
    }
}

int main() {
    int m;
    scanf("%d", &m);
    while (m--) {
        int op, x;
        scanf("%d", &op);
        if (op == 1) {
            scanf("%d", &x);
            h[++sz] = x;
            up(sz);
        } else if (op == 2) printf("%d\n", h[1]);
        else {
            h[1] = h[sz--];
            down(1);
        }
    }
    return 0;
}
```
</details>

---

## 2. 树状数组与 ST 表 (BIT & ST)

### 练习 3：树状数组 1 (P3374 - 单点修改，区间查询)
维护一个序列，支持单点加、区间求和。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
using namespace std;

const int N = 500010;
int n, m;
int tr[N];

int lowbit(int x) { return x & -x; }

void add(int x, int v) {
    for (int i = x; i <= n; i += lowbit(i)) tr[i] += v;
}

int query(int x) {
    int res = 0;
    for (int i = x; i; i -= lowbit(i)) res += tr[i];
    return res;
}

int main() {
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) {
        int x;
        scanf("%d", &x);
        add(i, x);
    }
    while (m--) {
        int op, x, y;
        scanf("%d%d%d", &op, &x, &y);
        if (op == 1) add(x, y);
        else printf("%d\n", query(y) - query(x - 1));
    }
    return 0;
}
```
</details>

### 练习 4：ST 表 (P3865 - RMQ 模板)
维护一个序列，支持 $O(1)$ 查询区间最大值。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

const int N = 100010, M = 20;
int f[N][M], lg[N];

int main() {
    int n, m;
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) scanf("%d", &f[i][0]);
    for (int i = 2; i <= n; i++) lg[i] = lg[i >> 1] + 1;
    for (int j = 1; j < M; j++)
        for (int i = 1; i + (1 << j) - 1 <= n; i++)
            f[i][j] = max(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);
    
    while (m--) {
        int l, r;
        scanf("%d%d", &l, &r);
        int k = lg[r - l + 1];
        printf("%d\n", max(f[l][k], f[r - (1 << k) + 1][k]));
    }
    return 0;
}
```
</details>

---

## 3. 线段树 (Segment Tree)

### 练习 5：区间乘法与加法 (P3373)
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

## 4. 平衡树 (Balanced Tree)

### 练习 6：区间翻转 (P3391 - Splay)
维护一个序列，支持区间翻转。

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

int get_k(int k) {
    int u = root;
    while (u) {
        pushdown(u);
        if (tr[tr[u].s[0]].size >= k) u = tr[u].s[0];
        else if (tr[tr[u].s[0]].size + 1 == k) return u;
        else k -= tr[tr[u].s[0]].size + 1, u = tr[u].s[1];
    }
    return 0;
}

void output(int u) {
    pushdown(u);
    if (tr[u].s[0]) output(tr[u].s[0]);
    if (tr[u].v >= 1 && tr[u].v <= n) printf("%d ", tr[u].v);
    if (tr[u].s[1]) output(tr[u].s[1]);
}
```
</details>

---

## 5. 可持久化结构 (Persistent)

### 练习 7：最大异或和 (Persistent Trie)
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

