---
title: 状压 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Binary, Grid, Target } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 状态压缩动态规划 (State Compression DP)

状压 DP 是一类特殊的动态规划，其核心思想是利用**位运算**将集合状态（如“哪些元素已被选中”）压缩成一个整数，从而将其作为 DP 的一个维度。它通常用于解决 $N$ 较小（一般 $N \le 22$）但具有指数级解空间的问题。

---

<KnowledgeCard type="info" title="集合与二进制的映射逻辑">
    对于有限集合 $S \subseteq \{0, 1, \dots, n-1\}$，我们可以用一个 $n$ 位二进制数 $x$ 来表示：
    - **元素存在性**：$i \in S \iff (x \gg i) \& 1 = 1$
    - **并集操作**：$S_1 \cup S_2 \iff x_1 | x_2$
    - **交集操作**：$S_1 \cap S_2 \iff x_1 \& x_2$
    - **差集操作**：$S \setminus \{i\} \iff x \oplus (1 \ll i)$（前提是 $i \in S$）
    - **全集状态**：$(1 \ll n) - 1$
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 核心模型：哈密顿路径 (Hamiltonian Path)

**问题描述**：给定 $n$ 个点及其间的边权，求从点 0 到点 $n-1$ 经过每个点恰好一次的最短路径。

### 1.1 状态空间建模 (State Space)

- **阶段 (Stage)**：当前已访问的点集（集合状态）。
- **状态定义**：$f[S][i]$ 表示当前已访问点的集合为 $S$，且当前处于点 $i$ 的路径总权值最小值。
- **无后效性证明**：给定当前访问集合 $S$ 和终点 $i$，未来的路径选择仅依赖于 $\{V \setminus S\}$ 中的点，而与到达 $i$ 的具体路径无关。

### 1.2 状态转移方程 (Transition)

若要到达状态 $(S, i)$，前驱状态必然是访问了 $S \setminus \{i\}$ 且止于某点 $j \in S \setminus \{i\}$：
$$f[S][i] = \min_{j \in S, j \neq i} \{ f[S \oplus (1 \ll i)][j] + dist(j, i) \}$$

- **初始条件**：$f[1][0] = 0$，其余为 $+\infty$。
- **目标**：$f[(1 \ll n) - 1][n - 1]$。

---

## <Layers className="inline-block mr-2" /> 2. 子集遍历的艺术：复杂度从 $O(4^n)$ 到 $O(3^n)$

在某些状压 DP 中（如划分集合问题），需要枚举每个状态 $S$ 的所有子集 $s \subset S$。

**高效枚举技巧**：

```cpp
for (int S = 0; S < (1 << n); S++) {
    for (int s = S; s; s = (s - 1) & S) {
        // s 是 S 的非空子集
    }
}
```

**复杂度证明**：
总计算次数等于 $\sum_{k=0}^n \binom{n}{k} \cdot 2^k$。
根据二项式定理 $(1+x)^n = \sum \binom{n}{k} x^k$，令 $x=2$，得：
$$(1+2)^n = 3^n$$
此技巧将复杂度从朴素的 $O(4^n)$ 降至 $O(3^n)$，在 $n=15$ 左右具有决定性差异。

---

## <Binary className="inline-block mr-2" /> 3. 位运算工具箱

在工业级状压 DP 实现中，利用内置函数可大幅提升性能：

- `__builtin_popcount(x)`: 返回 $x$ 二进制中 1 的个数。
- `__builtin_ctz(x)`: 返回末尾 0 的个数（即最低位 1 的索引）。
- `x & -x` (lowbit): 提取 $x$ 的最低位 1。

---

## <ShieldCheck className="inline-block mr-2" /> 4. 综合练习与强化

### 练习 1：最短 Hamilton 路径

经典 TSP 简化版，求从 0 到 $n-1$ 的最短路径。

<details>
<summary>Check Solution (O(2^n * n^2))</summary>

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>

using namespace std;

int f[1 << 20][20], dist[20][20];

int main() {
    int n; cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> dist[i][j];

    memset(f, 0x3f, sizeof f);
    f[1][0] = 0;

    for (int i = 1; i < (1 << n); i++) {
        for (int j = 0; j < n; j++) {
            if ((i >> j) & 1) {
                for (int k = 0; k < n; k++) {
                    if ((i >> k) & 1 && k != j) {
                        f[i][j] = min(f[i][j], f[i ^ (1 << j)][k] + dist[k][j]);
                    }
                }
            }
        }
    }
    cout << f[(1 << n) - 1][n - 1] << endl;
    return 0;
}
```

</details>

### 练习 2：蒙德里安的梦想 (棋盘覆盖)

用 $1 \times 2$ 的骨牌铺满 $n \times m$ 的棋盘，求方案数。

<details>
<summary>Check Solution (DP Logic)</summary>

**状态定义**：$f[i][j]$ 表示第 $i$ 列的状态为 $j$（$j$ 的某位为 1 表示由第 $i-1$ 列横插过来的）。

```cpp
#include <iostream>
#include <vector>
#include <cstring>

using namespace std;

long long f[12][1 << 11];
bool st[1 << 11];

int main() {
    int n, m;
    while (cin >> n >> m && (n || m)) {
        // 预处理：判断连续空位是否为偶数
        for (int i = 0; i < (1 << n); i++) {
            int cnt = 0;
            st[i] = true;
            for (int j = 0; j < n; j++) {
                if ((i >> j) & 1) {
                    if (cnt & 1) st[i] = false;
                    cnt = 0;
                } else cnt++;
            }
            if (cnt & 1) st[i] = false;
        }

        memset(f, 0, sizeof f);
        f[0][0] = 1;
        for (int i = 1; i <= m; i++) {
            for (int j = 0; j < (1 << n); j++) {
                for (int k = 0; k < (1 << n); k++) {
                    // 状态 k (i-1) 和状态 j (i) 兼容
                    if ((j & k) == 0 && st[j | k]) {
                        f[i][j] += f[i - 1][k];
                    }
                }
            }
        }
        cout << f[m][0] << endl;
    }
    return 0;
}
```

</details>

### 练习 3：最优二分图匹配 (Bitmask 版)

给定二分图的邻接矩阵，求最大匹配。虽然匈牙利算法更快，但状压 DP 适用于带权匹配等变体。

<details>
<summary>Check Solution (O(2^N * N))</summary>

```cpp
// f[S] 表示已匹配左侧点集 S 时，前 popcount(S) 个右侧点的最大匹配价值
for (int S = 0; S < (1 << n); S++) {
    int i = __builtin_popcount(S); // 当前准备匹配右侧的第 i 个点
    for (int j = 0; j < n; j++) {
        if (!((S >> j) & 1)) { // 如果左侧第 j 个点未被匹配
            f[S | (1 << j)] = max(f[S | (1 << j)], f[S] + weight[j][i]);
        }
    }
}
```

</details>

---

## 延伸挑战

- [洛谷 P1879 [USACO06NOV] Corn Fields G](https://www.luogu.com.cn/problem/P1879)（基础状压）
- [洛谷 P2704 [NOI2001] 炮兵阵地](https://www.luogu.com.cn/problem/P2704)（多行依赖与状态精简）
- [AtCoder DP Contest U - Grouping](https://atcoder.jp/contests/dp/tasks/dp_u)（$O(3^N)$ 子集枚举练习）
