---
title: 数位 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 数位动态规划 (Digit DP)

数位 DP 是一类特殊的计数 DP，通常用于统计区间 $[L, R]$ 内满足某种条件的数的个数。此类问题如果暴力枚举会超时（$R$ 可能高达 $10^{18}$），因此需要**按位进行决策**。

---

<KnowledgeCard type="info" title="按位构造思想">
    将一个数看作一个字符串，从高位到低位依次填入 $0-9$ 的数字。
    <br/>
    在填充过程中，我们需要关注：
    - **当前位**：正在填第几位。
    - **限制标志 (limit)**：当前位是否受到原数 $R$ 的限制。
    - **前导零 (lead)**：是否存在前导零，这会影响某些条件的判定（如相邻位之差）。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 递归模板 (Memoized DFS)

这是数位 DP 的“工业级标准模板”，简洁且扩展性强。

```cpp
ll dfs(int pos, int state, bool limit, bool lead) {
    if (pos == -1) return 1; // 填充完毕，返回 1
    if (!limit && !lead && f[pos][state] != -1) return f[pos][state]; // 记忆化
    
    ll res = 0;
    int up = limit ? a[pos] : 9; // 确定当前位上限
    for (int i = 0; i <= up; i++) {
        // ... 根据条件剪枝 ...
        res += dfs(pos - 1, new_state, limit && (i == up), lead && (i == 0));
    }
    
    if (!limit && !lead) f[pos][state] = res;
    return res;
}
```

---

## <Zap className="inline-block mr-2" /> 2. 差分思想

通常要求区间 $[L, R]$ 的解，我们可以利用前缀和思想：
$$\text{solve}(L, R) = \text{solve}(R) - \text{solve}(L - 1)$$
这使得我们只需实现统计 $[0, X]$ 内满足条件数的函数。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 综合练习与强化

### 练习 1：Windy 数
统计 $[L, R]$ 内，相邻两位数字之差至少为 2 的数的个数。

<details>
<summary>Check Solution (Memoized DFS)</summary>

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <cstring>

using namespace std;

typedef long long ll;
ll f[20][20];
int a[20];

ll dfs(int pos, int pre, bool limit, bool lead) {
    if (pos == -1) return 1;
    if (!limit && !lead && f[pos][pre] != -1) return f[pos][pre];

    ll res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        if (!lead && abs(i - pre) < 2) continue; // Windy 数判定
        res += dfs(pos - 1, i, limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][pre] = res;
    return res;
}

ll solve(int x) {
    int pos = 0;
    while (x) a[pos++] = x % 10, x /= 10;
    memset(f, -1, sizeof f);
    return dfs(pos - 1, 11, true, true);
}

int main() {
    int l, r; cin >> l >> r;
    cout << solve(r) - solve(l - 1) << endl;
    return 0;
}
```
</details>

---

## 延伸挑战
- [洛谷 P2602 [ZJOI2010] 数字计数](https://www.luogu.com.cn/problem/P2602)（统计各数字出现频次）
- [洛谷 P2657 [SCOI2009] windy 数](https://www.luogu.com.cn/problem/P2657)
- [HDU 2089 不要 62](http://acm.hdu.edu.cn/showproblem.php?pid=2089)
