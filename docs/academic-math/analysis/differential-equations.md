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

高阶方程的研究核心在于其解空间的线性结构。

### 1. 齐次线性方程的解空间结构
对于 $n$ 阶齐次线性方程 $L[y] = y^{(n)} + p_{n-1}(x)y^{(n-1)} + \dots + p_0(x)y = 0$：
- **解的叠加原理**：若 $y_1, y_2$ 是解，则其线性组合 $C_1 y_1 + C_2 y_2$ 也是解。
- **解空间的维度**：方程的所有解构成一个 $n$ 维向量空间。
- **基本解组 (Fundamental Set)**：$n$ 个线性无关的解 $y_1, \dots, y_n$ 构成该空间的一组基。
- **线性无关判别**：使用 **Wronski 行列式** $W(x)$：
  $$W(x) = \begin{vmatrix} y_1 & y_2 & \dots & y_n \\ y_1' & y_2' & \dots & y_n' \\ \vdots & \vdots & \ddots & \vdots \\ y_1^{(n-1)} & y_2^{(n-1)} & \dots & y_n^{(n-1)} \end{vmatrix}$$
  若在定义区间内某点 $W(x_0) \neq 0$，则这些解在整个区间上线性无关。

### 2. 非齐次线性方程的构造
对于非齐次方程 $L[y] = f(x)$，其通解结构为：
**通解 $y$ = 对应齐次方程的通解 $y_h$ + 非齐次方程的一个特解 $y_p$**
$$y = \sum_{i=1}^n C_i y_i + y_p$$

### 3. 常系数线性方程
对于 $a_n y^{(n)} + \dots + a_1 y' + a_0 y = 0$，其特征方程为：
$$a_n r^n + a_{n-1} r^{n-1} + \dots + a_1 r + a_0 = 0$$
- **单实根 $r$**：对应解 $e^{rx}$。
- **$k$ 重实根 $r$**：对应解 $e^{rx}, x e^{rx}, \dots, x^{k-1} e^{rx}$。
- **复根 $\alpha \pm \beta i$**：对应解 $e^{\alpha x} \cos \beta x, e^{\alpha x} \sin \beta x$。

### 4. 欧拉方程 (Euler Equation)
**形式**：$x^n y^{(n)} + a_{n-1} x^{n-1} y^{(n-1)} + \dots + a_1 x y' + a_0 y = f(x)$。
**解法**：引入变换 $x = e^t$ ($x > 0$)，可将其化为常系数线性方程。
算子代换关系：$x y' = Dy, x^2 y'' = D(D-1)y, \dots$（其中 $D = \frac{d}{dt}$）。

---

## 四、 线性微分方程组初步

在现实系统中，多个变量往往相互耦合。

### 1. 一阶线性常系数齐次微分方程组
**形式**：$\mathbf{y}' = A\mathbf{y}$，其中 $\mathbf{y} = [y_1, y_2, \dots, y_n]^T$，$A$ 为 $n \times n$ 常数矩阵。
**解法**：寻找矩阵 $A$ 的特征值 $\lambda$ 和特征向量 $\mathbf{v}$。
1. 若 $\lambda$ 为特征值，则 $\mathbf{y} = \mathbf{v} e^{\lambda t}$ 是方程组的一个解。
2. 若 $A$ 有 $n$ 个线性无关的特征向量 $\mathbf{v}_1, \dots, \mathbf{v}_n$，对应的特征值为 $\lambda_1, \dots, \lambda_n$，则通解为：
   $$\mathbf{y}(t) = C_1 \mathbf{v}_1 e^{\lambda_1 t} + C_2 \mathbf{v}_2 e^{\lambda_2 t} + \dots + C_n \mathbf{v}_n e^{\lambda_n t}$$

---

## 五、 物理应用：振动系统与建模

微分方程最直观的物理应用之一是描述力学系统的动力学行为。

### 1. 阻尼振动模型 (Damped Vibration)
根据牛顿第二定律，受弹性恢复力 $-kx$ 和阻尼力 $-c\dot{x}$ 作用的物体满足：
$$m \frac{d^2x}{dt^2} + c \frac{dx}{dt} + kx = 0$$
特征方程：$mr^2 + cr + k = 0 \implies r = \frac{-c \pm \sqrt{c^2 - 4mk}}{2m}$。

### 2. 运动状态分析
- **过阻尼 (Over-damped)**：$c^2 > 4mk$。系统无振荡，缓慢回到平衡位置。
- **临界阻尼 (Critically damped)**：$c^2 = 4mk$。系统以最快速度回到平衡位置且不发生振荡。
- **欠阻尼 (Under-damped)**：$c^2 < 4mk$。系统呈现指数衰减的周期性振动：
  $x(t) = e^{-\gamma t}(A \cos \omega t + B \sin \omega t)$，其中衰减系数 $\gamma = \frac{c}{2m}$。

---

## 六、 深度例题解析

