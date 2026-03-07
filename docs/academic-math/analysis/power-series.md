---
title: 幂级数 (Power Series)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 第十四章 幂级数 (Power Series)

幂级数是函数项级数中最重要、性质最完整的一类。它不仅是研究解析函数的工具，也是将复杂函数转化为代数多项式处理的核心手段。

---

## 1. 收敛半径与收敛域 (Convergence)

形如 $\sum_{n=0}^\infty a_n (x - x_0)^n$ 的级数称为 **幂级数**。通常取 $x_0 = 0$ 进行讨论。

### 1.1 Cauchy-Hadamard 定理
对于任意幂级数 $\sum a_n x^n$，其收敛性由唯一的 **收敛半径 $R$** 决定：
- 若 $|x| < R$，级数绝对收敛；
- 若 $|x| > R$，级数发散；
- 若 $|x| = R$，敛散性不确定，需单独分析。

<KnowledgeCard type="info" title="收敛半径计算公式">
1. **Cauchy-Hadamard 公式**：
   $$\frac{1}{R} = \limsup_{n \to \infty} \sqrt[n]{|a_n|}$$
2. **比值判别法 (常用)**：
   $$R = \lim_{n \to \infty} \left| \frac{a_n}{a_{n+1}} \right| \quad (\text{前提是极限存在或为 } \infty)$$
</KnowledgeCard>

### 1.2 缺项与特殊幂级数
对于缺项幂级数（如 $\sum a_n x^{2n}$）或复合形式 $\sum a_n [g(x)]^n$，建议直接使用 **根值判别法或比值判别法** 对整体项 $u_n(x)$ 进行敛散性判定，而非死套 $R$ 的公式。

---

## 2. 幂级数的一致收敛性与分析性质

### 2.1 Abel 第一定理
**定理**：若幂级数 $\sum a_n x^n$ 在 $x = x_1 \neq 0$ 处收敛，则对于满足 $|x| < |x_1|$ 的所有 $x$，该级数绝对收敛。
> **推论**：幂级数在收敛区间 $( -R, R )$ 内的任何闭子区间 $[a, b] \subset (-R, R)$ 上均 **一致收敛**。

### 2.2 和函数的解析性质
在收敛区间 $(-R, R)$ 内，和函数 $S(x) = \sum_{n=0}^\infty a_n x^n$ 具有极好的性质：
1. **连续性**：$S(x)$ 在 $(-R, R)$ 内连续。
2. **逐项求导**：$S'(x) = \sum_{n=1}^\infty n a_n x^{n-1}$。求导后的级数与原级数具有相同的收敛半径。
3. **逐项积分**：$\int_0^x S(t) dt = \sum_{n=0}^\infty \frac{a_n}{n+1} x^{n+1}$。积分后的级数与原级数具有相同的收敛半径。

<KnowledgeCard type="success" title="技巧：求和函数的核心策略">
1. **微分法 (处理分子项 $n$)**：若项中含有 $n$ 或 $n^k$，考虑通过对低阶级数求导来“产生”这些项。
   - 例如：$\sum nx^{n-1} = (\sum x^n)'$。
2. **积分法 (处理分母项 $n+k$)**：若项中分母含有 $n+k$，考虑通过积分来“消去”或“产生”分母。
   - 例如：$\sum \frac{x^{n+1}}{n+1} = \int (\sum x^n) dx$。
3. **微分方程法**：对于复杂的递推系数，建立 $S(x)$ 满足的微分方程并求解。
</KnowledgeCard>

<KnowledgeCard type="warning" title="Abel 第二定理 (边界收敛性与左连续性)">
**定理内容**：设幂级数 $\sum_{n=0}^\infty a_n x^n$ 的收敛半径为 $R > 0$。若该级数在右端点 $x=R$ 处收敛，则级数在闭区间 $[0, R]$ 上一致收敛。
由此可得，其和函数 $S(x)$ 在 $x=R$ 处是 **左连续** 的，即：
$$\lim_{x \to R^-} \sum_{n=0}^\infty a_n x^n = \sum_{n=0}^\infty a_n R^n$$
*(同理，若在 $x=-R$ 处收敛，则在 $[-R, 0]$ 上一致收敛且在该点右连续。)*
</KnowledgeCard>

