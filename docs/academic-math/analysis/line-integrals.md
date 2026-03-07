---
title: 第二十一章 曲线积分 (Line Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第二十一章 曲线积分

曲线积分是定积分在空间曲线上的推广。根据积分元素的不同，曲线积分分为两类：第一类曲线积分（对弧长）和第二类曲线积分（对坐标）。本章将详细探讨它们的定义、计算方法以及格林公式这一连接两维世界的桥梁。

## 一、 第一类曲线积分（对弧长）

### 1. 定义与几何意义
设 $f(x, y, z)$ 是定义在有界光滑曲线 $\Gamma$ 上的连续函数。将 $\Gamma$ 分割为 $n$ 个小段 $\Delta s_1, \dots, \Delta s_n$。在每段上取一点 $(\xi_i, \eta_i, \zeta_i)$，构造 Riemann 和：
$$\sum_{i=1}^n f(\xi_i, \eta_i, \zeta_i) \Delta s_i$$
当各小段长度的最大值趋于 0 时，若极限存在，则称此极限为 $f$ 在 $\Gamma$ 上的第一类曲线积分，记作 $\int_\Gamma f(x, y, z) ds$。
- **物理意义**：若 $f(x, y, z)$ 表示线密度，则积分为该曲线的总质量。
- **性质**：积分值与曲线的方向无关。

### 2. 计算公式
若曲线 $\Gamma$ 由参数方程给出：$x = x(t), y = y(t), z = z(t)$ ($\alpha \le t \le \beta$)，且 $x(t), y(t), z(t)$ 具有连续导数，则：
$$\int_\Gamma f(x, y, z) ds = \int_\alpha^\beta f(x(t), y(t), z(t)) \sqrt{x'(t)^2 + y'(t)^2 + z'(t)^2} dt$$

---

## 二、 第二类曲线积分（对坐标）

### 1. 定义与物理背景
设 $\mathbf{F} = (P, Q, R)$ 为定义在有向曲线 $\Gamma$ 上的向量场。
- **定义**：$\int_\Gamma \mathbf{F} \cdot d\mathbf{r} = \int_\Gamma P dx + Q dy + R dz$。
- **物理意义**：描述变力 $\mathbf{F}$ 沿路径 $\Gamma$ 所做的功。
- **性质**：积分值依赖于曲线的方向。若改变方向，积分值变号：$\int_{\Gamma^-} = -\int_{\Gamma^+}$。

### 2. 计算公式
若 $\Gamma$ 的参数方程为 $\mathbf{r}(t) = (x(t), y(t), z(t)), t \in [\alpha, \beta]$，方向从 $t=\alpha$ 到 $t=\beta$，则：
$$\int_\Gamma P dx + Q dy + R dz = \int_\alpha^\beta [P x'(t) + Q y'(t) + R z'(t)] dt$$

---

## 三、 格林公式 (Green's Theorem)

格林公式建立了平面闭区域上的二重积分与该区域边界上的曲线积分之间的深刻联系。

### 1. 公式内容
设 $D$ 是平面闭区域，其边界 $L$ 是分段光滑的正向（逆时针）闭曲线。若 $P, Q$ 在 $D$ 上具有一阶连续偏导数，则：
$$\oint_L P dx + Q dy = \iint_D \left( \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right) dA$$

### 2. 平面曲线积分与路径无关性
对于单连通区域 $D$，以下四个条件等价：
1. $\frac{\partial Q}{\partial x} = \frac{\partial P}{\partial y}$ 在 $D$ 内恒成立。
2. 沿 $D$ 内任意闭曲线 $L$ 的积分 $\oint_L P dx + Q dy = 0$。
3. 曲线积分 $\int_\Gamma P dx + Q dy$ 与路径无关，仅取决于起点和终点。
4. $P dx + Q dy$ 是某个函数 $u(x, y)$ 的全微分，即 $du = P dx + Q dy$。

---

## 四、 典型教材例题解析

### 例题 1：计算第一类曲线积分
计算 $\int_\Gamma (x^2 + y^2) ds$，其中 $\Gamma$ 为圆周 $x = a \cos t, y = a \sin t$ ($0 \le t \le 2\pi$)。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **求弧长元素**：
   $x'(t) = -a \sin t, y'(t) = a \cos t$。
   $ds = \sqrt{(-a \sin t)^2 + (a \cos t)^2} dt = a dt$。
2. **代入积分**：
   $\int_\Gamma (x^2 + y^2) ds = \int_0^{2\pi} (a^2 \cos^2 t + a^2 \sin^2 t) a dt$
   $= \int_0^{2\pi} a^3 dt = 2\pi a^3$。

#### 答案
$2\pi a^3$
</details>

### 例题 2：利用格林公式计算面积
利用格林公式导出平面区域 $D$ 的面积计算公式。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **设想目标**：面积 $A = \iint_D 1 dA$。
2. **选择 $P, Q$**：我们需要 $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 1$。
   可选 $P = 0, Q = x$；或 $P = -y, Q = 0$；或 $P = -\frac{1}{2}y, Q = \frac{1}{2}x$。
3. **得出公式**：
   $A = \oint_L x dy = -\oint_L y dx = \frac{1}{2} \oint_L (x dy - y dx)$。

#### 答案
$A = \frac{1}{2} \oint_L (x dy - y dx)$
</details>

---

<SupportingExercises 
  topic="曲线积分" 
  exercises={[
    { index: 7, title: "第一类曲线积分计算", slug: "练习-7第一类曲线积分计算" },
    { index: 8, title: "格林公式计算功", slug: "练习-8格林公式计算功" }
  ]} 
/>

---
*编者注：曲线积分是理解力场做功的关键。格林公式则是平面微积分中最核心的转换工具之一。*
