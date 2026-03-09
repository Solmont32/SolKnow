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
- 否定：$\neg p$ (Not)
- 合取：$p\land q$ (And)
- 析取：$p\lor q$ (Or)
- 蕴含：$p\to q$ (Implies)
- 等价：$p\leftrightarrow q$ (Equivalent)

### 1.2 蕴含的真值语义

$ p\to q $ 仅在“$p$ 真且 $q$ 假”时为假。
常用等值式：
$$p\to q \equiv \neg p \lor q$$

## 2. 范式 (Normal Forms)

范式是逻辑公式的标准表达形式，便于机器处理和系统化化简。

### 2.1 析取范式 (DNF) 与 合取范式 (CNF)
- **析取范式 (DNF)**: 若干个合取项的析取。例如：$(p \land \neg q) \lor (r \land q)$。
- **合取范式 (CNF)**: 若干个析取项的合取。例如：$(p \lor \neg q) \land (r \lor q)$。

### 2.2 主范式 (Canonical Normal Forms)
- **主析取范式 (PDNF)**: 每个合取项都是极小项 (Minterm)。
- **主合取范式 (PCNF)**: 每个析取项都是极大项 (Maxterm)。

:::info 例题
求 $p \leftrightarrow q$ 的主析取范式。
:::
<details>
<summary>查看解析</summary>

真值表法：
| $p$ | $q$ | $p \leftrightarrow q$ | 极小项 |
| :--- | :--- | :--- | :--- |
| T | T | T | $m_3: p \land q$ |
| T | F | F | - |
| F | T | F | - |
| F | F | T | $m_0: \neg p \land \neg q$ |

故 $p \leftrightarrow q \equiv (p \land q) \lor (\neg p \land \neg q)$。
</details>

## 3. 一阶逻辑 (First-Order Logic)

一阶逻辑（谓词逻辑）扩展了命题逻辑，允许对个体及其属性进行量化。

### 3.1 谓词与量词
- **谓词**: $P(x)$ 表示 $x$ 具有属性 $P$。
- **全称量词**: $\forall x P(x)$（对所有 $x$，$P(x)$ 成立）。
- **存在量词**: $\exists x P(x)$（存在某个 $x$，使 $P(x)$ 成立）。

### 3.2 量词否定规则 (De Morgan's Laws for Quantifiers)
$$\neg \forall x P(x) \equiv \exists x \neg P(x)$$
$$\neg \exists x P(x) \equiv \forall x \neg P(x)$$

### 3.3 推理规则
在一阶逻辑中，除了命题逻辑的推理规则外，还有：
- **全称特指 (UI)**: $\forall x P(x) \Rightarrow P(c)$
- **存在泛化 (EG)**: $P(c) \Rightarrow \exists x P(x)$

## 4. 经典例题

:::info 例题 1 (形式化证明)
前提：$\forall x(P(x) \to Q(x))$，$P(a)$。结论：$Q(a)$。
:::
<details>
<summary>查看解析</summary>

1. $\forall x(P(x) \to Q(x))$ (前提)
2. $P(a) \to Q(a)$ (由 1，UI 规则)
3. $P(a)$ (前提)
4. $Q(a)$ (由 2, 3，MP 规则)
结论得证。
</details>

:::info 例题 2 (量词嵌套)
翻译：每一个学生都至少有一门课程及格。
:::
<details>
<summary>查看解析</summary>

设 $S(x)$ 表示 $x$ 是学生，$C(y)$ 表示 $y$ 是课程，$P(x, y)$ 表示 $x$ 在 $y$ 课程中及格。
$$\forall x (S(x) \to \exists y (C(y) \land P(x, y)))$$
</details>

---

_本章节由 SolKnow 系统根据经典离散数学教材重写。_
