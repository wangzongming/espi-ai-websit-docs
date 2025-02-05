import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'config-server',
    link: '/config-server/',
    sidebar: [
        { 
            text: '服务端',
            collapsed: false,
            items: [
                '服务端配置', 
                '服务端实例',
            ],
        }, 
    ],
})