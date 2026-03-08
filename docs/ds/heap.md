# 堆与优先队列 (Heap)

堆（Heap）是一种特殊的完全二叉树。

## 二叉堆 (Binary Heap)

二叉堆是最常用的堆实现，分为**大根堆**（根节点最大）和**小根堆**（根节点最小）。

### 性质

- **结构性**：是一棵完全二叉树。
- **有序性**：对于堆中任意节点 $x$，其父节点的值（在小根堆中）总是小于或等于 $x$ 的值。

### 核心操作

1. **Push (插入)**：将元素放到树末尾，执行 `up` 操作。
2. **Pop (取出堆顶)**：将堆顶元素与末尾元素互换，删除末尾元素，执行 `down` 操作。
3. **Up/Down (调整)**：通过递归或迭代维持堆的性质。

### C++ STL

在 `algorithm` 头文件中提供了 `make_heap`, `push_heap`, `pop_heap` 等函数，通常直接使用 `<queue>` 中的 `std::priority_queue`。

```cpp
#include <queue>

// 默认大根堆
std::priority_queue<int> max_heap;

// 小根堆
std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;
```

## 应用场景

1. **优先队列**：任务调度、事件驱动模拟。
2. **堆排序 (Heap Sort)**：$O(n \log n)$ 且不需要额外空间。
3. **Top-K 问题**：动态维护前 K 大/小的数。
4. **Dijkstra 算法优化**：加速最短路径搜索。
