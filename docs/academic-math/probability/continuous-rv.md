---
title: 连续型随机变量 (Continuous Random Variables)
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# 连续型随机变量 (Continuous Random Variables)

如果对于随机变量 $X$ 的 **累积分布函数 (Cumulative Distribution Function, CDF)** $F(x) = P(X \le x)$，存在非负可积函数 $f(x)$，使得对于任意实数 $x$，有：
$$F(x) = \int_{-\infty}^x f(t) \, dt$$
则称 $X$ 为 **连续型随机变量**，称 $f(x)$ 为 $X$ 的 **概率密度函数 (Probability Density Function, PDF)**。

## 1. 核心性质

1. $f(x) \ge 0$ 对几乎所有的 $x$ 成立。
2. $\int_{-\infty}^\infty f(x) \, dx = 1$。
3. 对任意实数 $a < b$，$P(a < X \le b) = F(b) - F(a) = \int_a^b f(x) \, dx$。

## 2. 常见连续分布

1.  **均匀分布 (Uniform Distribution)**: $X \sim U(a, b)$，$f(x) = \frac{1}{b-a}$ ($a < x < b$)。
2.  **指数分布 (Exponential Distribution)**: $X \sim Exp(\lambda)$，$f(x) = \lambda e^{-\lambda x}$ ($x \ge 0$)。
3.  **正态分布 (Normal Distribution)**: $X \sim N(\mu, \sigma^2)$，$f(x) = \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$。
4.  **Gamma 分布**: $X \sim \Gamma(\alpha, \beta)$ 是指数分布的推广
5.  **Beta 分布**: $X \sim Beta(\alpha, \beta)$，定义在 $(0, 1)$ 上的灵活分布

## 3. 数字特征 (Numerical Characteristics)

### 数学期望 (Expectation)

$$E(X) = \int_{-\infty}^\infty x f(x) \, dx$$

### 方差 (Variance)

$$Var(X) = \int_{-\infty}^\infty (x - E(X))^2 f(x) \, dx = E(X^2) - [E(X)]^2$$

## 4. 经典例题

:::info 例题 1
设随机变量 $X \sim N(\mu, \sigma^2)$，证明 $E(X) = \mu$。
:::

<details>
<summary>查看解析</summary>

$$E(X) = \frac{1}{\sqrt{2\pi}\sigma} \int_{-\infty}^\infty x \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right) \, dx$$
令 $t = \frac{x-\mu}{\sigma}$，则 $x = \sigma t + \mu$，$dx = \sigma dt$：
$$E(X) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^\infty (\sigma t + \mu) e^{-t^2/2} \, dt$$
$$E(X) = \frac{\sigma}{\sqrt{2\pi}} \int_{-\infty}^\infty t e^{-t^2/2} \, dt + \frac{\mu}{\sqrt{2\pi}} \int_{-\infty}^\infty e^{-t^2/2} \, dt$$
由于被积函数 $t e^{-t^2/2}$ 是奇函数，其积分为 $0$；第二个积分为标准的正态分布积分，结果为 $\sqrt{2\pi}$：
$$E(X) = 0 + \frac{\mu}{\sqrt{2\pi}} \cdot \sqrt{2\pi} = \mu$$

</details>

:::info 例题 2
若 $X \sim Exp(\lambda)$，求其中位数。
:::

<details>
<summary>查看解析</summary>

设中位数为 $m$，满足 $F(m) = 0.5$。
指数分布的 CDF 为 $F(x) = 1 - e^{-\lambda x}$ ($x \ge 0$)。
$$1 - e^{-\lambda m} = 0.5 \implies e^{-\lambda m} = 0.5 \implies -\lambda m = \ln(0.5)$$
$$m = \frac{\ln 2}{\lambda}$$

</details>

## 5. 正态分布的重要性质

<KnowledgeCard type="info" title="68-95-99.7 法则">
对于标准正态分布 $Z \sim N(0, 1)$：
- $P(|Z| \leq 1) \approx 68.27\%$
- $P(|Z| \leq 2) \approx 95.45\%$
- $P(|Z| \leq 3) \approx 99.73\%$
</KnowledgeCard>

**中心极限定理的预兆**：独立随机变量之和的分布在一定条件下收敛于正态分布，这解释了正态分布在自然界中的普遍性。

---

## 6. 计算验证：C++ 正态分布模拟

以下代码通过 Box-Muller 变换生成正态分布随机数，并验证其统计特性。

<details>
<summary>点击查看 C++ 验证代码</summary>

```cpp
#include <iostream>
#include <math>
#include <random>
#include <vector>
#include <iomanip>

using namespace std;

// Box-Muller 变换生成标准正态分布
pair<double, double> box_muller(double u1, double u2) {
    double r = sqrt(-2.0 * log(u1));
    double theta = 2.0 * M_PI * u2;
    return {r * cos(theta), r * sin(theta)};
}

int main() {
    random_device rd;
    mt19937 gen(rd());
    uniform_real_distribution<double> uniform(0.0, 1.0);

    const int N = 1000000;
    vector<double> samples;

    // 生成正态分布样本
    for (int i = 0; i < N / 2; ++i) {
        double u1 = uniform(gen);
        double u2 = uniform(gen);
        // 避免 u1 = 0
        while (u1 == 0) u1 = uniform(gen);

        auto [z1, z2] = box_muller(u1, u2);
        samples.push_back(z1);
        samples.push_back(z2);
    }

    // 计算统计量
    double sum = 0, sum_sq = 0;
    for (double x : samples) {
        sum += x;
        sum_sq += x * x;
    }

    double mean = sum / N;
    double variance = sum_sq / N - mean * mean;

    // 计算各区间频率
    int within_1 = 0, within_2 = 0, within_3 = 0;
    for (double x : samples) {
        if (abs(x) <= 1.0) within_1++;
        if (abs(x) <= 2.0) within_2++;
        if (abs(x) <= 3.0) within_3++;
    }

    cout << fixed << setprecision(4);
    cout << "样本数量: " << N << endl;
    cout << "样本均值: " << mean << " (理论值: 0)" << endl;
    cout << "样本方差: " << variance << " (理论值: 1)" << endl;
    cout << "\n68-95-99.7 法则验证:" << endl;
    cout << "P(|Z| <= 1): " << (double)within_1 / N * 100 << "% (理论: 68.27%)" << endl;
    cout << "P(|Z| <= 2): " << (double)within_2 / N * 100 << "% (理论: 95.45%)" << endl;
    cout << "P(|Z| <= 3): " << (double)within_3 / N * 100 << "% (理论: 99.73%)" << endl;

    return 0;
}
```

</details>

---

_本章节由 SolKnow 系统根据标准教材重写。_
