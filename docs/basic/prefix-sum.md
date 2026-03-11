---
title: 前缀和与差分 (Prefix Sum & Difference)
sidebar_position: 5
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Layers, Shuffle, Maximize, Target, Grid } from 'lucide-react';

# 前缀和与差分 (Prefix Sum & Difference)

前缀和与差分是处理**区间贡献**与**区间修改**的对称算子。在离散数学中，它们分别对应于**积分 (Integral)** 与 **差分 (Derivative)**。

---

## 一、 核心理论：离散算子对称性

### 1. 前缀和算子 (Summation)
设原序列为 $\{a_n\}$，前缀和序列 $\{S_n\}$ 定义为：
$$ S_i = \sum_{j=1}^i a_j $$
**核心价值**：将区间 $[l, r]$ 的权值查询从 $O(r-l)$ 降至 $O(1)$。
$$ \text{Query}(l, r) = S_r - S_{l-1} $$

### 2. 差分算子 (Difference)
设差分序列为 $\{d_n\}$，满足 $d_1 = a_1, d_i = a_i - a_{i-1}$。
**核心价值**：将区间 $[l, r]$ 的加法修改从 $O(r-l)$ 降至 $O(1)$。
$$ d_l \leftarrow d_l + c, \quad d_{r+1} \leftarrow d_{r+1} - c $$
修改后的结果序列 $a'$ 通过对 $d$ 求前缀和获得：$a'_i = \sum_{j=1}^i d_j$。

---

## 二、 算法性能分析 (Complexity)

| 操作维度 | 构建复杂度 | 查询/修改复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- |
| **一维前缀和** | $O(n)$ | $O(1)$ | $O(n)$ |
| **一维差分** | $O(n)$ | $O(1)$ | $O(n)$ |
| **二维前缀和** | $O(n \cdot m)$ | $O(1)$ | $O(n \cdot m)$ |
| **二维差分** | $O(n \cdot m)$ | $O(1)$ (修改) | $O(n \cdot m)$ |

---

## 三、 高维拓展 (容斥原理的应用)

### 1. 二维前缀和构建与查询
- **构建**：$S_{i, j} = S_{i-1, j} + S_{i, j-1} - S_{i-1, j-1} + a_{i, j}$
- **查询** $(x_1, y_1) \to (x_2, y_2)$：
  $$ \text{Area} = S_{x_2, y_2} - S_{x_1-1, y_2} - S_{x_2, y_1-1} + S_{x_1-1, y_1-1} $$

### 2. 二维差分区间加
对矩形 $(x_1, y_1) \to (x_2, y_2)$ 加上 $c$：
- $d_{x_1, y_1} \leftarrow d_{x_1, y_1} + c$
- $d_{x_2+1, y_1} \leftarrow d_{x_2+1, y_1} - c$
- $d_{x_1, y_2+1} \leftarrow d_{x_1, y_2+1} - c$
- $d_{x_2+1, y_2+1} \leftarrow d_{x_2+1, y_2+1} + c$

---

## 四、 教材化例题

### 例题 1：激光炸弹 (二维前缀和)
网格地图点权重为 $v_i$，寻找 $R \times R$ 正方形覆盖的最大权重。

<details>
<summary>解析与推导</summary>

**解题思路**：
1. **坐标归一化**：将点坐标视为格点，建立二维前缀和。注意 $R$ 可能大于地图范围。
2. **容斥查询**：遍历所有可能的右下角点 $(i, j)$，利用前缀和查询公式。

**代码实现**：
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 5010;
int s[N][N];

int main() {
    int n, r;
    scanf("%d%d", &n, &r);
    r = min(r, 5001); // 边界截断

    for (int i = 0; i < n; i++) {
        int x, y, w;
        scanf("%d%d%d", &x, &y, &w);
        s[x + 1][y + 1] += w;
    }
    // 构建
    for (int i = 1; i <= 5001; i++)
        for (int j = 1; j <= 5001; j++)
            s[i][j] += s[i-1][j] + s[i][j-1] - s[i-1][j-1];

    int res = 0;
    for (int i = r; i <= 5001; i++)
        for (int j = r; j <= 5001; j++)
            res = max(res, s[i][j] - s[i-r][j] - s[i][j-r] + s[i-r][j-r]);
    printf("%d\n", res);
}
```
</details>

---

## 五、 综合练习库

### 练习 1：地毯 (二维差分)
$N \times N$ 网格， $M$ 次地毯覆盖，求最终每个格子的覆盖层数。
<details>
<summary>Check Solution</summary>

**逻辑**：
二维差分区间修改后，对差分数组求一次二维前缀和即可还原。

```cpp
// 修改
d[x1][y1]++; d[x2+1][y1]--; d[x1][y2+1]--; d[x2+1][y2+1]++;
// 还原
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++)
        d[i][j] += d[i-1][j] + d[i][j-1] - d[i-1][j-1];
```
</details>

### 练习 2：三维前缀和 (容斥原理进阶)
求三维空间长方体 $(x1, y1, z1) \to (x2, y2, z2)$ 的权重和。
<details>
<summary>Check Solution</summary>

**查询公式**：
$$ \begin{aligned} S_{x_2, y_2, z_2} &- S_{x_1-1, y_2, z_2} - S_{x_2, y_1-1, z_2} - S_{x_2, y_2, z_1-1} \\ &+ S_{x_1-1, y_1-1, z_2} + S_{x_1-1, y_2, z_1-1} + S_{x_2, y_1-1, z_1-1} \\ &- S_{x_1-1, y_1-1, z_1-1} \end{aligned} $$

</details>

---

_编者注：前缀和是“空间换时间”的极致体现。它告诉我们，通过 $O(N)$ 的预处理，可以将 $O(Q \cdot N)$ 的查询转化为 $O(Q)$。_
