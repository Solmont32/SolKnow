---
title: 微分方程专题练习 (Differential Equations Exercises)
description: 涵盖初等积分法、高阶线性方程、稳定性理论、特征线法、分离变量法与 Sturm-Liouville 理论的教材化分层练习
---

# 微分方程专题练习

覆盖主题：一阶 ODE、高阶线性 ODE、稳定性判定、特征线法 (PDE)、分离变量法 (PDE)、Sturm-Liouville 理论与特殊函数。

> 使用建议：先独立推导，再点击展开过程与答案。

---

## 一、 基础题：常微分方程 (ODE)

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

## 二、 提高题：高阶线性方程与稳定性

### 练习 3：非齐次方程特解 {#ode-4}

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

### 练习 4：Lyapunov 稳定性判定 {#ode-6}

讨论系统 $\begin{cases} \dot{x} = -y - x^3 \\ \dot{y} = x - y^3 \end{cases}$ 在原点的稳定性。

<details>
<summary>点击查看解析与答案</summary>

**解析：**

1. **构造正定函数：** 设 $V(x, y) = x^2 + y^2$（正定）。
2. **计算全导数：**
   $\dot{V} = 2x \dot{x} + 2y \dot{y} = 2x(-y - x^3) + 2y(x - y^3) = -2(x^4 + y^4)$。
3. **判定：** $\dot{V}$ 负定。
4. **结论：** 根据李雅普诺夫定理，原点是**全局渐近稳定**的。

**答案：** 渐近稳定。

</details>

---

## 三、 进阶题：偏微分方程 (PDE)

### 练习 5：特征线法 {#pde-1}

求解线性一阶 PDE：$u_x + 2u_y = 0$，初始条件 $u(x, 0) = \sin x$。

<details>
<summary>点击查看解析与答案</summary>

**解析：**

1. **写出特征方程：** $\frac{dx}{1} = \frac{dy}{2} = \frac{du}{0}$。
2. **求解特征线：** $2dx - dy = 0 \implies 2x - y = C$。
3. **由 $du=0$ 知：** $u$ 在特征线上为常数，故通解为 $u(x, y) = f(2x - y)$。
4. **利用初值条件：** $u(x, 0) = f(2x) = \sin x$。
5. **令 $t = 2x$，则 $x = t/2$：** $f(t) = \sin(t/2)$。
6. **最终解：** $u(x, y) = \sin\left(\frac{2x - y}{2}\right) = \sin(x - y/2)$。

**答案：** $u(x, y) = \sin(x - y/2)$

</details>

### 练习 6：波动方程的分离变量法 {#pde-2}

求解弦振动方程 $u_{tt} = c^2 u_{xx}$ ($0 < x < L$)，边界条件 $u(0, t) = u(L, t) = 0$。

<details>
<summary>点击查看解析与答案</summary>

**解析：**

1. **分离变量：** 设 $u(x, t) = X(x)T(t)$，代入得 $\frac{T''}{c^2 T} = \frac{X''}{X} = -\lambda$。
2. **空间部分：** $X'' + \lambda X = 0, X(0)=X(L)=0 \implies \lambda_n = (\frac{n\pi}{L})^2, X_n(x) = \sin\frac{n\pi x}{L}$。
3. **时间部分：** $T'' + (\frac{n\pi c}{L})^2 T = 0 \implies T_n(t) = A_n \cos\frac{n\pi c t}{L} + B_n \sin\frac{n\pi c t}{L}$。
4. **通解形式：** $u(x, t) = \sum_{n=1}^\infty \sin\frac{n\pi x}{L} [A_n \cos\frac{n\pi c t}{L} + B_n \sin\frac{n\pi c t}{L}]$。

**结论：** 弦的振动是无数个简正振型的叠加。

</details>

---

## 四、 深度挑战：Sturm-Liouville 与特殊函数

### 练习 7：S-L 特征值问题 {#sl-1}

求解边值问题 $y'' + \lambda y = 0, y(0) = 0, y'(L) = 0$。

<details>
<summary>点击查看解析与答案</summary>

**解析：**

1. **分类讨论 $\lambda$：**
   - 若 $\lambda < 0$：只有零解。
   - 若 $\lambda = 0$：$y = Ax + B$，由 $y(0)=0 \implies B=0$，由 $y'(L)=0 \implies A=0$。
   - 若 $\lambda > 0$：令 $\lambda = k^2$，则 $y = A \sin kx + B \cos kx$。
2. **代入边界条件：**
   - $y(0) = 0 \implies B = 0$。
   - $y'(x) = Ak \cos kx \implies y'(L) = Ak \cos kL = 0$。
3. **非零解要求：** $\cos kL = 0 \implies kL = n\pi + \frac{\pi}{2} = (2n+1)\frac{\pi}{2}$。
4. **结果：**
   - **特征值：** $\lambda_n = \left[ \frac{(2n+1)\pi}{2L} \right]^2$。
   - **特征函数：** $y_n(x) = \sin \frac{(2n+1)\pi x}{2L}$。

**答案：** $\lambda_n = [ \frac{(2n+1)\pi}{2L} ]^2, y_n(x) = \sin \frac{(2n+1)\pi x}{2L}$ ($n=0, 1, 2 \dots$)

</details>

### 练习 8：勒让德多项式的正交性应用 {#special-1}

计算积分 $I = \int_{-1}^1 (3x^2 + x + 1) P_2(x) dx$。

<details>
<summary>点击查看解析与答案</summary>

**解析：**

1. **回忆勒让德多项式：** $P_2(x) = \frac{1}{2}(3x^2 - 1)$，故 $3x^2 = 2P_2(x) + 1 = 2P_2(x) + P_0(x)$。
2. **重写被积函数：** $3x^2 + x + 1 = (2P_2(x) + P_0(x)) + P_1(x) + P_0(x) = 2P_2(x) + P_1(x) + 2P_0(x)$。
3. **利用正交性：** $\int_{-1}^1 P_n(x) P_m(x) dx = 0$ (当 $n \ne m$)。
   $I = \int_{-1}^1 [2P_2(x) + P_1(x) + 2P_0(x)] P_2(x) dx = 2 \int_{-1}^1 [P_2(x)]^2 dx$。
4. **利用模长公式：** $\int_{-1}^1 [P_n(x)]^2 dx = \frac{2}{2n+1}$。
5. **计算结果：** $I = 2 \cdot \frac{2}{2(2)+1} = 2 \cdot \frac{2}{5} = \frac{4}{5}$。

**答案：** $4/5$

</details>

---

返回章节：[`微分方程`](/docs/academic-math/analysis/differential-equations)
