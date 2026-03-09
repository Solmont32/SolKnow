---
title: 泛函分析专题练习库 (Functional Analysis Exercises)
description: 涵盖 Banach 空间三大定理、Hilbert 空间几何及线性算子理论的深度练习，附带详细折叠解答。
---

# 泛函分析专题练习库

> 本练习库对标研究生水平的泛函分析课程（如张恭庆《泛函分析讲义》），旨在通过严密的习题训练深化对无限维空间结构的理解。

---

## A 组：赋范空间、Baire 纲与三大定理 {#fa-a1}

### 练习 A1（完备性判定）
设 $C^1[0,1]$ 为连续可微函数空间。定义范数 $\|f\|_* = \max_{t \in [0,1]} |f(t)|$. 证明：$(C^1[0,1], \|\cdot\|_*)$ 不是 Banach 空间。

<details>
<summary>查看解析</summary>

**证明**：
1. 完备性要求每个 Cauchy 序列都收敛到空间内的元素。
2. 考虑函数序列 $f_n(x) = \sqrt{x^2 + 1/n}$。
3. 在 $\|\cdot\|_*$ 下，$f_n(x) \to |x|$（一致收敛）。
4. 然而，$|x|$ 在 $x=0$ 处不可导，故不属于 $C^1[0,1]$。
5. 结论：该空间不完备。若要使其完备，需使用更强的范数 $\|f\| = \|f\|_\infty + \|f'\|_\infty$。

</details>

### 练习 A2（一致有界性原理：逆向应用）
设 $X$ 为 Banach 空间，$Y$ 为赋范空间。若 $T_n \in \mathcal{B}(X, Y)$ 满足对每个 $x \in X$，序列 $\{T_n x\}$ 在 $Y$ 中强收敛。证明：算子序列的范数 $\{\|T_n\|\}$ 必有界。

<details>
<summary>查看解析</summary>

**证明**：
1. 由于 $\{T_n x\}$ 收敛，由收敛序列必有界可知，对每个 $x \in X$，有 $\sup_n \|T_n x\| < \infty$。
2. 这正好满足一致有界性原理（Banach-Steinhaus 定理）的条件。
3. 因此，存在 $M > 0$ 使得 $\sup_n \|T_n\| \le M$。
4. **补充**：定义 $Tx = \lim T_n x$，则 $T$ 也是有界线性算子，且 $\|T\| \le \liminf \|T_n\|$。

</details>

---

## B 组：Hilbert 空间、正交性与对偶 {#fa-b1}

### 练习 B1（极化恒等式）
证明复内积空间中的极化恒等式：
$$ \langle x, y \rangle = \frac{1}{4} \sum_{k=0}^3 i^k \|x + i^k y\|^2 $$

<details>
<summary>查看解析</summary>

**证明**：
1. 展开右式各项：
   - $\|x+y\|^2 = \|x\|^2 + \|y\|^2 + \langle x, y \rangle + \langle y, x \rangle$
   - $\|x-y\|^2 = \|x\|^2 + \|y\|^2 - \langle x, y \rangle - \langle y, x \rangle$
   - $\|x+iy\|^2 = \|x\|^2 + \|y\|^2 - i\langle x, y \rangle + i\langle y, x \rangle$
   - $\|x-iy\|^2 = \|x\|^2 + \|y\|^2 + i\langle x, y \rangle - i\langle y, x \rangle$
2. 组合计算 $\sum i^k \| \dots \|^2$：
   - 实部：$(\|x+y\|^2 - \|x-y\|^2) = 2(\langle x, y \rangle + \langle y, x \rangle) = 4 \operatorname{Re} \langle x, y \rangle$
   - 虚部：$i(\|x+iy\|^2 - \|x-iy\|^2) = i(-2i \langle x, y \rangle + 2i \langle y, x \rangle) = 2(\langle x, y \rangle - \langle y, x \rangle) = 4i \operatorname{Im} \langle x, y \rangle$
3. 相加即得 $4 \langle x, y \rangle$。

</details>

### 练习 B2（Riesz 表示定理的构造）
在 $L^2(0,1)$ 中，求一个元素 $y$，使得对所有 $f \in L^2(0,1)$，有 $\int_0^1 f(t) e^t dt = \langle f, y \rangle$.

<details>
<summary>查看解析</summary>

**解析**：
1. 内积定义为 $\langle f, y \rangle = \int_0^1 f(t) \overline{y(t)} dt$。
2. 对比已知等式：$\int_0^1 f(t) e^t dt = \int_0^1 f(t) \overline{y(t)} dt$。
3. 显然 $\overline{y(t)} = e^t$，由于 $e^t$ 是实函数，故 $y(t) = e^t$。
4. 验证有界性：$\int_0^1 (e^t)^2 dt = \int_0^1 e^{2t} dt = \frac{1}{2}(e^2 - 1) < \infty$，故 $y \in L^2(0,1)$。

</details>

---

## C 组：算子理论、谱分解与自伴算子 {#fa-c1}

### 练习 C1（自伴算子的谱半径）
证明：若 $T$ 是 Hilbert 空间上的自伴算子，则 $\|T\| = r(T)$.

<details>
<summary>查看解析</summary>

**证明**：
1. 对于自伴算子，$\|T^2\| = \|T^* T\| = \|T\|^2$。
2. 通过归纳法可得 $\|T^{2^n}\| = \|T\|^{2^n}$。
3. 根据谱半径公式 $r(T) = \lim_{k \to \infty} \|T^k\|^{1/k}$。
4. 取子序列 $k = 2^n$，$r(T) = \lim_{n \to \infty} (\|T\|^{2^n})^{1/2^n} = \|T\|$。
5. **意义**：这说明自伴算子的范数完全由其谱的大小决定。

</details>

### 练习 C2（谱分类实战）
在 $\ell^2$ 上定义右移算子 $S(x_1, x_2, \dots) = (0, x_1, x_2, \dots)$.
1. 求 $\|S\|$.
2. $0$ 是否为特征值？
3. 证明 $\sigma(S) = \{ \lambda \in \mathbb{C} : |\lambda| \le 1 \}$.

<details>
<summary>查看解析</summary>

**解析**：
1. $\|Sx\|^2 = \sum |x_i|^2 = \|x\|^2$，故 $\|S\| = 1$。
2. **特征值**：若 $Sx = \lambda x$，则 $(0, x_1, x_2, \dots) = (\lambda x_1, \lambda x_2, \dots)$。
   - 若 $\lambda \neq 0$，则 $\lambda x_1 = 0 \Rightarrow x_1 = 0 \dots \Rightarrow x = 0$。
   - 若 $\lambda = 0$，则 $Sx = 0 \Rightarrow x = 0$。
   - 故点谱 $\sigma_p(S) = \emptyset$。
3. **谱**：
   - 因为 $\|S\|=1$，故谱落在单位圆盘内。
   - 考虑其伴随算子 $S^*$（左移算子），其特征值充斥了单位开圆盘 $\{\lambda : |\lambda| < 1\}$。
   - 利用 $\sigma(S) = \sigma(S^*)$ 的对称性及谱的闭性，得 $\sigma(S)$ 为闭单位圆盘。

</details>

---

## 导航与反馈

- [返回泛函分析首页](/docs/academic-math/functional-analysis)
- [查看 Banach 空间理论](/docs/academic-math/functional-analysis/banach-spaces)
- [查看 Hilbert 空间理论](/docs/academic-math/functional-analysis/hilbert-spaces)
- [查看算子谱理论](/docs/academic-math/functional-analysis/spectral-theory)
