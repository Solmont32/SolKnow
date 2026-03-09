---
title: 二分算法 (Binary Search)
---

import Details from '@theme/Details';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 二分算法 (Binary Search)

二分算法的核心在于利用**单调性**（或某种分段性质），通过不断缩小目标区间将搜索范围减半，将线性搜索的 $O(n)$ 复杂度优化至 $O(\log n)$。

---

## 一、整数二分

整数二分的难点在于**边界处理**（死循环问题）。根据区间划分方式，通常分为两种模板。

### 1. 基本模板

<KnowledgeCard type="warning" title="边界陷阱">
当区间划分包含 `mid = l + r >> 1` 且更新为 `l = mid` 时，若 `l = r - 1`，则 `mid` 始终等于 `l`，导致死循环。必须使用模板 2 中的 `+ 1` 偏移。
</KnowledgeCard>

**模板 1：查找左边界（第一个满足条件的元素）**
区间 $[l, r]$ 被划分成 $[l, mid]$ 和 $[mid + 1, r]$：
```cpp
int bsearch_1(int l, int r) {
    while (l < r) {
        int mid = l + r >> 1;
        if (check(mid)) r = mid;    // mid满足性质，目标在左侧或就是mid
        else l = mid + 1;           // mid不满足，目标必然在右侧
    }
    return l;
}
```

**模板 2：查找右边界（最后一个满足条件的元素）**
区间 $[l, r]$ 被划分成 $[l, mid - 1]$ 和 $[mid, r]$：
```cpp
int bsearch_2(int l, int r) {
    while (l < r) {
        int mid = l + r + 1 >> 1;   // 注意这里的 +1
        if (check(mid)) l = mid;    // mid满足性质，目标在右侧或就是mid
        else r = mid - 1;           // mid不满足，目标必然在左侧
    }
    return l;
}
```

---

## 二、实数二分

实数二分不存在边界死循环，只需设定精度 `eps` 或固定迭代次数。

```cpp
double bsearch_3(double l, double r) {
    const double eps = 1e-8; // 精度视题意而定
    while (r - l > eps) {
        double mid = (l + r) / 2;
        if (check(mid)) r = mid;
        else l = mid;
    }
    return l;
}
```

---

## 三、二分答案 (Bisection on Answers)

这是算法竞赛中最常见的应用：**如果答案具有单调性，则可以通过二分来寻找最优解。**

### 判别准则
- 题目要求：最大值最小 / 最小值最大。
- 性质：若 $x$ 满足条件，则所有 $y > x$（或 $y < x$）通常也满足条件。

---

## 四、教材化例题

### 例题 1：数的范围 (数轴上的左右边界)

给定一个按照升序排列的长度为 $n$ 的整数数组，以及 $q$ 个查询。对于每个查询，返回一个元素 $k$ 的起始位置和终止位置。如果数组中不存在该元素，则返回 `-1 -1`。

:::note[点击查看解析与代码]

**解析**：
本题是标准的整数二分应用。起始位置是“第一个 $\ge k$ 的位置”，终止位置是“最后一个 $\le k$ 的位置”。

**代码实现 (C++)**：
```cpp
#include <iostream>
#include <vector>

using namespace std;

const int N = 100010;
int q[N];

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);

    while (m--) {
        int x;
        scanf("%d", &x);

        int l = 0, r = n - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if (q[mid] >= x) r = mid;
            else l = mid + 1;
        }

        if (q[l] != x) cout << "-1 -1" << endl;
        else {
            cout << l << " ";
            int l = 0, r = n - 1;
            while (l < r) {
                int mid = l + r + 1 >> 1;
                if (q[mid] <= x) l = mid;
                else r = mid - 1;
            }
            cout << l << endl;
        }
    }
    return 0;
}
```
:::

### 例题 2：数的三次方根 (实数二分)

给定一个浮点数 $n$，求它的三次方根。

:::note[点击查看解析与代码]

**解析**：
三次方根函数 $f(x) = x^3$ 在 $\mathbb{R}$ 上单调递增，直接二分。

**代码实现 (C++)**：
```cpp
#include <iostream>
using namespace std;

int main() {
    double x;
    cin >> x;
    double l = -100, r = 100;
    while (r - l > 1e-8) {
        double mid = (l + r) / 2;
        if (mid * mid * mid >= x) r = mid;
        else l = mid;
    }
    printf("%.6f\n", l);
    return 0;
}
```
:::

### 例题 3：最佳牛围栏 (二分答案 + 前缀和)

给定 $n$ 块草地，第 $i$ 块草地产奶量为 $a_i$。求一个长度不小于 $L$ 的连续子段，使得该子段的平均值最大。

:::note[点击查看解析与代码]

**策略**：
1. 二分平均值 $v$。
2. 判定：是否存在一段长度 $\ge L$ 的子段，平均值 $\ge v$。
3. 转化：将所有 $a_i$ 减去 $v$，即判定是否存在长度 $\ge L$ 的子段和 $\ge 0$。
4. 使用前缀和 $S_i$。判定 $\max_{j \ge L, i \le j-L} (S_j - S_i) \ge 0$。维护 $S_i$ 的最小值即可。

**代码实现 (C++)**：
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010;
int a[N];
double s[N];
int n, L;

bool check(double mid) {
    for (int i = 1; i <= n; i++) s[i] = s[i - 1] + a[i] - mid;
    double min_v = 0;
    for (int i = 0, j = L; j <= n; i++, j++) {
        min_v = min(min_v, s[i]);
        if (s[j] >= min_v) return true;
    }
    return false;
}

int main() {
    cin >> n >> L;
    for (int i = 1; i <= n; i++) cin >> a[i];

    double l = 0, r = 2000;
    while (r - l > 1e-5) {
        double mid = (l + r) / 2;
        if (check(mid)) l = mid;
        else r = mid;
    }
    printf("%d\n", (int)(r * 1000));
    return 0;
}
```
:::

---

## 五、练习库

- [练习 1：查找元素首尾位置](/docs/exercises/cs/algorithm-basic#练习-1)
- [练习 2：进阶二分答案](/docs/exercises/cs/algorithm-basic#练习-2)

---

_编者注：二分不仅是搜索，更是一种思想。在遇到单调性、最大化极小值等字眼时，应第一时间考虑二分。_
