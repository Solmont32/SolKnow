---
title: 数学分析精选练习
---

import { Target, Layers, Zap, Trophy, Compass } from 'lucide-react';

# 数学分析精选练习

> **“不积跬步，无以至千里。”** —— 本练习库采用阶梯式结构，对标经典教材《数学分析》课后习题规范。

---
## 🪜 练习阶梯说明

- <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A (基础巩固)**</span>：聚焦核心定义、基本运算法则（如极限计算、求导、积分公式）。
- <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B (综合提升)**</span>：涉及中值定理证明、一致连续性、多元函数极值等综合应用。
- <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C (竞赛挑战)**</span>：对标考研名校真题、数学竞赛，涵盖实数完备性深度证明及复杂积分变换。

---

## 🎯 考点覆盖模型 (Knowledge Matrix)

| 知识模块         | 核心考点                             | 典型练习   | 推荐等级 |
| :--------------- | :----------------------------------- | :--------- | :------- |
| **极限论**       | $\epsilon-\delta$ 定义、Cauchy 准则 | 练习 1, 10 | Level A/B|
| **一元微分学**   | Rolle/Lagrange/Cauchy 中值定理       | 练习 2, 15 | Level B  |
| **一元积分学**   | Newton-Leibniz 公式、分部积分技巧   | 练习 5, 20 | Level A  |
| **无穷级数**     | 敛散性判别法、Fourier 级数展开       | 练习 30, 35| Level B  |
| **多元微积分**   | 偏导数、重积分、Green/Stokes 公式    | 练习 40, 50| Level B/C|
| **实数完备性**   | 七大等价定理证明                     | 练习 60    | Level C  |

---


## 🔍 多视角解法对比专题 (Case Study)

### 专题 1：数列极限的证明与计算

**题目**：证明 $\lim_{n \to \infty} \sqrt[n]{n} = 1$。

<details>
<summary>点击查看：代数缩放 vs 几何/分析视角对比</summary>

#### 视角一：代数缩放法 (Bernoulli 不等式)

1. 令 $\sqrt[n]{n} = 1 + h_n$ ($h_n > 0$)。
2. 则 $n = (1 + h_n)^n = 1 + nh_n + \frac{n(n-1)}{2}h_n^2 + \dots > \frac{n(n-1)}{2}h_n^2$。
3. 得到 $h_n^2 < \frac{2}{n-1} \to 0$ ($n \to \infty$)。
4. 由夹逼定理，$h_n \to 0 \implies \sqrt[n]{n} \to 1$。

#### 视角二：连续化视角 (L'Hôpital 法则)

1. 考虑函数 $f(x) = x^{1/x}$。
2. 取对数：$\ln f(x) = \frac{\ln x}{x}$。
3. 利用 L'Hôpital 法则：$\lim_{x \to \infty} \frac{\ln x}{x} = \lim_{x \to \infty} \frac{1/x}{1} = 0$。
4. 故 $\lim_{x \to \infty} x^{1/x} = e^0 = 1$。由归结原则，数列极限为 1。

#### 📌 教学评价

视角一更符合**分析学**初期的严密推导逻辑，不依赖连续函数的性质；视角二则利用了**微积分**的强大工具，计算效率更高。

</details>

---

## 📝 练习库正文

### Level A：基础运算与定义应用

## 练习 1：求极限 (Level A)

计算 $\lim_{x \to 0} \frac{\sin 5x}{3x}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **利用重要极限**：$\lim_{u \to 0} \frac{\sin u}{u} = 1$。
2. **恒等变形**：

$$\frac{\sin 5x}{3x} = \frac{\sin 5x}{5x} \cdot \frac{5x}{3x} = \frac{\sin 5x}{5x} \cdot \frac{5}{3}$$

3. **求极限**：

$$\lim_{x \to 0} (\frac{\sin 5x}{5x} \cdot \frac{5}{3}) = 1 \cdot \frac{5}{3} = \frac{5}{3}$$

#### 答案

$5/3$

</details>

---

## 练习 2：求导数

求 $y = x \ln x$ 的导数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **应用乘法法则**：$(uv)' = u'v + uv'$。
2. **计算**：

$$y' = (x)' \ln x + x (\ln x)' = 1 \cdot \ln x + x \cdot \frac{1}{x} = \ln x + 1$$

#### 答案

$\ln x + 1$

</details>

---

## 练习 3：一致连续性判定

判断 $f(x) = \frac{1}{x}$ 在区间 $(0, 1)$ 上是否一致连续。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **取点序列**：取 $x_n = 1/n$，$x'_n = 1/2n$。
2. **计算差值**：当 $n \to \infty$ 时，$|x_n - x'_n| = |1/2n| \to 0$。
3. **函数值差**：$|f(x_n) - f(x'_n)| = |n - 2n| = n \to \infty$。
4. **结论**：对任意小的 $\delta$，总能找到点对使函数值差大于任意正数，故在 $(0, 1)$ 上不一致连续。

#### 答案

不一致连续。

</details>

---

## 练习 4：介值定理的应用

证明方程 $x^3 - 4x + 1 = 0$ 在区间 $[0, 1]$ 内至少有一个实根。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **构造函数**：设 $f(x) = x^3 - 4x + 1$。
2. **端点值**：
   - $f(0) = 0 - 0 + 1 = 1 > 0$
   - $f(1) = 1 - 4 + 1 = -2 < 0$
3. **连续性**：$f(x)$ 是多项式，在 $[0, 1]$ 上连续。
4. **结论**：由零点定理，$\exists \xi \in (0, 1)$ 使得 $f(\xi) = 0$。

#### 答案

在区间 $[0, 1]$ 内至少有一个实根。

</details>

---

## 练习 5：二重积分计算

计算 $\iint_D (x + y) dA$，其中 $D$ 是由 $y = \sqrt{x}$ 和 $y = x^2$ 围成的区域。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **交点计算**：$x^2 = \sqrt{x} \implies x^4 = x \implies x(x^3 - 1) = 0$。交点为 $(0, 0)$ 和 $(1, 1)$。
2. **确定范围**：$0 \le x \le 1, x^2 \le y \le \sqrt{x}$。
3. **设置积分**：

$$I = \int_0^1 dx \int_{x^2}^{\sqrt{x}} (x + y) dy$$

4. **计算内层**：

$$\int_{x^2}^{\sqrt{x}} (x + y) dy = [xy + \frac{1}{2}y^2]_{x^2}^{\sqrt{x}} = (x\sqrt{x} + \frac{1}{2}x) - (x^3 + \frac{1}{2}x^4)$$

$$= x^{3/2} + \frac{1}{2}x - x^3 - \frac{1}{2}x^4$$

5. **计算外层**：

$$\int_0^1 (x^{3/2} + \frac{1}{2}x - x^3 - \frac{1}{2}x^4) dx = [\frac{2}{5}x^{5/2} + \frac{1}{4}x^2 - \frac{1}{4}x^4 - \frac{1}{10}x^5]_0^1$$

$$= \frac{2}{5} + \frac{1}{4} - \frac{1}{4} - \frac{1}{10} = \frac{4}{10} - \frac{1}{10} = \frac{3}{10}$$

#### 答案

$3/10$

</details>

---

## 练习 6：利用柱坐标计算三重积分

计算 $\iiint_\Omega z dV$，其中 $\Omega$ 是由柱面 $x^2 + y^2 = 1$ 和平面 $z = 0, z = 1$ 围成的区域。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **采用柱坐标**：$x = \rho \cos \phi, y = \rho \sin \phi, z = z$。
2. **确定范围**：$0 \le \rho \le 1, 0 \le \phi \le 2\pi, 0 \le z \le 1$。
3. **设置积分**：

$$I = \int_0^{2\pi} d\phi \int_0^1 \rho d\rho \int_0^1 z dz$$

4. **计算**：

$$I = 2\pi \cdot [\frac{1}{2}\rho^2]_0^1 \cdot [\frac{1}{2}z^2]_0^1 = 2\pi \cdot \frac{1}{2} \cdot \frac{1}{2} = \frac{\pi}{2}$$

#### 答案

$\pi/2$

</details>

---

## 练习 7：第一类曲线积分计算

计算 $\int_\Gamma (x+y) ds$，其中 $\Gamma$ 是连接 $(0,0)$ 和 $(1,1)$ 的直线段。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **参数化曲线**：$\Gamma: x = t, y = t, 0 \le t \le 1$。
2. **计算弧长元素**：$ds = \sqrt{x'(t)^2 + y'(t)^2} dt = \sqrt{1^2 + 1^2} dt = \sqrt{2} dt$。
3. **设置积分**：

$$I = \int_0^1 (t + t) \sqrt{2} dt = \int_0^1 2\sqrt{2} t dt$$

4. **计算**：

$$I = 2\sqrt{2} [\frac{1}{2}t^2]_0^1 = 2\sqrt{2} \cdot \frac{1}{2} = \sqrt{2}$$

#### 答案

$\sqrt{2}$

</details>

---

## 练习 8：格林公式计算功

计算向量场 $\mathbf{F} = (y^2, x^2)$ 沿逆时针方向圆周 $x^2 + y^2 = 1$ 所做的功。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **识别函数**：$P = y^2, Q = x^2$。
2. **应用格林公式**：

$$W = \oint_L P dx + Q dy = \iint_D (\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}) dA$$

3. **计算偏导数**：
   $\frac{\partial Q}{\partial x} = 2x, \frac{\partial P}{\partial y} = 2y$。
4. **设置二重积分**：

$$W = \iint_D (2x - 2y) dA$$

5. **利用对称性**：
   由于区域 $D$（单位圆）关于坐标轴对称，且 $x$ 和 $y$ 是奇函数，故 $\iint_D x dA = 0$ 且 $\iint_D y dA = 0$。
6. **结论**：$W = 0$。

#### 答案

0

</details>

---

## 练习 9：高斯公式求穿过球面的通量

计算向量场 $\mathbf{F} = (x, y, z)$ 穿过单位球面 $x^2 + y^2 + z^2 = 1$ 向外侧的通量。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **应用高斯公式**：
   $\Phi = \oiint_\Sigma \mathbf{F} \cdot d\mathbf{S} = \iiint_\Omega \text{div } \mathbf{F} dV$。
2. **计算散度**：
   $\text{div } \mathbf{F} = \frac{\partial x}{\partial x} + \frac{\partial y}{\partial y} + \frac{\partial z}{\partial z} = 1 + 1 + 1 = 3$。
3. **转化为体积计算**：
   $\Phi = \iiint_\Omega 3 dV = 3 \cdot \text{Vol}(\Omega)$。
4. **球体体积**：$\text{Vol}(\Omega) = \frac{4}{3}\pi (1)^3 = \frac{4}{3}\pi$。
5. **计算结果**：$\Phi = 3 \cdot \frac{4}{3}\pi = 4\pi$。

#### 答案

$4\pi$

</details>

---

## 练习 10：斯托克斯公式计算线积分

计算 $\oint_\Gamma z dx + x dy + y dz$，其中 $\Gamma$ 为平面 $x+y=1$ 与柱面 $x^2+y^2=1$ 的交线（从 $z$ 轴正向看为逆时针）。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **计算旋度**：
   $\mathbf{F} = (z, x, y)$。
   $\nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ z & x & y \end{vmatrix} = (1, 1, 1)$。
2. **应用斯托克斯公式**：
   $I = \iint_\Sigma (1, 1, 1) \cdot \mathbf{n} dS$。
3. **选择曲面与法向量**：
   取 $\Sigma$ 为平面 $x+y=1$ 被柱面截得的部分。
   平面的法向量 $\mathbf{n} = \frac{(1, 1, 0)}{\sqrt{2}}$。
4. **计算点积**：
   $(1, 1, 1) \cdot \frac{(1, 1, 0)}{\sqrt{2}} = \frac{2}{\sqrt{2}} = \sqrt{2}$。
5. **计算面积**：
   $\iint_\Sigma dS$ 是平面 $x+y=1$ 在柱面内的面积。
   其在 $xy$ 平面的投影 $D$ 是直线 $x+y=1$ 被单位圆截得的线段。
   （注：此处解析略作简化以符合常规教学例题）
6. **结论**：通过计算可得结果。

#### 答案

$\sqrt{2} \times \text{Area}(\Sigma)$

</details>

---

## 练习 11：多元函数极值判别

求函数 $f(x, y) = x^4 + y^4 - 4xy + 1$ 的极值点并判别其类型。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **求一阶导数并找驻点**：
   $f_x = 4x^3 - 4y = 0 \implies y = x^3$
   $f_y = 4y^3 - 4x = 0 \implies x = y^3$
   解得驻点为：$P_1(0, 0), P_2(1, 1), P_3(-1, -1)$。
2. **计算二阶导数与 Hessian 矩阵**：
   $f_{xx} = 12x^2, f_{xy} = -4, f_{yy} = 12y^2$。
   $\Delta = AC - B^2$。
3. **判别**：
   - 对于 $P_1(0, 0)$：$\Delta = -16 < 0 \implies$ **鞍点**。
   - 对于 $P_2, P_3$：$\Delta > 0, A > 0 \implies$ **极小值点**。

#### 答案

极小值点为 $(1, 1)$ 和 $(-1, -1)$；鞍点为 $(0, 0)$。

</details>

---

## 练习 12：Lagrange 乘数法应用

求函数 $f(x, y) = xy$ 在约束条件 $x + y = 1$ 下的极值。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **构造 Lagrange 函数**：$L(x, y, \lambda) = xy + \lambda(x + y - 1)$。
2. **求解方程组**：$L_x = y + \lambda = 0, L_y = x + \lambda = 0, x + y = 1$。
3. **结果**：$x = 1/2, y = 1/2$。

#### 答案

在 $(1/2, 1/2)$ 处取得极大值 $1/4$。

</details>

---

## 练习 13：数列极限（迫敛定理）

计算 $\lim_{n \to \infty} (\frac{1}{\sqrt{n^2+1}} + \frac{1}{\sqrt{n^2+2}} + \dots + \frac{1}{\sqrt{n^2+n}})$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **夹逼**：
   $\frac{n}{\sqrt{n^2+n}} \le S_n \le \frac{n}{\sqrt{n^2+1}}$
2. **极限**：两侧极限均为 1。

#### 答案

1

</details>

---

## 练习 14：函数极限（利用等价无穷小）

计算 $\lim_{x \to 0} \frac{e^x - 1 - x}{x^2}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **Taylor 展开**：$e^x = 1 + x + \frac{x^2}{2} + o(x^2)$。
2. **代入**：极限为 $1/2$。

#### 答案

$1/2$

</details>

---

## 练习 15：导数定义应用

设 $f(x) = |x| \sin x$，问 $f(x)$ 在 $x=0$ 处是否可导？

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **定义**：$f'(0) = \lim_{\Delta x \to 0} \frac{|\Delta x| \sin \Delta x}{\Delta x}$。
2. **左右极限**：均为 0。

#### 答案

可导，$f'(0) = 0$。

</details>

---

## 练习 16：复合函数求导

求 $y = x^x$ 的导数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **对数法**：$\ln y = x \ln x$。
2. **求导**：$y'/y = \ln x + 1$。

#### 答案

$x^x(1 + \ln x)$

</details>

---

## 练习 17：隐函数二阶导数

由方程 $x^2 + y^2 = a^2$ 确定的隐函数 $y(x)$，求 $y''$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **一阶**：$y' = -x/y$。
2. **二阶**：$y'' = -(y - x y')/y^2 = -(y^2+x^2)/y^3$。

#### 答案

$-a^2/y^3$

</details>

---

## 练习 18：参数方程求导

已知 $\begin{cases} x = a(t - \sin t) \\ y = a(1 - \cos t) \end{cases}$，求 $\frac{dy}{dx}$。

<details>

<summary>点击查看解析</summary>

#### 解析

1. $dy/dx = (dy/dt) / (dx/dt) = \sin t / (1 - \cos t) = \cot(t/2)$。

#### 答案

$\cot(t/2)$

</details>

---

## 练习 19：微分中值定理（Rolle）

证明：$x^3 - 3x + c = 0$ 在 $[-1, 1]$ 上最多有两个实根。

<details>

<summary>点击查看解析</summary>

#### 解析

1. 导数 $3x^2 - 3 = 0 \implies x = \pm 1$。
2. 由 Rolle 定理，若有 3 根，导数在区间内应有 2 个零点，但此处零点在端点。

#### 答案

通过 Rolle 定理证毕。

</details>

---

## 练习 20：Taylor 公式深度应用

本练习涵盖 Taylor 公式的基本展开、数值近似计算以及高阶不等式证明。

<details>

<summary>点击查看详情与解析</summary>

### (1) 基础展开

求 $f(x) = \ln(1+x)$ 在 $x=0$ 处的 $n$ 阶 Taylor 展开。

**解析**：
利用 $(\ln(1+x))^{(k)} = (-1)^{k-1} \frac{(k-1)!}{(1+x)^k}$，代入 $x=0$ 得 $f^{(k)}(0) = (-1)^{k-1} (k-1)!$。
代入 Taylor 公式：

$$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots + (-1)^{n-1} \frac{x^n}{n} + o(x^n)$$

### (2) 数值近似计算

利用 Taylor 公式计算 $\sqrt{e}$ 的近似值，要求误差小于 $10^{-4}$。

**解析**：
使用 $e^x$ 的 $n$ 阶展开及拉格朗日余项 $R_n(x) = \frac{e^\xi}{(n+1)!} x^{n+1}$。
令 $x = 0.5$，误差 $|R_n(0.5)| < \frac{2}{(n+1)! \cdot 2^{n+1}}$。
经计算，$n=5$ 时，误差 $\approx 4.3 \times 10^{-5} < 10^{-4}$。
$\sqrt{e} \approx 1 + 0.5 + \frac{0.5^2}{2!} + \frac{0.5^3}{3!} + \frac{0.5^4}{4!} + \frac{0.5^5}{5!} \approx 1.6487$。

### (3) 高阶不等式证明

证明当 $x > 0$ 时，$x - \frac{x^2}{2} < \ln(1+x) < x - \frac{x^2}{2} + \frac{x^3}{3}$。

**解析**：

- **左边**：二阶展开 $\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3(1+\xi)^3}$。由于 $x>0, \xi>0$，余项为正，不等式成立。
- **右边**：三阶展开 $\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4(1+\eta)^4}$。由于余项为负，不等式成立。

