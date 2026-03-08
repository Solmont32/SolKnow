---
title: 函数列与函数项级数专题练习
---

# 函数列与函数项级数专题练习（第十三章）

本页聚焦一致收敛、Dini 定理、M-判别法与极限交换。每题均采用“点击展开过程与答案”的折叠格式。

---

## 练习 1：[基础] 点收敛与一致收敛
设 $f_n(x)=x^n$，定义域 $[0,1]$。判断是否一致收敛。

<details>

<summary>点击查看解析与答案</summary>

对 $x\in[0,1)$，$x^n\to0$；$x=1$ 时 $x^n=1$。点极限不连续，故在 $[0,1]$ 上不一致收敛。

</details>

---

## 练习 2：[基础] M-判别法
证明级数 $\sum_{n=1}^\infty \frac{\sin(nx)}{n^2}$ 在 $\mathbb{R}$ 上一致收敛。

<details>

<summary>点击查看解析与答案</summary>

有 $\left|\frac{\sin(nx)}{n^2}\right|\le\frac1{n^2}$，且 $\sum\frac1{n^2}$ 收敛。由 M-判别法得原级数一致收敛。

</details>

---

## 练习 3：[基础] Cauchy 一致收敛准则
设 $u_n(x)=\frac{x}{n(1+x^2)}$，判断 $\sum_{n=1}^\infty u_n(x)$ 在 $\mathbb{R}$ 上是否一致收敛。

<details>

<summary>点击查看解析与答案</summary>

有 $\sup_{x\in\mathbb{R}}|u_n(x)|=\frac1{2n}$。比较级数 $\sum \frac1{2n}$ 发散，因此不能由 M-判别法得一致收敛。且在 $x=1$ 时退化为 $\frac1{2n}$，原级数发散，故不存在一致收敛。

</details>

---

## 练习 4：[提高] Dini 定理应用
设 $f_n\in C[0,1]$，且 $f_n(x)\searrow f(x)$，其中 $f$ 连续。证明 $f_n\rightrightarrows f$。

<details>

<summary>点击查看解析与答案</summary>

定义域 $[0,1]$ 为紧集，函数列连续，点收敛到连续函数且点点单调。由 Dini 定理，$f_n$ 在 $[0,1]$ 上一致收敛到 $f$。

</details>

---

## 练习 5：[提高] 一致收敛与连续性
设
$$S(x)=\sum_{n=1}^\infty \frac{x^2}{(1+x^2)^n}.$$
判断该级数在 $\mathbb{R}$ 上是否一致收敛。

<details>

<summary>点击查看解析与答案</summary>

$x\neq0$ 时为几何级数，和为 1；$x=0$ 时和为 0。极限函数在 0 处不连续，但各项函数连续。若一致收敛则极限应连续，矛盾。故不一致收敛。

</details>

---

## 练习 6：[提高] 积分与极限交换
设 $f_n(x)=\frac{x}{1+n^2x^2}$，$x\in[0,1]$。求 $\lim_{n\to\infty}\int_0^1 f_n(x)\,dx$。

<details>

<summary>点击查看解析与答案</summary>

$0\le f_n(x)\le \max_{x\in[0,1]}\frac{x}{1+n^2x^2}=\frac1{2n}\to0$，故 $f_n\rightrightarrows0$。因此
$$\lim_{n\to\infty}\int_0^1f_n(x)\,dx=\int_0^1\lim_{n\to\infty}f_n(x)\,dx=0.$$

</details>

---

## 练习 7：[提高] 逐项积分
证明 $\sum_{n=1}^\infty \frac{x^n}{n^2}$ 在 $[0,1]$ 上一致收敛，并计算
$$\int_0^1\sum_{n=1}^\infty \frac{x^n}{n^2}\,dx.$$

<details>

<summary>点击查看解析与答案</summary>

$\left|\frac{x^n}{n^2}\right|\le\frac1{n^2}$，M-判别法得一致收敛，可逐项积分：
$$\int_0^1\sum_{n=1}^\infty\frac{x^n}{n^2}\,dx=\sum_{n=1}^\infty\frac{1}{n^2(n+1)}.$$

</details>

---

## 练习 8：[挑战] 非一致收敛反例
构造连续函数列 $\{g_n\}$，满足：$g_n\to0$ 点收敛，且 $\int_0^1 g_n(x)\,dx\to0$，但不一致收敛。

<details>

<summary>点击查看解析与答案</summary>

可取 $g_n(x)=x^n$。其点收敛到 0（除 $x=1$ 单点外），并且
$$\int_0^1x^n\,dx=\frac1{n+1}\to0.$$
同时 $\sup_{x\in[0,1]}|g_n(x)|=1$，故不一致收敛。

</details>

---

## 练习 9：[挑战] 导数级数辨析
设 $F_n(x)=\sum_{k=1}^n\frac{\sin(kx)}{k^2}$，讨论 $F_n'(x)$ 是否在 $[0,2\pi]$ 上一致收敛。

<details>

<summary>点击查看解析与答案</summary>

有
$$F_n'(x)=\sum_{k=1}^n\frac{\cos(kx)}{k}.$$
当 $x=0$ 时右侧变成调和级数部分和，不收敛。因此 $F_n'(x)$ 不可能一致收敛。

</details>

---

## 练习 10：[挑战] 参数级数
设
$$f(x)=\sum_{n=1}^\infty \frac{(-1)^{n-1}x}{n(1+n^2x^2)},\quad x\in\mathbb{R}.$$
讨论其在有界区间 $[-A,A]$ 上的一致收敛性。

<details>

<summary>点击查看解析与答案</summary>

对固定 $A>0$，有
$$\left|\frac{x}{n(1+n^2x^2)}\right|\le \frac{A}{n}.$$
直接比较不足以得一致收敛。利用交错结构与 Dirichlet 判别（部分和一致有界、后因子单调趋零）可得在任意有界闭区间上一致收敛。

</details>

