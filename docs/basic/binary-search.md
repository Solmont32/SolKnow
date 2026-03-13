---
title: 二分与三分算法 (Binary & Ternary Search)
sidebar_position: 3
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, Zap, AlertTriangle, Lightbulb, Search, Ruler, ShieldCheck, TrendingUp, ChevronRight, Binary } from 'lucide-react';
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

设 $D$ 为一个全序集，$P: D \to \{0, 1\}$ 为定义在 $D$ 上的布尔谓词。

**二分性定义 (Bisection Property)**：
若存在 $m \in D$，使得 $\forall x < m, P(x) = v_1$ 且 $\forall x \ge m, P(x) = v_2$ ($v_1 \neq v_2$)，则称 $P$ 在 $D$ 上具有二分性。

<KnowledgeCard type="warning" title="超越单调性">
二分算法的本质是**二分性**而非单调性。即使谓词 $P$ 不单调，只要我们能构造一个局部判定准则来排除一半区间，二分依然有效。
*典型案例：寻找山峰元素 (Peak Finding) —— 数组无序，但 $a[i] < a[i+1]$ 这一局部性质引导我们走向山峰。*
</KnowledgeCard>

---

## 二、 整数二分的离散边界与收敛性分析

### 1. 循环不变式 (Loop Invariant) 证明

对于寻找左边界（最小值）的二分：
- **不变式**：答案一定在闭区间 $[l, r]$ 内。
- **初始**：$l=L, r=R$，显然成立。
- **迭代**：
  - 若 $check(mid)$ 为真，则 $mid$ 及其左侧可能存在答案，但 $mid$ 右侧一定不是**最小**答案，故 $r=mid$。
  - 若 $check(mid)$ 为假，则 $mid$ 及其左侧一定不是答案，故 $l=mid+1$。
- **终止**：当 $l=r$ 时，区间缩小为一点，由不变式知该点即为答案。

### 2. 边界处理：防止死循环的数学原理

在整数除法 `(l+r)/2` 默认下取整的机制下：
- **场景 A**：$l = mid + 1, r = mid$。当 $l=r-1$ 时，$mid=l$。执行后区间变为 $[l+1, r]$ 或 $[l, l]$，区间长度严格减小，收敛。
- **场景 B**：$l = mid, r = mid - 1$。当 $l=r-1$ 时，$mid=l$。若执行 $l=mid$，区间仍为 $[l, r]$，**陷入死循环**。
- **对策**：场景 B 必须使用上取整 `mid = (l+r+1)/2`。

---

## 三、 三分算法：凸性与极值搜索

### 1. 渐进收敛分析
取三等分点 $m_1, m_2$。每次迭代排除 $1/3$ 的决策空间。
$$ L_k = (2/3)^k L_0 \implies k = \log_{1.5} (L_0/\epsilon) $$

<KnowledgeCard type="info" title="黄金分割搜索 (Golden Section Search)">
通过取 $m_1, m_2$ 为黄金分割点，可以复用上一次迭代的计算结果，将每次迭代的函数评估次数从 2 次降为 1 次，是三分算法的工业级优化。
</KnowledgeCard>

---

## 四 : 教材化例题与练习

### 例题 1：寻找峰值 (非单调二分)
给定一个无序数组，相邻元素不相等，找到任意一个峰值（大于左右相邻元素）。

<details>
<summary>Check Solution</summary>

**局部二分性推导**：
考虑 $mid$ 与 $mid+1$ 的关系：
1. 若 $a[mid] < a[mid+1]$，说明右侧一定存在一个峰值（因为数组边界可视为 $-\infty$）。
2. 若 $a[mid] > a[mid+1]$，说明左侧一定存在一个峰值。

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

### 练习 1：传送带上的包裹能力 (判定性构造)
$N$ 个包裹，必须按顺序装载，需在 $D$ 天内运完。求最低运载能力。

<details>
<summary>Check Solution</summary>

**1. 单调性**：运载能力越大，所需天数越少。
**2. 判定函数**：贪心装载，统计天数。
```cpp
bool check(int cap, vector<int>& w, int d) {
    int cnt = 1, sum = 0;
    for (int x : w) {
        if (x > cap) return false;
        if (sum + x > cap) {
            cnt++;
            sum = x;
        } else sum += x;
    }
    return cnt <= d;
}
```
</details>

### 练习 2：三分法求二次函数极值
求 $f(x) = ax^2 + bx + c$ 在 $[L, R]$ 上的最小值。

<details>
<summary>Check Solution</summary>

```cpp
double f(double x) { return a*x*x + b*x + c; }
double l = L, r = R;
for (int i = 0; i < 100; i++) {
    double m1 = l + (r - l) / 3, m2 = r - (r - l) / 3;
    if (f(m1) < f(m2)) r = m2;
    else l = m1;
}
```
</details>

---

_编者注：二分的本质是“减而治之”。每一次 `check` 都是在对未知的决策空间进行一次审判，这种对数级的降维打击是算法效率提升的基石。_
