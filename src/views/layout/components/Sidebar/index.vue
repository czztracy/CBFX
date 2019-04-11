/*
 * @Page: 侧边主导航栏
 * @Author: cong
 * @Date: 2018-11-29 11:31:46
 * @Last Modified by: cong
 */
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" style="height:95%" class="musider">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :unique-opened="true"
      mode="vertical"
      text-color="#333"
      active-text-color="#fff"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.name"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss">
.el-menu-item.is-active {
  background: -webkit-linear-gradient(
    to right,
    #268ff9,
    #4ec2fc
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    to right,
    #268ff9,
    #4ec2fc
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    to right,
    #268ff9,
    #4ec2fc
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #268ff9, #4ec2fc); /* 标准的语法 */
  color: white;
  border-radius: 5px;
}
@media screen and (max-width: 1440px) {
  .musider{
    .el-submenu{
      .el-menu-item{
        padding-left: 33px !important;
        &>.svg-icon{
          margin-right: 4px !important;
        }
      }
      .el-submenu{
        .el-submenu__title{
          padding-left: 33px !important;
          &>.svg-icon{
            margin-right: 4px !important;
          }
        }
        .el-menu--inline{
          .el-menu-item{
            padding-left: 44px !important;
          }
        }
      }
    }
  }
}
</style>
