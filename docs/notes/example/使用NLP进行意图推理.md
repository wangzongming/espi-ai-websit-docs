---
title: 使用NLP进行意图推理
createTime: 2024/11/07 17:54:50
permalink: /example/nlp/
---
 
得益于指令配置的灵活性，所以使用指令几乎无所不能。所以你可以使用意图推理服务来匹配。



```js
const config = {
    gen_client_config: async (){
        return {
            intention: [
                { 
                    key: async (text = "") => {
                        // text 就是用户说的话，可以将 text 传给 nlp 服务进行推理，在进行返回
                        const match = await fetch("nlp-server");
                        if (match) { 
                            return true;
                        }
                    },
 
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

