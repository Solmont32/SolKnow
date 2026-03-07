# 大数定律与中心极限定理 (Limit Theorems)

## 切比雪夫不等式
$P(|X - E[X]| \ge \epsilon) \le \frac{Var(X)}{\epsilon^2}$。

## 大数定律 (Law of Large Numbers)
当试验次数 $n$ 很大时，事件发生的频率稳定在概率附近。

## 中心极限定理 (Central Limit Theorem, CLT)
大量相互独立的、同分布的随机变量之和，近似服从正态分布。
若 $X_1, X_2, \dots$ 独立同分布，且 $E[X_i] = \mu, Var(X_i) = \sigma^2$，则：
$\frac{\sum X_i - n\mu}{\sqrt{n}\sigma} \xrightarrow{d} N(0, 1)$。
