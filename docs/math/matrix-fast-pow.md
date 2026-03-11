---
title: 矩阵加速：从线性递推到图论优化
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Zap, Cpu, Layers, Binary, Infinity, Code2, Hash, MoveRight } from 'lucide-react';

# 矩阵加速 (Matrix Acceleration)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇文档深入探讨矩阵快速幂在加速线性递推、处理非齐次关系以及图论最短路中的核心应用。矩阵不仅是数据的容器，更是线性空间的算子变换。
</motion.div>

---

## 1. 线性递推的矩阵化

### 1.1 齐次线性递推
对于 $f_n = a f_{n-1} + b f_{n-2}$，其转移矩阵构造为：
$$\begin{bmatrix} f_n \\ f_{n-1} \end{bmatrix} = \begin{bmatrix} a & b \\ 1 & 0 \end{bmatrix} \begin{bmatrix} f_{n-1} \\ f_{n-2} \end{bmatrix}$$
计算 $f_n$ 对应矩阵的 $n-1$ 次幂。

### 1.2 非齐次线性递推
对于 $f_n = a f_{n-1} + b f_{n-2} + c$，引入常数项 1 进入状态向量：
$$\begin{bmatrix} f_n \\ f_{n-1} \\ 1 \end{bmatrix} = \begin{bmatrix} a & b & c \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} f_{n-1} \\ f_{n-2} \\ 1 \end{bmatrix}$$

---

## 2. 工业级矩阵模板 (C++)

<details>
<summary>Matrix 优化模板 (包含稀疏性处理)</summary>

```cpp
struct Matrix {
    int n;
    long long m[105][105];
    Matrix(int _n = 0) : n(_n) { memset(m, 0, sizeof(m)); }
    
    static Matrix identity(int n) {
        Matrix res(n);
        for (int i = 0; i < n; i++) res.m[i][i] = 1;
        return res;
    }

    Matrix operator*(const Matrix& b) const {
        Matrix res(n);
        for (int i = 0; i < n; i++)
            for (int k = 0; k < n; k++) {
                if (!m[i][k]) continue; // 稀疏矩阵优化
                for (int j = 0; j < n; j++)
                    res.m[i][j] = (res.m[i][j] + m[i][k] * b.m[k][j]) % MOD;
            }
        return res;
    }
};
```
</details>

---

## 3. 进阶应用：Min-Plus 卷积

在图论中，设 $W$ 为邻接矩阵，$W_{ij}$ 表示 $i \to j$ 的边权。
定义 **广义矩阵乘法**：$(A \otimes B)_{ij} = \min_{k} (A_{ik} + B_{kj})$。
则 $W^k$ 的 $(i, j)$ 项表示从 $i$ 到 $j$ 经过恰好 $k$ 条边的最短路径。
这在求解 **恰好经过 $k$ 条边的最短路** 问题中具有 $O(N^3 \log k)$ 的极佳性能。

---

## 4. 综合练习与解答

### 例题 1：[TJOI2017] 可乐
一个有向图，每秒可以停在原地、走到相邻城市或自爆（进入一个虚点）。求 $t$ 秒的方案数。
**解析**：构建 $N+1$ 阶转移矩阵（$N$ 个点 + 1 个自爆点）。

<details>
<summary>Check Solution (转移矩阵构造)</summary>

```cpp
// 矩阵构造
for (int i = 1; i <= n; i++) {
    mat.m[i][i] = 1; // 停在原地
    mat.m[i][0] = 1; // 自爆（0 为虚点）
    for (int v : adj[i]) mat.m[i][v] = 1; // 走到相邻城市
}
mat.m[0][0] = 1; // 自爆点状态保持
```
</details>

### 例题 2：斐波那契数列前缀和
求 $S_n = \sum_{i=1}^n F_i$。
**解析**：利用 $S_n = S_{n-1} + F_n = S_{n-1} + F_{n-1} + F_{n-2}$。
状态向量：$[F_n, F_{n-1}, S_n]^T$。

<details>
<summary>Check Solution (转移矩阵)</summary>

$$\begin{bmatrix} 1 & 1 & 0 \\ 1 & 0 & 0 \\ 1 & 1 & 1 \end{bmatrix}$$
第一行更新 $F_n$，第二行更新 $F_{n-1}$，第三行利用新算出的 $F_n$ 更新 $S_n$。
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800"
>
<Zap className="text-amber-500 mb-2" />
**大师寄语**：矩阵是高维空间的华尔兹。当你把递推式写成矩阵的那一刻，时间复杂度已经完成了从线性到对数的跨越。
</motion.div>
