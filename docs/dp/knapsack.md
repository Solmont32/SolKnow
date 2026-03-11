---
title: 背包问题
---

import { Microscope, Layers, Activity, ShieldCheck, Zap } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 背包问题体系 (Knapsack Problem System)

背包问题是一类经典的组合优化问题，其本质是在**有限约束（容量）下追求目标函数（价值）的最大化**。从数学角度看，它是整数规划（Integer Programming）的特殊形式。

---

<KnowledgeCard type="info" title="数学形式化定义">
    给定 $n$ 个物品，每个物品有重量 $w_i$ 和价值 $v_i$。在总重不超过 $W$ 的前提下，选择变量 $x_i$ 使得：
    $$\text{maximize } \sum_{i=1}^n v_i x_i \quad \text{subject to } \sum_{i=1}^n w_i x_i \le W$$
    根据 $x_i$ 的取值范围，划分为 0/1 背包 ($x_i \in \{0, 1\}$)、完全背包 ($x_i \in \mathbb{N}$) 和多重背包 ($x_i \in \{0, 1, \dots, c_i\}$)。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 核心理论：最优子结构证明

**定理**：0/1 背包问题满足最优子结构性质。

**证明**：设 $S = \{x_1, x_2, \dots, x_n\}$ 是原问题的最优解，其中 $x_i \in \{0, 1\}$ 表示是否选择第 $i$ 个物品。

1.  **若 $x_n = 0$**：则 $S' = \{x_1, \dots, x_{n-1}\}$ 必然是“容量为 $W$，前 $n-1$ 个物品”子问题的最优解。
    - _反证_：若存在更优解 $S''$，则 $S'' \cup \{0\}$ 将优于 $S$，矛盾。
2.  **若 $x_n = 1$**：则 $S' = \{x_1, \dots, x_{n-1}\}$ 必然是“容量为 $W - w_n$，前 $n-1$ 个物品”子问题的最优解。
    - _反证_：若存在更优解 $S''$，则 $S'' \cup \{1\}$ 的总价值将大于 $S$ 的总价值 $\sum_{i=1}^{n-1} v_i x_i + v_n$，矛盾。

---

## <Layers className="inline-block mr-2" /> 2. 状态转移与空间优化推导

### 2.1 0/1 背包：逆序遍历的必然性

**原始方程**：$f[i][j] = \max(f[i-1][j], f[i-1][j-w_i] + v_i)$。
观察发现，$f[i][\dots]$ 仅依赖于 $f[i-1][\dots]$ 且 $j$ 依赖于比它小的索引。
若使用一维数组 $g[j]$：

- 更新 $g[j]$ 时，若我们希望它是 $f[i][j]$，则等号右边的 $g[j-w_i]$ 必须仍代表 $f[i-1][j-w_i]$。
- 如果我们**正序**更新 $j$，那么在更新 $g[j]$ 之前，$g[j-w_i]$ 已经被更新成了 $f[i][j-w_i]$，这违反了 0/1 背包每个物品只能选一次的限制。
- 因此，必须**逆序**更新 $j$，确保依赖的是“上一层”的数据。

### 2.2 完全背包：正序遍历的合理性

**原始方程**：$f[i][j] = \max(f[i-1][j], f[i][j-w_i] + v_i)$。
注意这里的第二项是 $f[i][\dots]$ 而不是 $f[i-1][\dots]$，因为物品可以无限选取。

- 正序更新时，$g[j-w_i]$ 已经更新为当前层 $f[i][j-w_i]$，这恰好符合完全背包“可以重复选取当前物品”的逻辑。

---

## <Zap className="inline-block mr-2" /> 3. 进阶模型：多重背包优化

### 2.1 二进制拆分 ($O(NW \log C)$)

将数量为 $C$ 的物品拆分为 $1, 2, 4, \dots, 2^k, R$ 个物品，其中 $R = C - (2^{k+1}-1)$。这些组合可以凑出 $[0, C]$ 间的任何整数。

### 2.2 单调队列优化 ($O(NW)$)

对于 $f[j] = \max_{0 \le k \le c_i} \{ f[j - k \cdot w_i] + k \cdot v_i \}$。
令 $j = q \cdot w_i + r$，代入得：
$f[q \cdot w_i + r] = \max_{q-c_i \le k \le q} \{ f[k \cdot w_i + r] - k \cdot v_i \} + q \cdot v_i$
这是一个关于 $k$ 的滑动窗口最值问题，可以使用 `std::deque` 在 $O(1)$ 均摊时间内求解。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 综合练习与强化

### 练习 1：多重背包 (单调队列优化)

物品 $i$ 有重量 $w_i$, 价值 $v_i$, 数量 $c_i$。求最大价值。

<details>
<summary>Check Solution (O(NW))</summary>

```cpp
#include <iostream>
#include <vector>
#include <deque>

using namespace std;

int main() {
    int n, m; cin >> n >> m;
    vector<int> f(m + 1, 0), g(m + 1);
    for (int i = 0; i < n; i++) {
        int w, v, c; cin >> w >> v >> c;
        g = f; // 备份上一轮状态
        for (int r = 0; r < w; r++) { // 按余数分组
            deque<int> q;
            for (int j = r; j <= m; j += w) {
                while (!q.empty() && q.front() < j - c * w) q.pop_front();
                while (!q.empty() && g[q.back()] - (q.back() - r) / w * v <= g[j] - (j - r) / w * v)
                    q.pop_back();
                q.push_back(j);
                f[j] = g[q.front()] + (j - q.front()) / w * v;
            }
        }
    }
    cout << f[m] << endl;
    return 0;
}
```

</details>

### 练习 2：二维费用背包 (Two-Dimensional Constraints)

物品有重量 $w_i$ 和体积 $v_i$，背包容量 $W$ 和最大体积 $V$。

<details>
<summary>Check Solution</summary>

```cpp
// 状态定义：f[i][j] 为重 i 且体 j 的最大价值
for (int i = 0; i < n; i++) {
    for (int j = W; j >= w[i]; j--) {
        for (int k = V; k >= v[i]; k--) {
            f[j][k] = max(f[j][k], f[j - w[i]][k - v[i]] + val[i]);
        }
    }
}
```

_解析：由于是 0/1 背包，两个维度均需逆序遍历。_

</details>

---

## 延伸挑战

- [洛谷 P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776)（单调队列练习）
- [洛谷 P1833 樱花](https://www.luogu.com.cn/problem/P1833)（混合背包）
- [HDU 2191 多重背包模板](http://acm.hdu.edu.cn/showproblem.php?pid=2191)
