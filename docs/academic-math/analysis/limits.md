---
title: "第二章：数列极限 (Limits of Sequences)"
---

import Details from '@theme/Details';
import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第二章：数列极限

本章围绕 $\epsilon$-$N$ 定义、收敛判别与经典计算模板展开，重点训练“定义证明 + 判别工具 + 计算技巧”三条主线。

## 一、定义与基本性质

### 1. $\epsilon$-$N$ 定义

若对任意 $\epsilon>0$，存在 $N\in\mathbb{N}_+$，使得当 $n>N$ 时恒有

$$|a_n-A|<\epsilon,$$

则称 $\lim_{n\to\infty}a_n=A$。

<KnowledgeCard type="info" title="学习要点">
定义中的量词顺序必须严格：先“任意 $\epsilon$”，再“存在 $N$”。证明题中交换顺序通常会导致错误结论。
</KnowledgeCard>

### 2. 基本定理

- 收敛极限唯一。
- 收敛数列必有界。
- 四则运算与夹逼定理成立。
- 收敛数列任意子列收敛到同一极限。

### 3. 三个核心判别工具

- **单调有界定理**：单调且有界 $\Rightarrow$ 收敛。
- **柯西收敛准则**：在实数域中，柯西列充要等价于收敛。
- **Stolz 定理**：处理离散型 $\frac{\infty}{\infty}$ 与平均值极限的关键工具。

---

## 二、教材化例题（4 题）

### 例题 1：定义法证明极限

证明 $\lim_{n\to\infty}\frac{3n-1}{2n+5}=\frac32$。

:::note[点击查看解析与答案]

有

$$\left|\frac{3n-1}{2n+5}-\frac32\right|=\frac{17}{4n+10}<\frac{17}{4n}.$$

给定 $\epsilon>0$，取

$$N>\frac{17}{4\epsilon},$$

当 $n>N$ 时即有误差小于 $\epsilon$。

故极限为 $\frac32$。

:::

### 例题 2：单调有界定理求递推极限

设 $x_1=1,\ x_{n+1}=\frac12\left(x_n+\frac{2}{x_n}\right)$，求极限。

:::note[点击查看解析与答案]

先证下界：由 AM-GM，

$$x_{n+1}=\frac12\left(x_n+\frac{2}{x_n}\right)\ge\sqrt2.$$

再证单调：当 $x_n\ge\sqrt2$ 时

$$x_{n+1}-x_n=\frac{2-x_n^2}{2x_n}\le0,$$

故从第二项起单调递减且下有界，故收敛。

设极限为 $L>0$，代入递推式：

$$L=\frac12\left(L+\frac2L\right)\Rightarrow L^2=2\Rightarrow L=\sqrt2.$$

:::

### 例题 3：Stolz 定理计算和式极限

求

$$\lim_{n\to\infty}\frac{1^2+2^2+\cdots+n^2}{n^3}.$$

:::note[点击查看解析与答案]

令

$$X_n=\sum_{k=1}^n k^2,\quad Y_n=n^3.$$

由 Stolz：

$$
\lim\frac{X_n}{Y_n}=\lim\frac{X_n-X_{n-1}}{Y_n-Y_{n-1}}=\lim\frac{n^2}{n^3-(n-1)^3}
=\lim\frac{n^2}{3n^2-3n+1}=\frac13.
$$

:::

### 例题 4：柯西准则判定发散

证明调和级数部分和 $H_n=\sum_{k=1}^n\frac1k$ 不收敛。

:::note[点击查看解析与答案]

取 $m=2n$，则

$$H_{2n}-H_n=\frac1{n+1}+\cdots+\frac1{2n}>n\cdot\frac1{2n}=\frac12.$$

故存在固定正数 $\epsilon_0=\frac12$，使任意大下标仍可找到两项差值超过 $\epsilon_0$，违背柯西准则。

因此 $H_n$ 发散。

:::

---

## 三、计算验证：C++ 数值观测 <Code2 className="inline-block ml-1" />

在分析学中，数值模拟能帮助我们直观感受收敛的速度。

### 示例：验证数列 $a_n = (1 + 1/n)^n \to e$