### 2.3 Abel 第二定理的深度理解
1. **核心价值**：该定理建立了“幂级数在开区间内的分析性质”与“边界处项级数的收敛性”之间的桥梁。它允许我们通过取极限的方式计算数项级数的和。
2. **证明思路 (Abel 变换)**：利用分部求和法（Abel 变换），将级数的部分和表示为与边界收敛项相关的形式，结合控制收敛的技巧证明一致收敛。
3. **注意项**：若级数在 $x=R$ 处 **发散**，则和函数 $S(x)$ 当 $x \to R^-$ 时必然趋于无穷（Frobenius 定理的逆性质）。

---

## 3. 函数的幂级数展开 (Expansion)

### 3.1 Taylor 级数与 Maclaurin 级数
若 $f(x)$ 在 $x_0$ 处具有各阶导数，则其 Taylor 级数为：
$$f(x) \sim \sum_{n=0}^\infty \frac{f^{(n)}(x_0)}{n!} (x - x_0)^n$$
**收敛性注意**：Taylor 级数收敛并不一定收敛于 $f(x)$。只有当余项 $R_n(x) \to 0$ 时，展开式才成立。

### 3.2 常用 Maclaurin 展开表 (核心必背)

| 函数 $f(x)$ | 展开式 | 收敛区间 |
| :--- | :--- | :--- |
| $\frac{1}{1-x}$ | $\sum_{n=0}^\infty x^n = 1 + x + x^2 + \dots$ | $(-1, 1)$ |
| $e^x$ | $\sum_{n=0}^\infty \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \dots$ | $(-\infty, \infty)$ |
| $\sin x$ | $\sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{3!} + \dots$ | $(-\infty, \infty)$ |
| $\cos x$ | $\sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \dots$ | $(-\infty, \infty)$ |
| $\ln(1+x)$ | $\sum_{n=1}^\infty (-1)^{n-1} \frac{x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots$ | $(-1, 1]$ |
| $(1+x)^\alpha$ | $\sum_{n=0}^\infty \binom{\alpha}{n} x^n = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!} x^2 + \dots$ | $(-1, 1)$ |

### 3.3 高阶展开技巧
1. **代换法**：利用已知展开式。如展开 $e^{-x^2}$。
2. **代数变形**：如 $\frac{1}{x^2+3x+2} = \frac{1}{x+1} - \frac{1}{x+2}$。
3. **逐项导积法**：
   - 展开 $\arctan x$：先导得 $\frac{1}{1+x^2} = \sum (-1)^n x^{2n}$，再积分。
   - 展开 $\frac{1}{(1-x)^2}$：对 $\frac{1}{1-x}$ 求导。
4. **组合展开法**：利用恒等式。如 $\ln(1+x+x^2) = \ln(1-x^3) - \ln(1-x)$。

---

## 4. 深度例题：综合应用

### 例题 1：利用 Abel 第二定理求级数和
求级数 $1 - \frac{1}{2} + \frac{1}{3} - \dots = \sum_{n=1}^\infty \frac{(-1)^{n-1}}{n}$ 的值。
**解析**：考虑 $f(x) = \sum_{n=1}^\infty \frac{(-1)^{n-1} x^n}{n}$。
在 $(-1, 1)$ 内，$f'(x) = \sum_{n=1}^\infty (-1)^{n-1} x^{n-1} = \frac{1}{1+x}$。
积分得 $f(x) = \ln(1+x) + C$，由 $f(0)=0$ 知 $C=0$。
由于原级数在 $x=1$ 处收敛（Leibniz），根据 Abel 第二定理：
$\sum_{n=1}^\infty \frac{(-1)^{n-1}}{n} = f(1) = \lim_{x \to 1^-} \ln(1+x) = \ln 2$。

