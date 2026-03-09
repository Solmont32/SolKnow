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

### 练习 16.2：多元函数的连续性判定
讨论函数 $f(x, y) = \begin{cases} \frac{xy^2}{x^2+y^4} & (x, y) \neq (0, 0) \\ 0 & (x, y) = (0, 0) \end{cases}$ 在 $(0, 0)$ 处的连续性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **沿直线趋于原点**：
   令 $y = kx$，则 $\lim_{x \to 0} \frac{x(kx)^2}{x^2+(kx)^4} = \lim_{x \to 0} \frac{k^2x}{1+k^4x^2} = 0$。
2. **沿抛物线趋于原点**：
   令 $x = y^2$，则 $\lim_{y \to 0} \frac{y^2 \cdot y^2}{(y^2)^2+y^4} = \lim_{y \to 0} \frac{y^4}{2y^4} = \frac{1}{2}$。
3. **结论**：
   由于沿不同曲线趋于原点时极限不同，重极限 $\lim_{(x, y) \to (0, 0)} f(x, y)$ 不存在。
   因此，函数在 $(0, 0)$ 处不连续。

#### 答案
在 $(0, 0)$ 处不连续。
</details>

### 练习 16.3：利用极坐标求极限
求 $\lim_{(x, y) \to (0, 0)} \frac{x^3 + y^3}{x^2 + y^2}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
令 $x = r \cos \theta, y = r \sin \theta$，当 $(x, y) \to (0, 0)$ 时，$r \to 0^+$。
代入式中：
$\frac{r^3(\cos^3 \theta + \sin^3 \theta)}{r^2} = r(\cos^3 \theta + \sin^3 \theta)$。
由于 $|\cos^3 \theta + \sin^3 \theta| \le |\cos \theta|^3 + |\sin \theta|^3 \le 2$，
故 $0 \le |r(\cos^3 \theta + \sin^3 \theta)| \le 2r \to 0$。
由于该估计与 $\theta$ 无关，故重极限存在且为 0。

#### 答案
0
</details>

### 练习 16.4：累次极限与重极限的辨析
求 $f(x, y) = \frac{x^2 y^2}{x^2 y^2 + (x-y)^2}$ 在 $(0, 0)$ 处的累次极限。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. 先对 $y$ 取极限，再对 $x$ 取极限：
   $\lim_{x \to 0} \left( \lim_{y \to 0} \frac{x^2 y^2}{x^2 y^2 + (x-y)^2} \right) = \lim_{x \to 0} \frac{0}{0 + x^2} = 0$。
2. 先对 $x$ 取极限，再对 $y$ 取极限：
   $\lim_{y \to 0} \left( \lim_{x \to 0} \frac{x^2 y^2}{x^2 y^2 + (x-y)^2} \right) = \lim_{y \to 0} \frac{0}{0 + y^2} = 0$。
**注意**：虽然累次极限相等且均为 0，但沿 $y=x$ 趋于 $(0, 0)$ 时，极限为 $\lim_{x \to 0} \frac{x^4}{x^4+0} = 1$。故重极限不存在。

#### 答案
两个累次极限均为 0。
</details>

---

## 第十七章：多元函数微分学 (Multivariable Differentiation)
[**理论回顾：第十七章 多元函数微分学**](../../academic-math/analysis/multivariable-differentiation) | [**微分几何延伸**](../../academic-math/analysis/differential-geometry)

### 练习 17.1：全微分的判定
讨论函数 $f(x, y) = \sqrt{|xy|}$ 在 $(0, 0)$ 处的可微性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **偏导数**：
   $f_x(0, 0) = \lim_{\Delta x \to 0} \frac{f(\Delta x, 0) - f(0, 0)}{\Delta x} = 0$。
   同理 $f_y(0, 0) = 0$。
2. **可微性判定**：
   考察 $\lim_{(\Delta x, \Delta y) \to (0, 0)} \frac{\sqrt{|\Delta x \Delta y|}}{\sqrt{\Delta x^2 + \Delta y^2}}$。
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
   $\mathbf{r}' = (-a \sin t, a \cos t, b)$，$|\mathbf{r}'| = \sqrt{a^2+b^2}$。
   $\mathbf{r}'' = (-a \cos t, -a \sin t, 0)$。
   $\mathbf{r}''' = (a \sin t, -a \cos t, 0)$。
2. **曲率 $\kappa$**：
   $\mathbf{r}' \times \mathbf{r}'' = (ab \sin t, -ab \cos t, a^2)$，$|\mathbf{r}' \times \mathbf{r}''| = a\sqrt{a^2+b^2}$。
   $\kappa = \frac{a\sqrt{a^2+b^2}}{(a^2+b^2)^{3/2}} = \frac{a}{a^2+b^2}$。
3. **挠率 $\tau$**：
   混合积 $(\mathbf{r}', \mathbf{r}'', \mathbf{r}''') = a^2b$。
   $\tau = \frac{a^2b}{a^2(a^2+b^2)} = \frac{b}{a^2+b^2}$。

