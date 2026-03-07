# 字符串哈希 (String Hashing)

字符串哈希是将字符串映射为一个整数的技术，用于在 $O(1)$ 时间内判断两个子串是否相等。

## 原理
利用 **多项式哈希** 的思想。设字符串 $S$ 的长度为 $n$，选择一个基数 $P$（通常为 131 或 13331）和一个模数 $M$（通常为 $2^{64}$）。
$H(S) = (S_1 P^{n-1} + S_2 P^{n-2} + \dots + S_n P^0) \pmod M$

## 区间哈希值查询
设 $h[i]$ 为前缀 $S[1 \dots i]$ 的哈希值，则区间 $[l, r]$ 的哈希值为：
$H(S[l \dots r]) = (h[r] - h[l-1] \times P^{r-l+1}) \pmod M$

## C++ 实现 (使用 `unsigned long long` 自动溢出相当于对 $2^{64}$ 取模)
```cpp
typedef unsigned long long ULL;
const int P = 131;
ULL h[MAXN], p[MAXN];

void build(string s) {
    p[0] = 1;
    for (int i = 1; i <= s.size(); i++) {
        p[i] = p[i - 1] * P;
        h[i] = h[i - 1] * P + s[i - 1];
    }
}

ULL get(int l, int r) {
    return h[r] - h[l - 1] * p[r - l + 1];
}
```

## 注意事项
1. **碰撞概率**：单哈希在大规模数据下可能碰撞，推荐使用**双哈希**（使用两个不同的 $P$ 和 $M$）。
2. **基数选择**：$P$ 应大于字符集的大小，通常取大于 128 的质数。
