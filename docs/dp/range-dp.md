---
title: 区间 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 区间动态规划 (Interval Dynamic Programming)

区间 DP 是一类以**区间长度**为阶段演进的动态规划。其核心思想是由短区间的解逐步推导长区间的解，通常用于处理具有“合并”或“拆分”特性的问题。

---

<KnowledgeCard type="info" title="区间合并性质与最优子结构">
    对于区间 $[i, j]$，其最优解通常由其子区间 $[i, k]$ 和 $[k+1, j]$ 的最优解合并而来。
    <br/>
    **最优子结构证明**：以矩阵链乘为例，设 $A_i \dots A_j$ 的最优相乘顺序在 $k$ 处断开。如果 $A_i \dots A_k$ 的子序列不是最优相乘顺序，那么我们可以替换为更优的顺序，从而使整体 $A_i \dots A_j$ 的代价更小，这与前提矛盾。
    <br/>
    **计算顺序**：由于计算长度为 $L$ 的区间依赖于长度小于 $L$ 的区间，因此必须**外层枚举区间长度 $len$**。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 经典模型深度解析

### 1.1 石子合并 (Stone Merging)

**问题**：有 $n$ 堆石子，合并相邻两堆的代价为重量和。
**转移方程**：
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] \} + \text{sum}(i, j)$$

### 1.2 矩阵链乘 (Matrix Chain Multiplication)

**问题**：给定 $n$ 个矩阵的维数，求最少标量乘法次数。
**状态设计**：$f[i][j]$ 为相乘 $A_i \dots A_j$ 的最小代价。
**转移方程**：
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + p_{i-1} \cdot p_k \cdot p_j \}$$
其中矩阵 $A_i$ 的维数为 $p_{i-1} \times p_i$。

---

## <Zap className="inline-block mr-2" /> 2. 环形区间 DP 的技巧与推导

许多题目（如环形石子合并）中物品排成一环。
**标准处理方案**：将原序列复制一份接在末尾（变为 $2n$ 长度），然后对 $2n$ 的序列做普通的区间 DP。最终答案为 $\min_{1 \le i \le n} \{ f[i][i+n-1] \}$。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 综合练习与强化

### 练习 1：能量项链

两个珠子 $(m, r)$ 和 $(r, n)$ 合并产生 $m \times r \times n$ 的能量。求环形项链合并的最大能量。

<details>
<summary>Check Solution (O(N^3))</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int f[205][205], a[205];

int main() {
    int n; cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        a[i + n] = a[i];
    }

    for (int len = 2; len <= n; len++) {
        for (int i = 1; i + len - 1 <= 2 * n; i++) {
            int j = i + len - 1;
            for (int k = i; k < j; k++) {
                f[i][j] = max(f[i][j], f[i][k] + f[k + 1][j] + a[i] * a[k + 1] * a[j + 1]);
            }
        }
    }

    int res = 0;
    for (int i = 1; i <= n; i++) res = max(res, f[i][i + n - 1]);
    cout << res << endl;
    return 0;
}
```

</details>

---

## 延伸挑战

- [洛谷 P1880 石子合并](https://www.luogu.com.cn/problem/P1880)
- [洛谷 P1063 能量项链](https://www.luogu.com.cn/problem/P1063)
- [洛谷 P3205 [HNOI2010] 合唱队](https://www.luogu.com.cn/problem/P3205)（区间 DP 状态讨论）
