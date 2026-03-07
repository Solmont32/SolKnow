---
title: 极限 (Limits)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 极限 (Limits)

极限是微积分的基石，描述了函数或数列在趋向某一点时的行为。

## 数列极限 ($\epsilon-N$ 定义)
设 $\{a_n\}$ 为一数列，如果存在常数 $A$，对于任意给定的 $\epsilon > 0$，总存在正整数 $N$，使得当 $n > N$ 时，都有：
$$|a_n - A| < \epsilon$$
则称 $A$ 为数列 $\{a_n\}$ 的极限，记作 $\lim_{n \to \infty} a_n = A$。

## 函数极限 ($\epsilon-\delta$ 定义)
设函数 $f(x)$ 在 $x_0$ 的去心邻域内有定义。若 $\forall \epsilon > 0, \exists \delta > 0$，使得当 $0 < |x - x_0| < \delta$ 时，恒有：
$$|f(x) - A| < \epsilon$$
则称 $A$ 为 $f(x)$ 在 $x \to x_0$ 时的极限。

<KnowledgeCard type="tip" title="解题技巧">
处理极限时，优先考虑 **洛必达法则 (L'Hôpital's rule)** 或 **等价无穷小替换**。
常见的等价无穷小（当 $x \to 0$ 时）：
- $\sin x \sim x$
- $e^x - 1 \sim x$
- $\ln(1+x) \sim x$
</KnowledgeCard>

## 重要极限公式
1.  **第一个重要极限**：
    $$\lim_{x \to 0} \frac{\sin x}{x} = 1$$
2.  **第二个重要极限**：
    $$\lim_{x \to \infty} (1 + \frac{1}{x})^x = e$$
