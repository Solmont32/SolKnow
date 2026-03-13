---
title: 二分与三分算法 (Binary & Ternary Search)
sidebar_position: 3
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, Zap, AlertTriangle, Lightbulb, Search, Ruler, ShieldCheck, TrendingUp, ChevronRight, Binary, CheckCircle2 } from 'lucide-react';
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

## 一、 二分算法：二分性与单调性证明

### 1. 二分性定义 (Bisection Property)

设 $D$ 为一个全序集，$P: D \to \{0, 1\}$ 为定义在 $D$ 上的布尔谓词。

**定理 (二分性判定)**：
若存在 $m \in D$，使得 $\forall x < m, P(x) = v_1$ 且 $\forall x \ge m, P(x) = v_2$ ($v_1 \neq v_2$)，则称 $P$ 在 $D$ 上具有二分性。二分算法的目标即是在 $O(\log |D|)$ 时间内找到该分界点 $m$。

### 2. 系统化单调性证明范式

在实际建模中，我们需要证明谓词 $P(x)$ 的单调性以确保二分性的成立：

- **直接证明法**：证明若 $P(x)$ 为真，则对于所有 $x' > x$，$P(x')$ 亦为真。
- **资源单调性**：证明若花费 $x$ 资源能达成目标，则花费 $x+1$ 资源必然也能达成目标。
- **贡献单调性**：证明随着自变量 $x$ 增加，其对目标的贡献是单调非减的。

<KnowledgeCard type="warning" title="超越单调性：局部二分性">
二分算法的本质是**二分性**。即使谓词 $P$ 不全局单调，只要我们能根据局部性质判定答案所在的一侧，二分依然有效。
*典型案例：寻找山峰元素 —— 数组无序，但利用 $a[i] < a[i+1]$ 这一局部性质可引导搜索方向。*
</KnowledgeCard>

---

## 二、 整数二分的收敛性分析与正确性证明

### 1. 算法正确性的形式化证明 (Floyd-Hoare Logic)

对于寻找满足 $P(x)$ 的**最小**整数 $x$ 的算法，其正确性由以下三个要素支撑：

- **初始化 (Initialization)**：初始区间 $[l, r]$ 必须包含目标解。
- **保持 (Maintenance)**：若 $P(mid)$ 为真，则目标解 $\le mid$，更新 $r = mid$；否则目标解 $> mid$，更新 $l = mid + 1$。无论哪种情况，目标解始终保持在 $[l, r]$ 内。
- **终止 (Termination)**：每次迭代后区间长度 $L_{new} \le \lceil L_{old}/2 \rceil$。由于 $L$ 是正整数序列且严格递减，算法必将在 $L=1$ 即 $l=r$ 时终止。

### 2. 收敛速度与复杂度分析

二分搜索是一个典型的**对数时间算法**。
设初始空间大小为 $N$，第 $k$ 次迭代后的空间大小为 $N_k = N/2^k$。
当 $N_k = 1$ 时，迭代停止：
$$ \frac{N}{2^k} = 1 \implies k = \log_2 N $$
这意味着无论数据量如何翻倍，搜索次数仅线性增长。这在计算机科学中被视为“近乎常数级”的高效。

### 3. 边界处理：防止死循环的数学原理

在整数除法 `(l+r)/2` 默认下取整的机制下：

| 类型 | 目标区间更新 | `mid` 计算 | 关键逻辑 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **左边界型** | $r=mid, l=mid+1$ | `l + r >> 1` | 保持 $r$ 指向合法解 | 寻找第一个满足 $P$ 的位置 |
| **右边界型** | $l=mid, r=mid-1$ | `l + r + 1 >> 1` | 保持 $l$ 指向合法解 | 寻找最后一个满足 $P$ 的位置 |

**死循环证明**：当 $l = r-1$ 时，若使用下取整 `mid = l`。若执行 `l = mid`，则 $l$ 保持不变，区间 $[l, r]$ 无法收敛。因此**右边界型二分必须上取整** `(l+r+1)/2`。

---

## 三、 实数二分与三分：精度与收敛分析

### 1. 实数二分的精度控制

实数二分不存在整数边界问题，但面临浮点数精度限制。常用的两种停止准则：
- **固定精度**：`while (r - l > eps)`。通常 $eps$ 取 $10^{-k-2}$（若要求保留 $k$ 位小数）。
- **固定次数**：`for (int i = 0; i < 100; i++)`。迭代 100 次可将区间缩小 $2^{100} \approx 10^{30}$ 倍，足以应对绝大多数工程与竞赛需求。

### 2. 三分算法：凸性与极值搜索

对于单峰（或单谷）函数，三分法利用两个采样点 $m_1, m_2$ 排除 $1/3$ 的搜索空间。

