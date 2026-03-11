---
title: DP 优化
---

import { Microscope, Layers, Activity, ShieldCheck, Zap } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 动态规划优化技巧 (DP Optimization)

在解决复杂的 DP 问题时，朴素的状态转移往往伴随着高昂的时间代价。DP 优化的核心在于**发掘转移方程中的数学性质**（如单调性、凸性、特殊代数结构），从而利用数据结构或数学变换降维提速。

---

<KnowledgeCard type="info" title="决策单调性与凸性">
    如果对于状态 $i$ 的最优决策点 $p_i$，满足 $i < j \implies p_i \le p_j$，则称该 DP 具有决策单调性。
    <br/>
    这通常是斜率优化和四边形不等式优化的理论前提。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 斜率优化 (Slope Optimization)

当转移方程呈现 $f[i] = \min_{j < i} \{ f[j] + \dots + A(i)B(j) + \dots \}$ 的形式，且包含 $i, j$ 的乘积项时，简单的单调队列失效，此时需要斜率优化。

### 核心推导

考虑 $f[i] = \min \{ f[j] + w(j, i) \}$。若能将其整理为：
$$y_j = k_i \cdot x_j + b_i$$
其中 $y_j, x_j$ 只与 $j$ 有关，$k_i$ 只与 $i$ 有关，$b_i$ 包含 $f[i]$。

- **几何意义**：这相当于在平面直角坐标系中，有一堆点 $(x_j, y_j)$。我们要找一条斜率为 $k_i$ 的直线，使其经过某个点且截距 $b_i$ 最小。
- **凸包维护**：最优决策点必然落在这些点的**下凸包**上。由于 $k_i$ 通常也具有单调性，我们可以用单调队列维护凸包上的相邻段斜率，实现 $O(N)$。

---

## <Zap className="inline-block mr-2" /> 2. 四边形不等式 (Quadrangle Inequality)

若对于任意 $a \le b \le c \le d$，代价函数 $w$ 满足：
$$w(a, c) + w(b, d) \le w(a, d) + w(b, c)$$
则称 $w$ 满足四边形不等式。此时区间 DP $f[i][j] = \min \{ f[i][k] + f[k+1][j] + w(i, j) \}$ 的决策点 $s[i][j]$ 满足：
$$s[i][j-1] \le s[i][j] \le s[i+1][j]$$
利用此性质可将复杂度从 $O(N^3)$ 降至 $O(N^2)$。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 综合练习与强化

### 练习 1：[NOI2007] 货币兑换 (斜率优化)

这是斜率优化的进阶练习，涉及到 $x, y$ 和 $k$ 均不单调的情况。

<details>
<summary>Check Solution (CDQ 分治/平衡树)</summary>

当斜率不单调时，无法使用单调队列。
**方案**：

1.  **CDQ 分治**：利用分治序保持时间序，并在合并时利用归并排序维护凸包。
2.  **李超线段树**：维护线段的最值。
3.  **动态凸包**（平衡树维护）。
</details>

### 练习 2：[SDOI2012] 任务安排

经典斜率优化题目。$f[i] = \min_{j < i} \{ f[j] + S \cdot (sumC[n] - sumC[j]) + sumT[i] \cdot (sumC[i] - sumC[j]) \}$。

<details>
<summary>Check Solution (O(N))</summary>

```cpp
#include <iostream>
#include <vector>
#include <deque>

using namespace std;

typedef long long ll;
ll f[300005], st[300005], sc[300005];
int q[300005], n, s;

ll Y(int j) { return f[j]; }
ll X(int j) { return sc[j]; }

int main() {
    cin >> n >> s;
    for (int i = 1; i <= n; i++) {
        ll t, c; cin >> t >> c;
        st[i] = st[i - 1] + t;
        sc[i] = sc[i - 1] + c;
    }

    int hh = 0, tt = 0;
    q[0] = 0;
    for (int i = 1; i <= n; i++) {
        // 这里的斜率是 s + st[i]
        while (hh < tt && (Y(q[hh + 1]) - Y(q[hh])) <= (s + st[i]) * (X(q[hh + 1]) - X(q[hh])))
            hh++;

        int j = q[hh];
        f[i] = f[j] + st[i] * (sc[i] - sc[j]) + (ll)s * (sc[n] - sc[j]);

        while (hh < tt && (ll)(Y(q[tt]) - Y(q[tt - 1])) * (X(i) - X(q[tt])) >= (ll)(Y(i) - Y(q[tt])) * (X(q[tt]) - X(q[tt - 1])))
            tt--;
        q[++tt] = i;
    }
    cout << f[n] << endl;
    return 0;
}
```

</details>

---

## 延伸挑战

- [洛谷 P3195 [HNOI2008] 玩具装箱](https://www.luogu.com.cn/problem/P3195)（斜率优化入门）
- [洛谷 P3628 [APIO2010] 特别行动队](https://www.luogu.com.cn/problem/P3628)
- [洛谷 P4767 [IOI2000] 邮局](https://www.luogu.com.cn/problem/P4767)（四边形不等式）
- [Codeforces 311B Cats Transport](https://codeforces.com/problemset/problem/311/B)（斜率优化 + 坐标变换）
