---
title: 常微分方程 (Ordinary Differential Equations)
description: 系统化梳理 ODE 理论：从初等积分法到高阶线性方程组，涵盖 Picard 存在唯一性定理与稳定性理论。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Sigma, Infinity, Activity, ShieldCheck, Zap, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

# 常微分方程：初等积分法、线性理论与稳定性

如果代数方程是寻找一个**未知的数**，那么微分方程就是在寻找一个**未知的函数**。它是分析学中连接理论与现实世界的桥梁，描述了自然界中几乎所有的动态变化规律。

---

## <Activity className="inline-block mr-2 mb-1 text-blue-500" /> 一、 存在性与唯一性理论

在求解微分方程之前，首要问题是：解是否存在？是否唯一？

### 1. Picard 存在唯一性定理
对于初值问题 (IVP): $\frac{dy}{dx} = f(x, y), y(x_0) = y_0$。

<KnowledgeCard type="info" title="Picard-Lindelöf 定理">
若 $f(x, y)$ 在矩形区域 $R: |x-x_0| \le a, |y-y_0| \le b$ 内连续，且关于 $y$ 满足 **Lipschitz 条件**：
$$|f(x, y_1) - f(x, y_2)| \le L |y_1 - y_2|$$
则在区间 $I = [x_0-h, x_0+h]$ 上，初值问题存在唯一的连续解，其中 $h = \min(a, b/M)$，$M = \max |f(x,y)|$。
</KnowledgeCard>

### 2. Gronwall 不等式 (估计的利器)
若 $u(t) \le c + \int_a^t \beta(s)u(s)ds$，其中 $c \ge 0, \beta(s) \ge 0$，则：
$$u(t) \le c \exp\left(\int_a^t \beta(s)ds\right)$$
这是证明解的唯一性、对初值的连续依赖性以及稳定性分析的核心工具。

---

## <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 二、 一阶方程的初等积分法

### 1. 变量分离方程
形式：$\frac{dy}{dx} = f(x)g(y)$。
解法：$\int \frac{1}{g(y)} dy = \int f(x) dx + C$。

### 2. 一阶线性方程
形式：$\frac{dy}{dx} + P(x)y = Q(x)$。
**通解公式（常数变易法结果）：**
$$y(x) = e^{-\int P(x)dx} \left[ \int Q(x) e^{\int P(x)dx} dx + C \right]$$

### 3. 伯努利 (Bernoulli) 方程
形式：$\frac{dy}{dx} + P(x)y = Q(x)y^n \quad (n \neq 0, 1)$。
变换：令 $z = y^{1-n}$，化为关于 $z$ 的线性方程：$\frac{dz}{dx} + (1-n)P(x)z = (1-n)Q(x)$。

### 4. 全微分方程与积分因子
形式：$M(x,y)dx + N(x,y)dy = 0$。
- **全微分判别：** $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$。
- **积分因子：** 若不满足全微分条件，寻找 $\mu(x,y)$ 使得 $\frac{\partial (\mu M)}{\partial y} = \frac{\partial (\mu N)}{\partial x}$。
  - 若 $\frac{\frac{\partial M}{\partial y} - \frac{\partial N}{\partial x}}{N} = f(x)$，则 $\mu = e^{\int f(x)dx}$。

<details>
<summary><b>例题 2.1：全微分方程求解</b></summary>
求解 $(3x^2 + 6xy^2)dx + (6x^2y + 4y^3)dy = 0$。
<br/>
**解析：**
1. 检查全微分条件：$M_y = 12xy, N_x = 12xy$。相等，是全微分方程。
2. 构造原函数 $u(x,y)$：
   $u = \int (3x^2 + 6xy^2) dx = x^3 + 3x^2y^2 + \phi(y)$
3. 求导匹配 $N$：
   $\frac{\partial u}{\partial y} = 6x^2y + \phi'(y) = 6x^2y + 4y^3 \implies \phi'(y) = 4y^3 \implies \phi(y) = y^4$
4. 通解：$x^3 + 3x^2y^2 + y^4 = C$。
</details>

---

## <Layers className="inline-block mr-2 mb-1 text-purple-500" /> 三、 高阶线性微分方程

