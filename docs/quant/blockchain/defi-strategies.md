# DeFi 量化策略

DeFi（去中心化金融）为量化交易开辟了全新的战场。本节深入探讨如何在去中心化协议中捕获Alpha。

## DeFi 协议类型与机会

```
DeFi 生态图谱
─────────────────────────────────────────────────────────────
Layer 1 (公链)
    │
    ├── DEX (去中心化交易所)
    │   ├── Uniswap V2/V3 (AMM)
    │   ├── Curve (稳定币兑换)
    │   └── GMX (永续合约)
    │
    ├── 借贷协议
    │   ├── Aave (多链借贷)
    │   ├── Compound (算法利率)
    │   └── MakerDAO (DAI稳定币)
    │
    ├── 收益聚合器
    │   ├── Yearn (机枪池)
    │   └── Convex (Curve生态)
    │
    ├── 衍生品
    │   ├── dYdX (去中心化期货)
    │   └── Synthetix (合成资产)
    │
    └── 跨链桥
        ├── Stargate (LayerZero)
        └── Across (快速跨链)
```

## 流动性挖矿策略

### 基础 LP 策略
```python
class LiquidityMiningStrategy:
    """
    流动性挖矿策略：为DEX提供流动性获取交易手续费
    """
    def __init__(self):
        self.min_apy_threshold = 0.15  # 最低15%年化
        self.max_il_tolerance = 0.05   # 最大5%无常损失

    def evaluate_pool(self, pool_address):
        """评估流动性池收益"""
        # 获取池子数据
        tvl = self.get_tvl(pool_address)
        volume_24h = self.get_volume(pool_address, days=1)
        fees_24h = self.get_fees(pool_address, days=1)

        # 计算年化收益率
        apr = (fees_24h * 365) / tvl if tvl > 0 else 0

        # 获取额外奖励（如UNI、CRV等治理代币）
        reward_apy = self.get_reward_apy(pool_address)

        total_apy = apr + reward_apy

        # 评估无常损失风险
        volatility = self.get_pair_volatility(pool_address)
        il_risk = self.estimate_impermanent_loss(volatility)

        return {
            'pool': pool_address,
            'tvl': tvl,
            'volume_24h': volume_24h,
            'fee_apr': apr,
            'reward_apy': reward_apy,
            'total_apy': total_apy,
            'il_risk': il_risk,
            'risk_adjusted_return': total_apy - il_risk * 2
        }

    def select_optimal_pools(self, pools, top_n=5):
        """选择最优流动性池"""
        evaluations = [self.evaluate_pool(p) for p in pools]

        # 筛选符合条件的池子
        qualified = [
            e for e in evaluations
            if e['total_apy'] >= self.min_apy_threshold
            and e['il_risk'] <= self.max_il_tolerance
        ]

        # 按风险调整后收益排序
        qualified.sort(key=lambda x: x['risk_adjusted_return'], reverse=True)

        return qualified[:top_n]
```

