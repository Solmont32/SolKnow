---
title: 二次型 (Quadratic Forms)
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# 二次型 (Quadratic Forms)

二次型是高等代数中连接矩阵理论、线性变换与几何分类的核心章节。

## 1. 定义与矩阵表示

$n$ 元二次型写作

$$

Q(\mathbf{x})=\sum_{i,j=1}^n a_{ij}x_ix_j,


$$

可写成矩阵形式

$$

Q(\mathbf{x})=\mathbf{x}^TA\mathbf{x},


$$

其中可取 $A$ 为对称矩阵（把交叉项均分到 $a_{ij},a_{ji}$）。

## 2. 合同变换与标准形

若存在可逆矩阵 $C$ 使 $C^TAC=B$，则称 $A,B$ **合同**，记作 $A \simeq B$。这对应于变量替换 $\mathbf{x}=C\mathbf{y}$，使得：
$$
Q(\mathbf{x}) = (C\mathbf{y})^TA(C\mathbf{y}) = \mathbf{y}^T(C^TAC)\mathbf{y} = \mathbf{y}^TB\mathbf{y}.
$$

### 化二次型为标准形的方法

1. **配方法 (Lagrange Algorithm)**：通过不断的平方项凑全，逐步消去交叉项。适用于手动计算。
2. **初等变换法**：对矩阵 $\begin{pmatrix} A \\ I \end{pmatrix}$ 进行**成对的**初等行变换与列变换。即：对 $A$ 做一次行变换，紧接着做一次同样的列变换；而对下方的 $I$ 只做列变换。最后 $A$ 变为对角阵，$I$ 变为过渡矩阵 $C$。
3. **特征值法（正交替换）**：利用对称矩阵必可正交对角化的性质。不仅化为标准形，还保持了几何形状（旋转）。

## 3. 惯性定理与规范形

**惯性定理 (Sylvester's Law of Inertia)**：实对称矩阵在合同变换下，标准形中正系数的个数 $p$（正惯性指数）和负系数的个数 $q$（负惯性指数）是唯一的，不依赖于所选的坐标变换。

- **秩**：$r = p + q$。
- **符号差 (Signature)**：$s = p - q$。
- **规范形**：通过进一步缩放坐标，使系数仅为 $1, -1, 0$。

## 4. 正定性与判别法

实对称矩阵 $A$（或其二次型 $Q$）称为：
- **正定**：对任意 $\mathbf{x} \neq 0$，$Q(\mathbf{x}) > 0$。
- **半正定**：对任意 $\mathbf{x}$，$Q(\mathbf{x}) \ge 0$。

### 判别准则

1. **特征值准则**：$A$ 正定 $\iff$ 所有特征值 $\lambda_i > 0$。
2. **顺序主子式准则 (Hurwitz / Sylvester Criterion)**：$A$ 正定 $\iff$ 所有顺序主子式 $\Delta_k > 0$。
3. **合同准则**：$A$ 正定 $\iff A \simeq I$（即正惯性指数 $p=n$）。

<KnowledgeCard type="warning" title="易错点">
顺序主子式全 $\ge 0$ **不能**推导出半正定。半正定要求**所有**子式（而不只是顺序主子式）均 $\ge 0$。
</KnowledgeCard>

## 5. 例题

### 例 1：初等变换法化标准形

设 $A = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}$，用初等变换法求合同变换矩阵 $C$。

<details>
<summary>点击查看解答</summary>

构造扩展矩阵 $\begin{pmatrix} A \\ I \end{pmatrix} = \begin{pmatrix} 1 & -1 \\ -1 & 2 \\ \hline 1 & 0 \\ 0 & 1 \end{pmatrix}$。
1. 第一列加到第二列，同时第一行加到第二行：
   $\begin{pmatrix} 1 & 0 \\ 0 & 1 \\ \hline 1 & 1 \\ 0 & 1 \end{pmatrix}$。
此时 $A$ 已成对角阵，故 $C = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$。
验证：$C^TAC = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix} \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix} \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$。
</details>

### 例 2：带参数的正定性讨论

设 $Q(x_1, x_2, x_3) = x_1^2 + x_2^2 + tx_3^2 + 2x_1x_2 + 2x_1x_3 + 2x_2x_3$，求 $t$ 满足正定的范围。

<details>
<summary>点击查看解答</summary>

矩阵 $A = \begin{pmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & t \end{pmatrix}$。
计算顺序主子式：
- $\Delta_1 = 1 > 0$。
- $\Delta_2 = \begin{vmatrix} 1 & 1 \\ 1 & 1 \end{vmatrix} = 0$。
由于 $\Delta_2 = 0$，无论 $t$ 为何值，该二次型都**不可能是正定**的（正定要求所有顺序主子式严格大于 0）。
实际上，该矩阵的秩最高为 2。
</details>

## 6. 配套练习

### 练习 1：配方法与惯性指数

化 $Q = x_1x_2 + x_2x_3 + x_3x_1$ 为标准形，并求秩与惯性指数。

<details>
<summary>点击查看解答</summary>

由于没有平方项，先做代换：$x_1 = y_1+y_2, x_2 = y_1-y_2, x_3 = y_3$。
$Q = (y_1^2 - y_2^2) + (y_1-y_2)y_3 + (y_1+y_2)y_3 = y_1^2 - y_2^2 + 2y_1y_3$。
继续配方：$Q = (y_1+y_3)^2 - y_2^2 - y_3^2$。
令 $z_1 = y_1+y_3, z_2 = y_2, z_3 = y_3$，则 $Q = z_1^2 - z_2^2 - z_3^2$。
- **秩**：3。
- **正惯性指数**：1。
- **负惯性指数**：2。
</details>

### 练习 2：特征值法判定

若 $A$ 是 $n$ 阶正定矩阵，$B$ 是 $n \times m$ 矩阵。证明：$B^TAB$ 半正定；且当 $\operatorname{rank}(B)=m$ 时，$B^TAB$ 正定。

<details>
<summary>点击查看解答</summary>

1. 对任意 $y \in \mathbb{R}^m$，记 $x = By$。
   则 $y^T(B^TAB)y = (By)^TA(By) = x^TAx$。
   因为 $A$ 正定，故 $x^TAx \ge 0$，所以 $B^TAB$ 半正定。
2. 若 $\operatorname{rank}(B)=m$，则对 $y \neq 0$，必有 $x = By \neq 0$。
   此时 $x^TAx > 0$，故 $B^TAB$ 正定。
</details>

### 练习 3：负定判别

判定 $A = \begin{pmatrix} -1 & 1 \\ 1 & -2 \end{pmatrix}$ 的定性。

<details>
<summary>点击查看解答</summary>

顺序主子式：
- $\Delta_1 = -1 < 0$。
- $\Delta_2 = (-1)(-2) - 1^2 = 1 > 0$。
满足 $(-1)^k \Delta_k > 0$（$-1$ 的奇数次方为负，偶数次方为正），故 $A$ 是**负定**的。
</details>

前往练习库：[/docs/exercises/math/algebra](/docs/exercises/math/algebra)