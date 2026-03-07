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
