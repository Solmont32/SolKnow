---
title: 数值积分：Newton-Cotes 公式与复化求积
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 数值积分：Newton-Cotes 公式与复化求积

对于许多复杂的函数 $f(x)$，其原函数无法用初等函数表示，或者 $f(x)$ 仅以离散点形式给出。此时，必须利用数值方法来近似计算定积分 $I = \int_a^b f(x) dx$。

---

## 1. Newton-Cotes 公式

Newton-Cotes 公式的基本思想是：在 $[a, b]$ 上取 $n+1$ 个等距节点 $x_i = a + ih, h = \frac{b-a}{n}$，用 $n$ 次 Lagrange 插值多项式 $L_n(x)$ 代替 $f(x)$：
$$I \approx \int_a^b L_n(x) dx = \sum_{i=0}^n y_i \int_a^b l_i(x) dx$$

### 1.1 Cotes 系数
定义 Cotes 系数 $C_i^{(n)} = \frac{1}{b-a} \int_a^b l_i(x) dx$，则求积公式可写为：
$$I \approx (b-a) \sum_{i=0}^n C_i^{(n)} f(x_i)$$

### 1.2 常用低阶公式
- **梯形公式 (n=1)**：
  $$\int_a^b f(x) dx \approx \frac{b-a}{2} [f(a) + f(b)]$$
  代数精度：1
- **Simpson 公式 (n=2)**：
  $$\int_a^b f(x) dx \approx \frac{b-a}{6} \left[ f(a) + 4f\left(\frac{a+b}{2}\right) + f(b) \right]$$
  代数精度：**3**（即使是 2 次插值，对于 3 次多项式也精确）

---

## 2. 复化求积法 (Composite Rules)

高阶 Newton-Cotes 公式在 $n \ge 8$ 时会出现系数为负值的情况，导致数值不稳定。实际应用中，常将 $[a, b]$ 分成 $m$ 个小区间，在每个小区间上使用低阶公式。

### 2.1 复化梯形公式
将区间 $m$ 等分，步长 $h = \frac{b-a}{m}$：
$$T_m = \frac{h}{2} \left[ f(a) + 2\sum_{i=1}^{m-1} f(x_i) + f(b) \right]$$
误差：$R = -\frac{b-a}{12} h^2 f''(\xi)$

### 2.2 复化 Simpson 公式
要求区间数为偶数（即有 $m=2k$ 个子区间）：
$$S_m = \frac{h}{3} \left[ f(a) + 4\sum_{i=1,3,\dots,m-1} f(x_i) + 2\sum_{i=2,4,\dots,m-2} f(x_i) + f(b) \right]$$
误差：$R = -\frac{b-a}{180} h^4 f^{(4)}(\xi)$

---

## 3. 代数精度 (Algebraic Precision)

**定义**：如果一个求积公式对于所有次数不超过 $k$ 的多项式都精确，但对于 $k+1$ 次多项式不精确，则称其具有 $k$ 次代数精度。

<KnowledgeCard type="info" title="性质">
$n$ 阶 Newton-Cotes 公式在 $n$ 为偶数时具有 $n+1$ 次代数精度；在 $n$ 为奇数时具有 $n$ 次代数精度。
</KnowledgeCard>

---

## ✍️ 典型例题

<details>
<summary>例 1：分别利用梯形公式和 Simpson 公式计算 $\int_0^1 \frac{1}{1+x} dx$ 的近似值。</summary>

**解析：**
已知准确值 $I = [\ln(1+x)]_0^1 = \ln 2 \approx 0.693147$。
1. **梯形公式** (n=1, h=1)：
   $T = \frac{1}{2} [f(0) + f(1)] = \frac{1}{2} [1 + 0.5] = 0.75$
2. **Simpson 公式** (n=2, h=0.5)：
   $S = \frac{1}{6} [f(0) + 4f(0.5) + f(1)] = \frac{1}{6} [1 + 4(2/3) + 0.5] = \frac{1}{6} [1.5 + 2.6667] = 0.694444$
对比可见，Simpson 公式的精度远高于梯形公式。

</details>

---

## 🚀 专项训练

前往 **[数值分析专题练习库](/docs/exercises/math/numerical-analysis)** 深入研究 Romberg 算法与 Gauss 求积公式。
