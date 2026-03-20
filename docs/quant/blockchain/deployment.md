# 加密量化实盘部署

将加密货币量化策略从回测环境部署到实盘需要全面的技术架构和风险控制。本节介绍生产级部署的最佳实践。

## 系统架构设计

```
┌─────────────────────────────────────────────────────────────────┐
│                     加密量化交易系统架构                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   数据层    │    │   策略层    │    │   执行层    │         │
│  │             │    │             │    │             │         │
│  │ • CEX API   │───▶│ • 信号生成  │───▶│ • 订单管理  │         │
│  │ • DEX节点   │    │ • 风险控制  │    │ • 交易执行  │         │
│  │ • 链上监听  │    │ • 组合管理  │    │ • 仓位同步  │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│         │                  │                  │                 │
│         ▼                  ▼                  ▼                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                      基础设施层                            │ │
│  │  • 消息队列 (Redis/RabbitMQ)                              │ │
│  │  • 时序数据库 (InfluxDB/TimescaleDB)                      │ │
│  │  • 日志系统 (ELK Stack)                                   │ │
│  │  • 监控告警 (Prometheus/Grafana)                          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 核心组件实现

### 1. 配置管理
```python
import yaml
from dataclasses import dataclass
from typing import Dict, List

@dataclass
class ExchangeConfig:
    """交易所配置"""
    name: str
    api_key: str
    api_secret: str
    passphrase: str = None  # OKX等需要
    sandbox: bool = False
    rate_limit: int = 10  # 每秒请求数

@dataclass
class StrategyConfig:
    """策略配置"""
    name: str
    enabled: bool
    symbols: List[str]
    max_position: float
    risk_limit: float
    params: Dict

@dataclass
class RiskConfig:
    """风控配置"""
    max_daily_loss: float = 0.05  # 5%
    max_drawdown: float = 0.15    # 15%
    max_position_size: float = 0.1  # 单仓位10%
    circuit_breaker: bool = True

class ConfigManager:
    """配置管理器"""
    def __init__(self, config_path):
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)

        self.exchanges = {
            name: ExchangeConfig(**cfg)
            for name, cfg in self.config['exchanges'].items()
        }

        self.strategies = {
            name: StrategyConfig(**cfg)
            for name, cfg in self.config['strategies'].items()
        }

        self.risk = RiskConfig(**self.config['risk'])

    def get_exchange_config(self, name):
        return self.exchanges.get(name)

    def get_active_strategies(self):
        return [s for s in self.strategies.values() if s.enabled]
```

### 2. 账户与仓位管理
```python
class PositionManager:
    """仓位管理器"""
    def __init__(self, exchanges: Dict[str, ccxt.Exchange]):
        self.exchanges = exchanges
        self.positions = {}
        self.balances = {}
        self.lock = asyncio.Lock()

    async def sync_all_positions(self):
        """同步所有交易所仓位"""
        for name, exchange in self.exchanges.items():
            try:
                # 获取账户余额
                balance = await exchange.fetch_balance()
                self.balances[name] = balance

                # 获取持仓（期货/永续）
                positions = await exchange.fetch_positions()
                self.positions[name] = {
                    p['symbol']: p for p in positions if p['contracts'] != 0
                }

            except Exception as e:
                logger.error(f"同步{name}仓位失败: {e}")

    async def get_total_exposure(self, symbol):
        """获取总敞口"""
        total = 0
        for exchange_name, positions in self.positions.items():
            if symbol in positions:
                pos = positions[symbol]
                # 统一转换为USD价值
                notional = pos['contracts'] * pos['markPrice']
                total += notional
        return total

    async def check_position_limit(self, symbol, new_order_size):
        """检查仓位限制"""
        current = await self.get_total_exposure(symbol)
        max_limit = self.config.risk.max_position_size * self.get_total_equity()

        if abs(current + new_order_size) > max_limit:
            raise PositionLimitExceeded(
                f"仓位超限: {symbol} 当前={current}, 新增={new_order_size}, 限制={max_limit}"
            )

    def get_total_equity(self):
        """计算总权益"""
        total = 0
        for exchange_balance in self.balances.values():
            total += exchange_balance.get('USDT', {}).get('total', 0)
            # 加上其他币种按当前价格折算
        return total
