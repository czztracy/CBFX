<template>
  <div v-loading="loading">
    <iframe id="myIframe" ref="myIframe" :src="src" @load="loading = false"/>
  </div>
  <!-- <div>编辑模板页面</div> -->
</template>
<script>
import { iframeApi } from '@/utils/api'
export default {
  name: 'Newlybuild',
  data() {
    return {
      src: iframeApi() + 'Newlybuild' + '?timestamp=' + new Date().getTime(),
      // src: 'http://115.28.57.244/temp/#/Newlybuild',
      // src: 'http://10.190.49.41:8080/',
      loading: true
    }
  },
  mounted() {
    // page：1 新建 ; page: 2 编辑
    window.sessionStorage.setItem('userData', JSON.stringify(this.$route.params))
  }
}
</script>

<style scoped>
iframe {
  width: 100%;
  min-height: calc(100vh - 135px);
  border: none;
}
</style>
