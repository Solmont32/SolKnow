---
title: 线段树 (Segment Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Layers, Zap, ShieldCheck, BoxSelect, Code2 } from 'lucide-react';

# 线段树 (Segment Tree): 区间维护的工业级标准

<KnowledgeCard type="info" title="代数抽象：蒙耐德与算子作用">
从代数结构看，线段树维护的是一个**蒙耐德 (Monoid)** $(M, \oplus)$ 上的元素。
1. **结合律**: $(a \oplus b) \oplus c = a \oplus (b \oplus c)$。
2. **单位元**: 存在 $e$ 使得 $a \oplus e = a$。
对于区间修改，引入**算子作用 (Operator Action)** $F$：
- **复合性**: $f_1 \circ (f_2 \circ a) = (f_1 \circ f_2) \circ a$。
- **分配律**: $f \circ (a \oplus b) = (f \circ a) \oplus (f \circ b)$。
满足上述性质的任何区间问题均可用线段树在 $O(\log N)$ 内解决。
</KnowledgeCard>

---

## 1. 核心原理与时空复杂度

### 1.1 节点构造与空间定律
线段树将区间 $[1, N]$ 递归划分为 $2N-1$ 个节点。在数组实现中，索引 $u$ 的左儿子为 $2u$，右儿子为 $2u+1$。
**定理 (4N 规则)**：为了防止索引越界，必须开辟 $4N$ 大小的数组空间。
**证明**：深为 $H$ 的二叉树节点编号最大为 $2^H-1$。对于 $N$ 个叶子，$H = \lceil \log_2 N \rceil + 1$。最坏情况下 $N = 2^k + 1$，此时 $H = k+2$，最大索引接近 $2^{k+2} = 4 \cdot 2^k \approx 4N$。

### 1.2 懒标记 (Lazy Propagation)
为了支持 $O(\log N)$ 的区间修改，线段树引入“延时更新”思想。
- **标记下传 (`push_down`)**: 仅在需要访问子节点时，才将挂在父节点上的修改算子应用到子节点。

---

## 2. 进阶结构：线段树合并与分裂

### 2.1 线段树合并 (Segment Tree Merging)
当处理树上路径问题或子树信息聚合时，常需要合并两棵**动态开点**线段树。
```cpp
int merge(int u, int v, int l, int r) {
    if (!u || !v) return u | v;
    int x = ++idx;
    if (l == r) {
        tr[x].val = tr[u].val + tr[v].val; // 合并叶子
        return x;
    }
    int mid = (l + r) >> 1;
    ls[x] = merge(ls[u], ls[v], l, mid);
    rs[x] = merge(rs[u], rs[v], mid + 1, r);
    push_up(x);
    return x;
}
```
**复杂度**：若初始有 $N$ 个单点节点，总合并复杂度为 $O(N \log N)$。

### 2.2 李超线段树 (Li Chao Tree)
用于维护区间内若干个线性函数（线段）的最值。
- **核心**：每个节点维护在该区间中点处取值最大的线段，通过标记永久化实现。

---

## 3. 教材化例题与解析

### 例题 1：线段树上二分 (寻找阈值)
<details>
<summary>Check Solution</summary>

**题目描述**：支持单点修改，查询区间内第一个 $\ge k$ 的位置。
**解析**：利用线段树维护区间最大值。若 `tr[u&lt;&lt;1].max >= k` 则向左递归，否则向右。

```cpp
int find(int u, int l, int r, int qL, int qR, int k) {
    if (tr[u].max < k) return -1;
    if (l == r) return l;
    int mid = (l + r) >> 1;
    int res = -1;
    if (qL <= mid) res = find(u << 1, l, mid, qL, qR, k);
    if (res == -1 && qR > mid) res = find(u << 1 | 1, mid + 1, r, qL, qR, k);
    return res;
}
```
</details>

### 例题 2：区间乘法与加法 (维护多重标记)
<details>
<summary>Check Solution (C++ Implementation)</summary>

**题目描述**：支持区间 $[l, r]$ 加 $v$，区间 $[l, r]$ 乘 $v$，查询区间 $[l, r]$ 的和（模 $P$）。
**解析**：需要维护两个标记：`add` 和 `mul`。
- **优先级**: 规定先乘后加。即 $val = val \times mul + add$。
- **下传规则**:
  - $mul_{son} = mul_{son} \times mul_{parent}$
  - $add_{son} = add_{son} \times mul_{parent} + add_{parent}$

```cpp
void eval(int u, int l, int r, int m, int a) {
    tr[u].sum = (1LL * tr[u].sum * m + 1LL * a * (r - l + 1)) % P;
    tr[u].mul = 1LL * tr[u].mul * m % P;
    tr[u].add = (1LL * tr[u].add * m + a) % P;
}

void pushdown(int u, int l, int r) {
    int mid = (l + r) >> 1;
    eval(u << 1, l, mid, tr[u].mul, tr[u].add);
    eval(u << 1 | 1, mid + 1, r, tr[u].mul, tr[u].add);
    tr[u].mul = 1; tr[u].add = 0;
}
```
</details>

---

## 4. 综合练习

1. **[动态开点]** 在 $[1, 10^9]$ 的范围内实现单点修改、区间求和。
2. **[标记永久化]** 实现一个不支持 `push_down` 的区间加、区间求和线段树（提示：利用贡献法）。
3. **[进阶]** **线段树分裂**：将一棵维护 $[1, N]$ 的线段树按权值 $k$ 分裂为两棵。

---

_编者注：线段树是区间问题的“万金油”。深刻理解其分治思想与代数背景，是通往高级算法竞赛的必经之路。_
