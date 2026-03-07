---
title: 从排列组合到 Burnside 引理
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 从排列组合到 Burnside 引理

处理带有“对称性”的计数问题，避免重复计算旋转或翻转后相同的方案。

## 基础计数
经典的 $C(n, k)$ 处理的是无序选取。但当对象可以旋转（如项链染色）时，情况变得复杂。

## Burnside 引理 (Burnside's Lemma)
设 $G$ 是作用在集合 $X$ 上的置换群。$X$ 中在 $G$ 作用下互不置换的等价类（轨道）的个数 $N$ 为：
$$N = \frac{1}{|G|} \sum_{g \in G} |X^g|$$
其中 $|X^g|$ 是在置换 $g$ 作用下保持不变的着色方案数。

<KnowledgeCard type="contest" title="算法进阶">
**Pólya 计数定理** 是 Burnside 引理的推广，它通过置换群的循环指数大大简化了带约束染色的计算。
</KnowledgeCard>
