---
title: 布尔代数与逻辑电路 (Boolean Algebra)
description: 布尔代数基本定律、标准形、最小化与逻辑电路建模
---

# 布尔代数与逻辑电路

布尔代数把命题逻辑中的“真/假”抽象为代数运算，是离散数学连接逻辑推理与数字电路设计的关键章节。

## 1. 基本对象与运算

设布尔变量只取 $0,1$ 两值，定义：
- 与（AND）：$x\cdot y$
- 或（OR）：$x+y$
- 非（NOT）：$\bar x$

常见解释：
- $0$ 表示假（False），$1$ 表示真（True）；
- 在电路里对应低电平与高电平。

## 2. 布尔代数核心定律

1. 交换律：$x+y=y+x,\ x\cdot y=y\cdot x$
2. 结合律：$(x+y)+z=x+(y+z)$
3. 分配律：$x(y+z)=xy+xz,\ x+yz=(x+y)(x+z)$
4. 幂等律：$x+x=x,\ xx=x$
5. 互补律：$x+\bar x=1,\ x\bar x=0$
6. 吸收律：$x+xy=x,\ x(x+y)=x$
7. 德摩根律：$\overline{x+y}=\bar x\bar y,\ \overline{xy}=\bar x+\bar y$

### 例题 1（代数化简）
化简 $F(x,y,z)=x\bar y+xy+x\bar yz$。

**解：**
$$
F=x(\bar y+y+\bar yz)=x(1+\bar yz)=x.
$$

## 3. 最小项、最大项与标准形

- 最小项（minterm）：包含每个变量且只出现一次（原变量或反变量）的乘积项。
- 最大项（maxterm）：包含每个变量且只出现一次的和项。

任意布尔函数都可写成：
- 主析取范式（SOP，最小项之和）；
- 主合取范式（POS，最大项之积）。

### 例题 2（由真值表写 SOP）
已知三变量函数 $f(x,y,z)$ 在输入 $001,010,111$ 时取 1，写主析取范式。

**解：**
$$
f=\bar x\bar y z+\bar x y\bar z+xyz=\Sigma m(1,2,7).
$$

## 4. 卡诺图最小化

对 2~4 变量函数，可用卡诺图合并相邻 1 方格（大小为 $2^k$）得到最简表达式。

### 例题 3（3 变量卡诺图）
$$
f=\Sigma m(1,3,5,7).
$$
求最简式。

**解：** 上述四个最小项都满足 $z=1$，故
$$
f=z.
$$

## 5. 逻辑门与电路实现

常见逻辑门：
- 与门、或门、非门；
- 与非门（NAND）、或非门（NOR）。

NAND 和 NOR 都是完备门，即仅用一种门就能实现任意布尔函数。

### 例题 4（仅用 NAND 实现非门）
证明 $\bar x$ 可由 NAND 实现。

**解：**
$$
\bar x = x\uparrow x=\overline{x\cdot x}.
$$
即将同一输入并到一个 NAND 门即可得到非运算。

### 例题 5（从表达式到门级电路）
函数 $f(x,y,z)=\bar x y+xz$。

**解：**
1. 用一个非门得到 $\bar x$；
2. 两个与门分别得到 $\bar x y$ 和 $xz$；
3. 再用或门输出 $f$。

该结构对应“与或两级电路”。

## 6. 本章练习

### 练习 1
化简：$x+\bar x y$。

<details>
<summary>点击查看解析与答案</summary>

$$
x+\bar x y=(x+\bar x)(x+y)=x+y.
$$

</details>

### 练习 2
化简：$(x+y)(x+\bar y)$。

<details>
<summary>点击查看解析与答案</summary>

$$
(x+y)(x+\bar y)=x+y\bar y=x.
$$

</details>

### 练习 3
将 $f=\Sigma m(0,2,6,7)$ 写成主析取范式（变量顺序 $x,y,z$）。

<details>
<summary>点击查看解析与答案</summary>

$$
f=\bar x\bar y\bar z+\bar x y\bar z+xy\bar z+xyz.
$$

</details>

### 练习 4
为什么 NAND 是完备门？

<details>
<summary>点击查看解析与答案</summary>

因为可先构造 $\bar x=x\uparrow x$，再由德摩根构造与、或，从而实现任意布尔表达式。

</details>

## 7. 学习闭环
- 前置：[命题逻辑与谓词逻辑](logic)
- 后续：[递推关系与生成函数](recurrence-and-generating-functions)
- 配套题单：[离散数学练习库](/docs/exercises/math/discrete-math)
