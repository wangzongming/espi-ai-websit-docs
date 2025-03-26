import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'guide',
    link: '/guide/',
    sidebar: [
        {
            text: '从这里开始',
            collapsed: false,
            items: [
                'ESP-AI简介', 
                '下一步计划',
                "怎么上手"
            ],
        },
        {
            text: '客户端-Arduino',
            collapsed: false,
            items: [
                '客户端环境',
                '客户端安装',
                '物料准备',
                '硬件接线',
                'ESP-AI开发板接线',
                '硬件代码',
                '唤醒方案', 
            ],
        },
        {
            text: '服务端-Nodejs',
            collapsed: false,
            items: [
                '服务端环境',
                '服务端安装',
                '服务端代码',
                'Docker', 
            ],
        }, 
        {
            text: '第三方文章推荐',
            collapsed: false,
            items: [
                '青柠博客', 
            ],
        }, 
    ],
})