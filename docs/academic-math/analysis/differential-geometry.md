---
title: 微分几何：局部曲线论、曲面曲率与张量计算 (Differential Geometry: Curves, Surfaces & Tensors)
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";
import SupportingExercises from '@site/src/components/SupportingExercises';

# 微分几何：局部曲线论、曲面曲率与张量计算

微分几何是利用微积分的工具研究几何图形局部与整体性质的学科。本章从空间曲线的 **Frenet 标架**出发，进阶至曲面的 **Weingarten 映射**与 **内蕴几何**初步，并引入 **张量计算**的基础，最后揭示连接局部曲率与整体拓扑的 **Gauss-Bonnet 定理**。

<KnowledgeCard type="tip" title="现代几何观：从嵌入到内蕴">
- **外在几何 (Extrinsic)**：研究图形如何“弯曲”在背景欧氏空间中（如第二基本形式）。
- **内蕴几何 (Intrinsic)**：研究图形本身的度量属性，不依赖于外部空间（如 Gauss 绝妙定理）。
</KnowledgeCard>

---

## 一、空间曲线的局部理论 (Local Theory of Curves)

设空间曲线 $\mathcal{C}$ 的参数表示为 $\mathbf{r}(s)$，其中 $s$ 为**弧长参数**。

### 1. Frenet 标架 (Frenet Frame)

在每个正则点，标架 $\{\mathbf{T}, \mathbf{N}, \mathbf{B}\}$ 构成一个右手系单位正交基：
- **切向量**：$\mathbf{T} = \mathbf{r}'(s)$
- **主法向量**：$\mathbf{N} = \frac{\mathbf{r}''(s)}{\|\mathbf{r}''(s)\|}$，其方向指向曲线弯曲的一侧。
- **副法向量**：$\mathbf{B} = \mathbf{T} \times \mathbf{N}$

### 2. Frenet-Serret 公式 (系统化描述)

标架随弧长的演变规律由下述线性微分方程组给出：

$$
\frac{d}{ds} \begin{pmatrix} \mathbf{T} \\ \mathbf{N} \\ \mathbf{B} \end{pmatrix} = \begin{pmatrix} 0 & \kappa & 0 \\ -\kappa & 0 & \tau \\ 0 & -\tau & 0 \end{pmatrix} \begin{pmatrix} \mathbf{T} \\ \mathbf{N} \\ \mathbf{B} \end{pmatrix}
$$

- **曲率 (Curvature)** $\kappa \ge 0$：描述曲线偏离直线的程度。
- **挠率 (Torsion)** $\tau$：描述曲线偏离密切平面的程度（$\tau=0$ 时为平面曲线）。

<KnowledgeCard type="info" title="空间曲线基本定理">
给定连续函数 $\kappa(s) > 0$ 和 $\tau(s)$，在空间中存在唯一的一条曲线（在刚体运动意义下），其曲率和挠率分别为 $\kappa(s)$ 和 $\tau(s)$。
</KnowledgeCard>

---

## 二、曲面的基本形式与 Weingarten 映射

设曲面 $\mathcal{S}$ 由参数方程 $\mathbf{r}(u^1, u^2)$ 表示（此处引入指标记法）。

### 1. 第一基本形式 (First Fundamental Form)

定义度量张量 $g_{ij} = \mathbf{r}_i \cdot \mathbf{r}_j$（其中 $\mathbf{r}_i = \partial \mathbf{r}/\partial u^i$）：
$$I = ds^2 = g_{ij} du^i du^j = E du^2 + 2F dudv + G dv^2$$
它决定了曲面上的长度、角度和面积。

### 2. 第二基本形式 (Second Fundamental Form)

定义单位法向量 $\mathbf{n} = \frac{\mathbf{r}_1 \times \mathbf{r}_2}{\|\mathbf{r}_1 \times \mathbf{r}_2\|}$：
$$II = L_{ij} du^i du^j = L du^2 + 2M dudv + N dv^2$$
其中 $L_{ij} = \mathbf{r}_{ij} \cdot \mathbf{n} = -\mathbf{r}_i \cdot \mathbf{n}_j$。

