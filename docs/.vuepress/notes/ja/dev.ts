import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'dev',
    link: '/dev/',
    sidebar: [
        {
            text: '基礎サービス',
            collapsed: false,
            items: [
                '说明',
                'llm',
                'asr',
                'tts',
                '相同语义'
            ],
        },
        {
            text: 'ESP-AI オープンAPI',
            collapsed: false,
            items: [
                '知识库',
                '开发中',
            ],
        },
    ],
})
