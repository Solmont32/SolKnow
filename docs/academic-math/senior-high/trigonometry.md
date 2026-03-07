---
title: 三角函数 (Trigonometry)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 三角函数 (Trigonometry)

三角函数是研究三角形边角关系及周期现象的基础。

## 任意角的三角函数
在单位圆中，角 $\alpha$ 的终边与圆的交点为 $(x, y)$：
- $\sin \alpha = y$
- $\cos \alpha = x$
- $\tan \alpha = \frac{y}{x}$

## 核心公式库
1.  **同角基本关系**：$\sin^2 \alpha + \cos^2 \alpha = 1$。
2.  **诱导公式**：奇变偶不变，符号看象限。
3.  **两角和差公式**：
    - $\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta$
    - $\cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta$
4.  **二倍角公式**：
    - $\sin 2\alpha = 2\sin\alpha\cos\alpha$
    - $\cos 2\alpha = \cos^2\alpha - \sin^2\alpha = 2\cos^2\alpha - 1 = 1 - 2\sin^2\alpha$

<KnowledgeCard type="tip" title="解题秘籍">
看到 $1 \pm \cos \alpha$，优先考虑使用二倍角公式进行 **降幂** 或 **升幂** 变换。
</KnowledgeCard>

## 正弦定理与余弦定理
-   **正弦定理**：$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R$。
-   **余弦定理**：$a^2 = b^2 + c^2 - 2bc\cos A$。
