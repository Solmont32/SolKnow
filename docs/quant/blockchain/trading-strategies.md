# 加密货币量化策略

加密市场的高波动性和7×24小时交易特性为量化策略提供了丰富机会。本节介绍主流加密量化策略及其实现。

## 策略分类

```
┌─────────────────────────────────────────────────────────────┐
│                    加密量化策略谱系                          │
├─────────────────────────────────────────────────────────────┤
│  CEX策略         │  DEX策略          │  链上策略           │
├─────────────────────────────────────────────────────────────┤
│  • 趋势跟踪       │  • AMM套利        │  • MEV提取          │
│  • 统计套利       │  • 闪电贷套利      │  • 抢先交易         │
│  • 期现套利       │  • 流动性挖矿      │  • 清算套利         │
│  • 资金费套利     │  • 治理挖矿        │  • NFT套利          │
└─────────────────────────────────────────────────────────────┘
```

## 现货策略

### 趋势跟踪（Momentum）
```python
import pandas as pd
import numpy as np

class CryptoMomentumStrategy:
    def __init__(self, lookback=20):
        self.lookback = lookback

    def generate_signals(self, prices):
        """基于多时间框架动量生成信号"""
        # 短期动量
        short_ma = prices.rolling(7).mean()
        # 中期动量
        medium_ma = prices.rolling(30).mean()

        signals = pd.Series(index=prices.index, data=0)

        # 金叉买入
        buy_condition = (prices > short_ma) & (short_ma > medium_ma)
        # 死叉卖出
        sell_condition = (prices < short_ma) & (short_ma < medium_ma)

        signals[buy_condition] = 1
        signals[sell_condition] = -1

        return signals

    def backtest(self, prices, initial_capital=10000):
        """回测策略"""
        signals = self.generate_signals(prices)
        returns = prices.pct_change()

        # 策略收益
        strategy_returns = signals.shift(1) * returns
        cumulative = (1 + strategy_returns).cumprod()

        return {
            'total_return': cumulative.iloc[-1] - 1,
            'sharpe': strategy_returns.mean() / strategy_returns.std() * np.sqrt(365),
            'max_drawdown': (cumulative / cumulative.cummax() - 1).min()
        }
```

### 均值回归（Mean Reversion）
```python
class MeanReversionStrategy:
    """
    基于布林带和RSI的均值回归策略
    适合震荡市场
    """
    def __init__(self, window=20, std_dev=2):
        self.window = window
        self.std_dev = std_dev

    def calculate_indicators(self, prices):
        """计算技术指标"""
        # 布林带
        sma = prices.rolling(self.window).mean()
        std = prices.rolling(self.window).std()
        upper = sma + self.std_dev * std
        lower = sma - self.std_dev * std

        # RSI
        delta = prices.diff()
        gain = (delta.where(delta > 0, 0)).rolling(14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(14).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))

        return upper, lower, sma, rsi

    def generate_signals(self, prices):
        upper, lower, sma, rsi = self.calculate_indicators(prices)

        signals = pd.Series(index=prices.index, data=0)

        # 超卖+价格触及下轨 = 买入
        buy_condition = (prices < lower) & (rsi < 30)
        # 超买+价格触及上轨 = 卖出
        sell_condition = (prices > upper) & (rsi > 70)

        signals[buy_condition] = 1
        signals[sell_condition] = -1

        return signals
```

## 期货与永续合约策略

### 资金费率套利
```python
class FundingRateArbitrage:
    """
    资金费率套利策略
    在资金费率为负的交易所做多，在正的交易所做空
    """
    def __init__(self, exchanges, symbol='BTC-USD'):
        self.exchanges = exchanges
        self.symbol = symbol

    def find_opportunity(self):
        """寻找套利机会"""
        funding_rates = {}

        for ex in self.exchanges:
            rate = ex.get_funding_rate(self.symbol)
            funding_rates[ex.name] = rate

        # 找差异最大的两边
        min_ex = min(funding_rates, key=funding_rates.get)
        max_ex = max(funding_rates, key=funding_rates.get)

        spread = funding_rates[max_ex] - funding_rates[min_ex]

        if spread > 0.01:  # 1%门槛
            return {
                'long_exchange': min_ex,
                'short_exchange': max_ex,
                'spread': spread,
                'expected_daily_return': spread / 3  # 每8小时收一次
            }
        return None

    def execute(self, size):
        """执行套利"""
        opp = self.find_opportunity()
        if not opp:
            return None

        # 在资金费率低的交易所做多
        long_ex = self.exchanges[opp['long_exchange']]
        long_ex.open_long(self.symbol, size)

        # 在资金费率高的交易所做空
        short_ex = self.exchanges[opp['short_exchange']]
        short_ex.open_short(self.symbol, size)

        print(f"套利仓位已建立，每日预期收益: {opp['expected_daily_return']:.4%}")
```

### 期现套利（Cash and Carry）
```python
class CashAndCarry:
    """
    期现套利：买入现货，卖出期货，锁定基差收益
    """
    def calculate_basis(self, spot_price, futures_price, days_to_expiry):
        """计算年化基差"""
        basis = (futures_price - spot_price) / spot_price
        annualized = basis * (365 / days_to_expiry)
        return annualized

    def execute(self, symbol, size, min_annualized_return=0.15):
        """
        执行期现套利
        要求年化基差 > 15%
        """
        spot = self.get_spot_price(symbol)
        futures = self.get_futures_price(symbol)
        days = self.get_days_to_expiry(symbol)

        annualized = self.calculate_basis(spot, futures, days)

        if annualized > min_annualized_return:
            # 买入现货
            self.spot_exchange.buy(symbol, size)
            # 卖出期货
            self.futures_exchange.open_short(f"{symbol}-FUTURES", size)

            print(f"期现套利已建立，年化基差: {annualized:.2%}")
            return True
        return False
```

