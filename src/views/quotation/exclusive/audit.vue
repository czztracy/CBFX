/*
 * @Page: 报价单稽核
 * @Author: wangyadi
 * @Date: 2018-12-26 17:09:18
 * @Last Modified by: wangyadi
 */
<template>
  <el-container>
    <!-- <el-aside style="min-width:15.56%;width:15.56%">
      <Tree @targetData = "changeList"/>
    </el-aside>-->
    <el-main>
      <div v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)" class="auditBox">
        <!-- 模板基本信息 -->
        <div class="top-show">
          <span class="sort">{{ $t('bidManagement.quotationNumber') }}：{{ formInline.reportId }}</span>
          <span>{{ $t('bidManagement.reportDate') }}：{{ reportDate }}</span>
          <span class="corporateName">{{ corporateName }}</span>
        </div>
        <!-- 模版展示列表 iframe -->
        <div class="modelContent">
          <div class="priceSheet spreadContainer">
            <!-- <iframe ref="myIframe" :src="src" class="myIframe" @load="loading = false"/> -->
            <gc-spread-sheets
              :style="visibility"
              :tab-strip-visible = "tabStripVisible"
              :host-class="&quot;spreadHost&quot;"
              @workbookInitialized="spreadInitHandle"/>
          </div>
        </div>
        <!-- 审核信息 -->
        <el-form :inline="true" :model="formInline" class="check">
          <!-- 查看结果 -->
          <el-form-item :label="$t('bidManagement.viewResults')" class="res">
            <el-select
              v-model="formInline.suggestion"
              :placeholder="$t('demandNoResolve.select')"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- 是否延期 -->
          <el-form-item class="postponed">
            <el-checkbox v-model="checked">{{ $t('bidManagement.isPostponed') }}</el-checkbox>
          </el-form-item>
          <!-- 截止日期 -->
          <el-form-item :label="$t('bidManagement.closingDate')" class="close">{{ closingDate }}</el-form-item>
          <!-- 备注 -->
          <el-form-item :label="$t('bidManagement.remarks')" class="remarks">
            <el-input
              v-model="formInline.remarks"
              :placeholder="$t('bidManagement.fillInOpinions')"
              resize="none"
            />
          </el-form-item>
        </el-form>
        <!-- 提交返回操作 -->
        <div style="text-align: center">
          <el-button :disabled="disableSubmit" type="primary" class="ti" @click="operate('2')">{{ $t('buttonGroup.submit') }}</el-button>
          <el-button
            class="return"
            style="margin-left:35px"
            @click="goBack"
          >{{ $t('templateManager.returns') }}</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
