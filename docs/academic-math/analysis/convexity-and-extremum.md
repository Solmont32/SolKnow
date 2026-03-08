---
title: 凸函数、不等式与极值应用：分析学的几何灵魂 (Convexity and Extremum)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 凸函数、不等式与极值应用：分析学的几何灵魂

在微分学中，如果说导数刻画了函数的“速度”，那么凸性（Convexity）则刻画了函数的“趋势”。凸函数理论不仅是数学分析的核心，更是现代最优化理论、概率论与信息论的基石。本专题对标华东师大版《数学分析》第六章，深度系统化凸函数理论及其在不等式证明中的威力。

---

## 一、 凸函数的严密定义

### 1. 几何定义与 Jensen 形式

设 $f(x)$ 为定义在区间 $I$ 上的函数。若对 $\forall x_1, x_2 \in I$ 及 $\forall \lambda \in (0, 1)$，恒有：

$$f(\lambda x_1 + (1-\lambda)x_2) \le \lambda f(x_1) + (1-\lambda)f(x_2)$$

则称 $f(x)$ 为 $I$ 上的**凸函数** (Convex Function)。

> **注意**：华氏教材中，上述定义对应“下凸”，部分教材（如物理或老版教材）可能称之为“凹”。在本系统中，我们统一采用现代数学术语：**开口向上为凸**。

### 2. Jensen 不等式（离散形式）

若 $f(x)$ 是区间 $I$ 上的凸函数，则对于 $\forall x_i \in I$ 及 $\forall \lambda_i > 0$ 且 $\sum_{i=1}^n \lambda_i = 1$，恒有：

$$f\left(\sum_{i=1}^n \lambda_i x_i\right) \le \sum_{i=1}^n \lambda_i f(x_i)$$

这是凸函数最本质的特征，也是推导所有分析学经典不等式的“母机”。

---

## 二、 凸性的判别法

### 1. 一阶导数判别法（切线特征）

设 $f(x)$ 在 $I$ 上可导，则 $f(x)$ 为凸函数的充要条件是：

$$f(y) \ge f(x) + f'(x)(y-x), \quad \forall x, y \in I$$

**几何直观**：凸函数的图像始终位于其任意一点切线的上方。

### 2. 二阶导数判别法（曲率特征）

设 $f(x)$ 在 $I$ 上二阶可导，则：

- $f(x)$ 是凸函数的充要条件是 $f''(x) \ge 0$ 对 $\forall x \in I$ 成立。
- 若 $f''(x) > 0$，则 $f(x)$ 是**严格凸函数**。

---

## 三、 核心不等式的推导：凸性之美

利用凸函数理论（特别是 Jensen 不等式），我们可以优雅地推导分析学的三大支柱不等式。

### 1. Young 不等式

设 $p, q > 1$ 且 $\frac{1}{p} + \frac{1}{q} = 1$。对 $\forall a, b > 0$，有：

$$ab \le \frac{a^p}{p} + \frac{b^q}{q}$$

**证明概要**：利用 $\ln x$ 的凹性（即 $-\ln x$ 的凸性）。
取 $f(x) = -\ln x$，由 Jensen 不等式：
$-\ln(\frac{1}{p}a^p + \frac{1}{q}b^q) \le \frac{1}{p}(-\ln a^p) + \frac{1}{q}(-\ln b^q) = -\ln(ab)$
两边取指数即得。

### 2. Hölder 不等式

设 $p, q > 1, \frac{1}{p} + \frac{1}{q} = 1$。对数项 $a_i, b_i \ge 0$，有：

$$\sum_{i=1}^n a_i b_i \le \left(\sum_{i=1}^n a_i^p\right)^{1/p} \left(\sum_{i=1}^n b_i^q\right)^{1/q}$$

这是 Cauchy-Schwarz 不等式（$p=q=2$ 时）的广义形式。

### 3. Minkowski 不等式

设 $p \ge 1$，则：

$$\left(\sum_{i=1}^n (a_i + b_i)^p\right)^{1/p} \le \left(\sum_{i=1}^n a_i^p\right)^{1/p} + \left(\sum_{i=1}^n b_i^p\right)^{1/p}$$

其几何意义是 $L^p$ 空间下的三角不等式。

---

## 四、 极值与最优化应用

凸性提供了全局最优化的保证：

1. **局部即全局**：凸函数在凸集上的局部极小值即为全局最小值。
2. **极值点判定**：
   - **一阶必要条件**：若 $f(x)$ 可导且在 $x_0$ 取得极值，则 $f'(x_0) = 0$。
   - **二阶充分条件**：若 $f'(x_0) = 0$ 且 $f''(x_0) > 0$，则 $x_0$ 为极小值点。

---

## 五、 教科书级证明例题 (8+ 深度实战)

### 例 1：算术-几何平均值不等式 (AM-GM)

证明：$\frac{x_1 + x_2 + \dots + x_n}{n} \ge \sqrt[n]{x_1 x_2 \dots x_n}$ 对 $x_i > 0$ 成立。

<details>

<summary>点击查看证明</summary>

考察函数 $f(x) = -\ln x$，其 $f''(x) = \frac{1}{x^2} > 0$，为严格凸函数。
由 Jensen 不等式，取 $\lambda_i = \frac{1}{n}$：

$$-\ln\left(\frac{\sum x_i}{n}\right) \le \sum \frac{1}{n}(-\ln x_i) = -\ln\left(\prod x_i^{1/n}\right)$$

由 $\ln x$ 的单调性，不等式方向反转，得证。

</details>

### 例 2：常用的指数-对数不等式

证明：对 $\forall x \in \mathbb{R}$，$e^x \ge 1+x$。

<details>

<summary>点击查看证明</summary>

