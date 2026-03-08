---
title: 空间曲线与曲面的微分几何 (Differential Geometry of Curves and Surfaces)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 第十七章续：空间曲线与曲面的微分几何

本章作为“多元函数微分学”的几何延伸，目标是把偏导数、梯度与参数方程转化为可计算的几何量：切向量、法向量、曲率与挠率。

<KnowledgeCard type="tip" title="本章学习主线">
先学会“参数曲线的一阶与二阶导数如何定义几何方向”，再学会“如何通过曲率/挠率刻画弯曲与扭转”，最后把思想迁移到曲面切平面与法向量计算。
</KnowledgeCard>

---

## 一、空间曲线的局部几何

设空间曲线
$$
\mathbf{r}(t)=(x(t),y(t),z(t)),\quad t\in I,
$$
并假定 $\mathbf{r}\in C^2(I)$。

### 1. 正则曲线与切向量
若对任意 $t\in I$ 都有 $\mathbf{r}'(t)\neq \mathbf{0}$，则称曲线是正则的。

- 切向量：$\mathbf{r}'(t)$
- 单位切向量：
$$
\mathbf{T}(t)=\frac{\mathbf{r}'(t)}{\|\mathbf{r}'(t)\|}
$$

对应切线方程（在 $t=t_0$ 处）：
$$
\frac{X-x(t_0)}{x'(t_0)}=\frac{Y-y(t_0)}{y'(t_0)}=\frac{Z-z(t_0)}{z'(t_0)}.
$$

### 2. 法平面
过点 $\mathbf{r}(t_0)$ 且法向量为 $\mathbf{r}'(t_0)$ 的平面称法平面：
$$
\mathbf{r}'(t_0)\cdot\big((X,Y,Z)-\mathbf{r}(t_0)\big)=0.
$$

### 3. 弧长参数
从 $t=a$ 到 $t$ 的弧长为
$$
s(t)=\int_a^t\|\mathbf{r}'(u)\|\,du.
$$
若用弧长 $s$ 参数化，则 $\|d\mathbf{r}/ds\|=1$，计算曲率时最自然。

---

## 二、Frenet 标架、曲率与挠率

设曲线足够光滑且 $\mathbf{r}'\times\mathbf{r}''\neq\mathbf{0}$。

### 1. 三个单位向量
$$
\mathbf{T}=\frac{\mathbf{r}'}{\|\mathbf{r}'\|},\qquad
\mathbf{B}=\frac{\mathbf{r}'\times\mathbf{r}''}{\|\mathbf{r}'\times\mathbf{r}''\|},\qquad
\mathbf{N}=\mathbf{B}\times\mathbf{T}.
$$

### 2. 曲率
曲率定义为单位切向量关于弧长的变化率：
$$
\kappa=\left\|\frac{d\mathbf{T}}{ds}\right\|.
$$
常用参数形式：
$$
\kappa(t)=\frac{\|\mathbf{r}'(t)\times\mathbf{r}''(t)\|}{\|\mathbf{r}'(t)\|^3}.
$$

### 3. 挠率
挠率衡量曲线偏离密切平面的程度：
$$
\tau(t)=\frac{(\mathbf{r}',\mathbf{r}'',\mathbf{r}''')}{\|\mathbf{r}'\times\mathbf{r}''\|^2}.
$$
若 $\tau\equiv 0$，则曲线是平面曲线。

---

## 三、曲面的切平面与法线

### 1. 隐式曲面 $F(x,y,z)=0$
若 $F\in C^1$ 且在 $P_0(x_0,y_0,z_0)$ 有 $\nabla F(P_0)\neq\mathbf{0}$，则

- 法向量：$\mathbf{n}=\nabla F(P_0)$
- 切平面：
$$
F_x(P_0)(x-x_0)+F_y(P_0)(y-y_0)+F_z(P_0)(z-z_0)=0.
$$

### 2. 参数曲面 $\mathbf{R}(u,v)$
若
$$
\mathbf{R}(u,v)=(x(u,v),y(u,v),z(u,v)),
$$
且 $\mathbf{R}_u\times\mathbf{R}_v\neq\mathbf{0}$，则

- 法向量：$\mathbf{n}=\mathbf{R}_u\times\mathbf{R}_v$
- 切平面：
$$
\big(\mathbf{R}_u\times\mathbf{R}_v\big)\cdot\big((X,Y,Z)-\mathbf{R}(u_0,v_0)\big)=0.
$$

---

## 四、教材级例题

### 例题 1：圆柱螺旋线的曲率与挠率
设
$$
\mathbf{r}(t)=(a\cos t,a\sin t,bt),\quad a,b>0.
$$
求 $\kappa,\tau$。

<details>
<summary>点击查看解析与答案</summary>

$$
\mathbf{r}'=(-a\sin t,a\cos t,b),\quad
\mathbf{r}''=(-a\cos t,-a\sin t,0),\quad
\mathbf{r}'''=(a\sin t,-a\cos t,0).
$$

$$
\|\mathbf{r}'\|=\sqrt{a^2+b^2},\quad
\|\mathbf{r}'\times\mathbf{r}''\|=a\sqrt{a^2+b^2}.
$$

因此
$$
\kappa=\frac{a}{a^2+b^2}.
$$

再算混合积
$$
(\mathbf{r}',\mathbf{r}'',\mathbf{r}''')=a^2b,
$$
故
$$
\tau=\frac{b}{a^2+b^2}.
$$

结论：曲率与挠率均为常数。
</details>

### 例题 2：平面曲线的挠率为零
设
$$
\mathbf{r}(t)=(t,t^2,0).
$$
求 $\kappa,\tau$ 并解释几何意义。

<details>
<summary>点击查看解析与答案</summary>

$$
\mathbf{r}'=(1,2t,0),\quad \mathbf{r}''=(0,2,0),\quad \mathbf{r}'''=(0,0,0).
$$

$$
\mathbf{r}'\times\mathbf{r}''=(0,0,2),\quad
\|\mathbf{r}'\|=(1+4t^2)^{1/2}.
$$

故
$$
\kappa(t)=\frac{2}{(1+4t^2)^{3/2}},\qquad
\tau(t)=0.
$$

几何解释：整条曲线位于平面 $z=0$，不存在“扭出平面”的趋势。
</details>

### 例题 3：隐式曲面的切平面与法线
求球面
$$
x^2+y^2+z^2=9
$$
在点 $P(1,2,2)$ 处的切平面与法线。

<details>
<summary>点击查看解析与答案</summary>

令 $F(x,y,z)=x^2+y^2+z^2-9$，则
$$
\nabla F=(2x,2y,2z),\quad \nabla F(P)=(2,4,4).
$$

切平面：
$$
2(x-1)+4(y-2)+4(z-2)=0
\iff x+2y+2z=9.
$$

法线（参数式）：
$$
(x,y,z)=(1,2,2)+\lambda(2,4,4),\ \lambda\in\mathbb{R}.
$$
</details>

### 例题 4：参数曲面的切平面
设
$$
\mathbf{R}(u,v)=(u\cos v,u\sin v,u^2).
$$
求点 $(1,0,1)$ 处切平面。

<details>
<summary>点击查看解析与答案</summary>

点 $(1,0,1)$ 对应 $(u,v)=(1,0)$。

$$
\mathbf{R}_u=(\cos v,\sin v,2u),\quad
\mathbf{R}_v=(-u\sin v,u\cos v,0).
$$

在 $(1,0)$ 处：
$$
\mathbf{R}_u=(1,0,2),\quad \mathbf{R}_v=(0,1,0).
$$

法向量
$$
\mathbf{n}=\mathbf{R}_u\times\mathbf{R}_v=(-2,0,1).
$$

故切平面为
$$
-2(x-1)+0(y-0)+(z-1)=0
\iff z=2x-1.
$$
</details>

---

## 五、配套练习（建议先独立完成）

- **专题练习页**：[`微分几何专题练习（含折叠解析）`](/docs/exercises/math/analysis-differential-geometry)
- 也可在总练习库继续训练：[`数学分析练习库`](/docs/exercises/math/analysis)

---

*编者注：本章核心不是“背公式”，而是识别“导数对象的几何含义”。当你能把 $\mathbf{r}',\mathbf{r}'',\nabla F,\mathbf{R}_u\times\mathbf{R}_v$ 快速翻译成几何语言，微分几何就真正入门了。*
