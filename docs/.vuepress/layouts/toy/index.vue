<script setup>
import { Layout } from 'vuepress-theme-plume/client'
const goPage = (url) => {
  window.open(url, '_blank')
}
</script>

<template>
  <Layout>
    <template #doc-top>
      <div class="toy">
        <div class="toy-banner">
          <div class="banner-text">
            <div class="banner-text-title">儿童玩具解决方案</div>
            <div class="banner-text-content">
              有趣的大模型语音交互<br />
              角色互动、情感对话和知识启蒙<br />
              接入开源，快速完成玩具方案验证<br />
              AI故事机、AI玩偶、AI玩具、AI机器人
            </div>
            <div class="banner-text-btn"
              @click="() => goPage('https://espai.fun/acout/cooperation/#%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F')">
              合作咨询</div>
          </div>
        </div>
        <div class="toy-video">
          <div class="toy-video-title">会说话的玩伴<span style="margin-left: 30px;">会思考的童年</span></div>
          <div class="toy-video-player">
            <iframe style="width: 100%;height: 100%;"
              src="https://player.bilibili.com/player.html?isOutside=true&aid=114727585847149&bvid=BV1ZTKWz4Eww&cid=30642733189&p=1"
              scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
            <!-- <video src="./images/child.mp4" poster="./images/video-overview.png" controls></video> -->
          </div>
        </div>
        <div class="toy-scene">
          <div class="toy-scene-title">应用场景</div>
          <div class="toy-scene-tips">对话式儿童陪伴玩具</div>
          <div class="toy-scene-content">
            <div class="scene-content-item">毛绒玩具<div class="toys"></div>
            </div>
            <div class="scene-content-item">塑料玩具<div class="toys"></div>
            </div>
            <div class="scene-content-item">儿童陪伴机器人<div class="toys"></div>
            </div>
            <div class="scene-content-item">儿童故事机<div class="toys"></div>
            </div>
          </div>
        </div>
        <div class="toy-scheme">
          <div class="toy-scheme-content">
            <div class="scheme-content-title">方案优势</div>
            <div class="scheme-content-item">
              <div style="width: 450px;">
                <div class="scheme-item-text1">快速打造玩具IP</div>
                <div class="scheme-item-text2"><i></i>自定义玩具人设及对话风格</div>
                <div class="scheme-item-text2"><i></i>自定义大模型文档问答，实现品牌知识问答</div>
              </div>
              <div class="scheme-item-image"></div>
            </div>
            <div class="scheme-content-item">
              <div class="scheme-item-image"></div>
              <div style="width: 450px;">
                <div class="scheme-item-text1">有趣有料的儿童专属内容</div>
                <div class="scheme-item-text2"><i></i>丰富的音乐、故事等正版儿童音频信源</div>
                <div class="scheme-item-text2"><i></i>孩子与大模型共同创作故事，释放孩子想象力</div>
              </div>
            </div>
            <div class="scheme-content-item">
              <div style="width: 450px;">
                <div class="scheme-item-text1">儿童科普满足好奇心</div>
                <div class="scheme-item-text2"><i></i>科普大模型，随时随地知识问答</div>
                <div class="scheme-item-text2"><i></i>孩子听得懂的趣味讲解</div>
              </div>
              <div class="scheme-item-image"></div>
            </div>
            <div class="scheme-content-item">
              <div class="scheme-item-image"></div>
              <div style="width: 450px;">
                <div class="scheme-item-text1">儿童口语启蒙，锻炼表达能力</div>
                <div class="scheme-item-text2"><i></i>提供口语老师教学陪练</div>
                <div class="scheme-item-text2"><i></i>支持智能评价反馈</div>
              </div>
            </div>
            <div class="scheme-content-item">
              <div style="width: 450px;">
                <div class="scheme-item-text1">儿童共情闲聊，呵护心理健康</div>
                <div class="scheme-item-text2"><i></i>大模型在对话中识别情绪变化</div>
                <div class="scheme-item-text2"><i></i>正面回应孩子心理需求，给予鼓励与引导</div>
              </div>
              <div class="scheme-item-image"></div>
            </div>
            <div class="scheme-content-item">
              <div class="scheme-item-image"></div>
              <div style="width: 450px;">
                <div class="scheme-item-text1">复刻家人声音的情感陪伴</div>
                <div class="scheme-item-text2"><i></i>一句话复刻真人声音</div>
                <div class="scheme-item-text2"><i></i>有温度的玩具对话，宛如亲人时刻陪伴</div>
              </div>
            </div>
            <div class="scheme-content-item">
              <div style="width: 450px;">
                <div class="scheme-item-text1">多模态交互，与孩子共同探索世界</div>
                <div class="scheme-item-text2"><i></i>支持音视频输入，让玩具感知现实世界</div>
                <div class="scheme-item-text2"><i></i>提供摄像头、麦克风阵列等硬件设备</div>
              </div>
              <div class="scheme-item-image"></div>
            </div>
          </div>
        </div>
        <div class="toy-access">
          <h2>接入方式</h2>
          <div style="font-size: 14px;">接入便捷，低配置成本</div>
          <div class="toy-access-content">
            <div class="access-content-item">
              <div class="access-item-title">纯软接入</div>
              <div class="access-item-desc">接入代码开源，快速实现大模型语音交互</div>
              <div class="access-item-sdk" @click="() => goPage('https://github.com/wangzongming/esp-ai')">开源SDK</div>
              <div class="access-item-other">
                <div>Arduino</div>
                <div>IDF</div>
                <div>Linux</div>
                <div>安卓</div>
              </div>
            </div>
            <div class="access-content-item">
              <div class="access-item-title">玩具硬件模组</div>
              <div class="access-item-desc" style="margin-bottom: 10px;">开箱即用，适合项目验证及产品量产</div>
              <div class="access-item-img"
                @click="() => goPage('https://shop396116768.taobao.com/')">
              </div>
            </div>
          </div>
        </div>
        <div class="toy-consult">
          <h2>接入儿童大模型交互</h2>
          <p>免费咨询专属顾问 为您量身定制产品推荐方案</p>
          <div class="toy-consult-btn"
            @click="() => goPage('https://espai.fun/acout/cooperation/#%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F')">合作咨询
          </div>
        </div>
        <div class="toy-footer">
          <div class="toy-footer-content">
            <div class="footer-content-top">
              <div class="footer-content-item">
                <img src="./images/footer1.png">大客户1V1专享服务
              </div>
              <div class="footer-content-item">
                <img src="./images/footer2.png">国家信息安全等级保护三级
              </div>
              <div class="footer-content-item">
                <img src="./images/footer3.png">可靠的SLA保障承诺
              </div>
              <div class="footer-content-item">
                <img src="./images/footer4.png">资深工程师专业支持
              </div>
            </div>
            <div class="footer-content-bottom">
              <div class="footer-bottom-left">
                <div class="footer-bottom-left-title"><img src="/images/logo-tm.png"><span>
                    ESP-AI开放平台</span></div>
                <div>大模型语音交互开箱即用</div>
              </div>
              <div class="footer-bottom-right">
                <div class="footer-bottom-right-item">
                  <div>友情链接</div>
                  <div @click="() => goPage('https://dev.espai.fun/')">开放平台</div>
                  <div @click="() => goPage('https://www.aliyun.com/benefit')">阿里云</div>
                  <div @click="() => goPage('https://cloud.tencent.com/act/pro/warmup202506')">腾讯云</div>
                </div>
                <div class="footer-bottom-right-item">
                  <div>帮助</div>
                  <div
                    @click="() => goPage('https://espai.fun/guide/intro/')">
                    新手指引</div>
                  <div
                    @click="() => goPage('https://espai.fun/example/dev-use/')">
                    产品白皮书</div>
                </div>
                <div class="footer-bottom-right-item">
                  <div>用户中心</div>
                  <div
                    @click="() => goPage('https://dev.espai.fun/')">
                    应用管理</div>
                </div>
                <div class="footer-bottom-right-item">
                  <div>联系我们</div>
                  <div>开发者交流群：854445223、952051286</div>
                  <div>
                    商务技术支持：<p>18216811014 (小明)</p>  <p>15581856632 (陈灵均)</p> <p>15805875550 (王雷)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Layout>
