// import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
// import { noticePlugin } from '@vuepress/plugin-notice'
import { plumeTheme, defineNoteConfig } from 'vuepress-theme-plume'

import { enNavbar, jaNavbar, zhNavbar } from './navbar.js'
import { enNotes, jaNotes, zhNotes } from './notes/index.js'
import path from 'path'

export default defineUserConfig({
    lang: 'zh-CN',
    title: "ESP-AI",
    // base: '/esp-ai/',
    base: '/',
    // head: [
    //     ['link', { rel: 'icon', href: '/images/logo-tm.png' }], 
    // ],
    head: [
        ['link', { rel: 'icon', href: '/images/logo-tm.png' }],
        ['meta', { charset: 'UTF-8' }],
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
        ['title', {}, 'ESP-AI | 为万物赋予灵魂'],
        ['meta', { name: 'description', content: 'ESP-AI是开源AIoT开发平台，支持大模型与硬件融合。提供TTS/ASR语音功能、插件化架构，0代码门槛构建智能设备解决方案。适用于开发者、企业快速落地AIoT项目，硬件接入AI最快、最稳的方案。' }],
        ['meta', { name: 'keywords', content: 'ESP-AI,ESPAI,espai,AIoT开发平台,开源硬件,大模型,语音识别,TTS,ASR,LLM,AIoT解决方案,智能设备开发,嵌入式AI,ESP32AI,AI小智,小智AI,小明同学,小明IO,乐鑫,智能硬件,物联网,硬件接入AI,ai助手,espai助手' }],
        ['meta', { name: 'author', content: 'ESP-AI开发团队' }],
        ['meta', { name: 'robots', content: 'index, follow' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:title', content: 'ESP-AI | 为万物赋予灵魂' }],
        ['meta', { property: 'og:description', content: 'ESP-AI是开源AIoT开发平台，支持大模型与硬件融合。提供TTS/ASR语音功能、插件化架构，0代码门槛构建智能设备解决方案。适用于开发者、企业快速落地AIoT项目。' }],
        ['meta', { property: 'og:url', content: 'https://espai.fun' }],
        ['meta', { property: 'og:site_name', content: 'ESP-AI' }],
        ['meta', { property: 'og:image', content: 'https://espai.fun/images/logo-tm.png' }],
        ['meta', { property: 'og:image:alt', content: 'ESP-AI平台界面展示' }],
        ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
        ['meta', { name: 'twitter:title', content: 'ESP-AI | 为万物赋予灵魂' }],
        ['meta', { name: 'twitter:description', content: 'ESP-AI是开源AIoT开发平台，支持大模型与硬件融合。提供TTS/ASR语音功能、插件化架构，0代码门槛构建智能设备解决方案。适用于开发者、企业快速落地AIoT项目。' }],
        ['meta', { name: 'twitter:image', content: 'https://espai.fun/images/logo-tm.png' }],
        ['meta', { name: 'twitter:site', content: '@esp-ai' }],
        ['link', { rel: 'canonical', href: 'https://espai.fun' }],
        ['meta', { name: 'google-site-verification', content: 'YOUR_GOOGLE_VERIFICATION_CODE' }],
        ['meta', { name: 'msvalidate.01', content: 'YOUR_BING_VERIFICATION_CODE' }],
        ['link', { rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' }]
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
            description: '最简单、最低成本的AI接入方案，让任何物品都能实现智能对话功能，让人人都有AI助手',
        },
        '/en/': {
            lang: 'en-US',
            description: 'The simplest and most cost-effective AI integration solution, enabling any object to have intelligent conversation capabilities. Let everyone have an AI assistant',
        },
        '/ja/': {
            lang: 'ja-JP',
            description: 'ハードウェアをAIへ接続するための、シンプルで低コストなソリューション',
        },
    },

    theme: plumeTheme({
        hostname: process.env.SITE_HOST || 'https://espai.fun',
        logo: '/images/logo-tm.png',
        docsRepo: 'https://github.com/wangzongming/espi-ai-websit-docs',
        social: [
            { icon: 'github', link: 'https://github.com/wangzongming/esp-ai' },
            {
                icon: {
                    svg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="64px" height="64.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 1024q-104 0-199-40-92-39-163-110T40 711Q0 616 0 512t40-199Q79 221 150 150T313 40q95-40 199-40t199 40q92 39 163 110t110 163q40 95 40 199t-40 199q-39 92-110 163T711 984q-95 40-199 40z m259-569H480q-10 0-17.5 7.5T455 480v64q0 10 7.5 17.5T480 569h177q11 0 18.5 7.5T683 594v13q0 31-22.5 53.5T607 683H367q-11 0-18.5-7.5T341 657V417q0-31 22.5-53.5T417 341h354q11 0 18-7t7-18v-63q0-11-7-18t-18-7H417q-38 0-72.5 14T283 283q-27 27-41 61.5T228 417v354q0 11 7 18t18 7h373q46 0 85.5-22.5t62-62Q796 672 796 626V480q0-10-7-17.5t-18-7.5z" /></svg>',
                    name: "gitee"
                }, link: 'https://gitee.com/xm124/esp-ai'
            },
            { icon: 'qq', link: 'https://qm.qq.com/q/vRZ2IK5JCw' },
        ],
        navbarSocialInclude: ["gitee", 'github', 'qq'],
        // navbarSocialInclude: ['github'],
        profile: {
            avatar: '/images/logo-tm.png',
            name: 'ESP-AI',
            description: '为万物赋予灵魂',
            location: 'GuangZhou, China',
            organization: 'esp-ai',
        },
        // footer: {
        //     copyright: 'Apache 2.0 Licensed | Copyright © ESP-AI<br/><span class="bei_an_container"><a style="color:#777;"  href="https://beian.miit.gov.cn/" target="_blank">黔ICP备2024030115号-2</a> <img class="img" src="/images/beian.png"/><a href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002004468" style="color:#777;"  rel="noreferrer" target="_blank">粤公网安备44030002004468</a></span>',
        // },


        plugins: {
            shiki: {
                twoslash: true,
                lineNumbers: 10,
                languages: ['sh', 'ts', 'md', 'html', 'js', 'go', 'kotlin', 'rust', 'vue', 'css', 'json', 'scss', 'yaml', 'bash', 'c++', 'java', 'py', 'ruby', 'make', 'objc', 'swift', 'php', 'rs', 'sql', 'xml', 'zig', 'pug', 'http', 'less', 'styl', 'jsx', 'tsx', 'astro', 'svelte', 'wasm', 'vb', 'bat', 'cs', 'cpp', 'mermaid'],
            },

            markdownEnhance: {
                demo: true,
                include: true,
                chart: true,
                echarts: true,
                mermaid: true,
                flowchart: true,
            },
            markdownPower: {
                imageSize: 'all',
                pdf: true,
                caniuse: true,
                bilibili: true,
                youtube: true,
                codepen: true,
                replit: true,
                codeSandbox: true,
                jsfiddle: true,
                npmTo: ['yarn', 'npm', 'pnpm'],
                repl: {
                    go: true,
                    rust: true,
                    kotlin: true,
                },
            },

            // comment: {
            //     provider: 'Giscus',
            //     comment: true,
            //     repo: 'pengzhanbo/vuepress-theme-plume',
            //     repoId: 'R_kgDOG_ebNA',
            //     category: 'docs-comment',
            //     categoryId: 'DIC_kwDOG_ebNM4Cd0uF',
            //     mapping: 'pathname',
            //     reactionsEnabled: true,
            //     inputPosition: 'top',
            //     darkTheme: 'dark_protanopia',
            //     lightTheme: 'light_protanopia',
            // }, 
        },

        locales: {
            '/': {
                notes: zhNotes,
                navbar: zhNavbar,
            },
            '/en/': {
                notes: enNotes,
                navbar: enNavbar,
            },
            '/ja/': {
                selectLanguageName: '日本語',
                selectLanguageText: '言語',
                notes: jaNotes,
                navbar: jaNavbar,
            },
        },


        bulletin: {
            layout: 'center', 
            id: '25',
            lifetime: 'once',
            title: '🎉 ESP-AI 公告 🎉',
            contentFile: path.join(__dirname, 'bulletin.md'),
            enablePage: true
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
    ],

    alias: {
        '@theme/VPFooter.vue': path.resolve(
            __dirname,
            './components/MyFooter.vue',
        ),
    },
})
