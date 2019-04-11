/*
 * @Page: 模板管理->模版编辑布局页
 * @Author: cong
 * @Date: 2018-12-04 09:58:00
 * @Last Modified by: cong
 */
<template>
  <el-container v-loading="loading1.loading" style="height:100%">
    <el-aside style="border: 1px solid rgba(209, 209, 209, 1); border-bottom: 0; width: auto; min-width:280px;">
      <!-- <el-aside style="width:auto;min-width:16.56%;border: 1px solid rgba(209, 209, 209, 1); border-bottom: 0;"> -->
      <Tree :loading1= "loading1" @targetData = "changeList"/>
    </el-aside>
    <el-main>
      <router-view :loading1= "loading1" :targetdata="targetdata"/>
    </el-main>
  </el-container>
</template>
<script>
import Language from '@/utils/language'
import Tree from '@/views/modle/components/tree'
export default {
  name: 'Edit',
  components: {
    Tree
  },
  mixins: [Language],
  data() {
    return {
      loading1: {
        loading: true,
        count: 0
      },
      targetdata: {}
    }
  },
  created() {
    // 取消浏览器默认右键
    document.oncontextmenu = function() {
      return false
    }
  },
  destroyed() {
    // 恢复浏览器默认右键
    document.oncontextmenu = function() {
      return true
    }
  },
  methods: {
    changeList(data) {
      this.targetdata = data
      // console.log('targetdata', this.targetdata)
    }
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
}
</style>
