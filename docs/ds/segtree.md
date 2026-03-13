---
title: 线段树 (Segment Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Layers, Zap, ShieldCheck, BoxSelect, Code2, Sigma, Binary, Cpu, LayoutGrid } from 'lucide-react';

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

线段树是对区间信息的二叉划分映射。设 $S = \{a_1, a_2, \dots, a_n\}$ 为原始序列，线段树定义了一个映射 $\mathcal{T}: \mathcal{I} \to M$，其中 $\mathcal{I}$ 是 $[1, n]$ 的所有子区间。

### 1.1 递归构造原语

- **Build(L, R)**:
  - 若 $L=R$，创建叶节点 $u$，$\mathcal{T}(u) = a_L$。
  - 否则，递归构造 $mid = \lfloor (L+R)/2 \rfloor$ 的左子树与右子树，$\mathcal{T}(u) = \mathcal{T}(ls) \oplus \mathcal{T}(rs)$。

---

## 2. 复杂度分析与一致性证明

### 2.1 时间复杂度：$O(\log N)$ 剪枝证明

**定理**：任何区间查询 $[l, r]$ 最多访问 $4 \log N$ 个节点。
**证明**：
1. 考虑查询区间在树中的分解。在每一层中，只有与 $[l, r]$ 边界相交的区间会继续分裂。
2. 设当前节点代表区间 $[L, R]$。若 $[L, R] \subseteq [l, r]$，直接返回（$O(1)$）。
3. 若 $[L, R] \cap [l, r] = \emptyset$，直接返回（$O(1)$）。
4. 只有当 $[L, R]$ 包含 $l$ 或 $r$ 且不完全被 $[l, r]$ 覆盖时，才会进入下一层。每一层这样的节点最多 2 个，树高为 $\log N$，故总访问节点数为 $O(\log N)$。更精确的常数界为 $4 \log N$。

### 2.2 空间复杂度：4N 定律证明

**定理**：对于长度为 $N$ 的序列，采用完全二叉树堆式存储（$2u, 2u+1$）需要 $4N$ 的空间。
**证明**：
线段树是二叉树，叶子节点数为 $N$。
1. 最坏情况下，$N = 2^k + 1$。为了填满最后一层，树的高度将达到 $k+1$。
2. 倒数第二层有 $2^k$ 个节点，其中一部分是叶子。最后一层将有最多 $2N$ 个位置。
3. 总节点数 $\sum_{i=0}^{k+1} 2^i = 2^{k+2} - 1 \approx 4N$。

---

## 3. 多维操作逻辑验证：二维线段树 (2D Segment Tree)

二维线段树（也称矩形树）用于维护二维平面上的矩形区域信息。

### 3.1 树套树结构 (Tree in Tree)

- **外层线段树**: 维护 $x$ 轴区间 $[x_L, x_R]$。
- **内层线段树**: 外层线段树的每个节点 $u$ 都是一棵完整的维护 $y$ 轴的线段树 $\mathcal{T}_y(u)$。
- **操作复杂度**:
  - **修改**: $O(\log N \log M)$。
  - **查询**: $O(\log N \log M)$。
- **空间开销**: $O(N \log M)$。

### 3.2 标记永久化 (Tag Persistence in 2D)

在二维线段树中，`push_down` 操作非常复杂且开销巨大。通常采用**标记永久化**：
- 修改时，在外层和内层对应的区间直接挂载标记，不向下传播。
- 查询时，累加路径上遇到的所有标记贡献。

---

## 4. 工业级优化：分摊分析

### 4.1 线段树 Beats (Segment Tree Beats)

对于区间取 $\min$ ($a_i = \min(a_i, k)$) 和查询区间和：
**复杂度分析**：
定义势函数 $\Phi$ 为树中所有节点的“最大值与其严格次大值”不同的节点数。通过维护最大值 $mx$、次大值 $se$ 和最大值个数 $cnt$，可以实现均摊 $O(\log N)$ 的复杂度。

---

## 5. 教材化例题与解析

### 例题 1：区间最大连续子段和 (GSS)

<details>
<summary>Check Solution (C++ Implementation)</summary>

**核心思想**：维护四个信息：区间和 `sum`、最大前缀和 `pre`、最大后缀和 `suf`、最大子段和 `dat`。

```cpp
struct Node {
    int sum, pre, suf, dat;
};
Node merge(Node l, Node r) {
    Node res;
    res.sum = l.sum + r.sum;
    res.pre = max(l.pre, l.sum + r.pre);
    res.suf = max(r.suf, r.sum + l.suf);
    res.dat = max({l.dat, r.dat, l.suf + r.pre});
    return res;
}
```

</details>

### 例题 2：二维区域求和 (动态开点)

<details>
<summary>Check Solution (2D Segment Tree Sketch)</summary>

```cpp
void update_y(int &u, int l, int r, int y, int v) {
    if (!u) u = ++idx;
    tr[u].sum += v;
    if (l == r) return;
    int mid = (l + r) >> 1;
    if (y <= mid) update_y(tr[u].ls, l, mid, y, v);
    else update_y(tr[u].rs, mid + 1, r, y, v);
}
void update_x(int &u, int l, int r, int x, int y, int v) {
    if (!u) u = ++idx_x;
    update_y(roots_y[u], 1, M, y, v);
    if (l == r) return;
    int mid = (l + r) >> 1;
    if (x <= mid) update_x(tr_x[u].ls, l, mid, x, y, v);
    else update_x(tr_x[u].rs, mid + 1, r, x, y, v);
}
```

</details>

---

## 6. 综合练习与解答

1. **[区间方差]** 支持区间加、区间求方差。
<details>
<summary>Check Solution</summary>

**代数展开**：$V = \frac{1}{n} \sum (a_i - \bar{a})^2 = \frac{1}{n} (\sum a_i^2 - 2\bar{a} \sum a_i + n\bar{a}^2) = \frac{1}{n} \sum a_i^2 - (\frac{\sum a_i}{n})^2$。
线段树只需维护区间和 $\sum a_i$ 和区间平方和 $\sum a_i^2$。

</details>

2. **[矩阵乘法线段树]** 维护一个序列，支持区间乘以一个 $2 \times 2$ 矩阵，查询向量和。
<details>
<summary>Check Solution</summary>

**核心逻辑**：线段树的每个节点存储一个向量 $V$。标记是一个矩阵 $M$。利用矩阵乘法的结合律 $M_1(M_2 V) = (M_1 M_2)V$。

</details>

---

_编者注：线段树的代数本质在于将区间的离散积分分解为对数级的基本单元叠加。掌握其标记传播的数学一致性与多维扩展逻辑，是迈向高级算法竞赛的必经之路。_