// import Tree from '../components/tree'
import { sheetAudit } from '@/api/modle'
import { submission } from '@/api/quotation'
import { mapGetters } from 'vuex'
import { iframeApi, judgeUrl } from '@/utils/api'
export default {
  name: 'Audit',
  // components: {
  //   Tree
  // },
  data() {
    return {
      // 占位
      visibility: 'visibility:hidden',
      src: iframeApi() + 'submit' + '?' + new Date().getTime(),
      disableSubmit: false, // 是否禁用提交
      routeQuery: {}, // 路由参数
      sheet1Name: '',
      tabStripVisible: false, // 标签页显隐
      // 报价单的实例化spread
      Spread: {},
      sheet1: {},
      tmpSaveJson: {}, // 表单json
      loading: true,
      checked: false, // 是否延期
      reportDate: '1', // 上报日期
      closingDate: '1', // 截止日期
      corporateName: '1', // 公司名称
      // supplierCode: '1', // 供应商编码
      resultDate: '1', // 结果公示日期
      mobleName: '', // 报价单名称
      // 提交时的参数
      formInline: {
        reportId: '1', // 报价单id
        reportVersionId: '1', // 填报单版本id 不能为空 F.reportVersionId
        suggestion: '', // 审核意见 可多选
        delay: '', // 是否延期 0或1(延期)
        remarks: '', // 备注
        userCode: '', // 审核人代码
        userRole: '', // 审核人角色
        type: '0002', // 操作类型 0001查看 0002驳回,只要提交就代表驳回
        userName: '' // 审核人姓名
      },
      result: '',
      code: judgeUrl(),
      options: [ // 查看结果/审核意见下拉值
        {
          value: '0001',
          label: '包运储费异常'
        }, {
          value: '0002',
          label: '加工费异常'
        }, {
          value: '0003',
          label: '利润异常'
        }, {
          value: '0004',
          label: '管理费异常'
        }, {
          value: '0005',
          label: '废品率异常'
        }, {
          value: '0006',
          label: '材料费异常'
        }, {
          value: '0007',
          label: '主要材料清单未细分'
        }, {
          value: '0008',
          label: '加工工序未细分'
        }, {
          value: '0009',
          label: '胡乱填写'
        }, {
          value: '0010',
          label: '凑数'
        }, {
          value: '0011',
          label: '购销单价错误'
        }, {
          value: '0012',
          label: '报价模板匹配错误'
        }, {
          value: '0013',
          label: '性能参数名称描述不够准确'
        }, {
          value: '0014',
          label: '关键性能参数名称不全'
        }]
    }
  },
  computed: {
    ...mapGetters(['userCode', 'name', 'avatarCode'])
  },
  watch: {
    // 表区初始化动态占位
    tmpSaveJson: function tmpSaveJson(val) {
      if (JSON.stringify(val) !== '{}') {
        this.visibility = 'visibility:visible'
      } else {
        this.visibility = 'visibility:hidden'
      }
    },
    routeQuery: function(val, oldVal) {
      if (val.reportId !== oldVal.reportId) {
        this.disableSubmit = false
        if (val.reportVersionId && val.resultDate) {
          this.sheetAudit(val.reportVersionId, val.resultDate)
        } else {
          this.$message({
            type: 'error',
            message: '请重试！'
          })
        }
      }
    }
  },
  // 导航切换修改
  activated() {
    if ((window.location.href).indexOf('reportId') === -1) { // 导航切换进入
      const query = window.sessionStorage.getItem('auditHref')
      this.routeQuery = this.get_query(query)
    } else {
      // console.log(decodeURI(window.location.href), '当前地址')
      window.sessionStorage.setItem('auditHref', decodeURI(window.location.href))
      this.routeQuery = this.$route.query
    }
    this.routerQuery()
    this.isSupplierCode()
  },
  mounted() {
    this.routeQuery = this.$route.query
    this.routerQuery()
    this.look()
    this.isSupplierCode()
    // 获取当前报价单json
    if (this.routeQuery.reportVersionId && this.routeQuery.resultDate) {
      this.sheetAudit(this.routeQuery.reportVersionId, this.routeQuery.resultDate)
    } else {
      this.$message({
        type: 'error',
        message: '请重试！'
      })
    }
  },
  methods: {
    // 路由参数
    routerQuery() {
      this.reportDate = this.routeQuery.reportDate
      this.closingDate = this.routeQuery.endReportDate
      this.corporateName = this.routeQuery.supplierName
      this.supplierCode = this.routeQuery.supplierCode
      this.resultDate = this.routeQuery.resultDate
      this.formInline.reportId = this.routeQuery.reportId
      this.formInline.reportVersionId = this.routeQuery.reportVersionId
    },
    // 分割地址栏参数
    get_query(string) {
      // console.log(string, '当前传入的地址')
      var arrayModle = string.split('?')[1].split('&')
      var userDatas = '{'
      for (var key in arrayModle) {
        arrayModle[key] = arrayModle[key].replace('=', '":"')
        userDatas += '"' + arrayModle[key].replace('=', '":"') + '",'
      }
      userDatas = userDatas.substr(0, userDatas.length - 1) + '}'
      return JSON.parse(userDatas)
    },
    // 插件初始化
    spreadInitHandle(spread) {
      this.Spread = spread
      // 第一个表区不可编辑
      // var sheet1 = {}
      this.sheet1 = this.Spread.getSheet(0)
      this.sheet1.options.isProtected = true
      this.Spread.options.newTabVisible = false // 隐藏new
      this.Spread.options.allowContextMenu = false // 隐藏右键菜单
    },
    // 获取当前报价单json
    sheetAudit(reportVersionId, resultDate) {
      this.loading = true
      const params = { reportVersionId, resultDate }
      sheetAudit(params).then(res => {
        // console.log(JSON.parse(res.resultData.reportScript), '当前表区json')
        if (res.resultData.reportScript) {
          this.Spread.fromJSON(JSON.parse(res.resultData.reportScript))
          this.tmpSaveJson = JSON.parse(res.resultData.reportScript)
          this.loading = false
        }
        // 第一个表区不可编辑
        // var sheet1 = {}
        this.sheet1 = this.Spread.getSheet(0)
        Object.keys(this.tmpSaveJson.sheets).some((element) => {
          if (this.tmpSaveJson.sheets[element].index === 0) {
            this.sheet1Name = element
            return true
          }
        })
        // 稽核时，海尔用户可以看到隐藏的单元格
        this.showHideCell()
        // this.removeInvalidRowsCol()
        this.sheet1.options.isProtected = true
        this.Spread.options.newTabVisible = false // 隐藏new
        this.Spread.options.allowContextMenu = false // 隐藏右键菜单
        // this.Spread.options.showHorizontalScrollbar = false
        this.Spread.options.showVerticalScrollbar = false
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 显示被隐藏的单元格
    showHideCell() {
      this.tmpSaveJson.sheets[this.sheet1Name].tables.forEach((element, indexss) => {
        element.columns.forEach((ele, index) => {
          // 找出一般管理费率 和 利润率
          if (this.fuzzyMatch(ele.name, ['一般管理费率', '利润率', '#NAME']) !== -1) {
            const col = index + element.col
            this.sheet1.getCell(element.row + 1, col).backColor('white')
            this.sheet1.getCell(element.row, col).backColor('rgb(0, 90, 170)')
            this.sheet1.getCell(element.row + 1, col).foreColor('black')
            this.sheet1.getCell(element.row, col).foreColor('white')
            // this.sheet1.setStyle(element.row + 1, col, style)
          }
        })
      })
    },
    // 逻辑数据 表头名称模糊匹配
    fuzzyMatch(str, arr) {
      str += ''
      let indexss = -1
      arr.some((element, index) => {
        if (str.indexOf(element) !== -1) {
          indexss = index
          return true
        }
      })
      return indexss
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
    // 判断是否需要供应商编码
    isSupplierCode() {
      // const code = judgeUrl()
      // if (this.code === '001') { // 演示环境
      //   window.sessionStorage.setItem('liziData', JSON.stringify({ reportVersionId: this.formInline.reportVersionId, supplierCode: this.formInline.supplierCode, resultDate: this.resultDate }))
      // } else if (this.code === '002') { // 正式
      //   window.sessionStorage.setItem('liziData', JSON.stringify({ reportVersionId: this.formInline.reportVersionId, resultDate: this.resultDate }))
      // }
      window.sessionStorage.setItem('liziData', JSON.stringify({ reportVersionId: this.formInline.reportVersionId, resultDate: this.resultDate }))
    },
    operate(val) { // 提交功能(提交即代表驳回)
      // const code = judgeUrl()
      this.formInline.type = '0002'
      if (this.code === '001') { // 演示环境
        // this.formInline.userCode = this.userCode
        // this.formInline.userName = this.name
        // this.formInline.userRole = this.avatarCode // 审核角色编码
      } else if (this.code === '002') { // 正式
        this.formInline.userCode = ''
        this.formInline.userName = ''
        this.formInline.userRole = ''
      }
      let params = this.formInline
      params = JSON.parse(JSON.stringify(params))
      params.delay = Number(this.checked)
      params.suggestion = params.suggestion.join(';')
      // console.log(params)
      if (params.suggestion === '') {
        this.$message({
          type: 'error',
          message: '请选择查看结果！'
        })
      } else {
        submission(params).then(res => {
          // console.log(res)
          if (res.success === true) {
            this.$message({
              type: 'success',
              message: '提交成功！'
            })
            this.disableSubmit = true
            this.$router.push({ path: '/quotation/exclusive' })
          } else {
            this.$message({
              type: 'error',
              message: '提交失败！'
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 返回 ---> 代表查看
    goBack() {
      this.formInline.type = '0001'
      if (this.code === '001') { // 演示环境
        // this.formInline.userCode = this.userCode
        // this.formInline.userName = this.name
        // this.formInline.userRole = this.avatarCode // 审核角色编码
      } else if (this.code === '002') { // 正式
        this.formInline.userCode = ''
        this.formInline.userName = ''
        this.formInline.userRole = ''
      }
      let params = this.formInline
      params = JSON.parse(JSON.stringify(params))
      params.delay = ''
      // params.suggestion = params.suggestion.join(';')
      params.suggestion = ''
      // console.log(params)
      submission(params).then(res => {
        this.$router.push({ path: '/quotation/exclusive' })
      }).catch(err => {
        console.log(err)
      })
      // this.$router.go(-1)
    },
    // 页面加载时也要插入一条查看记录
    look() {
      this.formInline.type = '0001'
      if (this.code === '001') { // 演示环境
        // this.formInline.userCode = this.userCode
        // this.formInline.userName = this.name
        // this.formInline.userRole = this.avatarCode // 审核角色编码
      } else if (this.code === '002') { // 正式
        this.formInline.userCode = ''
        this.formInline.userName = ''
        this.formInline.userRole = ''
      }
      let params = this.formInline
      params = JSON.parse(JSON.stringify(params))
      params.delay = ''
      // params.suggestion = params.suggestion.join(';')
      params.suggestion = ''
      // console.log(params, '查看参数')
      submission(params).then(res => {
        // console.log(res, '查看返回值')
      }).catch(err => {
        console.log(err)
      })
      // this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
// 报价单
.priceSheet {
  height: 500px;
}
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
}
.auditBox {
  background: rgba(244, 244, 244, 1);
  min-width: 1216px;
  /* min-height:783px; */
  padding: 20px 40px;
}
.top-show {
  font-size: 0;
}
.top-show span {
  font-size: 14px;
  color: #333;
}
.top-show .corporateName {
  float: right;
}
.top-show .sort {
  margin-right: 50px;
}
.modelContent {
  width: 100%;
  min-height: 500px;
  margin: 36px auto 10px;
  background: #fff;
  position: relative;
}
  /* // 表格样式 */
  .spreadContainer {
    padding: 10px;
    /* // box-shadow: 0 0 20px grey; */
  }
  .spreadContainer{
    position: absolute;
    left: 0px;
    right: 0;
    top: 0;
    bottom: 10px;
  }
  .spreadHost{
    width: 100%;
    height: 100%;
  }
.myIframe {
  width: 100%;
  min-height: 900px;
  // margin:36px auto 150px;
  background: #fff;
}
.check {
  width: 100%;
  // margin: 0 7.9% 17px;
  // padding-bottom: 30px;
  margin: auto;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 14px;
}
.check .remarks {
  .el-form-item__content {
    width: 90%;
  }
}
.auditBox .ti,
.auditBox .return {
  font-size: 18px;
  width: 14%;
}
.check {
  .el-checkbox__label {
    font-size: 14px;
  }
  .el-form-item__content {
    font-size: 18px;
  }
  // .res{
  //   width:45%
  // }
  .postponed{
    .el-checkbox__label{
      font-size: 20px
    }
  }
  // .close{
  //   width:35%
  // }
  .remarks {
    // width: 80%;
    margin-left: 2.4%;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 100px;
  }
}
</style>
<style>

.auditBox .check .el-form-item {
  margin-right: 0;
}
.check .el-radio__label,
.check .el-form-item__label,
.check .el-input,
.check .el-textarea__inner {
  font-size: 14px;
  font-weight: inherit;
}
/* .auditBox .check .el-form-item:last-child{
  width:33%;
  display: flex;
}
.auditBox .check .el-form-item:last-child .el-form-item__content{
  flex-grow:1
} */
</style>
