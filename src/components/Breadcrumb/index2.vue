/*
 * @Page: 面包屑
 * @Author: cong
 * @Date: 2018-11-30 16:44:27
 * @Last Modified by: cong
 */
<template>
  <div>
    <div v-if="levelList[0].meta.title != 'dashboard'">
      <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item
            v-for="(item,index) in levelList"
            v-if="item.meta.title"
            :key="item.path"
          >
            <span
              v-if="item.redirect==='noredirect'||index==levelList.length-1"
              class="no-redirect"
            >{{ generateTitle(item.meta.title) }}</span>
            <router-link v-else :to="item.redirect||item.path">{{ generateTitle(item.meta.title) }}</router-link>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
      <!-- <span
        ref="NavT"
        class="navbar-title"
      >{{ generateTitle(levelList[levelList.length-1].meta.title) }}</span> -->
    </div>
    <div v-else>
      <!-- <span class="navbar-title">{{ $t('dashboard.title') }}</span> -->
      <conditionOptions/>
    </div>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import pathToRegexp from 'path-to-regexp'
import conditionOptions from '@/views/dashboard/conditionOptions'
export default {
  components: {
    conditionOptions // 条件选择按钮
  },
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
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          var toPath = pathToRegexp.compile(item.path)
          item.path = toPath(params)
          return true
        }
      })
      const first = matched[0]
      if (
        first &&
        first.name.trim().toLocaleLowerCase() !==
        'Dashboard'.toLocaleLowerCase()
      ) {
        matched = [
          /* {
            path: '/dashboard',
            meta: { title: 'dashboard' }
          } */
        ].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  // line-height: 72px;
  margin-left: 45px;
  .no-redirect {
    color: #444;
    cursor: text;
  }
}
.el-menu--horizontal {
  border-bottom: 1px solid #d1d1d1;
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
</style>