设 $f(x) = e^x$，在 $x_0 = 0$ 处展开切线。
$f(0) = 1, f'(0) = 1$，切线方程为 $y = 1 + x$。
由于 $f''(x) = e^x > 0$，$f(x)$ 始终位于其切线之上，故 $e^x \ge 1+x$。

</details>

### 例 3：Bernoulli 不等式的凸性证明

证明：当 $\alpha > 1$ 且 $x > -1$ 时，$(1+x)^\alpha \ge 1 + \alpha x$。

<details>

<summary>点击查看证明</summary>

令 $f(t) = (1+t)^\alpha$。计算 $f''(t) = \alpha(\alpha-1)(1+t)^{\alpha-2}$。
当 $\alpha > 1, t > -1$ 时，$f''(t) > 0$，故 $f(t)$ 为凸函数。
利用切线判别法，在 $t=0$ 处：$f(0)=1, f'(0)=\alpha$。
故 $f(x) \ge f(0) + f'(0)(x-0) = 1 + \alpha x$。

</details>

### 例 4：Ky Fan 不等式的特殊情况

证明：若 $x_i \in (0, 1/2]$，则 $\frac{\prod x_i}{(\sum x_i)^n} \le \frac{\prod (1-x_i)}{(\sum (1-x_i))^n}$。

<details>

<summary>点击查看证明</summary>

考察函数 $f(x) = \ln \frac{x}{1-x}$。计算其二阶导。
$f'(x) = \frac{1}{x(1-x)}$, $f''(x) = \frac{2x-1}{x^2(1-x)^2}$。
当 $x \in (0, 1/2]$ 时，$f''(x) \le 0$，即 $f(x)$ 为凹函数。
利用 Jensen 不等式即可得证。

</details>

### 例 5：利用 Young 不等式证明 Hölder

<details>

<summary>点击查看证明</summary>

设 $A = (\sum a_i^p)^{1/p}, B = (\sum b_i^q)^{1/q}$。
令 $\hat{a}_i = a_i/A, \hat{b}_i = b_i/B$，则 $\sum \hat{a}_i^p = 1, \sum \hat{b}_i^q = 1$。
对每一项应用 Young 不等式：
$\hat{a}_i \hat{b}_i \le \frac{\hat{a}_i^p}{p} + \frac{\hat{b}_i^q}{q}$
对 $i$ 求和：
$\sum \hat{a}_i \hat{b}_i \le \frac{1}{p}\sum \hat{a}_i^p + \frac{1}{q}\sum \hat{b}_i^q = \frac{1}{p} + \frac{1}{q} = 1$
还原 $A, B$ 即得 Hölder 不等式。

</details>

### 例 6：凸函数在区间中点的性质

证明：若 $f(x)$ 在 $[a, b]$ 上是凸函数，则 $f\left(\frac{a+b}{2}\right) \le \frac{1}{b-a}\int_a^b f(x) dx \le \frac{f(a)+f(b)}{2}$。

<details>

<summary>点击查看证明</summary>

此即著名的 **Hadamard 不等式**。

1. 右边部分：利用凸性 $f(ta + (1-t)b) \le tf(a) + (1-t)f(b)$，对 $t \in [0, 1]$ 积分。
2. 左边部分：利用 $f(\frac{a+b}{2}) = f(\frac{(ta+(1-t)b) + ((1-t)a+tb)}{2}) \le \frac{f(ta+(1-t)b) + f((1-t)a+tb)}{2}$，积分即得。

</details>

### 例 7：距离和的最小值问题

在直线 $y=0$ 上找一点 $P(x, 0)$，使得其到 $A(0, 1)$ 和 $B(3, 2)$ 的距离之和最小。

<details>

<summary>点击查看证明</summary>

设 $f(x) = \sqrt{x^2+1} + \sqrt{(x-3)^2+4}$。
计算 $f''(x)$ 可证其为严格凸函数，极值点唯一。
利用几何对称性（反射原理），$A$ 关于 $y=0$ 的对称点 $A'(0, -1)$，连接 $A'B$ 与 $x$ 轴的交点即为最小值点。
$A'B$ 方程：$y+1 = \frac{2-(-1)}{3-0}(x-0) \Rightarrow y = x-1$。
令 $y=0$, $x=1$。最小值点为 $(1, 0)$。

</details>

### 例 8：Shannon 熵的非负性 (信息论应用)

证明：$H(X) = -\sum p_i \log p_i \le \log n$，其中 $\sum p_i = 1$。

<details>

<summary>点击查看证明</summary>

考察函数 $f(x) = -x \log x$（或直接用 $\log x$ 的凹性）。
由于 $f''(x) = -1/x < 0$（对 $\log$ 而言），由 Jensen 不等式：
$\sum \frac{1}{n} \log p_i \le \log (\frac{\sum p_i}{n}) = \log (1/n) = -\log n$
整理得 $\sum p_i \log p_i \ge -\log n \Rightarrow -\sum p_i \log p_i \le \log n$。

</details>

---

## 六、 综合练习库

1. **广义 Jensen**：证明积分形式的 Jensen 不等式：$f(\int_0^1 g(x) dx) \le \int_0^1 f(g(x)) dx$。
2. **极值应用**：周长为 $L$ 的所有矩形中，哪一个面积最大？用凸性证明。
3. **不等式链**：利用 $f(x) = \ln(1+e^x)$ 的凸性证明关于 Log-Sum-Exp 的性质。
4. **切线法强化**：证明 $\sin x + \tan x > 2x$ 对 $x \in (0, \pi/2)$ 成立。

---

_编者注：凸性是不等式的灵魂。当你面对一个复杂的不等式感到无从下手时，不妨求一下二阶导，或许几何的光芒会瞬间照亮证明之路。_
