---
title: 第二十一章 曲线积分 (Line Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第二十一章 曲线积分

曲线积分是微积分学从区间走向空间的里程碑。它不仅是定积分的直接推广，更是描述力场做功、流体环量等物理现象的核心数学工具。本章将对标《数学分析》Ch 21，构建从定义、计算到格林公式的完整理论链条。

## 一、 第一类曲线积分：对弧长的积分

### 1. 定义与几何直观
设 $L$ 为空间段光滑曲线，其长度为 $s$。若 $f(P)$ 是定义在 $L$ 上的连续函数，则其对弧长的曲线积分为：
$$\int_L f(P) ds = \lim_{\|\Delta s_i\| \to 0} \sum_{i=1}^n f(P_i) \Delta s_i$$
- **几何意义**：若 $f(P) \equiv 1$，则积分等于曲线 $L$ 的长度。
- **物理意义**：若 $f(P)$ 为线密度，则积分为物体的总质量。
- **独立性**：第一类曲线积分与曲线的方向无关（其元素 $ds$ 始终为正）。

### 2. 计算法则
若 $L$ 由参数方程 $\mathbf{r}(t) = (x(t), y(t), z(t))$ ($a \le t \le b$) 给出：
$$\int_L f(x, y, z) ds = \int_a^b f(x(t), y(t), z(t)) \sqrt{x'^2(t) + y'^2(t) + z'^2(t)} dt$$

---

## 二、 第二类曲线积分：对坐标的积分

### 1. 物理背景：变力做功
设向量场 $\mathbf{F}(P) = (P, Q, R)$ 作用于沿有向曲线 $L$ 运动的质点。则 $\mathbf{F}$ 在微小位移 $d\mathbf{r} = (dx, dy, dz)$ 上做的功为 $dW = \mathbf{F} \cdot d\mathbf{r}$。总功即为：
$$W = \int_L \mathbf{F} \cdot d\mathbf{r} = \int_L P dx + Q dy + R dz$$

### 2. 性质与计算
- **方向性**：第二类曲线积分依赖于 $L$ 的方向。若 $\Gamma^-$ 为 $\Gamma^+$ 的反向曲线，则 $\int_{\Gamma^-} = -\int_{\Gamma^+}$。
- **计算公式**：代入参数方程，将所有坐标及其微分化为参数 $t$ 的函数：
  $$\int_L \mathbf{F} \cdot d\mathbf{r} = \int_a^b [P(x(t), \dots)x'(t) + Q(x(t), \dots)y'(t) + R(x(t), \dots)z'(t)] dt$$

---

## 三、 格林公式与平面环量密度

格林公式是平面微积分的灵魂，它揭示了“局部旋转”与“边界环流”之间的等价性。

### 1. 格林公式 (Green's Theorem)
设 $D$ 是平面闭区域，其边界 $L$ 是正向分段光滑闭曲线。若 $P, Q$ 在 $D$ 上具有一阶连续偏导数，则：
$$\oint_L P dx + Q dy = \iint_D \left( \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right) dA$$

### 2. 物理内涵：环量密度
在流体力学中，$\oint_L \mathbf{V} \cdot d\mathbf{r}$ 称为流速场沿 $L$ 的**环量** (Circulation)。
- 表达式 $(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y})$ 代表了场在点 $(x, y)$ 处的**旋转强度**（即旋度的 $z$ 分量）。
- **格林公式直观理解**：区域内所有微小单元产生的“旋转”在内部相互抵消，最终只剩下边界上的“宏观环流”。

---

## 四、 综合例题：环量与做功 (Textbook Level)

### 例题 1：星形线的环量计算
计算向量场 $\mathbf{F} = (-y, x)$ 沿星形线 $L: x = a \cos^3 t, y = a \sin^3 t$ ($0 \le t \le 2\pi$) 的环量。

<details>

<summary>解析过程</summary>

**方法一：直接法**
1. $dx = -3a \cos^2 t \sin t dt, dy = 3a \sin^2 t \cos t dt$。
2. $\oint_L -y dx + x dy = \int_0^{2\pi} [-a \sin^3 t (-3a \cos^2 t \sin t) + a \cos^3 t (3a \sin^2 t \cos t)] dt$
3. $= 3a^2 \int_0^{2\pi} (\sin^4 t \cos^2 t + \cos^4 t \sin^2 t) dt = 3a^2 \int_0^{2\pi} \sin^2 t \cos^2 t dt$
4. $= \frac{3a^2}{4} \int_0^{2\pi} \sin^2 2t dt = \frac{3\pi a^2}{4}$。

**方法二：格林公式**
1. $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 1 - (-1) = 2$。
2. $\oint_L \mathbf{F} \cdot d\mathbf{r} = \iint_D 2 dA = 2 \text{Area}(D)$。
3. 星形线面积 $A = \frac{3}{8}\pi a^2$，故结果为 $2 \cdot \frac{3}{8}\pi a^2 = \frac{3\pi a^2}{4}$。

**答案**：$\frac{3}{4}\pi a^2$

</details>

### 例题 2：非单连通区域的路径无关性
设 $\mathbf{F} = \left( \frac{-y}{x^2+y^2}, \frac{x}{x^2+y^2} \right)$。证明其在除原点外的区域满足 $\frac{\partial Q}{\partial x} = \frac{\partial P}{\partial y}$，并计算沿包围原点的任意正向闭曲线 $L$ 的环量。

<details>

<summary>解析过程</summary>

1. **验证偏导**：经计算，在 $(x,y) \neq (0,0)$ 时，$\frac{\partial Q}{\partial x} = \frac{y^2-x^2}{(x^2+y^2)^2} = \frac{\partial P}{\partial y}$。
2. **处理奇点**：由于原点是奇点，格林公式不能直接应用于包围原点的区域。取一个极小圆 $C_\epsilon: x^2+y^2 = \epsilon^2$。
3. **由广义格林公式**：$\oint_L = \oint_{C_\epsilon}$。
4. **计算小圆积分**：令 $x = \epsilon \cos t, y = \epsilon \sin t$。
   $\oint_{C_\epsilon} \frac{-y dx + x dy}{x^2+y^2} = \int_0^{2\pi} \frac{\epsilon^2(\sin^2 t + \cos^2 t)}{\epsilon^2} dt = 2\pi$。

**答案**：$2\pi$（此为复变积分中留数定理的雏形）。

</details>

### 例题 3：变力沿空间曲线做功
计算变力 $\mathbf{F} = (y-z, z-x, x-y)$ 沿圆柱螺旋线 $\Gamma: x=a \cos t, y=a \sin t, z=bt$ ($0 \le t \le 2\pi$) 做的功。

<details>

<summary>解析过程</summary>

1. $dx = -a \sin t dt, dy = a \cos t dt, dz = b dt$。
2. 代入积分：$W = \int_0^{2\pi} [(a \sin t - bt)(-a \sin t) + (bt - a \cos t)(a \cos t) + (a \cos t - a \sin t)b] dt$
3. 展开化简：$-a^2 \sin^2 t + abt \sin t + abt \cos t - a^2 \cos^2 t + ab \cos t - ab \sin t$。
4. 积分各项：
   - $\int_0^{2\pi} -a^2 dt = -2\pi a^2$。
   - $\int_0^{2\pi} abt \sin t dt = [-abt \cos t]_0^{2\pi} + \int ab \cos t dt = -2\pi ab$。
   - $\int_0^{2\pi} abt \cos t dt = [abt \sin t]_0^{2\pi} - \int ab \sin t dt = 0$。
   - 常系数三角函数积分为 0。
5. 总功 $W = -2\pi a^2 - 2\pi ab = -2\pi a(a+b)$。

**答案**：$-2\pi a(a+b)$

</details>

### 例题 4：保守场与势函数
已知 $\mathbf{F} = (2xy+z^2, x^2+2yz, y^2+2xz)$，证明该场为保守场，并求从 $A(0,0,0)$ 到 $B(1,1,1)$ 的线积分。

<details>

<summary>解析过程</summary>

1. **验证旋度**：计算 $\text{curl } \mathbf{F} = (2y-2y, 2z-2z, 2x-2x) = (0,0,0)$。故 $\mathbf{F}$ 是保守场。
2. **求势函数 $u$**：
   - $\frac{\partial u}{\partial x} = 2xy+z^2 \implies u = x^2y + xz^2 + \phi(y, z)$。
   - $\frac{\partial u}{\partial y} = x^2 + \frac{\partial \phi}{\partial y} = x^2 + 2yz \implies \phi = y^2z + \psi(z)$。
   - $\frac{\partial u}{\partial z} = 2xz + y^2 + \psi'(z) = y^2 + 2xz \implies \psi'(z) = 0$。
   - 取 $u = x^2y + y^2z + z^2x$。
3. **计算积分**：$\int_A^B \mathbf{F} \cdot d\mathbf{r} = u(1,1,1) - u(0,0,0) = 1+1+1 = 3$。

**答案**：3

</details>

---

<SupportingExercises 
  topic="曲线积分" 
  exercises={[
    { index: 140, title: "第一类曲线积分", slug: "练习-140第一类曲线积分" },
    { index: 141, title: "第二类曲线积分参数法", slug: "练习-141第二类曲线积分参数法" },
    { index: 142, title: "保守场路径无关", slug: "练习-142保守场路径无关" },
    { index: 143, title: "格林公式求面积", slug: "练习-143格林公式求面积" },
    { index: 144, title: "平面环量计算", slug: "练习-144平面环量计算" },
    { index: 145, title: "空间曲线做功", slug: "练习-145空间曲线做功" },
    { index: 146, title: "非单连通区域环量", slug: "练习-146非单连通区域环量" },
    { index: 147, title: "格林公式逆向构造", slug: "练习-147格林公式逆向构造" }
  ]} 
/>

---
*编者注：格林公式本质上是二维空间下的微积分基本定理。它告诉我们，内部的“旋涡”总量完全可以通过观察边界上的“流动”来确定。*
