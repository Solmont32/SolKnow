---
title: 第二十章 重积分 (Multiple Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第二十章 重积分

重积分是定积分在多元函数上的推广。它不仅是计算高维体积、质量、引力等物理量的核心工具，更是多变量微积分的核心内容。本章将深入探讨重积分的定义、计算技巧以及在各种坐标系下的变换。

## 一、 重积分的定义与性质

### 1. 定义

设 $f(\mathbf{x})$ 是定义在 $n$ 维有界闭区域 $\Omega \subset \mathbb{R}^n$ 上的有界函数。通过对 $\Omega$ 进行有限分割 $\Delta = \{ \Delta \Omega_1, \dots, \Delta \Omega_k \}$，并取点 $\xi_i \in \Delta \Omega_i$，构造 Riemann 和：

$$S(f, \Delta) = \sum_{i=1}^k f(\xi_i) \mu(\Delta \Omega_i)$$

其中 $\mu$ 表示测度（面积或体积）。若当分割的模 $\|\Delta\| \to 0$ 时，极限存在且与分割及取点无关，则称 $f$ 在 $\Omega$ 上**可积**，记为 $\int_\Omega f(\mathbf{x}) dV$。

---

## 二、 坐标变换与雅可比 (Jacobian) 行列式

坐标变换是简化重积分计算的关键。本节详细推导雅可比公式。

### 1. 变量替换公式

设变换 $T: \Omega' \to \Omega$ 由 $x = x(u, v, w), y = y(u, v, w), z = z(u, v, w)$ 给出。若 $T$ 是 $C^1$ 级的且在 $\Omega'$ 内是单射的（雅可比行列式不为零），则：

$$\iiint_\Omega f(x, y, z) dx dy dz = \iiint_{\Omega'} f(x(u, v, w), \dots) \left| \frac{\partial(x, y, z)}{\partial(u, v, w)} \right| du dv dw$$

### 2. Jacobian 的几何推导

考虑二维变换 $(x, y) = \Phi(u, v)$。在 $u-v$ 平面上的一个小矩形 $\Delta u \times \Delta v$，其顶点为 $(u, v), (u+\Delta u, v), (u, v+\Delta v), (u+\Delta u, v+\Delta v)$。
变换后的区域在 $x-y$ 平面近似为一个**平行四边形**，其相邻两条边对应的向量为：

$$\mathbf{a} \approx \left( \frac{\partial x}{\partial u}, \frac{\partial y}{\partial u} \right) \Delta u, \quad \mathbf{b} \approx \left( \frac{\partial x}{\partial v}, \frac{\partial y}{\partial v} \right) \Delta v$$

该平行四边形的面积 $\Delta A$ 为：

$$\Delta A = |\mathbf{a} \times \mathbf{b}| = \left| \det \begin{pmatrix} \frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} \\ \frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} \end{pmatrix} \right| \Delta u \Delta v = |J| \Delta u \Delta v$$

因此，面积元素的缩放因子即为 **雅可比行列式的绝对值**。

<KnowledgeCard type="info" title="雅可比矩阵的物理意义">
雅可比矩阵 $D\Phi$ 是线性逼近的核心。它将 $u-v$ 空间的一个无穷小正方体映射为 $x-y$ 空间的一个斜平行六面体。行列式则度量了这个局部映射对体积的拉伸或压缩程度。
</KnowledgeCard>

---

## 三、 三重积分的坐标系选择

### 1. 柱坐标变换 (Cylindrical Coordinates)

- **定义**：$x = \rho \cos \phi, y = \rho \sin \phi, z = z$。
- **雅可比行列式**：

$$J = \frac{\partial(x, y, z)}{\partial(\rho, \phi, z)} = \det \begin{pmatrix} \cos \phi & -\rho \sin \phi & 0 \\ \sin \phi & \rho \cos \phi & 0 \\ 0 & 0 & 1 \end{pmatrix} = \rho$$

- **适用场景**：具有旋转对称轴（通常为 $z$ 轴）的区域。

### 2. 球坐标变换 (Spherical Coordinates)

- **定义**：$x = r \sin \theta \cos \phi, y = r \sin \theta \sin \phi, z = r \cos \theta$。
- **雅可比行列式**：

$$J = \frac{\partial(x, y, z)}{\partial(r, \theta, \phi)} = \det \begin{pmatrix} \sin \theta \cos \phi & r \cos \theta \cos \phi & -r \sin \theta \sin \phi \\ \sin \theta \sin \phi & r \cos \theta \sin \phi & r \sin \theta \cos \phi \\ \cos \theta & -r \sin \theta & 0 \end{pmatrix} = r^2 \sin \theta$$

