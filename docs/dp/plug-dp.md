---
title: 插头 DP
---

import { Microscope, Layers, Activity, ShieldCheck, Zap, Binary, Grid, Move, Maximize } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 插头动态规划 (Plug Dynamic Programming)

插头 DP（又称轮廓线 DP）是状压 DP 的一种高级形态，专门用于解决棋盘或网格图上的连通性问题（如路径计数、哈密顿回路、连通块覆盖等）。其核心在于维护一条跨越网格的**轮廓线**，并记录穿过该线的连通状态。

---

<KnowledgeCard type="info" title="轮廓线与插头">
    - **轮廓线 (Contour Line)**：分割已决策区域与未决策区域的一条线。
    - **插头 (Plug)**：在轮廓线上，一个格子向相邻格子发出的“连通意向”。通常有：无插头、左插头、上插头。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 状态表示：括号序列与最小表示法

由于连通性具有“两两配对且不相交”的拓扑性质，状态表示是插头 DP 的精髓。

### 1.1 括号序列表示法 (Bracket Notation)
适用于路径配对问题。
- `0`：无插头。
- `1`：左括号插头（连通分量的左端点）。
- `2`：右括号插头（连通分量的右端点）。
- **性质**：轮廓线上的插头构成一个合法的括号匹配序列。

### 1.2 最小表示法 (Minimal Representation)
适用于一般的连通块问题。
将属于同一连通块的插头标记为相同的整数编号（如 `(1, 1, 2, 2, 0)`），并确保编号是按出现顺序标准化后的结果。

---

## <Layers className="inline-block mr-2" /> 2. 状态转移：基于格子的决策

插头 DP 逐格推进（Row by row, Column by column）。对于当前格子 $(i, j)$，我们关注其左侧插头 $L$ 和上方插头 $U$。

### 2.1 典型分类讨论 (以哈密顿回路为例)
- **$L=0, U=0$**：必须新建一个连通分量，产生两个新插头（左括号和右括号）。
- **$L>0, U=0$ 或 $L=0, U>0$**：延续当前插头，可以选择向下或向右。
- **$L=1, U=1$**：两个左括号相遇，合并两个连通分量，并将对应的右括号改为左括号。
- **$L=2, U=2$**：两个右括号相遇，合并并将对应的左括号改为右括号。
- **$L=2, U=1$**：左、右括号相遇，直接闭合。
- **$L=1, U=2$**：匹配的左、右括号相遇，若为哈密顿回路且为最后一个格子，则形成合法解。

---

## <Binary className="inline-block mr-2" /> 3. 高效实现：哈希表与位运算

由于合法状态数远少于 $3^{M+1}$，必须使用哈希表存储状态。

```cpp
struct HashMap {
    int head[SIZE], next[STATE_MAX], total;
    ll state[STATE_MAX], val[STATE_MAX];
    void insert(ll s, ll v) {
        int h = s % SIZE;
        for (int i = head[h]; i; i = next[i])
            if (state[i] == s) { val[i] += v; return; }
        state[++total] = s; val[total] = v;
        next[total] = head[h]; head[h] = total;
    }
};
```

---

## <ShieldCheck className="inline-block mr-2" /> 4. 综合练习：骨牌铺满 (Domino Tiling)

虽然该题可用简单轮廓线 DP，但作为插头 DP 的入门非常合适。

<details>
<summary>Check Solution (Bracket Notation Base)</summary>

```cpp
// 简化的插头 DP 状态转移
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        cur ^= 1; total[cur] = 0; memset(head, 0, sizeof head);
        for (int k = 1; k <= total[cur ^ 1]; k++) {
            ll s = state[cur ^ 1][k], v = val[cur ^ 1][k];
            int L = (s >> (2 * (j - 1))) & 3;
            int U = (s >> (2 * j)) & 3;
            if (!L && !U) { // 必须放置，向下或向右
                if (i < n && j < m) insert(s | (1 << (2*(j-1))) | (2 << (2*j)), v);
            }
            // ... 更多 case ...
        }
    }
}
```

</details>

---

## 延伸挑战
- [洛谷 P5056 【模板】插头 DP](https://www.luogu.com.cn/problem/P5056) (哈密顿回路)
- [洛谷 P3190 [HNOI2007] 神奇游乐园](https://www.luogu.com.cn/problem/P3190) (最大权重路径)
- [HDU 1693 Eat the Trees](http://acm.hdu.edu.cn/showproblem?pid=1693) (简单回路计数)
- [Codeforces 8C Looking for Order](https://codeforces.com/problemset/problem/8/C) (状压与插头思想结合)
