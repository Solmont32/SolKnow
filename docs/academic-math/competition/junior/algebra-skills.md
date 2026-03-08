---
title: 竞赛代数：高阶恒等变形与根式
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛代数：高阶恒等变形与根式

初中竞赛代数的核心在于对“结构”的敏感度，通过变换将复杂式子简单化。

## 一、核心知识点讲解

### 1. 重要恒等式与结构识别
- 平方差与完全平方：$a^2-b^2=(a-b)(a+b)$，$a^2\pm2ab+b^2=(a\pm b)^2$。
- 立方和差：$a^3\pm b^3=(a\pm b)(a^2\mp ab+b^2)$。
- 三元对称式：$(a+b+c)^2=a^2+b^2+c^2+2(ab+bc+ca)$。
- 欧拉分解：$a^3+b^3+c^3-3abc=(a+b+c)(a^2+b^2+c^2-ab-bc-ca)$。

### 2. 因式分解高阶技巧
- 分组与配方：先“凑结构”再下公式。
- 待定系数法：先猜因式形状，再对比系数。
- 轮换与对称：式子对称时，因式通常也含对称因子。
- 代值验因子：令 $a=b$、$b=c$ 等快速判断 $(a-b)$、$(b-c)$ 是否为因子。

### 3. 分式与根式化简
- 分式拆分：先做多项式除法，再部分分式。
- 有理化：分母含根式时优先乘共轭。
- 二次根式套根式：设为 $(\sqrt m\pm\sqrt n)^2$ 反推 $m+n,mn$。

<KnowledgeCard type="tip" title="解题秘籍">
看到 $a^2+b^2+c^2-ab-bc-ca$，可立刻改写为
$\frac12[(a-b)^2+(b-c)^2+(c-a)^2]$，用于非负性与最值判断。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：利用对称性分解因式
分解因式：$a(b-c)^3+b(c-a)^3+c(a-b)^3$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. 令 $a=b$，原式为 0，故 $(a-b)$ 为因子；同理 $(b-c)$、$(c-a)$ 也为因子。
2. 原式是四次轮换对称式，设
   $$a(b-c)^3+b(c-a)^3+c(a-b)^3=k(a+b+c)(a-b)(b-c)(c-a).$$
3. 取 $a=0,b=1,c=2$ 求得 $k=1$。

#### 答案
$(a+b+c)(a-b)(b-c)(c-a)$。
</details>

### 例题 2：根式的巧妙化简
化简：$\sqrt{7-4\sqrt3}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. 设 $\sqrt{7-4\sqrt3}=\sqrt{(\sqrt x-\sqrt y)^2}$。
2. 对比得 $x+y=7,\ xy=12$，可取 $(x,y)=(4,3)$。
3. 原式 $=|2-\sqrt3|=2-\sqrt3$。

#### 答案
$2-\sqrt3$。
</details>

### 例题 3：分式恒等变形
化简：
$$\frac{x^2+3x+2}{x^2-1}-\frac{2}{x-1},\quad x\ne\pm1.$$

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. 因式分解：$x^2+3x+2=(x+1)(x+2)$，$x^2-1=(x-1)(x+1)$。
2. 第一项化为 $\dfrac{x+2}{x-1}$。
3. 合并：
   $$\frac{x+2}{x-1}-\frac{2}{x-1}=\frac{x}{x-1}=1+\frac1{x-1}.$$

#### 答案
$\dfrac{x}{x-1}$（或 $1+\dfrac1{x-1}$）。
</details>

### 例题 4：换元降次
已知 $x+\frac1x=3$，求 $x^2+\frac1{x^2}$ 与 $x^3+\frac1{x^3}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. 平方：
   $$\left(x+\frac1x\right)^2=x^2+2+\frac1{x^2}=9,$$
   故 $x^2+\frac1{x^2}=7$。
2. 立方恒等式：
   $$\left(x+\frac1x\right)^3=x^3+\frac1{x^3}+3\left(x+\frac1x\right).$$
3. 代入得 $27=x^3+\frac1{x^3}+9$，故 $x^3+\frac1{x^3}=18$。

#### 答案
$x^2+\frac1{x^2}=7$，$x^3+\frac1{x^3}=18$。
</details>
