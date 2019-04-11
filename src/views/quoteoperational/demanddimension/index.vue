/*
 * @Page: 任务运行管理的需求号维度
 * @Author: cong
 * @Date: 2018-11-28 10:30:26
 * @Last Modified by: cong
 */
<template>
  <div class="demanddimension reusepage demanddimension119">
    <div v-loading="loading" class="reusepagecon">
      <!-- 弹窗 -->
      <Dialog :searchbox="searchData" @tolistenChild="getChildData"/>
      <!-- 查询栏 -->
      <div v-show="searchbar" class="searchbar">
        <el-form ref="postForm" :model="postForm" :inline="true">
          <div class="fomer">
            <!-- 第一行 -->
            <el-form-item :label="$t('demanddimension.searchbar.region')" class="selecter decorate">
              <el-select v-model="postForm.region" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in regions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('demanddimension.searchbar.source')" class="selecter decorate">
              <el-select v-model="postForm.demandSource" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in sources"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('demanddimension.searchbar.category')"
              class="selecter decorate"
            >
              <el-select v-model="postForm.demandType" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in categorys"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求编码 -->
            <el-form-item
              :label="$t('demanddimension.searchbar.demandNum')"
              class="search-input decorate"
            >
              <el-input v-model="postForm.demandCode" :disabled="true">
                <img slot="suffix" src="../../../assets/index/images/searcho.png" @click="requirementCoding('', $t('demandNoResolve.reqCode'), 'requirementCoding',postForm.demandCode)">
              </el-input>
            </el-form-item>
            <!-- 产业线 -->
            <el-form-item
              :label="$t('demanddimension.searchbar.industrialLine')"
              class="selecter decorate"
            >
              <el-select v-model="postForm.industryName" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in industryNames"
                  :key="item.industry_id"
                  :label="item.industry_name"
                  :value="item.industry_name"
                />
              </el-select>
            </el-form-item>
            <!-- 第二行 -->
            <!-- 任务人 -->
            <el-form-item
              :label="$t('demanddimension.searchbar.taskman')"
              class="search-input decorate renwuren"
            >
              <el-input v-model="postForm.managerCode" :disabled="true">
                <img slot="suffix" src="../../../assets/index/images/searcho.png" @click="taskMan('', $t('breakDown.TaskOne'), 'taskMan',postForm.managerCode)">
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('demanddimension.searchbar.startDate')" class="timer">
              <el-date-picker v-model="startDate" type="daterange" range-separator="-"/>
            </el-form-item>
            <el-form-item :label="$t('demanddimension.searchbar.endDate')" class="timer">
              <el-date-picker v-model="endDate" type="daterange" range-separator="-"/>
            </el-form-item>
            <!-- <el-form-item :label="$t('demanddimension.searchbar.state')" class="selecter statecss">
              <el-select v-model="postForm.state" multiple collapse-tags>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item> -->
          </div>
          <div class="btn">
            <el-button
              type="primary"
              @click="submitFormBon"
            >{{ $t('buttonGroup.search') }}</el-button>
          </div>
        </el-form>
      </div>
      <div v-show="!searchbar" class="searchbar">
        <el-form ref="postForm" :model="postForm" :inline="true">
          <div class="fomer">
            <!-- 第一行 -->
            <el-form-item :label="$t('demanddimension.searchbar.region')" class="selecter decorate selecter1">
              <el-select v-model="postForm.region" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in regions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('demanddimension.searchbar.source')" class="selecter decorate selecter1">
              <el-select v-model="postForm.demandSource" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in sources"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('demanddimension.searchbar.category')"
              class="selecter decorate selecter1"
            >
              <el-select v-model="postForm.demandType" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in categorys"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求编码 -->
            <el-form-item
              :label="$t('demanddimension.searchbar.demandNum')"
              class="search-input decorate selecter1"
            >
              <el-input v-model="postForm.demandCode" :disabled="true">
                <img slot="suffix" src="../../../assets/index/images/searcho.png" @click="requirementCoding('', $t('demandNoResolve.reqCode'), 'requirementCoding',postForm.demandCode)">
              </el-input>
            </el-form-item>
            <!-- 产业线 -->
            <el-form-item
              :label="$t('demanddimension.searchbar.industrialLine')"
              class="selecter decorate selecter1"
            >
              <el-select v-model="postForm.industryName" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in industryNames"
                  :key="item.industry_id"
                  :label="item.industry_name"
                  :value="item.industry_name"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="btn">
            <el-button
              type="primary"
              @click="submitFormBon"
            >{{ $t('buttonGroup.search') }}</el-button>
          </div>
        </el-form>
      </div>
      <div class="contentlist">
        <!-- 查询栏伸缩按钮 -->
        <el-button type="info" @click="searchbar = !searchbar">
          <i :class="[searchbar ? 'downer' : 'upper']" class="el-icon-arrow-up"/>
        </el-button>
        <div class="listcon">
          <div class="totalnum">
            <!-- excel下载 -->
            <el-button v-show="tableData" class="totalnumdown" type="primary" plain @click="tableDownload">
              <i class="fa fa-download" style="margin-right: 6px;"/>
              <span>{{ $t('buttonGroup.exlUpload') }}</span>
            </el-button>
            <!-- 数据总数 -->
            <div style = "float:right;padding-top:10px">{{ $t('demanddimension.tablecon.total') }} <span>{{ total }}</span> {{ $t('demanddimension.tablecon.records') }}</div>
          </div>
          <!-- 表格 -->
          <el-table :data="tableData" :row-class-name="tableRowClassName" stripe class="table-style1">
            <el-table-column :label="$t('demanddimension.tablecon.customer')" prop="customer" />
            <el-table-column :label="$t('demanddimension.tablecon.region')" prop="region" />
            <el-table-column :label="$t('demanddimension.tablecon.source')" prop="demandSource" />
            <el-table-column :label="$t('demanddimension.tablecon.category')" prop="demandType" width="125px"/>
            <el-table-column :label="$t('demanddimension.tablecon.industrialLine')" prop="industryName" />
            <el-table-column :label="$t('demanddimension.tablecon.demandNum')" prop="demandCode">

              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.demandCode }}</p>
                  <div slot="reference" class="unallshow">
                    <router-link :to="{path:'/quoteoperational/demanddimensionMaterieldimension',query: {id: scope.row.demandCode}}" style="cursor:pointer">{{ scope.row.demandCode }}</router-link>
                  </div>

                </el-popover>
              </template>
              <!-- <template slot-scope="scope">
                <router-link :to="{path:'/quoteoperational/demanddimensionMaterieldimension',query: {id: scope.row.demandCode}}">{{ scope.row.demandCode }}</router-link>
              </template> -->
            </el-table-column>
            <el-table-column :label="$t('demanddimension.tablecon.demandDesc')" prop="remarks" width="190px">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.remarks }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.remarks }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column :label="$t('demanddimension.tablecon.taskman')" prop="manager" />
            <el-table-column :label="$t('demanddimension.tablecon.materialNum')" prop="moduleCount" width="100px"/>
            <el-table-column :label="$t('demanddimension.tablecon.suppliersNum')" prop="supplierCount" width="100px"/>
            <el-table-column :label="$t('demanddimension.tablecon.taskNum')" prop="taskCount" />
            <el-table-column :label="$t('demanddimension.tablecon.startDate')" prop="startReportDate" width="110px"/>
            <!-- 任务截止日期 -->
            <el-table-column :label="$t('demanddimension.tablecon.endDate')" prop="endReportDate" width="110px">
              <!-- <template slot-scope="scope">
                <router-link :to="{path:'/quoteoperational/editingtask',query:{demandAnalysisId:scope.row.demandAnalysisId}}">{{ scope.row.endReportDate }}</router-link>
              </template> -->
            </el-table-column>
            <el-table-column
              :label="$t('demanddimension.tablecon.templateNum')"
              prop="templateCount"
            />
            <!-- <el-table-column
              :label="$t('demanddimension.tablecon.state')"
              prop="state"
              width="140px"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.state"
                  active-color="#007BFF"
                  inactive-color="#DFDFDF"
                />
                <i>2</i>/100
              </template>
            </el-table-column> -->
          </el-table>
          <!-- 分页 -->
          <div id="page">
            <el-pagination
              ref="paging"
              :current-page.sync="currentPage"
              :page-size="10"
              :total="total"
              :pager-count="5"
              :prev-text="$t('demandForFiltering.previousPage')"
              :next-text="$t('demandForFiltering.nextPage')"
              background
              layout="prev, pager, next, jumper"
              class="paging"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
    <iframe name = "tempiframe" style="display:none"/>
  </div>
