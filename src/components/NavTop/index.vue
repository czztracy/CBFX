/*
 * @Page: 模板头部导航
 * @Author: cong
 * @Date: 2018-11-30 16:44:27
 * @Last Modified by: cong
 */
<template>
  <div class="MultiPageTop">
    <el-button icon="el-icon-arrow-left" @click="goback"/>
    <!-- <span
      ref="NavT"
      class="navbar-title"
    >{{ generateTitle(levelList[levelList.length-1].meta.title) }}</span> -->
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
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
  mounted() {
    // console.log(this.$store.getters.language)
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
      this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.MultiPageTop {
  position: relative;
  height: 54px;
  border: 1px solid rgba(209, 209, 209, 1);
  .el-button {
    height: 100%;
    border: none;
  }
  .navbar-title {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #004ea1;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