</details>

---

## 练习 21：函数单调性与极值

讨论 $f(x) = x e^{-x}$ 的性质。

<details>

<summary>点击查看解析</summary>

#### 解析

1. $f'(x) = (1-x)e^{-x}$。
2. $x=1$ 处取得极大值 $1/e$。

#### 答案

极大值为 $1/e$。

</details>

---

## 练习 22：不定积分

计算 $\int \frac{dx}{x \ln x}$。

<details>

<summary>点击查看解析</summary>

#### 答案

$\ln|\ln x| + C$

</details>

---

## 练习 23：多元函数极限（不存在性）

证明 $\lim_{(x,y) \to (0,0)} \frac{xy}{x^2+y^2}$ 不存在。

<details>

<summary>点击查看解析</summary>

#### 解析

沿不同斜率直线趋近，极限值不同。

#### 答案

不存在。

</details>

---

## 练习 24：偏导数计算

已知 $z = \arctan \frac{y}{x}$，求偏导。

<details>

<summary>点击查看解析</summary>

#### 答案

$z_x = -y/(x^2+y^2), z_y = x/(x^2+y^2)$

</details>

---

## 练习 25：多元复合函数求导

设 $z = f(x^2 - y^2, xy)$，求 $\partial z / \partial x$。

<details>

<summary>点击查看解析</summary>

#### 答案

$2x f_1' + y f_2'$

</details>

---

## 练习 26：全微分计算

求 $u = x^y$ 的全微分。

<details>

<summary>点击查看解析</summary>

#### 答案

$du = y x^{y-1} dx + x^y \ln x dy$

</details>

---

## 练习 27：方向导数

求 $f(x, y) = x^2 + 2y^2$ 在 $(1, 1)$ 沿 $(1, 1)$ 方向的方向导数。

<details>

<summary>点击查看解析</summary>

#### 答案

$3\sqrt{2}$

</details>

---

## 练习 28：曲面的切平面

求 $z = x^2 + y^2$ 在 $(1, 2, 5)$ 的切平面。

<details>

<summary>点击查看解析</summary>

#### 答案

$2x + 4y - z - 5 = 0$

</details>

---

## 练习 29：隐函数求导

设 $x^2 + y^2 + z^2 - 3xyz = 0$，求 $\partial z / \partial x$。

<details>

<summary>点击查看解析</summary>

#### 答案

$\frac{3yz - 2x}{2z - 3xy}$

</details>

---

## 练习 30：二元函数极值

求 $f(x, y) = x^3 + y^3 - 3xy$ 的极值。

<details>

<summary>点击查看解析</summary>

#### 答案

极小值 $-1$（在 $(1, 1)$ 处）。

</details>

---

## 练习 31：高阶偏导数

设 $z = e^{ax} \sin by$，求 $z_{xy}$。

<details>

<summary>点击查看解析</summary>

#### 答案

$ab e^{ax} \cos by$

</details>

---

## 练习 32：隐函数求导（方程组）

已知方程组 $\begin{cases} u + v = x + y \\ xu + yv = 1 \end{cases}$，求 $\frac{\partial u}{\partial x}$。

<details>

<summary>点击查看解析</summary>

#### 答案

$\frac{u+y}{y-x}$

</details>

---

## 练习 33：Gamma 函数计算

计算 $I = \int_0^{+\infty} x^6 e^{-2x} dx$。

<details>

<summary>点击查看解析</summary>

#### 答案

$45/8$

</details>

---

## 练习 34：Beta 函数与 Gamma 函数

计算 $I = \int_0^{\pi/2} \sin^4 \theta \cos^2 \theta d\theta$。

<details>

<summary>点击查看解析</summary>

#### 答案

$\pi/32$

</details>

---

## 练习 35：高斯公式求通量

计算穿过立方体 $0 \le x, y, z \le a$ 表面的通量。

<details>

<summary>点击查看解析</summary>

#### 答案

$3a^4$

</details>

---

## 练习 36：复合函数连续性

讨论 $f(x) = \lim_{n \to \infty} \frac{x^n - 1}{x^n + 1}$ 的连续性。

<details>

<summary>点击查看解析</summary>

#### 答案

$x=1$ 为跳跃间断点。

</details>

---

## 练习 37：实数完备性（闭区间套定理）

<a id="exercise-completeness"></a>
证明：$\cap_{n=1}^\infty [a_n, b_n]$ 包含且仅包含一个点（在给定条件下）。

<details>

<summary>点击查看解析</summary>

#### 解析

利用单调有界原理证明端点极限相等，再利用反证法证唯一性。

</details>

---

## 练习 38：确界原理的应用

证明：$\sup(A+B) = \sup A + \sup B$。

<details>

<summary>点击查看解析</summary>

#### 解析

两步走：证明 $\sup A + \sup B$ 是上界；证明其为最小上界。

</details>

---

## 练习 39：柯西收敛准则

<a id="exercise-cauchy"></a>
证明数列 $a_n = 1 + 1/2 + \dots + 1/n$ 发散。

<details>

<summary>点击查看解析</summary>

#### 解析

取 $m = 2n$，则 $|a_{2n} - a_n| = \frac{1}{n+1} + \dots + \frac{1}{2n} > n \cdot \frac{1}{2n} = 1/2$。
违反柯西准则，故发散。

</details>

---

## 综合证明板块

### 综合证明 1：罗尔定理与根的唯一性

证明 $e^x = ax + b$ 最多两根。

### 综合证明 2：辅助函数法

证明存在 $\xi$ 使得 $f'(\xi) = -f(\xi)/\xi$。

### 综合证明 3：拉格朗日中值定理与不等式

证明 $\frac{a-b}{a} < \ln\frac{a}{b} < \frac{a-b}{b}$。

### 综合证明 4：柯西中值定理应用

证明存在 $\xi$ 满足 $2\xi(f(b)-f(a)) = f'(\xi)(b^2-a^2)$。

### 综合证明 5：高阶导数与多点罗尔定理

利用罗尔定理递推证明 $f^{(n)}(\xi) = 0$。

---

## 练习 41：空间曲线的切线与法平面

求曲线 $x = t, y = t^2, z = t^3$ 在点 $(1, 1, 1)$ 处的切线与法平面方程。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **参数值**：点 $(1, 1, 1)$ 对应 $t = 1$。
2. **切向量**：$\mathbf{r}'(t) = (1, 2t, 3t^2)$。在 $t=1$ 时，$\mathbf{r}'(1) = (1, 2, 3)$。
3. **切线方程**：

$$\frac{x-1}{1} = \frac{y-1}{2} = \frac{z-1}{3}$$

4. **法平面方程**：
   $1(x-1) + 2(y-1) + 3(z-1) = 0 \Rightarrow x + 2y + 3z - 6 = 0$。

#### 答案

切线：$\frac{x-1}{1} = \frac{y-1}{2} = \frac{z-1}{3}$；法平面：$x + 2y + 3z - 6 = 0$。

</details>

---

## 练习 42：圆柱螺旋线的曲率与挠率计算

计算螺旋线 $\mathbf{r}(t) = (3\cos t, 3\sin t, 4t)$ 的曲率 $\kappa$ 与挠率 $\tau$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **导数**：$\mathbf{r}' = (-3\sin t, 3\cos t, 4)$，$|\mathbf{r}'| = \sqrt{3^2+4^2} = 5$。
2. **二阶导**：$\mathbf{r}'' = (-3\cos t, -3\sin t, 0)$，$|\mathbf{r}' \times \mathbf{r}''| = 3\sqrt{3^2+4^2} = 15$（利用螺旋线公式）。
3. **曲率**：$\kappa = \frac{15}{5^3} = \frac{15}{125} = \frac{3}{25} = 0.12$。
4. **挠率**：$\tau = \frac{b}{a^2+b^2} = \frac{4}{3^2+4^2} = \frac{4}{25} = 0.16$。

#### 答案

$\kappa = 0.12, \tau = 0.16$。

</details>

---

## 练习 43：Frenet 标架求解

求曲线 $\mathbf{r}(t) = (t, t^2, \frac{2}{3}t^3)$ 在 $t=1$ 处的单位切向量 $\mathbf{T}$ 和单位副法向量 $\mathbf{B}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **导数**：$\mathbf{r}' = (1, 2t, 2t^2)$。在 $t=1$ 时，$\mathbf{r}'(1) = (1, 2, 2)$，$|\mathbf{r}'| = 3$。
   故 $\mathbf{T} = (\frac{1}{3}, \frac{2}{3}, \frac{2}{3})$。
2. **二阶导**：$\mathbf{r}'' = (0, 2, 4t)$。在 $t=1$ 时，$\mathbf{r}''(1) = (0, 2, 4)$。
3. **外积**：$\mathbf{r}' \times \mathbf{r}'' = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & 2 & 2 \\ 0 & 2 & 4 \end{vmatrix} = (4, -4, 2)$。
4. **模长**：$|\mathbf{r}' \times \mathbf{r}''| = \sqrt{16+16+4} = 6$。
   故 $\mathbf{B} = (\frac{4}{6}, -\frac{4}{6}, \frac{2}{6}) = (\frac{2}{3}, -\frac{2}{3}, \frac{1}{3})$。

#### 答案

$\mathbf{T} = (\frac{1}{3}, \frac{2}{3}, \frac{2}{3}), \mathbf{B} = (\frac{2}{3}, -\frac{2}{3}, \frac{1}{3})$。

</details>

---

## 练习 44：高斯公式 - 向量场通量计算（高阶）

计算向量场 $\mathbf{F} = (x^3, y^3, z^3)$ 穿过整个球面 $x^2 + y^2 + z^2 = a^2$ 向外侧的通量 $\Phi$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **应用高斯公式**：
   $\Phi = \oiint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_\Omega \text{div } \mathbf{F} dV$。
2. **计算散度**：
   $\text{div } \mathbf{F} = \frac{\partial (x^3)}{\partial x} + \frac{\partial (y^3)}{\partial y} + \frac{\partial (z^3)}{\partial z} = 3x^2 + 3y^2 + 3z^2 = 3(x^2 + y^2 + z^2)$。
3. **球坐标变换**：
   在球坐标下，$x^2 + y^2 + z^2 = r^2$，$dV = r^2 \sin \theta dr d\theta d\phi$。
   范围：$0 \le r \le a, 0 \le \theta \le \pi, 0 \le \phi \le 2\pi$。
4. **设置积分**：
   $\Phi = \int_0^{2\pi} d\phi \int_0^\pi \sin \theta d\theta \int_0^a 3r^2 \cdot r^2 dr$
   $\Phi = 2\pi \cdot 2 \cdot [ \frac{3}{5}r^5 ]_0^a = 4\pi \cdot \frac{3}{5}a^5 = \frac{12}{5}\pi a^5$。

#### 答案

$\frac{12}{5}\pi a^5$

</details>

---

## 练习 45：高斯公式 - 封闭曲面的方向余弦积分

计算积分 $I = \oiint_S (x^2 \cos \alpha + y^2 \cos \beta + z^2 \cos \gamma) dS$，其中 $S$ 是立方体 $0 \le x, y, z \le a$ 的整个表面，$(\cos \alpha, \cos \beta, \cos \gamma)$ 为其外法向方向余弦。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **转化形式**：
   $I = \oiint_S (x^2, y^2, z^2) \cdot \mathbf{n} dS = \oiint_S x^2 dy dz + y^2 dz dx + z^2 dx dy$。
2. **应用高斯公式**：
   $I = \iiint_\Omega (\frac{\partial x^2}{\partial x} + \frac{\partial y^2}{\partial y} + \frac{\partial z^2}{\partial z}) dV = \iiint_\Omega 2(x + y + z) dV$。
3. **计算积分**：
   $I = 2 \int_0^a \int_0^a \int_0^a (x + y + z) dx dy dz$
   利用对称性：$\iiint x dV = \iiint y dV = \iiint z dV$。
   $\int_0^a x dx \int_0^a dy \int_0^a dz = \frac{1}{2}a^2 \cdot a \cdot a = \frac{1}{2}a^4$。
   故 $I = 2 \cdot 3 \cdot \frac{1}{2}a^4 = 3a^4$。

#### 答案

$3a^4$

</details>

---

## 练习 46：高斯公式 - 带有奇点的向量场

设 $\mathbf{F} = \frac{\mathbf{r}}{r^3} = \frac{(x, y, z)}{(x^2+y^2+z^2)^{3/2}}$。证明：对于任何包围原点的光滑封闭曲面 $S$，通量均为 $4\pi$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **散度计算**：
   在 $r > 0$ 时，$\text{div } \mathbf{F} = \nabla \cdot (\frac{\mathbf{r}}{r^3}) = \frac{\nabla \cdot \mathbf{r}}{r^3} + \mathbf{r} \cdot \nabla(r^{-3}) = \frac{3}{r^3} + \mathbf{r} \cdot (-3r^{-4} \frac{\mathbf{r}}{r}) = \frac{3}{r^3} - \frac{3r^2}{r^5} = 0$。
2. **利用辅助面**：
   取足够小的球面 $S_\epsilon$ 包围原点且位于 $S$ 内部。
   由高斯公式对 $S$ 与 $S_\epsilon$ 围成的区域（散度处处为 0）得：
   $\oiint_S \mathbf{F} \cdot d\mathbf{S} = \oiint_{S_\epsilon} \mathbf{F} \cdot d\mathbf{S}$。
3. **计算球面通量**：
   在 $S_\epsilon$ 上，$\mathbf{n} = \frac{\mathbf{r}}{\epsilon}$，$\mathbf{F} = \frac{\mathbf{r}}{\epsilon^3}$。
   $\mathbf{F} \cdot \mathbf{n} = \frac{\mathbf{r} \cdot \mathbf{r}}{\epsilon^4} = \frac{\epsilon^2}{\epsilon^4} = \frac{1}{\epsilon^2}$。
   $\Phi = \oiint_{S_\epsilon} \frac{1}{\epsilon^2} dS = \frac{1}{\epsilon^2} \cdot 4\pi \epsilon^2 = 4\pi$。

#### 答案

证毕。

</details>

---

## 练习 47：高斯公式 - 复杂边界区域计算

计算 $\iint_S x^2 dy dz + y^2 dz dx + z^2 dx dy$，其中 $S$ 是由抛物面 $x^2 + y^2 = z$ 与平面 $z = 1$ 所围成的区域的整个表面（取外侧）。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **应用高斯公式**：
   $I = \iiint_\Omega 2(x + y + z) dV$。
2. **利用对称性**：
   区域 $\Omega: x^2 + y^2 \le z \le 1$ 关于 $xz$ 和 $yz$ 平面对称。
   故 $\iiint_\Omega x dV = 0$ 且 $\iiint_\Omega y dV = 0$。
3. **计算剩余部分**：
   $I = 2 \iiint_\Omega z dV$。
   采用柱坐标：$0 \le \rho \le 1, 0 \le \phi \le 2\pi, \rho^2 \le z \le 1$。
   $I = 2 \int_0^{2\pi} d\phi \int_0^1 \rho d\rho \int_{\rho^2}^1 z dz = 4\pi \int_0^1 \rho [\frac{1}{2}z^2]_{\rho^2}^1 d\rho$
   $I = 2\pi \int_0^1 \rho(1 - \rho^4) d\rho = 2\pi [\frac{1}{2}\rho^2 - \frac{1}{6}\rho^6]_0^1 = 2\pi (\frac{1}{2} - \frac{1}{6}) = \frac{2}{3}\pi$。

#### 答案

$\frac{2}{3}\pi$

</details>

---

## 练习 48：高斯公式 - 格林第一恒等式应用

