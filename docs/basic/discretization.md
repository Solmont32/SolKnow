---
title: 离散化技巧 (Discretization)
sidebar_position: 10
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Shuffle, Filter, Map, Layers } from 'lucide-react';

# 离散化技巧 (Discretization)

离散化是一种处理**大范围、稀疏数据**的映射技术。当数据的取值范围（如 $0 \sim 10^9$）远大于数据的个数（如 $10^5$）时，我们通过维护数据的**相对顺序**，将无限/超大空间的座标映射到紧凑的整数空间。

---

## 一、 核心逻辑与步骤

### 1. 离散化的适用场景

- 坐标范围极大，但涉及到的坐标点数有限。
- 算法复杂度与取值范围相关（如前缀和、线段树），通过离散化可降维。

### 2. 标准实现流程 ($O(n \log n)$)

1.  **收集 (Collect)**：记录所有可能用到的坐标。
2.  **去重 (Unique & Sort)**：
    ```cpp
    sort(alls.begin(), alls.end());
    alls.erase(unique(alls.begin(), alls.end()), alls.end());
    ```
3.  **查询 (Find)**：利用二分搜索找到原坐标对应的映射下标。

---

## 二、 算法性能分析 (Complexity)

| 阶段                  | 复杂度        | 核心瓶颈         |
| :-------------------- | :------------ | :--------------- |
| **预处理 (排序去重)** | $O(n \log n)$ | `std::sort` 效率 |
| **单次查询 (映射)**   | $O(\log n)$   | 二分搜索         |
| **空间复杂度**        | $O(n)$        | 存储所有坐标点   |

---

## 三、 教材化例题

### 例题 1：区间和 (经典离散化应用)

数轴上有 $N$ 个点被加上了值 $c$，随后进行 $M$ 次区间查询 $[l, r]$。坐标范围 $[-10^9, 10^9]$。

<details>
<summary>解析与推导</summary>

**解题思路**：

1. **数据稀疏性**：虽然坐标到 $10^9$，但实际上涉及的坐标点最多只有 $N + 2M$ 个（加上查询的左右端点）。
2. **映射建立**：将所有涉及到的 $x, l, r$ 存入 `alls` 数组并离散化。
3. **前缀和应用**：在离散化后的紧凑空间上建立前缀和数组。

**关键实现 (Find 函数)**：

```cpp
int find(int x) {
    int l = 0, r = alls.size() - 1;
    while (l < r) {
        int mid = l + r >> 1;
        if (alls[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return l + 1; // 映射到从 1 开始的坐标
}
```

**完整代码逻辑**：

```cpp
for (auto item : add) {
    int x = find(item.first);
    a[x] += item.second;
}
for (int i = 1; i <= alls.size(); i++) s[i] = s[i-1] + a[i];
for (auto item : query) {
    int l = find(item.first), r = find(item.second);
    printf("%d\n", s[r] - s[l-1]);
}
```

</details>

---

## 四、 综合练习库

### 练习 1：地毯覆盖 (坐标离散化)

在 $10^9 \times 10^9$ 的平面上，覆盖 $N$ 个矩形。求被至少覆盖一次的总面积。

<details>
<summary>Check Solution</summary>

**逻辑**：

1. 将所有矩形的 $x$ 坐标和 $y$ 坐标分别进行离散化。
2. 平面被划分为 $(2N-1) \times (2N-1)$ 个小矩形块。
3. 统计每个小矩形块是否被覆盖，累加面积。
   _(注：通常配合扫描线算法 $O(N \log N)$，但暴力离散化为 $O(N^2)$。)_

</details>

---

_编者注：离散化是“降维打击”的典型。它告诉我们，问题的本质往往不在于绝对值的大小，而在于元素之间的相对拓扑关系。_