</template>

<style>
.toy {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 64px;
  left: 0;
  overflow: auto;
  background: #fff;
  z-index: 10;
  scrollbar-width: thin;
}

.toy-banner {
  width: 100%;
  height: 500px;
  background: url('./images/banner.png') 50% no-repeat;
  background-size: cover;
}

.banner-text {
  color: #fff;
  height: 100%;
  margin: auto;
  max-width: 1200px;
}

.banner-text-title {
  color: #181818;
  font-family: PingFang SC, PingFang SC-Semibold;
  font-size: 48px;
  font-weight: 600;
  line-height: 48px;
  margin-bottom: 29px;
  padding-top: 148px;
}

.banner-text-content {
  color: #444;
  font-family: SourceHanSansSC-Regular, SourceHanSansSC;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  width: 570px;
  margin-bottom: 74px;
}

.banner-text-btn {
  background: #009bff;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  text-align: center;
  width: 140px;
}

.toy-video {
  background: url('./images/video_bg.jpg') 50% / cover no-repeat;
  margin-bottom: 40px;
  padding-bottom: 88px;
}

.toy-video-title {
  color: #333;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 30px !important;
  margin-top: 0 !important;
  text-align: center;
  padding-top: 80px;
}

.toy-video-player {
  width: 832px;
  height: 510px;
  margin: 68px auto 0;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}

