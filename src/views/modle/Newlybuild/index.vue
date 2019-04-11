<template>
  <div v-loading="loading">
    <iframe id="myIframe" ref="myIframe" :src="src" @load="loading = false"/>
  </div>
  <!-- <div>新建页面</div> -->
</template>
<script>
import { iframeApi } from '@/utils/api'
export default {
  name: 'Newlybuild',
  data() {
    return {
      src: iframeApi() + 'Newlybuild' + '?timestamp=' + new Date().getTime(),
      // src: 'http://47.104.98.71/tableTemplate/index.html#/table',
      // src: window.location.origin + '/tableTemplate/index.html#/table/' + 'Newlybuild' + '?timestamp=' + new Date().getTime(),
      loading: true
    }
  },
  mounted() {
    // page：1 新建 ; page: 2 编辑
    // console.log(this.src)
    window.sessionStorage.setItem('userData', JSON.stringify(this.$route.params))
    window.onbeforeunload = function() { return '确定要离开吗？' }
  }
}
</script>

<style scoped>
iframe {
  width: 100%;
  height: calc(100vh - 140px);
  border: none;
}
</style>
