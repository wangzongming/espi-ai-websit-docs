---
title: 使用NLP进行意图推理
createTime: 2024/11/07 17:54:50
permalink: /en/example/nlp/
---
 
得益于指令配置的灵活性，所以使用指令几乎无所不能。所以你可以使用意图推理服务来匹配。



```js
const config = {
    gen_client_config: async (){
        return {
            intention: [
                { 
                    key: ["开灯"],
                    // 配置开放平台 api_key 后字符串类型的指令会进行NLP推理。
                    api_key: "xxx",
                    /***
                     * nlp 服务地址，默认为 https://espai.natapp4.cc/v1/semantic。 注意，必须配置 api_key 才会去请求这个服务
                     * 请求体为 json： {
                     *      
                     *   "api_key": api_key,
                     *   "texts": ["开灯", "帮我开灯"]
                     * }
                     * 
                     * 接口需要返回： true || false
                     * 
                    */
                    // nlp_server?: string;
 
                    // 自定义做一些事
                    // instruct: (arg) => {
                    //     // some code...
                    // }, 

                    // 或者直接向客户端发送一个字符串，客户端使用 onEvent 监听
                    instruct: "test", 
                    message: "好的"
                }
            ]
        }
    }
}
```

