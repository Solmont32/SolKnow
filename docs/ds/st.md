# Sparse Table (ST表)

Sparse Table（ST表）是一种用于解决静态区间最值查询（RMQ）的数据结构。

## 原理

利用**倍增**的思想：任何一个区间长度 $L$ 都可以表示为 $2^k + \text{剩余部分}$。
设 $f[i][j]$ 表示以 $i$ 为起点，长度为 $2^j$ 的区间内的最值。

- **预处理**：$O(n \log n)$。

$$f[i][j] = \max(f[i][j-1], f[i + 2^{j-1}][j-1])$$

- **查询**：$O(1)$。
  对于区间 $[L, R]$，其长度为 $len = R - L + 1$，令 $k = \lfloor \log_2(len) \rfloor$。
  由于 $\max$ 操作满足可重叠性（幂等性），结果即为 $\max(f[L][k], f[R - 2^k + 1][k])$。

## 复杂度分析

- **时间复杂度**：预处理 $O(n \log n)$，查询 $O(1)$。
- **空间复杂度**：$O(n \log n)$。

## C++ 核心实现

```cpp
const int MAXN = 100005, LOGN = 20;
int f[MAXN][LOGN], lg2[MAXN];

// 预处理 log2 表 (可选，加速查询)
void precompute_log(int n) {
    lg2[1] = 0;
    for (int i = 2; i <= n; i++) lg2[i] = lg2[i / 2] + 1;
}

// 预处理 ST 表
void build(int n, int a[]) {
    for (int i = 1; i <= n; i++) f[i][0] = a[i];
    for (int j = 1; j < LOGN; j++) {
        for (int i = 1; i + (1 << j) - 1 <= n; i++) {
            f[i][j] = max(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);
        }
    }
}

// 查询 [L, R]
int query(int L, int R) {
    int k = lg2[R - L + 1];
    return max(f[L][k], f[R - (1 << k) + 1][k]);
}
```

## 优缺点

- **优点**：查询速度极快（$O(1)$），代码简单且常数小。
- **缺点**：不支持动态修改（只适用于静态数据）；空间消耗较大。
