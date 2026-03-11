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

> 本篇文档深入探讨矩阵快速幂在加速线性递推、处理非齐次关系以及图论最短路中的核心应用。矩阵不仅是数据的容器，更是线性空间的算子变换。
> </motion.div>

---

## 1. 线性递推的代数优化

### 1.1 矩阵快速幂基础

对于齐次线性递推 $f_n = \sum_{i=1}^k a_i f_{n-i}$，其状态转移矩阵为 $k \times k$。
复杂度：$O(k^3 \log n)$。

### 1.2 Cayley-Hamilton 定理与特征多项式

**定理**：对于 $k \times k$ 矩阵 $M$，其特征多项式 $P(\lambda) = \det(\lambda I - M)$ 满足 $P(M) = 0$。
**优化意义**：
$M^n \pmod{P(M)}$ 可以将 $M^n$ 转化为 $M^0, M^1, \dots, M^{k-1}$ 的线性组合。
计算 $x^n \pmod{P(x)}$ 仅需 $O(k \log k \log n)$（利用多项式取模）。

### 1.3 Berlekamp-Massey 算法

当递推式未知时，BM 算法可以从序列的前 $2k$ 项中求出最短线性递推式。

---

## 2. 工业级矩阵模板 (C++)

<details>
<summary>Matrix 优化模板 (包含稀疏性处理)</summary>

```cpp
struct Matrix {
    int n;
    long long m[105][105];
    Matrix(int _n = 0) : n(_n) { memset(m, 0, sizeof(m)); }
    Matrix operator*(const Matrix& b) const {
        Matrix res(n);
        for (int i = 0; i < n; i++)
            for (int k = 0; k < n; k++) {
                if (!m[i][k]) continue;
                for (int j = 0; j < n; j++)
                    res.m[i][j] = (res.m[i][j] + m[i][k] * b.m[k][j]) % MOD;
            }
        return res;
    }
};
```

</details>

---

## 3. 进阶应用：广义矩阵乘法

### 3.1 Min-Plus 卷积

$(A \otimes B)_{ij} = \min_{k} (A_{ik} + B_{kj})$。
用于求解**恰好经过 $L$ 条边的最短路**。

### 3.2 动态 DP (DDP)

将树上 DP 转化为矩阵链乘，利用线段树维护矩阵，支持 $O(\log n)$ 单点修改状态。

---

## 4. 综合练习与解答

### 练习 1：[USACO07RELAY] Cow Relays

给定无向图，求从 $S$ 到 $E$ 恰好经过 $K$ 条边的最短路。
**解析**：离散化点后，使用 Min-Plus 卷积进行矩阵快速幂。

<details>
<summary>Check Solution (C++)</summary>

```cpp
Matrix operator*(const Matrix& a, const Matrix& b) {
    Matrix c; memset(c.m, 0x3f, sizeof(c.m));
    for (int k = 1; k <= cnt; k++)
        for (int i = 1; i <= cnt; i++)
            for (int j = 1; j <= cnt; j++)
                c.m[i][j] = min(c.m[i][j], a.m[i][k] + b.m[k][j]);
    return c;
}
```

</details>

### 练习 2：[NOI2020] 美食家

图中有边权，每个城市有美食值，某些时间点有嘉年华。求 $T$ 时刻最大美食值。
**解析**：边权 $w \in [1, 5]$，将每个点拆成 5 个点，转化为 $5N$ 阶矩阵。嘉年华时刻分段处理。

<details>
<summary>Check Solution (思路)</summary>

1. 拆点：$u \to u_1 \to u_2 \to u_3 \to u_4$（边权均为 0），原边 $(u, v, w)$ 变为 $u_{w-1} \to v$（边权为 $c_v$）。
2. 构建 $(5N) \times (5N)$ 转移矩阵。
3. 预处理矩阵的 $2^k$ 次幂。
4. 按嘉年华时间排序，分段进行向量与矩阵的乘法（$O((5N)^2 \log T)$）。
</details>

### 练习 3：[Luogu P4719] 动态 DP 模板

给定树，点带权，支持单点修改，求最大独立集。
**解析**：树链剖分 + 矩阵维护。

<details>
<summary>Check Solution (矩阵定义)</summary>

对于节点 $u$ 的 $g_{u,0}, g_{u,1}$（轻儿子贡献），定义：
$$ \begin{bmatrix} f*{u,0} \\ f*{u,1} \end{bmatrix} = \begin{bmatrix} g*{u,0} & g*{u,0} \\ g*{u,1} & -\infty \end{bmatrix} \otimes \begin{bmatrix} f*{v,0} \\ f\_{v,1} \end{bmatrix} $$
利用线段树维护重链上的矩阵乘积。

</details>

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800"

> <Zap className="text-amber-500 mb-2" />
> **大师寄语**：矩阵是高维空间的华尔兹。当你把递推式写成矩阵的那一刻，时间复杂度已经完成了从线性到对数的跨越。
> </motion.div>