- **适用场景**：关于原点对称或具有圆锥形边界的区域。

### 3. 复杂换元与广义雅可比 (Deep Analysis)

在处理非标准区域或具有特定代数结构的被积函数时，雅可比矩阵的构造至关重要。

**案例：非线性坐标变换 $x = u^2 - v^2, y = 2uv$**
这是一个经典的映射（复平面下的 $w = z^2$）。其雅可比行列式为：

$$J = \frac{\partial(x, y)}{\partial(u, v)} = \det \begin{pmatrix} 2u & -2v \\ 2v & 2u \end{pmatrix} = 4(u^2 + v^2)$$

这种变换常用于处理边界为抛物线的区域。

<KnowledgeCard type="warning" title="雅可比行列式的零点问题">
若在区域内 $J = 0$，变换可能不再是单射的，这会导致积分区域的叠加或遗漏。在实际应用中，必须确保变换在积分区域内部是“一一对应”的。
</KnowledgeCard>

---

## 四、 重积分的物理应用 (Applications)

重积分不仅是数学抽象，更是经典力学的基础。以下是对标 Ch 20 的核心应用公式与例题。

### 1. 质量与质心 (Mass and Centroid)

对于密度分布为 $\rho(\mathbf{x})$ 的物体 $\Omega$：

- **总质量**：$M = \iiint_\Omega \rho(x, y, z) dV$
- **质心坐标** ($\bar{x}, \bar{y}, \bar{z}$)：

$$\bar{x} = \frac{1}{M} \iiint_\Omega x \rho dV, \quad \bar{y} = \frac{1}{M} \iiint_\Omega y \rho dV, \quad \bar{z} = \frac{1}{M} \iiint_\Omega z \rho dV$$

### 2. 转动惯量 (Moment of Inertia)

物体 $\Omega$ 对某轴 $L$ 的转动惯量 $I_L$：

$$I_L = \iiint_\Omega r^2(x, y, z) \rho(x, y, z) dV$$

其中 $r$ 是点 $(x, y, z)$ 到轴 $L$ 的垂直距离。

### 3. 引力 (Gravitational Force)

质量为 $M$ 的物体 $\Omega$ 对位于 $(x_0, y_0, z_0)$ 处质量为 $m$ 的质点的引力 $\mathbf{F}$：

$$\mathbf{F} = G m \iiint_\Omega \frac{\rho(x, y, z)}{r^3} (\mathbf{r} - \mathbf{r}_0) dV$$

---

## 五、 物理应用典型例题解析

### 例题 5：半圆盘的质心（二重积分）

求半径为 $R$ 的均匀半圆盘 $x^2 + y^2 \le R^2, y \ge 0$ 的质心。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **对称性分析**：由于图形关于 $y$ 轴对称且密度均匀，故 $\bar{x} = 0$。
2. **计算质量**：$M = \sigma \cdot \frac{1}{2}\pi R^2$（$\sigma$ 为面密度）。
3. **计算 $y$ 方向矩**：

$$M_x = \iint_D y \sigma dA = \sigma \int_0^\pi d\theta \int_0^R (r \sin \theta) r dr$$

$$M_x = \sigma \int_0^\pi \sin \theta d\theta \int_0^R r^2 dr = \sigma \cdot 2 \cdot \frac{R^3}{3} = \frac{2}{3} \sigma R^3$$

4. **求质心**：$\bar{y} = \frac{M_x}{M} = \frac{2/3 \sigma R^3}{1/2 \sigma \pi R^2} = \frac{4R}{3\pi}$。

#### 答案

质心坐标为 $(0, \frac{4R}{3\pi})$。

</details>

### 例题 6：均匀球体的质心（三重积分）

求均匀半球体 $x^2 + y^2 + z^2 \le R^2, z \ge 0$ 的质心。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **对称性**：$\bar{x} = \bar{y} = 0$。
2. **建立球坐标**：$0 \le r \le R, 0 \le \theta \le \pi/2, 0 \le \phi \le 2\pi$。
3. **计算 $z$ 方向矩**：

$$M_{xy} = \rho \int_0^{2\pi} d\phi \int_0^{\pi/2} \sin \theta \cos \theta d\theta \int_0^R r^3 dr$$

（注意：$z = r \cos \theta$，体积元含 $\sin \theta$）

- $r$ 积分：$R^4/4$。
- $\theta$ 积分：$1/2$。
- $\phi$ 积分：$2\pi$。
  $M_{xy} = \rho \cdot 2\pi \cdot \frac{1}{2} \cdot \frac{R^4}{4} = \frac{\pi \rho R^4}{4}$。

