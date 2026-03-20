# 加密货币高频交易 (HFT)

加密货币市场7×24小时不间断交易、低延迟要求相对较低、交易所API开放，为高频交易提供了独特的机会。

## HFT 在加密市场的特点

```
传统市场 HFT          vs          加密市场 HFT
─────────────────────────────────────────────────────────
微秒级延迟                       毫秒级延迟即可
昂贵的专用基础设施               云服务足够
严格的监管限制                   相对宽松
高准入门槛                       人人可参与
有限的交易对                     数千种代币
单一交易所                       数百个交易所
```

## 延迟套利（Latency Arbitrage）

### 交易所间套利
```python
import asyncio
import aiohttp
from collections import defaultdict

class LatencyArbitrage:
    """
    延迟套利：利用同一资产在不同交易所的价格发现延迟
    """
    def __init__(self):
        self.exchanges = {
            'binance': BinanceWS(),
            'okx': OKXWS(),
            'bybit': BybitWS(),
        }
        self.order_books = defaultdict(dict)
        self.min_spread = 0.001  # 0.1%门槛

    async def start_ws_connections(self):
        """建立所有交易所的WebSocket连接"""
        tasks = []
        for name, exchange in self.exchanges.items():
            task = asyncio.create_task(
                self.listen_order_book(exchange, name)
            )
            tasks.append(task)
        await asyncio.gather(*tasks)

    async def listen_order_book(self, exchange, name):
        """监听订单簿更新"""
        async for update in exchange.subscribe_order_book('BTC-USDT'):
            self.order_books[name] = {
                'bids': update['bids'],  # 买单
                'asks': update['asks'],  # 卖单
                'timestamp': time.time_ns()
            }

    def find_arbitrage(self):
        """寻找套利机会"""
        opportunities = []

        for buy_ex in self.exchanges:
            for sell_ex in self.exchanges:
                if buy_ex == sell_ex:
                    continue

                buy_book = self.order_books[buy_ex]
                sell_book = self.order_books[sell_ex]

                if not buy_book or not sell_book:
                    continue

                # 在A买，在B卖
                best_ask = float(buy_book['asks'][0][0])  # A的最低卖价
                best_bid = float(sell_book['bids'][0][0])  # B的最高买价

                spread = (best_bid - best_ask) / best_ask

                if spread > self.min_spread:
                    # 考虑手续费
                    buy_fee = self.exchanges[buy_ex].taker_fee
                    sell_fee = self.exchanges[sell_ex].taker_fee
                    net_spread = spread - buy_fee - sell_fee

                    if net_spread > 0.0005:  # 扣除手续费后仍有0.05%利润
                        opportunities.append({
                            'buy_exchange': buy_ex,
                            'sell_exchange': sell_ex,
                            'buy_price': best_ask,
                            'sell_price': best_bid,
                            'spread': spread,
                            'net_spread': net_spread,
                            'latency': abs(
                                buy_book['timestamp'] - sell_book['timestamp']
                            )
                        })

        return opportunities

    async def execute_arbitrage(self, opp, size):
        """执行套利"""
        buy_ex = self.exchanges[opp['buy_exchange']]
        sell_ex = self.exchanges[opp['sell_exchange']]

        # 并发下单
        buy_task = buy_ex.place_market_buy('BTC-USDT', size)
        sell_task = sell_ex.place_market_sell('BTC-USDT', size)

        buy_result, sell_result = await asyncio.gather(
            buy_task, sell_task,
            return_exceptions=True
        )

        # 验证执行结果
        if isinstance(buy_result, Exception):
            # 买入失败，需要平掉卖出仓位
            await sell_ex.place_market_buy('BTC-USDT', size)
            return {'status': 'failed', 'error': str(buy_result)}

        if isinstance(sell_result, Exception):
            # 卖出失败，需要平掉买入仓位
            await buy_ex.place_market_sell('BTC-USDT', size)
            return {'status': 'failed', 'error': str(sell_result)}

        return {
            'status': 'success',
            'profit': (opp['sell_price'] - opp['buy_price']) * size
        }
```

