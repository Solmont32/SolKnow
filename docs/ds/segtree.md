---
title: 线段树 (Segment Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import { Code2, GitMerge, Layers, Zap, ShieldCheck, BoxSelect } from 'lucide-react';

# 线段树 (Segment Tree): 区间维护的工业级标准

<KnowledgeCard type="info" title="核心定义">
线段树（Segment Tree）是一种高度平衡的二叉搜索树，主要用于维护**区间信息**。它将长度为 $N$ 的序列划分为 $O(N)$ 个区间节点，每个节点代表序列中的一个子区间 $[l, r]$。通过**算子延迟传播（Lazy Propagation）**与**分治**技术，它能在 $O(\log N)$ 时间内完成区间查询与修改。
</KnowledgeCard>

---

## 1. 数学建模与复杂度分析

### 1.1 节点构造与分治原理
对于区间 $[L, R]$，其分解满足：
$$T(L, R) = \begin{cases} \{[L, L]\} & L = R \\ \{[L, R]\} \cup T(L, mid) \cup T(mid+1, R) & L < R, mid = \lfloor \frac{L+R}{2} \rfloor \end{cases}$$
**定理**：任何长度为 $L$ 的区间 $[l, r] \subseteq [1, N]$ 都可以被线段树分解为不超过 $2\log N$ 个原生节点。

### 1.2 空间复杂度：$4N$ 存储律
**证明**：
线段树本质上是一棵深度为 $\lceil \log_2 N \rceil + 1$ 的二叉树。
1. 当 $N = 2^k$ 时，它是满二叉树，节点数为 $2N-1$。
2. 当 $N \ne 2^k$ 时，最底层的节点可能延伸到数组下标 $2^{\lceil \log_2 N \rceil + 1}$。
由于 $2^{\lceil \log_2 N \rceil + 1} < 2^{\log_2 N + 2} = 4N$，因此数组开销 $4N$ 是绝对安全的。

---

## 2. 区间操作优化：算子合并与蒙耐德 (Monoid)

线段树维护的信息 $V$ 与修改算子 $F$ 应满足以下代数性质：

1. **结合律**：信息合并 $(a \oplus b) \oplus c = a \oplus (b \oplus c)$，确保分治查询正确。
2. **算子复合**：$f_2 \circ (f_1 \circ V) = (f_2 \circ f_1) \circ V$，确保懒标记叠加正确。
3. **分配律**：$f \circ (a \oplus b) = (f \circ a) \oplus (f \circ b)$，确保标记下传后信息合并仍正确。

### 2.1 懒标记 (Lazy Tag) 传播规范
```cpp
void push_down(int u, int l, int r) {
    if (tr[u].tag == ID) return; // ID 为单位元标记
    int mid = (l + r) >> 1;
    apply(u << 1, l, mid, tr[u].tag);
    apply(u << 1 | 1, mid + 1, r, tr[u].tag);
    tr[u].tag = ID;
}
```

---

## 3. 空间压缩策略：动态开点线段树

当 $N$ 极大（如 $10^9$）且实际操作的元素较少时，静态 $4N$ 数组会内存溢出。此时采用**动态开点**。

### 3.1 核心思想
不预先分配所有节点，仅在访问到该区间时创建节点。
- **空间复杂度**：$O(M \log N)$，$M$ 为操作次数。
- **实现差异**：放弃 `u<<1` 索引，改用 `ls[u]` 和 `rs[u]` 存储子节点指针。

```cpp
int ls[MAX_NODES], rs[MAX_NODES], tr[MAX_NODES], idx;

void update(int &u, int l, int r, int x, int v) {
    if (!u) u = ++idx; // 动态分配节点
    if (l == r) { tr[u] += v; return; }
    int mid = (l + r) >> 1;
    if (x <= mid) update(ls[u], l, mid, x, v);
    else update(rs[u], mid + 1, r, x, v);
    push_up(u);
}
```

---

## 4. 教材化例题与解析

### 例题 1：混合算子维护 (乘法 + 加法)
<details>
<summary>Check Solution</summary>

**题目描述**：维护区间加与区间乘。
**算子复合推导**：
设当前值为 $v$，先进行 $(+a, \times m)$，再进行 $(+a', \times m')$：
$$v' = (v \cdot m + a) \cdot m' + a' = v \cdot (m \cdot m') + (a \cdot m' + a')$$
因此，新标记为：$m_{new} = m \cdot m'$, $a_{new} = a \cdot m' + a'$。

```cpp
void eval(Node &t, LL add, LL mul) {
    t.sum = (t.sum * mul + add * (t.r - t.l + 1)) % p;
    t.mul = t.mul * mul % p;
    t.add = (t.add * mul + add) % p;
}
```
</details>

### 例题 2：区间最大公约数 (GCD)
<details>
<summary>Check Solution</summary>

**题目描述**：维护区间修改与区间 GCD 查询。
**原理**：利用 $\gcd(a, b, c) = \gcd(a, b-a, c-b)$。
将原序列转化为差分序列 $d_i$，则区间 $[l, r]$ 的 GCD 为 $\gcd(a_l, \text{query\_gcd\_d}(l+1, r))$。
区间加操作在差分序列上变为两个单点修改。
</details>

---

## 5. 综合练习

1. **[空间压缩]** 使用动态开点线段树解决值域为 $[1, 10^9]$ 的单点修改、区间求和问题。
2. **[算子优化]** 维护一个序列，支持区间赋值为 $x$，区间加 $y$，区间求和。
3. **[进阶]** **线段树上二分**：寻找区间内第一个大于 $x$ 的位置，要求复杂度 $O(\log N)$。

---

## 📺 深度解析

<div className="bilibili-embed-inner">
  <BilibiliEmbed bvid="BV1pE41197be" />
</div>

_编者注：线段树的精髓在于“将线性序列结构化”。掌握了动态开点与算子复合，你就能处理几乎所有复杂的区间问题。_
