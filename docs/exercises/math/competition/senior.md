---
title: 高中数学竞赛练习
---

# 高中数学竞赛练习

---

## 练习 1：不等式证明
已知 $a, b, c > 0$，证明：$a^3 + b^3 + c^3 \ge 3abc$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **利用均值不等式**：对于三个正数 $a^3, b^3, c^3$。
2. **计算**：$\frac{a^3 + b^3 + c^3}{3} \ge \sqrt[3]{a^3 b^3 c^3}$。
3. **化简**：$\frac{a^3 + b^3 + c^3}{3} \ge abc \implies a^3 + b^3 + c^3 \ge 3abc$。

#### 答案
证毕。
</details>

---

## 练习 2：同余方程（基础）
求解：$x\equiv1\pmod3,\ x\equiv2\pmod5$。

<details>
<summary>点击查看解析与答案</summary>

令 $x=1+3t$，得 $1+3t\equiv2\pmod5$，即 $3t\equiv1\pmod5$。
$3^{-1}\equiv2\pmod5$，故 $t\equiv2\pmod5$，最小解 $x=7$。
通解 $x\equiv7\pmod{15}$。

</details>

## 练习 3：组合恒等式（提高）
证明：
$$
\sum_{k=0}^{n}\binom{n}{k}^2=\binom{2n}{n}.
$$

<details>
<summary>点击查看解析与答案</summary>

双计数：从两组各 $n$ 人中共选 $n$ 人。
若第一组选 $k$ 人，则第二组选 $n-k$ 人，方案数 $\binom{n}{k}\binom{n}{n-k}=\binom{n}{k}^2$。
求和即左式；直接计数为右式。

</details>

## 练习 4：不等式（挑战）
设 $x,y,z>0$ 且 $x+y+z=1$，证明
$$
\frac{x}{1-x}+\frac{y}{1-y}+\frac{z}{1-z}\ge\frac32.
$$

<details>
<summary>点击查看解析与答案</summary>

函数 $f(t)=\frac{t}{1-t}$ 在 $(0,1)$ 上凸，Jensen 得
$$
\frac{f(x)+f(y)+f(z)}3\ge f\!\left(\frac13\right)=\frac12.
$$
故原式成立。

</details>
