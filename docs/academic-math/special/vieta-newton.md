---
title: 从韦达定理到牛顿公式
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 从韦达定理到牛顿公式

探索根与系数之间的深刻对称关系。

## 韦达定理 (Vieta's Formulas)
对于 $n$ 次多项式 $P(x) = a_n x^n + \dots + a_0$，其根 $x_1, \dots, x_n$ 满足：
- $e_1 = \sum x_i = -a_{n-1}/a_n$
- $e_2 = \sum_{i<j} x_ix_j = a_{n-2}/a_n$
- $e_n = \prod x_i = (-1)^n a_0/a_n$

## 牛顿公式 (Newton's Sums)
设 $p_k = x_1^k + x_2^k + \dots + x_n^k$ 为根的 $k$ 次幂和。牛顿公式给出了 $p_k$ 与基本对称多项式 $e_k$ 之间的递归关系：
对于 $k \le n$：
$$p_k - e_1 p_{k-1} + e_2 p_{k-2} - \dots + (-1)^k k e_k = 0$$

<KnowledgeCard type="contest" title="竞赛应用">
利用牛顿公式，我们可以在不知道具体根的情况下，通过系数快速计算根的高次幂和。
</KnowledgeCard>
