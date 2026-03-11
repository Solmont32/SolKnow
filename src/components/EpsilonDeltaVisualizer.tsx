import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Eye, Target, Zap, Activity } from 'lucide-react';

/**
 * EpsilonDeltaVisualizer
 * 一个交互式的 Epsilon-Delta 定义演示组件
 * 函数: f(x) = x^2
 * 目标点: x0 = 2, L = 4
 */
export default function EpsilonDeltaVisualizer() {
  const [epsilon, setEpsilon] = useState(0.5);
  const x0 = 2;
  const L = 4;

  // 计算对应的 delta (理论上取最小值以保证落在范围内)
  const delta = useMemo(() => {
    const leftX = Math.sqrt(Math.max(0, L - epsilon));
    const rightX = Math.sqrt(L + epsilon);
    return Math.min(x0 - leftX, rightX - x0);
  }, [epsilon]);

  // 坐标系映射
  const width = 400;
  const height = 300;
  const padding = 40;

  const xScale = (x: number) => padding + (x / 4) * (width - 2 * padding);
  const yScale = (y: number) => height - padding - (y / 8) * (height - 2 * padding);

  // 生成曲线路径
  const curvePath = useMemo(() => {
    let path = `M ${xScale(0)} ${yScale(0)}`;
    for (let x = 0.1; x <= 3.5; x += 0.1) {
      path += ` L ${xScale(x)} ${yScale(x * x)}`;
    }
    return path;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="epsilon-delta-container"
      style={{
        margin: '2.5rem 0',
        padding: '2rem',
        borderRadius: '24px',
        backgroundColor: 'var(--solknow-card-bg)',
        border: '1px solid var(--ifm-color-emphasis-200)',
        boxShadow: 'var(--solknow-card-shadow)',
        color: 'var(--ifm-color-emphasis-900)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
        <div
          style={{
            padding: '10px',
            borderRadius: '12px',
            background: 'var(--ifm-color-primary-lightest)',
            color: 'var(--ifm-color-primary)',
            display: 'flex',
          }}
        >
          <Activity size={24} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
            交互式 $\epsilon-\delta$ 实验室
          </h3>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6 }}>
            可视化理解极限的严密定义：$\forall \epsilon {' > '} 0, \exists \delta {' > '} 0 \dots$
          </p>
        </div>
      </div>

      <div
        className="visualizer-grid"
        style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}
      >
        {/* 绘图区 */}
        <div
          style={{
            background: 'var(--ifm-color-emphasis-100)',
            borderRadius: '20px',
            padding: '15px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--ifm-color-emphasis-200)',
          }}
        >
          <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
            {/* 坐标轴 */}
            <line
              x1={padding}
              y1={height - padding}
              x2={width - 10}
              y2={height - padding}
              stroke="var(--ifm-color-emphasis-400)"
              strokeWidth="1.5"
            />
            <line
              x1={padding}
              y1={height - padding}
              x2={padding}
              y2={10}
              stroke="var(--ifm-color-emphasis-400)"
              strokeWidth="1.5"
            />

            {/* Epsilon 区域 (Y轴) */}
            <motion.rect
              animate={{
                y: yScale(L + epsilon),
                height: yScale(L - epsilon) - yScale(L + epsilon),
              }}
              x={padding}
              width={width - 2 * padding}
              fill="rgba(59, 130, 246, 0.15)"
            />
            <motion.line
              animate={{ y1: yScale(L + epsilon), y2: yScale(L + epsilon) }}
              x1={padding - 5}
              x2={width - padding}
              stroke="#3b82f6"
              strokeDasharray="4"
              strokeWidth="2"
            />
            <motion.line
              animate={{ y1: yScale(L - epsilon), y2: yScale(L - epsilon) }}
              x1={padding - 5}
              x2={width - padding}
              stroke="#3b82f6"
              strokeDasharray="4"
              strokeWidth="2"
            />

            {/* Delta 区域 (X轴) */}
            <motion.rect
              animate={{
                x: xScale(x0 - delta),
                width: xScale(x0 + delta) - xScale(x0 - delta),
              }}
              y={10}
              height={height - 2 * padding}
              fill="rgba(139, 92, 246, 0.15)"
            />
            <motion.line
              animate={{ x1: xScale(x0 - delta), x2: xScale(x0 - delta) }}
              y1={height - padding + 5}
              y2={10}
              stroke="#8b5cf6"
              strokeDasharray="4"
              strokeWidth="2"
            />
            <motion.line
              animate={{ x1: xScale(x0 + delta), x2: xScale(x0 + delta) }}
              y1={height - padding + 5}
              y2={10}
              stroke="#8b5cf6"
              strokeDasharray="4"
              strokeWidth="2"
            />

            {/* 函数曲线 */}
            <path d={curvePath} fill="none" stroke="var(--ifm-color-primary)" strokeWidth="3" />

            {/* 目标点 */}
            <circle cx={xScale(x0)} cy={yScale(L)} r="5" fill="#ef4444" />

            {/* 文本标注 */}
            <text
              x={padding - 35}
              y={yScale(L)}
              fill="var(--ifm-color-emphasis-700)"
              fontSize="12"
              fontWeight="700"
              dominantBaseline="middle"
            >
              L=4
            </text>
            <text
              x={xScale(x0)}
              y={height - padding + 25}
              fill="var(--ifm-color-emphasis-700)"
              fontSize="12"
              fontWeight="700"
              textAnchor="middle"
            >
              x₀=2
            </text>
          </svg>
        </div>

        {/* 控制区 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              background: 'rgba(59, 130, 246, 0.05)',
              padding: '1.25rem',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.1)',
            }}
          >
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#3b82f6' }}>
                误差阈值 ε (Epsilon)
              </span>
              <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#3b82f6' }}>
                {epsilon.toFixed(3)}
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.5"
              step="0.01"
              value={epsilon}
              onChange={(e) => setEpsilon(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
          </div>

          <motion.div
            key={delta}
            initial={{ scale: 0.98, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: 'rgba(139, 92, 246, 0.05)',
              padding: '1.25rem',
              borderRadius: '16px',
              border: '1px solid rgba(139, 92, 246, 0.1)',
            }}
          >
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#8b5cf6' }}>
                控制精度 δ (Delta)
              </span>
              <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#8b5cf6' }}>
                {delta.toFixed(3)}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8, lineHeight: 1.5 }}>
              当误差范围为 {epsilon.toFixed(2)} 时，
              <br />
              只需保证 $|x - 2| {' < '} {delta.toFixed(3)}$
            </div>
          </motion.div>

          <div
            style={{
              padding: '1.25rem',
              borderRadius: '16px',
              border: '1px dashed var(--ifm-color-emphasis-300)',
              fontSize: '0.85rem',
              backgroundColor: 'var(--ifm-color-emphasis-100)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '0.6rem',
                color: 'var(--ifm-color-primary)',
                fontWeight: 700,
              }}
            >
              <Zap size={16} />
              <span>交互指南</span>
            </div>
            <p style={{ margin: 0, opacity: 0.7, lineHeight: 1.6 }}>
              拖动滑块减小 ε，观察左侧紫色区域（δ）如何自动收缩。这直观展示了“δ 随 ε 而变”的本质。
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
