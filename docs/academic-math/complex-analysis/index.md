---
title: 复变函数：解析函数与留数定理 (Complex Analysis)
description: 系统梳理复分析核心理论，涵盖 Cauchy-Riemann 方程、柯西积分公式、留数定理及其积分应用
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 复变函数：解析函数与留数定理

> 复变函数论不仅是数学分析在复数域的自然延伸，更展现了实分析中不具备的奇妙对称性与刚性。通过留数定理，我们可以将繁琐的实积分计算化为优雅的代数求和。

---

## 一、复数与复变函数基础

### 1. 定义
设 $D$ 是复平面 $\mathbb{C}$ 上的一个区域。若对 $D$ 内每一个复数 $z = x + iy$，都有唯一的复数 $w = u + iv$ 与之对应，则称 $w = f(z)$ 是定义在 $D$ 上的**复变函数**。
通常写作：
$$ f(z) = u(x,y) + i v(x,y) $$
其中 $u, v$ 是两个实变数 $x, y$ 的实值函数。

### 2. 导数与解析性
若极限
$$ f'(z_0) = \lim_{\Delta z \to 0} \frac{f(z_0 + \Delta z) - f(z_0)}{\Delta z} $$
存在且唯一，则称 $f(z)$ 在 $z_0$ 点**可导**。
若 $f(z)$ 在 $z_0$ 及其某个邻域内处处可导，则称 $f(z)$ 在 $z_0$ **解析**（或称**全纯 Holomorphic**）。

---

## 二、Cauchy-Riemann (C-R) 方程

这是判定复可导性的核心判据。

<KnowledgeCard type="warning" title="C-R 方程的必要性">
若 $f(z) = u + iv$ 在 $z = x+iy$ 处可导，则 $u, v$ 在该点偏导数存在且满足：
$$ 
\begin{cases}
\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y} \\
\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}
\end{cases}
$$
</KnowledgeCard>

### 定理证明 (必要性)
考虑 $\Delta z$ 分别沿实轴和虚轴趋于 0：
1. 沿实轴 ($\Delta z = \Delta x$)：
   $$ f'(z) = \lim_{\Delta x \to 0} \frac{(u+\Delta u + i(v+\Delta v)) - (u+iv)}{\Delta x} = \frac{\partial u}{\partial x} + i \frac{\partial v}{\partial x} $$
2. 沿虚轴 ($\Delta z = i\Delta y$)：
   $$ f'(z) = \lim_{\Delta y \to 0} \frac{(u+\Delta u + i(v+\Delta v)) - (u+iv)}{i\Delta y} = \frac{1}{i} \frac{\partial u}{\partial y} + \frac{\partial v}{\partial y} = \frac{\partial v}{\partial y} - i \frac{\partial u}{\partial y} $$
令实部与虚部相等，即得 C-R 方程。

---

## 三、柯西积分公式 (Cauchy Integral Formula)

解析函数在区域边界上的值决定了其内部的所有值，这是复分析“刚性”的集中体现。

### 1. 柯西积分定理
若 $f(z)$ 在单连通区域 $D$ 内解析，且 $C$ 是 $D$ 内任一简单闭曲线，则：
$$ \oint_C f(z) \, dz = 0 $$

### 2. 柯西积分公式
设 $f(z)$ 在区域 $D$ 内解析，$C$ 为 $D$ 内包围 $z_0$ 的正向简单闭曲线，则：
$$ f(z_0) = \frac{1}{2\pi i} \oint_C \frac{f(z)}{z - z_0} \, dz $$

进一步地，解析函数具有任意阶导数：
$$ f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_C \frac{f(z)}{(z - z_0)^{n+1}} \, dz $$

<KnowledgeCard type="success" title="无穷可微性">
与实函数不同，复平面上只要一阶可导（解析），则必然无穷阶可导。
</KnowledgeCard>

---

## 四、留数定理 (Residue Theorem)

留数定理是复积分计算的终极武器，它将路径积分转化为孤立奇点处的代数运算。

### 1. 留数的定义
设 $z_0$ 是 $f(z)$ 的孤立奇点，$C$ 为包围 $z_0$ 且不含其他奇点的正向小圆周，则留数定义为：
$$ \text{Res}(f, z_0) = \frac{1}{2\pi i} \oint_C f(z) \, dz $$
在 Laurent 展开式中，留数即为 $c_{-1}$ 项的系数。

