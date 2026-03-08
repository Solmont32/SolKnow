---
title: 无穷乘积与 Gamma 函数 (Infinite Products & Gamma Function)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 无穷乘积与 Gamma 函数

在数学分析中，无穷乘积是无穷级数的自然推广。它不仅是构造特殊函数的强大工具，也是深入理解复分析中整函数分解（Weierstrass 分解定理）的基石。本章将从无穷乘积的严密理论出发，进阶至 Gamma 函数的乘积表示及其核心解析性质。

---

## 1. 无穷乘积的严密理论

### 1.1 基本定义与敛散性
设 $\{p_n\}$ 为数列。考虑部分乘积 $P_N = \prod_{n=1}^N p_n$。

**定义 1.1**：若极限 $\lim_{N \to \infty} P_N = P$ 存在且 **$P \neq 0$**，则称无穷乘积 $\prod_{n=1}^\infty p_n$ **收敛**于 $P$。若 $P=0$ 或极限不存在，则称其发散。
> **为何排除 0？** 排除 0 是为了确保无穷乘积与其对数级数 $\sum \ln p_n$ 之间有一一对应关系。

通常令 $p_n = 1 + a_n$。收敛的必要条件是 $a_n \to 0$。

### 1.2 绝对收敛与条件收敛
**定义 1.2**：若 $\prod (1 + |a_n|)$ 收敛，则称 $\prod (1 + a_n)$ **绝对收敛**。
- **定理**：$\prod (1 + a_n)$ 绝对收敛的充要条件是级数 $\sum a_n$ 绝对收敛。
- **注意**：对于一般项 $a_n$，$\prod (1+a_n)$ 与 $\sum a_n$ 的敛散性并不总是一致。

### 1.3 函数项无穷乘积的一致收敛性
设 $u_n(x)$ 定义在集合 $D$ 上。若部分乘积 $P_N(x)$ 在 $D$ 上一致收敛于 $P(x)$ 且 $P(x)$ 无零点，则称该无穷乘积一致收敛。
- **Weierstrass 判别法**：若 $|a_n(x)| \le M_n$ 且 $\sum M_n$ 收敛，则 $\prod (1 + a_n(x))$ 在 $D$ 上绝对且一致收敛。

---

## 2. Gamma 函数的乘积构造

虽然 Gamma 函数常由积分定义，但其乘积形式揭示了其在整个复平面（除负整数点外）的解析行为。

### 2.1 Euler 乘积公式
通过对积分定义取极限，可以导出：
$$\Gamma(z) = \lim_{n \to \infty} \frac{n! n^z}{z(z+1)\dots(z+n)}$$
由此得到 **Euler 乘积形式**：
$$\Gamma(z) = \frac{1}{z} \prod_{n=1}^\infty \frac{(1+1/n)^z}{1 + z/n}$$

### 2.2 Weierstrass 乘积公式
引入 Euler-Mascheroni 常数 $\gamma = \lim_{n \to \infty} (\sum_{k=1}^n \frac{1}{k} - \ln n)$，我们可以将 $\Gamma(z)$ 表示为整函数倒数的形式：
$$\frac{1}{\Gamma(z)} = ze^{\gamma z} \prod_{n=1}^\infty \left( 1 + \frac{z}{n} \right) e^{-z/n}$$
该公式在复平面上一致收敛，且直接展示了 $\Gamma(z)$ 的极点分布在 $z = 0, -1, -2, \dots$。

<KnowledgeCard type="info" title="Bohr-Mollerup 定理">
这是 Gamma 函数唯一的公理化描述：若函数 $f(x)$ 在 $(0, \infty)$ 上满足：
1. $f(1) = 1$
2. $f(x+1) = xf(x)$
3. $\ln f(x)$ 是凸函数（对数凸性）
则 $f(x) \equiv \Gamma(x)$。
</KnowledgeCard>

---

## 3. 经典函数展开：Sine 与 Cosine

