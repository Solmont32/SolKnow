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
用 $\epsilon-\delta$ 语言描述：$\forall \epsilon > 0, \exists \delta > 0, \text{ s.t. } |x - x_0| < \delta \implies |f(x) - f(x_0)| < \epsilon$。

### 2. 连续函数的局部性质
- **局部有界性**：若 $f$ 在 $x_0$ 连续，则存在 $\delta > 0$，使得 $f$ 在 $U(x_0, \delta)$ 上有界。
- **局部保号性**：若 $f(x_0) > 0$，则存在 $\delta > 0$，使得 $\forall x \in U(x_0, \delta), f(x) > 0$。
- **连续函数的四则运算**：两个连续函数的和、差、积、商（分母不为 0）在定义点处依然连续。

<KnowledgeCard type="warning" title="常见陷阱：间断点的误区">
1. **$1/x$ 在 $x=0$ 是否连续？** 严格来说，由于 $0$ 不在定义域内，讨论该点连续性无意义，但 $x=0$ 是其**无穷间断点**。
2. **狄利克雷函数 $D(x)$**：在任何点都不连续（处处间断）。
3. **黎曼函数 $R(x)$**：在一切无理数点处连续，在一切有理数点处间断（且为可去间断点）。
</KnowledgeCard>

### 3. 闭区间连续函数的全局性质（核心定理）
这些性质是基于实数完备性的深刻结论：

1. **有界性定理 (Boundedness Theorem)**：
   若 $f \in C[a,b]$，则 $f$ 在 $[a,b]$ 上有界。
2. **最大最小值定理 (Extreme Value Theorem)**：
   若 $f \in C[a,b]$，则 $f$ 在 $[a,b]$ 上必能取到最大值 $M$ 和最小值 $m$。
3. **介值定理 (Intermediate Value Theorem)**：
   若 $f \in C[a,b]$，且 $f(a) \neq f(b)$，则对于介于 $f(a)$ 与 $f(b)$ 之间的任何数 $k$，必存在 $\xi \in (a,b)$，使得 $f(\xi) = k$。
   - **零点定理**：若 $f(a)f(b) < 0$，则至少存在一个零点 $\xi \in (a,b)$。
4. **一致连续性定理 (Heine-Cantor Theorem)**：
   若 $f \in C[a,b]$，则 $f$ 在 $[a,b]$ 上一致连续。

### 4. 高阶视野：Weierstrass 逼近定理 (初步)
虽然本章不涉及级数，但连续函数的一个核心价值是其可被逼近性。
**第一逼近定理**：闭区间上的连续函数可以被多项式一致逼近。这意味着连续函数是“良好”的函数。

---

## 二、 一致连续性深度辨析

一致连续性要求误差控制 $\delta$ 对区间内**所有点**通用，即 $\delta$ 只取决于 $\epsilon$。
**定义**：$\forall \epsilon > 0, \exists \delta > 0, \text{ s.t. } \forall x_1, x_2 \in I, |x_1 - x_2| < \delta \implies |f(x_1) - f(x_2)| < \epsilon$。

<KnowledgeCard type="warning" title="判别准则">
- **Lipschitz 条件**：若存在 $L > 0$ 使得 $|f(x_1) - f(x_2)| \le L|x_1 - x_2|$（如导数有界），则 $f$ 一致连续。
- **端点性质**：若 $f$ 在 $(a,b)$ 连续且端点极限存在，则在 $(a,b)$ 一致连续。
- **非一致连续判定**：若能找到两序列 $x_n, y_n$ 满足 $x_n - y_n \to 0$ 但 $f(x_n) - f(y_n) \not\to 0$，则不一致连续。
</KnowledgeCard>

---

## 三 深度例题精讲 (Expanded Examples)

### 练习 1：利用零点定理证明根的存在性
证明方程 $x 2^x = 1$ 在 $(0, 1)$ 内恰有一个实根。
<details>
<summary>点击查看解析</summary>
设 $f(x) = x 2^x - 1$。
1. **存在性**：$f(0) = -1 < 0$，$f(1) = 2-1 = 1 > 0$。由于 $f(x)$ 在 $[0,1]$ 上连续，由零点定理，存在 $\xi \in (0,1)$ 使 $f(\xi)=0$。
2. **唯一性**：$f'(x) = 2^x + x 2^x \ln 2 > 0$ 在 $(0,1)$ 上恒成立，函数严格单调递增，故根唯一。
</details>

### 练习 2：不动点定理的应用
设 $f \in C[0,1]$ 且 $0 \le f(x) \le 1$，证明必存在 $\xi \in [0,1]$ 使得 $f(\xi) = \xi$。
<details>
<summary>点击查看解析</summary>
构造辅助函数 $g(x) = f(x) - x$。
- $g(0) = f(0) - 0 = f(0) \ge 0$。
- $g(1) = f(1) - 1 \le 1 - 1 = 0$。
根据零点定理：
- 若 $g(0)=0$ 或 $g(1)=0$，则 $0$ 或 $1$ 即为不动点。
- 若 $g(0)>0$ 且 $g(1)<0$，则由零点定理，必存在 $\xi \in (0,1)$ 使 $g(\xi)=0 \implies f(\xi)=\xi$。
</details>

### 练习 3：一致连续性的判定
证明 $f(x) = \sin \frac{1}{x}$ 在 $(0, 1]$ 上不一致连续。
<details>
<summary>点击查看解析</summary>
取 $x_n = \frac{1}{2n\pi + \pi/2}$，$y_n = \frac{1}{2n\pi}$。
显然当 $n \to \infty$ 时，$x_n \to 0, y_n \to 0$，故 $|x_n - y_n| \to 0$。
然而 $|f(x_n) - f(y_n)| = |\sin(2n\pi + \pi/2) - \sin(2n\pi)| = |1 - 0| = 1 \not\to 0$。
故 $f(x)$ 在 $(0,1]$ 上不一致连续。
</details>

### 练习 4：介值定理的复合应用
设 $f \in C[0, 2\pi]$ 且 $f(0) = f(2\pi)$。证明必存在 $\xi \in [0, \pi]$ 使得 $f(\xi) = f(\xi + \pi)$。
<details>
<summary>点击查看解析</summary>
构造辅助函数 $g(x) = f(x) - f(x+\pi)$，定义域为 $[0, \pi]$。
$g(0) = f(0) - f(\pi)$。
$g(\pi) = f(\pi) - f(2\pi) = f(\pi) - f(0)$ (利用已知条件 $f(0)=f(2\pi)$)。
因此 $g(0) = -g(\pi)$。
- 若 $g(0)=0$，则 $f(0)=f(\pi)$，取 $\xi=0$。
- 若 $g(0) \neq 0$，则 $g(0)g(\pi) < 0$，由零点定理必存在 $\xi \in (0, \pi)$ 使得 $g(\xi)=0$，即 $f(\xi)=f(\xi+\pi)$。
</details>

---

<SupportingExercises
topic="函数连续性"
fileId="analysis-foundations"
exercises={[
{ index: 3, title: "一致连续性判定", slug: "练习-9挑战-一致连续性辨析" },
{ index: 4, title: "介值定理的应用", slug: "练习-10挑战-零点存在性" },
{ index: 6, title: "连续性判定基础", slug: "练习-6提高-连续性判定" }
]}
/>

---

_编者注：连续性是数学分析的第一个“全局性”性质。理解它对后续研究黎曼积分的收敛性至关重要。_
