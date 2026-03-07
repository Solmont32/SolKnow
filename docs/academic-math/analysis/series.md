---
title: 级数 (Series)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 级数 (Series)

级数是分析学中处理无限求和问题的核心工具。

## 数项级数
若数列 $\{a_n\}$ 的部分和 $S_n = \sum_{i=1}^n a_i$ 当 $n \to \infty$ 时极限存在且为 $S$，则称级数收敛于 $S$。

### 敛散性判别法
1.  **必要条件**：若 $\sum a_n$ 收敛，则 $\lim_{n \to \infty} a_n = 0$。
2.  **正项级数判别法**：
    -   **比较判别法**。
    -   **比值判别法 (d'Alembert test)**：$\rho = \lim \frac{a_{n+1}}{a_n}$。若 $\rho < 1$ 收敛。
    -   **根值判别法 (Cauchy test)**：$\rho = \lim \sqrt[n]{a_n}$。

## 幂级数与泰勒展开
形如 $\sum a_n (x - x_0)^n$ 的级数称为幂级数。

### 泰勒公式 (Taylor's Formula)
若 $f(x)$ 在 $x_0$ 处 $n$ 阶可导，则：
$$f(x) = \sum_{k=0}^n \frac{f^{(k)}(x_0)}{k!} (x - x_0)^k + R_n(x)$$

<KnowledgeCard type="tip" title="常用麦克劳林展开">
当 $x_0 = 0$ 时的常见展开：
- $e^x = \sum \frac{x^n}{n!}$
- $\sin x = \sum (-1)^n \frac{x^{2n+1}}{(2n+1)!}$
- $\cos x = \sum (-1)^n \frac{x^{2n}}{(2n)!}$
</KnowledgeCard>
