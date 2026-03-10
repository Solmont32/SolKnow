---
title: 二分算法 (Binary Search)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 二分算法 (Binary Search)

二分算法的核心在于利用**单调性**（Monotonicity）或某种**分段性质**。通过不断将搜索区间减半，将线性搜索的 $O(n)$ 复杂度优化至 $O(\log n)$。

---

## 一、数学基础与收敛性

### 1. 适用条件：单调性与二分性
虽然单调性是二分的充分条件，但并非必要条件。只要区间 $[L, R]$ 满足某种性质 $P$，使得存在一个分界点 $M$，满足 $P(x)$ 在 $x \le M$ 时为真（或假），在 $x > M$ 时为假（或真），即可通过二分找到 $M$。

### 2. 复杂度分析
每次迭代区间缩小为一半，经过 $k$ 次迭代后区间长度为 $\frac{R-L}{2^k}$。当长度缩减至 1（整数）或指定精度 $\epsilon$（实数）时停止。
$$ k = \lceil \log_2(R-L) \rceil \text{ 或 } k = \lceil \log_2(\frac{R-L}{\epsilon}) \rceil $$

---

## 二、整数二分模板

整数二分的关键在于**边界处理**。为了避免死循环，根据区间划分方式，通常采用以下两套模板。

### 1. 查找左边界（第一个满足性质的点）
区间被划分为 $[l, mid]$ 和 $[mid + 1, r]$。

```cpp
int bsearch_1(int l, int r) {
    while (l < r) {
        int mid = l + r >> 1;
        if (check(mid)) r = mid;
        else l = mid + 1;
    }
    return l;
}
```

### 2. 查找右边界（最后一个满足性质的点）
区间被划分为 $[l, mid - 1]$ 和 $[mid, r]$。注意 `mid` 的计算需向上取整。

```cpp
int bsearch_2(int l, int r) {
    while (l < r) {
        int mid = l + r + 1 >> 1; // +1 防止 l=r-1 时死循环
        if (check(mid)) l = mid;
        else r = mid - 1;
    }
    return l;
}
```

---

## 三、二分答案 (Bisection on Answers)

这是二分算法最高频的应用。当直接求解最优解困难，但判定一个解是否合法容易（且合法性具有单调性）时，可以使用二分。

<KnowledgeCard type="warning" title="典型特征">
- 题目求：**最大值的最小值** (Minimize the maximum) 或 **最小值的最大值** (Maximize the minimum)。
- 性质：若 $X$ 是一个可行解，则所有 $X' < X$（或 $X' > X$）也必然可行。
</KnowledgeCard>

---

## 四、教材化例题

### 例题 1：数的范围 (基础应用)
给定升序数组，查询 $k$ 的起始与终止位置。

<details>
<summary>点击查看 C++ 实现</summary>

```cpp
#include <iostream>
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
        // 查找左边界
        int l = 0, r = n - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if (q[mid] >= x) r = mid;
            else l = mid + 1;
        }
        if (q[l] != x) cout << "-1 -1" << endl;
        else {
            cout << l << " ";
            // 查找右边界
            int l2 = 0, r2 = n - 1;
            while (l2 < r2) {
                int mid = l2 + r2 + 1 >> 1;
                if (q[mid] <= x) l2 = mid;
                else r2 = mid - 1;
            }
            cout << l2 << endl;
        }
    }
    return 0;
}
```
</details>

### 例题 2：进击的奶牛 (最小值最大化)
$n$ 个隔间坐标为 $x_1, \dots, x_n$。放置 $m$ 头牛，使得任意两头牛之间的最小距离最大。

<details>
<summary>点击查看解析与代码</summary>

**解析**：
1. **二分距离** $d$。
2. **check(d)**：能否在 $x$ 中选出 $m$ 个点，使得相邻点距离 $\ge d$。
   - 贪心策略：第一头牛放第一个位置，后面每头牛尽可能早放。
3. 如果能放下 $m$ 头，说明 $d$ 可能更大，`l = d`；否则 `r = d - 1`。

**代码实现**：
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010;
int n, m, x[N];

bool check(int d) {
    int cnt = 1, last = x[0];
    for (int i = 1; i < n; i++) {
        if (x[i] - last >= d) {
            cnt++;
            last = x[i];
        }
    }
    return cnt >= m;
}

int main() {
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++) scanf("%d", &x[i]);
    sort(x, x + n);

    int l = 0, r = 1e9;
    while (l < r) {
        int mid = l + r + 1 >> 1;
        if (check(mid)) l = mid;
        else r = mid - 1;
    }
    printf("%d\n", l);
    return 0;
}
```
</details>

---

## 五、练习与巩固

- **练习 1**：[实数二分] 求 $n$ 的三次方根，精确到 $10^{-6}$。
- **练习 2**：[二分答案] 锯木厂问题：求切割高度 $H$，使得得到的木材总量恰好不小于 $M$。
- **练习 3**：[思维] 给定一个峰值数组（先增后减），求峰值元素下标。

---

_编者注：二分不仅是一种算法，更是一种高效搜索的思想。只要存在某种“判定性”的单调性，二分就是最锋利的剑。_
