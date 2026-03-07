---
title: 行列式 (Determinant)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 行列式 (Determinant)

行列式是一个将方阵映射为标量的函数，反映了线性变换对“体积”的缩放。

## 基本性质
1.  **转置不变**：$|A| = |A^T|$。
2.  **两行互换**：行列式变号。
3.  **单行倍乘**：行列式随之倍乘。
4.  **单行倍加**：将一行的 $k$ 倍加到另一行，值不变。

<KnowledgeCard type="tip" title="计算技巧">
对于阶数较高的行列式，优先通过初等行变换将其转化为 **上三角行列式**，此时值等于对角线元素之积。
</KnowledgeCard>

## 代数余子式与展开
$$|A| = \sum_{j=1}^n a_{ij} A_{ij}$$
其中 $A_{ij} = (-1)^{i+j} M_{ij}$ 为代数余子式。

## 克拉默法则 (Cramer's Rule)
对于系数矩阵行列式 $D \neq 0$ 的线性方程组，其解为：
$$x_i = \frac{D_i}{D}$$
