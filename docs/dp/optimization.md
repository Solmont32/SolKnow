---
title: 动态规划优化策略
---

import { TrendingUp, Maximize2, Zap, GitBranch, LineChart, Activity } from 'lucide-react';

# 动态规划优化策略 (DP Optimization)

在面对高复杂度 DP 方程（如 $O(N^2)$ 或 $O(N^3)$）且数据范围较大时，我们必须寻找优化手段。核心在于 **消除多余计算**、**利用数学性质** 或 **引入高效数据结构**。

---

## <TrendingUp className="inline-block mr-2" /> 1. 单调队列优化 (Monotonic Queue)

**适用范围**：转移方程中只包含关于 $j$ 的线性项，且 $j$ 的取值范围随 $i$ 单调滑动。
$$f[i] = \min_{L_i \le j \le R_i} \{ g[j] \} + \text{cost}(i)$$
其中 $L_i, R_i$ 随 $i$ 递增。通过单调队列维护 $g[j]$ 的最优值，可将 $O(N^2)$ 降低至 $O(N)$。

---

## <Maximize2 className="inline-block mr-2" /> 2. 斜率优化 (Convex Hull Trick)

**适用场景**：转移方程可转化为直线的截距式 $y = kx + b$。
$$f[i] = \min_{j < i} \{ f[j] + \text{cost}(j, i) \}$$
若展开后存在 $A(i) \cdot B(j)$ 这种 **混合项**，通常考虑斜率优化。

### 数学推导与凸壳维护
以 $f[i] = \min_{j < i} \{ f[j] + (s_i - s_j)^2 + M \}$ 为例：
展开：$f[i] = f[j] + s_i^2 - 2s_is_j + s_j^2 + M$
移项整理为 $y = kx + b$ 形式：
$$\underbrace{f[j] + s_j^2}_{y_j} = \underbrace{2s_i}_{k_i} \cdot \underbrace{s_j}_{x_j} + \underbrace{f[i] - s_i^2 - M}_{b_i}$$
目标是最小化截距 $b_i$。我们将 $(x_j, y_j)$ 视为平面点，用斜率为 $k_i$ 的直线去接触这些点，维护一个 **下凸壳**。

### 复杂度分析
- **$k_i, x_j$ 均单调**：单调队列维护，时空 $O(N)$。
- **仅 $x_j$ 单调**：在凸壳上二分查找最优决策点，$O(N \log N)$。
- **均不单调**：使用 **李超线段树 (Li-Chao Tree)** 或 CDQ 分治维护，$O(N \log N)$。

---

## <Activity className="inline-block mr-2" /> 3. 决策单调性优化

**性质**：若对于 $f[i] = \min_{j < i} \{ f[j] + w(j, i) \}$，设 $p[i]$ 为 $f[i]$ 的最优决策点 $j$，若满足 $p[i] \le p[i+1]$，则称该 DP 具有决策单调性。

### 优化方法
1. **二分栈/分治**：适用于 $w(j, i)$ 仅取决于 $j$ 和 $i$ 且满足四边形不等式的情况。
2. **分治优化**：适用于层级转移 $f[k][i] = \min \{ f[k-1][j] + w(j, i) \}$，复杂度 $O(KN \log N)$。

---

## <Zap className="inline-block mr-2" /> 4. 四边形不等式 (Quadrangle Inequality)

**定义**：若代价函数 $w(i, j)$ 满足对于任意 $a \le b \le c \le d$，有：
$$w(a, c) + w(b, d) \le w(a, d) + w(b, c)$$
（交叉小于包含）。在区间 DP 中，若 $w$ 满足四边形不等式，则最优断点 $s[i][j]$ 满足 $s[i][j-1] \le s[i][j] \le s[i+1][j]$，复杂度从 $O(N^3)$ 降至 $O(N^2)$。

---

## <LineChart className="inline-block mr-2" /> 完备例题解答

### 例题 1：玩具装箱 (Luogu P3195) - 斜率优化
**题目**：将 $n$ 个玩具分段装箱，每段长度 $L$，超出部分产生费用 $(len-L)^2$，求最小总费用。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
using namespace std;

typedef long long ll;
const int N = 50005;
ll n, L;
ll s[N], f[N];
int q[N];

double get_slope(int j1, int j2) {
    ll y1 = f[j1] + (s[j1] + L) * (s[j1] + L);
    ll y2 = f[j2] + (s[j2] + L) * (s[j2] + L);
    ll x1 = s[j1], x2 = s[j2];
    return (double)(y2 - y1) / (x2 - x1);
}

int main() {
    cin >> n >> L;
    L++; // 统一计算 (s[i] - s[j] + i - j - 1 - L)^2 为 (s[i]+i - (s[j]+j) - (L+1))^2
    for (int i = 1; i <= n; i++) cin >> s[i], s[i] += s[i - 1] + i;

    int hh = 0, tt = 0;
    q[0] = 0;
    for (int i = 1; i <= n; i++) {
        while (hh < tt && get_slope(q[hh], q[hh + 1]) <= 2 * s[i]) hh++;
        int j = q[hh];
        f[i] = f[j] + (s[i] - s[j] - L) * (s[i] - s[j] - L);
        while (hh < tt && get_slope(q[tt - 1], q[tt]) >= get_slope(q[tt], i)) tt--;
        q[++tt] = i;
    }
    cout << f[n] << endl;
    return 0;
}
```
</details>

### 例题 2：诗人小 G (Luogu P1912) - 决策单调性
**题目**：分段使得每段长度接近 $L$，代价为 $|len-L|^P$。$P$ 较大，不满足斜率优化，但满足决策单调性。

<details>
<summary>Check Solution (C++ / 关键逻辑)</summary>

```cpp
// 核心思想：使用二分栈维护每个决策点的覆盖范围
struct Node { int j, l, r; };
Node q[N];
// 在队列中查找 i 的最优决策点
int hh = 0, tt = 0;
q[0] = {0, 1, n};
for (int i = 1; i <= n; i++) {
    while (hh < tt && q[hh].r < i) hh++;
    f[i] = calc(q[hh].j, i);
    // 更新决策范围：在队列尾部二分找到 i 能覆盖的最小位置
    while (hh <= tt && calc(i, q[tt].l) <= calc(q[tt].j, q[tt].l)) tt--;
    if (hh <= tt) {
        int l = q[tt].l, r = q[tt].r, pos = q[tt].r + 1;
        while (l <= r) {
            int mid = (l + r) >> 1;
            if (calc(i, mid) <= calc(q[tt].j, mid)) pos = mid, r = mid - 1;
            else l = mid + 1;
        }
        if (pos <= n) q[tt].r = pos - 1, q[++tt] = {i, pos, n};
    } else q[++tt] = {i, i + 1, n};
}
```
</details>

---

## 练习强化
1. **[Luogu P3628] 特别行动队**：斜率优化基础。
2. **[Luogu P4767] 邮局**：四边形不等式优化区间 DP。
3. **[Luogu P3360] 任务安排 3**：斜率不单调，需二分或李超线段树。
4. **[CF 321E] Ciel and Gondolas**：分治优化决策单调性。
