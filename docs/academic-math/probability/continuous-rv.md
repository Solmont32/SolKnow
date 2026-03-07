# 连续型随机变量 (Continuous Random Variables)

## 定义
随机变量 $X$ 的取值充满一个区间。

## 概率密度函数 (Probability Density Function, PDF)
满足 $f(x) \ge 0$ 且 $\int_{-\infty}^\infty f(x) dx = 1$。
$P(a \le X \le b) = \int_a^b f(x) dx$。

## 常见分布
- **均匀分布**：$f(x) = \frac{1}{b-a}$ ($a < x < b$)。
- **指数分布**：$f(x) = \lambda e^{-\lambda x}$ ($x > 0$)。
- **正态分布**：$X \sim N(\mu, \sigma^2)$。

## 累积分布函数 (Cumulative Distribution Function, CDF)
$F(x) = P(X \le x) = \int_{-\infty}^x f(t) dt$。
