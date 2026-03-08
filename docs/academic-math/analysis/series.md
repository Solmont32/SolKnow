---
title: 第十二章 数项级数 (Numerical Series)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第十二章 数项级数 (Numerical Series)

级数是分析学中处理无限求和问题的核心工具，是连接离散与连续、代数与分析的桥梁。本节重点讨论数项级数的敛散性判别及其分析性质。

---

## 1. 数项级数基本概念

对于数列 $\{a_n\}$，其无限求和 $\sum_{n=1}^\infty a_n$ 称为 **数项级数**。

- **部分和**：$S_n = \sum_{i=1}^n a_i$。
- **收敛性**：若 $\lim_{n \to \infty} S_n = S$ 存在（有限），则级数收敛，称 $S$ 为其和；否则级数发散。
- **必要条件**：若 $\sum a_n$ 收敛，则 $\lim_{n \to \infty} a_n = 0$。（注意：逆命题不成立，如调和级数 $\sum \frac{1}{n}$）。
- **柯西收敛准则**：$\sum a_n$ 收敛 $\iff \forall \epsilon > 0, \exists N, \forall n > N, \forall p \in \mathbb{N}_+, |a_{n+1} + \dots + a_{n+p}| < \epsilon$。

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
    > **注意**：根值判别法的适用范围比比值判别法更广（若比值极限存在，则根值极限必存在且相等）。

### 2.3 积分判别法 (Integral Test)

若 $f(x)$ 是 $[1, \infty)$ 上的非负、递减连续函数，且 $f(n) = a_n$，则：

$$\sum_{n=1}^\infty a_n \text{ 收敛} \iff \int_1^\infty f(x) dx \text{ 收敛}$$

<KnowledgeCard type="warning" title="余项估计">
若级数收敛，其余项 $R_n = \sum_{k=n+1}^\infty a_k$ 满足：

$$\int_{n+1}^\infty f(x) dx \leq R_n \leq \int_n^\infty f(x) dx$$

</KnowledgeCard>

### 2.4 Raabe 判别法 (深度扩展)

当比值判别法失效（$r=1$）时，Raabe 判别法通过更高阶的渐近分析给出结论：
设 $K = \lim_{n \to \infty} n \left( \frac{a_n}{a_{n+1}} - 1 \right)$。

- **$K > 1$**：级数收敛。
- **$K < 1$**：级数发散。
- **$K = 1$**：失效（需更精细的判别法，如 Gauss 判别法）。

### 2.5 Gauss 判别法 (完备化工具)

若正项级数满足：

$$\frac{a_n}{a_{n+1}} = 1 + \frac{\mu}{n} + \frac{\theta_n}{n^{1+\lambda}} \quad (\lambda > 0, |\theta_n| \text{ 有界})$$

- 若 **$\mu > 1$**，级数收敛。
- 若 **$\mu \leq 1$**，级数发散。
  > Gauss 判别法是处理超几何级数等复杂项级数的终极利器，它涵盖了比值法与 Raabe 法。

---

## 3. 变号级数 (Series with Arbitrary Terms)

### 3.1 交错级数与 Leibniz 判别法

形如 $\sum (-1)^{n-1} a_n$ ($a_n > 0$) 的级数。若 $\{a_n\}$ 单调不增且趋于 0，则级数收敛。

### 3.2 绝对收敛与条件收敛

- **绝对收敛**：$\sum |a_n|$ 收敛。绝对收敛级数具有类似于有限和的优良性质（如可交换性、乘法性质）。
- **条件收敛**：$\sum a_n$ 收敛但 $\sum |a_n|$ 发散。

<KnowledgeCard type="warning" title="Riemann 重排定理 (Riemann Rearrangement Theorem)">
若级数 $\sum a_n$ 条件收敛，则对于任意实数 $S$（包括 $\pm\infty$），必存在一种重排方式，使得重排后的级数和为 $S$。
</KnowledgeCard>

### 3.3 级数的乘积 (Cauchy Product)

设 $A = \sum_{n=0}^\infty a_n, B = \sum_{n=0}^\infty b_n$。定义其 Cauchy 乘积为 $\sum_{n=0}^\infty c_n$，其中 $c_n = \sum_{k=0}^n a_k b_{n-k}$。

- **Mertens 定理**：若两级数至少有一个绝对收敛，且另一个收敛，则其 Cauchy 乘积收敛于 $AB$。
- 若两个级数都绝对收敛，则其乘积也绝对收敛。

