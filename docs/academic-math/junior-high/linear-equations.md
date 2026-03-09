---
title: 整式方程 (Polynomial Equations)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 整式方程 (Polynomial Equations)

方程是描述客观世界数量关系的有力数学模型。从一元一次方程到一元二次方程，其解法展现了代数的核心逻辑。

## 1. 一元一次方程 (Linear Equations)

形式为 $ax + b = 0 \quad (a \neq 0)$ 的方程。
- **解法**：去分母、去括号、移项、合并同类项、系数化为 1。

<KnowledgeCard type="warning" title="常见错误">
去分母时，方程中不含分母的项 **也必须乘以** 最小公倍数，且分子如果是多项式应加上括号。
</KnowledgeCard>

## 2. 一元二次方程 (Quadratic Equations)

形式为 $ax^2 + bx + c = 0 \quad (a \neq 0)$ 的方程。

### 2.1 解法
1.  **开平方法**：直接利用平方根定义。
2.  **因式分解法**：将方程化为 $(x-x_1)(x-x_2) = 0$。
3.  **配方法**：通过配方将方程变形为 $(x+m)^2 = n$ 的形式。
4.  **求根公式 (Quadratic Formula)**：
    $$ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$

### 2.2 根的判别式 (Discriminant)
设 $\Delta = b^2 - 4ac$：
- $\Delta > 0$：方程有两个不相等的实数根。
- $\Delta = 0$：方程有两个相等的实数根。
- $\Delta < 0$：方程没有实数根。

## 3. 韦达定理 (Vieta's Formulas)

若 $x_1, x_2$ 是一元二次方程 $ax^2 + bx + c = 0$ 的两根，则：
$$ x_1 + x_2 = -\frac{b}{a} $$
$$ x_1 \cdot x_2 = \frac{c}{a} $$

<KnowledgeCard type="tip" title="韦达定理的应用">
不解方程求两根之和、两根之积，或构造已知两根的新方程。
</KnowledgeCard>

## 4. 启发式练习

<details>
<summary>练习 1：解方程 $x^2 - 5x + 6 = 0$</summary>

**解析：**
利用十字相乘法进行因式分解：
$(x-2)(x-3) = 0$
因此，$x_1 = 2, x_2 = 3$。
</details>

<details>
<summary>练习 2：已知 $x^2 - 3x + 1 = 0$ 的两根为 $x_1, x_2$，求 $x_1^2 + x_2^2$ 的值</summary>

**解析：**
根据韦达定理：
$x_1 + x_2 = 3$
$x_1 x_2 = 1$
$$
\begin{aligned}
x_1^2 + x_2^2 &= (x_1 + x_2)^2 - 2x_1 x_2 \\
&= 3^2 - 2(1) \\
&= 9 - 2 = 7
\end{aligned}
$$
</details>

<details>
<summary>练习 3：若关于 $x$ 的方程 $x^2 + 2x + k = 0$ 有实数根，求 $k$ 的取值范围</summary>

**解析：**
方程有实数根，则判别式 $\Delta \ge 0$。
$$
\begin{aligned}
2^2 - 4(1)(k) &\ge 0 \\
4 - 4k &\ge 0 \\
k &\le 1
\end{aligned}
$$
注意：当 $\Delta = 0$ 时也是有实数根的（重根）。
</details>