### 例题 2：高阶导数的计算技巧
求 $f(x) = \arctan x$ 在 $x=0$ 处的 $n$ 阶导数 $f^{(n)}(0)$。
**解析**：利用 Maclaurin 展开式：
$\arctan x = \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{2n+1}$
对比 Taylor 展开通项 $\frac{f^{(k)}(0)}{k!} x^k$：
- 当 $k = 2n$ (偶数) 时，$f^{(k)}(0) = 0$。
- 当 $k = 2n+1$ (奇数) 时，$\frac{f^{(2n+1)}(0)}{(2n+1)!} = \frac{(-1)^n}{2n+1} \implies f^{(2n+1)}(0) = (-1)^n (2n)!$。

### 例题 3：利用级数求 $\pi$ 的精确值
证明 Gregory-Leibniz 级数：$\frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \dots$。
**解析**：
考虑 $\arctan x$ 的 Maclaurin 展开式：
$\arctan x = x - \frac{x^3}{3} + \frac{x^5}{5} - \dots = \sum_{n=0}^\infty \frac{(-1)^n x^{2n+1}}{2n+1}, \quad x \in (-1, 1]$
该级数在 $x=1$ 处收敛（交错级数判定），由 Abel 第二定理：
$\lim_{x \to 1^-} \arctan x = \arctan(1) = \frac{\pi}{4}$
因此，$\frac{\pi}{4} = \sum_{n=0}^\infty \frac{(-1)^n}{2n+1} = 1 - \frac{1}{3} + \frac{1}{5} - \dots$
> **高阶思考**：此级数收敛极慢（计算 3.1415 需要数万项）。实际应用中常用 Machin 公式：$\frac{\pi}{4} = 4 \arctan \frac{1}{5} - \arctan \frac{1}{239}$。

### 例题 4：涉及 $e$ 的级数求和技巧
计算常数项级数 $\sum_{n=1}^\infty \frac{n^2}{n!}$ 的值。
**解析**：利用 $e^x = \sum_{n=0}^\infty \frac{x^n}{n!}$。
观察分子 $n^2$，使用裂项技巧：$n^2 = n(n-1) + n$。
$\sum_{n=1}^\infty \frac{n^2}{n!} = \sum_{n=2}^\infty \frac{n(n-1)}{n!} + \sum_{n=1}^\infty \frac{n}{n!}$
$= \sum_{n=2}^\infty \frac{1}{(n-2)!} + \sum_{n=1}^\infty \frac{1}{(n-1)!}$
令 $k=n-2$ 和 $m=n-1$：
$= \sum_{k=0}^\infty \frac{1}{k!} + \sum_{m=0}^\infty \frac{1}{m!} = e + e = 2e$。
> **总结**：对于 $\sum \frac{P(n)}{n!}$ 型级数（$P(n)$ 为多项式），总能通过阶乘消项化为 $e$ 的倍数。

### 例题 5：复杂复合函数的展开技巧
将 $f(x) = \ln(1+x+x^2)$ 展开为 $x$ 的幂级数，并确定收敛区间。
**解析**：
注意到 $1+x+x^2 = \frac{1-x^3}{1-x}$。
因此，$f(x) = \ln(1-x^3) - \ln(1-x)$。
利用已知展开式 $\ln(1+u) = \sum_{n=1}^\infty (-1)^{n-1} \frac{u^n}{n}$：
1. $\ln(1-x) = - \sum_{n=1}^\infty \frac{x^n}{n}, \quad x \in [-1, 1)$
2. $\ln(1-x^3) = - \sum_{n=1}^\infty \frac{(x^3)^n}{n} = - \sum_{n=1}^\infty \frac{x^{3n}}{n}, \quad x \in [-1, 1)$
合并得：
$f(x) = \sum_{n=1}^\infty \frac{x^n}{n} - \sum_{n=1}^\infty \frac{x^{3n}}{n}$
写出前几项：
$f(x) = (x + \frac{x^2}{2} + \frac{x^3}{3} + \dots) - (\frac{x^3}{1} + \frac{x^6}{2} + \dots)$
$= x + \frac{x^2}{2} - \frac{2}{3}x^3 + \frac{x^4}{4} + \frac{x^5}{5} - \frac{2}{6}x^6 + \dots$
**通项公式**：$a_k = \begin{cases} \frac{1}{k} & k \neq 3n \\ -\frac{2}{k} & k = 3n \end{cases}$
收敛区间为 $[-1, 1)$。

