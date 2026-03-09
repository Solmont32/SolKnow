---
title: 并查集 (Disjoint Set Union)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 并查集 (Disjoint Set Union)

并查集是一种维护**不相交集合**（等价类）的数据结构。它支持两种核心操作：
1. **合并 (Union)**：将两个元素所在的集合合并为一个。
2. **查询 (Find)**：查询某个元素所在的集合编号（或判定两个元素是否在同一集合）。

---

## 一、核心实现

### 1. 基础逻辑
每个集合用一棵树表示，根节点即为集合的代表。
```cpp
int p[N]; // 存储每个元素的父节点
```

### 2. 核心优化
- **路径压缩 (Path Compression)**：在 `find` 过程中，将路径上所有节点直接指向根节点。
- **按秩合并 (Union by Rank/Size)**：将深度（或大小）较小的树合并到较大的树下。

**代码模板 (路径压缩)**：
```cpp
int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}
```

---

## 二、扩展功能

### 1. 维护集合大小
```cpp
int size[N];
// 合并时
int pa = find(a), pb = find(b);
if (pa != pb) {
    p[pa] = pb;
    size[pb] += size[pa];
}
```

### 2. 维护边权 (带权并查集)
记录每个节点到其父节点的某种权值（如距离）。在路径压缩时同步更新权值。
```cpp
int d[N]; // 到父节点的距离
int find(int x) {
    if (p[x] != x) {
        int root = find(p[x]);
        d[x] += d[p[x]]; // 权值更新
        p[x] = root;
    }
    return p[x];
}
```

---

## 三、教材化例题

### 例题 1：合并集合 (基础应用)

一共有 $n$ 个数，编号 $1 \dots n$。进行 $m$ 个操作：
1. `M a b`：合并 $a$ 和 $b$。
2. `Q a b`：询问 $a$ 和 $b$ 是否在同一集合。

:::note[点击查看代码实现]
```cpp
#include <iostream>
using namespace std;

const int N = 100010;
int p[N];

int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    for (int i = 1; i <= n; i++) p[i] = i;

    while (m--) {
        char op[2];
        int a, b;
        scanf("%s %d %d", op, &a, &b);
        if (*op == 'M') p[find(a)] = find(b);
        else {
            if (find(a) == find(b)) puts("Yes");
            else puts("No");
        }
    }
    return 0;
}
```
:::

### 例题 2：食物链 (带权并查集)

有三类动物 A, B, C，形成环形食物链：A 吃 B，B 吃 C，C 吃 A。
给定 $k$ 句话，判定真假：
1. $x$ 和 $y$ 是同类。
2. $x$ 吃 $y$。

:::note[点击查看解析与代码]

**解析**：
利用 $d[x]$ 表示 $x$ 与父节点的食物链关系：
- $d[x] \equiv 0 \pmod 3$：同类。
- $d[x] \equiv 1 \pmod 3$：$x$ 吃父节点。
- $d[x] \equiv 2 \pmod 3$：$x$ 被父节点吃。

**代码实现 (C++)**：
```cpp
#include <iostream>
using namespace std;

const int N = 50010;
int p[N], d[N];

int find(int x) {
    if (p[x] != x) {
        int t = find(p[x]);
        d[x] += d[p[x]];
        p[x] = t;
    }
    return p[x];
}

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    for (int i = 1; i <= n; i++) p[i] = i;

    int res = 0;
    while (k--) {
        int t, x, y;
        scanf("%d %d %d", &t, &x, &y);
        if (x > n || y > n) res++;
        else {
            int px = find(x), py = find(y);
            if (t == 1) {
                if (px == py && (d[x] - d[y]) % 3) res++;
                else if (px != py) {
                    p[px] = py;
                    d[px] = d[y] - d[x];
                }
            } else {
                if (px == py && (d[x] - d[y] - 1) % 3) res++;
                else if (px != py) {
                    p[px] = py;
                    d[px] = d[y] + 1 - d[x];
                }
            }
        }
    }
    printf("%d\n", res);
    return 0;
}
```
:::

---

## 四、练习库

- [练习 1：银河英雄传说 (带权)](/docs/exercises/cs/algorithm-basic#练习-9)
- [练习 2：程序自动分析 (离散化+并查集)](/docs/exercises/cs/algorithm-basic#练习-10)

---

_编者注：并查集是大规模等价关系维护的最优选择。带权并查集则是处理环形或相对关系的神兵。_
