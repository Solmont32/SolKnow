---
title: STL 进阶应用 (Advanced STL)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Box, Layers, Zap, Search, Settings } from 'lucide-react';

# STL 进阶应用: 工业级容器与黑科技

<KnowledgeCard type="info" title="核心价值">
标准模板库 (STL) 不仅提供了基础容器，还隐藏了许多为高性能计算和算法竞赛设计的“黑科技”。掌握这些高级应用，可以在保证代码简洁的同时，获得接近手写数据结构的性能。
</KnowledgeCard>

---

## 1. 基础容器的深度挖掘

### 1.1 `std::priority_queue` 的自定义

除了基础的大根堆，通过自定义比较器可以实现复杂的优先规则。

```cpp
struct Node {
    int id, dist;
    bool operator>(const Node& b) const { return dist > b.dist; }
};
// 建立小根堆
priority_queue<Node, vector<Node>, greater<Node>> pq;
```

### 1.2 `std::bitset` 的位运算加速

`bitset` 能够将 $O(N)$ 的集合操作（交、并、差）优化为 $O(N/w)$，其中 $w$ 为机器字长（通常为 64）。

- **应用场景**：状态压缩、图的连通性判定、背包问题优化。

---

## 2. pb_ds 库：扩展数据结构的宝库

`pb_ds` (Policy-Based Data Structures) 是 GCC 内置的一个高性能插件库，支持平衡树、哈希表、堆等。

### 2.1 高性能哈希表

相比 `std::unordered_map`，`gp_hash_table` 在处理随机数据时速度快 3-5 倍。

```cpp
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/hash_policy.hpp>
using namespace __gnu_pbds;

gp_hash_table<int, int> table;
```

### 2.2 真正的“平衡树”：`tree`

支持 $O(\log N)$ 的 `find_by_order` (找第 $k$ 大) 和 `order_of_key` (找排名)。

```cpp
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
typedef tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> ordered_set;

ordered_set s;
s.insert(10);
auto it = s.find_by_order(0); // 返回第 0 小的迭代器
int rank = s.order_of_key(10); // 返回 10 的排名
```

---

## 3. 性能优化与空间压缩

### 3.1 `std::vector` 的内存管理

- `reserve(n)`：预分配空间，避免频繁重新分配导致的 $O(N)$ 拷贝。
- `shrink_to_fit()`：释放未使用的预分配内存（C++11）。

### 3.2 自定义分配器 (Custom Allocator)

在处理数百万个小对象时，默认的 `new/delete` 性能较差。使用静态数组模拟内存池是算法竞赛中的主流策略。

---

## 4. 经典例题

### 例题 1：位运算优化 0/1 背包

<details>
<summary>Check Solution</summary>

**题目描述**：给定 $N$ 个物品，体积为 $w_i$，求是否能凑出总体积 $V$。
**解析**：使用 `bitset<MAXV> f`，其中 `f[i]` 表示体积 $i$ 是否可行。
**状态转移**：`f |= (f << w[i])`。

```cpp
bitset<10001> f;
f[0] = 1;
for (int i = 0; i < n; i++)
    f |= (f << w[i]);
if (f[V]) puts("Yes");
```

</details>

---

## 5. 综合练习

1. **[pb_ds]** 使用 `gp_hash_table` 解决大值域下的动态前缀和问题。
2. **[bitset]** 使用 `bitset` 统计一个无向图中每个点能到达的节点数量。
3. **[进阶]** 比较 `std::map`, `std::unordered_map` 与 `pb_ds` 哈希表在极端数据下的表现。

---

_编者注：STL 是双刃剑。虽然黑科技好用，但必须理解其背后的复杂度原理（如 unordered_map 的哈希碰撞风险），才能在关键时刻做出正确选择。_
