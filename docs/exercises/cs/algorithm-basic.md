---
title: 基础算法专项强化练习
sidebar_label: 基础算法与线性结构
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Layers } from 'lucide-react';

# 基础算法与线性结构专项强化

> **“算法竞赛的天花板，往往由基础算法的熟练度决定。”** —— 本专题对标《算法竞赛进阶指南》与 CLRS 教材深度，通过阶梯式训练实现从“懂算法”到“秒出代码”的跨越。

---
## 🪜 练习阶梯与评价标准

| 等级                                                                     | 难度目标     | 核心考察点                         | 期望达成                 |
| :----------------------------------------------------------------------- | :----------- | :--------------------------------- | :----------------------- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 模板即时复现 | 边界处理、离散化、1D 前缀和        | 10分钟内 AC 且无编译错误 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 灵活建模应用 | 单调性转换、2D 差分、复杂二分答案  | 能够独立推导出核心逻辑   |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span>  | 算法融合创新 | 扫描线、带权并查集、复杂单调栈应用 | 具备省赛前列/全国赛水平  |

---

## 🎯 考点覆盖模型 (Knowledge Matrix)

| 知识模块         | 核心考点                             | 关联习题   | 典型技巧                 |
| :--------------- | :----------------------------------- | :--------- | :----------------------- |
| **基础算法**     | 二分查找边界、浮点数二分、离散化     | 练习 1     | 整数二分模板、去重函数   |
| **前缀和与差分** | 1D/2D 前缀和、2D 差分矩阵修改        | 练习 2     | 容斥原理、$O(1)$ 查询    |
| **双指针算法**   | 滑动窗口、快慢指针、单调序列         | 练习 3     | 桶记录状态、指针不回溯   |
| **贪心与排序**   | 区间合并、Huffman 树、排序不等式     | 练习 4     | 结构体排序、贪心策略证明 |
| **单调栈/队列**  | 窗口最值、最大矩形面积               | 练习 5, 6  | 维护元素单调性           |

---


## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：数的范围（二分搜索边界判定）

**题目描述**：给定一个长度为 $n$ 的按照升序排列的整数数组，以及 $q$ 个查询。对于每个查询，返回一个元素 $k$ 的起始位置和终止位置（下标从 0 开始）。如果数组中不存在该元素，则返回 `-1 -1`。

- **数据范围**：$n \le 10^5, q \le 10^4$。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解题思路**：
二分查找的精髓在于“性质”的划分。

1. **左边界**：寻找第一个 $\ge k$ 的数。性质为 $x \ge k$。
2. **右边界**：寻找最后一个 $\le k$ 的数。性质为 $x \le k$。

**C++ 代码实现**：

```cpp
#include <iostream>
#include <vector>

using namespace std;

void solve() {
    int n, q;
    cin >> n >> q;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    while (q--) {
        int k;
        cin >> k;
        // 二分左边界
        int l = 0, r = n - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if (a[mid] >= k) r = mid;
            else l = mid + 1;
        }

        if (a[l] != k) {
            cout << "-1 -1" << endl;
        } else {
            cout << l << " ";
            // 二分右边界
            l = 0, r = n - 1;
            while (l < r) {
                int mid = l + r + 1 >> 1;
                if (a[mid] <= k) l = mid;
                else r = mid - 1;
            }
            cout << l << endl;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    solve();
    return 0;
}
```

**复杂度分析**：$O(q \log n)$。

</details>

#### 练习 2：子矩阵的和（二维前缀和）

**题目描述**：给定一个 $n \times m$ 的整数矩阵，要求 $q$ 次查询，每次给定 $(x_1, y_1, x_2, y_2)$，求以此为左上角和右下角的子矩阵内所有元素的和。

- **公式提示**：$S[i,j] = S[i-1,j] + S[i,j-1] - S[i-1,j-1] + a[i,j]$。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现**：

```cpp
#include <iostream>
using namespace std;

const int N = 1010;
int a[N][N], s[N][N];

int main() {
    int n, m, q;
    scanf("%d%d%d", &n, &m, &q);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            scanf("%d", &a[i][j]);
            s[i][j] = s[i-1][j] + s[i][j-1] - s[i-1][j-1] + a[i][j];
        }

    while (q--) {
        int x1, y1, x2, y2;
        scanf("%d%d%d%d", &x1, &y1, &x2, &y2);
        printf("%d\n", s[x2][y2] - s[x1-1][y2] - s[x2][y1-1] + s[x1-1][y1-1]);
    }
    return 0;
}
```

</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 3：最长连续不重复子序列（双指针）

**题目描述**：给定一个长度为 $n$ 的整数序列，请找出最长的不包含重复数字的连续区间。输出最大长度。

- **技巧**：使用哈希或数组记录桶状态，左指针收缩时更新桶。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解题思路**：
经典双指针。`j` 指针向右枚举，`i` 指针在发现重复时向右收缩直到不重复。
**C++ 代码实现**：

