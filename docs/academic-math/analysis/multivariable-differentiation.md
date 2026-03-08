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

#### **经典反例：偏导数存在但不可微**

考虑函数：

$$f(x, y) = \begin{cases} \frac{xy}{\sqrt{x^2+y^2}}, & (x, y) \neq (0, 0) \\ 0, & (x, y) = (0, 0) \end{cases}$$

- **偏导数**：利用定义可算得 $f_x(0,0)=0, f_y(0,0)=0$。
- **全微分判定**：

$$\lim_{(\Delta x, \Delta y) \to (0, 0)} \frac{\frac{\Delta x \Delta y}{\sqrt{(\Delta x)^2+(\Delta y)^2}} - 0}{\sqrt{(\Delta x)^2+(\Delta y)^2}} = \lim_{\rho \to 0} \frac{\rho^2 \cos \theta \sin \theta}{\rho^2} = \cos \theta \sin \theta$$

极限随角度 $\theta$ 变化而不为 $0$，故在该点不可微。

---

## 二、 复合函数求导与高阶导数

### 1. 链式法则 (Chain Rule)

设 $z = f(u, v)$，$u = \phi(x, y)$，$v = \psi(x, y)$，则：

$$\frac{\partial z}{\partial x} = \frac{\partial z}{\partial u} \frac{\partial u}{\partial x} + \frac{\partial z}{\partial v} \frac{\partial v}{\partial x}$$

### 2. 高阶偏导数与 Clairaut 定理

若混合偏导数 $f_{xy}$ 与 $f_{yx}$ 连续，则它们相等：$f_{xy} = f_{yx}$。

---

## 三、 方向导数与梯度 (Directional Derivative & Gradient)

### 1. 方向导数

函数 $f$ 沿方向 $\mathbf{l} = (\cos \alpha, \cos \beta)$ 的变化率：

$$\frac{\partial f}{\partial l} = f_x \cos \alpha + f_y \cos \beta$$

### 2. 梯度 (Gradient)

向量 $\nabla f = (f_x, f_y)$ 称为梯度。

- **物理意义**：梯度方向是函数增加最快的方向，其模长是最大变化率。

---

## 四、 多元 Taylor 公式 (Taylor's Formula)

多元 Taylor 公式是局部多项式逼近的基础。

### 1. 二元函数的 Taylor 公式

设 $f(x, y)$ 在点 $(x_0, y_0)$ 的某邻域内具有 $(n+1)$ 阶连续偏导数。则对于该邻域内的点 $(x_0+h, y_0+k)$，有：

$$f(x_0+h, y_0+k) = f(x_0, y_0) + (h \frac{\partial}{\partial x} + k \frac{\partial}{\partial y})f(x_0, y_0) + \frac{1}{2!} (h \frac{\partial}{\partial x} + k \frac{\partial}{\partial y})^2 f(x_0, y_0) + \dots + R_n$$

其中微分算子展开为：
$(h \frac{\partial}{\partial x} + k \frac{\partial}{\partial y})^2 f = h^2 f_{xx} + 2hk f_{xy} + k^2 f_{yy}$。

### 2. 带有 Lagrange 余项的形式

$R_n = \frac{1}{(n+1)!} (h \frac{\partial}{\partial x} + k \frac{\partial}{\partial y})^{n+1} f(x_0 + \theta h, y_0 + \theta k)$，$0 < \theta < 1$。

---

## 五、 深度实战解析

### 深度例题 1：利用 Taylor 展开求极值

利用二阶 Taylor 展开，分析函数 $f(x, y)$ 在驻点附近的行为。

<details>

<summary>点击查看解析</summary>

在驻点 $(x_0, y_0)$ 处，$f_x = f_y = 0$。Taylor 展开为：

$$f(x_0+h, y_0+k) - f(x_0, y_0) \approx \frac{1}{2} (Ah^2 + 2Bhk + Ck^2)$$

其中 $A=f_{xx}, B=f_{xy}, C=f_{yy}$。
右侧是一个二次型。其性质（正定、负定、不定）直接决定了该驻点是极小值点、极大值点还是鞍点。这正是 Hessian 矩阵判别法的理论来源。

</details>

---

<SupportingExercises
topic="多元函数微分学"
exercises={[
{ index: 126, title: "方向导数与梯度", slug: "练习-126方向导数与梯度" },
{ index: 127, title: "全微分与可微性", slug: "练习-127全微分与可微性" },
{ index: 128, title: "切平面与法线", slug: "练习-128切平面与法线" },
{ index: 129, title: "二元函数极值", slug: "练习-129二元函数极值" }
]}
/>

---

_编者注：Taylor 公式是将复杂函数局部“多项式化”的强力武器，它是数值计算与最优化理论的基石。_
