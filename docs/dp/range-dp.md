---
title: 区间 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Merge, Scaling, CheckCircle2 } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 区间动态规划 (Interval Dynamic Programming)

区间 DP 是一类以**区间长度**作为阶段演进指标的动态规划。其核心逻辑是由短区间的解逐步归纳出长区间的解，通常用于处理具有“合并”或“拆分”物理特性的问题。

---

## <Microscope className="inline-block mr-2" /> 1. 形式化建模：导出与验证

### 1.1 状态转移方程的导出 (Derivation)

对于闭区间 $[i, j]$，其最优解通常源于其子区间 $[i, k]$ 与 $[k+1, j]$ 的某种最优合并方案。

**基本归纳式**：
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + \text{cost}(i, k, j) \}$$

- **边界条件**：$f[i][i] = \text{base\_value}$。
- **计算序 (Ordering)**：由于 $f[i][j]$ 依赖于长度更短的 $f[i][k]$ 和 $f[k+1][j]$，必须按**区间长度 $len$ 从小到大**进行递推。

### 1.2 无后效性 (No-after-effect) 逻辑验证

**验证命题**：在合并区间 $[i, j]$ 时，子区间 $[i, k]$ 的内部合并路径不影响 $[i, j]$ 之后更大区间的合并策略。

<div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
  <p className="font-bold flex items-center"><CheckCircle2 className="mr-2 text-blue-500" /> 验证实例：石子合并</p>
  <p>一旦区间 $[i, k]$ 的石子合并完成，该区间就变成了一堆重量为 $\sum_{p=i}^k w_p$ 的石子。后续合并只取决于这堆石子的总重量，而与其内部是如何一步步合并而来的历史过程完全无关。</p>
</div>

---

## <Layers className="inline-block mr-2" /> 2. 核心技术：四边形不等式初步 (Optimization)

对于满足特定性质（如**区间包含单调性**和**四边形不等式**）的 $cost$ 函数，区间 DP 的复杂度可以从 $O(N^3)$ 优化至 $O(N^2)$。

**四边形不等式定义**：对于 $a < b < c < d$，若 $f[a][c] + f[b][d] \le f[a][d] + f[b][c]$，则称 $f$ 满足四边形不等式。此时可证明最优分割点 $k$ 满足：
$$s[i][j-1] \le s[i][j] \le s[i+1][j]$$
其中 $s[i][j]$ 为 $f[i][j]$ 的最优分割点。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 综合练习与严谨实现

### 练习 1：石子合并 (直线版)

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstring>

using namespace std;

const int MAXN = 305;
int f[MAXN][MAXN], s[MAXN], w[MAXN];

/**
 * @brief Stone Merging logic
 * Time Complexity: O(N^3)
 */
int main() {
    int n; cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> w[i];
        s[i] = s[i-1] + w[i];
    }

    memset(f, 0x3f, sizeof f);
    for (int i = 1; i <= n; i++) f[i][i] = 0;

    for (int len = 2; len <= n; len++) { // 阶段：长度
        for (int i = 1; i + len - 1 <= n; i++) { // 状态：左端点
            int j = i + len - 1;
            for (int k = i; k < j; k++) { // 决策：分割点
                f[i][j] = min(f[i][j], f[i][k] + f[k+1][j] + s[j] - s[i-1]);
            }
        }
    }
    cout << f[1][n] << endl;
    return 0;
}
```

</details>

### 练习 2：括号匹配构造 (Minimum Bracket Addition)

<details>
<summary>Check Solution (Logic)</summary>

```cpp
// 状态：f[i][j] 表示使 s[i..j] 合法的最少添加数
if (match(s[i], s[j])) f[i][j] = min(f[i][j], f[i+1][j-1]);
for (int k = i; k < j; k++) 
    f[i][j] = min(f[i][j], f[i][k] + f[k+1][j]);
```

</details>

---

## 延伸挑战

- [洛谷 P1880 石子合并 (环形处理：倍长序列法)](https://www.luogu.com.cn/problem/P1880)
- [洛谷 P1063 能量项链](https://www.luogu.com.cn/problem/P1063)
- [AtCoder DP Contest N - Slimes (四边形不等式练习)](https://atcoder.jp/contests/dp/tasks/dp_n)
