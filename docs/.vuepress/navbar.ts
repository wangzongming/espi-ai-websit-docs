import type { NavItem } from 'vuepress-theme-plume'
import { version } from '../../package.json'

export const zhNavbar = [
    {
        text: '开发指南',
        icon: 'icon-park-outline:guide-board',
        activeMatch: '^/guide|example|plugin/',
        items: [
            { text: '快速开始', link: '/notes/guide/ESP-AI简介.md', icon: "streamline:startup" },
            { text: '使用教程', link: '/notes/example/开放平台使用教程.md', icon: "hugeicons:doc-01" },

            { text: '客户端详细接口/方法', link: '/notes/config-client/客户端配置.md', icon: "file-icons:arduino" },
            { text: '服务端详细接口/方法', link: '/notes/config-server/服务端配置.md', icon: "akar-icons:node-fill" },
            { text: '开放接口', link: '/notes/dev/说明.md', icon: "carbon:api-1" },

            { text: '插件开发教程', link: '/notes/plugin/简介.md', icon: "clarity:plugin-line" },
            { text: '常见问题', link: '/qa/', icon: "mdi:git-issue" },
        ],
    },
    {
        text: '开放生态',
        icon: 'ri:open-arm-line',
        activeMatch: '^/open/',
        items: [
            { text: '插件市场', link: 'https://dev.espai.fun/#/Plugin', icon: "clarity:plugin-line" },
            { text: '升级日志', link: '/notes/open/change-logs.md', icon: "material-symbols-light:update" },
            { text: '开源PCB', link: '/notes/open/pcb.md', icon: "file-icons:arduino" },
            { text: '智能家居', link: '/notes/open/智能家居方案.md', icon: "solar:armchair-2-linear" },
            { text: '社区案列', link: '/notes/open/社区案列.md', icon: "bitcoin-icons:globe-filled" },
            { text: '参与贡献', link: '/notes/open/contribution.md', icon: "ri:open-arm-line" },
        ],
    },
    {
        text: '关于我们',
        icon: 'mdi:about-circle-outline',
        activeMatch: '^/about/',
        items: [
            { text: '技术支持', link: '/notes/about/js-sponsor.md', icon: "fluent:person-support-28-regular" },
            { text: '商业合作', link: '/notes/about/handshake.md', icon: "emojione:handshake-light-skin-tone" },
            // { text: '商业授权', link: '/notes/about/authority.md', icon: "openmoji:authority" },
            { text: '团队简介', link: '/notes/about/info.md', icon: "flat-color-icons:info" },
        ],
    },
    {
        text: '友情链接',
        link: '/friends/',
        icon: 'carbon:friendship'
    },
    // {
    //     text: '投资/赞助',
    //     link: '/sponsor/',
    //     icon: 'emojione:handshake-light-skin-tone'
    // },
    {
        text: '开放平台',
        icon: 'logos:compose-multiplatform',
        link: 'https://dev.espai2.fun/',
    },
] as NavItem[]

export const enNavbar = [
    {
        "text": "Guide",
        "icon": "icon-park-outline:guide-board",
        "activeMatch": "^/en/guide|example|plugin/",
        "items": [
            { "text": "Quick Start", "link": "/en/notes/guide/ESP-AI简介.md", "icon": "streamline:startup" },
            { "text": "Usage Tutorial", "link": "/en/notes/example/开放平台使用教程.md", "icon": "hugeicons:doc-01" }, 
            { "text": "Client-Side Detailed Interfaces/Methods", "link": "/en/notes/config-client/客户端配置.md", "icon": "file-icons:arduino" },
            { "text": "Server-Side Detailed Interfaces/Methods", "link": "/en/notes/config-server/服务端配置", "icon": "akar-icons:node-fill" },
            { "text": "Open Interfaces", "link": "/en/notes/dev/说明.md", "icon": "carbon:api-1" }, 
            { "text": "Plugin Development Tutorial", "link": "/en/notes/plugin/简介.md", "icon": "clarity:plugin-line" },
            { "text": "Frequently Asked Questions", "link": "/en/qa/", "icon": "mdi:git-issue" },
        ]
    },
    {
        "text": "Ecosystem",
        "icon": "ri:open-arm-line",
        "activeMatch": "^/en/open/",
        "items": [
            { "text": "Plugin Marketplace", "link": "https://dev.espai.fun/#/Plugin", "icon": "clarity:plugin-line" },
            { "text": "Upgrade Logs", "link": "/en/notes/open/change-logs.md", "icon": "material-symbols-light:update" },
            { "text": "Open-Source PCB", "link": "/en/notes/open/pcb.md", "icon": "file-icons:arduino" },
            { "text": "Smart Home", "link": "/en/notes/open/智能家居方案.md", "icon": "solar:armchair-2-linear" },
            { "text": "Community Cases", "link": "/en/notes/open/社区案列.md", "icon": "bitcoin-icons:globe-filled" },
            { "text": "Participate in Contributions", "link": "/en/notes/open/contribution.md", "icon": "ri:open-arm-line" },
        ]
    },
    {
        "text": "About",
        "icon": "mdi:about-circle-outline",
        "activeMatch": "^/en/about/",
        "items": [
            { "text": "Technical Support", "link": "/en/notes/about/js-sponsor.md", "icon": "fluent:person-support-28-regular" },
            { "text": "Business Cooperation", "link": "/en/notes/about/handshake.md", "icon": "emojione:handshake-light-skin-tone" },
            // { "text": "Business Authorization", "link": "/en/notes/about/authority.md", "icon": "openmoji:authority" },
            { "text": "Team Introduction", "link": "/en/notes/about/info.md", "icon": "flat-color-icons:info" },
        ]
    },
    {
        "text": "Friendly",
        "link": "/friends/",
        "icon": "carbon:friendship"
    },
    // {
    //     "text": "Investment/Sponsorship",
    //     "link": "/en/sponsor/",
    //     "icon": "emojione:handshake-light-skin-tone"
    // },
    {
        "text": "Open Platform",
        "icon": "logos:compose-multiplatform",
        "link": "https://dev.espai2.fun/"
    }
] as NavItem[]