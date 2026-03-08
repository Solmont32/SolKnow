---
title: 高等代数练习
---

# 高等代数练习

本页按“基础-提高-挑战”组织；每题均提供折叠解析，点击可展开过程与答案。

## A. 基础题

### 练习 A1：矩阵秩
计算矩阵
$$
A=\begin{pmatrix}
1&2\\
2&4
\end{pmatrix}
$$
的秩。

<details>
<summary>点击查看解析与答案</summary>

行变换 $R_2\leftarrow R_2-2R_1$，得
$$
\begin{pmatrix}
1&2\\
0&0
\end{pmatrix}.
$$
非零行数为 1，故 $\operatorname{rank}(A)=1$。
</details>

### 练习 A2：行列式性质
已知 $|A|=-3$，求 $|2A^T|$（$A$ 为 3 阶矩阵）。

<details>
<summary>点击查看解析与答案</summary>

$|A^T|=|A|=-3$，且 $|2A^T|=2^3|A^T|=8\times(-3)=-24$。
</details>

### 练习 A3：克拉默法则
求解方程组
$$
\begin{cases}
2x+y=5\\
x-y=1
\end{cases}
$$

<details>
<summary>点击查看解析与答案</summary>

系数行列式
$$
D=\begin{vmatrix}2&1\\1&-1\end{vmatrix}=-3\neq0.
$$
$$
D_x=\begin{vmatrix}5&1\\1&-1\end{vmatrix}=-6,\quad
D_y=\begin{vmatrix}2&5\\1&1\end{vmatrix}=-3.
$$
故
$$
x=D_x/D=2,\ y=D_y/D=1.
$$
</details>

## B. 提高题

### 练习 B1：参数方程组讨论
讨论参数 $a$ 下方程组
$$
\begin{cases}
x+y+z=1\\
x+2y+az=2\\
2x+3y+(a+1)z=3
\end{cases}
$$
的解的情况。

<details>
<summary>点击查看解析与答案</summary>

增广矩阵消元：
- $R_2\leftarrow R_2-R_1\Rightarrow(0,1,a-1|1)$；
- $R_3\leftarrow R_3-2R_1\Rightarrow(0,1,a-1|1)$；
- $R_3\leftarrow R_3-R_2\Rightarrow(0,0,0|0)$。

故始终有解，且秩为 2。未知数 3 个，故总是无穷多解（1 个自由变量）。
</details>

### 练习 B2：基础解系
求齐次系统
$$
\begin{cases}
x_1+x_2+x_4=0\\
2x_1+x_2+x_3+3x_4=0
\end{cases}
$$
的基础解系。

<details>
<summary>点击查看解析与答案</summary>

由第一式 $x_1=-x_2-x_4$，代入第二式得
$$
- x_2 + x_3 + x_4 =0\Rightarrow x_3=x_2-x_4.
$$
令 $x_2=s, x_4=t$，则
$$
\mathbf{x}=s\begin{pmatrix}-1\\1\\1\\0\end{pmatrix}+t\begin{pmatrix}-1\\0\\-1\\1\end{pmatrix}.
$$
基础解系可取
$$
\left\{(-1,1,1,0)^T,\ (-1,0,-1,1)^T\right\}.
$$
</details>

### 练习 B3：二次型定性
判断二次型
$$
Q=3x_1^2+2x_1x_2+2x_2^2
$$
的定性。

<details>
<summary>点击查看解析与答案</summary>

对应矩阵
$$
A=\begin{pmatrix}3&1\\1&2\end{pmatrix}.
$$
顺序主子式
$$
\Delta_1=3>0,\quad \Delta_2=6-1=5>0.
$$
故 $Q$ 正定。
</details>

## C. 挑战题

### 练习 C1：合同变换与惯性指数
设实对称矩阵
$$
A=\begin{pmatrix}
1&1&0\\
1&1&0\\
0&0&-2
\end{pmatrix}.
$$
求对应二次型的秩与惯性指数 $(p,q)$。

<details>
<summary>点击查看解析与答案</summary>

前两维部分对应矩阵
$$
\begin{pmatrix}1&1\\1&1\end{pmatrix}
$$
秩为 1，可化为 $2y_1^2$；第三维为 $-2y_3^2$。
故标准形含一个正平方项、一个负平方项，另有一个零项。

结论：
- 秩 $r=2$；
- 惯性指数 $(p,q)=(1,1)$。
</details>

### 练习 C2：行列式与逆矩阵
已知 3 阶矩阵 $A$ 满足 $|A|=4$，求 $|A^*|$ 与 $|A^{-1}|$。

<details>
<summary>点击查看解析与答案</summary>

对 $n$ 阶矩阵有 $|A^*|=|A|^{n-1}$。这里 $n=3$，故
$$
|A^*|=4^2=16.
$$
又
$$
|A^{-1}|=\frac{1}{|A|}=\frac14.
$$
</details>
