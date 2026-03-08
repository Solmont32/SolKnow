---
title: 微分几何专题练习
description: 面向空间曲线与曲面的教材化分层练习，含完整折叠解析
---

# 微分几何专题练习

覆盖主题：切线与法平面、曲率与挠率、隐式/参数曲面的切平面。

> 使用建议：先独立推导，再点击展开过程与答案。

---

## 一、基础题

### 练习 1：切线与法平面 {#dg-1}
设 $\mathbf{r}(t)=(t, t^2, t^3)$，求 $t=1$ 时的切线与法平面。

<details>

<summary>点击查看过程与答案</summary>

$$
\mathbf{r}(1)=(1,1,1),\quad \mathbf{r}'(t)=(1,2t,3t^2),\quad \mathbf{r}'(1)=(1,2,3).
$$

切线：
$$
\frac{x-1}{1}=\frac{y-1}{2}=\frac{z-1}{3}.
$$

法平面：
$$
(x-1)+2(y-1)+3(z-1)=0.
$$

</details>

### 练习 2：平面曲线曲率 {#dg-2}
设 $\mathbf{r}(t)=(t,\ln\cosh t,0)$，求曲率 $\kappa(t)$。

<details>

<summary>点击查看过程与答案</summary>

$$
\mathbf{r}'=(1,\tanh t,0),\quad \mathbf{r}''=(0,\operatorname{sech}^2 t,0).
$$

$$
\|\mathbf{r}'\times\mathbf{r}''\|=\operatorname{sech}^2 t,
\quad
\|\mathbf{r}'\|=\sqrt{1+\tanh^2 t}.
$$

因此
$$
\kappa(t)=\frac{\operatorname{sech}^2 t}{(1+\tanh^2 t)^{3/2}}.
$$

</details>

### 练习 3：隐式曲面切平面 {#dg-3}
设 $F(x,y,z)=x^2+2y^2+3z^2-6=0$，求点 $(1,1,1)$ 处切平面。

<details>

<summary>点击查看过程与答案</summary>

$$
\nabla F=(2x,4y,6z),\quad \nabla F(1,1,1)=(2,4,6).
$$

切平面：
$$
2(x-1)+4(y-1)+6(z-1)=0
\iff x+2y+3z=6.
$$

</details>

---

## 二、提高题

### 练习 4：螺旋线常曲率常挠率 {#dg-4}
设 $\mathbf{r}(t)=(2\cos t,2\sin t,3t)$，求 $\kappa,\tau$。

<details>

<summary>点击查看过程与答案</summary>

直接套用圆柱螺旋线公式：
$$
\kappa=\frac{a}{a^2+b^2},\quad \tau=\frac{b}{a^2+b^2}.
$$
其中 $a=2,b=3$，故
$$
\kappa=\frac{2}{13},\qquad \tau=\frac{3}{13}.
$$

</details>

### 练习 5：判定平面曲线 {#dg-5}
设
$$
\mathbf{r}(t)=(e^t,e^{-t},2).
$$
证明曲线是平面曲线并求其所在平面。

<details>

<summary>点击查看过程与答案</summary>

由第三分量恒为 2，整条曲线都满足 $z=2$，因此位于平面 $z=2$。  
也可由挠率角度：$\mathbf{r}'''$ 与前两阶导线性相关，得到 $\tau\equiv 0$。

</details>

### 练习 6：参数曲面法向量 {#dg-6}
设
$$
\mathbf{R}(u,v)=(u+v,u-v,u^2-v^2).
$$
求一般点处法向量。

<details>

<summary>点击查看过程与答案</summary>

$$
\mathbf{R}_u=(1,1,2u),\quad \mathbf{R}_v=(1,-1,-2v).
$$

$$
\mathbf{n}=\mathbf{R}_u\times\mathbf{R}_v
=\begin{vmatrix}
\mathbf{i}&\mathbf{j}&\mathbf{k}\\
1&1&2u\\
1&-1&-2v
\end{vmatrix}
=(2(v-u),2(u+v),-2).
$$

法向量可取
$$
(v-u,\,u+v,\,-1).
$$

</details>

---

## 三、挑战题

### 练习 7：由弧长定义曲率 {#dg-7}
设曲线按弧长参数 $s$ 给出，且
$$
\mathbf{T}(s)=(\cos s,\sin s,0).
$$
求曲率并恢复一条可能的曲线。

<details>

<summary>点击查看过程与答案</summary>

由定义
$$
\kappa=\left\|\frac{d\mathbf{T}}{ds}\right\|
=\|(-\sin s,\cos s,0)\|=1.
$$

又因 $\mathbf{r}'(s)=\mathbf{T}(s)$，积分得
$$
\mathbf{r}(s)=(\sin s,-\cos s,0)+\mathbf{C}.
$$
这是一条半径为 1 的圆（平移后）。

</details>

### 练习 8：二次曲面的切平面族 {#dg-8}
设曲面
$$
z=x^2+y^2.
$$
求过点 $(x_0,y_0,x_0^2+y_0^2)$ 的切平面，并说明当 $(x_0,y_0)$ 变化时斜率如何变化。

<details>

<summary>点击查看过程与答案</summary>

$$
f_x=2x,\quad f_y=2y.
$$

切平面：
$$
z-(x_0^2+y_0^2)=2x_0(x-x_0)+2y_0(y-y_0).
$$

其对 $x,y$ 的线性系数分别为 $2x_0,2y_0$，所以离原点越远，切平面越陡。

</details>

---

返回章节：[`空间曲线与曲面的微分几何`](/docs/academic-math/analysis/differential-geometry)