**收敛分析**：
$$ L_k = \left(\frac{2}{3}\right)^k L_0 $$
由于 $2/3 > 1/2$，三分法的收敛速度略慢于二分法。在 $O(1)$ 的函数评估成本下，二分导数（若可求导）通常优于三分。

---

## 四、 教材化例题

### 例题 1：寻找峰值 (Peak Finding)
给定一个相邻元素不相等的数组，找到任意一个局部峰值 $a[i-1] < a[i] > a[i+1]$。

<details>
<summary>决策推导与严密证明</summary>

**单调性证明（局部）**：
考虑 $mid$ 与 $mid+1$ 的关系。
1. 若 $a[mid] < a[mid+1]$，说明 $mid$ 处于上升段，且由于数组边界为 $-\infty$，右侧一定存在峰值。
2. 若 $a[mid] > a[mid+1]$，说明 $mid$ 处于下降段，左侧一定存在峰值。
**二分性**：基于局部斜率引导搜索，单向收敛。

```cpp
int findPeakElement(vector<int>& nums) {
    int l = 0, r = nums.size() - 1;
    while (l < r) {
        int mid = l + r >> 1; // 下取整
        if (nums[mid] < nums[mid + 1]) l = mid + 1; // 峰值在右侧
        else r = mid; // 峰值在左侧（含mid）
    }
    return l;
}
```
</details>

### 例题 2：进击的奶牛 (Aggressive Cows)
$N$ 个牛舍在一条直线上，坐标为 $x_i$。安置 $C$ 头牛，使它们之间的最近距离最大。

<details>
<summary>判定性构造与单调性证明</summary>

**1. 谓词定义**：$P(d)$ 表示是否存在一种方案，使所有相邻牛的距离 $\ge d$。
**2. 单调性证明**：若 $d$ 合法，则对于任意 $d' < d$，显然也合法。$P(d)$ 在定义域上单调。
**3. 判定函数 (Check)**：贪心放置。从第一间牛舍开始，每隔至少 $d$ 距离放置一头牛。

```cpp
bool check(int d, vector<int>& x, int c) {
    int cnt = 1, last = x[0];
    for (int i = 1; i < x.size(); i++) {
        if (x[i] - last >= d) {
            cnt++;
            last = x[i];
        }
    }
    return cnt >= c;
}

int main() {
    sort(x.begin(), x.end());
    int l = 0, r = 1e9;
    while (l < r) {
        int mid = l + r + 1 >> 1; // 右边界型二分
        if (check(mid, x, c)) l = mid;
        else r = mid - 1;
    }
    cout << l << endl;
}
```
</details>

---

## 五、 综合练习库

### 练习 1：旋转排序数组中的最小值
一个升序数组被旋转（如 `[4,5,6,7,0,1,2]`）。找到其中最小值。

<details>
<summary>Check Solution</summary>

**二分性证明**：
比较 `nums[mid]` 与 `nums[r]`。
1. 若 `nums[mid] < nums[r]`，说明右半段有序且最小值在左侧（含 $mid$）。
2. 若 `nums[mid] > nums[r]`，说明最小值在右侧且 $mid$ 不是最小值。

```cpp
int findMin(vector<int>& nums) {
    int l = 0, r = nums.size() - 1;
    while (l < r) {
        int mid = l + r >> 1;
        if (nums[mid] < nums[r]) r = mid;
        else l = mid + 1;
    }
    return nums[l];
}
```
</details>

### 练习 2：砍树 (EKO)
$N$ 棵树高度 $H_i$，需得到 $M$ 米木材。锯片高度设为 $H$，求最大 $H$。

<details>
<summary>Check Solution</summary>

**单调性**：$H$ 越低，木材越多。
```cpp
long long get_wood(int h, vector<int>& trees) {
    long long sum = 0;
    for (int t : trees) if (t > h) sum += t - h;
    return sum;
}

// 二分 H
int l = 0, r = 1e9;
while (l < r) {
    int mid = l + r + 1 >> 1;
    if (get_wood(mid, trees) >= M) l = mid;
    else r = mid - 1;
}
```
</details>

### 练习 3：寻找实数极值 (三分法)
求 $f(x) = x^4 - 2x^2 + 5$ 在 $[0, 2]$ 上的最小值。

<details>
<summary>Check Solution</summary>

```cpp
double l = 0, r = 2;
for (int i = 0; i < 100; i++) {
    double m1 = l + (r - l) / 3;
    double m2 = r - (r - l) / 3;
    if (f(m1) < f(m2)) r = m2;
    else l = m1;
}
printf("%.10f\n", f(l));
```
</details>

---

_编者注：二分搜索的精髓在于“审判”。每一次 check 都是对真理边界的一次剥离。如果你无法证明单调性，请寻找局部二分性。_
