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

## D. 矩阵与多项式专题加练

### 练习 D1：伴随矩阵行列式

设 $A$ 为 4 阶可逆矩阵，且 $|A|=-2$，求 $|A^*|$。

<details>

<summary>点击查看解析与答案</summary>

$n$ 阶矩阵满足 $|A^*|=|A|^{n-1}$。
这里 $n=4$，故

$$

|A^*|=(-2)^3=-8.


$$

</details>

### 练习 D2：特征多项式

求矩阵

$$

A=\begin{pmatrix}1&2\\0&3\end{pmatrix}


$$

的特征多项式与特征值。

<details>

<summary>点击查看解析与答案</summary>

$$

p_A(\lambda)=\det(\lambda I-A)=\begin{vmatrix}\lambda-1&-2\\0&\lambda-3\end{vmatrix}=(\lambda-1)(\lambda-3).


$$

故特征值为 $1,3$。

</details>

### 练习 D3：重根与导数

判定 $x=1$ 是否为

$$

f(x)=x^4-2x^3+2x-1


$$

的重根。

<details>

<summary>点击查看解析与答案</summary>

先算

$$

f(1)=1-2+2-1=0.


$$

再算

$$

f'(x)=4x^3-6x^2+2,\quad f'(1)=4-6+2=0.


$$

因此 $x=1$ 至少是二重根。继续算

$$

f''(x)=12x^2-12x,\ f''(1)=0,


$$

$$
f^{(3)}(x)=24x-12,\ f^{(3)}(1)=12\neq0,


$$

故为三重根。

</details>

### 练习 D4：插值构造

构造一个二次多项式 $p(x)$，满足

$$

p(0)=1,\ p(1)=3,\ p(2)=7.


$$

<details>

<summary>点击查看解析与答案</summary>

设 $p(x)=ax^2+bx+c$。
由 $p(0)=1$ 得 $c=1$。
由 $p(1)=3$ 得 $a+b+1=3\Rightarrow a+b=2$。
由 $p(2)=7$ 得 $4a+2b+1=7\Rightarrow 2a+b=3$。
联立解得 $a=1,b=1$。
故

$$

p(x)=x^2+x+1.


$$

</details>

## E. 向量空间与线性变换专题加练

### 练习 E1：子空间判定与维数

在 $\mathbb{R}^4$ 中，设

$$

U=\{(x_1,x_2,x_3,x_4)\mid x_1+x_2=0,\ x_3-x_4=0\}.


$$

判断 $U$ 是否为子空间，并求其维数。

<details>

<summary>点击查看解析与答案</summary>

$U$ 由齐次线性方程组给出，必为子空间。由约束得

$$

x_1=-x_2,\quad x_3=x_4.


$$

令 $x_2=s,x_4=t$，则

$$

(x_1,x_2,x_3,x_4)=s(-1,1,0,0)+t(0,0,1,1).


$$

故 $\dim U=2$，一组基可取

$$

\{(-1,1,0,0),(0,0,1,1)\}.


$$

</details>

### 练习 E2：线性映射核与像

设 $T:\mathbb{R}^3\to\mathbb{R}^3$，

$$

T(x,y,z)=(x-y,\ y-z,\ x-z).


$$

求 $\ker T$ 与 $\operatorname{rank}(T)$。

<details>

<summary>点击查看解析与答案</summary>

核满足

$$

x-y=0,\ y-z=0,\ x-z=0,


$$

即 $x=y=z=t$。所以

$$

\ker T=\operatorname{span}\{(1,1,1)\},\quad \dim\ker T=1.


$$

由秩-零空间维数定理，域维数为 3，故

$$

\operatorname{rank}(T)=3-1=2.


$$

</details>

### 练习 E3：基下矩阵表示

在 $P_2(\mathbb{R})$ 上定义 $T(p)=xp'(x)$。取标准基 $\mathcal{B}=\{1,x,x^2\}$，求 $[T]_{\mathcal{B}}$。

<details>

