/*
  * @Page: 供应商填报
  * @Author: cls
  * @Date: 2018-12-19
  * @Last Modified by: cls
  */
<template>
  <div v-loading="loading" class="priceListss suppliers" @mouseover="moveTheMouse">
    <div class="matching">
      <el-form ref="form" :model="form" :inline="true" class="Phistory" label-position="right">
        <el-form-item :label="$t('templateManager.matchHistoricalQuotations')" class="offerMan">
          <el-select
            v-model="form.matePriceSheet"
            :placeholder="$t('demandNoResolve.select')"
            filterable
            @change="chooseHis($event)"
          >
            <el-option
              v-for="(item,index) in form.options"
              :key="index"
              :label="item.module_describe"
              :value="item.report_version_id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="UpDown">
        <!-- <el-button @click="handleCheckout">校验</el-button> -->
        <el-button :disabled="operateDisable" @click="saveInlocal(2, '')">{{ $t('buttonGroup.save') }}</el-button>
        <el-button :disabled="operateDisable" @click="saveInlocal(3, '')">{{ $t('buttonGroup.submit') }}</el-button>
        <el-button @click="exportExcel(filename)"><i class="fa fa-download"/>{{ $t('buttonGroup.exportEXL') }}</el-button>
        <!-- <el-button><i class="fa fa-upload"/>导入Excel</el-button> -->
        <div class="importfile">
          <div class="beforechoose">
            <i class="fa fa-upload"/>
            {{ filename }}
            <!-- 导入Excel -->
            <input type="file" accept=".xls, .xlsx" @change="processFile($event)">
          </div>
        </div>
        <!-- @click="exportPdf" -->
        <!-- <el-button id="savePDF" @click="exportPdf"><i class="fa fa-download"/>{{ $t('buttonGroup.exportPDF') }}</el-button> -->
      </div>
      <!-- 表区 -->
      <div class="priceSheet">
        <!-- style="width: 1506px;" -->
        <div v-loading="tableloading" element-loading-background="rgba(255, 255, 255, 1)" class="spreadContainer">
          <gc-spread-sheets
            :style="visibility"
            :new-tab-visible="false"
            :host-class="'spreadHost'"
            :gray-area-back-color="grayAreaBackColor"
            @workbookInitialized="spreadInitHandle"
          />
        </div>
      </div>
      <!-- 底部按钮 -->
      <gc-spread-sheets
        v-show="false"
        :host-class="'spreadHost'"
        :gray-area-back-color="grayAreaBackColor"
        @workbookInitialized="spreadInitHandle1"
      />
    </div>
  </div>
</template>