---

## 4. 深度实战解析 (8+ 典型辨析与计算)

### 案例 1：Raabe 判别法的精细应用

判定级数 $\sum_{n=1}^\infty \left[ \frac{(2n-1)!!}{(2n)!!} \right]^p$ 的敛散性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. **写出比值**：
   $\frac{a_n}{a_{n+1}} = \left[ \frac{(2n-1)!!}{(2n)!!} \cdot \frac{(2n+2)!!}{(21+1)!!} \right]^p = \left( \frac{2n+2}{2n+1} \right)^p = \left( 1 + \frac{1}{2n+1} \right)^p$
2. **泰勒展开**：
   $\frac{a_n}{a_{n+1}} = 1 + \frac{p}{2n+1} + O(\frac{1}{n^2}) = 1 + \frac{p/2}{n + 1/2} + O(\frac{1}{n^2}) = 1 + \frac{p/2}{n} + O(\frac{1}{n^2})$
3. **应用 Raabe**：
   $K = \lim_{n \to \infty} n (\frac{a_n}{a_{n+1}} - 1) = \frac{p}{2}$
4. **结论**：
   - 当 $p > 2$ 时，收敛；
   - 当 $p < 2$ 时，发散；
   - 当 $p = 2$ 时，由上述展开知 $\mu = 1$，Raabe 失效。但观察 $\frac{a_n}{a_{n+1}} = 1 + \frac{1}{n} + O(\frac{1}{n^2})$，由 Gauss 判别法知 $p=2$ 时发散。

#### 答案

$p > 2$ 收敛，$p \leq 2$ 发散。

</details>

### 案例 2：积分判别法判定 $\ln$ 相关级数

判定级数 $\sum_{n=2}^\infty \frac{1}{n (\ln n)^p}$ 的敛散性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. **构造函数**：设 $f(x) = \frac{1}{x (\ln x)^p}$，在 $[2, \infty)$ 上非负递减。
2. **计算广义积分**：
   $\int_2^\infty \frac{1}{x (\ln x)^p} dx \stackrel{u=\ln x}{=} \int_{\ln 2}^\infty \frac{1}{u^p} du$
3. **积分敛散性**：
   该积分在 $p > 1$ 时收敛，$p \leq 1$ 时发散。
4. **结论**：
   原级数在 $p > 1$ 时收敛，$p \leq 1$ 时发散。

#### 答案

$p > 1$ 收敛，$p \leq 1$ 发散。

</details>

### 案例 3：变号级数辨析 (Dirichlet/Abel 预热)

讨论 $\sum_{n=1}^\infty \frac{\sin n}{n^p}$ ($p > 0$) 的敛散性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. **绝对收敛性**：当 $p > 1$ 时，由 $|\frac{\sin n}{n^p}| \leq \frac{1}{n^p}$ 知绝对收敛。
2. **条件收敛性**：当 $0 < p \leq 1$ 时。
   - 利用 Dirichlet 判别法（$\sum \sin n$ 部分和有界，$\frac{1}{n^p} \searrow 0$）知级数收敛。
   - 考察绝对值 $\sum \frac{|\sin n|}{n^p} \geq \sum \frac{\sin^2 n}{n^p} = \sum \frac{1 - \cos 2n}{2n^p}$。
   - $\sum \frac{1}{2n^p}$ 发散，$1/2 \sum \frac{\cos 2n}{n^p}$ 收敛 $\implies \sum \frac{|\sin n|}{n^p}$ 发散。
3. **结论**：$p > 1$ 绝对收敛，$0 < p \leq 1$ 条件收敛。

#### 答案

$p > 1$ 绝对收敛，$0 < p \leq 1$ 条件收敛。

</details>

### 案例 4：Gauss 判别法的实战

判定级数 $\sum_{n=1}^\infty a_n$，其中 $a_n = \frac{n! e^n}{n^n \sqrt{n}}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. **比值计算**：
   $\frac{a_n}{a_{n+1}} = \frac{n! e^n}{n^{n+1/2}} \cdot \frac{(n+1)^{n+3/2}}{(n+1)! e^{n+1}} = \frac{1}{e} \left( \frac{n+1}{n} \right)^{n+1/2} = \frac{1}{e} \left( 1 + \frac{1}{n} \right)^{n+1/2}$
