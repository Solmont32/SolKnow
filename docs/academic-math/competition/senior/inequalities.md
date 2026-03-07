---
title: 竞赛代数：常用不等式专题
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛代数：常用不等式专题

不等式是高中数竞中变化最丰富、技巧性最强的板块。

## 1. 柯西不等式 (Cauchy-Schwarz Inequality)
对于实数 $a_i, b_i$：
$$(\sum a_i^2)(\sum b_i^2) \ge (\sum a_i b_i)^2$$
等号成立条件：$a_i$ 与 $b_i$ 成比例。

## 2. 均值不等式 (AM-GM)
$$ \frac{x_1 + \dots + x_n}{n} \ge \sqrt[n]{x_1 \dots x_n} $$

<KnowledgeCard type="tip" title="技巧：配凑法">
在使用柯西不等式时，核心难点在于如何巧妙地对项进行 **配凑** 和 **拆分**。
</KnowledgeCard>

---

## 典型例题

### 例题 1：柯西不等式的灵活应用
已知 $a, b, c > 0$ 且 $a+b+c=1$。求证：$\frac{1}{a} + \frac{1}{b} + \frac{1}{c} \ge 9$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **构造项**：我们将 $a+b+c$ 看作序列 $\sqrt{a}^2, \sqrt{b}^2, \sqrt{c}^2$；将 $\frac{1}{a} + \frac{1}{b} + \frac{1}{c}$ 看作序列 $(\frac{1}{\sqrt{a}})^2, (\frac{1}{\sqrt{b}})^2, (\frac{1}{\sqrt{c}})^2$。
2. **应用柯西不等式**：
   $$(a+b+c)(\frac{1}{a} + \frac{1}{b} + \frac{1}{c}) \ge (\sqrt{a} \cdot \frac{1}{\sqrt{a}} + \sqrt{b} \cdot \frac{1}{\sqrt{b}} + \sqrt{c} \cdot \frac{1}{\sqrt{c}})^2$$
3. **简化**：
   $$(1)(\frac{1}{a} + \frac{1}{b} + \frac{1}{c}) \ge (1 + 1 + 1)^2 = 3^2 = 9$$
4. **结论**：证毕。等号成立条件为 $a=b=c=1/3$。

#### 答案
证毕。
</details>
