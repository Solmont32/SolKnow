# 区块链基础

理解区块链技术是加密量化的基础，本节介绍核心概念和技术原理。

## 区块链核心概念

### 分布式账本
```
传统数据库          区块链
─────────          ──────
中心化服务器    →   分布式节点
单点控制        →   共识机制
可篡改          →   不可篡改
私有          →   透明可追溯
```

### 区块结构
```
┌─────────────────────────────────────┐
│              Block N                │
├─────────────────────────────────────┤
│  Header:                            │
│    - Previous Hash (前一区块哈希)    │
│    - Timestamp (时间戳)              │
│    - Merkle Root (交易摘要)          │
│    - Nonce (随机数)                  │
├─────────────────────────────────────┤
│  Body:                              │
│    - Transactions (交易列表)         │
│    - Smart Contracts (合约代码)      │
└─────────────────────────────────────┘
```

## 共识机制

| 机制 | 原理 | 代表 | 特点 |
|------|------|------|------|
| **PoW** | 算力竞争 | 比特币 | 安全性高、能耗大 |
| **PoS** | 权益质押 | 以太坊2.0 | 节能环保、门槛低 |
| **DPoS** | 委托权益 | EOS | 效率高、中心化倾向 |

## 比特币 vs 以太坊

### 比特币（数字黄金）
- **模型**: UTXO（未花费交易输出）
- **脚本**: 简单脚本，非图灵完备
- **用途**: 价值存储、转账

```python
# UTXO模型示例
inputs = [
    {"txid": "abc...", "vout": 0, "value": 1.0},  # 之前收到的1 BTC
]
outputs = [
    {"address": " recipient1", "value": 0.5},     # 发送0.5 BTC
    {"address": " sender_change", "value": 0.499}, # 找零
]
# 0.001 BTC作为手续费
```

### 以太坊（世界计算机）
- **模型**: 账户模型（余额+存储+代码）
- **智能合约**: 图灵完备，支持复杂逻辑
- **Gas机制**: 计算资源付费

```python
# 以太坊账户类型
账户 = {
    "address": "0x...",
    "balance": 10.5,          # ETH余额
    "nonce": 5,               # 交易计数
    "code": "0x...",          # 合约代码（合约账户）
    "storage": {...}          # 存储状态
}
```

## 密码学基础

### 哈希函数
- **SHA-256**: 比特币使用，输出256位哈希
- **Keccak-256**: 以太坊使用

```python
import hashlib

def sha256(data):
    return hashlib.sha256(data.encode()).hexdigest()

# 特性：
# 1. 单向性：无法从哈希反推原文
# 2. 确定性：相同输入总是得到相同输出
# 3. 敏感性：微小输入变化导致输出剧变
```

### 非对称加密
- **私钥**: 随机生成的256位数字，必须保密
- **公钥**: 由私钥推导，可以公开
- **地址**: 公钥的哈希值，用于接收资产

```python
from eth_account import Account

# 生成新账户
account = Account.create()
private_key = account.key.hex()      # 私钥：保密！
address = account.address            # 地址：0x...
```

## 智能合约基础

### Solidity入门
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
```

### 常用DeFi合约类型
- **DEX**: Uniswap、Curve（自动做市商）
- **借贷**: Aave、Compound（超额抵押借贷）
- **衍生品**: dYdX、GMX（永续合约）
- **聚合器**: 1inch、Paraswap（最优路由）

## 链上数据获取

### RPC调用
```python
from web3 import Web3

# 连接以太坊节点
w3 = Web3(Web3.HTTPProvider('https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY'))

# 获取最新区块
latest_block = w3.eth.get_block('latest')
print(f"区块高度: {latest_block.number}")
print(f"时间戳: {latest_block.timestamp}")
print(f"交易数: {len(latest_block.transactions)}")

# 获取账户余额
balance = w3.eth.get_balance('0x...')
print(f"余额: {w3.from_wei(balance, 'ether')} ETH")
```

### 事件日志（Event Logs）
```python
# 监听Transfer事件
filter = w3.eth.filter({
    'address': '0xdAC17F958D2ee523a2206206994597C13D831ec7',  # USDT合约
    'topics': [Web3.keccak(text='Transfer(address,address,uint256)').hex()]
})

logs = filter.get_all_entries()
for log in logs:
    print(f"转账: {log}")
```

## 延伸阅读

- [市场微观结构](market-microstructure) — 交易所与流动性
- [DeFi协议](defi-protocols) — 去中心化金融详解
- [链上数据分析](onchain-analysis) — 数据获取与指标