```

### 3. 订单执行引擎
```python
class ExecutionEngine:
    """订单执行引擎"""
    def __init__(self, position_manager):
        self.pm = position_manager
        self.pending_orders = {}
        self.order_history = []

    async def place_order(self, order_request: dict):
        """下单"""
        # 风控检查
        await self.risk_check(order_request)

        exchange = self.pm.exchanges[order_request['exchange']]

        try:
            # 根据订单类型选择执行策略
            if order_request['type'] == 'market':
                result = await self.execute_market_order(exchange, order_request)
            elif order_request['type'] == 'limit':
                result = await self.execute_limit_order(exchange, order_request)
            elif order_request['type'] == 'twap':
                result = await self.execute_twap(exchange, order_request)
            elif order_request['type'] == 'iceberg':
                result = await self.execute_iceberg(exchange, order_request)

            # 记录订单
            self.order_history.append({
                'timestamp': datetime.now(),
                'request': order_request,
                'result': result
            })

            return result

        except Exception as e:
            logger.error(f"下单失败: {e}")
            await self.emergency_handler(order_request, e)
            raise

    async def execute_market_order(self, exchange, order):
        """执行市价单"""
        return await exchange.create_market_buy_order(
            symbol=order['symbol'],
            amount=order['size']
        ) if order['side'] == 'buy' else await exchange.create_market_sell_order(
            symbol=order['symbol'],
            amount=order['size']
        )

    async def execute_twap(self, exchange, order, num_slices=5):
        """TWAP执行：将大单拆分为多个小单在一段时间内执行"""
        total_size = order['size']
        slice_size = total_size / num_slices
        interval = order.get('duration', 300) / num_slices  # 默认5分钟

        results = []
        for i in range(num_slices):
            slice_order = await exchange.create_market_order(
                order['symbol'],
                'buy' if order['side'] == 'buy' else 'sell',
                slice_size
            )
            results.append(slice_order)

            if i < num_slices - 1:
                await asyncio.sleep(interval)

        return {
            'type': 'twap',
            'slices': results,
            'avg_price': sum(r['average'] * r['filled'] for r in results) / total_size
        }

    async def execute_iceberg(self, exchange, order, display_size=None):
        """冰山订单：只显示部分数量"""
        if display_size is None:
            display_size = order['size'] * 0.1  # 默认显示10%

        remaining = order['size']
        results = []

        while remaining > 0:
            current_display = min(display_size, remaining)

            result = await exchange.create_limit_order(
                order['symbol'],
                'buy' if order['side'] == 'buy' else 'sell',
                current_display,
                order['price']
            )

            results.append(result)
            remaining -= result['filled']

            # 等待部分成交后再下下一单
            if remaining > 0:
                await self.wait_for_fill_or_cancel(result['id'], timeout=30)

        return {'type': 'iceberg', 'results': results}
```

### 4. 实时风控系统
```python
class RealTimeRiskManager:
    """实时风险管理系统"""
    def __init__(self, config: RiskConfig):
        self.config = config
        self.daily_pnl = 0
        self.peak_equity = 0
        self.circuit_breaker_triggered = False
        self.alerts = []

    async def monitor(self, position_manager):
        """持续监控风险指标"""
        while True:
            try:
                # 计算实时权益
                current_equity = position_manager.get_total_equity()

                # 计算日内盈亏
                self.daily_pnl = current_equity - self.starting_equity

                # 更新峰值
                if current_equity > self.peak_equity:
                    self.peak_equity = current_equity

                # 计算回撤
                drawdown = (self.peak_equity - current_equity) / self.peak_equity

                # 检查各项限制
                await self.check_limits(
                    daily_pnl=self.daily_pnl / self.starting_equity,
                    drawdown=drawdown,
                    positions=position_manager.positions
                )

                await asyncio.sleep(1)  # 每秒检查一次

            except Exception as e:
                logger.error(f"风控监控异常: {e}")
                await asyncio.sleep(5)

    async def check_limits(self, daily_pnl, drawdown, positions):
        """检查各项风险限制"""
        # 日亏损限制
        if daily_pnl < -self.config.max_daily_loss:
            await self.trigger_circuit_breaker(
                f"日亏损超限: {daily_pnl:.2%}"
            )

        # 最大回撤限制
        if drawdown > self.config.max_drawdown:
            await self.trigger_circuit_breaker(
                f"最大回撤超限: {drawdown:.2%}"
            )

        # 单个仓位检查
        for exchange, pos_list in positions.items():
            for symbol, pos in pos_list.items():
                pos_size = abs(pos['contracts'] * pos['markPrice'])
                pos_ratio = pos_size / self.current_equity

                if pos_ratio > self.config.max_position_size:
                    await self.reduce_position(exchange, symbol, pos_ratio)

    async def trigger_circuit_breaker(self, reason):
        """触发熔断"""
        if self.circuit_breaker_triggered:
            return

        self.circuit_breaker_triggered = True
        logger.critical(f"熔断触发: {reason}")

        # 1. 停止所有策略
        await self.stop_all_strategies()

        # 2. 平掉所有仓位
        await self.close_all_positions()

        # 3. 发送告警
        await self.send_alert(f"紧急熔断: {reason}")

    async def reduce_position(self, exchange, symbol, current_ratio):
        """减仓"""
        target_ratio = self.config.max_position_size * 0.8
        reduce_ratio = 1 - (target_ratio / current_ratio)

        # 执行减仓
        await self.execution_engine.place_order({
            'exchange': exchange,
            'symbol': symbol,
            'side': 'sell' if self.positions[exchange][symbol]['side'] == 'long' else 'buy',
            'type': 'market',
            'size': self.positions[exchange][symbol]['contracts'] * reduce_ratio
        })
