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
                '相同语义',
                "知识库",
                "音乐生成服务",
                "天气查询"
            ],
        },
        {
            text: 'ESP-AI 开放接口',
            collapsed: false,
            items: [
                "开放接口密钥",
                "超体管理接口",
                "设备管理接口",
                "额度卡管理接口",
                "额度支付接口",
                "插件配置接口",
                '开发中',
            ],
        },
    ],
})
