# 背包问题体系 (Knapsack Problem System)

import { Microscope, Layers, Activity, ShieldCheck } from 'lucide-react';

背包问题是一类经典的组合优化问题，其本质是在**有限约束（容量）下追求目标函数（价值）的最大化**。从数学角度看，它是线性规划在整数域上的一个分支。

---

## <Microscope className="inline-block mr-2" /> 核心建模范式

### 1. 状态定义 (State Representation)
$f[i][j]$ 表示在前 $i$ 件物品中进行决策，且总体积不超过 $j$ 的最大价值。
- **目标函数**：$\max \{ \sum v_k \cdot x_k \}$。
- **约束条件**：$\sum w_k \cdot x_k \le W$。

### 2. 转移推导逻辑 (Transition Logic)
核心在于对“第 $i$ 件物品”的处理决策：
- **不选**：$f[i][j] = f[i-1][j]$。
- **选 $k$ 个**：$f[i][j] = f[i-1][j - k \cdot w_i] + k \cdot v_i$。

---

## <Layers className="inline-block mr-2" /> 经典模型深度解析

### 1. 0/1 背包：每种物品仅一件 ($x_i \in \{0, 1\}$)
**转移方程**：$f[i][j] = \max(f[i-1][j], f[i-1][j-w_i] + v_i)$。
- **优化**：使用一维数组 `f[j]`，为了保证依赖的是“上一轮”状态，必须**倒序遍历** $j$。

### 2. 完全背包：物品无限量 ($x_i \ge 0$)
**转移方程**：$f[i][j] = \max(f[i-1][j], f[i][j-w_i] + v_i)$。
- **优化**：使用一维数组 `f[j]`，为了让当前轮次的更新能被后续状态复用，必须**正序遍历** $j$。

### 3. 多重背包：物品有限量 ($0 \le x_i \le c_i$)
**优化路径 1：二进制拆分 ($O(NW \log C)$)**
将 $c_i$ 拆分为 $1, 2, 4, \dots, 2^k, R$，将其转化为 $\sum \log c_i$ 个 0/1 背包物品。

**优化路径 2：单调队列 ($O(NW)$)**
利用余数分组：$j = q \cdot w_i + r$。
$$f[q \cdot w_i + r] = \max_{q-c_i \le k \le q} \{ f[k \cdot w_i + r] - k \cdot v_i \} + q \cdot v_i$$
该方程在每一组余数 $r$ 下都是一个**滑动窗口最值**问题。

---

## <Activity className="inline-block mr-2" /> 复杂度矩阵

| 模式 | 状态空间 | 转移开销 | 总时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **0/1 背包** | $O(W)$ | $O(1)$ | $O(NW)$ | $O(W)$ |
| **完全背包** | $O(W)$ | $O(1)$ | $O(NW)$ | $O(W)$ |
| **多重背包 (拆分)** | $O(W)$ | $O(\log C)$ | $O(NW \log C)$ | $O(W)$ |
| **多重背包 (队列)** | $O(W)$ | $O(1)$ (均摊) | $O(NW)$ | $O(W)$ |

---

## <ShieldCheck className="inline-block mr-2" /> 综合练习与强化

### 练习 1：恰好装满 vs 不超过 (Boundary Condition)
若要求背包**必须恰好装满**，在求最大价值时初值应如何设定？

<details>
<summary>Check Solution</summary>

- `f[0] = 0`：容量为 0 恰好装满的价值为 0。
- `f[1...W] = -INF`：其余容量初始均为非法态。
这样只有从 $f[0]$ 出发且最终到达 $f[W]$ 的路径才是合法解。
</details>

### 练习 2：分组背包 (Grouped Knapsack)
每组物品互斥（每组最多选一个）。

<details>
<summary>Check Solution</summary>

**遍历序至关重要**：
```cpp
for (int g = 1; g <= G; g++) { // 1. 枚举组
    for (int j = W; j >= 0; j--) { // 2. 倒序枚举容量
        for (int i : group[g]) { // 3. 枚举组内物品
            if (j >= w[i]) f[j] = max(f[j], f[j - w[i]] + v[i]);
        }
    }
}
```
*注意：组内枚举必须在容量循环内部，且容量必须倒序，以确保每组内只发生一次转移。*
</details>

### 练习 3：方案总数
凑成重量 $W$ 的组合数。

<details>
<summary>Check Solution</summary>

- **状态**：$f[j]$ 表示重量为 $j$ 的方案数。
- **初值**：$f[0] = 1$。
- **转移**：$f[j] = (f[j] + f[j - w_i]) \pmod M$。
</details>

---

## 延伸挑战
- [洛谷 P1064 金明的预算方案](https://www.luogu.com.cn/problem/P1064)
- [HDU 2191 多重背包模板](http://acm.hdu.edu.cn/showproblem.php?pid=2191)
- [洛谷 P1776 宝物筛选](https://www.luogu.com.cn/problem/P1776)（单调队列优化练习）
