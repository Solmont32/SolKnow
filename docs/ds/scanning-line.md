---
title: 扫描线技巧 (Scanning Line)
sidebar_position: 9
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MoveRight, LayoutTemplate, BoxSelect, Maximize, Activity } from 'lucide-react';

# 扫描线技巧 (Scanning Line): 降维打击的代数实现

<KnowledgeCard type="info" title="核心思想：空间到时间的转换">
**扫描线（Scanning Line）** 是一种将 $d$ 维几何问题转化为 $d-1$ 维动态维护问题的通用范式。
- **几何变换**: 想象一条直线（或平面）在空间中扫过，并在特定的**事件点 (Events)** 停止。
- **数据结构支持**: 使用线段树、树状数组或平衡树来维护扫过位置的横截面信息。
- **代数本质**: 维护区间权值的动态积分 $ \int L(x) dx $。
</KnowledgeCard>

---

## 1. 核心模型：矩形面积并 (Area Union)

### 1.1 结构定义
给定 $n$ 个矩形，每个矩形由 $(x_1, y_1)$ 和 $(x_2, y_2)$ 定义。
1. **事件点**: 每个矩形的左右垂直边。左边为入边（+1），右边为出边（-1）。
2. **离散化**: 对所有 $y$ 坐标进行排序去重，形成若干基础区间。
3. **状态维护**: 线段树节点维护：
   - `cnt`: 该区间被覆盖的次数（不进行标记下传，即**标记永久化**）。
   - `len`: 该区间内被覆盖的有效总长度。

### 1.2 合法性证明 (标记永久化)
在扫描线中，区间修改总是成对出现的（入边加，出边减），且修改范围完全一致。
**定理**: 使用不带下传标记的 `push_up` 逻辑是正确的。
**证明**:
- 当 `cnt[u] > 0` 时，整个区间 $[L, R]$ 被覆盖，`len[u] = y[R+1] - y[L]`。
- 当 `cnt[u] == 0` 时，覆盖长度完全取决于子节点的覆盖情况，即 `len[u] = len[ls] + len[rs]`。
由于操作成对，`cnt` 最终会归零，且不会出现负数，保证了积分过程的正确性。

---

## 2. 进阶：矩形周长并 (Perimeter Union)

相比面积并，周长并需要维护更复杂的拓扑信息。

### 2.1 状态增强
线段树每个节点额外维护：
- `num`: 区间内包含的**独立线段段数**。
- `l_cov`, `r_cov`: 区间左右端点是否被覆盖（布尔值）。

### 2.2 转移方程
在 `push_up` 时：
- `num[u] = num[ls] + num[rs] - (r_cov[ls] && l_cov[rs])`
横向周长贡献：$2 \times num \times \Delta x$。
纵向周长贡献：$|len_{curr} - len_{prev}|$。

---

## 3. 教材化例题与解析

### 例题 1：[HDU 1542] Atlantis (矩形面积并)
<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

const int N = 210;

struct Edge {
    double x, y1, y2;
    int type;
    bool operator< (const Edge& b) const { return x < b.x; }
} e[N];

struct Node {
    int l, r, cnt;
    double len;
} tr[N << 3];

vector<double> ys;

int find(double y) {
    return lower_bound(ys.begin(), ys.end(), y) - ys.begin();
}

void pushup(int u) {
    if (tr[u].cnt) tr[u].len = ys[tr[u].r + 1] - ys[tr[u].l];
    else if (tr[u].l != tr[u].r) tr[u].len = tr[u << 1].len + tr[u << 1 | 1].len;
    else tr[u].len = 0;
}

void update(int u, int l, int r, int v) {
    if (tr[u].l >= l && tr[u].r <= r) {
        tr[u].cnt += v;
        pushup(u);
        return;
    }
    int mid = (tr[u].l + tr[u].r) >> 1;
    if (l <= mid) update(u << 1, l, r, v);
    if (r > mid) update(u << 1 | 1, l, r, v);
    pushup(u);
}
```
</details>

### 例题 2：[POJ 1177] Picture (矩形周长并)
<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 10010;

struct Edge {
    int l, r, x, v;
    bool operator< (const Edge& b) const {
        if (x != b.x) return x < b.x;
        return v > b.v; // 入边优先
    }
} e[N];

struct Node {
    int l, r, cnt, len, num;
    bool lc, rc;
} tr[N * 8];

void pushup(int u) {
    if (tr[u].cnt) {
        tr[u].len = tr[u].r - tr[u].l + 1;
        tr[u].num = 1;
        tr[u].lc = tr[u].rc = true;
    } else if (tr[u].l != tr[u].r) {
        tr[u].len = tr[u << 1].len + tr[u << 1 | 1].len;
        tr[u].num = tr[u << 1].num + tr[u << 1 | 1].num - (tr[u << 1].rc && tr[u << 1 | 1].lc);
        tr[u].lc = tr[u << 1].lc;
        tr[u].rc = tr[u << 1 | 1].rc;
    } else {
        tr[u].len = tr[u].num = 0;
        tr[u].lc = tr[u].rc = false;
    }
}

void build(int u, int l, int r) {
    tr[u] = {l, r, 0, 0, 0, false, false};
    if (l == r) return;
    int mid = (l + r) >> 1;
    build(u << 1, l, mid);
    build(u << 1 | 1, mid + 1, r);
}

void update(int u, int l, int r, int v) {
    if (tr[u].l >= l && tr[u].r <= r) {
        tr[u].cnt += v;
        pushup(u);
        return;
    }
    int mid = (tr[u].l + tr[u].r) >> 1;
    if (l <= mid) update(u << 1, l, r, v);
    if (r > mid) update(u << 1 | 1, l, r, v);
    pushup(u);
}

int main() {
    int n;
    while (cin >> n) {
        int m = 0, miny = 10000, maxy = -10000;
        for (int i = 0; i < n; i++) {
            int x1, y1, x2, y2;
            cin >> x1 >> y1 >> x2 >> y2;
            miny = min(miny, y1); maxy = max(maxy, y2);
            e[m++] = {y1, y2, x1, 1};
            e[m++] = {y1, y2, x2, -1};
        }
        sort(e, e + m);
        build(1, miny, maxy - 1);
        int res = 0, last = 0;
        for (int i = 0; i < m; i++) {
            update(1, e[i].l, e[i].r - 1, e[i].v);
            if (i > 0) res += 2 * tr[1].num * (e[i].x - e[i - 1].x);
            res += abs(tr[1].len - last);
            last = tr[1].len;
        }
        cout << res << endl;
    }
    return 0;
}
```
</details>

---

## 4. 综合练习

1. **[窗口最大化]** 给定 $N$ 个点，求一个固定 $W \times H$ 的矩形能覆盖的最大点权和（扫描线 + 区间最大值线段树）。
2. **[面积交]** 修改 `cnt` 的逻辑，使其能够维护被覆盖至少 $k$ 次的区间长度。
3. **[进阶]** **动态扫描线**：利用可持久化线段树处理三维空间中的长方体并问题。

---

_编者注：扫描线不仅是几何工具，更是“时间复用”的思想结晶。通过将静态的空间分布转化为动态的时间序列，它展示了数据结构在解决连续积分问题时的巨大威力。_
