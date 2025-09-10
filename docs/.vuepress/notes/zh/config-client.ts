import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
    dir: 'config-client',
    link: '/config-client/',
    sidebar: [
        { 
            text: '客户端',
            collapsed: false,
            items: [
                '绑定设备', 
                '客户端配置', 
                '客户端实例',
                '蓝牙配网协议'
            ],
        },  
    ],
})