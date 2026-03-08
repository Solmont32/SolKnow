---
title: 多元函数的极限与连续 (Multivariable Limits and Continuity)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第十六章 多元函数的极限与连续

在研究一元函数时，我们是在实数轴 $\mathbb{R}$ 上进行的。多元微积分的研究对象是 $n$ 维欧几里得空间 $\mathbb{R}^n$ 中的点集与函数。本章将把极限与连续的概念推广到高维空间，其核心挑战在于**方向的无穷性**。

## 一、 欧几里得空间与拓扑基础

### 1. 欧几里得空间 $\mathbb{R}^n$

$n$ 维欧几里得空间是所有 $n$ 元有序实数组 $\mathbf{x} = (x_1, x_2, \dots, x_n)$ 的集合。

- **内积与范数**：$\langle \mathbf{x}, \mathbf{y} \rangle = \sum x_i y_i$，$\|\mathbf{x}\| = \sqrt{\langle \mathbf{x}, \mathbf{x} \rangle}$。
- **距离 (Distance)**：$d(\mathbf{x}, \mathbf{y}) = \|\mathbf{x} - \mathbf{y}\| = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}$。
- **邻域 (Neighborhood)**：点 $\mathbf{x}_0$ 的 $\delta$ 邻域为 $U(\mathbf{x}_0, \delta) = \{ \mathbf{x} \in \mathbb{R}^n \mid d(\mathbf{x}, \mathbf{x}_0) < \delta \}$。

### 2. 点集的分类

- **内点 (Interior Point)**：存在邻域 $U(\mathbf{x}_0) \subset E$。
- **界点 (Boundary Point)**：任一邻域既含有 $E$ 的点，也含有 $E^c$ 的点。
- **聚点 (Accumulation Point)**：任一去心邻域 $\mathring{U}(\mathbf{x}_0)$ 内含有 $E$ 的无穷多个点。
- **开集与闭集**：全部由内点组成的集合为开集；包含所有聚点的集合为闭集。

---

## 二、 多元函数的极限 (Limits)

### 1. 重极限 (Double Limit) 的严谨定义

设 $f(\mathbf{x})$ 在点 $\mathbf{x}_0$ 的某去心邻域 $\mathring{U}(\mathbf{x}_0)$ 内有定义（$\mathbf{x}_0$ 为定义域的聚点）。

**$\epsilon-\delta$ 定义**：
若对于任意给定的 $\epsilon > 0$，总存在 $\delta > 0$，使得当 $0 < d(\mathbf{x}, \mathbf{x}_0) < \delta$ 且 $\mathbf{x} \in D_f$ 时，恒有：

$$|f(\mathbf{x}) - L| < \epsilon$$

则称 $L$ 为 $f(\mathbf{x})$ 当 $\mathbf{x} \to \mathbf{x}_0$ 时的**重极限**，记作 $\lim_{\mathbf{x} \to \mathbf{x}_0} f(\mathbf{x}) = L$。

> **深度理解**：一元极限 $\lim_{x \to x_0}$ 只有两个方向（左、右）；而在 $\mathbb{R}^n$ 中，点 $\mathbf{x}$ 可以沿着**无数条**曲线趋于 $\mathbf{x}_0$。重极限存在的条件极其苛刻：必须要求**无论以何种方式、从何种方向**趋近，函数值都趋于同一个常数 $L$。

### 2. 累次极限 (Iterated Limits)

以二元函数 $f(x, y)$ 为例，若先对 $y$ 取极限，再对 $x$ 取极限，称为累次极限：

$$L_{12} = \lim_{x \to x_0} \left( \lim_{y \to y_0} f(x, y) \right), \quad L_{21} = \lim_{y \to y_0} \left( \lim_{x \to x_0} f(x, y) \right)$$

#### 重极限与累次极限的关系 (重要定理)

**定理**：若重极限 $\lim_{(x, y) \to (x_0, y_0)} f(x, y) = L$ 存在，且对每个固定的 $x$，单变量极限 $\lim_{y \to y_0} f(x, y)$ 存在，则累次极限 $L_{12}$ 必存在且 $L_{12} = L$。

