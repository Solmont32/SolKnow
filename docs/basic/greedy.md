---
title: 贪心算法 (Greedy Algorithm)
sidebar_position: 9
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Zap, ShieldCheck, TrendingUp, GitMerge, Scale } from 'lucide-react';

# 贪心算法 (Greedy Algorithm)

贪心算法是一种在每一步选择中都采取当前状态下**局部最优**的策略，并希望通过局部最优导出**全局最优**。它不回溯，不考虑长远影响，因此执行效率极高。

---

## 一、 核心逻辑与数学证明

### 1. 适用条件 (Greedy Choice Property)
一个问题若能通过贪心求解，必须满足：
- **贪心选择性质**：全局最优解可以通过一系列局部最优选择获得。
- **最优子结构**：一个问题的最优解包含其子问题的最优解。

### 2. 严谨证明技术 (Rigorous Proof Techniques)

#### A. 微扰法 (Exchange Argument)
这是证明贪心正确性最通用的方法。
1. **假设**：存在一个最优解 $O$ 与我们的贪心解 $G$ 不同。
2. **操作**：在 $O$ 中找到第一个与 $G$ 不同的选择。通过交换 $O$ 中两个相邻但顺序不符合贪心策略的元素。
3. **证明**：证明交换后的解 $O'$ 不比 $O$ 差。
4. **归纳**：经过有限次交换，可将 $O$ 变为 $G$，证明贪心解即为最优解。

#### B. 贪心选择领先 (Greedy Stays Ahead)
证明在算法的每一步，贪心解在某个关键指标上都不落后于任何其他可行解。
- 设贪心算法的选择序列为 $i_1, i_2, \dots, i_k$。
- 证明对于任意 $r \in [1, k]$，贪心解的第 $r$ 步状态优于（或等于）任何其他解的第 $r$ 步状态。

---

## 二、 算法性能分析 (Complexity)

| 模型 | 预处理复杂度 | 贪心决策复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- |
| **区间选点** | $O(n \log n)$ (排序) | $O(n)$ | $O(n)$ |
| **Huffman 编码** | $O(n \log n)$ (堆) | $O(n \log n)$ | $O(n)$ |
| **排序不等式** | $O(n \log n)$ | $O(n)$ | $O(1)$ |

---

## 三、 典型贪心模型

### 1. 区间问题 (Interval Problems)
- **最大不相交区间数**：按右端点 $r_i$ 升序排序。
- **区间分组**：按左端点 $l_i$ 排序，用小根堆维护当前所有组的最晚结束时间。

### 2. 贪心 vs 动态规划
- **贪心**：每步只有一种选择（局部最优），通常用于结构简单的优化问题。
- **DP**：每步有多种选择，通过比较子问题结果来决定，用于具有重叠子问题的情况。

---

## 四、 教材化例题

### 例题 1：耍杂技的牛 (微扰法深度应用)
每头牛有重量 $W_i$ 和强壮程度 $S_i$。某头牛的危险值 = 上方所有牛的重量之和 - 它的强壮程度。求最大危险值的最小值。

<details>
<summary>证明与解析</summary>

**贪心策略**：按 $W_i + S_i$ 从小到大排序。

**微扰法证明**：
考虑相邻两头牛 $i$ 和 $i+1$。设它们上方的重量之和为 $W$。
- **原顺序**：
  - 牛 $i$ 危险值：$V_i = W - S_i$
  - 牛 $i+1$ 危险值：$V_{i+1} = W + W_i - S_{i+1}$
- **交换后**：
  - 牛 $i+1$ 危险值：$V'_{i+1} = W - S_{i+1}$
  - 牛 $i$ 危险值：$V'_i = W + W_{i+1} - S_i$

我们要证明 $\max(V_i, V_{i+1}) \le \max(V'_i, V'_{i+1})$。
通过消项，由于 $W_i + S_i$ 是递增的，可以推出交换后最大危险值一定不会变小。

**代码实现**：
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

typedef pair<int, int> PII;
const int N = 50010;
PII cow[N];

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        int w, s;
        scanf("%d%d", &w, &s);
        cow[i] = {w + s, s};
    }
    sort(cow, cow + n);
    long long res = -2e9, sum = 0;
    for (int i = 0; i < n; i++) {
        res = max(res, sum - cow[i].second);
        sum += cow[i].first - cow[i].second;
    }
    printf("%lld\n", res);
    return 0;
}
```
</details>

---

## 五、 综合练习库

### 练习 1：区间分组
$N$ 个区间，将其分成最少组，使组内无重叠。
<details>
<summary>Check Solution</summary>

**策略**：按左端点排序。遍历区间，若当前区间的左端点 $\le$ 所有组的最小右端点，则开新组；否则加入最小右端点所在的组。

```cpp
#include <queue>
sort(range, range + n);
priority_queue<int, vector<int>, greater<int>> heap;
for (int i = 0; i < n; i++) {
    if (heap.empty() || heap.top() >= range[i].l) heap.push(range[i].r);
    else {
        heap.pop();
        heap.push(range[i].r);
    }
}
printf("%d\n", heap.size());
```
</details>

### 练习 2 : 排队打水 (排序不等式)
$n$ 个人打水，每个人时间 $t_i$，求所有人等待时间之和的最小值。
<details>
<summary>Check Solution</summary>

**结论**：让时间短的人先打。
**证明**：若 $t_i > t_{i+1}$，交换后总时间减少 $t_i - t_{i+1}$。

```cpp
sort(t, t + n);
long long res = 0;
for (int i = 0; i < n; i++) res += (long long)t[i] * (n - i - 1);
```
</details>

---

_编者注：贪心算法的难点不在于实现，而在于证明。当你无法确定贪心正确性时，尝试寻找反例或使用动态规划。_
