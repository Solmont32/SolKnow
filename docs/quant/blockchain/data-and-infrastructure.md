# 加密数据获取与基础设施

加密货币量化的核心优势在于数据透明度高、获取门槛低。本节介绍如何构建高效的加密数据基础设施。

## 数据类型概览

```
加密数据类型
─────────────────────────────────────────────────────────────
│
├── 市场数据 (Market Data)
│   ├── 价格数据: OHLCV、Tick数据、订单簿
│   ├── 交易数据: 成交记录、资金流向
│   └── 衍生品数据: 资金费率、持仓量、爆仓数据
│
├── 链上数据 (On-chain Data)
│   ├── 区块数据: 交易、Gas、矿工信息
│   ├── 地址数据: 余额、交易历史、标签
│   ├── 智能合约: 调用记录、事件日志
│   └── 代币数据: 转账、持有者分布
│
├── 社交数据 (Alternative Data)
│   ├── 社交媒体: Twitter、Reddit情绪
│   ├── 搜索趋势: Google Trends
│   └── 链下指标: 开发者活动、GitHub提交
│
└── 基本面数据
    ├── 协议数据: TVL、收入、活跃用户
    ├── 代币经济: 通胀率、解锁计划、燃烧量
    └── 治理数据: 提案、投票、国库
```

## 市场数据获取

### CEX 数据 API

#### REST API（历史数据）
```python
import ccxt
import pandas as pd

class CEXDataCollector:
    """中心化交易所数据收集器"""
    def __init__(self):
        self.exchanges = {
            'binance': ccxt.binance(),
            'okx': ccxt.okx(),
            'bybit': ccxt.bybit(),
        }

    def fetch_ohlcv(self, exchange, symbol, timeframe='1h', limit=500):
        """获取K线数据"""
        ex = self.exchanges[exchange]

        ohlcv = ex.fetch_ohlcv(symbol, timeframe, limit=limit)

        df = pd.DataFrame(
            ohlcv,
            columns=['timestamp', 'open', 'high', 'low', 'close', 'volume']
        )
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
        df.set_index('timestamp', inplace=True)

        return df

    def fetch_order_book(self, exchange, symbol, depth=20):
        """获取订单簿"""
        ex = self.exchanges[exchange]
        order_book = ex.fetch_order_book(symbol, limit=depth)

        return {
            'bids': order_book['bids'][:depth],  # [价格, 数量]
            'asks': order_book['asks'][:depth],
            'timestamp': order_book['timestamp']
        }

    def fetch_funding_rate(self, exchange, symbol):
        """获取资金费率"""
        ex = self.exchanges[exchange]

        if exchange == 'binance':
            funding = ex.fapiPublic_get_fundingrate({
                'symbol': symbol.replace('/', ''),
                'limit': 1
            })
            return {
                'rate': float(funding[0]['fundingRate']),
                'time': pd.to_datetime(funding[0]['fundingTime'], unit='ms')
            }

    def fetch_open_interest(self, exchange, symbol):
        """获取持仓量"""
        ex = self.exchanges[exchange]
        # 各交易所API不同，需分别实现
        pass
```

#### WebSocket（实时数据）
```python
import websocket
import json
import threading

class CEXWebSocketClient:
    """交易所WebSocket客户端"""
    def __init__(self, exchange):
        self.exchange = exchange
        self.ws = None
        self.callbacks = {}

    def connect(self):
        """建立WebSocket连接"""
        ws_urls = {
            'binance': 'wss://stream.binance.com:9443/ws',
            'okx': 'wss://ws.okx.com:8443/ws/v5/public'
        }

        self.ws = websocket.WebSocketApp(
            ws_urls[self.exchange],
            on_message=self.on_message,
            on_error=self.on_error,
            on_close=self.on_close,
            on_open=self.on_open
        )

        wst = threading.Thread(target=self.ws.run_forever)
        wst.daemon = True
        wst.start()

    def subscribe_order_book(self, symbol, callback):
        """订阅订单簿"""
        if self.exchange == 'binance':
            stream = f"{symbol.lower()}@depth20@100ms"
            self.ws.send(json.dumps({
                "method": "SUBSCRIBE",
                "params": [stream],
                "id": 1
            }))
            self.callbacks[stream] = callback

    def subscribe_trades(self, symbol, callback):
        """订阅成交数据"""
        if self.exchange == 'binance':
            stream = f"{symbol.lower()}@aggTrade"
            self.ws.send(json.dumps({
                "method": "SUBSCRIBE",
                "params": [stream],
                "id": 2
            }))
            self.callbacks[stream] = callback

    def on_message(self, ws, message):
        """处理消息"""
        data = json.loads(message)
        stream = data.get('stream')

        if stream in self.callbacks:
            self.callbacks[stream](data['data'])
```

