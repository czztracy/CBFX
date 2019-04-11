/*
 * @Page: 报价单详情查看弹窗
 * @Author: 孙中超
 * @Date: 2019-01-04 20:15:00
 * @Last Modified by: 孙中超
 */
<template>
  <el-dialog
    :visible.sync="seeDialog.dialogTableVisible"
    :title="$t('specialNumberDimension.history')"
    class="seeBox"
  >
    <div v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)" class="spreadContainer">
      <div class="show_head">
        <!-- 报价单号 -->
        <!-- <span :title="seeDialog.gridData.reportId" class="head_left">
          {{ $t('bidManagement.quotationNumber') }}：{{ seeDialog.gridData.reportId }}
        </span>-->
        <!-- 上报日期 -->
        <span
          :style="visibility"
          :title="seeDialog.gridData.reportDate"
          class="head_center"
        >{{ $t('bidManagement.reportDate') }}：{{ seeDialog.gridData.reportDate }}</span>
        <!-- 供应商名称 -->
        <!-- <span class = "head_right">
          {{ $t('Neednumberdimension.Suppliername') }}：北京方位
        </span>-->
      </div>
      <!-- 历史报价单iframe -->
      <!-- <iframe ref="myIframe" :src="src" @load="loading = false"/> -->
      <gc-spread-sheets
        :style="visibility"
        :new-tab-visible="newTabVisible"
        :tab-strip-visible="tabStripVisible"
        :host-class="&quot;spreadHost&quot;"
        :show-horizontal-scrollbar="showHorizontalScrollbar"
        @workbookInitialized="spreadInitHandle"/>
    </div>
  </el-dialog>
</template>