#### 答案
$\kappa = \frac{a}{a^2+b^2}$，$\tau = \frac{b}{a^2+b^2}$。
</details>

### 练习 17.3：多元函数的 Taylor 展开
求 $f(x, y) = e^x \sin y$ 在 $(0, 0)$ 处的二阶 Taylor 展开式。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$f(0, 0) = 0, f_x=0, f_y=1, f_{xx}=0, f_{xy}=1, f_{yy}=0$。
$f(x, y) \approx y + xy$。

#### 答案
$y + xy + o(x^2+y^2)$
</details>

### 练习 17.4：链式法则应用
设 $z = f(x^2 - y^2)$，$f$ 可导，求 $y \frac{\partial z}{\partial x} + x \frac{\partial z}{\partial y}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\frac{\partial z}{\partial x} = f' \cdot 2x$，$\frac{\partial z}{\partial y} = f' \cdot (-2y)$。
$y(2x f') + x(-2y f') = 2xy f' - 2xy f' = 0$。

#### 答案
0
</details>

---

## 第十八章：隐函数定理及其应用 (Implicit Function Theorem)
[**理论回顾：第十八章 隐函数定理及其应用**](../../academic-math/analysis/implicit-function-theorem)

### 练习 18.1：隐函数组求导
由方程组 $\begin{cases} u + v = x + y \\ xu+yv=1 \end{cases}$ 确定隐函数 $u(x, y), v(x, y)$。求 $\frac{\partial u}{\partial x}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
对两方程关于 $x$ 求偏导：
1. $u_x + v_x = 1$
2. $u + xu_x + yv_x = 0 \implies xu_x + yv_x = -u$
解方程组得 $u_x = \frac{y+u}{y-x}$。

#### 答案
$\frac{\partial u}{\partial x} = \frac{y + u}{y - x}$
</details>

### 练习 18.2：带约束的极值 (Lagrange Multipliers)
求函数 $f(x, y) = xy$ 在约束条件 $x + y = 2$ 下的极值。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$L = xy + \lambda(x+y-2)$。
$L_x = y+\lambda=0, L_y = x+\lambda=0 \implies x=y=1$。
此时 $f(1, 1) = 1$。

#### 答案
最大值为 1。
</details>

### 练习 18.3：雅可比行列式计算
计算极坐标变换 $x = r \cos \theta, y = r \sin \theta$ 的雅可比行列式。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$J = \frac{\partial(x, y)}{\partial(r, \theta)} = \begin{vmatrix} \cos \theta & -r \sin \theta \\ \sin \theta & r \cos \theta \end{vmatrix} = r(\cos^2 \theta + \sin^2 \theta) = r$。

#### 答案
$r$
</details>

### 练习 18.4：隐函数的高阶导数
设 $x^2 + y^2 + z^2 - 3xyz = 0$，求 $\frac{\partial z}{\partial x}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
令 $F = x^2+y^2+z^2-3xyz$。
$F_x = 2x-3yz, F_z = 2z-3xy$。
$\frac{\partial z}{\partial x} = -\frac{F_x}{F_z} = \frac{3yz - 2x}{2z - 3xy}$。

#### 答案
$\frac{3yz - 2x}{2z - 3xy}$
</details>

### 练习 18.5：[挑战] 隐函数组的高阶偏导
设 $x = u + v^2, y = u^2 - v$，求 $\frac{\partial u}{\partial x}, \frac{\partial u}{\partial y}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
对两方程全微分：
1. $dx = du + 2v dv$
2. $dy = 2u du - dv$
用克莱姆法则解 $du, dv$：
系数行列式 $J = \begin{vmatrix} 1 & 2v \\ 2u & -1 \end{vmatrix} = -1 - 4uv$。
$du = \frac{\begin{vmatrix} dx & 2v \\ dy & -1 \end{vmatrix}}{-1-4uv} = \frac{-dx - 2v dy}{-1-4uv} = \frac{1}{1+4uv} dx + \frac{2v}{1+4uv} dy$。
故 $\frac{\partial u}{\partial x} = \frac{1}{1+4uv}$，$\frac{\partial u}{\partial y} = \frac{2v}{1+4uv}$。