### DEX 数据获取

#### 链上数据查询
```python
from web3 import Web3
from eth_abi import decode

class DEXDataCollector:
    """DEX数据收集器"""
    def __init__(self, provider_url):
        self.w3 = Web3(Web3.HTTPProvider(provider_url))

        # Uniswap V2 Factory
        self.uniswap_v2_factory = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'
        self.uniswap_v2_factory_abi = [...]

        # Uniswap V3 Factory
        self.uniswap_v3_factory = '0x1F98431c8aD98523631AE4a59f267346ea31F984'

    def get_uniswap_v2_pool(self, token_a, token_b):
        """获取Uniswap V2流动性池地址"""
        factory = self.w3.eth.contract(
            address=self.uniswap_v2_factory,
            abi=self.uniswap_v2_factory_abi
        )

        # 排序token地址
        if token_a.lower() > token_b.lower():
            token_a, token_b = token_b, token_a

        pair_address = factory.functions.getPair(token_a, token_b).call()
        return pair_address

    def get_pool_reserves(self, pool_address):
        """获取流动性池储备"""
        pool_abi = [...]
        pool = self.w3.eth.contract(address=pool_address, abi=pool_abi)

        reserves = pool.functions.getReserves().call()
        return {
            'reserve0': reserves[0],
            'reserve1': reserves[1],
            'block_timestamp': reserves[2]
        }

    def calculate_price_from_pool(self, pool_address, token_in, token_out):
        """从流动性池计算价格"""
        reserves = self.get_pool_reserves(pool_address)

        # 获取token顺序
        pool = self.w3.eth.contract(address=pool_address, abi=[...])
        token0 = pool.functions.token0().call()

        if token_in.lower() == token0.lower():
            reserve_in = reserves['reserve0']
            reserve_out = reserves['reserve1']
        else:
            reserve_in = reserves['reserve1']
            reserve_out = reserves['reserve0']

        # 考虑0.3%手续费
        amount_in_with_fee = reserve_in * 997
        numerator = amount_in_with_fee * reserve_out
        denominator = reserve_in * 1000 + amount_in_with_fee

        return numerator / denominator

    def get_swap_events(self, pool_address, from_block, to_block):
        """获取Swap事件日志"""
        event_signature = self.w3.keccak(
            text="Swap(address,uint256,uint256,uint256,uint256,address)"
        ).hex()

        logs = self.w3.eth.get_logs({
            'address': pool_address,
            'topics': [event_signature],
            'fromBlock': from_block,
            'toBlock': to_block
        })

        swaps = []
        for log in logs:
            decoded = decode(
                ['uint256', 'uint256', 'uint256', 'uint256'],
                bytes.fromhex(log['data'][2:])
            )
            swaps.append({
                'sender': '0x' + log['topics'][1][26:],
                'amount0_in': decoded[0],
                'amount1_in': decoded[1],
                'amount0_out': decoded[2],
                'amount1_out': decoded[3],
                'to': '0x' + log['topics'][2][26:],
                'block_number': log['blockNumber'],
                'tx_hash': log['transactionHash'].hex()
            })

        return swaps
```