### 杠杆流动性挖矿
```python
class LeveragedYieldFarming:
    """
    杠杆挖矿策略：借入资产放大LP收益
    适用于高APY且波动性较低的稳定币池
    """
    def __init__(self, lending_protocol, dex_router):
        self.lending = lending_protocol
        self.dex = dex_router

    def execute_leverage_strategy(
        self,
        pool_address,
        principal_amount,
        leverage_ratio=2.0,
        target_ltv=0.65
    ):
        """
        执行杠杆挖矿

        以2倍杠杆为例：
        1. 投入100 USDC作为本金
        2. 在Aave抵押100 USDC，借出100 USDC
        3. 总共200 USDC投入Curve 3pool
        4. 获取2倍LP收益，扣除借款利息
        """
        # 1. 存入抵押品
        self.lending.supply('USDC', principal_amount)

        # 2. 计算可借金额
        collateral_value = self.lending.get_collateral_value()
        max_borrow = collateral_value * target_ltv
        borrow_amount = principal_amount * (leverage_ratio - 1)

        if borrow_amount > max_borrow:
            raise Exception(f"杠杆过高，最大可借: {max_borrow}")

        # 3. 借出资产
        self.lending.borrow('USDC', borrow_amount)

        # 4. 投入流动性池
        total_lp = principal_amount + borrow_amount
        lp_tokens = self.dex.add_liquidity(pool_address, total_lp)

        # 5. 监控健康因子
        health_factor = self.lending.get_health_factor()

        return {
            'principal': principal_amount,
            'borrowed': borrow_amount,
            'total_position': total_lp,
            'lp_tokens': lp_tokens,
            'health_factor': health_factor,
            'liquidation_price': self.calculate_liquidation_price()
        }

    def monitor_and_adjust(self):
        """监控仓位并自动调整"""
        health_factor = self.lending.get_health_factor()

        if health_factor < 1.2:
            # 健康因子过低，减仓或增加抵押
            self.emergency_deleverage()
        elif health_factor > 2.0:
            # 健康因子过高，可以增加杠杆
            self.increase_leverage()

    def emergency_deleverage(self):
        """紧急去杠杆"""
        # 1. 撤回部分流动性
        # 2. 偿还部分借款
        # 3. 提高健康因子
        pass
```

## 治理代币策略

### 治理挖矿与投票权套利
```python
class GovernanceStrategy:
    """
    治理代币策略：参与协议治理获取收益
    """
    def __init__(self):
        self.ve_tokens = {}  # 投票托管代币

    def vote_escrow_strategy(self, protocol, lock_duration):
        """
        veToken策略：锁定代币获取治理权和收益加成
        如veCRV、veBAL等
        """
        # 计算最优锁定时间
        # 通常锁定时间越长，收益加成越高
        max_lock = 4 * 365  # 4年

        # 收益加成曲线
        boost_multiplier = lock_duration / max_lock * 2.5  # 最高2.5倍

        return {
            'lock_duration': lock_duration,
            'boost_multiplier': boost_multiplier,
            'voting_power': self.calculate_voting_power(lock_duration),
            'estimated_apr': self.get_boosted_apr(protocol, boost_multiplier)
        }

    def gauge_voting_strategy(self, pool_weights):
        """
        Gauge投票策略：将投票权分配给高收益池
        适用于Curve、Balancer等协议
        """
        # 分析各池子的收益率
        pool_aprs = {}
        for gauge in self.get_active_gauges():
            pool_aprs[gauge] = self.calculate_gauge_apr(gauge)

        # 根据收益率分配投票权重
        total_apr = sum(pool_aprs.values())
        optimal_weights = {
            gauge: apr / total_apr
            for gauge, apr in pool_aprs.items()
        }

        return optimal_weights

    def bribe_market_analysis(self):
        """
        贿赂市场分析：协议通过贿赂获取Gauge权重
        可以出售投票权或参与贿赂拍卖
        """
        bribes = self.get_active_bribes()

        opportunities = []
        for bribe in bribes:
            # 计算每单位投票权的收益
            reward_per_vote = bribe['reward_amount'] / bribe['total_votes_needed']

            # 比较机会成本
            alternative_yield = self.get_alternative_yield()

            if reward_per_vote > alternative_yield:
                opportunities.append(bribe)

        return opportunities
```

## 跨链套利策略

