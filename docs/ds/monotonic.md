# 单调结构 (Monotonic Structure)

单调结构指元素始终保持单调递增或单调递减性质的容器（栈或队列）。

## 单调栈 (Monotonic Stack)

### 原理

单调栈在元素入栈时，若新元素不满足单调性，则持续弹出栈顶元素，直到满足单调性为止。

### 应用场景

**寻找左侧/右侧第一个比当前元素大/小的数。**

- $O(n)$ 时间复杂度。
- 经典题目：[84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/)

### 代码模板 (C++)

```cpp
stack<int> st;
for (int i = 0; i < n; i++) {
    while (!st.empty() && nums[st.top()] < nums[i]) {
        st.pop(); // 维护单调递减
    }
    // ... 处理逻辑
    st.push(i);
}
```

## 单调队列 (Monotonic Queue)

### 原理

通常使用双端队列（`std::deque`）实现。在维护单调性的基础上，由于队列可以从两端弹出，因此可以排除“已不在有效范围内”的过期元素。

### 应用场景

**滑动窗口内的最值问题。**

- $O(n)$ 时间复杂度。
- 经典题目：[239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)

### 代码模板 (C++)

```cpp
deque<int> dq;
for (int i = 0; i < n; i++) {
    // 1. 维护范围：弹出窗口外的索引
    if (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();

    // 2. 维护单调性：弹出比当前元素小的旧元素
    while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();

    // 3. 入队
    dq.push_back(i);

    // 4. 获取最值 (dq.front())
}
```
