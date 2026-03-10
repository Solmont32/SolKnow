---
title: ST 表 (Sparse Table)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Layers, Zap, Search, ShieldCheck } from 'lucide-react';

# ST 表 (Sparse Table): 静态区间查询的巅峰

<KnowledgeCard type="info" title="核心定义">
ST 表（Sparse Table）是一种基于**倍增（Doubling）**思想的数据结构，专门用于解决**静态区间最值查询（RMQ）**。它通过 $O(N \log N)$ 的预处理，实现在 $O(1)$ 时间内响应任何区间的最值询问。
</KnowledgeCard>

---

## 1. 数学原理：幂等性与倍增

### 1.1 幂等性 (Idempotency)
ST 表之所以能实现 $O(1)$ 查询，是因为 `max` (或 `min`, `gcd`) 操作满足幂等性：
$$\max(x, x) = x$$
这意味着我们可以用两个**可能重叠**的区间覆盖目标区间，而不影响结果。

### 1.2 递推公式
设 $f[i][j]$ 表示区间 $[i, i + 2^j - 1]$ 的最大值。
- **初值**：$f[i][0] = a_i$
- **转移**：$f[i][j] = \max(f[i][j-1], f[i + 2^{j-1}][j-1])$
  该公式将长度为 $2^j$ 的区间等分为两个长度为 $2^{j-1}$ 的子区间。

---

## 2. 复杂度分析与对比

| 特性 | ST 表 | 线段树 | 树状数组 (维护 Max) |
| :--- | :--- | :--- | :--- |
| **预处理** | $O(N \log N)$ | $O(N)$ | $O(N)$ |
| **查询** | $O(1)$ | $O(\log N)$ | $O(\log^2 N)$ |
| **修改** | 不支持 | $O(\log N)$ | $O(\log^2 N)$ |
| **适用场景** | 静态 RMQ | 动态区间维护 | 动态前缀最值 |

---

## 3. 教材化例题与解析

### 例题 1：静态 RMQ 模板
<details>
<summary>Check Solution</summary>

**题目描述**：给定 $N$ 个数，$M$ 次询问区间 $[L, R]$ 的最大值。
**核心实现**：
```cpp
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

const int N = 1e5 + 10, M = 20;
int f[N][M], lg[N];

void precompute(int n) {
    for (int i = 2; i <= n; i++) lg[i] = lg[i / 2] + 1;
}

int main() {
    int n, m; cin >> n >> m;
    precompute(n);
    for (int i = 1; i <= n; i++) cin >> f[i][0];

    for (int j = 1; j < M; j++)
        for (int i = 1; i + (1 << j) - 1 <= n; i++)
            f[i][j] = max(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);

    while (m--) {
        int l, r; cin >> l >> r;
        int k = lg[r - l + 1];
        cout << max(f[l][k], f[r - (1 << k) + 1][k]) << endl;
    }
    return 0;
}
```
</details>

---

## 4. 综合练习

1. **[基础]** 维护区间最小值（Min）。
2. **[提高]** 维护区间 GCD。 (提示：GCD 同样满足幂等性 $\gcd(x, x) = x$)
3. **[进阶]** 结合 ST 表与二分查找，解决“区间内第一个大于 $X$ 的位置”。

---

_编者注：ST 表是“空间换时间”思想的极致体现。在不需要在线修改的场景下，它是 RMQ 问题的唯一真神。_
