---
title: 函数连续性：拓扑与分析的汇合 (Continuity)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 函数连续性：拓扑与分析的汇合

连续性不仅是“一笔画”的直观描述，它是分析学中处理紧性、连通性等深刻概念的基础。本章将从局部性质出发，最终推向闭区间连续函数的全局辉煌。

## 一、 连续性的核心理论

### 1. 定义与分类
函数 $f(x)$ 在点 $x_0$ 连续 $\iff \lim_{x \to x_0} f(x) = f(x_0)$。

**间断点的精细分类**：
- **第一类间断点**：左右极限均存在。
  - **可去**：$\lim_{x \to x_0} f(x)$ 存在但不等于 $f(x_0)$。
  - **跳跃**：$f(x_0^+) \neq f(x_0^-)$。
- **第二类间断点**：左右极限至少有一个不存在（震荡或无穷）。

### 2. 闭区间连续函数的全局性质
这是分析学的基石，通常被称为“四大定理”：
1. **有界性定理**：$f \in C[a,b] \implies f$ 在 $[a,b]$ 上有界。
2. **最值定理**：$f \in C[a,b] \implies f$ 必能取到最大值和最小值。
3. **介值定理（Darboux）**：若 $f(a) < C < f(b)$，则 $\exists \xi$ 使 $f(\xi)=C$。
4. **一致连续性定理（Cantor）**：$f \in C[a,b] \implies f$ 在 $[a,b]$ 上一致连续。

---

## 二、 一致连续性深度辨析

一致连续性要求误差控制 $\delta$ 对区间内**所有点**通用，即 $\delta$ 只取决于 $\epsilon$。

<KnowledgeCard type="warning" title="判别准则">
- **导数有界性**：若 $f'(x)$ 在区间 $I$ 上有界，则 $f(x)$ 在 $I$ 上一致连续。
- **端点极限**：若 $f(x)$ 在 $(a,b)$ 连续，且左极限 $f(a^+)$ 和右极限 $f(b^-)$ 都存在，则 $f(x)$ 在 $(a,b)$ 上一致连续。
</KnowledgeCard>

### 常见反例：
- $f(x) = \frac{1}{x}$ 在 $(0,1]$ 上不一致连续（点靠近 0 时变化率趋于无穷）。
- $f(x) = \sin(x^2)$ 在 $[0, \infty)$ 上不一致连续（震荡频率越来越快）。

---

## 三、 深度例题精讲 (Expanded Examples)

### 练习 1：利用零点定理证明根的存在性
证明方程 $x 2^x = 1$ 在 $(0, 1)$ 内恰有一个实根。
<details>
<summary>点击查看解析</summary>
设 $f(x) = x 2^x - 1$。
1. **存在性**：$f(0) = -1 < 0$，$f(1) = 2-1 = 1 > 0$。由零点定理，存在 $\xi \in (0,1)$ 使 $f(\xi)=0$。
2. **唯一性**：$f'(x) = 2^x + x 2^x \ln 2 > 0$ 在 $(0,1)$ 上恒成立，函数严格单调递增，故根唯一。
</details>

### 练习 2：不动点定理的应用
设 $f \in C[0,1]$ 且 $0 \le f(x) \le 1$，证明必存在 $\xi \in [0,1]$ 使得 $f(\xi) = \xi$。
<details>
<summary>点击查看解析</summary>
构造辅助函数 $g(x) = f(x) - x$。
$g(0) = f(0) \ge 0$，$g(1) = f(1) - 1 \le 0$。
根据零点定理，必存在 $\xi$ 使 $g(\xi)=0 \implies f(\xi)=\xi$。
</details>

### 练习 3：一致连续性的 $\epsilon-\delta$ 证明
证明 $f(x) = \sqrt{x}$ 在 $[0, \infty)$ 上一致连续。
<details>
<summary>点击查看解析</summary>
虽然 $f'(x)$ 在 $x=0$ 附近无界，但 $\sqrt{x}$ 在 $[0,1]$ 上连续故一致连续。在 $[1, \infty)$ 上导数有界故一致连续。通过“拼接”法可证全域一致连续。
或利用不等式 $|\sqrt{x_1} - \sqrt{x_2}| \le \sqrt{|x_1 - x_2|}$，取 $\delta = \epsilon^2$ 即可。
</details>

---

<SupportingExercises
topic="函数连续性"
exercises={[
{ index: 3, title: "一致连续性判定", slug: "练习-9挑战-一致连续性辨析" },
{ index: 4, title: "介值定理的应用", slug: "练习-10挑战-零点存在性" },
{ index: 6, title: "连续性判定基础", slug: "练习-6提高-连续性判定" }
]}
/>

---

_编者注：连续性是数学分析的第一个“全局性”性质。理解它对后续研究黎曼积分的收敛性至关重要。_
