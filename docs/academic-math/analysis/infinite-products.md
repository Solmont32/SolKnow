---
title: 无穷乘积与 Gamma 函数 (Infinite Products & Gamma Function)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 无穷乘积与 Gamma 函数

在数学分析中，无穷乘积是无穷级数的自然推广。它在特殊函数论、解析数论和复变函数中有着核心应用。

## 1. 无穷乘积的敛散性判别

### 定义
设 $\{p_n\}$ 为一数列，若部分乘积 $P_N = \prod_{n=1}^N p_n$ 当 $N \to \infty$ 时极限存在且不为零，则称**无穷乘积** $\prod_{n=1}^\infty p_n$ **收敛**。若极限为零或不存在，则称其发散。
> **注意**：约定极限为 0 时称为发散（或称“发散于 0”），是为了保持与 $\ln$ 的一致性。

### 敛散性基本判别法
为了方便分析，通常令 $p_n = 1 + a_n$。
1.  **必要条件**：若 $\prod (1+a_n)$ 收敛，则 $\lim_{n \to \infty} a_n = 0$。
2.  **对数判别法**：$\prod (1+a_n)$ 与级数 $\sum \ln(1+a_n)$ 的敛散性相同。
3.  **正项级数关联法**：若 $a_n > 0$（或 $a_n < 0$ 且 $|a_n| < 1$），则 $\prod (1+a_n)$ 与 $\sum a_n$ 同敛散。
4.  **绝对收敛**：若 $\prod (1+|a_n|)$ 收敛，则称 $\prod (1+a_n)$ **绝对收敛**。这等价于级数 $\sum a_n$ 绝对收敛。

<KnowledgeCard type="warning" title="判别陷阱">
如果 $\sum a_n$ 条件收敛，$\prod (1+a_n)$ 不一定收敛。其敛散性取决于 $\sum (a_n - \frac{1}{2}a_n^2 + \dots)$ 的行为。
</KnowledgeCard>

---

## 2. Gamma 函数的乘积公式

Gamma 函数 $\Gamma(z)$ 的定义通常通过积分给出，但在分析其解析性质时，乘积表示法更为强大。

### Weierstrass 乘积公式
对于所有复数 $z$，Gamma 函数满足：
$$\frac{1}{\Gamma(z)} = ze^{\gamma z} \prod_{n=1}^\infty \left( 1 + \frac{z}{n} \right) e^{-z/n}$$
其中 $\gamma = \lim_{n \to \infty} (H_n - \ln n) \approx 0.5772$ 是 Euler-Mascheroni 常数。

### Euler 乘积公式
$$\Gamma(z) = \frac{1}{z} \prod_{n=1}^\infty \frac{(1 + 1/n)^z}{1 + z/n}$$
这个公式展示了 Gamma 函数如何作为阶乘在实数域上的延拓：$\Gamma(n+1) = n!$。

---

## 3. 深度例题

### 例题 1：余弦函数的无穷乘积展开
利用 $\frac{\sin \pi z}{\pi z} = \prod_{n=1}^\infty (1 - \frac{z^2}{n^2})$，证明 $\cos \frac{\pi z}{2} = \prod_{n=1, 3, 5, \dots}^\infty (1 - \frac{z^2}{n^2})$。

**解析**：
由于 $\sin \pi z = 2 \sin \frac{\pi z}{2} \cos \frac{\pi z}{2}$，代入正弦展开式并对比项：
$$\frac{\sin \pi z}{\pi z} = \prod_{n=1}^\infty (1 - \frac{z^2}{n^2}) = \left( \prod_{k=1}^\infty (1 - \frac{z^2}{(2k)^2}) \right) \left( \prod_{k=1}^\infty (1 - \frac{z^2}{(2k-1)^2}) \right)$$
注意到前一部分对应 $\frac{\sin(\pi z/2)}{\pi z/2}$ 的展开，从而余下的部分即为余弦函数的展开。

### 例题 2：Wallis 公式
利用无穷乘积证明 $\frac{\pi}{2} = \prod_{n=1}^\infty \frac{(2n)^2}{(2n-1)(2n+1)}$。

**解析**：
在 $\frac{\sin x}{x} = \prod_{n=1}^\infty (1 - \frac{x^2}{n^2 \pi^2})$ 中令 $x = \frac{\pi}{2}$：
$$\frac{2}{\pi} = \prod_{n=1}^\infty (1 - \frac{1}{4n^2}) = \prod_{n=1}^\infty \frac{4n^2 - 1}{4n^2}$$
取倒数即得 Wallis 公式。

---

## 4. 配套练习

1.  **判别敛散性**：判断 $\prod_{n=2}^\infty (1 + \frac{(-1)^n}{\sqrt{n}})$ 的敛散性。
    *(提示：考虑 $\sum \ln(1+a_n)$ 的泰勒展开)*
2.  **求值**：计算无穷乘积 $\prod_{n=2}^\infty \frac{n^3 - 1}{n^3 + 1}$。
3.  **Gamma 函数应用**：证明 $\Gamma(z) \Gamma(1-z) = \frac{\pi}{\sin \pi z}$ 的乘积表示证明。
4.  **挑战题**：利用 Euler 乘积公式证明 $\lim_{n \to \infty} \frac{n! n^z}{z(z+1)\dots(z+n)} = \Gamma(z)$。

---

<KnowledgeCard type="info" title="学习建议">
无穷乘积与级数的关系类似于对数与和的关系。掌握 $\ln(1+x) \approx x - \frac{x^2}{2}$ 是解决此类问题的金钥匙。
</KnowledgeCard>
