---
title: 贪心策略与证明 (Greedy Strategy & Proofs)
sidebar_position: 9
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Zap, ShieldCheck, TrendingUp, GitMerge, Scale, Anchor, Layers } from 'lucide-react';

# 贪心策略与证明 (Greedy Strategy & Proofs)

<KnowledgeCard 
  title="贪心本质" 
  icon={Zap}
  color="#f59e0b"
>
  贪心算法是一种在每一步选择中都采取当前状态下**局部最优**的策略，并希望通过局部最优导出**全局最优**。其核心挑战不在于代码实现，而在于**数学正确性证明**。
</KnowledgeCard>

---

## 一 : 系统化决策证明 (Formal Proofs)

证明贪心算法正确性的方法主要有以下三种**教材级**范式：

### 1. 微扰法 / 交换论证 (Exchange Argument)
这是证明贪心正确性最通用的方法。
- **Step 1**：假设存在一个最优解 $O$ 与我们的贪心解 $G$ 不同。
- **Step 2**：在 $O$ 中找到第一处与 $G$ 不同的选择。
- **Step 3**：通过交换 $O$ 中相邻元素的顺序，构造出新解 $O'$。
- **Step 4**：数学证明 $O'$ 的质量不差于 $O$。
- **Step 5**：归纳说明经过有限次交换，任意最优解均可转换为贪心解。

### 2. 贪心领先论证 (Greedy Stays Ahead)
证明在算法的每一步，贪心解在某个关键度量（指标）上都优于或等于任何其他可行解。

### 3. 最优子结构 (Optimal Substructure)
证明原问题的最优解包含其子问题的最优解，且当前的贪心选择不会阻碍全局最优解的达成。

---

## 二 : 典型贪心模型

### 1. 结构化排序模型
许多贪心问题可转化为寻找最优的全序关系。通过对相邻元素进行局部比较，确立全局排序准则。

### 2. 资源分配模型 (如 区间问题)
- **区间不相交**：按右端点升序排序。
- **区间覆盖**：按左端点升序排序，每次选覆盖能力最强的。

---

## 三 : 教材化例题

### 例题 1：耍杂技的牛 (微扰法深度应用)
$N$ 头牛叠罗汉。牛 $i$ 危险值 = 上方重量之和 $W_{above} - S_i$。使最大危险值最小。

<details>
<summary>决策推导与严密证明</summary>

**贪心策略**：按 $W_i + S_i$ 从小到大排序。

**证明**：
考虑相邻两牛 $i$ 和 $j$。设它们上方总重为 $W$。
- **原序 $(i, j)$**：
  - $V_i = W - S_i$
  - $V_j = W + W_i - S_j$
- **交换 $(j, i)$**：
  - $V'_j = W - S_j$
  - $V'_i = W + W_j - S_i$

要证当 $W_i + S_i \le W_j + S_j$ 时，$\max(V_i, V_j) \le \max(V'_j, V'_i)$。
两边消去 $W$ 后，即证 $\max(-S_i, W_i - S_j) \le \max(-S_j, W_j - S_i)$。
由于 $W_i, S_i > 0$，明显有 $W_i - S_j > -S_j$ 且 $W_j - S_i > -S_i$。
实质是比较 $W_i - S_j$ 与 $W_j - S_i$。
由 $W_i + S_i \le W_j + S_j \implies W_i - S_j \le W_j - S_i$。
**结论**：交换后最大危险值不会变小，原序最优。

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
        int s = cows[i].first - cows[i].second;
        int w = cows[i].second;
        res = max(res, sum - s);
        sum += w;
    }
    cout << res << endl;
    return 0;
}
```
</details>

---

## 四 : 综合练习库

### 练习 1：区间不相交问题 (贪心领先证明)
给定 $N$ 个闭区间，选择尽可能多的互不相交区间。

<details>
<summary>Check Solution</summary>

**策略**：按右端点 $r_i$ 升序排序。
**证明**：设贪心解为 $G=\{g_1, \dots, g_k\}$，最优解为 $O=\{o_1, \dots, o_m\}$。
只需证对于任何 $i$，有 $end(g_i) \le end(o_i)$。
1. $i=1$ 时，贪心选右端点最小的，命题成立。
2. 假设 $end(g_i) \le end(o_i)$，由于 $o_{i+1}$ 与 $o_i$ 不交，则 $start(o_{i+1}) > end(o_i) \ge end(g_i)$。
3. 故 $o_{i+1}$ 是待选集合中的一个合法选项。由于 $g_{i+1}$ 选的是其中右端点最小的，故 $end(g_{i+1}) \le end(o_{i+1})$。
归纳成立，故 $k=m$。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

struct Range {
    int l, r;
    bool operator< (const Range& W) const {
        return r < W.r;
    }
} range[100010];

int main() {
    int n; cin >> n;
    for (int i = 0; i < n; i++) cin >> range[i].l >> range[i].r;
    sort(range, range + n);

    int res = 0, last = -2e9;
    for (int i = 0; i < n; i++) {
        if (range[i].l > last) {
            res++;
            last = range[i].r;
        }
    }
    cout << res << endl;
    return 0;
}
```
</details>

---

_编者注：贪心是算法中的“直觉”。但要在竞赛中真正握住这柄利剑，必须学会通过微扰法或反证法验证你的直觉是否经得起严谨的推敲。_
