---
title: 级数 (Series)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 级数 (Series)

级数是分析学中处理无限求和问题的核心工具，是连接离散与连续、代数与分析的桥梁。

## 1. 数项级数回顾
若数列 $\{a_n\}$ 的部分和 $S_n = \sum_{i=1}^n a_i$ 当 $n \to \infty$ 时极限存在且为 $S$，则称级数收敛。

### 敛散性判别法
1.  **正项级数**：比较判别法、比值判别法 (d'Alembert)、根值判别法 (Cauchy)。
2.  **交错级数**：Leibniz 判别法（$|a_n|$ 单调递减且趋于 0）。
3.  **绝对收敛与条件收敛**：若 $\sum |a_n|$ 收敛，则 $\sum a_n$ 绝对收敛。

---

## 2. 幂级数 (Power Series) 深度扩展

形如 $\sum_{n=0}^\infty a_n (x - x_0)^n$ 的级数称为 **幂级数**。本节重点讨论以 0 为中心的幂级数 $\sum a_n x^n$。

### 2.1 收敛半径与 Cauchy-Hadamard 公式
根据 Abel 引理，若幂级数在 $x_0 \neq 0$ 处收敛，则对于满足 $|x| < |x_0|$ 的一切 $x$，级数绝对收敛。

<KnowledgeCard type="tip" title="收敛半径的判定">
幂级数的收敛半径 $R$ 由 **Cauchy-Hadamard 公式** 给出：
$$\frac{1}{R} = \limsup_{n \to \infty} \sqrt[n]{|a_n|}$$
此外，若极限 $\lim_{n \to \infty} \left| \frac{a_{n+1}}{a_n} \right| = \rho$ 存在，则 $R = \frac{1}{\rho}$。
</KnowledgeCard>

- 若 $|x| < R$，级数绝对收敛；
- 若 $|x| > R$，级数发散；
- 若 $|x| = R$，敛散性需单独讨论。

### 2.2 幂级数的解析性质
幂级数在其收敛区间 $(-R, R)$ 内定义的和函数 $S(x)$ 具有极佳的分析性质：

1.  **内一致收敛性**：幂级数在任何闭区间 $[a, b] \subset (-R, R)$ 上一致收敛。
2.  **连续性**：和函数 $S(x)$ 在 $(-R, R)$ 内连续。若级数在端点 $x=R$ 处收敛，则根据 **Abel 第二定理**，$S(x)$ 在该端点左连续。
3.  **逐项求导**：在收敛区间内可逐项求导，且收敛半径不变：
    $$S'(x) = \sum_{n=1}^\infty n a_n x^{n-1}, \quad |x| < R$$
4.  **逐项积分**：在收敛区间内可逐项积分，且收敛半径不变：
    $$\int_0^x S(t) dt = \sum_{n=0}^\infty \frac{a_n}{n+1} x^{n+1}, \quad |x| < R$$

---

## 3. 函数的幂级数展开 (Taylor 展开)

### 3.1 泰勒级数
若 $f(x)$ 在 $x_0$ 处具有各阶导数，则称其泰勒级数为：
$$f(x) \sim \sum_{n=0}^\infty \frac{f^{(n)}(x_0)}{n!} (x - x_0)^n$$
**注意**：泰勒级数收敛并不一定收敛于 $f(x)$。只有当余项 $R_n(x) \to 0$ 时，展开式才成立（此时称 $f$ 为解析函数）。

<KnowledgeCard type="info" title="常用麦克劳林展开 ($|x| < R$)">
- $e^x = \sum_{n=0}^\infty \frac{x^n}{n!}, \quad R = \infty$
- $\sin x = \sum_{n=0}^\infty \frac{(-1)^n x^{2n+1}}{(2n+1)!}, \quad R = \infty$
- $\ln(1+x) = \sum_{n=1}^\infty \frac{(-1)^{n-1} x^n}{n}, \quad R = 1$
- $\frac{1}{1-x} = \sum_{n=0}^\infty x^n, \quad R = 1$
</KnowledgeCard>

---

## 4. 深度例题

### 例题 1：求级数的收敛半径与和函数
求级数 $\sum_{n=1}^\infty n x^n$ 的收敛半径及和函数。

**解析**：
1. **收敛半径**：$a_n = n$，$\lim_{n \to \infty} \frac{a_{n+1}}{a_n} = \lim \frac{n+1}{n} = 1$，故 $R=1$。
2. **求和函数**：
   注意到 $\sum_{n=1}^\infty n x^n = x \sum_{n=1}^\infty n x^{n-1} = x \frac{d}{dx} \left( \sum_{n=0}^\infty x^n \right)$。
   在 $|x| < 1$ 时，$\sum_{n=0}^\infty x^n = \frac{1}{1-x}$。
   求导得：$\frac{d}{dx} \left( \frac{1}{1-x} \right) = \frac{1}{(1-x)^2}$。
   故 $S(x) = \frac{x}{(1-x)^2}$。

### 例题 2：利用幂级数计算定积分
利用幂级数展开计算 $\int_0^1 \frac{\sin x}{x} dx$（保留前三项）。

**解析**：
$\frac{\sin x}{x} = \frac{1}{x} \left( x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots \right) = 1 - \frac{x^2}{6} + \frac{x^4}{120} - \dots$
逐项积分：
$\int_0^1 \left( 1 - \frac{x^2}{6} + \frac{x^4}{120} \right) dx = \left[ x - \frac{x^3}{18} + \frac{x^5}{600} \right]_0^1 = 1 - \frac{1}{18} + \frac{1}{600} \approx 0.9461$。

---

## 5. 配套练习

1.  **基础**：求幂级数 $\sum_{n=1}^\infty \frac{(x-2)^n}{n^2 3^n}$ 的收敛区间。
2.  **进阶**：将函数 $f(x) = \frac{1}{1+x^2}$ 展开为关于 $x$ 的幂级数，并由此求 $\sum_{n=0}^\infty \frac{(-1)^n}{2n+1}$ 的值（提示：利用 $\arctan x$）。
3.  **深度**：证明：若幂级数 $\sum a_n x^n$ 的收敛半径 $R > 0$，则和函数 $S(x)$ 在 $(-R, R)$ 内无限次可导。
4.  **挑战**：计算级数和 $\sum_{n=1}^\infty \frac{n^2}{2^n}$。

<KnowledgeCard type="success" title="学习提示">
掌握幂级数的关键在于“逐项求导”与“逐项积分”的自由切换，这使得我们可以通过简单的几何级数推导出复杂的函数展开。
</KnowledgeCard>
