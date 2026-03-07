---
title: 级数 (Series)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 级数 (Series)

级数是分析学中处理无限求和问题的核心工具，是连接离散与连续、代数与分析的桥梁。本节重点讨论数项级数的敛散性判别及其分析性质。

---

## 1. 数项级数基本概念

对于数列 $\{a_n\}$，其无限求和 $\sum_{n=1}^\infty a_n$ 称为 **数项级数**。
- **部分和**：$S_n = \sum_{i=1}^n a_i$。
- **收敛性**：若 $\lim_{n \to \infty} S_n = S$ 存在（有限），则级数收敛，称 $S$ 为其和；否则级数发散。
- **必要条件**：若 $\sum a_n$ 收敛，则 $\lim_{n \to \infty} a_n = 0$。（注意：逆命题不成立，如调和级数 $\sum \frac{1}{n}$）。

---

## 2. 正项级数判别法 (Positive Term Series)

若 $a_n \geq 0$，则级数 $\sum a_n$ 的敛散性判别有如下工具：

### 2.1 比较判别法 (Comparison Test)
设 $0 \leq a_n \leq b_n$：
- 若 $\sum b_n$ 收敛，则 $\sum a_n$ 收敛；
- 若 $\sum a_n$ 发散，则 $\sum b_n$ 发散。

<KnowledgeCard type="info" title="极限形式 (Limit Comparison Test)">
若 $\lim_{n \to \infty} \frac{a_n}{b_n} = l$：
- $0 < l < \infty$：$\sum a_n$ 与 $\sum b_n$ 同敛散；
- $l = 0$：$\sum b_n$ 收敛 $\implies \sum a_n$ 收敛；
- $l = \infty$：$\sum b_n$ 发散 $\implies \sum a_n$ 发散。
</KnowledgeCard>