### 跨链桥套利
```python
class CrossChainArbitrage:
    """
    跨链套利：利用同一资产在不同链上的价格差异
    """
    def __init__(self):
        self.bridges = {
            'Stargate': StargateBridge(),
            'Across': AcrossBridge(),
            'Synapse': SynapseBridge(),
        }

    def find_bridge_arbitrage(self, token, source_chain, target_chain):
        """
        寻找跨链套利机会
        """
        # 获取源链和目标链的价格
        source_price = self.get_price(token, source_chain)
        target_price = self.get_price(token, target_chain)

        # 计算价差
        price_diff = (target_price - source_price) / source_price

        # 获取跨链桥费用
        bridge_fee = self.estimate_bridge_fee(
            token, source_chain, target_chain
        )

        # 考虑跨链时间（资金占用成本）
        bridge_time = self.estimate_bridge_time(source_chain, target_chain)
        time_cost = self.calculate_time_cost(bridge_time)

        # 净利润
        net_profit = price_diff - bridge_fee - time_cost

        if net_profit > 0.005:  # 0.5%门槛
            return {
                'direction': f"{source_chain} -> {target_chain}",
                'profit_pct': net_profit,
                'bridge_fee': bridge_fee,
                'estimated_time': bridge_time,
                'optimal_bridge': self.select_best_bridge(source_chain, target_chain)
            }
        return None

    def execute_atomic_arbitrage(self, opportunity):
        """
        执行原子跨链套利（通过闪电贷）
        """
        # 1. 在源链借闪电贷
        # 2. 跨链到目标链
        # 3. 卖出获利
        # 4. 跨链回源链
        # 5. 偿还闪电贷
        pass

    def monitor_liquidity_imbalances(self):
        """
        监控跨链桥流动性不平衡
        当一边流动性枯竭时，另一边价格会偏离
        """
        for bridge_name, bridge in self.bridges.items():
            for chain in bridge.supported_chains:
                liquidity = bridge.get_liquidity(chain)
                capacity = bridge.get_capacity(chain)

                utilization = liquidity / capacity

                if utilization > 0.9:
                    # 流动性紧张，可能出现溢价
                    print(f"警告：{bridge_name} {chain} 流动性紧张")
                elif utilization < 0.1:
                    # 流动性过剩，可能出现折价
                    print(f"机会：{bridge_name} {chain} 流动性过剩")
```

## 期权与结构化产品

### DeFi 期权策略
```python
class DeFiOptionsStrategy:
    """
    DeFi期权策略：使用链上期权协议进行风险对冲或收益增强
    """
    def __init__(self):
        self.option_protocols = {
            'Lyra': LyraProtocol(),
            'Premia': PremiaProtocol(),
            'Hegic': HegicProtocol(),
        }

    def covered_call_strategy(self, underlying_amount, strike_price, expiry):
        """
        备兑看涨期权策略
        持有现货ETH，卖出看涨期权获取权利金
        """
        # 1. 持有ETH现货
        # 2. 卖出等量或部分看涨期权
        # 3. 收取权利金

        premium = self.option_protocols['Lyra'].get_premium(
            'ETH', strike_price, expiry, 'call'
        )

        # 计算年化收益率
        days_to_expiry = (expiry - datetime.now()).days
        apr = (premium / (strike_price * underlying_amount)) * (365 / days_to_expiry)

        return {
            'strategy': 'covered_call',
            'premium': premium,
            'apr': apr,
            'max_profit': premium + (strike_price - current_price),
            'risk': 'ETH下跌风险'
        }

    def protective_put_strategy(self, underlying_amount, strike_price, expiry):
        """
        保护性看跌期权：为持有的现货购买保险
        """
        premium = self.option_protocols['Lyra'].get_premium(
            'ETH', strike_price, expiry, 'put'
        )

        # 计算保险成本
        insurance_cost = premium / underlying_amount

        return {
            'strategy': 'protective_put',
            'insurance_cost': insurance_cost,
            'protection_level': strike_price,
            'breakeven': current_price + premium
        }

    def delta_neutral_yield(self, amount):
        """
        Delta中性收益策略：
        通过期权对冲现货敞口，赚取资金费或质押收益
        """
        # 1. 买入现货ETH
        # 2. 卖出等值看涨期权（Delta对冲）
        # 3. 将现货质押获取收益（如Lido）

        spot_yield = 0.04  # 4%质押收益
        option_premium = 0.12  # 12%权利金年化

        total_yield = spot_yield + option_premium

        return {
            'total_yield': total_yield,
            'hedge_cost': 0,
            'risk': '短期波动导致Delta偏离'
        }
```

