---
title: 多元微积分与矢量分析专题练习库 (Ch 16-23)
---

# 多元微积分与矢量分析专题练习库 (Ch 16-23)

本库涵盖《数学分析》第五版（华东师大版）第十六章至第二十三章的核心内容：多元函数极限与连续、微分学、隐函数定理、含参量积分、重积分、曲线与曲面积分以及向量代数与场论。

---

## 第十六章：多元函数的极限与连续 (Multivariable Limits)
[**理论回顾：第十六章 多元函数极限与连续**](../../academic-math/analysis/multivariable-limits)

### 练习 16.1：二重极限不存在的证明
证明 $\lim_{(x, y) \to (0, 0)} \frac{xy}{x^2+y^2}$ 不存在。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
使用路径法：
1. 沿直线 $y = kx$ 趋于 $(0, 0)$：
   $\lim_{x \to 0} \frac{x(kx)}{x^2+(kx)^2} = \lim_{x \to 0} \frac{kx^2}{x^2(1+k^2)} = \frac{k}{1+k^2}$。
2. 极限值依赖于斜率 $k$。例如 $k=0$ 时极限为 0，$k=1$ 时极限为 $1/2$。
由于沿不同路径趋于原点时极限不唯一，故二重极限不存在。

#### 答案
证毕。
</details>

---

## 第十七章：多元函数微分学 (Multivariable Differentiation)

### 练习 17.1：全微分的判定
讨论函数 $f(x, y) = \sqrt{|xy|}$ 在 $(0, 0)$ 处的可微性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **偏导数**：
   $f_x(0, 0) = \lim_{\Delta x \to 0} \frac{f(\Delta x, 0) - f(0, 0)}{\Delta x} = \lim \frac{0-0}{\Delta x} = 0$。
   同理 $f_y(0, 0) = 0$。
2. **可微性判定**：
   考察 $\Delta f - [f_x(0,0)\Delta x + f_y(0,0)\Delta y] = \sqrt{|\Delta x \Delta y|} - 0$。
   需判断 $\lim_{(\Delta x, \Delta y) \to (0, 0)} \frac{\sqrt{|\Delta x \Delta y|}}{\sqrt{\Delta x^2 + \Delta y^2}}$ 是否为 0。
   沿 $y = x$ 趋于 0：$\frac{|x|}{\sqrt{2x^2}} = \frac{1}{\sqrt{2}} \neq 0$。
   故函数在 $(0, 0)$ 处不可微。

#### 答案
在 $(0, 0)$ 处偏导数存在但不可微。
</details>

