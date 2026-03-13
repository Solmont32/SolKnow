---
title: DP 优化技术
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, TrendingUp, Maximize, LineChart, Binary, GitMerge, BookOpen, Code2 } from 'lucide-react';
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

## <Microscope className="inline-block mr-2" /> 1. 四边形不等式与决策单调性证明

决策单调性的优越性源于代价函数 $w(i, j)$ 的特殊代数性质。

### 1.1 四边形不等式 (Quadrangle Inequality)
**定义**：若 $\forall a \le b \le c \le d$，满足 $w(a, c) + w(b, d) \le w(a, d) + w(b, c)$，则称函数 $w$ 满足四边形不等式。
- **直观理解**：交叉小于包含。

### 1.2 决策单调性定理 (Formal Proof)
**定理**：若 $w$ 满足四边形不等式，则对于转移方程 $f[i] = \min_{j < i} \{ f[j] + w(j, i) \}$，其最优决策点 $p_i$ 满足 $p_1 \le p_2 \le \dots \le p_n$。

**证明**：
设 $p_i = k$，即对于所有 $j < k$，$f[k] + w(k, i) \le f[j] + w(j, i)$。
我们需要证明对于 $i' > i$，决策点 $k$ 优于任何 $j < k$。
由四边形不等式（取 $j < k < i < i'$）：
$$w(j, i) + w(k, i') \le w(j, i') + w(k, i)$$
整理得：
$$w(k, i') - w(k, i) \le w(j, i') - w(j, i)$$
由于 $k$ 是 $i$ 的最优决策点：
$$f[k] + w(k, i) \le f[j] + w(j, i) \implies f[k] - f[j] \le w(j, i) - w(k, i)$$
联立两式：
$$f[k] - f[j] \le w(j, i) - w(k, i) \le w(j, i') - w(k, i')$$
从而：
$$f[k] + w(k, i') \le f[j] + w(j, i')$$
这说明在 $i'$ 处，$k$ 依然比任何 $j < k$ 更优。故 $p_{i'} \ge k = p_i$。证毕。

---

## <LineChart className="inline-block mr-2" /> 2. 斜率优化 (Convex Hull Trick)

斜率优化本质上是将 DP 转移方程转化为平面几何中的**直线截距极值问题**。

### 2.1 方程形式化
考虑 $f[i] = \min_{j < i} \{ f[j] + a_i \cdot b_j + c_i + d_j \}$。将其变形为：
$$f[j] + d_j = (-a_i) \cdot b_j + (f[i] - c_i)$$
令 $Y_j = f[j] + d_j, X_j = b_j, K_i = -a_i, B_i = f[i] - c_i$。
则方程变为：$B_i = Y_j - K_i X_j$。
我们的目标是找到一个点 $(X_j, Y_j)$，使得截距 $B_i$ 最小。

### 2.2 优化策略分析
- **单调队列 ($X, K$ 均单调)**：维护凸包，每次取队头斜率最接近 $K_i$ 的点。$O(N)$。
- **二分查找 ($X$ 单调, $K$ 不单调)**：在凸包上二分查找切点。$O(N \log N)$。
- **李超线段树 / CDQ 分治 (均不单调)**：维护动态直线集。$O(N \log N)$。

---

## <GitMerge className="inline-block mr-2" /> 3. 分治优化 (Divide and Conquer Optimization)

**适用场景**：$f[i][j] = \min_{k < j} \{ f[i-1][k] + w(k, j) \}$，且 $w$ 满足决策单调性。

### 核心逻辑
若 $p[i][j] \le p[i][j+1]$，通过递归函数 `solve(i, L, R, optL, optR)`：
1. 计算 $mid = (L+R)/2$ 的最优决策点 $optMid \in [optL, optR]$。
2. 递归 `solve(i, L, mid-1, optL, optMid)`。
3. 递归 `solve(i, mid+1, R, optMid, optR)`。

**复杂度**：$O(K \cdot N \log N)$。

---

## <ShieldCheck className="inline-block mr-2" /> 4. 教材化典型例题

### 例题 1：[HNOI2008] 玩具装箱 (斜率优化入门)

**方程**：$f[i] = \min_{j < i} \{ f[j] + (s[i] - s[j] + i - j - 1 - L)^2 \}$
**变形**：令 $A_i = s[i] + i, B_j = s[j] + j + 1 + L$。
则 $f[i] = f[j] + (A_i - B_j)^2 = f[j] + B_j^2 - 2A_i B_j + A_i^2$。
整理为 $Y = KX + B$ 形式：
$$f[j] + B_j^2 = (2A_i) \cdot B_j + (f[i] - A_i^2)$$

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

typedef long long ll;
const int MAXN = 50005;
ll n, L, s[MAXN], f[MAXN];
int q[MAXN];

ll A(int i) { return s[i] + i; }
ll B(int i) { return s[i] + i + 1 + L; }
ll X(int i) { return B(i); }
ll Y(int i) { return f[i] + B(i) * B(i); }

double slope(int i, int j) {
    return (double)(Y(j) - Y(i)) / (X(j) - X(i));
}

int main() {
    cin >> n >> L;
    for (int i = 1; i <= n; i++) {
        cin >> s[i];
        s[i] += s[i - 1];
    }

    int hh = 0, tt = 0;
    q[0] = 0;
    for (int i = 1; i <= n; i++) {
        while (hh < tt && slope(q[hh], q[hh + 1]) <= 2 * A(i)) hh++;
        int j = q[hh];
        f[i] = f[j] + (A(i) - B(j)) * (A(i) - B(j));
        while (hh < tt && slope(q[tt - 1], q[tt]) >= slope(q[tt], i)) tt--;
        q[++tt] = i;
    }
    cout << f[n] << endl;
    return 0;
}
```

</details>

---

## <Code2 className="inline-block mr-2" /> 5. 课后强化练习

### 练习 1：再探邮局 (分治优化)
使用分治优化将邮局问题的时间复杂度从 $O(N^2)$ 优化到 $O(K N \log N)$（当 $K$ 较小时更优）。

<details>
<summary>Check Solution (Logic)</summary>

```cpp
void solve(int k, int L, int R, int optL, int optR) {
    if (L > R) return;
    int mid = (L + R) >> 1, opt = optL;
    f[k][mid] = INF;
    for (int i = optL; i <= min(mid - 1, optR); i++) {
        ll val = f[k-1][i] + w(i + 1, mid);
        if (val < f[k][mid]) {
            f[k][mid] = val;
            opt = i;
        }
    }
    solve(k, L, mid - 1, optL, opt);
    solve(k, mid + 1, R, opt, optR);
}
```

</details>

---

## 延伸挑战
- [洛谷 P4767 [IOI2000] 邮局](https://www.luogu.com.cn/problem/P4767)
- [洛谷 P4027 [NOI2007] 货币兑换](https://www.luogu.com.cn/problem/P4027) (CDQ 分治)
- [CF 321E Ciel and Gondolas](https://codeforces.com/problemset/problem/321/E)
- [洛谷 P3195 [HNOI2008] 玩具装箱](https://www.luogu.com.cn/problem/P3195)