#### 答案
$\frac{\partial u}{\partial x} = \frac{1}{1+4uv}, \frac{\partial u}{\partial y} = \frac{2v}{1+4uv}$
</details>

### 练习 18.6：[挑战] 逆映射定理的应用
证明映射 $f(x, y) = (x^2 - y^2, 2xy)$ 在除原点外的任何点都局部可逆。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
计算雅可比矩阵：
$Df = \begin{pmatrix} 2x & -2y \\ 2y & 2x \end{pmatrix}$。
$\det Df = 4x^2 + 4y^2 = 4(x^2+y^2)$。
只要 $(x, y) \neq (0, 0)$，则 $\det Df \neq 0$。
根据逆映射定理，$f$ 在除原点外的任何点都存在局部 $C^1$ 逆映射。
注：该映射实际上是复平面上的平方映射 $w = z^2$ 的实部与虚部。

#### 答案
证毕。
</details>

### 练习 18.7：[提高] 函数相关性判定
判定 $u = x+y, v = x^2+y^2, w = x^3+y^3$ 是否相关。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
由于只有两个独立变量 $x, y$，三个函数 $u, v, w$ 必然相关。
寻找关系：$u^3 = (x+y)^3 = x^3+y^3 + 3xy(x+y) = w + 3xy u$。
又 $u^2 = x^2+y^2 + 2xy = v + 2xy \implies xy = \frac{u^2-v}{2}$。
代入得 $u^3 = w + 3u \frac{u^2-v}{2} = w + \frac{3u^3 - 3uv}{2}$。
$2u^3 = 2w + 3u^3 - 3uv \implies w = \frac{3uv - u^3}{2}$。
**结论**：函数相关。

#### 答案
相关
</details>

### 练习 18.8：[深度] 隐函数组在切空间的应用
证明由方程组 $\begin{cases} x+y+z=0 \\ x^2+y^2+z^2=1 \end{cases}$ 定义的曲线在点 $(\frac{1}{\sqrt{2}}, -\frac{1}{\sqrt{2}}, 0)$ 处的切线方向。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **雅可比矩阵**：令 $F_1 = x+y+z, F_2 = x^2+y^2+z^2$。
   $$DF = \begin{pmatrix} 1 & 1 & 1 \\ 2x & 2y & 2z \end{pmatrix}$$
2. **在给定点计算**：$P = (\frac{1}{\sqrt{2}}, -\frac{1}{\sqrt{2}}, 0)$。
   $$DF|_P = \begin{pmatrix} 1 & 1 & 1 \\ \sqrt{2} & -\sqrt{2} & 0 \end{pmatrix}$$
3. **切线方向**：切线方向 $\mathbf{v}$ 必须在两个面梯度的法空间中，即 $DF|_P \cdot \mathbf{v} = \mathbf{0}$。
   - $v_1 + v_2 + v_3 = 0$
   - $\sqrt{2}v_1 - \sqrt{2}v_2 = 0 \implies v_1 = v_2$
   代入得 $2v_1 + v_3 = 0 \implies v_3 = -2v_1$。
4. **结论**：切线方向向量为 $(1, 1, -2)$（或其倍数）。

#### 答案
$(1, 1, -2)$
</details>

---

## 第十九章：含参量积分 (Integrals with Parameters)
[**理论回顾：第十九章 含参量积分**](../../academic-math/analysis/parametric-integrals)

### 练习 19.1：Leibniz 积分法则的应用
计算 $I(\alpha) = \int_0^\infty \frac{e^{-\alpha x} \sin x}{x} dx$ ($\alpha > 0$)。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$I'(\alpha) = - \int_0^\infty e^{-\alpha x} \sin x dx = - \frac{1}{\alpha^2 + 1}$。
$I(\alpha) = \pi/2 - \arctan \alpha$。

#### 答案
$\frac{\pi}{2} - \arctan \alpha$
</details>

### 练习 19.2：Beta 函数应用
求 $\int_0^{\pi/2} \sin^6 x \cos^4 x dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
原式 $= \frac{1}{2} B(7/2, 5/2) = \frac{1}{2} \frac{\Gamma(7/2)\Gamma(5/2)}{\Gamma(6)} = \frac{3\pi}{512}$。

