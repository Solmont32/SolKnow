---
title: 微分几何：曲线与曲面的局部理论 (Local Theory of Curves and Surfaces)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 微分几何：曲线与曲面的局部理论

微分几何是利用微积分的工具研究几何图形局部与整体性质的学科。本章将系统建立空间曲线的 **Frenet 标架**，并深入探讨曲面的 **第一与第二基本形式**，最后揭示连接局部曲率与整体拓扑的 **Gauss-Bonnet 定理**。

<KnowledgeCard type="tip" title="核心思想：局部线性化与二阶逼近">
- **一阶性质**：由切空间（切线、切平面）描述，对应第一基本形式（度量）。
- **二阶性质**：由弯曲程度描述，对应曲率、挠率及第二基本形式。
</KnowledgeCard>

---

## 一、空间曲线的局部理论

设空间曲线 $\mathcal{C}$ 的参数表示为 $\mathbf{r}(s)$，其中 $s$ 为**弧长参数**（即 $\|\mathbf{r}'(s)\| = 1$）。

### 1. Frenet 标架 (Frenet Frame)

在曲线的每个正则点，我们可以建立一个右手系单位正交标架 $\{\mathbf{T}, \mathbf{N}, \mathbf{B}\}$：

- **单位切向量 (Tangent)**：$\mathbf{T} = \mathbf{r}'(s)$
- **单位主法向量 (Principal Normal)**：$\mathbf{N} = \frac{\mathbf{T}'(s)}{\|\mathbf{T}'(s)\|}$ （假定 $\mathbf{T}' \neq \mathbf{0}$）
- **单位副法向量 (Binormal)**：$\mathbf{B} = \mathbf{T} \times \mathbf{N}$

### 2. Frenet-Serret 公式

这是曲线论的核心方程组，描述了标架随弧长的演变：

$$
\begin{cases}
\mathbf{T}'(s) = \kappa \mathbf{N} \\
\mathbf{N}'(s) = -\kappa \mathbf{T} + \tau \mathbf{B} \\
\mathbf{B}'(s) = -\tau \mathbf{N}
\end{cases}
$$

其中：
- **曲率 (Curvature)** $\kappa = \|\mathbf{r}''(s)\|$：衡量曲线偏离直线的程度。
- **挠率 (Torsion)** $\tau$：衡量曲线偏离平面（密切平面）的程度。

### 3. 一般参数下的计算公式

若曲线由一般参数 $t$ 表示为 $\mathbf{r}(t)$：

