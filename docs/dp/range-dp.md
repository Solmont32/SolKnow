---
title: 区间 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 区间动态规划 (Interval Dynamic Programming)

区间 DP 是一类以**区间长度**为阶段演进的动态规划。其核心思想是由短区间的解逐步推导长区间的解，通常用于处理具有“合并”或“拆分”特性的问题。

---

<KnowledgeCard type="info" title="区间合并性质">
    对于区间 $[i, j]$，其最优解通常由其子区间 $[i, k]$ 和 $[k+1, j]$ 的最优解合并而来（其中 $i \le k < j$）。
    <br/>
    由于计算 $[i, j]$ 时需要所有长度更短的区间已计算完毕，因此循环顺序通常是**先枚举长度 $len$，再枚举左端点 $i$**。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 经典模型：石子合并 (Stone Merging)

**问题**：有 $n$ 堆石子排成一排，每次合并相邻两堆，代价为两堆石子总重。求合并为一堆的最小代价。

### 状态设计
$f[i][j]$ 表示将第 $i$ 堆到第 $j$ 堆石子合并为一堆的最小代价。

### 转移方程
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] \} + \sum_{p=i}^j w_p$$
其中 $\sum_{p=i}^j w_p$ 可通过前缀和 $O(1)$ 计算。

---

## <Zap className="inline-block mr-2" /> 2. 环形区间 DP 的技巧

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
