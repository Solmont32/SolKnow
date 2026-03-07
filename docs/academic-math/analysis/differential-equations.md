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

## 二、 高阶线性微分方程

高阶方程的研究核心在于其解空间的线性结构。

### 1. 线性相关性与 Wronski 行列式
对于 $n$ 阶线性齐次方程，若有 $n$ 个解 $y_1, y_2, \dots, y_n$，它们线性无关的充要条件是其 **Wronski 行列式** $W(x) \neq 0$：
$$W(x) = \begin{vmatrix} y_1 & y_2 & \dots & y_n \\ y_1' & y_2' & \dots & y_n' \\ \vdots & \vdots & \ddots & \vdots \\ y_1^{(n-1)} & y_2^{(n-1)} & \dots & y_n^{(n-1)} \end{vmatrix}$$

### 2. $n$ 阶常系数线性齐次方程
特征方程法可以自然推广。对于 $a_n y^{(n)} + \dots + a_1 y' + a_0 y = 0$，其特征方程为：
$$a_n r^n + a_{n-1} r^{n-1} + \dots + a_1 r + a_0 = 0$$
- **单实根 $r$**：对应解 $e^{rx}$。
- **$k$ 重实根 $r$**：对应解 $e^{rx}, x e^{rx}, \dots, x^{k-1} e^{rx}$。
- **复根 $\alpha \pm \beta i$**：对应解 $e^{\alpha x} \cos \beta x, e^{\alpha x} \sin \beta x$。

---

## 三、 线性微分方程组初步

在现实系统中，多个变量往往相互耦合。

### 1. 一阶线性常系数齐次微分方程组
**形式**：$\mathbf{y}' = A\mathbf{y}$，其中 $\mathbf{y} = [y_1, y_2, \dots, y_n]^T$，$A$ 为 $n \times n$ 常数矩阵。
**解法**：寻找矩阵 $A$ 的特征值 $\lambda$ 和特征向量 $\mathbf{v}$。
1. 若 $\lambda$ 为特征值，则 $\mathbf{y} = \mathbf{v} e^{\lambda t}$ 是方程组的一个解。
2. 若 $A$ 有 $n$ 个线性无关的特征向量 $\mathbf{v}_1, \dots, \mathbf{v}_n$，对应的特征值为 $\lambda_1, \dots, \lambda_n$，则通解为：
   $$\mathbf{y}(t) = C_1 \mathbf{v}_1 e^{\lambda_1 t} + C_2 \mathbf{v}_2 e^{\lambda_2 t} + \dots + C_n \mathbf{v}_n e^{\lambda_n t}$$

---

## 四、 深度深度例题解析

### 例题 1：伯努利方程的降阶与物理应用
求解方程 $x y' + y = y^2 \ln x$。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **标准化**：
   $y' + \frac{1}{x} y = \frac{\ln x}{x} y^2$
   这是一个 $n=2$ 的伯努利方程。
2. **变量代换**：
   令 $z = y^{1-2} = y^{-1}$，则 $\frac{dz}{dx} = -y^{-2} \frac{dy}{dx}$。
   原方程除以 $y^2$：$y^{-2} y' + \frac{1}{x} y^{-1} = \frac{\ln x}{x}$。
   代入 $z$：$-\frac{dz}{dx} + \frac{1}{x} z = \frac{\ln x}{x} \implies \frac{dz}{dx} - \frac{1}{x} z = -\frac{\ln x}{x}$。
3. **求解一阶线性方程**：
   积分因子 $\mu(x) = e^{\int -1/x dx} = 1/x$。
   $\frac{d}{dx}(\frac{z}{x}) = -\frac{\ln x}{x^2}$。
   积分：$\frac{z}{x} = -\int \frac{\ln x}{x^2} dx$。
   利用分部积分：$\int \ln x d(-1/x) = -\frac{\ln x}{x} + \int \frac{1}{x^2} dx = -\frac{\ln x}{x} - \frac{1}{x} + C$。
   所以 $\frac{z}{x} = \frac{\ln x}{x} + \frac{1}{x} + C \implies z = \ln x + 1 + Cx$。
4. **回代 $y$**：
   $y = \frac{1}{\ln x + 1 + Cx}$。

#### 答案
$y = \frac{1}{\ln x + 1 + Cx}$
</details>

### 例题 2：微分方程组与相轨迹分析
求解初值问题：
$\begin{cases} \frac{dx}{dt} = x + 2y \\ \frac{dy}{dt} = 3x + 2y \end{cases}$，且 $x(0)=0, y(0)=5$。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **矩阵形式**：
   $\mathbf{y}' = A\mathbf{y}$，其中 $A = \begin{pmatrix} 1 & 2 \\ 3 & 2 \end{pmatrix}$。
2. **求特征值**：
   $\det(A - \lambda I) = \begin{vmatrix} 1-\lambda & 2 \\ 3 & 2-\lambda \end{vmatrix} = (\lambda-1)(\lambda-2) - 6 = \lambda^2 - 3\lambda - 4 = 0$。
   解得 $\lambda_1 = 4, \lambda_2 = -1$。