2. **利用展开式**：
   $\ln \frac{a_n}{a_{n+1}} = (n + \frac{1}{2}) \ln(1 + \frac{1}{n}) - 1 = (n + \frac{1}{2}) ( \frac{1}{n} - \frac{1}{2n^2} + \frac{1}{3n^3} + O(\frac{1}{n^4}) ) - 1$
   $= (1 - \frac{1}{2n} + \frac{1}{3n^2} + \frac{1}{2n} - \frac{1}{4n^2} + O(\frac{1}{n^3})) - 1 = \frac{1}{12n^2} + O(\frac{1}{n^3})$
3. **还原比值**：
   $\frac{a_n}{a_{n+1}} = e^{\frac{1}{12n^2} + O(\frac{1}{n^3})} = 1 + \frac{0}{n} + \frac{1}{12n^2} + O(\frac{1}{n^3})$
4. **应用 Gauss**：
   这里 $\mu = 0 \leq 1$，故级数发散。
   _(注：这就是 Stirling 公式的来源分析之一)_

#### 答案

发散。

</details>

### 案例 5：Riemann 重排定理的直观理解

考虑交错调和级数 $S = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \dots = \ln 2$。将其重排为：正项 1 个，负项 2 个。
$1 - \frac{1}{2} - \frac{1}{4} + \frac{1}{3} - \frac{1}{6} - \frac{1}{8} + \dots$ 求其新和。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. **分组分析**：
   $(1 - \frac{1}{2}) - \frac{1}{4} + (\frac{1}{3} - \frac{1}{6}) - \frac{1}{8} + \dots$
   $= \frac{1}{2} - \frac{1}{4} + \frac{1}{6} - \frac{1}{8} + \dots$
2. **提取公因子**：
   $= \frac{1}{2} (1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \dots) = \frac{1}{2} \ln 2$
3. **结论**：
   同一级数，仅改变求和顺序，和从 $\ln 2$ 变为了 $\frac{1}{2} \ln 2$。这有力地证明了条件收敛级数重排后性质的不稳定性。

#### 答案

$\frac{1}{2} \ln 2$

</details>

### 案例 6：Cauchy 乘积计算

求级数 $\sum_{n=0}^\infty \frac{x^n}{n!}$ 与自身的 Cauchy 乘积。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. **应用公式**：
   $c_n = \sum_{k=0}^n a_k a_{n-k} = \sum_{k=0}^n \frac{x^k}{k!} \frac{x^{n-k}}{(n-k)!} = \frac{x^n}{n!} \sum_{k=0}^n \frac{n!}{k!(n-k)!}$
2. **利用二项式系数**：
   $c_n = \frac{x^n}{n!} \sum_{k=0}^n \binom{n}{k} = \frac{x^n}{n!} \cdot 2^n = \frac{(2x)^n}{n!}$
3. **结论**：
   $(\sum \frac{x^n}{n!})^2 = \sum \frac{(2x)^n}{n!}$。这对应了指数函数的性质 $e^x \cdot e^x = e^{2x}$。

#### 答案

$\sum_{n=0}^\infty \frac{(2x)^n}{n!}$

</details>

### 案例 7：必要条件判定的陷阱

判定级数 $\sum_{n=1}^\infty \frac{1}{n^{1+1/n}}$ 的敛散性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. **考察一般项**：
   $a_n = \frac{1}{n \cdot n^{1/n}}$
2. **极限分析**：
   我们知道 $\lim_{n \to \infty} n^{1/n} = 1$。
3. **比较判别法**：
   利用极限形式比较判别法，取 $b_n = \frac{1}{n}$：
   $\lim_{n \to \infty} \frac{a_n}{b_n} = \lim_{n \to \infty} \frac{1}{n^{1/n}} = 1$
4. **结论**：
   由于 $\sum \frac{1}{n}$ 发散，故原级数发散。
   _(注：尽管指数 $1+1/n > 1$，但它趋向 1 的速度太快，无法保证收敛)_

#### 答案

发散。

</details>

### 案例 8：结合积分判别法的误差估计

级数 $\sum_{n=1}^\infty \frac{1}{n^2}$ 收敛于 $\pi^2/6$。若取前 100 项求和，误差 $R_{100}$ 范围是多少？

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. **应用积分判别法余项公式**：
   $\int_{101}^\infty \frac{1}{x^2} dx \leq R_{100} \leq \int_{100}^\infty \frac{1}{x^2} dx$
