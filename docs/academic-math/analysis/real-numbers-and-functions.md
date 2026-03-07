---
title: 实数集与函数 (Real Number System & Functions)
description: 从公理化视角深度理解数学分析的基石
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 第一章 实数集与函数：数学分析的基石

> **零基础视角**：如果数学是一座大厦，实数系就是地基。没有实数的“连续性”，极限和导数将失去意义。本章将从严格的公理化视角，重新审视我们在初等数学中习以为常的数集与映射。

## 1. 核心理论：确界原理 (The Supremum Principle)

实数系与有理数系最本质的区别在于**完备性**（即没有“缝隙”）。确界原理是描述这种完备性的核心命题。

### 1.1 定义与基本性质
设 $S$ 为一个非空数集。
- **上确界 (Supremum)**：若数 $\beta$ 满足：
  1. 对任意 $x \in S$，有 $x \leq \beta$（$\beta$ 是上界）。
  2. 对任意 $\epsilon > 0$，存在 $x_0 \in S$，使得 $x_0 > \beta - \epsilon$（$\beta$ 是最小上界）。
  记作 $\beta = \sup S$。
- **下确界 (Infimum)**：同理定义 $\alpha = \inf S$。

### 1.2 确界存在定理的严格证明 (Strict Proof)

<KnowledgeCard type="warning" title="定理 (确界存在定理)">
非空有上界的数集必有上确界。
</KnowledgeCard>

**证明思路 (基于戴德金分割公理)：**
设 $S$ 是非空有上界的数集。我们构造一个实数集的分割 $(A, B)$：
1. 令 $B = \{ y \in \mathbb{R} \mid y \text{ 是 } S \text{ 的一个上界} \}$。由于 $S$ 有上界，故 $B \neq \emptyset$。
2. 令 $A = \{ x \in \mathbb{R} \mid x \text{ 不是 } S \text{ 的上界} \}$。由于 $S$ 非空，取 $s \in S$，则 $s-1 \in A$，故 $A \neq \emptyset$。
3. 易证 $A \cup B = \mathbb{R}$ 且对任意 $a \in A, b \in B$ 有 $a < b$。

根据 **戴德金定理**，存在唯一的实数 $\xi$，使得对任意 $a \in A, b \in B$，有 $a \leq \xi \leq b$。
- **验证 $\xi$ 是上确界**：
  - 对任意 $s \in S$，由于 $s$ 的任何上界 $b$ 满足 $s \leq b$，根据 $\xi$ 的定义，$\xi$ 是 $B$ 的下界，即 $\xi \leq b$。实际上可以证明 $\xi$ 也是 $S$ 的一个上界（若存在 $s_0 > \xi$，则可在 $(\xi, s_0)$ 中取一数 $a \in A$，产生矛盾）。
  - 对任意 $\epsilon > 0$，$\xi - \epsilon < \xi$，故 $\xi - \epsilon \in A$。根据 $A$ 的定义，$\xi - \epsilon$ 不是 $S$ 的上界，即存在 $x_0 \in S$ 使得 $x_0 > \xi - \epsilon$。
  
证毕。$\square$

---

## 2. 复合函数：分解、判定与应用

在复杂系统的建模中，函数往往不是单一的，而是多个环节的嵌套。

### 2.1 复合的判定准则
设 $y = f(u), u = g(x)$。要使复合函数 $f \circ g$ 有意义，必须满足：
**$g$ 的值域 $R_g$ 与 $f$ 的定义域 $D_f$ 的交集非空**，即 $R_g \cap D_f \neq \emptyset$。

<KnowledgeCard type="info" title="工业实战：函数分解">
将复杂函数分解为初等函数，是求导、求极限的第一步。
例：$y = \sqrt{\ln(\sin x)}$
1. $y = \sqrt{u}$
2. $u = \ln v$
3. $v = \sin x$
判定：需满足 $\sin x > 0$（使 $\ln v$ 有意义）且 $\ln(\sin x) \geq 0$（使 $\sqrt{u}$ 有意义）。
</KnowledgeCard>

---

## 3. 反函数：存在性与严格单调性

### 3.1 存在性定理
若函数 $f: D \to R$ 是**严格单调**的，则 $f$ 必存在反函数 $f^{-1}: R \to D$，且 $f^{-1}$ 在其定义域上也是严格单调的。

### 3.2 实战例题：超越函数的反函数
**例**：证明 $f(x) = x + e^x$ 在 $\mathbb{R}$ 上存在反函数。
**解析**：
1. **单调性检查**：由于 $f'(x) = 1 + e^x > 0$，函数在 $\mathbb{R}$ 上严格单调递增。
2. **值域检查**：当 $x \to -\infty$ 时，$f(x) \to -\infty$；当 $x \to +\infty$ 时，$f(x) \to +\infty$。故 $R_f = \mathbb{R}$。
3. **结论**：反函数 $f^{-1}$ 存在且定义域为 $\mathbb{R}$。

---

## 4. 典型例题 (Mastery Examples)

### 例 1：确界定义的灵活应用
设 $A, B$ 为有界非空数集，定义 $A + B = \{ a+b \mid a \in A, b \in B \}$。
证明：$\sup(A+B) = \sup A + \sup B$。

**证明：**
1. **上界证明**：对任意 $a+b \in A+B$，由 $a \leq \sup A, b \leq \sup B \implies a+b \leq \sup A + \sup B$。
2. **最小性证明**：对任意 $\epsilon > 0$，存在 $a_0 \in A, b_0 \in B$ 使得 $a_0 > \sup A - \epsilon/2, b_0 > \sup B - \epsilon/2$。
   则 $a_0 + b_0 > (\sup A + \sup B) - \epsilon$。
   得证。$\square$

---

## 5. 练习库入口 (Exercises)

本章相关的深度练习已同步至练习库：
- [实数系完备性深度推导](/docs/exercises/math/real-analysis-basic)
- [复合函数定义域判定专项](/docs/exercises/math/composition-practice)
- [反函数与初等函数性质实战](/docs/exercises/math/inverse-functions)

---

## 🚀 延伸思考
- **阿基米德性质**：为什么实数集里没有“无穷大”的数？
- **有理数的稠密性**：任意两个实数之间是否一定存在有理数？
- **复合函数的陷阱**：为什么 $\sqrt{x^2}$ 和 $(\sqrt{x})^2$ 不是同一个函数？
