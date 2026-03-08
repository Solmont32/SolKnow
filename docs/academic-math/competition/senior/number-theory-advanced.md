---
title: 竞赛数论：原根、剩余与构造
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛数论：原根、剩余与构造

高中数论竞赛在同余的基础上，深入研究模指数结构与存在性证明。

## 一、 核心知识点讲解

### 1. 中国剩余定理 (CRT)
用于求解模数两两互质的一元线性同余方程组。

### 2. 阶与原根
-   **阶**：满足 $a^k \equiv 1 \pmod n$ 的最小正整数 $k$。
-   **原根**：若 $a$ 的阶等于 $\phi(n)$，则称 $a$ 为模 $n$ 的原根。存在原根的充要条件：$n = 2, 4, p^k, 2p^k$。

### 3. 二次剩余 (Quadratic Residue)
-   研究 $x^2 \equiv a \pmod p$ 是否有解。
-   **勒让德符号 (Legendre Symbol)** 与 **二次互反律**：$\left(\frac{p}{q}\right)\left(\frac{q}{p}\right) = (-1)^{\frac{p-1}{2}\frac{q-1}{2}}$。

<KnowledgeCard type="tip" title="解题关键">
在处理不定方程 $x^n + y^n = z^n$ 类的题目时，**“无穷递降法”** 或 **“模分析法”** 是核心手段。
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：勒让德符号的计算
判断 $x^2 \equiv 3 \pmod{13}$ 是否有解。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **计算勒让德符号**：$\left(\frac{3}{13}\right)$。
2.  **应用二次互反律**：$\left(\frac{3}{13}\right) = \left(\frac{13}{3}\right) \cdot (-1)^{\frac{3-1}{2}\frac{13-1}{2}}$。
3.  **简化计算**：
    -   $\left(\frac{13}{3}\right) = \left(\frac{1}{3}\right) = 1$。
    -   指数部分：$1 \times 6 = 6$（偶数），故 $(-1)^6 = 1$。
4.  **结果**：$\left(\frac{3}{13}\right) = 1 \times 1 = 1$。
5.  **结论**：由于结果为 $1$，说明该方程有解。

#### 答案
有解。
</details>

---

## 三、进阶例题补充（本轮新增）

### 例题 2：阶的应用
求 $2^{100}\pmod{13}$。

<details>
<summary>点击查看解析与答案</summary>

由 $2^{12}\equiv1\pmod{13}$，且 $100\equiv4\pmod{12}$，
故 $2^{100}\equiv2^4\equiv3\pmod{13}$。

</details>

### 例题 3：Wilson 定理应用
证明：若 $p$ 为素数，则 $(p-1)!\equiv-1\pmod p$。

<details>
<summary>点击查看解析与答案</summary>

模 $p$ 的非零元中，除 $1,-1$ 外其余元素可按逆元成对，乘积均为 1，故全积为 $-1$。

</details>

## 四、配套练习（本轮新增）

### 练习 2（基础）
求解同余组：
$$
x\equiv1\pmod4,\quad x\equiv2\pmod5.
$$

<details>
<summary>点击查看过程与答案</summary>

设 $x=1+4t$，代入得 $4t\equiv1\pmod5$，故 $t\equiv4\pmod5$。
最小解 $x=17$，通解 $x\equiv17\pmod{20}$。

</details>

### 练习 3（提高）
判断 $x^2\equiv5\pmod{11}$ 是否可解。

<details>
<summary>点击查看过程与答案</summary>

平方剩余集合含 5（例如 $4^2\equiv5\pmod{11}$），故有解。

</details>
