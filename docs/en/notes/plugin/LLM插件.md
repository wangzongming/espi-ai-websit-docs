---
title: LLM 插件开发
createTime: 2024/11/7 21:06:45
permalink: /en/plugin/llm/
---

## 流程图
 
<div style="background:#fff;padding: 32px;text-align:center;border-radius: 32px;">
  <img src="/images/llm-plugin.png" width="80%" />
</div>

## 视频教程
 
@[bilibili](BV1jNUsY4EDY)

## TS描述

```typescript
type Args = {
    // 设备id
    device_id: string,
    // 日志输出等级，为0时不应该输出任何日志
    devLog: number,
    // 用户配置的 apikey 等信息
    llm_config: object,
    // 用户配置的 iat 服务
    iat_server: string,
    // 用户配置的 llm 服务
    llm_server: string,
    // 用户配置的 tts 服务
    tts_server: string,
    // 对话文本
    text: string,
    // 连接 LLM 服务逻辑开始前需要调用这个方法告诉框架
    connectServerBeforeCb: () => void,
    // 连接 LLM 服务后需要调用这个方法告诉框架
    connectServerCb: (status: boolean) => void,
    // LLM 服务返回推理数据时调用
    cb: (data: { count_text, text: string, texts: any }) => void,
    // 与 LLM 服务之间发生错误时调用，并且传入错误说明
    llmServerErrorCb: (error: string) => void,
    // 用户配置的设置 LLM 参数的函数
    llm_params_set: Function,
    // 将 ws 服务回传给框架
    logWSServer: (ws: { close: () => void }) => void,
    // 用户配置的初始化时的对话数据
    llm_init_messages: Array<{role: string, content: string}>,
    // llm 历史对话数据
    llm_historys: Array<{role: string, content: string}>,
    // 日志输出对象
    log: {
        error: (msg: string) => void,
        info: (msg: string) => void,
        llm_info: (msg: string) => void
    }
}

// 插件 TS 描述
type Plugin = {
    name: string;               // 插件名称  
    type:"LLM" | "TTS" | "IAT"; // 插件类型 LLM | TTS | IAT
    main(arg: Args): void;      // 逻辑体
}
``` 




## 案例代码

下面提供`火山引擎LLM`请求案例。

``` javascript 
module.exports = {
    // 插件名字
    name: "esp-ai-plugin-llm-example",
    // 插件类型 LLM | TTS | IAT
    type: "LLM", 
    main({ devLog, device_id, llm_config, text, llmServerErrorCb, llm_init_messages = [], llm_historys = [], cb, llm_params_set, logWSServer, connectServerBeforeCb, connectServerCb, log }) {
        try {
            const { apiKey, epId, ...other_config } = llm_config;
            if (!apiKey) return log.error(`请配给 LLM 配置 apiKey 参数。`)
            if (!epId) return log.error(`请配给 LLM 配置 epId 参数。`)

            // 如果关闭后 message 还没有被关闭，需要定义一个标志控制
            let shouldClose = false;
            // 这个对象是固定写法，每个 LLM 插件都必须按这个结构定义
            const texts = {
                all_text: "",
                count_text: "",
                index: 0,
            } 
            
            // 告诉框架要开始连接 LLM 服务了
            connectServerBeforeCb();
            let openai = new OpenAI({
                apiKey: apiKey,
                baseURL: 'https://ark.cn-beijing.volces.com/api/v3',  // 在必要情况下，这个 URL 也推荐作为一个参数让用户配置
            });


            async function main() {
                try {
                    const stream = await openai.chat.completions.create({
                        messages: [
                            // 提示词
                            ...llm_init_messages,
                            // 上下文
                            ...llm_historys,

                            // 最新的用户提问
                            {
                                "role": "user", "content": text
                            },
                        ],
                        model: epId,
                        stream: true,
                    });

                    // 告诉框架已经和 llm 服务连接了
                    connectServerCb(true);

                    logWSServer({
                        // 向框架注册一个服务关闭对象
                        close: () => {
                            connectServerCb(false);
                            stream.controller.abort()
                            shouldClose = true;  
                        }
                    })
                    for await (const part of stream) {
                        if (shouldClose) break;
                        const chunk_text = part.choices[0]?.delta?.content || '';
                        // console.log('LLM 输出 ：', chunk_text);
                        devLog === 2 && log.llm_info('LLM 输出 ：', chunk_text);
                        texts["count_text"] += chunk_text;
                        cb({ text, texts, chunk_text: chunk_text })
                    }
                    // process.stdout.write('\n');
                    
                    if (shouldClose) return;
                    cb({
                        text,
                        is_over: true,
                        texts,
                        shouldClose, 
                    })
                    
                    // 告诉框架关闭了和 llm 服务的连接
                    connectServerCb(false); 

                    devLog && log.llm_info('===')
                    devLog && log.llm_info(texts["count_text"])
                    devLog && log.llm_info('===')
                    devLog && log.llm_info('LLM connect close!\n')
                } catch (error) {
                    console.log(error);
                    llmServerErrorCb("火山 LLM 报错: " + error)
                    connectServerCb(false);
                }

            }

            main();

        } catch (err) {
            console.log(err);
            log.error("火山引擎 LLM 插件错误：", err)
            connectServerCb(false);
        }

    }
}

```
