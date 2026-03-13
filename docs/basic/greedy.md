---
title: 贪心策略与证明 (Greedy Strategy & Proofs)
sidebar_position: 9
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Zap, ShieldCheck, TrendingUp, GitMerge, Scale, Anchor, Layers, CheckCircle2 } from 'lucide-react';

# 贪心策略与证明 (Greedy Strategy & Proofs)

<KnowledgeCard 
  title="贪心本质" 
  icon={Zap}
  color="#f59e0b"
>
  贪心算法是一种在每一步选择中都采取当前状态下**局部最优**的策略，并希望通过局部最优导出**全局最优**。其核心挑战不在于代码实现，而在于**数学正确性证明**。
</KnowledgeCard>

---

## 一、 贪心算法的核心性质

### 1. 贪心选择性质 (Greedy Choice Property)
可以通过做出局部最优选择来构造全局最优解。换言之，在考虑当前步骤时，我们不需要考虑子问题的结果。

### 2. 最优子结构 (Optimal Substructure)
问题的最优解包含其子问题的最优解。这是贪心与动态规划（DP）的共同点，但贪心只需锁定一个方向。

---

## 二、 系统化决策证明范式

证明贪心算法正确性的方法主要有以下三种**教材级**范式：

### 1. 交换论证法 / 微扰法 (Exchange Argument)
这是最通用的证明方法。其核心步骤如下：
1. 假设存在一个最优解 $O$，且 $O$ 与贪心解 $G$ 不同。
2. 在 $O$ 中找到第一个不满足贪心准则的决策对。
3. 交换这对决策，证明新构造的解 $O'$ 不差于 $O$（即效益不减或代价不增）。
4. 通过有限次交换，可将 $O$ 转化为 $G$，证明 $G$ 亦为最优解。

### 2. 贪心领先论证 (Greedy Stays Ahead)
证明在算法的每一步 $k$，贪心解的前 $k$ 个选择在某个关键度量上“领先”于任何其他可行解。

### 3. 反证法 (Proof by Contradiction)
假设贪心选择不是最优的，推导出与已知最优性或题目约束相矛盾的结果。

---

## 三、 教材化例题

### 例题 1：耍杂技的牛 (微扰法深度应用)
$N$ 头牛叠罗汉。牛 $i$ 危险值 = 上方重量之和 $W_{above} - S_i$。使最大危险值最小。

<details>
<summary>决策推导与严密证明</summary>

**贪心策略**：按 $W_i + S_i$ 从小到大排序。

**证明（交换论证）**：
考虑相邻两牛 $i$ 和 $j$（$i$ 在 $j$ 上）。设它们上方总重为 $W$。
- **原序 $(i, j)$**：
  - $V_i = W - S_i$
  - $V_j = W + W_i - S_j$
  - $\text{Max}_1 = \max(W - S_i, W + W_i - S_j)$
- **交换 $(j, i)$**：
  - $V'_j = W - S_j$
  - $V'_i = W + W_j - S_i$
  - $\text{Max}_2 = \max(W - S_j, W + W_j - S_i)$

若 $W_i + S_i \le W_j + S_j$，需证 $\text{Max}_1 \le \text{Max}_2$。
显然 $V_i < V'_i$（因为 $W_j > 0$）且 $V'_j < V_j$。
关键在于比较 $V_j$ 与 $V'_i$：
$V_j = W + W_i - S_j = W + (W_i + S_i) - S_i - S_j$
$V'_i = W + W_j - S_i = W + (W_j + S_j) - S_j - S_i$
由于 $W_i + S_i \le W_j + S_j$，故 $V_j \le V'_i$。
**结论**：交换后最大值不会减小，原贪心排序最优。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

typedef pair<int, int> PII;
const int N = 50010;
PII cows[N];

