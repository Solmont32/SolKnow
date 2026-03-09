---
title: 反常积分：敛散性判别与 Cauchy 主值 (Improper Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 反常积分：敛散性判别与 Cauchy 主值

在定积分的定义中，我们要求积分区间是有界的，且被积函数也是有界的。当这两个条件之一不满足时，便产生了**反常积分**（也称广义积分）。本章将系统讨论反常积分的敛散性判别法及 Cauchy 主值的概念。

## 一、 基本定义

### 1. 无穷限反常积分 (Infinite Interval)

设 $f(x)$ 在 $[a, +\infty)$ 上可积。定义：

$$\int_a^{+\infty} f(x) dx = \lim_{A \to +\infty} \int_a^A f(x) dx$$

若极限存在，称积分**收敛**；否则称**发散**。

### 2. 瑕积分 (Unbounded Function)

设 $f(x)$ 在 $(a, b]$ 上可积，但在点 $a$ 的右邻域内无界（称 $a$ 为**瑕点**）。定义：

$$\int_a^b f(x) dx = \lim_{\epsilon \to 0^+} \int_{a+\epsilon}^b f(x) dx$$

---

## 二、 非负函数项反常积分的判别法

对于非负函数 $f(x) \ge 0$，反常积分的收敛性等价于变上限积分的有界性。

### 1. 比较判别法 (Comparison Test)

设 $0 \le f(x) \le g(x)$：

- 若 $\int_a^{+\infty} g(x) dx$ 收敛，则 $\int_a^{+\infty} f(x) dx$ 收敛。
- 若 $\int_a^{+\infty} f(x) dx$ 发散，则 $\int_a^{+\infty} g(x) dx$ 发散。

### 2. 极限比较判别法 (Limit Comparison Test)

若 $f(x), g(x) > 0$，且 $\lim_{x \to +\infty} \frac{f(x)}{g(x)} = L$：

- 若 $0 < L < +\infty$，则 $\int f$ 与 $\int g$ 同敛散。
- 若 $L = 0$ 且 $\int g$ 收敛，则 $\int f$ 收敛。
- 若 $L = +\infty$ 且 $\int g$ 发散，则 $\int f$ 发散。

> **常用参考函数 ($p$-级数)**：
> $\int_a^{+\infty} \frac{1}{x^p} dx$ 在 $p > 1$ 时收敛，$p \le 1$ 时发散。

---

## 三、 一般项反常积分的判别法

对于变号函数，我们引入 **Dirichlet** 和 **Abel** 判别法。

### 1. Dirichlet 判别法 (Dirichlet's Test)

**定理**：若满足以下两个条件，则 $\int_a^{+\infty} f(x)g(x) dx$ 收敛：

1. $F(A) = \int_a^A f(x) dx$ 在 $[a, +\infty)$ 上有界（即 $\exists M > 0, \forall A \ge a, |F(A)| \le M$）。
2. $g(x)$ 在 $[a, +\infty)$ 上单调，且 $\lim_{x \to +\infty} g(x) = 0$。

<details>

<summary>点击查看【严格证明】</summary>

**证明**：
利用分部积分法，对任意 $A > a$：

$$\int_a^A f(x)g(x) dx = [F(x)g(x)]_a^A - \int_a^A F(x)g'(x) dx = F(A)g(A) - F(a)g(a) - \int_a^A F(x)g'(x) dx$$

(注：此处 $F(a) = 0$)

1. **项 $F(A)g(A)$**：由条件 1，$|F(A)| \le M$；由条件 2，$\lim_{A \to +\infty} g(A) = 0$。因此 $\lim_{A \to +\infty} F(A)g(A) = 0$。
2. **积分项 $\int_a^A F(x)g'(x) dx$**：
   由于 $g(x)$ 单调，其导数 $g'(x)$（或差分）不改变符号。考察其绝对值的积分：

$$\int_a^A |F(x)g'(x)| dx \le M \int_a^A |g'(x)| dx = M \left| \int_a^A g'(x) dx \right| = M |g(A) - g(a)|$$

当 $A \to +\infty$ 时，$M |g(A) - g(a)| \to M |0 - g(a)| = M |g(a)|$。
这说明 $\int_a^{+\infty} F(x)g'(x) dx$ 绝对收敛，从而必然收敛。
综上所述，极限 $\lim_{A \to +\infty} \int_a^A f(x)g(x) dx$ 存在，即反常积分收敛。$\square$

</details>

### 2. Abel 判别法 (Abel's Test)

**定理**：若满足以下两个条件，则 $\int_a^{+\infty} f(x)g(x) dx$ 收敛：

1. $\int_a^{+\infty} f(x) dx$ 收敛。
2. $g(x)$ 在 $[a, +\infty)$ 上单调且有界。

<details>

<summary>点击查看【严格证明】</summary>

**证明**：
由于 $g(x)$ 在 $[a, +\infty)$ 上单调且有界，根据单调有界准则，极限 $\lim_{x \to +\infty} g(x) = L$ 存在。
令 $h(x) = g(x) - L$。则 $h(x)$ 满足：

- $h(x)$ 在 $[a, +\infty)$ 上单调。
- $\lim_{x \to +\infty} h(x) = 0$。
  考察原积分：

$$\int_a^{+\infty} f(x)g(x) dx = \int_a^{+\infty} f(x)(L + h(x)) dx = L \int_a^{+\infty} f(x) dx + \int_a^{+\infty} f(x)h(x) dx$$

- 第一项：由于 $\int_a^{+\infty} f(x) dx$ 收敛，其乘以常数 $L$ 依然收敛。
- 第二项：因为 $\int_a^{+\infty} f(x) dx$ 收敛，其原函数 $F(A)$ 必然有界。结合 $h(x)$ 的性质，满足 Dirichlet 判别法的条件，故 $\int_a^{+\infty} f(x)h(x) dx$ 收敛。
  两项均收敛，故原积分收敛。$\square$

</details>

---

## 四、 Cauchy 主值 (Cauchy Principal Value)

对于在区间内部有瑕点或无穷区间的积分，若普通的对称极限存在，我们称之为 Cauchy 主值，记作 $P.V. \int$。

### 1. 内部瑕点的主值

若 $c \in (a, b)$ 是 $f(x)$ 的瑕点：

$$P.V. \int_a^b f(x) dx = \lim_{\epsilon \to 0^+} \left( \int_a^{c-\epsilon} f(x) dx + \int_{c+\epsilon}^b f(x) dx \right)$$

### 2. 无穷区间的主值

$$P.V. \int_{-\infty}^{+\infty} f(x) dx = \lim_{A \to +\infty} \int_{-A}^A f(x) dx$$

**注意**：积分收敛必有主值存在且相等，但主值存在未必积分收敛（例如 $\int_{- \infty}^{+\infty} x dx$ 发散，但其主值为 0）。

---

## 五、 深度深度例题解析

### 例题 1：Dirichlet 判别法的应用

证明 Dirichlet 积分 $\int_0^{+\infty} \frac{\sin x}{x} dx$ 收敛。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **分段讨论**：在 $[0, 1]$ 上，$\lim_{x \to 0} \frac{\sin x}{x} = 1$（定义 $x=0$ 处的值为 1），是正常积分。重点考察 $[1, +\infty)$。
2. **识别 $f(x)$ 与 $g(x)$**：
   令 $f(x) = \sin x$，$g(x) = \frac{1}{x}$。
3. **验证 Dirichlet 条件**：
   - $|\int_1^A \sin x dx| = |\cos 1 - \cos A| \le 2$，有界。
   - $g(x) = \frac{1}{x}$ 在 $[1, +\infty)$ 上单调递减且趋于 0。
4. **结论**：由 Dirichlet 判别法，该积分收敛（实际上其值为 $\frac{\pi}{2}$）。

</details>

### 例题 2：Cauchy 主值的计算

计算 $P.V. \int_{-1}^2 \frac{1}{x} dx$。

<details>

<summary>点击查看解析</summary>

#### 解析过程

瑕点为 $x = 0$。

$$P.V. \int_{-1}^2 \frac{1}{x} dx = \lim_{\epsilon \to 0^+} \left( \int_{-1}^{-\epsilon} \frac{1}{x} dx + \int_{\epsilon}^2 \frac{1}{x} dx \right)$$

$$= \lim_{\epsilon \to 0^+} \left( [\ln |x|]_{-1}^{-\epsilon} + [\ln |x|]_{\epsilon}^2 \right)$$

$$= \lim_{\epsilon \to 0^+} \left( (\ln \epsilon - \ln 1) + (\ln 2 - \ln \epsilon) \right)$$

$$= \ln 2$$

</details>

### 例题 3：Fresnel 积分的敛散性

讨论 $\int_0^{+\infty} \sin(x^2) dx$ 的收敛性。

<details>

<summary>点击查看解析</summary>

#### 解析过程

由于被积函数在 $x \to +\infty$ 时并不趋于 0，直观上可能认为发散，但由于其剧烈震荡，实际上是收敛的。

1. **变量代换**：令 $x^2 = t$，则 $x = \sqrt{t}$，$dx = \frac{1}{2\sqrt{t}} dt$。
2. **转换积分**：

$$\int_0^{+\infty} \sin(x^2) dx = \frac{1}{2} \int_0^{+\infty} \frac{\sin t}{\sqrt{t}} dt$$

3. **应用 Dirichlet 判别法**：
   - 考察 $[1, +\infty)$ 上的积分：令 $f(t) = \sin t$，$g(t) = t^{-1/2}$。
   - $\int_1^A \sin t dt$ 有界。
   - $t^{-1/2}$ 在 $[1, +\infty)$ 上单调递减且趋于 0。
4. **瑕点讨论**：在 $t \to 0$ 时，$\frac{\sin t}{\sqrt{t}} \sim \sqrt{t}$，极限为 0，是正常积分。
   **结论**：积分收敛。

</details>

### 例题 4：含对数项的瑕积分

计算 $\int_0^1 \ln x dx$。

<details>

<summary>点击查看解析</summary>

#### 解析过程

$x=0$ 是瑕点。

$$\int_0^1 \ln x dx = \lim_{\epsilon \to 0^+} \int_{\epsilon}^1 \ln x dx$$

利用分部积分：

$$= \lim_{\epsilon \to 0^+} [x \ln x - x]_{\epsilon}^1 = (1 \ln 1 - 1) - \lim_{\epsilon \to 0^+} (\epsilon \ln \epsilon - \epsilon)$$

由于 $\lim_{\epsilon \to 0^+} \epsilon \ln \epsilon = 0$：

$$= -1$$

**结论**：积分收敛，值为 $-1$。

</details>

### 例题 5：Cauchy 主值的高阶应用

计算 $P.V. \int_0^{+\infty} \frac{1}{1-x^2} dx$。

<details>

<summary>点击查看解析</summary>

#### 解析过程

存在两个问题：$x=1$ 是内部瑕点，$x \to +\infty$ 是无穷限。
首先，无穷限部分 $\int_2^{+\infty} \frac{1}{1-x^2} dx \sim \int \frac{-1}{x^2}$ 是收敛的。
重点考察 $x=1$ 处的主值：

$$P.V. \int_0^2 \frac{1}{1-x^2} dx = \lim_{\epsilon \to 0^+} \left( \int_0^{1-\epsilon} \frac{dx}{1-x^2} + \int_{1+\epsilon}^2 \frac{dx}{1-x^2} \right)$$

利用分式分解 $\frac{1}{1-x^2} = \frac{1}{2}(\frac{1}{1-x} + \frac{1}{1+x})$：

$$= \frac{1}{2} \lim_{\epsilon \to 0^+} \left[ \ln \left| \frac{1+x}{1-x} \right| \right]_0^{1-\epsilon} + \frac{1}{2} \lim_{\epsilon \to 0^+} \left[ \ln \left| \frac{1+x}{1-x} \right| \right]_{1+\epsilon}^2$$

$$= \frac{1}{2} \lim_{\epsilon \to 0^+} \left( \ln \frac{2-\epsilon}{\epsilon} - \ln 1 + \ln \frac{3}{-1} - \ln \frac{2+\epsilon}{-\epsilon} \right)$$

注意对数内部是绝对值：

$$= \frac{1}{2} \lim_{\epsilon \to 0^+} \left( \ln \frac{2-\epsilon}{\epsilon} + \ln 3 - \ln \frac{2+\epsilon}{\epsilon} \right) = \frac{1}{2} \lim_{\epsilon \to 0^+} \left( \ln \frac{2-\epsilon}{2+\epsilon} + \ln 3 \right) = \frac{1}{2} \ln 3$$

结合 $[2, +\infty)$ 部分：

$$\int_2^{+\infty} \frac{1}{1-x^2} dx = \frac{1}{2} [\ln |\frac{1+x}{1-x}|]_2^{+\infty} = \frac{1}{2}(0 - \ln 3) = -\frac{1}{2} \ln 3$$

**结论**：$P.V. \int_0^{+\infty} \frac{1}{1-x^2} dx = \frac{1}{2}\ln 3 - \frac{1}{2}\ln 3 = 0$。

</details>

### 例题 6：震荡衰减积分的转化

证明 $\int_0^{+\infty} \frac{\sin^2 x}{x^2} dx$ 收敛。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **瑕点讨论**：当 $x \to 0$ 时，$\frac{\sin^2 x}{x^2} \to 1$，无瑕点。
2. **无穷限讨论**：利用降幂公式 $\sin^2 x = \frac{1-\cos 2x}{2}$。

$$\int_1^{+\infty} \frac{1-\cos 2x}{2x^2} dx = \frac{1}{2} \int_1^{+\infty} \frac{1}{x^2} dx - \frac{1}{2} \int_1^{+\infty} \frac{\cos 2x}{x^2} dx$$

- 第一项：$p$-积分 ($p=2 > 1$)，收敛。
  - 第二项：被积函数绝对值 $\le \frac{1}{x^2}$，绝对收敛。

3. **分部积分观察**（另一种方法）：

$$\int_\epsilon^A \frac{\sin^2 x}{x^2} dx = \left[ -\frac{\sin^2 x}{x} \right]_\epsilon^A + \int_\epsilon^A \frac{2 \sin x \cos x}{x} dx = -\frac{\sin^2 A}{A} + \frac{\sin^2 \epsilon}{\epsilon} + \int_\epsilon^A \frac{\sin 2x}{x} dx$$

当 $\epsilon \to 0, A \to +\infty$ 时：

- $-\frac{\sin^2 A}{A} \to 0$。
- $\frac{\sin^2 \epsilon}{\epsilon} \sim \epsilon \to 0$。
- $\int_0^{+\infty} \frac{\sin 2x}{x} dx$ 是 Dirichlet 积分，收敛。
  **结论**：积分收敛（其值为 $\frac{\pi}{2}$）。

</details>

### 例题 7：对数与有理函数的复合

计算 $\int_0^{+\infty} \frac{\ln x}{1+x^2} dx$。

<details>

<summary>点击查看解析</summary>

#### 解析过程

1. **拆分区间**：$I = \int_0^1 \frac{\ln x}{1+x^2} dx + \int_1^{+\infty} \frac{\ln x}{1+x^2} dx$。
2. **变量代换**：在第二项中令 $x = 1/t$，则 $dx = -1/t^2 dt$。

$$\int_1^{+\infty} \frac{\ln x}{1+x^2} dx = \int_1^0 \frac{\ln(1/t)}{1+(1/t)^2} \left(-\frac{1}{t^2}\right) dt = \int_0^1 \frac{-\ln t}{t^2+1} dt = - \int_0^1 \frac{\ln t}{1+t^2} dt$$

3. **求和**：

$$I = \int_0^1 \frac{\ln x}{1+x^2} dx - \int_0^1 \frac{\ln x}{1+x^2} dx = 0$$

**结论**：积分值为 0。

</details>

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
