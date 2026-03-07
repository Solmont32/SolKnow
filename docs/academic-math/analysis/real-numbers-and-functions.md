---
title: 第一章：实数集与函数 (Real Numbers and Functions)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 第一章：实数集与函数

数学分析的研究对象主要是定义在实数集上的函数。为了确保微积分理论的严密性，我们必须首先建立一个完备的实数理论体系。本章将从实数的公理化性质出发，探讨实数集的完备性，并系统地梳理函数的基本性质。

## 一、 实数集及其完备性

实数系 $\mathbb{R}$ 是一个满足全序关系的阿基米德有序域。与有理数集 $\mathbb{Q}$ 不同，实数集最核心的特性在于其 **“完备性”**。

### 1. 实数的有序性与阿基米德性
- **有序性**：对于任意 $a, b \in \mathbb{R}$，必有 $a < b, a = b, a > b$ 三者之一成立。
- **阿基米德性质**：对于任意 $a \in \mathbb{R}$，总存在正整数 $n$ 使得 $n > a$。这一性质保证了实数中不存在“无限大”的数。

### 2. 有界集与确界 (Supremum and Infimum)
设 $S$ 是 $\mathbb{R}$ 的一个子集：
- **上有界**：若存在 $M \in \mathbb{R}$，使得对 $\forall x \in S$，有 $x \le M$，则称 $S$ 为上有界集。
- **上确界 (Supremum)**：最小的上界，记作 $\sup S$。
  - **严格定义**：$\eta = \sup S$ 需满足：
    1. $\forall x \in S, x \le \eta$（$\eta$ 是上界）；
    2. $\forall \epsilon > 0, \exists x_0 \in S$，使得 $x_0 > \eta - \epsilon$（没有比 $\eta$ 更小的上界）。

### 3. 确界存在定理 (Completeness Axiom)
**定理表述**：非空上有界实数集必有上确界；非空下有界实数集必有下确界。
确界存在定理是实数完备性的六大等价命题之一（其他包括单调有界原理、区间套定理、有限覆盖定理等）。它是整个数学分析大厦的地基。

<KnowledgeCard type="tip" title="确界与最值的区别">
上确界 $\sup S$ 不一定属于集合 $S$（例如开区间 $(0, 1)$ 的上确界是 1，但 $1 \notin (0, 1)$）；而最大值 $\max S$ 必须属于集合 $S$。
</KnowledgeCard>

---

## 二、 绝对值与不等式分析

在分析学中，绝对值是衡量“接近程度”的核心工具。

### 1. 绝对值的定义与几何意义
$|x|$ 表示数轴上点 $x$ 到原点的距离。
- 性质：$|x| < a \iff -a < x < a$。

### 2. 三角不等式 (Triangle Inequality)
这是分析学中最基础、使用频率最高的引理：
- **基本形式**：$|a + b| \le |a| + |b|$。
- **左侧放缩**：$||a| - |b|| \le |a - b|$。
- **推广形式**：$|a - c| \le |a - b| + |b - c|$。

---

## 三、 函数概念的深化

### 1. 映射与函数的现代定义
函数 $f: D \to \mathbb{R}$ 是从定义域 $D$ 到值域 $R$ 的一种规则，使得对于每一个 $x \in D$，有唯一的 $y \in R$ 对应。

### 2. 函数的四大基本性质
1. **有界性 (Boundedness)**：
   若 $\exists M > 0$，使得 $\forall x \in D, |f(x)| \le M$，则称 $f(x)$ 为有界函数。
2. **单调性 (Monotonicity)**：
   - 增函数：$x_1 < x_2 \implies f(x_1) \le f(x_2)$。
   - 严格增函数：$x_1 < x_2 \implies f(x_1) < f(x_2)$。
3. **奇偶性 (Parity)**：
   - 偶函数：$f(-x) = f(x)$，关于 $y$ 轴对称。
   - 奇函数：$f(-x) = -f(x)$，关于原点对称。
4. **周期性 (Periodicity)**：
   若存在 $T \neq 0$，使得 $f(x+T) = f(x)$ 恒成立。

---

## 四、 深度实战解析

### 练习 1：确界定义的严密证明
设 $A, B$ 为非空上有界集，$C = \{a+b | a \in A, b \in B\}$。证明 $\sup C = \sup A + \sup B$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
我们要证明 $\eta_C = \eta_A + \eta_B$。

**第一步：证明 $\eta_A + \eta_B$ 是 $C$ 的一个上界**
对于任意 $c \in C$，存在 $a \in A, b \in B$ 使得 $c = a + b$。
由于 $a \le \sup A, b \le \sup B$，故 $c = a + b \le \sup A + \sup B$。
所以 $\eta_A + \eta_B$ 是 $C$ 的上界。

**第二步：证明它是最小上界**
对于任意给定的 $\epsilon > 0$：
由上确界定义，对于 $A$，存在 $a_0 \in A$ 使得 $a_0 > \sup A - \frac{\epsilon}{2}$。
对于 $B$，存在 $b_0 \in B$ 使得 $b_0 > \sup B - \frac{\epsilon}{2}$。
则存在 $c_0 = a_0 + b_0 \in C$，满足：
$$c_0 = a_0 + b_0 > (\sup A - \frac{\epsilon}{2}) + (\sup B - \frac{\epsilon}{2}) = (\sup A + \sup B) - \epsilon$$
根据上确界的第二条定义，$\sup A + \sup B$ 是 $C$ 的最小上界。

#### 答案
证毕。
</details>

### 练习 2：绝对值不等式的综合应用
已知 $|x - a| < \epsilon, |y - b| < \epsilon$。证明 $|xy - ab| < \epsilon(|a| + |b| + \epsilon)$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
这是分析学中常见的“加项减项”技巧。

1. **构造中间项**：
   $|xy - ab| = |xy - ay + ay - ab|$
2. **应用三角不等式**：
   $|xy - ay + ay - ab| \le |xy - ay| + |ay - ab| = |y||x - a| + |a||y - b|$
3. **利用已知条件放缩**：
   由于 $|x - a| < \epsilon, |y - b| < \epsilon$，且由 $|y - b| < \epsilon \implies |y| < |b| + \epsilon$。
4. **代入不等式**：
   $|xy - ab| < (|b| + \epsilon) \cdot \epsilon + |a| \cdot \epsilon$
   $= \epsilon(|b| + \epsilon + |a|) = \epsilon(|a| + |b| + \epsilon)$

#### 答案
证毕。
</details>

---
*编者注：本章基于华东师范大学版《数学分析》第一章。实数完备性是后续研究收敛性、连续性的灵魂，请务必反复研读确界存在定理。*
