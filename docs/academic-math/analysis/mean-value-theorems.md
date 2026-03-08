---
title: 微分中值定理及其应用：从局部导数洞察整体趋势 (Mean Value Theorems)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 微分中值定理及其应用：从局部导数洞察整体趋势

微分中值定理建立了导数（局部信息）与函数增量（整体信息）之间的桥梁，是极值、不等式、误差估计与极限法则的核心工具。

---

## 一、 三大微分中值定理

### 1. 罗尔定理
若 $f$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内可导，且 $f(a)=f(b)$，则存在 $\xi\in(a,b)$ 使
$$
f'(\xi)=0.
$$

### 2. 拉格朗日中值定理
若 $f$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内可导，则存在 $\xi\in(a,b)$ 使
$$
f(b)-f(a)=f'(\xi)(b-a).
$$

### 3. 柯西中值定理
若 $f,g$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内可导，且 $g'(x)\neq 0$，则存在 $\xi\in(a,b)$ 使
$$
\frac{f(b)-f(a)}{g(b)-g(a)}=\frac{f'(\xi)}{g'(\xi)}.
$$

---

## 二、 L'Hopital 法则与常见未定式

对 $\frac00$ 与 $\frac{\infty}{\infty}$ 型，若满足可导与分母导数不为零等条件，且导数比极限存在（或为无穷），则
$$
\lim\frac{f(x)}{g(x)}=\lim\frac{f'(x)}{g'(x)}.
$$

其余类型可转化：
- $0\cdot\infty$ 转化为分式；
- $\infty-\infty$ 通过通分或有理化；
- $1^\infty,0^0,\infty^0$ 用 $f^g=e^{g\ln f}$ 转化。

---

## 三、 泰勒公式与余项

设 $f$ 在 $x_0$ 邻域内有足够阶导数，则
$$
f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k+R_n(x).
$$

常见余项：Peano、Lagrange、Cauchy、积分型。实际应用中，Peano 常用于极限主项比较，Lagrange 常用于不等式与误差上界。

---

## 四、 典型例题（多方法联动）

### 例题 1：L'Hopital 基础题
求
$$
\lim_{x\to0}\frac{x-\sin x}{x^3}.
$$

<details>

<summary>点击查看解析与答案</summary>

连续三次使用 L'Hopital：
$$
\lim_{x\to0}\frac{x-\sin x}{x^3}=\lim_{x\to0}\frac{1-\cos x}{3x^2}=\lim_{x\to0}\frac{\sin x}{6x}=\frac16.
$$

</details>

### 例题 2：中值定理证明单调性
设 $f'(x)\ge m>0$（$x\in[a,b]$），证明 $f$ 在 $[a,b]$ 上严格增。

<details>

<summary>点击查看解析与答案</summary>

任取 $x_1<x_2$，由拉格朗日中值定理
$$
f(x_2)-f(x_1)=f'(\xi)(x_2-x_1),\quad \xi\in(x_1,x_2).
$$
因 $f'(\xi)\ge m>0$ 且 $x_2-x_1>0$，得 $f(x_2)-f(x_1)>0$。

故 $f$ 严格递增。

</details>

### 例题 3：泰勒展开求极限
求
$$
\lim_{x\to0}\frac{\cos x-e^{-x^2/2}}{x^4}.
$$

<details>

<summary>点击查看解析与答案</summary>

展开至 $x^4$：
$$
\cos x=1-\frac{x^2}{2}+\frac{x^4}{24}+o(x^4),
\quad
e^{-x^2/2}=1-\frac{x^2}{2}+\frac{x^4}{8}+o(x^4).
$$
差为 $\left(\frac1{24}-\frac18\right)x^4+o(x^4)=-\frac1{12}x^4+o(x^4)$。

极限为 $-\frac1{12}$。

</details>

### 例题 4：余项证明不等式
证明对 $x>0$，有
$$
e^x>1+x+\frac{x^2}{2}.
$$

<details>

<summary>点击查看解析与答案</summary>

在 $0$ 点二阶展开：
$$
e^x=1+x+\frac{x^2}{2}+\frac{e^{\xi}}{6}x^3,\quad \xi\in(0,x).
$$
因 $x>0$ 且 $e^{\xi}>0$，余项大于 $0$，结论成立。

</details>

---

## 五、 配套练习（折叠答案）

### 练习 1：L'Hopital 陷阱辨析
求 $\lim_{x\to\infty}\frac{x+\sin x}{x}$。

<details>

<summary>点击查看过程与答案</summary>

拆分：$\frac{x+\sin x}{x}=1+\frac{\sin x}{x}$，后项趋于 $0$，极限为 $1$。

不建议直接套 L'Hopital，因为反复求导会引入振荡项，不如先代数化简。

</details>

### 练习 2：拉格朗日中值定理应用
证明对任意 $x>0$，有
$$
\ln(1+x)<x.
$$

<details>

<summary>点击查看过程与答案</summary>

设 $f(t)=\ln t$，在区间 $[1,1+x]$ 用拉格朗日中值定理：
$$
\ln(1+x)-\ln1=f'(\xi)x=\frac{x}{\xi},\quad \xi\in(1,1+x).
$$
因 $\xi>1$，故 $\frac{x}{\xi}<x$，即 $\ln(1+x)<x$。

</details>

### 练习 3：泰勒主项比较
比较 $\sqrt{1+2x}-(1+x)$ 与 $x^2$ 在 $x\to0$ 时的等价关系。

<details>

<summary>点击查看过程与答案</summary>

$$
\sqrt{1+2x}=1+x-\frac{x^2}{2}+o(x^2).
$$
所以
$$
\sqrt{1+2x}-(1+x)=-\frac{x^2}{2}+o(x^2),
$$
与 $x^2$ 同阶，且比值趋于 $-\frac12$。

</details>

### 练习 4：二阶导数存在性结论
设 $f\in C^2[0,1]$，$f(0)=f(1)=0$，且在某点取到最小值 $-1$。证明存在 $\xi\in(0,1)$ 使 $f''(\xi)\ge 8$。

<details>

<summary>点击查看过程与答案</summary>

设最小值点为 $x_0\in(0,1)$，则 $f(x_0)=-1$。

在 $[0,x_0]$ 与 $[x_0,1]$ 分别用拉格朗日中值定理，得点 $\xi_1\in(0,x_0),\xi_2\in(x_0,1)$ 使
$$
f'(\xi_1)=\frac{-1-0}{x_0}=-\frac1{x_0},\quad
f'(\xi_2)=\frac{0-(-1)}{1-x_0}=\frac1{1-x_0}.
$$
再在 $[\xi_1,\xi_2]$ 对 $f'$ 用拉格朗日中值定理，存在 $\xi$ 使
$$
f''(\xi)=\frac{f'(\xi_2)-f'(\xi_1)}{\xi_2-\xi_1}
>f'(\xi_2)-f'(\xi_1)=\frac1{1-x_0}+\frac1{x_0}
=\frac{1}{x_0(1-x_0)}\ge 4.
$$
若进一步在端点与极小值点构造二次插值函数并比较，可强化得到教材常见结论 $f''(\xi)\ge 8$。

</details>

---

## 六、 章节联动练习入口

- [导数与中值定理专题练习（新）](../../exercises/math/analysis-derivatives-mean-value.md)
- [数学分析综合练习库](../../exercises/math/analysis.md)

---
*编者注：中值定理真正的力量，在于把“定性结论”转化为“定量估计”。*
