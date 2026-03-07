---
title: 函数极限 (Limits of Functions)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 函数极限 (Limits of Functions)

函数极限描述了函数在自变量趋于某一点或无穷大时的变化趋势。

## 一、 核心知识点讲解

### 1. $\epsilon-\delta$ 定义
设函数 $f(x)$ 在点 $x_0$ 的某个去心邻域内有定义。若对于任意给定的 $\epsilon > 0$，总存在 $\delta > 0$，使得当 $0 < |x - x_0| < \delta$ 时，恒有
$$|f(x) - A| < \epsilon$$
则称常数 $A$ 为函数 $f(x)$ 当 $x \to x_0$ 时的极限。

### 2. 极限运算法则
若 $\lim f(x) = A, \lim g(x) = B$，则：
-   $\lim (f(x) \pm g(x)) = A \pm B$
-   $\lim (f(x) \cdot g(x)) = A \cdot B$
-   $\lim \frac{f(x)}{g(x)} = \frac{A}{B}$（当 $B \neq 0$）

### 3. 洛必达法则 (L'Hôpital's rule)
处理 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 型不定式极限：
$$\lim_{x \to x_0} \frac{f(x)}{g(x)} = \lim_{x \to x_0} \frac{f'(x)}{g'(x)}$$

<KnowledgeCard type="warning" title="洛必达误区">
在使用洛必达法则前，务必验证极限是否确实属于不定式类型，且导数之比的极限需存在。
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：利用等价无穷小
求极限：$\lim_{x \to 0} \frac{\cos x - 1}{x^2}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **识别等价无穷小**：当 $x \to 0$ 时，$1 - \cos x \sim \frac{1}{2}x^2$。
2.  **恒等变形**：
    $$\frac{\cos x - 1}{x^2} = -\frac{1 - \cos x}{x^2}$$
3.  **代换**：
    $$\lim_{x \to 0} -\frac{\frac{1}{2}x^2}{x^2} = -\frac{1}{2}$$

#### 答案
$-1/2$
</details>