欧拉最伟大的发现之一是三角函数的无穷乘积展开，这解决了著名的巴塞尔问题。

### 3.1 正弦函数的乘积展开
$$\sin \pi z = \pi z \prod_{n=1}^\infty \left( 1 - \frac{z^2}{n^2} \right)$$
**推论 (Basel Problem)**：对比 $z^2$ 项系数，直接得 $\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6}$。

### 3.2 余弦函数的乘积展开
$$\cos \pi z = \prod_{n=1}^\infty \left( 1 - \frac{z^2}{(n-1/2)^2} \right) = \prod_{n=1}^\infty \left( 1 - \frac{4z^2}{(2n-1)^2} \right)$$

---

## 4. 深度例题详析

### 例题 1：条件收敛的精细判别
判断 $\prod_{n=1}^\infty (1 + \frac{(-1)^n}{n^p})$ 在 $p > 0$ 时的敛散性。

<details>

<summary>点击查看详细解析</summary>

#### 解析过程
考虑对数级数 $\sum \ln(1 + a_n)$，其中 $a_n = \frac{(-1)^n}{n^p}$。
利用泰勒展开：$\ln(1 + a_n) = a_n - \frac{1}{2}a_n^2 + O(a_n^3)$。
1. **$p > 1$**：$\sum a_n$ 和 $\sum a_n^2$ 均收敛，故乘积收敛。
2. **$1/2 < p \le 1$**：$\sum a_n$ 收敛（交错级数），但 $\sum a_n^2 = \sum \frac{1}{n^{2p}}$ 收敛，故乘积收敛。
3. **$0 < p \le 1/2$**：$\sum a_n$ 收敛，但 $\sum a_n^2$ 发散至 $+\infty$。由于级数变为 $\sum (\text{收敛项} - \text{发散正项})$，对数级数趋向 $-\infty$。
4. **结论**：
   - 当 $p > 1/2$ 时，乘积收敛；
   - 当 $0 < p \le 1/2$ 时，乘积发散于 0。

#### 答案
$p > 1/2$ 时收敛。

</details>

### 例题 2：特殊无穷乘积的计算
计算 $\prod_{n=2}^\infty \frac{n^3-1}{n^3+1}$。

<details>

<summary>点击查看详细解析</summary>

#### 解析过程
利用因式分解：$n^3-1 = (n-1)(n^2+n+1)$，$n^3+1 = (n+1)(n^2-n+1)$。
注意到 $n^2+n+1$ 与 $(n+1)^2-(n+1)+1 = n^2+n+1$ 是一致的。
1. **写出前 $N$ 项积**：
   $P_N = \prod_{n=2}^N \frac{n-1}{n+1} \cdot \prod_{n=2}^N \frac{n^2+n+1}{n^2-n+1}$
2. **第一部分（裂项）**：
   $\frac{1 \cdot 2 \cdot \dots \cdot (N-1)}{3 \cdot 4 \cdot \dots \cdot (N+1)} = \frac{1 \cdot 2}{N(N+1)}$
3. **第二部分（裂项）**：
   设 $f(n) = n^2-n+1$，则该积为 $\prod_{n=2}^N \frac{f(n+1)}{f(n)} = \frac{f(N+1)}{f(2)} = \frac{N^2+N+1}{3}$。
4. **取极限**：
   $P = \lim_{N \to \infty} \frac{2}{N(N+1)} \cdot \frac{N^2+N+1}{3} = \frac{2}{3} \cdot 1 = \frac{2}{3}$。

#### 答案
$2/3$

</details>

### 例题 3：Gamma 函数与余元公式
利用 Weierstrass 乘积公式证明 $\Gamma(z)\Gamma(-z) = -\frac{\pi}{z \sin \pi z}$。

<details>

<summary>点击查看详细解析</summary>

#### 解析过程
1. **代入乘积公式**：
   $\frac{1}{\Gamma(z)} = ze^{\gamma z} \prod_{n=1}^\infty (1+z/n)e^{-z/n}$
   $\frac{1}{\Gamma(-z)} = -ze^{-\gamma z} \prod_{n=1}^\infty (1-z/n)e^{z/n}$
