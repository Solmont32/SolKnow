# 格 (Lattices)

## 定义 (偏序集定义)
一个格是一个偏序集 $(L, \le)$，其中任意两个元素 $a, b$ 都有唯一的上确界 (Join, $\lor$) 和唯一的下确界 (Meet, $\land$)。
- $a \lor b = \sup\{a, b\}$
- $a \land b = \inf\{a, b\}$

## 定义 (代数定义)
一个格是一个集合 $L$ 连同两个二元运算 $\lor$ 和 $\land$，满足：
1. **结合律**：$a \lor (b \lor c) = (a \lor b) \lor c$, $a \land (b \land c) = (a \land b) \land c$
2. **交换律**：$a \lor b = b \lor a$, $a \land b = b \land a$
3. **等幂律**：$a \lor a = a$, $a \land a = a$
4. **吸收律**：$a \lor (a \land b) = a$, $a \land (a \lor b) = a$

## 布尔代数 (Boolean Algebra)
布尔代数是一个有界、分配且有补的格。
