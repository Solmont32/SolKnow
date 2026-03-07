---
title: 反常积分：敛散性判别与 Cauchy 主值 (Improper Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 反常积分：敛散性判别与 Cauchy 主值

在定积分的定义中，我们要求积分区间是有界的，且被积函数也是有界的。当这两个条件之一不满足时，便产生了**反常积分**（也称广义积分）。本章将系统讨论反常积分的敛散性判别法及 Cauchy 主值的概念。

## 一、 基本定义

### 1. 无穷限反常积分 (Infinite Interval)
设 $f(x)$ 在 $[a, +\infty)$ 上可积。定义：
$$\int_a^{+\infty} f(x) dx = \lim_{A \to +\infty} \int_a^A f(x) dx$$
若极限存在，称积分**收敛**；否则称**发散**。

### 2. 瑕积分 (Unbounded Function)
设 $f(x)$ 在 $(a, b]$ 上可积，但在点 $a$ 的右邻域内无界（称 $a$ 为**瑕点**）。定义：
$$\int_a^b f(x) dx = \lim_{\epsilon \to 0^+} \int_{a+\epsilon}^b f(x) dx$$

---

## 二、 非负函数项反常积分的判别法

对于非负函数 $f(x) \ge 0$，反常积分的收敛性等价于变上限积分的有界性。

### 1. 比较判别法 (Comparison Test)
设 $0 \le f(x) \le g(x)$：
- 若 $\int_a^{+\infty} g(x) dx$ 收敛，则 $\int_a^{+\infty} f(x) dx$ 收敛。
- 若 $\int_a^{+\infty} f(x) dx$ 发散，则 $\int_a^{+\infty} g(x) dx$ 发散。

### 2. 极限比较判别法 (Limit Comparison Test)
若 $f(x), g(x) > 0$，且 $\lim_{x \to +\infty} \frac{f(x)}{g(x)} = L$：
- 若 $0 < L < +\infty$，则 $\int f$ 与 $\int g$ 同敛散。
- 若 $L = 0$ 且 $\int g$ 收敛，则 $\int f$ 收敛。
- 若 $L = +\infty$ 且 $\int g$ 发散，则 $\int f$ 发散。

> **常用参考函数 ($p$-级数)**：
> $\int_a^{+\infty} \frac{1}{x^p} dx$ 在 $p > 1$ 时收敛，$p \le 1$ 时发散。

---

## 三、 一般项反常积分的判别法

对于变号函数，我们引入 **Dirichlet** 和 **Abel** 判别法。

### 1. Dirichlet 判别法
若满足以下两个条件，则 $\int_a^{+\infty} f(x)g(x) dx$ 收敛：
1. $F(A) = \int_a^A f(x) dx$ 在 $[a, +\infty)$ 上有界。
2. $g(x)$ 在 $[a, +\infty)$ 上单调，且 $\lim_{x \to +\infty} g(x) = 0$。

### 2. Abel 判别法
若满足以下两个条件，则 $\int_a^{+\infty} f(x)g(x) dx$ 收敛：
1. $\int_a^{+\infty} f(x) dx$ 收敛。
2. $g(x)$ 在 $[a, +\infty)$ 上单调且有界。

---

## 四、 Cauchy 主值 (Cauchy Principal Value)

对于在区间内部有瑕点或无穷区间的积分，若普通的对称极限存在，我们称之为 Cauchy 主值，记作 $P.V. \int$。

### 1. 内部瑕点的主值
若 $c \in (a, b)$ 是 $f(x)$ 的瑕点：
$$P.V. \int_a^b f(x) dx = \lim_{\epsilon \to 0^+} \left( \int_a^{c-\epsilon} f(x) dx + \int_{c+\epsilon}^b f(x) dx \right)$$

### 2. 无穷区间的主值
$$P.V. \int_{-\infty}^{+\infty} f(x) dx = \lim_{A \to +\infty} \int_{-A}^A f(x) dx$$

**注意**：积分收敛必有主值存在且相等，但主值存在未必积分收敛（例如 $\int_{- \infty}^{+\infty} x dx$ 发散，但其主值为 0）。

---

## 五、 深度深度例题解析

### 例题 1：Dirichlet 判别法的应用
证明 Dirichlet 积分 $\int_0^{+\infty} \frac{\sin x}{x} dx$ 收敛。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **分段讨论**：在 $[0, 1]$ 上，$\lim_{x \to 0} \frac{\sin x}{x} = 1$，是正常积分。重点考察 $[1, +\infty)$。
2. **识别 $f(x)$ 与 $g(x)$**：
   令 $f(x) = \sin x$，$g(x) = \frac{1}{x}$。
3. **验证 Dirichlet 条件**：
   - $|\int_1^A \sin x dx| = |\cos 1 - \cos A| \le 2$，有界。
   - $g(x) = \frac{1}{x}$ 在 $[1, +\infty)$ 上单调递减且趋于 0。
4. **结论**：由 Dirichlet 判别法，该积分收敛（实际上其值为 $\frac{\pi}{2}$）。

</details>

### 例题 2：Cauchy 主值的计算
计算 $P.V. \int_{-1}^2 \frac{1}{x} dx$。

<details>
<summary>点击查看解析</summary>

#### 解析过程
瑕点为 $x = 0$。
$$P.V. \int_{-1}^2 \frac{1}{x} dx = \lim_{\epsilon \to 0^+} \left( \int_{-1}^{-\epsilon} \frac{1}{x} dx + \int_{\epsilon}^2 \frac{1}{x} dx \right)$$
$$= \lim_{\epsilon \to 0^+} \left( [\ln |x|]_{-1}^{-\epsilon} + [\ln |x|]_{\epsilon}^2 \right)$$
$$= \lim_{\epsilon \to 0^+} \left( (\ln \epsilon - \ln 1) + (\ln 2 - \ln \epsilon) \right)$$
$$= \ln 2$$

</details>

---

## 六、 练习库同步 (Analysis Exercise Sync)

### 练习 1：敛散性综合判别
判别 $\int_2^{+\infty} \frac{\ln x}{x^p} dx$ 的敛散性。

<details>
<summary>点击查看解析与答案</summary>

- 若 $p > 1$：取 $\epsilon > 0$ 使得 $p - \epsilon > 1$。由于 $\lim_{x \to +\infty} \frac{\ln x}{x^\epsilon} = 0$，存在 $M$ 使得 $x > M$ 时 $\ln x < x^\epsilon$。则 $\frac{\ln x}{x^p} < \frac{1}{x^{p-\epsilon}}$，收敛。
- 若 $p \le 1$：由于 $\frac{\ln x}{x^p} > \frac{1}{x}$ (对于足够大的 $x$)，而 $\int \frac{1}{x}$ 发散，故发散。
**答案**：$p > 1$ 时收敛，$p \le 1$ 时发散。
</details>

### 练习 2：Cauchy 主值的性质
讨论 $\int_{-\infty}^{+\infty} \frac{1+x}{1+x^2} dx$ 的收敛性及 Cauchy 主值。

<details>
<summary>点击查看解析与答案</summary>

1. **敛散性**：被积函数 $\sim \frac{x}{x^2} = \frac{1}{x}$，积分发散。
2. **Cauchy 主值**：
$P.V. \int_{-A}^A \frac{1+x}{1+x^2} dx = \int_{-A}^A \frac{1}{1+x^2} dx + \int_{-A}^A \frac{x}{1+x^2} dx$
奇函数部分积分为 0。
$= [\arctan x]_{-A}^A = 2 \arctan A \to \pi$。
**答案**：积分发散，但 Cauchy 主值为 $\pi$。
</details>
