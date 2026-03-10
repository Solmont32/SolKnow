---
title: 组合计数与博弈论：从容斥原理、生成函数到尼姆博弈与 SG 函数
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Layers, Binary, Infinity, Zap, Cpu, Gamepad2, Target, Sword } from 'lucide-react';

# 组合计数与博弈论 (Combinatorics & Game Theory)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇文档系统化构建了从基础计数模型、容斥原理、生成函数，到 Pólya 计数理论与公平组合游戏（ICG）的完备知识体系。通过严谨的数学推导与工业级 C++ 实现，揭示组合数学与动态博弈之间的深层逻辑关联。
</motion.div>

---

## 第一部分：组合计数进阶 (Advanced Combinatorics)

### 1. 基础计数模型：十二重奏 (The Twelvefold Way)
在组合计数中，将 $n$ 个球放入 $m$ 个盒子，根据球是否有区别、盒子是否有区别、是否允许空盒，共有 12 种基本模型。

| 球 | 盒 | 空盒允许 | 计数公式 |
| :--- | :--- | :--- | :--- |
| 有区别 | 有区别 | 是 | $m^n$ |
| 有区别 | 有区别 | 否 | $m! \cdot S_2(n, m)$ (斯特林数) |
| 无区别 | 有区别 | 是 | $\binom{n+m-1}{m-1}$ (隔板法) |
| 无区别 | 有区别 | 否 | $\binom{n-1}{m-1}$ |

---

### 2. 容斥原理 (Inclusion-Exclusion Principle)
**定理**：设 $S$ 为全集，$P_1, P_2, \dots, P_n$ 为性质，则具有至少一种性质的元素个数为：
$$|\cup A_i| = \sum |A_i| - \sum |A_i \cap A_j| + \sum |A_i \cap A_j \cap A_k| - \dots$$

#### 经典应用：错位排列 (Derangement)
求 $1 \dots n$ 的排列 $p$，使得 $\forall i, p_i \neq i$ 的方案数 $D_n$。
**公式**：$D_n = (n-1)(D_{n-1} + D_{n-2})$，或 $D_n = n! \sum_{i=0}^n \frac{(-1)^i}{i!}$。

<details>
<summary>C++ 错排递推实现</summary>

```cpp
long long D[MAXN];
void init_derangement(int n, int p) {
    D[0] = 1; D[1] = 0;
    for (int i = 2; i <= n; i++)
        D[i] = (i - 1) * (D[i - 1] + D[i - 2]) % p;
}
```
</details>

---

### 3. 生成函数 (Generating Functions)
生成函数是组合计数的强大工具，将序列 $a_n$ 转化为形式幂级数。

#### 3.1 普通生成函数 (OGF)
$$A(x) = \sum_{n=0}^\infty a_n x^n$$
适用于 **无区别对象** 的组合问题。例如：从无限个苹果、梨中选 $n$ 个的方案数。

#### 3.2 指数生成函数 (EGF)
$$\hat{A}(x) = \sum_{n=0}^\infty a_n \frac{x^n}{n!}$$
适用于 **有区别对象** 的排列问题。
**核心属性**：两个序列的 EGF 卷积对应于其 **混合排列**。

---

### 4. Pólya 计数理论 (Pólya Enumeration Theorem)
用于解决在某种对称群（如旋转、翻转）变换下的等价计数问题。

#### 4.1 Burnside 引理
等价类个数 $N = \frac{1}{|G|} \sum_{g \in G} |X^g|$，其中 $|X^g|$ 是在置换 $g$ 下保持不变的着色方案数。

#### 4.2 Pólya 定理
若用 $m$ 种颜色对物品着色，置换 $g$ 的循环指标为 $c(g)$，则：
$$N = \frac{1}{|G|} \sum_{g \in G} m^{c(g)}$$

<details>
<summary>例题：项链染色 (Pólya 定理)</summary>
用 $m$ 种颜色对由 $n$ 颗珠子组成的项链染色，旋转对称视为相同。

**解析**：旋转置换有 $n$ 种，旋转 $k$ 格的置换包含 $\gcd(k, n)$ 个循环。
故方案数为：$\frac{1}{n} \sum_{k=1}^n m^{\gcd(k, n)}$。
```cpp
long long polya(int n, int m) {
    long long ans = 0;
    for (int k = 1; k <= n; k++)
        ans += qpow(m, gcd(k, n), mod);
    return ans * inv(n, mod) % mod;
}
```
</details>

---

## 第二部分：博弈论与 SG 函数 (Game Theory & SG)

### 1. 公平组合游戏 (Impartial Games)
**定义**：两人轮流行动，合法移动仅取决于当前状态，最后无法行动者输（标准赛制）。

