---
title: 离散数学练习
---

# 离散数学练习

> 按“逻辑 -> 集合与关系 -> 图论 -> 组合”分层组织。每题均提供可折叠解析。

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

## C. 图论

### 练习 9：握手定理
无向图有 20 条边，所有顶点度数之和为多少？

<details>
<summary>点击查看解析与答案</summary>

$$
\sum d(v)=2|E|=40.
$$

</details>

### 练习 10：树判定
图有 9 个顶点、8 条边且连通，是否一定是树？

<details>
<summary>点击查看解析与答案</summary>

是。满足“连通 + 边数 $n-1$”。

</details>

### 练习 11：二分图
$C_7$ 与 $C_8$ 哪个是二分图？

<details>
<summary>点击查看解析与答案</summary>

偶环二分、奇环非二分：$C_8$ 是二分图，$C_7$ 不是。

</details>

### 练习 12：欧拉路判定
一个连通无向图中奇度顶点有 0 个，能否存在欧拉回路？

<details>
<summary>点击查看解析与答案</summary>

能。奇度顶点为 0 是欧拉回路存在的充要条件。

</details>

## D. 组合数学

### 练习 13：排列
从 7 人中选出班长和副班长（职位不同）有多少种？

<details>
<summary>点击查看解析与答案</summary>

$$
P(7,2)=7\times6=42.
$$

</details>

### 练习 14：组合
从 10 道题中任选 3 道作答，有多少种选法？

<details>
<summary>点击查看解析与答案</summary>

$$
\binom{10}{3}=120.
$$

</details>

### 练习 15：二项式系数
$(1+x)^7$ 中 $x^4$ 的系数是多少？

<details>
<summary>点击查看解析与答案</summary>

$$
\binom74=35.
$$

</details>

### 练习 16：容斥
班级会 Java 的 26 人，会 Python 的 31 人，两者都会 12 人。至少会一种语言多少人？

<details>
<summary>点击查看解析与答案</summary>

$$
26+31-12=45.
$$

</details>

### 练习 17：鸽巢原理
任取 11 个整数，证明其中至少两个数模 10 同余。

<details>
<summary>点击查看解析与答案</summary>

模 10 只有 10 个余数类，11 个数放入 10 类，必有一类至少 2 个。

</details>

### 练习 18：递推建模
楼梯每步可走 1 或 2 级，设到第 $n$ 级方法数为 $f_n$，写出递推。

<details>
<summary>点击查看解析与答案</summary>

$$
f_n=f_{n-1}+f_{n-2},\quad f_1=1,f_2=2.
$$

</details>

## 建议训练节奏
1. 第一天完成 A、B 组并复盘等值变形。
2. 第二天完成 C、D 组并整理常用判定定理。
3. 错题按“定义遗漏 / 定理误用 / 计算失误”三类归档。
