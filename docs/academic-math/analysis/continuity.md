---
title: 连续性 (Continuity)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 连续性 (Continuity)

连续性是函数平滑程度的体现，是中值定理等深层结论的基础。在数学分析中，连续性不仅是一个局部的分析性质，更是连接拓扑性质（如连通性、紧性）与分析性质的桥梁。

## 一、 核心知识点讲解

### 1. 定义与局部性质
函数 $f(x)$ 在点 $x_0$ 连续 $\iff \lim_{x \to x_0} f(x) = f(x_0)$。
- **三要素**：点处有定义、极限存在、极限等于函数值。
- **局部有界性**：若 $f(x)$ 在 $x_0$ 连续，则存在 $x_0$ 的某个邻域 $U(x_0, \delta)$，使得 $f(x)$ 在该邻域内有界。
- **局部保号性**：若 $f(x_0) > 0$，则存在 $\delta > 0$，使得 $\forall x \in U(x_0, \delta)$，均有 $f(x) > 0$。

### 2. 间断点分类
-   **第一类间断点**（左右极限均存在）：
    -   **可去间断点**：左右极限相等但 $\neq f(x_0)$。
    -   **跳跃间断点**：左右极限存在但不相等。
-   **第二类间断点**（左右极限至少一个不存在）：
    -   **无穷间断点**：极限为 $\infty$。
    -   **震荡间断点**：如 $f(x) = \sin(1/x)$ 在 $x=0$ 处。

### 3. 闭区间连续函数的性质（核心定理）
这是数学分析中最具威力的工具之一，其本质来源于实数系的紧性（Compactness）。

| 定理名称 | 内容描述 | 几何/直观意义 |
| :--- | :--- | :--- |
| **有界性定理** | 若 $f \in C[a, b]$，则 $f$ 在 $[a, b]$ 上有界。 | 连续曲线在有限范围内不会“跑向无穷”。 |
| **最值定理** | 若 $f \in C[a, b]$，则 $f$ 必能在该区间取到最大值 $M$ 和最小值 $m$。 | 闭区间上的连续函数一定有“最高点”和“最低点”。 |
| **介值定理** | 若 $f \in C[a, b]$，且 $f(a)=A, f(b)=B$，则对 $A, B$ 间任一值 $C$，$\exists \xi \in [a, b]$ 使 $f(\xi)=C$ | 连续曲线从一个高度到另一个高度，必须经过中间所有高度。 |
| **零点定理** | 若 $f \in C[a, b]$ 且 $f(a) \cdot f(b) < 0$，则 $\exists \xi \in (a, b)$ 使得 $f(\xi) = 0$。 | 曲线跨越 $x$ 轴时必与之相交。 |
| **一致连续性定理 (Cantor)** | 若 $f \in C[a, b]$，则 $f$ 在 $[a, b]$ 上一致连续。 | 局部连续在紧集上可提升为全局一致连续。 |

### 4. 一致连续性 (Uniform Continuity) 深度解析
这是本章最抽象但也最重要的概念之一。

#### (1) 定义的精确对比
- **连续 (Continuity)**：在区间 $I$ 上连续是指 $\forall x_0 \in I, \forall \epsilon > 0, \exists \delta > 0$（$\delta$ 与 $\epsilon$ 和 $x_0$ 均有关），使得当 $|x - x_0| < \delta$ 时，有 $|f(x) - f(x_0)| < \epsilon$。
- **一致连续 (Uniform Continuity)**：$\forall \epsilon > 0, \exists \delta > 0$（$\delta$ 仅与 $\epsilon$ 有关，对区间内所有点通用），使得 $\forall x_1, x_2 \in I$，只要 $|x_1 - x_2| < \delta$，就有 $|f(x_1) - f(x_2)| < \epsilon$。

**核心差异**：连续性是“点点为营”（局部性质），而一致连续性是“全线协同”（全局性质）。

#### (2) Cantor 大定理的 $\epsilon-\delta$ 证明
**定理**：若 $f(x)$ 在闭区间 $[a, b]$ 上连续，则 $f(x)$ 在 $[a, b]$ 上一致连续。

**证明（反证法 + 聚点定理/数列性）**：
1. 假设 $f(x)$ 在 $[a, b]$ 上不一致连续。
2. 则存在某个 $\epsilon_0 > 0$，对任意 $\delta_n = 1/n$ ($n=1,2,\dots$)，都存在点对 $x_n, y_n \in [a, b]$，虽然 $|x_n - y_n| < 1/n$，但 $|f(x_n) - f(y_n)| \ge \epsilon_0$。
3. 由于 $\{x_n\}$ 是闭区间 $[a, b]$ 上的有界数列，由 **Bolzano-Weierstrass 定理**，必存在收敛子列 $\{x_{n_k}\}$，设其极限为 $x^* \in [a, b]$。
4. 因为 $|x_{n_k} - y_{n_k}| < 1/n_k \to 0$，所以子列 $\{y_{n_k}\}$ 也收敛于 $x^*$。
5. 由于 $f(x)$ 在 $x^*$ 处连续，由海涅定理（Heine's theorem）：
   $\lim_{k \to \infty} f(x_{n_k}) = f(x^*)$ 且 $\lim_{k \to \infty} f(y_{n_k}) = f(x^*)$。
