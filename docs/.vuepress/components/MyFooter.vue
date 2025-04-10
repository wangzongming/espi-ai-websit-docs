<template>
    <div class="root">
        <div class="powered">Powered by VuePress & vuepress-theme-plume</div>
        <div class="copyright">Apache 2.0 Licensed | Copyright © ESP-AI <span style="display: inline-block;padding-left: 24px;"> 地址：深圳市福田区汉国中心1206</span></div>
        <div>
            <span class="bei_an_container">
                <a style="color:#777;" href="https://beian.miit.gov.cn/" target="_blank">{{ bei_an_hao }}</a>
                <div class="wang_an">
                    <img class="img" src="/images/beian.png" v-if="bei_an_wangan"/>
                    <a href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002004468" style="color:#777;"
                        rel="noreferrer" target="_blank">{{ bei_an_wangan }}</a>
                </div>
            </span>
        </div>
    </div>
</template>
<style scoped>
.root {
    text-align: center;
    padding-bottom: 12px;
}

.powered {
    font-size: 12px;
}

.copyright {
    font-size: 12px;
}

.bei_an_container {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

.wang_an {
    display: flex;
    align-items: center;
    padding-left: 16px;
}

.img {
    height: 18px;
    width: 18px;
    margin-right: 3px;
}
</style>
<script setup>
import { ref, onBeforeMount } from 'vue'
const bei_an_hao = ref()
const bei_an_wangan = ref()

// espai 域名备案号 重新备案中...
const espai = "黔ICP备2024030115号-2";
const espai_wangan = "粤公网安备44030002004468";

// espai2 域名备案号
const espai2 = "粤ICP备2025391423号";
const espai2_wangan = "粤公网安备44030002006581号";

onBeforeMount(() => {
    const { host } = window.location;
    if (host === "espai2.fun" || host === "www.espai2.fun") {
        bei_an_hao.value = espai2;
        bei_an_wangan.value = espai2_wangan;
    } else {
        bei_an_hao.value = espai;
        bei_an_wangan.value = espai_wangan; 
    }
})

</script>