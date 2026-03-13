---
title: 数位 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Hash, Binary, ArrowRightLeft, Target, BarChart, BookOpen, Code2 } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 数位动态规划 (Digit Dynamic Programming)

数位 DP 是一类特殊的动态规划，专门用于统计区间 $[L, R]$ 内满足特定条件的**数的个数**或**属性总和**。其核心思想是将数字视为字符序列，从高位到低位进行逐位决策，利用状态压缩和记忆化搜索规避指数级搜索空间。

---

### 1.1 数位决策的公理化性质 (Axiomatic Properties)

对于大整数 $N = d_k d_{k-1} \dots d_0$，满足条件的数的统计具有：
1. **可差分性**：$count[L, R] = count[0, R] - count[0, L-1]$。
2. **逐位独立性**：在不触碰上界 (limit) 且不处于前导零 (lead) 状态时，后续位的决策方案数仅取决于当前业务逻辑状态。

### 1.2 收敛性与状态空间分析 (Convergence & State Space)

**状态收敛性分析**：
数位 DP 的收敛性建立在数字位数的严格单调减小上。
1. **拓扑序**：状态转移 $pos \to pos-1$ 构成一条线性链。
2. **有限性证明**：状态空间总大小为 $O(\text{digits} \times \text{business\_states})$。由于 `pos` 每次递归减 1，算法必然在 $O(\text{digits})$ 深度内返回。
3. **复杂度收敛**：通过记忆化，实际访问的状态数远小于原始搜索空间的指数级，最终复杂度收敛于 $O(10 \cdot \text{digits} \cdot \text{business\_states})$。

---

## <BarChart className="inline-block mr-2" /> 2. 状态转移方程的导出与证明

### 2.1 数位组合最优子结构证明

**命题**：数位统计问题的解满足最优子结构，即前 $k$ 位的合法计数可通过前 $k-1$ 位的状态唯一推导。

**证明**：
设 $f(pos, state)$ 为处理到第 $pos$ 位、业务状态为 $state$ 时的合法数量。
对于第 $pos$ 位的每一个可选数字 $d \in [0, 9]$，其产生的合法数必然是：所有以 $d$ 为前缀、且剩余 $pos-1$ 位满足 $next\_state(state, d)$ 的组合。
由于 $pos-1$ 位的解 $f(pos-1, next\_state)$ 已包含该状态下的最优（完备）计数，故 $f(pos, state)$ 亦为完备解。证毕。

---

## <Layers className="inline-block mr-2" /> 3. 工业级标准实现模板

记忆化搜索是数位 DP 的首选实现方式，逻辑清晰且易于扩展。

```cpp
typedef long long ll;
ll f[20][MAX_STATE];
int digits[20];

ll dfs(int pos, int state, bool limit, bool lead) {
    if (pos == 0) return 1; // 填充完成，返回一种合法方案
    // 只有在不受限且非前导零时才从记忆化数组读取
    if (!limit && !lead && f[pos][state] != -1) return f[pos][state];

    ll res = 0;
    int up = limit ? digits[pos] : 9;
    for (int i = 0; i <= up; i++) {
        // 剪枝或状态转移逻辑
        res += dfs(pos - 1, next_state(state, i), limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][state] = res;
    return res;
}
```

---

## <ShieldCheck className="inline-block mr-2" /> 4. 教材化典型例题

### 例题 1：Windy 数

**问题描述**：不含前导零且相邻两个数字之差至少为 $2$ 的正整数。
**状态定义**：`dfs(pos, last_digit, limit, lead)`。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <cstring>

using namespace std;

int a[15];
long long f[15][15];

long long dfs(int pos, int pre, bool limit, bool lead) {
    if (pos == 0) return 1;
    if (!limit && !lead && f[pos][pre] != -1) return f[pos][pre];

    long long res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        if (!lead && abs(i - pre) < 2) continue;
        res += dfs(pos - 1, i, limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][pre] = res;
    return res;
}

long long solve(int n) {
    int len = 0;
    while (n) a[++len] = n % 10, n /= 10;
    memset(f, -1, sizeof f);
    return dfs(len, 0, true, true);
}

int main() {
    int l, r;
    cin >> l >> r;
    cout << solve(r) - solve(l - 1) << endl;
    return 0;
}
```

</details>

---

## <Code2 className="inline-block mr-2" /> 5. 课后强化练习

### 练习 1：[AHOI2009] 同类分布
统计 $[L, R]$ 中能被其各位数字之和整除的数的个数。

<details>
<summary>Check Analysis & Solution</summary>

**分析**：数字之和最大为 $9 \times 18 = 162$。我们需要外层枚举可能的数字之和 $S_{target}$。
状态：`f[pos][current_sum][rem]`，其中 `rem` 是当前数对 $S_{target}$ 的余数。

```cpp
ll dfs(int pos, int sum, int rem, bool limit, bool lead, int target) {
    if (pos == 0) return (sum == target && rem == 0);
    if (!limit && !lead && f[pos][sum][rem] != -1) return f[pos][sum][rem];
    
    ll res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        if (sum + i > target) break;
        res += dfs(pos-1, sum+i, (rem*10+i)%target, limit && (i==up), lead && (i==0), target);
    }
    return limit || lead ? res : f[pos][sum][rem] = res;
}
```

</details>

### 练习 2：数字计数
统计 $[L, R]$ 中 $0-9$ 每个数字出现的总次数。

<details>
<summary>Check Solution Hint</summary>

状态：`dfs(pos, count, target, limit, lead)`。`count` 表示当前已填入数字中 `target` 出现的次数。
每次计算一个数字 $0-9$，调用 $10$ 次 `dfs`（或在一个 `dfs` 中同时维护 $10$ 个状态，但前者逻辑更清晰）。

</details>

---

## 延伸挑战
- [洛谷 P4127 [AHOI2009] 同类分布](https://www.luogu.com.cn/problem/P4127)
- [洛谷 P2657 [SCOI2009] windy 数](https://www.luogu.com.cn/problem/P2657)
- [HDU 4352 XHcy's LIS](http://acm.hdu.edu.cn/showproblem?pid=4352) (数位 DP + 状压 LIS)
- [CF 628D Magic Numbers](https://codeforces.com/problemset/problem/628/D)
