---
title: 线段树 (Segment Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import { Code2, GitMerge, Layers, Zap, ShieldCheck, BoxSelect } from 'lucide-react';

# 线段树 (Segment Tree): 区间维护的工业级标准

<KnowledgeCard type="info" title="核心定义">
线段树（Segment Tree）是一种高度平衡的二叉搜索树，主要用于维护**区间信息**。它将长度为 $N$ 的序列划分为 $O(N)$ 个区间节点，每个节点代表序列中的一个子区间 $[l, r]$。通过**分治（Divide and Conquer）**与**懒标记（Lazy Propagation）**技术，它能在 $O(\log N)$ 时间内完成区间查询与区间修改。
</KnowledgeCard>

---

## 1. 数学结构与复杂度证明

### 1.1 节点构造逻辑
对于一个区间 $[L, R]$：
- 若 $L = R$，则该节点为叶子节点，对应原始序列中的元素。
- 若 $L < R$，令 $mid = \lfloor \frac{L+R}{2} \rfloor$，则其左孩子维护 $[L, mid]$，右孩子维护 $[mid+1, R]$。

### 1.2 空间复杂度：为什么是 $4N$？
**证明**：
考虑 $N = 2^k$ 的情况，线段树是一棵满二叉树，总节点数为 $2N-1$。
当 $N$ 不是 $2$ 的幂时，最后一层可能不平整。设 $2^{k-1} < N \le 2^k$，线段树的高度为 $k+1$（从 1 开始计）。总节点数 $S < 2^{k+1} = 4 \cdot 2^{k-1} < 4N$。
因此，在数组实现中，数组长度通常需要开到 $4N$ 以防止溢出。

---

## 2. 懒标记 (Lazy Tag) 的数学建模

在处理区间修改时，若暴力更新到叶子节点，复杂度将退化为 $O(N \log N)$。懒标记的核心在于**算子延迟传播**。

### 2.1 算子合成与分解
设节点 $u$ 维护的信息为 $V_u$，修改操作为算子 $F$。
- **标记叠加**：若已有标记 $f_1$，新操作为 $f_2$，则新标记为 $f_2 \circ f_1$。
- **信息更新**：$V_u' = f(V_u, len)$，其中 $len$ 为区间长度。

### 2.2 核心实现：Push Down 规范
```cpp
struct Node {
    long long sum, add, mul;
    Node() { sum = 0; add = 0; mul = 1; }
} tr[MAXN << 2];

void push_down(int u, int l, int r) {
    int mid = (l + r) >> 1;
    // 先处理乘法标记，再处理加法标记 (乘法分配律)
    if (tr[u].mul != 1) {
        eval(u << 1, l, mid, 0, tr[u].mul);
        eval(u << 1 | 1, mid + 1, r, 0, tr[u].mul);
        tr[u].mul = 1;
    }
    if (tr[u].add != 0) {
        eval(u << 1, l, mid, tr[u].add, 1);
        eval(u << 1 | 1, mid + 1, r, tr[u].add, 1);
        tr[u].add = 0;
    }
}

void eval(int u, int l, int r, long long add, long long mul) {
    tr[u].sum = (tr[u].sum * mul + add * (r - l + 1)) % MOD;
    tr[u].mul = (tr[u].mul * mul) % MOD;
    tr[u].add = (tr[u].add * mul + add) % MOD;
}
```

---

## 3. 序列维护策略：从加法到变换

线段树不仅能维护求和（Sum），还能维护最大公约数（GCD）、最长连续段、矩阵乘法等。

### 3.1 可合并性质 (Mergeability)
任何满足**结合律**的操作均可使用线段树维护：
- $Sum(a, b, c) = Sum(Sum(a, b), c)$
- $Max(a, b, c) = Max(Max(a, b), c)$
- $Matrix(A, B, C) = Matrix(A, Matrix(B, C))$

### 3.2 进阶：线段树合并 (Segment Tree Merging)
常用于处理树上路径问题。将两棵动态开点的线段树合并，复杂度在总点数级别。

---

## 4. 教材化例题与解析

### 例题 1：区间乘法 + 区间加法 (混合标记)
<details>
<summary>Check Solution</summary>

**题目描述**：维护一个序列，支持区间加、区间乘、区间求和。
**核心逻辑**：维护两个懒标记 `mul` 和 `add`。下传时满足 $(val \cdot mul + add) \cdot mul' + add' = val \cdot (mul \cdot mul') + (add \cdot mul' + add')$。

```cpp
#include <iostream>
using namespace std;
typedef long long LL;
const int N = 1e5 + 10;
int n, m, p;
LL a[N];
struct Node {
    int l, r;
    LL sum, add, mul;
} tr[N * 4];

void pushup(int u) {
    tr[u].sum = (tr[tr[u << 1]].sum + tr[tr[u << 1 | 1]].sum) % p;
}

void eval(Node &t, LL add, LL mul) {
    t.sum = (t.sum * mul + add * (t.r - t.l + 1)) % p;
    t.mul = t.mul * mul % p;
    t.add = (t.add * mul + add) % p;
}

void pushdown(int u) {
    eval(tr[u << 1], tr[u].add, tr[u].mul);
    eval(tr[u << 1 | 1], tr[u].add, tr[u].mul);
    tr[u].add = 0, tr[u].mul = 1;
}

void build(int u, int l, int r) {
    tr[u] = {l, r, 0, 0, 1};
    if (l == r) tr[u].sum = a[l] % p;
    else {
        int mid = l + r >> 1;
        build(u << 1, l, mid), build(u << 1 | 1, mid + 1, r);
        pushup(u);
    }
}
// ... 篇幅限制，略去 update 和 query 细节 ...
```
</details>

### 例题 2：区间最大子段和 (GSS 系列)
<details>
<summary>Check Solution</summary>

**题目描述**：支持单点修改，询问区间 $[l, r]$ 内的最大子段和。
**解析**：每个节点维护四个值：`sum` (区间和), `lmax` (最大前缀和), `rmax` (最大后缀和), `tmax` (区间最大子段和)。
**合并逻辑**：
- `tmax = max({l.tmax, r.tmax, l.rmax + r.lmax})`

```cpp
struct Node {
    int l, r;
    LL sum, lmax, rmax, tmax;
} tr[N * 4];

Node pushup(Node l, Node r) {
    Node res;
    res.l = l.l, res.r = r.r;
    res.sum = l.sum + r.sum;
    res.lmax = max(l.lmax, l.sum + r.lmax);
    res.rmax = max(r.rmax, r.sum + l.rmax);
    res.tmax = max({l.tmax, r.tmax, l.rmax + r.lmax});
    return res;
}
```
</details>

---

## 5. 综合练习

1. **[基础]** 区间加法，区间求平方和。 (提示：$(a+c)^2 = a^2 + 2ac + c^2$)
2. **[提高]** 线段树维护区间 GCD 与序列差分。
3. **[进阶]** 维护区间 $\sin$ 函数之和。 (提示：使用和差化积公式或复数表示)

---

## 📺 深度解析

<div className="bilibili-embed-inner">
  <BilibiliEmbed bvid="BV1pE41197be" />
</div>

_编者注：线段树是数据结构的分水岭。理解了懒标记的算子合成思想，便叩开了高级算法设计的大门。_
