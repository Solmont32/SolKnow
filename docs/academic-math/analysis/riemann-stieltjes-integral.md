---
title: Riemann-Stieltjes 积分
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# Riemann-Stieltjes 积分

Riemann 积分虽然强大，但在处理离散与连续混合分布、或者函数在某些点处具有“阶跃”性质时显得捉襟见肘。Riemann-Stieltjes (R-S) 积分通过引入“控制函数” $\alpha(x)$，将积分从单纯的面积累加升华为一种更广义的测度累加。

## 一、 Riemann-Stieltjes 积分理论

### 1. 定义
设 $f(x)$ 和 $\alpha(x)$ 是定义在 $[a, b]$ 上的有界函数。对于 $[a, b]$ 的任一划分 $P: a = x_0 < x_1 < \dots < x_n = b$，在每个小区间 $[x_{i-1}, x_i]$ 上任取一点 $\xi_i$，作和式：
$$S(P, f, \alpha) = \sum_{i=1}^n f(\xi_i) [\alpha(x_i) - \alpha(x_{i-1})]$$
若当划分的模 $\lambda(P) \to 0$ 时，该和式的极限存在且与划分 $P$ 及 $\xi_i$ 的选取无关，则称 $f$ 关于 $\alpha$ 在 $[a, b]$ 上是 **Riemann-Stieltjes 可积**的，记作 $f \in \mathcal{R}(\alpha)$，积分值为：
$$\int_a^b f(x) d\alpha(x)$$

### 2. 存在性条件 (Existence Conditions)
R-S 积分的存在性比 Riemann 积分更为苛刻。核心定理如下：

- **定理 1 (连续性与有界变差)**：若 $f \in \mathcal{C}[a, b]$（连续）且 $\alpha \in \mathcal{BV}[a, b]$（有界变差，如单调函数），则 $f \in \mathcal{R}(\alpha)$。
- **定理 2 (单调性)**：若 $f \in \mathcal{C}[a, b]$ 且 $\alpha$ 在 $[a, b]$ 上单调，则 $f \in \mathcal{R}(\alpha)$。
- **定理 3 (不可积判定 - 同侧不连续)**：若 $f$ 与 $\alpha$ 在同一点 $c \in [a, b]$ 处均不连续，且为**同侧不连续**（即在该点同时左不连续或同时右不连续），则 $f \notin \mathcal{R}(\alpha)$。
  - *直观理解*：若在跳跃点处两函数同时变动，和式 $f(\xi_i)\Delta \alpha_i$ 的值将取决于 $\xi_i$ 靠近跳跃点的哪一侧，导致极限不唯一。

### 3. 与 Riemann 积分的转换
R-S 积分是 Riemann 积分的推广。在特定条件下可以相互转换：

- **光滑转换**：若 $\alpha(x)$ 在 $[a, b]$ 上具有连续导数 $\alpha'(x)$，则：
  $$\int_a^b f(x) d\alpha(x) = \int_a^b f(x) \alpha'(x) dx$$
- **分部积分公式**：若 $\int_a^b f d\alpha$ 存在，则 $\int_a^b \alpha df$ 也存在，且：
  $$\int_a^b f d\alpha + \int_a^b \alpha df = f(b)\alpha(b) - f(a)\alpha(a)$$
  这在处理 $f$ 较复杂而 $\alpha$ 较简单（如阶梯函数）的情况时非常有用。

---
## 二、 阶梯函数积分与物理、概率直观

当 $\alpha(x)$ 是阶梯函数时，R-S 积分呈现出极其简洁的离散形式。

### 1. 物理与概率直观
- **物理意义**：若 $f(x)$ 为单位长度的力，$\alpha(x)$ 为位移，则积分表示功。若 $\alpha(x)$ 在某些点有跳跃，则表示在该点有力做了瞬时功。
- **概率意义 (核心)**：若 $\alpha(x)$ 是随机变量 $X$ 的**累积分布函数 (CDF)**，记为 $F(x)$，则 $\int g(x) dF(x)$ 即为 $g(X)$ 的期望 $E[g(X)]$。这完美统一了离散型（$F$ 为阶梯函数）和连续型（$F$ 可导）随机变量的期望表达。

