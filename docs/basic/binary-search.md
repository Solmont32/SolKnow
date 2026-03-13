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

### 2. 系统化决策证明 (Decision Proof)

证明一个问题可二分的标准步骤：

1. **决策空间定义**：确定待求答案的取值范围 $[L, R]$。
2. **性质定义**：定义判定函数 $f(x)$，表示“答案为 $x$ 时是否满足约束”。
3. **单调性推导**：
   - **假设**：若 $f(x)$ 成立，即在约束 $x$ 下存在可行解。
   - **证明**：对于任意 $x' < x$，由于约束变弱，原可行解必然仍满足 $x'$ 的约束，故 $f(x')$ 亦成立。
   - **结论**：可行解集构成 $D$ 的一个前缀，满足二分性。

---

## 二、 整数二分的数学边界与收敛证明

整数二分的难点在于离散空间的边界处理。其核心矛盾在于 $mid$ 的取整方向需与区间收缩方向匹配。

### 1. 模板 A：寻找满足性质的最大值 (Rightmost 1)

区间 $[l, r]$ 划分为 $[l, mid]$ 和 $[mid+1, r]$。若 $check(mid)$ 为真，解在 $[mid, r]$。

**收敛性分析**：
- **公式**：`mid = l + r + 1 >> 1` (向上取整)
- **证明**：若不加 $1$，当 $l = r-1$ 时，`mid = l`。若 $check(mid)$ 成立，执行 `l = mid`，区间仍为 $[l, r]$，导致无限死循环。向上取整确保 $mid > l$，迫使区间收缩。

```cpp
while (l < r) {
    int mid = (l + r + 1) >> 1;
    if (check(mid)) l = mid;
    else r = mid - 1;
}
```

### 2. 模板 B：寻找满足性质的最小值 (Leftmost 1)

若 $check(mid)$ 为真，解在 $[l, mid]$。

**收敛性分析**：
- **公式**：`mid = l + r >> 1` (向下取整)
- **证明**：当 $l = r-1$ 时，`mid = l`。若 $check(mid)$ 成立，执行 `r = mid`，区间变为 $[l, l]$，循环正常终止。

```cpp
while (l < r) {
    int mid = (l + r) >> 1;
    if (check(mid)) r = mid;
    else l = mid + 1;
}
```

---

## 三、 三分算法：凸性与极值寻找

当函数 $f(x)$ 不具有单调性但具有**单峰性 (Unimodality)** 时，使用三分算法。

### 1. 判定条件 (Convexity)
函数 $f(x)$ 在 $[L, R]$ 上先严格递增后严格递减（或反之）。

### 2. 迭代逻辑
取三等分点 $m_1, m_2$：
- 若 $f(m_1) < f(m_2)$，则极大值必在 $[m_1, R]$。
- 若 $f(m_1) > f(m_2)$，则极大值必在 $[L, m_2]$。
- **收敛速度**：每次缩小 $1/3$ 空间。复杂度 $O(\log_{1.5} n)$。

---

## 四、 时空复杂度收敛推导

### 1. 时间复杂度 $O(\log N)$
设初始区间长度为 $L$。每一次迭代后，区间长度变为 $L_{k+1} = L_k / 2$。
经过 $k$ 次迭代，区间长度 $L_k = L / 2^k$。
令 $L / 2^k = 1$，解得 $k = \log_2 L$。
总时间复杂度：$O(\text{Cost}_{check} \cdot \log L)$。

### 2. 实数二分的精度控制
实数二分通常循环固定次数（如 100 次）以获得最高精度（$1/2^{100} \approx 10^{-30}$），避免浮点数 $\epsilon$ 的精度陷阱。

---

## 五、 教材化例题

### 例题 1：进击的奶牛 (最小值最大化)
$N$ 个坐标，放置 $M$ 头牛，使最近两牛间距的最大值。

<details>
<summary>解析与推导</summary>

**1. 决策性证明**：
设 $f(d)$ 为“是否存在一种放置方案使得最近间距 $\ge d$”。
若 $f(d)$ 为真，对于 $d' < d$，原方案中任意两牛距离 $\Delta \ge d > d'$，故 $f(d')$ 必为真。

**2. 代码实现**：
```cpp
bool check(int d) {
    int cnt = 1, last = x[0];
    for (int i = 1; i < n; i++)
        if (x[i] - last >= d) cnt++, last = x[i];
    return cnt >= m;
}
```
</details>

### 例题 2：曲线极值 (三分应用)
求二次函数 $f(x) = ax^2 + bx + c$ 在 $[L, R]$ 上的极值。

<details>
<summary>Check Solution</summary>

```cpp
double l = L, r = R;
for (int i = 0; i < 100; i++) {
    double m1 = l + (r - l) / 3;
    double m2 = r - (r - l) / 3;
    if (f(m1) < f(m2)) l = m1;
    else r = m2;
}
```
</details>

---

_编者注：二分的灵魂在于“性质的单调性”而非“数据的有序性”。即使在无序数组中，只要能构造出单调的判定函数，二分依然无往不利。_
