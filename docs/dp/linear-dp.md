---
title: 线性 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Brain, Zap, ArrowRight, CheckCircle2, BookOpen, Code2 } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 线性动态规划 (Linear Dynamic Programming)

线性动态规划是 DP 体系中最基础且应用最广的模型。其核心特征是**决策过程具有明显的线性顺序**，状态演进通常与输入序列的下标（或多个序列的下标组合）呈线性增长关系。

---

## <Microscope className="inline-block mr-2" /> 1. 公理化推导：状态、证明与验证

### 1.1 贝尔曼最优性原理 (Bellman's Principle of Optimality)

对于线性决策过程，若 $P_{i \to j}$ 是从阶段 $i$ 到阶段 $j$ 的最优路径，则对于路径上的任意中间阶段 $k \in (i, j)$，子路径 $P_{i \to k}$ 和 $P_{k \to j}$ 必须分别是对应子问题的最优解。

**形式化表述**：设状态转移函数为 $f(n) = \text{opt}_{k < n} \{ g(f(k), \text{decision}(k, n)) \}$。若 $f(n)$ 是全局最优，则 $f(k)$ 必须是前 $k$ 阶段的最优解。

### 1.2 最优子结构的形式化证明：以 LCS 为例

**命题**：设序列 $X = \langle x_1, \dots, x_m \rangle$ 和 $Y = \langle y_1, \dots, y_n \rangle$ 的 LCS 为 $Z = \langle z_1, \dots, z_k \rangle$。

1.  **若 $x_m = y_n$**：则 $z_k = x_m = y_n$，且 $Z_{k-1}$ 是 $X_{m-1}$ 和 $Y_{n-1}$ 的一个 LCS。
    - *证明 (反证法)*：若存在 $Z'$ 使得 $|Z'| > |Z_{k-1}|$ 且 $Z'$ 是 $X_{m-1}, Y_{n-1}$ 的公共子序列，则 $\langle Z', x_m \rangle$ 是 $X, Y$ 的公共子序列且长度大于 $k$，与 $Z$ 是最优解矛盾。
2.  **若 $x_m \neq y_n$**：
    - 若 $z_k \neq x_m$，则 $Z$ 是 $X_{m-1}$ 和 $Y$ 的 LCS。
    - 若 $z_k \neq y_n$，则 $Z$ 是 $X$ 和 $Y_{n-1}$ 的 LCS。

### 1.3 无后效性 (No-after-effect) 逻辑验证

**验证准则**：当阶段 $i$ 的状态 $dp[i]$ 被确定后，后续阶段 $j > i$ 的决策仅依赖于 $dp[i]$ 的**取值**，而不取决于到达 $dp[i]$ 的**路径**。

<div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
  <p className="font-bold flex items-center"><CheckCircle2 className="mr-2 text-blue-500" /> 验证实例：LIS (最长上升子序列)</p>
  <p>在 LIS 中，$dp[i]$ 定义为以 $A[i]$ 结尾的最长长度。当我们为 $j > i$ 进行转移时，只需知道 $dp[i]$ 的值和 $A[i]$ 的大小，无需关心 $A[i]$ 之前的元素是如何排列的。因此，满足无后效性。</p>
</div>

---

## <Layers className="inline-block mr-2" /> 2. 状态转移方程的导出

线性 DP 的方程通常由**边界条件**与**递归归纳**两部分构成。

### 2.1 路径计数类 (Number Triangle)
$$dp[i][j] = \max(dp[i-1][j], dp[i-1][j-1]) + \text{weight}[i][j]$$
*导出逻辑*：到达 $(i, j)$ 的唯一合法前驱是左上方 $(i-1, j-1)$ 或正上方 $(i-1, j)$，根据加法原理及最优性，取两者最大值。

### 2.2 匹配/序列类 (Edit Distance)
$$
dp[i][j] = \begin{cases} 
dp[i-1][j-1] & \text{if } A[i] = B[j] \\
\min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 & \text{otherwise}
\end{cases}
$$
*导出逻辑*：若不匹配，则对应三种操作：删除 $A[i]$（从 $dp[i-1][j]$ 转移）、插入 $B[j]$（从 $dp[i][j-1]$ 转移）、替换（从 $dp[i-1][j-1]$ 转移）。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 教材化典型例题

