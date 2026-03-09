---
title: Fourier 级数 (Fourier Series)
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

import SupportingExercises from '@site/src/components/SupportingExercises';
import { Code2, Infinity, Monitor, Youtube, BookOpen, PenTool, Lightbulb } from 'lucide-react';

# Fourier 级数 (Fourier Series)

Fourier 级数（傅里叶级数）是分析学中处理周期现象的核心工具。它的基本思想是：**任何符合一定条件的周期函数，都可以表示为一系列正弦和余弦函数的叠加**。这一理论不仅在纯数学（如偏微分方程、数论）中至关重要，也是现代信号处理、量子力学及通信工程的数学基石。

---

## 1. Fourier 系数与三角级数

### 1.1 正交函数系

三角函数系 $\{1, \cos x, \sin x, \cos 2x, \sin 2x, \dots, \cos nx, \sin nx, \dots\}$ 在区间 $[-\pi, \pi]$ 上具有 **正交性**：

- $\int_{-\pi}^\pi \cos nx \sin mx \, dx = 0$ (对所有 $n, m$)
- $\int_{-\pi}^\pi \cos nx \cos mx \, dx = \begin{cases} 0, & n \neq m \\ \pi, & n = m \neq 0 \\ 2\pi, & n = m = 0 \end{cases}$
- $\int_{-\pi}^\pi \sin nx \sin mx \, dx = \begin{cases} 0, & n \neq m \\ \pi, & n = m \neq 0 \end{cases}$

### 1.2 Fourier 系数公式 (周期 $2\pi$)

设 $f(x)$ 是以 $2\pi$ 为周期的可积函数，其 Fourier 级数为：

$$f(x) \sim \frac{a_0}{2} + \sum_{n=1}^\infty (a_n \cos nx + b_n \sin nx)$$

其中系数定义为：

$$a_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \cos nx \, dx, \quad n = 0, 1, 2, \dots$$

$$b_n = \frac{1}{\pi} \int_{-\pi}^\pi f(x) \sin nx \, dx, \quad n = 1, 2, \dots$$

---

## 2. Dirichlet 收敛定理：什么时候可以写等号？

Fourier 级数是否收敛于 $f(x)$ 是一个深刻的问题。Dirichlet 给出了最实用的判定准则。

<KnowledgeCard type="warning" title="Dirichlet 收敛定理 (点收敛判定)">
若 $f(x)$ 是周期为 $2\pi$ 的函数，且在一个周期内满足以下 **Dirichlet 条件**：
1. **分段连续**：仅有有限个第一类间断点。
2. **分段单调**：仅有有限个极值点。

则 $f(x)$ 的 Fourier 级数 $S(x)$ 在每一点 $x$ 处均收敛，且：

$$S(x) = \frac{f(x+0) + f(x-0)}{2}$$

- 在 **连续点** $x$ 处，$S(x) = f(x)$；
- 在 **间断点** $x$ 处，$S(x)$ 收敛于左右极限的平均值。

</KnowledgeCard>

### 2.1 深入解析

- **物理直觉**：在突变点，级数倾向于取“中间值”，这体现了三角级数作为光滑函数逼近非光滑函数时的平滑特性。
- **一致收敛性**：若 $f(x)$ 全线连续且分段光滑，则其余 Fourier 级数在整个实轴上 **一致收敛** 于 $f(x)$。

---

## 3. 正弦级数、余弦级数与周期延拓

对于定义在 $[0, \pi]$ 上的非周期函数 $f(x)$，我们可以通过 **延拓** 将其展开。

### 3.1 奇延拓 (Odd Extension) $\to$ 正弦级数

定义 $F(x) = \begin{cases} f(x), & 0 \le x \le \pi \\ -f(-x), & -\pi \le x < 0 \end{cases}$。
此时 $a_n = 0$，级数仅包含正弦项：

$$f(x) \sim \sum_{n=1}^\infty b_n \sin nx, \quad b_n = \frac{2}{\pi} \int_0^\pi f(x) \sin nx \, dx$$

### 3.2 偶延拓 (Even Extension) $\to$ 余弦级数

