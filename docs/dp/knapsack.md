---
title: 背包问题
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, PackageOpen, ShoppingBag, Archive } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 背包问题体系 (Knapsack Problem System)

背包问题是一类经典的组合优化问题，其本质是在**有限约束（容量）下追求目标函数（价值）的最大化**。从数学角度看，它是整数规划 (Integer Programming) 的特殊形式，且通常是 NP-Hard 的。

---

<KnowledgeCard type="info" title="数学形式化定义">
    给定 $n$ 个物品，每个物品有重量 $w_i$ 和价值 $v_i$。在总重不超过 $W$ 的前提下，选择变量 $x_i$ 使得：
    $$\text{maximize } \sum_{i=1}^n v_i x_i \quad \text{subject to } \sum_{i=1}^n w_i x_i \le W$$
    根据 $x_i$ 的取值范围，划分为：
    - **0/1 背包**：$x_i \in \{0, 1\}$
    - **完全背包**：$x_i \in \mathbb{N}$
    - **多重背包**：$x_i \in \{0, 1, \dots, c_i\}$
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 核心理论：最优子结构证明

**定理**：0/1 背包问题满足最优子结构。

**证明**：设 $S = \{x_1, \dots, x_n\}$ 为最优解。

1. **若 $x_n = 0$**：则前 $n-1$ 个物品在容量 $W$ 下的最优解必然也是 $S \setminus \{x_n\}$。若存在更优解 $S'$，则 $S' \cup \{0\}$ 将优于 $S$，矛盾。
2. **若 $x_n = 1$**：则前 $n-1$ 个物品在容量 $W - w_n$ 下的最优解必然也是 $S \setminus \{x_n\}$。若存在更优解 $S'$，则 $S' \cup \{1\}$ 将优于 $S$，矛盾。

---

## <Layers className="inline-block mr-2" /> 2. 状态转移与空间优化推导

### 2.1 0/1 背包：逆序遍历的必然性

**方程**：$f[i][j] = \max(f[i-1][j], f[i-1][j-w_i] + v_i)$。
若使用一维数组 $g[j]$：为了保证 $g[j-w_i]$ 代表的是“上一层” $f[i-1]$ 的值，必须从 $W$ 逆序遍历到 $w_i$。

### 2.2 完全背包：正序遍历的合理性

**方程**：$f[i][j] = \max(f[i-1][j], f[i][j-w_i] + v_i)$。
由于每个物品可无限选，当前状态 $f[i][j]$ 本就依赖于当前行 $f[i][\dots]$，故必须正序遍历。

---

## <Zap className="inline-block mr-2" /> 3. 进阶模型：多重背包优化

### 3.1 二进制拆分 ($O(NW \log C)$)

将数量为 $C$ 的物品拆分为权重为 $1, 2, 4 \dots 2^k, R$ 的若干 0/1 背包物品。这些权重可以组合出 $[0, C]$ 间的任何整数。

### 3.2 单调队列优化 ($O(NW)$)

利用 $f[j] = \max \{ f[j - k \cdot w_i] + k \cdot v_i \}$。通过对 $j \pmod{w_i}$ 分组，将每一组转化为滑动窗口最值问题。

---

## <ShieldCheck className="inline-block mr-2" /> 4. 综合练习与强化

### 练习 1：0/1 背包 (经典)

<details>
<summary>Check Solution (O(W) Space)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n, m; cin >> n >> m;
    vector<int> f(m + 1, 0);
    for (int i = 0; i < n; i++) {
        int w, v; cin >> w >> v;
        for (int j = m; j >= w; j--)
            f[j] = max(f[j], f[j - w] + v);
    }
    cout << f[m] << endl;
    return 0;
}
```

</details>

### 练习 2：完全背包

<details>
<summary>Check Solution (Positive Order)</summary>

```cpp
for (int i = 0; i < n; i++) {
    int w, v; cin >> w >> v;
    for (int j = w; j <= m; j++)
        f[j] = max(f[j], f[j - w] + v);
}
```

</details>

### 练习 3：多重背包 (单调队列优化)

<details>
<summary>Check Solution (O(NW))</summary>

```cpp
for (int r = 0; r < w; r++) { // 余数分组
    deque<int> q;
    for (int j = r; j <= m; j += w) {
        while (!q.empty() && q.front() < j - c * w) q.pop_front();
        while (!q.empty() && g[q.back()] - (q.back() - r) / w * v <= g[j] - (j - r) / w * v)
            q.pop_back();
        q.push_back(j);
        f[j] = g[q.front()] + (j - q.front()) / w * v;
    }
}
```

</details>

### 练习 4：二维费用背包

物品有重量 $w$ 和体积 $v$，背包有承重 $W$ 和容积 $V$。

<details>
<summary>Check Solution</summary>

```cpp
for (int j = W; j >= w[i]; j--)
    for (int k = V; k >= v[i]; k--)
        f[j][k] = max(f[j][k], f[j - w[i]][k - v[i]] + val[i]);
```

</details>

---

## 延伸挑战

- [洛谷 P1060 采药](https://www.luogu.com.cn/problem/P1060) (0/1 背包)
- [洛谷 P1616 疯狂的采药](https://www.luogu.com.cn/problem/P1616) (完全背包)
- [洛谷 P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776) (多重背包优化)
