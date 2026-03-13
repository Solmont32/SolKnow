---
title: 命题演算与形式系统 (Propositional Calculus)
description: 命题逻辑、形式证明系统（希尔伯特系统、自然推理）与完备性
---

import { Code2, Layers } from 'lucide-react';

# 命题演算与形式系统

命题逻辑不仅是符号化的思维，其核心是构建**形式演算系统**。在本章中，我们将讨论如何从公理或推理规则出发，系统化地推导出所有逻辑真理。

## 1. 命题演算的形式定义

一个形式化命题系统 $\mathcal{L}$ 由以下部分组成：

1. **字母表**：命题变元 $p, q, r, \dots$ 和联结词 $\neg, \to, \dots$。
2. **合式公式 (WFF)**：定义良好的逻辑表达式。
3. **公理 (Axioms)**：系统内预设为真的公式。
4. **推理规则**：如**分离规则 (Modus Ponens)**：从 $P$ 和 $P \to Q$ 推导出 $Q$。

## 2. 自然推理系统 (Natural Deduction)

自然推理不设公理，而是为每个联结词定义“引入”和“消去”规则。

### 2.1 引入与消去规则

- **$\land$-引入**：若有 $P$ 和 $Q$，可推得 $P \land Q$。
- **$\to$-消去 (MP)**：从 $P \to Q$ 和 $P$ 推得 $Q$。
- **$\neg$-消去 (归谬法)**：若从 $P$ 推导出矛盾，则推得 $\neg P$。

### 2.2 证明示例

证明 $p \to q, \neg q \vdash \neg p$（否定后件律）：

1. $p \to q$ (前提)
2. $\neg q$ (前提)
3. 假设 $p$:
   - 由 1, 3 推得 $q$ (MP 规则)
   - $q$ 与 $\neg q$ 矛盾
4. 故 $\neg p$ (由 3 归谬法)

## 3. 语义与证明论的关系

### 3.1 可靠性 (Soundness)

若 $\Gamma \vdash A$（可通过规则推导），则 $\Gamma \models A$（语义上恒真）。

> 系统导出的结果一定是正确的。

### 3.2 完备性 (Completeness)

若 $\Gamma \models A$（语义上恒真），则 $\Gamma \vdash A$（可通过规则推导）。

> 所有正确的真理都能被系统导出。

## 4. 谓词演算进阶

在谓词逻辑中，形式系统增加了对量词的控制：

- **全称特指 (UI)**: $\forall x A(x) \to A(t)$。
- **存在泛化 (EG)**: $A(t) \to \exists x A(x)$。

---

## 5. 计算验证：C++ 真值表生成器 <Code2 className="inline-block ml-1" />

逻辑公式可以通过程序进行穷举验证。以下是一个简单的 C++ 示例，用于生成蕴含式 $(p \to q)$ 的真值表。

<details>
<summary>点击查看 C++ 验证代码</summary>

```cpp
#include <iostream>
#include <iomanip>

/**
 * @brief 生成 p -> q 的真值表
 */
int main() {
    std::cout << "p\tq\tp -> q" << std::endl;
    std::cout << "--------------------" << std::endl;

    bool vals[] = {true, false};
    for (bool p : vals) {
        for (bool q : vals) {
            // 蕴含 p -> q 等价于 !p || q
            bool res = !p || q;
            std::cout << (p ? "T" : "F") << "\t"
                      << (q ? "T" : "F") << "\t"
                      << (res ? "T" : "F") << std::endl;
        }
    }
    return 0;
}
```

</details>

---

## 6. 跨领域映射 <Layers className="inline-block ml-1" />

| 领域               | 对应概念                    | 说明                                      |
| :----------------- | :-------------------------- | :---------------------------------------- |
| **计算机体系结构** | 逻辑门 (AND, OR, NOT)       | 命题逻辑的物理实现。                      |
| **程序设计**       | 布尔表达式与短路求值        | `if (p && q)` 本质上是逻辑合取的应用。    |
| **人工智能**       | 知识表示与推理 (SAT Solver) | 自动推理系统解决复杂的逻辑约束满足问题。  |
| **形式化方法**     | 程序正确性证明              | 使用 Hoare 逻辑等形式系统确保代码无 Bug。 |

---

## 7. 经典练习

:::info 练习 1
使用推理规则证明：$(p \to r) \land (q \to r) \equiv (p \lor q) \to r$。
:::

<details>
<summary>查看证明</summary>

1. **证明 $(p \to r) \land (q \to r) \vdash (p \lor q) \to r$**：
   - 前提：$p \to r$，$q \to r$。
   - 假设 $p \lor q$。
   - 分情况讨论：
     - 若 $p$：由前提 1 推得 $r$。
     - 若 $q$：由前提 2 推得 $r$。
   - 无论哪种情况都有 $r$，故 $(p \lor q) \to r$。

2. **证明 $(p \lor q) \to r \vdash (p \to r) \land (q \to r)$**：
   - 假设 $p$。则 $p \lor q$ 成立。
   - 由前提推得 $r$。故 $p \to r$。
   - 同理可得 $q \to r$。
   - 合取即证。
   </details>

:::info 练习 2
判断下列公式是否为有效公式（恒真）：$\forall x P(x) \to \exists x P(x)$。
:::

<details>
<summary>查看解析</summary>

在**非空论域**中，该公式是恒真的。

1. 假设论域中有个体 $a$。
2. 若 $\forall x P(x)$ 为真，则 $P(a)$ 必为真。
3. 因为存在个体 $a$ 使 $P(a)$ 为真，故 $\exists x P(x)$ 必为真。
4. 所以前件真蕴含后件真，公式为有效公式。
</details>

---

_本章节由 SolKnow 系统深度优化。_
