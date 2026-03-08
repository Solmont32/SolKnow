import React from 'react';
import clsx from 'clsx';

type BilibiliProps = {
  bvid?: string;
  aid?: string;
  page?: number;
  t?: number;
  highQuality?: boolean;
  className?: string;
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
    <div className={clsx('bilibili-embed-container', className)} style={{ margin: '2rem 0' }}>
      <div
        className="bilibili-embed-inner"
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 黄金比例
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: 'var(--ifm-color-emphasis-100)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid var(--ifm-color-emphasis-200)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
            opacity: 0.95,
          }}
        />
      </div>
    </div>
  );
}
