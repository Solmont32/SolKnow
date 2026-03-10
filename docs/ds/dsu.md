---
title: 并查集 (Disjoint Set Union)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitMerge, Users, Zap, ShieldCheck } from 'lucide-react';

# 并查集 (DSU): 集合关系的维护艺术

<KnowledgeCard type="info" title="核心定义">
并查集（Disjoint Set Union, DSU）是一种维护**等价关系**的数据结构。它管理一系列不相交的集合，并支持两种原子操作：
1. **Find**：确定元素所属的集合（即找到其所在树的根节点）。
2. **Union**：将两个集合合并为一个。
</KnowledgeCard>

---

## 1. 算法优化与复杂度分析

### 1.1 路径压缩 (Path Compression)
在执行 `find` 操作时，将路径上经过的所有节点直接挂在根节点下。
```cpp
int find(int x) {
    return p[x] == x ? x : p[x] = find(p[x]);
}
```

### 1.2 按秩合并 (Union by Rank/Size)
始终将深度较小（或规模较小）的树合并到较大的树下，防止退化为链。

### 1.3 复杂度证明
**结论**：同时使用路径压缩和按秩合并，并查集操作的摊还时间复杂度为 $O(\alpha(N))$，其中 $\alpha$ 是**反阿克曼函数**。对于宇宙中任何可观察的数据规模，$O(\alpha(N)) < 5$，可视为常数级。

---

## 2. 核心进阶：带权并查集 (Weighted DSU)

带权并查集通过在每个节点上维护一个相对于其父节点的权值，来描述元素间的**相对关系**（如距离、倍数、逻辑关系）。

### 2.1 权值更新公式
在路径压缩时，权值需递归更新。设 $d[x]$ 为 $x$ 到父节点的权值：
```cpp
int find(int x) {
    if (p[x] != x) {
        int root = find(p[x]);
        d[x] += d[p[x]]; // 权值累加（或按模运算）
        p[x] = root;
    }
    return p[x];
}
```

---

## 3. 教材化例题与解析

### 例题 1：食物链 (经典带权应用)
<details>
<summary>Check Solution</summary>

**题目描述**：有 A, B, C 三类动物形成食物链环。判定 $k$ 句话的真伪。
**解析**：维护每个点到根节点的距离 $d[x]$。
- $d[x] \equiv 0 \pmod 3$：同类。
- $d[x] \equiv 1 \pmod 3$：吃根节点。
- $d[x] \equiv 2 \pmod 3$：被根节点吃。

```cpp
#include <iostream>
using namespace std;
const int N = 50005;
int p[N], d[N];

int find(int x) {
    if (p[x] == x) return x;
    int root = find(p[x]);
    d[x] = (d[x] + d[p[x]]) % 3;
    p[x] = root;
    return root;
}

int main() {
    int n, k, ans = 0;
    cin >> n >> k;
    for(int i=1; i<=n; i++) p[i] = i;
    while(k--) {
        int t, x, y; cin >> t >> x >> y;
        if(x > n || y > n) { ans++; continue; }
        int px = find(x), py = find(y);
        if(t == 1) {
            if(px == py && (d[x] - d[y] + 3) % 3 != 0) ans++;
            else if(px != py) {
                p[px] = py;
                d[px] = (d[y] - d[x] + 3) % 3;
            }
        } else {
            if(px == py && (d[x] - d[y] + 3) % 3 != 1) ans++;
            else if(px != py) {
                p[px] = py;
                d[px] = (d[y] - d[x] + 1 + 3) % 3;
            }
        }
    }
    cout << ans << endl;
    return 0;
}
```
</details>

### 例题 2：并查集与离散化 (程序自动分析)
<details>
<summary>Check Solution</summary>

**题目描述**：给定 $N$ 个约束 $x_i = x_j$ 或 $x_i \neq x_j$，判定是否冲突。
**策略**：先处理所有相等关系（合并），再检查不等关系。

```cpp
// 1. 离散化所有坐标
// 2. 将所有 e=1 的操作进行并查集合并
// 3. 遍历所有 e=0 的操作，若 find(a) == find(b) 则冲突
```
</details>

---

## 4. 综合练习

1. **[基础]** 维护集合大小的并查集。
2. **[提高]** 银河英雄传说（带权距离维护）。
3. **[进阶]** 边带权的并查集解决 parity 问题。

---

_编者注：并查集是离散结构中最具美感的算法之一。简单的递归背后，隐藏着近乎线性复杂度的深刻数学支撑。_
