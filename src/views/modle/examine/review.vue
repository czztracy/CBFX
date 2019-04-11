/*
 * @Page: 模板审核详情页
 * @Author: cls
 * @Date: 2018-12-20 10:30:58
 * @Last Modified by: cls
 */
<template>
  <el-container>
    <!-- <el-aside style="border: 1px solid rgba(209, 209, 209, 1); border-bottom: 0; width: auto; min-width:280px;">
      <Tree :loading1= "loading1" @targetData = "changeList"/>
    </el-aside> -->
    <el-main>
      <div class="box">
        <!-- 模板基本信息 -->
        <div class="top-show">
          <span>{{ $t('templateManager.moduleNumber') }}：{{ mobleID }}</span><span>{{ $t('templateManager.creationTime') }}：{{ mobleTime }}</span><span>{{ $t('templateManager.moduleName') }}：{{ mobleName }}</span>
          <el-button :disabled="operateDisable" type="primary" plain @click="reviewModle()">{{ $t('templateManager.review') }}</el-button>
        </div>
        <!-- 模版展示列表 -->
        <div v-loading="modleLoading" class = "model-content">
          <div class="modlejudge">
            <gc-spread-sheets
              :new-tab-visible="false"
              :host-class="'spreadHost'"
              :gray-area-back-color="grayAreaBackColor"
              @workbookInitialized="spreadInitHandle"
            />
          </div>
          <el-form v-if="showHead" ref="form" :model="form" label-width="100px" class="Forms">
            <el-form-item :label="$t('fieldInTheLibrary.fieldName')">
              <el-input :disabled="true" v-model="form.fieldName"/>
            </el-form-item>
            <el-form-item :label="$t('fieldInTheLibrary.required')">
              <el-select
                v-model="form.ngRequired"
                :disabled="true"
                :placeholder="$t('fieldInTheLibrary.pleaseSelectWhetherItIsRequiredOrNot')"
              >
                <el-option
                  v-for="(item, index) in ngRequiredOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('fieldInTheLibrary.information')">
              <el-input v-model="form.notice" :disabled="true"/>
            </el-form-item>
            <el-form-item :label="$t('fieldInTheLibrary.type')">
              <el-select
                v-model="form.type"
                :disabled="true"
                :placeholder="$t('fieldInTheLibrary.pleaseSelectTheType')"
                @change="handleTypeSelect($event)"
              >
                <el-option
                  v-for="(item, index) in typeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('fieldInTheLibrary.getTheWay')">
              <el-select
                v-model="form.access"
                :disabled="true"
                :placeholder="$t('fieldInTheLibrary.selectHowToGetIt')"
                @change="handleAccessSelect($event)"
              >
                <el-option
                  v-for="(item, index) in accessOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="form.access === '0002'"
              :label="$t('fieldInTheLibrary.logicalAccess')"
            >
              <el-select
                v-model="form.logicalAccess"
                :disabled="true"
                :placeholder="$t('fieldInTheLibrary.selectHowToGetIt')"
              >
                <el-option
                  v-for="(item, index) in logicalAccessList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="form.access === '0003'"
              :label="$t('fieldInTheLibrary.formulaComputing')"
            >
              <el-select
                v-model="form.formulaMode"
                :disabled="true"
                :placeholder="$t('fieldInTheLibrary.selectHowToGetIt')"
              >
                <el-option
                  v-for="(item, index) in formulaModeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <!-- 审核信息 -->
        <el-form :inline="true" :model="formInline" class="operate">
          <el-form-item :label="$t('templateManager.reviewResults')">
            <el-radio-group v-model="formInline.type" @change="controlshow()">
              <el-radio label="0001">{{ $t('templateManager.pass') }}</el-radio>
              <el-radio label="0002">{{ $t('templateManager.rejected') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('templateManager.reviewOpinion')">
            <el-select :disabled="disabled" v-model="formInline.suggestion" :placeholder="$t('demandNoResolve.select')">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('templateManager.remark')">
            <el-input v-model="formInline.remarks" :rows="2" type="textarea"/>
          </el-form-item>
        </el-form>
        <!-- 提交返回操作 -->
        <div style="text-align: center">
          <el-button :disabled="operateDisable" type="primary" class="ti" @click="operate()">{{ $t('buttonGroup.submit') }}</el-button>
          <el-button :disabled="operateDisable" class="return" style="margin-left:35px" @click="operaReturn()">{{ $t('templateManager.returns') }}</el-button>
        </div>
      </div>
    </el-main>
    <el-dialog :title="$t('route.review')" :visible.sync="modleVisible" class="templateBoxss">
      <el-button v-if="openTheCheck" type="primary" class="checkBox" @click="openCheck">开启验证</el-button>
      <el-button v-else type="primary" class="checkBox" @click="closeCheck">关闭验证</el-button>
      <div v-loading="reviewloading" class="spreadContainer">
        <gc-spread-sheets
          :tab-strip-visible = "tabStripVisible"
          :host-class="'spreadHost'"
          :gray-area-back-color="grayAreaBackColor"
          @workbookInitialized="spreadInitHandle1"
        />
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
// import Tree from '@/views/modle/components/tree'
import '@grapecity/spread-sheets-vue'
import GC from '@grapecity/spread-sheets'
import { spread } from 'q'
import { toexamine, xuanTemplate } from '@/api/modle'
export default {
  name: 'Review',
  data() {
    return {
      openTheCheck: true,
      grayAreaBackColor: '#FFFFFF',
      operateDisable: false,
      // 模板脚本
      tmpSaveJson: {},
      dummyTables: null,
      // 是否显示表头信息
      showHead: false,
      // 模板预览
      modleVisible: false,
      reviewSpread: {},
      reviewloading: false,
      tabStripVisible: false, // 标签页显隐
      // 模板loading
      modleLoading: '',
      mobleID: this.$route.query.templateId, // 模板标识
      // mobleID: '1', // 模板标识
      mobleTime: this.$route.query.mobleTime,
      mobleName: '',
      formInline: {
        templateVersionId: '', // 模板版本标识
        suggestion: '', // 审核意见
        remarks: '', // 备注
        type: '', // 0001：通过 0002驳回
        templateState: '' // 模板状态
      },
      disabled: false,
      options: [{ // 审核意见下拉值
        value: '0001',
        label: '逻辑错误'
      }, {
        value: '0002',
        label: '缺少物料'
      }, {
        value: '0003',
        label: '数据逻辑'
      }, {
        value: '0004',
        label: '其他'
      }],
      form: {
        fieldName: '', // 字段名称
        ngRequired: '是', // 是否必填
        notice: '物料描述提示信息', // 提示信息
        type: '枚举类型', // 类型
        access: '填写', // 获取方式
        treeId: 0, // 接受id
        logicalAccess: '', // 逻辑获取
        formulaMode: '' // 计算方式
      },
      // 是否必填
      ngRequiredOptions: [
        {
          value: '0001',
          label: '是'
        },
        {
          value: '0002',
          label: '否'
        }
      ],
      // 类型
      typeOptions: [
        {
          value: '0001',
          label: '枚举类型'
        },
        {
          value: '0002',
          label: '文本类型'
        },
        {
          value: '0003',
          label: '数值类型'
        },
        {
          value: '0004',
          label: '日期类型'
        }
      ],
      // 获取方式
      accessOptions: [
        {
          value: '0001',
          label: '手动填写'
        },
        {
          value: '0002',
          label: '逻辑获取'
        },
        {
          value: '0003',
          label: '公式计算'
        }
      ],
      // 逻辑获取
      logicalAccessList: [
        {
          value: '0001',
          label: 'BOM数据'
        },
        {
          value: '0002',
          label: '财务数据'
        },
        {
          value: '0003',
          label: '需求数据'
        }
      ],
      // 计算方式
      formulaModeList: [
        {
          value: '0001',
          label: '单元格间计算'
        },
        {
          value: '0002',
          label: '单元格内计算'
        }
      ]
    }
  },
  watch: {
    srcs: function(val, oldVal) {
      if (val.templateId !== oldVal.templateId) {
        this.operateDisable = false // 是否禁用提交功能
        this.xuanTemplate()
      }
    },
    deep: true
  },
  created() {
    // 取消浏览器默认右键
    document.oncontextmenu = function() {
      return false
    }
  },
  // 导航切换修改
  activated() {
    if ((window.location.href).indexOf('templateId') === -1) { // 导航切换进入
      const query = window.sessionStorage.getItem('reviewHref')
      this.srcs = this.get_query(query)
    } else {
      window.sessionStorage.setItem('reviewHref', window.location.href)
      this.srcs = this.$route.query
    }
    this.mobleID = this.srcs.templateId
    this.mobleTime = this.srcs.mobleTime
    document.oncontextmenu = function() {
      return false
    }
  },
  destroyed() {
    // 恢复浏览器默认右键
    document.oncontextmenu = function() {
      return true
    }
  },
  mounted() {
    this.xuanTemplate()
  },
  methods: {
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
    // 新插件初始化
    spreadInitHandle: function(spread) {
      this._spread = spread
    },
    // 模板预览初始化
    spreadInitHandle1: function(spread) {
      // 移除左侧菜单的插入
      var menuData = spread.contextMenu.menuData
      var newMenuData = []
      menuData.forEach((item) => {
        if (item) {
          // 若是左侧插入则移除
          if (item.name === 'gc.spread.insertRows' && item.workArea === 'rowHeader') {
            return
          }
          newMenuData.push(item)
        }
      })
      // 将新数组赋予spread的左键菜单属性
      spread.contextMenu.menuData = newMenuData
      this.handleContextMenu(spread)
      this.reviewSpread = spread
    },
    // 控制驳回意见是否可选
    controlshow() {
      if (this.formInline.type === '0001') {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    // 模板渲染
    xuanTemplate() {
      this.modleLoading = true
      xuanTemplate(this.mobleID)
        .then(res => {
          this._spread.options.showHorizontalScrollbar = false
          this._spread.options.showVerticalScrollbar = false
          // this.tmpSaveJson = JSON.parse(localStorage.getItem("history"));
          this.tmpSaveJson = JSON.parse(res.resultData.templateScript)
          this.mobleName = res.resultData.templateName
          this.formInline.templateVersionId = res.resultData.templateVersionId
          console.log(this.tmpSaveJson)
          if (!this.tmpSaveJson.hasOwnProperty('sheets')) {
            this.modleLoading = false
            this.operateDisable = true
            this.$message.error('不是新插件创建的模板，无法审核'); return
          }
          // 重新渲染报价单
          this._spread.fromJSON(this.tmpSaveJson)
          this._spread.options.newTabVisible = false
          this.sheet1 = this._spread.getSheet(0)
          this.sheet1.options.isProtected = true
          if (this._spread.getSheet(1)) {
            this._spread.getSheet(1).options.isProtected = true
          }
          // 点击事件
          this.sheet1.bind(GC.Spread.Sheets.Events.CellClick, (sender, args) => {
            console.log(args, args.sheet.getValue(args.row, args.col), args.sheet.getTag(args.row, args.col))
            const tagMessage = args.sheet.getTag(args.row, args.col)
            if (tagMessage) {
              this.showHead = true
              this.form.fieldName = args.sheet.getValue(args.row, args.col)
              if (Object.keys(tagMessage.getWay).length > 2) {
                this.form.notice = tagMessage.getWay.message
                this.form.ngRequired = tagMessage.getWay.state
                this.form.type = tagMessage.getWay.type
                this.form.access = tagMessage.getWay.way
                this.form.logicalAccess = tagMessage.getWay.logicAcquisition
                this.form.formulaMode = tagMessage.getWay.computingMode
              } else {
                this.form.notice = ''
                this.form.ngRequired = ''
                this.form.type = ''
                this.form.access = tagMessage.getWay.way === '0002' ? '0002' : ''
                this.form.logicalAccess = tagMessage.getWay.logicAcquisition
                this.form.formulaMode = ''
              }
            } else {
              this.showHead = false
            }
          })
          if (!this.tmpSaveJson.sheets[this.mobleName].tables) {
            const hiddenSheet = this._spread.getSheetFromName('hideSheet')
            if (hiddenSheet) {
              const tableTotal = JSON.parse(hiddenSheet.getValue(0, 0))
              this.dummyTables = this.tagToTables(this.reconsitutionTag(tableTotal))
              this.tmpSaveJson.sheets[this.mobleName].tables = this.dummyTables
              console.log(this.tmpSaveJson, 'new this.tmpSaveJson')
            } else {
              console.log('该json无tables属性')
              this.modleLoading = false
              return
            }
          }
          this.removeInvalidRowsCol(this._spread, this.tmpSaveJson.sheets[this.mobleName], 1)
          this.modleLoading = false
        })
        .catch(err => {
          this.modleLoading = false
        })
    },
    // 提交功能
    operate() {
      if (this.formInline.type === '') {
        this.$message.error('模板审核结果不能为空！')
        return
      }
      this.formInline.templateState = this.formInline.type === '0001' ? '0003' : '0004'
      toexamine(this.formInline)
        .then(res => {
          if (res.hasOwnProperty('errorMsg') && res.errorMsg !== '') {
            this.$message.error(res.errorMsg)
          } else {
            this.operateDisable = true
            this.$router.push({ name: 'Examine' })
            // this.$router.go(-1)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 返回功能
    operaReturn() {
      this.$router.push({ name: 'Examine' })
    },
    // 修改模板/报价单 无效行列太多导致的滚动条过长
    removeInvalidRowsCol(spread, tmpSaveJson, sign) {
      const sheet1 = spread.getSheet(0)
      const rowTotal = sheet1.getRowCount()
      const lastTable = tmpSaveJson.tables[tmpSaveJson.tables.length - 1]
      const lastBegin = lastTable.row + lastTable.rowCount + 20
      if (rowTotal > lastBegin) {
        sheet1.deleteRows(lastBegin, rowTotal - lastBegin)
      }
      spread.options.grayAreaBackColor = '#FFFFFF'
      // 超出不滚动
      spread.options.scrollbarMaxAlign = true
      // 不显示列头
      spread.options.ColumnHeaderVisible = false
      // 禁止缩放
      spread.options.allowUserZoom = false
      var sheet = spread.getActiveSheet()
      sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader)// 隐藏列号
      if (sign) {
        sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader)// 隐藏行号
      }
      sheet.options.gridline = { showHorizontalGridline: false, showVerticalGridline: false }// 水平线。垂直线
    },
    // 预览功能
    reviewModle() {
      this.modleVisible = true
      this.reviewloading = true
      xuanTemplate(this.mobleID)
        .then(res => {
          const reviewScript = JSON.parse(res.resultData.templateScript)
          this.reviewSpread.options.showHorizontalScrollbar = false
          this.reviewSpread.options.showVerticalScrollbar = false
          this.reviewSpread.options.highlightInvalidData = false
          this.openTheCheck = true
          this.reviewSpread.fromJSON(reviewScript)
          this.reviewSpread.options.newTabVisible = false
          if (this.dummyTables) {
            reviewScript.sheets[this.mobleName].tables = this.dummyTables
          }
          this.removeInvalidRowsCol(this.reviewSpread, reviewScript.sheets[this.mobleName], 0)
          this.reviewloading = false
        })
        .catch(err => {
          this.reviewloading = false
        })
      // let t;
      // clearTimeout(t);
      // t = setTimeout(() => {
      //   console.log(this._spread, this.reviewSpread, '1111')
      //   this.reviewSpread.fromJSON(this.tmpSaveJson);
      //   this.reviewSpread.options.newTabVisible = false
      //   this.reviewloading = false
      // }, 0);
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
    },
    // 公式复制
    handleContextMenu(spread) {
      // 定义一个命令，作为右键菜单项的执行逻辑
      var that = this
      spread.commandManager().register('insertRowsBehind',
        {
          canUndo: true,
          execute: function(context, options, isUndo) {
            var Commands = GC.Spread.Sheets.Commands
            // 在此加cmd
            options.cmd = 'insertRowsBehind'
            if (isUndo) {
              Commands.undoTransaction(context, options)
              return true
            } else {
              console.log('循环开始')
              Commands.startTransaction(context, options)
              var sheet = spread.getActiveSheet()
              var sels = sheet.getSelections()
              if (sels && sels.length > 0) {
                spread.suspendPaint() // 停止表单重绘
                for (var i = 0; i < sels.length; i++) {
                  var sel = sels[i]
                  var row = sel.row
                  var rowCount = sel.rowCount
                  sheet.addRows(row + 1, rowCount)
                  for (let g = 1; g <= rowCount; g++) {
                    // 复制区域左上起始Y, 复制区域左上起始X, 黏贴区域左上起始Y, 黏贴区域左上起始X, 要复制的行数, 要复制的列数 复制参数.all全复制(查看复制内容console.log(GC.Spread.Sheets.CopyToOptions))
                    sheet.copyTo(row, 0, row + g, 0, 1, sel.colCount, GC.Spread.Sheets.CopyToOptions.all)
                    // 行高问题
                    sheet.setRowHeight(row + g, sheet.getRowHeight(row))
                    // // 枚举与逻辑冲突的问题
                    // that.validatorRowCol.forEach((elementss, indexss) => {
                    //   if (elementss.row === row) {
                    //     sheet.setDataValidator(row + g, elementss.col, that.validatorTotal[indexss])
                    //   }
                    // })
                    // // 公式与逻辑冲突的问题
                    // that.formulaRowCol.forEach((elementss, indexss) => {
                    //   if (elementss.row === row) {
                    //     sheet.setFormula(row + g, elementss.col, that.formulaTotal[indexss])
                    //   }
                    // })
                    for (let j = 0; j < sel.colCount; j++) {
                      sheet.setValue(row + g, j, null)
                      if (sheet.getFormula(row + g, j)) {
                        spread.getSheet(0).getCell(row + g, j).locked(true)
                      } else {
                        spread.getSheet(0).getCell(row + g, j).locked(false)
                      }
                    }
                  }
                }
                spread.resumePaint()
              }
              console.log('循环结束')
              Commands.endTransaction(context, options)
              return true
            }
          }
        })
      // 获取右键菜单数组
      var menuData = spread.contextMenu.menuData
      // 定义一个在行头区域执行的右键菜单项
      var insertRowsBehind = {
        // 点击此菜单项后执行的命令操作
        command: 'insertRowsBehind',
        // 菜单项显示的文字
        text: '插入',
        // name只要不重复即可（菜单项名称）
        name: 'insertRowsBehind',
        // 把自己定义好的icon class加在这里（左侧样式）
        iconClass: 'gc-spread-custom-icon',
        // 加到行头
        workArea: 'rowHeader'
      }

      // 将自定义的项，加入到“插入”放到删除之前
      menuData.forEach((item, index) => {
        if (item && item.name === 'gc.spread.deleteRows') {
          menuData.splice(index - 1, 0, insertRowsBehind)
        }
      })
    },
    // 开启验证
    openCheck() {
      this.reviewSpread.options.highlightInvalidData = true
      this.openTheCheck = false
    },
    // 关闭验证
    closeCheck() {
      this.reviewSpread.options.highlightInvalidData = false
      this.openTheCheck = true
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
.box{
  background:rgba(244,244,244,1);
  min-width:1216px;
  /* min-height:783px; */
  padding: 30px 40px
}
.top-show{
  /* font-size: 0; */
  width: 87.8%;
  margin: auto
}
.top-show span{
  font-size: 16px;
  line-height: 46px;
  color: #333;
}
.top-show span:last-child{
  margin-right: 0;
}
.top-show span{
  margin-right: 45px;
}
.top-show button{
  float: right;
  font-size: 20px;
  min-width: 100px;
}
.model-content{
  min-height: calc(100vh - 172px);
  margin:25px 6%;
  white-space: nowrap;
  text-align: center
  /* background: #fff; */
}
.modlejudge{
  width: 80%;
  display: inline-block;
}
.Forms {
  vertical-align: top;
  display: inline-block;
}
.model-content .gc-no-user-select {
  min-height: calc(100vh - 173px) !important;
}
.operate{
  margin: 0 6% 17px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 20px!important;
}
.box .ti,.box .return{
  font-size:18px;
  width:14%
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
  top: 65px;
  bottom: 10px;
}
.spreadHost{
  width: 100%;
  height: 100%;
}
</style>
<style>
.Forms .el-input.is-disabled .el-input__inner {
  color: #333 !important;
}
.box .operate .el-form-item {
  margin-right: 0
}
.operate .el-radio__label,.operate .el-form-item__label,.operate .el-input,.operate .el-textarea__inner{
  font-size:20px;
  font-weight:inherit
}
.box .operate .el-form-item:last-child{
  width:50%;
  display: flex;
  margin-left: 2.9%
}
.box .operate .el-form-item:last-child .el-form-item__content{
  flex-grow:1
}
.templateBoxss .el-dialog {
  height: 80%;
  width: 90%;
  position: relative;
}
.templateBoxss .checkBox {
  position: absolute;
  top: 0;
  right: 5%;
  background: linear-gradient(360deg, #1990ea, #2ea1f8);
  height: 53px;
  border: 0
}
.templateBoxss .el-dialog__header {
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
.templateBoxss .el-dialog__title,
.templateBoxss .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
</style>
