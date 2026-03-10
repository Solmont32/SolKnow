---
title: 二分与三分算法 (Binary & Ternary Search)
sidebar_position: 3
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, Zap, AlertTriangle, Lightbulb } from 'lucide-react';

# 二分与三分算法 (Binary & Ternary Search)

二分与三分算法是处理**有序性（Order）**与**凸性（Convexity）**问题的利器。其本质是通过对决策空间的重复划分，实现搜索复杂度的对数级（$O(\log n)$）降维。

---

## 一、 二分算法：单调性与二分性

### 1. 形式化定义
设 $f: D \to \{0, 1\}$ 为定义在有序集 $D$ 上的判定函数。若 $f$ 满足：
$$\exists m \in D, \forall x \le m, f(x) = 1 \text{ 且 } \forall x > m, f(x) = 0$$
则称性质 $f$ 在 $D$ 上具有**二分性**。我们的目标是寻找该分界点 $m$。

### 2. 整数二分模板 (防死循环指南)
整数二分最易在边界处产生死循环。其核心逻辑在于：**区间划分方式必须与 `mid` 取值严格对应**。

#### 情况 A：寻找符合性质的“最后”一个元素
区间划分为 $[l, mid-1]$ 和 $[mid, r]$。
```cpp
while (l < r) {
    int mid = l + r + 1 >> 1; // 向上取整，防止 l = r-1 时 mid 停留在 l
    if (check(mid)) l = mid;
    else r = mid - 1;
}
```

#### 情况 B：寻找符合性质的“第一”个元素
区间划分为 $[l, mid]$ 和 $[mid+1, r]$。
```cpp
while (l < r) {
    int mid = l + r >> 1; // 向下取整
    if (check(mid)) r = mid;
    else l = mid + 1;
}
```

<KnowledgeCard type="tip" title="单调性判定技巧">
并不是只有单调函数才能二分。只要能找到一个判定条件 `check`，使得搜索空间被分成两部分，左半部分满足，右半部分不满足（或反之），二分即可生效。
</KnowledgeCard>

---

## 二、 三分算法：极值寻找与单峰函数

当函数 $f(x)$ 为**单峰函数**（先增后减或先减后增）时，二分不再适用，此时需采用三分搜索。

### 1. 逻辑推导
在区间 $[L, R]$ 内取两个采样点 $m_1, m_2$，将区间三等分：
- $m_1 = L + (R-L)/3$
- $m_2 = R - (R-L)/3$

若寻找极大值且 $f(m_1) < f(m_2)$，则极大值必不在 $[L, m_1]$，更新 $L = m_1$；反之更新 $R = m_2$。

### 2. 实数三分模板
```cpp
for (int i = 0; i < 100; i++) { // 100次迭代足以达到极高精度
    double m1 = l + (r - l) / 3, m2 = r - (r - l) / 3;
    if (f(m1) < f(m2)) l = m1;
    else r = m2;
}
```

---

## 三、 教材化例题

### 例题 1：进击的奶牛 (最小值最大化)
$N$ 个隔间坐标 $x_i$，放置 $M$ 头牛，使最近两头牛距离的最大值尽量大。

<details>
<summary>解析与推导</summary>

**逻辑推导**：
1. **单调性判定**：若间距 $d$ 可行，则任何 $d' < d$ 均可行。
2. **决策转化**：将“寻找最大值”转化为“判定距离 $d$ 是否合法”。
3. **Check 函数**：贪心放置，第一头牛放 $x_0$，若当前牛在 $x_{last}$，则下一头牛放在第一个满足 $x_i \ge x_{last} + d$ 的位置。

```cpp
bool check(int d) {
    int cnt = 1, last = x[0];
    for (int i = 1; i < n; i++) {
        if (x[i] - last >= d) {
            cnt++, last = x[i];
        }
    }
    return cnt >= m;
}
```
</details>

### 例题 2：曲线极值 (三分应用)
给定二次函数 $f(x) = ax^2 + bx + c$ ($a < 0$)，在 $[L, R]$ 寻找其最大值。

<details>
<summary>C++ 实现</summary>

```cpp
double f(double x) { return a * x * x + b * x + c; }

double solve() {
    double l = L, r = R;
    for (int i = 0; i < 100; i++) {
        double m1 = l + (r - l) / 3;
        double m2 = r - (r - l) / 3;
        if (f(m1) < f(m2)) l = m1;
        else r = m2;
    }
    return f(l);
}
```
</details>

---

## 四、 综合练习库

### 练习 1：数的范围
给定升序数组，查询 $k$ 的起始与终止位置。若不存在输出 `-1 -1`。
<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
using namespace std;

const int N = 100010;
int a[N];

int main() {
    int n, q;
    scanf("%d%d", &n, &q);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    while (q--) {
        int x;
        scanf("%d", &x);
        int l = 0, r = n - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if (a[mid] >= x) r = mid;
            else l = mid + 1;
        }
        if (a[l] != x) printf("-1 -1\n");
        else {
            printf("%d ", l);
            int l2 = 0, r2 = n - 1;
            while (l2 < r2) {
                int mid = l2 + r2 + 1 >> 1;
                if (a[mid] <= x) l2 = mid;
                else r2 = mid - 1;
            }
            printf("%d\n", l2);
        }
    }
    return 0;
}
```
</details>

### 练习 2：最佳牛围栏 (二分答案 + 前缀和)
给定序列 $a$，求一个长度不小于 $L$ 的子段，使得该子段算术平均值最大。
<details>
<summary>Check Solution</summary>

**解题思路**：
1. 二分平均值 $avg$。
2. 将所有 $a_i$ 减去 $avg$，问题转化为：是否存在长度 $\ge L$ 的子段，其和 $\ge 0$。
3. 利用前缀和 $S_i$ 维护，并记录 $min\_S_j (j \le i-L)$，若 $S_i - min\_S_j \ge 0$ 则可行。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010;
double a[N], b[N], s[N];
int n, L;

bool check(double mid) {
    for (int i = 1; i <= n; i++) b[i] = a[i] - mid;
    for (int i = 1; i <= n; i++) s[i] = s[i - 1] + b[i];
    double minv = 0;
    for (int i = 0, j = L; j <= n; i++, j++) {
        minv = min(minv, s[i]);
        if (s[j] - minv >= 0) return true;
    }
    return false;
}

int main() {
    scanf("%d%d", &n, &L);
    for (int i = 1; i <= n; i++) scanf("%lf", &a[i]);
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
</details>

---

_编者注：二分是“缩小确定性的范围”，而三分是“排除不可能的区域”。掌握这两者，便掌握了高效检索决策空间的精髓。_
