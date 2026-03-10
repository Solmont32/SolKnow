---
title: 线段树（Segment Tree）
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import { Code2, GitMerge, Layers, Zap } from 'lucide-react';

# 线段树 (Segment Tree)

<KnowledgeCard type="info" title="核心定义">
线段树是一种基于**分治思想**的二叉树数据结构，主要用于解决**区间查询**与**区间修改**问题。其核心优势在于能够将 $O(N)$ 的线性操作优化至 $O(\log N)$。
</KnowledgeCard>

---

## 1. 结构与基本原理

线段树将区间 $[1, n]$ 递归划分为两个子区间：
- 若当前区间为 $[l, r]$且 $l < r$，则左孩子为 $[l, mid]$，右孩子为 $[mid+1, r]$，其中 $mid = \lfloor \frac{l+r}{2} \rfloor$。
- 若 $l = r$，则该节点为叶子节点，存储元数据。

对于一个长度为 $n$ 的数组，线段树节点总数约 $4n$。

### 基础实现 (Sum Segment Tree)

```cpp
const int MAXN = 1e5 + 5;
long long tree[MAXN << 2];

void push_up(int node) {
    tree[node] = tree[node << 1] + tree[node << 1 | 1];
}

void build(int node, int start, int end, const vector<int>& arr) {
    if (start == end) {
        tree[node] = arr[start];
        return;
    }
    int mid = (start + end) >> 1;
    build(node << 1, start, mid, arr);
    build(node << 1 | 1, mid + 1, end, arr);
    push_up(node);
}
```

---

## 2. 懒标记 (Lazy Tag) 系统化

<KnowledgeCard type="tip" title="懒标记的精髓">
**延时更新**：当修改一个区间时，不立即更新所有叶子节点，而是在对应区间节点打上标记。只有在下一次访问该子节点时，才将标记下传（Push Down）。
</KnowledgeCard>

### 核心步骤：Push Down

对于区间加法操作，标记下传逻辑如下：

```cpp
long long lazy[MAXN << 2];

void push_down(int node, int l, int r) {
    if (lazy[node]) {
        int mid = (l + r) >> 1;
        // 更新左子树
        lazy[node << 1] += lazy[node];
        tree[node << 1] += lazy[node] * (mid - l + 1);
        // 更新右子树
        lazy[node << 1 | 1] += lazy[node];
        tree[node << 1 | 1] += lazy[node] * (r - mid);
        // 清除当前标记
        lazy[node] = 0;
    }
}
```

---

## 3. 动态开点线段树 (Dynamic Segment Tree)

当值域极大（如 $10^9$）且操作稀疏时，预先分配 $4N$ 空间会导致 MLE。此时应随用随开：

```cpp
struct Node {
    int ls, rs; // 左右子节点指针（下标）
    long long val, lazy;
} tr[MAXN * 40]; // 空间开到 操作数 * log(值域)

int root, cnt;

void update(int &node, int l, int r, int ql, int qr, int v) {
    if (!node) node = ++cnt;
    if (ql <= l && r <= qr) {
        tr[node].val += 1LL * (r - l + 1) * v;
        tr[node].lazy += v;
        return;
    }
    // push_down ...
}
```

---

## 4. 进阶应用：树套树与 Segment Tree Beats

### 树套树 (Tree in Tree)
通常指**线段树嵌套平衡树**或**线段树嵌套线段树**。
- **外部线段树**维护区间 $[l, r]$。
- **内部平衡树**维护该区间内所有值的分布情况。
- 复杂度：查询 $O(\log^2 N)$，空间 $O(N \log N)$。

### 线段树 Beats (Gilleland-Wachs / Range Chmin)
处理类似 $a_i = \min(a_i, x)$ 的区间修改。其核心在于记录区间的最大值、次大值以及最大值的个数。

---

## 5. 经典例题

### 例题 1：区间加法与区间求和 (Template)
<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 1e5 + 7;
long long sum[MAXN << 2], add[MAXN << 2];

void push_up(int rt) { sum[rt] = sum[rt << 1] + sum[rt << 1 | 1]; }

void push_down(int rt, int ln, int rn) {
    if (add[rt]) {
        add[rt << 1] += add[rt];
        add[rt << 1 | 1] += add[rt];
        sum[rt << 1] += add[rt] * ln;
        sum[rt << 1 | 1] += add[rt] * rn;
        add[rt] = 0;
    }
}

void update(int L, int R, int c, int l, int r, int rt) {
    if (L <= l && r <= R) {
        sum[rt] += 1LL * c * (r - l + 1);
        add[rt] += c;
        return;
    }
    int m = (l + r) >> 1;
    push_down(rt, m - l + 1, r - m);
    if (L <= m) update(L, R, c, l, m, rt << 1);
    if (R > m) update(L, R, c, m + 1, r, rt << 1 | 1);
    push_up(rt);
}

long long query(int L, int R, int l, int r, int rt) {
    if (L <= l && r <= R) return sum[rt];
    int m = (l + r) >> 1;
    push_down(rt, m - l + 1, r - m);
    long long ans = 0;
    if (L <= m) ans += query(L, R, l, m, rt << 1);
    if (R > m) ans += query(L, R, m + 1, r, rt << 1 | 1);
    return ans;
}
```
</details>

---

## 6. 练习库

- [练习 1：区间乘法与加法 (P3373)](/docs/exercises/cs/algorithm-ds#1-线段树-segment-tree)

---

## 📺 扩展学习

<div className="bilibili-embed-inner">
  <BilibiliEmbed bvid="BV1pE41197be" />
</div>
