---
title: 级数论与 Fourier 分析专题练习库 (Ch 12-15)
description: 深入探讨数项级数、函数项级数、幂级数与 Fourier 级数的收敛性判定与性质应用。
---

# 级数论与 Fourier 分析专题练习库 (Ch 12-15)

本练习库涵盖《数学分析》下册核心的级数理论部分，对标华东师大版第十二章至第十五章。题目强调收敛性判定的严密性与级数求和技巧的综合运用。

---

## 第十二章：数项级数 (Number Series)

[**理论回顾：第十二章 数项级数**](../../academic-math/analysis/series)

### 练习 12.1：Kummer/Raabe 判别法的应用
讨论级数 $\sum_{n=1}^{\infty} \frac{n! e^n}{n^n}$ 的收敛性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
设通项为 $a_n$。考察比值：
$$\frac{a_n}{a_{n+1}} = \frac{n! e^n}{n^n} \cdot \frac{(n+1)^{n+1}}{(n+1)! e^{n+1}} = \frac{(n+1)^n}{n^n e} = \frac{1}{e} (1 + \frac{1}{n})^n$$
利用级数展开 $(1+\frac{1}{n})^n = e(1 - \frac{1}{2n} + \frac{11}{24n^2} + O(\frac{1}{n^3}))$：
$$\frac{a_n}{a_{n+1}} = 1 - \frac{1}{2n} + O(\frac{1}{n^2})$$
根据 **Raabe 判别法**：
$\lim_{n \to \infty} n(\frac{a_n}{a_{n+1}} - 1) = -\frac{1}{2}$。
由于 $-\frac{1}{2} < 1$，级数发散。
（注：此结果也可用 Stirling 公式直接得出 $a_n \sim \sqrt{2\pi n}$，通项不趋于 0，故发散。）

#### 答案
发散
</details>

### 练习 12.2：绝对收敛与条件收敛
讨论级数 $\sum_{n=2}^{\infty} \frac{(-1)^n}{n^p + (-1)^n}$ ($p > 0$) 的收敛性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
令 $a_n = \frac{(-1)^n}{n^p + (-1)^n}$。
1. **绝对收敛性**：$|a_n| = \frac{1}{n^p + (-1)^n} \sim \frac{1}{n^p}$。故当 $p > 1$ 时绝对收敛。
2. **条件收敛性**（考察 $0 < p \le 1$）：
   将通项展开：
   $$a_n = \frac{(-1)^n}{n^p(1 + \frac{(-1)^n}{n^p})} = \frac{(-1)^n}{n^p} [1 - \frac{(-1)^n}{n^p} + O(\frac{1}{n^{2p}})]$$
   $$a_n = \frac{(-1)^n}{n^p} - \frac{1}{n^{2p}} + O(\frac{1}{n^{3p}})$$
   - $\sum \frac{(-1)^n}{n^p}$ 根据 Leibniz 判别法总是收敛。
   - $\sum \frac{1}{n^{2p}}$ 当 $2p > 1 \implies p > 1/2$ 时收敛。
   - 故当 $1/2 < p \le 1$ 时，级数条件收敛。
   - 当 $0 < p \le 1/2$ 时，由于 $\sum \frac{1}{n^{2p}}$ 发散而其他项收敛，级数发散。

#### 答案
- $p > 1$：绝对收敛
- $1/2 < p \le 1$：条件收敛
- $0 < p \le 1/2$：发散
</details>

---

## 第十三章：函数列与函数项级数 (Sequences and Series of Functions)

[**理论回顾：第十三章 函数列与函数项级数**](../../academic-math/analysis/function-sequences)

