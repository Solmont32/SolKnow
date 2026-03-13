---
title: 数位 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Hash, Binary, ArrowRightLeft } from 'lucide-react';
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
- **`limit` (上界限制)**：布尔值。若为 `true`，当前位可选范围受限于原数对应位；若为 `false`，则可选 `0-9`。
- **`lead` (前导零)**：布尔值。用于区分数值 `0` 与占位符 `0`。在统计数字出现次数或相邻属性（如 Windy 数）时必不可少。

### 1.2 递归转移形式化 (Recursive Transition)

$$f(\text{pos, state, limit, lead}) = \sum_{d=0}^{\text{upper}} f(\text{pos}-1, \text{next\_state}, \text{limit}', \text{lead}')$$

---

## <Layers className="inline-block mr-2" /> 2. 工业级标准实现模板

记忆化搜索是数位 DP 的首选实现方式，逻辑清晰且易于处理复杂约束。

```cpp
typedef long long ll;
ll f[20][MAX_STATE];
int digits[20];

ll dfs(int pos, int state, bool limit, bool lead) {
    if (pos == 0) return 1; // 填充完成，找到一个合法方案
    if (!limit && !lead && f[pos][state] != -1) return f[pos][state];

    ll res = 0;
    int up = limit ? digits[pos] : 9;
    for (int i = 0; i <= up; i++) {
        // 剪枝或状态转移逻辑
        res += dfs(pos - 1, new_state, limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][state] = res;
    return res;
}
```

---

## <ShieldCheck className="inline-block mr-2" /> 3. 综合练习与强化

### 练习 1：Windy 数 (经典)

统计 $[L, R]$ 内，相邻两位数字之差至少为 2 的数的个数。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <cstring>

using namespace std;

typedef long long ll;
ll f[12][12];
int a[12];

ll dfs(int pos, int pre, bool limit, bool lead) {
    if (pos == 0) return 1;
    if (!limit && !lead && f[pos][pre] != -1) return f[pos][pre];

    ll res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        if (!lead && abs(i - pre) < 2) continue;
        res += dfs(pos - 1, i, limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][pre] = res;
    return res;
}

ll solve(ll x) {
    int len = 0;
    while (x) a[++len] = x % 10, x /= 10;
    memset(f, -1, sizeof f);
    return dfs(len, 11, true, true); // 11 表示初始状态无前驱
}

int main() {
    ll l, r; cin >> l >> r;
    cout << solve(r) - solve(l - 1) << endl;
    return 0;
}
```

</details>

### 练习 2：数字计数 (ZJOI 2010)

统计区间 $[L, R]$ 内 $0-9$ 各个数字出现的总次数。

<details>
<summary>Check Solution (O(10 * digits))</summary>

```cpp
// target 为当前统计的数字 (0-9)
ll dfs(int pos, ll count, bool limit, bool lead, int target) {
    if (pos == 0) return count;
    if (!limit && !lead && f[pos][count] != -1) return f[pos][count];

    ll res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        ll next_count = count;
        if (!lead || i != 0) { // 排除前导零
            if (i == target) next_count++;
        }
        res += dfs(pos - 1, next_count, limit && (i == up), lead && (i == 0), target);
    }
    if (!limit && !lead) f[pos][count] = res;
    return res;
}
```

</details>

---

## 延伸挑战

- [洛谷 P4127 [AHOI2009] 同类分布](https://www.luogu.com.cn/problem/P4127)（状态需包含数字和与余数）
- [洛谷 P3413 SAC#1 - 萌数](https://www.luogu.com.cn/problem/P3413)（判断回文前缀）
- [HDU 4352 XHcy's LIS](http://acm.hdu.edu.cn/showproblem?pid=4352)（数位 DP 嵌套状压记录 LIS）