3. **求特征向量**：
   - 对于 $\lambda_1 = 4$：$(A-4I)\mathbf{v} = 0 \implies \begin{pmatrix} -3 & 2 \\ 3 & -2 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = 0 \implies \mathbf{v}_1 = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$。
   - 对于 $\lambda_2 = -1$：$(A+I)\mathbf{v} = 0 \implies \begin{pmatrix} 2 & 2 \\ 3 & 3 \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = 0 \implies \mathbf{v}_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$。
4. **写出通解**：
   $\begin{pmatrix} x(t) \\ y(t) \end{pmatrix} = C_1 \begin{pmatrix} 2 \\ 3 \end{pmatrix} e^{4t} + C_2 \begin{pmatrix} 1 \\ -1 \end{pmatrix} e^{-t}$。
5. **利用初值求常数**：
   $t=0$ 时：$\begin{pmatrix} 0 \\ 5 \end{pmatrix} = \begin{pmatrix} 2C_1 + C_2 \\ 3C_1 - C_2 \end{pmatrix}$。
   联立方程：$2C_1 + C_2 = 0$ 且 $3C_1 - C_2 = 5$。
   相加得 $5C_1 = 5 \implies C_1 = 1$，则 $C_2 = -2$。
6. **最终特解**：
   $x(t) = 2e^{4t} - 2e^{-t}$
   $y(t) = 3e^{4t} + 2e^{-t}$

#### 答案
$x(t) = 2e^{4t} - 2e^{-t}, y(t) = 3e^{4t} + 2e^{-t}$
</details>

---

## 五、 练习库强化

### 练习 1：全微分方程判别与求解
求解方程 $(3x^2 + 6xy^2)dx + (6x^2y + 4y^3)dy = 0$。

<details>
<summary>点击查看解析与答案</summary>

**解析**：
$M = 3x^2 + 6xy^2, N = 6x^2y + 4y^3$。
$\frac{\partial M}{\partial y} = 12xy, \frac{\partial N}{\partial x} = 12xy$。
是全微分方程。
积分：$u = \int (3x^2 + 6xy^2) dx = x^3 + 3x^2y^2 + \phi(y)$。
对 $y$ 求导：$\frac{\partial u}{\partial y} = 6x^2y + \phi'(y) = N = 6x^2y + 4y^3$。
所以 $\phi'(y) = 4y^3 \implies \phi(y) = y^4$。
**答案**：$x^3 + 3x^2y^2 + y^4 = C$。
</details>

### 练习 2：高阶常系数方程（重根情形）
求解微分方程 $y^{(4)} - 2y'' + y = 0$。

<details>
<summary>点击查看解析与答案</summary>

**解析**：
特征方程：$r^4 - 2r^2 + 1 = 0 \implies (r^2 - 1)^2 = 0 \implies (r-1)^2(r+1)^2 = 0$。
特征根为 $r_1 = r_2 = 1$（二重根），$r_3 = r_4 = -1$（二重根）。
对应解：$e^x, xe^x, e^{-x}, xe^{-x}$。
**答案**：$y = (C_1 + C_2 x) e^x + (C_3 + C_4 x) e^{-x}$。
</details>

### 练习 3：复数特征值与振荡系统
求解方程组 $\dot{x} = y, \dot{y} = -4x$。

<details>
<summary>点击查看解析与答案</summary>

**解析**：
矩阵 $A = \begin{pmatrix} 0 & 1 \\ -4 & 0 \end{pmatrix}$。特征方程 $\lambda^2 + 4 = 0 \implies \lambda = \pm 2i$。
特征向量（对应 $2i$）：$\begin{pmatrix} -2i & 1 \\ -4 & -2i \end{pmatrix} \begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = 0 \implies v_2 = 2iv_1 \implies \mathbf{v} = \begin{pmatrix} 1 \\ 2i \end{pmatrix}$。
复数解 $\mathbf{w}(t) = \begin{pmatrix} 1 \\ 2i \end{pmatrix} e^{2it} = \begin{pmatrix} 1 \\ 2i \end{pmatrix} (\cos 2t + i \sin 2t) = \begin{pmatrix} \cos 2t + i \sin 2t \\ -2 \sin 2t + 2i \cos 2t \end{pmatrix}$。
实部 $\mathbf{y}_1 = \begin{pmatrix} \cos 2t \\ -2 \sin 2t \end{pmatrix}$，虚部 $\mathbf{y}_2 = \begin{pmatrix} \sin 2t \\ 2 \cos 2t \end{pmatrix}$。
**答案**：$\begin{cases} x(t) = C_1 \cos 2t + C_2 \sin 2t \\ y(t) = -2C_1 \sin 2t + 2C_2 \cos 2t \end{cases}$。
</details>

### 练习 4：欧拉方程（变系数高阶）
求解方程 $x^2 y'' + 3xy' + y = 0$ ($x > 0$)。

<details>
<summary>点击查看解析与答案</summary>

**解析**：
令 $x = e^t$，则 $x \frac{dy}{dx} = D_t y$，$x^2 \frac{d^2y}{dx^2} = D_t(D_t-1)y$。
原方程化为：$D_t(D_t-1)y + 3D_t y + y = 0 \implies (D_t^2 + 2D_t + 1)y = 0$。
特征方程 $(r+1)^2 = 0 \implies r = -1$（二重根）。
解为 $y = (C_1 + C_2 t) e^{-t}$。
回代 $t = \ln x$，$e^{-t} = 1/x$：
**答案**：$y = \frac{C_1 + C_2 \ln x}{x}$。
</details>
