---
title: 群论 (Groups)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 群论 (Groups)

群论是研究对称性与代数结构的现代数学分支。

## 群的定义
一个集合 $G$ 及其上的二元运算 $\cdot$ 称为群，需满足：
1.  **封闭性**：$a, b \in G \implies a \cdot b \in G$。
2.  **结合律**：$(a \cdot b) \cdot c = a \cdot (b \cdot c)$。
3.  **单位元**：存在 $e \in G$ 使得 $a \cdot e = e \cdot a = a$。
4.  **逆元**：对于 $\forall a \in G$，存在 $a^{-1} \in G$ 使得 $a \cdot a^{-1} = e$。

<KnowledgeCard type="info" title="阿贝尔群">
若运算还满足交换律 $a \cdot b = b \cdot a$，则称为 **交换群** 或 **阿贝尔群 (Abelian Group)**。
</KnowledgeCard>

## 子群与拉格朗日定理
-   **子群**：$G$ 的子集 $H$ 且 $H$ 自身构成群。
-   **拉格朗日定理 (Lagrange's Theorem)**：若 $G$ 是有限群，$H$ 是 $G$ 的子群，则 $|H|$ 整除 $|G|$。

## 同态与同构
描述了不同群之间结构的一致性。同构意味着两个群在代数本质上是完全相同的。