4. **体积与质量**：$V = \frac{2}{3}\pi R^3, M = \rho V$。
5. **求质心**：$\bar{z} = \frac{M_{xy}}{M} = \frac{\pi \rho R^4 / 4}{2/3 \pi \rho R^3} = \frac{3}{8}R$。

#### 答案

质心坐标为 $(0, 0, \frac{3}{8}R)$。

</details>

### 例题 7：矩形薄板的转动惯量

长为 $a$ 宽为 $b$ 的均匀矩形薄板，求其对中心且垂直于板面的轴的转动惯量。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **建立坐标系**：矩形中心在原点，$-a/2 \le x \le a/2, -b/2 \le y \le b/2$。
2. **距离平方**：$r^2 = x^2 + y^2$。
3. **积分计算**：

$$I = \sigma \int_{-a/2}^{a/2} dx \int_{-b/2}^{b/2} (x^2 + y^2) dy$$

$$I = \sigma \int_{-a/2}^{a/2} (x^2 b + \frac{1}{12}b^3) dx = \sigma (b \cdot \frac{1}{12}a^3 + a \cdot \frac{1}{12}b^3) = \frac{1}{12} \sigma ab (a^2 + b^2)$$

4. **利用总质量 $M = \sigma ab$**：$I = \frac{1}{12} M (a^2 + b^2)$。

#### 答案

$I = \frac{1}{12} M (a^2 + b^2)$

</details>

### 例题 8：均匀圆柱体的转动惯量

求底面半径为 $R$、高为 $h$、质量为 $M$ 的均匀圆柱体对其中心轴（$z$ 轴）的转动惯量。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **采用柱坐标**：$0 \le \rho \le R, 0 \le \phi \le 2\pi, 0 \le z \le h$。
2. **距离平方**：到 $z$ 轴距离为 $\rho$，故 $r^2 = \rho^2$。
3. **积分计算**：

$$I_z = \iiint_\Omega \rho^2 \sigma dV = \sigma \int_0^h dz \int_0^{2\pi} d\phi \int_0^R \rho^2 \cdot \rho d\rho$$

$$I_z = \sigma \cdot h \cdot 2\pi \cdot \frac{R^4}{4} = \frac{1}{2} \sigma (\pi R^2 h) R^2$$

4. **利用质量 $M = \sigma \pi R^2 h$**：$I_z = \frac{1}{2} M R^2$。

#### 答案

$I_z = \frac{1}{2} M R^2$

</details>

### 例题 9：球壳对质点的引力（壳层定理证明基础）

计算质量为 $M$、半径为 $R$ 的均匀球体对位于球外距离球心 $d$ 处质量为 $m$ 的质点的引力。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **设置坐标**：将球心置于原点，质点置于 $z$ 轴上的 $(0, 0, d)$。
2. **对称性**：引力仅有 $z$ 方向分量。
3. **引力公式**（仅 $z$ 分量）：

$$F_z = Gm\rho \iiint_\Omega \frac{z - d}{(x^2 + y^2 + (z-d)^2)^{3/2}} dV$$

（通常利用球坐标或分层法计算。根据高斯定理或牛顿壳层定理，结果等效于质量集中于球心）4. **结论**：$F = \frac{G M m}{d^2}$。

#### 答案

$F = \frac{G M m}{d^2}$，方向指向球心。

</details>

---

## 六、 教材经典例题解析

### 例题 1：极坐标计算二重积分

计算 $\iint_D e^{-(x^2 + y^2)} dx dy$，其中 $D$ 是全平面 $\mathbb{R}^2$。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **识别特征**：被积函数含 $x^2 + y^2$，且区域为全平面，适合极坐标。
2. **极坐标范围**：$0 \le r < +\infty, 0 \le \theta \le 2\pi$。
3. **变换与计算**：

$$I = \int_0^{2\pi} d\theta \int_0^{+\infty} e^{-r^2} r dr$$

内层积分：$\int_0^{+\infty} e^{-r^2} r dr = [-\frac{1}{2} e^{-r^2}]_0^{+\infty} = \frac{1}{2}$。4. **得出结论**：$I = \int_0^{2\pi} \frac{1}{2} d\theta = \pi$。

#### 答案

$\pi$

</details>

### 例题 2：柱坐标下的复杂边界（Viviani 曲线）