<script>
// import Qs from 'qs'
import { sheetAudit } from '@/api/modle'
import { mapGetters } from 'vuex'
import { iframeApi } from '@/utils/api'
import { judgeUrl } from '@/utils/api'
export default {
  name: 'SeeDialog',
  props: {
    seeDialog: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visibility: 'visibility:hidden',
      src: iframeApi() + 'submit',
      sheet1Name: '',
      tmpSaveJson: {},
      sheet1: {},
      showHorizontalScrollbar: false, // 横向滚动条
      loading: true,
      newTabVisible: false, // 显示 new 标签页
      tabStripVisible: false, // 标签页显隐
      // 报价单的实例化spread
      Spread: {}
    }
  },
  computed: {
    ...mapGetters(['company', 'loginName'])
  },
  watch: {
    // seeDialog: {
    //   handler(newVal, oldVal) {
    //     if (newVal.dialogTableVisible === true) {
    //       if (judgeUrl() !== '002') {
    //         if (this.seeDialog.gridData.reportCheckId === undefined || this.seeDialog.gridData.reportCheckId !== '') {
    //           window.sessionStorage.setItem('liziData', JSON.stringify({ supplierCode: this.loginName, resultDate: this.seeDialog.gridData.resultDate, reportVersionId: this.seeDialog.gridData.reportVersionId }))
    //           this.src = iframeApi() + 'submit' + '?timestamp=' + new Date().getTime()
    //         } else {
    //           window.sessionStorage.setItem('liziData', JSON.stringify({ reportCheckId: this.seeDialog.gridData.reportCheckId, supplierCode: this.loginName, resultDate: this.seeDialog.gridData.resultDate }))
    //           this.src = iframeApi() + 'submit' + '?timestamp=' + new Date().getTime()
    //         }
    //       } else {
    //         if (this.seeDialog.gridData.reportCheckId === undefined || this.seeDialog.gridData.reportCheckId !== '') {
    //           window.sessionStorage.setItem('liziData', JSON.stringify({ resultDate: this.seeDialog.gridData.resultDate, reportVersionId: this.seeDialog.gridData.reportVersionId }))
    //           this.src = iframeApi() + 'submit' + '?timestamp=' + new Date().getTime()
    //         } else {
    //           window.sessionStorage.setItem('liziData', JSON.stringify({ reportCheckId: this.seeDialog.gridData.reportCheckId, resultDate: this.seeDialog.gridData.resultDate }))
    //           this.src = iframeApi() + 'submit' + '?timestamp=' + new Date().getTime()
    //         }
    //       }
    //       // console.log('this.src', this.src, this.seeDialog.gridData.reportCheckId)
    //     }
    //   },
    //   deep: true
    // }
    'seeDialog.dialogTableVisible': function dialogTableVisible(val) {
      if (val === true) {
        // console.log(2222, this.seeDialog)
        // if (judgeUrl() !== '002') {
        //   if (this.seeDialog.gridData.reportCheckId === undefined || this.seeDialog.gridData.reportCheckId === '') {
        //     window.sessionStorage.setItem('liziData', JSON.stringify({ supplierCode: this.loginName, resultDate: this.seeDialog.gridData.resultDate, reportVersionId: this.seeDialog.gridData.reportVersionId }))
        //     this.src = iframeApi() + 'submit' + '?timestamp=' + new Date().getTime()
        //   } else {
        //     window.sessionStorage.setItem('liziData', JSON.stringify({ reportCheckId: this.seeDialog.gridData.reportCheckId, supplierCode: this.loginName, resultDate: this.seeDialog.gridData.resultDate }))
        //     this.src = iframeApi() + 'submit' + '?timestamp=' + new Date().getTime()
        //   }
        // } else {
        //   if (this.seeDialog.gridData.reportCheckId === undefined || this.seeDialog.gridData.reportCheckId === '') {
        //     window.sessionStorage.setItem('liziData', JSON.stringify({ resultDate: this.seeDialog.gridData.resultDate, reportVersionId: this.seeDialog.gridData.reportVersionId }))
        //     this.src = iframeApi() + 'submit' + '?timestamp=' + new Date().getTime()
        //   } else {
        //     window.sessionStorage.setItem('liziData', JSON.stringify({ reportCheckId: this.seeDialog.gridData.reportCheckId, resultDate: this.seeDialog.gridData.resultDate }))
        //     this.src = iframeApi() + 'submit' + '?timestamp=' + new Date().getTime()
        //   }
        // }
        // console.log('this.src', this.src, this.seeDialog.gridData.reportCheckId)
        // if (this.seeDialog.gridData.reportCheckId && this.seeDialog.gridData.resultDate) {
        //   this.sheetAudit(this.seeDialog.gridData.reportCheckId, this.seeDialog.gridData.resultDate)
        // } else {
        //   this.$message({
        //     type: 'error',
        //     message: '请重试！'
        //   })
        // }
        if (judgeUrl() !== '002') {
          if (this.seeDialog.gridData.reportCheckId === undefined || this.seeDialog.gridData.reportCheckId === '') {
            this.sheetAudit2(this.seeDialog.gridData.reportVersionId, this.seeDialog.gridData.resultDate)
          } else {
            this.sheetAudit(this.seeDialog.gridData.reportCheckId, this.seeDialog.gridData.resultDate)
          }
        } else {
          if (this.seeDialog.gridData.reportCheckId === undefined || this.seeDialog.gridData.reportCheckId === '') {
            this.sheetAudit2(this.seeDialog.gridData.reportVersionId, this.seeDialog.gridData.resultDate)
          } else {
            this.sheetAudit(this.seeDialog.gridData.reportCheckId, this.seeDialog.gridData.resultDate)
          }
        }
      } else {
        // 弹窗关闭时清空
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
  },
  mounted() {
    // console.log(this.seeDialog.gridData)
  },
  methods: {
    // 插件初始化
    spreadInitHandle(spread) {
      this.Spread = spread
      spread.options.tabStripVisible = false
      // console.log(spread.options.tabStripVisible, 99)
    },
    // 获取当前报价单json
    sheetAudit(reportCheckId, resultDate) {
      this.loading = true
      const params = { reportCheckId, resultDate }
      sheetAudit(params).then(res => {
        this.loading = false
        // console.log(JSON.parse(res.resultData.reportScript), '当前表区json')
        if (res.resultData.reportScript) {
          this.Spread.fromJSON(JSON.parse(res.resultData.reportScript))
          this.tmpSaveJson = JSON.parse(res.resultData.reportScript)
        }
        // 第一个表区不可编辑
        // var sheet1 = {}
        this.sheet1 = this.Spread.getSheet(0)
        // Object.keys(this.tmpSaveJson.sheets).some((element) => {
        //   if (this.tmpSaveJson.sheets[element].index === 0) {
        //     this.sheet1Name = element
        //     return true
        //   }
        // })
        // this.removeInvalidRowsCol()
        this.sheet1.options.isProtected = true
        this.Spread.options.newTabVisible = false // 隐藏new
        this.Spread.options.allowContextMenu = false // 隐藏右键菜单
        // this.Spread.options.showHorizontalScrollbar = false
        this.Spread.options.showVerticalScrollbar = false
      }).catch(err => {
        console.log(err)
      })
    },
    removeInvalidRowsCol() {
      const tmpSaveJson = this.tmpSaveJson.sheets[this.sheet1Name]
      const rowTotal = this.sheet1.getRowCount()
      const lastTable = tmpSaveJson.tables[tmpSaveJson.tables.length - 1]
      const lastBegin = lastTable.row + lastTable.rowCount
      const rightBegin = lastTable.col + lastTable.colCount
      const rightCount = this.sheet1.getColumnCount() - rightBegin
      let lastEnd = 0
      for (let i = lastBegin; i < rowTotal; i++) {
        if (this.sheet1.getValue(i, lastTable.col) === null || this.sheet1.getValue(i, lastTable.col) === '') {
          lastEnd = i
          break
        }
      }
      const EndLength = rowTotal - lastEnd
      if (EndLength > 0) {
      // 删除表尾多余行
        this.sheet1.deleteRows(lastEnd, EndLength)
      }
      if (tmpSaveJson.tables[0].row !== 0) {
      // 删除表头多余行
        let begintable = 0
        for (let i = tmpSaveJson.tables[0].row - 1; i >= 0; i--) {
          if (this.sheet1.getValue(i, lastTable.col) === null || this.sheet1.getValue(i, lastTable.col) === '') {
            begintable = i
            break
          }
        }
        this.sheet1.deleteRows(0, begintable + 1)
      }
      if (rightCount > 0) {
      // 删除右边的空列
        this.sheet1.deleteColumns(rightBegin, rightCount)
      }
      if (lastTable.col !== 0) {
      // 删除左边的空列
        this.sheet1.deleteColumns(0, lastTable.col)
      }
    },
    // 获取当前历史报价单报价单json
    sheetAudit2(reportVersionId, resultDate) {
      this.loading = true
      const params = { reportVersionId, resultDate }
      sheetAudit(params).then(res => {
        this.loading = false
        // console.log(JSON.parse(res.resultData.reportScript), '当前表区json')
        if (res.resultData.reportScript) {
          this.Spread.fromJSON(JSON.parse(res.resultData.reportScript))
          this.tmpSaveJson = JSON.parse(res.resultData.reportScript)
        }
        // 第一个表区不可编辑
        this.sheet1 = this.Spread.getSheet(0)
        this.sheet1.options.isProtected = true
        this.Spread.options.newTabVisible = false // 隐藏new
        this.Spread.options.allowContextMenu = false // 隐藏右键菜单
        // this.Spread.options.showHorizontalScrollbar = false
        this.Spread.options.showVerticalScrollbar = false
        // sheet1 = this.Spread.getSheet(0)
        // sheet1.options.isProtected = true
        // this.Spread.options.showHorizontalScrollbar = false
        // this.Spread.options.showVerticalScrollbar = false
      }).catch(err => {
        console.log(err)
      })
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
.seeBox-con {
  min-height: 300px;
  .show_head {
    height: 60px;
    line-height: 30px;
    font-size: 18px;
    // background: #ccc;
    // display:flex;
    // justify-content:space-between
    .head_left {
      float: left;
      max-width: 32%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-left: 2%;
    }
    .head_center {
      float: left;
      max-width: 32%;
      padding-left: 3%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .head_right {
      float: right;
      max-width: 32%;
      padding-right: 2%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  iframe {
    width: 100%;
    min-height: calc(100vh - 360px);
    border: none;
  }
}
</style>

<style>
.seeBox .el-dialog {
  height: 80%;
  width: 85%;
}
.seeBox .el-dialog__header {
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
.seeBox .el-dialog__title,
.seeBox .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
</style>
