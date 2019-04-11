/*
 * @Page: 布局视图页面
 * @Author: csg
 * @Date: 2018-12
 * @Last Modified by: csg
 */
<template>
  <el-container style="height:100%">
    <el-header height="81px">
      <Toper/>
    </el-header>
    <el-container>
      <el-header style="height: 55px;">
        <FieldPageTop/>
      </el-header>
      <el-container>
        <el-aside
          style="border: 1px solid rgba(209, 209, 209, 1); border-bottom: 0; width: auto; min-width:280px;"
        >
          <Tree/>
        </el-aside>
        <el-main style="background: rgba(244, 244, 244, 1);">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import Toper from '@/components/Toper'
import Tree from '@/views/field/field'
import FieldPageTop from '@/views/fieldPage/components/FieldPage'
export default {
  name: 'FieldPage',
  components: {
    Toper,
    FieldPageTop,
    Tree
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
