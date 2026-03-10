---
title: 数位 DP
---

import { Hash, Target, Zap, ChevronRight, Binary, Fingerprint } from 'lucide-react';

# 数位动态规划 (Digit DP)

数位 DP 是一种处理关于 **数字位数性质或统计** 的动态规划方法。它通常用于解决“在区间 $[L, R]$ 内，有多少个正整数满足某种特定条件”的问题。这类条件的共同特征是：**条件与数的具体大小关系较弱，而与数的每一位数字（数位）的关系较强。**

---

## <Hash className="inline-block mr-2" /> 核心建模思想

数位 DP 的本质是在 **数位搜索树 (Digit Search Tree)** 上进行记忆化搜索。我们将大整数 $N$ 视为一个序列 $A = \{a_1, a_2, \dots, a_n\}$，其中 $a_1$ 是最高位。

### 1. 形式化状态定义
一个标准的数位 DP 状态通常定义为 $f(pos, state, limit, lead)$：
- $pos$：当前处理到的数位下标（通常从高到低枚举，$n \to 1$）。
- $state$：业务逻辑状态，用于记录已填数位的特征（如：前一位数字、当前数位和、模 $K$ 的余数等）。
- $limit$：**上界限制标志**。若为 `true`，则当前位最大只能填 $a_{pos}$；若为 `false`，则可填 $0 \sim 9$。
- $lead$：**前导零标志**。若为 `true`，表示当前位之前填的全是 $0$。这对于区分数字 $0$ 是数值本身的组成部分还是占位符至关重要。

### 2. 差分转化
由于统计具有区间可加性，通常将 $[L, R]$ 的查询转化为：
$$ans(L, R) = solve(R) - solve(L - 1)$$

---

## <Target className="inline-block mr-2" /> 核心逻辑推导

### 1. 记忆化搜索模板 (Standard Template)

```cpp
typedef long long ll;
ll f[20][MAX_STATE];
int a[20];

/**
 * @param pos   当前位数 (n -> 1)
 * @param state 业务逻辑状态
 * @param limit 是否受最高位限制
 * @param lead  是否有前导零
 */
ll dfs(int pos, int state, bool limit, bool lead) {
    if (pos == 0) return 1; // 递归终点
    
    // 记忆化：只有在不受限且无前导零时，状态才具有普适性
    if (!limit && !lead && f[pos][state] != -1) return f[pos][state];

    ll res = 0;
    int up = limit ? a[pos] : 9; // 确定枚举上界

    for (int i = 0; i <= up; i++) {
        // 条件判断逻辑
        if (!check(i, state, lead)) continue;
        
        res += dfs(pos - 1, 
                   next_state(i, state, lead), 
                   limit && (i == up), 
                   lead && (i == 0));
    }

    if (!limit && !lead) f[pos][state] = res;
    return res;
}
```

### 2. 前导零 (Leading Zeros) 的处理逻辑
在处理如“相邻位差值”或“数字 $0$ 出现次数”时，前导零的存在会导致逻辑失效。
- 若 `lead = true` 且填 `i = 0`：该位仍被视为占位符，不触发某些约束（如 Windy 数的差值限制）。
- 若 `lead = false`：则填入的 `i` 是数值的一部分，必须满足所有约束。

---

## <Binary className="inline-block mr-2" /> 进阶模型：数位和与同余

**模型描述**：求区间 $[L, R]$ 中数位之和模 $K$ 等于 $0$ 的数。
- **状态设计**：$f(pos, sum\_rem, limit, lead)$。其中 $sum\_rem$ 记录当前已填数字之和对 $K$ 取模的结果。
- **转移**：新余数为 $(sum\_rem + i) \pmod K$。

---

## <Fingerprint className="inline-block mr-2" /> 完备例题解答

### 例题 1：Windy 数 (Luogu P2657)
**题目**：不含前导零且相邻两个数字之差至少为 $2$ 的正整数。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <cstring>
using namespace std;

typedef long long ll;
ll f[15][15];
int a[15];

ll dfs(int pos, int pre, bool limit, bool lead) {
    if (pos == 0) return 1;
    if (!limit && !lead && f[pos][pre] != -1) return f[pos][pre];

    ll res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        // 如果有前导零，当前位填什么都可以；否则需要满足差值 >= 2
        if (!lead && abs(i - pre) < 2) continue;
        res += dfs(pos - 1, i, limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][pre] = res;
    return res;
}

ll solve(ll n) {
    if (n < 0) return 0;
    if (n == 0) return 0;
    int len = 0;
    while (n) a[++len] = n % 10, n /= 10;
    memset(f, -1, sizeof f);
    return dfs(len, -2, true, true);
}

int main() {
    ll l, r;
    cin >> l >> r;
    cout << solve(r) - solve(l - 1) << endl;
    return 0;
}
```
</details>

### 例题 2：同类分布 (Luogu P4127)
**题目**：求区间 $[L, R]$ 中，能被自己各数位之和整除的数。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <cstring>
using namespace std;
typedef long long ll;

int a[20], target_sum;
ll f[20][165][165]; // pos, current_sum, rem

ll dfs(int pos, int cur_sum, int rem, bool limit, bool lead) {
    if (pos == 0) return (cur_sum == target_sum && rem == 0);
    if (!limit && !lead && f[pos][cur_sum][rem] != -1) return f[pos][cur_sum][rem];

    ll res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        if (cur_sum + i > target_sum) break;
        res += dfs(pos - 1, cur_sum + i, (rem * 10 + i) % target_sum,
                   limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][cur_sum][rem] = res;
    return res;
}

ll solve(ll n) {
    int len = 0;
    while (n) a[++len] = n % 10, n /= 10;
    ll ans = 0;
    // 枚举可能的数位之和 S
    for (target_sum = 1; target_sum <= 9 * len; target_sum++) {
        memset(f, -1, sizeof f);
        ans += dfs(len, 0, 0, true, true);
    }
    return ans;
}

int main() {
    ll l, r;
    cin >> l >> r;
    cout << solve(r) - solve(l - 1) << endl;
    return 0;
}
```
</details>

---

## <ChevronRight className="inline-block mr-2" /> 练习强化

1. **[HDU 3555] Bomb**：求 $1 \sim N$ 中包含 "49" 的数字个数。
2. **[POJ 3252] Round Numbers**：二进制下 $0$ 的个数不少于 $1$ 的个数。
3. **[CQOI 2016] 手机号码**：包含连续三个相同的数字且不同时包含 '8' 和 '4'。
