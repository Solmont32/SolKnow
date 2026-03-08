### 练习 12.3：Gauss 判别法的威力
讨论超几何级数 $\sum_{n=1}^{\infty} \frac{\alpha(\alpha+1)\dots(\alpha+n-1)\beta(\beta+1)\dots(\beta+n-1)}{n!\gamma(\gamma+1)\dots(\gamma+n-1)}$ 的收敛性 ($\alpha, \beta, \gamma > 0$)。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
设通项为 $a_n$。
$\frac{a_n}{a_{n+1}} = \frac{(n+1)(\gamma+n)}{(\alpha+n)(\beta+n)} = \frac{n^2 + (\gamma+1)n + \gamma}{n^2 + (\alpha+\beta)n + \alpha\beta}$
$= \frac{1 + \frac{\gamma+1}{n} + \frac{\gamma}{n^2}}{1 + \frac{\alpha+\beta}{n} + \frac{\alpha\beta}{n^2}}$
利用级数展开 $(1+x)^{-1} = 1-x+x^2 + O(x^3)$：
$\frac{a_n}{a_{n+1}} = (1 + \frac{\gamma+1}{n} + \frac{\gamma}{n^2})(1 - \frac{\alpha+\beta}{n} + \frac{(\alpha+\beta)^2 - \alpha\beta}{n^2} + O(\frac{1}{n^3}))$
$= 1 + \frac{\gamma+1-(\alpha+\beta)}{n} + O(\frac{1}{n^2})$。
Gauss 判别法形式为 $\frac{a_n}{a_{n+1}} = 1 + \frac{\mu}{n} + O(\frac{1}{n^2})$：
- 这里 $\mu = \gamma+1-\alpha-\beta$。
- 当 $\mu > 1 \implies \gamma > \alpha+\beta$ 时，级数收敛。
- 当 $\mu \le 1 \implies \gamma \le \alpha+\beta$ 时，级数发散。

#### 答案
当 $\gamma > \alpha+\beta$ 时收敛；否则发散。
</details>

---

## 第十三章：函数列与函数项级数 (Sequences and Series of Functions)

### 练习 13.3：Dini 定理的应用
设 $f_n \in C[a,b]$，且对于每个 $x \in [a,b]$，数列 $\{f_n(x)\}$ 单调递增趋于 $f(x)$。若 $f$ 也是 $[a,b]$ 上的连续函数，证明 $f_n$ 在 $[a,b]$ 上一致收敛于 $f$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
这是著名的 **Dini 定理**。
证明思路：
设 $g_n(x) = f(x) - f_n(x)$。则 $g_n \in C[a,b]$，且 $g_n(x) \searrow 0$。
对于 $\forall \epsilon > 0$，定义集合 $K_n = \{x \in [a,b] \mid g_n(x) \ge \epsilon\}$。
- 由于 $g_n$ 连续，$K_n$ 是闭集。由于 $[a,b]$ 紧，故 $K_n$ 是紧集。
- 由于 $g_n(x)$ 单调递减，$K_{n+1} \subset K_n$。
- 由于 $g_n(x) \to 0$，对 $\forall x$，总存在 $N$ 使 $g_N(x) < \epsilon$，即 $x \notin K_N$。
- 故 $\bigcap_{n=1}^\infty K_n = \emptyset$。
根据有限覆盖定理（或闭集套定理的紧性描述），必存在某个 $N$ 使得 $K_N = \emptyset$。
这意味着对 $\forall x \in [a,b]$，有 $g_N(x) < \epsilon$。
由于单调性，当 $n > N$ 时，$0 \le g_n(x) \le g_N(x) < \epsilon$。
证毕。

#### 答案
证毕。
</details>

---

## 第十四章：幂级数 (Power Series)

### 练习 14.2：利用幂级数计算数项级数
计算 $\sum_{n=0}^{\infty} \frac{(-1)^n}{3n+1}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
考虑幂级数 $f(x) = \sum_{n=0}^\infty \frac{(-1)^n x^{3n+1}}{3n+1}$。
在收敛半径内逐项求导：$f'(x) = \sum_{n=0}^\infty (-1)^n x^{3n} = \frac{1}{1+x^3}$。
由于 $f(0) = 0$，故 $f(1) = \int_0^1 \frac{dx}{1+x^3}$。
利用部分分式展开：
$\frac{1}{1+x^3} = \frac{1}{3(x+1)} - \frac{x-2}{3(x^2-x+1)}$
$\int_0^1 \frac{1}{x+1} dx = \ln 2$。
$\int_0^1 \frac{x-2}{x^2-x+1} dx = \int_0^1 \frac{1/2(2x-1)-3/2}{x^2-x+1} dx = \frac{1}{2} \ln(x^2-x+1) \Big|_0^1 - \frac{3}{2} \int_0^1 \frac{dx}{(x-1/2)^2+3/4}$
$= 0 - \frac{3}{2} \cdot \frac{2}{\sqrt{3}} [\arctan \frac{2x-1}{\sqrt{3}}]_0^1 = -\sqrt{3} (\frac{\pi}{6} - (-\frac{\pi}{6})) = -\frac{\sqrt{3}\pi}{3}$。
综合得 $f(1) = \frac{1}{3} \ln 2 + \frac{\sqrt{3}\pi}{9}$。

