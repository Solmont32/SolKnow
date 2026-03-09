---
title: 单调栈与单调队列 (Monotonic Stack & Queue)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 单调栈与单调队列 (Monotonic Stack & Queue)

单调结构通过在维护结构（栈或队列）的同时，强制保持元素的**单调性**，从而将原本需要 $O(n^2)$ 的暴力搜索优化至 $O(n)$。

---

## 一、单调栈 (Monotonic Stack)

### 1. 核心思想
在一个序列中，寻找每个数**左侧（或右侧）最近的**比它大（或小）的数。

### 2. 实现模板
以寻找左侧最近的更小数为例：
```cpp
int tt = 0;
for (int i = 0; i < n; i++) {
    while (tt && stk[tt] >= x) tt--; // 破坏单调性的元素出栈
    if (!tt) cout << -1 << " ";
    else cout << stk[tt] << " ";
    stk[++tt] = x;
}
```

---

## 二、单调队列 (Monotonic Queue)

### 1. 核心思想
维护一个**滑动窗口**内的最大值或最小值。

### 2. 实现流程
1. 检查队头是否滑出窗口（`q[hh] < i - k + 1`）。
2. 当新元素加入时，若它比队尾元素更优（如求最小，它更小），则队尾出队。
3. 插入新元素，队头即为当前窗口最值。

```cpp
int hh = 0, tt = -1;
for (int i = 0; i < n; i++) {
    if (hh <= tt && q[hh] < i - k + 1) hh++; // 移出窗口
    while (hh <= tt && a[q[tt]] >= a[i]) tt--; // 维护单调增
    q[++tt] = i;
    if (i >= k - 1) printf("%d ", a[q[hh]]);
}
```

---

## 三、教材化例题

### 例题 1：单调栈 (最近更小数)

给定一个长度为 $n$ 的整数序列，输出每个数左边第一个比它小的数，如果不存在则输出 -1。

:::note[点击查看解析与代码]

**解析**：
当我们要插入 $x$ 时，如果栈顶元素 $y \ge x$，那么对于 $x$ 之后的元素来说，$y$ 永远不会作为“左侧第一个比它小的数”出现（因为 $x$ 更小且更靠近右侧）。因此 $y$ 可以永久弹出。

**代码实现 (C++)**：
```cpp
#include <iostream>
using namespace std;

const int N = 100010;
int stk[N], tt;

int main() {
    int n;
    cin >> n;
    while (n--) {
        int x;
        cin >> x;
        while (tt && stk[tt] >= x) tt--;
        if (tt) cout << stk[tt] << " ";
        else cout << -1 << " ";
        stk[++tt] = x;
    }
    return 0;
}
```
:::

### 例题 2：滑动窗口最大值 (单调队列)

给定一个大小为 $n$ 的数组，有一个大小为 $k$ 的滑动窗口从数组的最左侧移动到最右侧。输出窗口在每个位置时的最大值。

:::note[点击查看解析与代码]

**解析**：
使用单调递减队列。队列中存储下标。
每次移动：
1. `q[hh]` 是否在 `[i-k+1, i]` 之外？是则 `hh++`。
2. `a[i]` 是否 $\ge$ `a[q[tt]]`？是则 `tt--`。
3. `a[i]` 入队。
4. `a[q[hh]]` 即为当前最大。

**代码实现 (C++)**：
```cpp
#include <iostream>
using namespace std;

const int N = 1000010;
int a[N], q[N];

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);

    int hh = 0, tt = -1;
    for (int i = 0; i < n; i++) {
        if (hh <= tt && q[hh] < i - k + 1) hh++;
        while (hh <= tt && a[q[tt]] <= a[i]) tt--;
        q[++tt] = i;
        if (i >= k - 1) printf("%d ", a[q[hh]]);
    }
    return 0;
}
```
:::

---

## 四、练习库

- [练习 1：直方图中的最大矩形](/docs/exercises/cs/algorithm-basic#练习-7)
- [练习 2：理想正方形 (二维单调队列)](/docs/exercises/cs/algorithm-basic#练习-8)

---

_编者注：单调结构的本质是“及时排除无用信息”，从而保持候选集合的精简与高效。_
