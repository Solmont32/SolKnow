---
title: 隐函数定理及其应用 (Implicit Function Theorem and Applications)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第十八章 隐函数定理及其应用

隐函数定理是数学分析中最深刻的定理之一。它描述了方程在局部能否解出变量的条件，并将多元微分学的应用从显式函数推广到由方程定义的隐式图形。

## 一、 隐函数定理 (Implicit Function Theorem)

### 1. 单个方程的情形
**定理**：设 $F(x, y)$ 在点 $P_0(x_0, y_0)$ 的邻域内连续可微，且：
1. $F(x_0, y_0) = 0$
2. $F_y(x_0, y_0) \neq 0$
则在 $x_0$ 附近唯一确定连续可微函数 $y = f(x)$，且 $\frac{dy}{dx} = -\frac{F_x}{F_y}$。

### 2. 方程组与雅可比行列式
对于方程组 $F(\mathbf{x}, \mathbf{y}) = 0, G(\mathbf{x}, \mathbf{y}) = 0$，其隐函数存在的关键是雅可比行列式 $\frac{\partial(F, G)}{\partial(u, v)} \neq 0$。

---

## 二、 逆函数定理 (Inverse Function Theorem)

若映射 $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^n$ 在 $\mathbf{x}_0$ 处连续可微且 $J_{\mathbf{f}}(\mathbf{x}_0) \neq 0$，则 $\mathbf{f}$ 在 $\mathbf{x}_0$ 附近存在局部逆函数。

---

## 三、 多元函数的极值 (Extremum)

### 1. 无条件极值
- **必要条件**：驻点 $f_x = f_y = 0$。
- **充分条件**：Hessian 矩阵 $H = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}$。
  - $H$ 正定 $\Rightarrow$ 极小值。
  - $H$ 负定 $\Rightarrow$ 极大值。
  - $H$ 不定 $\Rightarrow$ 鞍点。

---

## 四、 Lagrange 乘数法的严格证明

### 1. 定理陈述
求 $f(x, y)$ 在约束 $g(x, y) = 0$ 下的极值。若 $(x_0, y_0)$ 是极值点且 $\nabla g(x_0, y_0) \neq \mathbf{0}$，则存在 $\lambda$ 使得 $\nabla f(x_0, y_0) + \lambda \nabla g(x_0, y_0) = \mathbf{0}$。

### 2. 严格证明过程
**第一步：利用隐函数定理局部化**
由于 $\nabla g \neq 0$，不妨设 $g_y(x_0, y_0) \neq 0$。根据隐函数定理，在 $x_0$ 的邻域内，方程 $g(x, y) = 0$ 唯一确定了连续可微函数 $y = y(x)$，且：
$$y'(x) = -\frac{g_x(x, y(x))}{g_y(x, y(x))}$$

**第二步：化为一元函数极值问题**
将约束代入目标函数，定义复合函数 $h(x) = f(x, y(x))$。
由于 $(x_0, y_0)$ 是 $f$ 在约束下的极值点，则 $x_0$ 必须是 $h(x)$ 的无条件极值点。由 Fermat 引理可知：
$$h'(x_0) = 0$$

**第三步：链式法则展开**
$$h'(x) = \frac{\partial f}{\partial x} + \frac{\partial f}{\partial y} y'(x) = f_x - f_y \frac{g_x}{g_y} = 0$$
整理得：
$$\frac{f_x(x_0, y_0)}{g_x(x_0, y_0)} = \frac{f_y(x_0, y_0)}{g_y(x_0, y_0)}$$

**第四步：引入乘子 $\lambda$**
令上述比值为 $-\lambda$，则有：
$$f_x + \lambda g_x = 0, \quad f_y + \lambda g_y = 0$$
证毕。

---

## 五、 深度实战解析

### 深度例题 1：隐函数方程组求导
设 $u+v=x+y$，$xu+yv=1$，求 $\frac{\partial u}{\partial x}$。

<details>
<summary>点击查看解析</summary>

对两方程关于 $x$ 求偏导（视 $y$ 为常数）：
1. $u_x + v_x = 1$
2. $u + xu_x + yv_x = 0 \Rightarrow xu_x + yv_x = -u$

利用克莱姆法则解线性方程组：
系数行列式 $J = \begin{vmatrix} 1 & 1 \\ x & y \end{vmatrix} = y - x$。
若 $y \neq x$，则：
$$u_x = \frac{\begin{vmatrix} 1 & 1 \\ -u & y \end{vmatrix}}{y - x} = \frac{y + u}{y - x}$$
</details>

---

<SupportingExercises 
  topic="隐函数与极值" 
  exercises={[
    { index: 29, title: "隐函数求导公式应用", slug: "练习-29隐函数求导" },
    { index: 39, title: "隐函数方程组求导进阶", slug: "练习-39隐函数求导方程组" },
    { index: 11, title: "多元函数极值判别综合", slug: "练习-11多元函数极值判别" },
    { index: 12, title: "Lagrange 乘数法与条件极值", slug: "练习-12lagrange乘数法应用" }
  ]} 
/>

---
*编者注：隐函数定理是连接几何与代数的桥梁。通过约束条件的局部解出，我们将复杂的条件极值问题转化为了熟悉的一元微积分问题。*
