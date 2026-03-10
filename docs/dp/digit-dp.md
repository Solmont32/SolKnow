---
title: 数位 DP
---

# 数位动态规划 (Digit Dynamic Programming)

数位 DP 是一种处理关于**数字位数的性质或统计**的问题。典型题目如：“在区间 $[L, R]$ 内，有多少个数满足不包含数字 4？”

---

## 核心建模思路

数位 DP 通常使用**记忆化搜索**来实现，其状态通常包含：
- `pos`：当前处理到第几位。
- `limit`：当前位是否受上界限制（若受限，则当前位最大只能填 $a[pos]$）。
- `lead`：是否存在前导零（对于处理如“不含相邻重复数字”等问题至关重要）。
- `state`：题目要求的核心状态（如已出现的数字和、模数等）。

---

## 1. 核心代码模板

```cpp
long long a[20];
long long f[20][state_size];

long long dfs(int pos, int state, bool limit, bool lead) {
    if (pos == 0) return 1; // 递归终点：填完了所有位
    if (!limit && !lead && f[pos][state] != -1) return f[pos][state]; // 记忆化

    long long res = 0;
    int up = limit ? a[pos] : 9; // 确定当前位枚举的上界

    for (int i = 0; i <= up; i++) {
        // 根据题目逻辑更新 state'
        // 注意前导零 lead 的处理
        res += dfs(pos - 1, new_state, limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][state] = res; // 记录非受限状态
    return res;
}

long long solve(long long n) {
    int len = 0;
    while (n) a[++len] = n % 10, n /= 10;
    memset(f, -1, sizeof f);
    return dfs(len, initial_state, true, true);
}
```

---

## 2. 经典模型：不要 62 (HDU 2089)

求 $[L, R]$ 范围内不包含 "4" 且不包含 "62" 的数字个数。
**状态设计**：
$f[pos][pre]$：当前处理到第 $pos$ 位，且前一位数字是 $pre$。

---

## 3. 经典模型：Windy 数 (BZOJ 1026)

求 $[L, R]$ 范围内相邻数字之差至少为 2 的正整数个数。
**关键点**：必须处理前导零。如果上一位是前导零，当前位可以填任意非零数字，而不受“差至少为 2”的限制。

---

## 配套练习与解答

### 练习 1：数字计数
给定 $L, R$，统计 $0 \dots 9$ 这 10 个数字在所有数中出现的总次数。

<details>
<summary>点击查看解题思路</summary>

分别对 $0 \dots 9$ 每一个数字跑一遍数位 DP。状态记录当前已出现的该数字的次数 `cnt`。
$$f[pos][cnt]$$
</details>

### 练习 2：各位数之和 (Digit Sum)
求区间 $[L, R]$ 内各位数之和等于 $S$ 的数字个数。

<details>
<summary>点击查看解题思路</summary>

状态设计：`f[pos][sum]`。
转移：枚举当前位填 $i$，则 `sum' = sum - i`。
</details>

### 练习 3：包含特定子串
有多少个 $N$ 位数包含子串 "13"？

<details>
<summary>点击查看解题思路</summary>

正向法：记录状态 $0$（无 13）、$1$（以 1 结尾）、$2$（已含 13）。
反向法：总数 - 不含 13 的数量。
</details>

---

## 延伸挑战
- [洛谷 P2602 数字计数](https://www.luogu.com.cn/problem/P2602)
- [洛谷 P2657 Windy 数](https://www.luogu.com.cn/problem/P2657)