我们通过 C++ 观察该数列在 $n$ 增大时的收敛情况及其与真值 $e$ 的误差。

<details>
<summary>点击查看 C++ 验证代码</summary>

```cpp
#include <iostream>
#include <cmath>
#include <iomanip>

/**
 * @brief 观测 e 的定义式收敛过程
 */
int main() {
    const double e_true = std::exp(1.0);
    std::cout << std::fixed << std::setprecision(12);
    std::cout << "Target e: " << e_true << "\n\n";
    std::cout << "n\t\tValue\t\t\tError" << std::endl;
    std::cout << "---------------------------------------------" << std::endl;

    for (long long n = 1; n <= 100000000000LL; n *= 10) {
        double val = std::pow(1.0 + 1.0/n, (double)n);
        double error = std::abs(val - e_true);
        std::cout << "10^" << (int)std::log10(n) << "\t\t" << val << "\t" << error << std::endl;
    }
    
    std::cout << "\n注：由于双精度浮点数精度限制，当 n 过大时，误差反而可能由于舍入误差而增大。" << std::endl;
    return 0;
}
```

</details>

---

## 四、跨领域映射 <Layers className="inline-block ml-1" />

| 领域 | 对应概念 | 说明 |
| :--- | :--- | :--- |
| **算法分析** | 渐近时间复杂度 $O(f(n))$ | 本质上是研究函数在大 $n$ 下的阶数极限。 |
| **信号处理** | 采样定理与极限 | 连续信号向离散采样的逼近过程。 |
| **物理学** | 热力学极限 | 研究粒子数 $N \to \infty$ 时宏观量的统计行为。 |

---

## 五、章内练习（折叠答案）

### 练习 1：定义法

用 $\epsilon$-$N$ 定义证明 $\lim\limits_{n\to\infty}\frac{n+1}{n}=1$。

:::note[点击查看过程与答案]

$$\left|\frac{n+1}{n}-1\right|=\frac1n.$$

给定 $\epsilon>0$，取 $N>1/\epsilon$ 即可。

:::

### 练习 2：夹逼定理

求极限

$$\lim_{n\to\infty}\frac{\sin n}{n}.$$

:::note[点击查看过程与答案]

由 $-1\le\sin n\le1$，得

$$-\frac1n\le\frac{\sin n}{n}\le\frac1n.$$

两端趋于 0，故极限为 0。

:::

### 练习 3：Stolz 平均值

设 $a_n\to a$，证明

$$\frac{a_1+\cdots+a_n}{n}\to a.$$

:::note[点击查看过程与答案]

设 $X_n=\sum_{k=1}^n a_k,\ Y_n=n$，用 Stolz：

$$\lim\frac{X_n}{Y_n}=\lim\frac{X_n-X_{n-1}}{Y_n-Y_{n-1}}=\lim a_n=a.$$

:::

### 练习 4：递推极限

设 $u_1>0$，$u_{n+1}=\frac{u_n+3}{u_n+1}$。证明其收敛并求极限。

:::note[点击查看过程与答案]

极限候选由不动点方程

$$L=\frac{L+3}{L+1}\Rightarrow L^2=3\Rightarrow L=\sqrt3\ (>0).$$

考察映射 $\varphi(x)=\frac{x+3}{x+1}$ 在 $(0,+\infty)$ 上，

$$\varphi'(x)=\frac{-2}{(x+1)^2}<0,$$

并可验证迭代保持正且逐步逼近不动点，故收敛到 $\sqrt3$。

:::

---

<SupportingExercises
topic="第二章：数列极限"
exercises={[
{ index: 13, title: '迫敛定理应用', slug: '练习-13数列极限迫敛定理' },
{ index: 39, title: '柯西收敛准则', slug: '练习-39柯西收敛准则' },
{ index: 116, title: '正项级数极限比较判别', slug: '练习-116正项级数极限比较判别' }
]}
/>

## 四、练习库入口

- [前四章基础专题练习（新）](/docs/exercises/math/analysis-foundations)
- [数学分析综合练习库](/docs/exercises/math/analysis)

---

_编者注：数列极限训练要形成“先判别后计算”的习惯，避免直接硬算导致方向错误。_
