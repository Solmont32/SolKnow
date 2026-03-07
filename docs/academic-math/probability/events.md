---
title: 事件与概率 (Events and Probability)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 事件与概率 (Events and Probability)

概率论是研究随机现象数量规律的数学分支。

## 基本概念
-   **样本空间 ($\Omega$)**：所有可能结果的集合。
-   **随机事件 ($A, B, \dots$)**：样本空间的子集。

## 概率公式体系
1.  **加法公式**：$P(A \cup B) = P(A) + P(B) - P(A \cap B)$。
2.  **条件概率**：$P(A|B) = \frac{P(A \cap B)}{P(B)}$。
3.  **乘法公式**：$P(A \cap B) = P(B)P(A|B)$。

<KnowledgeCard type="warning" title="独立性判定">
事件 $A, B$ 相互独立 $\iff P(A \cap B) = P(A)P(B)$。
</KnowledgeCard>

## 全概率与贝叶斯
-   **全概率公式**：$P(A) = \sum_{i=1}^n P(B_i)P(A|B_i)$。
-   **贝叶斯公式 (Bayes' Theorem)**：
    $$P(B_i|A) = \frac{P(B_i)P(A|B_i)}{\sum_{j=1}^n P(B_j)P(A|B_j)}$$
    常用于已知结果推断原因（逆概率）。
