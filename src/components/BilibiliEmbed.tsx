import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';

type BilibiliProps = {
  bvid?: string;
  aid?: string;
  page?: number;
  t?: number;
  highQuality?: boolean;
  className?: string;
  caption?: string;
};

/**
 * 专业的 B 站视频嵌入组件
 * 具备响应式容器、柔和阴影与高级视觉反馈
 */
export default function BilibiliEmbed({
  bvid,
  aid,
  page = 1,
  t = 0,
  highQuality = true,
  className,
  caption,
}: BilibiliProps) {
  const params = new URLSearchParams();
  if (bvid) params.set('bvid', bvid);
  if (aid) params.set('aid', aid);
  params.set('page', String(page));
  if (t > 0) params.set('t', String(t));
  if (highQuality) params.set('high_quality', '1');

  // 核心播放参数，禁用自动播放以保证体验
  params.set('autoplay', '0');

  const src = `https://player.bilibili.com/player.html?${params.toString()}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={clsx('bilibili-embed-container', className)}
      style={{ margin: '2.5rem 0' }}
    >
      <div
        className="bilibili-embed-inner"
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 黄金比例
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: 'var(--ifm-color-emphasis-100)',
          boxShadow: 'var(--solknow-card-shadow)',
          border: '1px solid var(--ifm-color-emphasis-200)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <iframe
          src={src}
          scrolling="no"
          frameBorder={0}
          allowFullScreen
          loading="lazy"
          title="Bilibili Video Player"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      {caption && (
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: 'var(--ifm-color-emphasis-600)',
            fontSize: '0.85rem',
            fontStyle: 'italic',
          }}
        >
          <Youtube size={14} className="solknow-red" />
          <span>{caption}</span>
        </div>
      )}
    </motion.div>
  );
}
