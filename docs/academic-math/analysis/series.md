---
title: 级数 (Series)
---

# 级数 (Series)

## 数项级数
无限个数值相加：$\sum_{n=1}^{\infty} a_n$。
- **收敛**：部分和数列 $\{S_n\}$ 有极限。
- **发散**：没有极限。

## 判别法
- **正项级数**：比较判别法、比值判别法（D'Alembert）、根值判别法（Cauchy）。
- **交错级数**：莱布尼茨判别法 (Leibniz)。

## 幂级数
形式为 $\sum a_n (x - x_0)^n$ 的级数。
- **收敛半径 ($R$)**：级数在 $(x_0-R, x_0+R)$ 内绝对收敛。

## 泰勒展开 (Taylor Series)
$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(x_0)}{n!}(x - x_0)^n$$
常见展开：$e^x = \sum \frac{x^n}{n!}$，$\sin x = \sum (-1)^n \frac{x^{2n+1}}{(2n+1)!}$。
