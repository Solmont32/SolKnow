import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Terminal, Code2 } from 'lucide-react';
import clsx from 'clsx';

interface CodeCollapseProps {
  children: ReactNode;
  title?: string;
  language?: string;
  defaultOpen?: boolean;
}

/**
 * 专业的代码折叠组件
 * 用于在文档中收纳较长的代码实现，提供优雅的入场动效与交互反馈
 */
export default function CodeCollapse({
  children,
  title = '查看代码实现',
  language = 'cpp',
  defaultOpen = false,
}: CodeCollapseProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="code-collapse-container"
      style={{
        margin: '1.5rem 0',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--ifm-color-emphasis-200)',
        backgroundColor: 'var(--ifm-background-color)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--ifm-color-emphasis-100)',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-200)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ color: 'var(--ifm-color-primary)', display: 'flex' }}>
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={16} className="solknow-blue" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-900)' }}>
              {title}
            </span>
          </div>
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--ifm-color-emphasis-500)',
            textTransform: 'uppercase',
            backgroundColor: 'var(--ifm-color-emphasis-200)',
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          {language}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{ padding: '0.5rem' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