## DEX套利策略

### 跨DEX套利
```python
from web3 import Web3

class DEXArbitrage:
    """
    跨DEX套利：在不同DEX间利用价格差异
    """
    def __init__(self):
        self.w3 = Web3(Web3.HTTPProvider('YOUR_RPC'))
        self.uniswap_router = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
        self.sushiswap_router = '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'

    def get_uniswap_price(self, token_in, token_out, amount):
        """获取Uniswap价格"""
        router = self.w3.eth.contract(
            address=self.uniswap_router,
            abi=UNISWAP_ROUTER_ABI
        )
        amounts = router.functions.getAmountsOut(
            amount,
            [token_in, token_out]
        ).call()
        return amounts[-1]

    def get_sushiswap_price(self, token_in, token_out, amount):
        """获取SushiSwap价格"""
        # 类似实现
        pass

    def find_arbitrage(self, token_pairs, min_profit=0.005):
        """
        寻找套利机会
        min_profit: 最小利润阈值（0.5%）
        """
        opportunities = []

        for pair in token_pairs:
            token_a, token_b = pair
            amount = 10 ** 18  # 1 ETH

            # 获取两个DEX的价格
            uniswap_out = self.get_uniswap_price(token_a, token_b, amount)
            sushi_out = self.get_sushiswap_price(token_a, token_b, amount)

            # 计算套利空间
            if uniswap_out > sushi_out * (1 + min_profit):
                profit = uniswap_out - sushi_out
                opportunities.append({
                    'pair': pair,
                    'buy_on': 'SushiSwap',
                    'sell_on': 'Uniswap',
                    'profit': profit,
                    'profit_pct': profit / amount
                })
            elif sushi_out > uniswap_out * (1 + min_profit):
                profit = sushi_out - uniswap_out
                opportunities.append({
                    'pair': pair,
                    'buy_on': 'Uniswap',
                    'sell_on': 'SushiSwap',
                    'profit': profit,
                    'profit_pct': profit / amount
                })

        return opportunities
```

### 闪电贷套利
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";

contract FlashLoanArbitrage is FlashLoanSimpleReceiverBase {
    address public owner;

    constructor(address _poolAddress) FlashLoanSimpleReceiverBase(_poolAddress) {
        owner = msg.sender;
    }

    function executeArbitrage(
        address asset,
        uint256 amount,
        bytes calldata params
    ) external {
        // 申请闪电贷
        POOL.flashLoanSimple(
            address(this),
            asset,
            amount,
            params,
            0
        );
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        // 在这里执行套利逻辑
        // 1. 用借来的资产在DEX A买入
        // 2. 在DEX B卖出
        // 3. 确保利润 > premium

        // 归还闪电贷
        uint256 amountOwed = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwed);

        return true;
    }
}
```

## 链上策略

### MEV搜索
```python
class MEVSearcher:
    """
    MEV（最大可提取价值）搜索策略
    包括套利、清算、三明治攻击等
    """
    def __init__(self, w3):
        self.w3 = w3
        self.pending_tx_filter = w3.eth.filter('pending')

    def monitor_mempool(self):
        """监控内存池寻找MEV机会"""
        pending_txs = self.pending_tx_filter.get_new_entries()

        for tx_hash in pending_txs:
            tx = self.w3.eth.get_transaction(tx_hash)

            # 检测大额swap交易
            if self.is_large_swap(tx):
                # 计算抢先交易利润
                profit = self.calculate_sandwich_profit(tx)
                if profit > 0:
                    self.execute_sandwich(tx, profit)

    def is_large_swap(self, tx):
        """判断是否为大额兑换交易"""
        # 检查目标合约是否为DEX
        # 检查交易金额是否超过阈值
        pass

    def liquidate_position(self, protocol, user):
        """
        执行清算
        当用户借贷仓位抵押不足时进行清算
        """
        # 检查是否可清算
        health_factor = protocol.get_health_factor(user)

        if health_factor < 1:
            # 执行清算
            tx = protocol.liquidate(user, self.repay_asset, self.collateral_asset)
            return tx
```

## 风险管理

### 加密市场特有风险
```python
class CryptoRiskManager:
    def __init__(self):
        self.max_position_size = 0.1  # 单仓位最大10%
        self.max_drawdown = 0.2       # 最大回撤20%
        self.circuit_breaker = 0.05   # 单日熔断5%

    def check_circuit_breaker(self, daily_pnl):
        """熔断检查"""
        if daily_pnl < -self.circuit_breaker:
            self.emergency_close_all()
            raise Exception(f"熔断触发！单日亏损: {daily_pnl:.2%}")

    def manage_exchange_risk(self, positions):
        """交易所风险分散"""
        # 避免资金集中在单一交易所
        exchange_exposure = {}
        for pos in positions:
            ex = pos.exchange
            exchange_exposure[ex] = exchange_exposure.get(ex, 0) + pos.value

        # 检查集中度
        total = sum(exchange_exposure.values())
        for ex, exposure in exchange_exposure.items():
            if exposure / total > 0.5:
                print(f"警告：{ex} 交易所仓位过高 ({exposure/total:.1%})")

    def smart_contract_audit_check(self, protocol_address):
        """检查协议审计状态"""
        audit_info = {
            'has_audit': False,
            'audit_firms': [],
            'last_audit_date': None,
            'critical_findings': 0
        }

        # 查询审计信息（通过API或链上数据）
        # 如果没有审计或有关键漏洞，避免交互

        return audit_info
```

## 延伸阅读

- [区块链基础](fundamentals) — 技术原理
- [市场微观结构](market-structure) — CEX/DEX机制
- [风险管理](/docs/quant/risk/) — 通用风控原则
