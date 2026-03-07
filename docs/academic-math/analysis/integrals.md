---
title: 积分 (Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 积分 (Integrals)

积分是导数的逆运算，主要用于计算面积、体积及物理量。

## 不定积分
$$\int f(x) dx = F(x) + C \iff F'(x) = f(x)$$

## 定积分 (Riemann Integral)
定积分的本质是黎曼和的极限。对于连续函数 $f(x)$：
$$\int_a^b f(x) dx = \lim_{n \to \infty} \sum_{i=1}^n f(\xi_i) \Delta x_i$$

## 牛顿-莱布尼茨公式
如果 $F(x)$ 是 $f(x)$ 的原函数，则：
$$\int_a^b f(x) dx = F(b) - F(a)$$

<KnowledgeCard type="code" title="常用积分法">
1. **第一类换元法**：$\int f(g(x))g'(x)dx = \int f(u)du$。
2. **分部积分法**：$\int u dv = uv - \int v du$。（口诀：反对幂三指）
</KnowledgeCard>

## 常见积分公式库
-   $\int x^n dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)$
-   $\int \frac{1}{x} dx = \ln|x| + C$
-   $\int a^x dx = \frac{a^x}{\ln a} + C$
-   $\int \frac{1}{1+x^2} dx = \arctan x + C$
-   $\int \frac{1}{\sqrt{1-x^2}} dx = \arcsin x + C$