### 练习 13.1：一致收敛的判别 (M-判别法)
讨论级数 $\sum_{n=1}^{\infty} \frac{n^2 x}{1 + n^4 x^2}$ 在 $[0, 1]$ 上的收敛性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **逐点收敛**：当 $x=0$ 时，$f_n(0)=0 \to 0$。当 $x > 0$ 时，$f_n(x) \sim \frac{n^2 x}{n^4 x^2} = \frac{1}{n^2 x}$，级数收敛。
2. **一致收敛性**：考察 $u_n(x) = \frac{n^2 x}{1 + n^4 x^2}$ 的极值。
   $u_n'(x) = \frac{n^2(1+n^4 x^2) - n^2 x(2n^4 x)}{(1+n^4 x^2)^2} = \frac{n^2(1 - n^4 x^2)}{(1+n^4 x^2)^2}$。
   在 $x = 1/n^2$ 处取得最大值 $u_n(1/n^2) = \frac{1}{1+1} = 1/2$。
   由于 $\sup_{x \in [0,1]} |u_n(x)| = 1/2$，不趋于 0。
   根据一致收敛的必要条件 $\lim_{n \to \infty} \sup |u_n(x)| = 0$，该级数在 $[0, 1]$ 上**不一致收敛**。
   注：但在 $[a, 1]$ ($a > 0$) 上是一致收敛的。

#### 答案
逐点收敛，但在 $[0, 1]$ 上不一致收敛。
</details>

### 练习 13.2：Dini 定理与紧致性
设 $f_n(x)$ 为紧集 $K$ 上的连续函数列，且 $f_n(x) \searrow f(x)$（单调递减趋于连续函数 $f$）。证明 $f_n \rightrightarrows f$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. 令 $g_n(x) = f_n(x) - f(x)$。则 $g_n \in C(K)$ 且 $g_n(x) \searrow 0$。
2. 对任意 $\epsilon > 0$，定义集合 $K_n = \{x \in K \mid g_n(x) \ge \epsilon\}$。
3. 由于 $g_n$ 连续，$K_n$ 是 $K$ 中的相对闭集。由于 $K$ 紧，故 $K_n$ 是紧集。
4. 由于单调性，$K_{n+1} \subseteq K_n$。
5. 由于 $g_n(x) \to 0$，对每个 $x$，必存在 $N_x$ 使 $g_{N_x}(x) < \epsilon$，即 $x \notin K_{N_x}$。
6. 因此 $\bigcap_{n=1}^\infty K_n = \emptyset$。
7. 根据康托尔交集定理（有限覆盖性质），必存在某个 $N$ 使得 $K_N = \emptyset$。
8. 这意味着当 $n \ge N$ 时，对所有 $x \in K$，有 $0 \le g_n(x) \le g_N(x) < \epsilon$。
9. 证毕。

#### 答案
证毕。
</details>

---

## 第十四章：幂级数 (Power Series)

[**理论回顾：第十四章 幂级数**](../../academic-math/analysis/power-series)

### 练习 14.1：收敛半径与边界行为
求级数 $\sum_{n=1}^{\infty} \frac{(n!)^2}{(2n)!} x^n$ 的收敛半径，并讨论在收敛圆周上的行为。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **收敛半径**：
   $R = \lim_{n \to \infty} \frac{a_n}{a_{n+1}} = \lim_{n \to \infty} \frac{(n!)^2}{(2n)!} \cdot \frac{(2n+2)!}{((n+1)!)^2} = \lim_{n \to \infty} \frac{(2n+1)(2n+2)}{(n+1)^2} = 4$。
2. **端点考察** ($x=4$)：
   级数为 $\sum_{n=1}^\infty \frac{(n!)^2 4^n}{(2n)!}$。
   利用 Stirling 公式 $n! \sim \sqrt{2\pi n} (n/e)^n$：
   $a_n \sim \frac{2\pi n (n/e)^{2n} 4^n}{\sqrt{4\pi n} (2n/e)^{2n}} = \frac{\sqrt{\pi n} (n/e)^{2n} 4^n}{(2n/e)^{2n}} = \sqrt{\pi n}$。
   通项趋向于无穷大，故在 $x=4$ 处发散。同理在 $x=-4$ 处也发散。

#### 答案
$R=4$；在 $x = \pm 4$ 处均发散。
</details>

