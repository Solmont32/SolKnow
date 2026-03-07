---
title: 线性方程组 (Linear Equations)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 线性方程组 (Linear Equations)

研究 $n$ 元一次方程组解的结构是线性代数的核心任务。

## 解的判定
对于方程组 $A\mathbf{x} = \mathbf{b}$：
1.  **无解**：$r(A) < r(A, \mathbf{b})$（增广矩阵秩更大）。
2.  **唯一解**：$r(A) = r(A, \mathbf{b}) = n$。
3.  **无穷多解**：$r(A) = r(A, \mathbf{b}) < n$。

<KnowledgeCard type="contest" title="竞赛要点">
在算法竞赛中，线性方程组通常通过 **高斯消元法 (Gaussian Elimination)** 在 $O(n^3)$ 复杂度内求解。对于模意义下的方程组，需配合逆元。
</KnowledgeCard>

## 齐次线性方程组
对于 $A\mathbf{x} = 0$：
- 必有零解。
- 若 $r(A) < n$，则有非零解，且其基础解系包含 $n - r(A)$ 个线性无关向量。
