---
title: 贪心算法 (Greedy Algorithm)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 贪心算法 (Greedy Algorithm)

贪心算法（Greedy Algorithm）是指在对问题求解时，总是做出在当前看来是最好的选择。不从整体最优上加以考虑，而仅是在某种意义上的**局部最优解**。

---

## 一、数学基础与证明策略

贪心算法的难点不在于代码实现，而在于**正确性证明**。并非所有局部最优都能推导出全局最优。

### 1. 两个关键属性
- **贪心选择性质 (Greedy Choice Property)**：全局最优解可以通过一系列局部最优（贪心）选择达到。
- **最优子结构 (Optimal Substructure)**：原问题的最优解包含其子问题的最优解。

### 2. 常用证明方法
- **微调法 (Exchange Argument)**：假设存在一个非贪心策略的最优解，通过交换其中两个元素，证明新解不差于旧解，从而逐步逼近贪心策略。
- **归纳法**：证明第一步贪心选择是正确的，且剩下的子问题仍满足贪心性质。
- **反证法**：假设贪心解不是最优的，推导出矛盾。

---

## 二、经典贪心模型

### 1. 区间问题 (Interval Problems)
这是贪心算法最经典的应用场景。

- **区间选点**：给定多个区间，选择最少的点使得每个区间至少包含一个点。
  - **策略**：按区间右端点从小到大排序，每次选右端点。
- **最大不相交区间数**：按右端点排序，若当前区间与上一个不冲突则计数。
- **区间覆盖**：用最少的区间覆盖目标区间。

### 2. Huffman 编码 (合并果子)
每次选取当前最小的两个元素合并。
- **证明**：利用微调法。若最小的两个不在最深层，交换后代价必然减小。

---

## 三、教材化例题

### 例题 1：区间分组
给定 $n$ 个区间，将其分成若干组，使得每组内部的区间互不重叠，求最少组数。

<details>
<summary>点击查看解析与代码</summary>

**解析**：
1. 将所有区间按左端点从小到大排序。
2. 维护一个最小堆，存储每组当前的右端点最大值。
3. 对于新区间 $[l, r]$：
   - 若 $l > \text{heap.top()}$，说明该区间可以放入右端点最小的那组，更新堆顶为 $r$。
   - 否则，必须新开一组，将 $r$ 插入堆中。

**代码实现**：
```cpp
#include <iostream>
#include <algorithm>
#include <queue>

using namespace std;

const int N = 100010;
struct Range {
    int l, r;
    bool operator< (const Range& W) const {
        return l < W.l;
    }
} range[N];

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d %d", &range[i].l, &range[i].r);
    sort(range, range + n);

    priority_queue<int, vector<int>, greater<int>> heap;
    for (int i = 0; i < n; i++) {
        if (heap.empty() || heap.top() >= range[i].l) {
            heap.push(range[i].r);
        } else {
            heap.pop();
            heap.push(range[i].r);
        }
    }

    printf("%d\n", heap.size());
    return 0;
}
```
</details>

### 例题 2：排队打水 (微调法证明示例)
$n$ 个人排队打水，第 $i$ 个人所需时间为 $t_i$。如何排队使得总等待时间最短？

<details>
<summary>点击查看解析与证明</summary>

**策略**：按打水时间升序排列。

**证明 (微调法)**：
假设存在一个最优排队序列，其中相邻两人 $i, i+1$ 满足 $t_i > t_{i+1}$。
交换前的贡献：$T_{before} = (\dots) + t_i + (\dots)$
交换后的贡献：$T_{after} = (\dots) + t_{i+1} + (\dots)$
由于交换只影响第 $i$ 个人及其后所有人的等待时间，且交换后所有人的等待时间减少了 $t_i - t_{i+1} > 0$，故原序列非最优。

**代码实现**：
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

typedef long long LL;
const int N = 100010;
int t[N];

int main() {
    int n; cin >> n;
    for (int i = 0; i < n; i++) cin >> t[i];
    sort(t, t + n);

    LL res = 0;
    for (int i = 0; i < n; i++) res += (LL)t[i] * (n - i - 1);
    printf("%lld\n", res);
    return 0;
}
```
</details>

---

## 四、练习与挑战

- **练习 1**：[耍杂技的牛] 考虑重量与强壮度的和，证明贪心策略。
- **练习 2**：[货仓选址] 求 $x$ 使得 $\sum |x - x_i|$ 最小（中位数）。
- **练习 3**：[贪心与动态规划] 思考为什么背包问题通常不能用贪心解决，而分数背包可以。

---

_编者注：贪心算法的本质是“短视”。但有些时候，只要眼光足够毒辣（证明严谨），短视即是真理。_