### 1. 线性相关性与 Wronski 行列式
对于 $n$ 阶齐次线性方程 $y^{(n)} + a_{n-1}(x)y^{(n-1)} + \dots + a_0(x)y = 0$：
- 若 $n$ 个解 $\{y_1, \dots, y_n\}$ 的 **Wronski 行列式** $W(x) \neq 0$，则它们构成**基础解系**。
- **Liouville 公式：** $W(x) = W(x_0) \exp\left( -\int_{x_0}^x a_{n-1}(t) dt \right)$。

### 2. 常系数线性齐次方程
特征方程：$P(\lambda) = \lambda^n + a_{n-1}\lambda^{n-1} + \dots + a_0 = 0$。
- **单根 $\lambda$：** 对应解 $e^{\lambda x}$。
- **$k$ 重根 $\lambda$：** 对应解 $\{e^{\lambda x}, x e^{\lambda x}, \dots, x^{k-1} e^{\lambda x}\}$。
- **共轭复根 $\alpha \pm i\beta$：** 对应解 $\{e^{\alpha x}\cos\beta x, e^{\alpha x}\sin\beta x\}$。

### 3. 非齐次方程：参数变易法
若已知齐次方程基础解系 $\{y_1, y_2\}$，对于 $y'' + P(x)y' + Q(x)y = f(x)$：
设特解 $y^* = c_1(x)y_1 + c_2(x)y_2$，通过解方程组：
$$ \begin{cases} c_1' y_1 + c_2' y_2 = 0 \\ c_1' y_1' + c_2' y_2' = f(x) \end{cases} $$
得到 $c_1, c_2$ 的表达式。

<details>
<summary><b>例题 3.1：常系数非齐次方程</b></summary>
求解 $y'' - 3y' + 2y = e^{3x}$。
<br/>
**解析：**
1. 齐次方程 $y'' - 3y' + 2y = 0$ 的特征方程为 $\lambda^2 - 3\lambda + 2 = 0 \implies \lambda_1=1, \lambda_2=2$。
   齐次通解为 $Y = C_1 e^x + C_2 e^{2x}$。
2. 设非齐次特解 $y^* = A e^{3x}$。代入原方程：
   $9A e^{3x} - 9A e^{3x} + 2A e^{3x} = e^{3x} \implies 2A = 1 \implies A = 1/2$。
3. 全通解：$y = C_1 e^x + C_2 e^{2x} + \frac{1}{2} e^{3x}$。
</details>

---

## <Sigma className="inline-block mr-2 mb-1 text-red-500" /> 四、 线性微分方程组

### 1. 矩阵形式
$\mathbf{y}' = A(t)\mathbf{y} + \mathbf{f}(t)$
- **基本矩阵 $\Phi(t)$：** 由 $n$ 个线性无关解向量组成，满足 $\Phi'(t) = A(t)\Phi(t)$。
- **初值问题解：** $\mathbf{y}(t) = \Phi(t)\Phi^{-1}(t_0)\mathbf{y}_0 + \Phi(t)\int_{t_0}^t \Phi^{-1}(s)\mathbf{f}(s)ds$。

### 2. 常系数矩阵指数 $e^{At}$
对于常矩阵 $A$，其基本矩阵可取为 $e^{At} = \sum_{k=0}^\infty \frac{A^k t^k}{k!}$。
- 若 $A$ 可对角化 $A = PDP^{-1}$，则 $e^{At} = P e^{Dt} P^{-1}$。
- 若 $A$ 有 Jordan 块 $J = \lambda I + N$，则 $e^{Jt} = e^{\lambda t} e^{Nt}$（$N$ 是幂零阵，级数有限）。

---

## <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 五、 稳定性理论 (Stability Theory)

### 1. 李雅普诺夫 (Lyapunov) 稳定性定义
考虑 $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$，且 $\mathbf{f}(\mathbf{0}) = \mathbf{0}$（平衡点在原点）。
- **稳定：** 对 $\forall \epsilon > 0$，$\exists \delta > 0$，若 $|\mathbf{x}(0)| < \delta$，则 $\forall t > 0, |\mathbf{x}(t)| < \epsilon$。
- **渐近稳定：** 稳定且 $\lim_{t \to \infty} \mathbf{x}(t) = \mathbf{0}$。

