---
title: 动态规划优化策略
---

import { TrendingUp, Maximize2, Zap, GitBranch } from 'lucide-react';

# 动态规划优化策略 (DP Optimization)

在面对高复杂度 DP 方程（如 $O(N^2)$ 或 $O(N^3)$）且数据范围较大时，我们必须寻找优化手段。核心在于 **消除多余计算**、**利用数学性质** 或 **引入高效数据结构**。

---

## <TrendingUp className="inline-block mr-2" /> 1. 单调队列优化 (Monotonic Queue)

**适用范围**：转移方程中只包含关于 $j$ 的线性项，且 $j$ 的取值范围随 $i$ 单调滑动。
$$f[i] = \min_{L_i \le j \le R_i} \{ g[j] \} + \text{cost}(i)$$
其中 $L_i, R_i$ 随 $i$ 递增。

**核心思想**：利用单调队列维护区间 $[L_i, R_i]$ 内 $g[j]$ 的最小值。

<details>
<summary>例题：最大连续子段和（长度不超过 M）</summary>

$$f[i] = \max_{i-M \le j < i} \{ S[i] - S[j] \} = S[i] - \min_{i-M \le j < i} \{ S[j] \}$$
```cpp
deque<int> q;
q.push_back(0);
for (int i = 1; i <= n; i++) {
    while (!q.empty() && q.front() < i - m) q.pop_front();
    res = max(res, s[i] - s[q.front()]);
    while (!q.empty() && s[q.back()] >= s[i]) q.pop_back();
    q.push_back(i);
}
```
</details>

---

## <Maximize2 className="inline-block mr-2" /> 2. 斜率优化 (Convex Hull Trick)

**适用范围**：转移方程可转化为直线的截距式 $y = kx + b$。
$$f[i] = \min_{j < i} \{ f[j] + \text{cost}(j, i) \}$$
若展开后存在 $S[i] \cdot S[j]$ 这种 **混合项**，通常考虑斜率优化。

**数学推导**：
以 $f[i] = \min_{j < i} \{ f[j] + (S[i] - S[j])^2 + M \}$ 为例：
展开并移项：
$$\underbrace{f[j] + S[j]^2}_{y_j} = \underbrace{2 S[i]}_{k_i} \cdot \underbrace{S[j]}_{x_j} + \underbrace{f[i] - S[i]^2 - M}_{b_i}$$
目标是最小化截距 $b_i$。我们将 $(x_j, y_j)$ 看作平面上的点，用一条斜率为 $k_i$ 的直线去接触这些点，维护一个 **下凸壳**。

**关键判断**：
- 若 $k_i$ 和 $x_j$ 均单调，使用单调队列维护凸壳，$O(N)$。
- 若只有 $x_j$ 单调，在凸壳上二分查找最优决策点，$O(N \log N)$。
- 若都不单调，使用李超线段树或平衡树维护动态凸壳。

---

## <Zap className="inline-block mr-2" /> 3. 四边形不等式 (Quadrangle Inequality)

**定义**：若代价函数 $w(i, j)$ 满足对于任意 $a \le b \le c \le d$，有：
$$w(a, c) + w(b, d) \le w(a, d) + w(b, c)$$
则称 $w$ 满足四边形不等式（交叉小于包含）。

**优化效果**：
在区间 DP $f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + w(i, j) \}$ 中，若 $w$ 满足四边形不等式且满足区间包含单调性，则最优断点 $s[i][j]$ 满足：
$$s[i][j-1] \le s[i][j] \le s[i+1][j]$$
**复杂度**：从 $O(N^3)$ 降低至 $O(N^2)$。

---

## <GitBranch className="inline-block mr-2" /> 4. WQS 二分 (Aliens Trick)

**适用场景**：
限制选取 $K$ 个元素，且设 $g(x)$ 为选取 $x$ 个元素时的最优解，函数 $g(x)$ 满足 **凸性**。

**核心思想**：
通过二分斜率 $C$（给每个选取的元素附加代价），去掉“恰好选 $K$ 个”的限制。
$$f(C) = \max \{ g(x) - C \cdot x \}$$
当二分出的 $C$ 使得最优解选取的个数恰好为 $K$ 时，即可求得 $g(K) = f(C) + C \cdot K$。

---

## 完备例题解答

### 例题：打印文章 (HDU 3507) - 斜率优化
<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
using namespace std;

typedef long long ll;
const int N = 500005;
ll n, m;
ll s[N], f[N];
int q[N];

ll get_y(int j) { return f[j] + s[j] * s[j]; }
ll get_x(int j) { return s[j]; }

int main() {
    while (cin >> n >> m) {
        for (int i = 1; i <= n; i++) cin >> s[i], s[i] += s[i - 1];
        int hh = 0, tt = 0;
        q[0] = 0;
        for (int i = 1; i <= n; i++) {
            while (hh < tt && (get_y(q[hh + 1]) - get_y(q[hh])) <= 2 * s[i] * (get_x(q[hh + 1]) - get_x(q[hh])))
                hh++;
            int j = q[hh];
            f[i] = f[j] + (s[i] - s[j]) * (s[i] - s[j]) + m;
            while (hh < tt && (get_y(q[tt]) - get_y(q[tt - 1])) * (get_x(i) - get_x(q[tt])) >= (get_y(i) - get_y(q[tt])) * (get_x(q[tt]) - get_x(q[tt - 1])))
                tt--;
            q[++tt] = i;
        }
        cout << f[n] << endl;
    }
    return 0;
}
```
</details>

---

## 练习推荐
1. **[Luogu P3195] 玩具装箱**：斜率优化入门。
2. **[Luogu P4767] 邮局**：四边形不等式经典。
3. **[Luogu P5643] 连通性限制**：WQS 二分进阶。
4. **[Luogu P3391] 任务安排**：斜率优化（需处理斜率非单调情况）。
