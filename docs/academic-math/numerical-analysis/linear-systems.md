---
title: 线性方程组数值解法 (Linear Systems)
description: 直接法与迭代法求解大规模线性系统，包括Gauss消元、LU分解、Jacobi与Gauss-Seidel迭代
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";
import { Matrix, Iteration, Calculator, Target } from 'lucide-react';

# 线性方程组数值解法

线性方程组 $Ax = b$ 的求解是科学计算的核心问题。本章介绍**直接法**（有限步内获得精确解）和**迭代法**（逐步逼近解）两大类算法。

---

## 一、直接法

### 1.1 Gauss 消元法

**基本思想**：通过初等行变换将系数矩阵化为上三角矩阵，然后回代求解。

**算法步骤**：
1. **消元过程**：对 $k = 1, 2, \ldots, n-1$，计算
   $$m_{ik} = \frac{a_{ik}^{(k)}}{a_{kk}^{(k)}}, \quad i = k+1, \ldots, n$$
   $$a_{ij}^{(k+1)} = a_{ij}^{(k)} - m_{ik} a_{kj}^{(k)}, \quad b_i^{(k+1)} = b_i^{(k)} - m_{ik} b_k^{(k)}$$

2. **回代过程**：
   $$x_n = \frac{b_n^{(n)}}{a_{nn}^{(n)}}$$
   $$x_i = \frac{b_i^{(i)} - \sum_{j=i+1}^n a_{ij}^{(i)} x_j}{a_{ii}^{(i)}}, \quad i = n-1, \ldots, 1$$

**运算量**：约 $\frac{2}{3}n^3$ 次浮点运算。

### 1.2 列主元消元法

<KnowledgeCard type="warning" title="数值稳定性问题">
当主元 $a_{kk}^{(k)}$ 很小时，消元过程会放大舍入误差。

**解决方案**：在第 $k$ 步消元前，选取列主元
$$|a_{i_k,k}^{(k)}| = \max_{k \leq i \leq n} |a_{i,k}^{(k)}|$$
然后交换第 $k$ 行与第 $i_k$ 行。
</KnowledgeCard>

### 1.3 LU 分解

**定理**：若 $A$ 的各阶顺序主子式均非零，则 $A$ 可唯一分解为 $A = LU$，其中 $L$ 是单位下三角阵，$U$ 是上三角阵。

**计算过程**：
- Doolittle 分解：$L$ 为单位下三角阵，$U$ 为上三角阵
- Crout 分解：$L$ 为下三角阵，$U$ 为单位上三角阵

**求解步骤**：
1. $Ax = b \Rightarrow L(Ux) = b$
2. 解 $Ly = b$（前代）
3. 解 $Ux = y$（回代）

### 1.4 Cholesky 分解（针对对称正定矩阵）

若 $A$ 对称正定，则存在唯一的对角元为正的下三角阵 $L$，使得：
$$A = LL^T$$

**计算公式**：
$$l_{jj} = \sqrt{a_{jj} - \sum_{k=1}^{j-1} l_{jk}^2}$$
$$l_{ij} = \frac{a_{ij} - \sum_{k=1}^{j-1} l_{ik}l_{jk}}{l_{jj}}, \quad i > j$$

**优点**：运算量约为 LU 分解的一半，数值稳定性好。

---

## 二、迭代法

当矩阵规模很大且稀疏时，直接法运算量和存储量过大，迭代法是更好的选择。

### 2.1 迭代法的一般形式

将 $A$ 分裂为 $A = M - N$，则：
$$Ax = b \Rightarrow Mx = Nx + b \Rightarrow x = M^{-1}Nx + M^{-1}b$$

迭代格式：$x^{(k+1)} = Bx^{(k)} + f$，其中 $B = M^{-1}N$ 为迭代矩阵。

**收敛条件**：迭代矩阵的谱半径 $\rho(B) < 1$。

### 2.2 Jacobi 迭代

**分裂**：$A = D - L - U$，其中 $D$ 为对角阵，$L$ 为严格下三角阵，$U$ 为严格上三角阵。

**迭代格式**：
$$x^{(k+1)} = D^{-1}(L + U)x^{(k)} + D^{-1}b$$

**分量形式**：
$$x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j \neq i} a_{ij}x_j^{(k)}\right), \quad i = 1, \ldots, n$$

### 2.3 Gauss-Seidel 迭代

**改进**：使用最新计算出的分量值。

**迭代格式**：
$$x^{(k+1)} = (D - L)^{-1}Ux^{(k)} + (D - L)^{-1}b$$

**分量形式**：
$$x_i^{(k+1)} = \frac{1}{a_{ii}}\left(b_i - \sum_{j < i} a_{ij}x_j^{(k+1)} - \sum_{j > i} a_{ij}x_j^{(k)}\right)$$

### 2.4 SOR (逐次超松弛) 迭代

**思想**：在 Gauss-Seidel 迭代基础上引入松弛因子 $\omega$。

**迭代格式**：
$$x_i^{(k+1)} = (1-\omega)x_i^{(k)} + \frac{\omega}{a_{ii}}\left(b_i - \sum_{j < i} a_{ij}x_j^{(k+1)} - \sum_{j > i} a_{ij}x_j^{(k)}\right)$$

- $\omega = 1$：退化为 Gauss-Seidel
- $0 < \omega < 1$：低松弛（用于非正定系统）
- $1 < \omega < 2$：超松弛（加速收敛）