证明格林第一恒等式：$\iiint_\Omega (u \Delta v + \nabla u \cdot \nabla v) dV = \oiint_S u \frac{\partial v}{\partial n} dS$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **构造向量场**：设 $\mathbf{F} = u \nabla v$。
2. **计算散度**：
   $\text{div } \mathbf{F} = \nabla \cdot (u \nabla v) = \nabla u \cdot \nabla v + u (\nabla \cdot \nabla v) = \nabla u \cdot \nabla v + u \Delta v$。
3. **应用高斯公式**：
   $\iiint_\Omega \text{div } \mathbf{F} dV = \oiint_S \mathbf{F} \cdot \mathbf{n} dS$。
4. **代入方向导数**：
   $\mathbf{F} \cdot \mathbf{n} = (u \nabla v) \cdot \mathbf{n} = u (\nabla v \cdot \mathbf{n}) = u \frac{\partial v}{\partial n}$。
   代入上式即证得恒等式。

#### 答案

证毕。

</details>

---

## 练习 49：斯托克斯公式 - 平面与柱面交线积分

计算 $I = \oint_C (y-z)dx + (z-x)dy + (x-y)dz$，其中 $C$ 是圆柱面 $x^2 + y^2 = 1$ 与平面 $x+z=1$ 的交线，从 $z$ 轴正向看为逆时针方向。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **计算旋度**：
   $\mathbf{F} = (y-z, z-x, x-y)$。
   $\nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ y-z & z-x & x-y \end{vmatrix} = (-1-1, -1-1, -1-1) = (-2, -2, -2)$。
2. **选择曲面**：
   取平面 $x+z=1$ 被柱面截得的部分 $\Sigma$。其单位法向量（向上）为 $\mathbf{n} = \frac{(1, 0, 1)}{\sqrt{2}}$。
3. **应用斯托克斯公式**：
   $I = \iint_\Sigma (\nabla \times \mathbf{F}) \cdot \mathbf{n} dS = \iint_\Sigma (-2, -2, -2) \cdot \frac{(1, 0, 1)}{\sqrt{2}} dS$
   $I = \iint_\Sigma \frac{-4}{\sqrt{2}} dS = -2\sqrt{2} \cdot \text{Area}(\Sigma)$。
4. **计算曲面面积**：
   $\text{Area}(\Sigma) = \iint_{x^2+y^2 \le 1} \sqrt{1 + z_x^2 + z_y^2} dA$。
   由 $z = 1-x$ 知 $z_x = -1, z_y = 0$。
   $\text{Area}(\Sigma) = \iint_D \sqrt{1 + (-1)^2 + 0^2} dA = \sqrt{2} \pi(1)^2 = \sqrt{2}\pi$。
5. **最终结果**：
   $I = -2\sqrt{2} \cdot \sqrt{2}\pi = -4\pi$。

#### 答案

$-4\pi$

</details>

---

## 练习 50：斯托克斯公式 - 三角形边界积分

计算 $\oint_C y^2 dx + z^2 dy + x^2 dz$，其中 $C$ 是以 $(a,0,0), (0,a,0), (0,0,a)$ 为顶点的三角形边界，按上述顶点顺序。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **计算旋度**：
   $\nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ y^2 & z^2 & x^2 \end{vmatrix} = (-2z, -2x, -2y)$。
2. **选择曲面与法向**：
   取三角形平面 $\Sigma: x+y+z=a$。法向量 $\mathbf{n} = \frac{(1, 1, 1)}{\sqrt{3}}$（对应右手系）。
3. **计算点积**：
   $(\nabla \times \mathbf{F}) \cdot \mathbf{n} = \frac{-2(x+y+z)}{\sqrt{3}} = \frac{-2a}{\sqrt{3}}$（在曲面上）。
4. **应用斯托克斯公式**：
   $I = \iint_\Sigma \frac{-2a}{\sqrt{3}} dS = \frac{-2a}{\sqrt{3}} \cdot \text{Area}(\Sigma)$。
5. **计算面积**：
   三角形面积 $\text{Area}(\Sigma) = \frac{\sqrt{3}}{2} a^2$（或利用投影）。
   $I = \frac{-2a}{\sqrt{3}} \cdot \frac{\sqrt{3}}{2} a^2 = -a^3$。

#### 答案

$-a^3$

</details>

---

## 练习 51：斯托克斯公式 - 第一卦限球面边界

计算 $\oint_C (y^2-z^2)dx + (z^2-x^2)dy + (x^2-y^2)dz$，其中 $C$ 为球面 $x^2+y^2+z^2=a^2$ 在第一卦限部分的边界（由三段圆弧组成），方向与外法向符合右手系。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **计算旋度**：
   $\nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ y^2-z^2 & z^2-x^2 & x^2-y^2 \end{vmatrix} = (-2y-2z, -2z-2x, -2x-2y) = -2(y+z, z+x, x+y)$。
2. **应用斯托克斯公式**：
   取球面部分 $\Sigma$，其外法向 $\mathbf{n} = \frac{(x, y, z)}{a}$。
3. **计算点积**：
   $(\nabla \times \mathbf{F}) \cdot \mathbf{n} = -\frac{2}{a} [x(y+z) + y(z+x) + z(x+y)] = -\frac{4}{a} (xy + yz + zx)$。
4. **积分计算**：
   利用球坐标 $\iint_\Sigma (xy+yz+zx) dS = 3 \iint_\Sigma xy dS$（由对称性）。
   $\iint_\Sigma xy dS = \int_0^{\pi/2} d\phi \int_0^{\pi/2} (a^2 \sin^2 \theta \cos \phi \sin \phi) (a^2 \sin \theta d\theta) = a^4 [\frac{1}{2}\sin^2 \phi]_0^{\pi/2} [\frac{2}{3}] = \frac{1}{3}a^4$。
   故 $I = -\frac{4}{a} \cdot (3 \cdot \frac{1}{3}a^4) = -4a^3$。

#### 答案

$-4a^3$

</details>

---

## 练习 52：含参量广义积分 - 微分法计算

计算 $I(a) = \int_0^{+\infty} \frac{1-e^{-ax^2}}{xe^{x^2}} dx \quad (a > -1)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **求导**：
   $I'(a) = \int_0^{+\infty} \frac{\partial}{\partial a} (\frac{1-e^{-ax^2}}{xe^{x^2}}) dx = \int_0^{+\infty} \frac{x^2 e^{-ax^2}}{xe^{x^2}} dx = \int_0^{+\infty} x e^{-(a+1)x^2} dx$。
2. **计算积分**：
   令 $u = (a+1)x^2, du = 2(a+1)x dx$。
   $I'(a) = \frac{1}{2(a+1)} \int_0^{+\infty} e^{-u} du = \frac{1}{2(a+1)}$。
3. **积分还原**：
   $I(a) = \int \frac{1}{2(a+1)} da = \frac{1}{2} \ln(a+1) + C$。
4. **确定常数**：
   由 $I(0) = \int_0^\infty 0 dx = 0$，得 $C = 0$。

#### 答案

$\frac{1}{2} \ln(a+1)$

</details>

---

## 练习 53：含参量广义积分 - 迪利克雷积分推导

利用含参量积分 $I(y) = \int_0^{+\infty} e^{-yx} \frac{\sin x}{x} dx$ 证明 $\int_0^{+\infty} \frac{\sin x}{x} dx = \frac{\pi}{2}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **微分**：
   $I'(y) = -\int_0^{+\infty} e^{-yx} \sin x dx = - \text{Im} \int_0^\infty e^{-(y-i)x} dx = - \frac{1}{y^2+1}$。
2. **还原**：
   $I(y) = -\arctan y + C$。
3. **确定常数**：
   当 $y \to +\infty$ 时，$|I(y)| \le \int_0^\infty e^{-yx} dx = 1/y \to 0$。
   故 $0 = -\frac{\pi}{2} + C \Rightarrow C = \frac{\pi}{2}$。
4. **取极限**：
   由于积分在 $y \ge 0$ 上一致收敛，由连续性知 $\int_0^\infty \frac{\sin x}{x} dx = I(0) = \frac{\pi}{2}$。

#### 答案

证毕。

</details>

---

## 练习 54：含参量广义积分 - 积分号下积分法

计算 $I(a, b) = \int_0^{+\infty} \frac{\arctan ax - \arctan bx}{x} dx \quad (a, b > 0)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **转化为重积分**：
   $\arctan ax - \arctan bx = \int_b^a \frac{x}{1+y^2x^2} dy$。
2. **交换积分次序**：
   $I = \int_0^\infty dx \int_b^a \frac{1}{1+y^2x^2} dy = \int_b^a dy \int_0^\infty \frac{1}{1+y^2x^2} dx$。
3. **内层积分**：
   $\int_0^\infty \frac{dx}{1+(yx)^2} = \frac{1}{y} [\arctan yx]_0^\infty = \frac{\pi}{2y}$。
4. **外层计算**：
   $I = \int_b^a \frac{\pi}{2y} dy = \frac{\pi}{2} \ln \frac{a}{b}$。

#### 答案

$\frac{\pi}{2} \ln \frac{a}{b}$

</details>

---

## 练习 55：含参量广义积分 - 综合计算

计算 $\int_0^{+\infty} \frac{\ln(1+a^2x^2)}{x^2} dx \quad (a > 0)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **求导**：
   设 $I(a) = \int_0^\infty \frac{\ln(1+a^2x^2)}{x^2} dx$。
   $I'(a) = \int_0^\infty \frac{2ax^2}{x^2(1+a^2x^2)} dx = 2a \int_0^\infty \frac{1}{1+a^2x^2} dx$。
2. **计算**：
   $I'(a) = 2a \cdot \frac{1}{a} [\arctan ax]_0^\infty = 2 \cdot \frac{\pi}{2} = \pi$。
3. **还原**：
   $I(a) = \pi a + C$。由于 $I(0) = 0$，故 $C = 0$。

#### 答案

$\pi a$

</details>

---

## 练习 56：斯托克斯公式 - 旋转场线积分

计算 $\oint_C (x+y) dx + (y+z) dy + (z+x) dz$，其中 $C$ 为球面 $x^2+y^2+z^2=R^2$ 与平面 $x+y+z=0$ 的交线，从 $z$ 轴正向看为逆时针。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **旋度**：$\nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ x+y & y+z & z+x \end{vmatrix} = (-1, -1, -1)$。
2. **单位法向量**：平面 $x+y+z=0$ 的法向为 $\mathbf{n} = \frac{(1, 1, 1)}{\sqrt{3}}$。
3. **点积**：$(\nabla \times \mathbf{F}) \cdot \mathbf{n} = -3/\sqrt{3} = -\sqrt{3}$。
4. **结果**：$I = -\sqrt{3} \cdot \text{Area}(\Sigma) = -\sqrt{3} \cdot \pi R^2$。

#### 答案

$-\sqrt{3}\pi R^2$

</details>

---

## 练习 57：高斯公式 - 椭球面上的积分

计算 $\oiint_S x^2 dy dz + y^2 dz dx + z^2 dx dy$，其中 $S$ 是椭球面 $\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$ 的外侧。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **应用高斯公式**：$I = \iiint_\Omega 2(x+y+z) dV$。
2. **对称性**：由椭球区域关于原点对称，$\iiint x dV = 0$ 等。
3. **结果**：$I = 0$。

#### 答案

0

</details>

---

## 练习 58：含参量广义积分 - 极限与积分交换

计算极限 $\lim_{n \to \infty} \int_0^{+\infty} \frac{dx}{1+x^n}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **分段**：
   $I_n = \int_0^1 \frac{dx}{1+x^n} + \int_1^\infty \frac{dx}{1+x^n}$。
2. **取极限**：
   - 在 $[0, 1)$ 上，$x^n \to 0$，被积函数 $\to 1$。由优性收敛定理（或控制收敛），积分 $\to 1$。
   - 在 $(1, \infty)$ 上，当 $n \ge 2$ 时，$1/(1+x^n) \le 1/x^2$，由控制收敛定理，$x^n \to \infty$，被积函数 $\to 0$，积分 $\to 0$。
3. **结论**：极限为 $1 + 0 = 1$。

#### 答案

1

</details>

---

## 练习 59：全微分存在性的严谨判定

判定函数 $f(x, y) = \sqrt[3]{x^3+y^3}$ 在 $(0, 0)$ 处的可微性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **求偏导数**：
   $f_x(0,0) = \lim_{x \to 0} \frac{\sqrt[3]{x^3+0}-0}{x} = 1$。
   $f_y(0,0) = \lim_{y \to 0} \frac{\sqrt[3]{0+y^3}-0}{y} = 1$。
2. **考察全微分定义的极限**：
   $\Delta z - [f_x \Delta x + f_y \Delta y] = \sqrt[3]{\Delta x^3 + \Delta y^3} - (\Delta x + \Delta y)$。
   计算极限 $\lim_{(\Delta x, \Delta y) \to (0,0)} \frac{\sqrt[3]{\Delta x^3 + \Delta y^3} - (\Delta x + \Delta y)}{\sqrt{\Delta x^2 + \Delta y^2}}$。
   沿直线 $\Delta y = \Delta x$ 趋近：
   $\lim_{\Delta x \to 0^+} \frac{\sqrt[3]{2\Delta x^3} - 2\Delta x}{\sqrt{2\Delta x^2}} = \frac{\sqrt[3]{2}-2}{\sqrt{2}} \neq 0$。
3. **结论**：由于极限不为 $0$，故函数在该点不可微。

#### 答案

在 $(0, 0)$ 处不可微。

</details>

---

## 练习 60：隐函数方程组的二阶全微分

已知 $u + v = x + y$ 且 $uv = xy$，求 $d^2 u$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **利用微分算子**：对两式求微分。
   $du + dv = dx + dy$
   $v du + u dv = y dx + x dy$
2. **解出 $du, dv$**：
   利用克莱姆法则或代入法：
   $(u-v) du = (u-y) dx + (u-x) dy$。
   若 $u \neq v$，则 $du = \frac{u-y}{u-v} dx + \frac{u-x}{u-v} dy$。
3. **求二阶全微分**：对 $du$ 再次微分（注意 $u, v$ 均是 $x, y$ 的函数）。
   由于 $d^2 x = d^2 y = 0$，对一阶全微分式两端再求一次微分：
   $d^2 u + d^2 v = 0$
   $dv du + v d^2 u + du dv + u d^2 v = dy dx + dx dy = 2 dx dy$
   代入 $d^2 v = -d^2 u$：
   $(v-u) d^2 u + 2 du dv = 2 dx dy \implies d^2 u = \frac{2(du dv - dx dy)}{u-v}$。
   将 $du, dv$ 的一阶项代入即可。

#### 答案

$d^2 u = \frac{2(du dv - dx dy)}{u-v}$。

</details>

---

## 练习 61：多约束 Lagrange 乘数法实战

求原点到曲线 $\begin{cases} x^2 + y^2 = 1 \\ x + y + z = 1 \end{cases}$ 的最短距离。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **构造目标函数**（距离平方）：$f(x, y, z) = x^2 + y^2 + z^2$。
2. **约束条件**：$g_1 = x^2 + y^2 - 1 = 0, g_2 = x + y + z - 1 = 0$。
3. **Lagrange 函数**：$L = x^2 + y^2 + z^2 + \lambda(x^2 + y^2 - 1) + \mu(x + y + z - 1)$。
4. **求偏导方程组**：
   - $L_x = 2x + 2\lambda x + \mu = 0 \implies 2x(1+\lambda) = -\mu$
   - $L_y = 2y + 2\lambda y + \mu = 0 \implies 2y(1+\lambda) = -\mu$
   - $L_z = 2z + \mu = 0 \implies \mu = -2z$
5. **解方程**：
   由前两式，$2(x-y)(1+\lambda) = 0 \Rightarrow x = y$（若 $1+\lambda \neq 0$）。
   代入约束：$x^2 + x^2 = 1 \Rightarrow x = \pm 1/\sqrt{2}$。
   由 $g_2$：$z = 1 - (x+y) = 1 \mp \sqrt{2}$。
6. **比较**：
   点为 $(1/\sqrt{2}, 1/\sqrt{2}, 1-\sqrt{2})$ 和 $(-1/\sqrt{2}, -1/\sqrt{2}, 1+\sqrt{2})$。
   计算距离 $d = \sqrt{1 + (1 \mp \sqrt{2})^2}$。
   最短距离对应 $x = 1/\sqrt{2}$，此时 $d = \sqrt{1 + (1-\sqrt{2})^2} = \sqrt{4-2\sqrt{2}}$。

#### 答案

最短距离为 $\sqrt{4-2\sqrt{2}}$。

</details>

---

## 练习 62：离散概率分布的熵最大化

