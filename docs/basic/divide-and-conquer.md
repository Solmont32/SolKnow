---
title: 分治理论与复杂度收敛 (Divide and Conquer)
sidebar_position: 8
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, GitMerge, Calculator, Terminal, Box, Binary, Network } from 'lucide-react';

# 分治理论与复杂度收敛 (Divide and Conquer)

分治算法的本质是**化归 (Reduction)**。它将一个规模为 $n$ 的大问题分解为若干个规模较小且**结构相同**的子问题，递归求解后再合并子问题的解。

---

## 一 : 形式化描述与三部曲

1.  **分解 (Divide)**：将原问题 $P(n)$ 划分为 $a$ 个规模为 $n/b$ 的子问题。
2.  **治理 (Conquer)**：递归求解子问题。若规模足够小则直接求解（Base Case）。
3.  **合并 (Combine)**：将子问题的解融合成原问题的解。

---

## 二 : 复杂度收敛性推导 (Master Theorem)

分治算法的复杂度通常满足递推式 $T(n) = aT(n/b) + f(n)$，其中 $f(n) = O(n^d)$。

### 1. 递归树深度分析

树的深度为 $\log_b n$。第 $i$ 层的子问题数量为 $a^i$，每个子问题的规模为 $n/b^i$。
第 $i$ 层总工作量为 $a^i \cdot f(n/b^i)$。

### 2. 三种收敛场景

- **Case 1**: $a > b^d$。叶子节点的工作量占主导。$T(n) = O(n^{\log_b a})$。
- **Case 2**: $a = b^d$。每一层的工作量均衡分配。$T(n) = O(n^d \log n)$。
- **Case 3**: $a < b^d$。根节点的合并工作量占主导。$T(n) = O(n^d)$。

---

## 三 : 经典模型深度解析

### 1. 归并排序 (Merge Sort)

- **参数**: $a=2, b=2, d=1$。
- **推导**: $\log_2 2 = 1$，满足 Case 2。$T(n) = O(n^1 \log n)$。

### 2. 快速幂 (Modular Exponentiation)

计算 $a^b \pmod p$。

- **思路**: $a^b = (a^{b/2})^2$ (当 $b$ 为偶数) 或 $a \cdot a^{b-1}$ (当 $b$ 为奇数)。
- **复杂度**: $T(b) = T(b/2) + O(1) \implies O(\log b)$。

---

## 四 : 教材化例题

### 例题 1：逆序对数量 (分治贡献统计)

在一个序列中，若 $i < j$ 且 $a[i] > a[j]$，则称 $(i, j)$ 为一个逆序对。

<details>
<summary>证明与解析</summary>

**分治决策**：
逆序对 $(i, j)$ 可能出现在：

1. 左半部分 $[L, mid]$ 内部。
2. 右半部分 $[mid+1, R]$ 内部。
3. 跨越中点，即 $i \in [L, mid], j \in [mid+1, R]$。

**关键性质**：
当我们归并排序左右两个**已排序**子区间时，若左区间当前元素 $a[i] > a[j]$（右区间元素），由于左区间已升序，则 $a[i \dots mid]$ 均大于 $a[j]$。对逆序对的贡献为 $mid - i + 1$。

```cpp
long long merge_sort(int l, int r) {
    if (l >= r) return 0;
    int mid = l + r >> 1;
    long long res = merge_sort(l, mid) + merge_sort(mid + 1, r);
    int i = l, j = mid + 1, k = 0;
    while (i <= mid && j <= r) {
        if (a[i] <= a[j]) tmp[k++] = a[i++];
        else {
            res += mid - i + 1;
            tmp[k++] = a[j++];
        }
    }
    // ... 处理剩余元素
    return res;
}
```

</details>

---

## 五 : 综合练习库

### 练习 1：最近点对问题 (平面分治)

在 $O(n \log n)$ 内寻找平面上距离最近的两点。

<details>
<summary>Check Solution</summary>

**策略**：

1. 按 $x$ 坐标分治。
2. 合并时，只考虑距离中线 $d$ 范围内的点。
3. **收敛性优化**：按 $y$ 坐标排序后，对每个点只需检查之后最多 6 个点。

```cpp
double solve(int l, int r) {
    if (l >= r) return 1e20;
    int mid = l + r >> 1;
    double d = min(solve(l, mid), solve(mid + 1, r));
    // 合并逻辑...
}
```

</details>

### 练习 2：Strassen 算法原理

如何将 $T(n) = 8T(n/2) + O(n^2)$ 优化至 $T(n) = 7T(n/2) + O(n^2)$？

<details>
<summary>Check Solution</summary>

**数学推导**：
普通矩阵乘法需要 8 次子矩阵乘法。Strassen 定义了 7 个中间矩阵 $P_1 \dots P_7$，仅需 7 次乘法即可组合出原矩阵的所有项。
根据主定理 Case 1: $\log_2 7 \approx 2.81 < \log_2 8 = 3$。

</details>

---

_编者注：分治不仅能降低时间复杂度，更是实现并行计算的基础。每一个独立的子问题都可以被分发到不同的处理核心上并行执行。_