### 订单簿微观结构策略
```python
class OrderBookHFT:
    """
    基于订单簿微观结构的高频策略
    """
    def __init__(self):
        self.imbalance_threshold = 0.2
        self.order_book = None

    def analyze_order_book_imbalance(self, bids, asks, depth=10):
        """
        分析订单簿不平衡
        买单远大于卖单 → 价格可能上涨
        卖单远大于买单 → 价格可能下跌
        """
        bid_volume = sum([float(b[1]) for b in bids[:depth]])
        ask_volume = sum([float(a[1]) for a in asks[:depth]])

        total_volume = bid_volume + ask_volume
        imbalance = (bid_volume - ask_volume) / total_volume

        # 计算加权平均价格
        bid_vwap = sum([float(b[0]) * float(b[1]) for b in bids[:depth]]) / bid_volume
        ask_vwap = sum([float(a[0]) * float(a[1]) for a in asks[:depth]]) / ask_volume

        return {
            'imbalance': imbalance,
            'bid_volume': bid_volume,
            'ask_volume': ask_volume,
            'bid_vwap': bid_vwap,
            'ask_vwap': ask_vwap
        }

    def detect_large_orders(self, order_book, threshold=100000):
        """检测大额订单（冰山订单）"""
        large_orders = []

        for side in ['bids', 'asks']:
            for price, size in order_book[side]:
                usd_value = float(price) * float(size)
                if usd_value > threshold:
                    large_orders.append({
                        'side': 'buy' if side == 'bids' else 'sell',
                        'price': price,
                        'size': size,
                        'usd_value': usd_value
                    })

        return large_orders

    def predict_short_term_movement(self, order_book, trade_history):
        """预测短期价格走势"""
        imbalance = self.analyze_order_book_imbalance(
            order_book['bids'], order_book['asks']
        )

        # 分析最近成交
        recent_trades = trade_history[-100:]
        buy_pressure = sum([t['size'] for t in recent_trades if t['side'] == 'buy'])
        sell_pressure = sum([t['size'] for t in recent_trades if t['side'] == 'sell'])

        # 综合信号
        signal = 0
        if imbalance['imbalance'] > self.imbalance_threshold:
            signal += 1  # 看多
        elif imbalance['imbalance'] < -self.imbalance_threshold:
            signal -= 1  # 看空

        if buy_pressure > sell_pressure * 1.5:
            signal += 0.5
        elif sell_pressure > buy_pressure * 1.5:
            signal -= 0.5

        return {
            'signal': signal,
            'confidence': abs(imbalance['imbalance']),
            'expected_movement': signal * 0.001  # 预期0.1%波动
        }
```

## 做市策略 (Market Making)

```python
class CryptoMarketMaker:
    """
    加密货币做市策略
    同时在买卖双方挂限价单，赚取买卖价差
    """
    def __init__(self):
        self.spread_target = 0.002  # 0.2%目标价差
        self.max_position = 1.0     # 最大持仓1 BTC
        self.inventory_skew = 0.5   # 库存偏斜系数

    def calculate_quotes(self, mid_price, inventory):
        """
        计算做市报价
        基于库存调整报价，避免单向敞口过大
        """
        # 基础价差
        base_spread = mid_price * self.spread_target

        # 库存调整：持仓过多时降低买价、提高卖价
        inventory_ratio = inventory / self.max_position
        inventory_adjustment = inventory_ratio * self.inventory_skew * base_spread

        bid_price = mid_price - base_spread/2 - inventory_adjustment
        ask_price = mid_price + base_spread/2 - inventory_adjustment

        # 订单大小也根据库存调整
        if inventory > 0:
            bid_size = self.base_size * (1 - inventory_ratio)
            ask_size = self.base_size * (1 + inventory_ratio)
        else:
            bid_size = self.base_size * (1 + abs(inventory_ratio))
            ask_size = self.base_size * (1 - abs(inventory_ratio))

        return {
            'bid': {'price': bid_price, 'size': bid_size},
            'ask': {'price': ask_price, 'size': ask_size}
        }

    def manage_inventory(self, current_inventory, target_inventory=0):
        """库存管理"""
        deviation = current_inventory - target_inventory

        if abs(deviation) > self.max_position * 0.8:
            # 库存偏离过大，市价减仓
            if deviation > 0:
                self.place_market_sell(abs(deviation))
            else:
                self.place_market_buy(abs(deviation))

        elif abs(deviation) > self.max_position * 0.5:
            # 库存偏离中等，调整报价鼓励减仓
            self.inventory_skew = 0.8  # 增加偏斜
        else:
            self.inventory_skew = 0.5  # 正常偏斜

    def handle_fills(self, fill):
        """处理成交"""
        if fill['side'] == 'buy']:
            self.inventory += fill['size']
        else:
            self.inventory -= fill['size']

        # 立即重新报价
        self.update_quotes()

    def calculate_pnl(self, trades, current_price):
        """计算做市收益"""
        realized_pnl = 0
        for i in range(0, len(trades), 2):
            if i+1 < len(trades):
                buy_trade = trades[i] if trades[i]['side'] == 'buy' else trades[i+1]
                sell_trade = trades[i+1] if trades[i+1]['side'] == 'sell' else trades[i]
                realized_pnl += (sell_trade['price'] - buy_trade['price']) * buy_trade['size']

        # 未实现盈亏
        unrealized_pnl = self.inventory * current_price - self.inventory_cost_basis

        return {
            'realized': realized_pnl,
            'unrealized': unrealized_pnl,
            'total': realized_pnl + unrealized_pnl
        }
```

