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

## 2. 核心代数定律与证明

布尔代数满足以下基本定律，这些定律是等价变换的基石。

| 定律名称 | 表达式 (OR 形式) | 表达式 (AND 形式) |
| :--- | :--- | :--- |
| 分配律 | $a \lor (b \land c) = (a \lor b) \land (a \lor c)$ | $a \land (b \lor c) = (a \land b) \lor (a \land c)$ |
| 吸收律 | $a \lor (a \land b) = a$ | $a \land (a \lor b) = a$ |
| 德·摩根律 | $\overline{a \lor b} = \bar a \land \bar b$ | $\overline{a \land b} = \bar a \lor \bar b$ |

### 2.1 吸收律的形式证明
证明：$a \lor (a \land b) = a$。

**证明**：
$a \lor (a \land b) = (a \land 1) \lor (a \land b)$ (单位元)
$= a \land (1 \lor b)$ (分配律)
$= a \land 1$ (最大元性质：$1 \lor x = 1$)
$= a$。

## 3. 逻辑完备性与 NAND/NOR

一个逻辑门集合若能实现任何布尔函数，则称其为**完备集**。
- $\{ \land, \lor, \neg \}$ 是最直观的完备集。
- $\{ \uparrow \}$ (NAND) 与 $\{ \downarrow \}$ (NOR) 是单门完备集。

### 3.1 使用 NAND 实现所有运算
- $\neg a = a \uparrow a$
- $a \land b = \neg(a \uparrow b) = (a \uparrow b) \uparrow (a \uparrow b)$
- $a \lor b = \neg a \uparrow \neg b = (a \uparrow a) \uparrow (b \uparrow b)$

## 4. 布尔函数化简：卡诺图 (K-Map)

卡诺图是一种利用几何相邻性（格雷码顺序）进行逻辑简化的图形工具。

### 4.1 化简规则
1. 圈内的项数必须是 $2^n$。
2. 尽可能圈大的块以消掉更多的变量。
3. 圈可以跨越图的边界（卷轴特性）。

## 5. 本章练习

### 练习 1：对偶原理
写出表达式 $f = (a + \bar b) \cdot c + 0$ 的对偶式 $f^*$。

<details>
<summary>Check Solution</summary>

对偶运算规则：$+ \leftrightarrow \cdot$，$0 \leftrightarrow 1$。
$f^* = (a \cdot \bar b) + c \cdot 1$。

</details>

### 练习 2：代数化简
化简 $f = \overline{A \bar B (C + BD) + \bar A \bar B} C$。

<details>
<summary>Check Solution</summary>

1. 展开内层：$A \bar B C + A \bar B B D = A \bar B C$ (因为 $\bar B B = 0$)。
2. 原式变为：$\overline{A \bar B C + \bar A \bar B} C$。
3. 应用德·摩根律：$(\overline{A \bar B C} \cdot \overline{\bar A \bar B}) C$
$= (\bar A + B + \bar C) \cdot (A + B) \cdot C$
$= [(\bar A + B + \bar C) \cdot C] \cdot (A + B)$
$= (\bar A C + B C + 0) \cdot (A + B)$
$= \bar A C A + \bar A C B + B C A + B C B = 0 + \bar A B C + A B C + B C = B C (\bar A + A + 1) = B C$。

</details>

### 练习 3：NAND 完备性
仅使用 NAND 门实现异或运算 $a \oplus b$。

<details>
<summary>Check Solution</summary>

$a \oplus b = (a \land \bar b) \lor (\bar a \land b)$。
使用 4 个 NAND 门：
$x = a \uparrow b$
$y = a \uparrow x$
$z = b \uparrow x$
结果 $= y \uparrow z$。

</details>

### 练习 4：卡诺图化简（思考题）
给定四变量函数 $\sum m(0, 1, 2, 5, 8, 9, 10)$。画图并写出最简 SOP 形式。

<details>
<summary>Check Solution</summary>

合并结果为 $f = \bar B \bar D + \bar B \bar C + \bar A \bar C D$。

</details>


---

_本章节由 SolKnow 系统根据布尔代数与格论深度整合。_