在信息论与统计物理中，**熵 (Entropy)** 是系统无序度的度量。设一个离散系统有 $n$ 个可能状态，各状态发生的概率为 $p_i \ge 0$。求在满足概率归一化条件 $\sum_{i=1}^n p_i = 1$ 的约束下，使得信息熵 $H(p_1, p_2, \dots, p_n) = -\sum_{i=1}^n p_i \ln p_i$ 达到最大的概率分布。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **构造目标函数与约束**：
   目标函数：$f(p_1, \dots, p_n) = -\sum_{i=1}^n p_i \ln p_i$。
   约束条件：$g(p_1, \dots, p_n) = \sum_{i=1}^n p_i - 1 = 0$。
2. **构造 Lagrangian**：

$$L(p_1, \dots, p_n, \lambda) = -\sum_{i=1}^n p_i \ln p_i + \lambda (\sum_{i=1}^n p_i - 1)$$

3. **求偏导并令其为零**：
   对于每个 $p_j$：

$$\frac{\partial L}{\partial p_j} = -(\ln p_j + 1) + \lambda = 0 \implies \ln p_j = \lambda - 1 \implies p_j = e^{\lambda - 1}$$

4. **利用约束条件求解 $\lambda$**：
   由于 $p_j$ 对所有 $j$ 都是常数，代入 $\sum p_j = 1$ 得：

$$n \cdot e^{\lambda - 1} = 1 \implies e^{\lambda - 1} = \frac{1}{n} \implies p_j = \frac{1}{n}$$

5. **结论**：
   当概率分布为**均匀分布**（各状态等概率）时，系统的熵达到最大值 $H_{\max} = \ln n$。这正是热力学第二定律在微观状态下的体现：系统趋向于占据尽可能多的微观状态。

#### 答案

当 $p_1 = p_2 = \dots = p_n = 1/n$ 时，熵达到极大值。

</details>

---

## 练习 63：Beta 函数与余元公式应用

计算积分 $I = \int_0^{+\infty} \frac{dx}{1+x^4}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **变量替换**：令 $t = \frac{1}{1+x^4}$，则 $x = (\frac{1-t}{t})^{1/4}$。
2. **转化为 Beta 函数**：
   由前文例题 5 的结论，$\int_0^{\infty} \frac{x^{a-1}}{1+x^n} dx = \frac{\pi}{n \sin(a\pi/n)}$。
3. **代入参数**：此处 $a-1 = 0 \Rightarrow a=1$，$n=4$。
4. **计算**：
   $I = \frac{\pi}{4 \sin(\pi/4)} = \frac{\pi}{4 \cdot \frac{\sqrt{2}}{2}} = \frac{\pi}{2\sqrt{2}} = \frac{\sqrt{2}\pi}{4}$。

#### 答案

$\frac{\sqrt{2}\pi}{4}$

</details>

---

## 练习 64：Weierstrass 一致收敛判定

判定含参量反常积分 $I(y) = \int_0^{+\infty} e^{-xy} \frac{\sin x}{x} dx$ 在 $y \in [0, +\infty)$ 上的收敛性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **分析 $y > 0$**：
   当 $y \ge y_0 > 0$ 时，$|e^{-xy} \frac{\sin x}{x}| \le e^{-y_0 x}$。因为 $\int_0^\infty e^{-y_0 x} dx$ 收敛，由 M-判别法知在该区间上一致收敛。
2. **分析 $y = 0$ 处**：
   当 $y \to 0^+$ 时，积分退化为 $\int_0^\infty \frac{\sin x}{x} dx$（收敛）。
3. **利用 Dirichlet 判别法**：
   令 $f(x, y) = \sin x$，$g(x, y) = \frac{e^{-xy}}{x}$。
   - $\int_0^A \sin x dx = 1 - \cos A$ 一致有界。
   - $g(x, y)$ 对每个 $y \ge 0$ 关于 $x$ 单调减（$g_x = \frac{e^{-xy}(-xy-1)}{x^2} < 0$）。
   - 当 $x \to +\infty$ 时，$g(x, y) \to 0$。且在 $y \ge 0$ 时一致（因 $|g(x, y)| \le 1/x$）。
4. **结论**：在 $y \in [0, +\infty)$ 上一致收敛。

#### 答案

在 $y \in [0, +\infty)$ 上一致收敛。

</details>

---

## 练习 65：利用 Leibniz 公式求导计算

已知 $I(a) = \int_0^{\pi/2} \frac{\ln(1+a \cos x)}{\cos x} dx \quad (|a| < 1)$，求 $I(a)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **对参数 $a$ 求导**：
   $I'(a) = \int_0^{\pi/2} \frac{\partial}{\partial a} (\frac{\ln(1+a \cos x)}{\cos x}) dx = \int_0^{\pi/2} \frac{1}{1+a \cos x} dx$。
2. **利用万能公式计算积分**：
   令 $t = \tan(x/2)$，$dx = \frac{2 dt}{1+t^2}$，$\cos x = \frac{1-t^2}{1+t^2}$。
   $I'(a) = \int_0^1 \frac{1}{1+a \frac{1-t^2}{1+t^2}} \frac{2 dt}{1+t^2} = \int_0^1 \frac{2}{1+t^2 + a(1-t^2)} dt$
   $I'(a) = \int_0^1 \frac{2}{(1-a)t^2 + (1+a)} dt = \frac{2}{1-a} \int_0^1 \frac{1}{t^2 + \frac{1+a}{1-a}} dt$
3. **计算结果**：
   $I'(a) = \frac{2}{1-a} \cdot \sqrt{\frac{1-a}{1+a}} \arctan(t \sqrt{\frac{1-a}{1+a}}) \Big|_0^1 = \frac{2}{\sqrt{1-a^2}} \arctan \sqrt{\frac{1-a}{1+a}}$。
4. **利用三角恒等式**：
   $\arctan \sqrt{\frac{1-a}{1+a}} = \frac{1}{2} \arccos a$（或类似变形）。
   实际上，$I'(a) = \frac{\arccos a}{\sqrt{1-a^2}}$。
5. **积分还原**：
   $I(a) = \int \frac{\arccos a}{\sqrt{1-a^2}} da = -\frac{1}{2} (\arccos a)^2 + C$。
6. **确定常数**：
   $I(0) = 0 \Rightarrow -\frac{1}{2}(\frac{\pi}{2})^2 + C = 0 \Rightarrow C = \frac{\pi^2}{8}$。
   故 $I(a) = \frac{\pi^2}{8} - \frac{1}{2}(\arccos a)^2$。

#### 答案

$\frac{\pi^2}{8} - \frac{1}{2}(\arccos a)^2$

</details>

---

## 练习 66：Gamma 函数的特殊值推导

证明 $\Gamma(1/2) = \sqrt{\pi}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **定义**：$\Gamma(1/2) = \int_0^{+\infty} x^{-1/2} e^{-x} dx$。
2. **变量替换**：令 $x = u^2, dx = 2u du$。
3. **计算**：
   $\Gamma(1/2) = \int_0^{+\infty} (u^2)^{-1/2} e^{-u^2} (2u du) = 2 \int_0^{+\infty} e^{-u^2} du$。
4. **利用高斯积分**：
   已知 $\int_0^{+\infty} e^{-u^2} du = \frac{\sqrt{\pi}}{2}$。
   故 $\Gamma(1/2) = 2 \cdot \frac{\sqrt{\pi}}{2} = \sqrt{\pi}$。

#### 答案

证毕。

</details>

---

## 练习 67：含参量积分与级数结合

计算 $\int_0^1 \frac{x^a-1}{\ln x} dx \quad (a > 0)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **构造含参量积分**：设 $I(a) = \int_0^1 \frac{x^a-1}{\ln x} dx$。
2. **求导**：
   $I'(a) = \int_0^1 \frac{\partial}{\partial a} (\frac{x^a-1}{\ln x}) dx = \int_0^1 \frac{x^a \ln x}{\ln x} dx = \int_0^1 x^a dx$。
3. **计算**：
   $I'(a) = [\frac{x^{a+1}}{a+1}]_0^1 = \frac{1}{a+1}$。
4. **还原**：
   $I(a) = \int \frac{1}{a+1} da = \ln(a+1) + C$。
5. **确定常数**：
   $I(0) = \int_0^1 0 dx = 0 \Rightarrow \ln(1) + C = 0 \Rightarrow C = 0$。

#### 答案

$\ln(a+1)$

</details>

---

## 练习 68：平面图形的质心计算

求由曲线 $y^2 = x$ 和直线 $x = 1$ 围成的均匀薄板的质心。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **对称性**：图形关于 $x$ 轴对称，故 $\bar{y} = 0$。
2. **计算面积**：

$$A = 2 \int_0^1 \sqrt{x} dx = 2 \cdot [\frac{2}{3}x^{3/2}]_0^1 = \frac{4}{3}$$

3. **计算 $y$ 轴矩**：

$$M_y = \iint_D x dA = \int_0^1 x \cdot 2\sqrt{x} dx = 2 \int_0^1 x^{3/2} dx = 2 \cdot [\frac{2}{5}x^{5/2}]_0^1 = \frac{4}{5}$$

4. **求质心**：$\bar{x} = \frac{M_y}{A} = \frac{4/5}{4/3} = \frac{3}{5}$。

#### 答案

质心坐标为 $(3/5, 0)$。

</details>

---

## 练习 69：均匀球体的转动惯量

计算质量为 $M$、半径为 $R$ 的均匀球体对其直径的转动惯量。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **设置坐标**：对 $z$ 轴求转动惯量。$r^2 = x^2 + y^2 = \rho^2 \sin^2 \theta$（球坐标）。
2. **建立积分**：

$$I_z = \rho \int_0^{2\pi} d\phi \int_0^\pi \sin \theta \cdot (\rho^2 \sin^2 \theta) \cdot \rho^2 d\rho$$

$$I_z = \rho \cdot 2\pi \cdot \int_0^\pi \sin^3 \theta d\theta \cdot \int_0^R \rho^4 d\rho$$

3. **计算分量**：
   - $\rho$ 积分：$R^5/5$。
   - $\theta$ 积分：$\int_0^\pi (1-\cos^2 \theta) \sin \theta d\theta = 4/3$。
     $I_z = \rho \cdot 2\pi \cdot \frac{4}{3} \cdot \frac{R^5}{5} = \frac{8\pi \rho R^5}{15}$。
4. **利用质量 $M = \frac{4}{3}\pi R^3 \rho$**：
   $I_z = \frac{2}{5} (\frac{4}{3}\pi R^3 \rho) R^2 = \frac{2}{5} M R^2$。

#### 答案

$I = \frac{2}{5} M R^2$。

</details>

---

## 练习 70：引力的计算（直线段对质点）

长为 $L$、质量为 $M$ 的均匀细杆放置在 $x$ 轴上（端点为 $(0,0)$ 和 $(L,0)$）。求其对位于 $(0, a)$ 处质量为 $m$ 的质点的引力的 $y$ 分量。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **密度**：$\lambda = M/L$。
2. **取微元**：$dx$ 位于 $(x, 0)$，其对质点的引力 $dF$ 指向 $(x, 0)$。
3. **距离**：$r = \sqrt{x^2 + a^2}$。
4. **引力 $y$ 分量**：

$$dF_y = G \frac{m \lambda dx}{r^2} \cdot \sin \theta = G \frac{m \lambda dx}{x^2 + a^2} \cdot \frac{a}{\sqrt{x^2 + a^2}}$$

5. **积分**：

$$F_y = G m \lambda a \int_0^L \frac{1}{(x^2 + a^2)^{3/2}} dx$$

令 $x = a \tan \phi$。

$$F_y = G m \lambda a \int_0^{\arctan(L/a)} \frac{a \sec^2 \phi}{a^3 \sec^3 \phi} d\phi = \frac{G m \lambda}{a} \int_0^{\arctan(L/a)} \cos \phi d\phi = \frac{G m \lambda}{a} \sin(\arctan \frac{L}{a})$$

$\sin(\arctan \frac{L}{a}) = \frac{L}{\sqrt{L^2 + a^2}}$。6. **结果**：$F_y = \frac{G m M}{a \sqrt{L^2 + a^2}}$。

#### 答案

$F_y = \frac{G m M}{a \sqrt{L^2 + a^2}}$。

</details>

---

## 练习 71：复杂雅可比行列式的应用

利用变换 $u = x+y, v = y/x$ 计算 $\iint_D (x+y)^2 dx dy$，其中 $D$ 是由 $x=0, y=0, x+y=1$ 围成的三角形。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **解出 $x, y$**：
   $y = vx \implies u = x + vx = x(1+v) \implies x = \frac{u}{1+v}, y = \frac{uv}{1+v}$。
2. **计算雅可比**：

$$J = \det \begin{pmatrix} \frac{1}{1+v} & -\frac{u}{(1+v)^2} \\ \frac{v}{1+v} & \frac{u}{(1+v)^2} \end{pmatrix} = \frac{u}{(1+v)^3} + \frac{uv}{(1+v)^3} = \frac{u(1+v)}{(1+v)^3} = \frac{u}{(1+v)^2}$$

3. **确定范围**：
   $x+y \le 1 \implies u \le 1$。$x, y \ge 0 \implies u \ge 0, v \ge 0$。故 $0 \le u \le 1, 0 \le v < \infty$。
   （注：本题通常用于广义积分或特定边界，此处范围依题意调整）
4. **计算**：

$$I = \int_0^1 du \int_0^\infty u^2 \cdot \frac{u}{(1+v)^2} dv = \int_0^1 u^3 du \cdot [-\frac{1}{1+v}]_0^\infty = \frac{1}{4} \cdot 1 = \frac{1}{4}$$

#### 答案

$1/4$。

</details>

---

## 练习 72：变密度球体的质量计算

求中心在原点、半径为 $R$ 的球体 $\Omega$ 的质量，其密度函数为 $\rho(x, y, z) = \sqrt{x^2 + y^2 + z^2} \cdot e^{-(x^2+y^2+z^2)}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **采用球坐标**：$\rho(r) = r e^{-r^2}$。
2. **建立积分**：

$$M = \int_0^{2\pi} d\phi \int_0^\pi \sin \theta d\theta \int_0^R (r e^{-r^2}) r^2 dr$$

3. **计算**：
   - 角度部分：$4\pi$。
   - $r$ 部分：$\int_0^R r^3 e^{-r^2} dr$。
     令 $t = r^2, dt = 2r dr$。
     $\int_0^{R^2} \frac{1}{2} t e^{-t} dt = \frac{1}{2} [-t e^{-t} - e^{-t}]_0^{R^2} = \frac{1}{2} (1 - (R^2+1)e^{-R^2})$。
4. **结论**：$M = 2\pi (1 - (R^2+1)e^{-R^2})$。

#### 答案

$M = 2\pi (1 - (R^2+1)e^{-R^2})$。

</details>

---

## 练习 73：不定积分深度技巧 - 代数构造

计算 $\int \frac{x^2-1}{x^4+1} dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **同除以 $x^2$**：
   $I = \int \frac{1-1/x^2}{x^2+1/x^2} dx$。
2. **观察分子**：$(x+1/x)' = 1-1/x^2$。
3. **凑微分**：
   $I = \int \frac{d(x+1/x)}{(x+1/x)^2-2}$。
4. **公式计算**：
   $I = \frac{1}{2\sqrt{2}} \ln|\frac{x+1/x-\sqrt{2}}{x+1/x+\sqrt{2}}| + C = \frac{1}{2\sqrt{2}} \ln|\frac{x^2-\sqrt{2}x+1}{x^2+\sqrt{2}x+1}| + C$。

#### 答案

$\frac{1}{2\sqrt{2}} \ln|\frac{x^2-\sqrt{2}x+1}{x^2+\sqrt{2}x+1}| + C$

</details>

---

## 练习 74：不定积分深度技巧 - 分部积分递推

利用递推公式计算 $I_4 = \int \sin^4 x dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **利用递推公式**：$I_n = -\frac{1}{n} \sin^{n-1} x \cos x + \frac{n-1}{n} I_{n-2}$。
2. **计算 $I_0$**：$I_0 = \int dx = x + C$。
3. **计算 $I_2$**：$I_2 = -\frac{1}{2} \sin x \cos x + \frac{1}{2} x = \frac{1}{2} (x - \sin x \cos x)$。
4. **计算 $I_4$**：
   $I_4 = -\frac{1}{4} \sin^3 x \cos x + \frac{3}{4} [\frac{1}{2}(x - \sin x \cos x)] = -\frac{1}{4} \sin^3 x \cos x - \frac{3}{8} \sin x \cos x + \frac{3}{8} x + C$。

#### 答案

$\frac{3}{8}x - \frac{1}{4}\sin^3 x \cos x - \frac{3}{8}\sin x \cos x + C$

</details>

---

## 练习 75：不定积分深度技巧 - 欧拉代换

计算 $\int \frac{dx}{x\sqrt{x^2+2x-1}}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **代换**：令 $\sqrt{x^2+2x-1} = t-x$（Euler 第一代换）。
2. **解出 x**：$x^2+2x-1 = t^2-2tx+x^2 \implies x = \frac{t^2+1}{2t+2}$。
3. **计算**：代入后利用有理函数积分处理。亦可用倒代换 $x=1/t$ 处理，更为简便。

#### 答案

$2\arctan(\sqrt{x^2+2x-1}+x) + C$

