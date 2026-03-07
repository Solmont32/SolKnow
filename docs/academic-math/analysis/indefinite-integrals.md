---
title: 不定积分：寻找反导数的艺术 (Indefinite Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 不定积分：寻找反导数的艺术

如果说微分是把一个复杂的整体拆解为无穷小的碎片，那么积分就是将这些碎片重新拼装。不定积分作为求导的逆运算，是整个积分学的基石。与求导的机械化法则不同，求不定积分是一项充满创造性和试错的“艺术”。

## 一、 核心理论与基本方法

### 1. 原函数与不定积分的定义
**原函数**：如果在区间 $I$ 上，对于任意 $x$ 都有 $F'(x) = f(x)$ 或 $dF(x) = f(x)dx$，则称 $F(x)$ 为 $f(x)$ 在该区间上的一个原函数。
**不定积分**：函数 $f(x)$ 的所有原函数的全体称为 $f(x)$ 的不定积分，记作：
$$\int f(x) dx = F(x) + C$$
其中 $\int$ 是积分号，$f(x)$ 是被积函数，$C$ 是任意常数。

**核心性质**：
- $(\int f(x) dx)' = f(x)$
- $\int F'(x) dx = F(x) + C$
- 线性性质：$\int [a f(x) + b g(x)] dx = a \int f(x) dx + b \int g(x) dx$

### 2. 第一类换元法（凑微分法）
这是最常用的积分技巧，核心思想是将积分变量与被积函数的一部分结合，凑成一个新变量的微分。
**公式**：若 $\int f(u) du = F(u) + C$，则：
$$\int f(\phi(x)) \phi'(x) dx = \int f(\phi(x)) d(\phi(x)) = F(\phi(x)) + C$$
**常见凑微分类型**：
- $x dx = \frac{1}{2} d(x^2)$
- $\frac{1}{x} dx = d(\ln|x|)$
- $\cos x dx = d(\sin x)$
- $e^x dx = d(e^x)$

### 3. 第二类换元法 (Integration by Substitution)
当凑微分法失效，特别是遇到复杂的根式或分式时，我们主动引入一个新变量 $x = \psi(t)$。
**常用代换类型**：
1. **三角代换**：
   - 遇到 $\sqrt{a^2 - x^2}$，令 $x = a \sin t$。
   - 遇到 $\sqrt{x^2 + a^2}$，令 $x = a \tan t$。
   - 遇到 $\sqrt{x^2 - a^2}$，令 $x = a \sec t$。
2. **倒代换 ($x = 1/t$)**：常用于分母次数显著高于分子的情形。
3. **根式代换**：令 $t = \sqrt[n]{ax+b}$ 或 $t = \sqrt[n]{\frac{ax+b}{cx+d}}$ 消去根号。

### 4. 分部积分法 (Integration by Parts)
源于乘积的求导法则 $(uv)' = u'v + uv'$。
**公式**：
$$\int u dv = uv - \int v du$$
**核心技巧**：
- **LIATE 法则**：优先选反对幂三指作为 $u$。
- **循环型**：如 $\int e^{ax} \sin bx dx$，需两次分部积分后移项求解。
- **递推型**：用于求解含 $n$ 次幂的积分（如 $I_n = \int \sin^n x dx$）。

<KnowledgeCard type="warning" title="原函数存在定理">
并非所有函数都有原函数。**连续函数一定有原函数**。但即便有原函数，也未必能用“初等函数”表示出来（如 $\int e^{-x^2} dx, \int \frac{\sin x}{x} dx$ 等著名的“积不出”函数）。
</KnowledgeCard>

---

## 二、 有理函数与特殊函数积分技巧

### 1. 有理函数积分 (Rational Functions)
对于 $R(x) = \frac{P(x)}{Q(x)}$：
1. **化为真分式**：若 $\deg(P) \ge \deg(Q)$，先进行多项式除法。
2. **部分分式分解**：根据 $Q(x)$ 的因式分解（实数域内必可分解为一次项与二次项之积）：
   - $\frac{1}{(x-a)^k} \to \frac{A_1}{x-a} + \dots + \frac{A_k}{(x-a)^k}$
   - $\frac{Mx+N}{(x^2+px+q)^k} \to$ 利用配方化为 $\int \frac{dt}{(t^2+1)^k}$ 类型。

### 2. 三角函数有理式 (Universal Substitution)
对于 $\int R(\sin x, \cos x) dx$，引入**万能代换** $t = \tan \frac{x}{2}$：
- $\sin x = \frac{2t}{1+t^2}, \cos x = \frac{1-t^2}{1+t^2}, dx = \frac{2 dt}{1+t^2}$

### 3. 无理函数积分 (Euler Substitutions)
对于 $\int R(x, \sqrt{ax^2+bx+c}) dx$，利用 **Euler 代换**：
1. 若 $a > 0$，令 $\sqrt{ax^2+bx+c} = \pm \sqrt{a}x + t$。
2. 若 $c > 0$，令 $\sqrt{ax^2+bx+c} = xt \pm \sqrt{c}$。
3. 若 $ax^2+bx+c = a(x-x_1)(x-x_2)$，令 $\sqrt{ax^2+bx+c} = t(x-x_1)$。

---

## 三、 深度例题：技巧的综合与对称性

### 深度例题 1：倒代换与对称构造
求不定积分：$I = \int \frac{x^2+1}{x^4+1} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
这是一个非常经典的高阶积分，利用**代数构造**。

1. **分子分母同时除以 $x^2$**：
   $$I = \int \frac{1 + \frac{1}{x^2}}{x^2 + \frac{1}{x^2}} dx$$
2. **观察分子与分母的关系**：
   注意到 $(x - \frac{1}{x})' = 1 + \frac{1}{x^2}$。
   而分母可以凑成：$x^2 + \frac{1}{x^2} = (x - \frac{1}{x})^2 + 2$。
3. **凑微分与换元**：
   令 $u = x - \frac{1}{x}$，则 $du = (1 + \frac{1}{x^2}) dx$。
   $$I = \int \frac{du}{u^2 + 2}$$
4. **回代 x**：
   $$I = \frac{1}{\sqrt{2}} \arctan \frac{x - 1/x}{\sqrt{2}} + C = \frac{1}{\sqrt{2}} \arctan \frac{x^2-1}{\sqrt{2}x} + C$$

#### 答案
$\frac{1}{\sqrt{2}} \arctan \frac{x^2-1}{\sqrt{2}x} + C$
</details>

### 深度例题 2：分部积分与方程法结合（无理函数）
求不定积分：$I = \int \sqrt{a^2 - x^2} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
除了常见的三角代换，本题也可以通过分部积分直接求解。

1. **设定分部积分项**：
   设 $u = \sqrt{a^2 - x^2}, dv = dx$。
   则 $du = \frac{-x}{\sqrt{a^2 - x^2}} dx, v = x$。
2. **应用分部积分公式**：
   $$I = x\sqrt{a^2 - x^2} + \int \frac{x^2}{\sqrt{a^2 - x^2}} dx$$
3. **分子加减 $a^2$ 构造原积分**：
   $$\int \frac{x^2}{\sqrt{a^2 - x^2}} dx = \int \frac{a^2 - (a^2 - x^2)}{\sqrt{a^2 - x^2}} dx = a^2 \int \frac{dx}{\sqrt{a^2 - x^2}} - I$$
4. **建立关于 I 的方程**：
   $$I = x\sqrt{a^2 - x^2} + a^2 \arcsin \frac{x}{a} - I$$
5. **解出 I**：
   $$I = \frac{x}{2}\sqrt{a^2 - x^2} + \frac{a^2}{2} \arcsin \frac{x}{a} + C$$

#### 答案
$\frac{x}{2}\sqrt{a^2 - x^2} + \frac{a^2}{2} \arcsin \frac{x}{a} + C$
</details>

### 深度例题 3：分部积分的嵌套与循环
求不定积分：$\int \sin(\ln x) dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
**方法一：代换后分部积分**
令 $u = \ln x, x = e^u, dx = e^u du$。
$\int e^u \sin u du$，此为典型的循环型，两次分部积分得 $\frac{e^u}{2}(\sin u - \cos u) + C$。

**方法二：直接分部积分**
设 $I = \int \sin(\ln x) dx$。
$u = \sin(\ln x), dv = dx \implies du = \frac{\cos(\ln x)}{x} dx, v = x$。
$I = x\sin(\ln x) - \int \cos(\ln x) dx$。
对 $\int \cos(\ln x) dx$ 再次分部积分：
$u = \cos(\ln x), dv = dx \implies du = -\frac{\sin(\ln x)}{x} dx, v = x$。
$\int \cos(\ln x) dx = x\cos(\ln x) + \int \sin(\ln x) dx = x\cos(\ln x) + I$。
代回原式：$I = x\sin(\ln x) - [x\cos(\ln x) + I] \implies 2I = x[\sin(\ln x) - \cos(\ln x)]$。

#### 答案
$\frac{x}{2} [\sin(\ln x) - \cos(\ln x)] + C$
</details>

### 深度例题 4：有理函数的高阶配方技巧
求不定积分：$\int \frac{dx}{(x^2+1)^2}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
这是求解 $I_n = \int \frac{dx}{(x^2+a^2)^n}$ 递推公式的基础。
1. **分子拆分**：
   $1 = (x^2+1) - x^2$。
   $\int \frac{dx}{(x^2+1)^2} = \int \frac{1}{x^2+1} dx - \int \frac{x^2}{(x^2+1)^2} dx = \arctan x - \int x \cdot \frac{x}{(x^2+1)^2} dx$。
2. **对第二项分部积分**：
   设 $u = x, dv = \frac{x}{(x^2+1)^2} dx \implies du = dx, v = -\frac{1}{2(x^2+1)}$。
   $\int \frac{x^2}{(x^2+1)^2} dx = -\frac{x}{2(x^2+1)} + \frac{1}{2} \int \frac{dx}{x^2+1} = -\frac{x}{2(x^2+1)} + \frac{1}{2}\arctan x$。
3. **合并**：
   $\arctan x - [-\frac{x}{2(x^2+1)} + \frac{1}{2}\arctan x] = \frac{1}{2}\arctan x + \frac{x}{2(x^2+1)} + C$。

#### 答案
$\frac{1}{2}\arctan x + \frac{x}{2(x^2+1)} + C$
</details>

### 深度例题 5：欧拉代换实战
求不定积分：$\int \frac{dx}{x + \sqrt{x^2+x+1}}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
根式下 $a=1>0$，采用第一类 Euler 代换。
1. **设代换**：令 $\sqrt{x^2+x+1} = t - x$。
2. **解出 x**：
   $x^2+x+1 = t^2 - 2tx + x^2 \implies x(1+2t) = t^2-1 \implies x = \frac{t^2-1}{2t+1}$。
3. **微分**：
   $dx = \frac{2t(2t+1) - 2(t^2-1)}{(2t+1)^2} dt = \frac{2t^2+2t+2}{(2t+1)^2} dt$。
4. **分母化简**：
   $x + \sqrt{x^2+x+1} = t$。
5. **代入积分**：
   $\int \frac{1}{t} \cdot \frac{2(t^2+t+1)}{(2t+1)^2} dt = \int \frac{2t^2+2t+2}{t(2t+1)^2} dt$。
   利用部分分式分解：$\frac{2t^2+2t+2}{t(2t+1)^2} = \frac{2}{t} - \frac{3}{2t+1} - \frac{3}{(2t+1)^2}$。
6. **最终结果**：
   $2\ln|t| - \frac{3}{2}\ln|2t+1| + \frac{3}{2(2t+1)} + C$。

#### 答案
$2\ln|x+\sqrt{x^2+x+1}| - \frac{3}{2}\ln|2(x+\sqrt{x^2+x+1})+1| + \frac{3}{2[2(x+\sqrt{x^2+x+1})+1]} + C$
</details>

### 深度例题 6：万能代换的精简应用
求不定积分：$\int \frac{dx}{1+\sin x + \cos x}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
令 $t = \tan \frac{x}{2}$。
1. **代换**：
   $I = \int \frac{1}{1 + \frac{2t}{1+t^2} + \frac{1-t^2}{1+t^2}} \cdot \frac{2dt}{1+t^2} = \int \frac{2 dt}{2t+2} = \ln|t+1| + C$。
2. **回代**：
   $\ln|1 + \tan \frac{x}{2}| + C$。

#### 答案
$\ln|1 + \tan \frac{x}{2}| + C$
</details>

### 深度例题 7：配方法消去交叉项
求不定积分：$\int \frac{dx}{\sin^4 x + \cos^4 x}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **同除以 $\cos^4 x$**：
   $I = \int \frac{\sec^4 x}{\tan^4 x + 1} dx = \int \frac{(1+\tan^2 x) \sec^2 x}{\tan^4 x + 1} dx$。
2. **换元**：令 $u = \tan x, du = \sec^2 x dx$。
   $I = \int \frac{1+u^2}{1+u^4} du = \int \frac{1+1/u^2}{u^2+1/u^2} du = \frac{1}{\sqrt{2}}\arctan \frac{u-1/u}{\sqrt{2}} + C$。
3. **回代**：
   $\frac{1}{\sqrt{2}}\arctan \frac{\tan x - \cot x}{\sqrt{2}} + C$。

#### 答案
$\frac{1}{\sqrt{2}}\arctan \frac{\tan x - \cot x}{\sqrt{2}} + C$
</details>

### 深度例题 8：指数函数代换技巧
求不定积分：$\int \frac{dx}{e^{2x} + e^x - 2}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **换元**：令 $u = e^x, dx = \frac{du}{u}$。
2. **代入**：
   $\int \frac{du}{u(u+2)(u-1)} = \int (-\frac{1}{2u} + \frac{1}{6(u+2)} + \frac{1}{3(u-1)}) du$。
3. **结果**：
   $-\frac{1}{2}x + \frac{1}{6}\ln(e^x+2) + \frac{1}{3}\ln|e^x-1| + C$。

#### 答案
$-\frac{1}{2}x + \frac{1}{6}\ln(e^x+2) + \frac{1}{3}\ln|e^x-1| + C$
</details>

### 深度例题 9：递推公式的推导（分部积分）
求 $I_n = \int \sin^n x dx$ 的递推公式。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
$I_n = \int \sin^{n-1} x \sin x dx$。
设 $u = \sin^{n-1} x, dv = \sin x dx \implies du = (n-1)\sin^{n-2} x \cos x dx, v = -\cos x$。
$I_n = -\sin^{n-1} x \cos x + (n-1) \int \sin^{n-2} x \cos^2 x dx$
$I_n = -\sin^{n-1} x \cos x + (n-1) \int \sin^{n-2} x (1-\sin^2 x) dx$
$I_n = -\sin^{n-1} x \cos x + (n-1) I_{n-2} - (n-1) I_n$
$(n) I_n = -\sin^{n-1} x \cos x + (n-1) I_{n-2}$。

#### 答案
$I_n = -\frac{1}{n} \sin^{n-1} x \cos x + \frac{n-1}{n} I_{n-2}$
</details>

### 深度例题 10：特殊凑微分技巧（反比例项）
求不定积分：$\int \frac{dx}{x\sqrt{x^{2n}+1}}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **变形**：$I = \int \frac{dx}{x^{n+1}\sqrt{1+x^{-2n}}}$。
2. **换元**：令 $t = x^{-2n} + 1, dt = -2n x^{-2n-1} dx$。
   $I = -\frac{1}{2n} \int \frac{dt}{\sqrt{t}} = -\frac{1}{n} \sqrt{t} + C$。
3. **回代**：
   $-\frac{1}{n} \sqrt{x^{-2n}+1} + C = -\frac{\sqrt{x^{2n}+1}}{nx^n} + C$。

#### 答案
$-\frac{\sqrt{x^{2n}+1}}{nx^n} + C$
</details>

### 深度例题 11：分母含二次根式的倒代换
求不定积分：$\int \frac{dx}{(x+1)\sqrt{x^2+x}}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **倒代换**：令 $x+1 = 1/t, dx = -1/t^2 dt$。
2. **根式化简**：$\sqrt{x^2+x} = \sqrt{(1/t-1)^2+(1/t-1)} = \frac{\sqrt{1-t}}{t}$。
3. **代入**：$-\int \frac{dt}{\sqrt{1-t}} = 2\sqrt{1-t} + C = 2\sqrt{\frac{x}{x+1}} + C$。

#### 答案
$2\sqrt{\frac{x}{x+1}} + C$
</details>

### 深度例题 12：分部积分的隐蔽应用
求不定积分：$\int \sqrt{1+e^x} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **换元**：令 $t = \sqrt{1+e^x}, e^x = t^2-1, x = \ln(t^2-1), dx = \frac{2t}{t^2-1} dt$。
2. **代入**：$\int t \cdot \frac{2t}{t^2-1} dt = \int (2 + \frac{2}{t^2-1}) dt = 2t + \ln|\frac{t-1}{t+1}| + C$。
3. **回代**：$2\sqrt{1+e^x} + \ln\frac{\sqrt{1+e^x}-1}{\sqrt{1+e^x}+1} + C$。

#### 答案
$2\sqrt{1+e^x} + \ln\frac{\sqrt{1+e^x}-1}{\sqrt{1+e^x}+1} + C$
</details>

---

<SupportingExercises 
  topic="不定积分" 
  exercises={[
    { index: 22, title: "不定积分基础", slug: "练习-22不定积分换元法" },
    { index: 73, title: "不定积分深度技巧", slug: "练习-73不定积分深度技巧" }
  ]} 
/>

---
*编者注：不定积分是寻找反导数的艺术。掌握了不定积分，你就掌握了微积分基本定理的计算核心。*
