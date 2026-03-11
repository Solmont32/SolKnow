---
title: 线段树 (Segment Tree)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Layers, Zap, ShieldCheck, BoxSelect, Code2, Sigma, Binary } from 'lucide-react';

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

### 1.2 接口形式化定义
- `query(l, r)`: $\bigoplus_{i=l}^r a_i \in M$。
- `update(l, r, f)`: $\forall i \in [l, r], a_i \leftarrow f(a_i), f \in F$。

---

## 2. 时空复杂度分摊分析

### 2.1 空间复杂度：4N 定律
**定理**：在数组存储实现中，必须开辟 $4N$ 的空间以避免索引越界。
**证明**：
线段树是一棵高度为 $H = \lceil \log_2 N \rceil + 1$ 的二叉树。在数组索引中，索引最大值出现在最后一层。
若 $N = 2^k + 1$，则 $H = k+2$。最后一层起始索引为 $2^{k+1}$，终止索引为 $2^{k+2}-1$。
由于 $2^{k+2} = 4 \cdot 2^k < 4N$，故 $4N$ 是安全的上界。

### 2.2 时间复杂度：$O(\log N)$ 剪枝证明
**引理**：任何区间查询最多访问 $4 \log N$ 个节点。
**证明**：在每一层递归中，只有与查询区间边界重合的节点会继续向下分裂。每一层最多只有 2 个这样的“边界节点”，故总访问节点数为 $O(H) = O(\log N)$。

---

## 3. 数据完整性证明：懒标记正确性

**命题**：带懒标记的 `push_down` 操作保持线段树的不变量 $\mathcal{T}(u) = \mathcal{T}(ls) \oplus \mathcal{T}(rs)$。

**证明**：
1. **延迟性质**：设节点 $u$ 挂有标记 $f$。此时 $u$ 的真实值应为 $f(\mathcal{T}(u))$，但子节点 $ls, rs$ 的值尚未更新。
2. **传播一致性**：执行 `push_down(u)` 时：
   - 更新子节点：$\mathcal{T}(ls) \leftarrow f(\mathcal{T}(ls)), \mathcal{T}(rs) \leftarrow f(\mathcal{T}(rs))$。
   - 传递标记：$tag_{ls} \leftarrow f \circ tag_{ls}, tag_{rs} \leftarrow f \circ tag_{rs}$。
3. **结合律保证**：由算子分配律 $f(a \oplus b) = f(a) \oplus f(b)$，更新后的子节点满足：
   $\mathcal{T}(ls)_{new} \oplus \mathcal{T}(rs)_{new} = f(\mathcal{T}(ls)) \oplus f(\mathcal{T}(rs)) = f(\mathcal{T}(ls) \oplus \mathcal{T}(rs)) = f(\mathcal{T}(u)) = \mathcal{T}(u)_{new}$。
证毕。

---

## 4. 教材化例题与解析

### 例题 1：线段树上二分 (寻找阈值)
<details>
<summary>Check Solution</summary>

**题目描述**：支持单点修改，查询区间内第一个 $\ge k$ 的位置。
**复杂度分析**：单次查询 $O(\log N)$。

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

### 例题 2：区间乘法与加法 (多重标记)
<details>
<summary>Check Solution (C++ Implementation)</summary>

**代数背景**：维护算子复合 $(f_1 \circ f_2)(x) = m_1(m_2 x + a_2) + a_1 = (m_1 m_2)x + (m_1 a_2 + a_1)$。

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

## 5. 综合练习与解答

1. **[动态开点]** 在 $[1, 10^9]$ 的范围内实现单点修改、区间求和。
<details>
<summary>Check Solution</summary>

```cpp
struct Node {
    int l, r;
    long long sum;
} tr[N * 40]; // 空间复杂度 O(M log N)
int root, idx;

void update(int &u, long long l, long long r, int x, int v) {
    if (!u) u = ++idx;
    tr[u].sum += v;
    if (l == r) return;
    long long mid = l + r >> 1;
    if (x <= mid) update(tr[u].l, l, mid, x, v);
    else update(tr[u].r, mid + 1, r, x, v);
}
```
</details>

2. **[标记永久化]** 实现一个不支持 `push_down` 的区间加、区间求和线段树。
<details>
<summary>Check Solution</summary>

**核心思想**：贡献法。每个节点的 `add` 标记表示对该子树所有元素的共同增量。
```cpp
long long tag[N * 4], sum[N * 4];

void update(int u, int l, int r, int qL, int qR, int v) {
    sum[u] += 1LL * (min(r, qR) - max(l, qL) + 1) * v;
    if (l >= qL && r <= qR) {
        tag[u] += v;
        return;
    }
    int mid = l + r >> 1;
    if (qL <= mid) update(u << 1, l, mid, qL, qR, v);
    if (qR > mid) update(u << 1 | 1, mid + 1, r, qL, qR, v);
}

long long query(int u, int l, int r, int qL, int qR, long long add) {
    if (l >= qL && r <= qR) return sum[u] + add * (r - l + 1);
    int mid = l + r >> 1;
    long long res = 0;
    add += tag[u];
    if (qL <= mid) res += query(u << 1, l, mid, qL, qR, add);
    if (qR > mid) res += query(u << 1 | 1, mid + 1, r, qL, qR, add);
    return res;
}
```
</details>

3. **[进阶]** **线段树分裂**：将一棵维护 $[1, N]$ 的权值线段树按权值 $k$ 分裂为两棵。
<details>
<summary>Check Solution</summary>

```cpp
void split(int &u, int &v, int l, int r, int k) {
    if (!u) return;
    v = ++idx;
    int mid = l + r >> 1;
    if (k > mid) split(tr[u].rs, tr[v].rs, mid + 1, r, k);
    else {
        swap(tr[u].rs, tr[v].rs);
        split(tr[u].ls, tr[v].ls, l, mid, k);
    }
    push_up(u); push_up(v);
}
```
</details>

---

_编者注：线段树的代数本质在于将区间的离散积分分解为对数级的基本单元叠加。掌握其标记传播的数学一致性，是解决所有复杂区间问题的金钥匙。_
