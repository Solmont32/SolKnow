---
title: 命题逻辑与谓词逻辑 (Logic)
description: 命题等值、推理规则、范式与谓词量词入门
---

# 命题逻辑与谓词逻辑

逻辑是离散数学的证明引擎。学习目标不是“背符号”，而是形成三步闭环：

1. 把自然语言命题形式化；
2. 用等值变形或推理规则完成证明；
3. 用真值表/范式验证结论。

## 1. 命题逻辑基础

### 1.1 命题与联结词

- 命题：可判定真假的陈述句。
- 否定：$\neg p$
- 合取：$p\land q$
- 析取：$p\lor q$
- 蕴含：$p\to q$
- 等价：$p\leftrightarrow q$

### 1.2 蕴含的真值语义

$ p\to q $ 仅在“$p$ 真且 $q$ 假”时为假。
常用等值式：

$$

p\to q\equiv \neg p\lor q.


$$

### 例题 1（语句形式化）

“如果系统宕机，则服务不可用；系统未宕机；所以服务可用”是否是有效推理？

设

- $p$：系统宕机；
- $q$：服务不可用。

原命题是：$p\to q,\ \neg p\ \therefore\ \neg q$。
这是否有效？

**解：** 该推理是“否定前件”，不是有效规则。反例：即使系统没宕机，也可能因网络故障导致服务不可用。

## 2. 常用等值律与等值变形

### 2.1 基本等值律

1. 交换律：$p\land q\equiv q\land p$，$p\lor q\equiv q\lor p$
2. 结合律：$(p\land q)\land r\equiv p\land(q\land r)$
3. 分配律：$p\land(q\lor r)\equiv(p\land q)\lor(p\land r)$
4. 德摩根律：$\neg(p\land q)\equiv\neg p\lor\neg q$
5. 双重否定：$\neg\neg p\equiv p$

### 例题 2（等值化简）

化简：$\neg(p\to q)\lor(\neg q\to p)$。

**解：**

$$

\neg(p\to q)\lor(\neg q\to p)
\equiv \neg(\neg p\lor q)\lor(q\lor p)
\equiv (p\land\neg q)\lor(p\lor q).


$$

吸收律得：

$$

(p\land\neg q)\lor(p\lor q)\equiv p\lor q.


$$

### 例题 3（永真式判定）

证明：$((p\to q)\land(q\to r))\to(p\to r)$ 是永真式。

**解：** 这是蕴含传递律。若前件真，则 $p$ 真时先推出 $q$，再推出 $r$，因此 $p\to r$ 必真。

## 3. 推理规则与证明模板

### 3.1 常见有效推理

- MP（肯定前件）：$p,\ p\to q\ \therefore\ q$
- MT（否定后件）：$\neg q,\ p\to q\ \therefore\ \neg p$
- HS（假言三段论）：$p\to q,\ q\to r\ \therefore\ p\to r$
- 析取三段论：$p\lor q,\ \neg p\ \therefore\ q$

### 例题 4（形式证明）

前提：$p\to(q\land r)$，$\neg r$。证明：$\neg p$。

**解：**

1. 由 $p\to(q\land r)$ 与 $p$ 可推出 $q\land r$；
2. 由 $q\land r$ 可推出 $r$；
3. 已知 $\neg r$，与 2 矛盾；
4. 故由 MT 得 $\neg p$。

## 4. 主范式（CNF / DNF）

- 合取范式（CNF）：若干析取子句的合取。
- 析取范式（DNF）：若干合取项的析取。

### 例题 5（写成 CNF）

将 $p\leftrightarrow q$ 写成 CNF。

**解：**

$$

p\leftrightarrow q\equiv(p\to q)\land(q\to p)
\equiv(\neg p\lor q)\land(\neg q\lor p).


$$

## 5. 谓词逻辑入门

### 5.1 量词

- 全称量词：$\forall x\,P(x)$
- 存在量词：$\exists x\,P(x)$

### 5.2 否定量词

$$

\neg\forall x\,P(x)\equiv\exists x\,\neg P(x),\quad
\neg\exists x\,P(x)\equiv\forall x\,\neg P(x).


$$

### 例题 6（量词否定）

命题“所有学生都会离散数学”记为 $\forall x\,S(x)$。其否定是什么？

**解：**

$$

\neg\forall x\,S(x)\equiv\exists x\,\neg S(x),


$$

即“至少有一名学生不会离散数学”。

## 6. 本章练习

### 练习 1

判断 $((p\to q)\land p)\to q$ 是否永真。

<details>

<summary>点击查看解析与答案</summary>

是永真式，对应 MP 规则。

</details>

### 练习 2

化简：$(p\lor q)\land(p\lor\neg q)$。

<details>

<summary>点击查看解析与答案</summary>

利用分配与吸收：

$$

(p\lor q)\land(p\lor\neg q)
\equiv p\lor(q\land\neg q)
\equiv p.


$$

</details>

### 练习 3

写出 $\neg(p\leftrightarrow q)$ 的等值形式。

<details>

<summary>点击查看解析与答案</summary>

$$

\neg(p\leftrightarrow q)
\equiv(p\land\neg q)\lor(\neg p\land q).


$$

</details>

### 练习 4

将“并非所有程序都无 bug”翻译为谓词逻辑。

<details>

<summary>点击查看解析与答案</summary>

若 $B(x)$ 表示“程序 $x$ 无 bug”，则

$$

\neg\forall x\,B(x)\equiv\exists x\,\neg B(x).


$$

</details>

## 7. 学习闭环

- 前置：[集合论：集合代数与基数](set-theory)
- 后续：[关系与函数](relations-and-functions)
- 配套题单：[离散数学练习库](/docs/exercises/math/discrete-math)
