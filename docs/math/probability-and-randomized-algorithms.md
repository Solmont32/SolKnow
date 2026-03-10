---
title: 概率、随机化算法与矩阵优化 (Probability, Randomized Algorithms & Matrix Optimization)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Target, Zap, Binary, Infinity, Cpu, Code2, Hash, Layers, MoveRight, Search } from 'lucide-react';

# 概率、随机化算法与矩阵优化 (Probability, Randomized Algorithms & Matrix Optimization)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇章构建了从 **离散概率基础** 到 **复杂状态空间随机化搜索** 的完备教材体系。我们将通过 **期望线性性** 简化组合计数，利用 **矩阵快速幂** 突破线性递推的规模瓶颈，并引入 **模拟退火** 与 **Pollard's Rho** 处理确定性算法难以逾越的非多项式复杂度问题。
</motion.div>

---

## 第一部分：离散概率建模与期望线性性 (Foundations)

### 1. 离散概率空间
在计算机科学中，我们主要关注离散概率空间 $(\Omega, P)$，其中 $\Omega$ 是可数样本空间，$P: \Omega \to [0, 1]$ 满足 $\sum_{\omega \in \Omega} P(\omega) = 1$。

**随机变量 (Random Variable)**: 定义在样本空间上的实值函数 $X: \Omega \to \mathbb{R}$。
**数学期望 (Expectation)**: 
$$E[X] = \sum_{\omega \in \Omega} X(\omega) P(\omega) = \sum_{x \in X(\Omega)} x \cdot P(X = x)$$

### 2. 期望的线性性质 (Linearity of Expectation)
**核心定理**：对于任意随机变量 $X, Y$（**无论是否独立**），均有：
$$E[aX + bY] = aE[X] + bE[Y]$$
**证明概要**：
$$E[X+Y] = \sum_{\omega \in \Omega} (X(\omega)+Y(\omega))P(\omega) = \sum X(\omega)P(\omega) + \sum Y(\omega)P(\omega) = E[X] + E[Y]$$
这是概率论在组合数学中最强大的工具之一，因为它允许我们将复杂变量拆解为简单的 **指示变量 (Indicator Variables)**。

---

## 第二部分：期望 DP 与线性系统 (Expectation DP)

### 1. 状态转移方程
定义 $f[u]$ 为从状态 $u$ 转移到目标状态 $T$ 的期望代价。
$$f[u] = \sum_{v \in Adj(u)} P(u \to v) \cdot (f[v] + w(u \to v))$$
若状态空间构成 **DAG (有向无环图)**，可直接通过拓扑序或递归+记忆化求解。

### 2. 有环系统的解法：高斯消元
若状态转移存在环，上述方程组变为一个 $n$ 元线性方程组 $A \mathbf{x} = \mathbf{b}$。

<details>
<summary>C++ 高斯消元模板 (求解期望方程组)</summary>

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

const double EPS = 1e-9;

// 求解 n 元线性方程组，a 为增广矩阵 (n * (n+1))
bool gaussian_elimination(vector<vector<double>>& a, vector<double>& res) {
    int n = a.size();
    for (int i = 0; i < n; i++) {
        int pivot = i;
        for (int j = i + 1; j < n; j++)
            if (abs(a[j][i]) > abs(a[pivot][i])) pivot = j;
        swap(a[i], a[pivot]);
        if (abs(a[i][i]) < EPS) return false; // 无唯一解
        for (int j = i + 1; j < n; j++) {
            double factor = a[j][i] / a[i][i];
            for (int k = i; k <= n; k++) a[j][k] -= factor * a[i][k];
        }
    }
    res.assign(n, 0);
    for (int i = n - 1; i >= 0; i--) {
        double sum = a[i][n];
        for (int j = i + 1; j < n; j++) sum -= a[i][j] * res[j];
        res[i] = sum / a[i][i];
    }
    return true;
}
```
</details>

---

## 第三部分：矩阵优化与大规模线性递推 (Matrix Optimization)

### 1. 矩阵乘法加速递推
对于齐次线性递推关系 $f_n = \sum_{i=1}^k a_i f_{n-i}$，其状态转移可表示为：
$$\begin{bmatrix} f_n \\ f_{n-1} \\ \vdots \\ f_{n-k+1} \end{bmatrix} = \begin{bmatrix} a_1 & a_2 & \dots & a_k \\ 1 & 0 & \dots & 0 \\ \vdots & \ddots & \dots & \vdots \\ 0 & \dots & 1 & 0 \end{bmatrix} \times \begin{bmatrix} f_{n-1} \\ f_{n-2} \\ \vdots \\ f_{n-k} \end{bmatrix}$$
利用 **矩阵快速幂**，可在 $O(k^3 \log n)$ 复杂度内计算第 $n$ 项。

### 2. 期望 DP 的矩阵加速
**场景**：当状态转移具有统一的层级结构（如每一步状态只与前一步相关，且步数 $N$ 极大）。
**例题**：给定一个 $k$ 个节点的图，每一步随机走到相邻节点，求走 $10^{18}$ 步后停留在各点的概率。
**模型**：转移矩阵 $M_{ij} = P(j \to i)$，初始向量 $\mathbf{v}_0$，则 $\mathbf{v}_t = M^t \mathbf{v}_0$。

<details>
<summary>C++ 矩阵优化模板</summary>

```cpp
struct Matrix {
    int sz;
    vector<vector<long long>> mat;
    static const long long MOD = 1e9 + 7;

