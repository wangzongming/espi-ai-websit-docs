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
          theme: alt
          text: Github
          link: https://github.com/wangzongming/esp-ai
  -
    type: features
    features: 
      -
        icon: twemoji:balance-scale
        title: 简洁/全面
        details: 绝不让开发者去了解一个多余新概念或多写无关业务的代码。客户端支持使用Ardunio、IDF(实现中)、PlatformIO等开发环境。
      -
        icon: twemoji:card-file-box
        title: 插件化
        details: 内置讯飞/火山引擎/阿里积灵 IAT、TTS、LLM，其他平台可用插件扩展。
      -
        icon: flat-color-icons:voice-presentation
        title: 语音唤醒
        details: 可定制的离线语音唤醒，语音推理使用 TensorFlow Lite 模型，后续将会推出在线唤醒词生成服务。
      -
        icon: openmoji:authority-instruction
        title: 指令识别
        details: 开发者可以自定义用户指令，或者使用内置指令来让机器人具备家电控制、唱歌等功能
      -
        icon: twemoji:laptop-computer
        title: C/S架构
        details: 服务端与客户端分离，复杂计算与服务调度全部交于服务端，极大降低客户端成本，并可同时为N个客户端提供服务。
      -
        icon: twemoji:locked-with-key
        title: 身份鉴权
        details: 可在每个客户端连接时与每次会话时对客户端进行身份校验等操作。
      -
        icon: twemoji:rocket
        title: 实时响应
        details: 所有的服务接口都是用`WebScoket`协议来进行流式传输，服务端响应实时。LLM 推理出的每一个字都能实时响应给用户。
      -
        icon: icon-park:config
        title: 配置化
        details: 除特殊业务编写的插件外，框架或插件提供的配置一般能满足大部分场景。
      -
        icon: icon-park:strongbox
        title: 生产级&可集成
        details: ESP-AI 作为面向生产环境发布的开发库，对于扩展性、灵活性、稳定性有严格要求。并且可以很方便集成到现有项目。
 

  # -
  #   type: image-text
  #   title: 功能
  #   description: 功能丰富、接口灵活，理论上可以满足任何需求。
  #   image: /images/plume-1.svg
  #   list:
  #     -
  #       title: 可定制的离线语音唤醒词，且内置多种唤醒方式（内置、语音、按钮、串口、天问asrpro）。 
  #     -
  #       title: 完整对话链接 IAT(ASR) ➡️ LLM/RAG ➡️ TTS。 
  #     -
  #       title: 支持会话打断。 
  #     -
  #       title: TTS/LLM 快速响应算法，在考虑服务费用的基础上尽力以最快速度响应用户。 
  #     -
  #       title: 用户指令智能识别(家电控制、音频播放)，可根据上下文动态响应指令。且支持自定义逻辑/字符匹配等方式来识别用户意图。 
  #     -
  #       title: 插件化，可编写插件接入任何 LLM/TTS/IAT, 也就是说你可以轻而易举的接入自己的知识库、tts、llm、asr等服务。
  #     -
  #       title: C/S 架构，也就是说你可以对每个设备进行管理，包括为每一个客户端(硬件)独立分配一套配置。
  #     -
  #       title: 完整的鉴权规则。
  #     -
  #       title: 全链流式数据交互。
  #     -
  #       title: 开发者平台提供：免费服务、可视化配置 ... 。
  #     -
  #       title: 高度自定义（配网页面以及各种细节都是完全提供出来以供更改的）
  #     -
  #       title: 轻松应付大并发场景 
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

<img src="/images/nodejs.png" width="45%"   style="height: 350px" />
<img src="/images/arduino.png" width="45%"    style="height: 350px" />

:::

<br/>
<br/>
<h1><center>实现流程</center></h1>
<br/>
<br/>
<div style="background:#fff;padding: 32px;text-align:center;border-radius: 32px;">
  <img src="/images/ESP-AI.png" width="80%" />
</div>



<br/>
<br/>
<h1><center>活跃的社区</center></h1>
<br/>
<br/>

<center>
QQ 交流群: 854445223 
</center> 
<br/>
<center>
<img src="/images/qq-grounp.png"  style="border-radius: 32px;"/>
</center> 
 



 