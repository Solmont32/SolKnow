---
title: 群作用与 Sylow 定理 (Group Actions and Sylow Theorems)
---

# 群作用与 Sylow 定理 (Group Actions and Sylow Theorems)

群作用把群论中的“代数运算”转化为集合上的“对称变换”，是理解有限群结构、尤其是 Sylow 定理应用的核心桥梁。

## 1. 群作用、轨道与稳定子

设 $G$ 是群，$X$ 是集合。若映射
$$
G\times X\to X,\quad (g,x)\mapsto g\cdot x
$$
满足
1. $e\cdot x=x$；
2. $(gh)\cdot x=g\cdot(h\cdot x)$；
则称 $G$ 作用在 $X$ 上。

给定 $x\in X$：
- 轨道：$\operatorname{Orb}(x)=\{g\cdot x:g\in G\}$；
- 稳定子：$G_x=\{g\in G:g\cdot x=x\}$。

**轨道-稳定子定理**
$$
|\operatorname{Orb}(x)|=[G:G_x].
$$

### 例题 1：传递作用中的集合大小
设 $|G|=72$，$G$ 传递作用在 $X$ 上，且某点 $x$ 的稳定子阶 $|G_x|=9$。求 $|X|$。

解：传递作用下 $X=\operatorname{Orb}(x)$，故
$$
|X|=[G:G_x]=72/9=8.
$$

### 例题 2：共轭作用下的换位轨道
令 $S_4$ 在自身上按共轭作用，求换位 $(12)$ 的轨道大小。

解：共轭保持循环类型。$S_4$ 中全部换位有 $\binom{4}{2}=6$ 个，且相互共轭，因此轨道大小为 6。

## 2. 类方程与 $p$ 群中心

有限群 $G$ 对自身作共轭作用时，轨道是共轭类，稳定子是中心化子 $C_G(x)$，得到类方程：
$$
|G|=|Z(G)|+\sum_i [G:C_G(x_i)],
$$
其中 $x_i$ 取非中心共轭类代表。

由此立即得到：若 $|G|=p^n$，则 $Z(G)$ 非平凡。

### 例题 3：证明 $|Z(G)|\equiv |G|\pmod p$
设 $|G|=p^n$。证明 $|Z(G)|\equiv |G|\pmod p$。

解：类方程中非中心项 $[G:C_G(x_i)]$ 都是 $p$ 的倍数，因此
$$
|G|-|Z(G)|\equiv 0\pmod p.
$$
故 $|Z(G)|\equiv |G|\equiv 0\pmod p$，中心至少含 $p$ 个元素。

## 3. Cauchy 定理与 Sylow 三定理

设 $|G|=p^a m$，$(p,m)=1$，$n_p$ 表示 Sylow $p$-子群个数。

- Cauchy 定理：若 $p\mid |G|$，则存在阶为 $p$ 的元素。
- Sylow 定理：
1. 存在性：存在阶 $p^a$ 的子群；
2. 共轭性：任意两个 Sylow $p$-子群共轭；
3. 计数：$n_p\equiv 1\pmod p$ 且 $n_p\mid m$。

### 例题 4：21 阶群的正规子群
设 $|G|=21=3\cdot 7$。证明 $G$ 存在正规 7 阶子群。

解：$n_7\mid 3$ 且 $n_7\equiv 1\pmod 7$。可选值只可能是 1，故 Sylow 7-子群唯一，从而正规。

### 例题 5：12 阶群中 Sylow 3-子群个数
设 $|G|=12$，求 $n_3$ 的可能值。

解：$n_3\mid 4$ 且 $n_3\equiv 1\pmod 3$，故
$$
n_3\in\{1,4\}.
$$

### 例题 6：56 阶群中 Sylow 7-子群
设 $|G|=56=2^3\cdot 7$，求 $n_7$。

解：$n_7\mid 8$ 且 $n_7\equiv 1\pmod 7$，只可能 $n_7=1$，因此 Sylow 7-子群正规。

## 4. 常见解题模板

1. **计数先行**：先写 $n_p\mid m$ 与 $n_p\equiv 1\pmod p$。
2. **唯一即正规**：若 $n_p=1$，立刻得到正规性。
3. **共轭类配合类方程**：处理中心、共轭类大小与 $p$ 群结构。
4. **群作用换视角**：把“子群个数问题”转成作用下轨道计数问题。

## 5. 配套练习（点击展开答案）

### 练习 1
设有限群 $G$ 传递作用在集合 $X$ 上，且 $|G|=96$、某点稳定子阶为 12。求 $|X|$。

<details>

<summary>点击查看解析与答案</summary>

由轨道-稳定子定理：
$$
|X|=[G:G_x]=96/12=8.
$$

</details>

### 练习 2
设 $|G|=45=3^2\cdot 5$，求 Sylow 5-子群个数并判断是否正规。

<details>

<summary>点击查看解析与答案</summary>

$n_5\mid 9$ 且 $n_5\equiv 1\pmod 5$。9 的因子为 $1,3,9$，仅 1 满足同余，故 $n_5=1$，必正规。

</details>

### 练习 3
设 $|G|=20=2^2\cdot 5$。证明 $G$ 一定有正规 Sylow 5-子群。

<details>

<summary>点击查看解析与答案</summary>

$n_5\mid 4$ 且 $n_5\equiv 1\pmod 5$。4 的因子为 $1,2,4$，只有 1 同余于 1（模 5），故 $n_5=1$，正规。

</details>

### 练习 4
设 $|G|=18=2\cdot 3^2$。求 Sylow 3-子群个数可能值。

<details>

<summary>点击查看解析与答案</summary>

$n_3\mid 2$ 且 $n_3\equiv 1\pmod 3$。可选值 1 或 2，只有 1 满足同余，故 $n_3=1$。

</details>

### 练习 5
设 $G=S_3$ 在自身上按共轭作用，求 3-轮换 $(123)$ 的共轭类大小。

<details>

<summary>点击查看解析与答案</summary>

$S_3$ 中 3-轮换只有 $(123),(132)$ 两个，且同循环类型必共轭，因此该共轭类大小为 2。

</details>

### 练习 6
证明：若有限群 $G$ 的 Sylow $p$-子群唯一，则它是正规子群。

<details>

<summary>点击查看解析与答案</summary>

任取 $g\in G$，共轭子群 $gPg^{-1}$ 仍是 Sylow $p$-子群。唯一性迫使 $gPg^{-1}=P$，故 $P\trianglelefteq G$。

</details>