<summary>点击查看解析与答案</summary>

$$

T(1)=0,\quad T(x)=x,\quad T(x^2)=2x^2.


$$

对应坐标列向量分别为

$$

(0,0,0)^T,\ (0,1,0)^T,\ (0,0,2)^T.


$$

故

$$

[T]_{\mathcal{B}}=\begin{pmatrix}
0&0&0\\
0&1&0\\
0&0&2
\end{pmatrix}.


$$

</details>

### 练习 E4：维数公式综合

设 $V=\mathbb{R}^5$，子空间 $U,W$ 满足

$$

\dim U=3,\quad \dim W=4,\quad \dim(U\cap W)=2.


$$

求 $\dim(U+W)$，并判断是否必有 $U+W=V$。

<details>

<summary>点击查看解析与答案</summary>

由维数公式：

$$

\dim(U+W)=\dim U+\dim W-\dim(U\cap W)=3+4-2=5.


$$

又 $\dim V=5$，故 $U+W$ 与 $V$ 同维且 $U+W\subseteq V$，因此

$$

U+W=V.


$$

</details>

### 练习 E5：线性变换可逆性判定

设线性映射 $T:\mathbb{R}^2\to\mathbb{R}^2$，

$$

T(x,y)=(2x+y,\ 4x+2y).


$$

判断 $T$ 是否可逆。

<details>

<summary>点击查看解析与答案</summary>

对应矩阵

$$

A=\begin{pmatrix}2&1\\4&2\end{pmatrix},\quad \det A=2\cdot2-4\cdot1=0.


$$

行向量线性相关，秩为 1，不满秩，故 $T$ 不可逆。

</details>

## F. 特征值与 Jordan 标准形专题加练

### 练习 F1：特征值与特征子空间

设

$$

A=\begin{pmatrix}
2&0&0\\
0&2&1\\
0&0&2
\end{pmatrix}.


$$

求特征值及 $\dim E_2$。

<details>

<summary>点击查看解析与答案</summary>

唯一特征值为 2（代数重数 3）。

$$

A-2I=\begin{pmatrix}
0&0&0\\
0&0&1\\
0&0&0
\end{pmatrix}


$$

方程 $(A-2I)x=0$ 给出 $x_3=0$，$x_1,x_2$ 自由。
故

$$

\dim E_2=2.


$$

</details>

### 练习 F2：可对角化判定

设

$$

A=\begin{pmatrix}
1&1&0\\
0&1&0\\
0&0&3
\end{pmatrix}.


$$

判断是否可对角化。

<details>

<summary>点击查看解析与答案</summary>

特征值为 1（代数重数 2）与 3（代数重数 1）。
对 $\lambda=1$：

$$

A-I=\begin{pmatrix}
0&1&0\\
0&0&0\\
0&0&2
\end{pmatrix},


$$

故特征子空间维数为 1。于是总特征向量数不足 3，
矩阵不可对角化。

</details>

### 练习 F3：最小多项式识别

设

$$

A=\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}.


$$

求 $m_A(x)$。

<details>

<summary>点击查看解析与答案</summary>

有

$$

A^2=0,\ A\neq0.


$$

因此最低次首一湮灭多项式为

$$

m_A(x)=x^2.


$$

</details>

### 练习 F4：Jordan 块与核维数

设 5 阶矩阵 $A$ 的唯一特征值为 4，且

$$

\dim\ker(A-4I)=2,
\quad \dim\ker((A-4I)^2)=4,
\quad \dim\ker((A-4I)^3)=5.


$$

写出 Jordan 块大小。

<details>

<summary>点击查看解析与答案</summary>

块个数是 $\dim\ker(A-4I)=2$。核维数增长量依次为 $2,2,1$，说明两块中一块长度至少 3，另一块长度至少 2，总和为 5。
故块大小为

$$

3+2.


$$

即 Jordan 形为 $\operatorname{diag}(J_3(4),J_2(4))$。

</details>

### 练习 F5：Jordan 块幂计算

