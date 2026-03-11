---
title: 贪心算法 (Greedy Algorithm)
sidebar_position: 9
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Zap, ShieldCheck, TrendingUp, GitMerge, Scale, Anchor, Layers } from 'lucide-react';

# 贪心算法 (Greedy Algorithm)

贪心算法是一种在每一步选择中都采取当前状态下**局部最优**的策略，并希望通过局部最优导出**全局最优**。它不回溯，不考虑长远影响，因此执行效率极高。

---

## 一、 核心逻辑与数学证明

### 1. 适用条件 (Greedy Choice Property)
一个问题若能通过贪心求解，通常需要满足以下两个数学特性：
- **贪心选择性质**：全局最优解可以通过一系列局部最优（贪心）选择达到。
- **最优子结构 (Optimal Substructure)**：问题的最优解包含其子问题的最优解。

### 2. 严谨证明技术 (Rigorous Proof Techniques)

#### A. 微扰法 / 交换论证 (Exchange Argument)
这是证明贪心正确性最通用的方法。
1. **假设 (Hypothesis)**：存在一个最优解 $O$ 与我们的贪心解 $G$ 在某个位置不同。
2. **定位 (Locate)**：找到第一个不同的选择点。
3. **交换 (Exchange)**：交换 $O$ 中的两个元素（或修改某个选择），构造出一个新解 $O'$。
4. **比较 (Compare)**：证明 $Value(O') \ge Value(O)$。既然 $O$ 是最优的，那么 $O'$ 也必然是最优的。
5. **归纳 (Induct)**：通过有限次交换，可将任意最优解转换为贪心解，而不降低解的质量。

#### B. 贪心选择领先 (Greedy Stays Ahead)
证明在算法的每一步，贪心解在某个关键指标上都不落后于任何其他可行解。

---

## 二、 理论进阶：拟阵 (Matroid) 简介

许多贪心算法的正确性源于**拟阵结构**。一个拟阵 $M = (S, I)$ 满足：
1. **遗传性 (Hereditary)**：若 $A \in I$ 且 $B \subset A$，则 $B \in I$。
2. **交换性 (Exchange Property)**：若 $A, B \in I$ 且 $|A| < |B|$，则 $\exists x \in B \setminus A$ 使得 $A \cup \{x\} \in I$。

若一个优化问题可以建模为在一个加权拟阵中寻找具有最大权重的独立集，则贪心算法产生的解一定是全局最优的。

---

## 三、 算法性能分析 (Complexity)

| 模型 | 核心瓶颈 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- |
| **区间问题** | 排序 | $O(N \log N)$ | $O(N)$ |
| **Huffman 树** | 优先队列维护 | $O(N \log N)$ | $O(N)$ |
| **Dijkstra** | 堆优化贪心扩展 | $O(E \log V)$ | $O(V+E)$ |
| **Kruskal** | 边权排序 + 并查集 | $O(E \log E)$ | $O(E)$ |

---

## 四、 教材化例题

### 例题 1：耍杂技的牛 (微扰法深度应用)
$N$ 头牛叠罗汉。牛 $i$ 危险值 = 其上方所有牛的重量之和 $W_{above} - S_i$。求最大危险值的最小值。

<details>
<summary>证明与解析</summary>

**贪心策略**：按 $W_i + S_i$ 从小到大排序。

**微扰法证明**：
考虑相邻两头牛 $i$ 和 $i+1$。设它们上方的重量之和为 $W$。
- **原顺序 $(i, i+1)$**：
  - 牛 $i$ 危险值：$V_1 = W - S_i$
  - 牛 $i+1$ 危险值：$V_2 = W + W_i - S_{i+1}$
- **交换顺序 $(i+1, i)$**：
  - 牛 $i+1$ 危险值：$V'_1 = W - S_{i+1}$
  - 牛 $i$ 危险值：$V'_2 = W + W_{i+1} - S_i$

**比较**：
由于 $W, S > 0$，显然 $V_2 > V'_1$ 且 $V'_2 > V_1$。
我们只需比较 $\max(V_1, V_2)$ 与 $\max(V'_1, V'_2)$，即比较 $V_2$ 与 $V'_2$。
$V_2 = W + W_i - S_{i+1}$
$V'_2 = W + W_{i+1} - S_i$
若 $W_i + S_i < W_{i+1} + S_{i+1}$，则 $W_i - S_{i+1} < W_{i+1} - S_i$，故 $V_2 < V'_2$。
结论：按 $W+S$ 排序能使相邻交换后最大值不减小，故该排序为最优。

</details>

---

## 五、 综合练习库

### 练习 1 : Huffman 编码 (最优前缀码)
给定字符频率，构造总编码长度最短的二叉树。

<details>
<summary>Check Solution</summary>

**策略**：每次合并两个频率最小的节点。
**证明**：贪心选择性质证明需利用引理：频率最小的两个字符必然在最优树的最低层且为兄弟节点。

```cpp
priority_queue<int, vector<int>, greater<int>> heap;
for (auto f : freq) heap.push(f);
long long res = 0;
while (heap.size() > 1) {
    int a = heap.top(); heap.pop();
    int b = heap.top(); heap.pop();
    res += a + b;
    heap.push(a + b);
}
```
</details>

### 练习 2：排队打水 (排序不等式)
$n$ 个人打水，每个人时间 $t_i$，求所有人等待时间之和的最小值。

<details>
<summary>Check Solution</summary>

**结论**：让时间短的人先打。
**数学公式**：$Total = \sum_{i=1}^n t_i \cdot (n - i)$。根据排序不等式，当 $t_i$ 递增时，其与递减序列 $(n-1, \dots, 0)$ 的乱序和最小。

```cpp
sort(t, t + n);
long long res = 0;
for (int i = 0; i < n; i++) res += (long long)t[i] * (n - i - 1);
```
</details>

### 练习 3：均分纸牌
$N$ 堆纸牌，每堆 $a_i$ 张。每次可将一堆的牌移到相邻堆。使所有堆相等的最少次数。

<details>
<summary>Check Solution</summary>

**策略**：从左往右看。若第 $i$ 堆不等于平均值，必然要与 $i+1$ 堆发生交换（即使 $i+1$ 变负数也无妨，代表预支）。

```cpp
int avg = sum / n, res = 0;
for (int i = 0; i < n - 1; i++) {
    if (a[i] != avg) {
        a[i+1] += a[i] - avg;
        res++;
    }
}
```
</details>

---

_编者注：贪心算法的难点不在于实现，而在于证明。当你无法确定贪心正确性时，尝试寻找反例或使用动态规划验证最优子结构。_
