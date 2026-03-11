import React, { ReactNode, useState } from 'react';
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Terminal,
  Trophy,
  AlertOctagon,
  XCircle,
  BookOpen,
  Zap,
  Activity,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

type CardType =
  | 'info'
  | 'warning'
  | 'success'
  | 'tip'
  | 'code'
  | 'contest'
  | 'danger'
  | 'error'
  | 'theorem'
  | 'complexity'
  | 'algorithm';

interface KnowledgeCardProps {
  children: ReactNode;
  type?: CardType;
  title?: string;
  className?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

const config = {
  info: {
    icon: Info,
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.05)',
    border: 'rgba(59, 130, 246, 0.2)',
    label: '说明 (INFO)',
  },
  warning: {
    icon: AlertTriangle,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.05)',
    border: 'rgba(245, 158, 11, 0.2)',
    label: '注意 (CAUTION)',
  },
  success: {
    icon: CheckCircle2,
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.05)',
    border: 'rgba(16, 185, 129, 0.2)',
    label: '结论 (CONCLUSION)',
  },
  tip: {
    icon: Lightbulb,
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.05)',
    border: 'rgba(139, 92, 246, 0.2)',
    label: '技巧 (TIP)',
  },
  code: {
    icon: Terminal,
    color: '#64748b',
    bg: 'rgba(100, 116, 139, 0.05)',
    border: 'rgba(100, 116, 139, 0.2)',
    label: '实现 (IMPLEMENTATION)',
  },
  contest: {
    icon: Trophy,
    color: '#ec4899',
    bg: 'rgba(236, 72, 153, 0.05)',
    border: 'rgba(236, 72, 153, 0.2)',
    label: '竞赛 (CONTEST)',
  },
  danger: {
    icon: AlertOctagon,
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.05)',
    border: 'rgba(239, 68, 68, 0.2)',
    label: '危险 (DANGER)',
  },
  error: {
    icon: XCircle,
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.05)',
    border: 'rgba(239, 68, 68, 0.2)',
    label: '错误 (ERROR)',
  },
  theorem: {
    icon: BookOpen,
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.05)',
    border: 'rgba(139, 92, 246, 0.2)',
    label: '定理 (THEOREM)',
  },
  complexity: {
    icon: Activity,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.05)',
    border: 'rgba(245, 158, 11, 0.2)',
    label: '复杂度分析 (COMPLEXITY)',
  },
  algorithm: {
    icon: Zap,
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.05)',
    border: 'rgba(59, 130, 246, 0.2)',
    label: '算法流程 (ALGORITHM)',
  },
};

/**
 * 专业的文档增强卡片
 * 用于高亮显示知识点、技巧、竞赛经验等
 */
export default function KnowledgeCard({
  children,
  type = 'info',
  title,
  className,
  collapsible = false,
  defaultOpen = true,
}: KnowledgeCardProps) {
  const { icon: Icon, color, bg, border, label } = config[type];
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const content = (
    <div
      style={{
        color: 'var(--ifm-color-emphasis-800)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
      }}
    >
      {children}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        margin: '1.5rem 0',
        padding: '1.25rem 1.5rem',
        borderRadius: '16px',
        backgroundColor: bg,
        border: `1px solid ${border}`,
        position: 'relative',
        overflow: 'hidden',
        cursor: collapsible ? 'pointer' : 'default',
      }}
      className={clsx('knowledge-card', className)}
      onClick={() => collapsible && setIsOpen(!isOpen)}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          backgroundColor: color,
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: isOpen || !collapsible ? '0.75rem' : '0',
          transition: 'margin 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ color, display: 'flex' }}>
            <Icon size={20} />
          </div>
          <span
            style={{
              color,
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {title || label}
          </span>
        </div>
        {collapsible && (
          <div style={{ color, display: 'flex' }}>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        )}
      </div>

      {collapsible ? (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        content
      )}
    </motion.div>
  );
}
