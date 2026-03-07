---
title: 现代密码学 (Cryptography)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 现代密码学

密码学是信息安全的数学核心。

## 算法分类
- **对称加密**：AES, DES。速度快，安全性依赖于密钥保护。
- **非对称加密**：RSA, ECC。解决密钥分发问题。
- **哈希算法**：SHA-256, MD5（已不再安全）。

<KnowledgeCard type="warning" title="安全提示">
绝对不要尝试自创加密算法。始终使用经过工业界验证的标准库。
</KnowledgeCard>
