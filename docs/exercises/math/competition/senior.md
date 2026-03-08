---
title: 高中数学竞赛练习
---

# 高中数学竞赛练习

本页按基础/提高/挑战组织，覆盖不等式、数论、组合与几何四个方向。

---

## 练习 1：不等式证明（基础）
已知 $a,b,c>0$，证明：
$$
a^3+b^3+c^3\ge 3abc.
$$

<details>
<summary>点击查看解析与答案</summary>

由 AM-GM：
$$
\frac{a^3+b^3+c^3}{3}\ge\sqrt[3]{a^3b^3c^3}=abc.
$$
两边乘 3 即得结论。

答案：成立。
</details>

## 练习 2：同余方程（基础）
求解：
$$
x\equiv1\pmod3,\quad x\equiv2\pmod5.
$$

<details>
<summary>点击查看解析与答案</summary>

设 $x=1+3t$，代入第二式：
$$
1+3t\equiv2\pmod5\Rightarrow 3t\equiv1\pmod5.
$$
因 $3^{-1}\equiv2\pmod5$，得 $t\equiv2\pmod5$。
故最小正解 $x=7$，通解
$$
x\equiv7\pmod{15}.
$$
</details>

## 练习 3：组合恒等式（提高）
证明：
$$
\sum_{k=0}^{n}\binom{n}{k}^2=\binom{2n}{n}.
$$

<details>
<summary>点击查看解析与答案</summary>

双计数：从两组各 $n$ 人中共选 $n$ 人。

- 若第一组选 $k$ 人，则第二组选 $n-k$ 人，方案数为 $\binom{n}{k}\binom{n}{n-k}=\binom{n}{k}^2$。
- 对 $k$ 求和得左边。
- 直接从 $2n$ 人中选 $n$ 人得右边。

故恒等式成立。
</details>

## 练习 4：分式不等式（提高）
设 $x,y,z>0$ 且 $x+y+z=1$，证明
$$
\frac{x}{1-x}+\frac{y}{1-y}+\frac{z}{1-z}\ge\frac32.
$$

<details>
<summary>点击查看解析与答案</summary>

令 $f(t)=\frac{t}{1-t}$，在 $(0,1)$ 上有
$$
f''(t)=\frac{2}{(1-t)^3}>0,
$$
故 $f$ 凸。由 Jensen：
$$
\frac{f(x)+f(y)+f(z)}{3}\ge f\!\left(\frac{x+y+z}{3}\right)=f\!\left(\frac13\right)=\frac12.
$$
乘以 3 即得结论。
</details>

## 练习 5：二次剩余判定（提高）
判断同余方程 $x^2\equiv5\pmod{11}$ 是否有解。

<details>
<summary>点击查看解析与答案</summary>

模 $11$ 的平方剩余为
$$
0^2,1^2,2^2,3^2,4^2,5^2\equiv 0,1,4,9,5,3\pmod{11}.
$$
其中包含 $5$，所以有解。
由 $4^2\equiv5\pmod{11}$，得解为
$$
x\equiv\pm4\pmod{11}.
$$
</details>

## 练习 6：塞瓦定理应用（提高）
在 $\triangle ABC$ 中，点 $D,E,F$ 分别在 $BC,CA,AB$ 上，已知
$$
\frac{BD}{DC}=2,\quad \frac{CE}{EA}=\frac34,
$$
且 $AD,BE,CF$ 共点，求 $\frac{AF}{FB}$。

<details>
<summary>点击查看解析与答案</summary>

由塞瓦定理
$$
\frac{BD}{DC}\cdot\frac{CE}{EA}\cdot\frac{AF}{FB}=1,
$$
故
$$
\frac{AF}{FB}=\frac{1}{2\cdot\frac34}=\frac23.
$$
</details>

## 练习 7：递推与特征根（挑战）
数列满足
$$
a_{n+2}=3a_{n+1}-2a_n,\quad a_1=1,\ a_2=4.
$$
求通项 $a_n$。

<details>
<summary>点击查看解析与答案</summary>

特征方程
$$
r^2-3r+2=0\Rightarrow (r-1)(r-2)=0.
$$
故
$$
a_n=A\cdot1^n+B\cdot2^n=A+B2^n.
$$
由初值：
$$
A+2B=1,\quad A+4B=4\Rightarrow B=\frac32,\ A=-2.
$$
所以
$$
a_n=-2+\frac32\,2^n=3\cdot2^{n-1}-2.
$$
</details>

## 练习 8：抽屉原理（挑战）
证明：任取 6 个整数，必存在两个整数之差能被 5 整除。

<details>
<summary>点击查看解析与答案</summary>

把整数按模 5 余数分类，仅有 5 类：
$$
0,1,2,3,4\pmod5.
$$
任取 6 个整数，依据抽屉原理，至少两个落在同一类。两数同余模 5，因此差被 5 整除。
</details>

## 练习 9：圆幂定理（挑战）
点 $P$ 在圆外，过 $P$ 作割线交圆于 $A,B$，且 $PA=2,PB=18$；作切线 $PT$。求 $PT$。

<details>
<summary>点击查看解析与答案</summary>

切割线-切线定理：
$$
PT^2=PA\cdot PB=2\cdot18=36.
$$
故 $PT=6$。
</details>

## 练习 10：双计数恒等式（提高）
证明：
$$
\sum_{k=0}^{n}k\binom{n}{k}=n2^{n-1}.
$$

<details>
<summary>点击查看解析与答案</summary>

计数集合 $S=\{(A,x)\mid A\subseteq[n],x\in A\}$。

- 按 $|A|=k$ 分类：贡献 $k\binom{n}{k}$，总数为左式。
- 按元素 $x$ 分类：每个 $x$ 被 $2^{n-1}$ 个子集包含，共 $n2^{n-1}$。

两种计数相等，结论成立。
</details>

## 练习 11：平面图边数上界（挑战）
设连通平面图有 $V\ge3$ 个顶点、$E$ 条边，且无重边无自环。若每个面至少由 3 条边围成，证明：
$$
E\le3V-6.
$$

<details>
<summary>点击查看解析与答案</summary>

面边计数得 $3F\le2E$；欧拉公式给出 $V-E+F=2$。
由 $F\le\frac{2E}{3}$ 代回，得
$$
2\le V-E+\frac{2E}{3}=V-\frac{E}{3}
\Rightarrow E\le3V-6.
$$
</details>

## 练习 12：同余与抽屉原理（基础）
证明：任取 11 个整数，必有两个整数之差能被 10 整除。

<details>
<summary>点击查看解析与答案</summary>

按模 10 余数分为 10 类。任取 11 个整数，至少两个落在同一余数类（抽屉原理），故两数同余模 10，差可被 10 整除。
</details>