### 练习 17.2：空间曲线的曲率与挠率
求螺旋线 $\mathbf{r}(t) = (a \cos t, a \sin t, bt)$ ($a, b > 0$) 的曲率 $\kappa$ 与挠率 $\tau$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **一阶导与二阶导**：
   $\mathbf{r}'(t) = (-a \sin t, a \cos t, b)$，其模 $|\mathbf{r}'| = \sqrt{a^2+b^2}$。
   $\mathbf{r}''(t) = (-a \cos t, -a \sin t, 0)$。
   $\mathbf{r}'''(t) = (a \sin t, -a \cos t, 0)$。
2. **曲率 $\kappa$**：
   $\mathbf{r}' \times \mathbf{r}'' = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -a \sin t & a \cos t & b \\ -a \cos t & -a \sin t & 0 \end{vmatrix} = (ab \sin t, -ab \cos t, a^2)$。
   $|\mathbf{r}' \times \mathbf{r}''| = \sqrt{a^2b^2 + a^4} = a\sqrt{a^2+b^2}$。
   $\kappa = \frac{|\mathbf{r}' \times \mathbf{r}''|}{|\mathbf{r}'|^3} = \frac{a\sqrt{a^2+b^2}}{(a^2+b^2)^{3/2}} = \frac{a}{a^2+b^2}$。
3. **挠率 $\tau$**：
   混合积 $(\mathbf{r}', \mathbf{r}'', \mathbf{r}''') = (\mathbf{r}' \times \mathbf{r}'') \cdot \mathbf{r}''' = (ab \sin t, -ab \cos t, a^2) \cdot (a \sin t, -a \cos t, 0) = a^2b \sin^2 t + a^2b \cos^2 t = a^2b$。
   $\tau = \frac{(\mathbf{r}', \mathbf{r}'', \mathbf{r}''')}{|\mathbf{r}' \times \mathbf{r}''|^2} = \frac{a^2b}{a^2(a^2+b^2)} = \frac{b}{a^2+b^2}$。

#### 答案
$\kappa = \frac{a}{a^2+b^2}$，$\tau = \frac{b}{a^2+b^2}$。
</details>

---

## 第十八章：隐函数定理及其应用 (Implicit Function Theorem)

### 练习 18.1：隐函数组求导
由方程组 $\begin{cases} u + v = x + y \\ \frac{\sin u}{\sin v} = \frac{x}{y} \end{cases}$ 确定隐函数 $u(x, y), v(x, y)$。求 $\frac{\partial u}{\partial x}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
对方程组两边关于 $x$ 求偏导（视 $y$ 为常数）：
1. $\frac{\partial u}{\partial x} + \frac{\partial v}{\partial x} = 1$
2. $\frac{\cos u \frac{\partial u}{\partial x} \sin v - \sin u \cos v \frac{\partial v}{\partial x}}{\sin^2 v} = \frac{1}{y}$
由 (1) 知 $\frac{\partial v}{\partial x} = 1 - \frac{\partial u}{\partial x}$。代入 (2)：
$\frac{\cos u \sin v \frac{\partial u}{\partial x} - \sin u \cos v (1 - \frac{\partial u}{\partial x})}{\sin^2 v} = \frac{1}{y}$
$(\cos u \sin v + \sin u \cos v) \frac{\partial u}{\partial x} = \frac{\sin^2 v}{y} + \sin u \cos v$
$\sin(u+v) \frac{\partial u}{\partial x} = \frac{\sin^2 v}{y} + \sin u \cos v$
故 $\frac{\partial u}{\partial x} = \frac{\sin^2 v + y \sin u \cos v}{y \sin(x+y)}$。

#### 答案
$\frac{\partial u}{\partial x} = \frac{\sin^2 v + y \sin u \cos v}{y \sin(x+y)}$
</details>

### 练习 18.2：带约束的极值 (Lagrange Multipliers)
在椭圆 $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ 上求一点，使其到直线 $Ax+By+C=0$ 的距离最短。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
点到直线的距离公式为 $d = \frac{|Ax+By+C|}{\sqrt{A^2+B^2}}$。
最小化 $d$ 等价于最小化 $f(x, y) = Ax+By+C$（或其绝对值）。
构造 Lagrange 函数：$L(x, y, \lambda) = Ax+By+C + \lambda(\frac{x^2}{a^2} + \frac{y^2}{b^2} - 1)$。
求偏导：
1. $L_x = A + \frac{2\lambda x}{a^2} = 0 \implies x = -\frac{Aa^2}{2\lambda}$
2. $L_y = B + \frac{2\lambda y}{b^2} = 0 \implies y = -\frac{Bb^2}{2\lambda}$
代入约束条件：
$\frac{1}{a^2} (-\frac{Aa^2}{2\lambda})^2 + \frac{1}{b^2} (-\frac{Bb^2}{2\lambda})^2 = 1 \implies \frac{A^2a^2 + B^2b^2}{4\lambda^2} = 1$
$\lambda = \pm \frac{1}{2} \sqrt{A^2a^2 + B^2b^2}$。
代回 $x, y$ 得两个驻点。通过几何意义判定哪个是最小值点。

#### 答案
点坐标为 $(\mp \frac{Aa^2}{\sqrt{A^2a^2+B^2b^2}}, \mp \frac{Bb^2}{\sqrt{A^2a^2+B^2b^2}})$。
</details>

---

## 第十九章：含参量积分 (Integrals with Parameters)

### 练习 19.1：Leibniz 积分法则的应用
计算 $I(\alpha) = \int_0^\infty \frac{e^{-\alpha x} \sin x}{x} dx$ ($\alpha > 0$)，并求 $\int_0^\infty \frac{\sin x}{x} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **求导**：
   $I'(\alpha) = \int_0^\infty \frac{\partial}{\partial \alpha} (\frac{e^{-\alpha x} \sin x}{x}) dx = - \int_0^\infty e^{-\alpha x} \sin x dx$。
   利用分部积分两次可得：$I'(\alpha) = - \frac{1}{\alpha^2 + 1}$。
2. **积分**：
   $I(\alpha) = - \arctan \alpha + C$。
   由于 $\alpha \to \infty$ 时，$|I(\alpha)| \le \int_0^\infty e^{-\alpha x} dx = \frac{1}{\alpha} \to 0$。
   故 $0 = - \frac{\pi}{2} + C \implies C = \frac{\pi}{2}$。
   $I(\alpha) = \frac{\pi}{2} - \arctan \alpha$。
3. **极限情形**：
   由 Dirichlet 积分的一致收敛性（Abel 判别法），
   $\int_0^\infty \frac{\sin x}{x} dx = \lim_{\alpha \to 0^+} I(\alpha) = \frac{\pi}{2}$。

#### 答案
$I(\alpha) = \frac{\pi}{2} - \arctan \alpha$；Dirichlet 积分值为 $\pi/2$。
</details>

---

## 第二十章：重积分 (Multiple Integrals)

### 练习 20.1：极坐标下的二重积分
计算 $\iint_D e^{x^2+y^2} dx dy$，其中 $D$ 是圆域 $x^2+y^2 \le R^2$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
转极坐标：
$I = \int_0^{2\pi} d\theta \int_0 R e^{r^2} r dr$
令 $u = r^2, du = 2r dr$：
$I = 2\pi \cdot \frac{1}{2} \int_0^{R^2} e^u du = \pi [e^u]_0^{R^2} = \pi(e^{R^2} - 1)$。

#### 答案
$\pi(e^{R^2} - 1)$
</details>

### 练习 20.2：球坐标下的三重积分
计算 $\iiint_V \sqrt{x^2+y^2+z^2} dV$，其中 $V$ 是由 $z = \sqrt{x^2+y^2}$ 与 $z=1$ 围成的区域。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
区域 $V$ 是一个顶点在原点、开口向上的圆锥。
转球坐标：
$x^2+y^2+z^2 = r^2$。
圆锥面 $z = \sqrt{x^2+y^2} \implies r \cos \theta = r \sin \theta \implies \theta = \pi/4$。
顶面 $z = 1 \implies r \cos \theta = 1 \implies r = \frac{1}{\cos \theta}$。
积分范围：$0 \le \phi \le 2\pi, 0 \le \theta \le \pi/4, 0 \le r \le \sec \theta$。
$I = \int_0^{2\pi} d\phi \int_0^{\pi/4} d\theta \int_0^{\sec \theta} r \cdot r^2 \sin \theta dr$
$= 2\pi \int_0^{\pi/4} \sin \theta [\frac{r^4}{4}]_0^{\sec \theta} d\theta = \frac{\pi}{2} \int_0^{\pi/4} \frac{\sin \theta}{\cos^4 \theta} d\theta$
令 $u = \cos \theta, du = -\sin \theta d\theta$：
$I = \frac{\pi}{2} \int_1^{\sqrt{2}/2} \frac{-du}{u^4} = \frac{\pi}{2} [\frac{1}{3u^3}]_{\sqrt{2}/2}^1 = \frac{\pi}{6} (1 - \frac{1}{(\sqrt{2}/2)^3}) = \frac{\pi}{6} (1 - 2\sqrt{2})$。
(注意符号，结果应为正，这里计算上限时需仔细：$1/(\sqrt{2}/2)^3 = 2\sqrt{2}$，故结果为 $\frac{\pi}{6}(2\sqrt{2}-1)$)。

#### 答案
$\frac{\pi}{6}(2\sqrt{2}-1)$
</details>

---

## 第二十一章：曲线积分 (Line Integrals)

### 练习 21.1：格林公式 (Green's Theorem)
计算 $I = \oint_C (x^2-y) dx + (x+y^2) dy$，其中 $C$ 是圆 $x^2+y^2=R^2$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
由格林公式：
$I = \iint_D (\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}) dA$
其中 $P = x^2-y, Q = x+y^2$。
$\frac{\partial Q}{\partial x} = 1, \frac{\partial P}{\partial y} = -1$。
故 $I = \iint_D (1 - (-1)) dA = 2 \iint_D dA = 2 \cdot (\pi R^2) = 2\pi R^2$。

#### 答案
$2\pi R^2$
</details>

---

## 第二十二章：曲面积分 (Surface Integrals)

### 练习 22.1：高斯公式 (Gauss's Theorem)
计算曲面积分 $I = \oiint_S (x^3 dy dz + y^3 dz dx + z^3 dx dy)$，其中 $S$ 是球面 $x^2+y^2+z^2 = a^2$ 的外侧。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
由高斯公式：
$I = \iiint_V (\frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}) dV$
$= \iiint_V (3x^2 + 3y^2 + 3z^2) dV = 3 \iiint_V (x^2+y^2+z^2) dV$。
转球坐标：
$I = 3 \int_0^{2\pi} d\phi \int_0^\pi \sin\theta d\theta \int_0^a r^2 \cdot r^2 dr$
$= 3 \cdot 2\pi \cdot 2 \cdot [\frac{r^5}{5}]_0^a = \frac{12\pi a^5}{5}$。

