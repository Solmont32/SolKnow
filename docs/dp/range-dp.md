---
title: 区间 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Merge, Scaling, CheckCircle2, BookOpen, Code2 } from 'lucide-react';
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

### 1.2 最优子结构的形式化证明：以矩阵链乘为例

**命题**：设矩阵序列 $A_i, \dots, A_j$ 的最优乘法顺序在 $k$ 处断开，则其子序列 $A_i, \dots, A_k$ 的乘法顺序也必须是该子序列的最优顺序。

**证明 (反证法)**：
若存在另一顺序使得计算 $A_i, \dots, A_k$ 的代价更小，由于总代价 $f[i][j] = f[i][k] + f[k+1][j] + p_{i-1}p_kp_j$，我们将更小的 $f'[i][k]$ 代入，将得到一个比 $f[i][j]$ 更小的总代价，这与 $f[i][j]$ 是最优代价矛盾。证毕。

### 1.3 收敛性分析 (Convergence Analysis)

**基于长度的归纳逻辑**：
区间 DP 的收敛性建立在区间长度 $L = j - i + 1$ 的单调递增上。
1. **初始状态**：$L=1$ 的解已给出。
2. **状态依赖**：$L=k$ 的解仅依赖于 $L < k$ 的子区间解。
3. **有限性**：$1 \le L \le N$。
因此，外层循环控制 $L \in [2, N]$ 保证了算法必然在 $O(N^3)$ 步内收敛。对于满足决策单调性的问题，利用 $s[i][j-1] \le s[i][j] \le s[i+1][j]$，其总代价收敛于 $O(N^2)$。

---

## <Layers className="inline-block mr-2" /> 2. 核心技术：四边形不等式优化 (Knuth Optimization)

对于满足特定性质（如**区间包含单调性**和**四边形不等式**）的 $cost$ 函数，区间 DP 的复杂度可以从 $O(N^3)$ 优化至 $O(N^2)$。

### 2.1 四边形不等式与决策单调性证明

**命题**：若 $cost(i, j)$ 满足四边形不等式且对于区间包含具有单调性，则最优分割点 $s[i][j]$ 满足决策单调性。

**验证要点 (Verification)**：
在具体题目中，验证决策单调性的步骤如下：
1. **代数验证**：检查 $cost(i, j) + cost(i+1, j+1) \le cost(i, j+1) + cost(i+1, j)$ 是否成立。
2. **打表观察**：对于难以分析的 $cost$，通过小程序输出小规模数据的 $s[i][j]$，检查是否满足 $s[i][j-1] \le s[i][j] \le s[i+1][j]$。

<div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">
  <p className="font-bold flex items-center"><Zap className="mr-2 text-amber-500" /> 复杂度飞跃</p>
  <p>利用该性质，在枚举分割点 $k$ 时，只需在 $[s[i][j-1], s[i+1][j]]$ 范围内查找。总代价为 $\sum_{len=2}^n \sum_{i=1}^{n-len+1} (s[i+1][j] - s[i][j-1] + 1)$。这是一个典型的**伸缩求和 (Telescoping Sum)**，最终收敛于 $O(N^2)$。</p>
</div>

---

## <ShieldCheck className="inline-block mr-2" /> 3. 教材化典型例题

### 例题 1：石子合并 (环形优化版)

**问题描述**：$N$ 堆石子绕成一圈，每次合并相邻两堆，求最小总得分。
**处理技巧**：倍长序列法。将序列 $1 \dots N$ 复制一份接在后面变成 $1 \dots 2N$，最后在所有长度为 $N$ 的区间中取最值。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstring>

using namespace std;

const int MAXN = 405;
int f[MAXN][MAXN], s[MAXN], w[MAXN];

int main() {
    int n; cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> w[i];
        w[i + n] = w[i];
    }
    for (int i = 1; i <= 2 * n; i++) s[i] = s[i - 1] + w[i];

    memset(f, 0x3f, sizeof f);
    for (int i = 1; i <= 2 * n; i++) f[i][i] = 0;

    for (int len = 2; len <= n; len++) {
        for (int i = 1; i + len - 1 <= 2 * n; i++) {
            int j = i + len - 1;
            for (int k = i; k < j; k++) {
                f[i][j] = min(f[i][j], f[i][k] + f[k + 1][j] + s[j] - s[i - 1]);
            }
        }
    }

    int res = 1e9;
    for (int i = 1; i <= n; i++) res = min(res, f[i][i + n - 1]);
    cout << res << endl;
    return 0;
}
```

</details>

### 例题 2：能量项链 (Matrix Chain Multiplication Variant)

**状态定义**：$f[i][j]$ 表示将第 $i$ 颗到第 $j$ 颗珠子合并产生的最大能量。
**转移方程**：$f[i][j] = \max \{ f[i][k] + f[k+1][j] + head[i] \cdot tail[k] \cdot tail[j] \}$

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int n, a[205], f[205][205];

int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        a[i + n] = a[i];
    }
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i + len - 1 <= 2 * n; i++) {
            int j = i + len - 1;
            for (int k = i; k < j; k++) {
                f[i][j] = max(f[i][j], f[i][k] + f[k+1][j] + a[i] * a[k+1] * a[j+1]);
            }
        }
    }
    int res = 0;
    for (int i = 1; i <= n; i++) res = max(res, f[i][i + n - 1]);
    cout << res << endl;
    return 0;
}
```

</details>

---

## <Code2 className="inline-block mr-2" /> 4. 课后强化练习

### 练习 1：多边形游戏 (Polygon)
一个多边形，顶点是数字，边是运算符（+ 或 *）。删除一条边变成链，求最大得分。注意负数乘负数可能变成极大正数。

<details>
<summary>Check Analysis</summary>

**分析**：需要同时维护最大值 $f_{max}[i][j]$ 和最小值 $f_{min}[i][j]$。
如果是乘法：
- $max = \max(max\_l * max\_r, max\_l * min\_r, min\_l * max\_r, min\_l * min\_r)$
- $min = \min(max\_l * max\_r, max\_l * min\_r, min\_l * max\_r, min\_l * min\_r)$

</details>

### 练习 2：最优二叉搜索树 (Optimal BST)
给定一组关键字及其搜索频率，构造一棵搜索代价最小的二叉搜索树。

<details>
<summary>Check Solution Hint</summary>

这不仅满足最优子结构，且满足四边形不等式，可以用 $O(N^2)$ 求解。
$$f[i][j] = \min \{ f[i][k-1] + f[k+1][j] \} + \sum_{p=i}^j weight[p]$$

</details>

---

## 延伸挑战

- [洛谷 P1880 石子合并](https://www.luogu.com.cn/problem/P1880)
- [洛谷 P1063 能量项链](https://www.luogu.com.cn/problem/P1063)
- [AtCoder DP Contest N - Slimes](https://atcoder.jp/contests/dp/tasks/dp_n)
