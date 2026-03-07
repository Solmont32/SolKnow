---
title: 曲线与曲面积分：格林、高斯与斯托克斯公式 (Vector Calculus)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 曲线与曲面积分：格林、高斯与斯托克斯公式

向量微积分是多元微积分的巅峰，它通过格林公式、高斯公式和斯托克斯公式，将低维几何对象的性质与高维区域的整体特征完美地联系在一起。本章将深入解析这些公式的物理背景、数学构造及其内在的统一性。

## 一、 曲线积分 (Line Integrals)

### 1. 第一类曲线积分（对弧长）
设 $f(x, y, z)$ 在曲线 $\Gamma$ 上连续。
- **定义**：$\int_\Gamma f(x, y, z) ds = \lim_{\lambda \to 0} \sum f(\xi_i, \eta_i, \zeta_i) \Delta s_i$。
- **物理意义**：若 $f$ 为线密度，则积分为总质量。
- **计算**：若 $\Gamma: r(t) = (x(t), y(t), z(t)), \alpha \le t \le \beta$，则：
  $$\int_\Gamma f ds = \int_\alpha^\beta f(x(t), y(t), z(t)) \sqrt{x'(t)^2 + y'(t)^2 + z'(t)^2} dt$$

### 2. 第二类曲线积分（对坐标/向量场）
设 $\mathbf{F} = (P, Q, R)$ 为向量场，$\Gamma$ 为有向曲线。
- **定义**：$\int_\Gamma \mathbf{F} \cdot d\mathbf{r} = \int_\Gamma P dx + Q dy + R dz$。
- **物理意义**：力场 $\mathbf{F}$ 沿路径 $\Gamma$ 所做的功。
- **性质**：积分值依赖于曲线的方向。

---

## 二、 曲面积分 (Surface Integrals)

### 1. 第一类曲面积分（对面积）
- **定义**：$\iint_\Sigma f(x, y, z) dS = \lim_{\lambda \to 0} \sum f(\xi_i, \eta_i, \zeta_i) \Delta S_i$。
- **几何意义**：若 $f=1$，积分为曲面面积；若 $f$ 为面密度，积分为总质量。
- **计算**：若 $\Sigma$ 在 $xy$ 平面的投影为 $D_{xy}$，且方程为 $z = z(x, y)$，则：
  $$\iint_\Sigma f dS = \iint_{D_{xy}} f(x, y, z(x, y)) \sqrt{1 + z_x^2 + z_y^2} dxdy$$

### 2. 第二类曲面积分（对坐标/通量）
- **定义**：$\iint_\Sigma \mathbf{F} \cdot d\mathbf{S} = \iint_\Sigma (P \cos \alpha + Q \cos \beta + R \cos \gamma) dS$，其中 $(\cos \alpha, \cos \beta, \cos \gamma)$ 是 $\Sigma$ 的单位法向量。
- **物理意义**：流体通过曲面的流量。
- **注意**：积分结果取决于曲面的侧（Side），即法向量的方向。

---

## 三、 三大核心公式：维度的桥梁


### 1. 格林公式 (Green's Theorem) —— 平面的奥秘
**内容**：设 $D$ 是平面闭区域，$L$ 是 $D$ 的正向边界（逆时针）。若 $P, Q$ 在 $D$ 上有一阶连续偏导数，则：
$$\oint_L P dx + Q dy = \iint_D \left( \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right) dA$$

<KnowledgeCard type="info" title="格林公式的本质">
格林公式揭示了边界上的“累积效应”（功）等于内部“旋转程度”（旋度）的面积分。它是微积分基本定理在二维平面的直接推广。
</KnowledgeCard>

### 2. 高斯公式 (Gauss's Divergence Theorem) —— 通量的守恒
**内容**：设 $\Omega$ 是空间闭区域，$\Sigma$ 是 $\Omega$ 的整个外侧边界曲面。若 $P, Q, R$ 在 $\Omega$ 上有一阶连续偏导数，则：
$$\oiint_\Sigma P dydz + Q dzdx + R dxdy = \iiint_\Omega \left( \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z} \right) dV$$

- **散度 (Divergence)**：$\text{div } \mathbf{F} = \nabla \cdot \mathbf{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}$。
- **物理意义**：穿过闭曲面的总通量等于内部源（散度）的总量。

### 3. 斯托克斯公式 (Stokes's Theorem) —— 旋转的传递
**内容**：设 $\Sigma$ 是空间有向曲面，$\Gamma$ 是 $\Sigma$ 的正向边界曲线。则：
$$\oint_\Gamma \mathbf{F} \cdot d\mathbf{r} = \iint_\Sigma (\nabla \times \mathbf{F}) \cdot d\mathbf{S}$$

- **旋度 (Curl)**：$\text{curl } \mathbf{F} = \nabla \times \mathbf{F}$。
- **物理意义**：沿边界的环量等于场在曲面上旋度的通量。

---

## 四、 深度深度解析：广义 Stokes 公式与统一性

微积分中的基本定理、格林公式、高斯公式和斯托克斯公式，本质上都是**广义 Stokes 公式**的特例：
$$\int_\Omega d\omega = \int_{\partial \Omega} \omega$$
其中 $d$ 是外微分，$\partial$ 是求边界算子。这个简洁的等式高度浓缩了：**“内部的某种整体变化等于边界上的某种累积效应”**。

---

## 五、 典型教材例题解析

### 例题 1：格林公式计算闭曲线积分
计算 $\oint_L (e^x \sin y - 16y) dx + (e^x \cos y - 1) dy$，其中 $L$ 为圆周 $x^2 + y^2 = 25$（逆时针方向）。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **识别函数**：$P = e^x \sin y - 16y$, $Q = e^x \cos y - 1$。
2. **求偏导数**：
   $\frac{\partial Q}{\partial x} = e^x \cos y$
   $\frac{\partial P}{\partial y} = e^x \cos y - 16$
