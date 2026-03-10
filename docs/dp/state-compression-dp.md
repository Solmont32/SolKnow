---
title: 状态压缩 DP
---

import { Cpu, Layout, Layers, Lightbulb, Binary, Share2 } from 'lucide-react';

# 状态压缩动态规划 (State Compression DP)

状态压缩 DP 是一种利用位运算将一个集合、一种配置或某种棋盘格局压缩成一个整数，并将其作为 DP 状态的一部分的方法。其核心在于将 **指数级搜索空间** 转化为 **多项式级别（通常是 $2^N \cdot \text{poly}(N)$）的动态规划**。

---

## <Cpu className="inline-block mr-2" /> 核心位运算技巧

在状态压缩中，我们通常使用一个二进制数 $S$ 来表示一个集合。

### 1. 基础集合操作
| 操作 | 代码实现 | 数学含义 |
| :--- | :--- | :--- |
| **检查元素 $i$** | `(S >> i) & 1` | $i \in S$ |
| **加入元素 $i$** | `S \| (1 &lt;&lt; i)` | $S \cup \{i\}$ |
| **移除元素 $i$** | `S & ~(1 &lt;&lt; i)` | $S \setminus \{i\}$ |
| **切换元素 $i$** | `S ^ (1 &lt;&lt; i)` | 对称差 $S \Delta \{i\}$ |
| **全集** | `(1 &lt;&lt; n) - 1` | $U = \{0, 1, \dots, n-1\}$ |
| **空集判断** | `!S` | $S = \emptyset$ |

### 2. 高阶技巧
- **枚举子集**：枚举 $S$ 的所有子集 $sub$。
  ```cpp
  for (int sub = S; sub; sub = (sub - 1) & S) { ... }
  ```
- **Popcount**：统计集合中元素的个数。
  ```cpp
  __builtin_popcount(S); // GCC 内置函数
  ```

---

## <Share2 className="inline-block mr-2" /> 复杂度分析与子集 DP

当我们需要枚举所有状态 $S$ 及其对应的所有子集时，总复杂度为：
$$\sum_{k=0}^n \binom{n}{k} 2^k = (1+2)^n = 3^n$$
这在 $N \le 15 \sim 18$ 时通常是可接受的。

---

## <Layout className="inline-block mr-2" /> 经典建模：棋盘与网格

### 1. 相邻约束 (Independence Set on Grids)
在网格图中，若要求相邻格子不能同时选取，通常状态定义为 $f[i][S]$，表示第 $i$ 行的选择状态为 $S$。
- **合法性判断**：`!(S & (S << 1))` 保证行内不相邻。
- **转移约束**：`!(S & prev_S)` 保证行间不相邻。

### 2. 轮廓线 DP (Profile DP)
当状态不仅取决于上一行，还取决于前几个格子时，可以使用“轮廓线”记录边界状态。这通常用于铺砖问题（如 $2 \times 1$ 长方形填充）。

---

## <Layers className="inline-block mr-2" /> 完备例题解答

### 例题 1：最短 Hamilton 路径
**题目**：从点 $0$ 出发，经过所有点恰好一次回到终点（或到达特定点）的最短距离。

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
int f[M][N]; // f[S][i] 表示当前访问点集为 S，且当前位于点 i

int main() {
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> w[i][j];

    memset(f, 0x3f, sizeof f);
    f[1][0] = 0; // 初始状态：只访问了 0 号点，且位于 0 号点

    for (int i = 1; i < (1 << n); i++) {
        for (int j = 0; j < n; j++) {
            if ((i >> j) & 1) { // 如果当前状态包含点 j
                for (int k = 0; k < n; k++) {
                    if (((i ^ (1 << j)) >> k) & 1) { // 尝试从状态 i \ {j} 中的点 k 转移过来
                        f[i][j] = min(f[i][j], f[i ^ (1 << j)][k] + w[k][j]);
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

### 例题 2：吃奶酪 (Luogu P1433)
**题目**：平面上有 $n$ 个点，从原点出发走遍所有点，求最短路径。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <cmath>
#include <iomanip>
#include <cstring>
using namespace std;

int n;
double x[20], y[20], d[20][20];
double f[1 << 15][16];

double dist(int i, int j) {
    return sqrt((x[i] - x[j]) * (x[i] - x[j]) + (y[i] - y[j]) * (y[i] - y[j]));
}

int main() {
    cin >> n;
    x[0] = y[0] = 0;
    for (int i = 1; i <= n; i++) cin >> x[i] >> y[i];
    for (int i = 0; i <= n; i++)
        for (int j = 0; j <= n; j++) d[i][j] = dist(i, j);

    for (int i = 0; i < (1 << n); i++)
        for (int j = 1; j <= n; j++) f[i][j] = 1e18;

    for (int i = 1; i <= n; i++) f[1 << (i - 1)][i] = d[0][i];

    for (int i = 1; i < (1 << n); i++) {
        for (int j = 1; j <= n; j++) {
            if (f[i][j] > 1e17) continue;
            for (int k = 1; k <= n; k++) {
                if (!((i >> (k - 1)) & 1)) {
                    int next_s = i | (1 << (k - 1));
                    f[next_s][k] = min(f[next_s][k], f[i][j] + d[j][k]);
                }
            }
        }
    }

    double res = 1e18;
    for (int i = 1; i <= n; i++) res = min(res, f[(1 << n) - 1][i]);
    cout << fixed << setprecision(2) << res << endl;
    return 0;
}
```
</details>

---

## <Binary className="inline-block mr-2" /> 进阶：SOS DP (Sum Over Subsets)

SOS DP 用于高效计算如下形式的卷积：
$$F[S] = \sum_{T \subseteq S} A[T]$$
通过分维处理，复杂度可以优化到 $O(N \cdot 2^N)$，而非朴素的 $O(3^N)$。

---

## 练习推荐
1. **[Luogu P1879] 玉米地**：基础网格约束。
2. **[Luogu P2704] 炮兵阵地**：三行状态压缩（通常记录前两行）。
3. **[HDU 4616] Gift**：树上状态压缩（配合树形 DP）。
4. **[CF 11D] A Simple Task**：状压 DP 统计简单环个数。