#### 答案
$\frac{3\pi}{512}$
</details>

### 练习 19.3：一致收敛性判定
证明 $I(y) = \int_0^\infty \frac{\cos(xy)}{1+x^2} dx$ 在 $\mathbb{R}$ 上一致收敛。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$|\frac{\cos(xy)}{1+x^2}| \le \frac{1}{1+x^2} = M(x)$。
$\int_0^\infty M(x) dx = \pi/2$ 收敛。故由 M-判别法一致收敛。

#### 答案
证毕。
</details>

### 练习 19.4：Gamma 函数计算
求 $\int_0^\infty x^2 e^{-x^2} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
令 $t = x^2, dt = 2x dx \implies dx = \frac{1}{2} t^{-1/2} dt$。
原式 $= \int_0^\infty t e^{-t} \frac{1}{2} t^{-1/2} dt = \frac{1}{2} \int_0^\infty t^{1/2} e^{-t} dt = \frac{1}{2} \Gamma(3/2) = \frac{1}{2} \cdot \frac{1}{2} \sqrt{\pi} = \frac{\sqrt{\pi}}{4}$。

#### 答案
$\frac{\sqrt{\pi}}{4}$
</details>

---

## 第二十章：重积分 (Multiple Integrals)
[**理论回顾：第二十章 重积分**](../../academic-math/analysis/multiple-integrals)

### 练习 20.1：极坐标下的二重积分
计算 $\iint_D e^{x^2+y^2} dx dy$，其中 $D$ 是圆域 $x^2+y^2 \le R^2$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\int_0^{2\pi} d\theta \int_0^R e^{r^2} r dr = \pi (e^{R^2} - 1)$。

#### 答案
$\pi(e^{R^2} - 1)$
</details>

### 练习 20.2：球坐标下的三重积分
计算由 $z = \sqrt{x^2+y^2}$ 与 $z=1$ 围成的区域 $V$ 的体积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
柱坐标：$V = \int_0^{2\pi} d\phi \int_0^1 \rho d\rho \int_\rho^1 dz = \pi/3$。

#### 答案
$\pi/3$
</details>

### 练习 20.3：二重积分的换序
求 $\int_0^1 dx \int_{\sqrt{x}}^1 e^{y^3} dy$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
换序为 $\int_0^1 dy \int_0^{y^2} e^{y^3} dx = \int_0^1 y^2 e^{y^3} dy = \frac{1}{3}(e - 1)$。

#### 答案
$\frac{1}{3}(e - 1)$
</details>

### 练习 20.4：三重积分应用（质心）
求密度为 1 的均匀半球体 $x^2+y^2+z^2 \le R^2, z \ge 0$ 的质心。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\bar{x}=\bar{y}=0$。$\bar{z} = \frac{\iiint z dV}{\iiint dV}$。
$\iiint z dV = \int_0^{2\pi} d\phi \int_0^{\pi/2} \sin \theta \cos \theta d\theta \int_0^R r^3 dr = \frac{\pi R^4}{4}$。
体积 $V = \frac{2}{3}\pi R^3 \implies \bar{z} = \frac{\pi R^4/4}{2\pi R^3/3} = \frac{3}{8}R$。

#### 答案
$(0, 0, \frac{3}{8}R)$
</details>

---

## 第二十一章：曲线积分 (Line Integrals)
[**理论回顾：第二十一章 曲线积分**](../../academic-math/analysis/line-integrals)

### 练习 21.1：格林公式应用
计算 $I = \oint_C (x^2-y) dx + (x+y^2) dy$，其中 $C$ 是圆 $x^2+y^2=R^2$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\iint_D (Q_x - P_y) dA = \iint_D (1 - (-1)) dA = 2 \pi R^2$。

#### 答案
$2\pi R^2$
</details>

### 练习 21.2：第一类曲线积分
计算 $\int_C (x+y) ds$，其中 $C$ 是连接 $(0,0)$ 与 $(1,1)$ 的线段。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\int_0^1 2t \sqrt{2} dt = \sqrt{2}$。

#### 答案
$\sqrt{2}$
</details>

### 练习 21.3：路径无关性与势函数
求 $\int_{(0,0)}^{(1,1)} (2x+y) dx + (x+2y) dy$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$P_y=1, Q_x=1$。势函数 $u = x^2+xy+y^2$。
结果为 $1+1+1 - 0 = 3$。

