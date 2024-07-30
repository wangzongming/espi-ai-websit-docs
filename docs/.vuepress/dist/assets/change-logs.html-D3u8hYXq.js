import{_ as e,c as a,o as l,a as i}from"./app-BskzONf5.js";const n={},s=i(`<h1 id="升级日志" tabindex="-1"><a class="header-anchor" href="#升级日志"><span>升级日志</span></a></h1><h2 id="_2024-7-30-server-1-15-5-client-1-3-1" tabindex="-1"><a class="header-anchor" href="#_2024-7-30-server-1-15-5-client-1-3-1"><span>2024-7-30 Server@1.15.5 Client@1.3.1</span></a></h2><h4 id="server" tabindex="-1"><a class="header-anchor" href="#server"><span>Server</span></a></h4><ul><li>🆕 新增 鉴权配置，用户每次请求接口时都可进行一次鉴权</li></ul><h5 id="install" tabindex="-1"><a class="header-anchor" href="#install"><span>Install</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">npm i esp-ai@1.15.5</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="client" tabindex="-1"><a class="header-anchor" href="#client"><span>Client</span></a></h4><ul><li>🆕 新增 连接服务时可传递参数，用于服务端鉴权等。</li></ul><h5 id="install-1" tabindex="-1"><a class="header-anchor" href="#install-1"><span>Install</span></a></h5><p><a href="https://github.com/user-attachments/files/16422116/esp-ai-1.3.1.zip">esp-ai Arduino依赖库 点击下载</a></p><h2 id="_2024-7-23-server-1-14-5-client-1-2-1" tabindex="-1"><a class="header-anchor" href="#_2024-7-23-server-1-14-5-client-1-2-1"><span>2024-7-23 Server@1.14.5 Client@1.2.1</span></a></h2><h4 id="server-1" tabindex="-1"><a class="header-anchor" href="#server-1"><span>Server</span></a></h4><ul><li>🐞 修复 播放 <code>http</code> 地址放入音乐会报错</li></ul><h5 id="install-2" tabindex="-1"><a class="header-anchor" href="#install-2"><span>Install</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">npm i esp-ai@1.14.5</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="client-1" tabindex="-1"><a class="header-anchor" href="#client-1"><span>Client</span></a></h4><ul><li>🐞 修复 一些其他问题</li></ul><h5 id="install-3" tabindex="-1"><a class="header-anchor" href="#install-3"><span>Install</span></a></h5><p><a href="https://github.com/user-attachments/files/16347295/esp-ai-1.2.1.zip">esp-ai Arduino依赖库 点击下载</a></p><h2 id="_2024-7-22-server-1-14-4-client-1-2-0" tabindex="-1"><a class="header-anchor" href="#_2024-7-22-server-1-14-4-client-1-2-0"><span>2024-7-22 Server@1.14.4 Client@1.2.0</span></a></h2><h4 id="server-2" tabindex="-1"><a class="header-anchor" href="#server-2"><span>Server</span></a></h4><ul><li>🐞 修复 讯飞llm服务返回报错后框架未将错误输出</li></ul><h5 id="install-4" tabindex="-1"><a class="header-anchor" href="#install-4"><span>Install</span></a></h5><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line">npm i esp-ai@1.14.4</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="client-2" tabindex="-1"><a class="header-anchor" href="#client-2"><span>Client</span></a></h4><ul><li>💄 优化 稳定性提示</li></ul><h5 id="install-5" tabindex="-1"><a class="header-anchor" href="#install-5"><span>Install</span></a></h5><p><a href="https://github.com/user-attachments/files/16323083/esp-ai-1.1.0.zip">esp-ai Arduino依赖库 点击下载</a></p><h2 id="_2024-07-21" tabindex="-1"><a class="header-anchor" href="#_2024-07-21"><span>2024-07-21</span></a></h2><h4 id="服务端-v1-14-3" tabindex="-1"><a class="header-anchor" href="#服务端-v1-14-3"><span>服务端 v1.14.3</span></a></h4><ul><li>🆕 新增 音乐播放功能</li><li>🐞 修复 第一次唤醒后再也唤醒不了</li></ul><h4 id="客户端-v1-2-0" tabindex="-1"><a class="header-anchor" href="#客户端-v1-2-0"><span>客户端 v1.2.0</span></a></h4><ul><li>💄 优化 稳定性提示</li><li></li></ul><h2 id="_2024-07-20" tabindex="-1"><a class="header-anchor" href="#_2024-07-20"><span>2024-07-20</span></a></h2><h4 id="服务端-v1-13-2" tabindex="-1"><a class="header-anchor" href="#服务端-v1-13-2"><span>服务端 v1.13.2</span></a></h4><ul><li>🆕 新增 语音识别完毕后增加回调</li><li>🆕 新增 vad_eos 语音识别静默时间配置</li><li>🤔 调整 重构 TTS 插件的形参，分离插件中任何与框架耦合的概念(极大降低插件封装难度)</li><li>🤔 调整 重构 IAT 插件的形参，分离插件中任何与框架耦合的概念(极大降低插件封装难度)</li><li>🤔 调整 重构 LLM 插件的形参，分离插件中任何与框架耦合的概念(极大降低插件封装难度)</li><li>🤔 调整 延长听不见用户说话的静默时间</li><li>💄 优化 部分配置在错误情况下增加提示</li><li>🐞 修复 有时候第一次唤醒后再也唤醒不了</li><li>🐞 修复 对话时可能会混乱</li></ul><h4 id="客户端-v1-0-0" tabindex="-1"><a class="header-anchor" href="#客户端-v1-0-0"><span>客户端 v1.0.0</span></a></h4><ul><li>🤔 调整 <code>esp_ai.onEvent()</code> 中的两个形参类型为 <code>String</code> 类型，更加方便使用 (如使用 <code>==</code> 直接判断命令)</li><li>💄 优化 语音唤醒准确度</li></ul><h2 id="_2024-07-13" tabindex="-1"><a class="header-anchor" href="#_2024-07-13"><span>2024-07-13</span></a></h2><ul><li>🆕 新增 插件开发功能，支持为服务端开发自定义的插件</li><li>🆕 新增 增加客户端扬声器采样率配置</li><li>🆕 新增 海豚配音插件 <code>TTS</code>，支持众多音色，详情见：https://www.ttson.cn/</li><li>💄 优化 音频流拆分，减少客户端喇叭杂音</li><li>💄 优化 对话过程的流畅性</li><li>💄 优化 小明同学聆听前会发出提示音</li></ul><h2 id="_2024-07-09" tabindex="-1"><a class="header-anchor" href="#_2024-07-09"><span>2024-07-09</span></a></h2><h4 id="v1-0-0" tabindex="-1"><a class="header-anchor" href="#v1-0-0"><span>v1.0.0</span></a></h4><ul><li>✨ 重构 客户端代码，改为头文件形式。</li><li>🆕 新增 火山引擎 <code>TTS</code> 接入</li><li>🐞 修复 调用 <code>讯飞LLM</code> 非3.5版本时报错</li><li>🐞 修复 服务端部分bug</li></ul><h2 id="_2024-07-01" tabindex="-1"><a class="header-anchor" href="#_2024-07-01"><span>2024-07-01</span></a></h2><h4 id="v0-0-1" tabindex="-1"><a class="header-anchor" href="#v0-0-1"><span>v0.0.1</span></a></h4><ul><li>🆕 新增 测试版发布啦</li></ul>`,46),r=[s];function t(h,d){return l(),a("div",null,r)}const p=e(n,[["render",t],["__file","change-logs.html.vue"]]),o=JSON.parse('{"path":"/change-logs.html","title":"升级日志","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"2024-7-30 Server@1.15.5 Client@1.3.1","slug":"_2024-7-30-server-1-15-5-client-1-3-1","link":"#_2024-7-30-server-1-15-5-client-1-3-1","children":[]},{"level":2,"title":"2024-7-23 Server@1.14.5 Client@1.2.1","slug":"_2024-7-23-server-1-14-5-client-1-2-1","link":"#_2024-7-23-server-1-14-5-client-1-2-1","children":[]},{"level":2,"title":"2024-7-22 Server@1.14.4 Client@1.2.0","slug":"_2024-7-22-server-1-14-4-client-1-2-0","link":"#_2024-7-22-server-1-14-4-client-1-2-0","children":[]},{"level":2,"title":"2024-07-21","slug":"_2024-07-21","link":"#_2024-07-21","children":[]},{"level":2,"title":"2024-07-20","slug":"_2024-07-20","link":"#_2024-07-20","children":[]},{"level":2,"title":"2024-07-13","slug":"_2024-07-13","link":"#_2024-07-13","children":[]},{"level":2,"title":"2024-07-09","slug":"_2024-07-09","link":"#_2024-07-09","children":[]},{"level":2,"title":"2024-07-01","slug":"_2024-07-01","link":"#_2024-07-01","children":[]}],"git":{"updatedTime":1721909787000,"contributors":[{"name":"wangzongming","email":"wangzm@bjzxkj.com","commits":3}]},"filePathRelative":"change-logs.md"}');export{p as comp,o as data};