---
title: 导数与微分 (Derivatives and Differentials)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 导数与微分 (Derivatives and Differentials)

本章探讨函数的变化率及其局部线性逼近。

## 一、 核心知识点讲解

### 1. 导数的几何与物理意义
-   **几何**：切线的斜率。
-   **物理**：瞬时速度。

### 2. 微分定义
若 $\Delta y = A \Delta x + o(\Delta x)$，则称 $dy = A dx$ 为函数的微分。
-   **核心公式**：$dy = f'(x) dx$。

### 3. 三大微分中值定理
1.  **罗尔定理**：端点值相等，中间必有导数为 0 点。
2.  **拉格朗日中值定理**：$f(b) - f(a) = f'(\xi)(b - a)$。
3.  **柯西中值定理**：双函数中值关系。

<KnowledgeCard type="tip" title="泰勒公式">
泰勒展开是导数的高级形态，它将复杂的函数局部线性化甚至多项式化。
$$f(x) = \sum \frac{f^{(n)}(x_0)}{n!} (x-x_0)^n + R_n(x)$$
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：利用导数求极值
求 $f(x) = x^3 - 3x$ 的极值。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **求导**：$f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$。
2.  **求驻点**：令 $f'(x) = 0$，得 $x = 1$ 或 $x = -1$。
3.  **判定**：
    -   $x < -1$ 时，$f'(x) > 0$（递增）。
    -   $-1 < x < 1$ 时，$f'(x) < 0$（递减）。
    -   $x > 1$ 时，$f'(x) > 0$（递增）。
4.  **结论**：$x = -1$ 为极大值点，$f(-1) = 2$；$x = 1$ 为极小值点，$f(1) = -2$。

#### 答案
极大值 2，极小值 -2。
</details>
