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

### 练习 8.3：第二类 Euler 换元
计算 $\int \frac{dx}{x + \sqrt{x^2+x+1}}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
令 $\sqrt{x^2+x+1} = t - x$，两边平方：
$x^2+x+1 = t^2 - 2tx + x^2 \implies x(1+2t) = t^2-1 \implies x = \frac{t^2-1}{2t+1}$。
求导：$dx = \frac{2t(2t+1) - 2(t^2-1)}{(2t+1)^2} dt = \frac{2t^2+2t+2}{(2t+1)^2} dt$。
分母 $x + \sqrt{x^2+x+1} = t$。
原式 $= \int \frac{1}{t} \cdot \frac{2(t^2+t+1)}{(2t+1)^2} dt$。
利用部分分式展开：
$\frac{2t^2+2t+2}{t(2t+1)^2} = \frac{A}{t} + \frac{B}{2t+1} + \frac{C}{(2t+1)^2}$
经计算得 $A=2, B=-3, C=-3$。
原式 $= 2\ln|t| - \frac{3}{2}\ln|2t+1| + \frac{3}{2(2t+1)} + C$。
最后代回 $t = x + \sqrt{x^2+x+1}$。

#### 答案
$2\ln|x+\sqrt{x^2+x+1}| - \frac{3}{2}\ln|2(x+\sqrt{x^2+x+1})+1| + \frac{3}{2(2(x+\sqrt{x^2+x+1})+1)} + C$
</details>

---

## 第九章：定积分 (Definite Integrals)

### 练习 9.1：利用对称性简化定积分
计算 $I = \int_0^{\pi} \frac{x \sin x}{1 + \cos^2 x} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
令 $x = \pi - t$，则 $dx = -dt$：
$I = \int_{\pi}^0 \frac{(\pi-t) \sin(\pi-t)}{1 + \cos^2(\pi-t)} (-dt) = \int_0^{\pi} \frac{\pi \sin t - t \sin t}{1 + \cos^2 t} dt = \pi \int_0^{\pi} \frac{\sin t}{1 + \cos^2 t} dt - I$
$2I = \pi \int_0^{\pi} \frac{\sin t}{1 + \cos^2 t} dt$。
令 $u = \cos t, du = -\sin t dt$：
$2I = \pi \int_1^{-1} \frac{-du}{1+u^2} = \pi \int_{-1}^1 \frac{du}{1+u^2} = \pi [\arctan u]_{-1}^1 = \pi(\frac{\pi}{4} - (-\frac{\pi}{4})) = \frac{\pi^2}{2}$。
故 $I = \frac{\pi^2}{4}$。

#### 答案
$\frac{\pi^2}{4}$
</details>

### 练习 9.2：Wallis 公式与极限
计算 $L = \lim_{n \to \infty} \int_0^{\pi/2} \sin^n x dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
记 $I_n = \int_0^{\pi/2} \sin^n x dx$。
利用分部积分可得递推公式：$I_n = \frac{n-1}{n} I_{n-2}$。
当 $n \to \infty$ 时，由于 $0 < \sin x < 1$ 在 $(0, \pi/2)$ 上成立，且 $\sin^n x \to 0$ 几乎处处成立。
由控制收敛定理（或对于连续函数的手动分割区间法）：
对 $\forall \epsilon > 0$，取 $\delta$ 使 $\int_{\pi/2-\delta}^{\pi/2} 1 dx = \delta < \epsilon/2$。
在 $[0, \pi/2-\delta]$ 上，$\sin x \le \sin(\pi/2-\delta) = k < 1$。
故 $\int_0^{\pi/2-\delta} \sin^n x dx \le \frac{\pi}{2} k^n \to 0$。
从而 $\lim_{n \to \infty} I_n = 0$。

#### 答案
$0$
</details>

---

## 第十章：定积分的应用 (Applications of Definite Integrals)

### 练习 10.1：旋转体的体积
求由曲线 $y = \sin x$ ($0 \le x \le \pi$) 与 $x$ 轴围成的图形绕 $y$ 轴旋转所得旋转体的体积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
使用 **柱壳法 (Shell Method)**：
体积 $V = \int_a^b 2\pi x f(x) dx$。
$V = \int_0^{\pi} 2\pi x \sin x dx$。
使用分部积分：
$V = 2\pi [-x \cos x + \sin x]_0^{\pi} = 2\pi [(\pi + 0) - (0 + 0)] = 2\pi^2$。

#### 答案
$2\pi^2$
</details>

---

## 第十一章：反常积分 (Improper Integrals)

### 练习 11.1：Dirichlet 判别法的应用
判定 $\int_1^{+\infty} \frac{\sin x}{x^p} dx$ ($p > 0$) 的收敛性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **收敛性**：设 $f(x) = \sin x, g(x) = \frac{1}{x^p}$。
   - $F(x) = \int_1^x \sin t dt = \cos 1 - \cos x$ 有界。
   - $g(x) = \frac{1}{x^p}$ 当 $p > 0$ 时单调趋于 0。
   由 Dirichlet 判别法，该反常积分收敛。
2. **绝对收敛性**：考察 $\int_1^{+\infty} \frac{|\sin x|}{x^p} dx$。
   - 当 $p > 1$ 时，由比较判别法，绝对收敛。
   - 当 $0 < p \le 1$ 时，由于 $|\sin x| \ge \sin^2 x = \frac{1 - \cos 2x}{2}$，$\int \frac{1}{2x^p}$ 发散而 $\int \frac{\cos 2x}{2x^p}$ 收敛，故原式发散。
   此时为条件收敛。

#### 答案
当 $p > 1$ 时绝对收敛；当 $0 < p \le 1$ 时条件收敛。
</details>

### 练习 11.2：含参反常积分与 Beta 函数
证明 $\int_0^{\pi/2} \sin^p x \cos^q x dx = \frac{1}{2} B(\frac{p+1}{2}, \frac{q+1}{2})$ ($p, q > -1$)。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
利用 Beta 函数的定义：$B(m, n) = \int_0^1 t^{m-1} (1-t)^{n-1} dt$。
令 $t = \sin^2 x$，则 $dt = 2\sin x \cos x dx$。
当 $x=0, t=0$；当 $x=\pi/2, t=1$。
则原式 $= \int_0^1 (\sqrt{t})^p (\sqrt{1-t})^q \frac{dt}{2\sqrt{t}\sqrt{1-t}}$
$= \frac{1}{2} \int_0^1 t^{\frac{p-1}{2}} (1-t)^{\frac{q-1}{2}} dt$
根据定义，这正是 $\frac{1}{2} B(\frac{p+1}{2}, \frac{q+1}{2})$。

#### 答案
证毕。
</details>
