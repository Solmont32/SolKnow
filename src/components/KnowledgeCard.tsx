import React, { ReactNode } from 'react';
import { 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb,
  Terminal,
  Trophy
} from 'lucide-react';
import clsx from 'clsx';

type CardType = 'info' | 'warning' | 'success' | 'tip' | 'code' | 'contest';

interface KnowledgeCardProps {
  children: ReactNode;
  type?: CardType;
  title?: string;
  className?: string;
}

const config = {
  info: {
    icon: Info,
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.05)',
    border: 'rgba(59, 130, 246, 0.2)',
    label: '说明'
  },
  warning: {
    icon: AlertTriangle,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.05)',
    border: 'rgba(245, 158, 11, 0.2)',
    label: '注意'
  },
  success: {
    icon: CheckCircle2,
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.05)',
    border: 'rgba(16, 185, 129, 0.2)',
    label: '完成'
  },
  tip: {
    icon: Lightbulb,
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.05)',
    border: 'rgba(139, 92, 246, 0.2)',
    label: '技巧'
  },
  code: {
    icon: Terminal,
    color: '#64748b',
    bg: 'rgba(100, 116, 139, 0.05)',
    border: 'rgba(100, 116, 139, 0.2)',
    label: '实现'
  },
  contest: {
    icon: Trophy,
    color: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.05)',
    border: 'rgba(236, 72, 153, 0.2)',
    label: '竞赛'
  }
};

/**
 * 专业的文档增强卡片
 * 用于高亮显示知识点、技巧、竞赛经验等
 */
export default function KnowledgeCard({ 
  children, 
  type = 'info', 
  title,
  className 
}: KnowledgeCardProps) {
  const { icon: Icon, color, bg, border, label } = config[type];

  return (
    <div 
      style={{
        margin: '1.5rem 0',
        padding: '1.25rem 1.5rem',
        borderRadius: '16px',
        backgroundColor: bg,
        border: `1px solid ${border}`,
        position: 'relative',
        overflow: 'hidden'
      }}
      className={clsx('knowledge-card', className)}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: color
      }} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
        <div style={{ color, display: 'flex' }}>
          <Icon size={20} />
        </div>
        <span style={{ 
          color, 
          fontWeight: 800, 
          fontSize: '0.85rem', 
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {title || label}
        </span>
      </div>
      
      <div style={{ 
        color: 'var(--ifm-color-emphasis-800)',
        fontSize: '0.95rem',
        lineHeight: 1.7
      }}>
        {children}
      </div>
    </div>
  );
}
