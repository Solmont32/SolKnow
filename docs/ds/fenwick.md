---
title: 树状数组 (Fenwick Tree / BIT)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Sigma, Zap, Layers, BoxSelect, Binary, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';

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

### 1.1 Lowbit 函数与单调性证明

定义 $\text{lowbit}(x) = x \mathbin{\&} (-x)$。

**系统化单调性证明 (Monotonicity Proof)**：
- **Update 链单调性**：在 `add(x, v)` 中，索引序列 $x_i$ 满足 $x_{i+1} = x_i + \text{lowbit}(x_i)$。显然 $x_{i+1} > x_i$，且由于 $n$ 有限，该序列在 $O(\log n)$ 步内超过 $n$。
- **Query 链单调性**：在 `query(x)` 中，索引序列 $x_i$ 满足 $x_{i+1} = x_i - \text{lowbit}(x_i)$。显然 $x_{i+1} < x_i$，且 $x_{i+1} \ge 0$。该序列在 $O(\log n)$ 步内收敛至 $0$。

### 1.2 索引映射规则

- **维护区间**: $tr[x]$ 维护的是原数组在半开半闭区间 $(x - \text{lowbit}(x), x]$ 上的和。
- **分治边界验证**: 任何正整数 $x$ 都可以唯一地分解为若干个 $\text{lowbit}$ 区间的并：
  $[1, x] = (x_1 - \text{lowbit}(x_1), x_1] \cup (x_2 - \text{lowbit}(x_2), x_2] \cup \dots$
  其中 $x_{i+1} = x_i - \text{lowbit}(x_i)$。这种分解保证了**无缝覆盖**且**无重叠**。

---

## 2. 进阶：区间维护体系

### 2.1 区间修改，区间查询 (一致性分析)

利用差分数组 $D[i] = A[i] - A[i-1]$：
前缀和 $S[n] = (n+1) \sum D[j] - \sum j \cdot D[j]$。

**区间维护一致性分析**：
为了支持区间操作，必须维护两个独立的 BIT。
1. `tr1` 维护 $D[i]$。
2. `tr2` 维护 $i \cdot D[i]$。
更新区间 $[l, r]$ 加 $v$ 时，需同时更新两个 BIT 的 $l$ 和 $r+1$ 位置，确保推导公式在所有索引处成立。

### 2.2 二维树状数组 (2D BIT)

对于 $N \times M$ 矩阵，单点更新与区域查询的复杂度均为 $O(\log N \log M)$。

---

## 3. 教材化例题与解析

### 例题 1：逆序对统计 (动态权值)
<details>
<summary>Check Solution</summary>

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

### 例题 2：树状数组倍增 (第 K 小)
<details>
<summary>Check Solution</summary>

**核心逻辑**：利用树状数组的二分结构，在 $O(\log N)$ 内寻找前缀和刚好达到 $K$ 的位置。
```cpp
int find_kth(int k) {
    int res = 0, sum = 0;
    for (int i = 1 << 18; i; i >>= 1) { // 假设 n <= 2^18
        if (res + i <= n && sum + tr[res + i] < k) {
            res += i;
            sum += tr[res];
        }
    }
    return res + 1;
}
```
</details>

---

## 4. 综合练习与解答

1. **[区间方差]** 树状数组是否能维护区间方差？
<details>
<summary>Check Solution</summary>

**结论**：可以。
**证明**：方差 $V = \frac{1}{n} \sum a_i^2 - (\bar{a})^2$。只需维护 $\sum a_i$ 和 $\sum a_i^2$ 的前缀和。由于加法满足阿贝尔群性质，树状数组可完美胜任。
```cpp
// 维护两个 BIT: BIT_sum 维护 a[i], BIT_sq_sum 维护 a[i]^2
```
</details>

2. **[二维修改]** 实现支持矩形修改、矩形求和的二维树状数组。
<details>
<summary>Check Solution</summary>

**核心逻辑**：推广一维差分公式。
$S(x, y) = \sum_{i=1}^x \sum_{j=1}^y A(i, j)$
需维护 4 个二维 BIT，分别记录 $D(i, j), i \cdot D(i, j), j \cdot D(i, j), i \cdot j \cdot D(i, j)$。
</details>

---

_编者注：树状数组的代码虽然极简，但其背后的二进制分解与差分变换思想极其深刻。_
