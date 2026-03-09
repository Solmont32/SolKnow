---
title: 布尔代数与代数化表示 (Boolean Algebra)
description: 布尔代数作为格的定义、基本定律、代数化表示与逻辑电路
---

# 布尔代数与代数化表示

布尔代数（Boolean Algebra）不仅是计算机逻辑的基础，其本质上是一个**有补分配格**。本章将从代数结构的角度系统化定义布尔代数。

## 1. 布尔代数的代数定义

### 1.1 定义
布尔代数是一个代数系统 $\langle B, \lor, \land, \neg, 0, 1 \rangle$，其中 $\langle B, \lor, \land \rangle$ 是一个**有补分配格**。
- $0, 1$ 分别是格的最小元和最大元。
- $\neg$ 是补元运算，满足 $a \lor \neg a = 1$ 且 $a \land \neg a = 0$。

### 1.2 核心性质
由于布尔代数是格，它天然满足：
- **分配律**：$x \land (y \lor z) = (x \land y) \lor (x \land z)$
- **吸收律**：$x \land (x \lor y) = x$
- **德·摩根律**：$\neg(x \lor y) = \neg x \land \neg y, \neg(x \land y) = \neg x \lor \neg y$

## 2. 布尔函数的代数化表示

### 2.1 布尔表达式与布尔函数
任何由布尔变量经过 $\lor, \land, \neg$ 复合而成的式子都是布尔表达式。
- **等值性**：两个表达式在所有赋值下真值相同，等价于它们在布尔代数公理下可相互推导。

### 2.2 范式：代数化的标准形式
- **主析取范式 (PDNF/SOP)**：最小项之和。
- **主合取范式 (PCNF/POS)**：最大项之积。

:::info 判定定理
两个布尔表达式等价，当且仅当它们的主析取范式（或主合取范式）完全一致。
:::

## 3. 代数化化简技巧

除了基本的逻辑定律外，常用以下代数化技巧：
1. **并项法**：$AB + A\bar B = A(B+\bar B) = A$
2. **消因子法**：$A + \bar AB = (A+\bar A)(A+B) = A+B$
3. **配项法**：$A + B = A + \bar AB$ (引入缺失项以便合并)

## 4. 逻辑电路建模

布尔代数提供了从数学表达式到门电路的映射映射：
- $\lor \to$ 或门 (OR)
- $\land \to$ 与门 (AND)
- $\neg \to$ 非门 (NOT)

### 4.1 逻辑完备性
集合 $\{ \lor, \land, \neg \}$ 是完备的，意味着任何布尔函数都能用这三种门实现。
- **NAND 门** ($x \uparrow y = \overline{xy}$) 本身就是完备的。

## 5. 经典练习

:::info 练习 1
证明：在布尔代数中，补元是唯一的。
:::
<details>
<summary>查看证明</summary>

设 $b, c$ 都是 $a$ 的补元。
1. $a \lor b = 1, a \land b = 0$
2. $a \lor c = 1, a \land c = 0$
$b = b \land 1 = b \land (a \lor c) = (b \land a) \lor (b \land c)$ (分配律)
$= 0 \lor (b \land c) = (c \land a) \lor (c \land b)$
$= c \land (a \lor b) = c \land 1 = c$。
故 $b = c$，补元唯一。
</details>

:::info 练习 2
代数化简 $f(x, y, z) = xy + \bar x z + yz$。
:::
<details>
<summary>查看解析</summary>

利用配项法处理 $yz$：
$yz = (x + \bar x)yz = xyz + \bar x yz$
$f = xy + \bar x z + xyz + \bar x yz$
$= (xy + xyz) + (\bar x z + \bar x y z)$
$= xy(1+z) + \bar x z(1+y)$
$= xy + \bar x z$。
(注：此为著名的**共识定理 Consensus Theorem**)
</details>

---

_本章节由 SolKnow 系统根据布尔代数与格论深度整合。_
