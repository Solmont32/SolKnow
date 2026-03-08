---
title: 微分方程 (Ordinary Differential Equations)
description: 系统化梳理 ODE 理论：从初等解法到 Picard 存在唯一性定理，涵盖高阶线性方程与稳定性理论。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 微分方程：探索变化的规律

如果代数方程是寻找一个**未知的数**，那么微分方程就是在寻找一个**未知的函数**。它是分析学中连接理论与现实世界的桥梁。

---

## 一、 存在性与唯一性理论 (Existence & Uniqueness)

在求解微分方程之前，首要问题是：解是否存在？是否唯一？

### 1. Picard 存在唯一性定理

对于初值问题 (IVP): $\frac{dy}{dx} = f(x, y), y(x_0) = y_0$。

<KnowledgeCard type="info" title="Picard 定理">
若 $f(x, y)$ 在矩形区域 $R$ 内连续，且关于 $y$ 满足 **Lipschitz 条件**：
$$|f(x, y_1) - f(x, y_2)| \le L |y_1 - y_2|$$
则在 $x_0$ 的某个邻域内，初值问题存在唯一的连续解。
</KnowledgeCard>

<details>
<summary>点击查看证明思路：Picard 迭代法</summary>

将微分方程转化为积分方程：
$$y(x) = y_0 + \int_{x_0}^x f(t, y(t)) dt$$
构造函数序列（逐次逼近）：
$y_0(x) = y_0$
$y_{n+1}(x) = y_0 + \int_{x_0}^x f(t, y_n(t)) dt$
利用 Lipschitz 条件证明该序列在 $C[x_0-h, x_0+h]$ 上一致收敛，且其极限即为所求之解。

</details>

### 2. Gronwall 不等式 (估计的利器)

若 $u(t) \le c + \int_a^t \beta(s)u(s)ds$，则 $u(t) \le c \exp(\int_a^t \beta(s)ds)$。这是证明解的唯一性和稳定性分析的核心工具。

---

## 二、 初等解法精要

### 1. 伯努利方程 (Bernoulli)
$\frac{dy}{dx} + P(x)y = Q(x)y^n$。通过变换 $z = y^{1-n}$ 化为线性方程。

### 2. 全微分方程与积分因子
$Mdx + Ndy = 0$。若 $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$，则存在原函数 $u(x,y)=C$。

---

## 三、 高阶线性微分方程组

### 1. 基础解系与 Wronski 行列式
对于 $n$ 阶齐次线性方程，若 $n$ 个解的 Wronski 行列式 $W(x) \neq 0$，则它们构成**基础解系**。

### 2. 基本矩阵 (Fundamental Matrix)
对于线性方程组 $\mathbf{y}' = A(t)\mathbf{y}$，由 $n$ 个线性无关解向量组成的矩阵 $\Phi(t)$ 称为**基本矩阵**。它满足：
$$\Phi'(t) = A(t)\Phi(t)$$
初值问题的解可表示为 $\mathbf{y}(t) = \Phi(t)\Phi^{-1}(t_0)\mathbf{y}_0$。

---

## 四、 稳定性理论 (Stability Theory)

### 1. 李雅普诺夫 (Lyapunov) 直接法
构造能量函数 $V(\mathbf{x})$：
- 若 $V(\mathbf{x}) > 0$ 且 $\dot{V}(\mathbf{x}) \le 0$，则平衡点是**稳定**的。
- 若 $\dot{V}(\mathbf{x}) < 0$（正定），则平衡点是**渐近稳定**的。

### 2. 线性化判定
通过 Jacobian 矩阵 $J$ 的特征值 $\lambda$ 判定：
- $\text{Re}(\lambda) < 0$：渐近稳定。
- 存在 $\text{Re}(\lambda) > 0$：不稳定。

---

## 五、 深度例题解析

### 例题 1：Picard 迭代的演练
求 $\dot{y} = y, y(0) = 1$ 的前三次 Picard 逼近项。
<details>
<summary>点击查看解析</summary>
1. $y_0 = 1$
2. $y_1 = 1 + \int_0^x 1 dt = 1 + x$
3. $y_2 = 1 + \int_0^x (1+t) dt = 1 + x + \frac{x^2}{2!}$
4. $y_3 = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!}$
可以预见，$y_n \to e^x$。
</details>

---

## 六、 配套练习

1. **[基础]** 求解 $y' - \frac{y}{x} = x \sin x$。
2. **[理论]** 使用 Gronwall 不等式证明初值问题 $\dot{y} = f(x, y), y(0)=y_0$ 在 $f$ 满足 Lipschitz 条件时解的唯一性。
3. **[计算]** 求解方程组 $\mathbf{y}' = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} \mathbf{y}$ 的基本矩阵 $e^{At}$。
4. **[进阶]** 讨论系统 $\dot{x} = y - x^3, \dot{y} = -x - y^3$ 在原点的稳定性（提示：构造 $V = x^2 + y^2$）。

<details>
<summary>点击查看简要提示</summary>
1. 线性方程公式得 $y = x(C - \cos x)$。
2. 设两个解 $y_1, y_2$，则 $|y_1-y_2| \le \int_0^x L|y_1-y_2| dt$。由 Gronwall 得 $|y_1-y_2| \le 0 \cdot e^{Lx} = 0$。
3. $A = I + B$，$B = \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}$。$e^{At} = e^{It}e^{Bt} = e^t (I + Bt) = \begin{pmatrix} e^t & te^t \\ 0 & e^t \end{pmatrix}$。
4. $\dot{V} = 2x\dot{x} + 2y\dot{y} = 2x(y-x^3) + 2y(-x-y^3) = -2(x^4+y^4) < 0$。原点是全局渐近稳定的。
</details>