### 3. Weingarten 映射 (Shape Operator)

**Weingarten 映射** $\mathcal{S}_p: T_p\mathcal{S} \to T_p\mathcal{S}$ 定义为切空间上的线性算子：
$$\mathcal{S}_p(\mathbf{v}) = -\nabla_{\mathbf{v}} \mathbf{n}$$
其矩阵表示 $h^i_j$ 满足：
$$\mathbf{n}_i = -h_i^j \mathbf{r}_j$$
其中 $h_i^j = L_{ik} g^{kj}$（$g^{kj}$ 为 $g_{kj}$ 的逆矩阵）。

- **高斯曲率** $K = \det(h^i_j) = \frac{LN-M^2}{EG-F^2}$。
- **平均曲率** $H = \frac{1}{2}\text{tr}(h^i_j) = \frac{EN-2FM+GL}{2(EG-F^2)}$。

---

## 三、张量计算与内蕴几何初步 (Tensor Calculus)

### 1. 记法约定 (Einstein Notation)

- **指标求和**：相同上下指标自动求和，$A^i B_i = \sum_{i} A^i B_i$。
- **指标升降**：利用 $g_{ij}$ 和 $g^{ij}$ 实现，$v_i = g_{ij} v^j$。

### 2. Christoffel 符号 (Christoffel Symbols)

描述坐标基向量的二阶偏导在切空间上的分量：
$$\mathbf{r}_{ij} = \Gamma^k_{ij} \mathbf{r}_k + L_{ij} \mathbf{n}$$
其中 $\Gamma^k_{ij} = \frac{1}{2} g^{kl} (\partial_i g_{jl} + \partial_j g_{il} - \partial_l g_{ij})$。这是**纯内蕴**的。

### 3. Gauss 绝妙定理 (Theorema Egregium)

虽然 $L_{ij}$ 依赖于嵌入方式，但其组合 $K$ 却仅依赖于 $g_{ij}$ 及其导数：
$$K = \frac{R_{1212}}{g_{11}g_{22} - g_{12}^2}$$
其中 $R_{ijkl}$ 为**黎曼曲率张量**的分量。这标志着近代内在几何的诞生。

---

## 四、Gauss-Bonnet 定理 (局部形式)

对于曲面上由分段光滑曲线 $\partial \Omega$ 围成的区域 $\Omega$：
$$
\iint_{\Omega} K dA + \int_{\partial \Omega} k_g ds + \sum \alpha_i = 2\pi \chi(\Omega)
$$
- $k_g$：**测地曲率**，衡量曲线偏离测地线的程度。
- $\chi(\Omega)$：区域的欧拉示性数。

---

## 五、深度教材例题

### 例题 1：圆柱螺旋线的 Frenet 标架与曲率、挠率
设 $\mathbf{r}(t) = (a\cos t, a\sin t, bt)$。求其 $\kappa$ 与 $\tau$。

<details>
<summary>点击查看详尽解答</summary>

**Step 1: 计算速度与弧长**
$\mathbf{r}'(t) = (-a\sin t, a\cos t, b) \implies \|\mathbf{r}'\| = \sqrt{a^2+b^2} = c$。
弧长 $s = ct \implies t = s/c$。

**Step 2: 弧长参数化下的 Frenet 标架**
$\mathbf{T} = \frac{d\mathbf{r}}{ds} = \frac{1}{c}(-a\sin \frac{s}{c}, a\cos \frac{s}{c}, b)$。
$\frac{d\mathbf{T}}{ds} = \frac{1}{c^2}(-a\cos \frac{s}{c}, -a\sin \frac{s}{c}, 0)$。
$\kappa = \|\frac{d\mathbf{T}}{ds}\| = \frac{a}{c^2} = \frac{a}{a^2+b^2}$。
$\mathbf{N} = \frac{1}{\kappa}\frac{d\mathbf{T}}{ds} = (-\cos \frac{s}{c}, -\sin \frac{s}{c}, 0)$。