#### The Graph 查询
```python
import requests

class TheGraphClient:
    """The Graph去中心化查询客户端"""
    def __init__(self):
        self.endpoints = {
            'uniswap_v2': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
            'uniswap_v3': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
            'aave': 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
            'compound': 'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2'
        }

    def query(self, subgraph, query_string):
        """执行GraphQL查询"""
        response = requests.post(
            self.endpoints[subgraph],
            json={'query': query_string}
        )
        return response.json()['data']

    def get_token_day_data(self, token_address, days=30):
        """获取代币日度数据"""
        query = """
        {
          tokenDayDatas(
            first: %d,
            orderBy: date,
            orderDirection: desc,
            where: {token: "%s"}
          ) {
            date
            priceUSD
            volumeUSD
            liquidityUSD
          }
        }
        """ % (days, token_address.lower())

        return self.query('uniswap_v2', query)

    def get_top_liquidity_pools(self, count=10):
        """获取流动性最高的交易对"""
        query = """
        {
          pairs(
            first: %d,
            orderBy: reserveUSD,
            orderDirection: desc
          ) {
            id
            token0 {
              symbol
              id
            }
            token1 {
              symbol
              id
            }
            reserveUSD
            volumeUSD
          }
        }
        """ % count

        return self.query('uniswap_v2', query)

    def get_aave_user_data(self, user_address):
        """获取Aave用户数据"""
        query = """
        {
          userReserves(where: {user: "%s"}) {
            reserve {
              symbol
              underlyingAsset
            }
            currentATokenBalance
            currentVariableDebt
            currentStableDebt
            liquidityRate
            variableBorrowRate
          }
        }
        """ % user_address.lower()

        return self.query('aave', query)
```

## 链上数据分析

### 地址标签与聚类
```python
class OnChainAnalyzer:
    """链上数据分析器"""
    def __init__(self, w3):
        self.w3 = w3
        self.address_labels = self.load_address_labels()

    def load_address_labels(self):
        """加载已知地址标签"""
        return {
            '0xdAC17F958D2ee523a2206206994597C13D831ec7': 'Tether: USDT',
            '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'Circle: USDC',
            '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': 'Wrapped ETH',
            # 交易所钱包
            '0x...': 'Binance: Hot Wallet',
            '0x...': 'Coinbase: Cold Storage',
        }

    def analyze_address(self, address):
        """分析地址"""
        # 获取ETH余额
        eth_balance = self.w3.eth.get_balance(address)

        # 获取交易计数
        tx_count = self.w3.eth.get_transaction_count(address)

        # 获取ERC20代币余额
        token_balances = self.get_token_balances(address)

        # 判断地址类型
        address_type = self.classify_address(address, tx_count)

        return {
            'address': address,
            'label': self.address_labels.get(address, 'Unknown'),
            'eth_balance': self.w3.from_wei(eth_balance, 'ether'),
            'transaction_count': tx_count,
            'token_balances': token_balances,
            'type': address_type
        }

    def classify_address(self, address, tx_count):
        """分类地址类型"""
        code = self.w3.eth.get_code(address)

        if code != '0x':
            return 'Contract'
        elif tx_count == 0:
            return 'New/Inactive'
        elif tx_count > 10000:
            return 'High Activity'
        else:
            return 'Regular User'

    def get_token_balances(self, address):
        """获取代币余额"""
        # 常用ERC20代币列表
        tokens = {
            'USDT': '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            'USDC': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            'DAI': '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            'WETH': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        }

        balances = {}
        for symbol, token_address in tokens.items():
            balance = self.get_erc20_balance(address, token_address)
            if balance > 0:
                balances[symbol] = balance

        return balances

    def get_erc20_balance(self, holder, token_address):
        """获取ERC20代币余额"""
        abi = [
            {
                "constant": True,
                "inputs": [{"name": "_owner", "type": "address"}],
                "name": "balanceOf",
                "outputs": [{"name": "balance", "type": "uint256"}],
                "type": "function"
            }
        ]

        token = self.w3.eth.contract(address=token_address, abi=abi)
        balance = token.functions.balanceOf(holder).call()

        # 获取decimals
        decimals = token.functions.decimals().call()
        return balance / (10 ** decimals)
```

### 鲸鱼监控
```python
class WhaleWatcher:
    """大额交易监控"""
    def __init__(self):
        self.thresholds = {
            'BTC': 100,      # 100 BTC
            'ETH': 1000,     # 1000 ETH
            'USDT': 1000000  # 100万 USDT
        }
        self.whale_addresses = set()

    def monitor_transfers(self, token, min_value):
        """监控大额转账"""
        # 监听Transfer事件
        event_filter = self.w3.eth.filter({
            'topics': [self.transfer_event_signature],
            'fromBlock': 'latest'
        })

        for event in event_filter.get_new_entries():
            value = int(event['data'], 16)
            token_decimals = self.get_token_decimals(event['address'])
            human_value = value / (10 ** token_decimals)

            if human_value >= min_value:
                self.alert_whale_transfer(event, human_value)

    def alert_whale_transfer(self, event, value):
        """发送鲸鱼转账警报"""
        transfer = {
            'token': self.get_token_symbol(event['address']),
            'from': '0x' + event['topics'][1][26:],
            'to': '0x' + event['topics'][2][26:],
            'value': value,
            'tx_hash': event['transactionHash'].hex(),
            'block': event['blockNumber']
        }

        # 判断流向（交易所/未知）
        from_label = self.get_address_label(transfer['from'])
        to_label = self.get_address_label(transfer['to'])

        if 'Exchange' in to_label:
            signal = '看跌信号：大额转入交易所'
        elif 'Exchange' in from_label:
            signal = '看涨信号：大额从交易所提出'
        else:
            signal = '中性：钱包间转账'

        print(f"🐋 鲸鱼警报: {transfer['value']} {transfer['token']}")
        print(f"   从: {from_label}")
        print(f"   到: {to_label}")
        print(f"   信号: {signal}")
```

