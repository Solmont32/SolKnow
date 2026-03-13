---
title: 线性 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Brain, Zap, ArrowRight } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 线性动态规划 (Linear Dynamic Programming)

线性动态规划是 DP 体系中最基础的模型，其核心特征是**状态的演进与输入序列的下标（或多个序列的下标组合）呈线性增长关系**。在本章中，我们将从公理化基础出发，深入解析线性 DP 的推导逻辑与时空优化。

---

<KnowledgeCard type="info" title="贝尔曼最优性原理 (Bellman's Principle of Optimality)">
    一个最优策略具有这样的性质：不论过去的状态和决策如何，对前面的决策所形成的状态而言，余下的决策必须构成最优策略。
    <br/>
    在数学上，这体现为：若 $S = (d_1, d_2, \dots, d_n)$ 是最优解，则对于任意 $k < n$，$(d_{k+1}, \dots, d_n)$ 必须是给定前 $k$ 阶段状态下的最优子解。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 形式化推导：状态与证明

### 1.1 最优子结构的形式化证明 (以 LCS 为例)

**定理**：最长公共子序列 (LCS) 满足最优子结构。

**证明**：设 $X = \{x_1 \dots x_m\}, Y = \{y_1 \dots y_n\}$，其 LCS 为 $Z = \{z_1 \dots z_k\}$。

- **Case 1**: $x_m = y_n \implies z_k = x_m = y_n$，且 $Z_{k-1}$ 是 $X_{m-1}, Y_{n-1}$ 的 LCS。
- **Case 2**: $x_m \neq y_n \implies z_k \neq x_m$ 或 $z_k \neq y_n$。若 $z_k \neq x_m$，则 $Z$ 是 $X_{m-1}, Y$ 的 LCS。
  通过数学归纳法可知，全局最优解必然由子问题的最优解构成。

### 1.2 无后效性的本质

无后效性意味着：**“给定当前状态，未来的演进只取决于当前值，而与如何到达该状态的历史路径无关。”** 在代码实现中，这表现为状态转移方程只涉及较低阶的索引。

---

## <Layers className="inline-block mr-2" /> 2. 经典模型深度解析

### 2.1 最长上升子序列 (LIS)

**状态定义**：$f[i]$ 表示以 $A[i]$ 结尾的最长上升子序列的长度。
**转移方程**：$f[i] = \max_{j < i, A[j] < A[i]} \{ f[j] \} + 1$。
**优化**：维护单调序列，利用二分查找优化至 $O(N \log N)$。

### 2.2 空间压缩：滚动数组 (Rolling Array)

对于方程 $f[i][j] = \text{func}(f[i-1][\dots])$，当前行只依赖于上一行。我们可以将空间复杂度从 $O(N^2)$ 压缩至 $O(N)$。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 综合练习与强化

### 练习 1：最长上升子序列 (O(N log N))

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n), d;
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int x : a) {
        auto it = lower_bound(d.begin(), d.end(), x);
        if (it == d.end()) d.push_back(x);
        else *it = x;
    }
    cout << d.size() << endl;
    return 0;
}
```

</details>

### 练习 2：数字三角形 (Number Triangle)

<details>
<summary>Check Solution (自底向上)</summary>

```cpp
// a[i][j] 为原数组，从第 n-1 行向上更新
for (int i = n - 2; i >= 0; i--)
    for (int j = 0; j <= i; j++)
        a[i][j] += max(a[i+1][j], a[i+1][j+1]);
cout << a[0][0] << endl;
```

</details>

### 练习 3：编辑距离 (Edit Distance)

求将字符串 A 变为 B 的最少操作次数。

<details>
<summary>Check Solution (O(NM))</summary>

```cpp
// f[i][j] 为 A[1..i] 变为 B[1..j] 的代价
if (A[i] == B[j]) f[i][j] = f[i-1][j-1];
else f[i][j] = min({f[i-1][j-1], f[i-1][j], f[i][j-1]}) + 1;
```

</details>

### 练习 4：最大子段和 (Kadane's Algorithm)

<details>
<summary>Check Solution (O(1) Space)</summary>

```cpp
long long cur = 0, res = -2e18;
for (int x : a) {
    cur = max((long long)x, cur + x);
    res = max(res, cur);
}
```

</details>

---

## 延伸挑战

- [洛谷 P1439 LCS 模板](https://www.luogu.com.cn/problem/P1439)
- [洛谷 P1091 合唱队形](https://www.luogu.com.cn/problem/P1091)
- [AtCoder DP Contest L - Deque](https://atcoder.jp/contests/dp/tasks/dp_l)
