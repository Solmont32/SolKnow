---
title: 状压 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 状态压缩动态规划 (State Compression DP)

状压 DP 是一类特殊的动态规划，其核心思想是利用**位运算**将集合状态（如“哪些元素已被选中”）压缩成一个整数，从而将其作为 DP 的一个维度。它通常用于解决 $N$ 较小（一般 $N \le 20$）但具有指数级解空间的问题。

---

<KnowledgeCard type="info" title="集合与二进制的映射">
    对于集合 $S \subseteq \{0, 1, \dots, n-1\}$，我们可以用一个 $n$ 位二进制数 $x$ 表示：
    - $i \in S \iff (x \gg i) \& 1 = 1$
    - $S_1 \cup S_2 \iff x_1 | x_2$
    - $S_1 \setminus \{i\} \iff x_1 \oplus (1 \ll i)$
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 经典模型：哈密顿路径 (Hamiltonian Path)

**问题**：给定 $n$ 个点及其间的边权，求从点 0 到点 $n-1$ 经过每个点恰好一次的最短路径。

### 状态设计
$f[state][i]$ 表示当前已访问点的集合为 $state$，且当前处于点 $i$ 的最短路径长度。

### 转移方程
$$f[state][i] = \min_{j \in state, j \neq i} \{ f[state \setminus \{i\}][j] + dist(j, i) \}$$
其中 $state \setminus \{i\}$ 可表示为 `state ^ (1 << i)`。

### 复杂度
- 状态数：$2^n \cdot n$。
- 转移：$O(n)$。
- 总计：$O(2^n \cdot n^2)$。对比朴素排列搜索的 $O(n!)$，优化显著。

---

## <Zap className="inline-block mr-2" /> 2. 工业级位运算技巧

在状压 DP 中，高效的位运算是性能的关键：
- `__builtin_popcount(x)`：统计 $x$ 中 1 的个数。
- `x & -x` (Lowbit)：提取 $x$ 的最低位 1。
- `for (int i = s; i; i = (i - 1) & s)`：**高效遍历子集**（复杂度 $O(3^n)$ 而非 $O(4^n)$）。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 综合练习与强化

### 练习 1：最短 Hamilton 路径
给定权值矩阵，求从 0 到 $n-1$ 的最短 Hamilton 路径。

<details>
<summary>Check Solution (O(2^n * n^2))</summary>

```cpp
#include <iostream>
#include <vector>
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
    f[1][0] = 0; // 初始状态：只访问了 0 号点，且停在 0 号点

    for (int i = 1; i < (1 << n); i++) {
        for (int j = 0; j < n; j++) {
            if ((i >> j) & 1) { // 如果当前集合包含 j
                for (int k = 0; k < n; k++) {
                    if ((i >> k) & 1 && k != j) { // 尝试从前一个点 k 转移
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
<summary>Check Solution</summary>

**核心逻辑**：
$f[i][j]$ 表示第 $i$ 列的状态为 $j$（$j$ 的某位为 1 表示由第 $i-1$ 列横插过来的）。
1.  横放确定后，剩下的空位必须能由竖放填满（即连续的空位必须是偶数）。
2.  相邻两列状态必须兼容：`(j & k) == 0`。

```cpp
// 预处理合法状态
for (int i = 0; i < (1 << n); i++) {
    int cnt = 0;
    bool isValid = true;
    for (int j = 0; j < n; j++) {
        if ((i >> j) & 1) {
            if (cnt & 1) isValid = false;
            cnt = 0;
        } else cnt++;
    }
    if (cnt & 1) isValid = false;
    st[i] = isValid;
}
```
</details>

---

## 延伸挑战
- [洛谷 P1879 [USACO06NOV] Corn Fields G](https://www.luogu.com.cn/problem/P1879)（基础状压）
- [洛谷 P2704 [NOI2001] 炮兵阵地](https://www.luogu.com.cn/problem/P2704)（三进制/多行依赖状压）
- [POJ 2411 Mondriaan's Dream](http://poj.org/problem?id=2411)
