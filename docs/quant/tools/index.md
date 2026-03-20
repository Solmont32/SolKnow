# 量化工具与平台

本节介绍量化交易中常用的开源工具、商业平台和数据源。

## 开源框架

### Python生态

#### Backtrader
```python
import backtrader as bt

class MyStrategy(bt.Strategy):
    params = (('period', 20),)

    def __init__(self):
        self.sma = bt.indicators.SimpleMovingAverage(period=self.p.period)

    def next(self):
        if self.data.close > self.sma:
            self.buy()
        elif self.data.close < self.sma:
            self.sell()

# 运行回测
cerebro = bt.Cerebro()
cerebro.addstrategy(MyStrategy)
data = bt.feeds.YahooFinanceData(dataname='AAPL', fromdate=datetime(2020, 1, 1))
cerebro.adddata(data)
cerebro.run()
cerebro.plot()
```
**特点**: 灵活、文档完善、社区活跃

#### VectorBT
```python
import vectorbt as vbt

# 超快速回测
price = vbt.YFData.download('BTC-USD').get('Close')
fast_ma = vbt.MA.run(price, 10)
slow_ma = vbt.MA.run(price, 50)

entries = fast_ma.ma_crossed_above(slow_ma)
exits = fast_ma.ma_crossed_below(slow_ma)

portfolio = vbt.Portfolio.from_signals(price, entries, exits, freq='1D')
print(portfolio.stats())
```
**特点**: 向量化、速度极快、适合大规模参数扫描

#### Qlib (微软)
```python
import qlib
from qlib.data import D
from qlib.contrib.model.gbdt import LGBModel

# 初始化
qlib.init(provider_uri='~/.qlib/qlib_data/cn_data')

# 获取数据
instruments = D.instruments(market='csi300')
fields = ['$close', '$volume', 'Ref($close, 1)', 'Mean($close, 20)']
df = D.features(instruments, fields, start_time='2020-01-01', freq='day')

# 训练模型
model = LGBModel()
model.fit(dataset)
```
**特点**: 端到端、AI导向、因子挖掘工具

### 国内框架

#### vn.py
```python
from vnpy.event import EventEngine
from vnpy.trader.engine import MainEngine
from vnpy.trader.ui import MainWindow, create_qapp
from vnpy_ctp import CtpGateway

# 启动事件引擎
event_engine = EventEngine()
main_engine = MainEngine(event_engine)
main_engine.add_gateway(CtpGateway)

# 连接CTP
main_engine.connect(
    setting={
        "用户名": "",
        "密码": "",
        "经纪商代码": "",
        "交易服务器": "",
        "行情服务器": ""
    },
    gateway_name="CTP"
)
```
**特点**: 全功能、支持国内全市场、实盘 ready

## 商业平台

### 国内平台

| 平台 | 特色 | 费用 |
|------|------|------|
| **聚宽 (JoinQuant)** | 数据丰富、社区活跃 | 免费+付费 |
| **米筐 (RiceQuant)** | 专业级、API完善 | 免费+付费 |
| **优矿 (UQER)** | 通联数据、研究工具 | 免费+付费 |
| **BigQuant** | AI导向、可视化 | 免费+付费 |
| **果仁网** | 非编程、因子平台 | 免费+付费 |

### 国际平台

| 平台 | 特色 | 费用 |
|------|------|------|
| **QuantConnect** | 多语言、云端、实盘 | 免费+付费 |
| **Quantopian** | 已停止运营 | - |
| **TradingView** | 图表强大、Pine脚本 | 免费+付费 |
| **Alpaca** | 零佣金、API友好 | 免费 |

## 数据源

### A股数据

#### Tushare
```python
import tushare as ts

pro = ts.pro_api('your_token')

# 日线数据
df = pro.daily(ts_code='000001.SZ', start_date='20230101', end_date='20231231')

# 财务数据
df = pro.income(ts_code='000001.SZ', period='20231231')

# 实时行情
df = ts.pro_bar(ts_code='000001.SZ', pro_api=pro, freq='1min')
```
**覆盖**: 股票、基金、期货、宏观、新闻
**费用**: 积分制，高级数据需付费

