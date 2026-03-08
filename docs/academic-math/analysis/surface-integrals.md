---
title: 第二十二章 曲面积分 (Surface Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第二十二章 曲面积分

曲面积分是将积分从平面提升至空间曲面的关键跃迁。本章将对标《数学分析》Ch 22，深入探讨高斯公式与斯托克斯公式，并揭示它们在“广义斯托克斯公式”框架下的内在统一性。

## 一、 第一类曲面积分：对面积的积分

### 1. 定义与性质
设 $f(x, y, z)$ 为定义在光滑曲面 $\Sigma$ 上的连续函数。其对面积的积分为：
$$\iint_\Sigma f(x, y, z) dS = \lim_{\|\Delta S_i\| \to 0} \sum_{i=1}^n f(P_i) \Delta S_i$$
- **物理意义**：面密度之于总质量。
- **计算公式**：若 $\Sigma: z = z(x, y)$ 在 $xy$ 平面投影为 $D$，则：
  $$\iint_\Sigma f dS = \iint_D f(x, y, z(x,y)) \sqrt{1+z_x^2+z_y^2} dA$$

---

## 二、 第二类曲面积分：通量 (Flux)

### 1. 物理背景：流量
设流速场 $\mathbf{v}(P) = (P, Q, R)$。单位时间内穿过有向曲面 $\Sigma$ 的流体体积即为**通量**：
$$\Phi = \iint_\Sigma \mathbf{v} \cdot d\mathbf{S} = \iint_\Sigma (P dydz + Q dzdx + R dxdy)$$
- **法向量方向**：积分值取决于曲面的“侧”（由单位法向量 $\mathbf{n}$ 决定）。$\iint_\Sigma \mathbf{v} \cdot d\mathbf{S} = \iint_\Sigma (\mathbf{v} \cdot \mathbf{n}) dS$。

---

## 三、 高斯公式与散度 (Divergence)

高斯公式建立了体积分与面积分之间的纽带，是电磁学和流体力学的基础。

### 1. 高斯公式 (Gauss's Theorem)
$$\iiint_\Omega (\nabla \cdot \mathbf{F}) dV = \oiint_{\partial \Omega} \mathbf{F} \cdot d\mathbf{S}$$

### 2. 散度的物理意义
散度 $\text{div } \mathbf{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}$ 描述了场在某点处的**源强**。
- $\text{div } \mathbf{F} > 0$：该点有“正源”（流体流出）。
- $\text{div } \mathbf{F} < 0$：该点有“汇”（流体吸入）。
- **高斯公式直观理解**：整个区域内的净流量产生（总散度）等于穿过边界的总通量。

---

## 四、 斯托克斯公式与旋度 (Curl)

斯托克斯公式是格林公式在三维空间的推广，它联系了面积分与线积分。

### 1. 斯托克斯公式 (Stokes's Theorem)
$$\iint_\Sigma (\nabla \times \mathbf{F}) \cdot d\mathbf{S} = \oint_{\partial \Sigma} \mathbf{F} \cdot d\mathbf{r}$$

### 2. 旋度的物理意义
旋度 $\text{curl } \mathbf{F} = \nabla \times \mathbf{F}$ 描述了向量场在某点附近的**微观旋转**。
- 其方向为旋转轴方向，大小为单位面积的最大环量。
- **斯托克斯公式直观理解**：曲面上所有微小面元的旋转之和，抵消后仅剩下边界线上的宏观环量。

---

## 五、 广义 Stokes 公式：大一统的数学之美

在现代数学（微分形式）语言中，上述所有公式（牛顿-莱布尼茨、格林、高斯、斯托克斯）均可统一为：
$$\int_\Omega d\omega = \int_{\partial \Omega} \omega$$
这揭示了微积分的一个根本真理：**在某个区域上的某种微分运算的积累，完全取决于该区域边界上的值。**

---

## 六、 综合例题：通量与环量 (Textbook Level)

### 例题 1：利用高斯公式计算复杂通量
计算通量 $\oiint_\Sigma x^2 dydz + y^2 dzdx + z^2 dxdy$，其中 $\Sigma$ 是立方体 $0 \le x,y,z \le a$ 的整个外侧。

<details>

<summary>解析过程</summary>

1. **计算散度**：$\text{div } \mathbf{F} = \frac{\partial (x^2)}{\partial x} + \frac{\partial (y^2)}{\partial y} + \frac{\partial (z^2)}{\partial z} = 2x + 2y + 2z$。
2. **应用高斯公式**：
   $I = \iiint_\Omega 2(x+y+z) dV$。
3. **分项积分**：由于对称性，$\iiint_\Omega 2x dV = 2 \int_0^a x dx \int_0^a dy \int_0^a dz = 2 \cdot \frac{a^2}{2} \cdot a \cdot a = a^4$。
4. **求和**：$I = a^4 + a^4 + a^4 = 3a^4$。

**答案**：$3a^4$

</details>

### 例题 2：阿基米德浮力定律的数学证明
证明：浸在液体中的物体所受的浮力等于它排开液体的重量。

<details>

<summary>解析过程</summary>

1. **物理建模**：设液体压力场为 $\mathbf{P} = (0, 0, -\rho g z)$（向下的压力随深度增加）。
2. **浮力计算**：浮力 $\mathbf{F}_b$ 是压力在物体表面 $\Sigma$ 上的积分（内侧为正，外侧为负，此处取外侧向内为正方向）。
   $\mathbf{F}_b = \oiint_\Sigma p (-\mathbf{n}) dS = \oiint_\Sigma (0, 0, \rho g z) \cdot \mathbf{n} dS$。
3. **应用高斯公式**：
   $\mathbf{F}_b = \iiint_\Omega \text{div}(0, 0, \rho g z) dV = \iiint_\Omega \rho g dV = \rho g V$。
4. **结论**：浮力方向向上，大小等于排开液体的重力 $\rho g V$。

**答案**：得证。

</details>

### 例题 3：斯托克斯公式计算空间环量
计算 $\oint_\Gamma y^2 dx + z^2 dy + x^2 dz$，其中 $\Gamma$ 是圆周 $x^2+y^2=a^2, z=0$（逆时针）。

<details>

<summary>解析过程</summary>

1. **计算旋度**：
   $\text{curl } \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ y^2 & z^2 & x^2 \end{vmatrix} = (-2z, -2x, -2y)$。
2. **选择曲面**：取圆盘 $\Sigma: x^2+y^2 \le a^2, z=0$。
3. **法向量**：根据右手螺旋定则，$\mathbf{n} = (0, 0, 1)$。
4. **应用斯托克斯公式**：
   $\oint_\Gamma = \iint_\Sigma (-2z, -2x, -2y) \cdot (0, 0, 1) dS = \iint_\Sigma -2y dS$。
5. **计算积分**：由于圆盘 $\Sigma$ 关于 $x$ 轴对称，且函数 $-2y$ 是奇函数，故积分为 0。

**答案**：0

</details>

### 例题 4：带奇点的高斯公式（高斯定律）
设 $\mathbf{E} = \frac{Q}{4\pi \epsilon_0 r^3} \mathbf{r}$ 为点电荷电场场强。证明：穿过包围电荷的任意闭曲面 $\Sigma$ 的通量均为 $\frac{Q}{\epsilon_0}$。

<details>

<summary>解析过程</summary>

1. **计算散度**：在 $r \neq 0$ 时，$\text{div } \mathbf{E} = 0$。
2. **处理奇点**：在原点周围取一极小球面 $S_\delta$。
3. **应用高斯公式**：对于 $\Sigma$ 与 $S_\delta$ 围成的区域，$\oiint_\Sigma + \oiint_{S_\delta^{in}} = \iiint 0 = 0$。
4. **计算球面积分**：在 $S_\delta$ 上，$\mathbf{E} \cdot \mathbf{n} = \frac{Q}{4\pi \epsilon_0 \delta^2}$，面积为 $4\pi \delta^2$。
   通量 $\Phi = \frac{Q}{4\pi \epsilon_0 \delta^2} \cdot 4\pi \delta^2 = \frac{Q}{\epsilon_0}$。

**答案**：$\frac{Q}{\epsilon_0}$

</details>

---

<SupportingExercises 
  topic="曲面积分" 
  exercises={[
    { index: 148, title: "第一类曲面积分", slug: "练习-148第一类曲面积分" },
    { index: 149, title: "平面通量计算", slug: "练习-149平面通量计算" },
    { index: 150, title: "图形曲面的面积元", slug: "练习-150图形曲面的面积元" },
    { index: 151, title: "高斯公式基础", slug: "练习-151高斯公式基础" },
    { index: 152, title: "斯托克斯公式基础", slug: "练习-152斯托克斯公式基础" },
    { index: 153, title: "闭曲面通量零判定", slug: "练习-153闭曲面通量零判定" },
    { index: 154, title: "球面通量直接法", slug: "练习-154球面通量直接法" },
    { index: 155, title: "斯托克斯与曲面无关性", slug: "练习-155斯托克斯与曲面无关性" }
  ]} 
/>

---
*编者注：如果说格林公式是平面的诗篇，那么高斯和斯托克斯公式就是空间的交响乐。它们将宇宙中原本散乱的向量场，归结为简单的源（散度）与涡（旋度）。*
