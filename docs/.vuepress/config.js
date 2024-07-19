import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',

  locales: {
    '/': {
      lang: 'zh-CN',
      // title: 'ESP-AI',
      title: '',
      description: 'Vue 驱动的静态网站生成器',
    },
    '/en/': {
      lang: 'en-US',
      // title: 'ESP-AI',
      title: '',
      description: 'Vue-powered Static Site Generator',
    },
  },

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    lang: 'zh-CN',
    // 你也可以直接将它设置为一个 URL
    repo: 'https://github.com/wangzongming/esp-ai',
    logo: '/images/logo.png',
    // logo: '',

    locales: {
      '/': {
        lang: 'zh-CN',
        selectLanguageName: '简体中文',
        selectLanguageText: "选择语言",
        navbar: [
          '/',
          '/start',
          '/client',
          '/server',
          '/plugs',
          '/change-logs',
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
                link: 'https://ttson.cn',
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
          '/en/start',
          '/en/client',
          '/en/server',
          '/en/plugs',
          '/en/change-logs',
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
                link: 'https://ttson.cn',
              },
            ],
          },
        ],
      },
    }
  }),

  bundler: viteBundler(),
})