### 练习 14.2：利用幂级数求数项级数和
计算 $\sum_{n=0}^{\infty} \frac{n^2+1}{2^n}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
考虑幂级数 $f(x) = \sum_{n=0}^\infty (n^2+1)x^n$。已知 $\sum_{n=0}^\infty x^n = \frac{1}{1-x}$ ($|x|<1$)。
1. 求导：$\sum n x^{n-1} = \frac{1}{(1-x)^2} \implies \sum n x^n = \frac{x}{(1-x)^2}$。
2. 再求导：$\sum n^2 x^{n-1} = \frac{(1-x)^2 + 2x(1-x)}{(1-x)^4} = \frac{1+x}{(1-x)^3} \implies \sum n^2 x^n = \frac{x(1+x)}{(1-x)^3}$。
3. 综合：$f(x) = \frac{x(1+x)}{(1-x)^3} + \frac{1}{1-x} = \frac{x+x^2 + (1-x)^2}{(1-x)^3} = \frac{1-x+x^2}{(1-x)^3}$。
4. 代入 $x = 1/2$：
   $f(1/2) = \frac{1 - 1/2 + 1/4}{(1 - 1/2)^3} = \frac{3/4}{1/8} = 6$。

#### 答案
$6$
</details>

---

## 第十五章：Fourier 级数 (Fourier Series)

[**理论回顾：第十五章 傅里叶级数**](../../academic-math/analysis/fourier-series)

### 练习 15.1：Gibbs 现象的计算
考察 $f(x) = \text{sgn}(x)$ 在 $[-\pi, \pi]$ 上的 Fourier 级数。计算 $S_n(x)$ 在跳跃间断点附近的“峰值”。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **Fourier 展开**：$f(x) \sim \frac{4}{\pi} \sum_{k=1}^\infty \frac{\sin(2k-1)x}{2k-1}$。
2. **考察 $S_n(x)$**：$S_n(x) = \frac{2}{\pi} \int_0^x \frac{\sin 2nt}{\sin t} dt$ (近似)。
3. 第一个极大值出现在 $x = \pi / (2n)$ 附近。
4. 此时 $S_n(\frac{\pi}{2n}) \to \frac{2}{\pi} \int_0^\pi \frac{\sin u}{u} du = \frac{2}{\pi} \text{Si}(\pi) \approx 1.1789$。
5. 理论跳跃高度为 1，多出的部分约为 $17.9\%$，这就是 **Gibbs 现象**。

#### 答案
峰值极限约为 $1.179$。
</details>

### 练习 15.2：Parseval 等式应用
利用 $f(x) = x^2$ 在 $[-\pi, \pi]$ 上的展开，求 $\sum_{n=1}^{\infty} \frac{1}{n^4}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **Fourier 展开**：
   $x^2 = \frac{\pi^2}{3} + 4 \sum_{n=1}^\infty \frac{(-1)^n}{n^2} \cos nx$。
2. **应用 Parseval 等式**：$\frac{1}{\pi} \int_{-\pi}^\pi |f(x)|^2 dx = \frac{a_0^2}{2} + \sum_{n=1}^\infty (a_n^2 + b_n^2)$。
   左边：$\frac{1}{\pi} \int_{-\pi}^\pi x^4 dx = \frac{2\pi^4}{5}$。
   右边：$\frac{1}{2}(\frac{2\pi^2}{3})^2 + \sum_{n=1}^\infty (4\frac{(-1)^n}{n^2})^2 = \frac{2\pi^4}{9} + 16 \sum \frac{1}{n^4}$。
3. **计算**：
   $16 \sum \frac{1}{n^4} = \frac{2\pi^4}{5} - \frac{2\pi^4}{9} = \frac{18-10}{45} \pi^4 = \frac{8\pi^4}{45}$。
   $\sum_{n=1}^\infty \frac{1}{n^4} = \frac{\pi^4}{90}$。

#### 答案
$\pi^4/90$
</details>

---

## 延伸入口

- [数学分析专题练习汇总](/docs/exercises/math/analysis)
- [上册基础练习 (Ch 1-4)](/docs/exercises/math/analysis-foundations)
- [导数与中值定理 (Ch 5-7)](/docs/exercises/math/analysis-derivatives-mean-value)
- [一元积分学专题 (Ch 8-11)](/docs/exercises/math/analysis-integral-calculus)
- [多元微积分与矢量分析 (Ch 16-23)](/docs/exercises/math/analysis-multivariable-calculus)