#### 1.1 Nim 游戏
有 $n$ 堆石子，每堆 $a_i$ 个，每次可从一堆中取任意个。
**定理**：先手必胜（N-position）当且仅当 $a_1 \oplus a_2 \oplus \dots \oplus a_n \neq 0$。

---

### 2. Sprague-Grundy 定理
任何公平组合游戏都可以转化为 Nim 游戏。

#### 2.1 Mex 函数与 SG 值
- **Mex (Minimum Excluded value)**：集合中未出现的最小非负整数。
- **SG 函数**：$SG(x) = \text{mex}(\{SG(y) \mid x \to y\})$。
  - $SG(\text{终止状态}) = 0$。
  - $SG(x) > 0 \implies$ 先手必胜。

#### 2.2 游戏和定理
若游戏 $G$ 由独立子游戏 $G_1, G_2, \dots, G_k$ 组成，则：
$$SG(G) = SG(G_1) \oplus SG(G_2) \oplus \dots \oplus SG(G_k)$$

<details>
<summary>C++ SG 函数打表模板</summary>

```cpp
int sg[MAXN], vis[MAXN];
void get_sg(int n) {
    sg[0] = 0;
    for (int i = 1; i <= n; i++) {
        memset(vis, 0, sizeof(vis));
        for (int j : transitions[i]) // 所有可能的后续状态
            vis[sg[j]] = 1;
        int m = 0;
        while (vis[m]) m++;
        sg[i] = m;
    }
}
```
</details>

---

### 3. 动态博弈变种

#### 3.1 阶梯 Nim (Staircase Nim)
有 $n$ 阶楼梯，每阶有 $a_i$ 个石子，每次可将第 $i$ 阶的石子移动到 $i-1$ 阶。
**结论**：等价于所有 **奇数阶** 石子的 Nim 游戏。

#### 3.2 Anti-SG 游戏 (先取完者输)
**SJ 定理**：先手必胜当且仅当：
1. 所有堆石子数均为 1，且异或和为 0。
2. 存在至少一堆石子数 > 1，且异或和不为 0。

---

## 第三部分：综合练习与解答

### 例题 1：[HAOI2008] 硬币购物 (容斥原理)
4 种硬币，面值 $c_i$，数量 $d_i$，求凑出总额 $S$ 的方案数。
<details>
<summary>查看解析</summary>
先不考虑限制，用完全背包求出 $f[S]$。
限制 $i$ 表示使用了超过 $d_i$ 个硬币，即先强制选 $d_i+1$ 个，剩下的任意选。
方案数 = 总方案 - (违反 1 种) + (违反 2 种) - ...
```cpp
void solve() {
    long long ans = f[s];
    for (int i = 1; i < 16; i++) {
        long long now = s, cnt = 0;
        for (int j = 0; j < 4; j++)
            if ((i >> j) & 1) now -= 1ll * c[j] * (d[j] + 1), cnt++;
        if (now >= 0) {
            if (cnt & 1) ans -= f[now];
            else ans += f[now];
        }
    }
    printf("%lld\n", ans);
}
```
</details>

### 例题 2：剪纸游戏 (SG 函数)
一张 $n \times m$ 的纸，每次可沿横向或纵向剪开，先剪出 $1 \times 1$ 者胜。
<details>
<summary>查看 SG 实现</summary>

```cpp
int sg[MAXN][MAXN];
int get_sg(int n, int m) {
    if (sg[n][m] != -1) return sg[n][m];
    set<int> s;
    for (int i = 2; i <= n / 2; i++) s.insert(get_sg(i, m) ^ get_sg(n - i, m));
    for (int i = 2; i <= m / 2; i++) s.insert(get_sg(n, i) ^ get_sg(n, m - i));
    int res = 0;
    while (s.count(res)) res++;
    return sg[n][m] = res;
}
```
</details>

---

## 练习库

<details>
<summary>练习 1：错排的概率</summary>
证明：当 $n \to \infty$ 时，随机排列为错排的概率趋近于 $1/e$。
</details>

<details>
<summary>练习 2：生成函数求递推式</summary>
已知 $a_n = 3a_{n-1} - 2a_{n-2}, a_0=0, a_1=1$，利用 OGF 求通项公式。
</details>

<details>
<summary>练习 3：多堆博弈</summary>
如果有 $n$ 堆石子，每次可以从最多 $k$ 堆中取任意个石子（Nimk 游戏），先手必胜条件是什么？
**提示**：将每堆数量写成二进制，每一位求和，若某一位和不能被 $(k+1)$ 整除，则先手必胜。
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800"
>
<Gamepad2 className="text-blue-500 mb-2" />
**大师寄语**：组合计数是量化的艺术，而博弈论则是决策的科学。当异或和在指尖流转，你面对的不只是数字，而是逻辑构筑的必然之径。
</motion.div>