```cpp
#include <iostream>
#include <vector>

using namespace std;

const int N = 100010;
int a[N], S[N]; // S 记录每个数字出现的次数

int main() {
    int n;
    cin >> n;
    int res = 0;
    for (int j = 0, i = 0; j < n; j++) {
        cin >> a[j];
        S[a[j]]++;
        while (S[a[j]] > 1) {
            S[a[i]]--;
            i++;
        }
        res = max(res, j - i + 1);
    }
    cout << res << endl;
    return 0;
}
```

</details>

#### 练习 4：区间合并（排序 + 贪心）

**题目描述**：给定 $n$ 个区间 $[l_i, r_i]$，要求合并所有有交集的区间。

- **考察点**：按左端点排序的贪心策略。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现**：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

typedef pair<int, int> PII;

void merge(vector<PII> &segs) {
    vector<PII> res;
    sort(segs.begin(), segs.end());
    int st = -2e9, ed = -2e9;
    for (auto seg : segs) {
        if (ed < seg.first) {
            if (st != -2e9) res.push_back({st, ed});
            st = seg.first, ed = seg.second;
        } else ed = max(ed, seg.second);
    }
    if (st != -2e9) res.push_back({st, ed});
    segs = res;
}

int main() {
    int n;
    cin >> n;
    vector<PII> segs;
    for (int i = 0; i < n; i++) {
        int l, r;
        cin >> l >> r;
        segs.push_back({l, r});
    }
    merge(segs);
    cout << segs.size() << endl;
    return 0;
}
```

</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 5：单调栈 - 直方图中的最大矩形

**题目描述**：给定 $n$ 个非负整数，表示直方图的各个柱子的高度，每个柱子彼此相邻，且宽度为 1。求直方图中能够勾勒出的矩形的最大面积。

- **核心思想**：对于每个高度 $h$，寻找左侧和右侧第一个比它矮的柱子，确定该高度能延伸的最大宽度。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现 (单调栈最优解)**：

```cpp
#include <iostream>
#include <stack>
#include <vector>

using namespace std;

typedef long long LL;

void solve() {
    int n;
    while (cin >> n && n) {
        vector<int> h(n + 2, 0);
        for (int i = 1; i <= n; i++) cin >> h[i];

        stack<int> stk;
        stk.push(0);
        LL res = 0;
        for (int i = 1; i <= n + 1; i++) {
            while (h[stk.top()] > h[i]) {
                int height = h[stk.top()];
                stk.pop();
                int width = i - stk.top() - 1;
                res = max(res, (LL)height * width);
            }
            stk.push(i);
        }
        cout << res << endl;
    }
}

int main() {
    solve();
    return 0;
}
```

</details>

#### 练习 6：二维单调队列 - 理想正方形

**题目描述**：在 $a \times b$ 的矩阵中找出 $n \times n$ 的子矩阵，使得其最大值减去最小值的差最小。

- **限制**：$a, b \le 1000, n \le \min(a,b)$。
- **思路**：两遍单调队列。第一遍处理每行，求出每个长度为 $n$ 的行区间的最值；第二遍对结果处理每列，求出 $n \times n$ 区域的最值。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**C++ 代码实现**：

```cpp
#include <iostream>
#include <deque>

using namespace std;

const int N = 1010;
int mat[N][N];
int row_max[N][N], row_min[N][N];
int n, m, k;

void get_max(int a[], int b[], int len, int k) {
    deque<int> q;
    for (int i = 1; i <= len; i++) {
        if (q.size() && q.front() <= i - k) q.pop_front();
        while (q.size() && a[q.back()] <= a[i]) q.pop_back();
        q.push_back(i);
        if (i >= k) b[i] = a[q.front()];
    }
}

void get_min(int a[], int b[], int len, int k) {
    deque<int> q;
    for (int i = 1; i <= len; i++) {
        if (q.size() && q.front() <= i - k) q.pop_front();
        while (q.size() && a[q.back()] >= a[i]) q.pop_back();
        q.push_back(i);
        if (i >= k) b[i] = a[q.front()];
    }
}

int main() {
    scanf("%d%d%d", &n, &m, &k);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) scanf("%d", &mat[i][j]);

    for (int i = 1; i <= n; i++) {
        get_max(mat[i], row_max[i], m, k);
        get_min(mat[i], row_min[i], m, k);
    }

    int res = 2e9;
    int a[N], b[N], c[N];
    for (int j = k; j <= m; j++) {
        for (int i = 1; i <= n; i++) a[i] = row_max[i][j];
        get_max(a, b, n, k);
        for (int i = 1; i <= n; i++) a[i] = row_min[i][j];
        get_min(a, c, n, k);
        for (int i = k; i <= n; i++) res = min(res, b[i] - c[i]);
    }
    printf("%d\n", res);
    return 0;
}
```

</details>

---

## 🏆 训练建议

1. **追求 Zero-Error**：在 Level A 题目中，目标是在不查阅资料的情况下一次性写出正确代码。
2. **注重数学证明**：双指针的正确性、差分的操作原理、单调性的维护，理解了证明才能在变题中游刃有余。
3. **复杂度意识**：养成先看数据范围再写代码的习惯。$10^5$ 的范围通常暗示 $O(n \log n)$。
