import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Info, TrendingUp } from 'lucide-react';

const complexities = [
  { label: 'O(1)', color: '#10b981', fn: (n: number) => 1, desc: '常数级' },
  { label: 'O(log n)', color: '#3b82f6', fn: (n: number) => Math.log2(n), desc: '对数级' },
  { label: 'O(n)', color: '#8b5cf6', fn: (n: number) => n, desc: '线性级' },
  {
    label: 'O(n log n)',
    color: '#f59e0b',
    fn: (n: number) => n * Math.log2(n),
    desc: '线性对数级',
  },
  { label: 'O(n²)', color: '#ef4444', fn: (n: number) => n * n, desc: '平方级' },
];

/**
 * 复杂度分析可视化组件
 * 用于直观对比不同算法复杂度的增长速度
 */
export default function ComplexityAnalysis() {
  const [n, setN] = useState(10);
  const width = 400;
  const height = 300;
  const padding = 40;

  const xScale = (val: number) => padding + (val / 100) * (width - 2 * padding);
  const yScale = (val: number) => height - padding - (val / 10000) * (height - 2 * padding);

  // 限制 y 轴最大值以便观察
  const safeYScale = (val: number) => {
    const y = height - padding - (val / (n * n * 1.2)) * (height - 2 * padding);
    return Math.max(padding, y);
  };

  return (
    <div
      className="complexity-analysis-container"
      style={{
        margin: '2rem 0',
        padding: '2rem',
        borderRadius: '24px',
        backgroundColor: 'var(--solknow-card-bg)',
        border: '1px solid var(--ifm-color-emphasis-200)',
        boxShadow: 'var(--solknow-card-shadow)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
        <div
          style={{
            padding: '10px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.1)',
            color: '#f59e0b',
            display: 'flex',
          }}
        >
          <TrendingUp size={24} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>算法复杂度比较</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6 }}>
            观察输入规模 $n$ 增加时，不同复杂度的增长趋势
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: '2rem' }}>
        <div
          style={{
            background: 'var(--ifm-color-emphasis-100)',
            borderRadius: '20px',
            padding: '15px',
            border: '1px solid var(--ifm-color-emphasis-200)',
          }}
        >
          <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
            {/* 网格线 */}
            {[0, 25, 50, 75, 100].map((tick) => (
              <line
                key={tick}
                x1={padding}
                y1={height - padding - (tick / 100) * (height - 2 * padding)}
                x2={width - padding}
                y2={height - padding - (tick / 100) * (height - 2 * padding)}
                stroke="var(--ifm-color-emphasis-200)"
                strokeDasharray="2"
              />
            ))}

            {/* 曲线 */}
            {complexities.map((comp) => {
              let path = '';
              for (let i = 1; i <= n; i++) {
                const x = padding + (i / n) * (width - 2 * padding);
                const y = safeYScale(comp.fn(i));
                path += (i === 1 ? 'M' : 'L') + ` ${x} ${y}`;
              }
              return (
                <motion.path
                  key={comp.label}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  d={path}
                  fill="none"
                  stroke={comp.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}

            {/* 轴 */}
            <line
              x1={padding}
              y1={height - padding}
              x2={width - padding}
              y2={height - padding}
              stroke="var(--ifm-color-emphasis-400)"
              strokeWidth="2"
            />
            <line
              x1={padding}
              y1={height - padding}
              x2={padding}
              y2={padding}
              stroke="var(--ifm-color-emphasis-400)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>规模 $n$:</span>
              <span style={{ fontWeight: 800, color: 'var(--ifm-color-primary)' }}>{n}</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={n}
              onChange={(e) => setN(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {complexities.map((comp) => (
              <div
                key={comp.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  background: 'var(--ifm-color-emphasis-100)',
                  borderLeft: `4px solid ${comp.color}`,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{comp.label}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{comp.desc}</div>
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: comp.color }}>
                  {Math.round(comp.fn(n))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
