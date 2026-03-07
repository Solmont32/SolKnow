---
title: 多元函数微分学：高维空间的局部线性化 (Multivariable Derivatives)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 多元函数微分学：高维空间的局部线性化

在一元微积分中，我们研究的是数轴上的变化。而多元微积分将这一视角扩展到高维空间。多元函数微分学的核心在于：如何通过**局部线性逼近**（全微分）来描述函数在各个方向上的综合变化。

## 一、 偏导数与全微分

### 1. 偏导数 (Partial Derivatives)
设函数 $z = f(x, y)$ 在点 $(x_0, y_0)$ 的邻域内有定义。固定 $y = y_0$，将 $z$ 看作 $x$ 的一元函数，其在 $x_0$ 处的导数称为 $f(x, y)$ 对 $x$ 的**偏导数**：
$$f_x(x_0, y_0) = \left.\frac{\partial z}{\partial x}\right|_{(x_0, y_0)} = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x, y_0) - f(x_0, y_0)}{\Delta x}$$
**几何意义**：偏导数 $f_x$ 表示曲面 $z = f(x, y)$ 与平面 $y = y_0$ 相交所得曲线在点 $(x_0, y_0, f(x_0, y_0))$ 处的切线斜率。

### 2. 全微分 (Total Differential)
如果函数 $z = f(x, y)$ 在点 $(x, y)$ 处的增量 $\Delta z = f(x+\Delta x, y+\Delta y) - f(x, y)$ 可以表示为：
$$\Delta z = A \Delta x + B \Delta y + o(\rho)$$
其中 $\rho = \sqrt{(\Delta x)^2 + (\Delta y)^2}$，$A, B$ 与 $\Delta x, \Delta y$ 无关，则称 $f$ 在该点**可微**，其全微分为：
$$dz = \frac{\partial z}{\partial x} dx + \frac{\partial z}{\partial y} dy$$

**全微分存在的充分条件**：如果函数的偏导数 $f_x, f_y$ 在点 $(x, y)$ 连续，则函数在该点必可微。

### 3. 可微、可导与连续的关系
- **可微 $\Rightarrow$ 连续**（与一元相同）。
- **可微 $\Rightarrow$ 偏导数存在**（与一元相同）。
- **偏导数存在 $\not\Rightarrow$ 连续**（多元特有！偏导数仅反映坐标轴方向的变化）。
- **偏导数存在 $\not\Rightarrow$ 可微**。

---

## 二、 复合函数求导法则 (Chain Rule)

复合函数求导是多元微分学的计算核心。设 $z = f(u, v)$，$u = u(x, y)$，$v = v(x, y)$，则 $z$ 对 $x$ 的偏导数为：
$$\frac{\partial z}{\partial x} = \frac{\partial z}{\partial u} \frac{\partial u}{\partial x} + \frac{\partial z}{\partial v} \frac{\partial v}{\partial x}$$
这通常被称为“链式法则”。可以形象地理解为：通过所有中间变量的路径之和。

---

## 三、 高阶偏导数与混合偏导数

### 1. 高阶偏导数
偏导数的偏导数称为高阶偏导数。例如 $f_{xx} = \frac{\partial^2 f}{\partial x^2}$，$f_{xy} = \frac{\partial}{\partial y}(\frac{\partial f}{\partial x})$。

### 2. 克莱罗定理 (Clairaut's Theorem)
如果混合偏导数 $f_{xy}$ 和 $f_{yx}$ 在某区域内**连续**，则它们在该区域内相等：
$$\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial^2 f}{\partial y \partial x}$$

---
---
## 四、 隐函数定理 (Implicit Function Theorem)

隐函数定理是分析学中极其重要的工具，它给出了在什么条件下方程（组）可以局部地解出某个变量，并提供了求导的直接方法。

### 1. 单个方程的情形 (Single Equation)
设函数 $F(x, y)$ 在点 $P_0(x_0, y_0)$ 的某邻域内具有连续偏导数，且满足：
1. **零点条件**：$F(x_0, y_0) = 0$
2. **非退化条件**：$F_y(x_0, y_0) \neq 0$

则在 $x_0$ 的某邻域内，方程 $F(x, y) = 0$ 唯一确定一个连续且具有连续导数的函数 $y = f(x)$，且其导数为：
$$\frac{dy}{dx} = -\frac{F_x}{F_y}$$

