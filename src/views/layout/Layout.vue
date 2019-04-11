/*
 * @Page: 页面布局页
 * @Author: cong
 * @Date: 2018-11-29 11:03:03
 * @Last Modified by: cong
 */
<template>
  <el-container style="height:100%">
    <!-- <el-header height="63px">
    <Toper/>-->
    <el-header height="81px">
      <Toper/>
    </el-header>
    <el-container v-if="showBool">
      <el-aside ref="aside" width="auto">
        <div class="aside-head">
          <span v-show="sidebar.opened">{{ $t('pageBody.txtcatalog') }}</span>
          <hamburger
            :toggle-click="toggleSideBar"
            :class="{isOpen:sidebar.opened}"
            :is-active="sidebar.opened"
            class="hamburger-container"
          />
        </div>
        <div class="aside-con">
          <div :class="classObj" class="app-wrapper">
            <div v-if="device==='mobile'&&sidebar.opened" @click="handleClickOutside"/>
            <sidebar class="sidebar-container"/>
          </div>
        </div>
      </el-aside>
      <el-container>
        <!-- <el-header height="72px">
          <navbar />
        </el-header>-->
        <el-main>
          <div class="main-container">
            <navbar/>
            <app-main/>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <Field v-else/>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'
import Field from '@/views/field/field'
import ResizeMixin from './mixin/ResizeHandler'
import Toper from '@/components/Toper'
import Hamburger from '@/components/Hamburger'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Hamburger,
    Toper,
    Field
  },
  mixins: [ResizeMixin],
  data() {
    return {
      showBool: true
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
        // mobile: this.device === 'mobile'
      }
    },
    BOOL() {
      return this.$store.getters.fieBool
    }
  },
  watch: {
    hiddener() {
      console.log(this.isHide)
    },
    BOOL(val) {
      console.log(val)
      this.showBool = val
    },
    local(val) {
      this.Wbool = val
    }
  },
  mounted() {
    // this.bool = sessionStorage.setItem('fieldBOOL', true)
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
      // 渲染报价单表区
      this.$store.dispatch('setGC')
    },
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.el-header {
  padding: 0;
  z-index: 3000;
}
.el-aside {
  border: 1px solid #d1d1d1;
  box-shadow: 6px 0 25px 0 rgba(0, 0, 0, 0.16);
  z-index: 10;
  overflow: hidden;
  .aside-head {
    text-align: center;
    position: relative;
    @include clearfix;
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #cecece;
    span {
      display: inline-block;
      font-size: 22px;
      color: #4a4a4a;
      font-weight: 500;
    }
    .isOpen {
      float: right;
      margin-right: 19px;
    }
    .hamburger-container {
      line-height: 62px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .aside-con {
    margin: 9px 19px auto 19px;
    height: 90%;
  }
}
.el-main {
  padding: 0;
}
@media screen and (max-width: 1440px) {
  .el-aside {
    border: 1px solid #d1d1d1;
    box-shadow: 6px 0 25px 0 rgba(0, 0, 0, 0.16);
    z-index: 10;
    overflow: hidden;
    .aside-head {
      text-align: center;
      position: relative;
      @include clearfix;
      height: 54px;
      line-height: 54px;
      border-bottom: 1px solid #cecece;
      span {
        display: inline-block;
        font-size: 17px;
        color: #4a4a4a;
        font-weight: 500;
      }
      .isOpen {
        float: right;
        margin-right: 19px;
      }
    }
    .aside-con {
      margin: 9px 17px auto 17px;
      height: 90%;
    }
  }
}
</style>