定义 $F(x) = \begin{cases} f(x), & 0 \le x \le \pi \\ f(-x), & -\pi \le x < 0 \end{cases}$。
此时 $b_n = 0$，级数仅包含常数项和余弦项：

$$f(x) \sim \frac{a_0}{2} + \sum_{n=1}^\infty a_n \cos nx, \quad a_n = \frac{2}{\pi} \int_0^\pi f(x) \cos nx \, dx$$

### 3.3 复杂非周期函数的处理

若函数定义在 $[a, b]$ 上，通常先平移至 $[0, L]$，再根据需要进行周期延拓。

- **普通周期延拓**：直接令 $f(x+L) = f(x)$，通常在端点处会引入间断。
- **反射延拓**：如上述奇/偶延拓，通常能保持端点的连续性，从而提高收敛速度。

---

## 4. Gibbs 现象：逼近的代价

当 $f(x)$ 存在跳变间断点时，Fourier 级数的部分和 $S_N(x)$ 在间断点附近会产生“振荡”和“过冲”。

### 4.1 数学刻画

设 $f(x)$ 在 $x_0$ 处有一个跳变间断点，跳变高度为 $h = |f(x_0+0) - f(x_0-0)|$。其第 $N$ 阶部分和 $S_N(x)$ 在 $x_0$ 附近的第一个极大值与函数值之差趋于：

$$\lim_{N \to \infty} S_N(x_{max}) = f(x_0+0) + \frac{h}{2} \left[ \frac{2}{\pi} \int_0^\pi \frac{\sin t}{t} dt - 1 \right]$$

其中常量 $G = \frac{2}{\pi} \text{Si}(\pi) \approx 1.17897 \dots$。

- **过冲百分比**：$(G - 1) / 2 \approx 0.08949 \dots \approx 9\%$。
- **本质分析**：Gibbs 现象揭示了用光滑正交基逼近非光滑信号时的能量分布特性。即使增加谐波项数，过冲幅度也不会消失，仅是过冲点向间断点无限靠拢。这体现了 $L^2$ 空间均方收敛并不保证点态一致收敛。

<KnowledgeCard type="info" title="工程视角">
在图像处理中，Gibbs 现象表现为“振铃效应”(Ringing artifacts)。在 JPEG 压缩等频域算法中，必须通过窗函数 (Windowing) 或低通滤波来抑制这种由于频谱截断引起的伪影。
</KnowledgeCard>

---

## 5. Parseval 等式：能量守恒定律

从 Hilbert 空间的视角看，Fourier 展开是正交基下的投影。

### 5.1 Parseval 公式

若 $f(x)$ 在 $[-\pi, \pi]$ 上平方可积，则其平均功率等于各谐波分量功率之和：

$$\frac{1}{\pi} \int_{-\pi}^\pi |f(x)|^2 dx = \frac{a_0^2}{2} + \sum_{n=1}^\infty (a_n^2 + b_n^2)$$

### 5.2 应用价值

1. **求级数和**：它是计算如 $\sum \frac{1}{n^2}, \sum \frac{1}{n^4}$ 等数项级数的强力工具。
2. **误差分析**：用于评估用前 $N$ 项逼近原函数时的均方误差。

---

## 6. 深度例题

### 例题 1：周期延拓与 Fourier 展开

设 $f(x) = x, x \in [0, \pi]$。

1. 将其进行 **偶延拓** 展开为余弦级数。
2. 利用结果求 $\sum_{n=1}^\infty \frac{1}{(2n-1)^2}$。

**解析**：

1. **偶延拓**：在 $[-\pi, \pi]$ 上 $F(x) = |x|$。
   $a_0 = \frac{2}{\pi} \int_0^\pi x dx = \pi$。
   $a_n = \frac{2}{\pi} \int_0^\pi x \cos nx dx = \frac{2}{\pi} \left[ \frac{x \sin nx}{n} \Big|_0^\pi - \int_0^\pi \frac{\sin nx}{n} dx \right] = \frac{2}{\pi n^2} (\cos n\pi - 1) = \frac{2}{\pi n^2} ((-1)^n - 1)$。
   - $n$ 为偶数时，$a_n = 0$；
   - $n$ 为奇数时，$a_n = -\frac{4}{\pi n^2}$。
     展开式：$x = \frac{\pi}{2} - \frac{4}{\pi} \sum_{k=1}^\infty \frac{\cos(2k-1)x}{(2k-1)^2}, \quad x \in [0, \pi]$。