计算由圆柱面 $x^2 + y^2 = Rx$ 割球体 $x^2 + y^2 + z^2 \le R^2$ 所成的部分（位于第一卦限）的体积。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **确定区域**：圆柱面在极坐标下为 $\rho = R \cos \phi$（注意第一卦限中 $0 \le \phi \le \frac{\pi}{2}$）。
2. **确定 $z$ 范围**：$0 \le z \le \sqrt{R^2 - \rho^2}$。
3. **建立柱坐标积分**：

$$V = \int_0^{\pi/2} d\phi \int_0^{R \cos \phi} \rho d\rho \int_0^{sqrt{R^2 - \rho^2}} dz$$

4. **计算内层**：$\int_0^{sqrt{R^2 - \rho^2}} dz = \sqrt{R^2 - \rho^2}$。
5. **计算中层**：$\int_0^{R \cos \phi} \rho \sqrt{R^2 - \rho^2} d\rho = [-\frac{1}{3}(R^2 - \rho^2)^{3/2}]_0^{R \cos \phi} = \frac{1}{3} R^3 (1 - \sin^3 \phi)$。
6. **计算外层**：

$$V = \frac{R^3}{3} \int_0^{\pi/2} (1 - \sin^3 \phi) d\phi = \frac{R^3}{3} \left[ \frac{\pi}{2} - \frac{2}{3} \right] = R^3 \left( \frac{\pi}{6} - \frac{2}{9} \right)$$

#### 答案

$R^3 \left( \frac{\pi}{6} - \frac{2}{9} \right)$

</details>

### 例题 3：球坐标下的“球内挖圆锥”

计算三重积分 $\iiint_\Omega z^2 dV$，其中 $\Omega$ 是由球面 $x^2 + y^2 + z^2 = a^2$ 与圆锥面 $z = \sqrt{x^2 + y^2}$ 围成的上部区域。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **确定球坐标范围**：
   - 球面对应 $r = a$。
   - 圆锥面 $z = \rho$ 对应 $\theta = \frac{\pi}{4}$。
   - 因此 $\Omega$ 范围：$0 \le r \le a, 0 \le \theta \le \frac{\pi}{4}, 0 \le \phi \le 2\pi$。
2. **被积函数变换**：$z^2 = (r \cos \theta)^2 = r^2 \cos^2 \theta$。
3. **建立积分**：

$$I = \int_0^{2\pi} d\phi \int_0^{\pi/4} \sin \theta \cdot \cos^2 \theta d\theta \int_0^a r^2 \cdot r^2 dr$$

4. **分步计算**：
   - $r$ 积分：$\int_0^a r^4 dr = \frac{a^5}{5}$。
   - $\theta$ 积分：$\int_0^{\pi/4} \cos^2 \theta \sin \theta d\theta = [-\frac{1}{3} \cos^3 \theta]_0^{\pi/4} = \frac{1}{3}(1 - \frac{\sqrt{2}}{4})$。
   - $\phi$ 积分：$2\pi$。
5. **得出结果**：$I = 2\pi \cdot \frac{1}{3}(1 - \frac{\sqrt{2}}{4}) \cdot \frac{a^5}{5} = \frac{\pi a^5}{15} (2 - \frac{\sqrt{2}}{2})$。

#### 答案

$\frac{\pi a^5}{15} (2 - \frac{\sqrt{2}}{2})$

</details>

### 例题 4：广义坐标变换

计算 $\iint_D (x+y) dx dy$，其中 $D$ 是由 $x+y=1, x+y=2, x-y=0, x-y=1$ 围成的区域。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **令 $u = x+y, v = x-y$**。
2. **确定新范围**：$1 \le u \le 2, 0 \le v \le 1$。
3. **计算 Jacobian**：
   解得 $x = \frac{u+v}{2}, y = \frac{u-v}{2}$。

$$J = \frac{\partial(x, y)}{\partial(u, v)} = \det \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{pmatrix} = -\frac{1}{2}$$

取绝对值 $|J| = \frac{1}{2}$。4. **计算积分**：

$$\iint_D (x+y) dx dy = \int_1^2 du \int_0^1 u \cdot \frac{1}{2} dv = \frac{1}{2} \int_1^2 u du = \frac{1}{2} [\frac{1}{2}u^2]_1^2 = \frac{3}{4}$$

#### 答案

$3/4$

</details>

---

## 七、 章内专题练习 (In-Chapter Exercises)

:::tip 练习说明
重积分的计算重点在于积分次序的选择、坐标变换及对称性的利用。
:::

### 练习 1：利用对称性简化计算

求 $\iint_D (x+y) dx dy$，其中 $D$ 为圆域 $x^2 + y^2 \le 1$。

