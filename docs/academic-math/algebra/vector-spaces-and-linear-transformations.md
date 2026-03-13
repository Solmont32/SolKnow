---
title: 向量空间与线性变换 (Vector Spaces and Linear Transformations)
---

# 向量空间与线性变换

本章按“空间结构-映射结构-矩阵表达”展开，目标是打通抽象定义与计算方法。

## 1. 向量空间、子空间与生成

设域为 $\mathbb{F}$。集合 $V$ 若对向量加法和数乘封闭，且满足八条线性公理，则称为 $\mathbb{F}$ 上的向量空间。

- 子空间判定：非空，且对线性组合封闭。
- 线性包：$\operatorname{span}(S)$ 是包含 $S$ 的最小子空间。
- 线性相关与无关：可否写出非平凡线性关系。

### 例题 1：子空间判定

在 $P_2(\mathbb{R})$ 中考虑

$$

W=\{ax^2+bx+c \mid a+b+c=0\}.


$$

判断 $W$ 是否为子空间，并求一组基。

解：零多项式满足条件，故非空。若 $p,q\in W$，则它们系数和均为 0，故任意线性组合 $\alpha p+\beta q$ 的系数和仍为 0，线性封闭成立，所以 $W$ 是子空间。  
令 $c=-a-b$，则

$$

ax^2+bx-a-b=a(x^2-1)+b(x-1),


$$

故一组基可取 $\{x^2-1,\ x-1\}$，维数为 2。

## 2. 基、维数与维数公式

- 基：既线性无关又能张成空间的向量组。
- 维数：任一基中向量个数，记为 $\dim V$。
- 有限维情形下，任意线性无关组长度不超过维数。
- 维数公式：

$$

\dim U+\dim W=\dim(U+W)+\dim(U\cap W).


$$

### 例题 2：维数公式应用

在 $\mathbb{R}^4$ 中，

$$

U=\operatorname{span}\{(1,0,1,0),(0,1,1,0)\},\quad
W=\operatorname{span}\{(1,1,2,0),(0,0,0,1)\}.


$$

求 $\dim(U+W)$ 与 $\dim(U\cap W)$。

解：先看 $U$，两向量线性无关，$\dim U=2$；$W$ 亦为 2 维。  
注意 $(1,1,2,0)=(1,0,1,0)+(0,1,1,0)\in U$，故 $U\cap W$ 至少含该方向；而 $(0,0,0,1)\notin U$。所以

$$

U\cap W=\operatorname{span}\{(1,1,2,0)\},


$$

即 $\dim(U\cap W)=1$。  
由维数公式得

$$

\dim(U+W)=2+2-1=3.


$$

## 3. 线性变换、核与像

线性映射 $T:V\to W$ 满足

$$

T(\alpha u+\beta v)=\alpha T(u)+\beta T(v).


$$

- 核：$\ker T=\{v\in V\mid T(v)=0\}$。
- 像：$\operatorname{Im}T=\{T(v)\mid v\in V\}$。
- 秩-零空间维数定理：

$$

\dim V=\dim(\ker T)+\dim(\operatorname{Im}T).


$$

### 例题 3：核、像与秩

定义 $T:\mathbb{R}^3\to\mathbb{R}^2$：

$$

T(x,y,z)=(x+y,\ y+z).


$$

求 $\ker T$、$\operatorname{Im}T$ 及其维数。

解：解方程组

$$

x+y=0,\quad y+z=0


$$

得 $(x,y,z)=(-t,t,-t)=t(-1,1,-1)$。  
故

$$

\ker T=\operatorname{span}\{(-1,1,-1)\},\quad \dim\ker T=1.


$$

取标准基像：

$$

T(e_1)=(1,0),\ T(e_2)=(1,1),\ T(e_3)=(0,1),


$$

它们张成 $\mathbb{R}^2$，故 $\operatorname{Im}T=\mathbb{R}^2$，$\dim\operatorname{Im}T=2$。  
验证：$3=1+2$。

## 4. 基变换与矩阵表示

在线性空间给定有序基后，线性映射可表示为矩阵。  
若 $[T]_{\mathcal{B}}$ 是基 $\mathcal{B}$ 下矩阵，换基到 $\mathcal{B}'$ 后：

$$

