---
title: 概率期望与随机化算法：从期望 DP 到 Miller-Rabin 质数测试与 Pollard-Rho 分解
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Target, Zap, Binary, Infinity, Cpu, Code2, Hash, Layers } from 'lucide-react';

# 概率期望与随机化算法 (Probability, Expectation & Randomized Algorithms)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇文档系统化构建了从概率期望基础、动态规划推导，到工业级随机化算法（Miller-Rabin 与 Pollard's Rho）的完备知识体系。通过严谨的数学推导与线性规划应用，揭示随机化在计算复杂性理论与数论安全中的核心地位。
</motion.div>

---

## 第一部分：概率与期望基础 (Foundations)

### 1. 期望的线性性质 (Linearity of Expectation)
**核心定理**：对于任意两个随机变量 $X, Y$（无论是否独立），均有：
$$E[X + Y] = E[X] + E[Y]$$
更一般地，对于常数 $a_i$：
$$E\left[\sum a_i X_i\right] = \sum a_i E[X_i]$$

### 2. 条件概率与全期望公式
**全期望公式**：$E[X] = E[E[X|Y]] = \sum_y E[X|Y=y] P(Y=y)$。
这在动态规划的状态转移推导中具有至关重要的作用。

---

## 第二部分：期望 DP 与线性规划 (Expectation DP)

### 1. 基础期望 DP
通常定义 $f[i]$ 为从状态 $i$ 转移到终止状态的 **期望步数** 或 **期望收益**。
**转移方程**：$f[u] = \sum_{v \in Next(u)} p(u \to v) \cdot (f[v] + w(u \to v))$。

<details>
<summary>例题 1：[NOI2005] 聪聪与可可 (期望 DP 基础)</summary>
猫追逐老鼠，猫每次走两步（贪心靠近老鼠），老鼠随机移动。求猫捉到老鼠的期望步数。

**解析**：
状态 $f[u][v]$ 表示猫在 $u$，鼠在 $v$ 时的期望步数。
$f[u][v] = \frac{1}{deg(v)+1} \sum_{v' \in \{v\} \cup Adj(v)} (f[next(next(u, v), v)][v'] + 1)$。
由于猫和鼠的距离单调递减（或捉到），该 DP 无环，直接递归+记忆化。
</details>

---

### 2. 环上期望问题与高斯消元 (Gaussian Elimination)
当状态转移存在环时（例如在图上随机游走），无法直接使用 DP。需将其转化为线性方程组：
$$f[u] = \sum p(u \to v) f[v] + 1$$
转化为 $A \mathbf{x} = \mathbf{b}$ 形式，利用 **高斯消元** 在 $O(n^3)$ 内求解。

<details>
<summary>C++ 高斯消元模板 (求解期望方程组)</summary>

```cpp
double a[MAXN][MAXN]; // 增广矩阵
void gauss(int n) {
    for (int i = 1; i <= n; i++) {
        int max_r = i;
        for (int j = i + 1; j <= n; j++)
            if (fabs(a[j][i]) > fabs(a[max_r][i])) max_r = j;
        swap(a[i], a[max_r]);
        for (int j = i + 1; j <= n; j++) {
            double f = a[j][i] / a[i][i];
            for (int k = i; k <= n + 1; k++) a[j][k] -= f * a[i][k];
        }
    }
    for (int i = n; i >= 1; i--) {
        for (int j = i + 1; j <= n; j++) a[i][n + 1] -= a[i][j] * a[j][n + 1];
        a[i][n + 1] /= a[i][i];
    }
}
```
</details>

---

## 第三部分：随机化算法 I - Miller-Rabin 素性测试

对于极大的数（如 $10^{18}$），传统的 $O(\sqrt{n})$ 筛法失效。Miller-Rabin 提供了一种基于随机化的快速素性判定。

### 1. 核心理论
- **费马小定理**：若 $p$ 为质数，则 $a^{p-1} \equiv 1 \pmod p$。
- **二次探测定理**：若 $p$ 为质数，且 $x^2 \equiv 1 \pmod p$，则 $x \equiv 1$ 或 $x \equiv p-1 \pmod p$。

### 2. 算法流程
1. 将 $n-1$ 分解为 $d \cdot 2^s$（$d$ 为奇数）。
2. 选取随机底数 $a$。
3. 计算 $x = a^d \pmod n$。
4. 连续进行 $s$ 次平方探测，若发现 $x^2 \equiv 1$ 但 $x \neq 1, n-1$，则 $n$ 必为合数。
5. 最后若 $a^{n-1} \not\equiv 1 \pmod n$，则 $n$ 必为合数。

<details>
<summary>C++ Miller-Rabin 工业级实现</summary>

