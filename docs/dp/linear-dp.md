---
title: 线性 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Brain, Zap } from 'lucide-react';
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

## <Microscope className="inline-block mr-2" /> 1. 核心理论体系

### 1.1 最优子结构的形式化证明 (Formal Proof)
**定理**：线性 DP 满足最优子结构。
**证明摘要**（以最长上升子序列 LIS 为例）：
假设 $L(i)$ 是以 $a[i]$ 结尾的最长上升子序列的长度。若 $L(i) = k$，则必然存在一个 $j < i$ 满足 $a[j] < a[i]$ 且 $L(j) = k-1$。
若存在一个更好的子问题解 $L'(j) > L(j)$ 且 $a[j] < a[i]$，那么我们可以构造一个长度为 $L'(j) + 1 > L(i)$ 的上升子序列以 $a[i]$ 结尾，这与 $L(i)$ 是最优解的前提矛盾。因此，全局最优解必然建立在子问题的最优解之上。

### 1.2 建模范式
- **阶段划分**：通常以序列下标 $i \in [1, n]$ 为阶段。
- **无后效性**：计算 $f[i]$ 时，我们只关心 $f[j] (j < i)$ 的值，而不关心 $f[j]$ 是如何通过更前面的状态得到的。

---

## <Layers className="inline-block mr-2" /> 2. 经典模型深度解析

### 2.1 最长公共子序列 (LCS) 的多维推导
**状态定义**：$f[i][j]$ 表示 $A[1 \dots i]$ 与 $B[1 \dots j]$ 的 LCS 长度。
**归纳步骤**：
1.  **若 $A[i] = B[j]$**：最后一个字符必然在 LCS 中。$f[i][j] = f[i-1][j-1] + 1$。
2.  **若 $A[i] \neq B[j]$**：$A[i]$ 和 $B[j]$ 不同时在 LCS 中。
    - 排除 $A[i]$：$f[i][j] = f[i-1][j]$
    - 排除 $B[j]$：$f[i][j] = f[i][j-1]$
    - 状态转移：$f[i][j] = \max(f[i-1][j], f[i][j-1])$。

### 2.2 空间压缩：滚动数组 (Rolling Array)
对于 LCS 转移方程 $f[i][j] = \dots f[i-1][\dots]$，我们发现当前行只依赖于上一行。
- **二维空间**：$O(N \cdot M)$。
- **压缩方案**：利用 $f[i \% 2][j]$ 或直接使用一维数组。
- **一维实现注意点**：由于 $f[i][j]$ 依赖于 $f[i-1][j-1]$（左上方），若使用一维数组，更新 $j$ 时需要保留“旧的” $f[j-1]$。

---

## <Zap className="inline-block mr-2" /> 3. 进阶优化：决策单调性初探
在某些线性 DP 中，最优决策点 $j$ 随着 $i$ 的增加而单调移动。
例如 $f[i] = \min_{0 \le j < i} \{ f[j] + w(j, i) \}$，若 $w(j, i)$ 满足四边形不等式，则可使用分治或单调队列优化至 $O(N \log N)$。

---

## <ShieldCheck className="inline-block mr-2" /> 4. 综合练习与强化

### 练习 1：最长上升子序列 (LIS) 
给定序列 $A$，求 LIS 长度。

<details>
<summary>Check Solution (O(N log N))</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int solve_lis(const vector<int>& a) {
    if (a.empty()) return 0;
    // d[i] 表示长度为 i 的上升子序列末尾元素的最小值
    vector<int> d;
    for (int x : a) {
        auto it = lower_bound(d.begin(), d.end(), x);
        if (it == d.end()) {
            d.push_back(x);
        } else {
            *it = x;
        }
    }
    return d.size();
}

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << solve_lis(a) << endl;
    return 0;
}
```
*解析：维护一个单调递增的数组 d。对于新元素 x，若 x 大于 d 末尾，则延长；否则用 x 替换 d 中第一个大于等于 x 的数，以使子序列增长更慢。*
</details>

### 练习 2：数字三角形 (Number Triangle)
经典线性 DP，求从顶部到底部的路径最大和。

<details>
<summary>Check Solution (Space Optimized)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n; cin >> n;
    vector<vector<int>> a(n, vector<int>(n));
    for (int i = 0; i < n; i++)
        for (int j = 0; j <= i; j++)
            cin >> a[i][j];

    // 自底向上递推，空间复用原数组
    for (int i = n - 2; i >= 0; i--) {
        for (int j = 0; j <= i; j++) {
            a[i][j] += max(a[i + 1][j], a[i + 1][j + 1]);
        }
    }
    cout << a[0][0] << endl;
    return 0;
}
```
*解析：自底向上更新可以避免边界讨论，且最终答案即为 a[0][0]。*
</details>

### 练习 3：最大子段和 (Maximum Subarray Sum)
求序列中连续一段的和的最大值。

<details>
<summary>Check Solution (Kadane's Algorithm)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

long long max_subarray(const vector<int>& a) {
    long long current_max = 0, global_max = -2e18; // 注意初始化
    for (int x : a) {
        current_max = max((long long)x, current_max + x);
        global_max = max(global_max, current_max);
    }
    return global_max;
}

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << max_subarray(a) << endl;
    return 0;
}
```
*解析：f[i] = max(a[i], f[i-1] + a[i])。由于 f[i] 只依赖 f[i-1]，空间优化为 O(1)。*
</details>

---

## 延伸挑战
- [洛谷 P1091 合唱队形](https://www.luogu.com.cn/problem/P1091)（双向 LIS）
- [洛谷 P1439 LCS 模板](https://www.luogu.com.cn/problem/P1439)（$O(N \log N)$ 技巧）
- [AtCoder DP Contest F - LCS](https://atcoder.jp/contests/dp/tasks/dp_f)（构造最优方案）
