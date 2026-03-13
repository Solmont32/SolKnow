---
title: 数位 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Hash, Binary, ArrowRightLeft, Target, BarChart, BookOpen, Code2 } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 数位动态规划 (Digit Dynamic Programming)

数位 DP 是一类特殊的动态规划，专门用于统计区间 $[L, R]$ 内满足特定条件的**数的个数**或**属性总和**。其核心思想是将数字视为字符序列，从高位到低位进行逐位决策，利用状态压缩和记忆化搜索规避指数级搜索空间。

---

<KnowledgeCard type="info" title="数位决策的公理化性质">
    对于大整数 $N = d_k d_{k-1} \dots d_0$，满足条件的数的统计具有：
    <br/>
    1. **可差分性**：$count[L, R] = count[0, R] - count[0, L-1]$。
    2. **逐位独立性**：在不触碰上界 (limit) 且不处于前导零 (lead) 状态时，后续位的决策方案数仅取决于当前业务逻辑状态。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 形式化建模：状态机与约束控制

在数位 DP 的递归函数中，我们需要维护以下四个核心控制变量：

### 1.1 控制变量 (Control Variables)

- **`pos` (当前位)**：从高位到低位处理，`pos = 0` 表示处理完毕。
- **`state` (业务状态)**：描述前缀属性（如已填数字之和、是否出现特定模式）。
- **`limit` (上界限制)**：布尔值。若为 `true`，当前位可选范围受限于原数对应位 $d_{pos}$；若为 `false`，则可选 `0-9`。
- **`lead` (前导零)**：布尔值。用于区分数值 `0` 与占位符 `0`。在统计数字出现次数或相邻属性（如 Windy 数）时必不可少。

---

## <BarChart className="inline-block mr-2" /> 2. 状态空间分析与复杂度收敛

数位 DP 的效率源于其**极高的状态重用率**。

### 2.1 状态转移的形式化描述 (Formal Derivation)
设 $f(pos, state, limit, lead)$ 为当前状态下的合法方案数。
$$
f(pos, state, limit, lead) = \sum_{d=0}^{up} f(pos-1, next\_state(state, d), limit \land (d=up), lead \land (d=0))
$$
其中 $up = limit ? d_{pos} : 9$。

**证明要点**：
当 $limit = false$ 且 $lead = false$ 时，当前位填入任何数字都不会超过原数限制，也不会受前导零干扰，因此该状态的结果对所有后续相同位及业务状态是**通用**的，可以缓存。

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
