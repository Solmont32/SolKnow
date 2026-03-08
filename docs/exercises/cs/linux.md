---
title: Linux 实操练习
---

# Linux 实操练习

---

## 练习 1：文件权限修改
如何将文件 `script.sh` 设置为仅所有者可读写并执行，其他用户无任何权限？

<details>

<summary>点击查看解析与答案</summary>

#### 命令
`chmod 700 script.sh`

#### 解析
- 7 (rwx) 代表 4+2+1。
- 0 代表没有任何权限。

</details>