3. **应用格林公式**：
   $I = \iint_D (\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}) dA = \iint_D (e^x \cos y - (e^x \cos y - 16)) dA$
   $I = \iint_D 16 dA$
4. **计算面积**：区域 $D$ 是半径为 5 的圆，面积 $S = 25\pi$。
   $I = 16 \times 25\pi = 400\pi$。

#### 答案
$400\pi$
</details>

### 例题 2：利用高斯公式求通量
计算曲面积分 $I = \oiint_\Sigma x^3 dydz + y^3 dzdx + z^3 dxdy$，其中 $\Sigma$ 是球体 $x^2 + y^2 + z^2 = a^2$ 的外侧面。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **应用高斯公式**：
   $\text{div } \mathbf{F} = \frac{\partial(x^3)}{\partial x} + \frac{\partial(y^3)}{\partial y} + \frac{\partial(z^3)}{\partial z} = 3x^2 + 3y^2 + 3z^2$。
2. **转化为三重积分**：
   $I = \iiint_\Omega 3(x^2 + y^2 + z^2) dV$。
3. **使用球坐标**：
   $I = 3 \int_0^{2\pi} d\phi \int_0^\pi \sin \theta d\theta \int_0^a r^2 \cdot r^2 \sin \theta dr$ —— 错误，球坐标体积元素是 $r^2 \sin \theta$。
   正确计算：$I = 3 \int_0^{2\pi} d\phi \int_0^\pi \sin \theta d\theta \int_0^a r^2 \cdot (r^2 \sin \theta dr) = 3 \cdot 2\pi \cdot 2 \cdot \int_0^a r^4 dr = 12\pi \cdot \frac{a^5}{5}$。
   $I = \frac{12}{5}\pi a^5$。

#### 答案
$\frac{12}{5}\pi a^5$
</details>

### 例题 3：斯托克斯公式的应用
计算 $\oint_\Gamma y dx + z dy + x dz$，其中 $\Gamma$ 为平面 $x + y + z = 1$ 与三个坐标平面的交线，方向从 $z$ 轴正向看去为逆时针。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **计算旋度**：
   $\mathbf{F} = (y, z, x)$。
   $\nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ y & z & x \end{vmatrix} = (-1, -1, -1)$。
2. **应用斯托克斯公式**：
   $I = \iint_\Sigma (\nabla \times \mathbf{F}) \cdot d\mathbf{S} = \iint_\Sigma (-1, -1, -1) \cdot \mathbf{n} dS$。
3. **确定单位法向量**：
   平面为 $x + y + z = 1$，法向量 $\mathbf{n} = \frac{(1, 1, 1)}{\sqrt{3}}$（向上）。
4. **计算**：
   $I = \iint_\Sigma (-1, -1, -1) \cdot \frac{(1, 1, 1)}{\sqrt{3}} dS = \iint_\Sigma -\frac{3}{\sqrt{3}} dS = -\sqrt{3} \iint_\Sigma dS$。
   $\iint_\Sigma dS$ 是三角形面积。顶点为 $(1,0,0), (0,1,0), (0,0,1)$，边长为 $\sqrt{2}$。
   面积 $S = \frac{\sqrt{3}}{4} (\sqrt{2})^2 = \frac{\sqrt{3}}{2}$。
5. **结果**：
   $I = -\sqrt{3} \cdot \frac{\sqrt{3}}{2} = -\frac{3}{2}$。

#### 答案
$-3/2$
</details>

### 例题 4：利用高斯公式计算非闭合曲面的通量
计算曲面积分 $I = \iint_\Sigma x d y d z + y d z d x + z d x d y$，其中 $\Sigma$ 是抛物面 $z = 1 - x^2 - y^2$ 在 $xy$ 平面上方的部分，方向取上侧。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **构造闭合曲面**：
   $\Sigma$ 不是闭合曲面。为了使用高斯公式，我们添加底面 $\Sigma_1: z=0, x^2+y^2 \le 1$，方向取下侧（即 $\mathbf{n} = (0, 0, -1)$）。
   设由 $\Sigma$ 和 $\Sigma_1$ 围成的闭区域为 $\Omega$。
2. **应用高斯公式**：
   $\oiint_{\Sigma \cup \Sigma_1} \mathbf{F} \cdot d\mathbf{S} = \iiint_\Omega \text{div } \mathbf{F} dV = \iiint_\Omega (1 + 1 + 1) dV = 3 \text{Vol}(\Omega)$。
3. **计算体积**：
   $\text{Vol}(\Omega) = \iint_{x^2+y^2 \le 1} (1 - x^2 - y^2) dA = \int_0^{2\pi} d\theta \int_0^1 (1-r^2)r dr = 2\pi \cdot [r^2/2 - r^4/4]_0^1 = \frac{\pi}{2}$。
   故 $\oiint = 3 \cdot \frac{\pi}{2} = \frac{3\pi}{2}$。
4. **计算底面 $\Sigma_1$ 的通量**：
   在 $\Sigma_1$ 上，$z=0, \mathbf{n} = (0, 0, -1)$。
   $\iint_{\Sigma_1} \mathbf{F} \cdot d\mathbf{S} = \iint_{\Sigma_1} (x, y, 0) \cdot (0, 0, -1) dS = \iint_{\Sigma_1} 0 dS = 0$。
5. **求得结果**：
   $I = \oiint - \iint_{\Sigma_1} = \frac{3\pi}{2} - 0 = \frac{3\pi}{2}$。

#### 答案
$3\pi/2$
</details>