### 2. 方程组的情形与雅可比行列式 (Systems and Jacobians)
考虑方程组：
$$\begin{cases} F(x, y, u, v) = 0 \\ G(x, y, u, v) = 0 \end{cases}$$
若 $F, G$ 在点 $P_0(x_0, y_0, u_0, v_0)$ 处满足 $F=0, G=0$，且在 $P_0$ 的邻域内连续可微，若其**雅可比行列式 (Jacobian)**：
$$J = \frac{\partial(F, G)}{\partial(u, v)} = \begin{vmatrix} \frac{\partial F}{\partial u} & \frac{\partial F}{\partial v} \\ \frac{\partial G}{\partial u} & \frac{\partial G}{\partial v} \end{vmatrix} \neq 0$$
则在该点附近可唯一确定隐函数 $u = u(x, y)$ 和 $v = v(x, y)$。其偏导数可通过克莱姆法则或全微分法求得。

### 3. 逆函数定理 (Inverse Function Theorem)
这是隐函数定理的一个重要推论。设映射 $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^n$ 在 $\mathbf{x}_0$ 处连续可微。若其雅可比矩阵 $D\mathbf{f}(\mathbf{x}_0)$ 可逆（即行列式不为 0），则：
1. $\mathbf{f}$ 在 $\mathbf{x}_0$ 附近是**局部微分同胚**（即存在局部逆函数 $\mathbf{g} = \mathbf{f}^{-1}$）。
2. 逆函数的导数为：$D(\mathbf{f}^{-1})(\mathbf{y}_0) = [D\mathbf{f}(\mathbf{x}_0)]^{-1}$。

---

## 五、 多元函数的极值 (Extremum)


### 1. 无条件极值的必要条件
若 $f(x, y)$ 在点 $(x_0, y_0)$ 处取得极值且在该点可导，则其一阶偏导数必为 0：
$$f_x(x_0, y_0) = 0, \quad f_y(x_0, y_0) = 0$$
满足该条件的点称为**驻点 (Stationary Point)**。

### 2. 二阶充分条件：Hessian 矩阵判别法
设 $(x_0, y_0)$ 为驻点，令 $A = f_{xx}, B = f_{xy}, C = f_{yy}$。记 Hessian 矩阵的行列式 $\Delta = AC - B^2$：
1. 若 $\Delta > 0$：
   - 当 $A < 0$ 时，在该点取得**极大值**；
   - 当 $A > 0$ 时，在该点取得**极小值**。
2. 若 $\Delta < 0$：在该点**不取极值**（鞍点/Saddle Point）。
3. 若 $\Delta = 0$：判别法**失效**，需进一步分析。

---

## 六、 条件极值与 Lagrange 乘数法

### 1. 问题描述
求函数 $f(x, y)$ 在约束条件 $\varphi(x, y) = 0$ 下的极值。

### 2. Lagrange 乘数法
构造 Lagrange 函数：
$$L(x, y, \lambda) = f(x, y) + \lambda \varphi(x, y)$$
解方程组：
$$\begin{cases} f_x + \lambda \varphi_x = 0 \\ f_y + \lambda \varphi_y = 0 \\ \varphi(x, y) = 0 \end{cases}$$
所得的解 $(x, y)$ 即为可能的极值点。对于 $n$ 元函数与 $m$ 个约束，同理构造 $L = f + \sum \lambda_i \varphi_i$。

---

## 七、 深度实战解析

### 深度例题 1：利用定义考察全微分的存在性
讨论函数 $f(x, y) = \begin{cases} \frac{xy}{\sqrt{x^2 + y^2}}, & (x, y) \neq (0, 0) \\ 0, & (x, y) = (0, 0) \end{cases}$ 在 $(0, 0)$ 处的可微性。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **计算偏导数**：
   $$f_x(0, 0) = \lim_{\Delta x \to 0} \frac{f(\Delta x, 0) - f(0, 0)}{\Delta x} = \lim_{\Delta x \to 0} \frac{0 - 0}{\Delta x} = 0$$
   同理，$f_y(0, 0) = 0$。

2. **验证全微分定义**：
   若可微，则增量 $\Delta z = f(\Delta x, \Delta y) - f(0, 0)$ 应满足：
   $$\Delta z = f_x(0, 0)\Delta x + f_y(0, 0)\Delta y + o(\rho) = 0 \cdot \Delta x + 0 \cdot \Delta y + o(\rho)$$
   我们需要检查极限 $\lim_{\rho \to 0} \frac{\Delta z - 0}{\rho}$ 是否为 0。
   $$\frac{\Delta z}{\rho} = \frac{\frac{\Delta x \Delta y}{\sqrt{\Delta x^2 + \Delta y^2}}}{\sqrt{\Delta x^2 + \Delta y^2}} = \frac{\Delta x \Delta y}{\Delta x^2 + \Delta y^2}$$

