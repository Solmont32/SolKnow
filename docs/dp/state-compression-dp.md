---
title: 状压 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Binary, Grid, Target, CheckCircle2 } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 状态压缩动态规划 (State Compression DP)

状压 DP 是一类利用**位运算**将指数级的集合状态映射为整数维度的动态规划。它通常应用于 $N$ 较小（$N \le 22$）且子问题具有高度重叠性的组合优化问题。

---

## <Microscope className="inline-block mr-2" /> 1. 形式化建模：映射与验证

### 1.1 集合状态的封闭性与映射 (Mapping)

设全集 $U = \{0, 1, \dots, n-1\}$。任何子集 $S \subseteq U$ 可唯一映射为整数 $x = \sum_{i \in S} 2^i$。
位运算为集合操作提供了 $O(1)$ 的封闭映射：
- $i \in S \iff (x \gg i) \& 1$
- $S \cup \{i\} \iff x | (1 \ll i)$
- $S \setminus \{i\} \iff x \oplus (1 \ll i)$

### 1.2 无后效性 (No-after-effect) 逻辑验证

**验证命题**：在处理当前集合 $S$ 时，最优解仅取决于 $S$ 内元素的组合属性，而与这些元素被加入集合的先后顺序无关。

<div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
  <p className="font-bold flex items-center"><CheckCircle2 className="mr-2 text-blue-500" /> 验证实例：TSP (旅行商问题)</p>
  <p>在 TSP 中，$dp[S][i]$ 表示已访问城市集合为 $S$ 且当前处于城市 $i$ 的最小代价。只要 $S$ 和 $i$ 确定，后续访问剩余城市的代价仅取决于 $U \setminus S$，而与之前是如何穿过 $S$ 中城市的历史路径完全解耦。这满足无后效性。</p>
</div>

---

## <Layers className="inline-block mr-2" /> 2. 状态转移方程的导出

状压 DP 的演进本质上是**集合规模的递增**。

### 2.1 路径/排列类 (Hamiltonian Path)
$$dp[S][i] = \min_{j \in S, j \neq i} \{ dp[S \oplus (1 \ll i)][j] + \text{dist}(j, i) \}$$
*导出逻辑*：要使当前状态为 $(S, i)$，上一个状态必然访问了 $S \setminus \{i\}$ 中的点，且最后停留在某个 $j$ 点。

### 2.2 棋盘/覆盖类 (Grid Filling)
$$dp[i][S] = \sum_{S'} dp[i-1][S'] \quad (\text{if } S \text{ is compatible with } S')$$
*导出逻辑*：第 $i$ 行的状态 $S$ 仅由第 $i-1$ 行的兼容状态 $S'$ 转移而来，通过预处理兼容性矩阵可显著提速。

---

## <Binary className="inline-block mr-2" /> 3. 进阶技巧：子集枚举优化

对于涉及“划分集合”的问题，需要枚举 $S$ 的所有非空子集 $s$。
$$dp[S] = \max_{s \subset S} \{ dp[S \setminus s] + \text{cost}(s) \}$$

**高效枚举实现**：
```cpp
for (int s = S; s; s = (s - 1) & S) {
    // s 是 S 的子集，时间复杂度总计 O(3^N)
}
```

---

## <ShieldCheck className="inline-block mr-2" /> 4. 综合练习与严谨实现

### 练习 1：最短 Hamilton 路径 (TSP Base)

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>

using namespace std;

int f[1 << 20][20], d[20][20];

/**
 * @brief Hamiltonian Path Implementation
 * Time: O(2^N * N^2)
 */
int main() {
    int n; cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) cin >> d[i][j];

    memset(f, 0x3f, sizeof f);
    f[1][0] = 0; // Start at point 0

    for (int i = 1; i < (1 << n); i++) {
        for (int j = 0; j < n; j++) {
            if ((i >> j) & 1) { // Current end point j
                for (int k = 0; k < n; k++) {
                    if ((i ^ (1 << j)) >> k & 1) { // Prev end point k
                        f[i][j] = min(f[i][j], f[i ^ (1 << j)][k] + d[k][j]);
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

---

## 延伸挑战

- [洛谷 P1433 吃奶酪 (基础状压)](https://www.luogu.com.cn/problem/P1433)
- [洛谷 P1879 [USACO06NOV] Corn Fields G](https://www.luogu.com.cn/problem/P1879)
- [洛谷 P3959 [NOIP2017 提高组] 宝藏 (子集枚举优化)](https://www.luogu.com.cn/problem/P3959)