## 数据存储架构

### 时序数据库
```python
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS

class CryptoDataStore:
    """加密数据存储"""
    def __init__(self, url, token, org, bucket):
        self.client = InfluxDBClient(url=url, token=token, org=org)
        self.write_api = self.client.write_api(write_options=SYNCHRONOUS)
        self.query_api = self.client.query_api()
        self.bucket = bucket

    def store_ohlcv(self, exchange, symbol, ohlcv_data):
        """存储K线数据"""
        points = []

        for candle in ohlcv_data:
            point = Point("ohlcv") \
                .tag("exchange", exchange) \
                .tag("symbol", symbol) \
                .field("open", float(candle['open'])) \
                .field("high", float(candle['high'])) \
                .field("low", float(candle['low'])) \
                .field("close", float(candle['close'])) \
                .field("volume", float(candle['volume'])) \
                .time(candle['timestamp'])
            points.append(point)

        self.write_api.write(bucket=self.bucket, record=points)

    def store_order_book(self, exchange, symbol, order_book):
        """存储订单簿快照"""
        point = Point("orderbook") \
            .tag("exchange", exchange) \
            .tag("symbol", symbol) \
            .field("bid_1", float(order_book['bids'][0][0])) \
            .field("ask_1", float(order_book['asks'][0][0])) \
            .field("bid_volume_1", float(order_book['bids'][0][1])) \
            .field("ask_volume_1", float(order_book['asks'][0][1])) \
            .time(order_book['timestamp'])

        self.write_api.write(bucket=self.bucket, record=point)

    def query_price_history(self, exchange, symbol, start, stop):
        """查询历史价格"""
        query = f'''
        from(bucket: "{self.bucket}")
            |> range(start: {start}, stop: {stop})
            |> filter(fn: (r) => r._measurement == "ohlcv")
            |> filter(fn: (r) => r.exchange == "{exchange}")
            |> filter(fn: (r) => r.symbol == "{symbol}")
            |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
        '''
        return self.query_api.query_data_frame(query)
```

## 数据质量监控

```python
class DataQualityMonitor:
    """数据质量监控"""
    def __init__(self):
        self.quality_metrics = {}

    def check_data_completeness(self, data, expected_frequency):
        """检查数据完整性"""
        time_diff = data.index.to_series().diff()
        gaps = time_diff[time_diff > expected_frequency * 1.5]

        completeness = 1 - len(gaps) / len(data)
        return {
            'completeness': completeness,
            'gaps': gaps,
            'status': 'OK' if completeness > 0.99 else 'Warning'
        }

    def detect_anomalies(self, data, threshold=3):
        """检测异常值"""
        mean = data.mean()
        std = data.std()

        anomalies = data[abs(data - mean) > threshold * std]

        return {
            'anomaly_count': len(anomalies),
            'anomaly_ratio': len(anomalies) / len(data),
            'anomalies': anomalies
        }

    def validate_price_consistency(self, prices_from_sources):
        """验证多源价格一致性"""
        mean_price = sum(prices_from_sources.values()) / len(prices_from_sources)

        deviations = {
            source: abs(price - mean_price) / mean_price
            for source, price in prices_from_sources.items()
        }

        max_deviation = max(deviations.values())

        return {
            'max_deviation': max_deviation,
            'deviations': deviations,
            'status': 'OK' if max_deviation < 0.01 else 'Warning'
        }
```

## 延伸阅读

- [高频交易](high-frequency) — HFT策略
- [DeFi策略](defi-strategies) — 去中心化金融量化
- [实盘部署](deployment) — 生产环境最佳实践