    Matrix(int n) : sz(n), mat(n, vector<long long>(n, 0)) {}
    
    static Matrix identity(int n) {
        Matrix res(n);
        for (int i = 0; i < n; i++) res.mat[i][i] = 1;
        return res;
    }

    Matrix operator*(const Matrix& other) const {
        Matrix res(sz);
        for (int i = 0; i < sz; i++)
            for (int k = 0; k < sz; k++)
                if (mat[i][k]) // 稀疏性优化
                    for (int j = 0; j < sz; j++)
                        res.mat[i][j] = (res.mat[i][j] + mat[i][k] * other.mat[k][j]) % MOD;
        return res;
    }
};

Matrix qpow(Matrix a, long long b) {
    Matrix res = Matrix::identity(a.sz);
    while (b) {
        if (b & 1) res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}
```
</details>

---

## 第四部分：随机化算法 I - 工业级素性测试与分解

### 1. Miller-Rabin 素性测试
基于 **费马小定理** 与 **二次探测定理** 的概率算法。
- **复杂度**: $O(k \log^3 n)$，其中 $k$ 为底数个数。
- **应用**: RSA 加密算法中大质数的生成。

### 2. Pollard's Rho 整数分解
利用 **生日悖论** 与 **Floyd/Brent 判环算法** 寻找大合数的因子。
- **期望复杂度**: $O(n^{1/4})$。

---

## 第五部分：随机化搜索与近似求解 (Randomized Search)

### 1. 模拟退火 (Simulated Annealing, SA)
模拟金属冷却过程，通过以一定概率接受“较差解”来跳出局部最优。

**状态转移准则 (Metropolis 准则)**:
对于当前解 $E_{old}$ 与新解 $E_{new}$，若 $E_{new} < E_{old}$ 则 100% 接受；否则以概率 $P = \exp\left(-\frac{E_{new}-E_{old}}{T}\right)$ 接受，其中 $T$ 为当前温度。

<details>
<summary>C++ 模拟退火模板 (解决 TSP 问题)</summary>

```cpp
#include <cmath>
#include <ctime>
#include <cstdlib>

double current_ans, best_ans;
double T_start = 2000, T_end = 1e-10, factor = 0.995;

void simulate_annealing() {
    double T = T_start;
    while (T > T_end) {
        double next_ans = get_new_ans(); // 扰动产生新解
        double delta = next_ans - current_ans;
        if (delta < 0) { // 假设求最小值
            current_ans = next_ans;
            best_ans = min(best_ans, current_ans);
        } else if (exp(-delta / T) > (double)rand() / RAND_MAX) {
            current_ans = next_ans;
        }
        T *= factor;
    }
}
```
</details>

---

## 综合练习与解答

### 练习 1：[USACO 1.3] 巧克力棒 (期望线性性)
将一个 $n \times m$ 的矩形切成 $1 \times 1$ 的小块，每次切一刀（整行或整列），求期望切多少次。
<details>
<summary>Check Solution</summary>
**解析**：这是一个陷阱题。无论怎么切，最终会产生 $nm$ 个小块。每一刀都会使块数增加 1，初始为 1 块。因此，无论决策如何，固定需要 $nm-1$ 次。
期望值 $E = nm-1$。
</details>

### 练习 2：几何分布的期望
设射中概率为 $p$，求直到射中为止的期望次数。
<details>
<summary>Check Solution</summary>
**证明**：设期望为 $E$。
第一步有两种可能：
1. 射中（概率 $p$），步数为 1。
2. 未射中（概率 $1-p$），步数为 $1 + E$。
由全期望公式：$E = p \cdot 1 + (1-p)(1 + E)$
$E = p + 1 - p + (1-p)E \implies pE = 1 \implies E = 1/p$。
</details>

### 练习 3：[Luogu P3389] 矩阵快速幂应用
给定 $n, k$，求斐波那契数列第 $n$ 项对 $10^9+7$ 取模。要求复杂度 $O(\log n)$。
<details>
<summary>Check Solution</summary>

```cpp
// 核心转移矩阵
Matrix T(2);
T.mat = {{1, 1}, {1, 0}};
// [Fn, Fn-1]^T = T^(n-1) * [F1, F0]^T
Matrix res = qpow(T, n - 1);
long long ans = (res.mat[0][0] * 1 + res.mat[0][1] * 0) % MOD;
```
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800"
>
<Infinity className="text-purple-500 mb-2" />
**大师寄语**：从期望的线性性到模拟退火的指数下降，我们看到的不仅是算法，更是数学在不确定性中建立秩序的艺术。当你面对 NP-Hard 的深渊时，请记住：随机化是上帝掷出的骰子，而你是决定何时停止掷点的人。
</motion.div>
