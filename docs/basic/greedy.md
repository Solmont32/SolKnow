---
title: 贪心算法 (Greedy)
---

# 贪心算法 (Greedy)

贪心算法（Greedy Algorithm）是指在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，算法得到的是在某种意义上的局部最优解。

## 核心步骤
1. **建立数学模型**：描述问题。
2. **设定贪心策略**：确定每一个阶段的局部最优选择。
3. **证明正确性**：这是贪心算法最难的部分（通常使用反证法或归纳法）。

## 经典例题：区间选点问题
**题目描述**：给定 $N$ 个闭区间 $[a_i, b_i]$，在数轴上选择尽量少的点，使得每个区间内至少包含一个选出的点。

**贪心策略**：
1. 将所有区间按右端点从小到大排序。
2. 从前往后枚举每个区间：
   - 如果当前区间中还没有点，则选择该区间的右端点。

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 100010;

struct Range {
    int l, r;
    bool operator< (const Range &W)const {
        return r < W.r;
    }
} range[N];

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i ++ ) scanf("%d%d", &range[i].l, &range[i].r);

    sort(range, range + n);

    int res = 0, ed = -2e9;
    for (int i = 0; i < n; i ++ )
        if (range[i].l > ed) {
            res ++ ;
            ed = range[i].r;
        }

    printf("%d\n", res);
    return 0;
}
```
