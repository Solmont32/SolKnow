---
title: 导数与微分：瞬时变化的数学显微镜 (Derivatives and Differentials)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 导数与微分：瞬时变化的数学显微镜

微积分的核心思想是以直代曲、以恒定代变化。导数正是寻找这条“切线”的工具，而微分则是利用这条切线进行局部线性逼近的理论基础。本章从定义出发，系统梳理求导法则、高阶导数与典型证明技巧。

## 一、 导数与微分的核心理论

### 1. 导数的严格定义

设函数 $y = f(x)$ 在点 $x_0$ 的某个邻域内有定义。当自变量 $x$ 在 $x_0$ 处取得增量 $\Delta x$ 时，相应的函数取得增量 $\Delta y = f(x_0 + \Delta x) - f(x_0)$。
如果 $\Delta y$ 与 $\Delta x$ 之比当 $\Delta x \to 0$ 时的极限存在，则称函数 $f(x)$ 在点 $x_0$ 处可导，并称这个极限为函数 $f(x)$ 在点 $x_0$ 处的导数，记为 $f'(x_0)$：

$$f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x} = \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}$$

可导必连续，但连续不一定可导。例如 $f(x) = |x|$ 在 $x=0$ 处连续，但左右导数不相等。

### 2. 微分与线性主部

若函数在点 $x_0$ 处满足

$$\Delta y = A\Delta x + o(\Delta x),$$

则称函数在该点可微，且 $A\Delta x$ 称为微分，记作 $dy$。一元情形下可导与可微等价，并有

$$dy = f'(x_0)dx.$$

这意味着当 $\Delta x$ 很小时，函数真实增量 $\Delta y$ 可由线性近似 $dy$ 高精度替代。

### 3. 高阶导数与莱布尼茨公式

若 $f'(x)$ 可导，则定义二阶导数 $f''(x)$，依此得到 $n$ 阶导数 $f^{(n)}(x)$。对乘积函数有

$$(uv)^{(n)} = \sum_{k=0}^{n} \binom{n}{k}u^{(n-k)}v^{(k)}.$$

---

## 二、 典型例题（定义法、法则法、参数法）

### 例题 1：定义法判定可导性

设

$$

f(x)=
\begin{cases}
x^2\sin\frac{1}{x}, & x\ne 0,\\
0, & x=0.
\end{cases}


$$

求 $f'(0)$，并判断 $f'$ 在 $0$ 点连续性。

<details>

<summary>点击查看解析与答案</summary>

$$

f'(0)=\lim_{x\to 0}\frac{x^2\sin(1/x)}{x}=\lim_{x\to 0}x\sin(1/x)=0.


$$

当 $x\ne 0$ 时，

$$

f'(x)=2x\sin\frac1x-\cos\frac1x.


$$

第一项趋于 $0$，第二项振荡无极限，因此 $\lim_{x\to0}f'(x)$ 不存在。

答案：$f'(0)=0$，但 $f'$ 在 $0$ 处不连续。

</details>

### 例题 2：对数求导与参数函数

设 $y=(x^2+1)^x$（$x>-1$），求 $y'$。

<details>

<summary>点击查看解析与答案</summary>

取对数：$\ln y=x\ln(x^2+1)$。

两边求导：

$$

\frac{y'}{y}=\ln(x^2+1)+x\cdot\frac{2x}{x^2+1}.


$$

故

$$

y'=(x^2+1)^x\left[\ln(x^2+1)+\frac{2x^2}{x^2+1}\right].


$$

</details>

### 例题 3：高阶导数模板

求 $y=x^2e^{2x}$ 的 $n$ 阶导数。

<details>

<summary>点击查看解析与答案</summary>

令 $u=e^{2x},v=x^2$，由莱布尼茨公式：

$$

y^{(n)}=\binom{n}{0}u^{(n)}v+\binom{n}{1}u^{(n-1)}v'+\binom{n}{2}u^{(n-2)}v''.


$$

因 $v^{(k)}=0\,(k\ge 3)$，只保留三项，化简得

$$

y^{(n)}=2^{n-2}e^{2x}[4x^2+4nx+n(n-1)].


$$

</details>

### 例题 4：微分近似与误差阶

估算 $\sqrt{4.1}$，并给出一阶线性近似。

<details>

<summary>点击查看解析与答案</summary>

设 $f(x)=\sqrt{x}$，在 $x_0=4$ 处：

$$

f(4)=2,\quad f'(4)=\frac{1}{4}.


$$

取 $\Delta x=0.1$，则

$$

\Delta y\approx dy=f'(4)\Delta x=\frac14\cdot0.1=0.025.


$$

故

$$

\sqrt{4.1}=f(4.1)\approx f(4)+dy=2.025.


$$

</details>

---

## 三、 配套练习（折叠答案）

### 练习 1：分段函数可导判定

设

$$

f(x)=\begin{cases}
ax+b, & x\ge 1,\\
\ln x, & 0<x<1,
\end{cases}


$$

求 $a,b$ 使得 $f$ 在 $x=1$ 处可导。

<details>

<summary>点击查看过程与答案</summary>

连续给出 $a+b=\ln1=0$，故 $b=-a$。

左右导数相等：左导数 $1/x|_{x=1}=1$，右导数为 $a$，故 $a=1$。

因此 $b=-1$。

</details>

### 练习 2：反函数求导

设 $y=x+\ln x$（$x>0$）定义反函数 $x=\varphi(y)$，求 $\varphi'(0)$。

<details>

<summary>点击查看过程与答案</summary>

先解 $y=0$ 对应点：$x+\ln x=0$，显然 $x=1$。

由反函数求导公式

$$

\varphi'(y_0)=\frac{1}{f'(x_0)},\quad f'(x)=1+\frac1x.


$$

故

$$

\varphi'(0)=\frac{1}{1+1}=\frac12.


$$

</details>

### 练习 3：高阶导数

求 $y=e^{x}\sin x$ 的 $n$ 阶导数通项。

<details>

<summary>点击查看过程与答案</summary>

用复数法：$e^x\sin x=\Im\,e^{(1+i)x}$。

$$

y^{(n)}=\Im\,(1+i)^n e^{(1+i)x}=2^{n/2}e^x\sin\left(x+\frac{n\pi}{4}\right).


$$

</details>

### 练习 4：微分近似

用微分估算 $\sqrt[3]{8.2}$。

<details>

<summary>点击查看过程与答案</summary>

设 $f(x)=x^{1/3}$，取 $x_0=8$，$f(8)=2$，$f'(x)=\frac{1}{3x^{2/3}}$，故 $f'(8)=\frac1{12}$。

$\Delta x=0.2$，则 $dy\approx\frac1{12}\cdot0.2=\frac1{60}\approx0.01667$。

所以 $\sqrt[3]{8.2}\approx2.01667$。

</details>

---

## 四、 章节联动练习入口

- [导数与中值定理专题练习（新）](../../exercises/math/analysis-derivatives-mean-value.md)
- [数学分析综合练习库](../../exercises/math/analysis.md)

---

_编者注：导数的学习关键不在公式记忆，而在“定义、运算、近似、证明”四条线并行训练。_
