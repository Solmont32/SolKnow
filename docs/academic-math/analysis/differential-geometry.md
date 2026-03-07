---
title: 空间曲线与曲面的微分几何 (Differential Geometry of Curves and Surfaces)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 空间曲线与曲面的微分几何

微分几何是利用微积分的方法研究空间图形几何性质的一门学科。在数学分析中，我们主要关注其“初步”部分：即如何利用多元函数导数来描述曲线的弯曲、扭转以及曲面的切平性质。

---

## 一、 空间曲线的局部性质

设空间曲线 $C$ 的参数方程为 $\mathbf{r}(t) = (x(t), y(t), z(t))$，$t \in [a, b]$。

### 1. 切向量与切线 (Tangent)
若 $\mathbf{r}(t)$ 可微且 $\mathbf{r}'(t) \neq \mathbf{0}$，则曲线在点 $P(t)$ 处的**切向量**为：
$$\mathbf{T}_{vec} = \mathbf{r}'(t) = (x'(t), y'(t), z'(t))$$
**切线方程**：
$$\frac{X - x(t)}{x'(t)} = \frac{Y - y(t)}{y'(t)} = \frac{Z - z(t)}{z'(t)}$$

### 2. 法平面 (Normal Plane)
垂直于切线的平面称为**法平面**。其方程为：
$$x'(t)(X - x(t)) + y'(t)(Y - y(t)) + z'(t)(Z - z(t)) = 0$$

### 3. 弧长参数 (Arc Length)
弧长 $s(t) = \int_{a}^t |\mathbf{r}'(u)| du$。当以弧长 $s$ 为参数时，$|\mathbf{r}'(s)| = 1$，这极大简化了理论推导。

---

## 二、 Frenet 标架与曲率、挠率

对于非退化曲线（$\mathbf{r}'' \neq \mathbf{0}$），我们在每一点可以建立一个正交规范标架 $\{\mathbf{T}, \mathbf{N}, \mathbf{B}\}$。

### 1. 三个单位向量
- **单位切向量**：$\mathbf{T} = \frac{\mathbf{r}'(t)}{|\mathbf{r}'(t)|}$
- **单位副法向量**：$\mathbf{B} = \frac{\mathbf{r}'(t) \times \mathbf{r}''(t)}{|\mathbf{r}'(t) \times \mathbf{r}''(t)|}$
- **单位主法向量**：$\mathbf{N} = \mathbf{B} \times \mathbf{T}$

### 2. 曲率 (Curvature) $\kappa$
**定义**：描述曲线偏离直线的程度（切线方向的变化率）。
**计算公式**：
$$\kappa = \frac{|\mathbf{r}'(t) \times \mathbf{r}''(t)|}{|\mathbf{r}'(t)|^3}$$
**几何意义**：$\kappa$ 越大，曲线在该点弯曲得越厉害。曲率半径 $R = 1/\kappa$。

### 3. 挠率 (Torsion) $\tau$
**定义**：描述曲线偏离平面的程度（副法向量方向的变化率）。
**计算公式**：
$$\tau = \frac{(\mathbf{r}'(t), \mathbf{r}''(t), \mathbf{r}'''(t))}{|\mathbf{r}'(t) \times \mathbf{r}''(t)|^2}$$
其中 $(\mathbf{r}', \mathbf{r}'', \mathbf{r}''')$ 为向量的混合积。
**几何意义**：
- $\tau = 0 \iff$ 曲线为平面曲线。
- $\tau > 0$ 表示曲线呈“右手螺旋”状上升。

---

## 三、 曲面的切平面与法线

### 1. 隐式方程形式 $F(x, y, z) = 0$
若 $F$ 在点 $P_0(x_0, y_0, z_0)$ 可微且梯度 $\nabla F \neq \mathbf{0}$，则：
- **法向量**：$\mathbf{n} = (F_x, F_y, F_z)|_{P_0}$
- **切平面方程**：$F_x(x-x_0) + F_y(y-y_0) + F_z(z-z_0) = 0$
- **法线方程**：$\frac{X-x_0}{F_x} = \frac{Y-y_0}{F_y} = \frac{Z-z_0}{F_z}$

### 2. 显式方程形式 $z = f(x, y)$
令 $F(x, y, z) = f(x, y) - z$，代入上式得：
- **切平面**：$z - z_0 = f_x(x_0, y_0)(x - x_0) + f_y(x_0, y_0)(y - y_0)$

---

## 四、 深度实战解析

### 深度例题 1：圆柱螺旋线的微分几何属性
已知螺旋线方程 $\mathbf{r}(t) = (a \cos t, a \sin t, bt)$ ($a, b > 0$)。求其曲率与挠率。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **求各阶导数**：
   $\mathbf{r}' = (-a \sin t, a \cos t, b)$
   $\mathbf{r}'' = (-a \cos t, -a \sin t, 0)$
   $\mathbf{r}''' = (a \sin t, -a \cos t, 0)$

2. **计算模长与外积**：
   $|\mathbf{r}'| = \sqrt{a^2 \sin^2 t + a^2 \cos^2 t + b^2} = \sqrt{a^2 + b^2}$
   $\mathbf{r}' \times \mathbf{r}'' = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -a \sin t & a \cos t & b \\ -a \cos t & -a \sin t & 0 \end{vmatrix} = (ab \sin t, -ab \cos t, a^2)$
   $|\mathbf{r}' \times \mathbf{r}''| = \sqrt{a^2b^2 \sin^2 t + a^2b^2 \cos^2 t + a^4} = a\sqrt{a^2 + b^2}$

3. **计算曲率**：
   $$\kappa = \frac{a\sqrt{a^2 + b^2}}{(\sqrt{a^2 + b^2})^3} = \frac{a}{a^2 + b^2}$$

4. **计算挠率**：
   混合积 $(\mathbf{r}', \mathbf{r}'', \mathbf{r}''') = (\mathbf{r}' \times \mathbf{r}'') \cdot \mathbf{r}'''$
   $= (ab \sin t)(a \sin t) + (-ab \cos t)(-a \cos t) + (a^2)(0) = a^2b$
   $$\tau = \frac{a^2b}{(a\sqrt{a^2 + b^2})^2} = \frac{b}{a^2 + b^2}$$

#### 结论
圆柱螺旋线的曲率与挠率均为**常数**。这说明它是空间中均匀弯曲且均匀扭转的曲线。
</details>

---

<SupportingExercises 
  topic="空间解析几何与微分几何" 
  exercises={[
    { index: 28, title: "空间曲面的切平面与法线计算", slug: "练习-28曲面的切平面" },
    { index: 41, title: "空间曲线的切线与法平面", slug: "练习-41曲线切线" },
    { index: 42, title: "圆柱螺旋线的曲率与挠率推导", slug: "练习-42曲率挠率计算" },
    { index: 43, title: "一般参数曲线的 Frenet 标架求解", slug: "练习-43Frenet标架" }
  ]} 
/>

---
*编者注：微分几何初步是多元微积分在几何上的直观映射。掌握曲率与挠率，是进入近代流形几何与物理广义相对论的必经之路。*
