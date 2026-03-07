---
title: 导数 (Derivatives)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 导数 (Derivatives)

导数描述了函数在某一点的变化率，几何上对应切线的斜率。

## 定义
函数 $f(x)$ 在点 $x_0$ 处的导数定义为：
$$f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$$

## 基本求导法则
-   **线性法则**：$(af + bg)' = af' + bg'$
-   **乘法法则**：$(uv)' = u'v + uv'$
-   **除法法则**：$(\frac{u}{v})' = \frac{u'v - uv'}{v^2}$
-   **复合函数求导 (链式法则)**：若 $y = f(u), u = g(x)$，则：
    $$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$

<KnowledgeCard type="warning" title="注意">
函数在某点**可导**必定**连续**，但**连续**不一定**可导**（例如 $f(x) = |x|$ 在 $x=0$ 处）。
</KnowledgeCard>

## 高阶导数与莱布尼茨公式
$$(uv)^{(n)} = \sum_{k=0}^n \binom{n}{k} u^{(n-k)} v^{(k)}$$

## 微分中值定理
1.  **罗尔定理**：若 $f(a)=f(b)$，则 $\exists \xi \in (a,b)$ 使得 $f'(\xi)=0$。
2.  **拉格朗日中值定理**：
    $$f(b) - f(a) = f'(\xi)(b - a)$$
3.  **柯西中值定理**：
    $$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(\xi)}{g'(\xi)}$$