```cpp
typedef long long ll;
ll qpow(ll a, ll b, ll m) {
    ll res = 1; a %= m;
    while (b) {
        if (b & 1) res = (__int128)res * a % m;
        a = (__int128)a * a % m;
        b >>= 1;
    }
    return res;
}

bool miller_rabin(ll n) {
    if (n < 3 || n % 2 == 0) return n == 2;
    ll d = n - 1, s = 0;
    while (d % 2 == 0) d /= 2, s++;
    static const ll bases[] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 61}; // 针对 2^64 内的数
    for (ll a : bases) {
        if (n <= a) break;
        ll x = qpow(a, d, n);
        if (x == 1 || x == n - 1) continue;
        bool composite = true;
        for (int r = 1; r < s; r++) {
            x = (__int128)x * x % n;
            if (x == n - 1) { composite = false; break; }
        }
        if (composite) return false;
    }
    return true;
}
```
</details>

---

## 第四部分：随机化算法 II - Pollard's Rho 整数分解

### 1. 生日悖论与启发式搜索
生日悖论指出，在 $N$ 个人中，存在两人生日相同的概率在 $N \approx \sqrt{365}$ 时就已显著。Pollard's Rho 利用此思想，通过随机游走寻找 $n$ 的因子 $d = \gcd(|x-y|, n)$。

### 2. 随机函数与环
使用 $f(x) = (x^2 + c) \pmod n$ 生成伪随机序列。该序列最终会进入一个环（形如 $\rho$）。
- **Floyd 判环**：快慢指针。
- **Brent 改进**：倍增优化 $\gcd$ 计算，减少耗时的 $\gcd$ 调用。

<details>
<summary>C++ Pollard's Rho 模板 (含 Brent 优化)</summary>

```cpp
ll pollard_rho(ll n) {
    if (n % 2 == 0) return 2;
    if (miller_rabin(n)) return n;
    ll x, y, z, c, g;
    while (true) {
        y = x = rand() % (n - 1) + 1;
        z = 1; c = rand() % (n - 1) + 1;
        for (ll step = 1; ; step <<= 1) {
            x = y;
            for (ll i = 0; i < step; i++) {
                y = ((__int128)y * y + c) % n;
                z = (__int128)z * abs(x - y) % n;
                if (i % 127 == 0) { // 堆积 gcd 优化
                    g = std::gcd(z, n);
                    if (g > 1) return g;
                }
            }
            g = std::gcd(z, n);
            if (g > 1) return g;
        }
    }
}
```
</details>

---

## 第五部分：综合练习与解答

### 例题 1：[SHOI2002] 百步穿杨 (期望线性性)
一个靶子有 $n$ 个环，射中第 $i$ 环的概率为 $p_i$，得分为 $s_i$。求射击 $k$ 次的期望总得分。
<details>
<summary>查看解析</summary>
设 $X_j$ 为第 $j$ 次射击的得分。
$E[X_j] = \sum p_i s_i$。
根据线性性质，$E[\sum X_j] = \sum E[X_j] = k \cdot (\sum p_i s_i)$。
</details>

### 例题 2：[Luogu P4718] Pollard-Rho 模板
给定大整数 $n$，求其最大质因子。
<details>
<summary>查看实现策略</summary>
递归分解：
1. 若当前 $n$ 为质数，更新答案。
2. 否则通过 `pollard_rho` 找到一个因子 $d$。
3. 递归处理 `solve(d)` 和 `solve(n/d)`。
</details>

---

## 练习库

<details>
<summary>练习 1：随机游走期望</summary>
在一条长度为 $n$ 的链上，从 1 号点出发，每次等概率向左或向右走一步（边界处只能往回走）。求到达 $n$ 号点的期望步数。
**提示**：设 $f[i]$ 为 $i \to i+1$ 的期望步数。
</details>

<details>
<summary>练习 2：Miller-Rabin 错误率</summary>
为什么在 Miller-Rabin 中需要多个随机底数？
**解答**：存在卡迈克尔数（Carmichael numbers），它们能通过费马小定理的测试但不是质数。二次探测能过滤大部分，但通过多个底数可以将错误率降至极低（$4^{-k}$）。
</details>

<details>
<summary>练习 3：期望 DP 的倒推与正推</summary>
什么时候应该从终点倒推期望，什么时候可以从起点正推？
**解答**：通常求“到达终点的期望步数”时倒推更自然（$f[end]=0$），而求“期望收益”且状态无环时可正推。
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800"
>
<Zap className="text-amber-500 mb-2" />
**大师寄语**：随机化不是对精确性的妥协，而是对维度的降击。当确定性算法在指数级墙面前止步时，随机化的灵光往往能穿透迷雾，触及真理。
</motion.div>
