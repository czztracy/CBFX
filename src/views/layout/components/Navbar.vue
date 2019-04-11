/*
 * @Page: 内容主题部分-头部
 * @Author: cong
 * @Date: 2018-11-30 16:45:39
 * @Last Modified by: cong
 */
<template>
  <el-menu class="navbar" mode="horizontal">
    <breadcrumb />
    <!-- <span class="navbar-title">{{ $t('dashboard.title') }}</span> -->
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { removeToken } from '@/utils/auth'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import LangSelect from '@/components/LangSelect'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })
      removeToken()
      this.$nextTick(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 55px;
  line-height: 55px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 55px;
    height: 55px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}

</style>