## MEV 提取策略

```python
class MEVExtractor:
    """
    MEV (最大可提取价值) 提取策略
    包括套利、清算、三明治攻击等
    """
    def __init__(self, w3):
        self.w3 = w3
        self.pending_tx_pool = []

    def monitor_mempool(self):
        """监控内存池寻找MEV机会"""
        filter = self.w3.eth.filter('pending')

        for tx_hash in filter.get_new_entries():
            tx = self.w3.eth.get_transaction(tx_hash)

            # 解码交易数据
            decoded = self.decode_transaction(tx)

            if decoded['type'] == 'swap':
                self.analyze_swap_opportunity(decoded)
            elif decoded['type'] == 'liquidation':
                self.compete_liquidation(decoded)

    def sandwich_attack(self, victim_tx):
        """
        三明治攻击：在受害者交易前后插入自己的交易
        注意：这种策略存在道德和法律争议
        """
        # 1. 检测大额交易
        if victim_tx['value'] < 10000:  # 小于1万美元不操作
            return

        # 2. 计算最优夹击位置
        front_run_gas = victim_tx['gasPrice'] + 1  # 比受害者高一点Gas
        back_run_gas = victim_tx['gasPrice'] - 1   # 比受害者低一点Gas

        # 3. 构建抢先交易（推高价格）
        front_run_tx = self.build_swap_tx(
            token_in=victim_tx['token_in'],
            token_out=victim_tx['token_out'],
            amount=victim_tx['value'] * 0.1,  # 用受害者10%的资金量
            gas_price=front_run_gas,
            nonce=self.w3.eth.get_transaction_count(self.address)
        )

        # 4. 构建跟随交易（获利了结）
        back_run_tx = self.build_swap_tx(
            token_in=victim_tx['token_out'],
            token_out=victim_tx['token_in'],
            amount=0,  # 卖出全部
            gas_price=back_run_gas,
            nonce=self.w3.eth.get_transaction_count(self.address) + 1
        )

        # 5. 通过Flashbots打包发送
        bundle = [front_run_tx, victim_tx, back_run_tx]
        self.send_flashbots_bundle(bundle)

    def arbitrage_monitor(self):
        """跨DEX套利监控"""
        # 监控同一交易对在不同DEX的价格
        dexes = ['uniswap_v2', 'uniswap_v3', 'sushiswap', 'curve']

        for token_pair in self.token_pairs:
            prices = {}
            for dex in dexes:
                prices[dex] = self.get_price(dex, token_pair)

            # 找最大价差
            max_price = max(prices.values())
            min_price = min(prices.values())
            spread = (max_price - min_price) / min_price

            if spread > 0.005:  # 0.5%门槛
                self.execute_dex_arbitrage(
                    buy_dex=min_price['dex'],
                    sell_dex=max_price['dex'],
                    token_pair=token_pair,
                    amount=self.calculate_optimal_amount(spread)
                )

    def liquidation_monitor(self):
        """清算监控"""
        # 监控借贷协议的健康因子
        protocols = ['aave', 'compound']

        for protocol in protocols:
            positions = protocol.get_underwater_positions()

            for position in positions:
                profit = self.calculate_liquidation_profit(position)

                if profit > 0.01:  # 1%利润门槛
                    # 使用Flashloan执行清算
                    self.execute_flashloan_liquidation(position)

    def send_flashbots_bundle(self, bundle):
        """通过Flashbots发送交易包"""
        # Flashbots可以避免公开内存池，减少被抢跑的风险
        flashbots_rpc = "https://relay.flashbots.net"

        # 签名交易包
        signed_bundle = [self.sign_tx(tx) for tx in bundle]

        # 发送到Flashbots
        response = requests.post(
            flashbots_rpc,
            json={
                'jsonrpc': '2.0',
                'id': 1,
                'method': 'eth_sendBundle',
                'params': [{
                    'txs': signed_bundle,
                    'blockNumber': self.w3.eth.block_number + 1,
                    'minTimestamp': 0,
                    'maxTimestamp': int(time.time()) + 120
                }]
            }
        )

        return response.json()
```

