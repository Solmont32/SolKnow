---
title: 微分方程 (Differential Equations)
description: 系统化梳理微分方程理论：从 ODE 的稳定性到 PDE 的特征线法、分离变量法与 Sturm-Liouville 理论。
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

import { Sigma, Infinity, Activity, ShieldCheck, Zap, Layers, GitBranch, Waves, Target } from 'lucide-react';
import { motion } from 'framer-motion';

# 微分方程：从常微分稳定性到偏微分特征理论

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

---

## <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 四、 稳定性理论 (Stability Theory)

### 1. 李雅普诺夫 (Lyapunov) 稳定性定义

考虑动力系统 $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$，平衡点 $\mathbf{x}^* = \mathbf{0}$。

- **稳定 (Stable)：** 微扰后轨道保持在邻域内。
- **渐近稳定 (Asymptotically Stable)：** 微扰后轨道最终收敛至平衡点。

### 2. 李雅普诺夫直接法

若存在正定函数 $V(\mathbf{x})$：

- $\dot{V}(\mathbf{x}) \le 0 \implies$ **稳定**。
- $\dot{V}(\mathbf{x}) < 0 \quad (\mathbf{x} \ne 0) \implies$ **渐近稳定**。

---

## <GitBranch className="inline-block mr-2 mb-1 text-cyan-500" /> 五、 一阶偏微分方程与特征线法

一阶偏微分方程 (PDE) 的通式为 $F(x, y, u, u_x, u_y) = 0$。

### 1. 拟线性方程 (Quasi-linear PDE)

形式：$P(x, y, u)u_x + Q(x, y, u)u_y = R(x, y, u)$。

### 2. 特征线法 (Method of Characteristics)

其核心思想是将 PDE 转化为一组 **常微分方程组 (Characteristic ODEs)**：
$$ \frac{dx}{P} = \frac{dy}{Q} = \frac{du}{R} $$
通过解这组 ODE，可以找到解曲面上的曲线。若已知初始条件 $u(\Gamma) = f(\Gamma)$，则可确定唯一解。

---

## <Waves className="inline-block mr-2 mb-1 text-blue-600" /> 六、 二阶线性偏微分方程

二阶线性 PDE 的一般形式为：
$$ A u*{xx} + 2B u*{xy} + C u\_{yy} + D u_x + E u_y + Fu = G $$

### 1. 分类 (Classification)

根据判别式 $\Delta = B^2 - AC$：

- **$\Delta > 0$：双曲型 (Hyperbolic)**。典型代表：**波动方程** $u_{tt} - a^2 u_{xx} = 0$。
- **$\Delta = 0$：抛物型 (Parabolic)**。典型代表：**热传导方程** $u_t - a^2 u_{xx} = 0$。
- **$\Delta < 0$：椭圆型 (Elliptic)**。典型代表：**拉普拉斯方程** $\Delta u = 0$。

### 2. 标准型与叠加原理

由于线性性质，若 $u_1, u_2$ 是齐次方程的解，则 $c_1 u_1 + c_2 u_2$ 亦为解。

---

## <Target className="inline-block mr-2 mb-1 text-orange-500" /> 七、 分离变量法与 Sturm-Liouville 理论

### 1. 分离变量法 (Separation of Variables)