### 例题 1：最长上升子序列 (LIS) - 贪心+二分优化

**问题描述**：给定序列 $A$，求最长上升子序列的长度。
**证明要点**：维护 $d[len]$ 为长度为 $len$ 的上升子序列的最小末尾元素。$d$ 数组显然具有单调性，可进行二分查找。

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
        else *it = x;
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

</details>

### 例题 2：乘积最大子数组 (Maximum Product Subarray)

**状态定义**：$f_{max}[i]$ 表示以 $i$ 结尾的最大乘积，$f_{min}[i]$ 表示以 $i$ 结尾的最小乘积。
**转移方程**：
$$f_{max}[i] = \max(A[i], f_{max}[i-1] \cdot A[i], f_{min}[i-1] \cdot A[i])$$
$$f_{min}[i] = \min(A[i], f_{max}[i-1] \cdot A[i], f_{min}[i-1] \cdot A[i])$$

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <vector>
#include <algorithm>
using namespace std;

int maxProduct(vector<int>& nums) {
    if (nums.empty()) return 0;
    long long max_val = nums[0], min_val = nums[0], res = nums[0];
    for (size_t i = 1; i < nums.size(); ++i) {
        long long next_max = max({(long long)nums[i], max_val * nums[i], min_val * nums[i]});
        long long next_min = min({(long long)nums[i], max_val * nums[i], min_val * nums[i]});
        max_val = next_max;
        min_val = next_min;
        res = max(res, max_val);
    }
    return (int)res;
}
```

</details>

---

## <Code2 className="inline-block mr-2" /> 4. 课后强化练习

### 练习 1：方格取数 (双线线性 DP)
在 $N \times N$ 的方格中，从左上角出发两次到达右下角，求路径上数字和的最大值（每个位置的数字只能取一次）。

<details>
<summary>Check Analysis & Solution</summary>

**分析**：设两路同时走，坐标分别为 $(x1, y1), (x2, y2)$。由于步数相同，$x1+y1 = x2+y2 = k$。
状态定义：$f[k][i][j]$ 表示走了 $k$ 步，第一条路在第 $i$ 行，第二条路在第 $j$ 行。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int a[15][15], f[30][15][15];

int main() {
    int n; cin >> n;
    int x, y, z;
    while (cin >> x >> y >> z, x || y || z) a[x][y] = z;

    for (int k = 2; k <= n * 2; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                int y1 = k - i, y2 = k - j;
                if (y1 >= 1 && y1 <= n && y2 >= 1 && y2 <= n) {
                    int t = a[i][y1];
                    if (i != j) t += a[j][y2];
                    int &v = f[k][i][j];
                    v = max({f[k-1][i-1][j-1], f[k-1][i-1][j], f[k-1][i][j-1], f[k-1][i][j]}) + t;
                }
            }
        }
    }
    cout << f[n*2][n][n] << endl;
    return 0;
}
```

</details>

### 练习 2：最长公共上升子序列 (LCIS)
结合 LCS 与 LIS，要求在 $O(N^2)$ 时间内求解。

<details>
<summary>Check Solution (Optimized O(N^2))</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n; cin >> n;
    vector<int> a(n + 1), b(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    for (int i = 1; i <= n; i++) cin >> b[i];

    vector<int> f(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        int maxv = 0; // 维护 b[1..j-1] 中小于 a[i] 的 LCIS 最大值
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

## 延伸挑战

- [洛谷 P1439 LCS 模板 (LIS 转化法)](https://www.luogu.com.cn/problem/P1439)
- [洛谷 P1091 合唱队形 (双向 LIS)](https://www.luogu.com.cn/problem/P1091)
- [AtCoder DP Contest F - LCS (方案构造)](https://atcoder.jp/contests/dp/tasks/dp_f)
