---
title: 环与域 (Rings and Fields)
---

# 环与域 (Rings and Fields)

## 环 (Ring)
集合 $R$ 带有两个二元运算（加法 $+$ 和乘法 $\cdot$），满足：
1. $(R, +)$ 是一个阿贝尔群。
2. $(R, \cdot)$ 满足结合律。
3. 乘法对加法满足分配律。

## 域 (Field)
如果一个交换环 $(F, +, \cdot)$ 满足 $F \setminus \{0\}$ 在乘法下是一个阿贝尔群，则称 $F$ 为一个**域**。
- 常见的域：实数域 $\mathbb{R}$、复数域 $\mathbb{C}$、有理数域 $\mathbb{Q}$。

## 理想 (Ideal)
环 $R$ 的子集 $I$ 称为左理想，如果：
1. $(I, +)$ 是子群。
2. 对于任意 $r \in R, a \in I$，有 $ra \in I$。