## 技术基础设施

### WebSocket 连接管理
```python
class ExchangeConnectionManager:
    """交易所连接管理器"""
    def __init__(self):
        self.connections = {}
        self.reconnect_delay = 1
        self.max_reconnect_delay = 60

    async def connect(self, exchange_name, ws_url):
        """建立WebSocket连接"""
        while True:
            try:
                conn = await websockets.connect(ws_url)
                self.connections[exchange_name] = conn
                self.reconnect_delay = 1  # 重置延迟
                print(f"{exchange_name} 连接成功")
                return conn
            except Exception as e:
                print(f"{exchange_name} 连接失败: {e}")
                await asyncio.sleep(self.reconnect_delay)
                self.reconnect_delay = min(
                    self.reconnect_delay * 2,
                    self.max_reconnect_delay
                )

    async def subscribe_with_retry(self, exchange, channels):
        """带重试的订阅"""
        conn = self.connections.get(exchange)
        if not conn:
            return

        try:
            for channel in channels:
                await conn.send(json.dumps({
                    'op': 'subscribe',
                    'args': [channel]
                }))
        except websockets.exceptions.ConnectionClosed:
            # 重新连接
            await self.connect(exchange, self.get_ws_url(exchange))
            await self.subscribe_with_retry(exchange, channels)
```

### 延迟优化
```python
class LatencyOptimizer:
    """延迟优化工具"""
    def __init__(self):
        self.colocation_exchanges = ['binance', 'okx', 'bybit']

    def select_best_region(self, exchanges):
        """选择最佳服务器区域"""
        regions = {
            'tokyo': ['binance', 'bybit'],
            'singapore': ['okx', 'kucoin'],
            'london': ['kraken', 'bitstamp'],
            'us-east': ['coinbase', 'gemini']
        }

        # 测试到各交易所的延迟
        latencies = {}
        for region, region_exchanges in regions.items():
            latencies[region] = self.ping_exchanges(region_exchanges)

        # 选择总延迟最低的区域
        best_region = min(latencies, key=lambda x: sum(latencies[x].values()))
        return best_region

    def optimize_network_stack(self):
        """优化网络栈"""
        # 1. 使用内核旁路（DPDK）
        # 2. 禁用Nagle算法
        # 3. 调整TCP缓冲区大小
        # 4. 使用专用网卡

        import socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_RCVBUF, 1024*1024)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_SNDBUF, 1024*1024)

        return sock
```

## 风险管理

### 高频交易特有风险
```python
class HFTRiskManager:
    """HFT风险管理"""
    def __init__(self):
        self.max_open_orders = 100
        self.max_order_rate = 10  # 每秒最多10单
        self.circuit_breaker = False

    def check_order_rate(self):
        """检查下单频率"""
        current_rate = self.get_orders_per_second()
        if current_rate > self.max_order_rate:
            self.circuit_breaker = True
            raise Exception("下单频率超限，熔断触发")

    def fat_finger_check(self, order):
        """误操作检查"""
        # 检查价格是否偏离市场价过多
        market_price = self.get_market_price(order['symbol'])
        if abs(order['price'] - market_price) / market_price > 0.05:
            raise Exception(f"价格偏离过大: {order['price']} vs {market_price}")

        # 检查订单大小
        if order['size'] > self.max_position * 0.5:
            raise Exception(f"订单过大: {order['size']}")

    def connection_health_check(self):
        """连接健康检查"""
        for exchange, conn in self.connections.items():
            latency = self.measure_latency(exchange)
            if latency > 500:  # 超过500ms警告
                print(f"警告: {exchange} 延迟过高 ({latency}ms)")
            if latency > 2000:  # 超过2秒断开
                self.reconnect(exchange)
```

## 延伸阅读

- [DeFi策略](defi-strategies) — 去中心化金融量化
- [加密货币策略](trading-strategies) — 中低频策略
- [市场微观结构](market-structure) — DEX与CEX机制
