import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default defineUserConfig({
  lang: 'zh-CN',
  title: "ESP-AI",
  base: '/esp-ai/',
  head: [['link', { rel: 'icon', href: '/esp-ai/images/logo3.png' }]],
  locales: {
    '/': {
      lang: 'zh-CN',
      // title: "", 
      description: '将任何物品接入AI最简单的方案，也是为您的开发板提供全套的 AI 对话方案',
    },
    '/en/': {
      lang: 'en-US',
      // title: 'ESP-AI',
      // title: '',
      description: 'The simplest solution to integrate any item with AI, providing a complete AI conversation solution for your development board.',
    },
  },

  theme: defaultTheme({
    lang: 'zh-CN',
    // 你也可以直接将它设置为一个 URL
    repo: 'https://github.com/wangzongming/esp-ai',
    logo: '/images/logo3.png',
    docsRepo: 'https://github.com/wangzongming/espi-ai-websit-docs',
    docsBranch: 'main',
    docsDir: 'docs',
    locales: {
      '/': {
        lang: 'zh-CN',
        selectLanguageName: '简体中文',
        selectLanguageText: "选择语言",
        title: "",
        navbar: [
          '/',
          {
            text: '开发指南',
            prefix: '/develop/',
            children: [
              '/start',
              '/client',
              '/server',
              '/plugs-develop',
            ]
          },
          '/plugs',
          '/change-logs',
          '/technical-support',
          {
            text: '控制台',
            link: '/ing',
          },
          {
            text: '友情链接',
            prefix: '/blogroll/',
            children: [
              {
                text: '小明IO',
                link: 'https://xiaomingio.top',
              },
              {
                text: '海豚配音',
                link: 'https://www.ttson.cn/',
              },
              {
                text: '免费二次元音色',
                link: 'https://acgn.ttson.cn/',
              },
              {
                text: "Qsy's Blog",
                link: 'http://hexp.top/',
              },
              {
                text: "mybatis-mp",
                link: 'https://mybatis-mp.cn/',
              }, 

              {
                text: "安全获取苹果UDID",
                link: 'https://authapi.applekuid.com/index.html',
              }, 
              {
                text: "KaedeharaLu's Blog",
                link: 'https://www.kazuhalu.com',
              }, 
              
            ],
          },
        ],
      },
      '/en/': {
        lang: 'en-US',
        selectLanguageName: 'English',
        navbar: [
          '/en/',
          {
            text: 'develop',
            prefix: '/develop/',
            children: [
              '/en/start',
              '/en/client',
              '/en/server',
              '/en/plugs-develop',
            ]
          },
          '/en/plugs',
          '/en/change-logs',
          '/en/technical-support',
          {
            text: 'Console',
            link: '/en/ing',
          },
          {
            text: 'blogroll',
            prefix: '/blogroll/',
            children: [
              {
                text: '小明IO',
                link: 'https://xiaomingio.top',
              },
              {
                text: '海豚配音',
                link: 'https://www.ttson.cn/',
              },
              {
                text: 'Free second tone',
                link: 'https://acgn.ttson.cn/',
              },
              {
                text: "Qsy's Blog",
                link: 'http://hexp.top/',
              },
              {
                text: "mybatis-mp",
                link: 'https://mybatis-mp.cn/',
              }, 
              
              {
                text: "安全获取苹果UDID",
                link: 'https://authapi.applekuid.com/index.html',
              }, 
              {
                text: "KaedeharaLu's Blog",
                link: 'https://www.kazuhalu.com',
              }, 
            ],
          },
        ],
      },
    }
  }),

  bundler: viteBundler({
    viteOptions: {
      // base: "https://xiaomingio.top/esp-ai",
      base: "/esp-ai/",
    }
  }),

  plugins: [
    docsearchPlugin({
      // 配置项
      apiKey: 'ec7028c6e108534c152d97b6ac282244',
      appId: 'LEWWWDLKT1',
      indexName: 'xiaomingio',
    }),
  ],
})