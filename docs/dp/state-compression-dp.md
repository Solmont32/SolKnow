# 状态压缩动态规划 (State Compression DP)

import { Cpu, Layout, Layers, Lightbulb, Binary, Share2, Microscope, Activity, ShieldCheck } from 'lucide-react';

状态压缩 DP 是一种利用位运算将一个集合、一种配置或某种棋盘格局压缩成一个整数，并将其作为 DP 状态的一部分的方法。其核心在于将 **指数级搜索空间** 转化为 **多项式级别（通常是 $2^N \cdot \text{poly}(N)$）的动态规划**。

---

## <Microscope className="inline-block mr-2" /> 核心位运算技巧

在状态压缩中，我们通常使用一个二进制数 $S$ 来表示一个集合。

### 1. 基础集合操作
| 操作 | 代码实现 | 数学含义 |
| :--- | :--- | :--- |
| **检查元素 $i$** | `(S >> i) & 1` | $i \in S$ |
| **加入元素 $i$** | `S | (1 << i)` | $S \cup \{i\}$ |
| **移除元素 $i$** | `S & ~(1 << i)` | $S \setminus \{i\}$ |
| **全集** | `(1 << n) - 1` | $U = \{0, 1, \dots, n-1\}$ |

### 2. 枚举子集 (Subset Enumeration)
高效枚举 $S$ 的所有子集 $sub$：
```cpp
for (int sub = S; sub; sub = (sub - 1) & S) { 
    // Complexity: Total sum over all S is O(3^N)
}
```

---

## <Activity className="inline-block mr-2" /> 复杂度矩阵

| 模式 | 状态空间 | 转移开销 | 总时间复杂度 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **排列型状压** | $O(2^N \cdot N)$ | $O(N)$ | $O(2^N \cdot N^2)$ | TSP, 最短 Hamilton 路径 |
| **棋盘型状压** | $O(M \cdot 2^N)$ | $O(2^N)$ | $O(M \cdot 4^N) \to O(M \cdot 3^N)$ | 互不侵犯, 炮兵阵地 |
| **子集卷积 (SOS)** | $O(2^N)$ | $O(N)$ | $O(N \cdot 2^N)$ | 高维前缀和, 集合卷积 |

---

## <ShieldCheck className="inline-block mr-2" /> 典型建模范式

### 1. 棋盘相邻约束 (Grid Constraints)
状态定义 $f[i][S]$ 表示第 $i$ 行的选择状态为 $S$。
- **行内合法**：`!(S & (S << 1))`。
- **行间合法**：`!(S & prev_S)`。

### 2. 集合划分 (Set Partitioning)
状态定义 $f[S]$ 表示完成集合 $S$ 中的任务所需的最少资源。
- **转移**：$f[S] = \min_{sub \subseteq S} \{ f[S \setminus sub] + \text{cost}(sub) \}$。

---

## <ShieldCheck className="inline-block mr-2" /> 完备例题解答

### 例题 1：最短 Hamilton 路径 (TSP Variant)

<details>
<summary>Check Solution (C++)</summary>

```cpp
// f[S][i] 表示当前访问点集为 S，且当前位于点 i
for (int i = 1; i < (1 << n); i++) {
    for (int j = 0; j < n; j++) {
        if ((i >> j) & 1) { 
            for (int k = 0; k < n; k++) {
                if (((i ^ (1 << j)) >> k) & 1) 
                    f[i][j] = min(f[i][j], f[i ^ (1 << j)][k] + w[k][j]);
            }
        }
    }
}
```
</details>

### 例题 2：炮兵阵地 (Three-row Dependency)

<details>
<summary>Check Solution (C++)</summary>

由于炮兵射程为 2，当前行状态受前二行约束。
**状态**：$f[i][S_{curr}][S_{prev}]$。
**优化**：预处理单行合法状态，空间开销可大幅降低。
</details>

---

## 延伸挑战
- [洛谷 P1879 玉米地](https://www.luogu.com.cn/problem/P1879)
- [洛谷 P2704 [NOI2001] 炮兵阵地](https://www.luogu.com.cn/problem/P2704)
- [洛谷 P1896 [SCOI2005] 互不侵犯](https://www.luogu.com.cn/problem/P1896)
- [CF 11D A Simple Task](https://codeforces.com/contest/11/problem/D)（统计简单环）
