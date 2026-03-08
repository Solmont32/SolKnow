# 数论基础 (Number Theory)

## 最大公约数 (GCD)

使用欧几里得算法（辗转相除法）计算两个数的最大公约数。
$\gcd(a, b) = \gcd(b, a \pmod b)$。

```cpp
long long gcd(long long a, long long b) {
    return b ? gcd(b, a % b) : a;
}
```

## 扩展欧几里得算法 (EXGCD)

用于求解形如 $ax + by = \gcd(a, b)$ 的线性同余方程的一组整数解。

```cpp
long long exgcd(long long a, long long b, long long &x, long long &y) {
    if (!b) { x = 1, y = 0; return a; }
    long long d = exgcd(b, a % b, y, x);
    y -= (a / b) * x;
    return d;
}
```

## 素数筛法

### 1. 埃氏筛 (Eratosthenes)

时间复杂度 $O(n \log \log n)$。

### 2. 线性筛 (Euler)

时间复杂度 $O(n)$，且每个合数仅被其最小质因子筛去。

```cpp
const int MAXN = 1000005;
int primes[MAXN], cnt;
bool is_prime[MAXN];

void get_primes(int n) {
    fill(is_prime, is_prime + n + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i <= n; i++) {
        if (is_prime[i]) primes[cnt++] = i;
        for (int j = 0; primes[j] <= n / i; j++) {
            is_prime[i * primes[j]] = false;
            if (i % primes[j] == 0) break; // 核心：保证线性
        }
    }
}
```

## 欧拉函数 ($\phi$)

$\phi(n)$ 表示 1 到 $n$ 中与 $n$ 互质的数的个数。
线性筛可以同时预处理欧拉函数。