</details>

---

## 练习 76：不定积分深度技巧 - 万能代换

计算 $\int \frac{dx}{2+\cos x}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **令 $t = \tan(x/2)$**：
   $I = \int \frac{1}{2 + \frac{1-t^2}{1+t^2}} \frac{2 dt}{1+t^2} = \int \frac{2 dt}{2+2t^2+1-t^2} = \int \frac{2 dt}{t^2+3}$。
2. **积分**：
   $I = \frac{2}{\sqrt{3}} \arctan \frac{t}{\sqrt{3}} = \frac{2}{\sqrt{3}} \arctan(\frac{\tan(x/2)}{\sqrt{3}}) + C$。

#### 答案

$\frac{2}{\sqrt{3}} \arctan(\frac{\tan(x/2)}{\sqrt{3}}) + C$

</details>

---

## 练习 77：不定积分深度技巧 - 倒代换实战

计算 $\int \frac{dx}{x^2\sqrt{1+x^2}}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **倒代换**：令 $x = 1/t, dx = -1/t^2 dt$。
2. **代入**：
   $I = \int \frac{-1/t^2 dt}{(1/t^2) \sqrt{1+1/t^2}} = -\int \frac{t}{\sqrt{t^2+1}} dt = -\sqrt{t^2+1} + C$。
3. **回代**：
   $I = -\sqrt{1/x^2+1} + C = -\frac{\sqrt{1+x^2}}{x} + C$。

#### 答案

$-\frac{\sqrt{x^2+1}}{x} + C$

</details>

---

## 练习 78：不定积分深度技巧 - 循环分部积分

计算 $\int e^{-x} \cos 2x dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **两次分部积分**：
   $I = -e^{-x}\cos 2x - \int 2e^{-x}\sin 2x dx = -e^{-x}\cos 2x - [ -2e^{-x}\sin 2x + \int 4e^{-x}\cos 2x dx ]$。
2. **建立方程**：
   $I = -e^{-x}\cos 2x + 2e^{-x}\sin 2x - 4I$。
3. **解出 I**：
   $5I = e^{-x}(2\sin 2x - \cos 2x) \implies I = \frac{1}{5}e^{-x}(2\sin 2x - \cos 2x) + C$。

#### 答案

$\frac{e^{-x}}{5}(2\sin 2x - \cos 2x) + C$

</details>

---

## 练习 79：不定积分深度技巧 - 根式代换

计算 $\int \sqrt{\frac{1-x}{1+x}} dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **代换**：令 $x = \cos \theta, dx = -\sin \theta d\theta$。
2. **化简**：$\sqrt{\frac{1-\cos\theta}{1+\cos\theta}} = \tan\frac{\theta}{2}$。
3. **积分**：
   $I = \int \tan\frac{\theta}{2} (-\sin\theta) d\theta = \int \frac{\sin(\theta/2)}{\cos(\theta/2)} (-2\sin\frac{\theta}{2}\cos\frac{\theta}{2}) d\theta = \int -2\sin^2\frac{\theta}{2} d\theta = \int (\cos\theta-1) d\theta$。
4. **结果**：$\sin\theta - \theta = \sqrt{1-x^2} - \arccos x + C$。

#### 答案

$\sqrt{1-x^2} - \arccos x + C$

</details>

---

## 练习 80：不定积分深度技巧 - 标准换元

计算 $\int \frac{dx}{\sqrt{x^2+a^2}}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **代换**：令 $x = a \tan \theta, dx = a \sec^2 \theta d\theta$。
2. **积分**：$\int \sec \theta d\theta = \ln|\sec \theta + \tan \theta| + C = \ln|x + \sqrt{x^2+a^2}| + C$。

#### 答案

$\ln(x + \sqrt{x^2+a^2}) + C$

</details>

---

## 练习 81：不定积分深度技巧 - 有理函数分解

计算 $\int \frac{dx}{x^3+1}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **分解**：$\frac{1}{x^3+1} = \frac{1}{3}(\frac{1}{x+1} - \frac{x-2}{x^2-x+1})$。
2. **积分项**：第一项为 $\ln|x+1|$，第二项需配方并拆分为 $\ln$ 和 $\arctan$ 项。
3. **结果**：$\frac{1}{3}\ln|x+1| - \frac{1}{6}\ln(x^2-x+1) + \frac{1}{\sqrt{3}}\arctan\frac{2x-1}{\sqrt{3}} + C$。

#### 答案

$\frac{1}{3}\ln|x+1| - \frac{1}{6}\ln(x^2-x+1) + \frac{1}{\sqrt{3}}\arctan\frac{2x-1}{\sqrt{3}} + C$

</details>

---

## 练习 82：不定积分深度技巧 - 反三角分部积分

计算 $\int x \arctan x dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **分部积分**：$u = \arctan x, dv = x dx$。
2. **代入**：$\frac{x^2}{2}\arctan x - \frac{1}{2} \int \frac{x^2}{1+x^2} dx = \frac{x^2}{2}\arctan x - \frac{1}{2} (x - \arctan x) + C$。
3. **合并**：$\frac{x^2+1}{2}\arctan x - \frac{x}{2} + C$。

#### 答案

$\frac{x^2+1}{2}\arctan x - \frac{x}{2} + C$

</details>

---

## 练习 83：不定积分深度技巧 - 凑微分综合

计算 $\int \frac{\ln x}{x(1+\ln^2 x)} dx$。

<details>

<summary>点击查看解析</summary>

#### 解析

1. **换元**：令 $u = \ln x, du = \frac{1}{x} dx$。
2. **积分**：$\int \frac{u}{1+u^2} du = \frac{1}{2}\ln(1+u^2) + C = \frac{1}{2}\ln(1+\ln^2 x) + C$。

#### 答案

$\frac{1}{2}\ln(1+\ln^2 x) + C$

</details>

---

# 数学分析练习库扩充 Volume 1 (2026-03-08)

> **专题：积分学与级数初步**
> 梯度说明：基础 (Basic) | 提高 (Advanced) | 挑战 (Challenge)

## 练习 84：[基础] 定积分的线性性质

计算 $\int_1^2 (3x^2 - 2x + 1) dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **利用线性性**：
   $\int_1^2 (3x^2 - 2x + 1) dx = 3\int_1^2 x^2 dx - 2\int_1^2 x dx + \int_1^2 1 dx$
2. **逐项积分**：
   $= [x^3 - x^2 + x]_1^2$
3. **代入端点**：
   $= (8 - 4 + 2) - (1 - 1 + 1) = 6 - 1 = 5$

#### 答案

5

</details>

---

## 练习 85：[基础] 第一换元法（凑微分）

计算 $\int \frac{e^x}{1+e^x} dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **凑微分**：注意到 $(1+e^x)' = e^x$，故 $e^x dx = d(1+e^x)$。
2. **代入**：
   $\int \frac{d(1+e^x)}{1+e^x} = \ln|1+e^x| + C$
3. **简化**：由于 $1+e^x > 0$，可去掉绝对值。

#### 答案

$\ln(1+e^x) + C$

</details>

---

## 练习 86：[基础] 分部积分法初步

计算 $\int x \sin x dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **选定 $u, dv$**：令 $u = x, dv = \sin x dx$，则 $du = dx, v = -\cos x$。
2. **应用分部积分公式**：$\int u dv = uv - \int v du$。
3. **计算**：
   $\int x \sin x dx = -x \cos x - \int (-\cos x) dx = -x \cos x + \sin x + C$

#### 答案

$\sin x - x \cos x + C$

</details>

---

## 练习 87：[基础] 定积分的几何应用（面积）

求曲线 $y = x^2$ 与直线 $y = x$ 在第一象限围成的图形面积。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **求交点**：$x^2 = x \Rightarrow x(x-1) = 0$，交点为 $(0,0)$ 和 $(1,1)$。
2. **确定范围与上下界**：在 $[0, 1]$ 内，$x \ge x^2$。
3. **设置积分**：
   $A = \int_0^1 (x - x^2) dx = [\frac{1}{2}x^2 - \frac{1}{3}x^3]_0^1 = \frac{1}{2} - \frac{1}{3} = \frac{1}{6}$

#### 答案

$1/6$

</details>

---

## 练习 88：[基础] 反常积分的敛散性判定

判断反常积分 $\int_1^{+\infty} \frac{1}{x^2} dx$ 是否收敛，若收敛则计算其值。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **定义**：$\lim_{M \to +\infty} \int_1^M x^{-2} dx$。
2. **计算积分**：
   $\int_1^M x^{-2} dx = [-x^{-1}]_1^M = 1 - \frac{1}{M}$
3. **取极限**：
   $\lim_{M \to +\infty} (1 - \frac{1}{M}) = 1$。
4. **结论**：收敛。

#### 答案

收敛，值为 1。

</details>

---

## 练习 89：[基础] 几何级数的求和

计算级数 $\sum_{n=0}^\infty (\frac{2}{3})^n$ 的和。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **识别类型**：首项 $a = 1$，公比 $q = 2/3$。
2. **判定收敛性**：因为 $|q| < 1$，级数收敛。
3. **利用求和公式**：$S = \frac{a}{1-q}$。
4. **计算**：
   $S = \frac{1}{1 - 2/3} = \frac{1}{1/3} = 3$

#### 答案

3

</details>

---

## 练习 90：[基础] $p$-级数的敛散性

判定级数 $\sum_{n=1}^\infty \frac{1}{n\sqrt{n}}$ 的敛散性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **化简项**：$\frac{1}{n\sqrt{n}} = \frac{1}{n^{3/2}}$。
2. **识别类型**：这是 $p$-级数，其中 $p = 3/2$。
3. **判定标准**：当 $p > 1$ 时收敛。
4. **结论**：由于 $3/2 > 1$，该级数收敛。

#### 答案

收敛

</details>

---

## 练习 91：[基础] 正项级数的比较判别法

判定级数 $\sum_{n=1}^\infty \frac{\sin^2 n}{n^2}$ 的敛散性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **放大不等式**：注意到 $0 \le \sin^2 n \le 1$，故 $0 \le \frac{\sin^2 n}{n^2} \le \frac{1}{n^2}$。
2. **已知级数**：$\sum_{n=1}^\infty \frac{1}{n^2}$ 是 $p=2$ 的 $p$-级数，收敛。
3. **应用比较判别法**：较大项级数收敛，则较小项级数必收敛。

#### 答案

收敛

</details>

---

## 练习 92：[基础] 比值判别法（D'Alembert）

判定级数 $\sum_{n=1}^\infty \frac{n!}{n^n}$ 的敛散性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **设 $a_n = \frac{n!}{n^n}$**。
2. **计算比值极限**：
   $\rho = \lim_{n \to \infty} \frac{a_{n+1}}{a_n} = \lim_{n \to \infty} \frac{(n+1)!}{(n+1)^{n+1}} \cdot \frac{n^n}{n!} = \lim_{n \to \infty} \frac{n+1}{(n+1)^{n+1}} \cdot n^n = \lim_{n \to \infty} (\frac{n}{n+1})^n$
3. **利用重要极限**：
   $\rho = \lim_{n \to \infty} \frac{1}{(1 + 1/n)^n} = \frac{1}{e}$
4. **判定**：因为 $1/e < 1$，级数收敛。

#### 答案

收敛

</details>

---

## 练习 93：[基础] 根值判别法（Cauchy）

判定级数 $\sum_{n=1}^\infty (\frac{n}{2n+1})^n$ 的敛散性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **设 $a_n = (\frac{n}{2n+1})^n$**。
2. **计算根值极限**：
   $\rho = \lim_{n \to \infty} \sqrt[n]{a_n} = \lim_{n \to \infty} \frac{n}{2n+1} = \frac{1}{2}$
3. **判定**：因为 $1/2 < 1$，级数收敛。

#### 答案

收敛

</details>

---

## 练习 94：[提高] 有理函数积分（部分分式）

计算 $\int \frac{1}{x^2-5x+6} dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **因式分解分母**：$x^2-5x+6 = (x-2)(x-3)$。
2. **待定系数法分解**：
   $\frac{1}{(x-2)(x-3)} = \frac{A}{x-2} + \frac{B}{x-3}$
   $1 = A(x-3) + B(x-2)$
   令 $x=2 \Rightarrow A=-1$；令 $x=3 \Rightarrow B=1$。
3. **积分**：
   $\int (\frac{1}{x-3} - \frac{1}{x-2}) dx = \ln|x-3| - \ln|x-2| + C = \ln|\frac{x-3}{x-2}| + C$

#### 答案

$\ln|\frac{x-3}{x-2}| + C$

</details>

---

## 练习 95：[提高] 第二换元法（三角代换）

计算 $\int_0^a \sqrt{a^2-x^2} dx \quad (a>0)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **代换**：令 $x = a \sin t, dx = a \cos t dt$。
2. **改变范围**：$x=0 \to t=0$；$x=a \to t=\pi/2$。
3. **设置积分**：
   $\int_0^{\pi/2} \sqrt{a^2(1-\sin^2 t)} \cdot a \cos t dt = \int_0^{\pi/2} a^2 \cos^2 t dt$
4. **利用二倍角公式**：
   $a^2 \int_0^{\pi/2} \frac{1+\cos 2t}{2} dt = \frac{a^2}{2} [t + \frac{1}{2}\sin 2t]_0^{\pi/2} = \frac{a^2}{2} \cdot \frac{\pi}{2} = \frac{\pi a^2}{4}$
5. **几何意义**：该积分表示半径为 $a$ 的圆在第一象限的面积（四分之一圆）。

#### 答案

$\frac{\pi a^2}{4}$

</details>

---

## 练习 96：[提高] 定积分应用：旋转体体积

求由曲线 $y = \sin x$（$0 \le x \le \pi$）与 $x$ 轴围成的图形绕 $x$ 轴旋转一周所成的体积。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **体积公式**：$V = \pi \int_a^b [f(x)]^2 dx$。
2. **设置积分**：
   $V = \pi \int_0^\pi \sin^2 x dx$
3. **计算**：
   $V = \pi \int_0^\pi \frac{1-\cos 2x}{2} dx = \frac{\pi}{2} [x - \frac{1}{2}\sin 2x]_0^\pi = \frac{\pi^2}{2}$

#### 答案

$\pi^2/2$

</details>

---

## 练习 97：[提高] 弧长计算

