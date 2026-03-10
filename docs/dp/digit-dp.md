# 数位动态规划 (Digit DP)

import { Hash, Target, Zap, ChevronRight, Binary, Fingerprint, Microscope, Activity, ShieldCheck } from 'lucide-react';

数位 DP 是一种处理关于 **数字位数性质或统计** 的动态规划方法。它通常用于解决“在区间 $[L, R]$ 内，有多少个正整数满足某种特定条件”的问题。这类条件的共同特征是：**条件与数的具体大小关系较弱，而与数的每一位数字（数位）的关系较强。**

---

## <Microscope className="inline-block mr-2" /> 核心建模思想

数位 DP 的本质是在 **数位搜索树 (Digit Search Tree)** 上进行记忆化搜索。我们将大整数 $N$ 视为一个序列 $A = \{a_1, a_2, \dots, a_n\}$，其中 $a_1$ 是最高位。

### 1. 形式化状态定义
一个标准的数位 DP 状态通常定义为 $f(pos, state, limit, lead)$：
- $pos$：当前处理到的数位下标（通常从高到低枚举，$n \to 1$）。
- $state$：业务逻辑状态，用于记录已填数位的特征（如：前一位数字、当前数位和、模 $K$ 的余数等）。
- $limit$：**上界限制标志**。若为 `true`，则当前位最大只能填 $a_{pos}$；若为 `false`，则可填 $0 \sim 9$。
- $lead$：**前导零标志**。若为 `true`，表示当前位之前填的全是 $0$。

### 2. 差分转化 (Differential Transformation)
由于统计具有区间可加性，通常将 $[L, R]$ 的查询转化为：
$$ans(L, R) = solve(R) - solve(L - 1)$$

---

## <Activity className="inline-block mr-2" /> 复杂度矩阵

| 模式 | 状态空间 | 转移开销 | 总时间复杂度 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **标准数位统计** | $O(\text{len} \cdot \text{state})$ | $O(10)$ | $O(10 \cdot \log_{10} N \cdot \text{state})$ | Windy 数, 数字统计 |
| **同余类数位 DP** | $O(\text{len} \cdot K \cdot S)$ | $O(10)$ | $O(10 \cdot \log N \cdot K \cdot S)$ | 能被数位之和整除的数 |

---

## <ShieldCheck className="inline-block mr-2" /> 核心逻辑推导

### 1. 记忆化搜索模板 (Standard Template)

```cpp
ll dfs(int pos, int state, bool limit, bool lead) {
    if (pos == 0) return 1; 
    if (!limit && !lead && f[pos][state] != -1) return f[pos][state];

    ll res = 0;
    int up = limit ? a[pos] : 9; 

    for (int i = 0; i <= up; i++) {
        if (!check(i, state, lead)) continue;
        res += dfs(pos - 1, next_state(i, state, lead), limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][state] = res;
    return res;
}
```

### 2. 前导零 (Leading Zeros) 的处理
在处理如“相邻位差值”或“数字 $0$ 出现次数”时，前导零的存在会导致逻辑失效。**若 `lead = true` 且填 `i = 0`，该位应被视为占位符而非数值位。**

---

## <ShieldCheck className="inline-block mr-2" /> 完备例题解答

### 例题 1：Windy 数 (Adjacent Difference $\ge 2$)

<details>
<summary>Check Solution (C++)</summary>

```cpp
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
```
</details>

### 例题 2：同类分布 (Self-Divisible by Digit Sum)

<details>
<summary>Check Solution (C++)</summary>

```cpp
// 由于模数在变化，我们需要在外部枚举可能的数位之和 S
for (target_sum = 1; target_sum <= 9 * len; target_sum++) {
    memset(f, -1, sizeof f);
    ans += dfs(len, 0, 0, true, true);
}
```
</details>

---

## 延伸挑战
- [洛谷 P2657 [SCOI2009] windy 数](https://www.luogu.com.cn/problem/P2657)
- [洛谷 P4127 [AHOI2009] 同类分布](https://www.luogu.com.cn/problem/P4127)
- [CF 628D Magic Numbers](https://codeforces.com/contest/628/problem/D)（数位 DP + 字符串处理）
