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

## 四、 Lagrange 乘数法的严格证明与几何意义

### 1. 定理陈述
求 $f(x, y, z)$ 在约束 $g(x, y, z) = 0$ 下的极值。若 $P_0$ 是极值点且 $\nabla g(P_0) \neq \mathbf{0}$，则存在 $\lambda$ 使得 $\nabla f(P_0) + \lambda \nabla g(P_0) = \mathbf{0}$。

### 2. 几何意义：梯度共线
在约束曲线/曲面 $g=0$ 上，极值点 $P_0$ 处的等值面 $f=c$ 必须与约束面 $g=0$ **相切**。
- 如果不相切（即 $\nabla f$ 与 $\nabla g$ 不共线），则 $\nabla f$ 在约束面切平面上有非零分量，函数值可以沿该方向继续增大或减小，故不是极值点。
- 因此，$\nabla f$ 必须垂直于约束面的切空间，即 $\nabla f \parallel \nabla g$。

### 3. 严格证明：链式法则法
由于 $\nabla g \neq 0$，假设 $g_z(P_0) \neq 0$。根据隐函数定理，局部存在 $z = z(x, y)$。
令 $h(x, y) = f(x, y, z(x, y))$。在极值点 $P_0$，$h$ 的全微分为 $0$：
$$dh = f_x dx + f_y dy + f_z dz = 0$$
而由 $g(x, y, z) = 0$ 可得：
$$dg = g_x dx + g_y dy + g_z dz = 0$$
由 $dg=0$ 解出 $dz = -\frac{1}{g_z}(g_x dx + g_y dy)$ 代入 $dh=0$：
$$(f_x - f_z \frac{g_x}{g_z}) dx + (f_y - f_z \frac{g_y}{g_z}) dy = 0$$
由于 $dx, dy$ 独立，系数必为 $0$：
$$\frac{f_x}{g_x} = \frac{f_y}{g_y} = \frac{f_z}{g_z} = -\lambda$$
由此得辅助函数（Lagrangian） $L = f + \lambda g$ 的驻点方程。

### 4. 多约束情形
若有多个约束 $g_1=0, g_2=0, \dots, g_m=0$，则极值点处目标函数的梯度必须处于约束函数梯度的张成空间内：
$$\nabla f + \sum_{i=1}^m \lambda i \nabla g_i = \mathbf{0}$$
这要求目标函数的梯度与所有约束面的交集（流形）的切空间正交。

---

## 五、 判别极值的充分条件：Hessian 矩阵

在求得驻点后，需判定其性质：
1. **无条件极值**：检查 Hessian 矩阵 $H(f)$ 的正定性。
2. **条件极值**：严格来说需检查 **有约束的 Hessian (Bordered Hessian)**，或将约束代入后化为低维无条件极值问题进行判定。

---

## 六、 深度实战解析

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