2. **计算积分**：
   $\int_{N}^\infty x^{-2} dx = [-\frac{1}{x}]_N^\infty = \frac{1}{N}$
3. **结论**：
   $\frac{1}{101} \leq R_{100} \leq \frac{1}{100}$
   即误差在 $0.0099$ 到 $0.01$ 之间。

#### 答案

$0.0099 \leq R_{100} \leq 0.01$

</details>

---

## 5. 延伸阅读

本章讨论了常数项级数的敛散性。对于包含变量 $x$ 的级数，请参阅后续章节：

- [**第十三章 函数序列与函数项级数**](./function-sequences.md)
- [**第十四章 幂级数**](./power-series.md)

---

## 6. 配套练习

1.  **基础-正项**：判定 $\sum_{n=1}^\infty \left( 1 - \cos \frac{1}{n} \right)$ 的敛散性。
2.  **基础-交错**：判定 $\sum_{n=2}^\infty \frac{(-1)^n}{\ln n}$ 是绝对收敛、条件收敛还是发散。
3.  **计算**：求级数 $\sum_{n=1}^\infty \frac{1}{n^2 + 3n + 2}$ 的和。
4.  **辨析**：若 $\sum a_n$ 收敛，$a_n > 0$，是否必有 $\sum a_n^2$ 收敛？
5.  **挑战 (Gauss)**：判定 $\sum_{n=1}^\infty \frac{n!}{(a+1)(a+2)\dots(a+n)}$ ($a > 0$) 的敛散性。

<details>

<summary>点击查看练习 3 解析与答案</summary>

#### 解析过程

1. **部分分数分解**：
   $\frac{1}{n^2 + 3n + 2} = \frac{1}{(n+1)(n+2)} = \frac{1}{n+1} - \frac{1}{n+2}$
2. **部分和**：
   $S_n = (\frac{1}{2} - \frac{1}{3}) + (\frac{1}{3} - \frac{1}{4}) + \dots + (\frac{1}{n+1} - \frac{1}{n+2}) = \frac{1}{2} - \frac{1}{n+2}$
3. **求极限**：
   $\lim_{n \to \infty} S_n = 1/2$

#### 答案

$1/2$

</details>

<details>

<summary>点击查看练习 4 解析与答案</summary>

#### 解析过程

**成立**。
因为 $\sum a_n$ 收敛，由必要条件知 $\lim a_n = 0$。
从而对于足够大的 $n$，有 $0 < a_n < 1$。
于是 $0 < a_n^2 < a_n$。
根据比较判别法，$\sum a_n^2$ 必收敛。

#### 答案

是，必收敛。

</details>

<details>

<summary>点击查看练习 5 解析与答案</summary>

#### 解析过程

1. **计算比值**：
   $\frac{a_n}{a_{n+1}} = \frac{n!}{\prod (a+k)} \cdot \frac{\prod_{k=1}^{n+1} (a+k)}{(n+1)!} = \frac{a+n+1}{n+1} = \frac{n+1+a}{n+1} = 1 + \frac{a}{n+1}$
2. **应用 Raabe**：
   $K = \lim_{n \to \infty} n (\frac{a_n}{a_{n+1}} - 1) = \lim_{n \to \infty} \frac{an}{n+1} = a$
3. **结论**：
   - $a > 1$ 收敛；
   - $a < 1$ 发散；
   - $a = 1$ 时，$\frac{a_n}{a_{n+1}} = 1 + \frac{1}{n+1}$，比值极限为 1，Raabe 失效。但观察 $\frac{a_n}{a_{n+1}} = 1 + \frac{1}{n+1} < 1 + \frac{1}{n}$，或者直接看到 $a_n = \frac{n!}{(n+1)!} = \frac{1}{n+1}$，级数发散。

#### 答案

$a > 1$ 收敛，$a \leq 1$ 发散。

</details>

---

<SupportingExercises
topic="数项级数"
fileId="analysis-series-fourier"
exercises={[
{ index: 12.1, title: "比值与根值判别法进阶", slug: "练习-121比值判别法与根值判别法的极限情形" },
{ index: 12.2, title: "Raabe 判别法的应用", slug: "练习-122raabe-判别法的应用" },
{ index: 12.3, title: "Gauss 判别法的威力", slug: "练习-123gauss-判别法的威力" }
]}
/>

---

_编者注：数项级数是处理无穷小量与无限逼近的基石。掌握 Raabe 与 Gauss 判别法，能让你在面对复杂极限时游刃有余。_