int main() {
    int n; cin >> n;
    for (int i = 0; i < n; i++) {
        int w, s; cin >> w >> s;
        cows[i] = {w + s, w};
    }
    sort(cows, cows + n);

    int res = -2e9, sum = 0;
    for (int i = 0; i < n; i++) {
        res = max(res, sum - (cows[i].first - cows[i].second));
        sum += cows[i].second;
    }
    cout << res << endl;
    return 0;
}
```
</details>

### 例题 2：区间分组 (最小值最大化)
给定 $N$ 个区间，将其分成尽量少的组，使得每组内的区间两两不相交。

<details>
<summary>决策推导与严密证明</summary>

**贪心策略**：
1. 按左端点 $l_i$ 升序排序。
2. 维护各组当前的右端点最大值（小根堆）。
3. 遍历区间：若当前区间左端点 > 堆顶，则加入该组并更新右端点；否则新开一组。

**证明（最大最小对偶性）**：
设贪心得到了 $k$ 组。这意味着在某一时刻，有 $k$ 个区间都包含了同一个时间点 $t$（即这 $k$ 个区间互相重叠）。
显然，任何合法方案至少需要 $k$ 个组。因此贪心解即为最优解。

```cpp
#include <iostream>
#include <algorithm>
#include <queue>
using namespace std;

struct Range {
    int l, r;
    bool operator< (const Range& W) const { return l < W.l; }
} range[100010];

int main() {
    int n; cin >> n;
    for (int i = 0; i < n; i++) cin >> range[i].l >> range[i].r;
    sort(range, range + n);

    priority_queue<int, vector<int>, greater<int>> heap;
    for (int i = 0; i < n; i++) {
        if (heap.empty() || heap.top() >= range[i].l) heap.push(range[i].r);
        else {
            heap.pop();
            heap.push(range[i].r);
        }
    }
    cout << heap.size() << endl;
    return 0;
}
```
</details>

---

## 四、 理论巅峰：拟阵 (Matroid)

贪心算法并非总是直觉，它有着严密的代数基础——**拟阵理论**。

若一个问题可以抽象为拟阵 $M = (S, \mathcal{I})$：
- **遗传性**：$A \in \mathcal{I} \land B \subseteq A \implies B \in \mathcal{I}$。
- **交换性**：$A, B \in \mathcal{I} \land |A| < |B| \implies \exists x \in B \setminus A, A \cup \{x\} \in \mathcal{I}$。

则在该结构上的权值最大化问题，**贪心策略必定能取得全局最优解**（如 Kruskal 最小生成树算法）。

---

## 五、 综合练习库

### 练习 1：排队打水 (排序不等式应用)
$n$ 个人排队打水，第 $i$ 个人打水时间为 $t_i$。如何排队使所有人等待时间之和最小？

<details>
<summary>Check Solution</summary>

**策略**：按 $t_i$ 从小到大排序。
**证明**：等待总时间 $T = \sum_{i=1}^n t_i \times (n-i)$。根据排序不等式，当 $t_i$ 与权重 $(n-i)$ 逆序排列时（即 $t_i$ 升序），和最小。

```cpp
sort(t, t + n);
long long res = 0;
for (int i = 0; i < n; i++) res += (long long)t[i] * (n - i - 1);
```
</details>

### 练习 2：均分纸牌
$N$ 堆纸牌排成一行，每堆若干张。每步可将一堆的牌移到相邻堆。求最少移动次数使每堆牌数相等。

<details>
<summary>Check Solution</summary>

**思路**：从左往右贪心。
计算平均值 $avg$。对于第一堆，若不等于 $avg$，则必须向第二堆移动（或从第二堆移入）差值。这一步是必经之路，且移动后第一堆不再变动。

```cpp
int res = 0, delta = 0;
for (int i = 0; i < n; i++) {
    delta += a[i] - avg;
    if (delta != 0) res++;
}
```
</details>

---

_编者注：贪心是算法竞赛中的“博弈”。当你无法通过 DP 寻找最优解时，请尝试对决策进行微扰。如果交换相邻元素后的效益变化具备单调性，那么你可能已经抓住了贪心的尾巴。_
