---
title: 事件与概率公理化体系 (Events & Axiomatic Probability)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 事件与概率公理化体系 (Events & Axiomatic Probability)

概率论的现代数学基础建立在 **柯尔莫哥洛夫 (Kolmogorov)** 的公理化体系之上，将概率论纳入了测度论的范畴。

## 1. 样本空间与事件

- **样本空间 ($\Omega$)**：随机试验所有可能结果的集合。
- **样本点 ($\omega$)**：$\Omega$ 中的元素，即单次试验的具体结果。
- **随机事件 ($A, B, \dots$)**：样本空间 $\Omega$ 的子集。
  - **必然事件**：$\Omega$。
  - **不可能事件**：$\emptyset$。

<KnowledgeCard type="info" title="σ-代数 (Sigma-algebra)">
在测度论背景下，事件族 $\mathcal{F}$ 必须构成一个 $\sigma$-代数：
1. $\Omega \in \mathcal{F}$
2. 若 $A \in \mathcal{F}$，则 $A^c \in \mathcal{F}$
3. 若 $A_n \in \mathcal{F} \quad (n=1,2,\dots)$，则 $\bigcup_{n=1}^\infty A_n \in \mathcal{F}$
</KnowledgeCard>

## 2. 概率公理化定义

设 $(\Omega, \mathcal{F})$ 为可测空间，若实值函数 $P: \mathcal{F} \to \mathbb{R}$ 满足以下三条公理：

1. **非负性公理**：对任意 $A \in \mathcal{F}$，$P(A) \ge 0$。
2. **规范性公理**：$P(\Omega) = 1$。
3. **可列可加性公理**：若 $A_1, A_2, \dots$ 两两互不相容，则：
   $$P\left(\bigcup_{n=1}^\infty A_n\right) = \sum_{n=1}^\infty P(A_n)$$

则称 $P(A)$ 为事件 $A$ 的概率，三元组 $(\Omega, \mathcal{F}, P)$ 称为 **概率空间**。

## 3. 条件概率与独立性

### 条件概率 (Conditional Probability)
已知事件 $B$ 发生的前提下，事件 $A$ 发生的概率定义为：
$$P(A|B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0$$

### 乘法公式与全概率
- **乘法公式**：$P(A \cap B) = P(B)P(A|B)$。
- **全概率公式**：设 $\{B_1, B_2, \dots, B_n\}$ 是 $\Omega$ 的一个划分，则：
  $$P(A) = \sum_{i=1}^n P(B_i)P(A|B_i)$$

### 贝叶斯公式 (Bayes' Formula)
$$P(B_i|A) = \frac{P(B_i)P(A|B_i)}{\sum_{j=1}^n P(B_j)P(A|B_j)}$$

<KnowledgeCard type="warning" title="独立性判定">
事件 $A, B$ **相互独立** $\iff P(A \cap B) = P(A)P(B)$。
注意：独立性描述的是概率属性，而互不相容描述的是集合关系。
</KnowledgeCard>

## 4. 经典练习

:::info 练习 1：全概率应用
某工厂由甲、乙、丙三个车间生产同一种零件，产量占比分别为 25%, 35%, 40%，次品率分别为 5%, 4%, 2%。现从出厂零件中任取一件，求它是次品的概率。
:::

<details>
<summary>查看解析</summary>

设 $A$ 为取到次品，$B_1, B_2, B_3$ 分别为零件来自甲、乙、丙车间。
$P(B_1)=0.25, P(B_2)=0.35, P(B_3)=0.40$。
$P(A|B_1)=0.05, P(A|B_2)=0.04, P(A|B_3)=0.02$。
由全概率公式：
$$P(A) = 0.25 \times 0.05 + 0.35 \times 0.04 + 0.40 \times 0.02 = 0.0125 + 0.014 + 0.008 = 0.0345$$
即该工厂总次品率为 3.45%。
</details>

---

_本章节基于柯尔莫哥洛夫公理体系构建，为随机变量奠定测度论基础。_