.toy-video-player video {
  width: 100%;
  height: 100%;
}

.toy-scene {
  padding: 30px 0 84px;
  text-align: center;
}

.toy-scene-title {
  font-size: 40px;
  font-weight: 500;
  color: #333;
  margin-bottom: 30px !important;
  margin-top: 0 !important;
  text-align: center;
}

.toy-scene-tips {
  color: #666;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 60px !important;
  text-align: center;
}

.toy-scene-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 50px auto 0;
  width: 1200px;
}

.scene-content-item {
  background: url('./images/toys-border.png') 50% no-repeat;
  background-size: cover;
  color: #666;
  font-size: 18px;
  height: 370px;
  overflow: hidden;
  padding: 30px 20px 20px;
  position: relative;
  text-align: center;
  width: 280px;
  box-sizing: border-box;
}

.scene-content-item .toys {
  background: url('./images/toys1.png') 50% no-repeat;
  background-size: cover;
  bottom: 40px;
  height: 150px;
  left: 50%;
  position: absolute;
  translate: -50%;
  width: 190px;
}

.scene-content-item:nth-child(2) .toys {
  background: url('./images/toys2.png') 50% no-repeat;
  background-size: cover;
  height: 160px;
  width: 150px;
}

.scene-content-item:nth-child(3) .toys {
  background: url('./images/toys3.png') 50% no-repeat;
  background-size: cover;
  height: 208px;
  width: 155px;
}

.scene-content-item:nth-child(4) .toys {
  background: url('./images/toys4.png') 50% no-repeat;
  background-size: cover;
  height: 160px;
  width: 160px;
}

.toy-scheme {
  background: #eff7ff;
  margin-top: 55px;
  padding: 80px 0 82px;
  box-sizing: border-box;
}

.toy-scheme-content {
  margin: 0 auto;
  max-width: 1200px;
  overflow: hidden;
}

.scheme-content-title {
  color: #333;
  font-size: 40px;
  font-weight: 500;
  line-height: 44px;
  text-align: center;
  margin-bottom: 60px;
}

.scheme-content-item {
  padding: 29px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
}

.scheme-item-text1 {
  color: #000;
  font-size: 30px;
  font-weight: 600;
  min-width: 200px;
  position: relative;
  margin-bottom: 40px;
}

.scheme-item-text2 {
  height: 40px;
  display: flex;
  align-items: center;
  color: #36485d;
  font-size: 20px;
  font-weight: 400;
  white-space: nowrap;
}

.scheme-item-text2 i {
  background: url('./images/scheme-icon.png') 50% / contain no-repeat;
  display: inline-block;
  height: 30px;
  margin-right: 17px;
  width: 30px;
}

.scheme-item-image {
  background: url('./images/option1.png') 50% / contain no-repeat;
  cursor: pointer;
  height: 373px;
  position: relative;
  width: 527px;
}