2. **求和**：令 $x=0$，由于偶延拓后在 $0$ 处连续，$f(0) = 0$。
   $0 = \frac{\pi}{2} - \frac{4}{\pi} \sum_{k=1}^\infty \frac{1}{(2k-1)^2} \implies \sum_{k=1}^\infty \frac{1}{(2k-1)^2} = \frac{\pi^2}{8}$。

### 例题 2：Parseval 等式的综合应用

已知 $f(x) = x^2, x \in [-\pi, \pi]$，其展开式为 $f(x) = \frac{\pi^2}{3} + 4 \sum_{n=1}^\infty \frac{(-1)^n}{n^2} \cos nx$。证明：

$$\sum_{n=1}^\infty \frac{1}{n^4} = \frac{\pi^4}{90}$$

**解析**：
应用 Parseval 等式：$\frac{1}{\pi} \int_{-\pi}^\pi (x^2)^2 dx = \frac{a_0^2}{2} + \sum_{n=1}^\infty a_n^2$。
左边：$\frac{1}{\pi} \int_{-\pi}^\pi x^4 dx = \frac{2\pi^5}{5\pi} = \frac{2\pi^4}{5}$。
右边：$a_0 = \frac{2\pi^2}{3}, a_n = \frac{4(-1)^n}{n^2}$。
$\frac{2\pi^4}{5} = \frac{1}{2}(\frac{2\pi^2}{3})^2 + \sum_{n=1}^\infty \frac{16}{n^4} = \frac{2\pi^4}{9} + 16 \sum_{n=1}^\infty \frac{1}{n^4}$。
整理得：$16 \sum \frac{1}{n^4} = \frac{18\pi^4 - 10\pi^4}{45} = \frac{8\pi^4}{45} \implies \sum \frac{1}{n^4} = \frac{\pi^4}{90}$。

### 例题 3：利用 Dirichlet 定理求数项级数和

设 $f(x) = x$, $x \in (-\pi, \pi)$ 且 $f(x+2\pi) = f(x)$。

1. 求其 Fourier 展开式。
2. 利用结果计算 $\sum_{n=1}^\infty \frac{\sin n}{n}$。

**解析**：

1. $f(x)$ 是奇函数，故 $a_n = 0$。
   $b_n = \frac{2}{\pi} \int_0^\pi x \sin nx dx = \frac{2}{\pi} \left[ -\frac{x \cos nx}{n} + \frac{\sin nx}{n^2} \right]_0^\pi = \frac{2(-1)^{n+1}}{n}$。
   展开式为：$x \sim 2 \sum_{n=1}^\infty \frac{(-1)^{n+1}}{n} \sin nx, \quad x \in (-\pi, \pi)$。
2. 令 $x=1$。由于 $x=1$ 是 $f(x)$ 的连续点，由 Dirichlet 定理：
   $1 = 2 \sum_{n=1}^\infty \frac{(-1)^{n+1} \sin n}{n} \implies \sum_{n=1}^\infty \frac{(-1)^{n+1} \sin n}{n} = \frac{1}{2}$。
   > **注意**：若要求 $\sum \frac{\sin n}{n}$，通常考虑 $f(x) = \frac{\pi-x}{2}$ 的展开。

### 例题 4：非对称区间与分段函数的展开

设 $f(x) = \begin{cases} 1, & 0 < x < \pi \\ 0, & -\pi < x < 0 \end{cases}$。求其 Fourier 级数，并讨论 $x=0$ 处的收敛值。
**解析**：
$a_0 = \frac{1}{\pi} \int_0^\pi 1 dx = 1$。
$a_n = \frac{1}{\pi} \int_0^\pi \cos nx dx = 0$ ($n \ge 1$)。
$b_n = \frac{1}{\pi} \int_0^\pi \sin nx dx = \frac{1}{\pi n} (1 - \cos n\pi) = \frac{1 - (-1)^n}{\pi n}$。

