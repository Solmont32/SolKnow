---
title: 连续型随机变量 (Continuous Random Variables)
---

# 连续型随机变量 (Continuous Random Variables)

## 定义
如果存在非负可积函数 $f(x)$，使得对于任意 $a \le b$，有：
$$P(a \le X \le b) = \int_{a}^{b} f(x) \, dx$$
则称 $X$ 为连续型随机变量，$f(x)$ 为其概率密度函数。

## 常见分布
- **均匀分布 (Uniform)**：$X \sim U(a, b)$
- **指数分布 (Exponential)**：$X \sim E(\lambda)$，$f(x) = \lambda e^{-\lambda x}$ ($x > 0$)。
- **正态分布 (Normal/Gaussian)**：$X \sim N(\mu, \sigma^2)$
  $$f(x) = \frac{1}{\sqrt{2\pi}\sigma} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

## 分布函数 $F(x)$
$$F(x) = P(X \le x) = \int_{-\infty}^{x} f(t) \, dt$$
满足 $F'(x) = f(x)$。
