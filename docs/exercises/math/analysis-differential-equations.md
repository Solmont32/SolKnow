---
title: 常微分方程专题练习
description: 涵盖初等积分法、高阶线性方程与稳定性理论的教材化分层练习
---

# 常微分方程专题练习

覆盖主题：一阶方程（变量分离、线性、全微分）、高阶线性方程、微分方程组、稳定性判定。

> 使用建议：先独立推导，再点击展开过程与答案。

---

## 一、 基础题：初等积分法

### 练习 1：变量分离与初值问题 {#ode-1}
求解初值问题：$\frac{dy}{dx} = 2xy, y(0) = 3$。

<details>
<summary>点击查看解析与答案</summary>

**解析：**
1. **分离变量：** $\frac{dy}{y} = 2x dx$。
2. **两边积分：** $\ln|y| = x^2 + C \implies y = C e^{x^2}$。
3. **代入初值：** $y(0) = C e^0 = C = 3$。
4. **结论：** $y = 3 e^{x^2}$。

**答案：** $y = 3 e^{x^2}$
</details>

### 练习 2：一阶线性方程 {#ode-2}
求解方程：$y' + \frac{1}{x}y = x^2$。

<details>
<summary>点击查看解析与答案</summary>

**解析：**
1. **识别参数：** $P(x) = 1/x, Q(x) = x^2$。
2. **计算积分因子：** $\mu(x) = e^{\int \frac{1}{x} dx} = e^{\ln x} = x$。
3. **两边乘以 $\mu(x)$：** $x y' + y = x^3 \implies (xy)' = x^3$。
4. **两边积分：** $xy = \frac{1}{4}x^4 + C \implies y = \frac{1}{4}x^3 + \frac{C}{x}$。

**答案：** $y = \frac{1}{4}x^3 + \frac{C}{x}$
</details>

---

## 二、 提高题：高阶线性方程与方程组

### 练习 3：常系数齐次方程 {#ode-3}
求解 $y'' - 4y' + 4y = 0$。

<details>
<summary>点击查看解析与答案</summary>

**解析：**
1. **特征方程：** $\lambda^2 - 4\lambda + 4 = 0 \implies (\lambda-2)^2 = 0$。
2. **重根判定：** $\lambda = 2$ 是二重实根。
3. **通解结构：** $y = (C_1 + C_2 x) e^{2x}$。

**答案：** $y = (C_1 + C_2 x) e^{2x}$
</details>

### 练习 4：非齐次方程特解 {#ode-4}
求 $y'' + y = \sin x$ 的一个特解。

<details>
<summary>点击查看解析与答案</summary>

**解析：**
1. **齐次方程根：** $\lambda^2 + 1 = 0 \implies \lambda = \pm i$。
2. **非齐次项：** $f(x) = \sin x$ 对应特征根 $i$ 是单根。
3. **设特解形式：** $y^* = x(A \cos x + B \sin x)$。
4. **求导代入：**
   $(y^*)'' + y^* = (-2A \sin x + 2B \cos x) = \sin x$。
5. **解得：** $2B = 0, -2A = 1 \implies A = -1/2, B = 0$。
6. **特解：** $y^* = -\frac{1}{2}x \cos x$。

**答案：** $y^* = -\frac{1}{2}x \cos x$
</details>

---

## 三、 挑战题：线性方程组与稳定性

### 练习 5：常系数方程组 {#ode-5}
求解方程组 $\dot{\mathbf{x}} = A\mathbf{x}$，其中 $A = \begin{pmatrix} 1 & 1 \\ 4 & 1 \end{pmatrix}$。

<details>
<summary>点击查看解析与答案</summary>

**解析：**
1. **特征值：** $\det(A-\lambda I) = (1-\lambda)^2 - 4 = 0 \implies \lambda = 3, -1$。
2. **特征向量：**
   - $\lambda_1 = 3$：$(A-3I)\mathbf{v}_1 = \begin{pmatrix} -2 & 1 \\ 4 & -2 \end{pmatrix} \mathbf{v}_1 = 0 \implies \mathbf{v}_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$。
   - $\lambda_2 = -1$：$(A+I)\mathbf{v}_2 = \begin{pmatrix} 2 & 1 \\ 4 & 2 \end{pmatrix} \mathbf{v}_2 = 0 \implies \mathbf{v}_2 = \begin{pmatrix} 1 \\ -2 \end{pmatrix}$。
3. **通解：** $\mathbf{x}(t) = C_1 e^{3t} \begin{pmatrix} 1 \\ 2 \end{pmatrix} + C_2 e^{-t} \begin{pmatrix} 1 \\ -2 \end{pmatrix}$。

**答案：** $\mathbf{x}(t) = \begin{pmatrix} C_1 e^{3t} + C_2 e^{-t} \\ 2C_1 e^{3t} - 2C_2 e^{-t} \end{pmatrix}$
</details>

### 练习 6：Lyapunov 稳定性判定 {#ode-6}
讨论系统 $\begin{cases} \dot{x} = -y - x^3 \\ \dot{y} = x - y^3 \end{cases}$ 在原点的稳定性。

<details>
<summary>点击查看解析与答案</summary>

**解析：**
1. **构造正定函数：** 设 $V(x, y) = x^2 + y^2$（正定）。
2. **计算全导数：**
   $\dot{V} = 2x \dot{x} + 2y \dot{y} = 2x(-y - x^3) + 2y(x - y^3)$
   $\dot{V} = -2xy - 2x^4 + 2yx - 2y^4 = -2(x^4 + y^4)$。
3. **判定：** $\dot{V}$ 负定。
4. **结论：** 根据李雅普诺夫定理，原点是**全局渐近稳定**的。

**答案：** 渐近稳定。
</details>

---

返回章节：[`常微分方程`](/docs/academic-math/analysis/differential-equations)
