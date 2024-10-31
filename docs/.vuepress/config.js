import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { noticePlugin } from '@vuepress/plugin-notice'

export default defineUserConfig({
  lang: 'zh-CN',
  title: "ESP-AI",
  // base: '/esp-ai/',
  base: '/',
  head: [['link', { rel: 'icon', href: '/images/logo-tm.png' }]],
  locales: {
    '/': {
      lang: 'zh-CN',
      // description: '将任何物品接入AI最简单的方案，也是为您的开发板提供全套的 AI 对话方案',
      description: '最简单、最低成本的AI接入方案，让任何物品都能实现智能对话功能，让人人都有AI助手',
      // description: '最简单、最低成本的AI接入方案，为万物赋予灵魂',
    },
    '/en/': {
      lang: 'en-US',
      description: 'The simplest and most cost-effective AI integration solution, enabling any object to have intelligent conversation capabilities. Let everyone have an AI assistant',
    },
  },

  theme: defaultTheme({
    lang: 'zh-CN',
    // 你也可以直接将它设置为一个 URL
    repo: 'https://github.com/wangzongming/esp-ai',
    logo: '/images/logo-tm.png',
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
          {
            text: '开发指南',
            prefix: '/develop/',
            children: [
              '/start',
              '/client',
              '/server',
              '/plugs-develop',
              '/QA',
            ]
          },
          '/plugs',
          '/change-logs',
          // '/technical-support',
          // '/cooperation',

          {
            text: '赞助/商业授权',
            prefix: '/contact/',
            children: [
              '/technical-support',
              '/cooperation',
              '/COMMERCIAL_LICENSE',
              '/COMMERCIAL_QUERY'
            ]
          },

          {
            text: '开发者平台',
            link: 'https://dev.espai.fun',
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
              {
                text: "千年小妖仔的博客",
                link: 'http://www.dhhyxr.top',
              },
              {
                text: "青柠博客",
                link: 'http://www.qingningz.cn',
              },
              {
                text: "白云苍狗",
                link: 'https://www.imalun.com',
              },

            ],
          },
        ],
      },
      '/en/': {
        lang: 'en-US',
        selectLanguageName: 'English',
        navbar: [
          {
            text: 'Develop',
            prefix: '/develop/',
            children: [
              '/en/start',
              '/en/client',
              '/en/server',
              '/en/plugs-develop',
              '/en/QA',
            ]
          },
          '/en/plugs',
          '/en/change-logs',
          // '/en/technical-support',
          // '/en/cooperation', 
          {
            text: 'Contact us',
            prefix: '/contact/',
            children: [
              '/en/technical-support',
              '/en/cooperation',
              '/en/COMMERCIAL_LICENSE',
              '/en/COMMERCIAL_QUERY'
            ]
          },
          {
            text: 'Developer platform',
            link: 'https://dev.espai.fun',
          },
          {
            text: 'Blogroll',
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
              {
                text: "千年小妖仔的博客",
                link: 'http://www.dhhyxr.top',
              },
              {
                text: "青柠博客",
                link: 'http://www.qingningz.cn',
              },
              {
                text: "白云苍狗",
                link: 'https://www.imalun.com',
              },
            ],
          },
        ],
      },
    },
  }),

  bundler: viteBundler({
    viteOptions: {
      // base: "https://xiaomingio.top/esp-ai",
      // base: "/esp-ai/",
      base: "/",
    }
  }),

  plugins: [
    docsearchPlugin({
      // 配置项
      apiKey: '84ed2dfe4e750401505a4c854237e376',
      appId: 'V0M7LU48WZ',
      indexName: 'espai',
    }),
    noticePlugin({
      // 选项
      config: [
        {
          path: '/',
          title: `<b>公告</b>`,
          content: `<div style="background: #fff;font-size:14px;">
            <h4>新版将于 2024/11月份或者12月份推出</h4>
            <p>音频流将会全线改为 mp3 进行传输(降低至少70%的带宽压力以及相当大的服务压力)、会话过程更稳定、对话打断流程更加流畅、日志模块完善、服务端对客户端的控制、服务端与客户端提供更丰富的 api 以供生产环境使用 ...</p>
            <p> 总之，<b>新版将是一个可以投产的版本。</b> </p>

            <p>届时<b>新版开放平台也将同步推出</b>，新版将会打造一个全功能、更简单的开放平台，敬请期待。</p>

            <p>另外通知：<b>官方固件暂时停止维护</b>，直到新版发布，（ps: 新版将可以在线烧录固件，所以旧版暂时没必要维护了）</p>
            <p> <b>Github 中的 Star 数对项目发展至关重要，请大家点一点 Star ~， 感谢！</b> </p>
            
          </div>`, 
        },
      ]
    }),

  ],
})