2. **相乘**：
   $\frac{1}{\Gamma(z)\Gamma(-z)} = (ze^{\gamma z})(-ze^{-\gamma z}) \prod_{n=1}^\infty (1+z/n)(1-z/n) e^{-z/n+z/n}$
   $= -z^2 \prod_{n=1}^\infty (1 - z^2/n^2)$
3. **识别 Sine 展开**：
   注意到 $\sin \pi z = \pi z \prod_{n=1}^\infty (1 - z^2/n^2)$，则上述乘积为 $\frac{\sin \pi z}{\pi z}$。
   $\frac{1}{\Gamma(z)\Gamma(-z)} = -z^2 \cdot \frac{\sin \pi z}{\pi z} = -\frac{z \sin \pi z}{\pi}$。
4. **倒数即得**：
   $\Gamma(z)\Gamma(-z) = -\frac{\pi}{z \sin \pi z}$。

#### 答案
证毕。

</details>

---

## 5. 配套进阶练习

1.  **收敛性判定**：讨论 $\prod_{n=1}^\infty \left[ 1 + \frac{(-1)^n}{n} + \frac{1}{n} \right]$ 的收敛性。
    

<details>

    

<summary>显示答案与提示</summary>

    **提示**：令 $a_n = \frac{(-1)^n+1}{n}$。级数 $\sum a_n$ 发散，且 $a_n \ge 0$。因此乘积发散至 $+\infty$。
    

</details>

2.  **Wallis 公式的推广**：证明 $\frac{1}{2} \cdot \frac{3}{4} \cdot \frac{5}{6} \dots = 0$，即 $\prod_{n=1}^\infty \frac{2n-1}{2n} = 0$。
    

<details>

    

<summary>显示答案与提示</summary>

    **提示**：取对数得 $\sum \ln(1 - \frac{1}{2n})$。由于 $\ln(1 - \frac{1}{2n}) \approx -\frac{1}{2n}$ 且 $\sum \frac{1}{2n}$ 发散，原乘积发散于 0。
    

</details>

3.  **求值**：计算 $\prod_{n=1}^\infty (1 + \frac{1}{n(n+2)})$。
    

<details>

    

<summary>显示答案与提示</summary>

    **解析**：项可以写为 $\frac{n^2+2n+1}{n(n+2)} = \frac{(n+1)^2}{n(n+2)}$。
    $P_N = \frac{2^2}{1 \cdot 3} \cdot \frac{3^2}{2 \cdot 4} \cdot \dots \cdot \frac{(N+1)^2}{N(N+2)} = \frac{N+1}{1} \cdot \frac{2}{N+2} \to 2$。
    **答案**：2
    

</details>

4.  **Gamma 函数应用**：证明 $\prod_{n=1}^\infty \frac{n(n+a+b)}{(n+a)(n+b)} = \frac{\Gamma(a+1)\Gamma(b+1)}{\Gamma(a+b+1)}$。
    

<details>

    

<summary>显示答案与提示</summary>

    **提示**：利用 $\Gamma(z)$ 的 Euler 乘积定义。将每一项拆分为与 Gamma 函数对应的形式即可。
    

</details>

---

<SupportingExercises 
  topic="无穷乘积与 Gamma 函数" 
  exercises={[
    { index: 71, title: "无穷乘积敛散性综合判定", slug: "练习-71无穷乘积判定" },
    { index: 72, title: "Weierstrass 展开与巴塞尔问题", slug: "练习-72weierstrass展开" },
    { index: 73, title: "Gamma 函数特殊值与乘积计算", slug: "练习-73gamma特殊值" }
  ]} 
/>

---
*编者注：无穷乘积是通向复分析的一扇窗。通过本章的学习，你不仅掌握了 Gamma 函数的另一种视角，更应体会到数学中“积与和”在对数变换下的深刻统一性。*
