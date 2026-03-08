---
title: 一元积分学深度专题练习库 (Ch 8-11)
description: 涵盖不定积分、定积分、定积分应用及反常积分的深度习题，对标华东师大版《数学分析》。
---

# 一元积分学深度专题练习库 (Ch 8-11)

本库严格对标《数学分析》第五版（华东师大版）第八章至第十一章的内容。题目设计遵循“基础计算 - 技巧综合 - 理论深度”的梯度，并全部提供详细的折叠解析。

---

## 第八章：不定积分 (Indefinite Integrals)

[**理论回顾：第八章 不定积分**](../../academic-math/analysis/indefinite-integrals)

### 练习 8.1：换元法与分部积分的综合应用
计算不定积分：$\int \frac{\ln(1+x^2)}{x^2} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
使用分部积分法：
设 $u = \ln(1+x^2), dv = \frac{1}{x^2} dx$。
则 $du = \frac{2x}{1+x^2} dx, v = -\frac{1}{x}$。

$$\int \frac{\ln(1+x^2)}{x^2} dx = -\frac{\ln(1+x^2)}{x} + \int \frac{1}{x} \cdot \frac{2x}{1+x^2} dx$$
$$= -\frac{\ln(1+x^2)}{x} + 2 \int \frac{1}{1+x^2} dx$$
$$= -\frac{\ln(1+x^2)}{x} + 2 \arctan x + C$$

#### 答案
$-\frac{\ln(1+x^2)}{x} + 2 \arctan x + C$
</details>

### 练习 8.2：有理函数积分的递归技巧
求 $I_n = \int \frac{dx}{(x^2+a^2)^n}$ ($n \ge 1, a > 0$) 的递推公式。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
使用分部积分法处理 $I_{n-1}$：
$I_{n-1} = \int \frac{1}{(x^2+a^2)^{n-1}} dx$。
设 $u = \frac{1}{(x^2+a^2)^{n-1}}, dv = dx$，则 $du = -\frac{2(n-1)x}{(x^2+a^2)^n} dx, v = x$。
$$I_{n-1} = \frac{x}{(x^2+a^2)^{n-1}} + 2(n-1) \int \frac{x^2}{(x^2+a^2)^n} dx$$
$$= \frac{x}{(x^2+a^2)^{n-1}} + 2(n-1) \int \frac{(x^2+a^2)-a^2}{(x^2+a^2)^n} dx$$
$$= \frac{x}{(x^2+a^2)^{n-1}} + 2(n-1) I_{n-1} - 2(n-1)a^2 I_n$$
整理得：
$$2(n-1)a^2 I_n = \frac{x}{(x^2+a^2)^{n-1}} + (2n-3) I_{n-1}$$

#### 答案
$I_n = \frac{x}{2(n-1)a^2(x^2+a^2)^{n-1}} + \frac{2n-3}{2(n-1)a^2} I_{n-1}$
</details>

### 练习 8.3：第二类 Euler 换元
计算不定积分：$\int \frac{dx}{x + \sqrt{x^2+x+1}}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
由于 $a=1>0$，采用第一类 Euler 代换：
令 $\sqrt{x^2+x+1} = t - x$。
两边平方：$x^2+x+1 = t^2 - 2tx + x^2 \implies x(1+2t) = t^2-1 \implies x = \frac{t^2-1}{2t+1}$。
求导：$dx = \frac{2t(2t+1) - 2(t^2-1)}{(2t+1)^2} dt = \frac{2t^2+2t+2}{(2t+1)^2} dt$。
分母：$x + \sqrt{x^2+x+1} = t$。
代入积分：
$$\int \frac{1}{t} \cdot \frac{2(t^2+t+1)}{(2t+1)^2} dt = \int \left( \frac{2}{t} - \frac{3}{2t+1} - \frac{3}{(2t+1)^2} \right) dt$$
（利用待定系数法进行部分分式分解）
积分得：$2\ln|t| - \frac{3}{2}\ln|2t+1| + \frac{3}{2(2t+1)} + C$。
最后将 $t = x + \sqrt{x^2+x+1}$ 代回即可。

#### 答案
$2\ln|x+\sqrt{x^2+x+1}| - \frac{3}{2}\ln|2(x+\sqrt{x^2+x+1})+1| + \frac{3}{2[2(x+\sqrt{x^2+x+1})+1]} + C$
</details>

