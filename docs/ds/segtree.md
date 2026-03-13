---
title: 线段树 (Segment Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Layers, Zap, ShieldCheck, BoxSelect, Code2, Sigma, Binary, Cpu, LayoutGrid, Maximize2, GitMerge, TrendingUp, CheckCircle2 } from 'lucide-react';

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

### 1.1 递归构造与分治边界验证

- **Build(L, R)**:
  - 若 $L=R$，创建叶节点 $u$，$\mathcal{T}(u) = a_L$。
  - 否则，递归构造 $mid = \lfloor (L+R)/2 \rfloor$ 的左子树与右子树。

**分治边界验证 (D&C Boundary Validation)**：
对于任何区间 $[L, R]$，其划分为 $[L, mid]$ 和 $[mid+1, R]$：
1. **全覆盖性**：$[L, mid] \cup [mid+1, R] = [L, R]$。
2. **互斥性**：$[L, mid] \cap [mid+1, R] = \emptyset$。
3. **收敛性**：由于 $mid = \lfloor (L+R)/2 \rfloor$，当 $L < R$ 时，$L \le mid < R$。这确保了左区间规模 $mid - L + 1 < R - L + 1$ 且右区间规模 $R - (mid + 1) + 1 < R - L + 1$，递归过程严格收敛。

### 1.2 拓扑一致性校验 (The Non-Commutative Case)

在线段树中维护非交换算子（如矩阵乘法、仿射变换 $ax+b$）时，标记的复合顺序至关重要。

**区间维护一致性分析 (Consistency Analysis)**：
设节点已存在的标记为 $F_{old}$，新进入的标记为 $F_{new}$，则复合标记应为 $F_{total} = F_{new} \circ F_{old}$。
在 `push_down` 时，子节点的标记必须以正确顺序与父节点传下的标记复合。
```cpp
void apply(int u, const Tag& t) {
    val[u] = t(val[u]);  // 算子作用
    tag[u] = t * tag[u]; // 标记复合：新标记在前
}
```

---

## 2. 复杂度分析与系统化单调性证明

### 2.1 时间复杂度：$O(\log N)$ 剪枝证明

**定理**：任何区间查询 $[ql, qr]$ 最多访问 $4 \log N$ 个节点。
**证明**：在每一层中，只有与查询边界相交的区间会分裂。由于只有 2 个边界，每一层最多产生 4 个受影响节点。

### 2.2 系统化单调性证明 (Monotonicity in Trees)

**命题**：在线段树上进行二分查找（Segment Tree Binary Search）时，必须依赖维护信息的单调性。
- **前缀和单调性**：若 $a_i \ge 0$，则前缀和 $S_k = \sum_{i=1}^k a_i$ 随 $k$ 单调递增。
- **查找第一个 $\ge V$ 的位置**：
  若 $\max(ls) \ge V$，则目标位置必在左子树；否则若 $\max(rs) \ge V$，则在右子树。
  这种**决策单调性**保证了我们可以在 $O(\log N)$ 内精确定位。

---

## 5. 教材化例题与解析

### 例题 1：区间最大连续子段和 (GSS)
<details>
<summary>Check Solution (C++ Implementation)</summary>

**核心思想**：维护区间和 `sum`、最大前缀和 `pre`、最大后缀和 `suf`、最大子段和 `dat`。
```cpp
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

### 例题 2：区间乘加 (维护一致性)
<details>
<summary>Check Solution</summary>

**解析**：维护两个标记 $add$ 和 $mul$。运算顺序定义为 $a_i = a_i \cdot mul + add$。
当新标记 $(mul', add')$ 作用时：
$a_i' = (a_i \cdot mul + add) \cdot mul' + add' = a_i \cdot (mul \cdot mul') + (add \cdot mul' + add')$。
```cpp
void apply(int u, LL m, LL a) {
    val[u] = (val[u] * m + a * len[u]) % mod;
    mul[u] = (mul[u] * m) % mod;
    add[u] = (add[u] * m + a) % mod; // 标记复合一致性
}
```
</details>

---

## 6. 综合练习与解答

1. **[查找边界]** 给定序列 $a_i \ge 0$，查找最小的 $k$ 使得 $\sum_{i=1}^k a_i \ge S$。
<details>
<summary>Check Solution</summary>

**单调性利用**：利用前缀和的单调性，在线段树上递归。
```cpp
int query(int u, int l, int r, LL &s) {
    if (l == r) return l;
    int mid = (l + r) >> 1;
    if (tr[u << 1].sum >= s) return query(u << 1, l, mid, s);
    s -= tr[u << 1].sum;
    return query(u << 1 | 1, mid + 1, r, s);
}
```
</details>

2. **[区间取模]** 线段树维护区间取模（$a_i = a_i \pmod m$）。
<details>
<summary>Check Solution</summary>

**剪枝证明**：若区间最大值 $mx < m$，则整个区间取模后不变，可直接剪枝。
由于取模操作会使非零数值至少减半（$a \pmod m < a/2$ 若 $m \le a/2$），总复杂度为 $O((N+M) \log N)$。
</details>

---

_编者注：线段树的代数本质在于将区间的离散积分分解为对数级的基本单元叠加。_
