---
title: 矩阵 (Matrix)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 矩阵 (Matrix)

矩阵是线性代数的核心工具，描述了线性变换的本质。

## 核心定义
由 $m \times n$ 个数 $a_{ij}$ 排成的 $m$ 行 $n$ 列的矩形表格称为 **$m \times n$ 矩阵**。

## 矩阵的基本运算
- **矩阵乘法**：设 $A$ 是 $m \times p$ 矩阵，$B$ 是 $p \times n$ 矩阵，则积 $C = AB$ 的元素为：
  $$c_{ij} = \sum_{k=1}^p a_{ik}b_{kj}$$
  
<KnowledgeCard type="warning" title="不可交换性">
矩阵乘法一般不满足交换律，即 $AB \neq BA$。
</KnowledgeCard>

## 矩阵的秩 (Rank)
矩阵非零子式的最高阶数称为矩阵的秩，记作 $r(A)$。
- **初等变换**不改变矩阵的秩。
- $r(A) = r(A^T)$。

## 逆矩阵 ($A^{-1}$)
对于 $n$ 阶方阵 $A$，若存在 $B$ 使得 $AB = BA = I$，则称 $A$ 是可逆的。
- $A$ 可逆 $\iff |A| \neq 0$。
- $(AB)^{-1} = B^{-1}A^{-1}$。

## 特征值与特征向量
若 $A\mathbf{v} = \lambda\mathbf{v}$ ($\mathbf{v} \neq 0$)，则 $\lambda$ 为特征值，$\mathbf{v}$ 为特征向量。
- 特征方程：$| \lambda I - A | = 0$。
