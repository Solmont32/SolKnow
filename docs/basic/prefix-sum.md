---
title: 前缀和与差分 (Prefix Sum & Difference)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 前缀和与差分 (Prefix Sum & Difference)

前缀和与差分是一对**互逆**的操作。前缀和能将区间查询优化为 $O(1)$，而差分能将区间修改优化为 $O(1)$。它们是处理线性、平面乃至高维空间统计问题的利器。

---

## 一、一维前缀和与差分

### 1. 前缀和 (Prefix Sum)
设原数组为 $a$，前缀和数组 $S$ 定义为：
$$ S_i = \sum_{j=1}^i a_j = S_{i-1} + a_i $$
**核心应用**：求区间 $[l, r]$ 的和：
$$ \text{Sum}(l, r) = S_r - S_{l-1} $$

### 2. 差分 (Difference)
设原数组为 $a$，差分数组 $b$ 满足：
$$ a_i = \sum_{j=1}^i b_j $$
即 $b_1 = a_1, b_i = a_i - a_{i-1} \,(i > 1)$。
**核心应用**：将区间 $[l, r]$ 全体加上 $c$：
$$ b_l \leftarrow b_l + c, \quad b_{r+1} \leftarrow b_{r+1} - c $$

---

## 二、二维前缀和与差分 (容斥原理)

### 1. 二维前缀和
$S_{i, j}$ 表示以 $(1, 1)$ 为左上角，$(i, j)$ 为右下角的矩形区域和。
- **递推公式**：$S_{i, j} = S_{i-1, j} + S_{i, j-1} - S_{i-1, j-1} + a_{i, j}$
- **查询子矩形** $(x_1, y_1) \to (x_2, y_2)$ 的和：
  $$ \text{Sum} = S_{x_2, y_2} - S_{x_1-1, y_2} - S_{x_2, y_1-1} + S_{x_1-1, y_1-1} $$

### 2. 二维差分
对矩形区域 $(x_1, y_1) \to (x_2, y_2)$ 全部加上 $c$：
- $b_{x_1, y_1} += c$
- $b_{x_2+1, y_1} -= c$
- $b_{x_1, y_2+1} -= c$
- $b_{x_2+1, y_2+1} += c$

---

## 三、教材化例题

### 例题 1：激光炸弹 (二维前缀和典型应用)
地图上有若干目标点，每个点有价值 $v_i$。炸弹爆炸范围为 $R \times R$ 的正方形，求单颗炸弹能摧毁的最大价值总和。

<details>
<summary>点击查看 C++ 实现</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 5010;
int s[N][N];

int main() {
    int n, r;
    scanf("%d %d", &n, &r);
    r = min(r, 5001); // 边界处理

    for (int i = 0; i < n; i++) {
        int x, y, w;
        scanf("%d %d %d", &x, &y, &w);
        s[x + 1][y + 1] += w; // 1-based
    }

    // 预处理二维前缀和
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

### 例题 2：增减序列 (差分与数学思维)
给定序列 $a$，每次操作可使 $a[l \dots r]$ 全部加 1 或减 1。求最少多少次操作可使序列所有数相等，且此时可能的序列有多少种。

<details>
<summary>点击查看解析与代码</summary>

**解析**：
1. 令 $a$ 全部相等，等价于差分数组 $b_2, b_3, \dots, b_n$ 全部为 0。
2. 每次操作选择 $i, j$，使 $b_i, b_j$ 一加一减。
3. 统计 $b_2 \dots b_n$ 中正数和 $P$ 与负数和绝对值 $Q$。
4. **最少次数**：$\min(P, Q) + |P - Q| = \max(P, Q)$。
5. **种类数**：$|P - Q| + 1$（对应 $b_1$ 的不同取值）。

**代码实现**：
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

typedef long long LL;
const int N = 100010;
int a[N];

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);

    LL p = 0, q = 0;
    for (int i = 2; i <= n; i++) {
        int b = a[i] - a[i - 1];
        if (b > 0) p += b;
        else q -= b;
    }

    printf("%lld\n", max(p, q));
    printf("%lld\n", abs(p - q) + 1);

    return 0;
}
```
</details>

---

## 四、练习与巩固

- **练习 1**：实现三维前缀和及其查询公式。
- **练习 2**：[借教室] 利用二分答案结合差分数组高效判定。
- **练习 3**：[地毯] 二位差分模板题：$n$ 次矩形覆盖，求最终网格状态。

---

_编者注：前缀和是“积分”，差分是“求导”。在离散数学中，它们是处理区间变换的终极对偶。_
