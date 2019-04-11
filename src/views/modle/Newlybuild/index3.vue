/*
  * @Page: 创建模板无table
  * @Author: cls
  * @Date: 2019-4-2
  * @Last Modified by: cls
  */
<template>
  <div>
    <div class="iframeBox">
      <iframe id="myIframe" ref="myIframe" :src="userData" frameborder="0"/>
    </div>
  </div>
</template>

<script>
import { iframeApi } from '@/utils/api'
import { addTheClock, closeClock } from '@/utils/continueTime'
export default {
  data() {
    return {
      // iframe地址
      // userData: 'http://127.0.0.1:5500/SpreadJS/SpreadJS/src/index/index.html?'
      userData: '',
      createModleTime: 0,
      activetime: 0
    }
  },
  watch: {
  },
  created() {
    this.userData = iframeApi()
    // this.iframeUser()
    if (sessionStorage.getItem('noTables')) {
      this.userData = sessionStorage.getItem('noTables') + '&notable=9'
    } else {
      this.$message.warning('请先去模板管理页 点击创建模板！')
    }
    this.createModleTime = (new Date()).getTime()
    this.activetime = (new Date()).getTime()
    sessionStorage.setItem('activetime', this.activetime)
    // 共用计时器
    addTheClock(this.activetime, this.createModleTime)
    // 页面刷新时删除模板信息
    window.addEventListener('beforeunload', e => {
      window.sessionStorage.removeItem('jsonStr')
      window.sessionStorage.removeItem('checkedStatus')
      window.sessionStorage.removeItem('fieldLogicAcquisition')
      window.sessionStorage.removeItem('fieldName')
      window.sessionStorage.removeItem('fieldSelect')
      window.sessionStorage.removeItem('citySel')
    })
  },
  mounted() {
    // page：1 新建 ; page: 2 编辑
    // window.localStorage.setItem('userData', JSON.stringify(this.$route.query))
    this.$nextTick(() => {
      window.onbeforeunload = function() { return '确定要离开吗？' }
      window.addEventListener('message', function(e) {
        const data = e.data
        if (data.overtime && typeof data.overtime === 'string') {
          sessionStorage.setItem('overtime', data.overtime)
        }
      }, false)
    })
    // Eventbus.$on('autoMessage', (autoMessage) => {
    //   console.log(1222, autoMessage)
    // })
  },
  beforeDestroy() {
    window.removeEventListener('message', function(e) {
      const data = e.data
      if (data.overtime && typeof data.overtime === 'string') {
        sessionStorage.setItem('overtime', data.overtime)
      }
    }, false)
  },
  destroyed() {
    closeClock()
  },
  methods: {
    // iframe地址传参
    iframeUser() {
      this.userData += 'templateClassId=SC0002&templateId=HR19040383248598220800&templateVersionId=HR19040383248633872384&templateName=测试去table42&page=2&'
      //   Object.keys(this.$route.query).forEach(element => {
      //     this.userData += element + '=' + this.$route.query[element] + '&'
      //   })
      this.userData += 'ticket=' + window.sessionStorage.getItem('ticket')
      let getparent = 1
      if (window.location.href.indexOf('localhost:9528') !== -1) {
        getparent = 2
      } else if (window.location.href.indexOf('47.104.98.71:18780') !== -1) {
        getparent = 3
      } else if (window.location.href.indexOf('47.104.98.71/') !== -1) {
        getparent = 4
      } else if (window.location.href.indexOf('dev.fineway.com:18780') !== -1) {
        getparent = 5
      }
      this.userData += '&getparent=' + getparent + '&overtime=' + encodeURIComponent(window.sessionStorage.getItem('overtime'))
      console.log('getparent', this.userData)
    }
  }
}
</script>

<style>
.iframeBox {
  min-width: 700px;
  height: 100%;
  padding: 18px;
  /* padding-bottom: 20px; */
  text-align: center;
}
.iframeBox #myIframe {
  width: 100%;
  height: 764px;
  box-shadow: 0 0 20px grey;
}
</style>
