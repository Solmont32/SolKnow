---
title: 状压 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Binary, Grid, Target, CheckCircle2, BookOpen, Code2, Scaling } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 状态压缩动态规划 (State Compression DP)

状压 DP 是一类利用**位运算**将指数级的集合状态映射为整数维度的动态规划。它通常应用于 $N$ 较小（$N \le 22$）且子问题具有高度重叠性的组合优化问题。

---

## <Microscope className="inline-block mr-2" /> 1. 数理建模：映射与验证

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
  <p>在 TSP 中，$dp[S][i]$ 表示已访问城市集合为 $S$ 及当前处于城市 $i$ 的最小代价。只要 $S$ 和 $i$ 确定，后续访问剩余城市的代价仅取决于 $U \setminus S$，而与历史路径无关。这满足无后效性。</p>
</div>

### 1.3 收敛性与复杂度分析 (Convergence & Complexity)

**基于子集格点的收敛性**：
状压 DP 的状态空间构成一个 **布尔格 (Boolean Lattice)**。
1. **拓扑序**：状态转移总是从集合规模 $|S|=k$ 指向 $|S|=k+1$（或按整数值递增）。
2. **复杂度收敛分析**：
   - **基础转移**：$O(2^n \cdot n^k)$。
   - **子集枚举**：$\sum_{k=0}^n \binom{n}{k} \cdot 2^k = 3^n$。利用 `for (int sub = (s-1)&s; sub; sub = (sub-1)&s)` 技巧可精确枚举所有子集。

---

## <Layers className="inline-block mr-2" /> 2. 状态转移方程的导出与证明

状压 DP 的演进本质上是**集合规模的递增**或**阶段的线性推进**。

### 2.1 排列类最优子结构证明

**命题**：在哈密顿路径问题中，全集的最优解包含其子集的最优解。

**证明**：设 $f(S, i)$ 是经过点集 $S$ 且终点为 $i$ 的最短路径。若该路径由 $j$ 转移而来，则路径的前缀必然是经过 $S \setminus \{i\}$ 且终点为 $j$ 的最短路径。若存在更短的前缀，则替换后全路径更短，与 $f(S, i)$ 为最优解矛盾。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 教材化典型例题

### 例题 1：最短 Hamilton 路径

**问题描述**：给定 $N$ 个点的带权无向图，求从 $0$ 到 $N-1$ 经过每个点恰好一次的最短路径。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <cstring>
#include <algorithm>

using namespace std;

int f[1 << 20][20], weight[20][20];

int main() {
    int n; cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> weight[i][j];

    memset(f, 0x3f, sizeof f);
    f[1][0] = 0; // 起点在 0，已访问集合为 {0}

    for (int i = 1; i < 1 << n; i++) {
        for (int j = 0; j < n; j++) {
            if (i >> j & 1) { // 终点 j 在集合 i 中
                for (int k = 0; k < n; k++) {
                    if ((i ^ (1 << j)) >> k & 1) { // 前驱点 k 在除去 j 的集合中
                        f[i][j] = min(f[i][j], f[i ^ (1 << j)][k] + weight[k][j]);
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

### 例题 2：蒙德里安的梦想 (轮廓线/插头 DP 基础)

**证明**：该问题的本质是状态的**逐列收敛**。当第 $i$ 列被填满后，其对第 $i+1$ 列的影响仅表现为是否向后伸出。

<details>
<summary>Check Solution Hint</summary>

预处理 `st[S]` 表示状态 $S$ 是否含有奇数个连续的空位。
$f[i][j]$ 表示前 $i-1$ 列已满，且从第 $i-1$ 列向第 $i$ 列伸出的状态为 $j$ 的方案数。

</details>

---

## <Code2 className="inline-block mr-2" /> 4. 课后强化练习

### 练习 1：愤怒的小鸟 (Angry Birds - 子集优化)
给出 $N$ 个点的坐标，求最少发射多少条过原点的抛物线能覆盖所有点。$N \le 18$。

<details>
<summary>Check Solution (Optimized Enumeration)</summary>

```cpp
#include <iostream>
#include <vector>
#include <cstring>
#include <cmath>

using namespace std;

const double eps = 1e-8;
int path[20][20], f[1 << 18];

void solve() {
    int n, m; cin >> n >> m;
    vector<pair<double, double>> p(n);
    for (int i = 0; i < n; i++) cin >> p[i].first >> p[i].second;

    memset(path, 0, sizeof path);
    for (int i = 0; i < n; i++) {
        path[i][i] = 1 << i;
        for (int j = 0; j < n; j++) {
            double x1 = p[i].first, y1 = p[i].second;
            double x2 = p[j].first, y2 = p[j].second;
            if (abs(x1 - x2) < eps) continue;
            double a = (y1 / x1 - y2 / x2) / (x1 - x2);
            double b = y1 / x1 - a * x1;
            if (a < -eps) {
                int state = 0;
                for (int k = 0; k < n; k++) {
                    if (abs(a * p[k].first * p[k].first + b * p[k].first - p[k].second) < eps)
                        state |= (1 << k);
                }
                path[i][j] = state;
            }
        }
    }

    memset(f, 0x3f, sizeof f);
    f[0] = 0;
    for (int i = 0; i < (1 << n) - 1; i++) {
        int x = 0;
        while (i >> x & 1) x++; // 核心：只需覆盖第一个未覆盖的点
        for (int j = 0; j < n; j++) {
            f[i | path[x][j]] = min(f[i | path[x][j]], f[i] + 1);
        }
    }
    cout << f[(1 << n) - 1] << endl;
}
```

</details>

---

## <Scaling className="inline-block mr-2" /> 5. 时空优化与位运算技巧

| 技巧 | 实现 | 效果 |
| :--- | :--- | :--- |
| **Lowbit** | `x & -x` | 提取最低位的 1 |
| **子集枚举** | `for (int s = (U-1)&U; s; s = (s-1)&U)` | $O(3^n)$ 遍历所有子集 |
| **GOSPER'S HACK** | `(x + (x & -x)) | ...` | 枚举大小为 $k$ 的子集 |
| **预处理合法状态** | `if (!(i & (i << 1)))` | 大幅缩减状态搜索空间 |

---

## 延伸挑战

- [洛谷 P1433 吃奶酪](https://www.luogu.com.cn/problem/P1433)
- [洛谷 P1879 玉米地](https://www.luogu.com.cn/problem/P1879)
- [AtCoder ABC 142 F - Pure](https://atcoder.jp/contests/abc142/tasks/abc142_f)