.scheme-content-item:nth-child(3) .scheme-item-image {
  background: url('./images/option2.png') 50% / contain no-repeat;
}

.scheme-content-item:nth-child(4) .scheme-item-image {
  background: url('./images/option3.png') 50% / contain no-repeat;
}

.scheme-content-item:nth-child(5) .scheme-item-image {
  background: url('./images/option4.png') 50% / contain no-repeat;
}

.scheme-content-item:nth-child(6) .scheme-item-image {
  background: url('./images/option5.png') 50% / contain no-repeat;
}

.scheme-content-item:nth-child(7) .scheme-item-image {
  background: url('./images/option6.png') 50% / contain no-repeat;
}

.scheme-content-item:nth-child(8) .scheme-item-image {
  background: url('./images/option7.png') 50% / contain no-repeat;
}

.toy-access {
  background: url('./images/inter-bg.png') 50% no-repeat;
  background-size: cover;
  height: 622px;
  margin-top: 0;
  overflow: hidden;
  position: relative;
  color: #262626;
  padding: 30px 0 84px;
  text-align: center;
  box-sizing: border-box;
}

.toy-access h2 {
  font-size: 30px;
  font-weight: 700;
  line-height: 60px;
  margin: 0;
}

.toy-access-content {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 100px;
}

.access-content-item {
  background: url('./images/inter-border.png') 50% no-repeat;
  background-size: cover;
  height: 312px;
  margin-top: 30px;
  width: 470px;
}

.access-item-title {
  color: #fff;
  font-size: 24px;
  height: 30px;
  line-height: 50px;
  text-align: center;
}

.access-item-desc {
  color: #262b4f;
  font-size: 18px;
  margin: 50px 20px 30px;
  text-align: center;
}

.access-item-sdk {
  background: #f2f9ff;
  border-radius: 12px;
  color: #049bfd;
  cursor: pointer;
  font-weight: 400;
  height: 39px;
  line-height: 39px;
  margin: 0 auto;
  text-align: center;
  width: 423px;
}

.access-item-other {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.access-item-other div {
  background: #f2f9ff;
  border-radius: 14px;
  color: #049bfd;
  font-weight: 400;
  height: 39px;
  line-height: 39px;
  text-align: center;
  width: 200px;
}

.access-item-img {
  background: url('https://esp-ai2.oss-cn-beijing.aliyuncs.com/icon/%E5%AE%98%E6%96%B9%E5%9B%BA%E4%BB%B6/espai%E5%B8%A6%E5%B1%8F%E5%B9%95%E7%89%88%E6%9C%AC') 50% no-repeat;
  background-size: cover;
  cursor: pointer;
  height: 140px;
  margin: 30px auto;
  width: 160px;
}

.toy-consult {
  padding: 30px 0 84px;
  text-align: center;
  box-sizing: border-box;
}

.toy-consult h2 {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: 30px;
}

.toy-consult p {
  color: #999;
  font-size: 20px;
  margin-bottom: 30px;
}

.toy-consult-btn {
  background: linear-gradient(90deg, #26bff5, #1a7af6);
  border-radius: 60px 60px 60px 60px;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
  text-align: center;
  width: 163px;
}

.toy-footer {
  background: #f4f7ff;
}

.toy-footer-content {
  margin: auto;
  width: 1200px;
}

.footer-content-top {
  height: 145px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #bfc7d6;
}

.footer-content-item {
  display: flex;
  align-items: center;
}

.footer-content-item img {
  margin-right: 12px;
}

.footer-content-bottom {
  margin: 54px auto auto;
  display: flex;
  color: #8e90a5;
  font-size: 14px;
  height: 300px;
}

.footer-bottom-left {
  text-align: center;
}

.footer-bottom-left-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 500;
  color: #000;
  margin-bottom: 15px;
}

.footer-bottom-left img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}

.footer-bottom-right {
  display: flex;
  margin-left: 130px;
}

.footer-bottom-right-item {
  width: 210px;
}

.footer-bottom-right-item div {
  margin-bottom: 18px;
  cursor: pointer;
}

.footer-bottom-right-item div:nth-child(1) {
  color: #000;
  font-size: 18px;
  font-weight: 600;
  cursor: auto;
}
</style>