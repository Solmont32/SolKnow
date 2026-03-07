---
title: 定积分的高级应用：几何与物理的微元重构 (Applications of Definite Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 定积分的高级应用：几何与物理的微元重构

定积分真正的威力在于它的“微元法”（元素法）。任何一个能够被无限分割，且每一微小部分的贡献可以线性叠加的物理或几何量，都可以用定积分来精确计算。本章将深入探讨如何建立积分模型。

## 一、 微元法 (Differential Element Method) 核心思想

**步骤**：
1. **分割**：选取积分变量 $x \in [a, b]$，将区间无限细分。
2. **近似**：在微小区间 $[x, x+dx]$ 上，假设变化率为常量，写出该微小区间上目标量的近似值，即**微元 $dQ$**。
3. **求和与极限**：将所有微元累加并取极限，即得到积分式 $Q = \int_a^b dQ$。

## 二、 几何应用模型

### 1. 平面图形的面积
- **直角坐标系**：
  若上方曲线为 $y = f_2(x)$，下方曲线为 $y = f_1(x)$：
  $$S = \int_a^b [f_2(x) - f_1(x)] dx$$
- **极坐标系**：
  极径 $\rho = \rho(\theta)$，在扇形区域 $\alpha \le \theta \le \beta$ 内：
  微元 $dS = \frac{1}{2} \rho^2(\theta) d\theta$。
  $$S = \frac{1}{2} \int_\alpha^\beta \rho^2(\theta) d\theta$$

### 2. 旋转体的体积
- **圆盘法 (Disk Method)**：
  曲线 $y = f(x)$ 绕 $x$ 轴旋转。微元是一个厚度为 $dx$、半径为 $y$ 的薄圆盘。
  $dV = \pi y^2 dx$。
  $$V_x = \pi \int_a^b f^2(x) dx$$
- **柱壳法 (Shell Method)**：
  曲线 $y = f(x)$ 绕 $y$ 轴旋转。微元是一个半径为 $x$、高为 $y$、厚度为 $dx$ 的圆柱壳。
  $dV = 2\pi x \cdot y dx$。
  $$V_y = 2\pi \int_a^b x f(x) dx$$

### 3. 平面曲线的弧长
曲线 $y = f(x)$ 从 $x=a$ 到 $x=b$。微元 $ds = \sqrt{(dx)^2 + (dy)^2} = \sqrt{1 + (y')^2} dx$。
$$L = \int_a^b \sqrt{1 + [f'(x)]^2} dx$$

---

## 三、 物理应用模型

### 1. 变力沿直线做功
设物体在变力 $F(x)$ 作用下沿 $x$ 轴移动。微元 $dW = F(x) dx$。
$$W = \int_a^b F(x) dx$$

### 2. 液体静压力
设垂直放置的薄板浸没在密度为 $\rho$ 的液体中。深度为 $x$ 处，薄板的宽度为 $L(x)$。
压力微元 $dP = \text{压强} \times \text{面积} = (\rho g x) \cdot (L(x) dx)$。
$$P = \int_a^b \rho g x L(x) dx$$

---

## 四、 高阶实战解析

### 练习 1：极坐标求面积（心形线）
求心脏线 $\rho = a(1 - \cos \theta) \quad (a > 0)$ 所围成的图形的面积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **建立积分式**：极坐标面积公式为 $S = \frac{1}{2} \int_\alpha^\beta \rho^2(\theta) d\theta$。
2. **确定积分上下限**：心形线在 $\theta \in [0, 2\pi]$ 上封闭。由于它是关于极轴上下对称的，我们可以算上半部分的面积然后乘以 2。
   $S = 2 \times \frac{1}{2} \int_0^\pi [a(1 - \cos \theta)]^2 d\theta$
3. **展开被积函数**：
   $S = a^2 \int_0^\pi (1 - 2\cos \theta + \cos^2 \theta) d\theta$
4. **分项积分**：
   - $\int_0^\pi 1 d\theta = \pi$
   - $\int_0^\pi (-2\cos \theta) d\theta = [-2\sin \theta]_0^\pi = 0$
   - 对于 $\cos^2 \theta$，使用降幂公式 $\cos^2 \theta = \frac{1+\cos 2\theta}{2}$：
     $\int_0^\pi \frac{1}{2} d\theta + \int_0^\pi \frac{\cos 2\theta}{2} d\theta = \frac{\pi}{2} + [\frac{\sin 2\theta}{4}]_0^\pi = \frac{\pi}{2} + 0 = \frac{\pi}{2}$
5. **求和**：
   $S = a^2 (\pi + 0 + \frac{\pi}{2}) = \frac{3}{2}\pi a^2$。

#### 答案
$\frac{3}{2}\pi a^2$
</details>

### 练习 2：柱壳法求旋转体体积
求由抛物线 $y = x^2$ 与直线 $y = x$ 围成的图形，绕 $y$ 轴旋转一周所得旋转体的体积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **寻找交点**：$x^2 = x \implies x = 0$ 或 $x = 1$。围成区域的 $x$ 范围是 $[0, 1]$。在这个区域内，$x \ge x^2$（直线上，抛物线下）。
2. **选择方法**：区域用 $x$ 表示更方便，而旋转轴是 $y$ 轴，因此使用**柱壳法 (Shell Method)**是最佳选择。
3. **建立微元**：在 $x$ 处取厚度为 $dx$ 的微小矩形，高为上界减下界 $h(x) = x - x^2$。旋转半径为 $r(x) = x$。
   微小圆柱壳体积 $dV = 2\pi r(x) h(x) dx = 2\pi x(x - x^2) dx$。
4. **计算积分**：
   $$V = \int_0^1 2\pi x(x - x^2) dx = 2\pi \int_0^1 (x^2 - x^3) dx$$
5. **求解**：
   $$V = 2\pi \left[ \frac{1}{3}x^3 - \frac{1}{4}x^4 \right]_0^1 = 2\pi (\frac{1}{3} - \frac{1}{4}) = 2\pi (\frac{1}{12}) = \frac{\pi}{6}$$

#### 答案
$\pi/6$
</details>

### 练习 3：抽水做功问题（变力做功）
一个倒置的圆锥形水池，深 $H=3$ 米，顶面圆半径 $R=2$ 米，池内注满了水。求将池内的水全部抽出池外所作的功。（水的密度 $\rho = 1000 \text{ kg/m}^3$，$g \approx 9.8 \text{ m/s}^2$）

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
由于不同深度的水需要提升的高度不同，这必须使用微元法。
1. **建立坐标系**：以圆锥顶点（池底）为原点，向上为 $x$ 轴正方向。水面在 $x=3$ 处。
2. **取微元**：在深度 $x$ 处取一层厚度为 $dx$ 的薄水层。我们需要知道这层水的体积和重量。
3. **计算水层半径**：根据相似三角形，高度为 $x$ 处的截面半径 $r$ 满足 $\frac{r}{x} = \frac{R}{H} = \frac{2}{3}$，所以 $r = \frac{2}{3}x$。
4. **计算水层重量 (力微元 dF)**：
   体积 $dV = \pi r^2 dx = \pi (\frac{2}{3}x)^2 dx = \frac{4\pi}{9} x^2 dx$。
   重力 $dF = \rho g dV = 1000 \times 9.8 \times \frac{4\pi}{9} x^2 dx$。
5. **计算提升高度**：水层位于 $x$ 处，要抽出池外（$x=3$ 处），提升的高度为 $3 - x$。
6. **功的微元 dW**：
   $dW = dF \times (3 - x) = \frac{39200\pi}{9} x^2 (3 - x) dx$。
7. **积分求解**：
   $$W = \frac{39200\pi}{9} \int_0^3 (3x^2 - x^3) dx$$
   $$\int_0^3 (3x^2 - x^3) dx = \left[ x^3 - \frac{1}{4}x^4 \right]_0^3 = 27 - \frac{81}{4} = \frac{27}{4}$$
   $$W = \frac{39200\pi}{9} \times \frac{27}{4} = 9800\pi \times 3 = 29400\pi \text{ 焦耳}$$

#### 答案
$29400\pi \text{ J}$
</details>
