---
title: 数位 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 数位动态规划 (Digit DP)

数位 DP 是一类特殊的计数 DP，通常用于统计区间 $[L, R]$ 内满足某种条件的数的个数。此类问题如果暴力枚举会超时（$R$ 可能高达 $10^{18}$），因此需要**按位进行决策**。

---

<KnowledgeCard type="info" title="按位构造与状态机思想">
    将一个数看作一个字符串，从高位到低位依次填入 $0-9$ 的数字。其核心在于通过状态机维护“已填前缀”的属性。
    <br/>
    - **limit (限制位)**：布尔值。若为 true，则当前位只能填到原数该位的值；若为 false，则可填 $0-9$。一旦某位填了小于上限的值，后续位的 limit 均变为 false。
    - **lead (前导零位)**：布尔值。用于区分数字 $0$ 是“数值上的零”还是“占位的前导零”。这在统计数字出现次数或判断相邻差（如 Windy 数）时至关重要。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 递归模板 (Memoized DFS)

这是数位 DP 的“工业级标准模板”，简洁且扩展性强。

```cpp
ll dfs(int pos, int state, bool limit, bool lead) {
    if (pos == -1) return 1; // 填充完毕，返回 1
    // 注意：只有在无 limit 且无 lead 的情况下才能直接返回缓存，
    // 因为受限状态或前导零状态下的解是不通用的。
    if (!limit && !lead && f[pos][state] != -1) return f[pos][state];

    ll res = 0;
    int up = limit ? a[pos] : 9; // 确定当前位上限
    for (int i = 0; i <= up; i++) {
        // ... 根据条件剪枝/更新 state ...
        res += dfs(pos - 1, new_state, limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][state] = res;
    return res;
}
```

---

## <Zap className="inline-block mr-2" /> 2. 差分思想与前缀和

通常要求区间 $[L, R]$ 的解，我们可以利用前缀和思想：
$$\text{solve}(L, R) = \text{solve}(R) - \text{solve}(L - 1)$$

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
        // 如果有前导零，则当前位 i 不受相邻差限制
        if (!lead && abs(i - pre) < 2) continue;
        res += dfs(pos - 1, i, limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][pre] = res;
    return res;
}
// ... solve 函数同上 ...
```

</details>

### 练习 2：数字计数 (Digit Counting)

统计区间 $[L, R]$ 内数字 $k \in [0, 9]$ 出现的总次数。

<details>
<summary>Check Solution</summary>

```cpp
// 状态定义：dfs(pos, count, limit, lead)
// count 表示当前前缀中数字 k 出现的次数
ll dfs(int pos, int count, bool limit, bool lead, int k) {
    if (pos == -1) return count;
    if (!limit && !lead && f[pos][count] != -1) return f[pos][count];

    ll res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        int next_count = count;
        // 只有不是前导零时的数字 k 才计入总数
        if (!(lead && i == 0) && i == k) next_count++;
        res += dfs(pos - 1, next_count, limit && (i == up), lead && (i == 0), k);
    }

    if (!limit && !lead) f[pos][count] = res;
    return res;
}
```

</details>

---

## 延伸挑战

- [洛谷 P2602 [ZJOI2010] 数字计数](https://www.luogu.com.cn/problem/P2602)
- [洛谷 P4127 [AHOI2009] 同类分布](https://www.luogu.com.cn/problem/P4127)（数位 DP 结合模运算状态）
- [HDU 4352 XHcy's LIS](http://acm.hdu.edu.cn/showproblem.php?pid=4352)（数位 DP 嵌套状压记录 LIS）
