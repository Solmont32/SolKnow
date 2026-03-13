---
title: 二分与三分算法 (Binary & Ternary Search)
sidebar_position: 3
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, Zap, AlertTriangle, Lightbulb, Search, Ruler, ShieldCheck, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

# 二分与三分算法 (Binary & Ternary Search)

<KnowledgeCard 
  title="算法核心范式" 
  icon={Target}
  color="#3b82f6"
>
  二分与三分算法是处理**有序性 (Order)** 与 **凸性 (Convexity)** 问题的核心范式。其本质是通过对决策空间的重复划分，实现搜索复杂度的对数级 ($O(\log n)$) 压缩。
</KnowledgeCard>

---

## 一、 二分算法：单调性与二分性

### 1. 形式化定义与判定原则

设 $D$ 为一个全序集（通常是整数区间 $[L, R]$ 或实数域 $\mathbb{R}$），$P: D \to \{0, 1\}$ 为定义在 $D$ 上的布尔谓词（判定性质）。

**二分性定义 (Bisection Property)**：
若性质 $P$ 在 $D$ 上满足单调性，即满足以下条件之一：
1. **单调递增**：$\forall x, y \in D, x \le y \implies P(x) \le P(y)$
2. **单调递减**：$\forall x, y \in D, x \le y \implies P(x) \ge P(y)$

则称 $P$ 在 $D$ 上具有**二分性**。我们的目标是寻找一个唯一的**分界点 (Boundary Point)** $m \in D$，使得对于所有 $x < m$，$P(x)$ 取一个固定值，而对于所有 $x \ge m$，$P(x)$ 取另一个值。

### 2. 系统化单调性证明 (Monotonicity Proof)

在复杂决策问题中，证明单调性是应用二分的前提。标准逻辑链如下：

1.  **决策变量定义**：明确待求参数 $x$ 的定义域 $D$。
2.  **判定函数构造**：定义 $f(x)$ 为“在参数 $x$ 限制下，原问题是否存在可行解”。
3.  **单调性推导 (Monotonicity Chain)**：
    - **假设**：若参数 $x$ 满足条件（即 $f(x) = 1$）。
    - **推导**：证明对于任意 $x' < x$（或 $x' > x$），由于约束力减弱，原可行解必然仍满足 $x'$ 的约束，故 $f(x') = 1$。
    - **结论**：可行解集在 $D$ 上构成一个连续的子区间，证明了二分性的存在。

---

## 二、 整数二分的离散边界与收敛性分析

整数二分的难点在于离散空间的边界处理。其核心矛盾在于 $mid$ 的取整方向必须与区间的收缩方向（左闭右开或双闭）严格匹配，否则会导致无限循环。

### 1. 寻找性质边界的最小值 (Leftmost 1)
目标：在满足 $check(x) = \text{true}$ 的区间中找到最小的 $x$。

<details>
<summary>收敛逻辑验证</summary>

- **状态转移**：若 $check(mid)$ 为真，说明 $mid$ 可能是答案，且更优解在左侧，故 $r = mid$；否则 $l = mid + 1$。
- **中点选取**：$mid = \lfloor \frac{l+r}{2} \rfloor$。
- **终止性证明**：当 $l=r-1$ 时，$mid = l$。
  - 若 $check(mid)$ 为真，$r=l$，区间变为 $[l, l]$，循环终止。
  - 若 $check(mid)$ 为假，$l=l+1=r$，区间变为 $[r, r]$，循环终止。
  - **结论**：不会出现死循环。

```cpp
int bsearch_min(int l, int r) {
    while (l < r) {
        int mid = l + r >> 1;
        if (check(mid)) r = mid;
        else l = mid + 1;
    }
    return l;
}
```
</details>

### 2. 寻找性质边界的最大值 (Rightmost 1)
目标：在满足 $check(x) = \text{true}$ 的区间中找到最大的 $x$。

<details>
<summary>收敛逻辑验证</summary>

