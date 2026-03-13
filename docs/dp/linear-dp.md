---
title: 线性 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Brain, Zap, ArrowRight, CheckCircle2, BookOpen, Code2, Scaling } from 'lucide-react';
import { motion } from 'framer-motion';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 线性动态规划 (Linear Dynamic Programming)

线性动态规划是 DP 体系中最基础且应用最广的模型。其核心特征是**决策过程具有明显的线性顺序**，状态演进通常与输入序列的下标（或多个序列的下标组合）呈线性增长关系。

---

## <Microscope className="inline-block mr-2" /> 1. 数理基础：状态、证明与验证

### 1.1 贝尔曼最优性原理 (Bellman's Principle of Optimality)

对于线性决策过程，若 $P_{i \to j}$ 是从阶段 $i$ 到阶段 $j$ 的最优路径，则对于路径上的任意中间阶段 $k \in (i, j)$，子路径 $P_{i \to k}$ 和 $P_{k \to j}$ 必须分别是对应子问题的最优解。

**形式化表述**：设状态空间为 $\mathcal{S}$，转移函数为 $f: \mathcal{S} \to \mathbb{R}$。若 $f(n) = \text{opt}_{k < n} \{ g(f(k), \text{decision}(k, n)) \}$。若 $f(n)$ 是全局最优，则根据全序集的性质，$f(k)$ 必须是前 $k$ 阶段的最优解，否则可用更优的 $f^*(k)$ 替换得到更优的 $f(n)$。

### 1.2 无后效性 (No-after-effect) 的形式化证明

**定义**：一个随机过程（或决策过程）在给定当前状态的条件下，其未来的演变不依赖于过去的状态。

**证明要点**：
设 $S_t$ 为 $t$ 时刻的状态。若 $\forall t > 0$，有：
$$P(S_{t+1} | S_t, S_{t-1}, \dots, S_0) = P(S_{t+1} | S_t)$$
在线性 DP 中，这表现为 $dp[i]$ 的转移仅取决于 $dp[j] (j < i)$ 的**取值**，而与 $dp[j]$ 是如何通过 $0 \dots j-1$ 计算出来的**路径**无关。

### 1.3 最优子结构：以 LCS 为例的严密证明

**命题**：设序列 $X = \langle x_1, \dots, x_m \rangle$ 和 $Y = \langle y_1, \dots, y_n \rangle$ 的 LCS 为 $Z = \langle z_1, \dots, z_k \rangle$。

1.  **Case 1: $x_m = y_n$** $\implies z_k = x_m = y_n$ 且 $Z_{k-1}$ 是 $X_{m-1}$ 和 $Y_{n-1}$ 的 LCS。
    - *证明*：若 $z_k \neq x_m$，则可构造 $Z' = \langle Z, x_m \rangle$ 为更长公共子序列，矛盾。
2.  **Case 2: $x_m \neq y_n$** $\implies$ 若 $z_k \neq x_m$，则 $Z$ 是 $X_{m-1}$ 和 $Y$ 的 LCS；若 $z_k \neq y_n$，则 $Z$ 是 $X$ 和 $Y_{n-1}$ 的 LCS。

---

## <Layers className="inline-block mr-2" /> 2. 状态转移方程的导出与优化

### 2.1 状态导出范式
1.  **阶段划分**：通常以序列下标 $i$ 作为阶段。
2.  **决策定义**：在阶段 $i$ 时，选择哪个前驱状态 $j < i$。
3.  **状态转移**：$f[i] = \text{opt}\{ f[j] \} + \text{cost}(j, i)$。

### 2.2 空间复杂度优化：滚动数组 (Rolling Array)

**原理**：若 $f[i]$ 的计算仅依赖于 $f[i-1]$ 或前有限个阶段，则可利用取模运算 $i \pmod 2$ 或直接覆盖来将空间从 $O(N)$ 降至 $O(1)$（或将二维 $O(N^2)$ 降至一维 $O(N)$）。

**边界分析**：
- **正向遍历**：若 $f[i][j]$ 依赖于 $f[i-1][j]$ 和 $f[i-1][j-1]$，一维优化时需**逆向**遍历 $j$，以防当前层的 $f[j-1]$ 被提前更新。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 教材化典型例题

### 例题 1：最长上升子序列 (LIS) - 决策单调性优化

**证明**：维护 $d[len]$ 为长度为 $len$ 的上升子序列的最小末尾。
- 若 $a[i] > d[last]$，则 $d[++last] = a[i]$。
- 否则，在 $d$ 中二分查找第一个 $\ge a[i]$ 的位置并替换之。
由于替换操作不改变 $d$ 的长度但减小了末尾元素，增强了后续扩展的可能性，具有贪心最优性。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

