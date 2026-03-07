---
title: 多项式 (Polynomial)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 多项式 (Polynomial)

形如 $P(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_0$ 的代数式。

## 多项式除法
对于多项式 $f(x)$ 和 $g(x)$，存在唯一的 $q(x)$（商）和 $r(x)$（余式）使得：
$$f(x) = q(x)g(x) + r(x), \quad deg(r) < deg(g)$$

## 韦达定理 (Vieta's Formulas)
对于 $n$ 次方程 $\sum a_i x^i = 0$，根 $x_1, \dots, x_n$ 满足：
- $\sum x_i = -\frac{a_{n-1}}{a_n}$
- $\prod x_i = (-1)^n \frac{a_0}{a_n}$

<KnowledgeCard type="contest" title="算法关联">
在算法竞赛中，**快速傅里叶变换 (FFT)** 可以在 $O(N \log N)$ 时间内完成多项式乘法。
</KnowledgeCard>
