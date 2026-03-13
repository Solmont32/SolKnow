---
title: DP 优化技术
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, TrendingUp, Maximize, LineChart, Binary, GitMerge } from 'lucide-react';
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

### 1.2 决策单调性定理 (Proof)
**定理**：若 $w$ 满足四边形不等式，则对于转移方程 $f[i] = \min_{j < i} \{ f[j] + w(j, i) \}$，其最优决策点 $p_i$ 满足 $p_1 \le p_2 \le \dots \le p_n$。

**证明概要**：
设 $p_i = k$，即对于所有 $j < k$，$f[k] + w(k, i) \le f[j] + w(j, i)$。
我们需要证明对于 $i' > i$，决策点 $k$ 优于任何 $j < k$。
由四边形不等式（取 $j < k < i < i'$）：
$$w(j, i) + w(k, i') \le w(j, i') + w(k, i)$$
整理得：
$$w(k, i') - w(k, i) \le w(j, i') - w(j, i)$$
代入 $f[k] + w(k, i) \le f[j] + w(j, i)$：
$$(f[k] + w(k, i')) - (f[j] + w(j, i')) \le (f[k] + w(k, i)) - (f[j] + w(j, i)) \le 0$$
故 $f[k] + w(k, i') \le f[j] + w(j, i')$，即在 $i'$ 处，$k$ 依然优于 $j$。证毕。

---

## <LineChart className="inline-block mr-2" /> 2. 斜率优化 (Convex Hull Trick)

斜率优化本质上是将 DP 转移方程转化为平面几何中的**直线截距极值问题**。

### 2.1 方程形式化
考虑 $f[i] = \min_{j < i} \{ f[j] + a_i \cdot b_j + c_i + d_j \}$。将其变形为：
$$f[j] + d_j = (-a_i) \cdot b_j + (f[i] - c_i)$$
令 $Y_j = f[j] + d_j, X_j = b_j, K_i = -a_i, B_i = f[i] - c_i$。
则方程变为：$Y_j = K_i X_j + B_i \implies B_i = Y_j - K_i X_j$。
我们的目标是找到一个点 $(X_j, Y_j)$，使得通过该点且斜率为 $K_i$ 的直线的截距 $B_i$ 最小。

### 2.2 优化策略分析
- **情况 A：$X_j$ 与 $K_i$ 均单调**：使用**单调队列**维护下凸包。$O(N)$。
- **情况 B：仅 $X_j$ 单调**：在凸包上**二分**查找切点。$O(N \log N)$。
- **情况 C：均不单调**：使用 **李超线段树 (Li-Chao Tree)** 或 **CDQ 分治** 维护动态凸包。$O(N \log N)$ 或 $O(N \log^2 N)$。

---

## <GitMerge className="inline-block mr-2" /> 3. 分治优化 (Divide and Conquer Optimization)

**适用场景**：$f[i][j] = \min_{k < j} \{ f[i-1][k] + w(k, j) \}$，且 $w$ 满足决策单调性。

### 核心逻辑
若 $p[i][j]$ 为 $f[i][j]$ 的最优决策点，且满足 $p[i][j] \le p[i][j+1]$。
我们可以利用分治函数 `solve(i, L, R, optL, optR)`：
1. 计算 $mid = (L+R)/2$ 的最优决策点 $optMid \in [optL, optR]$。
2. 递归解决 `solve(i, L, mid-1, optL, optMid)`。
3. 递归解决 `solve(i, mid+1, R, optMid, optR)`。

**复杂度分析**：每一层分治的时间复杂度为 $O(R-L + optR-optL)$，总复杂度为 $O(K \cdot N \log N)$。

---

## <Binary className="inline-block mr-2" /> 4. Knuth 优化

**适用场景**：区间 DP $f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] \} + w(i, j)$。

若 $w$ 满足四边形不等式且满足区间包含单调性，则最优决策点 $s[i][j]$ 满足：
$$s[i][j-1] \le s[i][j] \le s[i+1][j]$$

**复杂度飞跃**：
区间长度从 $1$ 到 $n$ 枚举，每次枚举 $i$。
由于 $\sum_{i,j} (s[i+1][j] - s[i][j-1]) = O(N^2)$（中间项抵消），复杂度从 $O(N^3)$ 降至 $O(N^2)$。

---

## <ShieldCheck className="inline-block mr-2" /> 5. 综合练习与强化

### 练习 1：[NOI2007] 货币兑换 (Cash)
**挑战**：斜率不单调，且 $X$ 坐标也不单调。

<details>
<summary>Check Solution (CDQ 分治 / 李超树)</summary>

本题需要维护动态凸包。
```cpp
// 核心：使用 CDQ 分治处理不单调的斜率优化
void cdq(int l, int r) {
    if (l == r) {
        f[l] = max(f[l], f[l-1]);
        y[l] = f[l] / (a[l] * r[l] + b[l]);
        x[l] = y[l] * r[l];
        return;
    }
    int mid = (l + r) >> 1;
    cdq(l, mid);
    // 构建左侧凸包并更新右侧
    // ... 排序与单调栈逻辑 ...
    cdq(mid + 1, r);
}
```

</details>

### 练习 2：再探邮局 (分治优化)
使用分治优化将邮局问题的时间复杂度控制在 $O(K N \log N)$。

<details>
<summary>Check Solution (Code)</summary>

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
- [洛谷 P4767 [IOI2000] 邮局](https://www.luogu.com.cn/problem/P4767) (四边形不等式)
- [洛谷 P4027 [NOI2007] 货币兑换](https://www.luogu.com.cn/problem/P4027) (动态斜率优化)
- [HDU 2829 Lawrence](http://acm.hdu.edu.cn/showproblem?pid=2829) (分治优化)
- [CF 321E Ciel and Gondolas](https://codeforces.com/problemset/problem/321/E) (分治优化典型)