**推论**：

1. 若两个累次极限均存在且不相等，则重极限必不存在。
2. 若重极限存在，且两个累次极限也都存在，则三者必相等。
3. **警示**：累次极限相等 $\not\Rightarrow$ 重极限存在；重极限存在 $\not\Rightarrow$ 累次极限存在（可能内层极限不存在）。

---

## 三、 多元函数的连续性 (Continuity)

### 1. 连续性的定义

若 $\lim_{\mathbf{x} \to \mathbf{x}_0} f(\mathbf{x}) = f(\mathbf{x}_0)$，则称 $f$ 在点 $\mathbf{x}_0$ 处连续。

### 2. 有界闭区域上连续函数的性质及证明

#### (1) 有界性定理

**定理**：若 $f(\mathbf{x})$ 在有界闭区域 $D \subset \mathbb{R}^n$ 上连续，则 $f(\mathbf{x})$ 在 $D$ 上有界。

**证明（反证法 + Bolzano-Weierstrass 定理）**：
假设 $f$ 在 $D$ 上无界，则对每个 $k \in \mathbb{N}$，存在 $\mathbf{x}_k \in D$ 使得 $|f(\mathbf{x}_k)| > k$。
由于 $D$ 是有界集，点列 $\{\mathbf{x}_k\}$ 有界。由 **B-W 定理**（高维版），存在收敛子列 $\{\mathbf{x}_{k_j}\} \to \mathbf{x}^*$。
因为 $D$ 是闭集，故 $\mathbf{x}^* \in D$。
由于 $f$ 在 $\mathbf{x}^*$ 连续，应有 $\lim_{j \to \infty} f(\mathbf{x}_{k_j}) = f(\mathbf{x}^*)$，这与 $|f(\mathbf{x}_{k_j})| > k_j \to \infty$ 矛盾。故原命题成立。

#### (2) 介值定理

**定理**：若 $f(\mathbf{x})$ 在连通集 $D$ 上连续，且 $f(\mathbf{A}) = a, f(\mathbf{B}) = b$。对任意介于 $a, b$ 之间的数 $\mu$，必存在 $\mathbf{C} \in D$ 使得 $f(\mathbf{C}) = \mu$。

**证明思路**：
利用连通性的性质。在连通集 $D$ 中，存在连接 $\mathbf{A}, \mathbf{B}$ 的连续曲线 $\mathbf{r}(t)$（$t \in [0, 1]$）。
构造复合函数 $g(t) = f(\mathbf{r}(t))$。由于 $f$ 和 $\mathbf{r}$ 均连续，$g(t)$ 是一元连续函数。
由一元连续函数的介值定理，$g(0)=a, g(1)=b$，必存在 $t_0 \in [0, 1]$ 使得 $g(t_0) = \mu$。
取 $\mathbf{C} = \mathbf{r}(t_0) \in D$，即得 $f(\mathbf{C}) = \mu$。

---

## 四、 深度辨析例题 (5 道)

<KnowledgeCard 
  title="辨析 1：路径依赖的陷阱" 
  content="证明 $\lim_{(x, y) \to (0, 0)} \frac{xy^2}{x^2 + y^4}$ 不存在。"
  color="#3b82f6"
/>

<details>

<summary>点击查看解析</summary>

1. **沿直线 $y = kx$**：

$$\lim_{x \to 0} \frac{x(kx)^2}{x^2 + (kx)^4} = \lim_{x \to 0} \frac{k^2x^3}{x^2 + k^4x^4} = \lim_{x \to 0} \frac{k^2x}{1 + k^4x^2} = 0$$

所有直线路径极限均为 0。2. **沿抛物线 $x = y^2$**：

$$\lim_{y \to 0} \frac{y^2 \cdot y^2}{(y^2)^2 + y^4} = \lim_{y \to 0} \frac{y^4}{2y^4} = \frac{1}{2}$$

3. **结论**：虽然所有直线路径结果一致，但特殊曲线路径结果不同，故重极限不存在。**注意：$y=kx$ 齐次判定法不总是足够的。**

</details>

