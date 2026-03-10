---
title: 数论与代数专项强化练习
sidebar_label: 数论与同余系
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Layers, Sigma, Hash } from 'lucide-react';

# 数论与同余系专项强化练习

> **“数论是数学的桂冠，也是算法竞赛中优雅与力量的结合。”** —— 本专题对标《数论导引》与《算术基本定理》深度，通过阶梯式训练实现从“基础除法”到“积性函数求和”的跨越。

---

## 🪜 练习阶梯与评价标准

| 等级 | 难度目标 | 核心考察点 | 期望达成 |
| :--- | :--- | :--- | :--- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 模板即时复现 | GCD/EXGCD、线性筛、快速幂 | 10分钟内 AC 且逻辑严密 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 灵活建模应用 | 欧拉函数、中国剩余定理 (CRT)、逆元应用 | 能够推导同余方程组的通解 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span> | 算法融合创新 | 莫比乌斯反演、杜教筛、离散对数 (BSGS) | 具备省赛前列/全国赛数论专项水平 |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：线性同余方程 (EXGCD 基础)
**题目描述**：给定 $a, b, m$，求解方程 $ax \equiv b \pmod m$。若无解输出 `impossible`。
- **考察点**：裴蜀定理 (Bézout's identity) 与 扩展欧几里得算法。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**数学原理**：
方程 $ax \equiv b \pmod m$ 等价于 $ax + my = b$。
1. 使用 EXGCD 求出 $ax + my = \gcd(a, m)$ 的一组解 $(x_0, y_0)$。
2. 若 $b$ 不是 $\gcd(a, m)$ 的倍数，则方程无解。
3. 否则，原方程的一组解为 $x = x_0 \cdot \frac{b}{\gcd(a, m)}$。
4. 通解模 $m/\gcd(a, m)$ 即可得到最小非负整数解。

**C++ 代码实现**：
```cpp
#include <iostream>
using namespace std;

typedef long long LL;

LL exgcd(LL a, LL b, LL &x, LL &y) {
    if (!b) {
        x = 1, y = 0;
        return a;
    }
    LL d = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return d;
}

int main() {
    int n; cin >> n;
    while (n--) {
        LL a, b, m, x, y;
        cin >> a >> b >> m;
        LL d = exgcd(a, m, x, y);
        if (b % d) cout << "impossible" << endl;
        else cout << (x * (b / d) % (m / d) + (m / d)) % (m / d) << endl;
    }
    return 0;
}
```
</details>

#### 练习 2：线性筛求积性函数 (μ, φ)
**题目描述**：在 $O(n)$ 时间内预处理出 $1 \dots n$ 的莫比乌斯函数 $\mu(i)$ 与 欧拉函数 $\phi(i)$。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现**：
```cpp
const int N = 1000010;
int primes[N], cnt;
int phi[N], mu[N];
bool st[N];

void get_functions(int n) {
    phi[1] = mu[1] = 1;
    for (int i = 2; i <= n; i++) {
        if (!st[i]) {
            primes[cnt++] = i;
            phi[i] = i - 1;
            mu[i] = -1;
        }
        for (int j = 0; primes[j] <= n / i; j++) {
            st[i * primes[j]] = true;
            if (i % primes[j] == 0) {
                phi[i * primes[j]] = phi[i] * primes[j];
                mu[i * primes[j]] = 0;
                break;
            }
            phi[i * primes[j]] = phi[i] * (primes[j] - 1);
            mu[i * primes[j]] = -mu[i];
        }
    }
}
```
</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 3：曹冲养猪 (中国剩余定理 CRT)
**题目描述**：给定 $n$ 组 $(a_i, m_i)$，求解满足 $x \equiv a_i \pmod{m_i}$ 的最小非负整数 $x$。其中 $m_i$ 两两互质。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**数学原理**：
1. 设 $M = \prod_{i=1}^n m_i$，$M_i = M/m_i$。
2. 求出 $M_i$ 在模 $m_i$ 意义下的逆元 $t_i$。
3. 则 $x = \sum_{i=1}^n a_i M_i t_i \pmod M$。

**C++ 代码实现**：
```cpp
#include <iostream>
using namespace std;

typedef long long LL;

LL exgcd(LL a, LL b, LL &x, LL &y) {
    if (!b) { x = 1, y = 0; return a; }
    LL d = exgcd(b, a % b, y, x);
    y -= a / b * x;
    return d;
}

int main() {
    int n; cin >> n;
    LL M = 1, ans = 0;
    LL a[15], m[15];
    for (int i = 0; i < n; i++) {
        cin >> m[i] >> a[i];
        M *= m[i];
    }
    for (int i = 0; i < n; i++) {
        LL Mi = M / m[i], x, y;
        exgcd(Mi, m[i], x, y);
        ans = (ans + a[i] * Mi * (x % m[i] + m[i]) % M) % M;
    }
    cout << (ans + M) % M << endl;
    return 0;
}
```
</details>

#### 练习 4：[SDOI2009] SuperGCD
**题目描述**：求解两个超大整数（$10^{10000}$ 级别）的最大公约数。
- **核心思想**：高精度减法 + 更相减损术优化。对于偶数 $a, b$，$\gcd(a, b) = 2\gcd(a/2, b/2)$；对于一奇一偶，$\gcd(a, b) = \gcd(a, b/2)$。

---

### Level C：竞赛挑战 (Advanced)

#### 练习 5：YY 的 GCD (莫比乌斯反演)
**题目描述**：给定 $N, M$，求 $\sum_{i=1}^N \sum_{j=1}^M [\gcd(i, j) \text{ is prime}]$。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**推导过程**：
设 $f(d) = \sum_{i=1}^N \sum_{j=1}^M [\gcd(i, j) = d]$，$F(n) = \sum_{n|d} f(d) = \lfloor \frac{N}{n} \rfloor \lfloor \frac{M}{n} \rfloor$。
由莫比乌斯反演公式：$f(d) = \sum_{d|n} \mu(\frac{n}{d}) F(n)$。
目标式：$\sum_{p \in prime} f(p) = \sum_{p \in prime} \sum_{p|n} \mu(\frac{n}{p}) \lfloor \frac{N}{n} \rfloor \lfloor \frac{M}{n} \rfloor$。
令 $T = n$，变换求和顺序：$\sum_{T=1}^{\min(N, M)} \lfloor \frac{N}{T} \rfloor \lfloor \frac{M}{T} \rfloor \left( \sum_{p|T, p \in prime} \mu(\frac{T}{p}) \right)$。
括号部分可以通过线性筛预处理，然后数论分块求解。

**C++ 代码实现 (核心)**：
```cpp
// 预处理 g(T) = sum_{p|T} mu(T/p)
for (int j = 0; j < cnt && primes[j] * i < N; j++) {
    int next = i * primes[j];
    st[next] = true;
    if (i % primes[j] == 0) {
        g[next] = mu[i]; // 只有 p^2 这种项
        break;
    }
    g[next] = mu[i] - g[i];
}
// 数论分块
for (int l = 1, r; l <= min(n, m); l = r + 1) {
    r = min(n / (n / l), m / (m / l));
    ans += (LL)(sum[r] - sum[l - 1]) * (n / l) * (m / l);
}
```
</details>

#### 练习 6：[BZOJ3944] Sum (杜教筛模板)
**题目描述**：求 $\Phi(n) = \sum_{i=1}^n \phi(i)$ 和 $M(n) = \sum_{i=1}^n \mu(i)$，其中 $n \le 2 \times 10^9$。

---

## 🏆 训练建议
1. **推导重于记忆**：莫比乌斯反演的公式不仅要背过，更要能在纸上 5 分钟内完成 $\gcd(i, j)$ 类型的式子变换。
2. **警惕高精度与取模**：在数论题中，中间结果极易溢出 `long long`，注意及时的 `(a * b) % mod` 或使用 `__int128`。
3. **复杂度瓶颈**：杜教筛的预处理长度通常取 $n^{2/3}$，总时间复杂度为 $O(n^{2/3})$。