<KnowledgeCard type="info" title="收敛性定理">
若 $A$ 对称正定，则：
- Jacobi 迭代收敛的充要条件是 $2D - A$ 也正定
- Gauss-Seidel 迭代一定收敛
- SOR 迭代当 $0 < \omega < 2$ 时收敛
</KnowledgeCard>

---

## 三、典型例题

<details>
<summary><b>例题 1：用 LU 分解求解</b></summary>

求解：
$$\begin{pmatrix} 2 & 1 & 1 \\ 4 & 3 & 3 \\ 8 & 7 & 9 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 4 \\ 10 \\ 26 \end{pmatrix}$$

**解析**：

进行 Doolittle 分解 $A = LU$：
$$L = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 4 & 3 & 1 \end{pmatrix}, \quad U = \begin{pmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 2 \end{pmatrix}$$

解 $Ly = b$：
- $y_1 = 4$
- $y_2 = 10 - 2 \times 4 = 2$
- $y_3 = 26 - 4 \times 4 - 3 \times 2 = 4$

解 $Ux = y$：
- $x_3 = 4 / 2 = 2$
- $x_2 = (2 - 2) / 1 = 0$
- $x_1 = (4 - 0 - 2) / 2 = 1$

**答案**：$x = (1, 0, 2)^T$
</details>

<details>
<summary><b>例题 2：迭代法收敛性分析</b></summary>

设 $A = \begin{pmatrix} 4 & 1 & 0 \\ 1 & 4 & 1 \\ 0 & 1 & 4 \end{pmatrix}$，分析 Jacobi 和 Gauss-Seidel 迭代的收敛性。

**解析**：

Jacobi 迭代矩阵：
$$B_J = D^{-1}(L+U) = \begin{pmatrix} 0 & -1/4 & 0 \\ -1/4 & 0 & -1/4 \\ 0 & -1/4 & 0 \end{pmatrix}$$

计算特征值：$\det(B_J - \lambda I) = -\lambda(\lambda^2 - 1/8) = 0$

特征值为 $0, \pm 1/\sqrt{8}$，故 $\rho(B_J) = 1/\sqrt{8} \approx 0.354 < 1$，Jacobi 收敛。

Gauss-Seidel 迭代矩阵：$B_{GS} = (D-L)^{-1}U$

对于对称正定矩阵，Gauss-Seidel 一定收敛，且收敛速度通常比 Jacobi 快约一倍。
</details>

---

## 四、计算验证：C++ 实现

<details>
<summary>点击查看 C++ Jacobi 迭代实现</summary>

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>

using namespace std;
using Matrix = vector<vector<double>>;
using Vector = vector<double>;

// Jacobi 迭代求解 Ax = b
Vector jacobi(const Matrix& A, const Vector& b, int max_iter = 1000, double tol = 1e-10) {
    int n = A.size();
    Vector x(n, 0.0), x_new(n, 0.0);

    for (int iter = 0; iter < max_iter; ++iter) {
        for (int i = 0; i < n; ++i) {
            double sum = b[i];
            for (int j = 0; j < n; ++j) {
                if (i != j) sum -= A[i][j] * x[j];
            }
            x_new[i] = sum / A[i][i];
        }

        // 计算误差
        double error = 0.0;
        for (int i = 0; i < n; ++i) {
            error += abs(x_new[i] - x[i]);
            x[i] = x_new[i];
        }

        if (error < tol) {
            cout << "收敛于第 " << iter + 1 << " 次迭代" << endl;
            return x;
        }
    }

    cout << "达到最大迭代次数" << endl;
    return x;
}

int main() {
    // 测试：对称正定矩阵
    Matrix A = {
        {4, 1, 0},
        {1, 4, 1},
        {0, 1, 4}
    };
    Vector b = {5, 6, 7};

    cout << fixed << setprecision(10);
    Vector x = jacobi(A, b);

    cout << "解向量：";
    for (double xi : x) cout << xi << " ";
    cout << endl;

    // 验证残差
    cout << "\n残差 Ax - b：";
    for (int i = 0; i < 3; ++i) {
        double sum = 0;
        for (int j = 0; j < 3; ++j) sum += A[i][j] * x[j];
        cout << sum - b[i] << " ";
    }
    cout << endl;

    return 0;
}
```
</details>

---

## 五、方法选择指南

| 方法类型 | 适用场景 | 优点 | 缺点 |
|:---------|:---------|:-----|:-----|
| **Gauss 消元** | 中小规模稠密矩阵 | 通用、稳定 | $O(n^3)$ 运算量 |
| **LU 分解** | 多个右端项 | 分解一次多次求解 | 需要存储 L 和 U |
| **Cholesky** | 对称正定矩阵 | 运算量减半、稳定 | 仅适用于 SPD 矩阵 |
| **Jacobi** | 大规模稀疏矩阵 | 并行性好、简单 | 收敛可能较慢 |
| **Gauss-Seidel** | 大规模稀疏矩阵 | 收敛通常更快 | 不易并行 |
| **SOR** | 需要加速收敛 | 可调节松弛因子 | 需选择最优 $\omega$ |

---

<KnowledgeCard type="tip" title="学习要点">
1. **直接法**适用于中小规模问题，注意数值稳定性（选主元）。
2. **迭代法**适用于大规模稀疏问题，关键是保证收敛性。
3. 对称正定矩阵优先使用 Cholesky 分解或 Gauss-Seidel 迭代。
4. 实际工程中常使用预条件共轭梯度法 (PCG) 等高级算法。
</KnowledgeCard>

---

_本章节是数值代数的基础，掌握这些算法对于理解更高级的数值方法（如有限元、优化算法）至关重要。_