[T]_{\mathcal{B}'}=P^{-1}[T]_{\mathcal{B}}P,


$$

其中 $P$ 是基变换矩阵。

### 例题 4：多项式空间中的矩阵表示

在 $P_2(\mathbb{R})$ 上定义 $T(p)=p'$。取基

$$

\mathcal{B}=\{1,x,x^2\}.


$$

求 $[T]_{\mathcal{B}}$。

解：

$$

T(1)=0,\quad T(x)=1,\quad T(x^2)=2x.


$$

对应坐标列向量：

$$

[T(1)]_{\mathcal B}=\begin{pmatrix}0\\0\\0\end{pmatrix},\
[T(x)]_{\mathcal B}=\begin{pmatrix}1\\0\\0\end{pmatrix},\
[T(x^2)]_{\mathcal B}=\begin{pmatrix}0\\2\\0\end{pmatrix}.


$$

故

$$

[T]_{\mathcal{B}}=
\begin{pmatrix}
0&1&0\\
0&0&2\\
0&0&0
\end{pmatrix}.


$$

## 6. 线性变换的代数结构与同态分析 (Homomorphism Analysis)

线性变换不仅仅是从 $V$ 到 $W$ 的映射，其全体构成了一个丰富的代数结构。

### (1) 线性映射空间 $\mathcal{L}(V, W)$
设 $V, W$ 是 $\mathbb{F}$ 上的向量空间。全体从 $V$ 到 $W$ 的线性映射构成的集合 $\mathcal{L}(V, W)$ 在映射加法和数乘下仍构成一个向量空间。
- **维数定理**：若 $\dim V = n, \dim W = m$，则 $\dim \mathcal{L}(V, W) = mn$。
- **同构性**：$\mathcal{L}(V, W) \cong M_{m \times n}(\mathbb{F})$。一旦选定基，每个线性变换唯一对应一个矩阵。

### (2) 线性变换代数 $\operatorname{End}(V)$
当 $V = W$ 时，$\mathcal{L}(V, V)$ 记作 $\operatorname{End}(V)$（自同态环）。除了向量空间结构，它还对**映射复合**（乘法）封闭，构成一个**结合代数**。
- **乘法性质**：$T(S+R) = TS + TR$，$(TS)R = T(SR)$。
- **不可交换性**：一般情况下 $TS \neq ST$。

### (3) 同态基本定理
线性变换是向量空间的**同态**。
- $T(av+bw) = aT(v) + bT(w)$。
- 每一个线性变换都诱导了一个同构：$V / \ker T \cong \operatorname{Im} T$。

---

## 7. 计算验证：线性变换复合模拟 <Code2 className="inline-block ml-1" />

在程序中，线性变换的复合对应于矩阵乘法。

<details>
<summary>点击查看 C++ 验证代码</summary>

```cpp
#include <iostream>
#include <vector>

using Matrix = std::vector<std::vector<double>>;

/**
 * @brief 模拟线性变换复合 (矩阵乘法)
 */
Matrix multiply(const Matrix& A, const Matrix& B) {
    int m = A.size(), n = A[0].size(), p = B[0].size();
    Matrix C(m, std::vector<double>(p, 0));
    for (int i = 0; i < m; ++i)
        for (int j = 0; j < p; ++j)
            for (int k = 0; k < n; ++k)
                C[i][j] += A[i][k] * B[k][j];
    return C;
}

void printMatrix(const Matrix& M, const std::string& name) {
    std::cout << name << ":\n";
    for (const auto& row : M) {
        for (double val : row) std::cout << val << " ";
        std::cout << "\n";
    }
}

int main() {
    // T1: 旋转 90 度 (R^2 -> R^2)
    Matrix T1 = {{0, -1}, {1, 0}};
    // T2: 缩放 (2, 3)
    Matrix T2 = {{2, 0}, {0, 3}};

    // 复合 T = T2 * T1 (先旋转后缩放)
    Matrix T = multiply(T2, T1);

    printMatrix(T1, "Rotation T1");
    printMatrix(T2, "Scaling T2");
    printMatrix(T, "Composed T = T2 * T1");

    return 0;
}
```

</details>

---

## 8. 配套练习（折叠答案）

### 练习 1

在 $\mathbb{R}^3$ 中判断

$$

S=\{(x,y,z)\mid x-2y+z=0\}


$$

是否为子空间，并给出一组基。

<details>

<summary>点击查看过程与答案</summary>

$S$ 由齐次线性方程刻画，必为子空间。由 $x=2y-z$ 得

$$

(x,y,z)=y(2,1,0)+z(-1,0,1),


$$

故一组基可取 $\{(2,1,0),(-1,0,1)\}$，维数为 2。

</details>

### 练习 2

设线性映射 $T:\mathbb{R}^2\to\mathbb{R}^2$，

$$

T(x,y)=(x+2y,3x+6y).


$$

求 $\ker T$ 与 $\operatorname{rank}(T)$。

<details>

<summary>点击查看过程与答案</summary>

核由

$$

x+2y=0,\quad 3x+6y=0


$$

给出，两式等价，故

$$

\ker T=\{(-2t,t)\mid t\in\mathbb{R}\}=\operatorname{span}\{(-2,1)\}.


$$

所以零空间维数为 1，域维数为 2，故 $\operatorname{rank}(T)=1$。

</details>

### 练习 3

在线性空间 $P_1(\mathbb{R})$ 中，基 $\mathcal{B}=\{1,x\}$。定义 $T(p)=p+xp'$。求矩阵 $[T]_{\mathcal{B}}$。

<details>

<summary>点击查看过程与答案</summary>

$$

T(1)=1,\quad T(x)=x+x\cdot1=2x.


$$

相对基 $\{1,x\}$ 的列向量分别为 $(1,0)^T,(0,2)^T$。因此

$$

[T]_{\mathcal{B}}=\begin{pmatrix}1&0\\0&2\end{pmatrix}.


$$

</details>

### 练习 4

设 $V=\mathbb{R}^3$，$U=\operatorname{span}\{(1,1,0),(0,1,1)\}$，$W=\operatorname{span}\{(1,0,-1),(1,1,0)\}$。求 $\dim(U+W)$。

<details>

<summary>点击查看过程与答案</summary>

$U,W$ 各为 2 维。  
$U\cap W$ 至少含 $(1,1,0)$。设

$$

a(1,1,0)+b(0,1,1)=c(1,0,-1)+d(1,1,0),


$$

比对坐标可得 $b=0$，故交空间仅一维。于是

$$

\dim(U+W)=2+2-1=3.


$$

</details>

前往练习库：[/docs/exercises/math/algebra](/docs/exercises/math/algebra)