### 例题 1：不显含自变量 $x$ 的降阶法
求解初值问题 $y y'' - (y')^2 = 0$，且 $y(0)=1, y'(0)=1$。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **降阶**：令 $y' = p$，则 $y'' = p \frac{dp}{dy}$。
2. **代入方程**：$y p \frac{dp}{dy} - p^2 = 0 \implies p(y \frac{dp}{dy} - p) = 0$。
3. **求解一阶方程**：
   - 若 $p=0$，则 $y=C$，不满足初值 $y'(0)=1$。
   - 若 $y \frac{dp}{dy} = p$，分离变量：$\frac{dp}{p} = \frac{dy}{y}$。
   - 积分得 $\ln |p| = \ln |y| + C_1 \implies p = C_2 y \implies y' = C_2 y$。
4. **利用初值求常数**：$y'(0) = C_2 y(0) \implies 1 = C_2 \cdot 1 \implies C_2 = 1$。
5. **求解最终函数**：$y' = y \implies \frac{dy}{y} = dx \implies \ln y = x + C_3$。
   - $y(0)=1 \implies \ln 1 = 0 + C_3 \implies C_3 = 0$。
   - 所以 $y = e^x$。

#### 答案
$y = e^x$
</details>

### 例题 2：线性方程组与特征值方法
求解方程组 $\begin{cases} \frac{dx}{dt} = x + 2y \\ \frac{dy}{dt} = 3x + 2y \end{cases}$，且 $x(0)=0, y(0)=5$。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **矩阵形式**：$A = \begin{pmatrix} 1 & 2 \\ 3 & 2 \end{pmatrix}$。
2. **求特征值**：$\det(A - \lambda I) = \lambda^2 - 3\lambda - 4 = 0 \implies \lambda_1 = 4, \lambda_2 = -1$。
3. **求特征向量**：$\mathbf{v}_1 = \begin{pmatrix} 2 \\ 3 \end{pmatrix}, \mathbf{v}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$。
4. **写出通解**：$\mathbf{y}(t) = C_1 \begin{pmatrix} 2 \\ 3 \end{pmatrix} e^{4t} + C_2 \begin{pmatrix} 1 \\ -1 \end{pmatrix} e^{-t}$。
5. **代入初值**：$2C_1 + C_2 = 0, 3C_1 - C_2 = 5 \implies C_1 = 1, C_2 = -2$。
6. **最终特解**：$x(t) = 2e^{4t} - 2e^{-t}, y(t) = 3e^{4t} + 2e^{-t}$。

#### 答案
$x(t) = 2e^{4t} - 2e^{-t}, y(t) = 3e^{4t} + 2e^{-t}$
</details>

---

## 七、 练习库强化

### 练习 1：全微分方程判别与求解
求解方程 $(3x^2 + 6xy^2)dx + (6x^2y + 4y^3)dy = 0$。

<details>
<summary>点击查看解析与答案</summary>

**解析**：
$M = 3x^2 + 6xy^2, N = 6x^2y + 4y^3 \implies \frac{\partial M}{\partial y} = 12xy = \frac{\partial N}{\partial x}$。
积分 $u = \int M dx = x^3 + 3x^2y^2 + \phi(y)$。
$\frac{\partial u}{\partial y} = 6x^2y + \phi'(y) = N = 6x^2y + 4y^3 \implies \phi(y) = y^4$。
**答案**：$x^3 + 3x^2y^2 + y^4 = C$。
</details>

### 练习 2：高阶常系数方程（重根情形）
求解微分方程 $y^{(4)} - 2y'' + y = 0$。

<details>
<summary>点击查看解析与答案</summary>

**解析**：
特征方程：$r^4 - 2r^2 + 1 = (r^2 - 1)^2 = (r-1)^2(r+1)^2 = 0$。
特征根为 $1, -1$ 均为二重根。
**答案**：$y = (C_1 + C_2 x) e^x + (C_3 + C_4 x) e^{-x}$。
</details>

### 练习 3：欠阻尼振动求解
一质量 $m=1$ 的物体，弹簧常数 $k=5$，阻尼系数 $c=2$。初始位移 $x(0)=1$，初速度 $v(0)=0$。求运动方程。

<details>
<summary>点击查看解析与答案</summary>

**解析**：
方程 $\ddot{x} + 2\dot{x} + 5x = 0$。特征方程 $r^2 + 2r + 5 = 0 \implies r = -1 \pm 2i$。
通解 $x(t) = e^{-t}(A \cos 2t + B \sin 2t)$。
$x(0)=1 \implies A=1$。
$v(t) = -e^{-t}(A \cos 2t + B \sin 2t) + e^{-t}(-2A \sin 2t + 2B \cos 2t)$。
$v(0) = -A + 2B = 0 \implies B = 1/2$。
**答案**：$x(t) = e^{-t}(\cos 2t + \frac{1}{2} \sin 2t)$。
</details>

### 练习 4：欧拉方程求解
求解 $x^2 y'' - 2xy' + 2y = x^3 \ln x$ ($x>0$)。

<details>
<summary>点击查看解析与答案</summary>

**解析**：
令 $x=e^t$，原方程化为 $[D(D-1) - 2D + 2]y = e^{3t} \cdot t \implies (D^2 - 3D + 2)y = t e^{3t}$。
1. 齐次通解：$r^2-3r+2=0 \implies r_1=1, r_2=2 \implies y_h = C_1 e^t + C_2 e^{2t} = C_1 x + C_2 x^2$。
2. 非齐次特解：设 $y_p = (At+B)e^{3t}$。代入得 $y_p = (\frac{1}{2}t - \frac{3}{4})e^{3t}$。
3. 回代 $x$：$y_p = (\frac{1}{2}\ln x - \frac{3}{4})x^3$。
**答案**：$y = C_1 x + C_2 x^2 + \frac{1}{4}x^3(2\ln x - 3)$。
</details>
