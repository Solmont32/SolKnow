---
title: 奇异值分解 (Singular Value Decomposition, SVD)
---

import { motion } from 'framer-motion';
import KnowledgeCard from "@site/src/components/KnowledgeCard";

# <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>奇异值分解 (Singular Value Decomposition, SVD)</motion.div>

SVD 是线性代数中最强大的分解定理之一，它不仅适用于方阵，还适用于任意形状的矩阵。它是图像压缩、推荐系统（如协同过滤）以及主成分分析 (PCA) 的数学核心。

## 1. 核心定理

对任意矩阵 $A \in M_{m \times n}(\mathbb{R})$，存在 $m$ 阶正交矩阵 $U$，$n$ 阶正交矩阵 $V$，以及 $m \times n$ 阶对角矩阵 $\Sigma$，使得：

$$
A = U \Sigma V^T
$$

其中：
- **$U$**：其列向量称为 **左奇异向量**，是 $AA^T$ 的特征向量。
- **$V$**：其列向量称为 **右奇异向量**，是 $A^TA$ 的特征向量。
- **$\Sigma$**：对角线上的元素 $\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r > 0$ 称为 **奇异值**，是 $A^TA$（或 $AA^T$）非零特征值的平方根。

## 2. 几何意义

SVD 说明任何线性变换都可以分解为三步：
1. **旋转** ($V^T$): 将输入向量旋转到主轴方向。
2. **拉伸** ($\Sigma$): 沿主轴方向进行不同比例的缩放。
3. **再次旋转** ($U$): 将缩放后的结果旋转到输出空间的最终位置。

<KnowledgeCard type="tip" title="SVD vs 对角化">
- **对角化** ($A=PDP^{-1}$)：要求 $A$ 是方阵，且基是特征向量。
- **SVD** ($A=U\Sigma V^T$)：适用于任何矩阵，基（$U, V$）是标准正交的。
</KnowledgeCard>

## 3. 紧凑型与截断 SVD

### 紧凑 SVD (Compact SVD)
只保留非零奇异值。若 $A$ 的秩为 $r$，则：
$$ A = U_r \Sigma_r V_r^T $$
其中 $U_r \in M_{m \times r}$，$V_r \in M_{n \times r}$。

### 截断 SVD (Truncated SVD)
只保留前 $k$ 个最大的奇异值 ($k < r$)。这是 **最优低秩近似**（Eckart-Young 定理）：
$$ A_k = \sum_{i=1}^k \sigma_i u_i v_i^T $$
$A_k$ 是所有秩为 $k$ 的矩阵中离 $A$ 最近的一个（在 Frobenius 范数下）。

## 4. 应用示例：图像压缩

一张 $1000 \times 1000$ 的灰度图可以看作一个矩阵。
- 原始存储：$1,000,000$ 个像素。
- 截断 SVD (取 $k=50$)：存储 $(1000+1000+1) \times 50 = 100,050$ 个数值。
- **压缩比**：约 10:1，且通常能保留大部分视觉特征。

## 5. 深度例题

### 例 1：手动计算 $2 \times 2$ 矩阵的 SVD

设 $A = \begin{pmatrix} 3 & 0 \\ 0 & -2 \end{pmatrix}$。

<details>
<summary>点击查看过程与答案</summary>

虽然这是一个对角阵，但我们按步骤演示：
1. 计算 $A^TA = \begin{pmatrix} 9 & 0 \\ 0 & 4 \end{pmatrix}$。
2. 特征值为 $9, 4$，故奇异值为 $\sigma_1 = 3, \sigma_2 = 2$。
3. $V$ 是 $A^TA$ 的特征向量：$v_1 = (1,0)^T, v_2 = (0,1)^T$。
4. $U$ 通过 $u_i = \frac{1}{\sigma_i} Av_i$ 计算：
   - $u_1 = \frac{1}{3} \begin{pmatrix} 3 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$。
   - $u_2 = \frac{1}{2} \begin{pmatrix} 0 \\ -2 \end{pmatrix} = \begin{pmatrix} 0 \\ -1 \end{pmatrix}$。
5. 结论：
   $$ A = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} \begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix} \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}^T. $$
   注意 $U$ 里的 $-1$ 是为了保证 $U$ 是正交矩阵（且 $AV=U\Sigma$ 成立）。
</details>

## 6. 配套练习

### 练习 1：奇异值的性质
证明：若 $A$ 是对称且半正定的矩阵，则其奇异值等于其特征值。

<details>
<summary>点击查看证明</summary>
设 $A = QDQ^T$ 是 $A$ 的谱分解，其中 $Q$ 是正交阵，$D = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$。
由于 $A$ 半正定，$\lambda_i \ge 0$。
我们可以直接取 $U=Q, V=Q, \Sigma=D$。
则 $A = U \Sigma V^T$。
由 SVD 的唯一性（奇异值部分），奇异值即为特征值。
</details>

### 练习 2：Moore-Penrose 伪逆
利用 SVD 定义 $A$ 的伪逆 $A^+$。

<details>
<summary>点击查看解答</summary>
设 $A = U \Sigma V^T$。
则 $A^+ = V \Sigma^+ U^T$，其中 $\Sigma^+$ 是将 $\Sigma$ 的非零对角元取倒数后转置得到的矩阵。
伪逆可用于求解最小二乘问题 $Ax=b$ 的最优解 $x = A^+b$。
</details>