</template>

<script>
import Language from '@/utils/language'
import { timeHandling } from '@/utils/timeHandling'
import { selects, selectName, modules, search, taskMan, requirementCoding } from '@/api/quoteoperational'
// import { flagFindData } from '@/api/requirements'
import Dialog from '@/components/Dialog/searchBox'
import { listToExcel } from '@/api/downloadurl'
export default {
  name: 'Demanddimension',
  components: {
    Dialog
  },
  mixins: [Language],
  data() {
    return {
      // 搜索栏提交数据
      selectData: {},
      // 搜索框弹框数据
      searchData: {
        // 查询的键名
        searchJian: '',
        // 弹框显示
        dialogTableVisible: false,
        // 搜索弹框当前页数
        searchPage: 1,
        // 搜索弹框中表格数据总数
        searchTotal: 1,
        // 循环的内容
        gridData: [],
        // TableName
        tableName: '',
        // 承接的数组
        Arr: [],
        // 每页显示的条数
        pageSize: 9,
        // 总页数
        searchTotalPage: 0
      },
      postForm: { // 搜索栏数据
        region: [], // 区域
        requestType: '0', // 请求类型
        demandSource: [], // 需求来源
        demandType: [], // 需求类型
        demandCode: '', // 需求编码（展示）
        industryName: [], // 产业线
        managerCode: '', // 任务人（展示）
        taskBeginTimeFrom: '', // 开始日期起
        taskBeginTimeEnd: '', // 开始日期止
        taskEndTimeFrom: '', // 结束日期起
        taskEndTimeEnd: '', // 结束日期至
        pageSize: 10, // 页数
        pageNo: 1 // 页码
      },
      demandCodes: [], // 需求编码（选中的数据）
      managerCodes: [], // 任务人（选中的数据）
      startDate: '', // 任务开始日期
      endDate: '', // 任务截止日期
      loading: false, // 查询等待loading
      searchbar: true, // 查询栏伸缩
      total: 0,
      regions: [], // option 区域
      sources: [], // option 需求来源
      category: [], // option 需求类型
      categorys: [],
      currentPage: 1,
      industryNames: [
        // { industry_id: '1', industry_name: '冰冷' },
        // { industry_id: '123', industry_name: '测试' },
        // { industry_id: '2', industry_name: '洗涤' },
        // { industry_id: '3', industry_name: '智控' }
      ],
      // options: [ // option 示例数据
      //   {
      //     value: '选项1',
      //     label: '选项1'
      //   },
      //   {
      //     value: '选项2',
      //     label: '选项2'
      //   },
      //   {
      //     value: '选项3',
      //     label: '选项3'
      //   }
      // ],
      tableData: [] // 表格示例数据
    }
  },
  mounted() {
    const params = {
      typeCodes: '002,003,004'
    }
    selects(params)
      .then(res => {
        this.regions = res.resultData['002']
        this.sources = res.resultData['003']
        this.categorys = res.resultData['004']
      })
      .catch(err => {
        console.log(err)
      })
    this.submitForm()
  },
  created() { // 产业线选项渲染
    const params = {}
    modules(params)
      .then(res => {
        this.industryNames = res.resultData
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    // excel下载
    tableDownload() {
      var downloadData = {
        // 'excelName': '任务运行管理（需求号维度）',
        // 'keyName': ['customer', 'region', 'demandSource', 'demandType', 'industryName', 'demandCode', 'remarks', 'manager', 'moduleCount', 'supplierCount', 'taskCount', 'startReportDate', 'endReportDate', 'templateCount'],
        // 'keyName': 'customer,region,demandSource,demandType,industryName,demandCode,remarks,manager,moduleCount,supplierCount,taskCount,startReportDate,endReportDate,templateCount',
        'searchTaskVo': {}
        // 'headers': [
        //   {
        //     'headerOne': '客户',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '区域',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '需求来源',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '需求类型',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '产业线',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '需求编码',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '需求描述',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务人',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '物料号数量',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '供应商数量',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务数量',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务开始日期',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务截止日期',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '匹配模板数量',
        //     'headerLast': []
        //   }
        // ]
      }
      downloadData.searchTaskVo = JSON.parse(JSON.stringify(this.selectData))
      downloadData.searchTaskVo.pageNo = 1
      downloadData.searchTaskVo.pageSize = 10000
      // window.open(listToExcel(downloadData))
      var a = document.createElement('a')
      var url = listToExcel(downloadData)
      // console.log(url)
      document.body.appendChild(a)
      a.target = 'tempiframe'
      a.href = url
      // a.download = '2.xls'
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      // window.open('http://10.190.48.150:8083/haiercostsupport/task/listToExcel?param=' + encodeURIComponent(JSON.stringify(downloadData)))
      // this.$axios('http://47.104.98.71:8780/costmanagement/api/task/listToExcel?param=' + encodeURIComponent(JSON.stringify(downloadData))).then(res => {
      //   console.log(res)
      // })
      // console.log('excel下载', downloadData)
    },
    // // 日期格式
    // timeHandling(val) {
    //   return val.split(' ')[0]
    // },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.submitForm()
    },
    tableRowClassName(val) { // 表格行不可选
      if (val.row.state === false) {
        return 'unchoose'
      }
    },
    submitFormBon() {
      this.currentPage = 1
      this.submitForm()
    },
    submitForm() { // 搜索栏数据提交
      var params = JSON.parse(JSON.stringify(this.postForm))

      // if (params) {
      //   params.taskBeginTimeFrom = this.dateChange(this.startDate[0])
      //   params.taskBeginTimeEnd = this.dateChange(this.startDate[1])
      // }
      // if (params) {
      //   params.taskEndTimeFrom = this.dateChange(this.endDate[0])
      //   params.taskEndTimeEnd = this.dateChange(this.endDate[1])
      // }

      if (this.startDate !== '' && this.startDate !== null) {
        params.taskBeginTimeFrom = this.dateChange(this.startDate[0])
        params.taskBeginTimeEnd = this.dateChange(this.startDate[1])
      } else {
        params.taskBeginTimeFrom = ''
        params.taskBeginTimeEnd = ''
      }
      if (this.endDate !== '' && this.endDate !== null) {
        params.taskEndTimeFrom = this.dateChange(this.endDate[0])
        params.taskEndTimeEnd = this.dateChange(this.endDate[1])
      } else {
        params.taskEndTimeFrom = ''
        params.taskEndTimeEnd = ''
      }
      params.pageNo = this.currentPage
      params.region = params.region.toString()
      params.demandSource = params.demandSource.toString()
      params.demandType = params.demandType.toString()
      params.industryName = params.industryName.toString()
      // 任务人
      var tmp = this.managerCodes.map(function(value, index, array) {
        return value.manager_code
      })
      params.managerCode = tmp.join(',')
      // this.postForm.moduleCode = this.postForm.moduleCode.toString()
      // this.postForm.state = this.postForm.state.toString()

      // const params = this.postForm
      // console.log(this.postForm)
      this.loading = true
      this.selectData = params
      selectName(params)
        .then(res => {
          // console.log(res)
          this.loading = false
          this.total = parseInt(res.resultData.taskCount)
          // var _this = this
          this.tableData = res.resultData.taskList.map(function(value, index, array) {
            if (value.endReportDate) {
              value.endReportDate = timeHandling(value.endReportDate)
            }
            if (value.startReportDate) {
              value.startReportDate = timeHandling(value.startReportDate)
            }
            return value
          })
          // this.postForm.region = this.postForm.region.split(',')
          // if (this.postForm.region[0] === '') {
          //   this.postForm.region.splice(0, 1)
          // }
          // this.postForm.demandSource = this.postForm.demandSource.split(',')
          // if (this.postForm.demandSource[0] === '') {
          //   this.postForm.demandSource.splice(0, 1)
          // }
          // this.postForm.demandType = this.postForm.demandType.split(',')
          // if (this.postForm.demandType[0] === '') {
          //   this.postForm.demandType.splice(0, 1)
          // }
          // this.postForm.industryName = this.postForm.industryName.split(',')
          // if (this.postForm.industryName[0] === '') {
          //   this.postForm.industryName.splice(0, 1)
          // }
          // this.postForm.moduleCode = this.postForm.moduleCode.split(',')
          // if (this.postForm.moduleCode[0] === '') {
          //   this.postForm.moduleCode.splice(0, 1)
          // }
          // this.formInline.state = this.formInline.state.split(',')
          // if (this.postForm.state[0] === '') {
          //   this.postForm.state.splice(0, 1)
          // }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    // input上搜索按钮
    // 任务人模糊搜索弹框
    taskMan(nameVal, searchTitle, name, checkValue) {
      const params = { manager: nameVal }
      this.searchData.searchJian = name
      this.searchData.checkList = []
      if (checkValue !== '') {
        this.searchData.checkList = this.managerCodes.map(function(value, index, array) {
          return value.manager
        })
        // this.searchData.checkList = checkValue.split(',')
      }
      taskMan(params).then(res => {
        // 总条数
        this.searchData.searchTotal = res.resultData.length
        // 总的数据 check的数据
        this.searchData.gridData = res.resultData
        // 承接的数据
        this.searchData.Arr = res.resultData
        // 总页数
        this.searchData.searchTotalPage = Math.ceil(res.resultData.length / this.searchData.pageSize)
        // 第一页数据
        this.searchData.gridData = this.searchData.gridData.slice(0, this.searchData.pageSize)
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // 弹窗控制按钮
      this.searchData.dialogTableVisible = true
      // 请求得TableName值
      this.searchData.tableName = nameVal
      this.$store.dispatch('Dialog', searchTitle)
    },
    // 需求编码模糊搜索弹框
    requirementCoding(nameVal, searchTitle, name, checkValue) {
      const params = { demand_code: nameVal }
      this.searchData.searchJian = name
      this.searchData.checkList = []
      if (checkValue !== '') {
        this.searchData.checkList = checkValue.split(',')
      }
      // console.log('this.searchData.checkList', this.searchData.checkList)

      requirementCoding(params).then(res => {
        // 总条数
        this.searchData.searchTotal = res.resultData.length
        // 总的数据 check的数据
        this.searchData.gridData = res.resultData
        // 承接的数据
        this.searchData.Arr = res.resultData
        // 总页数
        this.searchData.searchTotalPage = Math.ceil(res.resultData.length / this.searchData.pageSize)
        // 第一页数据
        this.searchData.gridData = this.searchData.gridData.slice(0, this.searchData.pageSize)
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // 弹窗控制按钮
      this.searchData.dialogTableVisible = true
      // 请求得TableName值
      this.searchData.tableName = nameVal
      this.$store.dispatch('Dialog', searchTitle)
    },
    // 子元素传来的data
    getChildData(val) {
      // console.log(1, val)
      if (val.inputValue === 'taskMan') {
        this.postForm.managerCode = val.checkedCities.join(',')
        this.managerCodes = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.manager) {
              return value
            }
          }
        })
        // console.log('this.managerCodes', this.managerCodes)
        // var val1 = JSON.parse(JSON.stringify(val))
        // this.managerCodes = val.checkedCities
        // var tmp1 = val1.checkedCities.map(function(value, index, array) {
        //   return value.manager
        // })
        // this.postForm.managerCode = tmp1.join(',')
      } else if (val.inputValue === 'requirementCoding') {
        // console.log('this.searchData.gridData', this.searchData.gridData)
        this.postForm.demandCode = val.checkedCities.join(',')
        // var val2 = JSON.parse(JSON.stringify(val))
        // this.demandCodes = val2.checkedCities
        // var tmp2 = val2.checkedCities.map(function(value, index, array) {
        //   return value.demand_code
        // })
        // this.postForm.demandCode = tmp2.join(',')
        // console.log(223, tmp2, this.postForm.demandCode)
      }
    },
    // 模糊查询输入框
    findBaseList(TableNames, searchTitle) {
      const params = {
        TableName: '',
        pageSize: '1000'
        // pageNo: this.currentPage
      }
      params.TableName = TableNames
      // console.log(params)
      search(params)
        .then(res => {
          // console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      this.searchData.dialogTableVisible = true
      this.$store.dispatch('Dialog', searchTitle)
    },
    // 日期格式
    dateChange(val) {
      var newDate = new Date()
      newDate.setTime(val.getTime())
      return newDate.toLocaleString().replace(/\//g, '-').replace('上午', '')
    }
  }
}
</script>

<style lang="scss">
@import "src/styles/reusepagecon.scss";
.demanddimension {
  .el-select__tags{
    white-space: nowrap;
  }
  .searchbar {
    .decorate {
      width: 18.5%;
      img{
        cursor:pointer
      }
      .el-form-item__label {
        text-align: left;
        width: 20%;
        min-width: 65px;
        padding: 0;
      }
      .el-form-item__content {
        margin-left: 2%;
        width: 63%;
      }
    }
    .timer {
      width: 28%;
      margin-right: 8px;
      .el-form-item__label {
        text-align: left;
        width: 20%;
        min-width: 88px;
        padding: 0;
      }
      .el-form-item__content {
        width: 70%;
        overflow: hidden;
        margin-left: 5px;
        .el-date-editor {
          width: 100%;
          background-color: #f9f9f9;
        }
      }
    }
    .statecss {
      width: 20%;
      margin-right: 0;
      .el-form-item__label {
        text-align: left;
        width: 85px;
        padding: 0;
      }
      .el-form-item__content {
        width: 60%;
        .el-select {
          margin-left: 10px;
        }
      }
    }
    .el-select-dropdown{
      z-index:99;
    }
    .selecter{
      .el-select{
        .el-tag{
          margin:2px 0 2px 3px;
        }
        .el-tag--small{
          padding: 0 0 0 4px;
        }
        .el-tag__close.el-icon-close{
          right: -4px;
        }
      }
    }
    .selecter1{
        margin-bottom: 0;
    }

    @media screen and (max-width: 1650px) {
      .decorate {
        width: 18.5%;
        .el-form-item__label {
          text-align: left;
          width: 20%;
          min-width: 65px;
          padding: 0;
        }
        .el-form-item__content {
          width: 61%;
        }
      }
      .timer {
        width: 29%;
        .el-form-item__label {
          text-align: left;
          min-width: 55px;
          padding: 0;
          line-height: 20px;
        }
        .el-form-item__content {
          width: 72%;
          overflow: hidden;
        }
      }
      .statecss {
        width: 18.5%;
        .el-form-item__label {
          line-height: 20px;
          width: 44px;
        }
      }
    }
  }
  .listcon {
    .totalnum {
      width: 97%;
      margin: 20px auto;
      text-align: left;
      font-size: 14px;
      color: #354052;
      span {
        color: #4a90e2;
      }
      .totalnumdown{
        background-color: #fff
      }
      .totalnumdown:hover {
        background-color: #ecf5ff;
      }
      // .totalnumdown:active {
      //   background: #3a8ee6;
      // }
    }
    .el-table {
      td > .cell,
      .unallshow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i,
      a {
        color: #4a90e2;
      }
      .unchoose {
        cursor: not-allowed;
        color: #9b9b9b !important;
        a {
          cursor: not-allowed;
          color: #9b9b9b !important;
        }
      }
    }
  }
}
.demanddimension119{
 .renwuren{
    margin-bottom: 0 !important;
 }
 .timer{
    margin-bottom: 0 !important;
 }
}

</style>
