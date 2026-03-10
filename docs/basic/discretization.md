---
title: 离散化策略 (Discretization)
sidebar_position: 7
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Minimize, Shuffle, Repeat } from 'lucide-react';

# 离散化策略 (Discretization)

离散化是一种**空间换时间**的特殊映射技术。当数据的范围极大（如 $0 \sim 10^9$）但个数较少（如 $10^5$）时，我们只关心其相对大小（有序性），通过将其映射到连续的整数区间，可以使用前缀和、树状数组或线段树等工具。

---

## 一、 核心步骤

1.  **收集 (Collect)**：统计所有可能用到的坐标。
2.  **排序 (Sort)**：对坐标数组进行升序排序。
3.  **去重 (Unique)**：利用 `std::unique` 去除重复坐标。
4.  **映射 (Map)**：使用 `std::lower_bound` (二分查找) 找到原值在有序数组中的位置，该位置即为离散化后的值。

---

## 二 : 实现模板

```cpp
vector<int> alls; // 存储所有待离散化的值
sort(alls.begin(), alls.end());
alls.erase(unique(alls.begin(), alls.end()), alls.end());

// 查询离散化后的坐标 (1-based)
int find(int x) {
    return lower_bound(alls.begin(), alls.end(), x) - alls.begin() + 1;
}
```

---

## 三 : 教材化例题

### 例题 1：区间和
在数轴上，初始全为 0。进行 $n$ 次操作，每次在 $x$ 位置加上 $c$。之后进行 $m$ 次询问，求 $[l, r]$ 区间内数字的和。坐标范围 $[-10^9, 10^9]$，$n, m \le 10^5$。

<details>
<summary>解析与推导</summary>

**逻辑推导**：
1. 坐标范围极大，无法直接开数组。
2. 但涉及到的坐标最多只有 $n + 2m$ 个。
3. 将 $n$ 个操作位置和 $m$ 对询问端点全部放入 `alls`。
4. 离散化后，在映射后的位置进行单点修改。
5. 利用前缀和求区间和。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef pair<int, int> PII;
const int N = 300010;
int a[N], s[N];
vector<int> alls;
vector<PII> add, query;

int find(int x) {
    return lower_bound(alls.begin(), alls.end(), x) - alls.begin() + 1;
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++) {
        int x, c;
        scanf("%d %d", &x, &c);
        add.push_back({x, c});
        alls.push_back(x);
    }
    for (int i = 0; i < m; i++) {
        int l, r;
        scanf("%d %d", &l, &r);
        query.push_back({l, r});
        alls.push_back(l);
        alls.push_back(r);
    }

    sort(alls.begin(), alls.end());
    alls.erase(unique(alls.begin(), alls.end()), alls.end());

    for (auto item : add) a[find(item.first)] += item.second;
    for (int i = 1; i <= alls.size(); i++) s[i] = s[i - 1] + a[i];

    for (auto item : query) {
        int l = find(item.first), r = find(item.second);
        printf("%d\n", s[r] - s[l - 1]);
    }
    return 0;
}
```
</details>

---

## 四 : 综合练习库

### 练习 1：离散化去重
实现一个支持在线插入、查询排名（离散化意义下）的简易系统。
<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// 略：核心逻辑同模板。离散化通常用于静态或离线场景。
```
</details>

---

_编者注：离散化是“无限到有限”的映射。它不仅仅是为了节省空间，更是为了打通数据与算法（如前缀和）之间的壁垒。_
