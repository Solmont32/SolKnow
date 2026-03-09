---
title: 树状数组 (Fenwick Tree / BIT)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 树状数组 (Fenwick Tree / BIT)

树状数组是一种高效维护**动态前缀和**的数据结构。它支持：
1. **单点修改**：将 $a_x$ 加上 $c$。
2. **区间查询**：求 $\sum_{i=1}^x a_i$。

两者的时间复杂度均为 $O(\log n)$。

---

## 一、核心原理

### 1. `lowbit` 函数
`lowbit(x)` 返回 $x$ 二进制表示中最低位的 1 及其后面的 0 构成的数值。
- **公式**：`lowbit(x) = x & -x`。

### 2. 结构特性
每个位置 $x$ 的树状数组元素 $tr[x]$ 存储的是区间 $(x - lowbit(x), x]$ 的和。
- **查询**：向左下方跳，$x = x - lowbit(x)$。
- **修改**：向右上方跳，$x = x + lowbit(x)$。

**代码实现**：
```cpp
int tr[N];
int lowbit(int x) { return x & -x; }

void add(int x, int c) {
    for (; x <= n; x += lowbit(x)) tr[x] += c;
}

int query(int x) {
    int res = 0;
    for (; x; x -= lowbit(x)) res += tr[x];
    return res;
}
```

---

## 二、进阶应用

### 1. 区间修改 + 单点查询
维护**差分数组**。对区间 $[l, r]$ 加 $c$ 变为 `add(l, c), add(r+1, -c)`。单点查询即求前缀和。

### 2. 区间修改 + 区间查询
设差分数组为 $d_i$，则 $a_x = \sum_{i=1}^x d_i$。
前缀和 $S_x = \sum_{i=1}^x a_i = \sum_{i=1}^x \sum_{j=1}^i d_j = \sum_{i=1}^x (x - i + 1)d_i = (x+1)\sum d_i - \sum i \cdot d_i$。
需要维护两个树状数组：一个维护 $d_i$，一个维护 $i \cdot d_i$。

---

## 三、教材化例题

### 例题 1：楼兰图腾 (BIT 应用)

给定一个序列，求出所有形如 $V$ 和 $\Lambda$ 的三元组数量。
即求：
- $\Lambda$：满足 $a_i < a_j > a_k$ ($i < j < k$)。
- $V$：满足 $a_i > a_j < a_k$ ($i < j < k$)。

:::note[点击查看解析与代码]

**解析**：
对于每个位置 $j$，统计左侧比 $a_j$ 大（或小）的数 $L_j$，以及右侧比 $a_j$ 大（或小）的数 $R_j$。
$\Lambda$ 总数 = $\sum L_{j, \text{greater}} \times R_{j, \text{greater}}$。
统计过程：从左往右扫，边查 BIT 边插入；再从右往左扫一遍。

**代码实现 (C++)**：
```cpp
#include <iostream>
#include <cstring>
using namespace std;

typedef long long LL;
const int N = 200010;
int n, a[N], tr[N];
int Greater[N], Lower[N];

int lowbit(int x) { return x & -x; }
void add(int x, int c) {
    for (; x <= n; x += lowbit(x)) tr[x] += c;
}
int query(int x) {
    int res = 0;
    for (; x; x -= lowbit(x)) res += tr[x];
    return res;
}

int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);

    for (int i = 1; i <= n; i++) {
        int y = a[i];
        Greater[i] = query(n) - query(y);
        Lower[i] = query(y - 1);
        add(y, 1);
    }

    memset(tr, 0, sizeof tr);
    LL res1 = 0, res2 = 0;
    for (int i = n; i >= 1; i--) {
        int y = a[i];
        res1 += (LL)Greater[i] * (query(n) - query(y));
        res2 += (LL)Lower[i] * query(y - 1);
        add(y, 1);
    }

    printf("%lld %lld\n", res1, res2);
    return 0;
}
```
:::

---

## 四、练习库

- [练习 1：迷失的牛 (二分+BIT)](/docs/exercises/cs/algorithm-basic#练习-11)
- [练习 2：动态区间和](/docs/exercises/cs/algorithm-basic#练习-12)

---

_编者注：树状数组是短小精悍的典范。如果线段树能做，且只需前缀操作，请优先考虑树状数组。_
