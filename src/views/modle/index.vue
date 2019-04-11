/*
 * @Page: 模板管理-总页面布局
 * @Author: cong
 * @Date: 2018-12-04 09:58:00
 * @Last Modified by: cong
 */
<template>
  <el-container style="height:100%">
    <el-header height="81px">
      <Toper/>
    </el-header>
    <el-container style="height:100%">
      <el-header height="54px">
        <div class="MultiPageTop">
          <el-button icon="el-icon-arrow-left" @click="goback"/>
          <!-- <span
      ref="NavT"
      class="navbar-title"
    >{{ generateTitle(levelList[levelList.length-1].meta.title) }}</span> -->
        </div>
      </el-header>
      <router-view/>
    </el-container>
  </el-container>
</template>
<script>
import Toper from '@/components/Toper'
import Navtop from '@/components/NavTop'
import { generateTitle } from '@/utils/i18n'
import pathToRegexp from 'path-to-regexp'
export default {
  name: 'Modle',
  components: {
    Toper,
    Navtop
  },
  data() {
    return {}
  },
  computed: {
    getLanguage() {
      return this.$store.getters.language
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
    getLanguage(val) {
      // console.log(val)
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      const { params } = this.$route
      this.levelList = this.$route.matched.filter(item => {
        if (item.name) {
          var toPath = pathToRegexp.compile(item.path)
          item.path = toPath(params)
          return true
        }
      })
    },
    goback() {
      var url = window.location.href
      if (url.indexOf('/modle/examine') !== -1) {
        this.$router.push({ name: 'Dashboard' })
      }
      if (url.indexOf('modle/Review') !== -1) {
        this.$router.push({ name: 'Examine' })
      }
      if (url.indexOf('modle/edit/editcon') !== -1) {
        this.$router.push({ name: 'Dashboard' })
      }
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
