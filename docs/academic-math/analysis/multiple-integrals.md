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
   内层积分：$\int_0^{+\infty} e^{-r^2} r dr = [-\frac{1}{2} e^{-r^2}]_0^{+\infty} = \frac{1}{2}$。
4. **得出结论**：$I = \int_0^{2\pi} \frac{1}{2} d\theta = \pi$。

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
   取绝对值 $|J| = \frac{1}{2}$。
4. **计算积分**：
   $$\iint_D (x+y) dx dy = \int_1^2 du \int_0^1 u \cdot \frac{1}{2} dv = \frac{1}{2} \int_1^2 u du = \frac{1}{2} [\frac{1}{2}u^2]_1^2 = \frac{3}{4}$$

#### 答案
$3/4$
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
*编者注：雅可比行列式是高维微积分中“局部缩放”的代数表达，掌握它意味着你掌握了跨越坐标系的通证。*