#### 答案
$\frac{1}{3} \ln 2 + \frac{\sqrt{3}\pi}{9}$
</details>

---

## 第十五章：Fourier 级数 (Fourier Series)

### 练习 15.3：一般周期函数的 Fourier 展开
将 $f(x) = |x|$ 在 $(-L, L)$ 上展开为 Fourier 级数。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
周期为 $2L$。$f(x)$ 是偶函数，$b_n = 0$。
$a_n = \frac{2}{L} \int_0^L x \cos \frac{n\pi x}{L} dx$。
1. $a_0 = \frac{2}{L} \int_0^L x dx = L$。
2. $a_n = \frac{2}{L} [\frac{Lx}{n\pi} \sin \frac{n\pi x}{L} \Big|_0^L - \int_0^L \frac{L}{n\pi} \sin \frac{n\pi x}{L} dx]$
$= \frac{2}{L} [0 + (\frac{L}{n\pi})^2 \cos \frac{n\pi x}{L} \Big|_0^L] = \frac{2L}{n^2\pi^2} [(-1)^n - 1]$。
- 当 $n$ 为偶数时，$a_n = 0$。
- 当 $n$ 为奇数时，$a_n = -\frac{4L}{n^2\pi^2}$。
故 $f(x) = \frac{L}{2} - \frac{4L}{\pi^2} \sum_{k=0}^\infty \frac{1}{(2k+1)^2} \cos \frac{(2k+1)\pi x}{L}$。

#### 答案
$|x| = \frac{L}{2} - \frac{4L}{\pi^2} \sum_{k=0}^\infty \frac{1}{(2k+1)^2} \cos \frac{(2k+1)\pi x}{L}$
</details>

### 练习 15.4：Parseval 等式与 Basel 问题
利用 $f(x) = x$ 在 $(-\pi, \pi)$ 上的 Fourier 展开，计算 $\sum_{n=1}^\infty \frac{1}{n^2}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **Fourier 展开**：
   $f(x) = x$ 是奇函数，$a_n = 0$。
   $b_n = \frac{2}{\pi} \int_0^\pi x \sin nx dx = \frac{2}{\pi} [-\frac{x}{n} \cos nx \Big|_0^\pi + \int_0^\pi \frac{1}{n} \cos nx dx]$
   $= \frac{2}{\pi} [-\frac{\pi}{n} (-1)^n + 0] = \frac{2(-1)^{n+1}}{n}$。
   故 $x = 2 \sum_{n=1}^\infty \frac{(-1)^{n+1}}{n} \sin nx$。
2. **利用 Parseval 等式**：
   $\frac{1}{\pi} \int_{-\pi}^\pi |f(x)|^2 dx = \frac{a_0^2}{2} + \sum_{n=1}^\infty (a_n^2 + b_n^2)$
   左边 $= \frac{1}{\pi} \int_{-\pi}^\pi x^2 dx = \frac{1}{\pi} [\frac{x^3}{3}]_{-\pi}^\pi = \frac{2\pi^2}{3}$。
   右边 $= 0 + \sum_{n=1}^\infty (\frac{2(-1)^{n+1}}{n})^2 = 4 \sum_{n=1}^\infty \frac{1}{n^2}$。
   故 $4 \sum_{n=1}^\infty \frac{1}{n^2} = \frac{2\pi^2}{3} \implies \sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6}$。

#### 答案
$\pi^2/6$
</details>

---

## 延伸入口

- [第十二章 数项级数](/docs/academic-math/analysis/series)
- [第十三章 函数列与函数项级数](/docs/academic-math/analysis/function-sequences)
- [第十四章 幂级数](/docs/academic-math/analysis/power-series)
- [第十五章 傅里叶级数](/docs/academic-math/analysis/fourier-series)
- [数学分析综合练习库](/docs/exercises/math/analysis)


