---
title: 级数论与 Fourier 分析专题练习库 (Ch 12-15)
---

# 级数论与 Fourier 分析专题练习库 (Ch 12-15)

本库涵盖《数学分析》第五版（华东师大版）第十二章至第十五章的核心内容：数项级数、函数列与函数项级数、幂级数及 Fourier 级数。

---

## 第十二章：数项级数 (Numerical Series)
[**理论回顾：第十二章 数项级数**](../../academic-math/analysis/series)

### 练习 12.1：比值判别法与根值判别法的极限情形
讨论级数 $\sum_{n=1}^{\infty} \frac{n! e^n}{n^n}$ 的收敛性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
使用比值判别法：
$a_n = \frac{n! e^n}{n^n}$
$\frac{a_{n+1}}{a_n} = \frac{(n+1)! e^{n+1}}{(n+1)^{n+1}} \cdot \frac{n^n}{n! e^n} = \frac{(n+1) e \cdot n^n}{(n+1)^{n+1}} = e (\frac{n}{n+1})^n = \frac{e}{(1+1/n)^n}$
由于 $\lim_{n \to \infty} (1+1/n)^n = e$，故 $\lim_{n \to \infty} \frac{a_{n+1}}{a_n} = 1$。
比值判别法失效。
**进阶方法**：利用斯特林公式 (Stirling's Formula) $n! \sim \sqrt{2\pi n} (n/e)^n$。
$a_n \sim \sqrt{2\pi n} (n/e)^n \cdot \frac{e^n}{n^n} = \sqrt{2\pi n}$。
显然 $a_n \to \infty$，不满足级数收敛的必要条件，故级数发散。

#### 答案
发散
</details>

### 练习 12.2：Raabe 判别法的应用
讨论级数 $\sum_{n=1}^{\infty} [\frac{(2n-1)!!}{(2n)!!}]^p$ 的收敛性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
设 $a_n = [\frac{(2n-1)!!}{(2n)!!}]^p$。
计算比值：$\frac{a_n}{a_{n+1}} = (\frac{2n+2}{2n+1})^p = (1 + \frac{1}{2n+1})^p$。
利用泰勒展开：$(1 + \frac{1}{2n+1})^p = 1 + \frac{p}{2n+1} + O(\frac{1}{n^2}) = 1 + \frac{p}{2n} + O(\frac{1}{n^2})$。
Raabe 量 $R_n = n(\frac{a_n}{a_{n+1}} - 1) = \frac{pn}{2n} + O(\frac{1}{n}) \to \frac{p}{2}$。
根据 Raabe 判别法：
- 当 $p/2 > 1 \implies p > 2$ 时，级数收敛。
- 当 $p/2 < 1 \implies p < 2$ 时，级数发散。
- 当 $p = 2$ 时，需更精细判别（Gauss 判别法），结果为发散。

#### 答案
当 $p > 2$ 时收敛；当 $p \le 2$ 时发散。
</details>

---

## 第十三章：函数列与函数项级数 (Sequences and Series of Functions)

### 练习 13.1：一致收敛性的判别
证明 $f_n(x) = \frac{nx}{1+n^2x^2}$ 在 $[0, 1]$ 上不一致收敛，但在 $[\delta, 1]$ ($\delta > 0$) 上一致收敛。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **极限函数**：
   当 $x=0$ 时，$f_n(0) = 0 \to 0$。
   当 $x \in (0, 1]$ 时，$f_n(x) = \frac{x/n}{1/n^2+x^2} \to 0$。
   故极限函数 $f(x) = 0$。
2. **在 $[0, 1]$ 上的非一致收敛性**：
   考察 $M_n = \sup_{x \in [0, 1]} |f_n(x) - 0|$。
   取 $x_n = 1/n \in [0, 1]$，则 $f_n(1/n) = \frac{n(1/n)}{1+n^2(1/n^2)} = \frac{1}{2}$。
   由于 $M_n \ge 1/2 \not\to 0$，故不一致收敛。
3. **在 $[\delta, 1]$ 上的一致收敛性**：
   当 $n > 1/\delta$ 时，$x = 1/n$ 落在 $[\delta, 1]$ 之外。此时 $f_n(x)$ 在 $[\delta, 1]$ 上单调递减。
   $M_n = f_n(\delta) = \frac{n\delta}{1+n^2\delta^2} \to 0$ ($n \to \infty$)。
   故一致收敛。

#### 答案
证明如上，核心在于利用 $x=1/n$ 处的最大值点。
</details>

### 练习 13.2：Weierstrass M-判别法
证明级数 $\sum_{n=1}^{\infty} \frac{\sin nx}{n^2}$ 在 $\mathbb{R}$ 上一致收敛。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
对任意 $x \in \mathbb{R}$，有：
$|f_n(x)| = |\frac{\sin nx}{n^2}| \le \frac{1}{n^2}$。
由于数项级数 $\sum_{n=1}^{\infty} \frac{1}{n^2}$ 收敛（$p$-级数，$p=2>1$），
由 Weierstrass M-判别法，原函数项级数在 $\mathbb{R}$ 上一致收敛。

#### 答案
证毕。
</details>

---

## 第十四章：幂级数 (Power Series)

### 练习 14.1：收敛半径与求和
求级数 $\sum_{n=1}^{\infty} n^2 x^n$ 的收敛域与和函数。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **收敛半径**：$R = \lim_{n \to \infty} |\frac{n^2}{(n+1)^2}| = 1$。收敛域为 $(-1, 1)$。
2. **求和**：
   设 $S(x) = \sum_{n=1}^\infty n^2 x^n$。
   已知 $\sum_{n=0}^\infty x^n = \frac{1}{1-x}$。
   逐项求导：$\sum_{n=1}^\infty n x^{n-1} = \frac{1}{(1-x)^2} \implies \sum_{n=1}^\infty n x^n = \frac{x}{(1-x)^2}$。
   对 $\sum n x^n$ 再次求导：
   $\frac{d}{dx} (\sum_{n=1}^\infty n x^n) = \sum_{n=1}^\infty n^2 x^{n-1} = \frac{(1-x)^2 - x \cdot 2(1-x)(-1)}{(1-x)^4} = \frac{1-x+2x}{(1-x)^3} = \frac{1+x}{(1-x)^3}$。
   故 $S(x) = x \cdot \frac{1+x}{(1-x)^3} = \frac{x(1+x)}{(1-x)^3}$。

#### 答案
收敛域 $(-1, 1)$，和函数 $f(x) = \frac{x(1+x)}{(1-x)^3}$。
</details>

---

## 第十五章：Fourier 级数 (Fourier Series)

### 练习 15.1：周期延拓与 Fourier 展开
将 $f(x) = x^2$ ($-\pi \le x \le \pi$) 展开为 Fourier 级数。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
由于 $f(x)$ 是偶函数，故 $b_n = 0$。
1. **计算 $a_0$**：
   $a_0 = \frac{1}{\pi} \int_{-\pi}^\pi x^2 dx = \frac{2}{\pi} \int_0^\pi x^2 dx = \frac{2\pi^2}{3}$。
2. **计算 $a_n$**：
   $a_n = \frac{2}{\pi} \int_0^\pi x^2 \cos nx dx$。
   分部积分两次：
   $\int x^2 \cos nx dx = \frac{x^2 \sin nx}{n} \Big|_0^\pi - \int_0^\pi \frac{2x \sin nx}{n} dx$
   $= 0 - [\frac{-2x \cos nx}{n^2} \Big|_0^\pi + \int_0^\pi \frac{2 \cos nx}{n^2} dx]$
   $= \frac{2\pi \cos n\pi}{n^2} - 0 = \frac{2\pi (-1)^n}{n^2}$。
   代入系数定义：$a_n = \frac{2}{\pi} \cdot \frac{2\pi(-1)^n}{n^2} = \frac{4(-1)^n}{n^2}$。
3. **Fourier 级数**：
   $x^2 = \frac{a_0}{2} + \sum_{n=1}^\infty a_n \cos nx = \frac{\pi^2}{3} + 4 \sum_{n=1}^\infty \frac{(-1)^n}{n^2} \cos nx$。

#### 答案
$x^2 = \frac{\pi^2}{3} + 4 \sum_{n=1}^\infty \frac{(-1)^n}{n^2} \cos nx$
</details>

### 练习 15.2：Parseval 等式与级数求和
利用 $x^2$ 的 Fourier 展开式求 $\sum_{n=1}^{\infty} \frac{1}{n^4}$ 的值。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
Parseval 等式：$\frac{1}{\pi} \int_{-\pi}^\pi f^2(x) dx = \frac{a_0^2}{2} + \sum_{n=1}^\infty (a_n^2 + b_n^2)$。
1. **左边**：$\frac{1}{\pi} \int_{-\pi}^\pi x^4 dx = \frac{2}{\pi} [\frac{x^5}{5}]_0^\pi = \frac{2\pi^4}{5}$。
2. **右边**：$a_0 = \frac{2\pi^2}{3}, a_n = \frac{4(-1)^n}{n^2}, b_n = 0$。
   $\frac{(2\pi^2/3)^2}{2} + \sum_{n=1}^\infty (\frac{4(-1)^n}{n^2})^2 = \frac{2\pi^4}{9} + 16 \sum_{n=1}^\infty \frac{1}{n^4}$。
3. **等式联立**：
   $\frac{2\pi^4}{5} = \frac{2\pi^4}{9} + 16 \sum_{n=1}^\infty \frac{1}{n^4}$
   $16 \sum \frac{1}{n^4} = 2\pi^4 (\frac{1}{5} - \frac{1}{9}) = 2\pi^4 \cdot \frac{4}{45} = \frac{8\pi^4}{45}$
   故 $\sum_{n=1}^\infty \frac{1}{n^4} = \frac{\pi^4}{90}$。

#### 答案
$\frac{\pi^4}{90}$
</details>
