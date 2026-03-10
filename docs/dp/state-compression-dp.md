---
title: 状态压缩 DP
---

import { Cpu, Layout, Layers, Lightbulb } from 'lucide-react';

# 状态压缩动态规划 (State Compression DP)

状态压缩 DP 是一种利用位运算将一个集合、一种配置或某种棋盘格局压缩成一个整数，并将其作为 DP 状态的一部分的方法。其核心在于将 **指数级搜索空间** 转化为 **多项式级别（通常是 $2^N \cdot \text{poly}(N)$）的动态规划**。

---

## <Cpu className="inline-block mr-2" /> 核心位运算技巧

在状态压缩中，我们通常使用一个二进制数（整数）来表示一个集合。

| 操作 | 代码实现 | 含义 |
| :--- | :--- | :--- |
| **检查第 $i$ 位** | `(S >> i) & 1` | 检查元素 $i$ 是否在集合 $S$ 中 |
| **加入第 $i$ 位** | `S | (1 << i)` | 将元素 $i$ 加入集合 $S$ |
| **移除第 $i$ 位** | `S & ~(1 << i)` | 将元素 $i$ 从集合 $S$ 中移除 |
| **切换第 $i$ 位** | `S ^ (1 << i)` | 翻转元素 $i$ 的选取状态 |
| **取全集** | `(1 << n) - 1` | 获取包含 $n$ 个元素的全集 |
| **Lowbit** | `S & -S` | 获取集合中最低位的 $1$ 及其对应的权重 |

---

## <Layout className="inline-block mr-2" /> 经典模型解析

### 1. 最小 Hamilton 路径 (TSP 基础)
**问题**：求从点 $0$ 到点 $n-1$ 经过每个点恰好一次的最短路径。
- **状态设计**：$f[S][i]$ 表示当前经过的点集为 $S$（二进制压缩），且当前处于点 $i$ 的最短路径长度。
- **转移方程**：
  $$f[S][i] = \min_{j \in S, j \neq i} \{ f[S \oplus (1 \ll i)][j] + \text{dist}(j, i) \}$$
- **复杂度**：$O(2^n \cdot n^2)$。

### 2. 轮廓线/插头 DP 初探 (Mondriaan's Dream)
**问题**：用 $2 \times 1$ 的长方形填充 $N \times M$ 的棋盘。
- **状态设计**：$f[i][S]$ 表示前 $i$ 行已填满，且第 $i$ 行对第 $i+1$ 行的垂直伸出状态为 $S$。
- **转移逻辑**：枚举第 $i+1$ 行的放置方式，确保其与 $S$ 兼容且第 $i+1$ 行内部也能填满。

---

## <Layers className="inline-block mr-2" /> 进阶技巧：子集枚举

给定一个状态 $S$，枚举其所有子集 $sub$：

```cpp
for (int sub = S; sub; sub = (sub - 1) & S) {
    // 处理子集 sub
}
```

**复杂度分析**：对所有 $S \in [0, 2^n-1]$ 枚举子集的总复杂度为 $O(3^n)$。
**证明**：
$$\sum_{k=0}^{n} \binom{n}{k} 2^k = (1+2)^n = 3^n$$
其中 $\binom{n}{k}$ 是选择大小为 $k$ 的集合 $S$ 的方案数，$2^k$ 是该集合的子集数。

---

## <Lightbulb className="inline-block mr-2" /> 完备例题解答

### 例题 1：最短 Hamilton 路径
<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>

using namespace std;

const int N = 20, M = 1 << N;
int n;
int w[N][N];
int f[M][N];

int main() {
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> w[i][j];

    memset(f, 0x3f, sizeof f);
    f[1][0] = 0; // 起点在 0，状态只有点 0 被访问

    for (int i = 0; i < (1 << n); i++)
        for (int j = 0; j < n; j++)
            if ((i >> j) & 1)
                for (int k = 0; k < n; k++)
                    if (((i ^ (1 << j)) >> k) & 1)
                        f[i][j] = min(f[i][j], f[i ^ (1 << j)][k] + w[k][j]);

    cout << f[(1 << n) - 1][n - 1] << endl;
    return 0;
}
```
</details>

### 例题 2：玉米地 (Luogu P1879)
在 $M \times N$ 的网格中种草，相邻格不能同时种，且某些格不能种。求方案数。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int MOD = 1e8;
int m, n;
int g[15], f[15][1 << 12];
vector<int> states;

bool check(int s) {
    return !(s & (s << 1));
}

int main() {
    cin >> m >> n;
    for (int i = 1; i <= m; i++)
        for (int j = 0, x; j < n; j++)
            cin >> x, g[i] = (g[i] << 1) | !x; // 1 表示不能种

    for (int i = 0; i < (1 << n); i++)
        if (check(i)) states.push_back(i);

    f[0][0] = 1;
    for (int i = 1; i <= m; i++)
        for (int s : states)
            if (!(s & g[i]))
                for (int ps : states)
                    if (!(s & ps))
                        f[i][s] = (f[i][s] + f[i - 1][ps]) % MOD;

    int res = 0;
    for (int s : states) res = (res + f[m][s]) % MOD;
    cout << res << endl;
    return 0;
}
```
</details>

---

## 练习推荐
1. **[Luogu P2704] 炮兵阵地**：需要考虑前两行的状态。
2. **[Luogu P1433] 吃奶酪**：经典的 TSP 问题。
3. **[POJ 2411] Mondriaan's Dream**：位压缩处理垂直放置。