<details>
<summary>点击查看解析</summary>

**解析**：

1. **分析区域对称性**：圆域 $D$ 关于 $x$ 轴和 $y$ 轴均对称。
2. **分析函数奇偶性**：
   - 对于 $x$，区域对称且 $x$ 是奇函数，故 $\iint_D x dx dy = 0$。
   - 对于 $y$，区域对称且 $y$ 是奇函数，故 $\iint_D y dx dy = 0$。
3. **结果**：
   原式 $= 0 + 0 = 0$。
   **结论**：充分利用奇偶性可瞬间得出结果。

</details>

### 练习 2：二重积分的换序技巧

求 $\int_0^1 dx \int_{\sqrt{x}}^1 e^{y^3} dy$。

<details>
<summary>点击查看解析</summary>

**解析**：
内层积分 $\int e^{y^3} dy$ 无法用初等函数表示，必须交换积分次序。

1. **确定区域**：$0 \le x \le 1, \sqrt{x} \le y \le 1$。
   边界为 $x=0, y=1, y^2=x$。
2. **重新描述区域**：$0 \le y \le 1, 0 \le x \le y^2$。
3. **交换次序积分**：
   $\int_0^1 dy \int_0^{y^2} e^{y^3} dx = \int_0^1 y^2 e^{y^3} dy$
   令 $u = y^3, du = 3y^2 dy$。
   $\int_0^1 \frac{1}{3} e^u du = \frac{1}{3}(e - 1)$。
   **结论**：结果为 $\frac{1}{3}(e - 1)$。

</details>

### 练习 3：极坐标在非圆域的应用

计算 $\iint_D y dx dy$，其中 $D$ 是第一象限内由 $x^2+y^2=1, x^2+y^2=4$ 围成的环形区域。

<details>
<summary>点击查看解析</summary>

**解析**：

1. **极坐标范围**：$1 \le r \le 2, 0 \le \theta \le \pi/2$。
2. **变换积分**：
   $\iint_D y dx dy = \int_0^{\pi/2} d\theta \int_1^2 (r \sin \theta) r dr$
   $= (\int_0^{\pi/2} \sin \theta d\theta) (\int_1^2 r^2 dr)$
   $= [-\cos \theta]_0^{\pi/2} \cdot [\frac{1}{3}r^3]_1^2$
   $= (0 - (-1)) \cdot (\frac{8}{3} - \frac{1}{3}) = \frac{7}{3}$。

</details>

### 练习 4：三重积分的物理意义

求密度为 $\rho = 1$ 的均匀圆柱体 $x^2+y^2 \le a^2, 0 \le z \le h$ 对原点 $(0,0,0)$ 处质量为 $m$ 的质点的引力在 $z$ 方向的分量。

<details>
<summary>点击查看解析</summary>

**解析**：

1. **引力公式分量**：$F_z = G m \iiint_\Omega \frac{z}{(x^2+y^2+z^2)^{3/2}} dV$。
2. **采用柱坐标**：$0 \le \rho \le a, 0 \le \phi \le 2\pi, 0 \le z \le h$。
   $F_z = G m \int_0^{2\pi} d\phi \int_0^h z dz \int_0^a \frac{\rho}{(\rho^2+z^2)^{3/2}} d\rho$
3. **计算内层积分**：
   $\int_0^a \rho (\rho^2+z^2)^{-3/2} d\rho = [ -(\rho^2+z^2)^{-1/2} ]_0^a = \frac{1}{z} - \frac{1}{\sqrt{a^2+z^2}}$
4. **计算中层积分**：
   $2\pi G m \int_0^h z (\frac{1}{z} - \frac{1}{\sqrt{a^2+z^2}}) dz = 2\pi G m \int_0^h (1 - \frac{z}{\sqrt{a^2+z^2}}) dz$
   $= 2\pi G m [ z - \sqrt{a^2+z^2} ]_0^h = 2\pi G m (h - \sqrt{a^2+h^2} + a)$。
   **结论**：引力 $z$ 分量为 $2\pi G m (a + h - \sqrt{a^2+h^2})$。

</details>

---

<SupportingExercises
topic="重积分"
fileId="analysis-multivariable-calculus"
exercises={[
{ index: 20.1, title: "极坐标下的二重积分", slug: "练习-201极坐标下的二重积分" },
{ index: 20.2, title: "球坐标下的三重积分", slug: "练习-202球坐标下的三重积分" }
]}
/>

---

_编者注：雅可比行列式是高维微积分中“局部缩放”的代数表达，掌握它意味着你掌握了跨越坐标系的通证。_
