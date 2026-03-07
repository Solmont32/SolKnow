---
title: 数学分析精选练习
---

# 数学分析精选练习

---

## 练习 1：求极限
计算 $\lim_{x \to 0} \frac{\sin 5x}{3x}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **利用重要极限**：$\lim_{u \to 0} \frac{\sin u}{u} = 1$。
2. **恒等变形**：
   $$\frac{\sin 5x}{3x} = \frac{\sin 5x}{5x} \cdot \frac{5x}{3x} = \frac{\sin 5x}{5x} \cdot \frac{5}{3}$$
3. **求极限**：
   $$\lim_{x \to 0} (\frac{\sin 5x}{5x} \cdot \frac{5}{3}) = 1 \cdot \frac{5}{3} = \frac{5}{3}$$

#### 答案
$5/3$
</details>

---

## 练习 2：求导数
求 $y = x \ln x$ 的导数。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **应用乘法法则**：$(uv)' = u'v + uv'$。
2. **计算**：
   $$y' = (x)' \ln x + x (\ln x)' = 1 \cdot \ln x + x \cdot \frac{1}{x} = \ln x + 1$$

#### 答案
$\ln x + 1$
</details>

---

## 练习 3：一致连续性判定
判断 $f(x) = \frac{1}{x}$ 在区间 $(0, 1)$ 上是否一致连续。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **取点序列**：取 $x_n = 1/n$，$x'_n = 1/2n$。
2. **计算差值**：当 $n \to \infty$ 时，$|x_n - x'_n| = |1/2n| \to 0$。
3. **函数值差**：$|f(x_n) - f(x'_n)| = |n - 2n| = n \to \infty$。
4. **结论**：对任意小的 $\delta$，总能找到点对使函数值差大于任意正数，故在 $(0, 1)$ 上不一致连续。

#### 答案
不一致连续。
</details>

---

## 练习 4：介值定理的应用
证明方程 $x^3 - 4x + 1 = 0$ 在区间 $[0, 1]$ 内至少有一个实根。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **构造函数**：设 $f(x) = x^3 - 4x + 1$。
2. **端点值**：
   - $f(0) = 0 - 0 + 1 = 1 > 0$
   - $f(1) = 1 - 4 + 1 = -2 < 0$
3. **连续性**：$f(x)$ 是多项式，在 $[0, 1]$ 上连续。
4. **结论**：由零点定理，$\exists \xi \in (0, 1)$ 使得 $f(\xi) = 0$。

#### 答案
在区间 $[0, 1]$ 内至少有一个实根。
</details>

---

## 练习 5：二重积分计算
计算 $\iint_D (x + y) dA$，其中 $D$ 是由 $y = \sqrt{x}$ 和 $y = x^2$ 围成的区域。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **交点计算**：$x^2 = \sqrt{x} \implies x^4 = x \implies x(x^3 - 1) = 0$。交点为 $(0, 0)$ 和 $(1, 1)$。
2. **确定范围**：$0 \le x \le 1, x^2 \le y \le \sqrt{x}$。
3. **设置积分**：
   $$I = \int_0^1 dx \int_{x^2}^{\sqrt{x}} (x + y) dy$$
4. **计算内层**：
   $$\int_{x^2}^{\sqrt{x}} (x + y) dy = [xy + \frac{1}{2}y^2]_{x^2}^{\sqrt{x}} = (x\sqrt{x} + \frac{1}{2}x) - (x^3 + \frac{1}{2}x^4)$$
   $$= x^{3/2} + \frac{1}{2}x - x^3 - \frac{1}{2}x^4$$
5. **计算外层**：
   $$\int_0^1 (x^{3/2} + \frac{1}{2}x - x^3 - \frac{1}{2}x^4) dx = [\frac{2}{5}x^{5/2} + \frac{1}{4}x^2 - \frac{1}{4}x^4 - \frac{1}{10}x^5]_0^1$$
   $$= \frac{2}{5} + \frac{1}{4} - \frac{1}{4} - \frac{1}{10} = \frac{4}{10} - \frac{1}{10} = \frac{3}{10}$$

#### 答案
$3/10$
</details>

---

## 练习 6：利用柱坐标计算三重积分
计算 $\iiint_\Omega z dV$，其中 $\Omega$ 是由柱面 $x^2 + y^2 = 1$ 和平面 $z = 0, z = 1$ 围成的区域。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **采用柱坐标**：$x = \rho \cos \phi, y = \rho \sin \phi, z = z$。
2. **确定范围**：$0 \le \rho \le 1, 0 \le \phi \le 2\pi, 0 \le z \le 1$。
3. **设置积分**：
   $$I = \int_0^{2\pi} d\phi \int_0^1 \rho d\rho \int_0^1 z dz$$
4. **计算**：
   $$I = 2\pi \cdot [\frac{1}{2}\rho^2]_0^1 \cdot [\frac{1}{2}z^2]_0^1 = 2\pi \cdot \frac{1}{2} \cdot \frac{1}{2} = \frac{\pi}{2}$$

#### 答案
$\pi/2$
</details>
