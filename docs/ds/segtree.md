---
title: 线段树 (Segment Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Layers, Zap, ShieldCheck, BoxSelect, Code2, Sigma, Binary, Cpu, LayoutGrid, Maximize2, GitMerge } from 'lucide-react';

# 线段树 (Segment Tree): 区间维护的工业级标准

<KnowledgeCard type="info" title="代数抽象：蒙耐德与算子作用">
从代数结构看，线段树维护的是一个**蒙耐德 (Monoid)** $(M, \oplus)$ 上的元素。
1. **结合律**: $(a \oplus b) \oplus c = a \oplus (b \oplus c)$。
2. **单位元**: 存在 $e \in M$ 满足 $a \oplus e = e \oplus a = a$。
对于区间修改，引入**算子作用 (Operator Action)** $F = \{f: M \to M\}$：
- **复合性**: $f_1 \circ (f_2 \circ a) = (f_1 \circ f_2) \circ a$。
- **分配律**: $f \circ (a \oplus b) = (f \circ a) \oplus (f \circ b)$。
满足上述性质的任何区间问题均可用线段树在 $O(\log N)$ 内解决。
</KnowledgeCard>

---

## 1. 系统化抽象数据类型 (ADT) 推导

线段树是对区间信息的二叉划分映射。设 $S = \{a_1, a_2, \dots, a_n\}$ 为原始序列。

### 1.1 递归构造原语

- **Build(L, R)**:
  - 若 $L=R$，创建叶节点 $u$，$\mathcal{T}(u) = a_L$。
  - 否则，递归构造 $mid = \lfloor (L+R)/2 \rfloor$ 的左子树与右子树，$\mathcal{T}(u) = \mathcal{T}(ls) \oplus \mathcal{T}(rs)$。

### 1.2 拓扑一致性校验 (The Non-Commutative Case)

在线段树中维护非交换算子（如矩阵乘法、仿射变换 $ax+b$）时，标记的复合顺序至关重要：

**一致性定理**：设节点已存在的标记为 $F_{old}$，新进入的标记为 $F_{new}$，则复合标记应为 $F_{total} = F_{new} \circ F_{old}$。
**逻辑证明**：
1. 标记代表的是一种“待执行的变换”。
2. $F_{old}$ 是先产生的操作，$F_{new}$ 是后产生的。
3. 对于数据 $x$，操作序列为 $F_{new}(F_{old}(x))$。
4. 根据函数复合定义，这等价于 $(F_{new} \circ F_{old})(x)$。
**C++ 实现注意**：在 `push_down` 时，子节点的标记必须以正确顺序与父节点传下的标记复合。

---

## 2. 复杂度分析与空间分配证明

### 2.1 时间复杂度：$O(\log N)$ 剪枝证明

**定理**：任何区间查询 $[l, r]$ 最多访问 $4 \log N$ 个节点。
**证明**：
1. 在每一层中，只有与 $[l, r]$ 边界相交的区间会分裂。
2. 由于只有 2 个边界，$l$ 和 $r$，每一层最多产生 4 个受边界影响的节点。
3. 树高为 $\lceil \log_2 N \rceil$，故总访问节点数为 $O(\log N)$。

### 2.2 均摊分析 (Segment Tree Beats)

对于区间取 $\min$ ($a_i = \min(a_i, k)$)：
定义势函数 $\Phi$ 为树中所有节点的“最大值与其严格次大值”不同的节点数。

**证明要点**：
- **Case 1**: $k \ge mx$，剪枝返回。
- **Case 2**: $se < k < mx$，仅更新最大值。此时该节点的 $mx$ 变为 $k$，势能 $\Phi$ 可能减少（若 $k$ 变得与 $se$ 相等）或保持不变。
- **Case 3**: $k \le se$，递归向下。
**结论**：通过精确的势能追踪，可以证明在 $O(M \log N)$ 次操作内，该算法的复杂度为 $O((N+M)\log N)$。

---

## 5. 教材化例题与解析

### 例题 1：区间最大连续子段和 (GSS)

<details>
<summary>Check Solution (C++ Implementation)</summary>

**核心思想**：维护四个信息：区间和 `sum`、最大前缀和 `pre`、最大后缀和 `suf`、最大子段和 `dat`。

```cpp
#include <algorithm>
#include <vector>

struct Node {
    long long sum, pre, suf, dat;
    Node() : sum(0), pre(-1e18), suf(-1e18), dat(-1e18) {}
    Node(long long v) : sum(v), pre(v), suf(v), dat(v) {}
};

Node merge(const Node& l, const Node& r) {
    Node res;
    res.sum = l.sum + r.sum;
    res.pre = std::max(l.pre, l.sum + r.pre);
    res.suf = std::max(r.suf, r.sum + l.suf);
    res.dat = std::max({l.dat, r.dat, l.suf + r.pre});
    return res;
}
```

</details>

### 例题 2：扫描线求矩形面积并

<details>
<summary>Check Solution</summary>

**核心逻辑**：将矩形左右边界视为加减操作。线段树维护区间被覆盖的次数 `cnt` 和被覆盖的长度 `len`。采用**标记永久化**。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

const int N = 200010;
int cnt[N << 2];
double len[N << 2], y_coords[N];

void push_up(int u, int l, int r) {
    if (cnt[u] > 0) len[u] = y_coords[r + 1] - y_coords[l];
    else if (l == r) len[u] = 0;
    else len[u] = len[u << 1] + len[u << 1 | 1];
}

void update(int u, int l, int r, int ql, int qr, int v) {
    if (ql <= l && r <= qr) {
        cnt[u] += v;
        push_up(u, l, r);
        return;
    }
    int mid = (l + r) >> 1;
    if (ql <= mid) update(u << 1, l, mid, ql, qr, v);
    if (qr > mid) update(u << 1 | 1, mid + 1, r, ql, qr, v);
    push_up(u, l, r);
}
```

</details>

---

## 6. 综合练习与解答

1. **[区间方差]** 支持区间加、区间求方差。
<details>
<summary>Check Solution</summary>

**公式推导**：$V = \frac{1}{n} \sum a_i^2 - (\frac{\sum a_i}{n})^2$。
线段树维护 $\sum a_i$ 和 $\sum a_i^2$。区间加 $d$ 时：
$\sum (a_i + d)^2 = \sum (a_i^2 + 2a_id + d^2) = \sum a_i^2 + 2d \sum a_i + n d^2$。

</details>

2. **[历史最值线段树]** 维护区间当前值和历史出现过的最大值。
<details>
<summary>Check Solution</summary>

**辅助标记**：维护标记 $add$ (当前加) 和 $max\_add$ (历史最大加)。利用标记的复合性质 $(a, b) \circ (c, d) = (a+c, \max(b, a+d))$。

</details>

---

_编者注：线段树的代数本质在于将区间的离散积分分解为对数级的基本单元叠加。掌握其标记传播的数学一致性与多维扩展逻辑，是迈向高级算法竞赛的必经之路。_