#### 答案
3
</details>

### 练习 21.4：变力做功
计算 $\mathbf{F} = (y, z, x)$ 沿线段 $A(0,0,0)$ 到 $B(1,1,1)$ 做的功。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
参数化 $x=t, y=t, z=t, dt \in [0, 1]$。
$\int_0^1 (t+t+t) dt = 3/2$。

#### 答案
3/2
</details>

### 练习 21.5：[挑战] 非单连通区域的格林公式
计算 $\oint_L \frac{-y dx + x dy}{x^2+y^2}$，其中 $L$ 为包围原点的任意正向闭曲线。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **奇点处理**：原点 $(0,0)$ 是奇点，函数在原点无定义。
2. **辅助圆**：取以原点为心，半径为 $\epsilon$ 的极小圆 $C_\epsilon$，使得 $C_\epsilon$ 在 $L$ 内部。
3. **区域变形**：由格林公式在复连通区域的应用，$\oint_L = \oint_{C_\epsilon}$。
4. **计算小圆积分**：令 $x = \epsilon \cos \theta, y = \epsilon \sin \theta, dx = -\epsilon \sin \theta d\theta, dy = \epsilon \cos \theta d\theta$。
   $$\int_0^{2\pi} \frac{-\epsilon \sin \theta (-\epsilon \sin \theta) + \epsilon \cos \theta (\epsilon \cos \theta)}{\epsilon^2} d\theta = \int_0^{2\pi} 1 d\theta = 2\pi$$
5. **结论**：结果与 $L$ 的具体形状无关，只要其包围原点，积分值恒为 $2\pi$。

#### 答案
$2\pi$
</details>

---

## 第二十二章：曲面积分 (Surface Integrals)
[**理论回顾：第二十二章 曲面积分**](../../academic-math/analysis/surface-integrals)

### 练习 22.1：高斯公式求通量
... (unchanged) ...

### 练习 22.5：[深度] 高斯定律与点电荷
利用高斯公式证明：穿过包围点电荷 $Q$（位于原点）的任意闭曲面 $S$ 的电场通量为 $Q/\epsilon_0$。已知 $\mathbf{E} = \frac{Q}{4\pi \epsilon_0 r^3} \mathbf{r}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **计算散度**：在 $r \neq 0$ 时，$\nabla \cdot \mathbf{E} = \frac{Q}{4\pi \epsilon_0} \nabla \cdot (\frac{\mathbf{r}}{r^3}) = 0$。
2. **处理奇点**：由于原点散度未定义，在原点包围一个半径为 $\delta$ 的小球 $B_\delta$。
3. **应用高斯公式**：在 $\Omega = V \setminus B_\delta$ 上，$\iiint_\Omega \nabla \cdot \mathbf{E} dV = 0$。
   故 $\oiint_S \mathbf{E} \cdot d\mathbf{S} = \oiint_{\partial B_\delta} \mathbf{E} \cdot d\mathbf{S}$。
4. **计算球面积分**：在球面 $r = \delta$ 上，$\mathbf{E} \cdot \mathbf{n} = \frac{Q}{4\pi \epsilon_0 \delta^2}$，面积为 $4\pi \delta^2$。
   通量 $\Phi = \frac{Q}{4\pi \epsilon_0 \delta^2} \cdot 4\pi \delta^2 = \frac{Q}{\epsilon_0}$。

#### 答案
证毕。
</details>

---

## 第二十三章：矢量分析与场论初步 (Vector Analysis)
[**理论回顾：第二十三章 矢量分析与场论初步**](../../academic-math/analysis/vector-analysis)

### 练习 23.1：拉普拉斯算子
... (unchanged) ...

### 练习 23.5：[提高] 球坐标系下的拉普拉斯算子应用
设 $f(r)$ 仅与极径有关，求 $\nabla^2 f(r)$ 在球坐标系下的表达式，并求方程 $\nabla^2 f = 0$ 的通解。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **算子表达式**：在球坐标系下，若 $f$ 只与 $r$ 有关，则 $\nabla^2 f = \frac{1}{r^2} \frac{d}{d r}(r^2 \frac{d f}{d r})$。
2. **求解方程**：$\frac{1}{r^2} \frac{d}{d r}(r^2 f') = 0 \implies \frac{d}{d r}(r^2 f') = 0$。
3. **积分一次**：$r^2 f' = C_1$。
4. **再积分一次**：$f' = \frac{C_1}{r^2} \implies f = -\frac{C_1}{r} + C_2$。
5. **结论**：通解为 $f(r) = \frac{A}{r} + B$。

