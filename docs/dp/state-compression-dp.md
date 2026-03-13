---
title: 状压 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Binary, Grid, Target, CheckCircle2, BookOpen, Code2 } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 状态压缩动态规划 (State Compression DP)

状压 DP 是一类利用**位运算**将指数级的集合状态映射为整数维度的动态规划。它通常应用于 $N$ 较小（$N \le 22$）且子问题具有高度重叠性的组合优化问题。

---

## <Microscope className="inline-block mr-2" /> 1. 形式化建模：映射与验证

### 1.1 集合状态的封闭性与映射 (Mapping)

设全集 $U = \{0, 1, \dots, n-1\}$。任何子集 $S \subseteq U$ 可唯一映射为整数 $x = \sum_{i \in S} 2^i$。
位运算为集合操作提供了 $O(1)$ 的封闭映射：
- $i \in S \iff (x \gg i) \& 1$
- $S \cup \{i\} \iff x \mid (1 \ll i)$
- $S \setminus \{i\} \iff x \oplus (1 \ll i)$
- $S_1 \cap S_2 \iff x_1 \& x_2$
- $S_1 \cup S_2 \iff x_1 \mid x_2$

### 1.2 无后效性 (No-after-effect) 逻辑验证

**验证命题**：在处理当前集合 $S$ 时，最优解仅取决于 $S$ 内元素的组合属性，而与这些元素被加入集合的先后顺序无关。

<div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
  <p className="font-bold flex items-center"><CheckCircle2 className="mr-2 text-blue-500" /> 验证实例：TSP (旅行商问题)</p>
  <p>在 TSP 中，$dp[S][i]$ 表示已访问城市集合为 $S$ 且当前处于城市 $i$ 的最小代价。只要 $S$ 和 $i$ 确定，后续访问剩余城市的代价仅取决于 $U \setminus S$，而与之前是如何穿过 $S$ 中城市的历史路径完全解耦。这满足无后效性。</p>
</div>

---

## <Layers className="inline-block mr-2" /> 2. 状态转移方程的导出

状压 DP 的演进本质上是**集合规模的递增**或**阶段的线性推进**。

### 2.1 路径/排列类 (Hamiltonian Path)
$$dp[S][i] = \min_{j \in S, j \neq i} \{ dp[S \oplus (1 \ll i)][j] + \text{dist}(j, i) \}$$
*导出逻辑*：要使当前状态为 $(S, i)$，上一个状态必然访问了 $S \setminus \{i\}$ 中的点，且最后停留在某个 $j$ 点。

### 2.2 棋盘/覆盖类 (Grid Filling)
$$dp[i][S] = \sum_{S'} dp[i-1][S'] \quad (\text{if } S \text{ is compatible with } S')$$
*导出逻辑*：第 $i$ 行的状态 $S$ 仅由第 $i-1$ 行的兼容状态 $S'$ 转移而来。

### 2.3 子集枚举优化 (Subset Enumeration)
对于涉及“划分集合”的问题，需要枚举 $S$ 的所有非空子集 $s$。
$$dp[S] = \max_{s \subset S} \{ dp[S \setminus s] + \text{cost}(s) \}$$
**复杂度证明**：总枚举次数为 $\sum_{k=0}^n \binom{n}{k} \cdot 2^k = (1+2)^n = 3^n$。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 教材化典型例题

### 例题 1：蒙德里安的梦想 (Mondriaan's Dream)

**问题描述**：用 $1 \times 2$ 的多米诺骨牌填满 $N \times M$ 的棋盘，求方案数。
**核心思路**：只需要确定所有横向骨牌的放置，纵向骨牌将自动填满剩余空间。
**状态定义**：$f[i][S]$ 表示前 $i-1$ 列已摆好，且从第 $i-1$ 列伸到第 $i$ 列的状态为 $S$ 的方案数。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <cstring>

using namespace std;

long long f[12][1 << 11];
bool st[1 << 11];

int main() {
    int n, m;
    while (cin >> n >> m, n || m) {
        // 预处理哪些状态 S 能够合法填入纵向骨牌
        for (int i = 0; i < 1 << n; i++) {
            int cnt = 0;
            st[i] = true;
            for (int j = 0; j < n; j++) {
                if (i >> j & 1) {
                    if (cnt & 1) st[i] = false;
                    cnt = 0;
                } else cnt++;
            }
            if (cnt & 1) st[i] = false;
        }

        memset(f, 0, sizeof f);
        f[0][0] = 1;
        for (int i = 1; i <= m; i++) {
            for (int j = 0; j < 1 << n; j++) {
                for (int k = 0; k < 1 << n; k++) {
                    if ((j & k) == 0 && st[j | k])
                        f[i][j] += f[i - 1][k];
                }
            }
        }
        cout << f[m][0] << endl;
    }
    return 0;
}
```

</details>

---

## <Code2 className="inline-block mr-2" /> 4. 课后强化练习

### 练习 1：玉米地 (Corn Fields)
在 $M \times N$ 的土地上选择互不相邻的格子种草，有些格子贫瘠不能种，求总方案数。

<details>
<summary>Check Solution (Bitmask DP)</summary>

```cpp
// 状态：f[i][S] 表示第 i 行状态为 S
// 转移：f[i][S] = sum(f[i-1][S']) if (S & S' == 0) and (S is valid)
for (int i = 1; i <= m; i++) {
    for (int s : head[i]) { // 预处理出每一行合法的状态
        for (int pre : head[i-1]) {
            if (!(s & pre)) f[i][s] = (f[i][s] + f[i-1][pre]) % MOD;
        }
    }
}
```

</details>

### 练习 2：愤怒的小鸟 (Angry Birds - Subset Optimization)
给出 $N$ 个点的坐标，求最少发射多少条抛物线（过原点）能覆盖所有点。$N \le 18$。

<details>
<summary>Check Analysis & Trick</summary>

**分析**：任意两个不共线的点可唯一确定一条过原点的抛物线。
**技巧**：$f[S]$ 表示覆盖点集 $S$ 的最少抛物线数。
为了避免重复枚举，我们每次选取 $S$ 中第一个未覆盖的点 $x$，枚举所有经过 $x$ 的可能抛物线来更新状态。

```cpp
for (int i = 0; i < (1 << n) - 1; i++) {
    int x = 0;
    while ((i >> x) & 1) x++; // 找到第一个未覆盖的点
    for (int path : paths[x]) { // paths[x] 预处理了过点 x 的所有有效抛物线
        f[i | path] = min(f[i | path], f[i] + 1);
    }
}
```

</details>

---

## 延伸挑战

- [洛谷 P1433 吃奶酪](https://www.luogu.com.cn/problem/P1433)
- [洛谷 P1879 [USACO06NOV] Corn Fields G](https://www.luogu.com.cn/problem/P1879)
- [洛谷 P3959 [NOIP2017 提高组] 宝藏 (子集枚举优化)](https://www.luogu.com.cn/problem/P3959)
- [AtCoder ABC 142 F - Pure (状压找最小环)](https://atcoder.jp/contests/abc142/tasks/abc142_f)
