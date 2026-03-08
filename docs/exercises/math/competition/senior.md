---
title: 高中数学竞赛练习
---

# 高中数学竞赛练习

本页按基础/提高/挑战组织，覆盖不等式、数论、组合与几何四个方向。所有题目均提供折叠解析。

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
其中包含 $5$，所以有解。由 $4^2\equiv5\pmod{11}$，得解为
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
由初值
$$
A+2B=1,\quad A+4B=4\Rightarrow B=\frac32,\ A=-2.
$$
所以
$$
a_n=3\cdot2^{n-1}-2.
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

## 练习 13：Schur 型不等式（挑战）
设 $a,b,c\ge0$，证明
$$
a^3+b^3+c^3+3abc\ge a^2b+a^2c+b^2a+b^2c+c^2a+c^2b.
$$

<details>
<summary>点击查看解析与答案</summary>

按 Schur 不等式三次型直接成立；也可将右式移项后整理为
$$
\frac12\sum_{cyc}(a-b)^2(a+b-c)\ge0
$$
（在三元非负下成立）。故原不等式成立。
</details>

## 练习 14：CRT 进阶构造（提高）
求解同余组
$$
x\equiv2\pmod3,\quad x\equiv3\pmod4,\quad x\equiv1\pmod5.
$$

<details>
<summary>点击查看解析与答案</summary>

先联立前两式：$x=2+3t$，代入得 $3t\equiv1\pmod4$，故 $t\equiv3\pmod4$，即
$$
x\equiv11\pmod{12}.
$$
再设 $x=11+12s$，代入第三式：
$$
11+12s\equiv1\pmod5\Rightarrow1+2s\equiv1\Rightarrow s\equiv0\pmod5.
$$
故
$$
x\equiv11\pmod{60}.
$$
</details>

## 练习 15：原根判定（提高）
判断 3 是否为模 7 的原根。

<details>
<summary>点击查看解析与答案</summary>

$\varphi(7)=6$，检查 $3^{6/2}=3^3=27\equiv6\not\equiv1$，
且 $3^{6/3}=3^2=9\equiv2\not\equiv1\pmod7$。
故 $\operatorname{ord}_7(3)=6$，3 是模 7 的原根。
</details>

## 练习 16：组合构造（挑战）
证明：在任意 9 个整数中，总能选出若干个（至少一个），其和能被 9 整除。

<details>
<summary>点击查看解析与答案</summary>

设前缀和 $S_k=a_1+\cdots+a_k\ (k=1,\dots,9)$。若某个 $S_k\equiv0\pmod9$，结论成立。
否则 $S_1,\dots,S_9$ 的模 9 余数都在 $1\sim8$ 中，共 9 个数放入 8 类，必有 $S_i\equiv S_j\pmod9$（$i<j$）。
则
$$
a_{i+1}+\cdots+a_j=S_j-S_i\equiv0\pmod9.
$$
故总能找到一段连续子段和被 9 整除。
</details>

## 练习 17：函数方程（挑战）
求满足
$$
f(x+y)=f(x)+f(y)+xy,\quad f(0)=0
$$
且在 $\mathbb R$ 上连续的函数。

<details>
<summary>点击查看解析与答案</summary>

令 $g(x)=f(x)-\frac{x^2}{2}$，则
$$
g(x+y)=f(x+y)-\frac{(x+y)^2}{2}=g(x)+g(y).
$$
又 $g$ 连续，故 $g(x)=cx$。因此
$$
f(x)=\frac{x^2}{2}+cx.
$$
</details>

## 练习 18：几何与代数结合（挑战）
在锐角三角形 $ABC$ 中，设 $a,b,c$ 分别为对边，证明
$$
a^2+b^2+c^2\ge4\sqrt{3}\,\Delta
$$
其中 $\Delta$ 为三角形面积。

<details>
<summary>点击查看解析与答案</summary>

这是经典的 Weitzenbock 不等式：
$$
a^2+b^2+c^2\ge4\sqrt3\,\Delta.
$$
可由 Schur 不等式配合海伦公式推得，也可在 $uvw$ 框架下证明。竞赛中通常作为标准结论调用，等号当且仅当三角形为正三角形。

</details>


## 练习 19：Vieta 结构（基础）
已知二次方程 $x^2-sx+p=0$ 的两根为 $2,5$，求 $s,p$。

<details>
<summary>点击查看解析与答案</summary>

由 Vieta：
$$
s=2+5=7,\quad p=2\cdot5=10.
$$
</details>

## 练习 20：整系数根筛选（提高）
求方程
$$
x^3-2x^2-5x+6=0
$$
的所有整数根。

<details>
<summary>点击查看解析与答案</summary>

整数根候选为 $\pm1,\pm2,\pm3,\pm6$。
代入得 $P(1)=0$，故有因子 $(x-1)$。
继续分解：
$$
x^3-2x^2-5x+6=(x-1)(x^2-x-6)=(x-1)(x-3)(x+2).
$$
整数根为 $1,3,-2$。
</details>

## 练习 21：重根参数（提高）
求参数 $a$，使
$$
x^2-2ax+a^2+a-2=0
$$
有重根。

<details>
<summary>点击查看解析与答案</summary>

重根条件是判别式为 0：
$$
\Delta=(2a)^2-4(a^2+a-2)=8-4a.
$$
令 $\Delta=0$，得 $a=2$。
</details>

## 练习 22：四次方程代换（挑战）
解方程
$$
x^4-10x^2+9=0.
$$

<details>
<summary>点击查看解析与答案</summary>

设 $u=x^2$，得
$$
u^2-10u+9=0\Rightarrow (u-1)(u-9)=0.
$$
故 $u=1$ 或 $u=9$，于是
$$
x=\pm1,\pm3.
$$
</details>

## 练习 23：倒数型方程（挑战）
解方程
$$
x+\frac{4}{x}=5,\quad x\ne0.
$$

<details>
<summary>点击查看解析与答案</summary>

乘以 $x$：
$$
x^2-5x+4=0=(x-1)(x-4).
$$
故解为 $x=1$ 或 $x=4$。
</details>

## 练习 24：根的幂和（挑战）
设 $\alpha,\beta$ 是方程 $x^2-3x+1=0$ 的两根，求
$$
\alpha^2+\beta^2.
$$

<details>
<summary>点击查看解析与答案</summary>

由 Vieta：$\alpha+\beta=3,\ \alpha\beta=1$。
$$
\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta=9-2=7.
$$
</details>