3. **路径测试**：
   沿直线 $\Delta y = k \Delta x$ 趋于 $(0, 0)$：
   $$\lim_{\Delta x \to 0} \frac{k \Delta x^2}{\Delta x^2 + k^2 \Delta x^2} = \frac{k}{1+k^2}$$
   极限值随 $k$ 的不同而改变，故极限不存在，更不为 0。

#### 答案
该函数在 $(0, 0)$ 处偏导数存在，但**不可微**。
</details>

### 深度例题 2：复合函数的高阶导数计算
设 $z = f(x^2 + y^2)$，其中 $f$ 是二阶可导函数，求 $\frac{\partial^2 z}{\partial x^2} + \frac{\partial^2 z}{\partial y^2}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **一阶偏导数**：
   设 $u = x^2 + y^2$，则 $z = f(u)$。
   $$\frac{\partial z}{\partial x} = f'(u) \frac{\partial u}{\partial x} = f'(u) \cdot 2x$$
   $$\frac{\partial z}{\partial y} = f'(u) \cdot 2y$$

2. **二阶偏导数（对 x）**：
   $$\frac{\partial^2 z}{\partial x^2} = \frac{\partial}{\partial x}(2x f'(u)) = 2 f'(u) + 2x \frac{\partial}{\partial x}(f'(u))$$
   $$= 2 f'(u) + 2x [f''(u) \cdot 2x] = 2 f'(u) + 4x^2 f''(u)$$

3. **二阶偏导数（对 y）**：
   同理，$\frac{\partial^2 z}{\partial y^2} = 2 f'(u) + 4y^2 f''(u)$。

4. **相加化简**：
   $$\frac{\partial^2 z}{\partial x^2} + \frac{\partial^2 z}{\partial y^2} = 4 f'(u) + 4(x^2 + y^2) f''(u)$$
   $$= 4 f'(x^2 + y^2) + 4(x^2 + y^2) f''(x^2 + y^2)$$

#### 答案
$4 f'(x^2 + y^2) + 4(x^2 + y^2) f''(x^2 + y^2)$。
</details>

### 深度例题 3：Hessian 矩阵与极值判别
求函数 $f(x, y) = x^3 - y^3 + 3x^2 + 3y^2 - 9x$ 的极值点。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **找驻点**：
   $f_x = 3x^2 + 6x - 9 = 3(x+3)(x-1) = 0 \Rightarrow x = -3, 1$。
   $f_y = -3y^2 + 6y = -3y(y-2) = 0 \Rightarrow y = 0, 2$。
   驻点为：$P_1(-3, 0), P_2(-3, 2), P_3(1, 0), P_4(1, 2)$。

2. **二阶偏导数**：
   $f_{xx} = 6x + 6, f_{xy} = 0, f_{yy} = -6y + 6$。
   $\Delta = f_{xx}f_{yy} - f_{xy}^2 = (6x+6)(-6y+6)$。

3. **判别**：
   - 对于 $P_1(-3, 0)$：$f_{xx} = -12, \Delta = (-12)(6) = -72 < 0 \Rightarrow$ 鞍点。
   - 对于 $P_2(-3, 2)$：$f_{xx} = -12, \Delta = (-12)(-6) = 72 > 0$。由于 $f_{xx} < 0$，取**极大值** $f(-3, 2) = 31$。
   - 对于 $P_3(1, 0)$：$f_{xx} = 12, \Delta = (12)(6) = 72 > 0$。由于 $f_{xx} > 0$，取**极小值** $f(1, 0) = -5$。
   - 对于 $P_4(1, 2)$：$f_{xx} = 12, \Delta = (12)(-6) = -72 < 0 \Rightarrow$ 鞍点。

#### 答案
极大值点 $(-3, 2)$，极大值为 31；极小值点 $(1, 0)$，极小值为 -5。
</details>

---

## 八、 配套练习库

### 练习 1：基本偏导数计算
已知 $z = x^y$，求 $\frac{\partial z}{\partial x}$ 与 $\frac{\partial z}{\partial y}$。

<details>
<summary>点击查看解析与答案</summary>

#### 答案
- $\frac{\partial z}{\partial x} = y x^{y-1}$（幂函数求导）
- $\frac{\partial z}{\partial y} = x^y \ln x$（指数函数求导）
</details>

### 练习 2：全微分的计算
求函数 $f(x, y) = e^x \cos y$ 在点 $(0, \pi/2)$ 处的全微分。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. $f_x = e^x \cos y \Rightarrow f_x(0, \pi/2) = e^0 \cos(\pi/2) = 0$
2. $f_y = -e^x \sin y \Rightarrow f_y(0, \pi/2) = -e^0 \sin(\pi/2) = -1$
3. $df = f_x dx + f_y dy = 0 \cdot dx + (-1) \cdot dy = -dy$

#### 答案
$df = -dy$
</details>

### 练习 3：欧拉齐次函数定理的应用
如果函数 $f(x, y)$ 满足 $f(tx, ty) = t^n f(x, y)$（$n$ 阶齐次函数），证明：
$$x \frac{\partial f}{\partial x} + y \frac{\partial f}{\partial y} = n f(x, y)$$

<details>
<summary>点击查看解析与答案</summary>

#### 证明过程
1. 对等式 $f(tx, ty) = t^n f(x, y)$ 两边关于 $t$ 求导。
2. 左边使用链式法则：设 $u = tx, v = ty$，则 $\frac{\partial f}{\partial u} \frac{\partial u}{\partial t} + \frac{\partial f}{\partial v} \frac{\partial v}{\partial t} = \frac{\partial f}{\partial u} \cdot x + \frac{\partial f}{\partial v} \cdot y$。
3. 右边关于 $t$ 求导得 $n t^{n-1} f(x, y)$。
4. 令 $t = 1$，则 $u = x, v = y$，代入得：
   $$x \frac{\partial f}{\partial x} + y \frac{\partial f}{\partial y} = n f(x, y)$$
   证毕。
</details>

### 练习 4：混合偏导数的不等性（反例）
已知 $f(x, y) = \begin{cases} xy \frac{x^2 - y^2}{x^2 + y^2}, & x^2 + y^2 \neq 0 \\ 0, & x^2 + y^2 = 0 \end{cases}$。验证 $f_{xy}(0, 0) \neq f_{yx}(0, 0)$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **求 $f_x(0, y)$**：
   $f_x(0, y) = \lim_{x \to 0} \frac{f(x, y) - f(0, y)}{x} = \lim_{x \to 0} \frac{xy \frac{x^2 - y^2}{x^2 + y^2} - 0}{x} = \lim_{x \to 0} y \frac{x^2 - y^2}{x^2 + y^2} = -y$。
2. **求 $f_{xy}(0, 0)$**：
   $f_{xy}(0, 0) = \left.\frac{\partial}{\partial y}(f_x(0, y))\right|_{y=0} = \frac{d}{dy}(-y) = -1$。
3. **求 $f_y(x, 0)$**：
   $f_y(x, 0) = \lim_{y \to 0} \frac{f(x, y) - f(x, 0)}{y} = \lim_{y \to 0} \frac{xy \frac{x^2 - y^2}{x^2 + y^2} - 0}{y} = x$。
4. **求 $f_{yx}(0, 0)$**：
   $f_{yx}(0, 0) = \left.\frac{\partial}{\partial x}(f_y(x, 0))\right|_{x=0} = \frac{d}{dx}(x) = 1$。

#### 结论
$-1 \neq 1$，因此该函数的混合偏导数在原点不相等。这说明其混合偏导数在原点是不连续的。
</details>

### 练习 5：隐函数求导
由方程 $x^2 + y^2 + z^2 - 4z = 0$ 确定的隐函数 $z = z(x, y)$，求 $\frac{\partial z}{\partial x}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. 令 $F(x, y, z) = x^2 + y^2 + z^2 - 4z$。
2. $F_x = 2x, F_z = 2z - 4$。
3. $\frac{\partial z}{\partial x} = -\frac{F_x}{F_z} = -\frac{2x}{2z - 4} = \frac{x}{2 - z}$。

#### 答案
$\frac{\partial z}{\partial x} = \frac{x}{2-z}$
</details>

### 练习 6：条件极值与 Lagrange 乘数法
求表面积为 $6a^2$ 的长方体的最大体积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. 设长方体三边为 $x, y, z$，体积 $V = xyz$，约束 $\varphi(x, y, z) = 2(xy + yz + zx) - 6a^2 = 0$。
2. $L = xyz + \lambda(xy + yz + zx - 3a^2)$。
3. 求导：
   $L_x = yz + \lambda(y + z) = 0$
   $L_y = xz + \lambda(x + z) = 0$
   $L_z = xy + \lambda(x + y) = 0$
4. 由前两式：$yz(x+z) = xz(y+z) \Rightarrow yx+yz = xy+xz \Rightarrow y=x$。同理 $x=y=z$。
5. 代入约束：$3x^2 = 3a^2 \Rightarrow x=a$。
6. $V = a^3$。

#### 答案
当长方体为正方体（边长为 $a$）时，体积最大，为 $a^3$。
</details>

