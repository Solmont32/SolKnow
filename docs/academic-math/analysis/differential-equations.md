---
title: 微分方程：探索变化的规律 (Differential Equations)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 微分方程：探索变化的规律

如果代数方程是寻找一个**未知的数**，那么微分方程就是在寻找一个**未知的函数**。它是通过已知该函数与其导数之间的关系，反推出函数原本面貌的强大学科，在物理建模、种群动力学和经济学中有极广泛的应用。

## 一、 常微分方程的初等解法

在处理一阶方程时，除了最基本的可分离变量和线性方程外，还有几种常见的初等类型：

### 1. 伯努利方程 (Bernoulli Equation)
**形式**：$\frac{dy}{dx} + P(x)y = Q(x)y^n$ （其中 $n \neq 0, 1$）。
**解法**：
1. 两端除以 $y^n$：$y^{-n} \frac{dy}{dx} + P(x)y^{1-n} = Q(x)$。
2. 令 $z = y^{1-n}$，则 $\frac{dz}{dx} = (1-n)y^{-n} \frac{dy}{dx}$。
3. 代入原式，化为关于 $z$ 的**一阶线性微分方程**：$\frac{1}{1-n} \frac{dz}{dx} + P(x)z = Q(x)$。

### 2. 全微分方程 (Exact Equation)
**形式**：$M(x, y)dx + N(x, y)dy = 0$。
**判别条件**：如果区域内满足 $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$，则方程是全微分的。
**解法**：
寻找函数 $u(x, y)$ 使得 $du = Mdx + Ndy = 0$，则通解为 $u(x, y) = C$。
计算公式：$u(x, y) = \int_{x_0}^x M(t, y) dt + \int_{y_0}^y N(x_0, t) dt$。

<KnowledgeCard type="warning" title="全微分化的“点金石”：积分因子">
若方程不满足全微分条件，有时可乘以一个因子 $\mu(x, y)$ 使其变为全微分方程。例如，若 $\frac{1}{N}(\frac{\partial M}{\partial y} - \frac{\partial N}{\partial x})$ 仅是 $x$ 的函数 $f(x)$，则积分因子为 $\mu(x) = e^{\int f(x)dx}$。
</KnowledgeCard>

---

## 二、 可降阶的高阶方程

对于某些特殊的高阶方程，可以通过变量代换将其化为低阶方程求解。

### 1. $y^{(n)} = f(x)$ 型
这类方程只需通过连续积分 $n$ 次即可求解。通解包含 $n$ 个任意常数。

### 2. 不显含 $y$ 的方程：$F(x, y', y'') = 0$
**方法**：令 $p = y'$，则 $y'' = \frac{dp}{dx}$。
方程变为关于 $p$ 的一阶方程 $F(x, p, \frac{dp}{dx}) = 0$。求出 $p(x, C_1)$ 后，再通过 $y = \int p dx + C_2$ 得到原函数的解。

### 3. 不显含 $x$ 的方程：$F(y, y', y'') = 0$
**方法**：令 $p = y'$，将 $y$ 视为自变量。
利用复合函数求导法则：$y'' = \frac{dp}{dx} = \frac{dp}{dy} \cdot \frac{dy}{dx} = p \frac{dp}{dy}$。
原方程化为关于 $p$ 和 $y$ 的一阶方程 $F(y, p, p \frac{dp}{dy}) = 0$。

---

## 三、 高阶线性微分方程

### 1. 解空间结构
对于 $n$ 阶齐次线性方程 $L[y] = y^{(n)} + p_{n-1}(x)y^{(n-1)} + \dots + p_0(x)y = 0$：
- **解空间的维度**：方程的所有解构成一个 $n$ 维向量空间。
- **线性无关判别**：使用 **Wronski 行列式** $W(x)$。若 $W(x) \neq 0$，则解组线性无关。

### 2. 常系数线性方程
对于特征方程 $a_n r^n + \dots + a_0 = 0$：
- **单实根 $r$**：对应解 $e^{rx}$。
- **$k$ 重实根 $r$**：对应解 $e^{rx}, x e^{rx}, \dots, x^{k-1} e^{rx}$。
- **复根 $\alpha \pm \beta i$**：对应解 $e^{\alpha x} \cos \beta x, e^{\alpha x} \sin \beta x$。