```

### 5. 监控与告警
```python
class MonitoringSystem:
    """监控系统"""
    def __init__(self):
        self.metrics = {
            'orders_total': 0,
            'orders_filled': 0,
            'orders_failed': 0,
            'pnl_daily': 0,
            'latency_avg': 0,
        }

    async def start_http_server(self, port=8080):
        """启动监控HTTP服务"""
        from aiohttp import web

        async def metrics_handler(request):
            return web.json_response(self.metrics)

        async def health_handler(request):
            return web.json_response({'status': 'healthy'})

        app = web.Application()
        app.router.add_get('/metrics', metrics_handler)
        app.router.add_get('/health', health_handler)

        runner = web.AppRunner(app)
        await runner.setup()
        site = web.TCPSite(runner, 'localhost', port)
        await site.start()

    def record_order(self, order_result):
        """记录订单指标"""
        self.metrics['orders_total'] += 1

        if order_result['status'] == 'closed':
            self.metrics['orders_filled'] += 1
        elif order_result['status'] == 'rejected':
            self.metrics['orders_failed'] += 1

    async def send_alert(self, message, level='warning'):
        """发送告警"""
        # 钉钉告警
        if self.config.alerts.get('dingtalk'):
            await self.send_dingtalk(message, level)

        # 邮件告警
        if self.config.alerts.get('email'):
            await self.send_email(message, level)

        # Telegram告警
        if self.config.alerts.get('telegram'):
            await self.send_telegram(message, level)
```

## 部署架构

### Docker Compose 配置
```yaml
version: '3.8'

services:
  trading-engine:
    build: .
    container_name: crypto-trading
    restart: unless-stopped
    environment:
      - CONFIG_PATH=/app/config/production.yaml
      - LOG_LEVEL=INFO
    volumes:
      - ./config:/app/config:ro
      - ./logs:/app/logs
      - ./data:/app/data
    ports:
      - "8080:8080"  # 监控端口
    networks:
      - trading-network
    depends_on:
      - redis
      - influxdb

  redis:
    image: redis:7-alpine
    container_name: trading-redis
    restart: unless-stopped
    volumes:
      - redis-data:/data
    networks:
      - trading-network

  influxdb:
    image: influxdb:2.7
    container_name: trading-influxdb
    restart: unless-stopped
    environment:
      - INFLUXDB_DB=trading
      - INFLUXDB_ADMIN_USER=admin
      - INFLUXDB_ADMIN_PASSWORD=${INFLUX_PASSWORD}
    volumes:
      - influxdb-data:/var/lib/influxdb2
    networks:
      - trading-network

  grafana:
    image: grafana/grafana:latest
    container_name: trading-grafana
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
    networks:
      - trading-network
    depends_on:
      - influxdb

volumes:
  redis-data:
  influxdb-data:
  grafana-data:

networks:
  trading-network:
    driver: bridge
```

### 配置文件示例
```yaml
# config/production.yaml
exchanges:
  binance:
    api_key: ${BINANCE_API_KEY}
    api_secret: ${BINANCE_API_SECRET}
    sandbox: false
    rate_limit: 10

  okx:
    api_key: ${OKX_API_KEY}
    api_secret: ${OKX_API_SECRET}
    passphrase: ${OKX_PASSPHRASE}
    rate_limit: 10

