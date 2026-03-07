# Linux 权限管理

Linux 是多用户系统，权限模型（Permissions）是系统安全的基石。

## 用户与用户组 (User & Group)
- **用户 (User)**：系统中的独立账户。
- **用户组 (Group)**：一组具有相同权限的用户。
- `/etc/passwd`：用户账户信息文件。
- `/etc/group`：用户组信息文件。

## 权限位解读 (The Permissions String)
通过 `ls -l` 查看文件权限，例如 `-rwxr-xr--`：
- 第 1 位：文件类型 (`-` 文件, `d` 目录, `l` 软链接)。
- 第 2-4 位：所有者 (User) 权限。
- 第 5-7 位：所属组 (Group) 权限。
- 第 8-10 位：其他用户 (Others) 权限。

### 权限符号
- `r` (4)：Read (读取)。
- `w` (2)：Write (修改)。
- `x` (1)：Execute (执行)。

## 常用操作命令
### 1. 权限修改 (chmod)
- 符号模式：`chmod u+x filename` (给所有者加执行权)。
- 数字模式：`chmod 755 filename` (所有者 rwx, 组 rx, 其他 rx)。

### 2. 所有者修改 (chown)
- `chown root:root filename` (修改所有者与所属组)。

### 3. sudo 命令
- 以超级用户 (root) 身份执行命令。
- 配置在 `/etc/sudoers` 中。
