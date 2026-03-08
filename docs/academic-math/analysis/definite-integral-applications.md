---
title: 定积分的高级应用：几何与物理的微元重构 (Applications of Definite Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 定积分的高级应用：几何与物理的微元重构

定积分真正的威力在于它的“微元法”（元素法）。任何一个能够被无限分割，且每一微小部分的贡献可以线性叠加的物理或几何量，都可以用定积分来精确计算。本章将对标《数学分析》Ch 10，深入探讨如何建立积分模型，并给出严格的微元推导。

<KnowledgeCard title="微元法 (Differential Element Method) 核心思想" icon="Infinity">
**步骤**：
1. **分割**：选取积分变量 $x \in [a, b]$，将区间无限细分。
2. **近似**：在微小区间 $[x, x+dx]$ 上，将目标量的变化量 $\Delta Q$ 近似为关于 $dx$ 的线性项 $dQ = f(x)dx$（即微分）。
3. **求和与极限**：将所有微元累加并取极限，即得到积分式 $Q = \int_a^b f(x) dx$。
</KnowledgeCard>

## 一、 几何应用模型与推导

### 1. 旋转体的体积 (Volume of Revolution)

#### (1) 圆盘法 (Disk Method) - 绕 $x$ 轴

**推导**：考虑由曲线 $y = f(x)$，$x$ 轴及直线 $x=a, x=b$ 围成的曲边梯形绕 $x$ 轴旋转。
在 $[x, x+dx]$ 处，取一垂直于 $x$ 轴的薄片，其旋转后近似为一个底圆半径为 $y=f(x)$，厚度为 $dx$ 的圆柱体。
其体积微元为：

$$dV = \pi [f(x)]^2 dx$$

**总公式**：$$V_x = \pi \int_a^b f^2(x) dx$$

#### (2) 柱壳法 (Shell Method) - 绕 $y$ 轴

**推导**：考虑同样的区域绕 $y$ 轴旋转。
在 $[x, x+dx]$ 处，取一宽为 $dx$，高为 $y=f(x)$ 的细长矩形。它绕 $y$ 轴旋转后形成一个薄圆柱壳。
将其展开，长为底圆周长 $2\pi x$，宽为高 $f(x)$，厚度为 $dx$。
其体积微元为：

$$dV = 2\pi x \cdot f(x) dx$$

**总公式**：$$V_y = 2\pi \int_a^b x f(x) dx$$

### 2. 平面曲线的弧长 (Arc Length)

**推导**：设曲线方程为 $y = f(x)$。在 $[x, x+dx]$ 上的弧段 $\Delta s$ 可用线段长度近似。
由勾股定理：

$$\Delta s \approx \sqrt{(\Delta x)^2 + (\Delta y)^2} = \sqrt{1 + \left(\frac{\Delta y}{\Delta x}\right)^2} \Delta x$$

取极限得到弧长微元：

$$ds = \sqrt{1 + [f'(x)]^2} dx$$

**总公式**：$$L = \int_a^b \sqrt{1 + [f'(x)]^2} dx$$

### 3. 旋转曲面的侧面积 (Surface Area)

**推导**：曲线 $y=f(x)$ 绕 $x$ 轴旋转所得曲面的侧面积。
在 $[x, x+dx]$ 处，圆周长为 $2\pi f(x)$，对应的侧向宽度为弧长微元 $ds$。
其面积微元（近似为圆台侧面积）为：

$$dS = 2\pi f(x) ds = 2\pi f(x) \sqrt{1 + [f'(x)]^2} dx$$

**总公式**：$$A = 2\pi \int_a^b f(x) \sqrt{1 + [f'(x)]^2} dx$$

---

## 二、 物理应用模型：功、压力与引力

### 1. 变力做功 (Work)

**物理背景**：变力 $F(x)$ 在移动 $dx$ 过程中所做的功 $dW = F(x)dx$。
**例题**：设有一根长为 $L$ 的匀质绳索，总质量为 $M$，垂直悬挂。求将这根绳索全部拉上平台所做的功。
**解析**：
建立 $x$ 轴向下为正，原点在平台。在 $x$ 处取长度为 $dx$ 的微元，其质量 $dm = \frac{M}{L}dx$。
提升该段绳索至平台（$x=0$）需克服重力做功：

$$dW = (dm \cdot g) \cdot x = \frac{Mg}{L} x dx$$

$$W = \int_0^L \frac{Mg}{L} x dx = \frac{Mg}{L} \left[\frac{1}{2}x^2\right]_0^L = \frac{1}{2}MgL$$

### 2. 液体静压力 (Hydrostatic Pressure)

**物理背景**：压强 $P = \rho g h$。压力 $F = P \cdot A$。
**例题**：一半径为 $R$ 的圆板垂直没入水中，圆心深度为 $h$ ($h > R$)。求水对圆板一侧的压力。
**解析**：
建立以圆心为原点，$x$ 轴竖直向下的坐标系。圆周方程 $x^2 + y^2 = R^2$。
在 $x$ 处取宽度为 $dx$ 的薄条，其深度为 $h+x$，宽度为 $2y = 2\sqrt{R^2-x^2}$。

$$dF = \rho g (h+x) \cdot 2\sqrt{R^2-x^2} dx$$

$$F = \int_{-R}^R \rho g (h+x) \cdot 2\sqrt{R^2-x^2} dx$$

利用对称性，$\int_{-R}^R x\sqrt{R^2-x^2} dx = 0$，剩余部分为半圆面积的 $2h$ 倍：

$$F = 2\rho g h \int_{-R}^R \sqrt{R^2-x^2} dx = 2\rho g h \cdot \frac{\pi R^2}{2} = \rho g h \pi R^2$$

### 3. 万有引力 (Gravitation)

**物理背景**：$F = G \frac{m_1 m_2}{r^2}$。
**例题**：一长度为 $L$、质量为 $M$ 的匀质细杆，在其延长线上距离近端 $a$ 处有一质量为 $m$ 的质点。求杆对质点的引力。
**解析**：
建立坐标系，质点在原点，杆分布在 $[a, a+L]$。
在 $x$ 处取微元 $dx$，其质量 $dM = \frac{M}{L}dx$。
它与质点间的引力微元：

$$dF = G \frac{m \cdot dM}{x^2} = \frac{G m M}{L} \frac{dx}{x^2}$$

$$F = \frac{G m M}{L} \int_a^{a+L} x^{-2} dx = \frac{G m M}{L} \left[-\frac{1}{x}\right]_a^{a+L} = \frac{G m M}{L} \left(\frac{1}{a} - \frac{1}{a+L}\right) = \frac{G m M}{a(a+L)}$$

---

<SupportingExercises
topic="定积分的应用"
fileId="analysis-integral-calculus"
exercises={[
{ index: 10.1, title: "旋转体体积计算", slug: "练习-101旋转体的体积" },
{ index: 10.2, title: "旋转曲面积分", slug: "练习-102旋转曲面的面积" }
]}
/>

---

_编者注：定积分的应用核心在于“微元法”。掌握了如何重构微元，你就掌握了将微积分应用于现实世界的钥匙。_