对于线性齐次边界值问题，设 $u(x, t) = X(x)T(t)$，代入 PDE 将其分解为两个独立的 ODE。
例如对热传导方程 $u_t = k u_{xx}$，分解得：
$$ \frac{T'}{kT} = \frac{X''}{X} = -\lambda $$

### 2. Sturm-Liouville (S-L) 理论

在分离变量法中，空间部分通常归结为 **Sturm-Liouville 边值问题**：
$$ \frac{d}{dx} \left[ p(x) \frac{dy}{dx} \right] + [q(x) + \lambda w(x)]y = 0 $$

- **性质：** 特征值 $\lambda$ 是一组递增的实数列；不同特征值对应的特征函数在加权空间 $L_w^2$ 内**正交**。
- **意义：** 保证了任何“良好”的函数都可以按特征函数系进行广义傅里叶展开。

---

## <Infinity className="inline-block mr-2 mb-1 text-indigo-500" /> 八、 特殊函数初步

特殊函数通常作为特定坐标系下偏微分方程分离变量后的特征函数出现。

### 1. 勒让德多项式 (Legendre Polynomials) $P_n(x)$

源自球坐标系下的拉普拉斯方程。满足：
$$ (1-x^2)y'' - 2xy' + n(n+1)y = 0 $$
其在 $[-1, 1]$ 上正交。

### 2. 贝塞尔函数 (Bessel Functions) $J_n(x)$

源自柱坐标系下的波动或热传导方程。满足：
$$ x^2 y'' + xy' + (x^2 - n^2)y = 0 $$

---

## <Sigma className="inline-block mr-2 mb-1 text-red-500" /> 九、 深度综合练习库

<details>
<summary><b>练习 1：特征线法求解偏微分方程</b></summary>
求解初值问题：$x u_x + y u_y = 2u$，初始条件 $u(x, 1) = x^2$。
<br/>
**解析：**
1. 特征方程：$\frac{dx}{x} = \frac{dy}{y} = \frac{du}{2u}$。
2. 由前两个等式：$\ln x = \ln y + \ln C_1 \implies \frac{x}{y} = C_1$。
3. 由第一个和第三个等式：$\ln u = 2 \ln x + \ln C_2 \implies \frac{u}{x^2} = C_2$。
4. 一般解形式：$\frac{u}{x^2} = \Phi\left(\frac{x}{y}\right) \implies u(x, y) = x^2 \Phi\left(\frac{x}{y}\right)$。
5. 代入初值：$u(x, 1) = x^2 \Phi(x) = x^2 \implies \Phi(x) = 1$。
6. **最终解：** $u(x, y) = x^2$。（注：此解满足原方程 $x(2x) + y(0) = 2x^2$）。
</details>

<details>
<summary><b>练习 2：热传导方程的分离变量法</b></summary>
求解一维杆的热传导方程 $u_t = u_{xx}$，边界条件 $u(0, t) = u(\pi, t) = 0$，初值 $u(x, 0) = \sin(2x)$。
<br/>
**解析：**
1. 设 $u = X(x)T(t)$，代入得 $X T' = X'' T \implies \frac{T'}{T} = \frac{X''}{X} = -\lambda$。
2. 空间方程 $X'' + \lambda X = 0, X(0)=X(\pi)=0$。这是一个 S-L 问题。
3. 解得 $\lambda_n = n^2, X_n(x) = \sin(nx), n=1, 2, \dots$。
4. 时间方程 $T' = -n^2 T \implies T_n(t) = e^{-n^2 t}$。
5. 叠加解：$u(x, t) = \sum_{n=1}^\infty A_n \sin(nx) e^{-n^2 t}$。
6. 初值条件：$u(x, 0) = \sum A_n \sin(nx) = \sin(2x)$。
7. 对比系数：$A_2 = 1$，其余 $A_n = 0$。
8. **最终解：** $u(x, t) = \sin(2x) e^{-4t}$。
</details>

<details>
<summary><b>练习 3：稳定性判定 (李雅普诺夫法)</b></summary>
分析系统 $\dot{x} = -x^3, \dot{y} = -y^3$ 在原点的稳定性。
<br/>
**解析：**
1. 构造正定函数 $V(x, y) = \frac{1}{2}(x^2 + y^2)$。
2. 计算其随时间的导数：$\dot{V} = x \dot{x} + y \dot{y} = x(-x^3) + y(-y^3) = -(x^4 + y^4)$。
3. 观察 $\dot{V}$ 的性质：对于除原点外的所有点，$\dot{V} < 0$，即 $\dot{V}$ 是负定的。
4. 根据李雅普诺夫第二法，原点是**全局渐近稳定**的。
</details>

<details>
<summary><b>练习 4：S-L 理论与正交性</b></summary>
证明 Sturm-Liouville 算子 $\mathcal{L} = \frac{d}{dx}[p(x)\frac{d}{dx}] + q(x)$ 是自伴的（在齐次边界条件下）。
<br/>
**证明：**
1. 我们需要证明 $\langle \mathcal{L}u, v \rangle = \langle u, \mathcal{L}v \rangle$。
2. $\int_a^b v \frac{d}{dx}(p u') dx = [v p u']_a^b - \int_a^b p u' v' dx$ (分部积分)。
3. 再次分部积分：$= [v p u' - u p v']_a^b + \int_a^b u \frac{d}{dx}(p v') dx$。
4. 若边界条件使得 $[p(v u' - u v')]_a^b = 0$（如 Dirichlet 或 Neumann 条件），则：
   $\langle \mathcal{L}u, v \rangle = \int_a^b u \mathcal{L}v dx = \langle u, \mathcal{L}v \rangle$。
5. 结论：S-L 算子是自伴的，从而保证了其特征值的实数性与特征函数的正交性。
</details>

<details>
<summary><b>练习 5：勒让德方程的解</b></summary>
已知 $P_0(x) = 1, P_1(x) = x$。利用递推公式 $(n+1)P_{n+1}(x) = (2n+1)xP_n(x) - nP_{n-1}(x)$ 求 $P_2(x)$。
<br/>
**解析：**
1. 取 $n=1$：$2P_2(x) = 3xP_1(x) - 1P_0(x)$。
2. 代入 $P_1, P_0$：$2P_2(x) = 3x(x) - 1 = 3x^2 - 1$。
3. **结果：** $P_2(x) = \frac{1}{2}(3x^2 - 1)$。
</details>