### 2. 阶梯函数计算准则
设 $\alpha(x)$ 是阶梯函数，在点 $c_k \in (a, b)$ 处有跳跃 $s_k = \alpha(c_k^+) - \alpha(c_k^-)$，则：
$$\int_a^b f d\alpha = \sum_k f(c_k) s_k$$
（需注意端点处的跳跃处理）。

---

## 三、 概率论中的深度应用：统一期望理论

在初等概率论中，离散型随机变量的期望用求和表示，连续型用 Riemann 积分表示。R-S 积分则通过分布函数 $F(x)$ 将二者完美统一，尤其在处理**混合型随机变量**时展现出不可替代的优越性。

### 1. 混合型随机变量的期望计算
混合型随机变量既有连续的概率密度，又在某些点处有概率质量（跳跃点）。其期望公式为：
$$E[g(X)] = \int_{-\infty}^{+\infty} g(x) dF(x) = \int_{x \in \text{Cont}} g(x) F'(x) dx + \sum_{k} g(x_k) \Delta F(x_k)$$
其中 $\Delta F(x_k) = P(X = x_k)$ 是跳跃点处的概率。

### 2. 生存分析与精算应用
在精算学中，剩余寿命 $T$ 常被建模为混合型。例如，一个人在未来一年内死亡的概率由连续风险函数（密度的连续部分）描述，但如果在一年届满时还活着，则在“生存”这一时刻具有概率质量。

---

## 四、 深度例题解析

### 例题 1：多点跳跃的阶梯函数
计算 $\int_0^3 x^2 d\lfloor x \rfloor$。

<details>

<summary>点击查看解析</summary>

#### 解析
$\alpha(x) = \lfloor x \rfloor$ 在 $x=1, 2, 3$ 处具有跳跃。
- 在 $x=1$ 处，跳跃量为 $1-0=1$。
- 在 $x=2$ 处，跳跃量为 $2-1=1$。
- 在 $x=3$ 处，跳跃量为 $3-2=1$。
根据阶梯函数积分公式：
$$\int_0^3 x^2 d\lfloor x \rfloor = f(1)\Delta\alpha_1 + f(2)\Delta\alpha_2 + f(3)\Delta\alpha_3$$
$$= 1^2 \cdot 1 + 2^2 \cdot 1 + 3^2 \cdot 1 = 1 + 4 + 9 = 14$$

#### 答案
14

</details>

### 例题 2：混合型分布的期望
设随机变量 $X$ 的分布函数为：
$$F(x) = \begin{cases} 0, & x < 0 \\ \frac{1}{2}x, & 0 \le x < 1 \\ 1, & x \ge 1 \end{cases}$$
计算 $E[X^2]$。

<details>

<summary>点击查看解析</summary>

#### 解析
1. **识别跳跃点**：$F(x)$ 在 $x=1$ 处不连续，跳跃量 $\Delta F(1) = 1 - \frac{1}{2} = \frac{1}{2}$。
2. **识别连续部分**：在 $(0, 1)$ 内，$F'(x) = \frac{1}{2}$。
3. **应用 R-S 积分分解公式**：
   $$E[X^2] = \int_0^1 x^2 dF(x) = \int_0^1 x^2 F'(x) dx + 1^2 \cdot \Delta F(1)$$
   $$= \int_0^1 \frac{1}{2}x^2 dx + 1 \cdot \frac{1}{2}$$
   $$= [\frac{1}{6}x^3]_0^1 + \frac{1}{2} = \frac{1}{6} + \frac{1}{2} = \frac{2}{3}$$

#### 答案
$2/3$

</details>

### 例题 3：分部积分法的妙用
计算 $\int_0^\pi x d(\sin x)$。

<details>

<summary>点击查看解析</summary>

#### 解析
1. **转换为 Riemann 积分**：由于 $\sin x$ 可导，且 $(\sin x)' = \cos x$。
   $$\int_0^\pi x d(\sin x) = \int_0^\pi x \cos x dx$$
