---
title: 重积分：二重与三重积分、坐标变换与物理应用 (Multiple Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 重积分：二重与三重积分、坐标变换与物理应用

重积分是定积分在多元函数上的推广。它不仅是计算高维体积、质量、引力等物理量的核心工具，更是多变量微积分的核心内容。本章将深入探讨重积分的定义、计算技巧以及在各种坐标系下的变换。

## 一、 二重积分 (Double Integrals)

### 1. 定义与几何意义
设 $f(x, y)$ 是定义在有界闭区域 $D \subset \mathbb{R}^2$ 上的有界函数。将 $D$ 划分成 $n$ 个小区域 $\Delta \sigma_1, \dots, \Delta \sigma_n$。在每个 $\Delta \sigma_i$ 中任取一点 $(\xi_i, \eta_i)$，构造 Riemann 和：
$$\sum_{i=1}^n f(\xi_i, \eta_i) \Delta \sigma_i$$
若当各小区域的直径最大值趋于 0 时，极限存在，则称 $f$ 在 $D$ 上可积，极限值记为 $\iint_D f(x, y) dA$。
- **几何意义**：若 $f(x, y) \ge 0$，则二重积分表示以 $D$ 为底、以曲面 $z = f(x, y)$ 为顶的曲顶柱体的体积。

### 2. 直角坐标系下的计算
利用 **Fubini 定理**，二重积分可以化为两次累次积分。
- **X-型区域** ($a \le x \le b, \phi_1(x) \le y \le \phi_2(x)$):
  $$\iint_D f(x, y) dA = \int_a^b dx \int_{\phi_1(x)}^{\phi_2(x)} f(x, y) dy$$
- **Y-型区域** ($c \le y \le d, \psi_1(y) \le x \le \psi_2(y)$):
  $$\iint_D f(x, y) dA = \int_c^d dy \int_{\psi_1(y)}^{\psi_2(y)} f(x, y) dx$$

### 3. 极坐标变换 (Polar Coordinates)
当区域 $D$ 为圆、环或与圆有关的部分，或者被积函数含有 $x^2 + y^2$ 时，极坐标变换极为有效。

<KnowledgeCard type="tip" title="雅可比行列式的几何直观">
在坐标变换 $(x, y) \to (u, v)$ 中，雅可比行列式 $J = \frac{\partial(x, y)}{\partial(u, v)}$ 描述了局部面积的缩放比例。对于极坐标，$dA = dx dy = r dr d\theta$，其中的 $r$ 正是变换引起的面积元素修正。
</KnowledgeCard>

- **变换公式**：$x = r \cos \theta, y = r \sin \theta$。
- **雅可比行列式 (Jacobian)**：$J = r$。
- **积分公式**：
  $$\iint_D f(x, y) dx dy = \iint_{D'} f(r \cos \theta, r \sin \theta) r dr d\theta$$

---

## 二、 三重积分 (Triple Integrals)

### 1. 柱坐标变换 (Cylindrical Coordinates)
适用于具有轴对称性质的区域（如圆柱体、旋转体）。
- **变换公式**：$x = \rho \cos \phi, y = \rho \sin \phi, z = z$。
- **雅可比行列式**：$J = \rho$。
- **积分公式**：
  $$\iiint_\Omega f(x, y, z) dV = \iiint_{\Omega'} f(\rho \cos \phi, \rho \sin \phi, z) \rho d\rho d\phi dz$$

### 2. 球坐标变换 (Spherical Coordinates)
适用于具有球对称性质的区域（如球体、圆锥体）。
- **变换公式**：$x = r \sin \theta \cos \phi, y = r \sin \theta \sin \phi, z = r \cos \theta$。
- **雅可比行列式**：$J = r^2 \sin \theta$。
- **积分公式**：
  $$\iiint_\Omega f(x, y, z) dV = \iiint_{\Omega'} f(r \sin \theta \cos \phi, r \sin \theta \sin \phi, r \cos \theta) r^2 \sin \theta dr d\theta d\phi$$
  其中 $r \ge 0, 0 \le \theta \le \pi, 0 \le \phi \le 2\pi$。

---

## 三、 重积分的物理应用

### 1. 质量与重心
设物体分布在区域 $\Omega$ 中，密度函数为 $\rho(x, y, z)$：
- **总质量**：$M = \iiint_\Omega \rho(x, y, z) dV$。
- **重心坐标** $(\bar{x}, \bar{y}, \bar{z})$：
  $$\bar{x} = \frac{1}{M} \iiint_\Omega x \rho dV, \quad \bar{y} = \frac{1}{M} \iiint_\Omega y \rho dV, \quad \bar{z} = \frac{1}{M} \iiint_\Omega z \rho dV$$

### 2. 转动惯量 (Moment of Inertia)
- **对 $z$ 轴的转动惯量**：$I_z = \iiint_\Omega (x^2 + y^2) \rho dV$。
- **对坐标平面的转动惯量**：如 $I_{xy} = \iiint_\Omega z^2 \rho dV$。

---

## 四、 教材经典例题解析

### 例题 1：极坐标计算二重积分
计算 $\iint_D e^{-(x^2 + y^2)} dx dy$，其中 $D$ 是全平面 $\mathbb{R}^2$。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **识别特征**：被积函数含 $x^2 + y^2$，且区域为全平面，适合极坐标。
2. **极坐标范围**：$0 \le r < +\infty, 0 \le \theta \le 2\pi$。
3. **变换与计算**：
   $$I = \int_0^{2\pi} d\theta \int_0^{+\infty} e^{-r^2} r dr$$
   内层积分：$\int_0^{+\infty} e^{-r^2} r dr = [-\frac{1}{2} e^{-r^2}]_0^{+\infty} = 0 - (-\frac{1}{2}) = \frac{1}{2}$。
4. **得出结论**：
   $$I = \int_0^{2\pi} \frac{1}{2} d\theta = \pi$$
> **注**：由此可导出概率积分 $\int_{-\infty}^{+\infty} e^{-x^2} dx = \sqrt{\pi}$。

#### 答案
$\pi$
</details>

### 例题 2：交换累次积分的顺序
交换 $\int_0^1 dx \int_x^1 f(x, y) dy$ 的积分顺序。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **确定原始区域**：$0 \le x \le 1, x \le y \le 1$。
2. **绘制草图**：区域是由直线 $y = x, y = 1, x = 0$ 围成的直角三角形。
3. **确定新范围**：固定 $y$，观察 $x$。
   $0 \le y \le 1$ 时，$x$ 从 0 变化到 $y$（即 $0 \le x \le y$）。
4. **得出结果**：
   $$\int_0^1 dy \int_0^y f(x, y) dx$$

#### 答案
$\int_0^1 dy \int_0^y f(x, y) dx$
</details>

### 例题 3：柱坐标计算三重积分
计算由平面 $z = 0, z = h$ 及柱面 $x^2 + y^2 = R^2$ 所围成的柱体 $\Omega$ 的体积。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **建立坐标系**：柱体具有明显的轴对称性，使用柱坐标。
2. **确定范围**：$0 \le \rho \le R, 0 \le \phi \le 2\pi, 0 \le z \le h$。
3. **体积公式**：$V = \iiint_\Omega 1 dV$。
4. **计算**：
   $$V = \int_0^{2\pi} d\phi \int_0^R \rho d\rho \int_0^h dz$$
   $$V = 2\pi \cdot [\frac{1}{2}\rho^2]_0^R \cdot h = 2\pi \cdot \frac{1}{2}R^2 \cdot h = \pi R^2 h$$

#### 答案
$\pi R^2 h$
</details>

### 例题 4：球坐标计算球体重心
求半径为 $R$ 的均匀半球 $x^2 + y^2 + z^2 \le R^2 (z \ge 0)$ 的重心。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **利用对称性**：由于半球关于 $z$ 轴对称且均匀，故 $\bar{x} = 0, \bar{y} = 0$。
2. **建立球坐标**：$0 \le r \le R, 0 \le \theta \le \frac{\pi}{2}, 0 \le \phi \le 2\pi$。
3. **计算总质量**（设密度 $\rho = 1$）：$M = \frac{2}{3} \pi R^3$。
4. **计算 $z$ 的矩**：
   $$M_z = \iiint_\Omega z dV = \int_0^{2\pi} d\phi \int_0^{\frac{\pi}{2}} d\theta \int_0^R (r \cos \theta) (r^2 \sin \theta) dr$$
   $$M_z = 2\pi \int_0^{\frac{\pi}{2}} \sin \theta \cos \theta d\theta \int_0^R r^3 dr$$
   $$M_z = 2\pi \cdot [\frac{1}{2} \sin^2 \theta]_0^{\frac{\pi}{2}} \cdot \frac{1}{4} R^4 = 2\pi \cdot \frac{1}{2} \cdot \frac{1}{4} R^4 = \frac{\pi R^4}{4}$$
5. **重心坐标**：$\bar{z} = \frac{M_z}{M} = \frac{\pi R^4 / 4}{2\pi R^3 / 3} = \frac{3}{8} R$。

#### 答案
重心坐标为 $(0, 0, \frac{3}{8}R)$。
</details>

### 例题 5：转动惯量的计算
计算半径为 $R$、质量为 $M$ 的均匀圆盘对通过圆心且垂直于圆面的轴的转动惯量。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **分析模型**：设圆盘位于 $xy$ 平面，圆心在原点。由于是圆盘，使用二重积分。
2. **密度计算**：面密度 $\sigma = \frac{M}{\pi R^2}$。
3. **积分表达式**：$I_z = \iint_D (x^2 + y^2) \sigma dA$。
4. **极坐标转换**：
   $$I_z = \sigma \int_0^{2\pi} d\theta \int_0^R r^2 \cdot r dr = \sigma \cdot 2\pi \cdot [\frac{1}{4}r^4]_0^R = \sigma \cdot \frac{\pi R^4}{2}$$
5. **代入 $\sigma$**：
   $$I_z = \frac{M}{\pi R^2} \cdot \frac{\pi R^4}{2} = \frac{1}{2} M R^2$$

#### 答案
$I_z = \frac{1}{2} M R^2$
</details>

---

<SupportingExercises 
  topic="重积分" 
  exercises={[
    { index: 5, title: "二重积分直角坐标计算", slug: "练习-5二重积分计算" },
    { index: 6, title: "三重积分柱坐标变换", slug: "练习-6利用柱坐标计算三重积分" }
  ]} 
/>

---
*编者注：重积分是物理量空间分布的累加。掌握坐标变换（雅可比行列式）是处理对称性问题的核心武器。*
