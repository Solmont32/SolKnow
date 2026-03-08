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

## 5. 普通生成函数（OGF）入门

对序列 $\{a_n\}$，定义普通生成函数：
$$
A(x)=\sum_{n\ge0}a_nx^n.
$$

通过把递推式乘上 $x^n$ 并求和，可把“递推问题”转换成“代数恒等式”问题。

### 例题 4
设 $a_n=1$（$n\ge0$），求 OGF。

**解：**
$$
A(x)=1+x+x^2+\cdots=\frac{1}{1-x},\quad |x|<1.
$$

### 例题 5（用 OGF 求斐波那契）
令 $F(x)=\sum_{n\ge0}F_nx^n$，由递推得
$$
F(x)-x=xF(x)+x^2F(x).
$$
故
$$
F(x)=\frac{x}{1-x-x^2}.
$$
这与闭式公式等价。

## 6. 本章练习

### 练习 1
求解 $a_n=3a_{n-1}+2,\ a_0=2$。

<details>

<summary>点击查看解析与答案</summary>

$$
a_n=3^n\cdot2+2\cdot\frac{3^n-1}{3-1}=3^{n+1}-1.
$$

</details>

### 练习 2
求递推 $a_n=4a_{n-1}-4a_{n-2}$ 的通解。

<details>

<summary>点击查看解析与答案</summary>

特征方程 $(\lambda-2)^2=0$，重根 2：
$$
a_n=(A+Bn)2^n.
$$

</details>

### 练习 3
求序列 $1,1,1,\dots$ 的 OGF。

<details>

<summary>点击查看解析与答案</summary>

$$
A(x)=\frac{1}{1-x}.
$$

</details>

### 练习 4
设 $a_n=n$，求其 OGF。

<details>

<summary>点击查看解析与答案</summary>

由几何级数求导可得
$$
\sum_{n\ge0}nx^n=\frac{x}{(1-x)^2},\quad |x|<1.
$$

</details>

## 7. 学习闭环
- 前置：[组合数学](combinatorics)
- 先修补充：[布尔代数与逻辑电路](boolean-algebra-and-logic-circuits)
- 配套题单：[离散数学练习库](/docs/exercises/math/discrete-math)
