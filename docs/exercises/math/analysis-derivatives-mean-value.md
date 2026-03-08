---
title: 导数与中值定理专题练习
description: 围绕导数定义、可导可微、中值定理、L'Hopital 与 Taylor 公式的分层训练
---

# 导数与中值定理专题练习

覆盖章节：第五章《导数与微分》+ 第六章《微分中值定理及其应用》。

> 建议先做完再展开答案。

---

## 一、基础题

### 练习 1：定义求导
求 $f(x)=x^3$ 在 $x=1$ 处的导数。

<details>

<summary>点击查看过程与答案</summary>

$$
f'(1)=\lim_{h\to0}\frac{(1+h)^3-1}{h}=\lim_{h\to0}(3+3h+h^2)=3.
$$

</details>

### 练习 2：可导与连续
函数
$$
f(x)=\begin{cases}
|x|, & x\in\mathbb R
\end{cases}
$$
在 $x=0$ 是否可导？是否连续？

<details>

<summary>点击查看过程与答案</summary>

左导数为 $-1$，右导数为 $1$，不相等，因此不可导。

但 $|x|$ 在 $0$ 处连续。

</details>

### 练习 3：乘积求导
求 $y=x^2\sin x$ 的导数。

<details>

<summary>点击查看过程与答案</summary>

$$
y'=(x^2)'\sin x+x^2(\sin x)'=2x\sin x+x^2\cos x.
$$

</details>

### 练习 4：拉格朗日中值定理
证明：对任意 $a,b>0$，有
$$
|\ln a-\ln b|\le \frac{|a-b|}{\min(a,b)}.
$$

<details>

<summary>点击查看过程与答案</summary>

设 $a>b$。对 $\ln x$ 在 $[b,a]$ 用中值定理：
$$
\ln a-\ln b=\frac{a-b}{\xi},\quad \xi\in(b,a).
$$
因 $\xi\ge b=\min(a,b)$，故
$$
|\ln a-\ln b|\le \frac{|a-b|}{\min(a,b)}.
$$
$a<b$ 同理。

</details>

---

## 二、提高题

### 练习 5：L'Hopital 应用
求
$$
\lim_{x\to0}\frac{e^x-1-x}{x^2}.
$$

<details>

<summary>点击查看过程与答案</summary>

属于 $0/0$ 型：
$$
\lim_{x\to0}\frac{e^x-1-x}{x^2}
=\lim_{x\to0}\frac{e^x-1}{2x}
=\lim_{x\to0}\frac{e^x}{2}=\frac12.
$$

</details>

### 练习 6：Taylor 展开
求
$$
\lim_{x\to0}\frac{\ln(1+x)-x+\frac{x^2}{2}}{x^3}.
$$

<details>

<summary>点击查看过程与答案</summary>

$$
\ln(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}+o(x^3).
$$
故分子为 $\frac{x^3}{3}+o(x^3)$，极限为 $\frac13$。

</details>

### 练习 7：二阶导数与凸性
设 $f''(x)>0$（区间 $I$ 内），证明 $f'(x)$ 在 $I$ 上严格增。

<details>

<summary>点击查看过程与答案</summary>

任取 $x_1<x_2$。对 $f'$ 在 $[x_1,x_2]$ 用拉格朗日中值定理：
$$
f'(x_2)-f'(x_1)=f''(\xi)(x_2-x_1),\quad \xi\in(x_1,x_2).
$$
右端大于 $0$，故 $f'(x_2)>f'(x_1)$。

</details>

### 练习 8：莱布尼茨公式
求 $y=(x^2+1)e^x$ 的 $n$ 阶导数。

<details>

<summary>点击查看过程与答案</summary>

记 $u=x^2+1,v=e^x$，则 $v^{(k)}=e^x$，$u''=2,u^{(k)}=0(k\ge3)$。

$$
y^{(n)}=u\,e^x+n u' e^x+\binom{n}{2}u'' e^x
=e^x\left[x^2+1+2nx+n(n-1)\right].
$$

</details>

---

## 三、挑战题

### 练习 9：中值定理结构题
设 $f(0)=0$，且对任意 $x\in(0,1]$ 有 $0\le f'(x)\le 2f(x)+1$。证明 $f(x)\le \frac{e^{2x}-1}{2}$。

<details>

<summary>点击查看过程与答案</summary>

设 $g(x)=e^{-2x}f(x)$，则
$$
g'(x)=e^{-2x}(f'(x)-2f(x))\le e^{-2x}.
$$
积分得
$$
g(x)-g(0)\le \int_0^x e^{-2t}dt=\frac{1-e^{-2x}}{2}.
$$
因 $g(0)=0$，有
$$
f(x)=e^{2x}g(x)\le e^{2x}\cdot\frac{1-e^{-2x}}2=\frac{e^{2x}-1}{2}.
$$

</details>

### 练习 10：Taylor 余项估计
证明当 $|x|\le1$ 时，
$$
|\sin x-(x-\frac{x^3}{6})|\le \frac{|x|^5}{120}.
$$

<details>

<summary>点击查看过程与答案</summary>

对 $\sin x$ 在 0 点做 4 阶 Taylor（拉格朗日余项）：
$$
\sin x=x-\frac{x^3}{6}+\frac{\sin \xi}{5!}x^5,\quad \xi\in(0,x).
$$
因此
$$
|\sin x-(x-\frac{x^3}{6})|=\frac{|\sin\xi|}{120}|x|^5\le\frac{|x|^5}{120}.
$$

</details>

---

返回章节：
- [第五章 导数与微分](../../academic-math/analysis/derivatives.md)
- [第六章 微分中值定理及其应用](../../academic-math/analysis/mean-value-theorems.md)
