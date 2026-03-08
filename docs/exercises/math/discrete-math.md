---
title: 离散数学练习
---

# 离散数学练习

> 按“逻辑 -> 集合与关系 -> 布尔代数 -> 图论 -> 组合与递推”分层组织。每题均提供可折叠解析。

## A. 命题逻辑与谓词逻辑

### 练习 1：等值化简

化简：$\neg(p\to q)\lor(q\to p)$。

<details>

<summary>点击查看解析与答案</summary>

$$

\neg(p\to q)\lor(q\to p)
\equiv\neg(\neg p\lor q)\lor(\neg q\lor p)
\equiv(p\land\neg q)\lor(\neg q\lor p)
\equiv p\lor\neg q.


$$

</details>

### 练习 2：永真式判断

判断 $((p\to q)\land(q\to r))\to(p\to r)$ 是否永真。

<details>

<summary>点击查看解析与答案</summary>

是永真式，体现蕴含传递律。

</details>

### 练习 3：范式

将 $\neg(p\leftrightarrow q)$ 写成 DNF。

<details>

<summary>点击查看解析与答案</summary>

$$

\neg(p\leftrightarrow q)
\equiv(p\land\neg q)\lor(\neg p\land q).


$$

</details>

### 练习 4：量词否定

把“并非所有算法都正确”翻译为谓词逻辑（设 $C(x)$：算法 $x$ 正确）。

<details>

<summary>点击查看解析与答案</summary>

$$

\neg\forall x\,C(x)\equiv\exists x\,\neg C(x).


$$

</details>

## B. 集合与关系

### 练习 5：集合恒等式

证明：$A\setminus(B\cup C)=(A\setminus B)\cap(A\setminus C)$。

<details>

<summary>点击查看解析与答案</summary>

元素法：

$$

x\in A\setminus(B\cup C)
\iff x\in A, x\notin B\cup C
\iff x\in A, x\notin B, x\notin C
\iff x\in(A\setminus B)\cap(A\setminus C).


$$

</details>

### 练习 6：幂集计数

设 $|A|=8$，求恰有 2 个元素的子集个数。

<details>

<summary>点击查看解析与答案</summary>

$$

\binom82=28.


$$

</details>

### 练习 7：等价类

在 $\mathbb Z$ 上定义 $a\sim b\iff a-b$ 能被 4 整除，写出 $[1]$。

<details>

<summary>点击查看解析与答案</summary>

$$

[1]=\{4k+1\mid k\in\mathbb Z\}.


$$

</details>

### 练习 8：偏序极值

在 $(\{1,2,3,6,12\},\mid)$ 中找最大元与极小元。

<details>

<summary>点击查看解析与答案</summary>

- 最大元：12；
- 极小元：1（因为 1 整除所有元素且无更小元素在集合中）。

</details>

## C. 布尔代数与逻辑电路

### 练习 9：吸收律化简

化简：$x+xy+\bar{x}y$。

<details>

<summary>点击查看解析与答案</summary>

$$

x+xy+\bar{x}y=x+\bar{x}y=(x+\bar{x})(x+y)=x+y.


$$

</details>

### 练习 10：乘积式化简

化简：$(x+y)(x+\bar{y})(\bar{x}+y)$。

<details>

<summary>点击查看解析与答案</summary>

先化前两项：$(x+y)(x+\bar y)=x$，
故原式为 $x(\bar x+y)=xy$。

</details>

### 练习 11：最小项表达

设 $f(x,y,z)=\Sigma m(1,2,7)$，写出对应 SOP。

<details>

<summary>点击查看解析与答案</summary>

$$

f=\bar x\bar y z+\bar x y\bar z+xyz.


$$

</details>

### 练习 12：完备门

说明为什么只用 NAND 门可以实现 OR 门。

<details>

<summary>点击查看解析与答案</summary>

由德摩根：$x+y=\overline{\bar x\cdot\bar y}$。
先用 NAND 构造 $\bar x=x\uparrow x,\ \bar y=y\uparrow y$，再做一次 NAND 即得 OR。

</details>

## D. 图论

### 练习 13：握手定理

无向图有 20 条边，所有顶点度数之和为多少？

<details>

<summary>点击查看解析与答案</summary>

$$

\sum d(v)=2|E|=40.


$$

</details>

### 练习 14：树判定

图有 9 个顶点、8 条边且连通，是否一定是树？

<details>

<summary>点击查看解析与答案</summary>

是。满足“连通 + 边数 $n-1$”。

</details>

### 练习 15：二分图

$C_7$ 与 $C_8$ 哪个是二分图？

<details>

<summary>点击查看解析与答案</summary>

偶环二分、奇环非二分：$C_8$ 是二分图，$C_7$ 不是。

</details>

### 练习 16：欧拉路判定

一个连通无向图中奇度顶点有 0 个，能否存在欧拉回路？

<details>

<summary>点击查看解析与答案</summary>

能。奇度顶点为 0 是欧拉回路存在的充要条件。

</details>

## E. 组合与递推

### 练习 17：排列

从 7 人中选出班长和副班长（职位不同）有多少种？

<details>

<summary>点击查看解析与答案</summary>

$$

P(7,2)=7\times6=42.


$$

</details>

### 练习 18：组合

从 10 道题中任选 3 道作答，有多少种选法？

<details>

