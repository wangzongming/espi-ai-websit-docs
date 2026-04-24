import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'config-server',
    link: '/config-server/',
    sidebar: [
        {
            text: 'サーバー',
            collapsed: false,
            items: [
                '服务端配置',
                '服务端实例',
            ],
        },
    ],
})
