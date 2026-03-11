---
title: 多元函数微分学 (Multivariable Differentiation)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第十七章 多元函数微分学

多元函数微分学的核心思想是**局部线性化**。我们将一元微积分中的导数和微分概念推广到高维空间，研究函数在各个方向上的变化率以及最优线性逼近。

## 一、 偏导数与全微分

### 1. 偏导数 (Partial Derivatives)

设 $z = f(x, y)$ 在点 $(x_0, y_0)$ 的邻域内有定义。固定 $y = y_0$，定义：

$$f_x(x_0, y_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x, y_0) - f(x_0, y_0)}{\Delta x}$$

这是函数沿坐标轴方向的变化率。

### 2. 全微分 (Total Differential)

**定义**：若函数增量可表示为 $\Delta z = A \Delta x + B \Delta y + o(\rho)$，其中 $\rho = \sqrt{(\Delta x)^2 + (\Delta y)^2}$，则称函数在点 $(x, y)$ 可微。

#### **全微分存在性判定“四步走”**

判定一个多元函数在某点 $(x_0, y_0)$ 是否可微，通常遵循以下严谨步骤：

1.  **连续性检验**（必要条件）：若函数在该点不连续，则必不可微。
2.  **求偏导数**：利用定义求出 $f_x(x_0, y_0)$ 和 $f_y(x_0, y_0)$。若偏导数不存在，则必不可微。
3.  **构造线性增量**：写出全增量 $\Delta z = f(x_0+\Delta x, y_0+\Delta y) - f(x_0, y_0)$。
4.  **极限判定**（充分必要条件）：计算以下极限：

$$\lim_{(\Delta x, \Delta y) \to (0, 0)} \frac{\Delta z - [f_x(x_0, y_0)\Delta x + f_y(x_0, y_0)\Delta y]}{\sqrt{(\Delta x)^2 + (\Delta y)^2}}$$

若极限为 $0$，则可微；否则不可微。

> **关键定理回顾**：
>
> - **必要条件**：可微 $\Rightarrow$ 连续 且 偏导数存在。
> - **充分条件**：偏导数在点 $(x, y)$ 连续 $\Rightarrow$ 函数在该点可微。
> - **注意**：偏导数存在并不意味着函数连续，更不意味着可微。

### 深度例题 1：全微分存在性的严格判定

判定 $f(x, y) = \sqrt{|xy|}$ 在 $(0, 0)$ 处的可微性。

<details>
<summary>点击查看解析</summary>

1. **连续性**：显然 $\lim_{(x, y) \to (0, 0)} \sqrt{|xy|} = 0 = f(0, 0)$，函数连续。
2. **偏导数**：
   $$f_x(0, 0) = \lim_{x \to 0} \frac{\sqrt{|x \cdot 0|} - 0}{x} = 0$$
   $$f_y(0, 0) = \lim_{y \to 0} \frac{\sqrt{|0 \cdot y|} - 0}{y} = 0$$
3. **极限判定**：
   $$\lim_{(\Delta x, \Delta y) \to (0, 0)} \frac{\Delta z - [0 \cdot \Delta x + 0 \cdot \Delta y]}{\sqrt{\Delta x^2 + \Delta y^2}} = \lim_{\rho \to 0} \frac{\sqrt{|\rho \cos \theta \rho \sin \theta|}}{\rho} = \lim_{\rho \to 0} \sqrt{|\cos \theta \sin \theta|}$$
   由于极限结果与 $\theta$ 有关（当 $\theta = \pi/4$ 时为 $1/\sqrt{2} \neq 0$），故在该点**不可微**。

</details>

### 深度例题 2：多元复合函数的高阶偏导

设 $z = f(x+y, xy)$，其中 $f$ 具有二阶连续偏导数，求 $\frac{\partial^2 z}{\partial x \partial y}$。

<details>
<summary>点击查看解析</summary>

令 $u = x+y, v = xy$。

1. **一阶偏导**：
   $$\frac{\partial z}{\partial x} = f_u \cdot 1 + f_v \cdot y = f_u + yf_v$$
2. **二阶偏导**（对 $y$ 求导）：
   $$\frac{\partial^2 z}{\partial y \partial x} = \frac{\partial}{\partial y}(f_u + yf_v) = \frac{\partial f_u}{\partial y} + f_v + y \frac{\partial f_v}{\partial y}$$
   其中：
   $$\frac{\partial f_u}{\partial y} = f_{uu} \cdot 1 + f_{uv} \cdot x$$
   $$\frac{\partial f_v}{\partial y} = f_{vu} \cdot 1 + f_{vv} \cdot x$$
3. **代入并化简**（利用 $f_{uv} = f_{vu}$）：
   $$\frac{\partial^2 z}{\partial y \partial x} = f_{uu} + x f_{uv} + f_v + y (f_{uv} + x f_{vv}) = f_{uu} + (x+y)f_{uv} + xy f_{vv} + f_v$$

</details>

### 深度例题 3：利用 Taylor 展开求极值

利用二阶 Taylor 展开，分析函数 $f(x, y)$ 在驻点附近的行为。

<details>

<summary>点击查看解析</summary>

在驻点 $(x_0, y_0)$ 处，$f_x = f_y = 0$。Taylor 展开为：

$$f(x_0+h, y_0+k) - f(x_0, y_0) \approx \frac{1}{2} (Ah^2 + 2Bhk + Ck^2)$$

其中 $A=f_{xx}, B=f_{xy}, C=f_{yy}$。
右侧是一个二次型。其性质（正定、负定、不定）直接决定了该驻点是极小值点、极大值点还是鞍点。这正是 Hessian 矩阵判别法的理论来源。

