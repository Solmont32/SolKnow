---
title: 微分几何：曲线与曲面的局部理论专项练习
description: 面向 Frenet 标架、基本形式与 Gauss-Bonnet 定理的教材化分层练习
---

# 微分几何：曲线与曲面的局部理论专项练习

本练习库涵盖了从空间曲线的 Frenet-Serret 公式到曲面内蕴几何（第一、二基本形式）及整体联系（Gauss-Bonnet 定理）的深度题目。

> **学习建议**：微分几何的计算量通常较大，建议先写出符号表达式，再代入具体数值。

---

## 一、空间曲线论 (Frenet 标架)

### 练习 1：Frenet 标架的显式计算 {#dg-1}
求曲线 $\mathbf{r}(t) = (a\cos t, a\sin t, bt)$（圆柱螺旋线）在任意点 $t$ 处的 Frenet 标架 $\{\mathbf{T}, \mathbf{N}, \mathbf{B}\}$。

<details>
<summary>点击查看解析</summary>

**Step 1: 计算导数**
$\mathbf{r}' = (-a\sin t, a\cos t, b)$，其模为 $\|\mathbf{r}'\| = \sqrt{a^2+b^2}$。
**Step 2: 单位切向量 $\mathbf{T}$**
$\mathbf{T} = \frac{\mathbf{r}'}{\|\mathbf{r}'\|} = \frac{1}{\sqrt{a^2+b^2}}(-a\sin t, a\cos t, b)$。
**Step 3: 计算 $\mathbf{r}' \times \mathbf{r}''$**
$\mathbf{r}'' = (-a\cos t, -a\sin t, 0)$。
$\mathbf{r}' \times \mathbf{r}'' = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -a\sin t & a\cos t & b \\ -a\cos t & -a\sin t & 0 \end{vmatrix} = (ab\sin t, -ab\cos t, a^2)$。
其模 $\|\mathbf{r}' \times \mathbf{r}''\| = \sqrt{a^2b^2 + a^4} = a\sqrt{a^2+b^2}$。
**Step 4: 单位副法向量 $\mathbf{B}$**
$\mathbf{B} = \frac{\mathbf{r}' \times \mathbf{r}''}{\|\mathbf{r}' \times \mathbf{r}''\|} = \frac{1}{\sqrt{a^2+b^2}}(b\sin t, -b\cos t, a)$。
**Step 5: 单位主法向量 $\mathbf{N}$**
$\mathbf{N} = \mathbf{B} \times \mathbf{T} = (-\cos t, -\sin t, 0)$。

**结论**：主法向量始终指向 $z$ 轴（中心轴）。
</details>

### 练习 2：Frenet-Serret 公式应用 {#dg-2}
若一条曲线的所有切线都通过一个固定点，证明该曲线是直线。

<details>
<summary>点击查看证明</summary>

