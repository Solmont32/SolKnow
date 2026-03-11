---
title: 组合计数、线性基与博弈论系统
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Layers, Binary, Infinity, Zap, Cpu, Gamepad2, Target, Sword, FlaskConical, Scale, Shapes } from 'lucide-react';

# 组合计数与博弈论 (Combinatorics & Game Theory)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇文档系统化构建了从基础计数、容斥原理，到线性基、母函数与博弈均衡的完备体系。涵盖了代数恒等式证明与模型转换的核心逻辑。
</motion.div>

---

## 1. 组合计数进阶

### 1.1 容斥原理 (Inclusion-Exclusion Principle)
**基本形式**：
$$ |\bigcup_{i=1}^n A_i| = \sum |A_i| - \sum |A_i \cap A_j| + \dots + (-1)^{n-1} |\bigcap A_i| $$
**广义形式 (二项式反演)**：
设 $g(n)$ 表示恰好满足 $n$ 个属性的方案数，$f(n)$ 表示至少满足 $n$ 个属性的方案数。
$$ f(k) = \sum_{i=k}^n \binom{i}{k} g(i) \iff g(k) = \sum_{i=k}^n (-1)^{i-k} \binom{i}{k} f(i) $$

### 1.2 生成函数 (Generating Functions)
**卡特兰数 (Catalan Numbers)**：$C_n = \frac{1}{n+1} \binom{2n}{n}$。
**母函数推导**：
设 $C(x) = \sum C_i x^i$，由递推式 $C_{n+1} = \sum_{i=0}^n C_i C_{n-i}$ 得：
$x C^2(x) - C(x) + 1 = 0 \implies C(x) = \frac{1 \pm \sqrt{1-4x}}{2x}$。
取极限确定符号后，利用广义二项式定理展开即可得到通项。

---

## 2. 线性基 (Linear Basis)

线性基是向量空间的一种特殊基，在处理异或（XOR）相关问题时极为强大。

### 2.1 性质与构造
1. **性质**：原集合中的任何元素异或和都可以由线性基中的元素异或得到。
2. **最小性**：线性基是满足上述性质的最小集合。
3. **构造**：贪心插入，利用高斯消元思想。

<details>
<summary>Check Implementation (Linear Basis)</summary>

```cpp
struct LinearBasis {
    long long p[64];
    void insert(long long x) {
        for (int i = 62; i >= 0; i--) {
            if (!(x >> i)) continue;
            if (!p[i]) { p[i] = x; break; }
            x ^= p[i];
        }
    }
    long long query_max() {
        long long res = 0;
        for (int i = 62; i >= 0; i--)
            res = max(res, res ^ p[i]);
        return res;
    }
};
```
</details>

---

## 3. 博弈论模型系统

### 3.1 斯普拉格-格隆迪定理 (SG Theorem)
任何公平组合游戏（ICG）都可以转化为 Nim 游戏的一个堆。
- **mex 函数**：$mex(S)$ 表示集合 $S$ 中未出现的最小非负整数。
- **SG 值**：$SG(u) = mex(\{SG(v) \mid u \to v\})$。
- **组合游戏**：$SG(G_1 + G_2) = SG(G_1) \oplus SG(G_2)$。

---

## 4. 综合练习与 C++ 解答

### 练习 1：[HDU 5833] Lots of Parabolas (线性基应用)
给定 $n$ 个数，求有多少个子集的乘积是完全平方数。
**解析**：每个数 $x = p_1^{e_1} p_2^{e_2} \dots$。乘积为完全平方数等价于指数向量在 $\mathbb{F}_2$ 上的和为 0。利用线性基求解线性方程组。

<details>
<summary>Check Solution (思路)</summary>

1. 对每个数进行质因数分解，只记录每个质因子指数的奇偶性（0 或 1）。
2. 将每个数转化为一个二进制向量。
3. 将这些向量插入线性基。
4. 若线性基大小为 $L$，总元素数为 $n$，则自由元个数为 $n-L$。
5. 答案为 $2^{n-L} - 1$。
</details>

### 练习 2：排列计数 (二项式反演)
求 $1 \dots n$ 的排列中，恰好有 $k$ 个位置满足 $p_i = i$ 的排列数。
**解析**：设 $f(k)$ 为至少 $k$ 个位置满足条件，即 $f(k) = \binom{n}{k} (n-k)!$。
使用二项式反演求 $g(k)$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
long long f(int k, int n) {
    return C(n, k) * fact[n - k] % MOD;
}
long long solve(int k, int n) {
    long long ans = 0;
    for (int i = k; i <= n; i++) {
        long long term = C(i, k) * f(i, n) % MOD;
        if ((i - k) & 1) ans = (ans - term + MOD) % MOD;
        else ans = (ans + term) % MOD;
    }
    return ans;
}
```
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800"
>
<Shapes className="text-indigo-500 mb-2" />
**大师寄语**：组合数学不仅仅是计数，更是寻找集合间的映射。博弈论则告诉我们，所有的竞争在某种高度上都是一种代数结构的对抗。
</motion.div>