/**
 * @brief LIS O(N log N) implementation
 */
int solve_lis(const vector<int>& a) {
    if (a.empty()) return 0;
    vector<int> d;
    for (int x : a) {
        auto it = lower_bound(d.begin(), d.end(), x);
        if (it == d.end()) d.push_back(x);
        else *it = x; // 替换第一个大于等于 x 的数，保持单调性且使结尾尽可能小
    }
    return d.size();
}
```

</details>

### 例题 2：最长公共子序列 (LCS) - 空间优化

<details>
<summary>Check Solution (C++ Rolling Array)</summary>

```cpp
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int longestCommonSubsequence(string text1, string text2) {
    int m = text1.size(), n = text2.size();
    if (m < n) return longestCommonSubsequence(text2, text1);
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= m; i++) {
        int pre = 0; // 相当于 dp[i-1][j-1]
        for (int j = 1; j <= n; j++) {
            int tmp = dp[j];
            if (text1[i - 1] == text2[j - 1]) dp[j] = pre + 1;
            else dp[j] = max(dp[j], dp[j - 1]);
            pre = tmp;
        }
    }
    return dp[n];
}
```

</details>

---

## <Code2 className="inline-block mr-2" /> 4. 课后强化练习

### 练习 1：最大子段和 (Maximum Subarray Sum)
给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

<details>
<summary>Check Analysis & Solution</summary>

**状态定义**：$f[i]$ 为以 $i$ 结尾的最大子段和。
**转移方程**：$f[i] = \max(f[i-1] + nums[i], nums[i])$。
**空间优化**：$O(1)$。

```cpp
int maxSubArray(vector<int>& nums) {
    int pre = 0, max_ans = nums[0];
    for (const auto &x : nums) {
        pre = max(pre + x, x);
        max_ans = max(max_ans, pre);
    }
    return max_ans;
}
```

</details>

### 练习 2：数字三角形 (Number Triangle)
给定一个 $N$ 行的数字三角形，从顶部出发，在每一节点可以选择移动到下一行相邻的节点，求路径最大和。

<details>
<summary>Check Solution (Bottom-up)</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int a[505][505], f[505];

int main() {
    int n; cin >> n;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= i; j++) cin >> a[i][j];

    for (int j = 1; j <= n; j++) f[j] = a[n][j];

    for (int i = n - 1; i >= 1; i--) {
        for (int j = 1; j <= i; j++) {
            f[j] = max(f[j], f[j + 1]) + a[i][j];
        }
    }
    cout << f[1] << endl;
    return 0;
}
```

</details>

### 练习 3：最长公共上升子序列 (LCIS)
在 $O(N^2)$ 时间内求解。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n + 1), b(n + 1), f(n + 1, 0);
    for (int i = 1; i <= n; i++) cin >> a[i];
    for (int i = 1; i <= n; i++) cin >> b[i];

    for (int i = 1; i <= n; i++) {
        int maxv = 0; 
        for (int j = 1; j <= n; j++) {
            if (a[i] == b[j]) f[j] = max(f[j], maxv + 1);
            else if (b[j] < a[i]) maxv = max(maxv, f[j]);
        }
    }
    int res = 0;
    for (int i = 1; i <= n; i++) res = max(res, f[i]);
    cout << res << endl;
    return 0;
}
```

</details>

---

## <Scaling className="inline-block mr-2" /> 5. 时空优化边界分析

| 优化技术 | 适用场景 | 复杂度提升 | 边界条件 |
| :--- | :--- | :--- | :--- |
| **滚动数组** | 状态转移仅依赖前几层 | 空间 $O(N) \to O(1)$ | 遍历方向（正序/逆序） |
| **二分查找** | 具有单调性（如 LIS） | 时间 $O(N^2) \to O(N \log N)$ | 维护数组的严格单调性 |
| **单调队列** | 滑动窗口最值（线性 DP 变体） | 时间 $O(NM) \to O(N)$ | 队首及时出队（过期性） |
| **矩阵加速** | 线性递推式（如斐波那契） | 时间 $O(N) \to O(\log N)$ | 转移矩阵的构建 |

---

## 延伸挑战

- [洛谷 P1439 LCS 模板 (LIS 转化法)](https://www.luogu.com.cn/problem/P1439)
- [洛谷 P1091 合唱队形 (双向 LIS)](https://www.luogu.com.cn/problem/P1091)
- [AtCoder DP Contest F - LCS (方案构造)](https://atcoder.jp/contests/dp/tasks/dp_f)