6. 从而 $\lim_{k \to \infty} |f(x_{n_k}) - f(y_{n_k})| = |f(x^*) - f(x^*)| = 0$。
7. 这与假设 $|f(x_n) - f(y_n)| \ge \epsilon_0$ 矛盾！
8. 故假设不成立，$f(x)$ 在 $[a, b]$ 上必一致连续。 $\square$

---

## 二、 典型函数的一致连续性辨析

| 函数 $f(x)$ | 区间 $I$ | 是否一致连续 | 深度辨析（Why?） |
| :--- | :--- | :--- | :--- |
| $f(x) = \frac{1}{x}$ | $(0, 1]$ | **否** | 当 $x \to 0^+$ 时，函数变化剧烈。取 $x_n = 1/n, y_n = 1/2n$，虽然 $\lvert x_n - y_n \rvert = 1/2n \to 0$，但 $\lvert f(x_n) - f(y_n) \rvert = n \to \infty$。 |
| $f(x) = x^2$ | $[0, +\infty)$ | **否** | 斜率无限增大。取 $x_n = \sqrt{n+1}, y_n = \sqrt{n}$，虽然 $\lvert x_n - y_n \rvert = \frac{1}{\sqrt{n+1}+\sqrt{n}} \to 0$，但 $\lvert f(x_n) - f(y_n) \rvert = 1$。 |
| $f(x) = \sin\frac{1}{x}$ | $(0, 1]$ | **否** | 在 $x=0$ 附近无限震荡。取 $x_n = \frac{1}{2n\pi+\pi/2}, y_n = \frac{1}{2n\pi}$，距离趋于 0 但函数值差恒为 1。 |
| $f(x) = \sqrt{x}$ | $[0, +\infty)$ | **是** | 虽然在 $x=0$ 处导数不存在，但在 $[0, 1]$ 上由于连续性一致连续，在 $[1, +\infty)$ 上导数有界（$f' \le 1/2$）故一致连续。 |
| $f(x) = \sin x$ | $\mathbb{R}$ | **是** | 导数绝对值 $\lvert \cos x \rvert \le 1$ 全域有界。由中值定理 $\lvert f(x_1) - f(x_2) \rvert \le \lvert x_1 - x_2 \rvert$，取 $\delta = \epsilon$ 即可。 |

---

## 三、 深度例题实战

### 1. 利用“有限覆盖定理”证明有界性定理
**证明思路**：
1. 由于 $f(x)$ 在 $x \in [a, b]$ 连续，对 $\epsilon=1$，根据连续性定义，对每一个 $x \in [a, b]$ 都存在一个开邻域 $U(x, \delta_x) = (x-\delta_x, x+\delta_x)$，使得在邻域内有 $|f(t)| < |f(x)| + 1$（局部有界）。
2. 集合族 $\mathcal{F} = \{ U(x, \delta_x) \mid x \in [a, b] \}$ 构成了闭区间 $[a, b]$ 的一个开覆盖。
3. 由 **Heine-Borel 有限覆盖定理**，从 $\mathcal{F}$ 中可以选出有限个开邻域 $U_1, U_2, \dots, U_n$ 覆盖 $[a, b]$。
4. 令 $M_i$ 为 $f(x)$ 在 $U_i$ 上的界，则 $M = \max\{M_1, M_2, \dots, M_n\}$ 即为 $f(x)$ 在整个 $[a, b]$ 上的界。

### 2. 介值定理的拓扑意义
介值定理实际上反映了：**连通集的连续像是连通集**。在 $\mathbb{R}$ 中，连通集就是区间。

---

## 三、 深度例题实战

### 例题 1：不动点定理 (Fixed Point Theorem)
设 $f(x)$ 是闭区间 $[0, 1]$ 上的连续函数，且 $0 \le f(x) \le 1$。证明：必存在 $\xi \in [0, 1]$，使得 $f(\xi) = \xi$。

<details>

<summary>点击查看解析</summary>

#### 解析过程
1. **构造辅助函数**：令 $g(x) = f(x) - x$。
2. **考察端点值**：
   - $g(0) = f(0) - 0 = f(0) \ge 0$。
   - $g(1) = f(1) - 1 \le 0$（因为 $f(x) \le 1$）。
