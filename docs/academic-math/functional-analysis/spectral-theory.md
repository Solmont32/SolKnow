---
title: 算子谱理论：谱分解与自伴算子 (Spectral Theory)
description: 深入探讨线性算子的谱结构，包括自伴算子的性质、紧算子的 Riesz-Schauder 理论以及谱定理。
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# 算子谱理论：谱分解与自伴算子

> 在有限维空间中，我们通过特征值与特征向量将线性变换对角化。在无限维空间中，由于“谱”的出现（除了特征值还有连续谱等），这一过程变得更加精妙。谱理论是现代量子力学的数学语言。

---

## 一、谱与正则集 (Spectrum and Resolvent)

设 $X$ 为 Banach 空间，$T \in \mathcal{B}(X)$。

### 1. 定义
- **正则集 (Resolvent Set)**：$\rho(T) = \{ \lambda \in \mathbb{C} : T - \lambda I \text{ 是双射且有有界逆 } \}$。
- **谱 (Spectrum)**：$\sigma(T) = \mathbb{C} \setminus \rho(T)$。
- **谱半径 (Spectral Radius)**：$r(T) = \sup \{ |\lambda| : \lambda \in \sigma(T) \} = \lim_{n \to \infty} \|T^n\|^{1/n}$.

### 2. 谱的分类
- **点谱 (Point Spectrum)** $\sigma_p(T)$：$T - \lambda I$ 不是单射（即 $\lambda$ 是特征值）。
- **连续谱 (Continuous Spectrum)** $\sigma_c(T)$：$T - \lambda I$ 是单射，值域稠密但不是全空间。
- **剩余谱 (Residual Spectrum)** $\sigma_r(T)$：$T - \lambda I$ 是单射，值域不稠密。

---

## 二、自伴算子的性质

在 Hilbert 空间 $H$ 中，自伴算子 ($T=T^*$) 拥有极为优美的性质，类比于对称矩阵。

<KnowledgeCard type="warning" title="核心定理">
1. 自伴算子的谱 $\sigma(T)$ 必落在实轴上 ($\sigma(T) \subset \mathbb{R}$)。
2. 自伴算子的剩余谱为空集 ($\sigma_r(T) = \emptyset$)。
3. 不同特征值的特征向量必相互正交。
</KnowledgeCard>

---

## 三、紧算子理论 (Compact Operators)

线性算子 $K: X \to Y$ 若将有界集映射为列紧集（其闭包为紧集），则称为 **紧算子**。

### 1. Riesz-Schauder 理论
对于紧算子 $K$：
- 其谱 $\sigma(K)$ 是可列的，且至多以 0 为聚点。
- 每一个非零谱成员 $\lambda \neq 0$ 都是特征值，且特征子空间是有限维的。

---

## 四、谱定理 (Spectral Theorem)

谱定理是本章的最核心结论，它给出了算子的“广义对角化”形式。

### 1. 紧自伴算子的谱定理
设 $H$ 是 Hilbert 空间，$T$ 是 $H$ 上的紧自伴算子。则存在规范正交基 $\{e_n\}$ 使得：
$$ Tx = \sum_n \lambda_n \langle x, e_n \rangle e_n, \quad \forall x \in H. $$
其中 $\lambda_n \in \mathbb{R}$ 为特征值且 $\lambda_n \to 0$。

### 2. 一般自伴算子的谱定理 (积分形式)
对一般的有界自伴算子 $T$，存在唯一的 **谱测度 (Spectral Measure)** $E$，使得：
$$ T = \int_{\sigma(T)} \lambda \, dE(\lambda). $$
这相当于将无穷维空间分解为一系列“微分”特征子空间的直和。

---

## 五、精选例题

### 例 1：乘法算子的谱
在 $L^2(0,1)$ 上定义 $Tf(t) = tf(t)$。求 $\sigma(T)$。

<details>
<summary>点击查看解析</summary>

1. $(T - \lambda I)f(t) = (t - \lambda)f(t)$.
2. 若 $\lambda \notin [0,1]$，则 $1/(t-\lambda)$ 有界，$\lambda \in \rho(T)$.
3. 若 $\lambda \in [0,1]$，$T-\lambda I$ 显然不是满射（其逆无界），故 $[0,1] \subset \sigma(T)$.
4. 事实上，该算子没有特征值（点谱为空），整个 $[0,1]$ 都是连续谱。

</details>

---

## 六、分层练习

### 练习 1（算子多项式）
证明：若 $\lambda \in \sigma(T)$，则对多项式 $P(z)$，有 $P(\lambda) \in \sigma(P(T))$。

<details>
<summary>点击查看过程</summary>

1. 分解 $P(z) - P(\lambda) = (z - \lambda)Q(z)$。
2. 相应地 $P(T) - P(\lambda)I = (T - \lambda I)Q(T)$。
3. 若 $P(T) - P(\lambda)I$ 可逆，则 $T - \lambda I$ 也可逆（由于二者交换），产生矛盾。

</details>

### 练习 2（自伴性判定）
证明：若 $T$ 是自伴算子且 $T^2 = 0$，则 $T = 0$。

<details>
<summary>点击查看提示</summary>

1. 利用内积：$\|Tx\|^2 = \langle Tx, Tx \rangle = \langle T^*Tx, x \rangle = \langle T^2x, x \rangle = 0$.
2. 故 $Tx = 0, \forall x$, 即 $T=0$.
3. 注意：如果不满足自伴性（例如单向平移算子），结论不成立。

</details>

### 练习 3（谱半径）
给出 $2 \times 2$ 矩阵的例子，满足 $\|T\| > r(T)$。

<details>
<summary>点击查看答案</summary>

考虑 $T = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$。
1. $T^2 = 0$，故所有特征值为 0，$r(T) = 0$。
2. 但 $\|T\| = 1$ (考虑向量 $(0, 1)^T$)。
3. 这说明范数控制谱，但谱不一定控制范数（除非是正规算子）。

</details>

---

## 七、章节衔接

- 前置章节：[Hilbert 空间基础](./hilbert-spaces)
- 实战演练：[泛函分析练习（C 组：算子理论）](/docs/exercises/math/functional-analysis#fa-c1)
