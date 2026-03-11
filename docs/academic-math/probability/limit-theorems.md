---
title: 极限定理 (Limit Theorems)
---

# 极限定理 (Limit Theorems)

极限定理是概率论的核心内容，揭示了大量随机现象背后的确定性规律。

## 0. 收敛性概念 (Convergence)

在进入大数定律前，需明确随机变量序列的四种主要收敛方式：

1. **依概率收敛 ($P \to$ / Convergence in Probability)**：对任意 $\epsilon > 0$，$\lim_{n \to \infty} P(|X_n - X| \ge \epsilon) = 0$。记作 $X_n \xrightarrow{P} X$。
2. **依分布收敛 ($d \to$ / Convergence in Distribution)**：在 $F(x)$ 的所有连续点，$F_n(x) \to F(x)$。记作 $X_n \xrightarrow{d} X$。
3. **几乎处处收敛 (a.s. / Almost Sure Convergence)**：$P(\lim_{n \to \infty} X_n = X) = 1$。记作 $X_n \xrightarrow{a.s.} X$。
4. **$L^p$ 收敛**：$E[|X_n - X|^p] \to 0$。

## 1. 大数定律 (Law of Large Numbers, LLN)

大数定律描述的是样本均值的稳定性（依概率收敛于期望）。

### 切比雪夫不等式 (Chebyshev's Inequality)

对于随机变量 $X$，若其期望 $E(X) = \mu$ 和方差 $Var(X) = \sigma^2$ 有限，则对任意 $\epsilon > 0$：
$$P(|X - \mu| \ge \epsilon) \le \frac{\sigma^2}{\epsilon^2}$$

### 切比雪夫大数定律 (Chebyshev LLN)

设 $X_1, X_2, \dots$ 是相互独立的随机变量序列，期望 $E(X_i) = \mu_i$ 且方差 $Var(X_i) = \sigma_i^2$ 满足 $\frac{1}{n^2} \sum \sigma_i^2 \to 0$，则：
$$\frac{1}{n} \sum_{i=1}^n X_i - \frac{1}{n} \sum_{i=1}^n \mu_i \xrightarrow{P} 0$$

### 辛钦大数定律 (Khinchin LLN)

若 $X_1, X_2, \dots$ 独立同分布且期望 $E(X_i) = \mu$ 存在，则：
$$\bar{X}_n = \frac{1}{n} \sum_{i=1}^n X_i \xrightarrow{P} \mu$$
_注：这是数理统计中样本均值作为总体期望一致估计量的理论根据。_

## 2. 中心极限定理 (Central Limit Theorem, CLT)

中心极限定理描述了独立随机变量之和的分布趋向于正态分布（依分布收敛）。

### 林德伯格-勒维定理 (Lindeberg-Levy CLT)

设 $X_1, X_2, \dots$ 是独立同分布的随机变量序列，$E(X_i) = \mu$，$Var(X_i) = \sigma^2 > 0$。则：
$$Z_n = \frac{\sum_{i=1}^n X_i - n\mu}{\sqrt{n}\sigma} \xrightarrow{d} N(0, 1)$$

<details>
<summary>利用特征函数证明 (简述)</summary>

1. 设 $Y_i = \frac{X_i - \mu}{\sigma}$，则 $E(Y_i)=0, Var(Y_i)=1$。
2. $Y_i$ 的特征函数 $\phi(t) = 1 - \frac{t^2}{2} + o(t^2)$。
3. $Z_n = \frac{1}{\sqrt{n}} \sum Y_i$ 的特征函数为：
   $$\phi_{Z_n}(t) = [\phi(t/\sqrt{n})]^n = \left[1 - \frac{t^2}{2n} + o\left(\frac{t^2}{n}\right)\right]^n$$
4. 当 $n \to \infty$ 时，$\phi_{Z_n}(t) \to e^{-t^2/2}$。
5. 由唯一性定理及连续性定理，其极限分布为标准正态分布 $N(0, 1)$。
</details>

### 棣莫弗-拉普拉斯定理 (De Moivre-Laplace CLT)

若 $S_n \sim B(n, p)$，则：
$$\frac{S_n - np}{\sqrt{npq}} \xrightarrow{d} N(0, 1)$$

## 3. 经典练习

:::info 练习 1
某高校共有 1000 名学生。每名学生在校用餐的概率为 0.6，且各学生是否用餐相互独立。问食堂至少应准备多少份午餐，才能以 95% 以上的概率保证不缺餐？ ($\Phi(1.645) = 0.95$)
:::

<details>
<summary>查看解析</summary>

1. 设 $X_i$ 为第 $i$ 个学生是否用餐，$X_i \sim B(1, 0.6)$。
2. $E(X_i) = 0.6$，$Var(X_i) = 0.6 \times 0.4 = 0.24$。
3. 设准备 $N$ 份餐，$S_{1000} = \sum X_i$。要求 $P(S_{1000} \le N) \ge 0.95$。
4. 由 CLT，$S_{1000} \approx N(n\mu, n\sigma^2) = N(600, 240)$。
5. 标准化：$P\left(\frac{S_{1000} - 600}{\sqrt{240}} \le \frac{N - 600}{\sqrt{240}}\right) \ge 0.95$。
6. 查表得 $\frac{N - 600}{\sqrt{240}} \ge 1.645$。
7. $N \ge 600 + 1.645 \times 15.49 \approx 600 + 25.48 = 625.48$。
8. 结论：至少准备 626 份餐。
</details>

:::info 练习 2：蒙特卡洛积分基础
已知大数定律，如何估算 $\int_0^1 f(x) \, dx$？
:::

<details>
<summary>查看解析</summary>

1. 令 $X \sim U(0, 1)$，则 $\int_0^1 f(x) \, dx = E[f(X)]$。
2. 生成 $n$ 个相互独立的 $U(0, 1)$ 随机数 $x_1, \dots, x_n$。
3. 计算样本均值 $\frac{1}{n} \sum f(x_i)$。
4. 根据大数定律，当 $n$ 足够大时，该均值依概率收敛于所求积分值。
</details>

---

_本章节由 SolKnow 系统根据标准教材重写。_