- $n$ 为偶数时，$b_n = 0$；
- $n$ 为奇数时，$b_n = \frac{2}{\pi n}$。
  展开式：$f(x) \sim \frac{1}{2} + \frac{2}{\pi} \sum_{k=1}^\infty \frac{\sin(2k-1)x}{2k-1}$。
  **收敛性**：在 $x=0$ 处，$f(x)$ 有第一类间断点。
  收敛值 $S(0) = \frac{f(0+0) + f(0-0)}{2} = \frac{1+0}{2} = \frac{1}{2}$。

### 例题 5：高阶 Parseval 实战

利用 $f(x) = x(\pi-x)$ 在 $[0, \pi]$ 上的正弦级数展开，计算 $\sum_{n=1}^\infty \frac{1}{(2n-1)^6}$。
**解析**：

1. 奇延拓后 $b_n = \frac{2}{\pi} \int_0^\pi (x\pi - x^2) \sin nx dx = \frac{8}{\pi n^3}$ ($n$ 为奇数)，$b_n=0$ ($n$ 为偶数)。
2. 应用 Parseval 等式：$\frac{2}{\pi} \int_0^\pi |x(\pi-x)|^2 dx = \sum b_n^2$。
   左边：$\frac{2}{\pi} \int_0^\pi (x^2\pi^2 - 2x^3\pi + x^4) dx = \frac{2}{\pi} [\frac{\pi^5}{3} - \frac{\pi^5}{2} + \frac{\pi^5}{5}] = \frac{\pi^4}{15}$。
   右边：$\sum_{k=1}^\infty (\frac{8}{\pi(2k-1)^3})^2 = \frac{64}{\pi^2} \sum_{k=1}^\infty \frac{1}{(2k-1)^6}$。
   整理得：$\sum_{k=1}^\infty \frac{1}{(2k-1)^6} = \frac{\pi^6}{960}$。

---

## 7. 配套练习

1.  **基础**：将 $f(x) = \sin \frac{x}{2}$ 在 $[-\pi, \pi]$ 上展开为 Fourier 级数。
2.  **周期延拓**：将 $f(x) = e^x$ 在 $[0, 1]$ 上分别进行奇延拓和偶延拓，写出其正弦级数和余弦级数的系数表达式。
3.  **收敛性分析**：讨论函数 $f(x) = \sum_{n=1}^\infty \frac{\sin nx}{n^{1.5}}$ 的连续性与可微性。
4.  **Parseval 实战**：利用 $f(x) = |x|, x \in [-\pi, \pi]$ 的展开式，通过 Parseval 等式求 $\sum_{n=1}^\infty \frac{1}{(2n-1)^4}$。
5.  **挑战 (Riemann-Lebesgue)**：证明若 $f(x)$ 在 $[a, b]$ 上 Riemann 可积，则 $\lim_{n \to \infty} \int_a^b f(x) \sin nx dx = 0$。并解释该引理在 Fourier 级数系数趋于零中的作用。

<KnowledgeCard type="success" title="学习总结">
Fourier 级数不仅仅是一个数学公式，它代表了从**时间域**到**频率域**的视角转换。掌握它的关键在于深刻理解 Dirichlet 条件下的点收敛特性，以及 Parseval 等式所揭示的能量守恒本质。
</KnowledgeCard>

---

<SupportingExercises
topic="Fourier 级数"
fileId="analysis-series-fourier"
exercises={[
{ index: 15.1, title: "Gibbs 现象的计算", slug: "练习-151gibbs-现象的计算" },
{ index: 15.2, title: "Parseval 等式应用", slug: "练习-152parseval-等式应用" }
]}
/>

---

<div className="bilibili-embed-inner">
  <iframe 
    src="//player.bilibili.com/player.html?bvid=BV18t411p734&page=1" 
    scrolling="no" 
    border="0" 
    frameborder="no" 
    framespacing="0" 
    allowfullscreen="true"
    loading="lazy">
  </iframe>
</div>