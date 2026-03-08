---
title: 双指针 (Two Pointers)
---

# 双指针 (Two Pointers)

双指针是一种非常实用的技巧，通常能将 $O(n^2)$ 的暴力算法优化到 $O(n)$。

## 常见类型

1. **快慢指针**：例如判断链表是否有环。
2. **对撞指针**：例如二分查找或反转字符串。
3. **滑动窗口**：维护一段满足性质的区间。

## 核心模板

```cpp
for (int i = 0, j = 0; i < n; i ++ ) {
    while (j < i && check(i, j)) j ++ ;

    // 具体问题的逻辑
}
```

## 经典应用：最长连续不重复子序列

**题目描述**：给定一个长度为 $n$ 的整数序列，请找出最长的不包含重复数字的连续子序列，输出其长度。

**解题思路**：

1. 枚举右指针 `i`。
2. 只要 `[j, i]` 区间内有重复数字，就让左指针 `j` 右移。
3. 使用哈希数组或 `map` 记录每个数字出现的次数。

```cpp
#include <iostream>

using namespace std;

const int N = 100010;
int a[N], s[N];

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i ++ ) scanf("%d", &a[i]);

    int res = 0;
    for (int i = 0, j = 0; i < n; i ++ ) {
        s[a[i]] ++ ;
        while (s[a[i]] > 1) {
            s[a[j]] -- ;
            j ++ ;
        }
        res = max(res, i - j + 1);
    }

    printf("%d\n", res);
    return 0;
}
```