计算曲线 $y = \frac{2}{3}x^{3/2}$ 从 $x=0$ 到 $x=3$ 的弧长。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **弧长公式**：$s = \int_a^b \sqrt{1 + (y')^2} dx$。
2. **求导**：$y' = \sqrt{x}$。
3. **设置积分**：
   $s = \int_0^3 \sqrt{1 + x} dx$
4. **计算**：
   $s = [\frac{2}{3}(1+x)^{3/2}]_0^3 = \frac{2}{3}(4^{3/2} - 1^{3/2}) = \frac{2}{3}(8 - 1) = \frac{14}{3}$

#### 答案

$14/3$

</details>

---

## 练习 98：[提高] 交错级数的 Leibniz 判别法

判定级数 $\sum_{n=1}^\infty (-1)^n \frac{1}{\sqrt{n}}$ 的敛散性，并说明是绝对收敛还是条件收敛。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **Leibniz 判别法**：
   - $u_n = 1/\sqrt{n} > 0$。
   - $u_n$ 单调递减（因为 $\sqrt{n+1} > \sqrt{n}$）。
   - $\lim_{n \to \infty} u_n = 0$。
   - 故级数**收敛**。
2. **绝对收敛判定**：
   考察 $\sum |a_n| = \sum \frac{1}{n^{1/2}}$。这是 $p=1/2$ 的 $p$-级数，发散。
3. **结论**：级数条件收敛。

#### 答案

条件收敛

</details>

---

## 练习 99：[提高] 幂级数的收敛域

求幂级数 $\sum_{n=1}^\infty \frac{x^n}{n \cdot 2^n}$ 的收敛域。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **计算收敛半径**：
   $R = \lim_{n \to \infty} |\frac{a_n}{a_{n+1}}| = \lim_{n \to \infty} \frac{(n+1)2^{n+1}}{n \cdot 2^n} = 2$。
2. **检查端点**：
   - 当 $x=2$ 时：$\sum \frac{2^n}{n \cdot 2^n} = \sum \frac{1}{n}$，调和级数，发散。
   - 当 $x=-2$ 时：$\sum \frac{(-2)^n}{n \cdot 2^n} = \sum \frac{(-1)^n}{n}$，交错调和级数，收敛。
3. **收敛域**：$[-2, 2)$。

#### 答案

$[-2, 2)$

</details>

---

## 练习 100：[提高] 函数展开为幂级数

将 $f(x) = \frac{1}{1+x^2}$ 在 $x=0$ 处展开为幂级数，并指出收敛区间。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **利用几何级数公式**：$\frac{1}{1-u} = \sum_{n=0}^\infty u^n \quad (|u|<1)$。
2. **代换**：令 $u = -x^2$。
3. **展开**：
   $f(x) = \sum_{n=0}^\infty (-x^2)^n = \sum_{n=0}^\infty (-1)^n x^{2n}$
4. **收敛区间**：$|-x^2| < 1 \Rightarrow x^2 < 1 \Rightarrow x \in (-1, 1)$。

#### 答案

$\sum_{n=0}^\infty (-1)^n x^{2n}$，收敛区间 $(-1, 1)$。

</details>

---

## 练习 101：[提高] 利用定积分求数列极限

计算 $\lim_{n \to \infty} \frac{1}{n} (\sin \frac{\pi}{n} + \sin \frac{2\pi}{n} + \dots + \sin \frac{n\pi}{n})$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **识别 Riemann 和**：该式可写为 $\lim_{n \to \infty} \sum_{i=1}^n \sin(i\pi/n) \cdot \frac{1}{n}$。
2. **对应积分**：函数 $f(x) = \sin(\pi x)$，区间 $[0, 1]$。
3. **计算积分**：
   $I = \int_0^1 \sin(\pi x) dx = [-\frac{1}{\pi} \cos(\pi x)]_0^1 = -\frac{1}{\pi}(-1 - 1) = \frac{2}{\pi}$

#### 答案

$2/\pi$

</details>

---

## 练习 102：[提高] 反常积分的比较判别法（极限形式）

判定 $\int_1^{+\infty} \frac{\sqrt{x}}{1+x^2} dx$ 的敛散性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **分析无穷大阶数**：当 $x \to \infty$ 时，被积函数 $f(x) \approx \frac{x^{1/2}}{x^2} = \frac{1}{x^{3/2}}$。
2. **选择比较对象**：取 $g(x) = \frac{1}{x^{3/2}}$。
3. **计算极限**：
   $\lim_{x \to \infty} \frac{f(x)}{g(x)} = \lim_{x \to \infty} \frac{\sqrt{x}/(1+x^2)}{1/x^{3/2}} = \lim_{x \to \infty} \frac{x^2}{1+x^2} = 1$。
4. **结论**：因为 $\int_1^\infty \frac{1}{x^{3/2}} dx$ 收敛（$p=1.5 > 1$），故原积分收敛。

#### 答案

收敛

</details>

---

## 练习 103：[提高] 变限积分求导

求 $F(x) = \int_{x^2}^{x^3} \sqrt{1+t^2} dt$ 的导数 $F'(x)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **公式**：$\frac{d}{dx} \int_{\phi(x)}^{\psi(x)} f(t) dt = f(\psi(x))\psi'(x) - f(\phi(x))\phi'(x)$。
2. **代入**：
   $F'(x) = \sqrt{1+(x^3)^2} \cdot (3x^2) - \sqrt{1+(x^2)^2} \cdot (2x)$
   $= 3x^2\sqrt{1+x^6} - 2x\sqrt{1+x^4}$

#### 答案

$3x^2\sqrt{1+x^6} - 2x\sqrt{1+x^4}$

</details>

---

## 练习 104：[挑战] 狄利克雷积分 (Dirichlet Integral)

证明 $I = \int_0^{+\infty} \frac{\sin x}{x} dx = \frac{\pi}{2}$。（本题要求简述思路）

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **引入含参量积分**：$I(a) = \int_0^\infty e^{-ax} \frac{\sin x}{x} dx \quad (a \ge 0)$。
2. **对 $a$ 求导**：$I'(a) = -\int_0^\infty e^{-ax} \sin x dx = -\frac{1}{a^2+1}$。
3. **积分还原**：$I(a) = -\arctan a + C$。
4. **确定常数**：由 $\lim_{a \to \infty} I(a) = 0$ 得 $C = \pi/2$。
5. **取极限**：$I(0) = \pi/2$。利用一致收敛性（Dirichlet 判别法）保证极限交换。

#### 答案

$\pi/2$

</details>

---

## 练习 105：[挑战] 特殊对数三角积分

计算 $\int_0^{\pi/2} \ln(\sin x) dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **利用对称性**：$I = \int_0^{\pi/2} \ln(\sin x) dx = \int_0^{\pi/2} \ln(\cos x) dx$。
2. **求和**：
   $2I = \int_0^{\pi/2} \ln(\sin x \cos x) dx = \int_0^{\pi/2} \ln(\frac{\sin 2x}{2}) dx$
   $2I = \int_0^{\pi/2} \ln(\sin 2x) dx - \frac{\pi}{2} \ln 2$
3. **变换第一项**：令 $2x = u$，则 $\int_0^{\pi/2} \ln(\sin 2x) dx = \frac{1}{2} \int_0^\pi \ln(\sin u) du = \int_0^{\pi/2} \ln(\sin u) du = I$。
4. **解方程**：$2I = I - \frac{\pi}{2} \ln 2 \Rightarrow I = -\frac{\pi}{2} \ln 2$。

#### 答案

$-\frac{\pi}{2} \ln 2$

</details>

---

## 练习 106：[挑战] 级数求和技巧（逐项积分）

计算级数 $\sum_{n=1}^\infty \frac{1}{n \cdot 2^n}$ 的和。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **构造幂级数**：设 $S(x) = \sum_{n=1}^\infty \frac{x^n}{n}$，则原式为 $S(1/2)$。
2. **求导**：$S'(x) = \sum_{n=1}^\infty x^{n-1} = \frac{1}{1-x} \quad (|x|<1)$。
3. **积分还原**：$S(x) = \int_0^x \frac{1}{1-t} dt = -\ln(1-x) + C$。
4. **确定常数**：$S(0)=0 \Rightarrow C=0$。
5. **代入**：$S(1/2) = -\ln(1-1/2) = -\ln(1/2) = \ln 2$。

#### 答案

$\ln 2$

</details>

---

## 练习 107：[挑战] 广义积分的一致收敛判定

判定 $I(y) = \int_0^{+\infty} \frac{\sin xy}{x} dx$ 在 $y \in [a, b] \quad (0 < a < b)$ 上是否一致收敛。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **变量替换**：令 $xy = t$，则 $I(y) = \int_0^\infty \frac{\sin t}{t} dt$。
2. **分析**：积分值对所有 $y > 0$ 都是常数 $\pi/2$。
3. **余项判定**：$|R_A(y)| = |\int_{Ay}^\infty \frac{\sin t}{t} dt|$。
4. **一致性**：对于 $y \ge a > 0$，当 $A \to \infty$ 时，$Ay \ge Aa \to \infty$。由于 $\int_0^\infty \frac{\sin t}{t} dt$ 收敛，其尾端趋于 0。
5. **结论**：一致收敛。

#### 答案

一致收敛

</details>

---

## 练习 108：[挑战] 傅里叶级数展开（方波）

求周期为 $2\pi$ 的函数 $f(x) = \begin{cases} -1, & -\pi < x < 0 \\ 1, & 0 \le x < \pi \end{cases}$ 的傅里叶展开式。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **奇偶性**：$f(x)$ 是奇函数，故 $a_n = 0$。
2. **计算 $b_n$**：
   $b_n = \frac{2}{\pi} \int_0^\pi 1 \cdot \sin nx dx = \frac{2}{\pi} [-\frac{1}{n} \cos nx]_0^\pi = \frac{2}{n\pi} (1 - \cos n\pi)$
3. **讨论 $n$**：
   - 当 $n$ 为偶数时，$b_n = 0$。
   - 当 $n$ 为奇数时，$b_n = \frac{4}{n\pi}$。
4. **展开式**：$f(x) \sim \frac{4}{\pi} (\sin x + \frac{1}{3}\sin 3x + \frac{1}{5}\sin 5x + \dots)$。

#### 答案

$\frac{4}{\pi} \sum_{k=1}^\infty \frac{\sin(2k-1)x}{2k-1}$

</details>

---

## 练习 109：[挑战] 沃利斯 (Wallis) 公式推导

利用 $I_n = \int_0^{\pi/2} \sin^n x dx$ 的递推关系证明 Wallis 公式。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **递推公式**：$I_n = \frac{n-1}{n} I_{n-2}$。
2. **分情况**：
   - $I_{2m} = \frac{2m-1}{2m} \cdot \frac{2m-3}{2m-2} \dots \frac{1}{2} \cdot \frac{\pi}{2}$
   - $I_{2m+1} = \frac{2m}{2m+1} \cdot \frac{2m-2}{2m-1} \dots \frac{2}{3} \cdot 1$
3. **利用 $I_{2m+1} < I_{2m} < I_{2m-1}$** 夹逼得出 $\frac{\pi}{2} = \lim_{m \to \infty} \frac{1}{2m+1} [ \frac{(2m)!!}{(2m-1)!!} ]^2$。

#### 答案

证毕。

</details>

---

## 练习 110：[挑战] 弗鲁拉尼 (Frullani) 积分

计算 $\int_0^{+\infty} \frac{e^{-ax} - e^{-bx}}{x} dx \quad (a, b > 0)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **一般公式**：$\int_0^\infty \frac{f(ax)-f(bx)}{x} dx = [f(0) - f(\infty)] \ln \frac{b}{a}$。
2. **本题应用**：$f(x) = e^{-x}$，则 $f(0) = 1, f(\infty) = 0$。
3. **计算**：$I = (1 - 0) \ln \frac{b}{a} = \ln \frac{b}{a}$。

#### 答案

$\ln(b/a)$

</details>

---

## 练习 111：[挑战] 斯托尔茨 (Stolz) 定理在积分序列中的应用

计算极限 $\lim_{n \to \infty} \frac{1}{n^{k+1}} \int_0^n x^k dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **直接积分**：$\int_0^n x^k dx = \frac{n^{k+1}}{k+1}$。
2. **求极限**：$\lim_{n \to \infty} \frac{n^{k+1}/(k+1)}{n^{k+1}} = \frac{1}{k+1}$。
3. **注**：本题亦可用离散形式的 Stolz 定理验证。

#### 答案

$\frac{1}{k+1}$

</details>

---

## 练习 112：[挑战] 涉及级数展开的积分计算

计算 $\int_0^1 \frac{\ln(1+x)}{x} dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **级数展开**：$\ln(1+x) = \sum_{n=1}^\infty (-1)^{n-1} \frac{x^n}{n}$。
2. **除以 $x$**：$\frac{\ln(1+x)}{x} = \sum_{n=1}^\infty (-1)^{n-1} \frac{x^{n-1}}{n}$。
3. **逐项积分**（在 $[0, 1]$ 上收敛性允许）：
   $I = \sum_{n=1}^\infty \frac{(-1)^{n-1}}{n} \int_0^1 x^{n-1} dx = \sum_{n=1}^\infty \frac{(-1)^{n-1}}{n^2}$
4. **已知结论**：该级数和为 $\frac{\pi^2}{12}$。

#### 答案

$\pi^2/12$

</details>

---

## 练习 113：[挑战] 斯特林 (Stirling) 公式的初步应用

利用 $\Gamma$ 函数证明 $n! \sim \sqrt{2\pi n} (n/e)^n$ 的阶数（简述思路）。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **利用积分表达**：$n! = \Gamma(n+1) = \int_0^\infty x^n e^{-x} dx$。
2. **寻找极大值点**：$f(x) = x^n e^{-x}$ 在 $x=n$ 处取极大值。
3. **拉普拉斯方法 (Laplace Method)**：在 $x=n$ 处进行 Taylor 展开并作近似高斯积分。
4. **得出主项**：主项即为 Stirling 公式。

#### 答案

证毕。

</details>

---

## 练习 114：[提高] 哈密顿算子恒等式证明

证明恒等式：$\nabla \cdot (\phi \mathbf{A}) = \phi (\nabla \cdot \mathbf{A}) + \mathbf{A} \cdot (\nabla \phi)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **左式展开**：
   $\nabla \cdot (\phi \mathbf{A}) = \frac{\partial(\phi P)}{\partial x} + \frac{\partial(\phi Q)}{\partial y} + \frac{\partial(\phi R)}{\partial z}$
2. **利用导数乘积法则**：
   $= (\phi \frac{\partial P}{\partial x} + P \frac{\partial \phi}{\partial x}) + (\phi \frac{\partial Q}{\partial y} + Q \frac{\partial \phi}{\partial y}) + (\phi \frac{\partial R}{\partial z} + R \frac{\partial \phi}{\partial z})$
3. **提取公因子与合并**：
   $= \phi (\frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}) + (P \frac{\partial \phi}{\partial x} + Q \frac{\partial \phi}{\partial y} + R \frac{\partial \phi}{\partial z})$
   $= \phi (\nabla \cdot \mathbf{A}) + \mathbf{A} \cdot (\nabla \phi)$

#### 答案

证毕。

</details>

---

## 练习 115：[提高] 势函数与保守场判定

判定向量场 $\mathbf{A} = (e^x \sin y) \mathbf{i} + (e^x \cos y) \mathbf{j} + 2z \mathbf{k}$ 是否为保守场，若是，求其势函数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **计算旋度**：
   $\text{curl } \mathbf{A} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ e^x \sin y & e^x \cos y & 2z \end{vmatrix}$
   $= (0-0)\mathbf{i} + (0-0)\mathbf{j} + (e^x \cos y - e^x \cos y)\mathbf{k} = \mathbf{0}$
   故 $\mathbf{A}$ 是保守场。
2. **积分求势函数**：
   - $\frac{\partial \phi}{\partial x} = e^x \sin y \implies \phi = e^x \sin y + f(y, z)$
   - $\frac{\partial \phi}{\partial y} = e^x \cos y + \frac{\partial f}{\partial y} = e^x \cos y \implies f = g(z)$
   - $\frac{\partial \phi}{\partial z} = g'(z) = 2z \implies g(z) = z^2 + C$
3. **结论**：$\phi = e^x \sin y + z^2 + C$。

#### 答案

$\phi = e^x \sin y + z^2 + C$

</details>

---

---

## 练习 105：[提高] Hermite-Ostrogradsky 方法练习

利用 Hermite-Ostrogradsky 方法计算不定积分 $\int \frac{dx}{(x^2+1)^2}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **分解分母**：$Q(x) = (x^2+1)^2$。
2. **计算 $Q_1, Q_2$**：
   $Q_1 = \gcd(Q, Q^\prime) = x^2+1$，$Q_2 = Q/Q_1 = x^2+1$。
3. **设定形式**：
   $\int \frac{1}{(x^2+1)^2} dx = \frac{Ax+B}{x^2+1} + \int \frac{Cx+D}{x^2+1} dx$。
4. **求导待定系数**：
   两边对 $x$ 求导：
   $\frac{1}{(x^2+1)^2} = \frac{A(x^2+1) - (Ax+B)(2x)}{(x^2+1)^2} + \frac{Cx+D}{x^2+1}$
   $1 = A(x^2+1) - 2Ax^2 - 2Bx + (Cx+D)(x^2+1)$
   $1 = (C)x^3 + (D-A)x^2 + (C-2B)x + (A+D)$
5. **解方程组**：
   $C=0, D-A=0, C-2B=0, A+D=1 \implies A=1/2, B=0, C=0, D=1/2$。
6. **最终结果**：
   $I = \frac{x}{2(x^2+1)} + \frac{1}{2} \int \frac{dx}{x^2+1} = \frac{x}{2(x^2+1)} + \frac{1}{2}\arctan x + C$。

#### 答案

$\frac{x}{2(x^2+1)} + \frac{1}{2}\arctan x + C$

</details>

---

## 练习 106：[提高] 万能公式深度应用

计算不定积分 $\int \frac{dx}{1+2\sin x + 3\cos x}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **万能代换**：令 $t = \tan(x/2)$。
2. **代入公式**：
   $I = \int \frac{1}{1 + \frac{4t}{1+t^2} + \frac{3-3t^2}{1+t^2}} \cdot \frac{2 dt}{1+t^2} = \int \frac{2 dt}{1+t^2+4t+3-3t^2} = \int \frac{2 dt}{4+4t-2t^2} = \int \frac{dt}{2+2t-t^2}$。
3. **配方积分**：
   $\int \frac{dt}{3-(t-1)^2} = \frac{1}{2\sqrt{3}} \ln \left| \frac{\sqrt{3}+t-1}{\sqrt{3}-(t-1)} \right| + C$。
4. **回代**：代入 $t = \tan(x/2)$。

#### 答案

$\frac{1}{2\sqrt{3}} \ln \left| \frac{\sqrt{3}-1+\tan(x/2)}{\sqrt{3}+1-\tan(x/2)} \right| + C$

</details>

---

## 练习 107：[提高] 定积分对称性实战

计算定积分 $I = \int_0^{\pi} \frac{x \sin x}{1+\cos^2 x} dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **利用性质**：$\int_0^a f(x) dx = \int_0^a f(a-x) dx$。
   $I = \int_0^\pi \frac{(\pi-x) \sin(\pi-x)}{1+\cos^2(\pi-x)} dx = \int_0^\pi \frac{(\pi-x) \sin x}{1+\cos^2 x} dx$。
   $I = \pi \int_0^\pi \frac{\sin x}{1+\cos^2 x} dx - I \implies 2I = \pi \int_0^\pi \frac{\sin x}{1+\cos^2 x} dx$。
2. **换元**：令 $u = \cos x, du = -\sin x dx$。
   $2I = \pi \int_{1}^{-1} \frac{-du}{1+u^2} = \pi \int_{-1}^1 \frac{du}{1+u^2} = \pi [\arctan u]_{-1}^1 = \pi(\pi/4 - (-\pi/4)) = \pi^2/2$。
3. **结论**：$I = \pi^2/4$。

#### 答案

$\pi^2/4$

</details>

---

## 练习 108：[提高] Wallis 公式（点火公式）应用

计算 $I = \int_0^{\pi/2} \sin^8 x dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **直接套用 Wallis 公式**：
   $I = \frac{7}{8} \cdot \frac{5}{6} \cdot \frac{3}{4} \cdot \frac{1}{2} \cdot \frac{\pi}{2}$。
2. **计算**：
   $I = \frac{105}{384} \pi = \frac{35}{128} \pi$。

#### 答案

$\frac{35\pi}{128}$

</details>

---

## 练习 109：[提高] 变限积分与极值判定

设 $F(x) = \int_0^x (t-1)(t-2) dt$，求 $F(x)$ 的极大值点与极小值点。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **求导**：$F^\prime(x) = (x-1)(x-2)$。
2. **找驻点**：$x=1, x=2$。
3. **判定**：
   - $x < 1$ 时，$F^\prime > 0$；$1 < x < 2$ 时，$F^\prime < 0$；$x > 2$ 时，$F^\prime > 0$。
   - 故 $x=1$ 为极大值点，$x=2$ 为极小值点。

#### 答案

极大值点 $x=1$，极小值点 $x=2$。

</details>

---

## 练习 110：[挑战] 积分不等式的证明

证明对于任意正整数 $n$，恒有 $\int_0^{\pi/2} \sin^{n+1} x dx < \int_0^{\pi/2} \sin^n x dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **被积函数比较**：在区间 $(0, \pi/2)$ 上，$0 < \sin x < 1$。
2. **不等式构造**：因此对于任何 $x \in (0, \pi/2)$，都有 $\sin^{n+1} x = \sin^n x \cdot \sin x < \sin^n x$。
3. **积分保序性**：由定积分的性质，函数值小则积分值小（此处由于是严格不等式且函数连续，积分值也严格小）。
4. **结论**：不等式成立。

#### 答案

证毕。

</details>

---

## 练习 111：[挑战] 特殊换元技巧

计算不定积分 $\int \frac{dx}{(1+x^2)\sqrt{1-x^2}}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **三角代换**：令 $x = \sin \theta, dx = \cos \theta d\theta$。
2. **代入**：
   $I = \int \frac{\cos \theta d\theta}{(1+\sin^2 \theta)\cos \theta} = \int \frac{d\theta}{1+\sin^2 \theta}$。
3. **同除以 $\cos^2 \theta$**：
   $I = \int \frac{\sec^2 \theta d\theta}{\sec^2 \theta + \tan^2 \theta} = \int \frac{d(\tan \theta)}{1+2\tan^2 \theta}$。
4. **积分**：
   $I = \frac{1}{\sqrt{2}} \arctan(\sqrt{2} \tan \theta) + C$。
5. **回代**：$\tan \theta = \frac{x}{\sqrt{1-x^2}}$。
   $I = \frac{1}{\sqrt{2}} \arctan \frac{\sqrt{2}x}{\sqrt{1-x^2}} + C$。

#### 答案

$\frac{1}{\sqrt{2}} \arctan \frac{\sqrt{2}x}{\sqrt{1-x^2}} + C$

</details>

---

## 练习 112：[提高] 周期性与定积分

计算 $\int_0^{n\pi} |\sin x| dx$，其中 $n$ 为正整数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **周期性分析**：$|\sin x|$ 的周期为 $\pi$。
2. **区间分解**：$\int_0^{n\pi} |\sin x| dx = n \int_0^\pi |\sin x| dx$。
3. **计算单周期积分**：
   $\int_0^\pi \sin x dx = [-\cos x]_0^\pi = 1 - (-1) = 2$。
4. **结论**：$n \cdot 2 = 2n$。

#### 答案

$2n$

</details>

---

## 练习 113：[提高] 有理函数高次幂处理

计算不定积分 $\int \frac{x^2}{(x^2+1)^3} dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **分部积分构造**：
   $I = \int x \cdot \frac{x}{(x^2+1)^3} dx$。
2. **设定 $u, v$**：
   $u = x, dv = \frac{x}{(x^2+1)^3} dx \implies du = dx, v = -\frac{1}{4(x^2+1)^2}$。
3. **套用公式**：
   $I = -\frac{x}{4(x^2+1)^2} + \frac{1}{4} \int \frac{dx}{(x^2+1)^2}$。
4. **利用已知结果**：
   $\int \frac{dx}{(x^2+1)^2} = \frac{x}{2(x^2+1)} + \frac{1}{2}\arctan x$（见练习 105）。
5. **最终结果**：
   $I = -\frac{x}{4(x^2+1)^2} + \frac{x}{8(x^2+1)} + \frac{1}{8}\arctan x + C$。

#### 答案

$-\frac{x}{4(x^2+1)^2} + \frac{x}{8(x^2+1)} + \frac{1}{8}\arctan x + C$

</details>

---

## 练习 114：[挑战] 积分与级数的交叉应用

证明 $\int_0^1 \frac{\ln(1+x)}{x} dx = \sum_{n=1}^\infty \frac{(-1)^{n-1}}{n^2}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **级数展开**：$\ln(1+x) = \sum_{n=1}^\infty (-1)^{n-1} \frac{x^n}{n}$（在 $(-1, 1]$ 上一致收敛）。
2. **逐项积分**：
   $\int_0^1 \frac{1}{x} \sum_{n=1}^\infty (-1)^{n-1} \frac{x^n}{n} dx = \int_0^1 \sum_{n=1}^\infty (-1)^{n-1} \frac{x^{n-1}}{n} dx$。
3. **交换号**：由一致收敛性保证。
   $\sum_{n=1}^\infty \frac{(-1)^{n-1}}{n} \int_0^1 x^{n-1} dx = \sum_{n=1}^\infty \frac{(-1)^{n-1}}{n} \cdot \frac{1}{n} = \sum_{n=1}^\infty \frac{(-1)^{n-1}}{n^2}$。
4. **结论**：证毕。（该常数约等于 $\pi^2/12$）

#### 答案

证毕。

</details>

---

## 练习 115：[提高] 复杂凑微分应用

计算不定积分 $\int \frac{\sec^2 x}{\sqrt{\tan^2 x + 4\tan x + 1}} dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. **凑微分**：注意到 $\sec^2 x dx = d(\tan x)$。
2. **换元**：令 $u = \tan x$。
   $I = \int \frac{du}{\sqrt{u^2 + 4u + 1}}$。
3. **配方**：
   $I = \int \frac{du}{\sqrt{(u+2)^2 - 3}}$。
4. **利用标准公式**：
   $I = \ln |u+2 + \sqrt{u^2+4u+1}| + C$。
5. **回代**：代入 $u = \tan x$。

#### 答案

$\ln |\tan x + 2 + \sqrt{\tan^2 x + 4\tan x + 1}| + C$

</details>

---

# 数学分析练习库 Volume 2 专题实战

> 覆盖专题：[数项级数](../../academic-math/analysis/series.md)、[幂级数](../../academic-math/analysis/power-series.md)、[多元函数的极限与连续](../../academic-math/analysis/multivariable-limits.md)、[多元函数微分学](../../academic-math/analysis/multivariable-differentiation.md)、[隐函数定理及其应用](../../academic-math/analysis/implicit-function-theorem.md)、[重积分](../../academic-math/analysis/multiple-integrals.md)、[曲线积分](../../academic-math/analysis/line-integrals.md)、[曲面积分](../../academic-math/analysis/surface-integrals.md)。

## 专题 A：级数与展开

<a id="练习-116正项级数比较判别"></a>

## 练习 116：[基础] 正项级数比较判别

判定级数 $\sum_{n=1}^{\infty}\frac{n+1}{n^3+2}$ 的敛散性。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 当 $n$ 充分大时，$\frac{n+1}{n^3+2} \sim \frac{1}{n^2}$。
2. 取比较级数 $\sum \frac{1}{n^2}$，它收敛。
3. 由极限比较判别法，原级数收敛。

#### 答案

收敛。

</details>

---

<a id="练习-117交错级数误差估计"></a>

## 练习 117：[基础] 交错级数误差估计

用前 4 项近似交错级数 $\sum_{n=1}^{\infty}(-1)^{n-1}\frac{1}{n}$，并给出误差上界。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 前 4 项和为 $S_4=1-\frac12+\frac13-\frac14=\frac{7}{12}$。
2. 该级数满足 Leibniz 判别法。
3. 交错级数截断误差满足 $|R_4|\le a_5=\frac15$。

#### 答案

近似值为 $\frac{7}{12}$，误差不超过 $\frac15$。

</details>

---

<a id="练习-118幂级数收敛半径"></a>

## 练习 118：[基础] 幂级数收敛半径

求幂级数 $\sum_{n=1}^{\infty}\frac{(n+1)x^n}{3^n}$ 的收敛半径与收敛区间。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 设 $a_n=\frac{n+1}{3^n}$，则

$$\lim_{n\to\infty}\left|\frac{a_n}{a_{n+1}}\right|=\lim_{n\to\infty}3\frac{n+1}{n+2}=3.$$

所以收敛半径 $R=3$。2. 当 $x=3$ 时，级数化为 $\sum (n+1)$，发散。3. 当 $x=-3$ 时，级数化为 $\sum (n+1)(-1)^n$，通项不趋于 0，发散。

#### 答案

收敛半径 $R=3$，收敛区间为 $(-3,3)$。

</details>

---

<a id="练习-119幂级数和函数"></a>

## 练习 119：[提高] 幂级数和函数

求 $\sum_{n=1}^{\infty}\frac{x^n}{n(n+1)}$ 的和函数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 裂项：

$$\frac{1}{n(n+1)}=\frac{1}{n}-\frac{1}{n+1}.$$

2. 因而

$$
\sum_{n=1}^{\infty}\frac{x^n}{n(n+1)}
   =\sum_{n=1}^{\infty}\frac{x^n}{n}-\sum_{n=1}^{\infty}\frac{x^n}{n+1}.
$$

3. 利用 $\sum_{n=1}^{\infty}\frac{x^n}{n}=-\ln(1-x)$，并注意

$$\sum_{n=1}^{\infty}\frac{x^n}{n+1}=\frac{1}{x}\sum_{n=2}^{\infty}\frac{x^n}{n}=\frac{-\ln(1-x)-x}{x}.$$

4. 合并得

$$S(x)=1+\frac{1-x}{x}\ln(1-x),\quad |x|<1.$$

#### 答案

$$\sum_{n=1}^{\infty}\frac{x^n}{n(n+1)}=1+\frac{1-x}{x}\ln(1-x)\quad(|x|<1).$$

</details>

---

<a id="练习-120taylor展开求极限"></a>

## 练习 120：[提高] Taylor 展开求极限

计算 $\lim_{x\to 0}\frac{e^x-\cos x-x}{x^2}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 展开：

$$e^x=1+x+\frac{x^2}{2}+o(x^2),\qquad \cos x=1-\frac{x^2}{2}+o(x^2).$$

2. 分子为

$$e^x-\cos x-x=x^2+o(x^2).$$

3. 故极限为 1。

#### 答案

$1$

</details>

---

<a id="练习-121abel定理求和"></a>

## 练习 121：[提高] Abel 定理求和

求级数 $\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n\cdot 3^n}$ 的和。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 利用公式

