/*
 * @Page: 面包屑
 * @Author: cong
 * @Date: 2018-11-30 16:44:27
 * @Last Modified by: cong
 */
<template>
  <div>
    <div v-if="levelList[0].meta.title != 'dashboard'" class="tab">
      <el-tabs v-model="editableTabsValue" :editable="tabList.length>1" type="card" @edit="handleTabsEdit">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.path"
          :name="item.title"
          :label="generateTitle(item.title)"
        >
          <router-link slot="label" :to="item.redirect||item.path">{{ generateTitle(item.title) }}</router-link>
        </el-tab-pane>
      </el-tabs>
      <span class="navbar-title">{{ generateTitle(editableTabsValue) }}</span>
    </div>
    <div v-else>
      <span class="navbar-title">{{ $t('dashboard.title') }}</span>
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
    conditionOptions
  },
  data() {
    return {
      levelList: null,
      tabList: null,
      editableTabsValue: '',
      test: ''
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
    // sessionStorage.setItem('pageCollect', localStorage.getItem('pageCollect'))
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
      // debugger
      // console.log(matched, 454545)
      this.levelList = matched
      this.editableTabsValue = matched[matched.length - 1].meta.title
      const pageCollect = JSON.parse(localStorage.getItem('pageCollect'))
      const index = JSON.parse(sessionStorage.getItem('pagesign')).indexOf(matched[0].name)
      const judge = pageCollect[index].some((item) => { return item.title === matched[matched.length - 1].meta.title })
      if (!judge) {
        pageCollect[index].push({
          path: matched[matched.length - 1].path,
          title: matched[matched.length - 1].meta.title,
          position: index,
          redirect: matched[matched.length - 1].redirect
        })
      }
      this.tabList = pageCollect[index]
      // localStorage.setItem('tabList', JSON.stringify(this.tabList))
      localStorage.setItem('pageCollect', JSON.stringify(pageCollect))
      // 导航切换修改
      // const FieldLibrary = JSON.parse(sessionStorage.getItem('FieldLibrary')) // 字段库路由跳转参数
      // for (const i in this.tabList) {
      //   if (this.tabList[i].path === '/field/fieldMsgList') {
      //     // this.tabList[i].path = '/field/fieldMsgList?fieldId=' + FieldLibrary.fieldId + '&fieldClassId=' + FieldLibrary.fieldClassId + '&name=' + FieldLibrary.name + '&state=' + FieldLibrary.state + '&type=' + FieldLibrary.type + '&way=' + FieldLibrary.way + '&message=' + FieldLibrary.message + '&computingMode=' + FieldLibrary.computingMode + '&logicAcquisition=' + FieldLibrary.logicAcquisition + '&group=' + FieldLibrary.group
      //     this.tabList[i].path = '/field/index'
      //   }
      // }
      // console.log(this.tabList, 66)
      // console.log(sessionStorage.getItem('FieldLibrary'), 77)
    },
    // 点击 tabs 的新增按钮或 tab 被关闭后触发
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        const tabs = this.tabList
        // console.log(this.tabList, '当前tab')
        let activeName = this.editableTabsValue
        let nextTab = null
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.title === targetName) {
              nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.title
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.tabList = tabs.filter(tab => tab.title !== targetName)
        const pageCollect = JSON.parse(localStorage.getItem('pageCollect'))
        pageCollect[this.tabList[0].position] = this.tabList
        // console.log(this.tabList, '删除后tab')
        localStorage.setItem('pageCollect', JSON.stringify(pageCollect))
        if (nextTab) {
          this.$router.push(nextTab.path)
        }
      }
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
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable{
  padding: 0px 5px
}
</style>
