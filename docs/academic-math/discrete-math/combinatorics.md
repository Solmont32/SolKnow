# 组合数学 (Combinatorics)

## 计数原理
- **加法原理**：完成一件事有 $n$ 类办法，每类办法分别有 $m_i$ 种方式，总数 $\sum m_i$。
- **乘法原理**：完成一件事有 $n$ 个步骤，每个步骤分别有 $m_i$ 种方式，总数 $\prod m_i$。

## 排列与组合
- **排列 (Permutation)**：从 $n$ 个不同元素中取出 $k$ 个的排列数 $P(n, k) = \frac{n!}{(n-k)!}$。
- **组合 (Combination)**：从 $n$ 个不同元素中取出 $k$ 个的组合数 $C(n, k) = \binom{n}{k} = \frac{n!}{k!(n-k)!}$。

## 二项式定理 (Binomial Theorem)
$(a+b)^n = \sum_{k=0}^n \binom{n}{k} a^{n-k} b^k$

## 鸽巢原理 (Pigeonhole Principle)
如果 $n+1$ 只鸽子飞进 $n$ 个笼子，则至少有一个笼子包含至少两只鸽子。