### 3. 欧拉方程 (Euler Equation)
**形式**：$x^n y^{(n)} + a_{n-1} x^{n-1} y^{(n-1)} + \dots + a_0 y = f(x)$。
**解法**：引入变换 $x = e^t$，化为常系数方程。

---

## 四、 常微分方程组 (Systems of ODEs)

在复杂系统中，变量间往往相互耦合。我们主要研究一阶方程组。

### 1. 一阶齐次线性方程组
**形式**：$\mathbf{y}' = A\mathbf{y}$，其中 $A$ 为常数矩阵。
**通解构造**：
1. **不同实特征值**：若有 $n$ 个实特征值 $\lambda_i$ 和线性无关的特征向量 $\mathbf{v}_i$，通解为 $\mathbf{y} = \sum C_i \mathbf{v}_i e^{ \lambda_i t}$。
2. **复特征值**：若特征值为 $\alpha \pm \beta i$，对应特征向量为 $\mathbf{a} \pm \mathbf{b}i$，则产生两个实值解：
   $\mathbf{y}_1 = e^{\alpha t}(\mathbf{a} \cos \beta t - \mathbf{b} \sin \beta t)$
   $\mathbf{y}_2 = e^{\alpha t}(\mathbf{a} \sin \beta t + \mathbf{b} \cos \beta t)$

### 2. 矩阵指数 (Matrix Exponential)
对于系统 $\mathbf{y}' = A\mathbf{y}$，定义矩阵指数：
$$e^{At} = I + At + \frac{A^2 t^2}{2!} + \dots = \sum_{k=0}^\infty \frac{A^k t^k}{k!}$$
满足初值 $\mathbf{y}(0) = \mathbf{y}_0$ 的特解为：$\mathbf{y}(t) = e^{At} \mathbf{y}_0$。

### 3. 非齐次线性方程组
**形式**：$\mathbf{y}' = A\mathbf{y} + \mathbf{g}(t)$。
**常数变易法公式**：
$$\mathbf{y}(t) = e^{At}\mathbf{y}_0 + \int_0^t e^{A(t-s)}\mathbf{g}(s) ds$$

---

## 五、 稳定性理论初步 (Stability Theory)

稳定性研究的是：当初始条件发生微小扰动时，系统的解在无穷远处的行为。

### 1. 平衡点 (Equilibrium Points)
对于自治系统 $\frac{d\mathbf{x}}{dt} = \mathbf{f}(\mathbf{x})$，满足 $\mathbf{f}(\mathbf{x}^*) = 0$ 的点 $\mathbf{x}^*$ 称为平衡点（或奇点）。

### 2. 稳定性定义 (Liapunov Stability)
- **稳定 (Stable)**：若对任意 $\epsilon > 0$，存在 $\delta > 0$，使得当 $\|\mathbf{x}(0) - \mathbf{x}^*\| < \delta$ 时，对所有 $t \ge 0$ 均有 $\|\mathbf{x}(t) - \mathbf{x}^*\| < \epsilon$。
- **渐近稳定 (Asymptotically Stable)**：首先是稳定的，且 $\lim_{t \to \infty} \mathbf{x}(t) = \mathbf{x}^*$。
- **不稳定 (Unstable)**：非稳定的点。

### 3. 二阶线性系统的平衡点分类
考虑 $\mathbf{x}' = A\mathbf{x}$，令 $\lambda_1, \lambda_2$ 为 $A$ 的特征值：
1. **$\lambda_1, \lambda_2 < 0$ (或 $\text{Re}(\lambda) < 0$)**：**稳定结点/焦点**（渐近稳定）。
2. **$\lambda_1, \lambda_2 > 0$ (或 $\text{Re}(\lambda) > 0$)**：**不稳定结点/焦点**（不稳定）。
3. **$\lambda_1 < 0 < \lambda_2$**：**鞍点 (Saddle Point)**（不稳定）。
4. **$\lambda = \pm \beta i$ (纯虚根)**：**中心点 (Center)**（稳定，但非渐近稳定）。

