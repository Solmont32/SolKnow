---
title: 第二十二章 曲面积分 (Surface Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第二十二章 曲面积分

曲面积分是二重积分在空间曲面上的推广。本章将涵盖第一类（对面积）和第二类（对坐标）曲面积分，并探讨高斯公式与斯托克斯公式，它们分别连接了通量与散度、环量与旋度。

## 一、 第一类曲面积分（对面积）

### 1. 定义与几何意义
设 $f(x, y, z)$ 是定义在有界光滑曲面 $\Sigma$ 上的连续函数。
- **定义**：$\iint_\Sigma f(x, y, z) dS = \lim_{\lambda \to 0} \sum f(\xi_i, \eta_i, \zeta_i) \Delta S_i$。
- **几何意义**：若 $f(x, y, z) = 1$，则积分为曲面 $\Sigma$ 的面积。
- **物理意义**：若 $f$ 为面密度，则积分为曲面的总质量。

### 2. 计算公式
若 $\Sigma$ 方程为 $z = z(x, y)$，其在 $xy$ 平面上的投影为 $D_{xy}$，且 $z(x, y)$ 具有连续偏导数，则：
$$\iint_\Sigma f dS = \iint_{D_{xy}} f(x, y, z(x, y)) \sqrt{1 + z_x^2 + z_y^2} dxdy$$

---

## 二、 第二类曲面积分（对坐标/通量）

### 1. 定义与法向量
设 $\mathbf{F} = (P, Q, R)$ 为向量场，$\Sigma$ 为有向曲面，其单位法向量为 $\mathbf{n} = (\cos \alpha, \cos \beta, \cos \gamma)$。
- **定义**：$\iint_\Sigma \mathbf{F} \cdot d\mathbf{S} = \iint_\Sigma (P \cos \alpha + Q \cos \beta + R \cos \gamma) dS$。
- **物理意义**：描述流体在单位时间内穿过曲面 $\Sigma$ 的流量（通量）。
- **侧的选择**：积分值取决于曲面的法向量方向（上侧/下侧，内侧/外侧）。

### 2. 计算技巧（投影法）
若 $\Sigma$ 方程为 $z = z(x, y)$，方向取上侧，则：
$$\iint_\Sigma R dxdy = \iint_{D_{xy}} R(x, y, z(x, y)) dxdy$$
若方向取下侧，则需加负号。

---

## 三、 高斯公式与散度

### 1. 高斯公式 (Gauss's Divergence Theorem)
设 $\Omega$ 是空间闭区域，$\Sigma$ 是其整个外侧边界曲面。若 $P, Q, R$ 在 $\Omega$ 上具有一阶连续偏导数，则：
$$\oiint_\Sigma P dydz + Q dzdx + R dxdy = \iiint_\Omega \left( \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z} \right) dV$$

### 2. 散度 (Divergence)
向量场 $\mathbf{F} = (P, Q, R)$ 的散度定义为：
$$\text{div } \mathbf{F} = \nabla \cdot \mathbf{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}$$
高斯公式简写为：$\oiint_\Sigma \mathbf{F} \cdot d\mathbf{S} = \iiint_\Omega \text{div } \mathbf{F} dV$。

---

## 四、 斯托克斯公式与旋度

### 1. 斯托克斯公式 (Stokes's Theorem)
设 $\Sigma$ 是由分段光滑有向闭曲线 $\Gamma$ 围成的有向曲面，$\Gamma$ 的方向与 $\Sigma$ 的侧符合右手螺旋定则：
$$\oint_\Gamma \mathbf{F} \cdot d\mathbf{r} = \iint_\Sigma (\nabla \times \mathbf{F}) \cdot d\mathbf{S}$$

### 2. 旋度 (Curl)
向量场 $\mathbf{F}$ 的旋度定义为：
$$\text{curl } \mathbf{F} = \nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ P & Q & R \end{vmatrix}$$

---

## 五、 典型教材例题解析

### 例题 1：利用高斯公式求通量
计算 $I = \oiint_\Sigma x^3 dydz + y^3 dzdx + z^3 dxdy$，其中 $\Sigma$ 是球面 $x^2 + y^2 + z^2 = a^2$ 的外侧。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **计算散度**：
   $\text{div } \mathbf{F} = 3x^2 + 3y^2 + 3z^2 = 3(x^2 + y^2 + z^2)$。
2. **转换积分**：
   $I = \iiint_\Omega 3(x^2 + y^2 + z^2) dV$。
3. **使用球坐标**：
   $I = 3 \int_0^{2\pi} d\phi \int_0^\pi \sin \theta d\theta \int_0^a r^2 \cdot r^2 \sin \theta dr$
   $I = 3 \cdot (2\pi) \cdot (2) \cdot [\frac{1}{5}r^5]_0^a = \frac{12\pi a^5}{5}$。

#### 答案
$\frac{12}{5}\pi a^5$
</details>

### 例题 2：斯托克斯公式计算线积分
计算 $\oint_\Gamma y dx + z dy + x dz$，其中 $\Gamma$ 为平面 $x+y+z=1$ 与坐标平面的交线（逆时针）。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **计算旋度**：
   $\nabla \times \mathbf{F} = (-1, -1, -1)$。
2. **应用公式**：
   $\iint_\Sigma (-1, -1, -1) \cdot \mathbf{n} dS$。
   法向量 $\mathbf{n} = \frac{1}{\sqrt{3}}(1, 1, 1)$。
   积分 $= \iint_\Sigma -\frac{3}{\sqrt{3}} dS = -\sqrt{3} \cdot \text{Area}(\Sigma)$。
3. **求面积**：
   三角形边长为 $\sqrt{2}$，面积为 $\frac{\sqrt{3}}{2}$。
   结果 $= -\sqrt{3} \cdot \frac{\sqrt{3}}{2} = -3/2$。

#### 答案
$-3/2$
</details>

---

<SupportingExercises 
  topic="曲面积分" 
  exercises={[
    { index: 9, title: "高斯公式求通量", slug: "练习-9高斯公式求穿过球面的通量" },
    { index: 10, title: "斯托克斯公式计算线积分", slug: "练习-10斯托克斯公式计算线积分" }
  ]} 
/>

---
*编者注：曲面积分是场论的语言。高斯公式和斯托克斯公式不仅是数学工具，更是物理学中麦克斯韦方程组的几何基石。*
