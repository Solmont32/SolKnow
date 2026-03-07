# 多项式 (Polynomials)

## 定义
一个变元 $x$ 的多项式是一个具有如下形式的表达式：
$P(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0$
其中 $a_i$ 为系数，$n$ 为非负整数（称为多项式的次数，记作 $\deg(P)$）。

## 带余除法 (Euclidean Division)
对于两个多项式 $f(x)$ 和 $g(x) \neq 0$，存在唯一的多项式 $q(x)$（商）和 $r(x)$（余式），使得：
$f(x) = g(x)q(x) + r(x)$，且 $\deg(r) < \deg(g)$。

## 代数基本定理 (Fundamental Theorem of Algebra)
任何一个非常数复系数多项式在复数域中至少有一个根。
