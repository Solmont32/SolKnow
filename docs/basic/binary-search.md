---
title: 二分与三分算法 (Binary & Ternary Search)
sidebar_position: 3
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, Zap, AlertTriangle, Lightbulb, Search, Ruler } from 'lucide-react';

# 二分与三分算法 (Binary & Ternary Search)

二分与三分算法是处理**有序性（Order）**与**凸性（Convexity）**问题的核心范式。其本质是通过对决策空间的重复划分，实现搜索复杂度的对数级（$O(\log n)$）压缩。

---

## 一、 二分算法：单调性与二分性

### 1. 形式化定义与判定
设 $D$ 为一个全序集（通常是整数区间或实数区间），$P: D \to \{0, 1\}$ 为定义在 $D$ 上的判定性质。

**二分性定义**：
若性质 $P$ 在 $D$ 上满足：
$$ \exists m \in D, \left( \forall x \le m, P(x) = 1 \right) \land \left( \forall x > m, P(x) = 0 \right) $$
则称 $P$ 在 $D$ 上具有**二分性**。我们的目标是寻找该分界点 $m$ 或 $m+1$。

### 2. 系统化单调性证明 (Monotonicity Proof)
要证明一个问题可以使用二分，必须证明其判定函数 $P(x)$ 具有单调性。

**证明框架**：
1. **假设**：设 $x$ 是一个可行解，即 $P(x) = \text{true}$。
2. **推导**：证明对于任意 $x' < x$（或 $x' > x$），其性质 $P(x')$ 依然成立。
3. **结论**：若该推导成立，则可行解集构成 $D$ 的一个前缀或后缀，即满足二分性。

<KnowledgeCard type="info" title="数学本质">
二分的本质不是“查找元素”，而是“寻找性质的分界点”。即使数组无序，只要性质 $P(x)$ 在搜索空间上具有 $[1,1,\dots,1,0,0,\dots,0]$ 的分布，即可二分。
</KnowledgeCard>

---

## 二、 整数二分的数学边界 (防死循环指南)

整数二分的难点在于边界处理。其核心矛盾在于：`mid` 是向下取整还是向上取整。

### 1. 模板 A：寻找左侧分界点（满足性质的最大 $x$）
区间从 $[l, r]$ 划分为 $[l, mid]$ 和 $[mid+1, r]$（若 $mid$ 满足性质，解在 $[mid, r]$）。
- **数学纠偏**：当 $l = r-1$ 时，若使用 `mid = (l+r)/2`，则 $mid = l$。若 `check` 成功执行 `l = mid`，区间仍为 $[l, r]$，陷入死循环。
- **解决方案**：`mid = (l + r + 1) >> 1`（向上取整）。

```cpp
while (l < r) {
    int mid = l + r + 1 >> 1;
    if (check(mid)) l = mid;
    else r = mid - 1;
}
```

### 2. 模板 B：寻找右侧分界点（满足性质的最小 $x$）
区间划分为 $[l, mid]$ 和 $[mid+1, r]$（若 $mid$ 满足性质，解在 $[l, mid]$）。
- **逻辑**：执行 `r = mid`。
- **解决方案**：`mid = (l + r) >> 1`（向下取整）。

```cpp
while (l < r) {
    int mid = l + r >> 1;
    if (check(mid)) r = mid;
    else l = mid + 1;
}
```

---

## 三、 算法性能分析 (Complexity)

| 维度 | 整数二分 | 实数二分 | 三分搜索 |
| :--- | :--- | :--- | :--- |
| **时间复杂度** | $O(\log(R-L) \cdot T_{check})$ | $O(\log(\frac{R-L}{\epsilon}) \cdot T_{check})$ | $O(\log_{1.5}(R-L) \cdot T_{f})$ |
| **空间复杂度** | $O(1)$ | $O(1)$ | $O(1)$ |
| **收敛速度** | 每次减少 $1/2$ | 每次减少 $1/2$ | 每次减少 $1/3$ |

---

## 四、 教材化例题

### 例题 1：进击的奶牛 (最小值最大化)
$N$ 个坐标，放置 $M$ 头牛，使最近两牛间距的最大值。

<details>
<summary>解析与推导</summary>

**1. 单调性证明**：
若间距 $d$ 下能放下 $M$ 头牛，则对于任意 $d' < d$，显然也能放下 $M$ 头牛。性质满足二分性。

**2. Check 函数实现 ($O(n)$)**：
贪心放置，第一头放在 $x_0$，之后每头放在距离前一头至少为 $d$ 的第一个坐标。

**3. 代码实现**：
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010;
int x[N], n, m;

bool check(int d) {
    int cnt = 1, last = x[0];
    for (int i = 1; i < n; i++)
        if (x[i] - last >= d) cnt++, last = x[i];
    return cnt >= m;
}

int main() {
    scanf("%d%d", &n, &m);
    for (int i = 0; i < n; i++) scanf("%d", &x[i]);
    sort(x, x + n);
    int l = 0, r = 1e9;
    while (l < r) {
        int mid = l + r + 1 >> 1;
        if (check(mid)) l = mid;
        else r = mid - 1;
    }
    printf("%d\n", l);
    return 0;
}
```
</details>

---

## 五、 综合练习库

### 练习 1：数的范围 (基础模板)
给定升序数组，查询 $k$ 的起始与终止位置。
<details>
<summary>Check Solution</summary>

```cpp
// 寻找第一个 >= x 的位置
int l = 0, r = n - 1;
while (l < r) {
    int mid = l + r >> 1;
    if (a[mid] >= x) r = mid;
    else l = mid + 1;
}
// 寻找最后一个 <= x 的位置
int l2 = 0, r2 = n - 1;
while (l2 < r2) {
    int mid = l2 + r2 + 1 >> 1;
    if (a[mid] <= x) l2 = mid;
    else r2 = mid - 1;
}
```
</details>

### 练习 2：最佳牛围栏 (二分 + 前缀和边界分析)
长度 $\ge L$ 的子段，最大平均值。
<details>
<summary>Check Solution</summary>

**策略**：二分平均值 $avg$，判断是否存在 $\sum (a_i - avg) \ge 0$。
**关键推导**：维护 $S_i = \sum_{j=1}^i (a_j - avg)$，寻找 $S_j - \min_{k \le j-L} S_k \ge 0$。

```cpp
bool check(double avg) {
    for (int i = 1; i <= n; i++) s[i] = s[i-1] + a[i] - avg;
    double minv = 0;
    for (int i = L; i <= n; i++) {
        minv = min(minv, s[i-L]);
        if (s[i] >= minv) return true;
    }
    return false;
}
```
</details>

---

_编者注：二分是“缩小确定性的范围”，而三分是“排除不可能的区域”。掌握这两者，便掌握了高效检索决策空间的精髓。_