### 2. 李雅普诺夫第二法 (直接法)
寻找标量函数 $V(\mathbf{x})$（能量函数）：
- 若 $V(\mathbf{x})$ 正定，且 $\dot{V}(\mathbf{x}) = \nabla V \cdot \mathbf{f}(\mathbf{x}) \le 0$，则原点**稳定**。
- 若 $V(\mathbf{x})$ 正定，且 $\dot{V}(\mathbf{x})$ 负定，则原点**渐近稳定**。

### 3. 一次近似判别法
对非线性系统在平衡点线性化 $\dot{\mathbf{x}} = J \mathbf{x}$，其中 $J = \frac{\partial \mathbf{f}}{\partial \mathbf{x}} \big|_{\mathbf{0}}$：
- 若 $J$ 的所有特征值 $\text{Re}(\lambda) < 0$，则原系统**渐近稳定**。
- 若存在 $\text{Re}(\lambda) > 0$，则原系统**不稳定**。

---

## <Infinity className="inline-block mr-2 mb-1 text-indigo-500" /> 六、 综合练习库

1. **[一阶]** 求解方程 $x y' + y = y^2 \ln x$。
2. **[高阶]** 求解 $y''' - y' = x$。
3. **[方程组]** 求矩阵 $A = \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ 的指数矩阵 $e^{At}$，并说明其几何意义。
4. **[稳定性]** 讨论系统 $\begin{cases} \dot{x} = -x + y + x^2 \\ \dot{y} = -x - y + y^2 \end{cases}$ 在原点的稳定性。

<details>
<summary><b>点击查看练习参考解答</b></summary>

**1. 伯努利方程：**
除以 $y^2$ 得 $x y^{-2} y' + y^{-1} = \ln x$。令 $z = y^{-1}$，则 $z' = -y^{-2} y'$。
$-x z' + z = \ln x \implies z' - \frac{1}{x}z = -\frac{\ln x}{x}$。
利用线性方程公式：$z = e^{\int \frac{1}{x}dx} [ \int -\frac{\ln x}{x} e^{-\int \frac{1}{x}dx} dx + C ] = x [ \int -\frac{\ln x}{x^2} dx + C ]$。
积分 $\int \frac{\ln x}{x^2} dx = -\frac{\ln x}{x} - \frac{1}{x}$。
故 $z = x [ \frac{\ln x + 1}{x} + C ] = \ln x + 1 + Cx \implies y = \frac{1}{\ln x + 1 + Cx}$。

**2. 高阶常系数：**
特征方程 $\lambda^3 - \lambda = 0 \implies \lambda(\lambda-1)(\lambda+1)=0 \implies \lambda = 0, \pm 1$。
齐次通解 $Y = C_1 + C_2 e^x + C_3 e^{-x}$。
设特解 $y^* = x(Ax + B) = Ax^2 + Bx$（因为 $\lambda=0$ 是单根）。
代入：$0 - (2Ax + B) = x \implies -2A = 1, -B = 0 \implies A = -1/2, B = 0$。
通解 $y = C_1 + C_2 e^x + C_3 e^{-x} - \frac{1}{2}x^2$。

**3. 指数矩阵：**
$A^2 = \begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix} = -I$，$A^3 = -A$，$A^4 = I$。
$e^{At} = I + At + \frac{A^2 t^2}{2!} + \dots = I(1 - \frac{t^2}{2!} + \dots) + A(t - \frac{t^3}{3!} + \dots)$
$e^{At} = I \cos t + A \sin t = \begin{pmatrix} \cos t & \sin t \\ -\sin t & \cos t \end{pmatrix}$。
**几何意义：** 代表二维平面上的**旋转变换**（顺时针旋转 $t$ 弧度）。

**4. 线性化判定：**
计算 Jacobian $J = \begin{pmatrix} -1+2x & 1 \\ -1 & -1+2y \end{pmatrix}$。
在原点 $(0,0)$ 处，$J = \begin{pmatrix} -1 & 1 \\ -1 & -1 \end{pmatrix}$。
特征方程 $(\lambda+1)^2 + 1 = 0 \implies \lambda = -1 \pm i$。
实部均为 $-1 < 0$，故原点是**渐近稳定**的。

</details>

