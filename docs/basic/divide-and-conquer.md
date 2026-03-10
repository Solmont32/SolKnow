---
title: 分治思想 (Divide and Conquer)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 分治思想 (Divide and Conquer)

分治 (Divide and Conquer) 是算法设计中最具威力的范式之一。其核心思想是将一个复杂的问题分解成若干个规模较小、但结构与原问题相似的子问题，递归解决这些子问题，最后将子问题的解合并为原问题的解。

---

## 一、数学基础与执行流程

### 1. 三部曲
1. **分解 (Divide)**：将原问题分解为若干个规模较小的子问题。
2. **解决 (Conquer)**：递归地解决各个子问题。若子问题规模足够小（Base Case），则直接求解。
3. **合并 (Combine)**：将子问题的解合并成原问题的解。

### 2. 复杂度分析：主定理 (Master Theorem)
分治算法的复杂度通常遵循递归式 $T(n) = aT(n/b) + f(n)$。
- $a$: 子问题个数。
- $n/b$: 子问题规模。
- $f(n)$: 合并子问题的开销。

<KnowledgeCard type="info" title="典型复杂度">
- **归并排序**: $T(n) = 2T(n/2) + O(n) \implies O(n \log n)$
- **二分查找**: $T(n) = 1T(n/2) + O(1) \implies O(\log n)$
</KnowledgeCard>

---

## 二、经典应用：排序与选择

### 1. 快速排序与归并排序
详见 [排序算法章节](sorting)。

### 2. 快速选择 (Quick Select)
在 $O(n)$ 时间内寻找第 $k$ 大的数。
**思想**：利用快排的 Partition 过程。若分界点下标刚好为 $k$，则直接返回；否则只递归处理一边。

---

## 三、高级分治例题

### 例题 1：平面最近点对 (Closest Pair of Points)

给定 $n$ 个点的坐标，求其中距离最近的两点之间的距离。

<details>
<summary>点击查看解析与 C++ 代码</summary>

**解析**：
1. **分**：按 $x$ 坐标排序，划分为左右两半。
2. **治**：递归求出左右两半内部的最小距离 $d = \min(d_{left}, d_{right})$。
3. **合**：考虑横跨分界线的点对。
   - 只有 $x$ 坐标在 $[mid - d, mid + d]$ 范围内的点才可能贡献更小的 $d$。
   - 对于该区域内的点，按 $y$ 坐标排序。
   - **核心引理**：每个点只需检查其后方 6 个点即可保证正确性（鸽巢原理）。

**实现关键点**：
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

struct Point { double x, y; };

bool compareX(Point a, Point b) { return a.x < b.x; }
bool compareY(Point a, Point b) { return a.y < b.y; }

double dist(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

double solve(vector<Point>& p, int l, int r) {
    if (l >= r) return 1e20;
    if (l + 1 == r) return dist(p[l], p[r]);

    int mid = (l + r) / 2;
    double midX = p[mid].x;
    double d = min(solve(p, l, mid), solve(p, mid + 1, r));

    vector<Point> temp;
    for (int i = l; i <= r; i++) {
        if (abs(p[i].x - midX) < d) temp.push_back(p[i]);
    }

    sort(temp.begin(), temp.end(), compareY);

    for (int i = 0; i < temp.size(); i++) {
        for (int j = i + 1; j < temp.size() && (temp[j].y - temp[i].y) < d; j++) {
            d = min(d, dist(temp[i], temp[j]));
        }
    }
    return d;
}
```
</details>

---

## 四、练习库

- **练习 1**：[逆序对] 利用归并排序求数组中的逆序对。
- **练习 2**：[矩阵乘法] Strassen 算法 (了解分治如何降低矩阵乘法复杂度)。
- **练习 3**：[棋盘覆盖] 给定一个 $2^k \times 2^k$ 个方格的棋盘，其中有一个特殊方格，用 L 型骨牌覆盖其余所有方格。

---

_编者注：分治不仅是一种算法，更是一种将“宏观难题”降维打击为“微观简单题”的哲学。_
