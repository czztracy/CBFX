/*
 * @Page: 审核中和已审核模版查看弹窗
 * @Author: 孙中超
 * @Date: 2019-01-04 20:15:58
 * @Last Modified by: 孙中超
 */
<template>
  <el-dialog
    :visible.sync="templateDialog.dialogTableVisible"
    :title="$t('templateManager.approvedTemplates')"
    class="templateBox"
  >
    <!-- <div v-loading="loading" class="templateBox-con"> -->
    <!-- 已审核模版 -->
    <!-- <div class="show_head"> -->
    <!-- 模版编号 -->
    <!-- <span
          :title="templateDialog.gridData.templateId"
          class="head_left"
        >{{ $t('templateManager.moduleNumber') }}：{{ templateDialog.gridData.templateId }}</span> -->
    <!-- 创建时间 -->
    <!-- <span
          :title="templateDialog.gridData.createTime"
          class="head_center"
        >{{ $t('templateManager.creationTime') }}：{{ templateDialog.gridData.createTime }}</span> -->
    <!-- 模版名称 -->
    <!-- <span
          :title="templateDialog.gridData.templateName"
          class="head_right"
        >{{ $t('templateManager.moduleName') }}：{{ templateDialog.gridData.templateName }}</span>
      </div>
      <iframe ref="iframe" :src="src" @load="loading = false"/> -->
    <!-- </div> -->
    <div v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)" class="spreadContainer">
      <gc-spread-sheets
        :host-class="&quot;spreadHost&quot;"
        :style="visibility"
        @workbookInitialized="spreadInitHandle"/>
    </div>
  </el-dialog>
</template>

