---
title: 函数拟合：最小二乘法 (Least Squares)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 函数拟合：最小二乘法 (Least Squares)

在实际工程中，观测数据往往带有噪声。与要求“严格过点”的插值法不同，拟合（Fitting）旨在寻找一个简单的函数 $f(x)$，使得它在某种意义下最接近所有的观测点。

---

## 1. 最小二乘问题的数学描述

给定一组观测数据 $(x_i, y_i), i=1, \dots, m$。假设拟合函数的形式为：
$$f(x) = a_0 \phi_0(x) + a_1 \phi_1(x) + \dots + a_n \phi_n(x)$$
其中 $\{\phi_j(x)\}$ 是预先选定的一组基函数（通常为 $1, x, x^2, \dots$），$n < m$。

**目标**：寻找系数 $a_j$，使得残差平方和 $S$ 最小：
$$S(a_0, \dots, a_n) = \sum_{i=1}^m [f(x_i) - y_i]^2 = \sum_{i=1}^m \left[ \sum_{j=0}^n a_j \phi_j(x_i) - y_i \right]^2$$

---

## 2. 正规方程组 (Normal Equations)

为了求 $S$ 的极小值，根据多元函数极值存在的必要条件，令其对各系数的偏导数为零：
$$\frac{\partial S}{\partial a_k} = 0, \quad k = 0, 1, \dots, n$$

### 2.1 推导过程
对 $a_k$ 求导得：
$$2 \sum_{i=1}^m \left[ \sum_{j=0}^n a_j \phi_j(x_i) - y_i \right] \phi_k(x_i) = 0$$
整理可得：
$$\sum_{j=0}^n a_j \left( \sum_{i=1}^m \phi_j(x_i) \phi_k(x_i) \right) = \sum_{i=1}^m y_i \phi_k(x_i)$$

### 2.2 矩阵形式
定义内积 $\langle u, v \rangle = \sum_{i=1}^m u(x_i) v(x_i)$，则上述方程组可写作：
$$
\begin{pmatrix}
\langle \phi_0, \phi_0 \rangle & \dots & \langle \phi_n, \phi_0 \rangle \\
\vdots & \ddots & \vdots \\
\langle \phi_0, \phi_n \rangle & \dots & \langle \phi_n, \phi_n \rangle
\end{pmatrix}
\begin{pmatrix}
a_0 \\ \vdots \\ a_n
\end{pmatrix}
=
\begin{pmatrix}
\langle y, \phi_0 \rangle \\ \vdots \\ \langle y, \phi_n \rangle
\end{pmatrix}
$$
这就是 **正规方程组**。

---

## 3. 几何解释：正交投影

从线性代数的角度看，拟合问题是在由基函数 $\{\phi_j\}$ 张成的子空间中，寻找一个向量 $f$，使得观测向量 $y$ 到该子空间的距离最短。

<KnowledgeCard type="info" title="几何直观">
残差向量 $r = f - y$ 必须正交于基函数张成的空间。即对于所有的 $k$，都有 $\langle r, \phi_k \rangle = 0$。这直接导出了正规方程组。
</KnowledgeCard>

---

## 4. 数值稳定性与正交多项式

当基函数选取为简单的幂函数 $1, x, x^2, \dots$ 时，正规方程组的系数矩阵（Hilbert 矩阵的离散形式）往往是高度**病态 (Ill-conditioned)** 的。

<KnowledgeCard type="warning" title="数值风险">
对于高阶多项式拟合，舍入误差会被极度放大。
**解决方案**：采用**正交多项式**（如 Legendre 多项式或 Chebyshev 多项式）作为基函数，使得系数矩阵退化为对角阵，从而极大地提高数值稳定性。
</KnowledgeCard>

---

## ✍️ 典型例题

<details>
<summary>例 1：给定数据点 (1, 2), (2, 3), (3, 5)，用最小二乘法求拟合直线 $y = a+bx$。</summary>

**解析：**
1. 确定基函数：$\phi_0(1)=1, \phi_1(x)=x$。
2. 计算内积：
   - $\langle \phi_0, \phi_0 \rangle = 1+1+1 = 3$
   - $\langle \phi_0, \phi_1 \rangle = 1+2+3 = 6$
   - $\langle \phi_1, \phi_1 \rangle = 1^2+2^2+3^2 = 14$
   - $\langle y, \phi_0 \rangle = 2+3+5 = 10$
   - $\langle y, \phi_1 \rangle = 2(1)+3(2)+5(3) = 23$
3. 建立方程组：
   $$ \begin{cases} 3a + 6b = 10 \\ 6a + 14b = 23 \end{cases} $$
4. 求解：
   由 (1) 得 $a = \frac{10-6b}{3}$。代入 (2)：$2(10-6b) + 14b = 23 \Rightarrow 20 + 2b = 23 \Rightarrow b = 1.5$。
   $a = \frac{10-9}{3} = 1/3$。
拟合直线为：$y = \frac{1}{3} + 1.5x$。

</details>

---

## 🚀 专项训练

前往 **[数值分析专题练习库](/docs/exercises/math/numerical-analysis)** 探索加权最小二乘法与非线性拟合。