**Step 3: 计算挠率**
$\mathbf{B} = \mathbf{T} \times \mathbf{N} = \frac{1}{c}(b\sin \frac{s}{c}, -b\cos \frac{s}{c}, a)$。
$\frac{d\mathbf{B}}{ds} = \frac{1}{c^2}(b\cos \frac{s}{c}, b\sin \frac{s}{c}, 0) = -\tau \mathbf{N}$。
由此得 $\tau = \frac{b}{c^2} = \frac{b}{a^2+b^2}$。

**结论**：圆柱螺旋线的曲率与挠率均为常数。
</details>

### 例题 2：Weingarten 映射与主曲率
已知某曲面在点 $P$ 处的第一与第二基本形式矩阵分别为 $G = \text{diag}(1, \cos^2 u)$ 和 $L = \text{diag}(1, 1)$。求该点的主曲率。

<details>
<summary>点击查看详尽解答</summary>

Weingarten 映射矩阵为 $h^i_j = L_{ik} g^{kj}$。
计算逆矩阵 $G^{-1} = \text{diag}(1, \sec^2 u)$。
故 $h = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & \sec^2 u \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & \sec^2 u \end{pmatrix}$。

矩阵的特征值即为主曲率：
$k_1 = 1, k_2 = \sec^2 u$。
</details>

---

## 六、进阶练习

### 练习 1：Frenet 标架恒等式证明
证明：$\mathbf{r}''' \cdot (\mathbf{r}' \times \mathbf{r}'') = \kappa^2 \tau$。

<details>
<summary>检查解答逻辑</summary>

1. 设弧长参数化 $\mathbf{r}' = \mathbf{T}$。
2. $\mathbf{r}'' = \mathbf{T}' = \kappa \mathbf{N}$。
3. $\mathbf{r}''' = (\kappa \mathbf{N})' = \kappa' \mathbf{N} + \kappa \mathbf{N}' = \kappa' \mathbf{N} + \kappa (-\kappa \mathbf{T} + \tau \mathbf{B}) = -\kappa^2 \mathbf{T} + \kappa' \mathbf{N} + \kappa\tau \mathbf{B}$。
4. $\mathbf{r}' \times \mathbf{r}'' = \mathbf{T} \times (\kappa \mathbf{N}) = \kappa \mathbf{B}$。
5. $\mathbf{r}''' \cdot (\mathbf{r}' \times \mathbf{r}'') = (-\kappa^2 \mathbf{T} + \kappa' \mathbf{N} + \kappa\tau \mathbf{B}) \cdot (\kappa \mathbf{B}) = \kappa^2 \tau$。
(注：非弧长参数下需除以速度的幂次)
</details>

### 练习 2：Christoffel 符号计算
对于极坐标度量 $ds^2 = dr^2 + r^2 d\theta^2$，计算所有非零的 $\Gamma^k_{ij}$。

<details>
<summary>检查答案</summary>

设 $u^1=r, u^2=\theta$。$g_{11}=1, g_{22}=r^2, g_{12}=0$。
$g^{11}=1, g^{22}=1/r^2$。
唯一不为零的导数是 $\partial_1 g_{22} = 2r$。
- $\Gamma^1_{22} = \frac{1}{2} g^{11} (0 + 0 - \partial_1 g_{22}) = -r$。
- $\Gamma^2_{12} = \Gamma^2_{21} = \frac{1}{2} g^{22} (\partial_1 g_{22} + 0 - 0) = 1/r$。
其余均为零。
</details>

---

<SupportingExercises
topic="微分几何进阶"
fileId="analysis-differential-geometry"
exercises={[
{ index: 1, title: "Weingarten 映射计算", slug: "weingarten-map-exercise" },
{ index: 2, title: "黎曼曲率初步", slug: "riemann-curvature-basics" }
]}
/>

---

_编者注：掌握了 Weingarten 映射与张量记法，你就拿到了通往广义相对论与黎曼几何大门的钥匙。_
