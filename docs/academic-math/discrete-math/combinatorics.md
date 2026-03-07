---
title: 组合数学 (Combinatorics)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 组合数学 (Combinatorics)

组合数学是研究离散对象的计数、排列与组合规律的学科。

## 计数基本原理
-   **加法原理**：完成一件事有 $n$ 类办法，第一类有 $m_1$ 种，……，第 $n$ 类有 $m_n$ 种，则总数 $\sum m_i$。
-   **乘法原理**：完成一件事有 $n$ 个步骤，第一步有 $m_1$ 种，……，第 $n$ 步有 $m_n$ 种，则总数 $\prod m_i$。

## 排列与组合
-   **排列 (Permutation)**：从 $n$ 个中取出 $k$ 个并排序：
    $$P(n, k) = \frac{n!}{(n-k)!}$$
-   **组合 (Combination)**：从 $n$ 个中取出 $k$ 个不计顺序：
    $$C(n, k) = \binom{n}{k} = \frac{n!}{k!(n-k)!}$$

<KnowledgeCard type="contest" title="算法应用">
在算法竞赛中，组合数通常通过 **逆元预处理阶乘** 或 **杨辉三角递推** 来实现。
递推式：$\binom{n}{k} = \binom{n-1}{k} + \binom{n-1}{k-1}$。
</KnowledgeCard>

## 常见原理
1.  **二项式定理**：$(x+y)^n = \sum_{k=0}^n \binom{n}{k} x^{n-k} y^k$。
2.  **鸽巢原理**：$n+1$ 个物品放入 $n$ 个抽屉，必有一个抽屉至少有 2 个物品。
3.  **容斥原理**：用于处理有重叠集合的计数问题。