strategies:
  funding_arbitrage:
    enabled: true
    symbols: ['BTC/USDT', 'ETH/USDT']
    max_position: 10000  # USD
    risk_limit: 0.05
    params:
      min_spread: 0.001
      check_interval: 300  # 5分钟

  momentum:
    enabled: true
    symbols: ['BTC/USDT']
    max_position: 5000
    risk_limit: 0.03
    params:
      lookback: 20
      threshold: 0.02

risk:
  max_daily_loss: 0.05
  max_drawdown: 0.15
  max_position_size: 0.1
  circuit_breaker: true

alerts:
  dingtalk:
    webhook: ${DINGTALK_WEBHOOK}
  telegram:
    bot_token: ${TG_BOT_TOKEN}
    chat_id: ${TG_CHAT_ID}
```

## 安全最佳实践

### API密钥管理
```python
from cryptography.fernet import Fernet
import os

class SecureConfig:
    """安全配置管理"""
    def __init__(self):
        self.cipher = Fernet(os.environ['CONFIG_ENCRYPTION_KEY'])

    def encrypt_api_keys(self, config):
        """加密API密钥"""
        for exchange in config['exchanges'].values():
            if 'api_key' in exchange:
                exchange['api_key'] = self.cipher.encrypt(
                    exchange['api_key'].encode()
                ).decode()
            if 'api_secret' in exchange:
                exchange['api_secret'] = self.cipher.encrypt(
                    exchange['api_secret'].encode()
                ).decode()

    def decrypt_api_keys(self, config):
        """解密API密钥"""
        for exchange in config['exchanges'].values():
            if 'api_key' in exchange:
                exchange['api_key'] = self.cipher.decrypt(
                    exchange['api_key'].encode()
                ).decode()
            if 'api_secret' in exchange:
                exchange['api_secret'] = self.cipher.decrypt(
                    exchange['api_secret'].encode()
                ).decode()
```

### 钱包安全
```python
class WalletSecurity:
    """钱包安全管理"""
    def __init__(self):
        self.hot_wallet = None  # 少量资金，用于交易
        self.cold_wallet = None  # 大额资金，离线存储

    def fund_management(self, trading_capital):
        """
        资金管理策略：
        - 热钱包只放交易所需资金
        - 大部分资金存冷钱包
        - 定期将利润转入冷钱包
        """
        # 热钱包最多放总资金的20%
        max_hot_wallet = trading_capital * 0.2

        if self.get_hot_wallet_balance() > max_hot_wallet:
            excess = self.get_hot_wallet_balance() - max_hot_wallet
            self.transfer_to_cold_wallet(excess)

    def multi_sig_withdrawal(self, amount, to_address):
        """多签提现：需要多个私钥签名"""
        # 实现多重签名逻辑
        pass
```

## 灾难恢复

```python
class DisasterRecovery:
    """灾难恢复系统"""
    def __init__(self):
        self.backup_interval = 3600  # 每小时备份
        self.state = {}

    async def periodic_backup(self):
        """定期备份状态"""
        while True:
            self.state = {
                'timestamp': datetime.now(),
                'positions': self.position_manager.positions,
                'orders': self.execution_engine.order_history[-100:],
                'config': self.config
            }

            # 保存到多个位置
            await self.save_to_redis(self.state)
            await self.save_to_disk(self.state)

            await asyncio.sleep(self.backup_interval)

    async def restore_from_backup(self):
        """从备份恢复"""
        # 尝试从Redis恢复
        state = await self.load_from_redis()

        if not state:
            # 从磁盘恢复
            state = await self.load_from_disk()

        if state:
            self.position_manager.positions = state['positions']
            logger.info(f"从备份恢复，时间点: {state['timestamp']}")
        else:
            logger.error("无法找到有效备份")

    async def emergency_shutdown(self):
        """紧急关闭"""
        # 1. 保存当前状态
        await self.periodic_backup()

        # 2. 取消所有未成交订单
        await self.execution_engine.cancel_all_orders()

        # 3. 平掉所有仓位（可选）
        # await self.position_manager.close_all_positions()

        # 4. 记录关机原因
        logger.critical("系统紧急关闭")
```

## 延伸阅读

- [DeFi策略](defi-strategies) — 去中心化金融策略
- [高频交易](high-frequency) — HFT策略
- [数据基础设施](data-and-infrastructure) — 数据获取与存储