### 练习 8.4：无理函数积分的典型变换
计算不定积分：$\int \frac{dx}{(x+1)\sqrt{x^2+x+1}}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
采用倒代换。令 $t = \frac{1}{x+1}$，则 $x = \frac{1}{t}-1, dx = -\frac{1}{t^2} dt$。
根式部分：
$$x^2+x+1 = (\frac{1}{t}-1)^2 + (\frac{1}{t}-1) + 1 = \frac{1-2t+t^2 + t-t^2 + t^2}{t^2} = \frac{t^2-t+1}{t^2}$$
代入原式：
$$\int t \cdot \frac{t}{\sqrt{t^2-t+1}} \cdot \left(-\frac{1}{t^2}\right) dt = -\int \frac{dt}{\sqrt{(t-1/2)^2 + 3/4}}$$
$$= -\ln |t-1/2 + \sqrt{t^2-t+1}| + C$$
回代 $t = \frac{1}{x+1}$。

#### 答案
$-\ln | \frac{1}{x+1} - \frac{1}{2} + \frac{\sqrt{x^2+x+1}}{x+1} | + C$
</details>

---

## 第九章：定积分 (Definite Integrals)

[**理论回顾：第九章 定积分**](../../academic-math/analysis/integrals)

### 练习 9.1：利用对称性简化定积分
计算定积分：$I = \int_0^\pi \frac{x \sin x}{1 + \cos^2 x} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
利用性质 $\int_0^a f(x) dx = \int_0^a f(a-x) dx$：
$$I = \int_0^\pi \frac{(\pi-x) \sin(\pi-x)}{1 + \cos^2(\pi-x)} dx = \int_0^\pi \frac{(\pi-x) \sin x}{1 + \cos^2 x} dx = \pi \int_0^\pi \frac{\sin x}{1 + \cos^2 x} dx - I$$
$$2I = \pi \int_0^\pi \frac{\sin x}{1 + \cos^2 x} dx$$
令 $u = \cos x, du = -\sin x dx$。当 $x=0, u=1$；当 $x=\pi, u=-1$。
$$2I = \pi \int_1^{-1} \frac{-du}{1+u^2} = \pi \int_{-1}^1 \frac{du}{1+u^2} = \pi [\arctan u]_{-1}^1 = \pi (\frac{\pi}{4} - (-\frac{\pi}{4})) = \frac{\pi^2}{2}$$

#### 答案
$I = \frac{\pi^2}{4}$
</details>

### 练习 9.2：Wallis 公式与极限
计算 $I = \int_0^{\pi/2} \sin^6 x dx$，并说明 Wallis 公式的通用形式。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
Wallis 公式（点火公式）：
$$I_n = \int_0^{\pi/2} \sin^n x dx = \begin{cases} \frac{n-1}{n} \cdot \frac{n-3}{n-2} \dots \frac{1}{2} \cdot \frac{\pi}{2}, & n \text{ 为偶数} \\ \frac{n-1}{n} \cdot \frac{n-3}{n-2} \dots \frac{2}{3}, & n \text{ 为奇数} \end{cases}$$
对于 $n=6$：
$$I_6 = \frac{5}{6} \cdot \frac{3}{4} \cdot \frac{1}{2} \cdot \frac{\pi}{2} = \frac{15}{96} \pi = \frac{5}{32} \pi$$

#### 答案
$5\pi/32$
</details>

### 练习 9.3：第一中值定理的推广应用
设 $f \in C[a,b]$，证明：$\lim_{n \to \infty} \left( \int_a^b |f(x)|^n dx \right)^{1/n} = \max_{x \in [a,b]} |f(x)|$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
设 $M = \max_{x \in [a,b]} |f(x)|$。
1. **上界**：$|f(x)| \le M \implies \int_a^b |f(x)|^n dx \le M^n (b-a)$。
   取 $1/n$ 次幂：$\left( \int_a^b |f(x)|^n dx \right)^{1/n} \le M (b-a)^{1/n}$。当 $n \to \infty$ 时，$M(b-a)^{1/n} \to M$。
2. **下界**：由连续性，$\forall \epsilon > 0$，存在小区间 $[\alpha, \beta] \subset [a,b]$ 使得 $|f(x)| > M - \epsilon$。
   $\int_a^b |f(x)|^n dx \ge \int_\alpha^\beta (M-\epsilon)^n dx = (M-\epsilon)^n (\beta-\alpha)$。
   取 $1/n$ 次幂后极限为 $M-\epsilon$。
3. **结论**：由 $\epsilon$ 的任意性和夹逼定理，极限为 $M$。

#### 答案
证毕。
</details>

---

## 第十章：定积分的应用 (Applications of Definite Integrals)

[**理论回顾：第十章 定积分的应用**](../../academic-math/analysis/definite-integral-applications)

