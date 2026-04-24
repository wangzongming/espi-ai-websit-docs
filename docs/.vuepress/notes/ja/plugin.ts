import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'plugin',
    link: '/plugin/',
    sidebar: [
        {
            text: 'プラグイン開発',
            collapsed: false,
            items: [
                '简介',
                'LLM插件',
                'TTS插件',
                'IAT插件',
                '音频播放插件'
            ],
        },
    ],
})
