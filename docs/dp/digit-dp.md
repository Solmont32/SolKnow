---
title: 数位 DP
---

import { Hash, Target, Zap, ChevronRight } from 'lucide-react';

# 数位动态规划 (Digit DP)

数位 DP 是一种处理关于 **数字位数性质或统计** 的动态规划方法。它通常用于解决“在区间 $[L, R]$ 内，有多少个正整数满足某种特定条件”的问题。这类条件的共同特征是：**条件与数的具体大小关系较弱，而与数的每一位数字（数位）的关系较强。**

---

## <Hash className="inline-block mr-2" /> 核心建模思想

数位 DP 的本质是在 **数位搜索树** 上进行记忆化搜索。

### 1. 状态定义
标准的状态通常包含以下维度：
- `pos`：当前处理到的数位（从高到低或从低到高）。
- `limit`：**上界限制标志**。布尔值，表示当前位是否受到 $N$ 对应位的限制。
- `lead`：**前导零标志**。布尔值，表示当前位之前是否全是 $0$。这对于处理包含数字 $0$ 的统计或长度限制至关重要。
- `state`：核心业务逻辑状态（如已出现的数字、模数、是否包含特定子串等）。

### 2. 记忆化搜索模板

```cpp
long long a[20];
long long f[20][state_size];

/**
 * @param pos   当前位数
 * @param state 业务状态
 * @param limit 是否受限
 * @param lead  是否有前导零
 */
long long dfs(int pos, int state, bool limit, bool lead) {
    if (pos == 0) return 1; // 递归终点：填完了所有位且合法
    // 只有在不受限且无前导零时，状态才具有通用性，可以查表
    if (!limit && !lead && f[pos][state] != -1) return f[pos][state];

    long long res = 0;
    int up = limit ? a[pos] : 9; // 确定当前位枚举的上界

    for (int i = 0; i <= up; i++) {
        // 核心逻辑：判断 i 是否符合题目条件
        if (!check(i, state)) continue;
        
        // 状态转移
        res += dfs(pos - 1, get_next_state(i, state), 
                   limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][state] = res; // 记忆化
    return res;
}
```

---

## <Target className="inline-block mr-2" /> 经典模型解析

### 1. 不包含特定数字（如 "4"）
这是最基础的模型。
- **状态**：只需 `pos, limit, lead`。
- **转移条件**：`i != 4`。

### 2. Windy 数 (BZOJ 1026)
**题目描述**：求 $[L, R]$ 内相邻数字之差至少为 $2$ 的正整数个数。
- **状态设计**：`f[pos][pre]`，其中 `pre` 记录上一位的数字。
- **关键处理**：由于前导零存在时，当前位填任何非零数都不受“差值 $\ge 2$”的限制，因此 `lead` 必须参与逻辑判断。

---

## <Zap className="inline-block mr-2" /> 完备例题解答

### 例题 1：不要 62 (HDU 2089)
求 $[L, R]$ 范围内不包含 "4" 且不包含 "62" 的数字个数。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

int a[20];
int f[20][10];

int dfs(int pos, int pre, bool limit) {
    if (pos == 0) return 1;
    if (!limit && f[pos][pre] != -1) return f[pos][pre];

    int res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        if (i == 4) continue;
        if (pre == 6 && i == 2) continue;
        res += dfs(pos - 1, i, limit && (i == up));
    }

    if (!limit) f[pos][pre] = res;
    return res;
}

int solve(int n) {
    int len = 0;
    while (n) a[++len] = n % 10, n /= 10;
    memset(f, -1, sizeof f);
    return dfs(len, 0, true);
}

int main() {
    int l, r;
    while (cin >> l >> r && (l || r)) {
        cout << solve(r) - solve(l - 1) << endl;
    }
    return 0;
}
```
</details>

### 例题 2：数字计数 (Luogu P2602)
统计 $[L, R]$ 中 $0 \sim 9$ 每个数字出现的总次数。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <cstring>
using namespace std;
typedef long long ll;

ll l, r;
int a[20], target;
ll f[20][20];

ll dfs(int pos, int cnt, bool limit, bool lead) {
    if (pos == 0) return cnt;
    if (!limit && !lead && f[pos][cnt] != -1) return f[pos][cnt];

    ll res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        res += dfs(pos - 1, cnt + (!lead || i != 0 ? i == target : 0),
                   limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][cnt] = res;
    return res;
}

ll solve(ll n) {
    int len = 0;
    while (n) a[++len] = n % 10, n /= 10;
    memset(f, -1, sizeof f);
    return dfs(len, 0, true, true);
}

int main() {
    cin >> l >> r;
    for (int i = 0; i <= 9; i++) {
        target = i;
        cout << solve(r) - solve(l - 1) << (i == 9 ? "" : " ");
    }
    return 0;
}
```
</details>

---

## <ChevronRight className="inline-block mr-2" /> 进阶练习

1. **[Luogu P2657] Windy 数**：处理前导零的经典练习。
2. **[Luogu P4127] 同类分布**：数位之和模 $S$ 且原数模 $S$ 为 $0$，需要枚举 $S$。
3. **[Luogu P4317] 花神降临隔壁**：二进制数位 DP，统计 $1$ 的个数并利用快速幂求积。

<details>
<summary>练习 2 思路提示</summary>

由于数位之和 $S$ 最大只有 $9 \times 18 = 162$，可以外层枚举 $S$，内层 DP 状态为 `f[pos][current_sum][rem]`，判断最终 `current_sum == S` 且 `rem == 0`。
</details>
