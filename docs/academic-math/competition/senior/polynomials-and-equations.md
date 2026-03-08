---
title: 竞赛代数：多项式与代数方程
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛代数：多项式与代数方程

高中竞赛中的“多项式题”通常不是纯计算，而是围绕根与系数关系、整系数约束、构造分解与函数代换展开。

## 一、核心知识点讲解

### 1. 根与系数（Vieta）与对称表达
设
$$
P(x)=x^n+a_{n-1}x^{n-1}+\cdots+a_0
$$
的根为 $r_1,\dots,r_n$，则
$$
\sum r_i=-a_{n-1},\quad \sum_{i<j}r_ir_j=a_{n-2},\ \dots,\ \prod r_i=(-1)^na_0.
$$
对称式优先转为初等对称多项式，避免直接“猜根”。

### 2. 因式定理与重根判别
- 因式定理：$P(\alpha)=0 \Leftrightarrow (x-\alpha)\mid P(x)$。
- 重根判别：$\alpha$ 为重根 $\Leftrightarrow P(\alpha)=0$ 且 $P'(\alpha)=0$。
- 竞赛中常配合 $\gcd(P,P')$ 判断重根结构。

### 3. 整系数多项式常用工具
- 有理根定理：若 $p/q$（既约）是整系数多项式根，则 $p\mid a_0,\ q\mid a_n$。
- 模运算筛选：先在模 $m$ 下判断是否可能有整数根。
- 代入构造：通过 $x\mapsto x\pm1,\ 1/x,\ x+1/x$ 简化结构。

### 4. 方程与函数图像的联动
代数方程根的个数常可通过：
- 单调性与导数判号；
- 凸凹性与切线估计；
- 变量替换后转化为标准函数零点问题。

<KnowledgeCard type="tip" title="解题策略">
先判“结构”：对称、倒数、齐次、递推；再选“工具”：Vieta、因式分解、导数单调、模运算。不要一开始就盲目展开。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：Vieta 反向构造
已知实数 $x,y$ 满足
$$
x+y=5,\quad xy=6,
$$
求以 $x,y$ 为根的首一二次多项式。

<details>

<summary>点击查看解析与答案</summary>

设所求为
$$
P(t)=t^2-st+p.
$$
由 Vieta 得 $s=x+y=5,\ p=xy=6$，故
$$
P(t)=t^2-5t+6.
$$

</details>

### 例题 2：有理根定理筛选
求方程
$$
x^3-4x^2+x+6=0
$$
的所有有理根。

<details>

<summary>点击查看解析与答案</summary>

候选有理根为 $\pm1,\pm2,\pm3,\pm6$。代入得
$$
P(2)=8-16+2+6=0.
$$
故 $(x-2)$ 为因子。多项式除法：
$$
x^3-4x^2+x+6=(x-2)(x^2-2x-3)=(x-2)(x-3)(x+1).
$$
所以有理根为 $2,3,-1$。

</details>

### 例题 3：重根判别
求参数 $k$，使
$$
P(x)=x^3-3x+k
$$
有重根。

<details>

<summary>点击查看解析与答案</summary>

重根 $\alpha$ 满足
$$
P(\alpha)=0,\quad P'(\alpha)=0.
$$
先算
$$
P'(x)=3x^2-3=3(x^2-1),
$$
故 $\alpha=\pm1$。代回：
- $\alpha=1$：$1-3+k=0\Rightarrow k=2$；
- $\alpha=-1$：$-1+3+k=0\Rightarrow k=-2$。

故 $k=\pm2$。

</details>

### 例题 4：代换降阶
解方程
$$
x^4-5x^2+4=0.
$$

<details>

<summary>点击查看解析与答案</summary>

设 $u=x^2$，得
$$
u^2-5u+4=0\Rightarrow (u-1)(u-4)=0.
$$
故 $u=1$ 或 $u=4$，即
$$
x=\pm1,\ \pm2.
$$

</details>

### 例题 5：倒数结构方程
解方程
$$
x+\frac1x=3,\quad x\ne0.
$$

<details>

<summary>点击查看解析与答案</summary>

两边乘 $x$：
$$
x^2-3x+1=0.
$$
解得
$$
x=\frac{3\pm\sqrt5}{2}.
$$

</details>

---

## 三、配套练习（章节内）

### 练习 1（基础）
设方程 $t^2-7t+10=0$ 的两根为 $\alpha,\beta$，求 $\alpha+\beta,\alpha\beta$。

<details>

<summary>点击查看过程与答案</summary>

由 Vieta：
$$
\alpha+\beta=7,\quad \alpha\beta=10.
$$

</details>

### 练习 2（提高）
判断 $x^3+x+1=0$ 是否有整数根。

<details>

<summary>点击查看过程与答案</summary>

整数根只能是 $\pm1$。代入：
$$
P(1)=3\ne0,\quad P(-1)=-1\ne0.
$$
故无整数根。

</details>

### 练习 3（提高）
求参数 $m$，使 $x^2-2mx+m^2-1=0$ 有重根。

<details>

<summary>点击查看过程与答案</summary>

判别式
$$
\Delta=(2m)^2-4(m^2-1)=4.
$$
恒为 4，不可能为 0，因此不存在使其有重根的 $m$。

</details>

### 练习 4（挑战）
解方程
$$
x^2+\frac1{x^2}=7,\quad x\ne0.
$$

<details>

<summary>点击查看过程与答案</summary>

设 $y=x+\frac1x$，则
$$
y^2=x^2+2+\frac1{x^2}=9\Rightarrow y=\pm3.
$$
分别解
$$
x+\frac1x=3\Rightarrow x^2-3x+1=0\Rightarrow x=\frac{3\pm\sqrt5}{2},
$$
$$
x+\frac1x=-3\Rightarrow x^2+3x+1=0\Rightarrow x=\frac{-3\pm\sqrt5}{2}.
$$
共 4 个实根。

</details>
