import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'example',
    link: '/example/',
    sidebar: [
        {
            text: '开放平台使用-推荐',
            collapsed: false,
            items: [
                '什么是开放平台',
                '开放平台使用教程',
            ],
        },
        {
            text: '案例代码',
            collapsed: false,
            items: [
                'Hello World',
                '服务端认证',
                '指示灯',
                '各平台配置',
                '用户指令',
                '用Nodejs对设备进行控制',
                '语音控制继电器',
                '语音控制点亮 LED',
                '语音控制舵机旋转角度',
                '音频播放(音乐、有声书)',
                '使用NLP进行意图推理',
                '对用户说的话进行意图推理或其他操作',
                '唤醒方案',
                '将对话文字放到串口屏、网页等',
                '存储业务数据到硬件',
                '根据数据库数据生成配置',
                '传入文本对话'
            ],
        },
        {
            text: '物联网',
            collapsed: false,
            items: [
                '远程开关、点火器',
            ],
        },
        {
            text: '进阶',
            collapsed: false,
            items: [
                '多线程服务',
                'OTA升级',
                '唤醒词烧录',
            ],
        }
    ],
})
