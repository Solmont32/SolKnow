---
title: 前缀和与差分 (Prefix Sum & Difference)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 前缀和与差分 (Prefix Sum & Difference)

前缀和与差分是一对互逆操作。前缀和用于快速求**区间和**，差分用于快速进行**区间修改**。

---

## 一、前缀和 (Prefix Sum)

### 1. 一维前缀和
对于原数组 $a_1, a_2, \dots, a_n$，前缀和 $S_i = \sum_{j=1}^i a_j$。
- **性质**：区间 $[l, r]$ 的和为 $S_r - S_{l-1}$。
- **复杂度**：预处理 $O(n)$，查询 $O(1)$。

```cpp
for (int i = 1; i <= n; i++) s[i] = s[i - 1] + a[i];
// 查询 [l, r]
int sum = s[r] - s[l - 1];
```

### 2. 二维前缀和
$S_{i,j}$ 表示左上角 $(1,1)$ 到右下角 $(i,j)$ 的矩形区域和。
- **预处理递推式**：$S_{i,j} = S_{i-1,j} + S_{i,j-1} - S_{i-1,j-1} + a_{i,j}$
- **查询子矩形 $(x1, y1) \to (x2, y2)$**：
  $Sum = S_{x2,y2} - S_{x1-1,y2} - S_{x2,y1-1} + S_{x1-1,y1-1}$

---

## 二、差分 (Difference)

### 1. 一维差分
对于原数组 $a$，构造差分数组 $b$，使得 $a$ 是 $b$ 的前缀和，即 $a_i = \sum_{j=1}^i b_j$。
- **构造**：$b_1 = a_1, b_i = a_i - a_{i-1}$。
- **区间修改**：给 $a[l \dots r]$ 全部加上 $c$，只需操作 $b$ 数组：
  $b_l += c, b_{r+1} -= c$。
- **复杂度**：修改 $O(1)$，最后 $O(n)$ 恢复原数组。

### 2. 二维差分
给以 $(x1, y1)$ 为左上角，$(x2, y2)$ 为右下角的矩形区域内所有元素加上 $c$：
```cpp
void insert(int x1, int y1, int x2, int y2, int c) {
    b[x1][y1] += c;
    b[x2 + 1][y1] -= c;
    b[x1][y2 + 1] -= c;
    b[x2 + 1][y2 + 1] += c;
}
```

---

## 三、教材化例题

### 例题 1：子矩阵的和

输入一个 $n \times m$ 的整数矩阵，再输入 $q$ 个询问，每个询问包含四个整数 $x1, y1, x2, y2$，表示一个子矩阵的左上角坐标和右下角坐标。对于每个询问输出子矩阵中所有数的和。

:::note[点击查看代码实现]
```cpp
#include <iostream>
using namespace std;

const int N = 1010;
int n, m, q;
int s[N][N];

int main() {
    scanf("%d %d %d", &n, &m, &q);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            int x;
            scanf("%d", &x);
            s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + x;
        }

    while (q--) {
        int x1, y1, x2, y2;
        scanf("%d %d %d %d", &x1, &y1, &x2, &y2);
        printf("%d\n", s[x2][y2] - s[x1 - 1][y2] - s[x2][y1 - 1] + s[x1 - 1][y1 - 1]);
    }
    return 0;
}
```
:::

### 例题 2：增减序列 (差分应用)

给定一个长度为 $n$ 的数列 $a$，每次可以选择一个区间 $[l, r]$，使下标在这个区间内的数都加 1 或者都减 1。求最少需要多少次操作，能使数列中所有数都一样，并求出最终能得到多少种不同的数列。

:::note[点击查看解析与代码]

**解析**：
目标是使 $a_2 = a_3 = \dots = a_n = 0$（在差分数组 $b$ 中）。
$b_i = a_i - a_{i-1}$ ($i \ge 2$)。
每次操作 $[l, r]$ 相当于 $b_l \pm 1, b_{r+1} \mp 1$。
1. 统计 $b_2 \dots b_n$ 中正数之和 $P$ 和负数绝对值之和 $Q$。
2. 尽量配对 $b_i$ 与 $b_j$ 修改，步数为 $\min(P, Q)$。
3. 剩余未配对的 $|P-Q|$ 步可以与 $b_1$ 或 $b_{n+1}$ 修改。
4. **最少次数**：$\min(P, Q) + |P - Q| = \max(P, Q)$。
5. **方案数**：$|P - Q| + 1$。

**代码实现 (C++)**：
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010;
int a[N];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];

    long long p = 0, q = 0;
    for (int i = 2; i <= n; i++) {
        int b = a[i] - a[i - 1];
        if (b > 0) p += b;
        else q -= b;
    }

    cout << max(p, q) << endl;
    cout << abs(p - q) + 1 << endl;
    return 0;
}
```
:::

---

## 四、练习库

- [练习 1：最高牛](/docs/exercises/cs/algorithm-basic#练习-5)
- [练习 2：激光炸弹](/docs/exercises/cs/algorithm-basic#练习-6)

---

_编者注：前缀和是降维打击的利器，差分则是化区间为单点的艺术。_
