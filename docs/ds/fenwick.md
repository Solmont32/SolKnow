---
title: 树状数组 (Fenwick Tree / BIT)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Sigma, Zap, Layers, BoxSelect, Binary } from 'lucide-react';

# 树状数组 (BIT): 动态前缀和的高效抽象

<KnowledgeCard type="info" title="数学背景：阿贝尔群 (Abelian Group)">
树状数组本质上是维护一个**阿贝尔群** $(S, \oplus)$ 上的前缀和。
1. **结合律**: $(a \oplus b) \oplus c = a \oplus (b \oplus c)$
2. **交换律**: $a \oplus b = b \oplus a$
3. **单位元**: 存在 $e$ 使得 $a \oplus e = a$
4. **逆元 (Inverse)**: 对于任何查询，必须存在逆运算 $\ominus$ 使得 $(a \oplus b) \ominus b = a$。
常见应用包括：加法群 $(\mathbb{Z}, +)$、异或群 $(\mathbb{Z}, \oplus)$。对于不满足逆元性质的操作（如 $\max, \min$），树状数组通常无法直接处理区间查询。
</KnowledgeCard>

---

## 1. 结构构造与 Lowbit 原理

树状数组利用整数的二进制表示，将区间 $[1, n]$ 划分为若干个长度为 $2^k$ 的子区间。

### 1.1 Lowbit 函数

定义 $\text{lowbit}(x)$ 为 $x$ 的二进制表示中最低位的 $1$ 及其后面的 $0$ 构成的数值：
$$\text{lowbit}(x) = x \mathbin{\&} (-x)$$
**证明**：在补码表示下，$-x = \sim x + 1$。按位与后，只有最低位 $1$ 被保留。

### 1.2 索引映射规则

- **维护区间**: $tr[x]$ 维护的是原数组在半开半闭区间 $(x - \text{lowbit}(x), x]$ 上的和。
- **查询前缀和**: $S[x] = tr[x] + tr[x - \text{lowbit}(x)] + \dots$。由于每次减少 $\text{lowbit}(x)$，复杂度为 $O(\log N)$。
- **单点更新**: 当 $A[x]$ 增加 $v$ 时，受影响的 $tr[i]$ 序列为 $x, x + \text{lowbit}(x), (x + \text{lowbit}(x)) + \text{lowbit}(x + \text{lowbit}(x)), \dots$。

---

## 2. 进阶：区间维护体系

### 2.1 区间修改，区间查询

利用差分数组 $D[i] = A[i] - A[i-1]$：
$$A[i] = \sum_{j=1}^i D[j]$$
前缀和 $S[n]$ 为：
$$S[n] = \sum_{i=1}^n \sum_{j=1}^i D[j] = \sum_{j=1}^n D[j] \cdot (n - j + 1) = (n+1) \sum D[j] - \sum j \cdot D[j]$$
因此，只需维护两个树状数组：

1. `tr1[j]` 维护 $D[j]$ 的前缀和。
2. `tr2[j]` 维护 $j \cdot D[j]$ 的前缀和。

### 2.2 二维树状数组 (2D BIT)

对于 $N \times M$ 矩阵，单点更新与区域查询的复杂度均为 $O(\log N \log M)$。

- **Update(x, y, v)**: 双重循环按 $\text{lowbit}$ 向上。
- **Query(x, y)**: 双重循环按 $\text{lowbit}$ 向下（容斥原理同二维前缀和）。

---

## 3. 教材化例题与解析

### 例题 1：逆序对统计 (动态权值)

<details>
<summary>Check Solution</summary>

**题目描述**：给定序列，求满足 $i < j$ 且 $A[i] > A[j]$ 的对数。
**解析**：从后往前遍历，将数值插入权值树状数组，查询当前已插入的数中小于 $A[i]$ 的数量。

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

const int N = 500010;
int n, a[N], tr[N];
vector<int> nums;

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
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
        nums.push_back(a[i]);
    }
    sort(nums.begin(), nums.end());
    nums.erase(unique(nums.begin(), nums.end()), nums.end());

    long long ans = 0;
    for (int i = n - 1; i >= 0; i--) {
        int x = lower_bound(nums.begin(), nums.end(), a[i]) - nums.begin() + 1;
        ans += query(x - 1);
        add(x, 1);
    }
    printf("%lld\n", ans);
    return 0;
}
```

</details>

### 例题 2：区间修改与区间和 (差分原理)

<details>
<summary>Check Solution</summary>

**题目描述**：支持区间 $[l, r]$ 加 $v$，查询区间 $[l, r]$ 的和。

```cpp
typedef long long LL;
LL t1[N], t2[N];
int n;

void add(LL tr[], int x, LL v) {
    for (int i = x; i <= n; i += lowbit(i)) tr[i] += v;
}

LL query(LL tr[], int x) {
    LL res = 0;
    for (int i = x; i; i -= lowbit(i)) res += tr[i];
    return res;
}

LL sum(int x) {
    return query(t1, x) * (x + 1) - query(t2, x);
}

void range_add(int l, int r, LL v) {
    add(t1, l, v); add(t1, r + 1, -v);
    add(t2, l, (LL)l * v); add(t2, r + 1, (LL)-(r + 1) * v);
}

LL range_query(int l, int r) {
    return sum(r) - sum(l - 1);
}
```

</details>

---

## 4. 综合练习

1. **[树状数组倍增]** 不使用二分，利用倍增在 $O(\log N)$ 内寻找第 $k$ 小的元素。
2. **[二维应用]** 实现一个支持矩形修改、矩形求和的二维树状数组（需维护 4 个 BIT）。
3. **[进阶]** **离散化结合**：处理值域为 $[-10^9, 10^9]$ 的动态逆序对问题。

---

_编者注：树状数组的代码虽然极简，但其背后的二进制分解与差分变换思想极其深刻。在处理加法类区间问题时，它是效率与简洁的终极权衡。_
