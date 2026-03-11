---
title: 递推关系与生成函数 (Recurrence and Generating Functions)
description: 常系数线性递推、特征方程法与普通生成函数入门
---

# 递推关系与生成函数

递推关系描述“当前状态由过去状态决定”的规律，是离散数学、算法分析与组合计数中的核心工具。

## 1. 递推关系基础

递推关系由两部分构成：

- 递推式（状态转移）；
- 初值条件（边界）。

示例：斐波那契数列

$$

F_n=F_{n-1}+F_{n-2},\quad F_0=0,\ F_1=1.


$$

## 2. 一阶线性递推

一般形式：

$$

a_n=ra_{n-1}+b.


$$

若 $r\neq 1$，通解可写为

$$

a_n=r^n a_0+b\frac{r^n-1}{r-1}.


$$

### 例题 1

给定 $a_n=2a_{n-1}+3,\ a_0=1$，求 $a_n$。

**解：**

$$

a_n=2^n\cdot 1+3(2^n-1)=4\cdot2^n-3.


$$

## 3. 二阶常系数齐次递推

一般形式：

$$

a_n=c_1a_{n-1}+c_2a_{n-2}.


$$

令特征方程

$$

\lambda^2-c_1\lambda-c_2=0.


$$

- 两个不同根 $\lambda_1,\lambda_2$：$a_n=A\lambda_1^n+B\lambda_2^n$；
- 重根 $\lambda$：$a_n=(A+Bn)\lambda^n$。

### 例题 2（斐波那契闭式）

对 $F_n=F_{n-1}+F_{n-2}$，特征方程为

$$

\lambda^2-\lambda-1=0.


$$

两根为

$$

\phi=\frac{1+\sqrt5}{2},\ \psi=\frac{1-\sqrt5}{2}.


$$

故

$$

F_n=\frac{\phi^n-\psi^n}{\sqrt5}.


$$

## 4. 非齐次递推与待定系数法

### 例题 3

求解

$$

a_n-3a_{n-1}=2^n,\quad a_0=0.


$$

**解：**

1. 齐次解：$a_n^{(h)}=C\cdot3^n$。
2. 设特解 $a_n^{(p)}=k\cdot2^n$，代入得

$$

k2^n-3k2^{n-1}=2^n\Rightarrow -\frac{k}{2}=1\Rightarrow k=-2.


$$

3. 总解：$a_n=C3^n-2\cdot2^n$。
4. 用 $a_0=0$ 得 $C=2$。

所以

$$

a_n=2\cdot3^n-2^{n+1}.


$$

## 5. 普通生成函数 (OGF) 详解

对序列 $\{a_n\}$，其 OGF 为 $A(x) = \sum_{n=0}^\infty a_n x^n$。

### 5.1 核心性质与运算

| 运算         | 序列                           | 生成函数                   |
| :----------- | :----------------------------- | :------------------------- |
| 线性性质     | $\alpha a_n + \beta b_n$       | $\alpha A(x) + \beta B(x)$ |
| 平移（右移） | $0, \dots, 0, a_0, a_1, \dots$ | $x^k A(x)$                 |
| 差分         | $a_n - a_{n-1}$                | $(1-x)A(x)$                |
| 前缀和       | $\sum_{i=0}^n a_i$             | $\frac{A(x)}{1-x}$         |
| 卷积         | $\sum_{i=0}^n a_i b_{n-i}$     | $A(x)B(x)$                 |
| 导数         | $(n+1)a_{n+1}$                 | $A'(x)$                    |

### 5.2 常用闭式映射

- $\frac{1}{1-x} = \sum_{n=0}^\infty x^n$ (序列 $1, 1, 1, \dots$)
- $\frac{1}{(1-x)^k} = \sum_{n=0}^\infty \binom{n+k-1}{k-1} x^n$ (多重集组合)
- $(1+x)^n = \sum_{k=0}^n \binom{n}{k} x^k$ (二项式)

### 例题 5：受限计数

求用 1分、2分、5分硬币组成 $n$ 分钱的方案数。

**解**：生成函数为
$A(x) = (1+x+x^2+\dots)(1+x^2+x^4+\dots)(1+x^5+x^{10}+\dots)$
$= \frac{1}{(1-x)(1-x^2)(1-x^5)}$。
方案数即为 $x^n$ 的系数。

## 6. 指数生成函数 (EGF)

对于**排列**问题（元素有顺序），使用 EGF：

$$
\hat{A}(x) = \sum_{n=0}^\infty a_n \frac{x^n}{n!}.
$$

### 6.1 核心性质：指数卷积

若 $a_n, b_n$ 分别对应 $\hat{A}(x), \hat{B}(x)$，则 $\hat{A}(x)\hat{B}(x)$ 对应序列：

$$
c_n = \sum_{i=0}^n \binom{n}{i} a_i b_{n-i}.
$$

这恰好对应了“先从 $n$ 个位置选 $i$ 个放 $a$，剩下的放 $b$”的结构。

### 例题 6：错排再访

错排序列的 EGF 为：
$\hat{D}(x) = \frac{e^{-x}}{1-x}$。
通过展开 $e^{-x}$ 与 $(1-x)^{-1}$ 的乘积可直接得到 $D_n$ 的通项公式。

## 7. 本章练习

### 练习 1：递推求解

求解 $a_n = 2a_{n-1} + a_{n-2}$，$a_0=0, a_1=1$（白银分割比相关）。

<details>
<summary>Check Solution</summary>

特征方程 $\lambda^2 - 2\lambda - 1 = 0$，解得 $\lambda = 1 \pm \sqrt{2}$。
通解 $a_n = A(1+\sqrt{2})^n + B(1-\sqrt{2})^n$。
代入初值得 $a_n = \frac{(1+\sqrt{2})^n - (1-\sqrt{2})^n}{2\sqrt{2}}$。

</details>

### 练习 2：OGF 展开

求 $\frac{1}{(1-x)^3}$ 的 $x^n$ 项系数。

<details>
<summary>Check Solution</summary>

根据广义二项式定理：$\binom{n+3-1}{3-1} = \binom{n+2}{2} = \frac{(n+2)(n+1)}{2}$。

</details>

### 练习 3：染色问题（EGF 应用）

用红、蓝、绿三种颜色涂 $n$ 个排成一行的格子，要求红色必须出现偶数次，求方案数。

<details>
<summary>Check Solution</summary>

红色的 EGF：$\frac{e^x + e^{-x}}{2}$；蓝/绿的 EGF：$e^x$。
总 EGF：$\hat{G}(x) = \frac{e^x + e^{-x}}{2} \cdot e^x \cdot e^x = \frac{1}{2}(e^{3x} + e^x)$。
$x^n/n!$ 的系数为 $\frac{1}{2}(3^n + 1)$。

</details>

### 练习 4：Catalan 数（思考题）

Catalan 数的递推式为 $C_n = \sum_{i=0}^{n-1} C_i C_{n-1-i}$。试写出其生成函数方程。

<details>
<summary>Check Solution</summary>

设 $C(x)$ 为生成函数，则 $C(x) = x C^2(x) + 1$。
解得 $C(x) = \frac{1 - \sqrt{1-4x}}{2x}$。

</details>

## 7. 学习闭环

- 前置：[组合数学](combinatorics)
- 先修补充：[布尔代数与逻辑电路](boolean-algebra-and-logic-circuits)
- 配套题单：[离散数学练习库](/docs/exercises/math/discrete-math)
