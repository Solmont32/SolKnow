# 组合数学 (Combinatorics)

在竞赛中，组合数学常涉及排列组合的计算、取模运算以及相关的定理。

## 逆元 (Modular Inverse)

当 $p$ 为质数且 $a \perp p$ 时，根据费马小定理：$a^{p-2} \equiv a^{-1} \pmod p$。

### 1. 快速幂求逆元

```cpp
long long qpow(long long a, long long b, long long p) {
    long long res = 1;
    a %= p;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}
long long inv(long long a, long long p) { return qpow(a, p - 2, p); }
```

### 2. 线性预处理 1..n 的逆元

用于在 $O(n)$ 时间内处理大量数字的逆元。
$inv[i] = (p - p/i) \times inv[p\%i] \pmod p$。

## 组合数 $C_n^k \pmod p$

### 1. 递推法 ($O(n^2)$)

使用帕斯卡三角形：$C_n^k = C_{n-1}^k + C_{n-1}^{k-1}$。适合 $n \leq 1000$。

### 2. 阶乘法 ($O(n)$ 预处理)

$C_n^k = \frac{n!}{k!(n-k)!} \pmod p$。

```cpp
long long C(int n, int k, int p) {
    if (k < 0 || k > n) return 0;
    return fact[n] * inv_fact[k] % p * inv_fact[n - k] % p;
}
```

## 卢卡斯定理 (Lucas Theorem)

用于计算较大的 $n, k$ 在较小的质数 $p$ 下的组合数取模：
$C_n^k \equiv C_{n/p}^{k/p} \times C_{n\%p}^{k\%p} \pmod p$。

```cpp
long long lucas(long long n, long long k, int p) {
    if (k == 0) return 1;
    return C(n % p, k % p, p) * lucas(n / p, k / p, p) % p;
}
```
