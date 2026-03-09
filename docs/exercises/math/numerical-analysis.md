---
title: 数值分析专题练习库
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 数值分析专题练习库

本库涵盖插值、拟合、数值积分及其误差估计。所有练习均提供详细的步骤推导。

---

## 1. 插值法练习 (Interpolation)

### Q1: Lagrange 插值余项估计
若利用 $n$ 阶 Lagrange 插值多项式 $L_n(x)$ 逼近 $f(x) = \sin(x)$，节点分布在 $[0, 1]$ 上。试求 $n=2$ 时的最大可能误差上界。

<details>
<summary>Check Solution</summary>

**解析：**
1. **余项公式**：$R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \omega_{n+1}(x)$。
2. **导数估计**：对于 $f(x) = \sin(x)$，$f^{(3)}(x) = -\cos(x)$。在 $[0, 1]$ 上，$|f^{(3)}(x)| \le 1$。
3. **多项式部分**：$\omega_3(x) = |x(x-x_1)(x-1)|$。
   - 若选取等距节点 $x_0=0, x_1=0.5, x_2=1$，则 $\omega_3(x) = |x(x-0.5)(x-1)|$。
   - 求导寻找极值：$g(x) = x^3 - 1.5x^2 + 0.5x$。
   - $g'(x) = 3x^2 - 3x + 0.5 = 0 \Rightarrow x = \frac{3 \pm \sqrt{3}}{6}$。
   - 代入计算得 $\max |\omega_3(x)| = \frac{\sqrt{3}}{36} \approx 0.048$。
4. **综合误差**：
   $|R_2(x)| \le \frac{1}{3!} \cdot 0.048 = \frac{0.048}{6} = 0.008$。
   因此，误差上界为 0.008。

</details>

### Q2: Hermite 插值基础
已知 $f(0)=0, f'(0)=1, f(1)=1$。构造满足上述三个条件的最低次插值多项式。

<details>
<summary>Check Solution</summary>

**解析：**
1. **设多项式形式**：由于有 3 个条件，设 $P(x) = ax^2 + bx + c$。
2. **代入条件**：
   - $P(0)=0 \Rightarrow c=0$
   - $P'(0)=1 \Rightarrow b=1$ (注：$P'(x) = 2ax + b$)
   - $P(1)=1 \Rightarrow a(1)^2 + 1(1) + 0 = 1 \Rightarrow a=0$
3. **结论**：
   $P(x) = x$。
   验证：$P(0)=0, P'(0)=1, P(1)=1$ 均成立。这是一个特殊的退化情况。

</details>

---

## 2. 最小二乘法练习 (Fitting)

### Q3: 平方拟合推导
给定数据 $(x_i, y_i)$，若采用拟合函数 $f(x) = ax^2$，试导出系数 $a$ 的最小二乘估计公式。

<details>
<summary>Check Solution</summary>

**解析：**
1. **目标函数**：$S(a) = \sum_{i=1}^m (ax_i^2 - y_i)^2$。
2. **求导**：$\frac{dS}{da} = \sum_{i=1}^m 2(ax_i^2 - y_i) \cdot x_i^2 = 0$。
3. **展开整理**：
   $a \sum_{i=1}^m x_i^4 - \sum_{i=1}^m y_ix_i^2 = 0$
4. **结果**：
   $a = \frac{\sum x_i^2 y_i}{\sum x_i^4}$。

</details>

---

## 3. 数值积分练习 (Integration)

### Q4: 复化梯形公式精度分析
若要求计算 $\int_0^1 e^x dx$ 时误差不超过 $10^{-4}$，使用复化梯形公式至少需要多少个子区间 $m$？

<details>
<summary>Check Solution</summary>

**解析：**
1. **误差公式**：$|R_m| \le \frac{b-a}{12} h^2 M_2$，其中 $M_2 = \max |f''(x)|$。
2. **计算参数**：
   - $f(x) = e^x, f''(x) = e^x \Rightarrow M_2 = e^1 \approx 2.718$。
   - $b-a = 1, h = 1/m$。
3. **建立不等式**：
   $\frac{1}{12} \cdot \frac{1}{m^2} \cdot 2.718 \le 10^{-4}$
   $m^2 \ge \frac{2.718 \cdot 10^4}{12} \approx 2265$
4. **求解 m**：
   $m \ge \sqrt{2265} \approx 47.6$。
   故至少需要 48 个子区间。

</details>

### Q5: Simpson 公式的代数精度
证明 Simpson 公式具有 3 次代数精度。

<details>
<summary>Check Solution</summary>

**解析：**
1. **定义验证**：公式为 $S = \frac{b-a}{6}[f(a) + 4f(\frac{a+b}{2}) + f(b)]$。
2. **测试 $f(x)=1, x, x^2$**：根据 Newton-Cotes 定义，$n=2$ 的公式对 2 次多项式必精确。
3. **测试 $f(x)=x^3$**：设 $[a, b] = [-1, 1]$，则中点为 0。
   - 准确值：$\int_{-1}^1 x^3 dx = 0$。
   - Simpson 值：$\frac{2}{6}[(-1)^3 + 4(0)^3 + 1^3] = \frac{1}{3}[-1 + 1] = 0$。
   精确相等。
4. **测试 $f(x)=x^4$**：
   - 准确值：$\int_{-1}^1 x^4 dx = 0.4$。
   - Simpson 值：$\frac{2}{6}[(-1)^4 + 4(0)^4 + 1^4] = \frac{1}{3}[1 + 1] = 2/3 \approx 0.666$。
   不相等。
5. **结论**：具有 3 次代数精度。

</details>