#### 答案
$\frac{12\pi a^5}{5}$
</details>

---

## 第二十三章：矢量分析与场论初步 (Vector Analysis)

### 练习 23.1：斯托克斯公式 (Stokes' Theorem)
计算 $\oint_C y dx + z dy + x dz$，其中 $C$ 是平面 $x+y+z=1$ 与坐标平面的交线，沿逆时针方向。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
设 $\mathbf{F} = (y, z, x)$。计算旋度：
$\text{curl } \mathbf{F} = \nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ y & z & x \end{vmatrix} = (-1, -1, -1)$。
由斯托克斯公式，原式 $= \iint_S (\text{curl } \mathbf{F}) \cdot d\mathbf{S}$。
取 $S$ 为平面 $x+y+z=1$ 在第一卦限的部分，法向量为 $\mathbf{n} = \frac{1}{\sqrt{3}}(1, 1, 1)$。
面积元素 $dS = \sqrt{3} dA_{xy}$。
积分 $= \iint_{D_{xy}} (-1, -1, -1) \cdot (1, 1, 1) dA_{xy} = -3 \iint_{D_{xy}} dA_{xy}$。
$D_{xy}$ 是由 $x=0, y=0, x+y=1$ 围成的三角形，面积为 $1/2$。
故积分结果为 $-3 \cdot \frac{1}{2} = -1.5$。

#### 答案
$-3/2$
</details>

### 练习 23.2：保守场与势函数
判定向量场 $\mathbf{F} = (2xy+z^2, x^2, 2xz)$ 是否为保守场，若是，求其势函数 $\Phi$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **判定旋度**：
   $\nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ 2xy+z^2 & x^2 & 2xz \end{vmatrix} = (0 - 0, 2z - 2z, 2x - 2x) = (0, 0, 0)$。
   由于旋度为 0 且定义域为 $\mathbb{R}^3$（全平面单连通），故 $\mathbf{F}$ 是保守场。
2. **求势函数**：
   $\frac{\partial \Phi}{\partial x} = 2xy+z^2 \implies \Phi = x^2y + xz^2 + g(y, z)$。
   $\frac{\partial \Phi}{\partial y} = x^2 + g_y(y, z) = x^2 \implies g_y = 0 \implies g = h(z)$。
   $\frac{\partial \Phi}{\partial z} = 2xz + h'(z) = 2xz \implies h'(z) = 0 \implies h = C$。
   故 $\Phi(x, y, z) = x^2y + xz^2 + C$。

#### 答案
是保守场，势函数 $\Phi = x^2y + xz^2 + C$。
</details>
