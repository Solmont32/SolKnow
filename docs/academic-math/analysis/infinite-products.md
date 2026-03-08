---
title: 无穷乘积 (Infinite Products)
description: 系统化梳理无穷乘积理论：从基本定义到 Gamma 函数的乘积表示，包含敛散性判定的严密证明。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 无穷乘积与 Gamma 函数

在分析学中，无穷乘积是无穷级数的自然推广。

---

## 一、 无穷乘积的敛散性理论

### 1. 基本定义

设 $P_N = \prod_{n=1}^N p_n$。若 $\lim_{N \to \infty} P_N = P$ 存在且 $P \neq 0$，则称 $\prod p_n$ **收敛**。

### 2. 与对数级数的关系

<KnowledgeCard type="info" title="定理：对数等价性">
无穷乘积 $\prod (1 + a_n)$ 收敛（$a_n \neq -1$）当且仅当级数 $\sum \ln(1 + a_n)$ 收敛。
</KnowledgeCard>

<details>
<summary>点击查看证明</summary>
设 $P_N = \prod_{n=1}^N (1 + a_n)$，$S_N = \sum_{n=1}^N \ln(1 + a_n)$。
由于 $P_N = \exp(S_N)$，且指数函数 $e^x$ 是连续且处处非零的。
1. 若 $S_N \to S$，则 $P_N \to e^S \neq 0$。
2. 若 $P_N \to P \neq 0$，取对数的主分支，由于 $P \neq 0$，$\ln P_N \to \ln P$ 成立（需注意辐角问题，但在实数范围内显然）。
</details>

---

## 二、 绝对收敛与判别法

### 1. 绝对收敛

若 $\prod (1 + |a_n|)$ 收敛，则称 $\prod (1 + a_n)$ **绝对收敛**。

<KnowledgeCard type="warning" title="核心定理">
$\prod (1 + a_n)$ 绝对收敛的充要条件是级数 $\sum a_n$ 绝对收敛。
</KnowledgeCard>

<details>
<summary>点击查看证明</summary>
利用不等式：当 $x \ge 0$ 时，$x \le \ln(1+x) \le x$（实际上是 $1+x \le e^x$）。
因此 $\sum |a_n|$ 与 $\sum \ln(1+|a_n|)$ 的部分和具有相同的有界性，从而敛散性一致。
</details>

---

## 三、 特殊函数的乘积展开

### 1. Sine 函数的 Euler 展开
$$\sin \pi x = \pi x \prod_{n=1}^\infty \left( 1 - \frac{x^2}{n^2} \right)$$
这是解决巴塞尔问题 ($\sum 1/n^2 = \pi^2/6$) 的金钥匙。

### 2. Gamma 函数的 Weierstrass 展开
$$\frac{1}{\Gamma(z)} = ze^{\gamma z} \prod_{n=1}^\infty \left( 1 + \frac{z}{n} \right) e^{-z/n}$$

---

## 四、 深度例题解析

### 例题 1：条件收敛的判定
讨论 $\prod (1 + \frac{(-1)^n}{\sqrt{n}})$ 的敛散性。
<details>
<summary>点击查看解析</summary>
考察级数 $\sum \ln(1 + \frac{(-1)^n}{\sqrt{n}})$。
利用泰勒展开：$\ln(1+x) = x - \frac{x^2}{2} + O(x^3)$。
$\ln(1 + \frac{(-1)^n}{\sqrt{n}}) = \frac{(-1)^n}{\sqrt{n}} - \frac{1}{2n} + O(n^{-3/2})$。
1. $\sum \frac{(-1)^n}{\sqrt{n}}$ 收敛（交错级数）。
2. $\sum \frac{1}{2n}$ 发散。
故对数级数发散至 $-\infty$，原乘积**发散于 0**。
</details>

---

## 五、 配套练习

1. **[基础]** 计算 $\prod_{n=2}^\infty (1 - \frac{1}{n^2})$。
2. **[理论]** 证明：若 $a_n \ge 0$，则 $\prod (1+a_n)$ 与 $\sum a_n$ 同敛散。
3. **[计算]** 利用 $\sin x$ 的乘积展开计算 $\prod_{n=1}^\infty \frac{4n^2}{4n^2-1}$ (Wallis 乘积)。
4. **[挑战]** 证明 $\prod_{n=1}^\infty \frac{e^{1/n}}{1+1/n} = e^\gamma$。

<details>
<summary>点击查看简要提示</summary>
1. 结果：$1/2$。利用裂项消去。
2. 提示：利用 $1+x \le e^x$ 和 $1+x \ge 1+x$。
3. 提示：在 $\sin \pi x$ 公式中取 $x=1/2$。
4. 提示：取对数级数 $\sum (\frac{1}{n} - \ln(1+1/n))$，这正是 $\gamma$ 的定义式之一。
</details>