- **曲率**：$\kappa = \frac{\|\mathbf{r}' \times \mathbf{r}''\|}{\|\mathbf{r}'\|^3}$
- **挠率**：$\tau = \frac{(\mathbf{r}', \mathbf{r}'', \mathbf{r}''')}{\|\mathbf{r}' \times \mathbf{r}''\|^2}$

---

## 二、曲面的第一基本形式 (First Fundamental Form)

设曲面 $\mathcal{S}$ 由参数方程 $\mathbf{r}(u,v)$ 表示。

### 1. 定义与度量

曲面上的微小弧长平方 $ds^2$ 称为第一基本形式：

$$
I = d\mathbf{r} \cdot d\mathbf{r} = E du^2 + 2F dudv + G dv^2
$$

系数定义为：
- $E = \mathbf{r}_u \cdot \mathbf{r}_u$
- $F = \mathbf{r}_u \cdot \mathbf{r}_v$
- $G = \mathbf{r}_v \cdot \mathbf{r}_v$

### 2. 几何应用

- **长度计算**：沿曲线 $(u(t), v(t))$ 的弧长 $s = \int \sqrt{E \dot{u}^2 + 2F \dot{u}\dot{v} + G \dot{v}^2} dt$。
- **面积计算**：曲面上一块区域 $D$ 的面积 $A = \iint_D \sqrt{EG-F^2} \, dudv$。

---

## 三、曲面的第二基本形式与曲率

第二基本形式描述了曲面相对于切平面的弯曲情况。

### 1. 定义

设 $\mathbf{n} = \frac{\mathbf{r}_u \times \mathbf{r}_v}{\|\mathbf{r}_u \times \mathbf{r}_v\|}$ 为单位法向量。

$$
II = -d\mathbf{r} \cdot d\mathbf{n} = L du^2 + 2M dudv + N dv^2
$$

系数定义为：
- $L = \mathbf{r}_{uu} \cdot \mathbf{n}$
- $M = \mathbf{r}_{uv} \cdot \mathbf{n}$
- $N = \mathbf{r}_{vv} \cdot \mathbf{n}$

### 2. 高斯曲率与平均曲率

- **高斯曲率 (Gaussian Curvature)**：
  $$K = \frac{LN - M^2}{EG - F^2} = k_1 k_2$$
- **平均曲率 (Mean Curvature)**：
  $$H = \frac{EN - 2FM + GL}{2(EG - F^2)} = \frac{k_1 + k_2}{2}$$

其中 $k_1, k_2$ 为**主曲率**（法曲率的极值）。

<KnowledgeCard type="info" title="绝妙定理 (Theorema Egregium)">
Gauss 证明了高斯曲率 $K$ 仅取决于第一基本形式的系数（内蕴性质），这意味着你可以通过在曲面上测量距离来确定 $K$，而不需要离开曲面。
</KnowledgeCard>

---

## 四、Gauss-Bonnet 定理 (局部形式)

Gauss-Bonnet 定理是微分几何中最深刻的定理之一，它建立了局部几何量（曲率）与整体拓扑量（欧拉示性数）之间的桥梁。

### 1. 测地曲率 (Geodesic Curvature)

对于曲面上的曲线，其曲率向量可以分解为法方向（法曲率）和切方向（测地曲率 $k_g$）。测地线是指 $k_g \equiv 0$ 的曲线。

### 2. 定理表述

设 $\Omega$ 是曲面上一个由分段光滑曲线 $\partial \Omega$ 围成的简单连通区域，则：

$$
\iint_{\Omega} K dA + \int_{\partial \Omega} k_g ds + \sum \alpha_i = 2\pi
$$

其中 $\alpha_i$ 为外角。

- **物理含义**：如果你在曲面上绕一圈，方向的改变（测地转动）加上区域内的总曲率，恒等于 $2\pi$。

---

## 五、深度教材例题

### 例题 1：球面 $x^2+y^2+z^2=a^2$ 的第一与第二基本形式

<details>
<summary>查看详细推导</summary>

使用球坐标参数化：$\mathbf{r}(\theta, \phi) = (a\sin\phi\cos\theta, a\sin\phi\sin\theta, a\cos\phi)$。

**第一基本形式：**
计算偏导得到 $E=a^2\sin^2\phi, F=0, G=a^2$。
故 $I = a^2\sin^2\phi \, d\theta^2 + a^2 \, d\phi^2$。

**第二基本形式：**
单位法向量 $\mathbf{n} = \mathbf{r}/a$。
计算二阶偏导投影得到 $L=a\sin^2\phi, M=0, N=a$。
故 $II = a\sin^2\phi \, d\theta^2 + a \, d\phi^2$。

**计算曲率：**
$K = \frac{a^2\sin^2\phi}{a^4\sin^2\phi} = \frac{1}{a^2}$。
$H = \frac{(a^2\sin^2\phi)(a) + 0 + (a^2)(a\sin^2\phi)}{2(a^4\sin^2\phi)} = \frac{1}{a}$。

**结论**：球面是常正曲率曲面。
</details>

### 例题 2：伪球面的高斯曲率

考虑曳物线绕其渐近线旋转生成的曲面。

<details>
<summary>查看解答提示</summary>

伪球面的第一基本形式可以写为 $I = du^2 + e^{-2u} dv^2$。
通过计算可得其高斯曲率 $K \equiv -1$。它是非欧几何（双曲几何）的直观模型。
</details>

---

## 六、配套练习

### 练习 1：Frenet 标架实战
设曲线 $\mathbf{r}(t) = (t, t^2, t^3)$。求在 $t=0$ 处的单位切向量 $\mathbf{T}$、主法向量 $\mathbf{N}$ 和副法向量 $\mathbf{B}$。

<details>
<summary>检查答案</summary>

1. $\mathbf{r}' = (1, 2t, 3t^2) \implies \mathbf{r}'(0) = (1, 0, 0)$。故 $\mathbf{T} = (1, 0, 0)$。
2. $\mathbf{r}'' = (0, 2, 6t) \implies \mathbf{r}''(0) = (0, 2, 0)$。
3. $\mathbf{r}' \times \mathbf{r}''$ 在 $t=0$ 为 $(0, 0, 2)$。故 $\mathbf{B} = (0, 0, 1)$。
4. $\mathbf{N} = \mathbf{B} \times \mathbf{T} = (0, 1, 0)$。

</details>

### 练习 2：第一基本形式与角度
在第一基本形式为 $I = du^2 + (u^2+a^2) dv^2$ 的曲面上，求坐标曲线 $u=const$ 与 $v=const$ 的夹角。

<details>
<summary>检查答案</summary>

夹角 $\theta$ 满足 $\cos\theta = \frac{F}{\sqrt{EG}}$。
由于 $F=0$，故 $\cos\theta = 0$，即坐标曲线正交。
</details>

---

<SupportingExercises
topic="微分几何基础"
fileId="analysis-differential-geometry"
exercises={[
{ index: 1, title: "Frenet-Serret 公式应用", slug: "frenet-serret-application" },
{ index: 2, title: "基本形式系数计算", slug: "fundamental-form-calculation" }
]}
/>

---

_编者注：微分几何是联结微积分、线性代数与拓扑学的纽带。理解了 Gauss-Bonnet 定理，你就理解了现代几何学的灵魂。_
