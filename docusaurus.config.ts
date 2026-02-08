import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SolKnow（知岛）',
  tagline: '知识点 + 视频讲解 的竞赛笔记与博客',
  favicon: 'img/favicon.ico',

  url: 'https://solmont32.github.io',
  baseUrl: '/SolKnow/',

  organizationName: 'Solmont32',
  projectName: 'SolKnow',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // KaTeX 样式
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs', // 知识库在 /docs
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Solmont32/SolKnow/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [require('rehype-katex')],
        },
        blog: {
          routeBasePath: 'blog',
          showReadingTime: true,
          editUrl: 'https://github.com/Solmont32/SolKnow/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['zh', 'en'],
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'SolKnow（知岛）',
      items: [
        {to: '/docs/intro', label: '知识库', position: 'left'},
        {to: '/blog', label: '博客', position: 'left'},
        {to: '/videos', label: '视频', position: 'left'},
        {
          href: 'https://github.com/Solmont32/SolKnow',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '内容',
          items: [
            {label: '知识库', to: '/docs/intro'},
            {label: '博客', to: '/blog'},
            {label: '视频', to: '/videos'},
          ],
        },
        {
          title: '外部',
          items: [
            // 这里换成你的 B站主页链接
            {label: 'Bilibili', href: 'https://www.bilibili.com'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SolKnow（知岛）`,
    },
    docs: {
      sidebar: {hideable: true, autoCollapseCategories: true},
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['cpp', 'python', 'java', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