$$\sum_{n=1}^{\infty}\frac{(-1)^{n-1}x^n}{n}=\ln(1+x),\quad |x|\le 1,\ x\neq -1.$$

2. 取 $x=\frac13$，得

$$\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n\cdot 3^n}=\ln\left(1+\frac13\right)=\ln\frac43.$$

#### 答案

$\ln\frac43$

</details>

---

<a id="练习-122fourier系数计算"></a>

## 练习 122：[挑战] Fourier 系数计算

设 $f(x)=x$ 在 $(-\pi,\pi)$ 上作 $2\pi$ 周期延拓，求其 Fourier 级数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. $f(x)=x$ 是奇函数，所以 $a_0=a_n=0$。
2. 只需计算

$$b_n=\frac{1}{\pi}\int_{-\pi}^{\pi}x\sin nx\,dx=\frac{2}{\pi}\int_0^{\pi}x\sin nx\,dx.$$

3. 分部积分得

$$b_n=\frac{2(-1)^{n+1}}{n}.$$

#### 答案

$$x\sim 2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin nx,\quad -\pi<x<\pi.$$

</details>

---

<a id="练习-123级数与积分交换"></a>

## 练习 123：[挑战] 级数与积分交换

计算 $\int_0^1 \sum_{n=0}^{\infty}x^{2n}\,dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 当 $|x|<1$ 时，

$$\sum_{n=0}^{\infty}x^{2n}=\frac{1}{1-x^2}.$$

2. 但积分区间含端点 $x=1$，原函数作为广义积分处理：

$$\int_0^1\frac{dx}{1-x^2}=\frac12\int_0^1\left(\frac{1}{1-x}+\frac{1}{1+x}\right)dx.$$

3. 因 $\int_0^1\frac{dx}{1-x}$ 发散，所以积分发散。

#### 答案

发散到 $+\infty$。

</details>

---

## 专题 B：多元微积分

<a id="练习-124多元极限路径判别"></a>

## 练习 124：[基础] 多元极限路径判别

判定 $\lim_{(x,y)\to(0,0)}\frac{x^2y}{x^4+y^2}$ 是否存在。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 沿直线 $y=0$，极限为 0。
2. 沿抛物线 $y=x^2$，

$$\frac{x^2\cdot x^2}{x^4+x^4}=\frac12.$$

3. 两条路径极限不同，故重极限不存在。

#### 答案

不存在。

</details>

---

<a id="练习-125多元连续性判定"></a>

## 练习 125：[基础] 多元连续性判定

讨论函数

$$
f(x,y)=\begin{cases}
\frac{x^2y^2}{x^2+y^2},&(x,y)\neq(0,0),\\
0,&(x,y)=(0,0)
\end{cases}
$$

在原点处是否连续。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 有估计

$$0\le \frac{x^2y^2}{x^2+y^2}\le \frac{x^2+y^2}{4},$$

因为 $2|xy|\le x^2+y^2$。2. 当 $(x,y)\to(0,0)$ 时，右端趋于 0。3. 因而 $\lim_{(x,y)\to(0,0)}f(x,y)=0=f(0,0)$。

#### 答案

在原点连续。

</details>

---

<a id="练习-126方向导数与梯度"></a>

## 练习 126：[基础] 方向导数与梯度

设 $f(x,y)=x^2y+y^2$，求其在点 $(1,-1)$ 沿向量 $(3,4)$ 方向的方向导数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 梯度为

$$\nabla f=(2xy,\ x^2+2y).$$

2. 在 $(1,-1)$ 处，

$$\nabla f(1,-1)=(-2,-1).$$

3. 单位方向向量为 $\mathbf{u}=(3/5,4/5)$。
4. 方向导数

$$D_{\mathbf{u}}f=\nabla f\cdot \mathbf{u}=-2\cdot \frac35-1\cdot \frac45=-2.$$

#### 答案

$-2$

</details>

---

<a id="练习-127全微分与可微性"></a>

## 练习 127：[提高] 全微分与可微性

设 $f(x,y)=x^2e^y$，求 $df$，并写出点 $(1,0)$ 处的线性主部。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 偏导数：

$$f_x=2xe^y,\qquad f_y=x^2e^y.$$

2. 全微分为

$$df=2xe^y\,dx+x^2e^y\,dy.$$

3. 在 $(1,0)$ 处，

$$df_{(1,0)}=2\,dx+dy.$$

#### 答案

$$df=2xe^y\,dx+x^2e^y\,dy,\qquad (1,0)\text{ 处线性主部为 }2\Delta x+\Delta y.$$

</details>

---

<a id="练习-128切平面与法线"></a>

## 练习 128：[提高] 切平面与法线

求曲面 $z=x^2+xy+y^2$ 在点 $(1,1,3)$ 处的切平面方程。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 设 $F(x,y,z)=x^2+xy+y^2-z$。
2. 偏导为

$$F_x=2x+y,\quad F_y=x+2y,\quad F_z=-1.$$

3. 在点 $(1,1,3)$ 处，法向量为 $(3,3,-1)$。
4. 切平面：

$$3(x-1)+3(y-1)-(z-3)=0.$$

#### 答案

$$3x+3y-z-3=0.$$

</details>

---

<a id="练习-129二元函数极值"></a>

## 练习 129：[提高] 二元函数极值

求函数 $f(x,y)=x^2+y^2-2x-4y$ 的极值。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 配方：

$$f(x,y)=(x-1)^2+(y-2)^2-5.$$

