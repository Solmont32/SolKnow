---
title: 计算机网络 (Computer Networking)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Network, Globe, Shield } from 'lucide-react';

# 计算机网络

计算机网络是现代信息社会的基石。本章从协议分层模型（OSI 七层与 TCP/IP 四层）出发，深入探讨数据在网络中的流动与解析。

## 核心内容索引

- [数据封包解析与网络原语](../system-architecture-and-primitives#3-计算机网络数据封包解析与原语)
- **物理层与链路层**：信道编码、以太网帧结构、MAC 地址。
- **网络层 (IP)**：路由选择、子网掩码、ICMP。
- **传输层 (TCP/UDP)**：三次握手、四次挥手、滑动窗口、拥塞控制。
- **应用层**：HTTP/HTTPS, DNS, FTP.

---

<KnowledgeCard type="warning" title="Endianness (字节序)">
在网络编程中，**网络字节序 (Network Byte Order)** 统一规定为 **大端序 (Big-Endian)**。主机在发送和接收数据时必须调用 `htonl`/`ntohl` 系列函数进行转换。
</KnowledgeCard>
