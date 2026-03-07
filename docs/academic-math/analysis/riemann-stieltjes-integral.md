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

## 二、 阶梯函数积分与物理意义

当 $\alpha(x)$ 是阶梯函数时，R-S 积分呈现出极其简洁的离散形式。

### 1. 物理与概率直观
- **物理意义**：若 $f(x)$ 为单位长度的力，$\alpha(x)$ 为位移，则积分表示功。若 $\alpha(x)$ 在某些点有跳跃，则表示在该点有力做了瞬时功。
- **概率意义**：若 $\alpha(x)$ 是随机变量的累积分布函数 (CDF)，则 $\int f d\alpha$ 即为 $f(X)$ 的期望 $E[f(X)]$。这完美统一了离散型（$\alpha$ 为阶梯函数）和连续型（$\alpha$ 可导）随机变量的期望表达。

### 2. 阶梯函数计算准则
设 $\alpha(x)$ 是阶梯函数，在点 $c_k \in (a, b)$ 处有跳跃 $s_k = \alpha(c_k^+) - \alpha(c_k^-)$，则：
$$\int_a^b f d\alpha = \sum_k f(c_k) s_k$$
（需注意端点处的跳跃处理）。

---

## 三、 深度例题解析

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

### 例题 2：连续函数与绝对值的复合
计算 $\int_{-1}^2 x d(|x|)$。

<details>
<summary>点击查看解析</summary>

#### 解析
$\alpha(x) = |x|$ 在 $x=0$ 处不可导，但在 $[-1, 0]$ 和 $[0, 2]$ 上分别线性。
利用区间可加性：
$$\int_{-1}^2 x d(|x|) = \int_{-1}^0 x d(-x) + \int_0^2 x d(x)$$
$$= \int_{-1}^0 x (-1) dx + \int_0^2 x (1) dx$$
$$= [-\frac{1}{2}x^2]_{-1}^0 + [\frac{1}{2}x^2]_0^2 = (0 - (-\frac{1}{2})) + (2 - 0) = \frac{1}{2} + 2 = 2.5$$

#### 答案
2.5
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

---

## 四、 配套练习

1. **(基础)** 计算 $\int_0^4 \sqrt{x} d(\lfloor x \rfloor)$。
2. **(计算)** 计算 $\int_0^2 x^2 d(x^3 + \lfloor x \rfloor)$。
3. **(理论)** 设 $f(x) = \begin{cases} 0, & x=0 \\ 1, & x \in (0, 1] \end{cases}$，$\alpha(x) = f(x)$。讨论 $\int_0^1 f d\alpha$ 是否存在。
4. **(进阶)** 计算 $\int_0^3 x d([x]^2)$，其中 $[x]$ 为向下取整函数。
5. **(挑战)** 若 $\alpha(x) = \sum_{n=1}^\infty \frac{1}{2^n} I(x \ge \frac{1}{n})$，其中 $I$ 为指示函数，计算 $\int_0^1 x d\alpha(x)$。

<details>
<summary>点击查看简要提示</summary>

1. 跳跃点在 $x=1, 2, 3, 4$。结果为 $\sqrt{1} + \sqrt{2} + \sqrt{3} + \sqrt{4} = 3 + \sqrt{2} + \sqrt{3}$。
2. 拆分为 $\int x^2 d(x^3) + \int x^2 d(\lfloor x \rfloor)$。前者为 $\int_0^2 3x^4 dx = \frac{3}{5} \cdot 32 = 19.2$。后者为 $1^2 \cdot 1 + 2^2 \cdot 1 = 5$。总和 $24.2$。
3. $x=0$ 是共同的不连续点。且在该点两人均向右侧跳跃（同侧不连续）。根据定理 3，积分不存在。
4. $\alpha(x) = [x]^2$ 的跳跃点在 $1, 2, 3$。跳跃量分别为 $1^2-0^2=1, 2^2-1^2=3, 3^2-2^2=5$。积分值为 $1\cdot 1 + 2\cdot 3 + 3\cdot 5 = 1 + 6 + 15 = 22$。
5. 这是一个离散分布的期望计算，跳跃点 $x_n = 1/n$，权重为 $1/2^n$。求和 $\sum_{n=1}^\infty \frac{1}{n} \cdot \frac{1}{2^n} = \ln 2$。
</details>
