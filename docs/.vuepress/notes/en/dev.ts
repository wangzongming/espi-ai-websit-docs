import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'dev',
    link: '/dev/',
    sidebar: [
        {
            text: '基础服务',
            collapsed: false,
            items: [
                '说明', 
                'llm',
                'asr',
                'tts',
            ],
        }, 
        {
            text: 'ESP-AI 开放接口',
            collapsed: false,
            items: [
                '开发中',  
            ],
        }, 
    ],
})