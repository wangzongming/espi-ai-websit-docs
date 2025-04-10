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
                '相同语义'
            ],
        },
        {
            text: 'ESP-AI 开放接口',
            collapsed: false,
            items: [
                "知识库",
                "额度卡接口",
                "额度支付接口",
                "插件配置接口",
                "设备管理接口",
                "超体管理接口",
                '开发中',
            ],
        },
    ],
})
