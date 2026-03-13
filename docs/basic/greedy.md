---
title: 贪心策略与证明 (Greedy Strategy & Proofs)
sidebar_position: 9
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Zap, ShieldCheck, TrendingUp, GitMerge, Scale, Anchor, Layers } from 'lucide-react';

# 贪心策略与证明 (Greedy Strategy & Proofs)

贪心算法是一种在每一步选择中都采取当前状态下**局部最优**的策略，并希望通过局部最优导出**全局最优**。其核心挑战不在于代码实现，而在于**数学正确性证明**。

---

## 一、 系统化决策证明 (Formal Proofs)

一个问题若能通过贪心求解，必须满足**贪心选择性质**与**最优子结构**。证明方法主要有以下两种：

### 1. 微扰法 / 交换论证 (Exchange Argument)

这是证明贪心正确性最通用的**教材级方法**。

- **Step 1: 假设**。假设存在一个最优解 $O$ 与我们的贪心解 $G$ 不同。
- **Step 2: 转换**。在 $O$ 中找到第一处与 $G$ 不同的选择，通过局部交换两个元素的顺序，构造出新解 $O'$。
- **Step 3: 比较**。数学证明 $O'$ 的质量不差于 $O$。
- **Step 4: 归纳**。经过有限次交换，可将任意最优解转换为贪心解而不损失质量。

### 2. 贪心领先论证 (Greedy Stays Ahead)

证明在算法的每一步，贪心解在某个关键度量（指标）上都优于或等于任何其他可行解。

---

## 二、 典型贪心模型

### 1. 结构化排序模型

许多贪心问题可转化为寻找最优的全序关系。通过对相邻两个元素 $a, b$ 进行比较，若交换 $(a, b)$ 为 $(b, a)$ 能使目标函数变优，则确立排序准则。

### 2. 资源分配模型

如区间覆盖、区间不相交问题。通常按**端点（左端或右端）排序**后线性扫描。

---

## 三、 教材化例题

### 例题 1：耍杂技的牛 (微扰法深度应用)

$N$ 头牛叠罗汉。牛 $i$ 危险值 = 上方重量之和 $W_{above} - S_i$。使最大危险值最小。

<details>
<summary>决策推导与证明</summary>

**贪心策略**：按 $W_i + S_i$ 从小到大排序。

**证明**：
考虑相邻两牛 $i$ 和 $j$。设它们上方总重为 $W$。

- **原序 $(i, j)$**：
  - 牛 $i$ 危险值：$V_i = W - S_i$
  - 牛 $j$ 危险值：$V_j = W + W_i - S_j$
- **交换 $(j, i)$**：
  - 牛 $j$ 危险值：$V'_j = W - S_j$
  - 牛 $i$ 危险值：$V'_i = W + W_j - S_i$

由于 $W_i, S_i > 0$，明显有 $V_j > V'_j$ 且 $V'_i > V_i$。
比较 $\max(V_i, V_j)$ 与 $\max(V'_j, V'_i)$，实质是比较 $V_j$ 与 $V'_i$。
若 $W_i + S_i < W_j + S_j$，则 $W_i - S_j < W_j - S_i$，故 $V_j < V'_i$。
结论：按 $W+S$ 升序排列，最大危险值最小。

</details>

---

## 四 : 综合练习库

### 练习 1：区间不相交问题 (最优性证明)

给定 $N$ 个闭区间，从中选择尽可能多的互不相交区间。

<details>
<summary>Check Solution</summary>

**策略**：按右端点 $r_i$ 升序排序。
**证明（贪心领先）**：设贪心解为 $G=\{g_1, \dots, g_k\}$，最优解为 $O=\{o_1, \dots, o_m\}$。
我们要证 $k = m$。只需证对任意 $i$，有 $end(g_i) \le end(o_i)$。

- $i=1$: 贪心选右端点最小的，显然成立。
- 若 $end(g_i) \le end(o_i)$，由于 $o_{i+1}$ 与 $o_i$ 不交，则 $start(o_{i+1}) > end(o_i) \ge end(g_i)$。
- 故 $o_{i+1}$ 是待选集合中的一个合法选项。由于 $g_{i+1}$ 是其中右端点最小的，故 $end(g_{i+1}) \le end(o_{i+1})$。归纳成立。

```cpp
sort(q, q + n);
int res = 0, last = -2e9;
for (int i = 0; i < n; i++)
    if (q[i].l > last) res++, last = q[i].r;
```

</details>

### 练习 2：合并果子 (Huffman 模型)

$N$ 堆果子，每次合并两堆，消耗体力为两堆之和。使总消耗最小。

<details>
<summary>Check Solution</summary>

**本质**：构造哈夫曼树。每次合并权值最小的两棵树。

```cpp
priority_queue<int, vector<int>, greater<int>> heap;
while (n--) heap.push(x);
int res = 0;
while (heap.size() > 1) {
    int a = heap.top(); heap.pop();
    int b = heap.top(); heap.pop();
    res += a + b;
    heap.push(a + b);
}
```

</details>

---

_编者注：贪心是算法中的“直觉”。但要在竞赛中真正握住这柄利剑，必须学会通过微扰法或反证法验证你的直觉是否经得起严谨的推敲。_
