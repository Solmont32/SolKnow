---
title: 前缀和与差分 (Prefix Sum & Difference)
sidebar_position: 5
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Layers, Shuffle, Maximize, Target, Grid, Ruler } from 'lucide-react';

# 前缀和与差分 (Prefix Sum & Difference)

<KnowledgeCard 
  title="离散微积分视角" 
  icon={Layers}
  color="#ef4444"
>
  前缀和与差分是处理**区间贡献**与**区间修改**的对称算子。在离散数学中，它们分别对应于连续数学中的**积分 (Integral)** 与 **导数 (Derivative)**。
</KnowledgeCard>

---

## 一 : 核心理论：算子对称性证明

设原序列为 $A = \{a_1, a_2, \dots, a_n\}$。

### 1. 前缀和算子 (Summation Operator)
定义前缀和序列 $S$ 为：
$$ S_i = \sum_{j=1}^i a_j $$
**线性性质证明**：
根据求和定义，区间 $[l, r]$ 的和可表示为：
$$ \sum_{j=l}^r a_j = \sum_{j=1}^r a_j - \sum_{j=1}^{l-1} a_j = S_r - S_{l-1} $$
**复杂度分析**：单次区间查询由 $O(N)$ 优化至 $O(1)$。

### 2. 差分算子 (Difference Operator)
定义差分序列 $D$ 满足 $d_i = a_i - a_{i-1}$（约定 $a_0 = 0$）。
**基本定理**：差分序列的前缀和即为原序列。
$$ \sum_{j=1}^i d_j = (a_1 - a_0) + (a_2 - a_1) + \dots + (a_i - a_{i-1}) = a_i $$
**区间修改证明**：
对区间 $[l, r]$ 全体加上 $c$，反映在差分序列上，仅有 $d_l$ 增加了 $c$（$a_l - a_{l-1}$ 增大），以及 $d_{r+1}$ 减小了 $c$（$a_{r+1} - a_r$ 减小）。其余项 $a_k - a_{k-1}$ 保持不变。

---

## 二 : 高维拓展与容斥原理

### 1. 二维前缀和 (2D Prefix Sum)
**矩阵构建**：
$$ S_{i, j} = S_{i-1, j} + S_{i, j-1} - S_{i-1, j-1} + a_{i, j} $$
**区域查询** $(x1, y1) \to (x2, y2)$：
$$ \text{Sum} = S_{x2, y2} - S_{x1-1, y2} - S_{x2, y1-1} + S_{x1-1, y1-1} $$

### 2. 二维差分 (2D Difference)
**矩阵修改**：对矩形区域整体加 $c$。
- $D_{x1, y1} \leftarrow D_{x1, y1} + c$
- $D_{x2+1, y1} \leftarrow D_{x2+1, y1} - c$
- $D_{x1, y2+1} \leftarrow D_{x1, y2+1} - c$
- $D_{x2+1, y2+1} \leftarrow D_{x2+1, y2+1} + c$

---

## 三 : 渐进性能矩阵

| 维度 | 构建复杂度 | 查询/修改 | 空间复杂度 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **1D 前缀和** | $\Theta(N)$ | $O(1)$ 查询 | $O(N)$ | 适合静态区间和 |
| **1D 差分** | $\Theta(N)$ | $O(1)$ 修改 | $O(N)$ | 适合批量区间修改 |
| **2D 前缀和** | $\Theta(N \cdot M)$ | $O(1)$ 查询 | $O(NM)$ | 图像处理常用 |
| **3D 前缀和** | $\Theta(N^3)$ | $O(1)$ 查询 | $O(N^3)$ | 遵循容斥原理 $2^3$ 项 |

---

## 四 : 教材化例题

### 例题 1：激光炸弹 (二维前缀和实战)
寻找 $R \times R$ 正方形覆盖的最大点权重和。

<details>
<summary>Check Solution</summary>

**复杂度验证**：
- 预处理：$O(X_{max} \cdot Y_{max})$。
- 查询：$O(X_{max} \cdot Y_{max})$。
- 总复杂度线性，适用于 $5000 \times 5000$ 级别规模。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 5010;
int s[N][N];

int main() {
    int n, r;
    cin >> n >> r;
    r = min(r, 5001);

    for (int i = 0; i < n; i++) {
        int x, y, w;
        cin >> x >> y >> w;
        s[x + 1][y + 1] += w;
    }

    for (int i = 1; i <= 5001; i++)
        for (int j = 1; j <= 5001; j++)
            s[i][j] += s[i-1][j] + s[i][j-1] - s[i-1][j-1];

    int res = 0;
    for (int i = r; i <= 5001; i++)
        for (int j = r; j <= 5001; j++)
            res = max(res, s[i][j] - s[i-r][j] - s[i][j-r] + s[i-r][j-r]);

    cout << res << endl;
    return 0;
}
```
</details>

---

## 五 : 综合练习库

### 练习 1：最高身高 (前缀和与差分综合)
$N$ 头牛，$M$ 对互相能看见的关系 $(A, B)$，表示 $A, B$ 之间所有牛都比 $\min(H_A, H_B)$ 短。已知第 $P$ 头牛最高。

<details>
<summary>Check Solution</summary>

**建模推导**：
相互看见意味着中间的牛高度至少减 1。这是一个区间减 1 的操作，使用差分数组维护。
$$ d[l+1] \leftarrow d[l+1] - 1, \quad d[r] \leftarrow d[r] + 1 $$
最后求前缀和即可。

```cpp
#include <iostream>
#include <set>
using namespace std;

const int N = 10010;
int d[N];
set<pair<int, int>> existed;

int main() {
    int n, p, h, m;
    cin >> n >> p >> h >> m;
    while (m--) {
        int a, b;
        cin >> a >> b;
        if (a > b) swap(a, b);
        if (existed.count({a, b})) continue;
        existed.insert({a, b});
        d[a + 1]--, d[b]++;
    }

    int cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += d[i];
        cout << h + cur << endl;
    }
    return 0;
}
```
</details>

---

_编者注：前缀和是“空间换时间”的极致体现。它告诉我们，通过 $O(N)$ 的预处理，可以将 $O(Q \cdot N)$ 的查询转化为 $O(Q)$。_