<KnowledgeCard 
  title="辨析 2：累次极限相等但重极限不存在" 
  content="考察 $f(x, y) = \frac{xy}{x^2 + y^2}$ 在 $(0, 0)$ 点的极限。"
  color="#8b5cf6"
/>

<details>

<summary>点击查看解析</summary>

1. **累次极限**：
   - $\lim_{x \to 0} (\lim_{y \to 0} \frac{xy}{x^2 + y^2}) = \lim_{x \to 0} (0) = 0$
   - $\lim_{y \to 0} (\lim_{x \to 0} \frac{xy}{x^2 + y^2}) = \lim_{y \to 0} (0) = 0$
     两个累次极限存在且相等。
2. **重极限**：
   沿 $y = x$ 趋近：$\lim_{x \to 0} \frac{x^2}{x^2 + x^2} = \frac{1}{2} \neq 0$。
3. **结论**：累次极限相等是重极限存在的必要不充分条件。

</details>

<KnowledgeCard 
  title="辨析 3：重极限存在但累次极限不存在" 
  content="考察 $f(x, y) = (x+y)\sin\frac{1}{x}\sin\frac{1}{y}$ 在 $(0, 0)$ 点的极限。"
  color="#f59e0b"
/>

<details>

<summary>点击查看解析</summary>

1. **重极限**：
   由于 $|\sin\frac{1}{x}\sin\frac{1}{y}| \le 1$，由夹逼准则：
   $0 \le |(x+y)\sin\frac{1}{x}\sin\frac{1}{y}| \le |x+y|$
   当 $(x, y) \to (0, 0)$ 时，$|x+y| \to 0$，故重极限为 0。
2. **累次极限**：
   内层极限 $\lim_{y \to 0} f(x, y)$ 不存在（因为 $\sin\frac{1}{y}$ 在 0 附近剧烈震荡）。
3. **结论**：重极限存在时，累次极限不一定存在。

</details>

<KnowledgeCard 
  title="辨析 4：单独连续 vs 联合连续" 
  content="设 $f(x, y) = \begin{cases} \frac{xy}{x^2+y^2} & (x, y) \neq (0, 0) \\ 0 & (x, y) = (0, 0) \end{cases}$。讨论其连续性。"
  color="#ef4444"
/>

<details>

<summary>点击查看解析</summary>

1. **固定 $y=0$**：$f(x, 0) = 0$，对 $x$ 连续。
2. **固定 $x=0$**：$f(0, y) = 0$，对 $y$ 连续。
3. **联合连续性**：由辨析 2 知，$\lim_{(x, y) \to (0, 0)} f(x, y)$ 不存在（沿 $y=x$ 为 1/2）。
4. **结论**：在一个点处对每个变量分别连续，**不能**推导出在该点联合连续。

</details>

<KnowledgeCard 
  title="辨析 5：极坐标法的应用边界" 
  content="求 $\lim_{(x, y) \to (0, 0)} \frac{x^3 + y^3}{x^2 + y^2}$。"
  color="#10b981"
/>

<details>

<summary>点击查看解析</summary>

1. **令 $x = r\cos\theta, y = r\sin\theta$**：

$$\frac{r^3\cos^3\theta + r^3\sin^3\theta}{r^2} = r(\cos^3\theta + \sin^3\theta)$$

2. **判定**：
   $|r(\cos^3\theta + \sin^3\theta)| \le r(|\cos^3\theta| + |\sin^3\theta|) \le 2r$。
   由于 $2r \to 0$（当 $r \to 0$ 时），且该估计与 $\theta$ 无关（一致趋于 0）。
3. **结论**：极限存在且为 0。**注意：必须证明极限过程与 $\theta$ 无关方可使用极坐标。**

</details>

---

## 五、 章内专题练习 (In-Chapter Exercises)

:::tip 练习说明
以下练习旨在巩固多元极限与连续的核心概念。建议先独立思考，再点击展开查看详细解析。
:::

### 练习 1：利用夹逼准则求极限
求 $\lim_{(x, y) \to (0, 0)} \frac{x^2 y^2}{x^2 + y^2}$。

