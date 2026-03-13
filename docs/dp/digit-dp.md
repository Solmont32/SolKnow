---
title: 数位 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Hash, Binary, ArrowRightLeft, Target, BarChart } from 'lucide-react';
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

---

## <BarChart className="inline-block mr-2" /> 2. 状态空间分析与复杂度收敛

数位 DP 的效率源于其**极高的状态重用率**。

### 2.1 状态空间规模 (State Space)
设总位数为 $D$（对于 $10^{18}$ 的数，$D \approx 18$），业务状态数为 $S$。
- **总状态数**：$D \times S \times 2 \times 2$。
- **记忆化核心**：仅当 `limit = false` 且 `lead = false` 时，状态才具有普适性，可以存入 `f[pos][state]`。
- **复杂度**：$O(D \cdot S \cdot 10)$。相比于 $10^D$ 的暴力枚举，实现了从指数级到多项式级的跨越。

### 2.2 属性总和扩展 (Sum of Attributes)
若题目要求统计“所有满足条件的数的平方和”，状态需维护三元组：
- `cnt`: 方案数。
- `sum`: 数值之和。
- `sqr`: 数值平方和。
通过 $(a+b)^2 = a^2 + 2ab + b^2$ 进行转移。

---

## <Layers className="inline-block mr-2" /> 3. 工业级标准实现模板

记忆化搜索是数位 DP 的首选实现方式。

```cpp
typedef long long ll;
ll f[20][MAX_STATE];
int digits[20];

ll dfs(int pos, int state, bool limit, bool lead) {
    if (pos == 0) return 1; // 填充完成
    // 只有在不受限且非前导零时才从记忆化数组读取
    if (!limit && !lead && f[pos][state] != -1) return f[pos][state];

    ll res = 0;
    int up = limit ? digits[pos] : 9;
    for (int i = 0; i <= up; i++) {
        // 剪枝或状态转移逻辑
        res += dfs(pos - 1, next_state, limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][state] = res;
    return res;
}
```

---

## <ShieldCheck className="inline-block mr-2" /> 4. 综合练习与强化

### 练习 1：[AHOI2009] 同类分布
统计 $[L, R]$ 中能被其各位数字之和整除的数的个数。

<details>
<summary>Check Solution (C++)</summary>

**分析**：数字之和最大为 $9 \times 18 = 162$。我们需要枚举可能的数字之和 $S_{target}$。
```cpp
ll dfs(int pos, int sum, int rem, bool limit, bool lead, int target) {
    if (pos == 0) return (sum == target && rem == 0);
    if (!limit && !lead && f[pos][sum][rem] != -1) return f[pos][sum][rem];
    
    ll res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        res += dfs(pos-1, sum+i, (rem*10+i)%target, limit && (i==up), lead && (i==0), target);
    }
    return limit || lead ? res : f[pos][sum][rem] = res;
}
```

</details>

### 练习 2：[SCOI2009] 生日礼物 (数位 DP + 状压)
统计相邻位数字之差 $\le 2$ 且包含所有数字 $0-9$ 的方案。

<details>
<summary>Check Solution (Bitmask)</summary>

状态：`f[pos][last_digit][mask]`。其中 `mask` 记录已使用的数字。

</details>

---

## 延伸挑战
- [洛谷 P4127 [AHOI2009] 同类分布](https://www.luogu.com.cn/problem/P4127)
- [洛谷 P3306 [SDOI2013] 随机数生成器](https://www.luogu.com.cn/problem/P3306) (结合 BSGS)
- [HDU 4352 XHcy's LIS](http://acm.hdu.edu.cn/showproblem?pid=4352)
- [CF 628D Magic Numbers](https://codeforces.com/problemset/problem/628/D) (偶数位为特定数字)
