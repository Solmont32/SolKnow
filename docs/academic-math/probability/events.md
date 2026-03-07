---
title: 事件与概率 (Events and Probability)
---

# 事件与概率 (Events and Probability)

## 基本概念
- **样本空间 ($\Omega$)**：随机试验所有可能结果的集合。
- **随机事件**：样本空间的子集。
- **概率 ($P$)**：描述事件发生的可能性大小，满足 $0 \le P(A) \le 1$。

## 概率公式
- **加法公式**：$P(A \cup B) = P(A) + P(B) - P(A \cap B)$
- **条件概率**：$P(A|B) = \frac{P(A \cap B)}{P(B)}$
- **乘法公式**：$P(A \cap B) = P(B)P(A|B)$
- **全概率公式**：$P(A) = \sum_{i} P(B_i)P(A|B_i)$
- **贝叶斯公式 (Bayes' Theorem)**：
$$P(B_i|A) = \frac{P(B_i)P(A|B_i)}{\sum_{j} P(B_j)P(A|B_j)}$$