- **状态转移**：若 $check(mid)$ 为真，说明 $mid$ 可能是答案，且更优解在右侧，故 $l = mid$；否则 $r = mid - 1$。
- **中点选取**：$mid = \lceil \frac{l+r}{2} \rceil = \lfloor \frac{l+r+1}{2} \rfloor$。
- **终止性证明**：当 $l=r-1$ 时，若不加 $1$，$mid = l$。若 $check(mid)$ 为真，执行 $l = mid$，区间仍为 $[l, r]$，导致无限死循环。向上取整确保 $mid > l$，从而保证区间在每一轮迭代中严格收缩。

```cpp
int bsearch_max(int l, int r) {
    while (l < r) {
        int mid = l + r + 1 >> 1;
        if (check(mid)) l = mid;
        else r = mid - 1;
    }
    return l;
}
```
</details>

---

## 三、 三分算法：凸性与极值搜索

当函数 $f(x)$ 不具有单调性但具有**单峰性 (Unimodality)** 或 **凸性 (Convexity)** 时，使用三分算法。

### 1. 判定条件：二阶导数符号一致性
函数 $f(x)$ 在 $[L, R]$ 上满足：
$$ \forall x_1 < x_2 < x_3, \quad f(x_2) > \min(f(x_1), f(x_3)) \quad (\text{单峰极大值}) $$

### 2. 渐进收敛分析
取三等分点 $m_1 = l + \frac{r-l}{3}, m_2 = r - \frac{r-l}{3}$。
- 若 $f(m_1) < f(m_2)$，则极大值必不在 $[l, m_1]$。
- **收敛速率**：
  $$ L_{k+1} = \frac{2}{3} L_k \implies L_k = (\frac{2}{3})^k L_0 $$
  复杂度为 $O(\log_{1.5} n)$。虽然常数略大于二分，但在处理非线性能量函数时具有不可替代性。

---

## 四、 时空复杂度渐进分析

### 1. 时间复杂度：$\Theta(\text{Cost}_{\text{check}} \cdot \log \frac{R-L}{\epsilon})$
- 对于整数二分，$\epsilon = 1$，复杂度为 $O(\log N)$。
- 对于实数二分，精度 $\epsilon$ 决定了迭代次数。通常建议固定循环次数（如 100 次），以规避浮点数 $\epsilon$ 的精度陷阱。

### 2. 空间复杂度：$O(1)$
二分算法仅涉及常数个变量的存储，是一种极其高效的**原位 (In-place)** 搜索技术。

---

## 五 : 教材化例题与练习

### 例题 1：进击的奶牛 (最小值最大化)

$N$ 个坐标，放置 $M$ 头牛，使最近两牛间距的最大值。

<details>
<summary>Check Solution</summary>

**1. 单调性证明**：
设 $f(d)$ 为“是否存在一种放置方案使得最近间距 $\ge d$”。
显然，若 $d_1 < d_2$，则 $f(d_2) \implies f(d_1)$（约束变松，原方案仍成立）。函数 $f(d)$ 呈现 `111...11000...0` 的单调分布。

**2. 代码实现**：
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010;
int x[N], n, m;

bool check(int d) {
    int cnt = 1, last = x[0];
    for (int i = 1; i < n; i++) {
        if (x[i] - last >= d) {
            cnt++;
            last = x[i];
        }
    }
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

### 练习 1：实数域二分 - 数的立方根

给定一个实数 $n$，求它的立方根。

<details>
<summary>Check Solution</summary>

**收敛逻辑**：实数二分不需要考虑 $+1$ 问题。
```cpp
#include <iostream>
using namespace std;

int main() {
    double n;
    cin >> n;
    double l = -100, r = 100;
    while (r - l > 1e-8) {
        double mid = (l + r) / 2;
        if (mid * mid * mid >= n) r = mid;
        else l = mid;
    }
    printf("%.6lf\n", l);
    return 0;
}
```
</details>

---

_编者注：二分的灵魂在于“性质的单调性”而非“数据的有序性”。即使在无序数组中，只要能构造出单调的判定函数（如寻找峰值），二分依然无往不利。_