2. **分部积分**：
   $$= [x \sin x]_0^\pi - \int_0^\pi \sin x dx$$
   $$= ( \pi \sin \pi - 0 \sin 0 ) - [-\cos x]_0^\pi$$
   $$= 0 - (1 + 1) = -2$$

#### 答案
-2

</details>

### 例题 4：狄拉克 $\delta$ 函数与 R-S 积分
设 $\delta_c(x)$ 是在 $c$ 点处的单位阶梯函数（即 $x < c$ 时为 0，$x \ge c$ 时为 1）。计算 $\int_a^b f(x) d\delta_c(x)$，其中 $a < c < b$。

<details>

<summary>点击查看解析</summary>

#### 解析
$\delta_c(x)$ 仅在 $x=c$ 处有唯一的跳跃，跳跃量为 $1$。
根据阶梯函数公式：
$$\int_a^b f(x) d\delta_c(x) = f(c) \cdot \Delta \delta_c(c) = f(c) \cdot 1 = f(c)$$
这正是信号处理中理想脉冲（Dirac Delta）的作用性质在 R-S 积分下的严谨表述。

#### 答案
$f(c)$

</details>

---

## 五、 配套练习

1. **(基础)** 计算 $\int_0^4 \sqrt{x} d(\lfloor x \rfloor)$。
2. **(计算)** 计算 $\int_0^2 x^2 d(x^3 + \lfloor x \rfloor)$。
3. **(理论)** 设 $f(x) = \begin{cases} 0, & x=0 \\ 1, & x \in (0, 1] \end{cases}$，$\alpha(x) = f(x)$。讨论 $\int_0^1 f d\alpha$ 是否存在。
4. **(实战)** 考虑一个混合型随机变量 $X$，其在 $[0, 2]$ 上均匀分布的概率为 $0.8$，而在点 $x=1$ 处有概率 $0.2$。请写出其 CDF $\alpha(x)$ 并计算 $\int_0^2 x d\alpha(x)$。
5. **(进阶)** 计算 $\int_0^3 x d([x]^2)$，其中 $[x]$ 为向下取整函数。
6. **(挑战)** 若 $\alpha(x) = \sum_{n=1}^\infty \frac{1}{2^n} I(x \ge \frac{1}{n})$，其中 $I$ 为指示函数，计算 $\int_0^1 x d\alpha(x)$。

<details>

<summary>点击查看简要提示</summary>

1. 跳跃点在 $x=1, 2, 3, 4$。结果为 $\sqrt{1} + \sqrt{2} + \sqrt{3} + \sqrt{4} = 3 + \sqrt{2} + \sqrt{3}$。
2. 拆分为 $\int x^2 d(x^3) + \int x^2 d(\lfloor x \rfloor)$。前者为 $\int_0^2 3x^4 dx = 19.2$。后者为 $1^2 \cdot 1 + 2^2 \cdot 1 = 5$。总和 $24.2$。
3. $x=0$ 是共同的不连续点（同侧不连续）。根据定理 3，积分不存在。
4. $\alpha(x) = 0.8 \cdot \frac{x}{2} + 0.2 \cdot I(x \ge 1) = 0.4x + 0.2 I(x \ge 1)$ (对于 $x \in [0, 2]$)。
   积分 = $\int_0^2 x \cdot 0.4 dx + 1 \cdot 0.2 = [0.2x^2]_0^2 + 0.2 = 0.8 + 0.2 = 1.0$。
5. $\alpha(x) = [x]^2$ 的跳跃点在 $1, 2, 3$。跳跃量分别为 $1^2-0^2=1, 2^2-1^2=3, 3^2-2^2=5$。积分值为 $1\cdot 1 + 2\cdot 3 + 3\cdot 5 = 22$。
6. 这是一个离散分布的期望计算，跳跃点 $x_n = 1/n$，权重为 $1/2^n$。求和 $\sum_{n=1}^\infty \frac{1}{n} \cdot \frac{1}{2^n} = \ln 2$。

</details>

