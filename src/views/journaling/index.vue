/*
 * @Page: 报表中心->数据导出布局页
 * @Author: cong
 * @Date: 2018-12-11 14:20:34
 * @Last Modified by: cong
 */

<template>
  <el-container style="height:100%">
    <el-header height="81px">
      <Toper/>
    </el-header>
    <el-container>
      <el-header height="54px">
        <Navtop/>
      </el-header>
      <el-container>
        <router-view/>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import Toper from '@/components/Toper'
import Navtop from '@/components/NavTop'
export default {
  name: 'Dataexport',
  components: {
    Toper,
    Navtop
  },
  data() {
    return {}
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
