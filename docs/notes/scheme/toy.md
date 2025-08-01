---
title: toy
createTime: 2025/08/01 14:51:15
permalink: /scheme/toy/
---

<div v-html="htmlContent"></div>

<script>
export default {
  data() {
    return {
      htmlContent: '',
    }
  },
  mounted() {
    fetch('/scheme/toy/index.html').then(response => { return response.text() }).then(html => {
      this.htmlContent = html
    })
  }
}
</script>