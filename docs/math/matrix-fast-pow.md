# 矩阵加速 (Matrix Fast Pow)

矩阵乘法结合快速幂（Matrix Exponentiation）是处理线性递推关系（如斐波那契数列）的强有力工具。

## 矩阵乘法

设 $A$ 是 $n \times m$ 的矩阵，$B$ 是 $m \times p$ 的矩阵，则 $C = A \times B$ 是 $n \times p$ 的矩阵。
$C_{i,j} = \sum_{k=1}^m A_{i,k} \times B_{k,j} \pmod M$。

```cpp
struct Matrix {
    long long mat[MAXN][MAXN];
    Matrix() { memset(mat, 0, sizeof(mat)); }
    Matrix operator*(const Matrix& b) const {
        Matrix res;
        for (int i = 0; i < n; i++)
            for (int k = 0; k < n; k++) // 优化循环顺序：i, k, j
                for (int j = 0; j < n; j++)
                    res.mat[i][j] = (res.mat[i][j] + mat[i][k] * b.mat[k][j]) % MOD;
        return res;
    }
};
```

## 矩阵快速幂

```cpp
Matrix qpow(Matrix a, long long b) {
    Matrix res;
    for (int i = 0; i < n; i++) res.mat[i][i] = 1; // 单位矩阵
    while (b) {
        if (b & 1) res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}
```

## 应用场景：加速递推

### 斐波那契数列
$F_n = F_{n-1} + F_{n-2}$，可转化为：
$\begin{bmatrix} F_n \\ F_{n-1} \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix} \times \begin{bmatrix} F_{n-1} \\ F_{n-2} \end{bmatrix}$

求 $F_n$ 只需计算转移矩阵的 $n-1$ 次幂。
复杂度由 $O(n)$ 降至 $O(k^3 \log n)$（其中 $k$ 为矩阵维度）。
