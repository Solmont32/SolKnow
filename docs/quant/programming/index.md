# 量化编程与工具

量化交易的实现离不开高效的编程和工具链，本节介绍量化开发的技术栈。

## 编程语言选择

| 语言 | 适用场景 | 优势 | 劣势 |
|------|----------|------|------|
| **Python** | 策略研究、中低频交易 | 生态丰富、开发快 | 执行速度慢 |
| **C++** | 高频交易、计算密集型 | 极致性能、低延迟 | 开发周期长 |
| **Rust** | 系统级开发、安全性 | 安全与性能平衡 | 学习曲线陡 |
| **Julia** | 科学计算 | 接近C的速度 | 生态较小 |
| **R** | 统计分析 | 统计包丰富 | 性能一般 |

## Python 量化生态

### 核心库

```python
# 数据处理
import pandas as pd      # 表格数据处理
import numpy as np       # 数值计算
import polars as pl      # 高性能DataFrame（新兴）

# 数值加速
from numba import jit    # JIT编译加速
import cython            # C扩展编译

# 金融计算
import pandas_ta as ta   # 技术分析指标
import vectorbt as vbt   # 回测框架

# 可视化
import matplotlib.pyplot as plt
import plotly.express as px  # 交互式图表
```

### 主要框架

| 框架 | 特点 | 适用 |
|------|------|------|
| [Backtrader](https://www.backtrader.com/) | 灵活、社区活跃 | 中低频研究 |
| [Zipline](https://github.com/quantopian/zipline) | Quantopian出品 | 美股研究 |
| [vn.py](https://www.vnpy.com/) | 国产、全功能 | 实盘交易 |
| [Qlib](https://github.com/microsoft/qlib) | 微软出品、AI导向 | 因子挖掘 |
| [QuantConnect](https://www.quantconnect.com/) | 云平台 | 多语言支持 |

## 数据获取

### A股数据源

```python
import tushare as ts
import akshare as ak

# Tushare - 需要注册token
pro = ts.pro_api('your_token')
df = pro.daily(ts_code='000001.SZ', start_date='20230101')

# AKShare - 免费开源
df = ak.stock_zh_a_hist(symbol="000001", period="daily")
```

### 其他数据源

| 来源 | 覆盖范围 | 特点 |
|------|----------|------|
| Yahoo Finance | 全球主要市场 | 免费、Python库 |
| Alpha Vantage | 股票、外汇、加密 | API调用限制 |
| Quandl/NASDAQ | 金融、另类数据 | 部分付费 |
| 万得/同花顺iFinD | A股专业数据 | 机构级、付费 |

## 数据库选择

### 时序数据库
- **InfluxDB**：专为时序数据设计，查询高效
- **TimescaleDB**：PostgreSQL扩展，兼容SQL
- **ClickHouse**：列式存储，分析性能强

### 关系型数据库
- **PostgreSQL**：通用性强，生态完善
- **MySQL**：广泛使用，运维简单

### 文件存储
- **Parquet**：列式存储，压缩率高
- **HDF5**：适合大规模数值数组
- **Feather**：快速读写，跨语言

## C++ 高性能计算

### 适用场景
- 高频交易（延迟 < 1ms）
- 大规模回测（分钟级K线以上）
- 复杂数值计算（蒙特卡洛模拟）

### 常用库
```cpp
// 数值计算
#include <Eigen/Dense>      // 线性代数
#include <xtensor/xarray.hpp> // Numpy风格数组

// 金融计算
#include <QuantLib/quantlib.hpp>  // 金融工具定价

// 低延迟网络
#include <boost/asio.hpp>   // 异步IO
```

## 开发环境

### 推荐IDE
- **VS Code**：轻量、插件丰富
- **PyCharm**：Python专业支持
- **CLion**：C++开发
- **Jupyter Lab**：交互式研究

### 版本控制
```bash
# 策略代码管理
git init quant-strategies
git add .
git commit -m "Initial strategy framework"

# 使用Git LFS管理大数据文件
git lfs track "*.csv"
git lfs track "*.h5"
```

## 部署与监控

### 容器化
```dockerfile
# Dockerfile示例
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "trading_bot.py"]
```

### 监控工具
- **Prometheus + Grafana**：指标收集与可视化
- **Sentry**：错误追踪
- **日志系统**：ELK Stack (Elasticsearch, Logstash, Kibana)

## 延伸阅读

- [回测系统](/docs/quant/backtest/) — 策略验证框架搭建
- [机器学习](/docs/quant/ml/) — ML模型实现
- [实盘部署](/docs/quant/practice/deployment) — 生产环境最佳实践
