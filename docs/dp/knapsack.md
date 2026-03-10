---
title: 背包 DP
---

# 背包问题体系 (Knapsack Problem System)

背包问题是一类经典的组合优化问题，其本质是在**有限约束（容量）下追求目标函数（价值）的最大化**。

---

## 1. 0/1 背包：每种物品仅一件

**状态定义**：$f[i][j]$ 表示在前 $i$ 件物品中选取，总体积不超过 $j$ 的最大价值。
**转移方程**：
$$f[i][j] = \max(f[i-1][j], f[i-1][j-w_i] + v_i)$$

### 维度压缩与遍历顺序
为了将空间优化至 $O(W)$，我们使用一维数组 `f[j]`。
- **核心逻辑**：计算第 $i$ 轮的 `f[j]` 时，它需要依赖第 $i-1$ 轮的 `f[j-w_i]`。
- **倒序遍历**：为了保证 `f[j-w_i]` 尚未被第 $i$ 轮的数据覆盖（即它仍代表第 $i-1$ 轮的状态），必须从 $W$ 递减到 $w_i$。

---

## 2. 完全背包：物品无限量

**转移方程**：
$$f[i][j] = \max(f[i-1][j], f[i][j-w_i] + v_i)$$
注意：第二个状态是 $f[i]$ 而非 $f[i-1]$，表示可以多次重复选取。

### 正序遍历的必然性
在一维优化中，正序遍历 $j$ 意味着当计算 `f[j]` 时，`f[j-w_i]` 已经被当前第 $i$ 轮更新过了。这恰好符合“可以多次选取同一物品”的物理含义。

---

## 3. 多重背包：物品有限量 $c_i$

### 二进制拆分优化 ($O(NW \log C)$)
将数量 $c_i$ 拆分为 $1, 2, 4, \dots, 2^k, R$，利用这些基底可以组合出 $[0, c_i]$ 之间的任何整数。从而将多重背包转化为 $\sum \log c_i$ 个 0/1 背包物品。

### 单调队列优化 ($O(NW)$)
**数学推导**：
令 $j = q \cdot w_i + r$（其中 $r < w_i$ 为余数）。转移方程可改写为：
$$f[j] = \max_{0 \le k \le c_i} \{ f[j - k \cdot w_i] + k \cdot v_i \}$$
代入 $j = q \cdot w_i + r$：
$$f[q \cdot w_i + r] = \max_{q-c_i \le k \le q} \{ f[k \cdot w_i + r] - k \cdot v_i \} + q \cdot v_i$$
这是一个典型的**滑动窗口最大值**问题，可以使用单调队列维护。

```cpp
// 多重背包单调队列优化核心模板
void MultipleKnapsack(int w, int v, int c) {
    for (int r = 0; r < w; r++) {
        deque<int> q;
        for (int j = r; j <= W; j += w) {
            // 维护窗口大小：(j - q.front()) / w <= c
            if (!q.empty() && q.front() < j - c * w) q.pop_front();
            // 维护单调递减队列
            while (!q.empty() && f[q.back()] - (q.back() - r) / w * v <= f[j] - (j - r) / w * v)
                q.pop_back();
            q.push_back(j);
            new_f[j] = f[q.front()] + (j - q.front()) / w * v;
        }
    }
}
```

---

## 4. 依赖背包与分组背包

### 分组背包
每组物品互斥。**遍历顺序**：组 $\to$ 容量（倒序） $\to$ 组内物品。
这种顺序确保了在每一组中，由于容量是倒序遍历的，当前组内的多个物品之间产生了“互斥”效果（只会从上一组的状态转移过来）。

### 依赖背包
若选物品 $B$ 必选 $A$，通常转化为**树形 DP** 解决。见 [树形 DP](tree-dp) 章节。

---

## 综合练习与强化

### 练习 1：方案数初始化
求凑成总重量为 $W$ 的方案总数，初值如何设定？

<details>
<summary>Check Solution</summary>

- `f[0] = 1`：凑成重量 0 有一种方案（什么都不选）。
- `f[1...W] = 0`。
- 转移：`f[j] = (f[j] + f[j - w_i]) % MOD`。
</details>

### 练习 2：恰好装满 vs 不超过
若要求背包**必须恰好装满**，在求最大价值时初值应如何？

<details>
<summary>Check Solution</summary>

- `f[0] = 0`
- `f[1...W] = -INF`
这样只有从 0 开始合法转移的路径最终才会得到非负数。
</details>

---

## 延伸挑战
- [洛谷 P1064 金明的预算方案](https://www.luogu.com.cn/problem/P1064)
- [HDU 2191 多重背包模板](http://acm.hdu.edu.cn/showproblem.php?pid=2191)