#### AKShare
```python
import akshare as ak

# 股票历史数据
df = ak.stock_zh_a_hist(symbol="000001", period="daily", start_date="20230101")

# 实时行情
df = ak.stock_zh_a_spot_em()

# 期货数据
df = ak.futures_zh_realtime(symbol="沪深300股指期货主力")

# 期权数据
df = ak.option_cffex_sz50_list()
```
**特点**: 完全免费、更新及时、纯Python

### 其他数据源

| 来源 | 覆盖 | 特点 |
|------|------|------|
| **Yahoo Finance** | 全球股票 | 免费、Python库(yfinance) |
| **Alpha Vantage** | 股票、外汇、加密 | API限制、免费层级 |
| **Quandl** | 金融、经济、另类 | 部分免费、机构级 |
| **Wind/同花顺** | A股专业数据 | 机构付费 |
| **聚宽/米筐数据** | A股、因子 | 平台内免费 |

## 开发工具

### 环境与IDE

```bash
# 推荐Python环境管理
conda create -n quant python=3.11
conda activate quant

# 核心包
pip install pandas numpy numba backtrader vectorbt
pip install akshare tushare
pip install matplotlib plotly
```

| 工具 | 用途 |
|------|------|
| **VS Code** | 通用IDE，插件丰富 |
| **PyCharm** | Python专业IDE |
| **Jupyter Lab** | 交互式研究 |
| **Docker** | 环境隔离与部署 |

### 数据库

#### TimescaleDB (时序)
```sql
-- 创建 hypertable
CREATE TABLE stock_prices (
    time TIMESTAMPTZ NOT NULL,
    symbol TEXT NOT NULL,
    open DOUBLE PRECISION,
    high DOUBLE PRECISION,
    low DOUBLE PRECISION,
    close DOUBLE PRECISION,
    volume DOUBLE PRECISION
);

SELECT create_hypertable('stock_prices', 'time');

-- 查询
SELECT time_bucket('1 day', time) AS day,
       first(open, time) as open,
       max(high) as high,
       min(low) as low,
       last(close, time) as close
FROM stock_prices
WHERE symbol = '000001.SZ'
GROUP BY day;
```

#### InfluxDB
```python
from influxdb_client import InfluxDBClient

client = InfluxDBClient(url="http://localhost:8086", token="your-token")
write_api = client.write_api()

# 写入数据
from influxdb_client import Point
point = Point("stock_price") \
    .tag("symbol", "000001.SZ") \
    .field("close", 10.5) \
    .time("2024-01-01T09:30:00Z")
write_api.write(bucket="stocks", record=point)
```

## 实用工具库

### 技术指标
```python
import pandas_ta as ta

# 计算指标
df.ta.sma(length=20, append=True)      # 简单移动平均
df.ta.rsi(length=14, append=True)       # RSI
df.ta.macd(append=True)                 # MACD
df.ta.bbands(length=20, append=True)    # 布林带

# 批量计算所有指标
df.ta.strategy(ta.AllStrategy)
```

### 财务计算
```python
import numpy_financial as npf

# 计算IRR
cash_flows = [-1000, 300, 400, 400, 300]
irr = npf.irr(cash_flows)

# 计算NPV
npv = npf.npv(0.1, cash_flows)  # 折现率10%
```

## 选择建议

### 初学者
1. **AKShare** + **Jupyter** 快速开始
2. **Backtrader** 学习回测
3. **聚宽/米筐** 了解平台化流程

### 进阶开发者
1. **vn.py** 实盘交易
2. **VectorBT** 大规模研究
3. **自研系统** 完全控制

### 机构级别
1. **Wind/iFinD** 专业数据
2. **C++核心** + **Python接口**
3. **KDB+** 高性能时序数据库

## 延伸阅读

- [Python 量化生态详解](/docs/quant/programming/python-ecosystem)
- [实盘部署](/docs/quant/practice/deployment)
- [性能优化](/docs/quant/programming/optimization)
