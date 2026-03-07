import React from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  ExternalLink,
  Target
} from 'lucide-react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

interface ExerciseItem {
  index: number;
  title: string;
  slug?: string;
}

interface SupportingExercisesProps {
  exercises: ExerciseItem[];
  topic?: string;
}

/**
 * 动态关联练习库组件
 * 用于在知识点末尾展示相关的练习题链接
 */
export default function SupportingExercises({ 
  exercises,
  topic = '数学分析'
}: SupportingExercisesProps) {
  return (
    <div className="supporting-exercises-container" style={{
      margin: '2rem 0',
      padding: '1.5rem',
      borderRadius: '20px',
      background: 'linear-gradient(145deg, var(--ifm-color-emphasis-100) 0%, var(--ifm-color-emphasis-0) 100%)',
      border: '1px solid var(--ifm-color-emphasis-200)',
      boxShadow: 'var(--solknow-card-shadow)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '1.25rem'
      }}>
        <div style={{
          padding: '8px',
          borderRadius: '12px',
          background: 'var(--ifm-color-primary-lightest)',
          color: 'var(--ifm-color-primary)',
          display: 'flex'
        }}>
          <Target size={20} />
        </div>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
          练习库同步 <span style={{ 
            fontSize: '0.9rem', 
            fontWeight: 400, 
            opacity: 0.6,
            marginLeft: '8px'
          }}>(Analysis Exercise Sync)</span>
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gap: '12px'
      }}>
        {exercises.map((ex, i) => (
          <Link
            key={i}
            to={`/docs/exercises/math/analysis#${ex.slug || `练习-${ex.index}`}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="exercise-link-card" style={{
              padding: '1rem',
              borderRadius: '12px',
              background: 'var(--ifm-background-color)',
              border: '1px solid var(--ifm-color-emphasis-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 700, 
                  color: 'var(--ifm-color-primary)',
                  background: 'var(--ifm-color-primary-lightest)',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  Ex {ex.index}
                </span>
                <span style={{ fontWeight: 500 }}>{ex.title}</span>
              </div>
              <ChevronRight size={18} style={{ opacity: 0.3 }} />
            </div>
          </Link>
        ))}
      </div>

      <div style={{
        marginTop: '1.25rem',
        paddingTop: '1rem',
        borderTop: '1px dashed var(--ifm-color-emphasis-300)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Link 
          to="/docs/exercises/math/analysis"
          style={{
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--ifm-color-primary)',
            fontWeight: 600
          }}
        >
          查看完整分析练习库 <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  );
}
