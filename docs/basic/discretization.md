---
title: 离散化策略 (Discretization Strategies)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 离散化策略 (Discretization Strategies)

离散化是一种处理**值域极大** ($0 \dots 10^9$) 但**数据个数较少** ($0 \dots 10^5$) 的问题的核心技巧。其本质是将无限（或极大）的连续空间映射到有限（且较小）的整数空间，从而允许使用数组下标进行高效操作。

---

## 一、数学定义与分类

### 1. 形式化定义
设原始集合为 $S \subset \mathbb{R}$，且 $|S| = n$。离散化映射 $f: S \to \{1, 2, \dots, n\}$ 满足：
$$ \forall x, y \in S, x < y \iff f(x) < f(y) $$
即 $f$ 是一个**保序映射**。

### 2. 常见策略
- **数值离散化**：仅针对点的值。
- **区间离散化**：涉及线段覆盖，可能需要在相邻坐标间插入“中间点”以区分连续与断开。
- **坐标压缩**：在二维平面中，分别对 $x$ 和 $y$ 轴独立离散化。

---

## 二、标准算法流程

离散化通常包含以下三个关键步骤：

### 1. 收集与预处理
将所有可能涉及到的坐标（包括修改点、查询边界等）存入一个 `vector`。
```cpp
vector<int> alls;
for (int x : points) alls.push_back(x);
```

### 2. 排序与去重 (Unique)
利用 C++ STL 的 `sort` 和 `unique` 保证映射的一一对应性。
```cpp
sort(alls.begin(), alls.end());
alls.erase(unique(alls.begin(), alls.end()), alls.end());
```

### 3. 映射查找
通过二分查找确定原始值映射后的下标。
```cpp
int find(int x) {
    return lower_bound(alls.begin(), alls.end(), x) - alls.begin() + 1; // 1-based
}
```

---

## 三、进阶应用：区间离散化

在处理区间覆盖（如线段树）时，如果只保留 $l, r$，可能会丢失区间之间的空隙信息。
**策略**：对于每个区间 $[l, r]$，将 $l, r, r+1$（或 $l-1, l, r, r+1$）全部加入离散化集合。

<KnowledgeCard type="info" title="为什么需要 r+1?">
如果不加入 $r+1$，那么两个区间 $[1, 2]$ 和 $[4, 5]$ 在离散化后会变成相邻的点（2和4映射为连续下标），原本存在的空隙 $[3, 3]$ 消失了。
</KnowledgeCard>

---

## 四、教材化例题

### 例题 1：区域和查询 (基础数值离散化)

在数轴上给定 $n$ 个坐标点的增量操作 $\{x_i, c_i\}$，即 $a[x_i] \leftarrow a[x_i] + c_i$。随后进行 $m$ 次区间查询 $[l_j, r_j]$。
坐标值域 $10^9$，操作数 $10^5$。

<details>
<summary>点击查看 C++ 实现</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

typedef pair<int, int> PII;
const int N = 300010;

int n, m;
int a[N], s[N];
vector<int> alls;
vector<PII> add, query;

int find(int x) {
    int l = 0, r = alls.size() - 1;
    while (l < r) {
        int mid = l + r >> 1;
        if (alls[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return l + 1;
}

int main() {
    ios::sync_with_stdio(false);
    cin >> n >> m;

    for (int i = 0; i < n; i++) {
        int x, c;
        cin >> x >> c;
        add.push_back({x, c});
        alls.push_back(x);
    }

    for (int i = 0; i < m; i++) {
        int l, r;
        cin >> l >> r;
        query.push_back({l, r});
        alls.push_back(l);
        alls.push_back(r);
    }

    // 1. 排序去重
    sort(alls.begin(), alls.end());
    alls.erase(unique(alls.begin(), alls.end()), alls.end());

    // 2. 映射与修改
    for (auto item : add) a[find(item.first)] += item.second;

    // 3. 前缀和预处理
    for (int i = 1; i <= alls.size(); i++) s[i] = s[i - 1] + a[i];

    // 4. 查询
    for (auto item : query) {
        int l = find(item.first), r = find(item.second);
        cout << s[r] - s[l - 1] << "\n";
    }

    return 0;
}
```
</details>

### 例题 2：离散化在扫描线中的应用 (思想引导)

给定 $n$ 个矩形，求它们的并集面积。
**思路**：将所有矩形的左右边界 $x$ 坐标离散化，将平面切割成若干垂直条带。在每个条带内，纵向坐标的变化也是离散的。

---

## 五、练习与巩固

- **练习 1**：[电影评分] 给定 $n$ 个人对 $m$ 部电影的喜好程度，值域 $10^9$，求最受欢迎的电影。
- **练习 2**：[程序自动分析] 利用并查集处理相等关系，利用离散化处理值域，判定约束是否矛盾。

<details>
<summary>练习 2 核心代码提示</summary>

```cpp
// 离散化所有涉及到的变量下标 i, j
for (auto e : equals) {
    p[find(e.i)] = find(e.j); // 合并
}
for (auto ne : not_equals) {
    if (find(ne.i) == find(ne.j)) return "矛盾";
}
```
</details>

---

_编者注：离散化是连接“无限空间”与“有限内存”的桥梁。掌握它，是迈向高级数据结构（如线段树、扫描线）的必经之路。_
