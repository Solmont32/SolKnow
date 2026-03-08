---
title: 一元积分学深度专题练习库 (Ch 8-11)
---

# 一元积分学深度专题练习库 (Ch 8-11)

本库涵盖《数学分析》第五版（华东师大版）第八章至第十一章的核心内容：不定积分、定积分、定积分应用及反常积分。题目设计侧重于理论深度与计算技巧的结合。

---

## 第八章：不定积分 (Indefinite Integrals)
[**理论回顾：第八章 不定积分**](../../academic-math/analysis/indefinite-integrals)

### 练习 8.1：换元法与分部积分的综合应用
计算 $\int \frac{\ln(1+x^2)}{x^2} dx$。

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
计算 $I_n = \int \frac{dx}{(x^2+a^2)^n}$ ($n \ge 1$) 的递推公式。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
使用分部积分法于 $I_{n-1}$：
$I_{n-1} = \int \frac{1}{(x^2+a^2)^{n-1}} dx = \frac{x}{(x^2+a^2)^{n-1}} + \int \frac{2(n-1)x^2}{(x^2+a^2)^n} dx$
$= \frac{x}{(x^2+a^2)^{n-1}} + 2(n-1) \int \frac{(x^2+a^2)-a^2}{(x^2+a^2)^n} dx$
$= \frac{x}{(x^2+a^2)^{n-1}} + 2(n-1) I_{n-1} - 2(n-1)a^2 I_n$
整理得：
$$2(n-1)a^2 I_n = \frac{x}{(x^2+a^2)^{n-1}} + (2n-3) I_{n-1}$$
$$I_n = \frac{1}{2(n-1)a^2} \frac{x}{(x^2+a^2)^{n-1}} + \frac{2n-3}{2(n-1)a^2} I_{n-1}$$

#### 答案
$I_n = \frac{x}{2(n-1)a^2(x^2+a^2)^{n-1}} + \frac{2n-3}{2(n-1)a^2} I_{n-1}$
</details>

### 练习 8.4：无理函数积分的典型变换
计算 $\int \frac{dx}{(x+1)\sqrt{x^2+x+1}}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
令 $t = \frac{1}{x+1}$，则 $x = \frac{1}{t}-1, dx = -\frac{1}{t^2} dt$。
$x^2+x+1 = (\frac{1}{t}-1)^2 + (\frac{1}{t}-1) + 1 = \frac{1}{t^2} - \frac{2}{t} + 1 + \frac{1}{t} - 1 + 1 = \frac{1-t+t^2}{t^2}$。
原式 $= \int t \cdot \frac{t}{\sqrt{1-t+t^2}} \cdot (-\frac{1}{t^2}) dt = -\int \frac{dt}{\sqrt{(t-1/2)^2 + 3/4}}$。
这是一个标准积分形式：$-\ln|t-1/2 + \sqrt{t^2-t+1}| + C$。
代回 $t = \frac{1}{x+1}$ 即可。

#### 答案
$-\ln|\frac{1}{x+1}-\frac{1}{2} + \sqrt{(\frac{1}{x+1})^2-\frac{1}{x+1}+1}| + C$
</details>

---

## 第九章：定积分 (Definite Integrals)

### 练习 9.3：第一中值定理的推广应用
设 $f \in C[a,b]$，证明 $\lim_{n \to \infty} (\int_a^b |f(x)|^n dx)^{1/n} = \max_{x \in [a,b]} |f(x)|$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
设 $M = \max_{x \in [a,b]} |f(x)|$。
1. **上界**：$(\int_a^b |f(x)|^n dx)^{1/n} \le (\int_a^b M^n dx)^{1/n} = M (b-a)^{1/n}$。
   当 $n \to \infty$ 时，$M (b-a)^{1/n} \to M \cdot 1 = M$。
2. **下界**：由于 $f$ 连续，对于 $\forall \epsilon > 0$，存在区间 $[\alpha, \beta] \subset [a,b]$ 使得在该区间内 $|f(x)| > M - \epsilon$。
   则 $(\int_a^b |f(x)|^n dx)^{1/n} \ge (\int_\alpha^\beta (M-\epsilon)^n dx)^{1/n} = (M-\epsilon) (\beta-\alpha)^{1/n}$。
   当 $n \to \infty$ 时，该项趋于 $M-\epsilon$。
3. **结论**：由夹逼定理，极限值为 $M$。

#### 答案
证毕。
</details>

---

## 第十章：定积分的应用 (Applications of Definite Integrals)

### 练习 10.2：旋转曲面的面积
计算曲线 $y = \frac{1}{2}x^2$ ($0 \le x \le \sqrt{3}$) 绕 $y$ 轴旋转所得旋转曲面的面积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
绕 $y$ 轴旋转，公式为 $S = \int_a^b 2\pi x \sqrt{1 + (y')^2} dx$。
$y' = x$。
$S = \int_0^{\sqrt{3}} 2\pi x \sqrt{1 + x^2} dx$。
令 $u = 1 + x^2, du = 2x dx$：
$S = \pi \int_1^4 \sqrt{u} du = \pi [\frac{2}{3} u^{3/2}]_1^4 = \frac{2\pi}{3} (4^{3/2} - 1) = \frac{2\pi}{3} (8 - 1) = \frac{14\pi}{3}$。

#### 答案
$14\pi/3$
</details>

---

## 第十一章：反常积分 (Improper Integrals)

### 练习 11.3：Cauchy 主值 (Principal Value)
求 $P.V. \int_{-1}^2 \frac{1}{x} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
Cauchy 主值定义为 $\lim_{\epsilon \to 0^+} (\int_{-1}^{-\epsilon} \frac{1}{x} dx + \int_{\epsilon}^2 \frac{1}{x} dx)$。
$\int_{-1}^{-\epsilon} \frac{1}{x} dx = [\ln|x|]_{-1}^{-\epsilon} = \ln \epsilon - 0 = \ln \epsilon$。
$\int_{\epsilon}^2 \frac{1}{x} dx = [\ln|x|]_{\epsilon}^2 = \ln 2 - \ln \epsilon$。
两者相加：$\ln \epsilon + \ln 2 - \ln \epsilon = \ln 2$。
故 $P.V. \int_{-1}^2 \frac{1}{x} dx = \ln 2$。
注意：该积分作为通常意义的反常积分是发散的。

#### 答案
$\ln 2$
</details>
