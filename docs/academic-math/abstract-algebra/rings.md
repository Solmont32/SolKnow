---
title: 环论 (Rings)
sidebar_position: 2
---

import { Infinity, Layers, Target, Boxes } from 'lucide-react';

# <Infinity className="inline-block mr-2 mb-1" /> 环论 (Ring Theory)

环论研究具备加法与乘法两种运算的代数结构，是联结算术、几何与代数的桥梁。

## 1. 环的定义与基本类型

设 $R$ 是集合，配备加法 $+$ 与乘法 $\cdot$。若 $(R,+)$ 是交换群，且乘法满足结合律与对加法的分配律，则称 $R$ 为 **环 (Ring)**。

- **整环 (Integral Domain)**: 无零因子的交换幺环。
- **除环 (Division Ring)**: 每一个非零元都可逆的环。
- **域 (Field)**: 交换的除环。

## 2. 理想与商环 <Target className="inline-block ml-1" />

### 2.1 理想的定义

设 $I \subseteq R$，若 $(I, +)$ 是子群，且满足对任意 $r \in R, a \in I$ 都有 $ra \in I, ar \in I$，则称 $I$ 为 $R$ 的 **理想 (Ideal)**。

### 2.2 素理想与极大理想

- **素理想 (Prime Ideal)**: 若 $ab \in P \implies a \in P$ 或 $b \in P$，则称 $P$ 为素理想。
  - **性质**: $R/P$ 是整环 $\iff P$ 是素理想。
- **极大理想 (Maximal Ideal)**: 若不存在理想 $J$ 使得 $I \subset J \subset R$，则称 $I$ 为极大理想。
  - **性质**: $R/M$ 是域 $\iff M$ 是极大理想。

## 3. 环同构定理与中国剩余定理 <Layers className="inline-block ml-1" />

### 3.1 环同态与同态基本定理

设 $\varphi: R \to S$ 是环同态，其核 $\ker \varphi = \{r \in R \mid \varphi(r) = 0_S\}$ 是 $R$ 的一个双边理想。
**同态基本定理**: $R/\ker \varphi \cong \operatorname{Im} \varphi$。
这表明任何环同态像都同构于原环对同态核的商环。

### 3.2 环同构定理 (Ring Isomorphism Theorems)

1. **第一同构定理**: 即上述同态基本定理。
2. **第二同构定理**: 设 $I$ 是 $R$ 的理想，$S$ 是 $R$ 的子环，则 $(S+I)/I \cong S/(S \cap I)$。
3. **第三同构定理**: 设 $I, J$ 是 $R$ 的理想且 $I \subseteq J$，则 $(R/I)/(J/I) \cong R/J$。

### 3.2 中国剩余定理 (Chinese Remainder Theorem)

设 $I_1, I_2, \dots, I_n$ 是环 $R$ 的理想，且它们两两 **互素** (即 $I_i + I_j = R$)，则：
$$R / (I_1 \cap I_2 \cap \dots \cap I_n) \cong R/I_1 \times R/I_2 \times \dots \times R/I_n$$

## 4. 经典例题

:::info 例题 1 (极大理想判定)
证明：在整数环 $\mathbb{Z}$ 中，$n\mathbb{Z}$ 是极大理想当且仅当 $n$ 是素数。
:::

<details>
<summary>查看解析</summary>

我们已知 $\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n$。
根据理想性质，$n\mathbb{Z}$ 是极大理想 $\iff \mathbb{Z}/n\mathbb{Z}$ 是域。
而剩余类环 $\mathbb{Z}_n$ 是域的充要条件是 $n$ 为素数。
故得证。

</details>

:::info 例题 2 (不可约多项式)
证明：若 $f(x) \in F[x]$ 是不可约多项式，则 $(f(x))$ 是极大理想。
:::

<details>
<summary>查看解析</summary>

因为 $F$ 是域，$F[x]$ 是主理想整环 (PID)。在 PID 中，非零素理想都是极大理想。
不可约元素生成的理想是素理想。
或者直接考虑商环：$F[x]/(f(x))$ 是由于 $f(x)$ 不可约而构造出的扩张域。
因为商环是域，故 $(f(x))$ 是极大理想。

</details>

## 5. 强化练习

:::info 练习 1 (幂零元与理想)
设 $R$ 是交换环。证明：$R$ 中所有幂零元的集合 $\operatorname{Nil}(R)$ 是 $R$ 的一个理想。
:::

<details>
<summary>查看解析</summary>

1. **加法**: 设 $a^n = 0, b^m = 0$。由二项式定理 $(a+b)^{n+m-1} = \sum \binom{n+m-1}{k} a^k b^{n+m-1-k}$。每一项中 $k \ge n$ 或 $n+m-1-k \ge m$ 必居其一，故每一项都为 0，即 $a+b$ 幂零。
2. **乘法**: $(ra)^n = r^n a^n = 0$，故 $ra$ 幂零。
故 $\operatorname{Nil}(R)$ 是理想。
</details>

:::info 练习 2 (商环结构)
描述商环 $\mathbb{Z}[x] / (x^2+1, 3)$ 的结构。
:::

<details>
<summary>查看解析</summary>

首先 $\mathbb{Z}[x]/(3) \cong \mathbb{Z}_3[x]$。
接着 $\mathbb{Z}_3[x] / (x^2+1)$。由于 $x^2+1$ 在 $\mathbb{Z}_3$ 中没有根（代入 $0, 1, 2$ 均不为 0），故 $x^2+1$ 在 $\mathbb{Z}_3$ 上不可约。
不可约多项式生成的商环是域，元素个数为 $3^{\deg(f)} = 3^2 = 9$。
故该商环是 9 元域 $\mathbb{F}_9$。

</details>

---

_本章节由 SolKnow 高级计算代数系统生成。_