3. **分类讨论**：
   - 若 $g(0) = 0$ 或 $g(1) = 0$，则 $x=0$ 或 $x=1$ 即为不动点。
   - 若 $g(0) > 0$ 且 $g(1) < 0$，由于 $g(x)$ 是连续函数，由**零点定理**，必存在 $\xi \in (0, 1)$ 使得 $g(\xi) = 0$。
4. **结论**：即 $f(\xi) = \xi$。

#### 答案
通过零点定理证得。

</details>

### 例题 2：一致连续性的判定与反例
证明 $f(x) = \sin(x^2)$ 在 $[0, +\infty)$ 上不是一致连续的。

<details>

<summary>点击查看解析</summary>

#### 解析过程
1. **策略**：使用一致连续性的否定定义（点列法）。
2. **构造点列**：
   取 $x_n = \sqrt{n\pi + \pi/2}$，$y_n = \sqrt{n\pi}$。
3. **计算距离**：
   $|x_n - y_n| = \frac{\pi/2}{\sqrt{n\pi + \pi/2} + \sqrt{n\pi}} \to 0$ ($n \to \infty$)。
4. **计算函数值差**：
   $|f(x_n) - f(y_n)| = |\sin(n\pi + \pi/2) - \sin(n\pi)| = |(-1)^n - 0| = 1$。
5. **结论**：虽然自变量距离趋于 0，但函数值差始终不趋于 0，故不一致连续。

#### 答案
利用点列法证得不满足一致连续定义。

</details>

### 例题 3：周期连续函数的一致连续性
证明：定义在 $\mathbb{R}$ 上的连续周期函数必一致连续。

<details>

<summary>点击查看解析</summary>

#### 解析过程
1. **设周期为 $T$**：考虑区间 $[0, 2T]$。
2. **闭区间性质**：由于 $f(x)$ 在 $[0, 2T]$ 上连续，由 **Cantor 定理**，它在该区间上一致连续。
3. **推广至全域**：利用周期性，全域内的任意两点距离小于 $\delta$ 时，总可以通过平移映射回 $[0, 2T]$ 内部的一个对应长度区间内。
4. **严谨性**：选择足够小的 $\delta < T$，确保跨越周期边界的点对也能被覆盖。

#### 答案
利用 Cantor 定理与周期性平移证明。

</details>

### 例题 4：函数方程与连续性
设 $f(x)$ 在 $\mathbb{R}$ 上连续，且满足 $f(x+y) = f(x) + f(y)$。证明：$f(x) = cx$（其中 $c = f(1)$）。

<details>

<summary>点击查看解析</summary>

#### 解析过程
1. **有理数情形**：
   - 由 $f(0+0) = f(0)+f(0) \implies f(0)=0$。
   - 对 $n \in \mathbb{N}$，$f(nx) = nf(x)$（数学归纳法）。
   - 令 $x = 1/n$，则 $f(1) = f(n \cdot 1/n) = n f(1/n) \implies f(1/n) = \frac{1}{n} f(1)$。
   - 进而对任意有理数 $q = m/n$，有 $f(q) = q f(1) = cq$。
2. **实数情形（利用连续性）**：
   - 对任意 $x \in \mathbb{R}$，存在有理数列 $\{q_n\} \to x$。
   - 由 $f$ 的连续性：$f(x) = f(\lim_{n \to \infty} q_n) = \lim_{n \to \infty} f(q_n) = \lim_{n \to \infty} c q_n = cx$。

#### 答案
利用有理数集的稠密性与连续性定义证明。

</details>

---

<SupportingExercises 
  topic="函数连续性" 
  exercises={[
    { index: 3, title: "一致连续性初步判定", slug: "练习-3一致连续性判定" },
    { index: 4, title: "介值定理基础应用", slug: "练习-4介值定理的应用" },
    { index: 33, title: "复合函数间断点分析", slug: "练习-33复合函数连续性与间断点" },
    { index: 34, title: "零点定理证明根的存在性", slug: "练习-34利用零点定理证明根的存在性" },
    { index: 37, title: "不一致连续性的深度判别", slug: "练习-37一致连续性的判定" },
    { index: 38, title: "有界区间一致连续性扩展", slug: "练习-38一致连续性的性质" }
  ]} 
/>

---

## 四、 知识卡片回顾

<KnowledgeCard 
  title="Cauchy 连续性 vs 一致连续性" 
  content="连续性是点性质（局部），而一致连续性是区间性质（全局）。一致连续性要求 $\delta$ 仅取决于 $\epsilon$，而不取决于 $x$ 的位置。Cantor 定理告诉我们：闭区间的紧性可以将局部连续性‘强行’提升为全局一致连续性。"
  color="#8b5cf6"
/>
