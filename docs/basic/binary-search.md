---
title: 二分与三分算法 (Binary & Ternary Search)
sidebar_position: 3
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, Zap, AlertTriangle, Lightbulb, Search, Ruler, ShieldCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

# 二分与三分算法 (Binary & Ternary Search)

二分与三分算法是处理**有序性 (Order)** 与 **凸性 (Convexity)** 问题的核心范式。其本质是通过对决策空间的重复划分，实现搜索复杂度的对数级 ($O(\log n)$) 压缩。

---

## 一、 二分算法：单调性与二分性

### 1. 形式化定义与判定

设 $D$ 为一个全序集（通常是整数区间 $[L, R]$ 或实数域），$P: D \to \{0, 1\}$ 为定义在 $D$ 上的判定性质。

**二分性定义 (Bisection Property)**：
若性质 $P$ 在 $D$ 上满足单调性，即：
$$ \exists m \in D, \forall x, y \in D: (x \le y) \implies (P(x) \ge P(y)) $$
则称 $P$ 在 $D$ 上具有**二分性**。我们的目标是寻找该分界点 $m$，使得 $P(m)=1$ 且 $P(m+1)=0$。

### 2. 系统化单调性证明 (Monotonicity Proof)

证明一个问题可二分的标准步骤：

1. **决策空间定义**：确定待求答案的取值范围 $[L, R]$。
2. **性质定义**：定义判定函数 $f(x)$，表示“答案为 $x$ 时是否满足约束”。
3. **单调性推导**：
   - **假设**：若 $f(x)$ 成立，即在约束 $x$ 下存在可行解。
   - **证明**：对于任意 $x' < x$，由于约束变弱，原可行解必然仍满足 $x'$ 的约束，故 $f(x')$ 亦成立。
   - **结论**：可行解集构成 $D$ 的一个前缀，满足二分性。

<KnowledgeCard type="success" title="证明范式">
在“最小值最大化”或“最大值最小化”问题中，单调性通常源于**资源约束的松紧程度**。
</KnowledgeCard>

---

## 二、 整数二分的数学边界与收敛证明

整数二分的难点在于离散空间的边界处理。其核心矛盾在于 $mid$ 的取整方向需与区间收缩方向匹配。

### 1. 模板 A：寻找满足性质的最大值 (Rightmost 1)

区间 $[l, r]$ 划分为 $[l, mid]$ 和 $[mid+1, r]$。若 $check(mid)$ 为真，解在 $[mid, r]$。

**收敛性分析**：

- **公式**：`mid = l + r + 1 >> 1` (向上取整)
- **正确性证明**：若不加 $1$，当 $l = r-1$ 时，`mid = l`。若 $check(mid)$ 成立，执行 `l = mid`，区间仍为 $[l, r]$，导致无限死循环。向上取整确保 $mid > l$，迫使区间收缩。

```cpp
while (l < r) {
    int mid = l + r + 1 >> 1;
    if (check(mid)) l = mid;
    else r = mid - 1;
}
```

### 2. 模板 B：寻找满足性质的最小值 (Leftmost 1)

若 $check(mid)$ 为真，解在 $[l, mid]$。

**收敛性分析**：

- **公式**：`mid = l + r >> 1` (向下取整)
- **正确性证明**：当 $l = r-1$ 时，`mid = l`。若 $check(mid)$ 成立，执行 `r = mid`，区间变为 $[l, l]$，循环正常终止。

```cpp
while (l < r) {
    int mid = l + r >> 1;
    if (check(mid)) r = mid;
    else l = mid + 1;
}
```

---

## 三、 时空复杂度收敛推导

### 1. 时间复杂度 $O(\log N)$

设初始区间长度为 $L = R - L_0$。每一次迭代后，区间长度变为：
$$ L*{k+1} = \lceil L_k / 2 \rceil $$
经过 $k$ 次迭代，区间长度 $L_k \approx L / 2^k$。
令 $L / 2^k = 1$，解得 $k = \log_2 L$。
总时间复杂度：$O(\text{Cost}*{check} \cdot \log(R-L))$。

### 2. 实数二分的精度控制

实数二分不涉及边界取整，但需注意精度 $\epsilon$。通常循环次数固定（如 100 次）比判断 `r - l > eps` 更稳定，精度可达 $1/2^{100}$。

---

## 四、 教材化例题

### 例题 1：进击的奶牛 (最小值最大化)

$N$ 个坐标，放置 $M$ 头牛，使最近两牛间距的最大值。

<details>
<summary>解析与推导</summary>

**1. 单调性证明**：
设 $f(d)$ 为“是否存在一种放置方案使得最近间距 $\ge d$”。
若 $f(d)$ 为真，对于 $d' < d$，原方案中任意两牛距离 $\Delta \ge d > d'$，故 $f(d')$ 必为真。性质具有单调性。

**2. 复杂度分析**：

- 二分次数：$\log(10^9) \approx 30$ 次。
- Check 函数：$O(N)$ 扫描。
- 总复杂度：$O(N \log X)$。

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

### 练习 1：寻找峰值 (二分在非单调数组的应用)

给定一个山峰数组，寻找任意一个峰值位置 $i$ 使得 $a[i-1] < a[i] > a[i+1]$。

<details>
<summary>Check Solution</summary>

**单调性变体证明**：
虽然全局不单调，但斜率具有二分性。

- 若 $a[mid] < a[mid+1]$，说明右侧必然存在峰值（至少有一个上升趋势）。
- 否则，左侧（包含 $mid$）必然存在峰值。

```cpp
int findPeakElement(vector<int>& nums) {
    int l = 0, r = nums.size() - 1;
    while (l < r) {
        int mid = l + r >> 1;
        if (nums[mid] < nums[mid + 1]) l = mid + 1;
        else r = mid;
    }
    return l;
}
```

</details>

### 练习 2：最佳牛围栏 (二分 + 前缀和边界分析)

长度 $\ge L$ 的子段，最大平均值。

<details>
<summary>Check Solution</summary>

**策略**：二分平均值 $avg$。判定是否存在子段满足 $\frac{\sum_{i=j}^k a[i]}{k-j+1} \ge avg \iff \sum_{i=j}^k (a[i] - avg) \ge 0$。

```cpp
bool check(double avg) {
    for (int i = 1; i <= n; i++) s[i] = s[i-1] + a[i] - avg;
    double minv = 0;
    for (int i = L; i <= n; i++) {
        minv = min(minv, s[i-L]); // 维护 i-L 之前的最小前缀和
        if (s[i] - minv >= 0) return true;
    }
    return false;
}
```

</details>

### 练习 3：分断气球 (最小化最大值)

将气球序列分为 $K$ 段，使每段和的最大值最小。

<details>
<summary>Check Solution</summary>

**收敛推导**：
若最大段和为 $S$ 时能分成 $\le K$ 段，则对于 $S' > S$ 显然也能。

```cpp
bool check(LL limit) {
    LL sum = 0, cnt = 1;
    for (int i = 0; i < n; i++) {
        if (a[i] > limit) return false;
        if (sum + a[i] > limit) {
            cnt++;
            sum = a[i];
        } else sum += a[i];
    }
    return cnt <= k;
}
```

</details>

---

_编者注：二分是“缩小确定性的范围”，其核心在于对“二分性”的深刻洞察。即使数据无序，只要性质可分，二分即存。_