### 2. 留数计算公式（$m$ 阶极点）
若 $z_0$ 是 $f(z)$ 的 $m$ 阶极点，则：
$$ \text{Res}(f, z_0) = \frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}} \left[ (z - z_0)^m f(z) \right] $$

### 3. 留数定理
设 $f(z)$ 在闭曲线 $C$ 围成的区域 $D$ 内除有限个孤立奇点 $z_k$ 外解析，在边界 $C$ 上连续，则：
$$ \oint_C f(z) \, dz = 2\pi i \sum_{k=1}^n \text{Res}(f, z_k) $$

---

## 五、教材级例题（6 题）

### 例 1：验证 C-R 方程
判定 $f(z) = \bar{z} = x - iy$ 是否在复平面内可导。

<details>
<summary>点击查看解析</summary>

这里 $u = x, v = -y$。
计算偏导数：
$$ \frac{\partial u}{\partial x} = 1, \quad \frac{\partial v}{\partial y} = -1 $$
显然 $1 \neq -1$，不满足 C-R 方程。
故 $f(z) = \bar{z}$ 在复平面上处处不可导。

</details>

### 例 2：计算简单闭曲线积分
计算 $\oint_{|z|=2} \frac{e^z}{z-1} \, dz$。

<details>
<summary>点击查看解析</summary>

函数 $f(z) = e^z$ 在圆内解析，$z_0 = 1$ 在圆内。
应用柯西积分公式：
$$ \oint_{|z|=2} \frac{e^z}{z-1} \, dz = 2\pi i \cdot e^1 = 2\pi e i $$

</details>

### 例 3：高阶导数应用
计算 $\oint_{|z|=1} \frac{\sin z}{z^3} \, dz$。

<details>
<summary>点击查看解析</summary>

这里 $f(z) = \sin z$，$z_0 = 0$ 是 3 阶极点（或应用 $n=2$ 阶导数公式）。
$$ f''(z) = -\sin z \implies f''(0) = 0 $$
根据导数公式：
$$ \oint \frac{\sin z}{z^3} \, dz = \frac{2\pi i}{2!} f''(0) = 0 $$

</details>

### 例 4：留数计算
求 $f(z) = \frac{1}{z^2+1}$ 在 $z = i$ 处的留数。

<details>
<summary>点击查看解析</summary>

$z = i$ 是 $f(z)$ 的一阶极点。
$$ \text{Res}(f, i) = \lim_{z \to i} (z-i) \frac{1}{(z-i)(z+i)} = \lim_{z \to i} \frac{1}{z+i} = \frac{1}{2i} = -\frac{i}{2} $$

</details>

### 例 5：利用留数定理计算实积分
计算 $I = \int_{-\infty}^{\infty} \frac{1}{x^2+1} \, dx$。

<details>
<summary>点击查看解析</summary>

考虑上半平面闭路积分 $\oint_C \frac{1}{z^2+1} \, dz$，奇点 $z = i$ 在路径内。
由留数定理：
$$ \oint_C = 2\pi i \cdot \text{Res}(f, i) = 2\pi i \cdot \frac{1}{2i} = \pi $$
当半径 $R \to \infty$ 时，大圆弧积分趋于 0。
故 $\int_{-\infty}^{\infty} \frac{1}{x^2+1} \, dx = \pi$。

</details>

### 例 6：判定极点阶数
确定 $f(z) = \frac{1}{\cos z - 1}$ 在 $z = 0$ 处的奇点类型及阶数。

<details>
<summary>点击查看解析</summary>

使用 Taylor 展开：
$$ \cos z - 1 = (1 - \frac{z^2}{2!} + \frac{z^4}{4!} - \dots) - 1 = -\frac{z^2}{2} + \frac{z^4}{24} - \dots $$
故 $\cos z - 1 = z^2 (-\frac{1}{2} + \frac{z^2}{24} - \dots)$。
分母有 $z^2$ 因子，故 $z = 0$ 是 $f(z)$ 的 **2 阶极点**。

</details>

---

## 六、分层练习（答案折叠）

### 练习 1（基础）
求 $f(z) = z^2$ 的实部 $u$ 和虚部 $v$，并验证其满足 C-R 方程。

<details>
<summary>点击查看过程与答案</summary>

$z^2 = (x+iy)^2 = x^2 - y^2 + i(2xy)$。
$u = x^2 - y^2, v = 2xy$。
偏导数：
$u_x = 2x, v_y = 2x \implies u_x = v_y$。
$u_y = -2y, v_x = 2y \implies u_y = -v_x$。
满足 C-R 方程，故 $z^2$ 在全平面解析。

