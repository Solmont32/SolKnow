---
title: 区间 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Merge, Scaling } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 区间动态规划 (Interval Dynamic Programming)

区间 DP 是一类以**区间长度**为阶段演进的动态规划。其核心思想是由短区间的解逐步推导长区间的解，通常用于处理具有“合并”或“拆分”特性的问题，如石子合并、括号匹配等。

---

<KnowledgeCard type="info" title="区间合并的归纳基础">
    对于闭区间 $[i, j]$，其最优解通常由两个（或多个）子区间的解合并而成。
    <br/>
    **计算序控制**：由于长度为 $L$ 的区间依赖于长度 $l < L$ 的区间，因此必须**外层枚举区间长度 $len$**，内层枚举起始点 $i$。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 形式化建模：状态空间与转移

### 1.1 状态定义 (State)

$f[i][j]$ 表示闭区间 $[i, j]$ 内的最优解。

### 1.2 状态转移方程 (Transition)

通常涉及枚举“最后一步合并”的位置 $k$：
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + \text{cost}(i, k, j) \}$$

### 1.3 最优子结构证明 (以石子合并为例)

设合并区间 $[i, j]$ 的最后一步是将 $[i, k]$ 与 $[k+1, j]$ 两堆石子合并。若 $[i, k]$ 的合并方式不是最优的，则存在一种更优方式使得 $[i, k]$ 代价更小，从而导致总代价 $[i, j]$ 更小。这与 $[i, j]$ 是最优解矛盾。

---

## <Layers className="inline-block mr-2" /> 2. 环形区间处理技巧

当问题涉及环形结构（如环形石子合并）时，直接在原序列上 DP 会遗漏跨越端点的合并方案。

**工业级解决方案**：

1. **序列倍长**：将长度为 $n$ 的序列 $A$ 复制一份接在末尾，形成长度为 $2n$ 的序列 $A'$。
2. **区间 DP**：对 $A'$ 进行普通的区间 DP。
3. **最终答案**：$\min_{1 \le i \le n} \{ f[i][i+n-1] \}$。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 综合练习与强化

### 练习 1：石子合并 (经典)

$n$ 堆石子排成一排，每次只能合并相邻两堆，代价为重量和。求最小总代价。

<details>
<summary>Check Solution (O(N^3))</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstring>

using namespace std;

int f[305][305], s[305], a[305];

int main() {
    int n; cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        s[i] = s[i-1] + a[i];
    }

    memset(f, 0x3f, sizeof f);
    for (int i = 1; i <= n; i++) f[i][i] = 0;

    for (int len = 2; len <= n; len++) {
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            for (int k = i; k < j; k++) {
                f[i][j] = min(f[i][j], f[i][k] + f[k + 1][j] + s[j] - s[i - 1]);
            }
        }
    }
    cout << f[1][n] << endl;
    return 0;
}
```

</details>

### 练习 2：括号添加 (Bracket Sequence)

给定一个括号序列，求最少需要添加多少个括号使其变为合法序列。

<details>
<summary>Check Solution</summary>

**转移逻辑**：

1. 若 `s[i]` 与 `s[j]` 匹配（如 `()` 或 `[]`）：$f[i][j] = f[i+1][j-1]$。
2. 无论是否匹配，均可枚举分割点：$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] \}$。

</details>

### 练习 3：能量项链 (环形区间 DP)

珠子合并产生 $m \times r \times n$ 能量，求最大总能量。

<details>
<summary>Check Solution</summary>

```cpp
// a[i] 为珠子标记，i 号珠子特征为 (a[i], a[i+1])
// 复制序列 a 为 2n 长度
for (int len = 2; len <= n; len++) {
    for (int i = 1; i + len - 1 <= 2 * n; i++) {
        int j = i + len - 1;
        for (int k = i; k < j; k++) {
            f[i][j] = max(f[i][j], f[i][k] + f[k+1][j] + a[i] * a[k+1] * a[j+1]);
        }
    }
}
```

</details>

---

## 延伸挑战

- [洛谷 P1880 石子合并](https://www.luogu.com.cn/problem/P1880)（环形 + 最小/最大代价）
- [洛谷 P1063 能量项链](https://www.luogu.com.cn/problem/P1063)
- [洛谷 P3205 [HNOI2010] 合唱队](https://www.luogu.com.cn/problem/P3205)（区间 DP 结合左右端点状态）