### 2.2 比值与根值判别法
- **比值判别法 (D'Alembert)**：设 $r = \lim_{n \to \infty} \frac{a_{n+1}}{a_n}$。
  - $r < 1$ 收敛；$r > 1$ 发散；$r = 1$ 失效。
- **根值判别法 (Cauchy)**：设 $\rho = \lim_{n \to \infty} \sqrt[n]{a_n}$。
  - $\rho < 1$ 收敛；$\rho > 1$ 发散；$\rho = 1$ 失效。

### 2.3 积分判别法 (Integral Test)
若 $f(x)$ 是 $[1, \infty)$ 上的非负、递减连续函数，且 $f(n) = a_n$，则：
$\sum_{n=1}^\infty a_n$ 收敛 $\iff \int_1^\infty f(x) dx$ 收敛。
> **应用**：$p$-级数 $\sum \frac{1}{n^p}$ 在 $p > 1$ 时收敛，$p \leq 1$ 时发散。

### 2.4 Raabe 判别法 (深度扩展)
当比值判别法失效（$r=1$）时，可尝试 **Raabe 判别法**：
设 $K = \lim_{n \to \infty} n \left( \frac{a_n}{a_{n+1}} - 1 \right)$。
- $K > 1$ 收敛；$K < 1$ 发散；$K = 1$ 仍可能失效。

---

## 3. 变号级数 (Series with Arbitrary Terms)

### 3.1 交错级数与 Leibniz 判别法
形如 $\sum (-1)^{n-1} a_n$ ($a_n > 0$) 的级数称为 **交错级数**。
<KnowledgeCard type="success" title="Leibniz 判别法">
若数列 $\{a_n\}$ 满足：
1. $a_n \geq a_{n+1}$ (单调不增)；
2. $\lim_{n \to \infty} a_n = 0$；
则级数 $\sum_{n=1}^\infty (-1)^{n-1} a_n$ 收敛，且余项 $|R_n| \leq a_{n+1}$。
</KnowledgeCard>

### 3.2 绝对收敛与条件收敛
- **绝对收敛**：若 $\sum |a_n|$ 收敛，则 $\sum a_n$ 必收敛。
- **条件收敛**：若 $\sum a_n$ 收敛但 $\sum |a_n|$ 发散。
> **重要定理 (Riemann)**：条件收敛级数经适当重排后，其和可为任意实数或发散。

---

## 4. 深度例题：数项级数

### 例题 1：Raabe 判别法的应用
判定级数 $\sum_{n=1}^\infty \frac{(2n-1)!!}{(2n)!!} \frac{1}{2n+1}$ 的敛散性。

**解析**：
设 $a_n = \frac{(2n-1)!!}{(2n)!!} \frac{1}{2n+1}$。考察比值：
$\frac{a_n}{a_{n+1}} = \frac{(2n-1)!!}{(2n)!! (2n+1)} \cdot \frac{(2n+2)!! (2n+3)}{(2n+1)!!} = \frac{(2n+2)(2n+3)}{(2n+1)(2n+1)} = \frac{4n^2 + 10n + 6}{4n^2 + 4n + 1}$
当 $n \to \infty$ 时，比值趋于 1，D'Alembert 失效。使用 Raabe 判别法：
$K = \lim_{n \to \infty} n \left( \frac{4n^2 + 10n + 6}{4n^2 + 4n + 1} - 1 \right) = \lim_{n \to \infty} n \frac{6n + 5}{4n^2 + 4n + 1} = \frac{6}{4} = 1.5$
因为 $1.5 > 1$，由 Raabe 判别法知级数 **收敛**。

### 例题 2：交错级数的敛散性分析
讨论级数 $\sum_{n=2}^\infty \frac{(-1)^n}{n + (-1)^n}$ 的敛散性。

**解析**：
该级数虽然是交错的，但项 $|a_n| = \frac{1}{n + (-1)^n}$ 并不单调递减（例如 $a_2 = 1/3, a_3 = 1/2$），不能直接用 Leibniz 判别法。
利用泰勒展开或代数变形：
$\frac{(-1)^n}{n + (-1)^n} = \frac{(-1)^n}{n(1 + \frac{(-1)^n}{n})} = \frac{(-1)^n}{n} \left( 1 - \frac{(-1)^n}{n} + O(\frac{1}{n^2}) \right) = \frac{(-1)^n}{n} - \frac{1}{n^2} + O(\frac{1}{n^3})$
- $\sum \frac{(-1)^n}{n}$ 收敛（Leibniz）；
- $\sum \frac{1}{n^2}$ 收敛（$p$-级数）；
- $\sum O(\frac{1}{n^3})$ 绝对收敛。
故原级数 **收敛**（实际上是条件收敛）。

---
## 5. 幂级数 (Power Series) 深度解析

形如 $\sum_{n=0}^\infty a_n (x - x_0)^n$ 的级数是分析学中最重要的一类函数级数。

### 5.1 收敛半径与 Cauchy-Hadamard 公式
对于幂级数 $\sum a_n x^n$，其收敛性由 **收敛半径 $R$** 决定：
- 若 $|x| < R$，级数绝对收敛；
- 若 $|x| > R$，级数发散；
- 若 $|x| = R$，级数可能收敛也可能发散（需单独讨论端点）。

<KnowledgeCard type="tip" title="收敛半径的计算公式">
1.  **Cauchy-Hadamard 公式**：
    $$\frac{1}{R} = \limsup_{n \to \infty} \sqrt[n]{|a_n|}$$
2.  **比值法 (常用)**：
    $$R = \lim_{n \to \infty} \left| \frac{a_n}{a_{n+1}} \right| \quad (\text{前提是极限存在})$$
</KnowledgeCard>

### 5.2 常用函数的 Maclaurin 展开 (重点)
在 $x=0$ 处的 Taylor 展开称为 Maclaurin 展开。以下是必须熟记的基础公式：

| 函数 $f(x)$ | 展开式 $\sum_{n=0}^\infty a_n x^n$ | 收敛区间 |
| :--- | :--- | :--- |
| $\frac{1}{1-x}$ | $1 + x + x^2 + \dots = \sum_{n=0}^\infty x^n$ | $(-1, 1)$ |
| $e^x$ | $1 + x + \frac{x^2}{2!} + \dots = \sum_{n=0}^\infty \frac{x^n}{n!}$ | $(-\infty, \infty)$ |
| $\sin x$ | $x - \frac{x^3}{3!} + \dots = \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!}$ | $(-\infty, \infty)$ |
| $\cos x$ | $1 - \frac{x^2}{2!} + \dots = \sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{(2n)!}$ | $(-\infty, \infty)$ |
| $\ln(1+x)$ | $x - \frac{x^2}{2} + \frac{x^3}{3} - \dots = \sum_{n=1}^\infty (-1)^{n-1} \frac{x^n}{n}$ | $(-1, 1]$ |
| $(1+x)^\alpha$ | $1 + \alpha x + \frac{\alpha(\alpha-1)}{2!} x^2 + \dots = \sum_{n=0}^\infty \binom{\alpha}{n} x^n$ | $(-1, 1)$ |

### 5.3 解析性质
幂级数在其收敛区间 $(x_0-R, x_0+R)$ 内具有极好的性质：
1.  **连续性**：幂级数的和函数在其收敛区间内连续。
2.  **逐项求导**：$f'(x) = \sum_{n=1}^\infty n a_n (x-x_0)^{n-1}$，半径 $R$ 不变。
3.  **逐项积分**：$\int f(x)dx = \sum_{n=0}^\infty \frac{a_n}{n+1} (x-x_0)^{n+1} + C$，半径 $R$ 不变。

