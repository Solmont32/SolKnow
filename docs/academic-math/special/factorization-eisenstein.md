---
title: 从因式分解到艾森斯坦判别法
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 从因式分解到艾森斯坦判别法

研究多项式在特定数域（如 $\mathbb{Q}$）上的不可约性。

## 因式分解基础
在整系数多项式环 $\mathbb{Z}[x]$ 中，因式分解是基础。高斯引理指出：一个整系数多项式在 $\mathbb{Q}$ 上可约，当且仅当它在 $\mathbb{Z}$ 上可约。

## 艾森斯坦判别法 (Eisenstein's Criterion)
设 $f(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_0$ 是整系数多项式。若存在质数 $p$ 满足：
1.  $p$ 不整除首项系数 $a_n$；
2.  $p$ 整除其余所有系数 $a_{n-1}, a_{n-2}, \dots, a_0$；
3.  $p^2$ 不整除常数项 $a_0$。

则 $f(x)$ 在有理数域 $\mathbb{Q}$ 上是不可约的。

<KnowledgeCard type="tip" title="应用实例">
判别分圆多项式 $\Phi_p(x) = \frac{x^p-1}{x-1}$ 的不可约性时，常令 $x = y+1$ 构造符合艾森斯坦条件的式子。
</KnowledgeCard>