<KnowledgeCard type="info" title="线性化原则">
对于非线性系统 $\mathbf{x}' = \mathbf{f}(\mathbf{x})$，在其平衡点 $\mathbf{x}^*$ 处的稳定性通常可以通过考察其 **Jacobian 矩阵** $J = \frac{\partial \mathbf{f}}{\partial \mathbf{x}}|_{\mathbf{x}^*}$ 的特征值来判定。
</KnowledgeCard>

---

## 六、 物理应用：振动与动力学

### 1. 阻尼振动模型
$$m \ddot{x} + c \dot{x} + kx = 0$$
- **欠阻尼 ($c^2 < 4mk$)**：对应复根，系统做振荡衰减，平衡点是**渐近稳定焦点**。
- **无阻尼 ($c = 0$)**：对应纯虚根，系统做等幅振荡，平衡点是**中心点**。

---

## 七、 深度例题解析

### 例题 1：利用矩阵指数求解方程组
求解 $\mathbf{y}' = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix} \mathbf{y}$，$\mathbf{y}(0) = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$。

<details>

<summary>点击查看解析</summary>

1. **计算 $A^k$**：$A = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}, A^2 = -I, A^3 = -A, A^4 = I \dots$
2. **构建 $e^{At}$**：
   $e^{At} = I + At - \frac{t^2}{2!}I - \frac{t^3}{3!}A + \dots = (1 - \frac{t^2}{2!} + \dots)I + (t - \frac{t^3}{3!} + \dots)A$
   $e^{At} = (\cos t) I + (\sin t) A = \begin{pmatrix} \cos t & \sin t \\ - \sin t & \cos t \end{pmatrix}$。
3. **结果**：$\mathbf{y}(t) = e^{At} \begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} \cos t \\ - \sin t \end{pmatrix}$。

</details>

### 例题 2：非线性系统的平衡点稳定性
分析系统 $\dot{x} = y, \dot{y} = -x + x^3$ 在原点 $(0,0)$ 的稳定性。

<details>

<summary>点击查看解析</summary>

1. **计算 Jacobian 矩阵**：$J(x, y) = \begin{pmatrix} \partial \dot{x}/\partial x & \partial \dot{x}/\partial y \\ \partial \dot{y}/\partial x & \partial \dot{y}/\partial y \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ -1+3x^2 & 0 \end{pmatrix}$。
2. **原点处 $(0,0)$**：$J(0,0) = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$。
3. **特征值**：$\lambda = \pm i$。
4. **结论**：线性化系统为中心点。对于非线性系统，纯虚根是临界情况，通常需要李雅普诺夫函数或能量法进一步判定。在本例中，该系统为哈密顿系统（能量守恒），原点是稳定的中心点。

</details>

---

## 八、 练习库强化

### 练习 1：特征向量方法
求解 $\mathbf{y}' = \begin{pmatrix} 1 & 1 \\ 4 & 1 \end{pmatrix} \mathbf{y}$。

<details>

<summary>答案</summary>

特征值 $\lambda_1 = 3, \lambda_2 = -1$。对应向量 $\mathbf{v}_1 = (1, 2)^T, \mathbf{v}_2 = (1, -2)^T$。
通解：$\mathbf{y} = C_1 \begin{pmatrix} 1 \\ 2 \end{pmatrix} e^{3t} + C_2 \begin{pmatrix} 1 \\ -2 \end{pmatrix} e^{-t}$。

</details>

### 练习 2：稳定性分类
判定系统 $\dot{x} = -2x + y, \dot{y} = x - 2y$ 的平衡点类型。

<details>

<summary>答案</summary>

$A = \begin{pmatrix} -2 & 1 \\ 1 & -2 \end{pmatrix}$，特征值 $\lambda_1 = -1, \lambda_2 = -3$。
均为负实根，平衡点 $(0,0)$ 是**渐近稳定结点**。

</details>

### 练习 3：李雅普诺夫稳定性判断
对于系统 $\dot{x} = -x^3$，证明原点是渐近稳定的。

<details>

<summary>答案</summary>

取 $V(x) = \frac{1}{2}x^2 > 0$。则 $\dot{V} = x \dot{x} = -x^4 < 0$ (当 $x \neq 0$)。
根据李雅普诺夫第二定理，原点是渐近稳定的。

</details>