设

$$

J=\begin{pmatrix}
\lambda&1\\
0&\lambda
\end{pmatrix}.


$$

求 $J^n$。

<details>

<summary>点击查看解析与答案</summary>

记 $J=\lambda I+N$，其中

$$

N=\begin{pmatrix}0&1\\0&0\end{pmatrix},\ N^2=0.


$$

则

$$

J^n=(\lambda I+N)^n=\lambda^n I+n\lambda^{n-1}N
=\begin{pmatrix}
\lambda^n&n\lambda^{n-1}\\
0&\lambda^n
\end{pmatrix}.


$$

</details>

## H. 双线性型与二次型深度进阶

### 练习 H1：双线性型的度量矩阵

在 $P_1(\mathbb{R})$（一次多项式空间）上，定义双线性型：
$$ B(p, q) = \int_0^1 p(x)q(x) dx. $$
求 $B$ 在基 $\{1, x\}$ 下的度量矩阵。

<details>
<summary>点击查看解析与答案</summary>

计算度量矩阵 $A = (a_{ij})$：

- $a_{11} = B(1, 1) = \int_0^1 1 dx = 1$
- $a_{12} = B(1, x) = \int_0^1 x dx = 1/2$
- $a_{21} = B(x, 1) = 1/2$
- $a_{22} = B(x, x) = \int_0^1 x^2 dx = 1/3$

故度量矩阵为：
$$ A = \begin{pmatrix} 1 & 1/2 \\ 1/2 & 1/3 \end{pmatrix}. $$

</details>

### 练习 H2：反对称双线性型的秩

证明：若 $B$ 是 $n$ 维空间 $V$ 上的交错双线性型（即 $B(v, v) = 0, \forall v \in V$），则 $\operatorname{rank}(B)$ 必为偶数。

<details>
<summary>点击查看解析与答案</summary>

交错双线性型对应的度量矩阵 $A$ 是反对称矩阵（$A^T = -A$）。
反对称矩阵的秩必为偶数是一个经典结论。
证明思路：利用合同变换，交错型必可化为如下标准形：
$$ \operatorname{diag}\left( \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}, \dots, \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}, 0, \dots, 0 \right). $$
每一个 $\begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$ 块贡献 2 个单位的秩，其余部分为 0。
故总秩必为偶数。

</details>

### 练习 H3：正定二次型的判别

设 $A, B$ 都是 $n$ 阶正定矩阵。问 $A+B$ 是否一定正定？$AB$ 是否一定正定？

<details>
<summary>点击查看解析与答案</summary>

1. **$A+B$ 必正定**：
   对任意 $x \neq 0$，$x^T(A+B)x = x^TAx + x^TBx$。
   由于 $A, B$ 正定，故 $x^TAx > 0$ 且 $x^TBx > 0$，所以 $x^T(A+B)x > 0$。
2. **$AB$ 不一定正定**：
甚至 $AB$ 可能不是对称矩阵。只有当 $AB=BA$ 时，$AB$ 才是对称的且正定。
反例：$A = \begin{pmatrix} 1 & 0.5 \\ 0.5 & 1 \end{pmatrix}, B = \begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix}$。
$AB = \begin{pmatrix} 1 & 1 \\ 0.5 & 2 \end{pmatrix}$，不对称，故不谈论其（矩阵意义上的）正定性。
</details>

### 练习 H4：双线性型的退化性

设 $B(x, y) = x^T A y$。证明：$B$ 非退化当且仅当 $\det(A) \neq 0$。

<details>
<summary>点击查看解析与答案</summary>

$B$ 非退化定义为：若 $B(x, y) = 0$ 对所有 $y$ 成立，则 $x=0$。
即 $x^T A y = 0, \forall y \Rightarrow x^T A = 0$。
这等价于齐次线性方程组 $A^T x = 0$ 只有零解。
根据克拉默法则，这等价于 $\det(A^T) \neq 0$，即 $\det(A) \neq 0$。

</details>
