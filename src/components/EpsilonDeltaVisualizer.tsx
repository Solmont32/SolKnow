import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Eye, Target, Zap } from 'lucide-react';

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
    <div
      className="epsilon-delta-container"
      style={{
        margin: '2rem 0',
        padding: '1.5rem',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'var(--solknow-card-shadow)',
        color: 'var(--ifm-color-emphasis-900)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
        <Target className="text-blue-500" size={24} />
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
          交互式 $\epsilon-\delta$ 实验室
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        {/* 绘图区 */}
        <div
          style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '16px',
            padding: '10px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
            {/* 坐标轴 */}
            <line
              x1={padding}
              y1={height - padding}
              x2={width - 10}
              y2={height - padding}
              stroke="var(--ifm-color-emphasis-300)"
              strokeWidth="1"
            />
            <line
              x1={padding}
              y1={height - padding}
              x2={padding}
              y2={10}
              stroke="var(--ifm-color-emphasis-300)"
              strokeWidth="1"
            />

            {/* Epsilon 区域 (Y轴) */}
            <rect
              x={padding}
              y={yScale(L + epsilon)}
              width={width - 2 * padding}
              height={yScale(L - epsilon) - yScale(L + epsilon)}
              fill="rgba(59, 130, 246, 0.1)"
            />
            <line
              x1={padding - 5}
              y1={yScale(L + epsilon)}
              x2={width - padding}
              y2={yScale(L + epsilon)}
              stroke="#3b82f6"
              strokeDasharray="4"
            />
            <line
              x1={padding - 5}
              y1={yScale(L - epsilon)}
              x2={width - padding}
              y2={yScale(L - epsilon)}
              stroke="#3b82f6"
              strokeDasharray="4"
            />

            {/* Delta 区域 (X轴) */}
            <rect
              x={xScale(x0 - delta)}
              y={10}
              width={xScale(x0 + delta) - xScale(x0 - delta)}
              height={height - 2 * padding}
              fill="rgba(139, 92, 246, 0.1)"
            />
            <line
              x1={xScale(x0 - delta)}
              y1={height - padding + 5}
              x2={xScale(x0 - delta)}
              y2={10}
              stroke="#8b5cf6"
              strokeDasharray="4"
            />
            <line
              x1={xScale(x0 + delta)}
              y1={height - padding + 5}
              x2={xScale(x0 + delta)}
              y2={10}
              stroke="#8b5cf6"
              strokeDasharray="4"
            />

            {/* 函数曲线 */}
            <path d={curvePath} fill="none" stroke="var(--ifm-color-primary)" strokeWidth="3" />

            {/* 目标点 */}
            <circle cx={xScale(x0)} cy={yScale(L)} r="4" fill="#ef4444" />

            {/* 文本标注 */}
            <text
              x={xScale(0) - 15}
              y={yScale(L)}
              fill="#3b82f6"
              fontSize="12"
              dominantBaseline="middle"
            >
              $L=4$
            </text>
            <text
              x={xScale(x0)}
              y={height - padding + 20}
              fill="#8b5cf6"
              fontSize="12"
              textAnchor="middle"
            >
              $x_0=2$
            </text>
          </svg>
        </div>

        {/* 控制区 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              background: 'rgba(59, 130, 246, 0.05)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.1)',
            }}
          >
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#3b82f6' }}>
                误差阈值 $\epsilon$
              </span>
              <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{epsilon.toFixed(3)}</span>
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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: 'rgba(139, 92, 246, 0.05)',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.1)',
            }}
          >
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#8b5cf6' }}>
                控制精度 $\delta$
              </span>
              <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{delta.toFixed(3)}</span>
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
              为了使 $|x^2 - 4| &lt; {epsilon.toFixed(2)}$，
              <br />
              只需保证 $|x - 2| &lt; {delta.toFixed(3)}$
            </div>
          </motion.div>

          <div
            style={{
              padding: '1rem',
              borderRadius: '12px',
              border: '1px dashed rgba(255,255,255,0.1)',
              fontSize: '0.85rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '0.5rem',
                color: 'var(--ifm-color-primary)',
              }}
            >
              <Zap size={14} />
              <strong>交互指南</strong>
            </div>
            拖动上方滑块减小
            $\epsilon$，观察左侧紫色区域（$\delta$）如何自动收缩。这直观展示了“$\delta$ 随
            $\epsilon$ 而变”的本质。
          </div>
        </div>
      </div>
    </div>
  );
}
