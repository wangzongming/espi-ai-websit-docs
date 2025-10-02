---
pageLayout: home
config:
  -
    type: hero
    full: true
    background: tint-plate  
    hero:
      name: ESP-AI
      tagline: 为万物赋予灵魂
      text: 最简单、最低成本的硬件接入AI的方案，让任何物品都能接入大语言模型。
      actions:
        -
          theme: brand
          text: 快速开始 →
          link: /guide/intro/ 
        -
          theme: brand
          text: 开放平台
          link: https://dev.espai.fun
        -
          theme: brand
          text: 插件市场
          link: https://dev.espai.fun/#/Plugin
        -
          theme: brand
          text: 固件社区
          link: https://dev.espai.fun/#/UserBinCommunity 
        -
          theme: brand
          text: 音色社区
          link: https://dev.espai.fun/#/UserTimbreCommunity
        -
          theme: brand
          text: 硬件购买
          link: https://shop396116768.taobao.com/?spm=a21n57.shop_search.0.0.327f523c7BlnZB
        -
          theme: alt
          text: Github
          link: https://github.com/wangzongming/esp-ai
  # -
  #   type: features
  #   features: 
  #     -
  #       icon: twemoji:balance-scale
  #       title: 简洁/全面
  #       details: 绝不让开发者去了解一个多余新概念或多写无关业务的代码。客户端支持使用Ardunio、IDF(实现中)、PlatformIO等开发环境。
  #     -
  #       icon: twemoji:card-file-box
  #       title: 插件化
  #       details: 内置讯飞/火山引擎/阿里积灵 IAT、TTS、LLM，其他平台可用插件扩展。
  #     -
  #       icon: flat-color-icons:voice-presentation
  #       title: 多种对话/唤醒方式
  #       details: 可定制的离线语音唤醒，语音推理使用 TensorFlow Lite 模型，后续将会推出在线唤醒词生成服务。可以连续对话或者按住按钮对话或者任意方式对话~
  #     -
  #       icon: openmoji:authority-instruction
  #       title: 指令识别
  #       details: 开发者可以自定义用户指令，或者使用内置指令来让机器人具备家电控制、唱歌等功能
  #     -
  #       icon: twemoji:laptop-computer
  #       title: C/S架构
  #       details: 服务端与客户端分离，复杂计算与服务调度全部交于服务端，极大降低客户端成本，并可同时为N个客户端提供服务。
  #     -
  #       icon: twemoji:locked-with-key
  #       title: 身份鉴权
  #       details: 可在每个客户端连接时与每次会话时对客户端进行身份校验等操作。
  #     -
  #       icon: twemoji:rocket
  #       title: 实时响应
  #       details: 所有的服务接口都是用`WebScoket`协议来进行流式传输，服务端响应实时。LLM 推理出的每一个字都能实时响应给用户。
  #     -
  #       icon: icon-park:config
  #       title: 配置化
  #       details: 除特殊业务编写的插件外，框架或插件提供的配置一般能满足大部分场景。
  #     -
  #       icon: icon-park:strongbox
  #       title: 生产级&可集成
  #       details: ESP-AI 作为面向生产环境发布的开发库，对于扩展性、灵活性、稳定性有严格要求。并且可以很方便集成到现有项目。
  -
    type: features
    features: 
      -
        icon: streamline-stickies-color:safety-duo
        title: 可靠稳定
        details: 支撑服务由服务集群支撑服务，多机房数据备份，以保证服务的高并发、高可用。
      -
        icon: twemoji:balance-scale
        title: 上手简单
        details: 不管你是开发者还是小白，都能轻松实现自己的 AI 应用，让自己的AI硬件产品落地变得易如反掌。
      -
        icon: twemoji:card-file-box
        title: 可接入任何LLM/TTS/ASR服务
        details: 得益于插件化设计，解耦框架和第三方服务，让用户可以轻松接入自己的LLM/TTS/ASR服务。
      -
        icon: twemoji:rocket
        title: 实时响应
        details: 全链路流式设计，自研数据帧协议。通过预请求、预处理、结果缓存，保证用户体验。
      -
        icon: streamline-plump-color:browser-website-1-flat
        title: 分站功能
        details: 企业用户可以在一小时内完成自己站点搭建和装修，支持小程序，助力企业快速落地AI产品。
      -
        icon: flat-color-icons:voice-presentation
        title: 对话/唤醒方式
        details: 支持按住对话，内置按钮唤醒、触摸唤醒、语音唤醒，可自定义任何你喜欢的唤醒方式。
      -
        icon: twemoji:ear
        title: 在线更改唤醒词
        details: 可以在小程序或者开放平台网页上自行更改唤醒词。并且支持多个唤醒词。
      -
        icon: emojione-v1:music-descend
        title: 音乐播放
        details: 开放平台提供音乐库，上传你喜欢的音乐或者故事即可让设备播放。
      -
        icon: streamline-emojis:woman-singer-1
        title: 音乐创造
        details: 可以让 AI 根据你的心情随时给你谱写一首专属于您的歌曲。
      -
        icon: fluent-color:clock-32
        title: 闹钟、倒计时
        details: 和传统的闹钟不同，你甚至可以让设备每隔多少时间将一个故事，哄娃再也不再是难事。
      -
        icon: openmoji:authority-instruction
        title: 指令识别
        details: 可以自定义指令，或者使用内置指令来让机器人具备设备控制等功能，支持同时执行多个指令。
      -
        icon: noto:speaking-head
        title: 免费音色克隆
        details: 每个用户可以直接进行免费音色克隆，仅仅需要一段15秒左右的录音就可以定制自己喜欢的音色。 
      -
        icon: fluent-color:people-community-16
        title: 社区资源丰富
        details: 音色社区、素材社区、固件社区、插件社区，让创作变得更有价值！
      -
        icon: ix:firmware
        title: 一键固件制作 (UI自定义)
        details: 想要定制一双属于您玩偶的眼睛又或者想将您的IP放到设备屏幕中？为此，开放平台为您提供的一键固件制作。
      -
        icon: logos:visual-studio-code
        title: ESP-AI-Studio
        details: 针对教育行业或者程序员，平台提供在线嵌入式开发环境。
  -
    type: custom
title: README
createTime: 2024/11/7 21:06:45
permalink: / 
---


<br/>
<br/>
<h1><center>仅几行代码为您的机器人赋予灵魂</center></h1>
<br/>
<br/>

::: center

<img src="/images/nodejs.png" width="45%" style="height: 350px" />
<img src="/images/arduino.png" width="45%" style="height: 350px" />


:::


<br/>
<br/>
<h1><center>解决方案</center></h1>
<br/>
<br/>
<div style="background:#fff;text-align:center;border-radius: 32px;">
  <img src="/images/ESP-AI-zoology.png" width="80%" />
</div>

<br/>
<br/>
<h1><center>实现流程</center></h1>
<br/>
<br/>
<div style="background:#fff;text-align:center;border-radius: 32px;">
  <img src="/images/ESP-AI.png" width="80%" />
</div>




<br/>
<br/>
<h1><center>活跃的社区</center></h1>
<br/>
<br/>

<center>
<p>QQ 交流群1:  <a href="https://qm.qq.com/q/rO36RdR95u" target="_block">854445223 </a>   </p>
<p>QQ 交流群2: <a href="https://qm.qq.com/q/vRZ2IK5JCw" target="_block">952051286 </a>   </p>
</center> 
<br/>
<center>
<!-- <img src="/images/qq-grounp.png"  style="border-radius: 32px;"/> -->
<img src="/images/qq-grounp2.png"  style="border-radius: 32px;"/>
</center>  

 