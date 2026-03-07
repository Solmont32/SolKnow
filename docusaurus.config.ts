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

  onBrokenLinks: 'warn',
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
          postsPerPage: 10,
          blogSidebarTitle: '最近发布',
          blogSidebarCount: 'ALL',
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
        indexDocs: true,
        indexBlog: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: {
    // 网站元数据优化
    metadata: [
      {name: 'keywords', content: '算法竞赛, OI, ACM, 数学, 计算机科学, 视频教程'},
      {name: 'description', content: '沉浸式的算法竞赛笔记与数学知识体系，整合图文教程与 B 站视频讲解。'},
    ],
    // 顶部公告栏
    announcementBar: {
      id: 'welcome_v2',
      content: '🚀 欢迎来到 SolKnow！全新视觉系统已上线，尽享极致学习体验。',
      backgroundColor: '#f8fafc',
      textColor: '#1e293b',
      isCloseable: true,
    },
    navbar: {
      title: 'SolKnow',
      logo: {
        alt: 'SolKnow Logo',
        src: 'img/logo.svg',
        className: 'navbar-logo-custom',
      },
      hideOnScroll: true,
      items: [
        {
          type: 'dropdown',
          label: '知识库',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'algoSidebar',
              label: '算法竞赛',
            },
            {
              type: 'docSidebar',
              sidebarId: 'mathSidebar',
              label: '系统数学',
            },
            {
              type: 'docSidebar',
              sidebarId: 'csSidebar',
              label: '计算机科学',
            },
          ],
        },
        {
          type: 'docSidebar',
          sidebarId: 'resourceSidebar',
          label: '资源导航',
          position: 'left',
        },
        {to: '/blog', label: '博客', position: 'left'},

        {to: '/videos', label: '视频', position: 'left'},
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
          title: '知识探索',
          items: [
            {label: '算法算法', to: '/docs/intro'},
            {label: '数学大厦', to: '/docs/academic-math/analysis/'},
            {label: '计算机底层', to: '/docs/cs/'},
          ],
        },
        {
          title: '社区与动态',
          items: [
            {label: '技术博客', to: '/blog'},
            {label: '视频专栏', to: '/videos'},
            {label: 'GitHub', href: 'https://github.com/Solmont32/SolKnow'},
          ],
        },
        {
          title: '关注作者',
          items: [
            {label: 'Bilibili', href: 'https://space.bilibili.com'}, 
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SolKnow（知岛）. Built with Docusaurus & Passion.`,
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'cpp', 
        'python', 
        'java', 
        'bash', 
        'sql', 
        'json', 
        'markdown',
        'latex'
      ],
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
