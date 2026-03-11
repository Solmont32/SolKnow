---
title: 状压 DP
---

import { Binary, Grid, Zap, ShieldCheck } from 'lucide-react';

# 状态压缩动态规划 (State Compression DP)

状压 DP 是一种将“集合”或“某种复杂的组合状态”压缩为一个整数（通常利用二进制位）作为 DP 状态的技巧。它通常用于解决 $N$ 较小（通常 $N \le 20$）但搜索空间巨大的组合优化问题。

---

## <Binary className="inline-block mr-2" /> 1. 位运算基础 (Bitwise Primitives)

在状压 DP 中，整数 $S$ 的第 $i$ 位（从 0 开始）代表第 $i$ 个元素的状态。

| 操作 | 位运算表达式 |
| :--- | :--- |
| **查询第 $i$ 位** | `(S >> i) & 1` |
| **将第 $i$ 位置为 1** | `S |= (1 << i)` |
| **将第 $i$ 位置为 0** | `S &= ~(1 << i)` |
| **取反第 $i$ 位** | `S ^= (1 << i)` |
| **全集 (大小为 $n$)** | `(1 << n) - 1` |
| **枚举 $S$ 的子集** | `for (int sub = S; sub; sub = (sub - 1) & S)` |

---

## <Grid className="inline-block mr-2" /> 2. 经典模型 I：旅行商问题 (TSP)

**问题描述**：给定 $n$ 个点及两两之间的距离，求一条经过每个点恰好一次的最短路径。

### 状态设计
- $f[S][i]$：当前已访问的点集为 $S$（二进制表示），且当前处于点 $i$ 的最短路径长度。

### 转移方程
$$f[S][i] = \min_{j \in S, j \neq i} \{ f[S \setminus \{i\}][j] + dist(j, i) \}$$

### 复杂度
- 状态数：$n \cdot 2^n$。
- 转移代价：$O(n)$。
- 总时间复杂度：$O(n^2 2^n)$。

---

## <Zap className="inline-block mr-2" /> 3. 经典模型 II：棋盘覆盖 (Mondrian's Dream)

**问题描述**：用 $1 \times 2$ 的多米诺骨牌填满 $N \times M$ 的棋盘，求方案数。

### 核心思想
按列（或按行）枚举状态。$f[i][S]$ 表示第 $i$ 列的覆盖状态为 $S$，且它对第 $i+1$ 列产生的影响。
- **状态压缩**：$S$ 中的 1 表示第 $i$ 列的某个格子由第 $i-1$ 列的横放骨牌覆盖。

---

## <ShieldCheck className="inline-block mr-2" /> 综合练习与强化

### 练习 1：最短 Hamilton 路径
给定一张带权图，求从 0 到 $n-1$ 经过每个点恰好一次的最短路径。

<details>
<summary>Check Solution</summary>

```cpp
memset(f, 0x3f, sizeof f);
f[1][0] = 0; // 初始状态：只访问了点 0
for (int s = 1; s < (1 << n); s++) {
    for (int i = 0; i < n; i++) {
        if ((s >> i) & 1) { // 如果当前集合包含点 i
            for (int j = 0; j < n; j++) {
                if (((s >> j) & 1) && j != i) { // 枚举前驱点 j
                    f[s][i] = min(f[s][i], f[s ^ (1 << i)][j] + dist[j][i]);
                }
            }
        }
    }
}
printf("%d\n", f[(1 << n) - 1][n - 1]);
```
</details>

### 练习 2：集合划分 (Subset DP / SOS DP 初探)
给定 $n$ 个任务和其相容关系，将任务划分为最少数量的互不冲突的集合。

<details>
<summary>Check Solution</summary>

**预处理**：`valid[S]` 表示集合 $S$ 内的所有任务是否互不冲突。
**转移**：
$$f[S] = \min_{sub \subseteq S, valid[sub]} \{ f[S \setminus sub] + 1 \}$$
使用子集枚举优化可达到 $O(3^n)$。
</details>

---

## 延伸挑战
- [洛谷 P1171 售货员的难题](https://www.luogu.com.cn/problem/P1171) (TSP)
- [洛谷 P1879 [USACO06NOV] Corn Fields G](https://www.luogu.com.cn/problem/P1879) (棋盘型状压)
- [洛谷 P2704 [NOI2001] 炮兵阵地](https://www.luogu.com.cn/problem/P2704) (多行关联状压)
- [Codeforces 11D A Simple Task](https://codeforces.com/contest/11/problem/D) (环计数)