## 清算套利（Liquidation Mining）

```python
class LiquidationArbitrage:
    """
    清算套利：监控借贷协议的健康因子，在抵押不足时执行清算
    """
    def __init__(self):
        self.protocols = [AaveMonitor(), CompoundMonitor()]

    def scan_liquidation_opportunities(self):
        """扫描清算机会"""
        opportunities = []

        for protocol in self.protocols:
            # 获取所有借款仓位
            positions = protocol.get_all_positions()

            for position in positions:
                health_factor = position['health_factor']

                if health_factor < 1.0:
                    # 可清算仓位
                    collateral = position['collateral_asset']
                    debt = position['debt_asset']
                    debt_amount = position['debt_amount']

                    # 计算清算利润
                    # 通常协议提供5-10%的清算奖励
                    liquidation_bonus = protocol.get_liquidation_bonus(collateral)
                    profit = debt_amount * liquidation_bonus

                    # 考虑Gas成本
                    gas_cost = self.estimate_gas_cost()

                    net_profit = profit - gas_cost

                    if net_profit > 0:
                        opportunities.append({
                            'protocol': protocol.name,
                            'borrower': position['address'],
                            'collateral': collateral,
                            'debt': debt,
                            'debt_amount': debt_amount,
                            'profit': net_profit,
                            'health_factor': health_factor
                        })

        # 按利润排序
        opportunities.sort(key=lambda x: x['profit'], reverse=True)
        return opportunities

    def execute_liquidation(self, opportunity):
        """执行清算"""
        protocol = opportunity['protocol']

        # 准备偿还资金
        self.flashloan(
            opportunity['debt'],
            opportunity['debt_amount']
        )

        # 执行清算
        tx = protocol.liquidate(
            borrower=opportunity['borrower'],
            debt_asset=opportunity['debt'],
            debt_to_cover=opportunity['debt_amount'],
            collateral_asset=opportunity['collateral'],
            receive_a_token=False
        )

        # 卖出获得的抵押品
        collateral_received = self.get_collateral_received(tx)
        self.swap(
            opportunity['collateral'],
            opportunity['debt'],
            collateral_received
        )

        # 偿还闪电贷
        self.repay_flashloan()

        return tx
```

## 风险管理

### 智能合约风险评估
```python
class DeFiRiskManager:
    """
    DeFi特有风险管理
    """
    def __init__(self):
        self.risk_scores = {}

    def evaluate_protocol_risk(self, protocol_address):
        """评估协议风险"""
        risk_factors = {
            'audits': self.check_audits(protocol_address),
            'tvl': self.get_tvl(protocol_address),
            'age': self.get_protocol_age(protocol_address),
            'exploits': self.check_past_exploits(protocol_address),
            'admin_keys': self.check_admin_privileges(protocol_address),
        }

        # 综合评分 (0-100)
        score = 0
        if risk_factors['audits']:
            score += 20
        if risk_factors['tvl'] > 1e9:  # >10亿美元
            score += 20
        if risk_factors['age'] > 365:  # >1年
            score += 20
        if not risk_factors['exploits']:
            score += 20
        if not risk_factors['admin_keys']:
            score += 20

        return score

    def monitor_impermanent_loss(self, positions, threshold=0.05):
        """监控无常损失"""
        for pos in positions:
            current_il = self.calculate_current_il(pos)

            if current_il > threshold:
                # 无常损失过大，考虑撤出流动性
                self.alert(f"无常损失警告: {pos['pool']} IL={current_il:.2%}")

    def emergency_exit_plan(self):
        """紧急退出方案"""
        # 1. 准备Gas费储备
        # 2. 预设滑点容忍度
        # 3. 备用RPC节点
        # 4. 多签钱包逃生舱
        pass
```

## 延伸阅读

- [加密货币量化策略](trading-strategies) — CEX策略
- [市场微观结构](market-structure) — DEX机制详解
- [风险管理](/docs/quant/risk/) — 通用风险管理原则
