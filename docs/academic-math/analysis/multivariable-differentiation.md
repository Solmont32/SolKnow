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
**定义**：若函数增量可表示为 $\Delta z = A \Delta x + B \Delta y + o(\rho)$，则称函数在点 $(x, y)$ 可微。
**全微分**：$dz = f_x dx + f_y dy$。

> **关键定理**：
> 1. **必要条件**：若可微，则偏导数必存在。
> 2. **充分条件**：若偏导数在点 $(x, y)$ 连续，则函数在该点必可微。

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
    { index: 24, title: "基本偏导数计算训练", slug: "练习-24偏导数计算" },
    { index: 25, title: "多元复合函数链式法则", slug: "练习-25多元复合函数求导链式法则" },
    { index: 26, title: "全微分的求法与形式不变性", slug: "练习-26全微分计算" },
    { index: 27, title: "方向导数与梯度向量", slug: "练习-27方向导数" }
  ]} 
/>

---
*编者注：Taylor 公式是将复杂函数局部“多项式化”的强力武器，它是数值计算与最优化理论的基石。*
