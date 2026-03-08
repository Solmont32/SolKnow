---
title: 线性 DP
---

# 线性 DP (Linear Dynamic Programming)

线性 DP 的典型特征是：状态按下标顺序推进，当前状态只依赖“更靠前”的有限状态。它常见于序列、字符串与前缀问题。

## 一、建模模板

设序列为 $a_1,a_2,\dots,a_n$，常见定义：
- `dp[i]`：处理到第 `i` 个位置时的最优值（长度/方案数/代价）。
- 转移：从若干 `j < i` 的历史状态转移到 `i`。
- 初值：根据“空前缀”或“单元素”定义。

通用写法：

```text
for i in [1..n]:
    dp[i] = 初值
    for j in [1..i-1]:
        if can_transfer(j, i):
            dp[i] = best(dp[i], dp[j] + contribution)
```

## 二、经典模型 1：最长上升子序列（LIS）

### 1. $O(n^2)$ 基础版

定义 `f[i]` 为“以 `a[i]` 结尾的 LIS 长度”：

$$
f[i] = 1 + \max\{f[j] \mid j<i,\ a[j]<a[i]\}
$$

答案为 `max(f[i])`。

```cpp
int lis_n2(const vector<int>& a) {
    int n = (int)a.size();
    vector<int> f(n, 1);
    int ans = 0;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < i; ++j) {
            if (a[j] < a[i]) f[i] = max(f[i], f[j] + 1);
        }
        ans = max(ans, f[i]);
    }
    return ans;
}
```

### 2. $O(n\log n)$ 优化版（竞赛高频）

维护 `d[len]`：长度为 `len` 的上升子序列的最小可能结尾。`d` 单调递增，可二分更新。

```cpp
int lis_nlogn(const vector<int>& a) {
    vector<int> d;
    for (int x : a) {
        auto it = lower_bound(d.begin(), d.end(), x);
        if (it == d.end()) d.push_back(x);
        else *it = x;
    }
    return (int)d.size();
}
```

### 例题 1

序列 `3 1 2 1 8 5 6` 的 LIS 长度为多少？

解：可取 `1,2,5,6`，长度 4。

## 三、经典模型 2：最长公共子序列（LCS）

设字符串 `A` 长度为 `n`，`B` 长度为 `m`。定义 `f[i][j]` 为 `A` 前 `i` 个字符和 `B` 前 `j` 个字符的 LCS 长度。

转移：
- 若 `A[i]==B[j]`，`f[i][j]=f[i-1][j-1]+1`
- 否则 `f[i][j]=max(f[i-1][j], f[i][j-1])`

```cpp
int lcs(const string& A, const string& B) {
    int n = (int)A.size(), m = (int)B.size();
    vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            if (A[i - 1] == B[j - 1]) f[i][j] = f[i - 1][j - 1] + 1;
            else f[i][j] = max(f[i - 1][j], f[i][j - 1]);
        }
    }
    return f[n][m];
}
```

### 例题 2

`A = "abac"`, `B = "cab"`，LCS 长度为 2（如 `ab`）。

## 四、经典模型 3：编辑距离（Levenshtein Distance）

定义 `f[i][j]`：`A` 前 `i` 个字符转成 `B` 前 `j` 个字符的最小操作数（插入、删除、替换）。

转移：
- 删除：`f[i-1][j] + 1`
- 插入：`f[i][j-1] + 1`
- 替换/匹配：`f[i-1][j-1] + (A[i]!=B[j])`

```cpp
int edit_distance(const string& A, const string& B) {
    int n = (int)A.size(), m = (int)B.size();
    vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
    for (int i = 0; i <= n; ++i) f[i][0] = i;
    for (int j = 0; j <= m; ++j) f[0][j] = j;

    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            int cost = (A[i - 1] == B[j - 1]) ? 0 : 1;
            f[i][j] = min({
                f[i - 1][j] + 1,
                f[i][j - 1] + 1,
                f[i - 1][j - 1] + cost
            });
        }
    }
    return f[n][m];
}
```

### 例题 3

`kitten -> sitting` 的编辑距离为 3。

## 五、线性 DP 易错点

1. 状态定义不闭合：`dp[i]` 的语义必须唯一、可由更小下标状态表达。
2. 边界初始化错误：尤其是二维 DP 的第 0 行、第 0 列。
3. 转移顺序错误：一维压缩时要先判断是正序还是倒序。
4. 把“不可达状态”初始化为 0：在最小化/最大化问题中会污染答案。

## 六、配套练习（答案折叠）

系统训练见：[`算法竞赛练习：线性 DP 专题`](/exercises/cs/algorithm-linear-dp)

### 练习 1（基础）

序列 `5 1 6 2 3 4` 的 LIS 长度是多少？

<details>

<summary>点击查看过程与答案</summary>

可取上升子序列 `1,2,3,4`，长度 4。

**答案**：4。

</details>

### 练习 2（提高）

为什么 LCS 的状态 `f[i][j]` 不能只依赖 `f[i-1][j-1]`？

<details>

<summary>点击查看过程与答案</summary>

当 `A[i] != B[j]` 时，最优解可能来自“丢掉 `A[i]`”或“丢掉 `B[j]`”，即 `f[i-1][j]` 与 `f[i][j-1]`。

**答案**：因为不匹配时需要比较两种删字符路径，必须保留左右状态。

</details>

### 练习 3（挑战）

将编辑距离空间优化到一维时，为什么需要额外变量保存左上角旧值？

<details>

<summary>点击查看过程与答案</summary>

`f[i-1][j-1]` 在覆盖前会丢失，而替换转移必须使用它。通常用 `prev` 保存上一轮的左上角值。

**答案**：为保留 `f[i-1][j-1]`，否则替换转移会读取被覆盖后的错误值。

</details>

