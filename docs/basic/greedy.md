---
title: 贪心算法 (Greedy Algorithm)
sidebar_position: 9
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Zap, ShieldCheck, TrendingUp, GitMerge } from 'lucide-react';

# 贪心算法 (Greedy Algorithm)

贪心算法是一种在每一步选择中都采取当前状态下**局部最优**的策略，并希望通过局部最优导出**全局最优**。它不回溯，不考虑长远影响，因此执行效率极高。

---

## 一、 核心逻辑与证明

### 1. 适用条件 (Greedy Choice Property)
一个问题若能通过贪心求解，必须满足：
- **贪心选择性质**：全局最优解可以通过一系列局部最优选择获得。
- **最优子结构**：一个问题的最优解包含其子问题的最优解。

### 2. 严谨证明技术 (Rigorous Proof Techniques)

#### A. 微扰法 (Exchange Argument)
**核心思想**：假设存在一个“最优解” $O$ 与我们的“贪心解” $G$ 不同。通过交换 $O$ 中两个相邻但顺序不符合贪心策略的元素，证明交换后的解 $O'$ 不比 $O$ 差。经过有限次交换，我们可以将 $O$ 转化为 $G$，从而证明 $G$ 也是最优解。

*应用例：排序不等式。若存在 $t_i > t_{i+1}$，交换后等待时间减少 $t_i - t_{i+1} > 0$。*

#### B. 贪心选择领先 (Greedy Stays Ahead)
**核心思想**：证明在算法的每一步，贪心解在某个关键指标上都不落后于任何其他可行解。
例如在区间选点中，证明贪心选择的第 $k$ 个点的位置总是比任何最优解的第 $k$ 个点的位置更靠后（从而能覆盖更多可能的未来区间）。

---

## 二、 典型贪心模型

### 1. 区间问题 (Interval Problems)
- **区间选点 / 最大不相交区间数**：  
  **策略**：按右端点 $r_i$ 升序排序。  
  **证明 (Stay Ahead)**：设贪心解选点集合为 $G=\{g_1, \dots, g_k\}$，最优解为 $O=\{o_1, \dots, o_m\}$。由于 $g_1$ 是第一个区间的右端点，显然 $g_1 \ge o_1$（若 $o_1$ 能覆盖第一个区间，它必须 $\le r_1$）。归纳可证 $g_i \ge o_i$，故 $k \ge m$。
- **区间分组**：将区间分为最少的组，使得每组内区间互不重叠。  
  *策略：按左端点排序，利用小根堆维护当前各组的最晚结束时间。*

### 2. Huffman 编码 (合并果子)
每次选择权值最小的两个节点合并。这保证了权值较大的节点深度较浅，从而使总权值 $WPL = \sum w_i d_i$ 最小。

---

## 三 : 教材化例题

### 例题 1：排序不等式 (排队打水)
$n$ 个人打水，时间分别为 $t_i$，求所有人等待时间之和的最小值。

<details>
<summary>解析与推导</summary>

**逻辑推导**：
总等待时间 $W = \sum_{i=1}^n t_i \times (n-i)$。要使 $W$ 最小，应让打水时间短的人排在前面。  
**证明**：若存在 $t_i > t_{i+1}$，交换两人位置，等待时间改变量为 $t_{i+1} - t_i < 0$，解变优。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010;
int t[N];

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &t[i]);
    sort(t, t + n);

    long long res = 0;
    for (int i = 0; i < n; i++) res += (long long)t[i] * (n - i - 1);
    printf("%lld\n", res);
    return 0;
}
```
</details>

### 例题 2：区间选点 (Interval Coverage)
给定 $N$ 个闭区间 $[a_i, b_i]$，在数轴上选尽量少的点，使每个区间至少包含一个选出的点。

<details>
<summary>C++ 实现</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010;
struct Range {
    int l, r;
    bool operator< (const Range &W) const { return r < W.r; }
} range[N];

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d %d", &range[i].l, &range[i].r);
    sort(range, range + n);

    int res = 0, ed = -2e9;
    for (int i = 0; i < n; i++) {
        if (range[i].l > ed) {
            res++;
            ed = range[i].r;
        }
    }
    printf("%d\n", res);
    return 0;
}
```
</details>

---

## 四 : 综合练习库

### 练习 1：耍杂技的牛 (微扰法应用)
每头牛有重量 $W_i$ 和强壮程度 $S_i$。叠罗汉时，某头牛的危险值 = 上方所有牛的重量之和 - 它的强壮程度。求最大危险值的最小值。
<details>
<summary>Check Solution</summary>

**解题思路**：
按 $W_i + S_i$ 从小到大排序。  
**证明**：考虑相邻两头牛 $i$ 和 $i+1$。若交换位置，只会影响这两头牛的危险值。通过对比交换前后的最大危险值，可得 $W_i + S_i$ 越大的牛应放在越下方。

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
        scanf("%d %d", &w, &s);
        cow[i] = {w + s, w};
    }
    sort(cow, cow + n);

    long long res = -2e9, sum = 0;
    for (int i = 0; i < n; i++) {
        int s = cow[i].first - cow[i].second;
        int w = cow[i].second;
        res = max(res, sum - s);
        sum += w;
    }
    printf("%lld\n", res);
    return 0;
}
```
</details>

---

_编者注：贪心算法的难点不在于实现，而在于证明。当你无法确定贪心正确性时，尝试寻找反例或使用动态规划。_
