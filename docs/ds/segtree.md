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

### 1.2 拓扑一致性验证 (Topological Consistency)

在执行 `push_down` (标记下传) 或 `push_up` (信息上传) 时，必须保证：
- **信息不变量**: 节点 $u$ 的信息必须由其子节点 $ls, rs$ 完全决定，即 $\text{val}[u] = \text{merge}(\text{val}[ls], \text{val}[rs])$。
- **算子顺序一致性**: 若标记支持非交换操作（如矩阵乘法），则标记 $f_1$ 在 $f_2$ 之后加入时，复合标记应更新为 $f_{new} = f_1 \circ f_2$。

---

## 2. 复杂度分析与空间分配证明

### 2.1 时间复杂度：$O(\log N)$ 剪枝证明

**定理**：任何区间查询 $[l, r]$ 最多访问 $4 \log N$ 个节点。
**证明**：
1. 在每一层中，只有与 $[l, r]$ 边界相交的区间会分裂。
2. 由于只有 2 个边界，$l$ 和 $r$，每一层最多产生 4 个受边界影响的节点。
3. 树高为 $\lceil \log_2 N \rceil$，故总访问节点数为 $O(\log N)$。

### 2.2 空间分配证明 (Systematic Space Allocation)

**定理**：对于长度为 $N$ 的序列，采用堆式存储（索引 $2u, 2u+1$）需要 $4N$ 的空间。
**证明**：
1. 设 $N$ 不是 2 的幂。找到最小的 $2^k \ge N$。
2. 将序列补齐到 $2^k$，此时线段树是一棵满二叉树。
3. 满二叉树的叶子节点位于第 $k$ 层和第 $k+1$ 层。
4. 最后一层（第 $k+1$ 层）的起始索引为 $2^{k+1}$。
5. 最坏情况下 $N = 2^k + 1$，则补齐后的满二叉树需要 $2^{k+2} - 1$ 个节点。
6. 由于 $2^k < N$，故 $2^{k+2} < 4N$。结论成立。
**优化**：若采用**动态开点**或 **zkw 线段树**，空间可进一步压缩至 $2N$。

---

## 3. 多维操作逻辑验证：二维线段树 (2D Segment Tree)

二维线段树（也称矩形树）用于维护二维平面上的矩形区域信息。

### 3.1 树套树结构与空间开销

- **空间证明**: 外层线段树有 $4N$ 个节点，每个节点对应一棵内层线段树。若内层线段树采用动态开点，且共有 $M$ 个点，总空间复杂度为 $O(M \log N)$ 而非 $O(N \cdot M)$。

---

## 4. 工业级优化：均摊分析 (Segment Tree Beats)

### 4.1 势能分析证明

对于区间取 $\min$ ($a_i = \min(a_i, k)$)：
定义势函数 $\Phi$ 为树中所有节点的“最大值与其严格次大值”不同的节点数。
- 当 $k \ge mx$ 时，不操作。
- 当 $se < k < mx$ 时，仅更新最大值，不改变势能或减少。
- 当 $k \le se$ 时，递归向下。
通过势能分析可以证明其均摊复杂度为 $O(\log^2 N)$ 或在特定条件下 $O(\log N)$。

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

### 例题 2：扫描线求矩形面积并

<details>
<summary>Check Solution</summary>

**核心逻辑**：将矩形左右边界视为加减操作。线段树维护区间被覆盖的次数 `cnt` 和被覆盖的长度 `len`。注意扫描线通常不需要 `push_down`，采用**标记永久化**。

```cpp
void push_up(int u, int l, int r) {
    if (tr[u].cnt > 0) tr[u].len = x_coords[r+1] - x_coords[l];
    else tr[u].len = tr[u<<1].len + tr[u<<1|1].len;
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