设固定点为 $\mathbf{P}$。由题意，对于曲线 $\mathbf{r}(s)$（弧长参数），存在标量函数 $\lambda(s)$ 使得：
$\mathbf{r}(s) + \lambda(s) \mathbf{T}(s) = \mathbf{P}$
对 $s$ 求导：
$\mathbf{T}(s) + \lambda'(s) \mathbf{T}(s) + \lambda(s) \mathbf{T}'(s) = \mathbf{0}$
利用 Frenet 公式 $\mathbf{T}' = \kappa \mathbf{N}$：
$(1 + \lambda'(s)) \mathbf{T}(s) + \lambda(s) \kappa \mathbf{N}(s) = \mathbf{0}$
由于 $\mathbf{T}$ 与 $\mathbf{N}$ 正交且线性无关，其系数必须均为 0：
1. $\lambda(s) \kappa = 0$
2. $1 + \lambda'(s) = 0$
从 (2) 得 $\lambda(s) = -s + c \neq 0$。
代入 (1) 迫使 $\kappa = 0$。
曲率为 0 的正则曲线必为直线。
</details>

---

## 二、曲面内蕴几何 (基本形式)

### 练习 3：旋转面的第一基本形式 {#dg-3}
设曲线在 $xz$ 平面内为 $x = f(u), z = g(u)$，绕 $z$ 轴旋转生成曲面 $\mathbf{r}(u,v) = (f(u)\cos v, f(u)\sin v, g(u))$。求其第一基本形式。

<details>
<summary>点击查看解析</summary>

计算偏导：
$\mathbf{r}_u = (f'(u)\cos v, f'(u)\sin v, g'(u))$
$\mathbf{r}_v = (-f(u)\sin v, f(u)\cos v, 0)$

计算系数：
$E = \mathbf{r}_u \cdot \mathbf{r}_u = (f')^2 + (g')^2$
$F = \mathbf{r}_u \cdot \mathbf{r}_v = 0$（说明经线与纬线正交）
$G = \mathbf{r}_v \cdot \mathbf{r}_v = f^2$

**结论**：$I = ((f')^2 + (g')^2) du^2 + f^2 dv^2$。
</details>

### 练习 4：高斯曲率计算 {#dg-4}
计算正交参数网下（即 $F=0$）的高斯曲率公式。若 $E=1, G=f^2(u)$，证明 $K = -f''(u)/f(u)$。

<details>
<summary>点击查看解析</summary>

当 $F=0$ 时，高斯曲率有一种简洁形式（Liouville 公式）：
$K = -\frac{1}{2\sqrt{EG}} \left[ \frac{\partial}{\partial u}\left(\frac{G_u}{\sqrt{EG}}\right) + \frac{\partial}{\partial v}\left(\frac{E_v}{\sqrt{EG}}\right) \right]$
代入 $E=1, G=f^2$：
$E_v = 0, \sqrt{EG} = f$
$K = -\frac{1}{2f} \left[ \frac{\partial}{\partial u}\left(\frac{2f f'}{f}\right) + 0 \right] = -\frac{1}{2f} (2f'') = -\frac{f''(u)}{f(u)}$。
**应用**：若 $f(u) = e^u$（伪球面局部），则 $K = -e^u/e^u = -1$。
</details>

---

## 三、Gauss-Bonnet 与综合应用

### 练习 5：球面三角形的面积 {#dg-5}
利用 Gauss-Bonnet 定理证明：半径为 $R$ 的球面上，三个内角为 $A, B, C$ 的球面三角形的面积为 $S = R^2(A + B + C - \pi)$。

<details>
<summary>点击查看解析</summary>

**Step 1: 定理应用**
对球面区域 $\Omega$ 使用 Gauss-Bonnet 定理：
$\iint_{\Omega} K dA + \int_{\partial \Omega} k_g ds + \sum \text{外角}_i = 2\pi$
**Step 2: 代入参数**
1. 球面高斯曲率 $K = 1/R^2$，故 $\iint K dA = \frac{1}{R^2} Area(\Omega)$。
2. 球面三角形的边是大圆弧，大圆是球面的测地线，故 $k_g = 0$，积分项消失。
3. 顶点的外角分别为 $\pi-A, \pi-B, \pi-C$。
**Step 3: 代数整理**
$\frac{S}{R^2} + 0 + (\pi-A + \pi-B + \pi-C) = 2\pi$
$\frac{S}{R^2} + 3\pi - (A+B+C) = 2\pi$
$S = R^2(A+B+C - \pi)$。
**几何直观**：球面上三角形内角和大于 $\pi$。
</details>

### 练习 6：测地线的判定 {#dg-6}
在圆柱面 $x^2+y^2=R^2$ 上，证明任何螺旋线都是测地线。

<details>
<summary>点击查看解析</summary>

**方法一：法向量判定**
曲线是测地线的充要条件是其主法向量 $\mathbf{N}$ 与曲面法向量 $\mathbf{n}$ 平行。
对于圆柱面 $\mathbf{n} = (\cos v, \sin v, 0)$。
对于螺旋线，练习 1 已算出其主法向量 $\mathbf{N} = (-\cos t, -\sin t, 0)$。
两者共线，证毕。
**方法二：变分判定**
将圆柱面展开为平面，螺旋线变为直线。由于平面上的直线是测地线，且等距变换保持测地线性质，故原螺旋线为测地线。
</details>

---

返回章节：[`微分几何：曲线与曲面的局部理论`](/docs/academic-math/analysis/differential-geometry)