</details>

### 深度例题 4：方向导数的最值性质

已知函数 $f(x, y) = x^2 + 2y^2$，求在点 $(1, 1)$ 处沿什么方向的方向导数最大，并求出该最大值。

<details>
<summary>点击查看解析</summary>

1. **计算梯度**：
   $\nabla f = (2x, 4y)$。在点 $(1, 1)$ 处，$\nabla f(1, 1) = (2, 4)$。
2. **判定最大方向**：
   方向导数在梯度方向 $\mathbf{l} = \frac{\nabla f}{\|\nabla f\|}$ 处取得最大值。
   方向为 $(2, 4)$ 或单位化后的 $(\frac{1}{\sqrt{5}}, \frac{2}{\sqrt{5}})$。
3. **计算最大值**：
   最大值即为梯度的模长：
   $\|\nabla f\| = \sqrt{2^2 + 4^2} = \sqrt{20} = 2\sqrt{5}$。

</details>

### 深度例题 5：隐函数的全微分计算

设由方程 $x^2 + y^2 + z^2 - 3xyz = 0$ 确定的隐函数为 $z = z(x, y)$，求 $dz$。

<details>
<summary>点击查看解析</summary>

令 $F(x, y, z) = x^2 + y^2 + z^2 - 3xyz$。

1. **计算偏导**：
   $F_x = 2x - 3yz, F_y = 2y - 3xz, F_z = 2z - 3xy$。
2. **求隐函数偏导**：
   $\frac{\partial z}{\partial x} = -\frac{F_x}{F_z} = -\frac{2x - 3yz}{2z - 3xy}$
   $\frac{\partial z}{\partial y} = -\frac{F_y}{F_z} = -\frac{2y - 3xz}{2z - 3xy}$
3. **写出全微分**：
   $dz = \frac{\partial z}{\partial x} dx + \frac{\partial z}{\partial y} dy = \frac{(3yz - 2x) dx + (3xz - 2y) dy}{2z - 3xy}$。

</details>

---

## 六、 章内专题练习 (In-Chapter Exercises)

:::tip 练习说明
以下练习覆盖了多元微分的核心计算与判定技巧。
:::

### 练习 1：全微分定义的应用

证明 $f(x, y) = x^2 + y^2$ 在原点 $(0, 0)$ 可微。

<details>
<summary>点击查看解析</summary>

**解析**：

1. $f(0, 0) = 0, f_x(0, 0) = 0, f_y(0, 0) = 0$。
2. 构造极限：
   $$\lim_{(\Delta x, \Delta y) \to (0, 0)} \frac{f(\Delta x, \Delta y) - f(0, 0) - (0 \cdot \Delta x + 0 \cdot \Delta y)}{\sqrt{\Delta x^2 + \Delta y^2}}$$
   $$= \lim_{\rho \to 0} \frac{\rho^2}{\rho} = \lim_{\rho \to 0} \rho = 0$$
3. 结论：极限为 0，符合全微分定义，故在该点**可微**。

</details>

### 练习 2：链式法则的高阶应用

设 $z = f(x^2 - y^2)$，$f$ 可导，求 $y \frac{\partial z}{\partial x} + x \frac{\partial z}{\partial y}$。

<details>
<summary>点击查看解析</summary>

**解析**：

1. $\frac{\partial z}{\partial x} = f'(x^2 - y^2) \cdot (2x)$。
2. $\frac{\partial z}{\partial y} = f'(x^2 - y^2) \cdot (-2y)$。
3. 代入：
   $y(2x f') + x(-2y f') = 2xy f' - 2xy f' = 0$。
   **结论**：该表达式的值恒为 **0**。

</details>

### 练习 3：切平面方程计算

求曲面 $z = x^2 + y^2$ 在点 $(1, 2, 5)$ 处的切平面方程。

<details>
<summary>点击查看解析</summary>

**解析**：

1. 偏导数：$z_x = 2x, z_y = 2y$。
2. 在点 $(1, 2)$ 处：$z_x = 2, z_y = 4$。
3. 切平面方程：$z - z_0 = f_x(x-x_0) + f_y(y-y_0)$。
   $z - 5 = 2(x - 1) + 4(y - 2)$
   $2x + 4y - z - 5 = 0$。

</details>

### 练习 4：拉格朗日乘数法基础

求函数 $f(x, y) = xy$ 在约束条件 $x + y = 2$ 下的极值。

<details>
<summary>点击查看解析</summary>

**解析**：

1. 构造拉格朗日函数：$L(x, y, \lambda) = xy + \lambda(x + y - 2)$。
2. 求偏导方程组：
   - $L_x = y + \lambda = 0 \implies y = -\lambda$
   - $L_y = x + \lambda = 0 \implies x = -\lambda$
   - $L_\lambda = x + y - 2 = 0$
3. 解得 $x=1, y=1, \lambda=-1$。
4. 判定：由于区域是紧致的，且这是唯一的驻点，比较边界易知 $f(1, 1) = 1$ 为最大值。

</details>

---

<SupportingExercises
topic="多元函数微分学"
fileId="analysis-multivariable-calculus"
exercises={[
{ index: 17.1, title: "全微分的判定", slug: "练习-171全微分的判定" },
{ index: 17.2, title: "曲率与挠率计算", slug: "练习-172空间曲线的曲率与挠率" },
{ index: 17.3, title: "多元函数 Taylor 展开", slug: "练习-173多元函数的-taylor-展开" }
]}
/>

---

_编者注：Taylor 公式是将复杂函数局部“多项式化”的强力武器，它是数值计算与最优化理论的基石。_