---

## 6. 深度例题：幂级数与综合应用

### 例题 3：收敛域的完整判定
求幂级数 $\sum_{n=1}^\infty \frac{(-1)^n}{n \cdot 2^n} (x-1)^n$ 的收敛域。

**解析**：
1.  **计算收敛半径**：
    $a_n = \frac{(-1)^n}{n \cdot 2^n}$。使用比值法：
    $R = \lim_{n \to \infty} \left| \frac{a_n}{a_{n+1}} \right| = \lim_{n \to \infty} \left| \frac{(-1)^n}{n \cdot 2^n} \cdot \frac{(n+1) \cdot 2^{n+1}}{(-1)^{n+1}} \right| = \lim_{n \to \infty} \frac{n+1}{n} \cdot 2 = 2$
    级数在 $|x-1| < 2$ 即 $-1 < x < 3$ 内绝对收敛。

2.  **讨论端点**：
    - 当 $x=3$ 时：级数为 $\sum \frac{(-1)^n}{n \cdot 2^n} (2)^n = \sum \frac{(-1)^n}{n}$。这是交错级数，由 Leibniz 判别法知其 **收敛**（条件收敛）。
    - 当 $x=-1$ 时：级数为 $\sum \frac{(-1)^n}{n \cdot 2^n} (-2)^n = \sum \frac{(-1)^n (-1)^n 2^n}{n \cdot 2^n} = \sum \frac{1}{n}$。这是调和级数，**发散**。
故收敛域为 **$(-1, 3]$**。

### 例题 4：利用幂级数求数项级数和
求级数 $\sum_{n=1}^\infty \frac{n}{2^n}$ 的值。

**解析**：
考虑幂级数 $f(x) = \sum_{n=1}^\infty n x^n$。我们知道 $\frac{1}{1-x} = \sum_{n=0}^\infty x^n$ ($|x|<1$)。
两边求导：$\frac{1}{(1-x)^2} = \sum_{n=1}^\infty n x^{n-1}$。
两边同乘以 $x$：$\frac{x}{(1-x)^2} = \sum_{n=1}^\infty n x^n = f(x)$。
令 $x = \frac{1}{2}$，代入得：
$f(1/2) = \frac{1/2}{(1 - 1/2)^2} = \frac{1/2}{1/4} = 2$。
故 $\sum_{n=1}^\infty \frac{n}{2^n} = 2$。

---

## 7. 配套练习

1.  **基础-正项**：判定 $\sum_{n=1}^\infty \left( 1 - \cos \frac{1}{n} \right)$ 的敛散性。
2.  **基础-交错**：判定 $\sum_{n=2}^\infty \frac{(-1)^n}{\ln n}$ 是绝对收敛、条件收敛还是发散。
3.  **幂级数展开**：将 $f(x) = \frac{1}{2+x}$ 展开为 $x$ 的幂级数，并指出其收敛半径。
4.  **收敛域判定**：求 $\sum_{n=1}^\infty \frac{x^n}{\sqrt{n}}$ 的收敛域。
5.  **综合计算**：利用级数展开求极限 $\lim_{x \to 0} \frac{x - \sin x}{x^3}$。
6.  **挑战**：求级数 $\sum_{n=1}^\infty \frac{1}{n^2 + n}$ 的和（提示：部分分数分解）。

---

## 8. 练习库同步 (Analysis Exercise Sync)

本章知识点对应练习库中的以下强化题目：

1. [**练习 42：数项级数敛散性综合判别**](../exercises/math/analysis.md#练习-42正项级数判别) - 训练对 $p$-级数、比值与根值法的综合运用。
2. **Raabe 判别法实战**：判定 $\sum \frac{(2n-1)!!}{(2n)!!}$ 的敛散性。
3. **交错级数判定**：讨论 $\sum (-1)^n \frac{\ln n}{n}$ 的绝对收敛与条件收敛性。
4. **幂级数收敛域计算**：求 $\sum \frac{(x-1)^n}{n \cdot 2^n}$ 的收敛区间及端点敛散性。
5. **Taylor 展开应用**：利用展开式求 $\sum_{n=0}^\infty \frac{(-1)^n}{(2n+1)!}$ 的精确值。


---
<KnowledgeCard type="success" title="学习提示">
掌握数项级数的关键在于：
1. **量级估算**：通过等价无穷小快速确定正项级数的基准（通常是 $p$-级数）。
2. **特殊构造**：遇到 Leibniz 失效时，考虑泰勒展开分离出主项。
</KnowledgeCard>
