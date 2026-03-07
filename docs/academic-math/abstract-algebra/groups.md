# 群论 (Groups)

## 定义
一个群是一个集合 $G$ 连同一个二元运算 $\cdot$（称为群运算），满足以下四个性质：
1. **封闭性 (Closure)**：对于 $G$ 中任意两个元素 $a, b$，都有 $a \cdot b \in G$。
2. **结合律 (Associativity)**：对于 $G$ 中任意三个元素 $a, b, c$，都有 $(a \cdot b) \cdot c = a \cdot (b \cdot c)$。
3. **单位元 (Identity)**：存在一个元素 $e \in G$，使得对于 $G$ 中任何元素 $a$，都有 $e \cdot a = a \cdot e = a$。
4. **逆元 (Inverse)**：对于 $G$ 中任何元素 $a$，都存在一个元素 $b \in G$（记作 $a^{-1}$），使得 $a \cdot b = b \cdot a = e$。

## 子群与正规子群
- **子群 (Subgroup)**：如果 $G$ 的一个子集 $H$ 在同样的运算下也构成一个群，则称 $H$ 是 $G$ 的子群。
- **正规子群 (Normal Subgroup)**：如果对于 $G$ 中任何元素 $g$ 和 $H$ 中任何元素 $h$，$g h g^{-1} \in H$，则称 $H$ 是 $G$ 的正规子群。

## 拉格朗日定理 (Lagrange's Theorem)
如果 $H$ 是有限群 $G$ 的子群，那么 $H$ 的阶 $|H|$ 整除 $G$ 的阶 $|G|$。