</details>

### 练习 2（基础）
计算 $\oint_{|z|=1} \frac{\cos z}{z} \, dz$。

<details>
<summary>点击查看过程与答案</summary>

应用柯西积分公式：
$f(z) = \cos z, z_0 = 0$。
结果为 $2\pi i \cdot \cos(0) = 2\pi i$。

</details>

### 练习 3（提高）
计算 $\int_{0}^{2\pi} \frac{1}{2+\cos \theta} \, d\theta$。

<details>
<summary>点击查看过程与答案</summary>

令 $z = e^{i\theta}, dz = iz \, d\theta, \cos \theta = \frac{1}{2}(z + z^{-1})$。
积分变为单位圆周积分：
$$ \oint_{|z|=1} \frac{1}{2 + \frac{1}{2}(z+z^{-1})} \frac{dz}{iz} = \frac{2}{i} \oint_{|z|=1} \frac{1}{z^2+4z+1} \, dz $$
奇点 $z = -2 \pm \sqrt{3}$。仅 $z = -2 + \sqrt{3}$ 在圆内。
计算该点留数并应用留数定理，最终答案为 $\frac{2\pi}{\sqrt{3}}$。

</details>

### 练习 4（提高）
证明：若 $f(z)$ 在区域 $D$ 内解析且 $|f(z)|$ 为常数，则 $f(z)$ 必为常数。

<details>
<summary>点击查看过程与答案</summary>

设 $f = u+iv$，则 $u^2+v^2 = C$。
对 $x$ 和 $y$ 求偏导：
$2uu_x + 2vv_x = 0$
$2uu_y + 2vv_y = 0$
利用 C-R 方程替换 $u_y, v_y$：
$uu_x - vv_y = 0$
$uv_x + vu_x = 0$
这是一个关于 $u_x, v_x$ 的线性方程组，其行列式为 $u^2+v^2 = C$。
若 $C \neq 0$，则 $u_x = v_x = 0$，同理可得所有偏导为 0。
故 $u, v$ 为常数，$f$ 为常数。若 $C=0$ 显然成立。

</details>

### 练习 5（挑战）
计算 $\int_{0}^{\infty} \frac{\sin x}{x} \, dx$（狄利克雷积分）。

<details>
<summary>点击查看过程与答案</summary>

考虑 $f(z) = \frac{e^{iz}}{z}$ 在上半平面大半圆路径积分，并在原点处避开奇点（小半圆）。
由柯西积分定理，总积分为 0。
1. 实轴部分趋于 $2i \int_0^\infty \frac{\sin x}{x} dx$。
2. 小半圆部分趋于 $-\pi i \text{Res}(f, 0) = -\pi i$。
3. 大圆弧趋于 0 (Jordan 引理)。
故 $2i I - \pi i = 0 \implies I = \frac{\pi}{2}$。

</details>

### 练习 6（挑战）
利用留数定理证明代数基本定理：任何 $n$ 次复多项式在 $\mathbb{C}$ 中至少有一个根。

<details>
<summary>点击查看过程与答案</summary>

通常使用 Rouché 定理（由留数定理导出）：
设 $P(z) = a_n z^n + \dots + a_0$。取 $f(z) = a_n z^n, g(z) = P(z) - f(z)$。
在足够大的圆周 $|z|=R$ 上，可以证明 $|f(z)| > |g(z)|$。
根据 Rouché 定理，$f(z)$ 与 $f(z)+g(z) = P(z)$ 在圆内有相同数量的零点。
由于 $a_n z^n$ 有 $n$ 个零点（都在原点），故 $P(z)$ 也有 $n$ 个零点。

</details>

---

## 七、章节衔接

- 前置章节：[数学分析：幂级数](../analysis/power-series) 与 [复数基础](../../senior-high/calculus-intro)
- 配套练习：[复变函数专题练习（A 组）](/docs/exercises/math/analysis#complex-a1)

掌握本章后，可以深入学习广义函数、拉普拉斯变换以及偏微分方程的复变方法。

---

## 八. 辅助资源

- [可视化：复变函数映射 (外部链接)](#)
- [交互式：孤立奇点与 Laurent 展开可视化](../../../src/components/ComplexVisualizer)

---

## 九、配套练习跳转

- [进入复变函数专题练习总页](/docs/exercises/math/analysis)
- [返回大学数学学习路径首页](/docs/academic-math/analysis)
