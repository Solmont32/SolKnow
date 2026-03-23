---
title: 离散型随机变量 (Discrete Random Variables)
---

# 离散型随机变量 (Discrete Random Variables)

在概率论中，如果一个随机变量 $X$ 的所有可能取值是有限个或可列无穷个，则称 $X$ 为 **离散型随机变量**。

## 1. 概率分布 (Probability Distribution)

对于离散型随机变量 $X$，其概率分布可以用 **概率质量函数 (Probability Mass Function, PMF)** 来描述：
$$P(X = x_i) = p_i, \quad i = 1, 2, \dots$$
且满足：

1. $p_i \ge 0$
2. $\sum_{i} p_i = 1$

### 常见离散分布

1.  **单点分布 (Degenerate Distribution)**: $P(X=c) = 1$。
2.  **两点分布 (Bernoulli Distribution)**: $X \sim B(1, p)$。
3.  **二项分布 (Binomial Distribution)**: $X \sim B(n, p)$，$P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$。
4.  **泊松分布 (Poisson Distribution)**: $X \sim P(\lambda)$，$P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}$。
5.  **几何分布 (Geometric Distribution)**: $X \sim G(p)$，$P(X=k) = (1-p)^{k-1}p$。
6.  **负二项分布 (Negative Binomial)**: $X \sim NB(r, p)$，第 $r$ 次成功所需的试验次数。
7.  **超几何分布 (Hypergeometric)**: $X \sim H(N, M, n)$，不放回抽样中的成功次数。

## 2. 数字特征 (Numerical Characteristics)

### 数学期望 (Expectation)

离散型随机变量 $X$ 的数学期望定义为：
$$E(X) = \sum_{i} x_i p_i$$
（要求级数绝对收敛）。

### 方差 (Variance)

方差描述随机变量取值的离散程度：
$$Var(X) = E[(X - E(X))^2] = E(X^2) - [E(X)]^2$$

## 3. 经典例题

:::info 例题 1
设随机变量 $X \sim B(n, p)$，求 $E(X)$ 和 $Var(X)$。
:::

<details>
<summary>查看解析</summary>

利用二项式定理或指标随机变量法：

1. **期望**: $E(X) = np$。
2. **方差**: $Var(X) = np(1-p)$。

**推导简述**:
设 $X = \sum_{i=1}^n X_i$，其中 $X_i$ 是第 $i$ 次试验成功的指标随机变量，$X_i \sim B(1, p)$。
则 $E(X_i) = p$，$Var(X_i) = p(1-p)$。
由于试验独立，$E(X) = \sum E(X_i) = np$，$Var(X) = \sum Var(X_i) = np(1-p)$。

</details>

:::info 例题 2
若 $X \sim P(\lambda)$，证明 $E(X) = \lambda$。
:::

<details>
<summary>查看解析</summary>

$$E(X) = \sum_{k=0}^\infty k \cdot \frac{\lambda^k e^{-\lambda}}{k!} = \sum_{k=1}^\infty \frac{\lambda^k e^{-\lambda}}{(k-1)!} = \lambda e^{-\lambda} \sum_{k=1}^\infty \frac{\lambda^{k-1}}{(k-1)!}$$
令 $j = k-1$，则：
$$E(X) = \lambda e^{-\lambda} \sum_{j=0}^\infty \frac{\lambda^j}{j!} = \lambda e^{-\lambda} \cdot e^\lambda = \lambda$$

</details>

## 4. 分布间的关系

```
                    泊松分布 P(λ)
                          ↑
         二项分布 B(n,p) ←——→ 超几何分布 H(N,M,n)
              ↓                   (不放回)
    n=1 时为两点分布 B(1,p)
              ↓
         几何分布 G(p)
              ↓
         负二项分布 NB(r,p)
```

**重要极限关系**：当 $n \to \infty$，$p \to 0$ 且 $np = \lambda$ 时，二项分布收敛于泊松分布：
$$\binom{n}{k} p^k (1-p)^{n-k} \xrightarrow{} \frac{\lambda^k e^{-\lambda}}{k!}$$

---

## 5. 计算验证：C++ 蒙特卡洛模拟

以下代码通过随机模拟验证泊松分布的期望和方差。

<details>
<summary>点击查看 C++ 验证代码</summary>

```cpp
#include <iostream>
#include <random>
#include <vector>
#include <cmath>
#include <iomanip>

using namespace std;

// 生成泊松分布随机数 (使用 std::poisson_distribution)
void test_poisson(double lambda, int trials) {
    random_device rd;
    mt19937 gen(rd());
    poisson_distribution<> d(lambda);

    vector<long long> counts(20, 0);
    double sum = 0, sum_sq = 0;

    for (int i = 0; i < trials; ++i) {
        int x = d(gen);
        if (x < 20) counts[x]++;
        sum += x;
        sum_sq += x * x;
    }

    double mean = sum / trials;
    double variance = sum_sq / trials - mean * mean;

    cout << fixed << setprecision(4);
    cout << "λ = " << lambda << ", 试验次数 = " << trials << endl;
    cout << "样本均值: " << mean << " (理论值: " << lambda << ")" << endl;
    cout << "样本方差: " << variance << " (理论值: " << lambda << ")" << endl;
    cout << "\n频率分布 vs 理论概率:" << endl;
    for (int k = 0; k < 10; ++k) {
        double freq = (double)counts[k] / trials;
        double theory = exp(-lambda) * pow(lambda, k) / tgamma(k + 1);
        cout << "P(X=" << k << "): 模拟=" << freq << " 理论=" << theory << endl;
    }
}

int main() {
    test_poisson(3.0, 100000);
    return 0;
}
```

</details>

---

_本章节由 SolKnow 系统根据标准教材重写。_