### 练习 10.1：旋转体的体积
计算由曲线 $y = \sin x$ ($0 \le x \le \pi$) 与 $x$ 轴围成的图形绕 $y$ 轴旋转所得旋转体的体积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
使用**柱壳法 (Shell Method)**：
绕 $y$ 轴旋转的体积公式为 $V = \int_a^b 2\pi x f(x) dx$。
$$V = 2\pi \int_0^\pi x \sin x dx$$
使用分部积分法：
设 $u = x, dv = \sin x dx \implies du = dx, v = -\cos x$。
$$V = 2\pi \left( [-x \cos x]_0^\pi + \int_0^\pi \cos x dx \right)$$
$$V = 2\pi ( (-\pi \cdot (-1) - 0) + [\sin x]_0^\pi ) = 2\pi (\pi + 0) = 2\pi^2$$

#### 答案
$2\pi^2$
</details>

### 练习 10.2：旋转曲面的面积
计算曲线 $y = \frac{1}{2}x^2$ ($0 \le x \le \sqrt{3}$) 绕 $y$ 轴旋转所得旋转曲面的面积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
绕 $y$ 轴旋转的侧面积公式为 $S = \int_a^b 2\pi x \sqrt{1 + (y')^2} dx$。
$y' = x$。
$$S = \int_0^{\sqrt{3}} 2\pi x \sqrt{1+x^2} dx$$
令 $u = 1+x^2, du = 2xdx$。当 $x=0, u=1$；当 $x=\sqrt{3}, u=4$。
$$S = \pi \int_1^4 \sqrt{u} du = \pi [\frac{2}{3} u^{3/2}]_1^4 = \frac{2\pi}{3} (4^{3/2} - 1) = \frac{2\pi}{3} (8 - 1) = \frac{14\pi}{3}$$

#### 答案
$14\pi/3$
</details>

---

## 第十一章：反常积分 (Improper Integrals)

[**理论回顾：第十一章 反常积分**](../../academic-math/analysis/improper-integrals)

### 练习 11.1：Dirichlet 判别法的应用
证明 Dirichlet 积分 $I = \int_0^{+\infty} \frac{\sin x}{x} dx$ 的收敛性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **分段**：$x=0$ 处 $\lim_{x \to 0} \frac{\sin x}{x} = 1$，故 $[0,1]$ 上是正常积分。重点考虑 $[1, +\infty)$。
2. **条件验证**：
   - 设 $f(x) = \sin x, g(x) = 1/x$。
   - $|\int_1^A f(x) dx| = |\cos 1 - \cos A| \le 2$，变上限积分有界。
   - $g(x) = 1/x$ 在 $[1, +\infty)$ 上单调递减且趋于 0。
3. **结论**：满足 Dirichlet 判别法，积分收敛。

#### 答案
证毕。
</details>

### 练习 11.2：含参反常积分与 Beta 函数
计算 $I = \int_0^1 \frac{dx}{\sqrt{1-x^n}}$ ($n > 0$)。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
令 $x^n = t$，则 $x = t^{1/n}, dx = \frac{1}{n} t^{1/n-1} dt$。
$$I = \int_0^1 \frac{1}{\sqrt{1-t}} \cdot \frac{1}{n} t^{1/n-1} dt = \frac{1}{n} \int_0^1 t^{1/n-1} (1-t)^{-1/2} dt$$
识别为 Beta 函数 $B(p, q) = \int_0^1 t^{p-1} (1-t)^{q-1} dt$。
此处 $p = 1/n, q = 1/2$。
$$I = \frac{1}{n} B(\frac{1}{n}, \frac{1}{2}) = \frac{1}{n} \frac{\Gamma(1/n)\Gamma(1/2)}{\Gamma(1/n + 1/2)}$$
利用 $\Gamma(1/2) = \sqrt{\pi}$。

#### 答案
$\frac{\sqrt{\pi} \Gamma(1/n)}{n \Gamma(1/n + 1/2)}$
</details>

### 练习 11.3：Cauchy 主值 (Principal Value)
求 $P.V. \int_{-1}^2 \frac{1}{x} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
瑕点为 $x=0$。根据主值定义：
$$P.V. \int_{-1}^2 \frac{1}{x} dx = \lim_{\epsilon \to 0^+} \left( \int_{-1}^{-\epsilon} \frac{1}{x} dx + \int_{\epsilon}^2 \frac{1}{x} dx \right)$$
$$= \lim_{\epsilon \to 0^+} \left( [\ln|x|]_{-1}^{-\epsilon} + [\ln|x|]_{\epsilon}^2 \right)$$
$$= \lim_{\epsilon \to 0^+} (\ln \epsilon - \ln 1 + \ln 2 - \ln \epsilon) = \ln 2$$

#### 答案
$\ln 2$
</details>

---

## 延伸入口

- [数学分析专题练习汇总](/docs/exercises/math/analysis)
- [上册基础练习 (Ch 1-4)](/docs/exercises/math/analysis-foundations)
- [导数与中值定理 (Ch 5-7)](/docs/exercises/math/analysis-derivatives-mean-value)
