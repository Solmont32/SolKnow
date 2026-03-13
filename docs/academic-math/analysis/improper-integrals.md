---
title: 反常积分：敛散性判别与 Cauchy 主值 (Improper Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';
import { AreaChart, Activity, Percent, Crosshair, ChevronDownSquare } from 'lucide-react';

# 反常积分：敛散性判别与 Cauchy 主值

在定积分的定义中，我们要求积分区间是有界的，且被积函数也是有界的。当这两个条件之一不满足时，便产生了**反常积分**（也称广义积分）。

## 一、 基本定义与柯西准则

### 1. 柯西收敛准则 (Cauchy Criterion)

<KnowledgeCard type="warning" title={<><Activity className="inline-block mr-2" /> 核心准则</>}>
反常积分 $\int_a^{+\infty} f(x) dx$ 收敛的充要条件是：对任意 $\epsilon > 0$，存在 $A > a$，使得对于任意 $A_1, A_2 > A$，恒有：
$$\left| \int_{A_1}^{A_2} f(x) dx \right| < \epsilon$$
</KnowledgeCard>

### 2. 无穷限与瑕积分

- **无穷限**：$\int_a^{+\infty} f(x) dx = \lim_{A \to +\infty} \int_a^A f(x) dx$。
- **瑕积分**：若 $a$ 为瑕点，$\int_a^b f(x) dx = \lim_{\epsilon \to 0^+} \int_{a+\epsilon}^b f(x) dx$。

---

## 二、 敛散性判别法

### 1. 非负函数的比较法

若 $0 \le f(x) \le g(x)$，则 $\int g$ 收敛 $\implies \int f$ 收敛。

### 2. 变号函数的判别法

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <KnowledgeCard type="info" title={<><Crosshair className="inline-block mr-2" /> Dirichlet 判别法</>}>
    1. $\int_a^A f(x)dx$ 有界；<br/>2. $g(x)$ 单调且 $g(x) \to 0$。
  </KnowledgeCard>
  <KnowledgeCard type="info" title={<><AreaChart className="inline-block mr-2" /> Abel 判别法</>}>
    1. $\int_a^{+\infty} f(x)dx$ 收敛；<br/>2. $g(x)$ 单调有界。
  </KnowledgeCard>
</div>

---

## 三、 Cauchy 主值 (Principal Value)

对于发散积分，若对称逼近的极限存在，称为主值 $P.V.$。
例如：$P.V. \int_{-A}^A x dx = 0$，尽管 $\int_{-\infty}^{+\infty} x dx$ 发散。

---

## 四、 章内专题练习 (In-Chapter Exercises)

<details>
<summary><b>练习 1：Dirichlet 判别法的应用</b></summary>

判定 $\int_0^{+\infty} \frac{\sin x}{x^p}$ ($p > 0$) 的收敛性。
<br/>
**解析**：

1. $x \to 0$ 时，若 $p < 2$，由 $\sin x \sim x$ 知是正常积分（或收敛瑕积分）。
2. $x \to +\infty$ 时，令 $f(x) = \sin x, g(x) = 1/x^p$。
   - $\int \sin x$ 有界。
   - $1/x^p$ 单调趋于 0。
   故由 Dirichlet 判别法知积分收敛。
</details>

<details>
<summary><b>练习 2：瑕积分的判定</b></summary>

讨论 $\int_0^1 \frac{dx}{x^p \ln(1+x)}$ 的收敛性。
<br/>
**答案解析**：
当 $x \to 0$ 时，$\ln(1+x) \sim x$。
故被积函数 $\sim \frac{1}{x^{p+1}}$。
由 $p$-积分判别法，当 $p+1 < 1$ 即 $p < 0$ 时收敛。

</details>
<details>
<summary><b>练习 3：Cauchy 主值计算</b></summary>

计算 $P.V. \int_{1/2}^2 \frac{dx}{x \ln x}$。
<br/>
**答案解析**
瑕点在 $x=1$。
$P.V. = \lim_{\epsilon \to 0} (\int_{1/2}^{1-\epsilon} + \int_{1+\epsilon}^2) \frac{d(\ln x)}{\ln x}$
$= \lim (\ln|\ln(1-\epsilon)| - \ln|\ln(1/2)| + \ln|\ln 2| - \ln|\ln(1+\epsilon)|)$
由于 $\ln(1 \pm \epsilon) \sim \pm \epsilon$，两项对数项抵消。
结果为 $\ln|\ln 2| - \ln|\ln(1/2)| = 0$（由于 $\ln(1/2) = -\ln 2$）。

</details>
---

<SupportingExercises
topic="反常积分"
fileId="analysis-integral-calculus"
exercises={[
{ index: 11.1, title: "Dirichlet 判别法应用", slug: "练习-111dirichlet-判别法的应用" },
{ index: 11.2, title: "Beta 函数与反常积分", slug: "练习-112含参反常积分与-beta-函数" }
]}
/>

---

<SupportingExercises
topic="反常积分"
fileId="analysis-integral-calculus"
exercises={[
{ index: 11.1, title: "Dirichlet 判别法应用", slug: "练习-111dirichlet-判别法的应用" },
{ index: 11.2, title: "Beta 函数与反常积分", slug: "练习-112含参反常积分与-beta-函数" },
{ index: 11.3, title: "Cauchy 主值计算", slug: "练习-113cauchy-主值-principal-value" }
]}
/>

---

_编者注：反常积分的敛散性判别是分析学的核心。掌握了 Dirichlet 与 Abel 判别法，你就掌握了处理震荡积分的利器。_
