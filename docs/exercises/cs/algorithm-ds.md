---
title: 高级数据结构专项强化练习
sidebar_label: 高级数据结构
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Layers } from 'lucide-react';

# 高级数据结构专项强化练习

> **“数据结构是算法的骨架。对复杂结构的深刻理解，是优化时空复杂度的唯一路径。”** —— 本专题涵盖线段树、平衡树、可持久化结构等工业级与竞赛级数据结构。

---

## 🪜 练习阶梯与评价标准

| 等级                                                                     | 难度目标         | 核心考察点                               | 期望达成                     |
| :----------------------------------------------------------------------- | :--------------- | :--------------------------------------- | :--------------------------- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 模板即时复现     | 并查集路径压缩、BIT 单点修改、ST 表      | 能够闭眼复现核心逻辑         |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 结构变换与维护   | 线段树懒标记、Splay 旋转、字典树前缀匹配 | 能够处理复杂的区间更新       |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span>  | 结构融合与持久化 | 主席树（可持久化线段树）、树套树、LCT    | 具备处理历史版本与动态树能力 |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：并查集与路径压缩 (Merge & Find)

**题目描述**：维护 $N$ 个集合，支持合并两个集合、查询两个元素是否在同一集合。

- **考察点**：`find` 函数中的递归路径压缩。

<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
using namespace std;

const int N = 200010;
int p[N];

int find(int x) {
    if (p[x] != x) p[x] = find(p[x]); // 路径压缩
    return p[x];
}

int main() {
    int n, m;
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) p[i] = i;
    while (m--) {
        int op, x, y;
        scanf("%d%d%d", &op, &x, &y);
        if (op == 1) p[find(x)] = find(y);
        else {
            if (find(x) == find(y)) puts("Yes");
            else puts("No");
        }
    }
    return 0;
}
```

</details>

#### 练习 2：ST 表 (Range Minimum Query)

**题目描述**：给定序列，要求在 $O(1)$ 时间内回答区间最大值查询。

- **核心思想**：倍增法预处理 $f[i][j]$ 表示以 $i$ 为起点长度为 $2^j$ 的区间最值。

<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010, M = 18;
int f[N][M], lg[N];

int main() {
    int n, m;
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) scanf("%d", &f[i][0]);
    for (int i = 2; i <= n; i++) lg[i] = lg[i / 2] + 1;

    for (int j = 1; j < M; j++)
        for (int i = 1; i + (1 << j) - 1 <= n; i++)
            f[i][j] = max(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);

    while (m--) {
        int l, r;
        scanf("%d%d", &l, &r);
        int k = lg[r - l + 1];
        printf("%d\n", max(f[l][k], f[r - (1 << k) + 1][k]));
    }
    return 0;
}
```

</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 3：线段树区间乘法 (P3373)

**题目描述**：维护一个序列，支持：1. 区间乘 $k$；2. 区间加 $k$；3. 查询区间和。

- **考察点**：两个懒标记（add 和 mul）的优先级处理。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**核心逻辑**：
下传标记时，应遵循 `sum = (sum * mul + add * len)`。当执行乘法操作时，`add` 标记也要随之乘以乘数。

```cpp
#include <iostream>
using namespace std;

typedef long long LL;
const int N = 100010;
int n, m, p;
int a[N];
struct Node {
    int l, r;
    LL sum, add, mul;
} tr[N << 2];

void pushup(int u) {
    tr[u].sum = (tr[u << 1].sum + tr[u << 1 | 1].sum) % p;
}

void eval(Node &u, LL add, LL mul) {
    u.sum = (u.sum * mul + (LL)(u.r - u.l + 1) * add) % p;
    u.mul = (u.mul * mul) % p;
    u.add = (u.add * mul + add) % p;
}

void pushdown(int u) {
    eval(tr[u << 1], tr[u].add, tr[u].mul);
    eval(tr[u << 1 | 1], tr[u].add, tr[u].mul);
    tr[u].add = 0, tr[u].mul = 1;
}

void build(int u, int l, int r) {
    if (l == r) tr[u] = {l, r, a[l], 0, 1};
    else {
        tr[u] = {l, r, 0, 0, 1};
        int mid = l + r >> 1;
        build(u << 1, l, mid), build(u << 1 | 1, mid + 1, r);
        pushup(u);
    }
}
// ... 篇幅原因省略部分实现
```

</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 4：可持久化线段树（主席树）

**题目描述**：给定一个序列，求区间 $[L, R]$ 内第 $k$ 小的数。

- **核心思想**：对序列的每个前缀建立一棵权值线段树，利用前缀和思想查询。

<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int N = 100010;
struct Node {
    int l, r, cnt;
} tr[N * 4 + N * 17];

int root[N], idx;
vector<int> nums;
int a[N];

int find(int x) {
    return lower_bound(nums.begin(), nums.end(), x) - nums.begin();
}

int build(int l, int r) {
    int p = ++idx;
    if (l == r) return p;
    int mid = l + r >> 1;
    tr[p].l = build(l, mid), tr[p].r = build(mid + 1, r);
    return p;
}

int update(int p, int l, int r, int x) {
    int q = ++idx;
    tr[q] = tr[p];
    if (l == r) {
        tr[q].cnt++;
        return q;
    }
    int mid = l + r >> 1;
    if (x <= mid) tr[q].l = update(tr[p].l, l, mid, x);
    else tr[q].r = update(tr[p].r, mid + 1, r, x);
    tr[q].cnt = tr[tr[q].l].cnt + tr[tr[q].r].cnt;
    return q;
}

int query(int q, int p, int l, int r, int k) {
    if (l == r) return l;
    int cnt = tr[tr[q].l].cnt - tr[tr[p].l].cnt;
    int mid = l + r >> 1;
    if (k <= cnt) return query(tr[q].l, tr[p].l, l, mid, k);
    else return query(tr[q].r, tr[p].r, mid + 1, r, k - cnt);
}

int main() {
    int n, m;
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) {
        scanf("%d", &a[i]);
        nums.push_back(a[i]);
    }
    sort(nums.begin(), nums.end());
    nums.erase(unique(nums.begin(), nums.end()), nums.end());

    root[0] = build(0, nums.size() - 1);
    for (int i = 1; i <= n; i++)
        root[i] = update(root[i - 1], 0, nums.size() - 1, find(a[i]));

    while (m--) {
        int l, r, k;
        scanf("%d%d%d", &l, &r, &k);
        printf("%d\n", nums[query(root[r], root[l - 1], 0, nums.size() - 1, k)]);
    }
    return 0;
}
```

</details>

---

## 🏆 训练建议

1. **注重代码复用**：线段树的 `pushdown` 和 `pushup` 是核心，养成良好的封装习惯。
2. **空间复杂度敏感**：对于可持久化结构，必须精确估算节点数（通常为 $N \log N$）。
3. **离散化技巧**：处理大范围坐标时，优先考虑离散化或动态开点。
