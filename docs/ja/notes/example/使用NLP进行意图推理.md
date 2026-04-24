---
title: 意味のある推論にNLPを使う
createTime: 2024/11/07 17:54:50
permalink: /ja/example/nlp/
---
 
DilectiveSET のおかげで、ディレクティしてほとんどすべてのことを行うことができます。したがって、意味推論サービスを使用して楷合わせできます。



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

