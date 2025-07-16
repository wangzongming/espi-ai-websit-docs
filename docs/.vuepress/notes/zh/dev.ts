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
                "设备实时电量监听", 
                "设备在线状态监听",
                "设备实时音量监听",
                "设备音量设置",
                "OTA升级开始监听",
                "OTA升级进度监听",
                "OTA升级错误监听", 
                "获取存在在硬件中的数据"
            ],
        }, 
    ],
})
