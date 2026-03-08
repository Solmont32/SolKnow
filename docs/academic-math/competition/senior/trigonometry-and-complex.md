---
title: 竞赛代数：三角与复数方法
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛代数：三角与复数方法

高中竞赛中，三角恒等变形与复数几何化是两条高频主线。核心目标是把复杂表达式变成可控结构：角度和差、模与幅角、单位圆参数化。

## 一、核心知识点讲解

### 1. 三角恒等变形的三层框架
- 第一层：和差化积、积化和差、半角与倍角。
- 第二层：同角化简，尽量将式子统一到 $\sin x,\cos x,\tan x$ 之一。
- 第三层：配合换元（如 $t=\tan\frac x2$）转为有理式求解。

### 2. 三角方程竞赛解法路线
1. 先定义域筛选。
2. 再恒等变形到“积=0”或“二次式=0”。
3. 对每个候选根做回代验根，排除增根。

### 3. 复数的几何解释
- 设 $z=x+yi$，则 $|z|$ 表示点到原点距离。
- $\arg z$ 表示向量方向角。
- 乘法对应“模相乘、角相加”，除法对应“模相除、角相减”。

### 4. 单位圆参数化与 Moivre 公式
- 单位圆点可写成 $z=\cos\theta+i\sin\theta$。
- De Moivre：
$$
(\cos\theta+i\sin\theta)^n=\cos(n\theta)+i\sin(n\theta).
$$
- 常用于求高次根、三角恒等式证明与等分圆问题。

<KnowledgeCard type="contest" title="竞赛策略">
遇到“复数 + 长度/角度”问题，先换成模与幅角；遇到“三角 + 高次幂”问题，优先考虑复指数或 De Moivre。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：三角恒等式化简
化简
$$
\frac{\sin x+\sin 3x}{\cos x+\cos 3x}.
$$

<details>

<summary>点击查看解析与答案</summary>

利用和差化积：
$$
\sin x+\sin3x=2\sin2x\cos x,\quad
\cos x+\cos3x=2\cos2x\cos x.
$$
故原式
$$
=\frac{2\sin2x\cos x}{2\cos2x\cos x}=\tan2x.
$$

</details>

### 例题 2：三角方程求解
求方程
$$
2\sin^2x-3\sin x+1=0,\quad x\in[0,2\pi).
$$

<details>

<summary>点击查看解析与答案</summary>

令 $s=\sin x$，得
$$
2s^2-3s+1=0\Rightarrow (2s-1)(s-1)=0.
$$
故 $\sin x=1$ 或 $\sin x=\frac12$。
在 $[0,2\pi)$ 上：
$$
x=\frac\pi2,\ \frac\pi6,\ \frac{5\pi}6.
$$

</details>

### 例题 3：复数模与角
设
$$
z=\frac{1+i}{1-i},
$$
求 $|z|$ 与 $\arg z$（主值）。

<details>

<summary>点击查看解析与答案</summary>

有理化：
$$
z=\frac{(1+i)^2}{1+1}=\frac{1+2i+i^2}{2}=i.
$$
故
$$
|z|=1,\quad \arg z=\frac\pi2.
$$

</details>

### 例题 4：单位圆与三次幂
设
$$
z=\cos\theta+i\sin\theta,\quad |z|=1.
$$
证明
$$
z^3+\bar z^3=2\cos3\theta.
$$

<details>

<summary>点击查看解析与答案</summary>

由 De Moivre：
$$
z^3=\cos3\theta+i\sin3\theta,\quad
\bar z^3=\cos3\theta-i\sin3\theta.
$$
两式相加即得
$$
z^3+\bar z^3=2\cos3\theta.
$$

</details>

### 例题 5：复数方程与几何
解方程
$$
z^2=1+i\sqrt3.
$$

<details>

<summary>点击查看解析与答案</summary>

写成极形式：
$$
1+i\sqrt3=2\left(\cos\frac\pi3+i\sin\frac\pi3\right).
$$
故
$$
z=\sqrt2\left(\cos\left(\frac\pi6+k\pi\right)+i\sin\left(\frac\pi6+k\pi\right)\right),\ k=0,1.
$$
即两根为
$$
z_1=\sqrt2\left(\cos\frac\pi6+i\sin\frac\pi6\right),\ 
z_2=\sqrt2\left(\cos\frac{7\pi}6+i\sin\frac{7\pi}6\right).
$$

</details>

---

## 三、章节练习（配套）

### 练习 1（基础）
化简
$$
\sin2x\cos x.
$$

<details>

<summary>点击查看过程与答案</summary>

由积化和差：
$$
\sin2x\cos x=\frac12[\sin(3x)+\sin x].
$$

</details>

### 练习 2（提高）
解方程
$$
\cos2x=\frac12,\quad x\in[0,2\pi).
$$

<details>

<summary>点击查看过程与答案</summary>

有
$$
2x=\frac\pi3,\frac{5\pi}3,\frac{7\pi}3,\frac{11\pi}3
$$
（限制在 $[0,4\pi)$），故
$$
x=\frac\pi6,\frac{5\pi}6,\frac{7\pi}6,\frac{11\pi}6.
$$

</details>

### 练习 3（提高）
设 $z=1-\sqrt3\,i$，求 $|z|$ 与主辐角。

<details>

<summary>点击查看过程与答案</summary>

$$
|z|=\sqrt{1+3}=2.
$$
点在第四象限，参考角 $\frac\pi3$，故主辐角
$$
\arg z=-\frac\pi3.
$$

</details>

### 练习 4（挑战）
求方程 $z^4=16$ 的所有复根。

<details>

<summary>点击查看过程与答案</summary>

写为
$$
16=16(\cos0+i\sin0).
$$
四次根：
$$
z_k=2\left(\cos\frac{k\pi}{2}+i\sin\frac{k\pi}{2}\right),\ k=0,1,2,3.
$$
即
$$
2,\ 2i,\ -2,\ -2i.
$$

</details>