<script>
import '@grapecity/spread-sheets-vue'
import { addTheClock, closeClock } from '@/utils/continueTime'
import lili from '@/utils/testBOM.js'
import GC from '@grapecity/spread-sheets'
import ExcelIO from '@grapecity/spread-excelio' // 新插件excel部分
import FaverSaver from 'file-saver'
// import { downloadPdf } from '@/utils/PDF'
import { iframeApi } from '@/utils/api'
import { historys, hisXuanran, submitSave, requires, searchLendingRate, searchLiscountRate } from '@/api/offersheet'
import { spread } from 'q'
import { judgeUrl, signatureUrl } from '@/utils/api'
import { sign, signature, registerPdf } from '@/api/signature'
import fonts from '@/utils/signature/fonts.js'
import axios from 'axios'
// 框架中Excel单独授权（须在初始化前）
GC.Spread.Sheets.LicenseKey = ExcelIO.LicenseKey = 'dbs.haier.net|dev.fineway.com,684218588826482#B0nHv6hDZy44aLBnM5QzRxwkawo7RKdkcqR7S9JHMaVmdhZ5bktEZCVWOwlDOah4MBJXaYhkSslkUQFkTphXVLt4cZlUQCBTWFFTVSJ4cWRUUvpHMDJ4VMl4d8Q7ROtyZzZjUvg5RrxENxNFatRmT4ZzS8QUSrNFR5g7cVhFNRl5a5k5RBpFaqdEbZN5TwsiSCtScKhUM9gGeoNFaM3WVk5UcrMWaLF5SJ9WNCllMpdlUIF5LhtUd6sCakBjQqFWOihDRtNWaPJFOl3iWhZGVNRlRRljREpkS7tyUv2Sc9pme5dTRsFUQYtyKW5UVudna5Imcw3yQW3kTs5UNyoEUJJiOiMlIsICRxETQxcTR5IiOigkIsUjNzUDMwgjM0IicfJye&Qf35VfikkR9IkI0IyQiwiIyEjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsICN4QzMyADI5EzMwkTMwIjI0ICdyNkIsISbvNmL9F6dl9Wam9idlRGL4VmbuIXZpFGauMnYkJiOiMXbEJCLiACuPWOrFWOkZmeicaOgKaekne+rui+tNaej3SeuWaOr0S+lMWuI0ISYONkIsIiM8QjNygDO8UDOxIDN8YjI0ICZJJCL3V6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3cmNyFUTU3WUUh6dFdUbWNUMzlUQyZXRQBjSplTRtJUdlplQ8N5KW9GZr4kaFdldaJTTRhGUxdjRFJjbH9UNOp6QOlzR94GZzxGR9hVWFJUbnxkepvVDL'
// GC.Spread.Sheets.LicenseKey = ExcelIO.LicenseKey = 'dbs.haier.net|dev.fineway.com,684218588826482#B0nHv6hDZy44aLBnM5QzRxwkawo7RKdkcqR7S9JHMaVmdhZ5bktEZCVWOwlDOah4MBJXaYhkSslkUQFkTphXVLt4cZlUQCBTWFFTVSJ4cWRUUvpHMDJ4VMl4d8Q7ROtyZzZjUvg5RrxENxNFatRmT4ZzS8QUSrNFR5g7cVhFNRl5a5k5RBpFaqdEbZN5TwsiSCtScKhUM9gGeoNFaM3WVk5UcrMWaLF5SJ9WNCllMpdlUIF5LhtUd6sCakBjQqFWOihDRtNWaPJFOl3iWhZGVNRlRRljREpkS7tyUv2Sc9pme5dTRsFUQYtyKW5UVudna5Imcw3yQW3kTs5UNyoEUJJiOiMlIsICRxETQxcTR5IiOigkIsUjNzUDMwgjM0IicfJye&Qf35VfikkR9IkI0IyQiwiIyEjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsICN4QzMyADI5EzMwkTMwIjI0ICdyNkIsISbvNmL9F6dl9Wam9idlRGL4VmbuIXZpFGauMnYkJiOiMXbEJCLiACuPWOrFWOkZmeicaOgKaekne+rui+tNaej3SeuWaOr0S+lMWuI0ISYONkIsIiM8QjNygDO8UDOxIDN8YjI0ICZJJCL3V6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3cmNyFUTU3WUUh6dFdUbWNUMzlUQyZXRQBjSplTRtJUdlplQ8N5KW9GZr4kaFdldaJTTRhGUxdjRFJjbH9UNOp6QOlzR94GZzxGR9hVWFJUbnxkepvVDL'
export default {
  name: 'PriceList',
  data() {
    return {
      // 占位
      visibility: 'visibility:hidden',
      fileHeaders: {
        token: window.sessionStorage.getItem('token')
        // token: 'SESSION_a25bb22b96aa245f05c0aecf57d1f880'
      },
      signatureloading: false, // 按钮loading
      loading: false, // 提交时的loading
      uploadData: [], // 签章附加参数
      pdfBlob: '',
      operateDisable: false,
      // 无table的虚拟tables集合
      dummyTables: [],
      // 第一个sheet页
      sheet1: '',
      filename: '导入Excel',
      // form表单-历史报价单
      form: {
        matePriceSheet: '',
        options: []
      },
      // router传参
      srcs: '',
      // 现在报价单 第一个sheet页的Json信息
      tmpSaveJson: {},
      sheet1Name: '',
      // 历史报价单 第一个sheet页的Json信息
      exportResult: {},
      // 历史报价单的实例化spread
      hisSpread: {},
      // 进入页面时间
      createModleTime: 0,
      // 鼠标移动时间
      activetime: 0,
      // 报价单的状态 0001未分解 0002分解中 0003已分解
      saveReportState: '',
      // 隐藏的表头集合
      hiddenTotal: new Array(),
      hiddenHead: ['一般管理费率', '利润率', '#NAME'],
      // 插入行集合
      addRowsTotal: new Array(),
      addSigel: [],
      // 插入行跟随表区累计
      addResult: 0,
      // 设置了贴现率+承兑期限的表头集合
      discountList: new Array(),
      // 付款条件+贷款利率
      paymentList: new Array(),
      // 四种贴现率
      // discountNamess: ['付款条件','贷款利率','承兑期限','贴现率'],
      discountName: ['0004', '0005', '0006', '0007'],
      discountNameAfter: ['payterms', 'rate', 'imonthsCd', 'discountRate'],
      // 设置了BOM的表头集合
      saveList: new Array(),
      // 所有BOM数据的集合
      BOMTotal: new Array(),
      // BOM字段名
      bomName: ['物料专用号', '物料描述', '单耗', '采购单位', '单价'],
      // BOM字段名对应的后台key
      bomNameAfter: ['materialCode', 'materialdesc', 'consumptionUnit', 'basicUnit', 'unitPrice'],
      // bomName与bomNameAfter对应的下标
      findIndex: 100,
      // bom的数据验证器集合
      validatorTotal: [],
      formulaTotal: [],
      formulaRowCol: [],
      validatorRowCol: [],
      // 设置了req的表头集合
      reqList: new Array(),
      // req字段名
      reqName: ['模块专用号', '模块描述', '模块属性', '资源量', '要求供货时间', '价格单位', '采购单位', '货币', '终投单价', '工厂', '高峰月产能', '模块编码'],
      // req字段名对应的后台key
      reqNameAfter: ['module_code', 'module_describe', 'module_attribute', 'resource_quantity', 'supply_time', 'price_unit', 'purchasing_unit', 'currency', 'price', 'p_manufacturer', 'month_capacity', 'demand_code'],
      // reqName与reqNameAfter对应的下标
      reqIndex: 100,
      // 警告类校验集合
      warnValidator: [],
      // 停止类校验集合
      stopValidator: [],
      showhis: false,
      // 是否需要去签章
      isSignature: false,
      // 是否完成了签章 true表示没完成
      completeSignature: true,
      // 签章地址
      pdfPath: '',
      pdfPathDle: '', // 需要删除的pdf地址
      // 签章成功地址
      pdfPathss: '',
      // 签章弹窗
      dialogVisible: false,
      // 报价单渲染时的loading
      tableloading: false,
      // 历史报价单时间戳集合
      historyTime: [],
      // 选取最近的5个报价单
      chooseTime: [],
      // 历史匹配表头名称过滤
      headFilter: ['主材料费', '辅助材料费', '加工费', '模具费', '表面处理费'],
      totalOneArea: ['小计'],
      // 表区背景色
      grayAreaBackColor: '#FFFFFF',
      // 从第几行插入
      Row: 19
    }
  },
  computed: {
    GCC() {
      return this.$store.getters.gc
    },
    pdfTest() {
      return this.pdfBlob
    }
  },
  watch: {
    // 点击左侧导航（open）渲染表区
    GCC(val) {
      this.tableloading = true
      setTimeout(() => {
        this.tableloading = false
        this._spread.fromJSON(JSON.parse(JSON.stringify(this._spread.toJSON())))
        // 采用无table  实时生成虚拟tables 防止逻辑出错
        const hiddenSheet = this._spread.getSheetFromName('hideSheet')
        if (hiddenSheet) {
          this.tmpSaveJson.tables = this.dummyTables
        }
      }, 500)
    },
    pdfTest(val, oldval) {
      this.nextTick(() => {
        console.log(val, oldval, 'this.pdfBlob')
      })
    },
    // 表区初始化动态占位
    tmpSaveJson: function tmpSaveJson(val) {
      if (JSON.stringify(val) !== '{}') {
        this.visibility = 'visibility:visible'
      } else {
        this.visibility = 'visibility:hidden'
      }
    },
    srcs: function(val, oldVal) {
      if (val.reportVersionId !== oldVal.reportVersionId) {
        // sessionStorage.removeItem('submit')
        this.loading = false
        this.operateDisable = false // 是否禁用提交功能
        this.handleDialog()
        this.InitializationTable()
      }
    }
  },
  // created() {
  //   this.createModleTime = (new Date()).getTime()
  //   this.activetime = (new Date()).getTime()
  //   sessionStorage.setItem('activetime', this.activetime)
  //   // 共用计时器
  //   addTheClock(this.activetime, this.createModleTime)
  // },
  // 导航切换修改
  activated() {
    this.createModleTime = (new Date()).getTime()
    this.activetime = (new Date()).getTime()
    sessionStorage.setItem('activetime', this.activetime)
    // 共用计时器
    addTheClock(this.activetime, this.createModleTime)
    if ((window.location.href).indexOf('reportVersionId') === -1) { // 导航切换进入
      const query = window.sessionStorage.getItem('supplierHref')
      this.srcs = this.get_query(query)
      if (sessionStorage.getItem('submit') === '1') {
        this.operateDisable = true
        this._spread.fromJSON({})
      }
    } else {
      window.sessionStorage.setItem('supplierHref', window.location.href)
      sessionStorage.removeItem('submit')
      this.srcs = this.$route.query
    }
  },
  mounted() {
    this.srcs = this.$route.query
    this.handleDialog()
    this.InitializationTable()
  },
  destroyed() {
    closeClock()
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
      // let style = new GC.Spread.Sheets.Style();
      // style.locked = true;
      // this.sheet1.setStyle(1, 3, style);
      // spread.options.highlightInvalidData = true
      // 插入行带有公式复制
      // spread.Sheets.LicenseKey = 'dbs.haier.net|dev.fineway.com,684218588826482#B0nHv6hDZy44aLBnM5QzRxwkawo7RKdkcqR7S9JHMaVmdhZ5bktEZCVWOwlDOah4MBJXaYhkSslkUQFkTphXVLt4cZlUQCBTWFFTVSJ4cWRUUvpHMDJ4VMl4d8Q7ROtyZzZjUvg5RrxENxNFatRmT4ZzS8QUSrNFR5g7cVhFNRl5a5k5RBpFaqdEbZN5TwsiSCtScKhUM9gGeoNFaM3WVk5UcrMWaLF5SJ9WNCllMpdlUIF5LhtUd6sCakBjQqFWOihDRtNWaPJFOl3iWhZGVNRlRRljREpkS7tyUv2Sc9pme5dTRsFUQYtyKW5UVudna5Imcw3yQW3kTs5UNyoEUJJiOiMlIsICRxETQxcTR5IiOigkIsUjNzUDMwgjM0IicfJye&Qf35VfikkR9IkI0IyQiwiIyEjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsICN4QzMyADI5EzMwkTMwIjI0ICdyNkIsISbvNmL9F6dl9Wam9idlRGL4VmbuIXZpFGauMnYkJiOiMXbEJCLiACuPWOrFWOkZmeicaOgKaekne+rui+tNaej3SeuWaOr0S+lMWuI0ISYONkIsIiM8QjNygDO8UDOxIDN8YjI0ICZJJCL3V6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3cmNyFUTU3WUUh6dFdUbWNUMzlUQyZXRQBjSplTRtJUdlplQ8N5KW9GZr4kaFdldaJTTRhGUxdjRFJjbH9UNOp6QOlzR94GZzxGR9hVWFJUbnxkepvVDL'
      GC.Spread.Sheets.LicenseKey = 'dbs.haier.net|dev.fineway.com,684218588826482#B0nHv6hDZy44aLBnM5QzRxwkawo7RKdkcqR7S9JHMaVmdhZ5bktEZCVWOwlDOah4MBJXaYhkSslkUQFkTphXVLt4cZlUQCBTWFFTVSJ4cWRUUvpHMDJ4VMl4d8Q7ROtyZzZjUvg5RrxENxNFatRmT4ZzS8QUSrNFR5g7cVhFNRl5a5k5RBpFaqdEbZN5TwsiSCtScKhUM9gGeoNFaM3WVk5UcrMWaLF5SJ9WNCllMpdlUIF5LhtUd6sCakBjQqFWOihDRtNWaPJFOl3iWhZGVNRlRRljREpkS7tyUv2Sc9pme5dTRsFUQYtyKW5UVudna5Imcw3yQW3kTs5UNyoEUJJiOiMlIsICRxETQxcTR5IiOigkIsUjNzUDMwgjM0IicfJye&Qf35VfikkR9IkI0IyQiwiIyEjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsICN4QzMyADI5EzMwkTMwIjI0ICdyNkIsISbvNmL9F6dl9Wam9idlRGL4VmbuIXZpFGauMnYkJiOiMXbEJCLiACuPWOrFWOkZmeicaOgKaekne+rui+tNaej3SeuWaOr0S+lMWuI0ISYONkIsIiM8QjNygDO8UDOxIDN8YjI0ICZJJCL3V6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3cmNyFUTU3WUUh6dFdUbWNUMzlUQyZXRQBjSplTRtJUdlplQ8N5KW9GZr4kaFdldaJTTRhGUxdjRFJjbH9UNOp6QOlzR94GZzxGR9hVWFJUbnxkepvVDL'
      // 移除左侧菜单的插入
      var menuData = spread.contextMenu.menuData
      // spread.options.showVerticalScrollbar = false
      // console.log('111111111111111111111111111111', spread.options.showVerticalScrollbar, spread.options.showHorizontalScrollbar)
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
      this._spread = spread
    },
    // 历史报价单初始化
    spreadInitHandle1: function(spread) {
      this.hisSpread = spread
    },
    // 鼠标移动监听
    moveTheMouse() {
      this.activetime = (new Date()).getTime()
      sessionStorage.setItem('activetime', this.activetime)
      // console.log(this.activetime, this.createModleTime)
    },
    // 报价单点击监听
    clickTheReport() {
      this.sheet1.bind(GC.Spread.Sheets.Events.CellClick, (sender, args) => {
        // if (this.sheet1.getFormula(args.row, args.col)) {
        //   this.$message('公式：' + this.sheet1.getFormula(args.row, args.col))
        // }
        this.activetime = (new Date()).getTime()
        sessionStorage.setItem('activetime', this.activetime)
        const validator = this.sheet1.getDataValidator(args.row, args.col)
        if (validator && validator._ps.errorStyle) {
          validator.Mxb.color = 'yellow'
        }
        // console.log(sender, args, 'sender, args', validator)
      })
    },
    // 拿到现在报价单的脚本
    InitializationTable() {
      // 控制报价单表区渲染
      // this.$store.dispatch('setGC', false)
      this.tableloading = true
      const params = {
        reportVersionId: this.srcs.reportVersionId,
        resultDate: this.srcs.resultDate
      }
      hisXuanran(params)
        .then((res) => {
          this._spread.options.showHorizontalScrollbar = false
          this._spread.options.showVerticalScrollbar = false
          this.BOMTotal = res.resultData.bomPhotoList
          // const tmpSaveJson = lili;
          const tmpSaveJson = JSON.parse(res.resultData.reportScript)
          if (!tmpSaveJson.hasOwnProperty('sheets')) {
            this.tableloading = false
            this.operateDisable = true
            this.$message.error('不是新插件的脚本，无法渲染'); return
          }
          // 判断报价单状态
          this.saveReportState = res.resultData.reportState
          if (res.resultData.reportState === '0001') {
            this.saveReportState = '0002'
            this.saveInlocal(1, res.resultData.reportScript)
          }
          // 判断是否需要去签章
          if (res.resultData.signState === '0001' && (res.resultData.signatureState === '0001' || res.resultData.signatureState === '线上CA签章')) {
            this.isSignature = true
          } else {
            this.isSignature = false
          }
          Object.keys(tmpSaveJson.sheets).some((element) => {
            if (tmpSaveJson.sheets[element].index === 0) {
              this.sheet1Name = element
              this.tmpSaveJson = tmpSaveJson.sheets[element]
              return true
            }
          })
          // 重新渲染报价单
          this._spread.fromJSON(tmpSaveJson)
          // 数据验证
          this._spread.options.highlightInvalidData = false
          // 隐藏添加sheet，隐藏第二个sheet页
          this._spread.options.newTabVisible = false
          this._spread.options.tabStripVisible = false
          this.sheet1 = this._spread.getSheet(0)
          this.clickTheReport()
          // 防止改变报价单结构  把tables属性丢失
          if (!this.tmpSaveJson.tables) {
            const hiddenSheet = this._spread.getSheetFromName('hideSheet')
            if (hiddenSheet) {
              const tableTotal = JSON.parse(hiddenSheet.getValue(0, 0))
              this.dummyTables = this.tagToTables(this.reconsitutionTag(tableTotal))
              this.tmpSaveJson.tables = this.dummyTables
            } else {
              this.tableloading = false
              console.log('该json无tables属性')
              return
            }
          }
          // 防止table顺序错乱 对历史匹配数据的影响
          this.orderTables(this.tmpSaveJson)
          this.removeInvalidRowsCol()
          this.headAndEnd(res.resultData)
          // 报价单BOM信息是否存在
          if (!res.resultData.hasOwnProperty('bomPhotoList')) {
            this.$message('此报价单没有BOM信息')
          } else {
            // 自动加行
            this.addRowsAuto(this.tmpSaveJson.data.dataTable)
          }
          console.log(this.tmpSaveJson, '新的tmpSaveJson')
          // 判断是否有从需求带过来的固定表头
          this.requiresH()
          // 贴现率等一系列操作
          this.discountSearch()
          // console.log(this.validatorRowCol, this.validatorTotal, 111111111)
          this.tableloading = false
        })
        .catch((err) => {
          console.log(err, '初始渲染失败的json', this.tmpSaveJson)
          this.tableloading = false
        })
    },
    // 保存/提交按钮
    saveInlocal(val, jiao) {
      // this.signatureloading = false;
      const params = {
        report_version_id: this.srcs.reportVersionId, // 填报单标识
        report_state: this.saveReportState, // 填报单状态
        report_script: '' // 填报单回显脚本
      }
      // 提交按钮触发的
      if (val === 3) {
        this._spread.options.highlightInvalidData = true
        if (this.tmpSaveJson.tables) {
          if (!this.checkTable()) {
            return
          }
        }
        // 需要线上签章
        if (this.isSignature) {
          // 是否完成了签章
          if (this.completeSignature) {
            // this.dialogVisible = true
            this.exportPdfAndSeal()
            return
          } else {
            params.signed_report_address = this.pdfPathss
            params.sign_state = '0002'
          }
        }
        params.report_state = '0003'
        params.report_script = JSON.stringify(this._spread.toJSON())
      } else if (val === 2) {
        // 保存触发的
        params.report_script = JSON.stringify(this._spread.toJSON())
      } else {
        // 页面初始进入触发的
        params.report_script = jiao
      }
      this.tableloading = true
      submitSave(params)
        .then((res) => {
          this.tableloading = false
          // 保存和提交都要更新一下报价单
          if (val !== 1) {
            if (res.success) {
              this.srcs.reportVersionId = res.resultData
              window.sessionStorage.setItem('submit', 1)
              this.$message.success('操作成功')
              // this.InitializationTable();
              if (val === 3) {
                this.$router.push({ name: 'Listprivate' })
              }
            } else {
              this.$message.error('操作失败!')
            }
          } else {
            this.srcs.reportVersionId = res.resultData
          }
        })
        .catch((err) => {
          // this.$message.error('保存失败');
          console.log('保存失败的json', err)
          this.tableloading = false
        })
    },
    // 校验表格填写是否正确  是否漏填
    checkTable() {
      // debugger
      this.warnValidator = []
      this.stopValidator = []
      for (const table in this.tmpSaveJson.tables) {
        const element = this.tmpSaveJson.tables[table]
        if (element.rowCount > 1) {
          for (let i = element.row + 1; i < element.row + element.rowCount; i++) {
            for (const col in element.columns) {
              const colIndex = +col + element.col
              if (!this.sheet1.isValid(i, colIndex, this.sheet1.getValue(i, colIndex))) {
                const validator = this.sheet1.getDataValidator(i, colIndex)
                validator.showInputMessage(true)
                const errorMessage = validator._ps.errorMessage ? validator._ps.errorMessage : '输入值不合法'
                validator.inputMessage(errorMessage)
                if (validator._ps.errorStyle) {
                  validator.inputTitle('警告')
                  this.warnValidator.push({
                    row: i,
                    col: colIndex
                  })
                } else {
                  validator.inputTitle('停止')
                  this.stopValidator.push({
                    row: i,
                    col: colIndex
                  })
                }
                // console.log('row:' + i, 'col:' + colIndex, '校验', validator)
              }
            }
          }
        }
      }
      if (this.stopValidator.length) {
        this.$message.error('表格类型输入不正确 或 表格必填项存在空值！')
        return false
      } else if (this.warnValidator.length) {
        if (confirm('还有警告类未改，确定提交吗？')) {
          this._spread.options.highlightInvalidData = false
          return true
        } else {
          return false
        }
      } else {
        return true
      }
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
    // 将tables按行排序
    orderTables(tableArr) {
      let tableRow = []
      const newTables = []
      tableArr.tables.forEach(element => {
        tableRow.push(element.row)
      })
      tableRow = tableRow.sort((a, b) => {
        return a - b
      })
      tableRow.forEach(element => {
        tableArr.tables.some(ele => {
          if (element === ele.row) {
            newTables.push(ele)
            return true
          }
        })
      })
      tableArr.tables = newTables
    },
    // 自动加行 针对bom数据渲染且行数不足的情况
    addRowsAuto(arr) {
      let special = -1
      this.addRowsTotal = new Array()
      this.addSigel = new Array()
      // 找出所有设置过BOM的所在行
      for (const rows in arr) {
        for (const cols in arr[rows]) {
          if (arr[rows][cols].tag !== undefined && arr[rows][cols].value !== undefined) {
            if (this.fuzzyMatch(arr[rows][cols].value, this.bomName) !== -1 && arr[rows][cols].tag.logicalAccess === '0001') {
              this.addRowsTotal.push(+rows)
              break
            }
          }
        }
      }
      // 动态添加行 并重置json数据
      this.addRowsTotal.forEach((ele, indexs) => {
        this.tmpSaveJson.tables.some((elem, index) => {
          if ((ele === elem.row) || (ele + 1 === elem.row)) {
            let specialAdd = 0
            if (ele + 1 === elem.row) {
              special = index
              specialAdd = 1
            }
            const element = elem.rowCount === 1 ? this.tmpSaveJson.tables[index + 1] : elem
            let cha = this.BOMTotal.length - element.rowCount + 2 - specialAdd
            const addTheRow = {
              add: cha,
              sign: false,
              rowCount: element.rowCount,
              rowHeight: this.sheet1.getRowHeight(ele + 1),
              col: element.col,
              colCount: element.colCount,
              row: element.row
            }
            // 表区有合计时 不覆盖合计那行
            let total = this.sheet1.getValue(element.row + element.rowCount - 1, element.col + 1)
            if (this.sheet1.getValue(element.row + element.rowCount - 1, element.col)) {
              total = this.sheet1.getValue(element.row + element.rowCount - 2, element.col + 1)
              cha += 1
            }
            if (this.fuzzyMatch(total, this.totalOneArea) !== -1) {
              cha += 1
              addTheRow.sign = true
            }
            addTheRow.add = cha > 0 ? cha : 0
            this.addSigel.push(addTheRow)
            return true
          }
        })
      })
      // 动态添加行  带入样式等操作
      this._spread.suspendPaint() // 停止表单重绘
      this.addSigel.forEach((element, index) => {
        this.addBOMRows(this.addSigel, index)
        const hastotal = element.row + 1 + this.addResult
        // const hastotal = element.row + element.rowCount - 1 + this.addResult
        // const result = element.sign ? hastotal - 1 : hastotal
        const result = hastotal
        console.log(this.addResult, '累计加的行', this.addSigel, hastotal, this.addRowsTotal)
        for (let newRow = result; newRow < result + element.add; newRow++) {
          this.sheet1.addRows(newRow, 1)
          if (newRow === result && (element.row + 1 + this.addResult === hastotal)) {
            this.sheet1.copyTo(newRow + 1, 0, newRow, 0, 1, this.sheet1.getColumnCount(), GC.Spread.Sheets.CopyToOptions.all)
          } else {
            this.sheet1.copyTo(newRow - 1, 0, newRow, 0, 1, this.sheet1.getColumnCount(), GC.Spread.Sheets.CopyToOptions.all)
          }
          this.sheet1.setRowHeight(newRow, element.rowHeight)
          // for (let j = element.col; j < element.colCount + element.col; j++) {
          //   this.sheet1.setValue(newRow, j, null)
          //   if (this.sheet1.getFormula(newRow, j)) {
          //     this.sheet1.getCell(newRow, j).locked(true)
          //   } else {
          //     this.sheet1.getCell(newRow, j).locked(false)
          //   }
          // }
        }
      })
      this._spread.resumePaint()
      this.tmpSaveJson = this._spread.toJSON().sheets[this.sheet1Name]
      const hiddenSheet = this._spread.getSheetFromName('hideSheet')
      if (hiddenSheet) {
        this.tmpSaveJson.tables = this.dummyTables
      }
      this.orderTables(this.tmpSaveJson)
      if (special !== -1) {
        this.tmpSaveJson.tables[special].row -= 1
        this.tmpSaveJson.tables[special].rowCount += 1
      }
    },
    // 累加之前表区需要添加BOM的行数
    addBOMRows(arr, index) {
      // debugger
      this.addResult = 0
      arr.forEach((element, indexs) => {
        if (indexs < index) {
          this.addResult += element.add
        }
      })
    },
    // 取所有设置贴现率、BOM数据的 只限于列
    discountSearch() {
      this.discountList = new Array()
      this.paymentList = new Array()
      this.saveList = new Array()
      this.hiddenTotal = new Array()
      this.tmpSaveJson.tables.forEach((element, indexss) => {
        // // 清除过滤筛选按钮
        // for (const key in element.rowFilter.filterButtonVisibleInfo) {
        //   element.rowFilter.filterButtonVisibleInfo[key] = false
        // }
        element.columns.forEach((ele, index) => {
          const tagJudge = this.sheet1.getTag(element.row, index + element.col)
          if (tagJudge) {
            const tagValue = tagJudge.logicalAccess
            // 贴现率的表头搜索
            const findDiscount = this.discountName.indexOf(tagValue)
            const positionss = {
              row: element.row,
              col: index + element.col,
              table: indexss,
              indexs: findDiscount
            }
            if (findDiscount > 1) {
              this.discountList.push(positionss)
            } else if (findDiscount >= 0) {
              this.paymentList.push(positionss)
            }
            // bom数据的表头搜索
            this.findIndex = this.fuzzyMatch(ele.name, this.bomName)
            if ((this.findIndex !== -1) && tagValue === '0001') {
              const position = {
                row: element.row,
                col: index + element.col,
                table: indexss,
                indexs: this.findIndex
              }
              if (element.rowCount === 1) {
                const resultTable = this.tmpSaveJson.tables[indexss + 1]
                if (resultTable && resultTable.rowCount !== 1) {
                  position.row = resultTable.row
                  position.col = resultTable.col + index
                  position.table = indexss + 1
                }
              }
              this.saveList.push(position)
            }
            // console.log(ele, ele.name, tagJudge, this.fuzzyMatch(ele.name, this.reqName), findDiscount, this.findIndex, '非隐藏', 'row:' + element.row, 'col:' + (index + element.col))
          } else {
            // console.log(ele, ele.name, tagJudge, '非需求', '非财务', '非BOM', this.fuzzyMatch(ele.name, this.hiddenHead), 'row:' + element.row, 'col:' + (index + element.col))
          }
          // 找出一般管理费率 和 利润率
          if (this.fuzzyMatch(ele.name, this.hiddenHead) !== -1) {
            const position = {
              row: element.row + 1,
              col: index + element.col
            }
            this.hiddenTotal.push(position)
          }
          // 为了匹配历史报价单
          if (element.rowCount === 1 && /Column/.test(this.sheet1.getValue(element.row + 1, index + element.col))) {
            this.tmpSaveJson.tables[indexss + 1].columns[index].name = ele.name
          }
        })
      })
      // bom数据操作
      if (this.saveList.length && this.BOMTotal) {
        console.log(this.saveList, 'this.saveList')
        this.bomsearchs(this.saveList, this.BOMTotal, this.bomNameAfter)
      }
      // 贴现率  账期
      if (this.discountList.length) {
        this.discountRate()
      }
      // 付款条件 贷款利率
      if (this.paymentList.length) {
        this.payment()
      }
      // 隐藏一般管理费率 和 利润率
      if (this.hiddenTotal.length) {
        this.hiddenReport()
      }
    },
    // 贴现率或账期
    discountRate() {
      const params = {
        resultDate: this.srcs.resultDate.split(' ')[0]
      }
      searchLiscountRate(params)
        .then((res) => {
          const arr = new Array()
          arr.push(res.resultData)
          this.bomsearchs(this.discountList, arr, this.discountNameAfter)
        })
        .catch((err) => {
          //
        })
    },
    // 付款条件或贷款利率  "V9039881", "2018-12-12"
    payment() {
      const params = {
        resultDate: this.srcs.resultDate.split(' ')[0]
      }
      searchLendingRate(params)
        .then((res) => {
          const arr = new Array()
          arr.push(res.resultData)
          this.bomsearchs(this.paymentList, arr, this.discountNameAfter)
        })
        .catch((err) => {
          //
        })
    },
    // 渲染bom、贴现率、需求过来的数据
    bomsearchs(array, total, after) {
      // 如果表头设置过BOM
      // console.log(array, total, '渲染外部数据')
      this._spread.suspendPaint()
      array.forEach((element) => {
        const tableTar = this.tmpSaveJson.tables[element.table]
        const arr = this.getBom(element.indexs, total, after)
        const row = tableTar.row + 1
        arr.forEach((elements, indexs) => {
          if (elements === '' || (typeof elements === 'undefined')) { return }
          this.sheet1.getCell(row + indexs, element.col).locked(false)
          // 存入校验器
          if (this.sheet1.getDataValidator(row + indexs, element.col)) {
            this.validatorTotal.push(this.sheet1.getDataValidator(row + indexs, element.col))
            const valid = {
              row: row + indexs,
              col: element.col
            }
            this.validatorRowCol.push(valid)
            this.sheet1.setDataValidator(row + indexs, element.col, null)
          }
          // 去掉公式 否则无法赋值
          if (this.sheet1.getFormula(row + indexs, element.col)) {
            this.formulaTotal.push(this.sheet1.getFormula(row + indexs, element.col))
            const formulas = {
              row: row + indexs,
              col: element.col
            }
            this.formulaRowCol.push(formulas)
            this.sheet1.setFormula(row + indexs, element.col, null)
          }
          this.sheet1.setValue(row + indexs, element.col, elements)
          this.sheet1.getCell(row + indexs, element.col).locked(true)
        })
      })
      this._spread.resumePaint()
    },
    // 取对应表名的逻辑数据集合
    getBom(str, target, after) {
      const arr = new Array()
      target.forEach((element) => {
        arr.push(element[after[str]])
      })
      // // 数组字符串元素去重
      // for (let i = 0; i < arr.length; i++) {
      //   if (arr.indexOf(arr[i]) !== arr.lastIndexOf(arr[i])) {
      //     arr.splice(arr.lastIndexOf(arr[i]),1);
      //     i--;
      //   }
      // }
      return arr
    },
    // 根据填报单id查询需求带过来的表头
    requiresH() {
      this.reqList = new Array()
      this.reqIndex = -1
      const target = this.tmpSaveJson.tables[0]
      target.columns.forEach((elements, index) => {
        if (this.sheet1.getTag(target.row, index + target.col)) {
          const tagValue = this.sheet1.getTag(target.row, index + target.col).logicalAccess
          this.reqIndex = this.fuzzyMatch(elements.name, this.reqName)
          if (this.reqIndex !== -1 && tagValue === '0003') {
            const position = {
              row: target.row,
              col: index + target.col,
              table: 0,
              indexs: this.reqIndex
            }
            this.reqList.push(position)
          }
        }
      })
      if (this.reqList.length !== 0) {
        const params = {
          reportId: this.srcs.reportId
        }
        requires(params)
          .then((res) => {
            if (Object.keys(res.resultData).length !== 0) {
              const arr = new Array()
              arr.push(res.resultData)
              this.bomsearchs(this.reqList, arr, this.reqNameAfter)
            }
          })
          .catch((err) => {
            console.log(err, '需求数据catch')
          })
      }
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
    // 渲染表头，表头非必填信息
    headAndEnd(res) {
      // 表头信息
      const headBegin = this.tmpSaveJson.tables[0].row - 1
      for (let headIndex = headBegin; headIndex >= 0; headIndex--) {
        for (const colKey in this.tmpSaveJson.tables[0].columns) {
          const headCol = +colKey + this.tmpSaveJson.tables[0].col
          if (this.fuzzyMatch(this.sheet1.getValue(headIndex, headCol), ['报价单号']) !== -1) {
            this.sheet1.setValue(headIndex, headCol, '报价单号：' + res.reportCode)
            console.log(headIndex, headCol, '表头位置')
          }
        }
      }
      // 表尾信息
      const target = this.tmpSaveJson.tables[this.tmpSaveJson.tables.length - 1]
      const tarCount = this.tmpSaveJson.tables.length > 1 ? 1 : 0
      const newColumns = this.tmpSaveJson.tables[tarCount]
      const begin = target.row + target.rowCount
      if (begin < this.sheet1.getRowCount()) {
        for (let i = begin; i < this.sheet1.getRowCount(); i++) {
          for (const keys in newColumns.columns) {
            const endIndex = +keys + this.tmpSaveJson.tables[0].col
            if (this.fuzzyMatch(this.sheet1.getValue(i, endIndex), ['公司名称']) !== -1) {
              this.sheet1.setValue(i, endIndex + 1, res.supplierName)
              this.sheet1.setValue(i + 1, endIndex, 'signature_position')
              this.sheet1.getCell(i + 1, endIndex).foreColor('#fff')
              // console.log(i, endIndex + 2, '签章位置')
            } else if (this.fuzzyMatch(this.sheet1.getValue(i, endIndex), ['日期:', '日期：']) !== -1) {
              this.sheet1.setValue(i, endIndex + 1, this.getDate())
            }
          }
        }
      }
    },
    // 修改模板/报价单 无效行列太多导致的滚动条过长
    removeInvalidRowsCol() {
      const rowTotal = this.sheet1.getRowCount()
      const lastTable = this.tmpSaveJson.tables[this.tmpSaveJson.tables.length - 1]
      const lastBegin = lastTable.row + lastTable.rowCount + 20
      if (rowTotal > lastBegin) {
        this.sheet1.deleteRows(lastBegin, rowTotal - lastBegin)
      }
      // const rightBegin = lastTable.col + lastTable.colCount
      // const rightCount = this.sheet1.getColumnCount() - rightBegin
      // let lastEnd = 0
      // for (let i = lastBegin; i < rowTotal; i++) {
      //   if (this.sheet1.getValue(i, lastTable.col) === null || this.sheet1.getValue(i, lastTable.col) === '') {
      //     lastEnd = i
      //     break
      //   }
      // }
      // const EndLength = rowTotal - lastEnd
      // console.log(lastEnd, rowTotal)
      // if (EndLength > 0) {
      //   // 删除表尾多余行
      //   this.sheet1.deleteRows(lastEnd, EndLength)
      // }
      // if (this.tmpSaveJson.tables[0].row !== 0) {
      //   // 删除表头多余行
      //   let begintable = 0
      //   for (let i = this.tmpSaveJson.tables[0].row - 1; i >= 0; i--) {
      //     if (this.sheet1.getValue(i, lastTable.col) === null || this.sheet1.getValue(i, lastTable.col) === '') {
      //       begintable = i
      //       break
      //     }
      //   }
      //   this.sheet1.deleteRows(0, begintable + 1)
      // }
      // if (rightCount > 0) {
      //   // 删除右边的空列
      //   this.sheet1.deleteColumns(rightBegin, rightCount)
      // }
      // if (lastTable.col !== 0) {
      //   // 删除左边的空列
      //   this.sheet1.deleteColumns(0, lastTable.col)
      // }
      // this.tmpSaveJson = this._spread.toJSON().sheets[this.sheet1Name]
      // 删除底部滚动
      // this._spread.options.showHorizontalScrollbar = false
      // 删除右侧底部滚动
      // this._spread.options.showVerticalScrollbar = false
      // 背景颜色
      // this._spread.options.backColor = 'red'
      this._spread.options.grayAreaBackColor = '#FFFFFF'
      // 超出不滚动
      this._spread.options.scrollbarMaxAlign = true
      // 不显示列头
      this._spread.options.ColumnHeaderVisible = false
      // 禁止缩放
      this._spread.options.allowUserZoom = false
      var sheet = this._spread.getActiveSheet()
      // sheet.setColumnHeaderVisible(false)sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader);//隐藏行号
      sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader)// 隐藏列号
      sheet.options.gridline = { showHorizontalGridline: false, showVerticalGridline: false }// 水平线。垂直线
    },
    // 获取当前日期
    getDate() {
      const date = new Date()
      const month = date.getMonth() + 1
      const newDate = date.getDate()
      const datess = date.getFullYear() + '-' + this.timeAdd0(month + '') + '-' + this.timeAdd0(newDate + '')
      return datess
    },
    // 日期补零
    timeAdd0(str) {
      if (str.length <= 1) {
        str = '0' + str
      }
      return str
    },
    // 历史报价单下拉列表
    handleDialog() {
      this.historyTime = new Array()
      const params = {
        module_code: this.srcs.moduleCode,
        module_describe: ''
      }
      historys(params)
        .then(res => {
          this.form.options = res.resultData
          // res.resultData.forEach((element) => {
          //   // 日期转时间戳
          //   const date = new Date(element.report_date.replace(/-/g, '/'))
          //   this.historyTime.push(date.getTime())
          // })
          // // 找出报价单最近的5个日期
          // this.chooseTime = JSON.parse(JSON.stringify(this.historyTime))
          // const dates = new Date(this.srcs.resultDate.replace(/-/g, '/'))
          // const dateTar = dates.getTime()
          // this.chooseTime.push(dateTar)
          // this.chooseTime = this.chooseTime.sort((a, b) => {
          //   return b - a
          // })
          // let target = 0
          // this.chooseTime.some((ele, index) => {
          //   target = index
          //   return ele === dateTar
          // })
          // this.chooseTime.splice(target, 1)
          // if (target < 3) {
          //   this.chooseTime.splice(5, this.historyTime.length - 4)
          // } else if (target > this.historyTime.length - 3) {
          //   this.chooseTime.splice(0, this.historyTime.length - 5)
          // } else {
          //   const tarArr = new Array()
          //   tarArr.push(this.chooseTime[target + 1], this.chooseTime[target], this.chooseTime[target - 1], this.chooseTime[target - 2])
          //   if ((this.chooseTime[target + 2] - dateTar) < (this.chooseTime[target - 3] - dateTar)) {
          //     tarArr.unshift(this.chooseTime[target + 2])
          //   } else {
          //     tarArr.push(this.chooseTime[target - 3])
          //   }
          //   this.chooseTime = tarArr
          // }
          // // 找出对应的报价单信息
          // this.chooseTime.forEach((element) => {
          //   let findIndex = 0
          //   for (let i = 0; i < this.historyTime.length; i++) {
          //     if (element === this.historyTime[i]) {
          //       findIndex = i
          //       break
          //     }
          //   }
          //   const theOption = {
          //     report_version_id: res.resultData[findIndex].report_version_id,
          //     report_date: res.resultData[findIndex].report_date,
          //     module_describe: res.resultData[findIndex].module_describe
          //   }
          //   this.form.options.push(theOption)
          // })
          // this.form.options = [{
          //   report_date: this.srcs.resultDate,
          //   report_version_id: this.srcs.reportVersionId,
          //   module_describe: '测试sheet'
          // }]
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 历史报价单匹配
    chooseHis(e) {
      this.tableloading = true
      // 结果公示时间
      let resultDate = ''
      // 报价单版本标识
      let reportVersionId = ''
      this.form.options.some(item => {
        if (e === item.report_version_id) {
          resultDate = item.report_date
          reportVersionId = item.report_version_id
          return true
        }
      })
      const params = {
        reportVersionId: reportVersionId,
        resultDate: resultDate
      }
      hisXuanran(params)
        .then(res => {
          const exportResult = JSON.parse(res.resultData.reportScript)
          // const exportResult = JSON.parse(localStorage.getItem("historys"));
          console.log(exportResult, '历史的json')
          if (!exportResult.hasOwnProperty('sheets')) {
            this.tableloading = false
            this.$message.error('不是新插件的脚本，无法匹配')
            this.showhis = false
            return
          }
          this.hisSpread.fromJSON(exportResult)
          // console.log(JSON.stringify(exportResult), 'exportResult')
          const hisSheet = this.hisSpread.getSheet(0)
          Object.keys(exportResult.sheets).some((element) => {
            if (exportResult.sheets[element].index === 0) {
              this.exportResult = exportResult.sheets[element]
              return true
            }
          })
          if (!this.tmpSaveJson.tables && (!this.exportResult.tables)) {
            const hiddenSheet = this.hisSpread.getSheetFromName('hideSheet')
            if (hiddenSheet) {
              const tableTotal = JSON.parse(hiddenSheet.getValue(0, 0))
              this.exportResult.tables = this.tagToTables(this.reconsitutionTag(tableTotal))
            } else {
              console.log('此报价单json不含tables，暂无法匹配')
              return
            }
          }
          this.orderTables(this.exportResult)
          this.tmpSaveJson.tables.forEach((element, index) => {
            if (element.rowCount > 1 && this.exportResult.tables[index]) {
              // const lengths = element.tableHeadTop.length - this.exportResult[index].tableHeadTop.length;
              const headObj = {
                row: element.row,
                col: 0,
                rowTotal: element.rowCount,
                table: index
              }
              const hisHeadObj = {
                col: 0,
                row: this.exportResult.tables[index].row,
                rowTotal: this.exportResult.tables[index].rowCount
              }
              element.columns.forEach((head, headIndex) => {
                if (this.headFilter.indexOf(head.name) === -1) {
                  headObj.col = headIndex + element.col
                  this.exportResult.tables[index].columns.forEach((hisHead, hisHeadIndex) => {
                    if ((head.name.indexOf('column') === -1) && (head.name === hisHead.name)) {
                      // console.log(head.name, hisHead.name)
                      hisHeadObj.col = hisHeadIndex + this.exportResult.tables[index].col
                      this.historyCell(headObj, hisHeadObj, hisSheet)
                    }
                  })
                }
              })
            }
          })
          this.tableloading = false
          this.$message.success('历史数据渲染成功')
          this.showhis = true
        })
        .catch(err => {
          this.tableloading = false
          console.log(err, '历史匹配的catch')
          this.showhis = false
        })
    },
    // 渲染同表区 同字段名称的单元格值
    historyCell(newHead, oldHead, hisSheet) {
      // console.log(newHead, oldHead)
      const begin = newHead.row + 1
      const length = newHead.row + newHead.rowTotal
      const limit = oldHead.row + oldHead.rowTotal
      for (let i = begin; i < length; i++) {
        if (this.sheet1.getValue(i, newHead.col) === null && i < limit) {
          const oldValue = hisSheet.getValue(i - newHead.row + oldHead.row, oldHead.col)
          // console.log(this.sheet1.getValue(i, newHead.col), i, newHead.col, '新的单元格')
          // console.log(oldValue, i - newHead.row + oldHead.row, oldHead.col, '老的单元格')
          if (oldValue !== null) {
            this.sheet1.setValue(i, newHead.col, oldValue)
          }
        }
      }
    },
    // 文件流
    processFile(event) {
      this.filename = event.target.files[0].name
      this.filename = this.filename.substring(0, (this.filename.length - 5))
      this.excelFile = event.target.files[0]
      this.importExcel()
      // console.log('测试tag属性导入后2', this.sheet1.getTag(0, 0))
    },
    // Excel导入
    importExcel() {
      var excelIO = new ExcelIO.IO()
      // console.log(excelIO)
      var self = this
      excelIO.open(self.excelFile, function(json) {
        self._spread.fromJSON(json)
        console.log(json, 'json')
        // 导入的json生成虚拟tables 防止校验出错
        self.tmpSaveJson = json.sheets[self.sheet1Name]
        const hiddenSheet = self._spread.getSheetFromName('hideSheet')
        if (!self.tmpSaveJson.tables && hiddenSheet) {
          const tableTotal = JSON.parse(hiddenSheet.getValue(0, 0))
          self.dummyTables = self.tagToTables(self.reconsitutionTag(tableTotal))
          self.tmpSaveJson.tables = self.dummyTables
        }
        // 数据验证
        self._spread.options.highlightInvalidData = false
        // self.sheet1 = self._spread.getSheet(0)
        // console.log('测试tag属性导入后1', this.sheet1.getTag(0, 0))
      }, function(err) {
        alert(err.errorMessage)
      })
    },
    // 导出PDF
    exportPdfAndSeal() {
      var that = this
      this.loading = true
      var fontsObj = fonts
      var sheet = this._spread.getActiveSheet()
      // register the specific custom font
      this.registerCustomFont(fontsObj)
      // 设置单元格字体为simhei
      var columnCount = sheet.getColumnCount()
      var rowCount = sheet.getRowCount()
      // console.log(columnCount, rowCount, '列数/行数')
      this.setPrintInfo(this._spread, columnCount) // 打印/设置比例
      // 更改默认字体为simhei
      var theme = sheet.currentTheme()
      theme.bodyFont('simhei')
      sheet.currentTheme(theme)
      this._spread.suspendPaint() // 停止表单重绘
      for (let c = 0; c < columnCount; c++) {
        for (let i = 0; i < rowCount; i++) {
          sheet.getCell(i, c).font('normal normal 11px simhei')
        }
        sheet.getCell(1, c).font('normal normal 20px simhei')
      }
      this._spread.resumePaint() // 遍历修改完字体后刷新表单
      // 导出pdf
      this._spread.savePDF(function(blob) {
        this.pdfBlob = blob
        // saveAs(blob, '报价单.pdf')
        that.uploadData = sign()
        const formdata = new FormData()
        // if (that.uploadData.certvcode && that.uploadData.djh && that.uploadData.seal && that.uploadData.clientcert) {
        //   formdata.append('file', blob, '报价单.pdf')
        //   formdata.append('certvcode', that.uploadData.certvcode)
        //   formdata.append('djh', that.uploadData.djh)
        //   formdata.append('seal', that.uploadData.seal)
        //   formdata.append('clientcert', that.uploadData.clientcert)
        // } else if (!that.uploadData) {
        //   that.$message.error('未读取KEY，请重试！')
        // }
        if (!that.uploadData) {
          that.$message.error('未读取KEY，请重试！')
        } else if (that.uploadData.certvcode && that.uploadData.djh && that.uploadData.seal && that.uploadData.clientcert) {
          formdata.append('file', blob, '报价单.pdf')
          formdata.append('certvcode', that.uploadData.certvcode)
          formdata.append('djh', that.uploadData.djh)
          formdata.append('seal', that.uploadData.seal)
          formdata.append('clientcert', that.uploadData.clientcert)
          registerPdf(formdata).then(res => {
            that.loading = false
            if (res.success) {
              that.dialogVisible = false
              that.signatureloading = false
              signature(res.resultData.resultData.message, that.$route.query.reportVersionId, that.$route.query.reportId, res.resultData.resultData.fileName) // 注册成功返回的message/版本id/报价单id/fileName
              // signature(res.resultData.message, '4ccf1ea2ac8543c39a615417ddb0a32b', 'cb4814209d07486c8aeca21bd1a16baa', res.resultData.fileName)
              that.completeSignature = true
              var t
              clearTimeout(t)
              t = setTimeout(() => {
              // console.log(window.sessionStorage.getItem('signature'), 'signature')
                if (window.sessionStorage.getItem('signature')) {
                  that.$message.success('签章成功')
                  that.signatureloading = false
                  that.completeSignature = false
                  that.saveInlocal(3, '')
                } else {
                  that.loading = false
                  that.$message.error('签章失败，请重试！')
                  that.signatureloading = false
                }
              }, 500)
            } else if (!res.resultData.success) {
              that.loading = false
              that.$message.error(res.errorMsg + '，请重试！')
              that.dialogVisible = false
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }, console.log('错误回调'), {
        // title: 'Test Title',
        // author: 'Test Author',
        // subject: 'Test Subject',
        // keywords: 'Test Keywords',
        // creator: 'test Creator'
      }, 0)
    },
    // 注册自定义字体
    registerCustomFont(fontsObj) {
      var fonts = {
        normal: fontsObj['simhei.ttf']
      }
      GC.Spread.Sheets.PDF.PDFFontsManager.registerFont('simhei', fonts)
    },
    setPrintInfo(spread, columnCount) {
      // var sheet = spread.getActiveSheet()
      var sheet = spread.sheets[0]
      var allWidth = 0
      for (let i = 0; i < columnCount; i++) {
        allWidth += sheet.getColumnWidth(i)
      }
      // console.log(allWidth, (allWidth / 620), '当前列表宽度')
      var printInfo = sheet.printInfo()
      printInfo.showBorder(false)
      printInfo.showGridLine(false)
      printInfo.showColumnHeader(GC.Spread.Sheets.Print.PrintVisibilityType.hide)
      printInfo.showRowHeader(GC.Spread.Sheets.Print.PrintVisibilityType.hide)
      printInfo.centering(GC.Spread.Sheets.Print.PrintCentering.horizontal)
      printInfo.margin({ top: 75, bottom: 75, left: 20, right: 20, header: 10, footer: 20 })
      var zoom = 1
      var count = Math.ceil(allWidth / 620) // 向上取整，确定页数
      printInfo.zoomFactor(1)
      if (count === 2) {
        zoom = 2
      } else if (count === 3) {
        zoom = 3
      } else if (count === 4) {
        zoom = 4
      } else if (count === 5) {
        zoom = 5
      } else if (count > 0 <= 1) {
        zoom = 1
      } else {
        zoom = 8
      }
      // console.log(zoom, 'zoom')
      printInfo.paperSize(new GC.Spread.Sheets.Print.PaperSize(826 * zoom, 1169 * 1)) // 导出纸张大小（zoom*count）
    },
    // 导出Excel
    exportExcel(filename) {
      var excelIO = new ExcelIO.IO()
      // 数据源序列化 includeBindingSource: true
      // 导出列头第一行 frozenRowsAsColumnHeaders:true
      var json = this._spread.toJSON({
        includeBindingSource: true,
        frozenRowsAsColumnHeaders: true
      })
      // console.log('当前表json', json)
      excelIO.save(
        json,
        function(blob) {
          FaverSaver.saveAs(blob, '报价单' + '.xlsx')
        },
        function(e) {
          console.log(e)
        }
      )
    },
    // 隐藏一般管理费率 和 利润率
    hiddenReport() {
      // 重置 value为空
      this.hiddenTotal.forEach((element, index) => {
        this.sheet1.getCell(element.row - 1, element.col).backColor('rgb(0, 90, 170)')
        this.sheet1.getCell(element.row, element.col).backColor('LightGrey')
        this.sheet1.getCell(element.row - 1, element.col).foreColor('rgb(0, 90, 170)')
        this.sheet1.getCell(element.row, element.col).foreColor('LightGrey')
      })
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
              Commands.startTransaction(context, options)
              var sheet = spread.getActiveSheet()
              var sels = sheet.getSelections()
              // console.log('循环开始', sheet.getDataValidator(1, 0), sheet.getDataValidator(2, 0), sheet.getDataValidator(3, 0))
              if (sels && sels.length > 0) {
                // 停止表单重绘
                spread.suspendPaint()
                for (var i = 0; i < sels.length; i++) {
                  var sel = sels[i]
                  var row = sel.row
                  var rowCount = sel.rowCount
                  sheet.addRows(row + 1, rowCount)
                  // 复制上一行行高
                  // sheet.setRowHeight(row + 1, sheet.getRowHeight(row))
                  for (let g = 1; g <= rowCount; g++) {
                    // 复制区域左上起始Y, 复制区域左上起始X, 黏贴区域左上起始Y, 黏贴区域左上起始X, 要复制的行数, 要复制的列数 复制参数.all全复制(查看复制内容console.log(GC.Spread.Sheets.CopyToOptions))
                    sheet.copyTo(row, 0, row + g, 0, 1, sel.colCount, GC.Spread.Sheets.CopyToOptions.all)
                    // 行高问题
                    sheet.setRowHeight(row + g, sheet.getRowHeight(row))
                    // 枚举与逻辑冲突的问题
                    that.validatorRowCol.forEach((elementss, indexss) => {
                      if (elementss.row === row) {
                        sheet.setDataValidator(row + g, elementss.col, that.validatorTotal[indexss])
                      }
                    })
                    // 公式与逻辑冲突的问题
                    that.formulaRowCol.forEach((elementss, indexss) => {
                      if (elementss.row === row) {
                        sheet.setFormula(row + g, elementss.col, that.formulaTotal[indexss])
                      }
                    })
                    for (let j = 0; j < sel.colCount; j++) {
                      sheet.setValue(row + g, j, null)
                      // console.log(j)
                      // 获取包含此单元格范围的工作表。 参数1.获取起始行。 参数2.获取起始列。 参数3.获取行计数。 参数4.获取列计数。参数5.获取包含此单元格范围的区域。
                      // spread.getSheet(0).getRange(1, 3, 1, 1, GC.Spread.Sheets.SheetArea.viewport).locked(true)
                      // 若存在公式则锁定这个单元格
                      // console.log('11111111111111111111111', spread.getSheet(0).getCell(row, j))
                      if (sheet.getFormula(row + g, j)) {
                        spread.getSheet(0).getCell(row + g, j).locked(true)
                      } else {
                        spread.getSheet(0).getCell(row + g, j).locked(false)
                      }
                      // console.log(sheet.getFormula(row + 1, j))
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
    // 校验
    handleCheckout() {
      // this.sheet1.bind(GC.Spread.Sheets.Events.ValidationError, function(e, args) {
      //   console.log(e, args)
      // })
      // var sheet = this._spread.getActiveSheet()
      // var sp = this._spread.getSheet(0)
      // // const validList = sheet.getDataValidator(16, 4)
      // // validList.isValid(sheet, 1, 1, sheet.getValue(row,col))
      // // validList.isValid(this._spread.getSheet(0), 1, 1, this._spread.getSheet(0).getValue(16,4))
      // console.log(11111111111111111111111, sheet.isValid(16, 4, sp.getValue(16, 4)), sp.getValue(0, 0))
      // console.log('数据校验')
      const JsonData = { 'version': '12.0.0', 'sheetCount': 2, 'sheets': { 'Sheet1': { 'name': 'Sheet1', 'rowCount': 201, 'activeRow': 3, 'theme': 'Office', 'data': { 'dataTable': { '1': { '0': { 'value': 2 }, '14': { 'value': 2, 'style': { 'locked': false }}}, '2': { '0': { 'value': 3 }}, '3': { '0': { 'value': 22 }}}, 'defaultDataNode': { 'style': { 'themeFont': 'Body' }}}, 'rowHeaderData': { 'defaultDataNode': { 'style': { 'themeFont': 'Body' }}}, 'colHeaderData': { 'defaultDataNode': { 'style': { 'themeFont': 'Body' }}}, 'selections': { '0': { 'row': 3, 'rowCount': 1, 'col': 0, 'colCount': 1 }, 'length': 1 }, 'comments': [{ 'rowIndex': 1, 'colIndex': 0, 'text': '提示信息1', 'width': 124, 'height': 33, 'zIndex': 897 }, { 'rowIndex': 2, 'colIndex': 0, 'text': '提示信息2', 'location': { 'x': 9, 'y': -16 }, 'width': 101, 'height': 31, 'zIndex': 898 }], 'validations': [{ 'errorTitle': '333', 'type': 2, 'condition': { 'conType': 0, 'compareType': 1, 'item1': { 'conType': 1, 'compareType': 3, 'expected': 1, 'ranges': [{ 'row': 1, 'rowCount': 1, 'col': 14, 'colCount': 1 }] }, 'item2': { 'conType': 1, 'compareType': 5, 'expected': 2, 'ranges': [{ 'row': 1, 'rowCount': 1, 'col': 14, 'colCount': 1 }] }, 'ignoreBlank': true, 'ranges': [{ 'row': 1, 'rowCount': 1, 'col': 14, 'colCount': 1 }] }, 'ranges': 'O2' }, { 'errorStyle': 1, 'errorTitle': '警告类型', 'type': 1, 'condition': { 'conType': 0, 'compareType': 1, 'item1': { 'conType': 1, 'compareType': 3, 'expected': 6, 'integerValue': true, 'ranges': [{ 'row': 2, 'rowCount': 1, 'col': 0, 'colCount': 1 }] }, 'item2': { 'conType': 1, 'compareType': 5, 'expected': 8, 'integerValue': true, 'ranges': [{ 'row': 2, 'rowCount': 1, 'col': 0, 'colCount': 1 }] }, 'ignoreBlank': true, 'ranges': [{ 'row': 2, 'rowCount': 1, 'col': 0, 'colCount': 1 }] }, 'ranges': 'A3' }, { 'errorTitle': '停止类型', 'type': 2, 'condition': { 'conType': 0, 'compareType': 1, 'item1': { 'conType': 1, 'compareType': 3, 'expected': 2, 'ranges': [{ 'row': 1, 'rowCount': 1, 'col': 0, 'colCount': 1 }] }, 'item2': { 'conType': 1, 'compareType': 5, 'expected': 4, 'ranges': [{ 'row': 1, 'rowCount': 1, 'col': 0, 'colCount': 1 }] }, 'ignoreBlank': true, 'ranges': [{ 'row': 1, 'rowCount': 1, 'col': 0, 'colCount': 1 }] }, 'ranges': 'A2' }, { 'errorStyle': 2, 'errorTitle': '信息类型', 'type': 2, 'condition': { 'conType': 0, 'compareType': 1, 'item1': { 'conType': 1, 'compareType': 3, 'expected': 33, 'ranges': [{ 'row': 3, 'rowCount': 1, 'col': 0, 'colCount': 1 }] }, 'item2': { 'conType': 1, 'compareType': 5, 'expected': 34, 'ranges': [{ 'row': 3, 'rowCount': 1, 'col': 0, 'colCount': 1 }] }, 'ignoreBlank': true, 'ranges': [{ 'row': 3, 'rowCount': 1, 'col': 0, 'colCount': 1 }] }, 'ranges': 'A4' }], 'tables': [{ 'name': 'Table1', 'row': 0, 'col': 0, 'rowCount': 5, 'colCount': 7, 'style': { 'buildInName': 'Medium2' }, 'rowFilter': { 'range': { 'row': 1, 'rowCount': 4, 'col': 0, 'colCount': 7 }, 'typeName': 'HideRowFilter', 'dialogVisibleInfo': {}, 'filterButtonVisibleInfo': { '0': true, '1': true, '2': true, '3': true, '4': true, '5': true, '6': true }, 'showFilterButton': true }, 'columns': [{ 'id': 1, 'name': 'Column1' }, { 'id': 2, 'name': 'Column2' }, { 'id': 3, 'name': 'Column3' }, { 'id': 4, 'name': 'Column4' }, { 'id': 5, 'name': 'Column5' }, { 'id': 6, 'name': 'Column6' }, { 'id': 7, 'name': 'Column7' }] }], 'index': 0 }, 'Sheet2': { 'name': 'Sheet2', 'theme': 'Office', 'data': { 'dataTable': {}}, 'rowHeaderData': {}, 'colHeaderData': {}, 'selections': { '0': { 'row': 0, 'rowCount': 1, 'col': 0, 'colCount': 1 }, 'length': 1 }, 'index': 1 }}}
      this._spread.fromJSON(JSON.parse(JSON.stringify(JsonData)))
      console.log('111111111111已执行')
    }
  }
}
</script>

 <style lang="scss">
 .suppliers {
   background: #f4f4f4;
   padding: 20px;
   min-height: calc(100vh - 153px);
   /* 匹配历史报价单顶部 */
   .matching {
     min-height:calc(100vh - 172px);
     background: #fff;
     border: 1px solid #d1d1d1;
     padding: 30px;
     .gc-no-user-select{
       min-height: calc(100vh - 173px) !important;
     }
     .UpDown {
       float: right;
       white-space: nowrap;
       .el-button {
         vertical-align: top;
         font-size: 16px;
         border: 1px solid #4a90e2;
         color: #4a90e2;
         &:nth-child(4) {
          margin-right: 14px;
        }
        &:nth-child(1), &:nth-child(2) {
          min-width: 120px;
        }
       }
       .importfile {
         display: inline-block;
         overflow: hidden;
         .beforechoose {
           line-height: 40px;
           margin-right: 14px;
           padding: 0 20px;
           vertical-align: top;
           font-size: 16px;
           position: relative;
           cursor: pointer;
           color: #4a90e2;
           border: 1px solid #4a90e2;
           border-radius: 4px;
           display: inline-block;
           overflow: hidden; // 设置文件流样式关键
           zoom: 1;
           input {
             position: absolute;
             // font-size: 100px;
             right: 0;
             top: 0;
             opacity: 0;
             width: 100%;
             height: 100%;
             filter: alpha(opacity=0);
             cursor: pointer;
             opacity: 0;
            -ms-filter: 'alpha(opacity=0)';
           }
           &:hover {
             background: #ecf5ff;
             text-decoration: none;
           }
         }
       }
     }
     .Phistory {
       float: left;
       white-space: nowrap;
     }
     .el-form-item__label {
       font-weight: 500;
     }
     .el-input--suffix .el-input__inner {
       background: #f9f9f9;
     }
     .el-form--inline .el-form-item {
       margin-bottom: 0;
     }
     .el-input span.pic {
       border-left: 1px solid #cecece;
       display: inline-block;
       height: 60%;
       width: 32px;
       margin-top: 24%;
       .img {
         font-size: 18px;
         vertical-align: top;
         margin-top: 4px;
         cursor: pointer;
       }
     }
   }
   /* 报价单 */
   .priceSheet {
     margin-top: 60px;
     min-height: calc(100vh - 173px) !important;
   }
 }
 .sign .el-button{
   color: #4a90e2;
 }
 .priceListss .el-dialog__body{
   text-align: center;
 }
.priceLists .el-button{
   color: #4a90e2;
 }
 </style>
