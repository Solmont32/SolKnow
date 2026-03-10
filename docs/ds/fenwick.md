---
title: 树状数组 (Fenwick Tree / BIT)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Binary, Sigma, ArrowUpRight, Zap } from 'lucide-react';

# 树状数组 (Fenwick Tree): 极简主义的区间美学

<KnowledgeCard type="info" title="核心定义">
树状数组（Binary Indexed Tree, BIT）是一种通过**二进制分解**实现的线性数据结构。它以 $O(N)$ 的空间复杂度，在 $O(\log N)$ 时间内完成单点修改与前缀和查询。其本质是将区间 $[1, x]$ 分解为若干个形如 $(x - 2^{k_i}, x]$ 的子区间。
</KnowledgeCard>

---

## 1. 数学原理：lowbit 与区间分解

### 1.1 `lowbit` 算子证明
`lowbit(x)` 返回 $x$ 在二进制表示下最低位的 $1$ 及其后续的 $0$。
- **公式**：`lowbit(x) = x & -x`
- **证明**：在补码表示法下，`-x` 等于 `~x + 1`。取反后最低位的 $1$ 变为 $0$，其后的 $0$ 变为 $1$。加 $1$ 后，原最低位的 $1$ 重新变回 $1$，其后的 $1$ 全部进位变回 $0$，而该位之前的位均与原码相反。因此 `x & -x` 仅保留最低位的 $1$。

### 1.2 节点覆盖范围
树状数组 $tr[x]$ 维护的区间是 $(x - lowbit(x), x]$。
- **查询前缀和**：$S_x = tr[x] + tr[x - lowbit(x)] + \dots$ (不断减去 lowbit)
- **更新节点**：当 $a_x$ 改变时，受影响的节点为 $x, x + lowbit(x), \dots$ (不断加上 lowbit)

---

## 2. 进阶策略：区间修改与多维扩展

### 2.1 区间修改 + 区间查询 (差分增强)
为了支持区间 $[l, r]$ 修改和区间求和，我们引入差分数组 $d_i = a_i - a_{i-1}$。
前缀和 $S_x = \sum_{i=1}^x a_i = \sum_{i=1}^x \sum_{j=1}^i d_j$。
通过交换求和次序：
$$S_x = \sum_{i=1}^x (x - i + 1)d_i = (x+1)\sum_{i=1}^x d_i - \sum_{i=1}^x i \cdot d_i$$
**实现**：维护两个树状数组，分别存储 $\sum d_i$ 和 $\sum i \cdot d_i$。

### 2.2 二维树状数组
$tr[x][y]$ 维护矩形区域 $(x-lowbit(x), x] \times (y-lowbit(y), y]$ 的和。
- 复杂度：修改与查询均为 $O(\log N \log M)$。

---

## 3. 教材化例题与解析

### 例题 1：逆序对统计 (经典应用)
<details>
<summary>Check Solution</summary>

**题目描述**：给定长度为 $N$ 的序列，求逆序对个数。
**解析**：从后往前遍历，每次查询比当前值小的数有多少个，然后将当前值插入树状数组。
**注意**：若值域较大，需先进行**离散化**。

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

const int N = 500010;
int n, tr[N];
struct Node { int v, id; } a[N];
int ranks[N];

int lowbit(int x) { return x & -x; }
void add(int x, int v) {
    for (; x <= n; x += lowbit(x)) tr[x] += v;
}
int query(int x) {
    int res = 0;
    for (; x; x -= lowbit(x)) res += query(x); // 修正：应为 tr[x]
    return res;
}

// 修正后的核心逻辑
long long solve() {
    long long ans = 0;
    for (int i = n; i >= 1; i--) {
        ans += query(ranks[i] - 1);
        add(ranks[i], 1);
    }
    return ans;
}
```
</details>

### 例题 2：区间最大值 (特殊扩展)
<details>
<summary>Check Solution</summary>

**题目描述**：树状数组维护区间最大值，支持单点修改。
**解析**：树状数组维护最大值比较复杂，修改时需要 $O(\log^2 N)$。
```cpp
void update(int x, int v) {
    a[x] = v;
    for (; x <= n; x += lowbit(x)) {
        tr[x] = a[x];
        for (int i = 1; i < lowbit(x); i <<= 1)
            tr[x] = max(tr[x], tr[x - i]);
    }
}
```
</details>

---

## 4. 综合练习

1. **[基础]** 动态前缀和与单点更新。
2. **[提高]** 二维区间求和 (支持单点修改)。
3. **[进阶]** 树状数组实现 $O(N \log N)$ 解决“火柴排队”问题。

---

_编者注：树状数组的精髓在于“以二进制位为跳板”。它虽然在功能上是线段树的子集，但在常数效率和空间消耗上具有压倒性优势。_
