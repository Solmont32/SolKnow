---
title: 分治思想 (Divide and Conquer)
sidebar_position: 8
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, GitMerge, Calculator, Terminal, Box, Binary, Network } from 'lucide-react';

# 分治思想 (Divide and Conquer)

分治算法的本质是**化归**。它将一个规模为 $n$ 的大问题分解为若干个规模较小且**结构相同**的子问题，递归求解后再合并子问题的解。

---

## 一、 核心步骤与形式化描述

### 1. 算法三部曲
1.  **分解 (Divide)**：将原问题 $P(n)$ 划分为 $a$ 个规模为 $n/b$ 的子问题。
2.  **治理 (Conquer)**：递归求解子问题。
3.  **合并 (Combine)**：将子问题的解融合成原问题的解。

### 2. 复杂度核心：主定理 (Master Theorem)
分治算法的复杂度通常满足递推式 $T(n) = aT(n/b) + f(n)$，其中 $f(n) = O(n^d)$。
- **Case 1**: $a > b^d \implies T(n) = O(n^{\log_b a})$。（开销主要在递归深处，如 Karatsuba）
- **Case 2**: $a = b^d \implies T(n) = O(n^d \log n)$。（开销各层均衡，如 归并排序）
- **Case 3**: $a < b^d \implies T(n) = O(n^d)$。（开销主要在根节点的合并，如 某些几何算法）

---

## 二、 经典模型深度解析

### 1. 最近点对问题 (Closest Pair)
在 $O(n \log n)$ 时间内寻找平面上距离最近的两点。

**分治推导**：
1. **分解**：按 $x$ 轴中位数划分为左右两半 $S_L, S_R$。
2. **治理**：递归求得左右两半的最近距离 $d = \min(d_L, d_R)$。
3. **合并**：考虑跨越中线的点对。
   - 只需考虑 $x$ 坐标落在 $[x_{mid}-d, x_{mid}+d]$ 范围内的点。
   - **关键优化**：对于该范围内的点按 $y$ 坐标排序，每个点只需要检查之后的常数个点（数学证明：一个 $d \times 2d$ 的矩形内最多只能容纳 6 个彼此距离 $\ge d$ 的点）。

### 2. Strassen 矩阵乘法
普通矩阵乘法为 $O(n^3)$。Strassen 通过巧妙的分治，将 8 次子矩阵乘法减少为 7 次。
- **递推式**：$T(n) = 7T(n/2) + O(n^2)$。
- **复杂度**：$O(n^{\log_2 7}) \approx O(n^{2.81})$。

---

## 三、 算法性能全景

| 算法 | $a, b, d$ 参数 | 时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- |
| **快速幂** | $1, 2, 0$ | $O(\log N)$ | $O(1)$ |
| **归并排序** | $2, 2, 1$ | $O(N \log N)$ | $O(N)$ |
| **Karatsuba** | $3, 2, 1$ | $O(N^{1.58})$ | $O(N)$ |
| **FFT** | $2, 2, 1$ | $O(N \log N)$ | $O(N)$ |

---

## 四、 综合练习库

### 练习 1：棋盘覆盖问题
在一个 $2^k \times 2^k$ 个方格的棋盘中，恰有一个方格被特殊覆盖，用 L 型骨牌覆盖其余所有方格。

<details>
<summary>Check Solution</summary>

**分治思路**：
将棋盘四等分。特殊方格必在其中一个子棋盘中。对于其余三个子棋盘，在它们汇合的中心处放置一个 L 型骨牌，使得每个子棋盘都产生一个“伪特殊方格”。递归直到 $1 \times 1$。

```cpp
void solve(int tr, int tc, int dr, int dc, int size) {
    if (size == 1) return;
    int s = size / 2;
    // 左上角
    if (dr < tr + s && dc < tc + s) solve(tr, tc, dr, dc, s);
    else { board[tr + s - 1][tc + s - 1] = t; solve(tr, tc, tr + s - 1, tc + s - 1, s); }
    // ... 对其余三个象限进行类似逻辑
}
```
</details>

### 练习 2：第 K 小元素 (分治递归证明)
如何证明快速选择在随机基准值下是 $O(n)$？

<details>
<summary>Check Solution</summary>

**数学推导**：
设 $T(n)$ 是期望比较次数。
$T(n) \le T(n \cdot \frac{3}{4}) + n$ (假设每次都能排除至少 $1/4$ 的元素)。
$T(n) \le n (1 + 3/4 + (3/4)^2 + \dots) = n \cdot \frac{1}{1 - 3/4} = 4n$。
故期望复杂度为 $O(n)$。
</details>

### 练习 3 : 快速幂的高级变体
计算矩阵快速幂以求解斐波那契数列第 $n$ 项。

<details>
<summary>Check Solution</summary>

**分治模型**：
$$ \begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n \begin{pmatrix} F_1 \\ F_0 \end{pmatrix} $$
利用二进制拆分 $n$，可在 $O(2^3 \log n)$ 时间内求解。

```cpp
Matrix qmi(Matrix a, long long b) {
    Matrix res = Identity;
    while (b) {
        if (b & 1) res = mul(res, a);
        a = mul(a, a);
        b >>= 1;
    }
    return res;
}
```
</details>

---

_编者注：分治不仅是一种算法，更是一种解决问题的哲学：当问题大到无法直视时，将其切碎，直到每个碎片都能轻易解决。_