### 例题 6：结合分式分解与 Abel 定理求特定数项级数和
计算级数 $\sum_{n=0}^\infty \frac{(-1)^n}{3n+1}$ 的值。
**解析**：
考虑幂级数 $f(x) = \sum_{n=0}^\infty \frac{(-1)^n x^{3n+1}}{3n+1}$。
在收敛区间 $(-1, 1)$ 内，逐项求导：
$f'(x) = \sum_{n=0}^\infty (-1)^n x^{3n} = \sum_{n=0}^\infty (-x^3)^n = \frac{1}{1+x^3}$。
利用分式分解：
$\frac{1}{1+x^3} = \frac{1}{(x+1)(x^2-x+1)} = \frac{1}{3} \left[ \frac{1}{x+1} - \frac{x-2}{x^2-x+1} \right]$
积分得：
$f(x) = \frac{1}{3} \ln(1+x) - \frac{1}{6} \ln(x^2-x+1) + \frac{1}{\sqrt{3}} \arctan \frac{2x-1}{\sqrt{3}} + C$
由 $f(0)=0$ 代入得 $C = \frac{\pi}{6\sqrt{3}}$。
原级数即为 $f(1)$。由于原级数满足 Leibniz 判别法，在 $x=1$ 处收敛，由 Abel 第二定理：
$\sum_{n=0}^\infty \frac{(-1)^n}{3n+1} = \lim_{x \to 1^-} f(x) = \frac{1}{3} \ln 2 + \frac{\pi}{3\sqrt{3}}$。

### 例题 7：高阶算子法求和函数及其边界行为
求幂级数 $\sum_{n=1}^\infty n^2 x^n$ 的和函数，并讨论其在 $x=1$ 与 $x=-1$ 处的行为。
**解析**：
已知 $\sum_{n=0}^\infty x^n = \frac{1}{1-x}, \quad |x| < 1$。
1. 第一次作用算子 $x \frac{d}{dx}$：
   $\sum_{n=1}^\infty n x^n = x \left( \frac{1}{1-x} \right)' = \frac{x}{(1-x)^2}$
2. 第二次作用算子 $x \frac{d}{dx}$：
   $\sum_{n=1}^\infty n^2 x^n = x \left( \frac{x}{(1-x)^2} \right)' = x \frac{(1-x)^2 + 2x(1-x)}{(1-x)^4} = \frac{x(1+x)}{(1-x)^3}$
**边界讨论**：
- 在 $x=1$ 处，和函数 $\lim_{x \to 1^-} \frac{x(1+x)}{(1-x)^3} = +\infty$，级数发散。
- 在 $x=-1$ 处，级数项为 $(-1)^n n^2$，通项不趋于 0，级数发散。
> **总结**：$x \frac{d}{dx}$ 算子是处理含有 $n^k$ 系数的幂级数的强力工具。

---

## 5. 配套练习

1. **半径计算**：求 $\sum_{n=1}^\infty \frac{n!}{n^n} x^n$ 的收敛半径。
2. **端点讨论**：讨论 $\sum_{n=1}^\infty \frac{2^n + 3^n}{n} x^n$ 的收敛域。
3. **级数求和**：求 $\sum_{n=1}^\infty \frac{x^n}{n(n+1)}$ 的和函数。
4. **函数展开**：将 $f(x) = \ln(x^2 + 3x + 2)$ 展开为 $x$ 的幂级数。
5. **极限综合**：利用 Taylor 展开求 $\lim_{x \to 0} \frac{\cos x - e^{-x^2/2}}{x^4}$。

---

<div className="bilibili-embed-inner">
  <iframe 
    src="//player.bilibili.com/player.html?aid=710813214&bvid=BV1BQ4y1P7vE&cid=210323924&page=2" 
    scrolling="no" 
    border="0" 
    frameborder="no" 
    framespacing="0" 
    allowfullscreen="true"
    loading="lazy">
  </iframe>
</div>
