---
title: 前缀和与差分 (Prefix Sum & Difference)
sidebar_position: 5
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Layers, Shuffle, Maximize, Target } from 'lucide-react';

# 前缀和 with 差分 (Prefix Sum & Difference)

前缀和与差分是处理**贡献独立性**与**区间操作**的对称算子。在数学上，它们对应于离散空间的**积分**与**求导**。

---

## 一、 线性空间：一维算子

### 1. 前缀和 (Integral)
设原序列为 $\{a_n\}$，前缀和序列 $\{S_n\}$ 定义为：
$$ S_i = \sum_{j=1}^i a_j $$
**性质**：区间 $[l, r]$ 的权值和可通过 $O(1)$ 算出：
$$ \sum_{k=l}^r a_k = S_r - S_{l-1} $$

### 2. 差分 (Derivative)
设差分序列为 $\{d_n\}$，满足 $d_1 = a_1$ 且 $d_i = a_i - a_{i-1}$。
**性质**：对区间 $[l, r]$ 全体加 $c$，等价于：
$$ d_l \leftarrow d_l + c, \quad d_{r+1} \leftarrow d_{r+1} - c $$
修改后通过对 $d$ 求前缀和即可还原原数组。

---

## 二、 平面与空间：高维拓展 (容斥原理)

### 1. 二维前缀和
$S_{i, j}$ 表示矩形 $(1, 1) \to (i, j)$ 的元素和。
- **构建**：$S_{i, j} = S_{i-1, j} + S_{i, j-1} - S_{i-1, j-1} + a_{i, j}$
- **查询** $(x_1, y_1) \to (x_2, y_2)$：
  $$ \text{Area} = S_{x_2, y_2} - S_{x_1-1, y_2} - S_{x_2, y_1-1} + S_{x_1-1, y_1-1} $$

### 2. 二维差分
对矩形 $(x_1, y_1) \to (x_2, y_2)$ 全部加上 $c$：
- $d_{x_1, y_1} \leftarrow d_{x_1, y_1} + c$
- $d_{x_2+1, y_1} \leftarrow d_{x_2+1, y_1} - c$
- $d_{x_1, y_2+1} \leftarrow d_{x_1, y_2+1} - c$
- $d_{x_2+1, y_2+1} \leftarrow d_{x_2+1, y_2+1} + c$

<KnowledgeCard type="warning" title="边界处理">
在高维操作中，坐标下标通常从 1 开始，以避免 $i-1$ 越界。同时，差分数组的长度应比原数组大 1 或 2。
</KnowledgeCard>

---

## 三、 教材化例题

### 例题 1：激光炸弹 (二维前缀和典型应用)
在网格地图上，求 $R \times R$ 的正方形范围内能覆盖的最大价值和。

<details>
<summary>C++ 实现</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 5010;
int s[N][N];

int main() {
    int n, r;
    scanf("%d %d", &n, &r);
    r = min(r, 5001);

    for (int i = 0; i < n; i++) {
        int x, y, w;
        scanf("%d %d %d", &x, &y, &w);
        s[x + 1][y + 1] += w;
    }

    for (int i = 1; i <= 5001; i++)
        for (int j = 1; j <= 5001; j++)
            s[i][j] += s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1];

    int res = 0;
    for (int i = r; i <= 5001; i++)
        for (int j = r; j <= 5001; j++)
            res = max(res, s[i][j] - s[i - r][j] - s[i][j - r] + s[i - r][j - r]);

    printf("%d\n", res);
    return 0;
}
```
</details>

---

## 四 : 综合练习库

### 练习 1：地毯
$n \times n$ 的网格，初始全为 0。给出 $m$ 个地毯的覆盖范围 $(x_1, y_1) \to (x_2, y_2)$，求最终每个格子被多少地毯覆盖。
<details>
<summary>Check Solution</summary>

**解题思路**：
标准的二维差分应用。最后通过前缀和还原网格。

```cpp
#include <iostream>
using namespace std;

const int N = 1010;
int d[N][N];

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    while (m--) {
        int x1, y1, x2, y2;
        scanf("%d %d %d %d", &x1, &y1, &x2, &y2);
        d[x1][y1]++;
        d[x2 + 1][y1]--;
        d[x1][y2 + 1]--;
        d[x2 + 1][y2 + 1]++;
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            d[i][j] += d[i - 1][j] + d[i][j - 1] - d[i - 1][j - 1];
            printf("%d ", d[i][j]);
        }
        puts("");
    }
    return 0;
}
```
</details>

### 练习 2：Tallest Cow
有 $N$ 头牛，给定 $M$ 条信息说明第 $A$ 头能看到第 $B$ 头（即 $[A+1, B-1]$ 的牛都比它们矮）。求每头牛的最大可能身高。
<details>
<summary>Check Solution</summary>

**解题思路**：
1. 初始所有牛高度为 $H$。
2. 每次信息 $(A, B)$，将区间 $(A, B)$ 减 1（差分实现）。
3. 注意去重，避免重复信息导致多减。

```cpp
#include <iostream>
#include <set>
#include <algorithm>
using namespace std;

const int N = 10010;
int d[N];
set<pair<int, int>> existed;

int main() {
    int n, p, h, m;
    scanf("%d %d %d %d", &n, &p, &h, &m);
    while (m--) {
        int a, b;
        scanf("%d %d", &a, &b);
        if (a > b) swap(a, b);
        if (existed.count({a, b})) continue;
        existed.insert({a, b});
        d[a + 1]--, d[b]++;
    }

    int s = 0;
    for (int i = 1; i <= n; i++) {
        s += d[i];
        printf("%d\n", h + s);
    }
    return 0;
}
```
</details>

---

_编者注：前缀和是“空间换时间”的极致体现。它告诉我们，通过 $O(N)$ 的预处理，可以将 $O(Q \cdot N)$ 的查询转化为 $O(Q)$。_