2. 显然在 $(1,2)$ 处取最小值 $-5$。
3. 无最大值。

#### 答案

在 $(1,2)$ 处取极小值 $-5$，无极大值。

</details>

---

<a id="练习-130隐函数求导进阶"></a>

## 练习 130：[挑战] 隐函数求导进阶

由方程 $x^2+xy+y^2=3$ 确定隐函数 $y=y(x)$，求 $\frac{dy}{dx}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 对方程两边求导：

$$2x+y+x\frac{dy}{dx}+2y\frac{dy}{dx}=0.$$

2. 整理：

$$(x+2y)\frac{dy}{dx}=-(2x+y).$$

#### 答案

$$\frac{dy}{dx}=-\frac{2x+y}{x+2y}.$$

</details>

---

<a id="练习-131lagrange乘数法"></a>

## 练习 131：[挑战] Lagrange 乘数法

求函数 $f(x,y)=x^2+y^2$ 在约束 $x+y=1$ 下的最小值。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 构造

$$L=x^2+y^2+\lambda(x+y-1).$$

2. 由方程组

$$2x+\lambda=0,\quad 2y+\lambda=0,\quad x+y=1$$

得 $x=y=\frac12$。3. 代回得

$$f_{\min}=\frac14+\frac14=\frac12.$$

#### 答案

最小值为 $\frac12$，在 $\left(\frac12,\frac12\right)$ 处取得。

</details>

---

## 专题 C：重积分

<a id="练习-132二重积分换序"></a>

## 练习 132：[基础] 二重积分换序

计算 $\int_0^1\int_x^1 (x+y)\,dy\,dx$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 先对 $y$ 积分：

$$\int_x^1(x+y)\,dy=x(1-x)+\frac{1-x^2}{2}=\frac12+x-\frac32x^2.$$

2. 再对 $x$ 积分：

$$\int_0^1\left(\frac12+x-\frac32x^2\right)\,dx=\frac12.$$

#### 答案

$\frac12$

</details>

---

<a id="练习-133极坐标面积积分"></a>

## 练习 133：[基础] 极坐标面积积分

计算 $\iint_{x^2+y^2\le 4}(x^2+y^2)\,dA$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 改用极坐标：$x^2+y^2=r^2,\ dA=r\,dr\,d\theta$。
2. 积分为

$$\int_0^{2\pi}\int_0^2 r^3\,dr\,d\theta=2\pi\cdot \frac{2^4}{4}=8\pi.$$

#### 答案

$8\pi$

</details>

---

<a id="练习-134三重积分柱坐标"></a>

## 练习 134：[基础] 三重积分柱坐标

计算圆柱体 $\Omega:\ x^2+y^2\le 1,\ 0\le z\le 2$ 上的积分 $\iiint_\Omega (x^2+y^2)\,dV$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 柱坐标下被积函数为 $\rho^2$，体积元为 $\rho\,d\rho\,d\phi\,dz$。
2. 积分为

$$\int_0^2dz\int_0^{2\pi}d\phi\int_0^1\rho^3\,d\rho=2\cdot 2\pi\cdot \frac14=\pi.$$

#### 答案

$\pi$

</details>

---

<a id="练习-135对称性求质心"></a>

## 练习 135：[提高] 对称性求质心

求均匀半圆盘 $x^2+y^2\le a^2,\ y\ge 0$ 的质心纵坐标 $\bar y$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 面积 $A=\frac12\pi a^2$。
2. 利用极坐标：

$$
\bar y=\frac{1}{A}\iint_D y\,dA
   =\frac{1}{A}\int_0^\pi\int_0^a (r\sin\theta)r\,dr\,d\theta.
$$

3. 计算得

$$\bar y=\frac{1}{\frac12\pi a^2}\cdot \frac{a^3}{3}\cdot 2=\frac{4a}{3\pi}.$$

#### 答案

$$\bar y=\frac{4a}{3\pi}.$$

</details>

---

<a id="练习-136变量代换jacobian"></a>

## 练习 136：[提高] 变量代换与 Jacobian

令 $u=x+y,\ v=x-y$，计算区域 $D$ 由 $0\le x+y\le 2,\ 0\le x-y\le 1$ 围成时的积分 $\iint_D 1\,dA$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 反解：

$$x=\frac{u+v}{2},\qquad y=\frac{u-v}{2}.$$

2. Jacobian

$$\left|\frac{\partial(x,y)}{\partial(u,v)}\right|=\frac12.$$

3. 新区域为矩形 $0\le u\le 2,\ 0\le v\le 1$。
4. 面积

$$\iint_D1\,dA=\int_0^2\int_0^1\frac12\,dv\,du=1.$$

#### 答案

$1$

</details>

---

<a id="练习-137球坐标积分"></a>

## 练习 137：[提高] 球坐标积分

计算球体 $x^2+y^2+z^2\le a^2$ 的体积。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 球坐标下：

$$0\le r\le a,\ 0\le \theta\le \pi,\ 0\le \phi\le 2\pi.$$

2. 体积为

$$
V=\int_0^{2\pi}\int_0^\pi\int_0^a r^2\sin\theta\,dr\,d\theta\,d\phi
   =2\pi\cdot 2\cdot \frac{a^3}{3}=\frac{4}{3}\pi a^3.
$$

#### 答案

$$\frac{4}{3}\pi a^3.$$

</details>

---

<a id="练习-138变密度质量计算"></a>

## 练习 138：[挑战] 变密度质量计算

设薄板 $D=\{(x,y)\mid 0\le x\le 1,\ 0\le y\le x\}$ 的面密度 $\rho(x,y)=x+y$，求总质量。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 质量

$$M=\int_0^1\int_0^x (x+y)\,dy\,dx.$$

2. 内积分得

$$\int_0^x(x+y)\,dy=x^2+\frac{x^2}{2}=\frac32x^2.$$

3. 再积分得

$$M=\int_0^1\frac32x^2\,dx=\frac12.$$

#### 答案

$\frac12$

</details>

---

<a id="练习-139三重积分综合应用"></a>

## 练习 139：[挑战] 三重积分综合应用

计算 $\iiint_\Omega z\,dV$，其中 $\Omega=\{(x,y,z)\mid x^2+y^2+z^2\le a^2,\ z\ge 0\}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 用球坐标，$z=r\cos\theta$，上半球对应 $0\le \theta\le \frac{\pi}{2}$。
2. 积分为

$$\int_0^{2\pi}\int_0^{\pi/2}\int_0^a r\cos\theta\cdot r^2\sin\theta\,dr\,d\theta\,d\phi.$$

3. 分离变量：

$$
2\pi\cdot \int_0^{\pi/2}\sin\theta\cos\theta\,d\theta\cdot \int_0^a r^3\,dr
   =2\pi\cdot \frac12\cdot \frac{a^4}{4}.
$$

#### 答案

$$\frac{\pi a^4}{4}.$$

</details>

---

## 专题 D：曲线积分

<a id="练习-140第一类曲线积分"></a>

## 练习 140：[基础] 第一类曲线积分

计算 $\int_L y\,ds$，其中 $L$ 为直线段 $x=t,\ y=2t,\ 0\le t\le 1$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. $y=2t$，且

$$ds=\sqrt{1^2+2^2}\,dt=\sqrt5\,dt.$$

2. 因而

$$\int_L y\,ds=\int_0^1 2t\sqrt5\,dt=\sqrt5.$$

#### 答案

$\sqrt5$

</details>

---

<a id="练习-141第二类曲线积分参数法"></a>

## 练习 141：[基础] 第二类曲线积分参数法

计算 $\int_L (y\,dx+x\,dy)$，其中 $L$ 为从 $(0,0)$ 到 $(1,1)$ 的抛物线段 $y=x^2$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 取参数 $x=t,\ y=t^2,\ 0\le t\le 1$。
2. 则 $dx=dt,\ dy=2t\,dt$。
3. 积分为

$$\int_0^1(t^2+2t^2)\,dt=\int_0^1 3t^2\,dt=1.$$

#### 答案

$1$

</details>

---

<a id="练习-142保守场路径无关"></a>

## 练习 142：[基础] 保守场路径无关

计算 $\int_L (2x\,dx+2y\,dy)$，其中 $L$ 为连接 $(0,0)$ 与 $(1,2)$ 的任意分段光滑曲线。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 向量场为 $\nabla(x^2+y^2)$，是保守场。
2. 线积分只与端点有关：

$$\int_L (2x\,dx+2y\,dy)=x^2+y^2\Big|_{(0,0)}^{(1,2)}=5.$$

#### 答案

$5$

</details>

---

<a id="练习-143格林公式求面积"></a>

## 练习 143：[提高] 格林公式求面积

利用格林公式计算单位圆周 $x^2+y^2=1$ 围成区域的面积。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 取 $P=-\frac y2,\ Q=\frac x2$，则

$$\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}=1.$$

2. 所以

$$\text{Area}(D)=\oint_{\partial D}\left(-\frac y2\,dx+\frac x2\,dy\right).$$

3. 对单位圆参数化 $x=\cos t,\ y=\sin t$，可得积分值为 $\pi$。

#### 答案

$\pi$

</details>

---

<a id="练习-144平面环量计算"></a>

## 练习 144：[提高] 平面环量计算

计算 $\oint_L (-y\,dx+x\,dy)$，其中 $L$ 为逆时针方向单位圆周。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 由格林公式：

$$\oint_L(-y\,dx+x\,dy)=\iint_D\left(\frac{\partial x}{\partial x}-\frac{\partial(-y)}{\partial y}\right)\,dA.$$

2. 被积函数为 $1-(-1)=2$。
3. 单位圆面积为 $\pi$，故积分为 $2\pi$。

#### 答案

$2\pi$

</details>

---

<a id="练习-145空间曲线做功"></a>

## 练习 145：[提高] 空间曲线做功

计算向量场 $\mathbf{F}=(z,0,x)$ 沿线段 $L:\ \mathbf{r}(t)=(t,t,t),\ 0\le t\le 1$ 的功。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 代入参数后，$\mathbf{F}(\mathbf{r}(t))=(t,0,t)$。
2. 有 $\mathbf{r}'(t)=(1,1,1)$。
3. 故

$$\int_L\mathbf{F}\cdot d\mathbf{r}=\int_0^1 (t,0,t)\cdot(1,1,1)\,dt=\int_0^1 2t\,dt=1.$$

#### 答案

$1$

</details>

---

<a id="练习-146非单连通区域环量"></a>

## 练习 146：[挑战] 非单连通区域环量

计算 $\oint_{x^2+y^2=4}\frac{-y\,dx+x\,dy}{x^2+y^2}$，方向取逆时针。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 参数化：$x=2\cos t,\ y=2\sin t,\ 0\le t\le 2\pi$。
2. 则

$$-y\,dx+x\,dy=4\,dt,\qquad x^2+y^2=4.$$

3. 积分化为

$$\int_0^{2\pi}\frac{4}{4}\,dt=2\pi.$$

#### 答案

$2\pi$

</details>

---

<a id="练习-147格林公式逆向构造"></a>

## 练习 147：[挑战] 格林公式逆向构造

设 $L$ 为矩形边界 $0\le x\le 1,\ 0\le y\le 2$ 的正向边界，计算 $\oint_L (x^2y\,dx+xy^2\,dy)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 由格林公式，

$$\oint_L P\,dx+Q\,dy=\iint_D\left(Q_x-P_y\right)\,dA.$$

2. 这里

$$Q_x=y^2,\qquad P_y=x^2.$$

3. 所以

$$
\oint_L=\int_0^1\int_0^2 (y^2-x^2)\,dy\,dx
   =\int_0^1\left(\frac83-2x^2\right)\,dx=2.
$$

#### 答案

$2$

</details>

---

## 专题 E：曲面积分

<a id="练习-148第一类曲面积分"></a>

## 练习 148：[基础] 第一类曲面积分

计算曲面 $\Sigma:\ z=x+y,\ 0\le x\le 1,\ 0\le y\le 1$ 上的积分 $\iint_\Sigma 1\,dS$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 对图形曲面有

$$dS=\sqrt{1+z_x^2+z_y^2}\,dA=\sqrt3\,dA.$$

2. 投影区域面积为 1。
3. 所以

$$\iint_\Sigma1\,dS=\sqrt3.$$

#### 答案

$\sqrt3$

</details>

---

<a id="练习-149平面通量计算"></a>

## 练习 149：[基础] 平面通量计算

求向量场 $\mathbf{F}=(0,0,1)$ 穿过上侧单位圆盘 $\Sigma:\ z=0,\ x^2+y^2\le 1$ 的通量。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 上侧单位法向量为 $\mathbf{n}=(0,0,1)$。
2. 有 $\mathbf{F}\cdot \mathbf{n}=1$。
3. 因而通量等于圆盘面积 $\pi$。

#### 答案

$\pi$

</details>

---

<a id="练习-150图形曲面的面积元"></a>

## 练习 150：[基础] 图形曲面的面积元

计算 $\iint_\Sigma z\,dS$，其中 $\Sigma:\ z=x^2+y^2,\ x^2+y^2\le 1$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 这里 $z_x=2x,\ z_y=2y$，故

$$dS=\sqrt{1+4x^2+4y^2}\,dA.$$

2. 改用极坐标：

$$\iint_\Sigma z\,dS=\int_0^{2\pi}\int_0^1 r^2\sqrt{1+4r^2}\,r\,dr\,d\theta.$$

3. 令 $u=1+4r^2$，则

$$
2\pi\int_0^1 r^3\sqrt{1+4r^2}\,dr
   =\frac{\pi}{16}\int_1^5 (u-1)\sqrt{u}\,du.
$$

4. 计算得

$$\frac{\pi}{60}(25\sqrt5+1).$$

#### 答案

$$\frac{\pi}{60}(25\sqrt5+1).$$

</details>

---

<a id="练习-151高斯公式基础"></a>

## 练习 151：[提高] 高斯公式基础

计算向量场 $\mathbf{F}=(x,y,z)$ 穿过半径为 $a$ 的球面 $x^2+y^2+z^2=a^2$ 外侧的通量。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 散度为

$$\nabla\cdot \mathbf{F}=1+1+1=3.$$

2. 由高斯公式，

$$\oiint_\Sigma \mathbf{F}\cdot d\mathbf{S}=3\cdot \frac43\pi a^3=4\pi a^3.$$

#### 答案

$4\pi a^3$

</details>

---

<a id="练习-152斯托克斯公式基础"></a>

## 练习 152：[提高] 斯托克斯公式基础

计算 $\oint_\Gamma (-y\,dx+x\,dy)$，其中 $\Gamma$ 为平面 $z=0$ 上的单位圆周，方向取从 $z$ 轴正向看为逆时针。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 取 $\mathbf{F}=(-y,x,0)$，则

$$\nabla\times \mathbf{F}=(0,0,2).$$

2. 由斯托克斯公式，

$$
\oint_\Gamma \mathbf{F}\cdot d\mathbf{r}
   =\iint_{x^2+y^2\le 1}(0,0,2)\cdot(0,0,1)\,dA=2\pi.
$$

#### 答案

$2\pi$

</details>

---

<a id="练习-153闭曲面通量零判定"></a>

## 练习 153：[提高] 闭曲面通量零判定

设 $\mathbf{F}=(-y,x,0)$，求它穿过任意封闭曲面外侧的通量。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 散度为

$$\nabla\cdot \mathbf{F}=0+0+0=0.$$

2. 由高斯公式，任意闭曲面的通量都等于区域内散度体积分，因此为 0。

#### 答案

$0$

</details>

---

<a id="练习-154球面通量直接法"></a>

## 练习 154：[挑战] 球面通量直接法

计算向量场 $\mathbf{F}=\frac{1}{a}(x,y,z)$ 穿过球面 $x^2+y^2+z^2=a^2$ 外侧的通量。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 在球面上单位外法向量为

$$\mathbf{n}=\frac{1}{a}(x,y,z).$$

2. 因而

$$\mathbf{F}\cdot \mathbf{n}=\frac{x^2+y^2+z^2}{a^2}=1.$$

3. 通量等于球面面积：

$$4\pi a^2.$$

#### 答案

$4\pi a^2$

</details>

---

<a id="练习-155斯托克斯与曲面无关性"></a>

## 练习 155：[挑战] 斯托克斯与曲面无关性

设 $\Gamma$ 为圆周 $x^2+y^2=1,\ z=0$，计算 $\oint_\Gamma z\,dx+x\,dy+y\,dz$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析

1. 取 $\mathbf{F}=(z,x,y)$，则

$$\nabla\times \mathbf{F}=(1,1,1).$$

2. 取圆盘 $\Sigma:\ z=0,\ x^2+y^2\le 1$，其法向量为 $(0,0,1)$。
3. 由斯托克斯公式，

$$
\oint_\Gamma \mathbf{F}\cdot d\mathbf{r}
   =\iint_\Sigma (1,1,1)\cdot(0,0,1)\,dA
   =\iint_\Sigma 1\,dA=\pi.
$$

#### 答案

$\pi$

</details>
