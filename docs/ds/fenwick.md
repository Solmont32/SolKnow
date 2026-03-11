---
title: 树状数组 (Fenwick Tree / BIT)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Binary, Sigma, ArrowUpRight, Zap } from 'lucide-react';

# 树状数组 (Fenwick Tree): 极简主义的区间美学

<KnowledgeCard type="info" title="核心定义">
树状数组（Binary Indexed Tree, BIT）是一种通过**二进制分解**实现的线性数据结构。它以 $O(N)$ 的空间复杂度，在 $O(\log N)$ 时间内完成单点修改与前缀和查询。其本质是将区间 $[1, x]$ 分解为若干个形如 $(x - 2^{k_i}, x]$ 的子区间，每个区间由一个二进制位覆盖。
</KnowledgeCard>

---

## 1. 数学原理：lowbit 与区间分解

### 1.1 `lowbit` 算子证明
`lowbit(x)` 返回 $x$ 在二进制表示下最低位的 $1$ 及其后续的 $0$。
- **公式**：`lowbit(x) = x & -x`
- **证明**：
在计算机补码表示法下，`-x = ~x + 1`。
设 $x$ 的二进制末尾为 `100...0`（$k$ 个 $0$）。
1. `~x` 将末尾变为 `011...1`。
2. `~x + 1` 将末尾重新变为 `100...0`（产生进位），而该位之前的所有位均与原码相反。
3. `x & (~x + 1)` 导致该位之前的所有位按位与结果为 $0$，只有最低位的 $1$ 得到保留。

### 1.2 节点覆盖逻辑
树状数组 $tr[x]$ 维护的区间是 $(x - lowbit(x), x]$。
- **前缀和拆分**：任何 $x$ 都可以唯一分解为 $x = \sum 2^{k_i}$，即拆分为 $O(\log x)$ 个上述形式的区间。
- **复杂度证明**：由于查询和修改都只涉及二进制位操作，每次操作跳跃的步数不超过 $\log_2 N$，因此时间复杂度严格为 $O(\log N)$。

---

## 2. 进阶策略：空间压缩与多维扩展

### 2.1 离散化 (Discretization) 优化
当值域较大（如 $10^9$）但操作数 $M$ 较小时，通过离散化将大值域映射到 $[1, M]$，从而将空间复杂度从 $O(V)$ 压缩至 $O(M)$。

### 2.2 二维树状数组
$tr[x][y]$ 维护矩形区域。对于矩形区间 $[x1, y1] \times [x2, y2]$ 的查询，利用容斥原理：
$$Sum = S(x2, y2) - S(x1-1, y2) - S(x2, y1-1) + S(x1-1, y1-1)$$

---

## 3. 教材化例题与解析

### 例题 1：区间修改 + 区间查询 (二阶差分)
<details>
<summary>Check Solution</summary>

**题目描述**：支持区间加与区间求和。
**推导**：
设差分数组 $d_i$，则 $a_i = \sum_{j=1}^i d_j$。
前缀和 $S_x = \sum_{i=1}^x a_i = \sum_{i=1}^x \sum_{j=1}^i d_j = \sum_{j=1}^x d_j \times (x - j + 1)$。
变换公式：$S_x = (x+1) \sum_{j=1}^x d_j - \sum_{j=1}^x (j \times d_j)$。
**实现**：维护两个树状数组 $tr1[j] = d_j$ 和 $tr2[j] = j \cdot d_j$。
</details>

### 例题 2：树状数组上二分
<details>
<summary>Check Solution</summary>

**题目描述**：在树状数组中寻找第一个前缀和 $\ge S$ 的位置。
**解析**：类似于倍增。从大到小枚举 $2^k$，若当前前缀和加上 $tr[pos + 2^k]$ 仍小于 $S$，则 $pos += 2^k$。复杂度 $O(\log N)$。

```cpp
int find_kth(int k) {
    int res = 0, cnt = 0;
    for (int i = 1 << 20; i; i >>= 1) { // 20 为 logN
        if (res + i <= n && cnt + tr[res + i] < k) {
            res += i;
            cnt += tr[res];
        }
    }
    return res + 1;
}
```
</details>

---

## 4. 综合练习

1. **[离散化]** 求动态逆序对个数：支持插入一个数，实时询问当前逆序对总数。
2. **[二维]** 维护一个二维矩阵，支持矩形修改与矩形求和。
3. **[进阶]** **权值树状数组**：利用树状数组代替平衡树，解决排名问题（需配合离散化）。

---

_编者注：树状数组是“小而美”的典范。它虽然在功能上是线段树的子集，但在常数效率和代码量上具有无可比拟的优势，是处理基础区间问题的首选。_