<details>
<summary>点击查看解析</summary>

**解析**：
观察被积函数的形式。由于 $x^2 \le x^2 + y^2$，故有 $0 \le \frac{x^2}{x^2 + y^2} \le 1$。
因此：
$$0 \le \left| \frac{x^2 y^2}{x^2 + y^2} \right| = \left| \frac{x^2}{x^2 + y^2} \right| \cdot y^2 \le y^2$$
当 $(x, y) \to (0, 0)$ 时，$y^2 \to 0$。
由夹逼准则（Squeeze Theorem），原极限为 **0**。

</details>

### 练习 2：累次极限与重极限的辨析
设 $f(x, y) = \frac{x^2-y^2}{x^2+y^2}$，求其在 $(0,0)$ 处的累次极限与重极限。

<details>
<summary>点击查看解析</summary>

**解析**：
1. **累次极限**：
   - $\lim_{x \to 0} (\lim_{y \to 0} \frac{x^2-y^2}{x^2+y^2}) = \lim_{x \to 0} \frac{x^2}{x^2} = 1$。
   - $\lim_{y \to 0} (\lim_{x \to 0} \frac{x^2-y^2}{x^2+y^2}) = \lim_{y \to 0} \frac{-y^2}{y^2} = -1$。
2. **重极限**：
   由于两个累次极限存在且不相等（$1 \neq -1$），由重极限与累次极限的关系定理，**重极限必不存在**。

</details>

### 练习 3：极坐标在极限证明中的应用
证明 $\lim_{(x, y) \to (0, 0)} (x^2 + y^2) \ln(x^2 + y^2) = 0$。

<details>
<summary>点击查看解析</summary>

**解析**：
令 $x = r \cos \theta, y = r \sin \theta$，则 $x^2 + y^2 = r^2$。
当 $(x, y) \to (0, 0)$ 时，$r \to 0^+$。
原极限转化为一元极限：
$$\lim_{r \to 0^+} r^2 \ln(r^2) = 2 \lim_{r \to 0^+} r^2 \ln r$$
利用洛必达法则：
$$\lim_{r \to 0^+} \frac{\ln r}{1/r^2} = \lim_{r \to 0^+} \frac{1/r}{-2/r^3} = \lim_{r \to 0^+} -\frac{r^2}{2} = 0$$
由于极限结果与 $\theta$ 无关，故原重极限为 **0**。

</details>

### 练习 4：二元函数的连续性判定
讨论函数 $f(x, y) = \begin{cases} \frac{\sin(xy)}{x} & x \neq 0 \\ y & x = 0 \end{cases}$ 在 $(0, y_0)$ 点的连续性。

<details>
<summary>点击查看解析</summary>

**解析**：
要判定在 $(0, y_0)$ 点的连续性，需计算重极限 $\lim_{(x, y) \to (0, y_0)} f(x, y)$ 并与 $f(0, y_0) = y_0$ 比较。
当 $x \neq 0$ 时：
$$\lim_{(x, y) \to (0, y_0)} \frac{\sin(xy)}{x} = \lim_{(x, y) \to (0, y_0)} \frac{\sin(xy)}{xy} \cdot y$$
由于 $\lim_{u \to 0} \frac{\sin u}{u} = 1$ 且 $\lim_{(x, y) \to (0, y_0)} y = y_0$，故：
$$\lim_{(x, y) \to (0, y_0)} f(x, y) = 1 \cdot y_0 = y_0$$
因为极限值等于函数值 $f(0, y_0)$，故函数在 $(0, y_0)$ 点**连续**。

</details>

---

<SupportingExercises
topic="多元函数极限与连续"
fileId="analysis-multivariable-calculus"
exercises={[
{ index: 16.1, title: "二重极限不存在证明", slug: "练习-161二重极限不存在的证明" },
{ index: 16.2, title: "多元函数的连续性判定", slug: "练习-162多元函数的连续性判定" }
]}
/>

---

_编者注：掌握多元极限的关键在于跳出一元思维的束缚。要时刻警惕“沿直线极限相等”这一假象，多尝试非线性路径或极坐标估计。_
