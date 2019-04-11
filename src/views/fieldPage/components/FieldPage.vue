/*
 * @Page: 布局视图页面-页面标题
 * @Author: csg
 * @Date: 2018-11
 * @Last Modified by: csg
 */
<template>
  <div class="headerBox" @contextmenu.prevent="a">
    <i class="el-icon-arrow-left left" @click="handleGoback"/>
    {{ generateTitle(levelList[levelList.length-1].meta.title) }}
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
    // 返回上一页
    handleGoback() {
      console.log('回到首页！')
      this.$router.push({
        path: '/'
      })
    },
    // 鼠标右击
    a() {
      console.log(1111111)
    }
  }
}
</script>

<style rel="stylesheet/scss">
.headerBox {
  overflow: hidden;
  min-height: 55px;
  line-height: 55px;
  color: #004ea1;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(209, 209, 209, 1);
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border-top: 0;
}
.headerBox .left {
  float: left;
  margin-left: 28px;
  line-height: 55px;
  color: rgba(51, 51, 51, 1);
  font-weight: 600;
}
.headerBox .left:hover {
  cursor: pointer;
}
</style>
