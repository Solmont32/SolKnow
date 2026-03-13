---
title: DP 优化技术
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, TrendingUp, Maximize, LineChart } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 动态规划优化技术 (Dynamic Programming Optimization)

在解决复杂的 DP 问题时，朴素的状态转移往往伴随着高昂的时间代价。DP 优化的核心在于**发掘转移方程中的数学性质**（如单调性、凸性、特殊代数结构），从而利用数据结构或数学变换实现时空复杂度的飞跃。

---

<KnowledgeCard type="info" title="决策单调性的数学定义">
    设 $f[i]$ 的最优决策点为 $p_i = \text{argmin}_{j < i} \{ f[j] + w(j, i) \}$。
    <br/>
    若满足 $i_1 < i_2 \implies p_{i_1} \le p_{i_2}$，则称该 DP 具有**决策单调性**。这是斜率优化与四边形不等式优化的理论基石。
</KnowledgeCard>

---

## <TrendingUp className="inline-block mr-2" /> 1. 单调队列优化 (Monotonic Queue)

**适用场景**：转移方程形如 $f[i] = \text{opt}_{i-L \le j \le i-R} \{ f[j] + w(i) \}$，即 $j$ 的取值范围是一个随 $i$ 移动的窗口，且 $w(i)$ 与 $j$ 无关。

### 核心思想

维护一个单调递增（或递减）的队列，存储可能的决策点 $j$。由于窗口滑动，队首过期元素被弹出；新加入元素若优于队尾，则弹出队尾，保持队列单调。

---

## <LineChart className="inline-block mr-2" /> 2. 斜率优化 (Convex Hull Trick)

**适用场景**：转移方程包含 $i$ 和 $j$ 的乘积项，形如 $f[i] = \min_{j < i} \{ f[j] + A(i)B(j) + C(i) + D(j) \}$。

### 2.1 形式化推导

将转移方程整理为直线形式：$Y_j = K_i X_j + B_i$。

- $Y_j$ 和 $X_j$ 仅由 $j$ 决定。
- $K_i$ 仅由 $i$ 决定（作为斜率）。
- $B_i$ 包含 $f[i]$。

### 2.2 几何建模

将每个决策点 $j$ 映射为平面上的点 $(X_j, Y_j)$。寻找最优决策点等价于用一条斜率为 $K_i$ 的直线扫描这些点，使得截距 $B_i$ 最小。

- **凸包性质**：最优决策点必然落在这些点的**下凸包**上。
- **单调性加速**：若 $X_j$ 和 $K_i$ 均单调，可使用单调队列在 $O(N)$ 时间内完成。

---

## <Layers className="inline-block mr-2" /> 3. 四边形不等式 (Quadrangle Inequality)

**适用场景**：区间 DP $f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + w(i, j) \}$。

### 3.1 形式化定义

若 $\forall a \le b \le c \le d$，代价函数 $w$ 满足：
$$w(a, c) + w(b, d) \le w(a, d) + w(b, c)$$
且 $w$ 满足区间包含单调性，则最优决策点 $s[i][j]$ 满足：
$$s[i][j-1] \le s[i][j] \le s[i+1][j]$$

### 3.2 复杂度提升

利用该性质，可将 $O(N^3)$ 的区间 DP 优化至 $O(N^2)$。

---

## <ShieldCheck className="inline-block mr-2" /> 4. 综合练习与强化

### 练习 1：[SDOI2012] 任务安排 (斜率优化)

给定 $n$ 个任务，分成若干批。费用 = (当前时间 + $S$) $\times$ 总费用系数。

<details>
<summary>Check Solution (O(N))</summary>

```cpp
#include <iostream>
#include <vector>

using namespace std;

typedef long long ll;
const int MAXN = 300005;
ll f[MAXN], st[MAXN], sc[MAXN];
int q[MAXN], n, s;

inline ll Y(int j) { return f[j]; }
inline ll X(int j) { return sc[j]; }

int main() {
    ios::sync_with_stdio(false);
    cin >> n >> s;
    for (int i = 1; i <= n; i++) {
        ll t, c; cin >> t >> c;
        st[i] = st[i - 1] + t;
        sc[i] = sc[i - 1] + c;
    }

    int hh = 0, tt = 0;
    q[0] = 0;
    for (int i = 1; i <= n; i++) {
        // 斜率单调递增，查询凸包
        while (hh < tt && (Y(q[hh+1]) - Y(q[hh])) <= (s + st[i]) * (X(q[hh+1]) - X(q[hh])))
            hh++;

        int j = q[hh];
        f[i] = f[j] + st[i] * sc[i] + s * sc[n] - (s + st[i]) * sc[j];

        // 维护凸包单调性
        while (hh < tt && (double)(Y(q[tt]) - Y(q[tt-1])) * (X(i) - X(q[tt])) >= (double)(Y(i) - Y(q[tt])) * (X(q[tt]) - X(q[tt-1])))
            tt--;
        q[++tt] = i;
    }
    cout << f[n] << endl;
    return 0;
}
```

</details>

### 练习 2：[ZJOI 2007] 仓库建设

类似任务安排，但在不同位置建仓代价不同。

<details>
<summary>Check Solution (CHT)</summary>

$$f[i] = \min_{j < i} \{ f[j] + \text{cost}(j+1, i) + c_i \}$$
通过预处理前缀和 $P_i = \sum p_i, W_i = \sum p_i x_i, C_i = \sum c_i$，可将方程转化为斜率形式。

</details>

### 练习 3：邮局 (四边形不等式)

在 $n$ 个村庄中建立 $m$ 个邮局，最小化总距离。

<details>
<summary>Check Solution (O(NM))</summary>

```cpp
// 预处理 w[i][j] 为在区间 [i, j] 中建立一个邮局的最小距离
// f[i][j] = min(f[i-1][k] + w[k+1][j])
// 优化后：s[i][j-1] <= s[i][j] <= s[i+1][j]
for (int i = 1; i <= m; i++) {
    for (int j = n; j >= 1; j--) {
        for (int k = s[i-1][j]; k <= s[i][j+1]; k++) {
            if (f[i-1][k] + w[k+1][j] < f[i][j]) {
                f[i][j] = f[i-1][k] + w[k+1][j];
                s[i][j] = k;
            }
        }
    }
}
```

</details>

---

## 延伸挑战

- [洛谷 P3195 [HNOI2008] 玩具装箱](https://www.luogu.com.cn/problem/P3195)
- [洛谷 P3628 [APIO2010] 特别行动队](https://www.luogu.com.cn/problem/P3628)
- [HDU 3507 Print Article](http://acm.hdu.edu.cn/showproblem?pid=3507)（斜率优化经典入门）
- [Codeforces 311B Cats Transport](https://codeforces.com/problemset/problem/311/B)