<summary>点击查看解析与答案</summary>

$$

\binom{10}{3}=120.


$$

</details>

### 练习 19：二项式系数

$(1+x)^7$ 中 $x^4$ 的系数是多少？

<details>

<summary>点击查看解析与答案</summary>

$$

\binom74=35.


$$

</details>

### 练习 20：容斥

班级会 Java 的 26 人，会 Python 的 31 人，两者都会 12 人。至少会一种语言多少人？

<details>

<summary>点击查看解析与答案</summary>

$$

26+31-12=45.


$$

</details>

### 练习 21：鸽巢原理

任取 11 个整数，证明其中至少两个数模 10 同余。

<details>

<summary>点击查看解析与答案</summary>

模 10 只有 10 个余数类，11 个数放入 10 类，必有一类至少 2 个。

</details>

### 练习 22：基础递推

楼梯每步可走 1 或 2 级，设到第 $n$ 级方法数为 $f_n$，写出递推。

<details>

<summary>点击查看解析与答案</summary>

$$

f_n=f_{n-1}+f_{n-2},\quad f_1=1,f_2=2.


$$

</details>

### 练习 23：一阶线性递推

求解 $a_n=2a_{n-1}+1,\ a_0=0$。

<details>

<summary>点击查看解析与答案</summary>

$$

a_n=2^na_0+\frac{2^n-1}{2-1}=2^n-1.


$$

</details>

### 练习 24：二阶递推通解

求递推 $a_n=5a_{n-1}-6a_{n-2}$ 的通解。

<details>

<summary>点击查看解析与答案</summary>

特征方程 $\lambda^2-5\lambda+6=0$，根为 2 和 3，

$$

a_n=A\cdot2^n+B\cdot3^n.


$$

</details>

### 练习 25：生成函数

序列 $a_n=1$（$n\ge0$）的普通生成函数是什么？

<details>

<summary>点击查看解析与答案</summary>

$$

A(x)=\sum_{n\ge0}x^n=\frac{1}{1-x},\quad |x|<1.


$$

</details>

### 练习 26：计数建模

有 5 种不同颜色球，每种颜色可取任意个，组成总数为 7 个球的方案数是多少？

<details>

<summary>点击查看解析与答案</summary>

等价于求非负整数解个数：

$$

x_1+x_2+x_3+x_4+x_5=7.


$$

由“隔板法”：

$$

\binom{7+5-1}{5-1}=\binom{11}{4}=330.


$$

</details>

## 建议训练节奏

1. 第一天完成 A、B 组并复盘等值变形与关系判定。
2. 第二天完成 C、D 组并整理图论判定模板。
3. 第三天完成 E 组并总结递推到生成函数的转换步骤。
4. 错题按“定义遗漏 / 定理误用 / 计算失误 / 建模偏差”四类归档。

## F. 关系闭包与可达性

### 练习 27：自反闭包

设 $A=\{a,b,c\}$，$R=\{(a,b),(b,c)\}$，写出自反闭包 $R_r$。

<details>

<summary>点击查看解析与答案</summary>

$$

R_r=R\cup\{(a,a),(b,b),(c,c)\}.


$$

</details>

### 练习 28：对称闭包

设 $R=\{(1,2),(2,3)\}$，求对称闭包。

<details>

<summary>点击查看解析与答案</summary>

$$

R_s=\{(1,2),(2,3),(2,1),(3,2)\}.


$$

</details>

### 练习 29：传递闭包

在 $A=\{1,2,3,4\}$ 上，$R=\{(1,2),(2,3),(3,4)\}$。判断 $(1,4)$ 是否属于 $R^+$。

<details>

<summary>点击查看解析与答案</summary>

属于。因为存在链 $1\to2\to3\to4$，故 $(1,4)\in R^+$。

</details>

### 练习 30：关系矩阵

按顶点顺序 $(1,2,3)$，关系 $R=\{(1,2),(2,3),(1,3)\}$ 的矩阵是什么？

<details>

<summary>点击查看解析与答案</summary>

$$

M_R=
\begin{pmatrix}
0&1&1\\
0&0&1\\
0&0&0
\end{pmatrix}.


$$

</details>

### 练习 31：Warshall 单步更新

若某时刻 $w_{13}=0,w_{12}=1,w_{23}=1$，用中间点 $2$ 更新后 $w_{13}$ 变为多少？

<details>

<summary>点击查看解析与答案</summary>

$$

w_{13}'=w_{13}\lor(w_{12}\land w_{23})=0\lor(1\land1)=1.


$$

</details>

### 练习 32：偏序与 Hasse

在集合 $\{1,2,4,8\}$ 上按整除关系，最大元是谁？

<details>

<summary>点击查看解析与答案</summary>

最大元是 8，因为任一元素都整除 8。

</details>

### 练习 33：等价关系判定

关系 $R$ 在 $\mathbb Z$ 上定义为 $aRb\iff a-b$ 能被 5 整除。它是否是等价关系？

<details>

<summary>点击查看解析与答案</summary>

是等价关系。满足自反、对称、传递，实质是模 5 同余。

</details>

### 练习 34：最小等价闭包

若关系已满足自反、对称但不传递，为得到最小等价关系应如何处理？

<details>

<summary>点击查看解析与答案</summary>

补上传递闭包即可；在含自反条件下可写作取 $R^*$。

</details>
