---
title: 整式与因式分解 (Algebraic Expressions & Factorization)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 整式与因式分解 (Algebraic Expressions & Factorization)

整式是代数学的基础，它不仅是研究方程、函数、不等式的基石，也是培养符号运算能力和逻辑思维的重要载体。

## 1. 整式的基本概念

### 1.1 单项式 (Monomial)
由数与字母的积组成的代数式称为 **单项式**。
- **系数**：单项式中的数字因数。
- **次数**：单项式中所有字母的指数之和。

### 1.2 多项式 (Polynomial)
几个单项式的和叫做 **多项式**。
- **项**：多项式中的每个单项式。
- **次数**：多项式中次数最高的项的次数。

<KnowledgeCard type="info" title="整式定义">
单项式与多项式统称为 **整式**。特别注意，分母中含有字母的式子（如 $\frac{1}{x}$）不是整式。
</KnowledgeCard>

## 2. 整式的乘法与恒等式

熟练掌握乘法公式是进行代数变形的关键。

### 2.1 平方差公式
$$ (a+b)(a-b) = a^2 - b^2 $$

### 2.2 完全平方公式
$$ (a \pm b)^2 = a^2 \pm 2ab + b^2 $$

### 2.3 立方公式 (进阶)
- **立方和**：$a^3 + b^3 = (a+b)(a^2 - ab + b^2)$
- **立方差**：$a^3 - b^3 = (a-b)(a^2 + ab + b^2)$

## 3. 因式分解 (Factorization)

把一个多项式化为几个整式的积的形式，这种变形叫做 **因式分解**。它是整式乘法的逆运算。

### 3.1 基本方法
1.  **提公因式法**：$ma + mb + mc = m(a+b+c)$。
2.  **公式法**：利用平方差、完全平方公式进行逆向变形。
3.  **十字相乘法**：针对二次项系数为 1 的三项式 $x^2 + (p+q)x + pq = (x+p)(x+q)$。
4.  **分组分解法**：通过适当分组，使每组都能提取公因式或利用公式。

<KnowledgeCard type="tip" title="分解原则">
因式分解必须进行到 **每一个多项式因式都不能再分解为止**。
</KnowledgeCard>

## 4. 启发式练习

<details>
<summary>练习 1：因式分解 $x^4 - y^4$</summary>

**解析：**
连续利用平方差公式。
$$
\begin{aligned}
x^4 - y^4 &= (x^2)^2 - (y^2)^2 \\
&= (x^2 + y^2)(x^2 - y^2) \\
&= (x^2 + y^2)(x+y)(x-y)
\end{aligned}
$$
**注意**：$x^2 + y^2$ 在实数范围内无法继续分解。
</details>

<details>
<summary>练习 2：计算 $101^2 - 99^2$</summary>

**解析：**
利用平方差公式 $a^2 - b^2 = (a+b)(a-b)$：
$$
\begin{aligned}
101^2 - 99^2 &= (101 + 99)(101 - 99) \\
&= 200 \times 2 \\
&= 400
\end{aligned}
$$
</details>

<details>
<summary>练习 3：分解因式 $x^2 - 4x + 4 - y^2$</summary>

**解析：**
观察前三项构成完全平方。
$$
\begin{aligned}
(x^2 - 4x + 4) - y^2 &= (x-2)^2 - y^2 \\
&= (x-2+y)(x-2-y)
\end{aligned}
$$
这属于 **分组分解法** 的典型应用。
</details>
