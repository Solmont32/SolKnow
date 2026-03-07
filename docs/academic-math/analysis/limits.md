---
title: 数列极限 (Limits of Sequences)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 数列极限 (Limits of Sequences)

数列极限是数学分析的开篇，它为整个连续性与微积分体系奠定了严格的逻辑基础。

## 一、 核心知识点讲解

### 1. $\epsilon-N$ 定义（严格定义）
设 $\{a_n\}$ 为一数列，如果存在常数 $A$，对于任意给定的正数 $\epsilon$（无论它多么小），总存在正整数 $N$，使得当 $n > N$ 时，不等式
$$|a_n - A| < \epsilon$$
恒成立，则称常数 $A$ 是数列 $\{a_n\}$ 的极限，记作 $\lim_{n \to \infty} a_n = A$。

### 2. 数列极限的性质
-   **唯一性**：若数列收敛，其极限唯一。
-   **有界性**：收敛数列必定有界。
-   **保号性**：若 $\lim a_n = A > 0$，则存在 $N$，当 $n > N$ 时 $a_n > 0$。

### 3. 重要判别准则
-   **夹逼定理 (Squeeze Theorem)**：若 $x_n \le a_n \le y_n$ 且 $\lim x_n = \lim y_n = A$，则 $\lim a_n = A$。
-   **单调有界原理**：单调且有界的数列必有极限。

<KnowledgeCard type="tip" title="解题秘籍">
证明极限存在时，若公式难以直接变形，优先考虑使用 **单调有界原理**。
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：利用定义证明极限
证明：$\lim_{n \to \infty} \frac{n+1}{n} = 1$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **分析差距**：我们需要证明 $|a_n - 1| < \epsilon$。
2.  **代入化简**：
    $$| \frac{n+1}{n} - 1 | = | \frac{n+1-n}{n} | = \frac{1}{n}$$
3.  **寻找 N**：要使 $\frac{1}{n} < \epsilon$，只需 $n > \frac{1}{\epsilon}$。
4.  **形式化结论**：对于任意 $\epsilon > 0$，取 $N = \lfloor \frac{1}{\epsilon} \rfloor$，则当 $n > N$ 时，恒有 $| \frac{n+1}{n} - 1 | < \epsilon$。

#### 答案
证毕。
</details>

### 例题 2：夹逼定理的应用
求极限：$\lim_{n \to \infty} (\frac{1}{n^2+1} + \frac{1}{n^2+2} + \dots + \frac{1}{n^2+n})$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **放大项**：序列中最大的项是第一项 $\frac{1}{n^2+1}$。
    -   $a_n \le n \cdot \frac{1}{n^2+1} = \frac{n}{n^2+1}$。
2.  **缩小项**：序列中最小的项是最后一项 $\frac{1}{n^2+n}$。
    -   $a_n \ge n \cdot \frac{1}{n^2+n} = \frac{n}{n^2+n}$。
3.  **两端求极限**：
    -   $\lim \frac{n}{n^2+1} = 0$。
    -   $\lim \frac{n}{n^2+n} = 0$。
4.  **结论**：根据夹逼定理，原式极限为 $0$。

#### 答案
$0$
</details>