#### 答案
$f(r) = \frac{A}{r} + B$
</details>
计算 $\oiint_S (x^3 dydz + y^3 dzdx + z^3 dxdy)$，其中 $S$ 是球面 $x^2+y^2+z^2 = a^2$ 的外侧。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\iiint 3(x^2+y^2+z^2) dV = 3 \int_0^{2\pi} d\phi \int_0^\pi \sin \theta d\theta \int_0^a r^4 dr = \frac{12\pi a^5}{5}$。

#### 答案
$\frac{12\pi a^5}{5}$
</details>

### 练习 22.2：第一类曲面积分
计算 $\iint_S z dS$，其中 $S$ 为球面 $x^2+y^2+z^2=a^2, z \ge 0$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$dS = \frac{a}{z} dA_{xy} \implies \iint z \cdot \frac{a}{z} dA_{xy} = a \cdot \pi a^2 = \pi a^3$。

#### 答案
$\pi a^3$
</details>

### 练习 22.3：斯托克斯公式应用
计算 $\oint_C y dx + z dy + x dz$，其中 $C$ 是平面 $x+y+z=1$ 与坐标轴的交线。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\text{curl } \mathbf{F} = (-1, -1, -1)$。$\mathbf{n} = \frac{1}{\sqrt{3}}(1, 1, 1)$。
$\iint_S (-1,-1,-1) \cdot \frac{1}{\sqrt{3}}(1,1,1) dS = -\sqrt{3} \text{Area}(S) = -\sqrt{3} \cdot \frac{\sqrt{3}}{2} = -3/2$。

#### 答案
$-3/2$
</details>

### 练习 22.4：通量直接计算
计算向量场 $\mathbf{F} = (x, y, z)$ 穿过平面 $z=1$ 在 $x^2+y^2 \le 1$ 部分的通量（向上）。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\mathbf{n}=(0,0,1), \mathbf{F} \cdot \mathbf{n} = z = 1$。
通量为面积 $\pi(1)^2 = \pi$。

#### 答案
$\pi$
</details>

---

## 第二十三章：矢量分析与场论初步 (Vector Analysis)
[**理论回顾：第二十三章 矢量分析与场论初步**](../../academic-math/analysis/vector-analysis)

### 练习 23.1：拉普拉斯算子
计算 $\nabla^2 (\ln r)$，其中 $r = \sqrt{x^2+y^2}$ (二维)。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\frac{\partial}{\partial x} \ln r = \frac{x}{r^2}, \frac{\partial^2}{\partial x^2} \ln r = \frac{r^2 - 2x^2}{r^4}$。
$\nabla^2 \ln r = \frac{2r^2 - 2(x^2+y^2)}{r^4} = 0$。

#### 答案
0
</details>

### 练习 23.2：保守场判定
判定 $\mathbf{F} = (y+z) \mathbf{i} + (x+z) \mathbf{j} + (x+y) \mathbf{k}$ 是否为保守场。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\nabla \times \mathbf{F} = (1-1, 1-1, 1-1) = \mathbf{0}$。
是保守场。势函数为 $\Phi = xy + yz + zx + C$。

#### 答案
是，$\Phi = xy + yz + zx + C$
</details>

### 练习 23.3：旋度计算
求向量场 $\mathbf{F} = (-y, x, 0)$ 的旋度。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
$\text{curl } \mathbf{F} = (0, 0, 1 - (-1)) = (0, 0, 2) = 2\mathbf{k}$。

#### 答案
$2\mathbf{k}$
</details>

### 练习 23.4：方向导数
求 $f = x^2+y^2+z^2$ 在点 $(1, 1, 1)$ 沿梯度方向的方向导数。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
梯度 $\nabla f = (2x, 2y, 2z) = (2, 2, 2)$。
模 $|\nabla f| = \sqrt{4+4+4} = 2\sqrt{3}$。
梯度方向的方向导数即为梯度的模。

#### 答案
$2\sqrt{3}$
</details>

---

## 延伸入口

- [数学分析综合练习库](/docs/exercises/math/analysis)
- [数学分析：上册 (Volume 1) 练习概览](/docs/exercises/math/analysis-foundations)
- [数学分析：下册 (Volume 2) 练习概览](/docs/exercises/math/analysis-series-fourier)
- [返回数学分析知识导航](/docs/academic-math/analysis/index)