<script>
import '@grapecity/spread-sheets-vue'
import GC from '@grapecity/spread-sheets'
import { spread } from 'q'
import { iframeApi } from '@/utils/api'
import { templateList } from '@/api/modle'
export default {
  name: 'TemplateDialog',
  props: {
    templateDialog: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visibility: 'visibility:hidden',
      sheet1Name: '',
      tmpSaveJson: {},
      sheet1: {},
      loading: true,
      tabStripVisible: false, // 标签页显隐
      // 报价单的实例化spread
      Spread: {},
      src: iframeApi() + 'submit'
    }
  },
  watch: {
    'templateDialog.dialogTableVisible': function dialogTableVisible(val) {
      if (val === true) {
        this.src = iframeApi() + 'submit' + '?timestamp=' + new Date().getTime()
        window.sessionStorage.setItem('liziData', JSON.stringify({ templateId: this.templateDialog.gridData.templateId }))
        // this.src = iframeApi() + 'submit' + '?' + Qs.stringify({ templateId: this.templateDialog.gridData.templateId })
        // console.log('this.src', this.src)
        // console.log(this.templateDialog.gridData.templateId, 'id')
        this.templateList(this.templateDialog.gridData.templateId)
      } else {
        this.tmpSaveJson = {}
        this.Spread.fromJSON({})
      }
    },
    tmpSaveJson: function tmpSaveJson(val) {
      if (JSON.stringify(val) !== '{}') {
        this.visibility = 'visibility:visible'
      } else {
        this.visibility = 'visibility:hidden'
      }
    }
    // templateDialog: {
    //   handler(newVal, oldVal) {
    //     if (newVal.dialogTableVisible) {
    //       this.src = iframeApi() + 'submit' + '?timestamp=' + new Date().getTime()
    //       window.sessionStorage.setItem('liziData', JSON.stringify({ templateId: this.templateDialog.gridData.templateId }))
    //       // this.src = iframeApi() + 'submit' + '?' + Qs.stringify({ templateId: this.templateDialog.gridData.templateId })
    //       // console.log('this.src', this.src)
    //       // console.log(this.templateDialog.gridData.templateId, 'id')
    //       this.templateList(this.templateDialog.gridData.templateId)
    //     } else {
    //       // this.Spread.fromJSON({})
    //     }
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.$nextTick(() => {
      // this.Spread.options.tabStripVisible = false
    })
  },
  methods: {
    // 插件初始化
    spreadInitHandle(spread) {
      this.Spread = spread
      // this.Spread.options.newTabVisible = false
      // var menuData = spread.contextMenu.menuData
    },
    // 获取模板json
    templateList(templateId) {
      this.loading = true
      const params = { templateId }
      templateList(params).then(res => {
        this.loading = false
        // console.log(JSON.parse(res.resultData.templateScript), 999)
        if (res.resultData.templateScript) {
          this.Spread.fromJSON(JSON.parse(res.resultData.templateScript))
          this.tmpSaveJson = JSON.parse(res.resultData.templateScript)
        }
        // 第一个表区不可编辑
        // var sheet1 = {}
        this.sheet1 = this.Spread.getSheet(0)
        this.sheet1Name = res.resultData.templateName
        this.sheet1.options.isProtected = true // 锁表
        this.Spread.options.newTabVisible = false // 隐藏new
        this.Spread.options.allowContextMenu = false // 隐藏右键菜单
        // 无tables的json处理
        if (!this.tmpSaveJson.sheets[this.sheet1Name].tables) {
          const hiddenSheet = this.Spread.getSheetFromName('hideSheet')
          if (hiddenSheet) {
            const tableTotal = JSON.parse(hiddenSheet.getValue(0, 0))
            this.dummyTables = this.tagToTables(this.reconsitutionTag(tableTotal))
            this.tmpSaveJson.sheets[this.sheet1Name].tables = this.dummyTables
            console.log(this.tmpSaveJson, 'new this.tmpSaveJson')
          } else {
            console.log('该json无tables属性')
            return
          }
        }
        this.removeInvalidRowsCol()
      }).catch(err => {
        console.log(err)
      })
    },
    removeInvalidRowsCol() {
      const tmpSaveJson = this.tmpSaveJson.sheets[this.sheet1Name]
      const rowTotal = this.sheet1.getRowCount()
      const lastTable = tmpSaveJson.tables[tmpSaveJson.tables.length - 1]
      const lastBegin = lastTable.row + lastTable.rowCount + 20
      if (rowTotal > lastBegin) {
        this.sheet1.deleteRows(lastBegin, rowTotal - lastBegin)
      }
      this.Spread.options.grayAreaBackColor = '#FFFFFF'
      // 超出不滚动
      this.Spread.options.scrollbarMaxAlign = true
      // 不显示列头
      this.Spread.options.ColumnHeaderVisible = false
      // 禁止缩放
      this.Spread.options.allowUserZoom = false
      var sheet = this.Spread.getActiveSheet()
      // sheet.setColumnHeaderVisible(false)sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader);//隐藏行号
      // sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader)// 隐藏列号
      sheet.options.gridline = { showHorizontalGridline: false, showVerticalGridline: false }// 水平线。垂直线
    },
    // 将tag集合转换成tables集合
    tagToTables(tableTotal) {
      const tables = []
      console.log(tableTotal, 'tagToTables(tableTotal)')
      tableTotal.forEach((element, index) => {
        const activeCount = tableTotal[index + 1] ? tableTotal[index + 1][0].row - element[0].row : 2
        const tableDemo = {
          col: element[0].col,
          colCount: element.length,
          row: element[0].row,
          rowCount: activeCount,
          columns: []
        }
        element.forEach(ele => {
          const columns = {
            name: ele.name
          }
          tableDemo.columns.push(columns)
        })
        tables.push(tableDemo)
      })
      console.log(tables, 'tables')
      return tables
    },
    // 重构tag 优化tables结构+去除不必要的父级,补全合并的表头单元格
    reconsitutionTag(tableTotal) {
      const colBegin = tableTotal[0][0].col
      tableTotal.forEach(element => {
        if (element[0].col !== colBegin) {
          const addEnd = element[0].col - colBegin
          const addCol = element[0].col
          for (let i = 0; i < addEnd; i++) {
            element.unshift({
              row: element[0].row,
              col: addCol - i - 1,
              logicalAccess: '',
              name: 'column'
            })
          }
        }
      })
      return tableTotal
    }
  }
}
</script>

<style lang="scss" scoped>
// 表格样式
  .spreadContainer {
    padding: 10px;
    // box-shadow: 0 0 20px grey;
  }
  .spreadContainer{
    position: absolute;
    left: 0px;
    right: 0;
    top: 65px;
    bottom: 10px;
  }
  .spreadHost{
    width: 100%;
    height: 100%;
  }
</style>

<style>
.templateBox .el-dialog {
  height: 80%;
  width: 85%;
}
.templateBox .el-dialog__header {
  background: -webkit-linear-gradient(
    360deg,
    #1990ea,
    #2ea1f8
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    360deg,
    #1990ea,
    #2ea1f8
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    360deg,
    #1990ea,
    #2ea1f8
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(360deg, #1990ea, #2ea1f8);
  /* 标准的语法 */
}
.templateBox .el-dialog__title,
.templateBox .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
</style>
