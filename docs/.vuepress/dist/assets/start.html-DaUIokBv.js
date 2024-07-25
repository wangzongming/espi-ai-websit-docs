import{_ as p,r as o,c as d,d as s,w as a,a as i,o as c,b as n,e}from"./app-CPBFrnNr.js";const r={},u=i(`<h1 id="quick-start" tabindex="-1"><a class="header-anchor" href="#quick-start"><span>Quick Start</span></a></h1><h2 id="what-is-esp-ai" tabindex="-1"><a class="header-anchor" href="#what-is-esp-ai"><span>What is ESP-AI?</span></a></h2><p><code>ESP-AI</code> provides a complete AI conversation solution for your development board, including but not limited to the <code>IAT (ASR) + LLM + TTS</code> integration solution for the <code>ESP32</code> series development boards. It is injected into the project as a dependency and does not affect existing projects.</p><p>Why is it said to include but not be limited to <code>ESP32</code> development boards? Because even if your other development board uses another board, you can still use <code>ESP32</code> to build an <code>AI</code> service based on this project and use serial communication to send commands or conversations to your other development board.</p><h2 id="what-can-esp-ai-do" tabindex="-1"><a class="header-anchor" href="#what-can-esp-ai-do"><span>What can ESP-AI do?</span></a></h2><p>Imagine this scenario: you have a robot that can perform some fixed actions, but you want to communicate with it and make it understand some of your commands. If you start from scratch, you will begin by collecting audio streams from the microphone and then enter endless debugging...</p><p>Now with <code>ESP-AI</code>, you don&#39;t have to do that. You just need to introduce <code>ESP-AI</code>. It has already implemented processes for <strong>offline voice wake-up, speech recognition, large language model invocation, text-to-speech, and speaker audio output</strong>. Moreover, <code>ESP-AI</code> uses a plugin design framework, and each step mentioned above provides extension methods, allowing you to customize your product freely.</p><h2 id="esp-ai-technology-stack" tabindex="-1"><a class="header-anchor" href="#esp-ai-technology-stack"><span>ESP-AI Technology Stack</span></a></h2><ul><li><p><strong>Software</strong>: The server-side code of this project is based on <code>Nodejs</code>, and the hardware code is based on <code>Arduino</code>. Although the server-side is developed based on <code>Nodejs</code>, plugins can be written in other programming languages. For details, see the plugin development section.</p></li><li><p><strong>Hardware</strong>: This project mainly runs on <code>ESP</code> series development boards.</p></li></ul><h2 id="features" tabindex="-1"><a class="header-anchor" href="#features"><span>Features</span></a></h2><ul><li>✔️ Customizable offline voice wake-up</li><li>✔️ IAT (ASR) ➡️ LLM/RAG ➡️ TTS</li><li>✔️ Configurable</li><li>✔️ Plugin-based</li><li>✔️ Ready to use</li></ul><h2 id="next-steps" tabindex="-1"><a class="header-anchor" href="#next-steps"><span>Next Steps</span></a></h2><ul><li>🤔 Provide a no-code integration solution</li><li>🤔 Integrate AI into user intent inference (e.g., &quot;Turn off the light&quot;, &quot;Turn on the light&quot; will both be recognized as: &quot;Turn on the light&quot; command)</li><li>🤔 Offer free and paid services</li><li>🤔 Online wake word generation</li><li>🤔 Methods for writing plugins in other languages (avoid using only Nodejs for plugin development)</li><li>🤔 Provide dedicated development boards (avoid current complex wiring)</li></ul><h2 id="development-environment-setup" tabindex="-1"><a class="header-anchor" href="#development-environment-setup"><span>Development Environment Setup</span></a></h2><h3 id="local-development-environment-setup" tabindex="-1"><a class="header-anchor" href="#local-development-environment-setup"><span>Local Development Environment Setup</span></a></h3><p>For subsequent upgrades, simply download the relevant files from the <a target="_block" href="https://github.com/wangzongming/esp-ai/releases">release page</a>. The following dependency files only need to be installed for the first time.</p><table><thead><tr><th>Environment</th><th>Version</th><th>Notes</th></tr></thead><tbody><tr><td><code>Nodejs</code></td><td>v18.x</td><td></td></tr><tr><td><code>VsCode IDE</code></td><td>Latest version</td><td></td></tr><tr><td><code>Arduino IDE</code></td><td>&gt;= v2.x</td><td></td></tr><tr><td><code>esp</code> development board</td><td>v2.x</td><td>Search for <code>esp</code> development board in <code>Arduino IDE</code></td></tr><tr><td>Hardware code dependency libraries</td><td>Latest version</td><td>Import the plugins from the <code>/client/libraries</code> directory of the <code>Github</code> repository into the IDE plugins, default location: <code>C:\\Users\\Username\\Documents\\Arduino\\libraries</code></td></tr></tbody></table><h4 id="hardware-code-dependency-libraries-description" tabindex="-1"><a class="header-anchor" href="#hardware-code-dependency-libraries-description"><span>Hardware Code Dependency Libraries Description</span></a></h4><table><thead><tr><th>File Name</th><th>Notes</th><th>Version</th></tr></thead><tbody><tr><td>arduino-audio-tool</td><td>https://github.com/pschatzmann/arduino-audio-tools</td><td></td></tr><tr><td>WebSockets</td><td>Can be directly searched and installed in the new IDE</td><td>v2.4.0</td></tr><tr><td>Arduino_JSON</td><td>Can be directly searched and installed in the new IDE</td><td>v0.2.0</td></tr><tr><td>esp-ai</td><td>esp-ai cannot be searched and installed temporarily</td><td></td></tr><tr><td>xiao_ming_tong_xue_inferencing</td><td>Offline voice recognition model cannot be searched and installed temporarily</td><td></td></tr></tbody></table><h3 id="applying-for-iflytek-key" tabindex="-1"><a class="header-anchor" href="#applying-for-iflytek-key"><span>Applying for iFLYTEK Key</span></a></h3><p>Registration URL: https://console.xfyun.cn/services/iat</p><p><code>ESP-AI</code> fully integrates with iFLYTEK&#39;s <code>IAT</code>, <code>LLM</code>, and <code>TTS</code> services, so you can test with iFLYTEK&#39;s services before using your own.</p><h2 id="client-code" tabindex="-1"><a class="header-anchor" href="#client-code"><span>Client Code</span></a></h2><ol><li>Create a file <code>example/example.ino</code>, note: the file must be placed in a folder, and the folder name must be the same as the file name.</li><li>Open the <code>example.ino</code> file with <code>Arduino IDE</code>.</li><li>Write the following code, then upload it to the development board.</li></ol><div class="language-c line-numbers-mode" data-highlighter="prismjs" data-ext="c" data-title="c"><pre class="language-c"><code><span class="line"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;esp-ai.h&gt;</span></span></span>
<span class="line"></span>
<span class="line">ESP_AI esp_ai<span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// [Required] Debug mode, will output more information</span></span>
<span class="line">bool debug <span class="token operator">=</span> true<span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// [Required] WiFi configuration: { wifi SSID, wifi password } Note: Use double quotes!</span></span>
<span class="line">ESP_AI_wifi_config wifi_config <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;oldwang&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;oldwang520&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// [Required] Server configuration: { server IP, server port }</span></span>
<span class="line">ESP_AI_server_config server_config <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;192.168.1.5&quot;</span><span class="token punctuation">,</span> <span class="token number">8080</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// [Required] Offline wake-up solution: { solution, recognition threshold }, &quot;edge_impulse&quot; | &quot;diy&quot;, use &quot;diy&quot; to call esp_ai.wakeUp() method for wake-up</span></span>
<span class="line">ESP_AI_wake_up_config wake_up_config <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token string">&quot;edge_impulse&quot;</span><span class="token punctuation">,</span> <span class="token number">0.7</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// [Optional] Microphone pin configuration: { bck_io_num, ws_io_num, data_in_num }</span></span>
<span class="line">ESP_AI_i2s_config_mic i2s_config_mic <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// [Optional] Speaker pin configuration: { bck_io_num, ws_io_num, data_in_num, sampling rate }</span></span>
<span class="line">ESP_AI_i2s_config_speaker i2s_config_speaker <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">16000</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token comment">// [Optional] Volume adjustment configuration: { input pin, input max value (1024|4096), default volume (0-1) }</span></span>
<span class="line">ESP_AI_volume_config volume_config <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">34</span><span class="token punctuation">,</span> <span class="token number">4096</span><span class="token punctuation">,</span> <span class="token number">0.5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">void</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  Serial<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token number">115200</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// Start running ESP-AI</span></span>
<span class="line">  esp_ai<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">{</span> i2s_config_mic<span class="token punctuation">,</span> i2s_config_speaker<span class="token punctuation">,</span> wifi_config<span class="token punctuation">,</span> server_config<span class="token punctuation">,</span> wake_up_config<span class="token punctuation">,</span> volume_config<span class="token punctuation">,</span> debug <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">void</span> <span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  esp_ai<span class="token punctuation">.</span><span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="server-code" tabindex="-1"><a class="header-anchor" href="#server-code"><span>Server Code</span></a></h2><ol><li>Continue to create a file <code>index.js</code> in the above-created <code>example</code> directory.</li><li>Add the following code to <code>index.js</code>:</li></ol><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="line"><span class="token keyword">const</span> espAi <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;esp-ai&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> </span>
<span class="line"><span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span> </span>
<span class="line">    <span class="token literal-property property">api_key</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// iFLYTEK: https://console.xfyun.cn/services/iat. After opening the URL, copy the three fields in the upper right corner.</span></span>
<span class="line">        <span class="token literal-property property">xun_fei</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">appid</span><span class="token operator">:</span> <span class="token string">&quot;5200d300&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">apiSecret</span><span class="token operator">:</span> <span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">apiKey</span><span class="token operator">:</span> <span class="token string">&quot;xx&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">llm</span><span class="token operator">:</span> <span class="token string">&quot;v4.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span> </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token function">espAi</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>Install server dependencies</li></ol>`,29),h=n("div",{class:"language-bash","data-highlighter":"prismjs","data-ext":"sh","data-title":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"line"},[n("span",{class:"token function"},"yarn"),e(),n("span",{class:"token function"},"add"),e(" esp-ai")]),e(`
`),n("span",{class:"line"})])])],-1),m=n("div",{class:"language-bash","data-highlighter":"prismjs","data-ext":"sh","data-title":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"line"},[n("span",{class:"token function"},"npm"),e(),n("span",{class:"token function"},"install"),e(" esp-ai")]),e(`
`),n("span",{class:"line"})])])],-1),v=n("div",{class:"language-bash","data-highlighter":"prismjs","data-ext":"sh","data-title":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"line"},[n("span",{class:"token function"},"pnpm"),e(),n("span",{class:"token function"},"install"),e(" esp-ai")]),e(`
`),n("span",{class:"line"})])])],-1),k=i(`<ol start="4"><li>Run the server</li></ol><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre class="language-text"><code><span class="line"># In a production environment, use pm2 to run the service to ensure reliability and performance: pm2 start ./index.js -i max </span>
<span class="line">node ./index.js</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hardware-wiring" tabindex="-1"><a class="header-anchor" href="#hardware-wiring"><span>Hardware Wiring</span></a></h2><ul><li>INMP441 is a microphone module</li><li>Max98357A is an amplifier module</li><li>Potentiometer used to adjust output volume</li><li>LED used to demonstrate user commands to turn lights on/off</li></ul><h3 id="esp32-s3-development-board" tabindex="-1"><a class="header-anchor" href="#esp32-s3-development-board"><span>ESP32-S3 Development Board</span></a></h3><table><thead><tr><th>ESP32-s3</th><th>INMP441</th><th>Max98357A</th><th>Potentiometer (optional)</th><th>LED (optional)</th></tr></thead><tbody><tr><td>3v3</td><td>VDD</td><td>VDD</td><td>VDD</td><td></td></tr><tr><td>GND</td><td>GND</td><td>GND</td><td>GND</td><td>GND</td></tr><tr><td>GND</td><td>L/R</td><td></td><td></td><td></td></tr><tr><td>4</td><td>SCK</td><td></td><td></td><td></td></tr><tr><td>5</td><td>WS</td><td></td><td></td><td></td></tr><tr><td>6</td><td>SD</td><td></td><td></td><td></td></tr><tr><td>15</td><td></td><td>DIN</td><td></td><td></td></tr><tr><td>16</td><td></td><td>BCLK</td><td></td><td></td></tr><tr><td>17</td><td></td><td>LRC</td><td></td><td></td></tr><tr><td>34</td><td></td><td></td><td>OUT</td><td></td></tr><tr><td>18</td><td></td><td></td><td></td><td>Positive</td></tr></tbody></table><p>Wiring diagram to be added...</p><h3 id="esp32xiaos3-development-board" tabindex="-1"><a class="header-anchor" href="#esp32xiaos3-development-board"><span>ESP32XIAOS3 Development Board</span></a></h3><p>It is on the way just like other development boards...</p><h2 id="finally" tabindex="-1"><a class="header-anchor" href="#finally"><span>Finally</span></a></h2><p>Shout <code>Xiao Ming</code> to start chatting happily! 🎉</p>`,11);function g(b,f){const t=o("CodeGroupItem"),l=o("CodeGroup");return c(),d("div",null,[u,s(l,null,{default:a(()=>[s(t,{title:"yarn"},{default:a(()=>[h]),_:1}),s(t,{title:"npm",active:""},{default:a(()=>[m]),_:1}),s(t,{title:"pnpm"},{default:a(()=>[v]),_:1})]),_:1}),k])}const _=p(r,[["render",g],["__file","start.html.vue"]]),w=JSON.parse('{"path":"/en/start.html","title":"Quick Start","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"What is ESP-AI?","slug":"what-is-esp-ai","link":"#what-is-esp-ai","children":[]},{"level":2,"title":"What can ESP-AI do?","slug":"what-can-esp-ai-do","link":"#what-can-esp-ai-do","children":[]},{"level":2,"title":"ESP-AI Technology Stack","slug":"esp-ai-technology-stack","link":"#esp-ai-technology-stack","children":[]},{"level":2,"title":"Features","slug":"features","link":"#features","children":[]},{"level":2,"title":"Next Steps","slug":"next-steps","link":"#next-steps","children":[]},{"level":2,"title":"Development Environment Setup","slug":"development-environment-setup","link":"#development-environment-setup","children":[{"level":3,"title":"Local Development Environment Setup","slug":"local-development-environment-setup","link":"#local-development-environment-setup","children":[]},{"level":3,"title":"Applying for iFLYTEK Key","slug":"applying-for-iflytek-key","link":"#applying-for-iflytek-key","children":[]}]},{"level":2,"title":"Client Code","slug":"client-code","link":"#client-code","children":[]},{"level":2,"title":"Server Code","slug":"server-code","link":"#server-code","children":[]},{"level":2,"title":"Hardware Wiring","slug":"hardware-wiring","link":"#hardware-wiring","children":[{"level":3,"title":"ESP32-S3 Development Board","slug":"esp32-s3-development-board","link":"#esp32-s3-development-board","children":[]},{"level":3,"title":"ESP32XIAOS3 Development Board","slug":"esp32xiaos3-development-board","link":"#esp32xiaos3-development-board","children":[]}]},{"level":2,"title":"Finally","slug":"finally","link":"#finally","children":[]}],"git":{"updatedTime":1721455615000,"contributors":[{"name":"wangzongming","email":"wangzm@bjzxkj.com","commits":2}]},"filePathRelative":"en/start.md"}');export{_ as comp,w as data};
