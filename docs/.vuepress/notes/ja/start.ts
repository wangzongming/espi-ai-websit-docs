import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'guide',
    link: '/guide/',
    sidebar: [
        {
            text: 'ここから開始',
            collapsed: false,
            items: [
                'ESP-AI简介',
                '下一步计划',
                '怎么上手'
            ],
        },
        {
            text: 'クライアント - Arduino',
            collapsed: false,
            items: [
                '客户端环境',
                '客户端安装',
                '物料准备',
                '硬件接线',
                '硬件代码',
                '唤醒方案',
            ],
        },
        {
            text: 'サーバー - Nodejs',
            collapsed: false,
            items: [
                '服务端环境',
                '服务端安装',
                '服务端代码',
                'Docker',
            ],
        },
        {
            text: 'おすすめ外部記事',
            collapsed: false,
            items: [
                '青柠博客',
            ],
        },
    ],
})
