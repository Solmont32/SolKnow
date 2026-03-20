import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SolKnow（知岛）',
  tagline: '计算机与数学交叉领域的集成式零基础学习系统',
  favicon: 'img/favicon.ico',

  url: 'https://solmont32.github.io',
  baseUrl: '/SolKnow/',

  organizationName: 'Solmont32',
  projectName: 'SolKnow',

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

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
          routeBasePath: 'docs',
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

  themeConfig: {
    navbar: {
      title: 'SolKnow',
      logo: { alt: 'SolKnow Logo', src: 'img/logo.svg', className: 'navbar-logo-custom' },
      hideOnScroll: true,
      items: [
        {
          type: 'dropdown',
          label: '知识库',
          position: 'left',
          items: [
            { type: 'docSidebar', sidebarId: 'algoSidebar', label: '算法竞赛' },
            { type: 'docSidebar', sidebarId: 'mathSidebar', label: '系统数学' },
            { type: 'docSidebar', sidebarId: 'csSidebar', label: '计算机科学' },
            { type: 'docSidebar', sidebarId: 'aiSidebar', label: '人工智能' },
            { type: 'docSidebar', sidebarId: 'infosecSidebar', label: '信息安全' },
            { type: 'docSidebar', sidebarId: 'quantSidebar', label: '量化交易' },
          ],
        },
        {
          type: 'dropdown',
          label: '练习库',
          position: 'left',
          items: [
            { type: 'docSidebar', sidebarId: 'exerciseSidebar', label: '练习库总览' },
            { to: '/docs/exercises/math/composition-practice', label: '数学练习' },
            { to: '/docs/exercises/cs/algorithm-basic', label: '计算机练习' },
            { to: '/docs/exercises/ai/ml', label: 'AI 练习' },
            { to: '/docs/exercises/infosec/web', label: '安全练习' },
          ],
        },

        { type: 'docSidebar', sidebarId: 'resourceSidebar', label: '资源导航', position: 'left' },
        { to: '/graph', label: '知识图谱', position: 'left' },
        { to: '/blog', label: '博客', position: 'left' },
        { to: '/videos', label: '视频', position: 'left' },
        {
          href: 'https://github.com/Solmont32/SolKnow',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: '核心领域',
          items: [
            { label: '算法竞赛', to: '/docs/intro' },
            { label: '数学大厦', to: '/docs/academic-math/analysis/' },
            { label: '人工智能', to: '/docs/ai/' },
          ],
        },
        {
          title: '技术专栏',
          items: [
            { label: '计算机科学', to: '/docs/cs/' },
            { label: '信息安全', to: '/docs/infosec/' },
            { label: '视频专栏', to: '/videos' },
          ],
        },
        {
          title: '更多',
          items: [
            { label: 'Bilibili', href: 'https://space.bilibili.com' },
            { label: 'GitHub', href: 'https://github.com/Solmont32/SolKnow' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SolKnow（知岛）. Built with Docusaurus & Passion.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['cpp', 'python', 'java', 'bash', 'sql', 'latex'],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
