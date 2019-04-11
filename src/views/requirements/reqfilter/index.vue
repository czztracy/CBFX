/*
 * @Page: 需求管理-> 需求过滤(页面接口/弹框调试)
 * @Author: wangyadi
 * @Date: 2018-12-18 09:43:04
 * @Last Modified by: wangyadi
 */
/*
 * @Page: 需求管理-> 需求过滤
 * @Author: chenlisha
 * @Date: 2018-11-30 16:11:45
 * @Last Modified by: chenlisha
 */
<template>
  <div>
    <div v-loading="loading" class="reqDown">
      <!-- 弹窗 -->
      <Dialog :searchbox="searchData" @tolistenChild="getChildData"/>
      <transition name="slide-fade">
        <div v-if="search" class="reqSearch">
          <!-- 查询条件 -->
          <!-- 过滤编号 -->
          <el-form :inline="true" :model="searchFilter" class="search">
            <el-form-item :label="$t('demandForFiltering.filterNumber')" class="com">
              <el-input
                v-model="searchFilter.filterNumber"
                :disabled="true"
                :placeholder="$t('demandNoResolve.all')"
                class="input"
              >
                <span slot="suffix" class="line"/>
                <img
                  slot="suffix"
                  src="../../../assets/index/images/searcho.png"
                  @click="findBaseList('9', $t('demandForFiltering.filterNumber'), 'productLineStatus', searchFilter.filterNumber)"
                >
              </el-input>
            </el-form-item>
            <!-- 设置人员 -->
            <el-form-item :label="$t('demandForFiltering.settingOfPersonnel')" class="com">
              <el-input
                v-model="searchFilter.person"
                :disabled="true"
                :placeholder="$t('demandNoResolve.all')"
                class="input"
              >
                <span slot="suffix" class="line"/>
                <img
                  slot="suffix"
                  src="../../../assets/index/images/searcho.png"
                  @click="findBaseList('10', $t('demandForFiltering.settingOfPersonnel'), 'purchase', searchFilter.person)"
                >
              </el-input>
            </el-form-item>
            <!-- 生效日期 -->
            <el-form-item :label="$t('demandForFiltering.startDate')" class="date">
              <!-- <el-date-picker v-model="searchFilter.startTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="—" class="input" value-format="yyyy-MM-dd"/> -->
              <el-date-picker
                :start-placeholder="$t('reqcustomization.startDate')"
                :end-placeholder="$t('reqcustomization.endDate')"
                v-model="searchFilter.startTime"
                type="daterange"
                range-separator="-"
                class="input"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <!-- 失效日期 -->
            <el-form-item :label="$t('demandForFiltering.endDate')" class="date">
              <!-- <el-date-picker v-model="searchFilter.endTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="—" class="input" value-format="yyyy-MM-dd"/> -->
              <el-date-picker
                :start-placeholder="$t('reqcustomization.startDate')"
                :end-placeholder="$t('reqcustomization.endDate')"
                v-model="searchFilter.endTime"
                type="daterange"
                range-separator="-"
                class="input"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <!-- 设置日期 -->
            <el-form-item :label="$t('demandForFiltering.setDate')" class="date">
              <!-- <el-date-picker v-model="searchFilter.setupTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="—" class="input" value-format="yyyy-MM-dd"/> -->
              <el-date-picker
                :start-placeholder="$t('reqcustomization.startDate')"
                :end-placeholder="$t('reqcustomization.endDate')"
                v-model="searchFilter.setupTime"
                type="daterange"
                range-separator="-"
                class="input"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <!-- 状态 -->
            <el-form-item :label="$t('demandForFiltering.state')" class="select">
              <el-select
                v-model="searchFilter.demandscState"
                :placeholder="$t('demandNoResolve.all')"
                class="input"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in options"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
            <!-- 查询按钮 -->
            <el-form-item class="btn">
              <el-button type="primary" @click="onSubmitBtn">{{ $t('buttonGroup.search') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
      <!-- 收缩按钮 -->
      <br>
      <!-- <span :class="['sePosition', search ? 'lala' : 'lili']" @click="search = !search">
        <i :class="['el-icon-arrow-up',search ? 'downer' : 'upper']"/>
      </span> -->
      <div class="reqList">
        <p class="total">
          {{ $t('breakDown.total') }}
          <span>{{ total }}</span>
          {{ $t('breakDown.record') }}
        </p>
        <router-link
          :to="{ path: './reqfiltersetting', query: {demandsc_state}}"
          class="newCreate btnbg"
        >
          <img src="../../../assets/index/images/print.png">
          {{ $t('buttonGroup.new') }}
        </router-link>
        <!-- 过滤列表 -->
        <el-table :data="tableData" stripe class="table-style1">
          <el-table-column
            :label="$t('demandForFiltering.serialNumber')"
            prop="serialNumber"
            width="76"
            type="index"
          />
          <el-table-column :label="$t('demandForFiltering.filterNumber')" prop="demandscCode">
            <template slot-scope="scope">
              <span
                v-if="scope.row.demandscState === '0001'||scope.row.demandscState === '0002'"
                type="text"
                class="listNum"
                @click="opens(scope.row.demandscCode)"
              >{{ scope.row.demandscCode }}</span>
              <router-link
                v-else
                :to="{path:'reqfiltersetting',query:{demandCode:scope.row.demandscCode, Identification:'1'}}"
                class="blue"
              >{{ scope.row.demandscCode }}</router-link>
            </template>
          </el-table-column>
          <el-table-column :label="$t('demandForFiltering.startDate')" prop="startTime"/>
          <el-table-column :label="$t('demandForFiltering.endDate')" prop="endTime"/>
          <el-table-column :label="$t('demandForFiltering.settingOfPersonnel')" prop="userCode"/>
          <el-table-column :label="$t('demandForFiltering.setDate')" prop="setupTime"/>
          <el-table-column :label="$t('demandForFiltering.state')" prop="demandscState">
            <template slot-scope="scope">
              <p
                v-if="scope.row.demandscState === '0001'"
                class="failure"
              >{{ $t('demandForFiltering.failure') }}</p>
              <p
                v-else-if="scope.row.demandscState === '0002'"
                class="effective"
              >{{ $t('demandForFiltering.effective') }}</p>
              <p v-else class="saves">{{ $t('demandForFiltering.save') }}</p>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="text-align: center">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="total"
            :pager-count="5"
            :prev-text="$t('demandForFiltering.previousPage')"
            :next-text="$t('demandForFiltering.nextPage')"
            class="paging"
            background
            layout="prev, pager, next, jumper"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <!-- 查看弹框 -->
      <el-dialog :visible.sync="show" :title="$t('demandManagement.filterCondition')" width="67.1%">
        <p class="total">
          {{ $t('breakDown.total') }}
          <span>{{ searchData.searchTotal }}</span>
          {{ $t('breakDown.record') }}
        </p>
        <p class="showtit">
          <span class="circle">
            <img src="../../../assets/index/images/show.png">
          </span>
          {{ $t('demandForFiltering.filterNumber') }}
          <span
            class="blue"
            style="margin-left: 23px;"
          >{{ showNumber }}</span>
        </p>
        <el-table
          :data="showData.slice((currentPages-1)*pageSizes,currentPages*pageSizes)"
          stripe
          class="table-style1 showdata"
        >
          <el-table-column
            :label="$t('specialNumberDimension.serial')"
            min-width="30"
            type="index"
          />
          <el-table-column :label="$t('demandManagement.client')" prop="customer" min-width="60"/>
          <el-table-column
            :label="$t('demandNoResolve.reqSource')"
            prop="demand_source"
            min-width="36"
          />
          <el-table-column :label="$t('demandManagement.area')" prop="region" min-width="30"/>
          <el-table-column
            :label="$t('demandManagement.supplier')"
            prop="supplier_name"
            min-width="58"
          />
          <!-- 采购经理 -->
          <el-table-column
            :label="$t('specialNumberDimension.purchasingManager')"
            prop="manager"
            min-width="66"
          />
          <!-- 场景 -->
          <el-table-column
            :label="$t('demandManagement.scene')"
            prop="scene_name"
            width="86"
          />
          <!-- 采购组 -->
          <!-- <el-table-column
            :label="$t('specialNumberDimension.procurementSection')"
            prop="pur_group"
            width="66"
          /> -->
          <!-- 品类 -->
          <el-table-column :label="$t('demandNoResolve.category')" prop="category_cn" width="66"/>
          <!-- 产业线 -->
          <el-table-column
            :label="$t('demandNoResolve.reqLine')"
            prop="industry_name"
            min-width="50"
          />
          <!-- 物料号 -->
          <el-table-column
            :label="$t('demandNoResolve.reqHaoW')"
            prop="module_code"
            min-width="52"
          />
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-pagination
            :current-page.sync="currentPages"
            :page-size="pageSizes"
            :total="totals"
            :pager-count="5"
            :prev-text="$t('demandForFiltering.previousPage')"
            :next-text="$t('demandForFiltering.nextPage')"
            class="paging"
            background
            layout="prev, pager, next, jumper"
            @current-change="handleCurrentChanges"
            @size-change="handleSizeChange"
          />
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Language from '@/utils/language'
import { selects } from '@/api/quoteoperational'
import Dialog from '@/components/Dialog/searchBox'
import { newlyBuild, filterList, flagFindData } from '@/api/requirements'
export default {
  name: 'Reqfilter',
  components: {
    Dialog
  },
  mixins: [Language],
  data() {
    return {
      purchase: [], // 选中的任务人
      timeDefaultShow: new Date(),
      demandsc_state: '0002', // 需求过滤状态(生效状态)
      show: false, // 查看弹窗
      showNumber: '', // 弹窗过滤编号
      search: true, // 收缩控制
      currentPage: 1, // 过滤表格当前页数
      currentPages: 1, // 弹窗表格当前页数
      pageSize: 10, // 每页展示条数
      pageSizes: 5, // 每页展示条数
      total: 0, // 过滤表格总条数
      totals: 0, // 弹窗表格总条数
      // 搜索框弹框数据
      searchData: {
        // 查询的键名
        searchJian: '',
        // 弹框显示
        dialogTableVisible: false,
        // 搜索弹框当前页数
        searchPage: 1,
        // 搜索弹框中表格数据总数
        searchTotal: 0,
        // 循环的内容
        gridData: [],
        // TableName
        tableName: '',
        // 承接的数组
        Arr: [],
        // 每页显示的条数
        pageSize: 9,
        // 总页数
        searchTotalPage: 0,
        // 选中的
        checkList: []
      },
      // 查询条件
      searchFilter: {
        filterNumber: '', // 过滤编号 demandscCode
        person: '', // 设置人员 （传cede）
        startTime: [], // 启动日期
        endTime: [], // 结束日期
        setupTime: [], // 设置日期
        demandscState: '2' // 状态
      },
      // 状态下拉框
      options: [
        {
          value: '0003',
          label: '保存'
        },
        {
          value: '0001',
          label: '失效'
        },
        {
          value: '0002',
          label: '生效'
        }
      ],
      // 过滤列表
      tableData: [],
      // 弹窗中的表格
      showData: [],
      loading: true, // loading加载
      effectData: [] // 生效状态时弹窗传入
    }
  },
  mounted() {
    this.filterLists()
    this.selects()
  },
  methods: {
    // 过滤列表
    filterLists() {
      this.loading = true
      const params = { offset: this.currentPage, limit: this.pageSize }
      filterList(params).then(res => {
        this.loading = false
        this.tableData = res.resultData.list
        this.total = res.resultData.pageCount
        // console.log(res.resultData.pageCount, '总页数')
      }).catch(err => {
        this.total = 0
        console.log(err)
      })
    },
    // 查看弹窗
    opens(val) {
      this.show = true
      this.showNumber = val
      const params = {
        demandsc_code: val,
        demandsc_state: ''
      }
      this.showData = []
      newlyBuild(params)
        .then(res => {
          // this.showData = res.resultData
          this.searchData.searchTotal = res.resultData[0].demandScRuleData.length
          this.totals = res.resultData[0].demandScRuleData.length // 总条数 后台未返回，分页暂无
          this.showData = res.resultData[0].demandScRuleData
          // console.log(res, '弹窗内容')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 模糊查询输入框/input上的搜索按钮
    findBaseList(nameVal, searchTitle, name, checkValue) {
      const params = {
        flag: nameVal
      }
      this.searchData.searchJian = name
      // 传过去回显check数据
      this.searchData.checkList = []
      if (checkValue !== '') {
        this.searchData.checkList = checkValue.split(',')
      }
      // console.log(data, 'TableName: ', TableName)
      flagFindData(params).then(res => {
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
    // 查询条件下拉框渲染
    selects() {
      const params = {
        typeCodes: '015'
      }
      selects(params)
        .then(res => {
          this.options = res.resultData['015']
          // console.log(this.options, '产业线')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 过滤表格分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.onSubmit()
      // console.log(`当前页: ${val}`)
    },
    // 弹窗表格分页
    handleCurrentChanges(val) {
      this.currentPages = val
      // console.log(`当前页: ${val}`)
    },
    handleSizeChange(val) {
      this.pageSizes = val
    },
    // 子元素传来的data
    getChildData(val) {
      // console.log(val)
      if (val.inputValue === 'productLineStatus') {
        this.searchFilter.filterNumber = val.checkedCities.join(',')
      } else if (val.inputValue === 'purchase') {
        this.searchFilter.person = val.checkedCities.join(',')
        this.purchase = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.userName) {
              return value
            }
          }
        })
      }
    },
    // 查询按钮
    onSubmitBtn() {
      this.currentPage = 1
      this.onSubmit()
    },
    // 查询条件
    onSubmit() {
      this.loading = true
      if (this.searchFilter.startTime === null) {
        this.searchFilter.startTime = ['', '']
      } else if (this.searchFilter.endTime === null) {
        this.searchFilter.endTime = ['', '']
      } else if (this.searchFilter.setupTime === null) {
        this.searchFilter.setupTime = ['', '']
      } else if (this.searchFilter.startTime === '') {
        this.searchFilter.startTime = ['', '']
      } else if (this.searchFilter.endTime === '') {
        this.searchFilter.endTime = ['', '']
      } else if (this.searchFilter.setupTime === '') {
        this.searchFilter.setupTime = ['', '']
      }
      // console.log(this.searchFilter.demandscState, '开始时间')
      // 设置人员传编码
      const purchase = this.purchase.map(function(value, index, array) {
        return value.userCode
      })
      let params = { offset: this.currentPage, limit: this.pageSize, demandscCodeList: this.searchFilter.filterNumber, userCodeList: this.searchFilter.person, setupTimeStart: this.searchFilter.setupTime[0], setupTimeEnd: this.searchFilter.setupTime[1], startTimeStart: this.searchFilter.startTime[0], startTimeEnd: this.searchFilter.startTime[1], endTimeStart: this.searchFilter.endTime[0], endTimeEnd: this.searchFilter.endTime[1], demandscStateList: this.searchFilter.demandscState }
      params = JSON.parse(JSON.stringify(params))
      params.demandscStateList = params.demandscStateList.toString()
      params.userCodeList = purchase.join(',')
      // console.log(params.userCodeList, 999)
      JSON.stringify(params)
      // console.log(params)
      filterList(params).then(res => {
        this.loading = false
        // console.log(res.resultData)
        this.tableData = res.resultData.list
        this.total = res.resultData.pageCount
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss">
span {
  display: inline-block;
}
/* 动画效果 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-103px);
  opacity: 0;
}
/* 整个盒子 */
.reqDown {
  // padding: 30px 1.9% 26px;
  padding: 18px;
  background-color: #f4f4f4;
}
/* 查询条件部分 */
.reqSearch {
  border: 1px solid #d1d1d1;
  font-size: 0;
  background-color: #fff;
  padding: 32px 0 0 1.1%;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
  right: 10px !important;
}
.search {
  display: flex;
  justify-content: space-between;
}
.reqSearch .btn {
  width: 8.6%;
  display: flex;
  border-left: 1px solid #cecece;
}
/* 列表部分 */
.reqList {
  border: 1px solid #d1d1d1;
  background-color: #fff;
  // padding: 24px 1.54% 32px;
  padding: 15px 15px 32px;
  .btnbg:hover {
    color: #fff;
  }
}
.reqSearch .state {
  line-height: 40px;
}
/* 查询框宽度调整 */
.input img {
  vertical-align: top;
  margin: 10px 7px 0 6px;
  cursor: pointer;
}
.com {
  width: 9%;
}
.date {
  width: 20%;
}
.select {
  width: 8%;
}
/* 收缩按钮 */
.sePosition {
  width: 3.15%;
  height: 16px;
  border: 1px solid #cecece;
  margin: 0 auto 4px;
  display: block;
  background: #fff;
  text-align: center;
  cursor: pointer;
  border-radius: 0 0 4px 4px
}
.sePosition .el-icon-arrow-up:before {
  font-size: 16px;
  color: #333;
}
.lili {
  border-bottom: 0;
}
.lala {
  border-top: 0;
}
.upper {
  transform: rotate(180deg);
  transition: all 0.3s ease;
}
.downer {
  transform: rotate(360deg);
  transition: all 0.3s ease;
}
.line {
  width: 1px;
  height: 24px;
  background-color: #cecece;
  margin-top: 8px;
}
.saves {
  color: #05cd00;
  font-size: 14px !important;
}
.failure {
  color: #ff9e00;
}
.effective {
  color: #007cff;
}
/* 新建按钮 */
.newCreate {
  width: 8.2%;
  line-height: 46px;
  color: #fff;
  border-radius: 4px;
  border: 0;
  font-size: 18px;
  float: right;
  white-space: nowrap;
  text-align: center;
}
.newCreate img {
  width: 16px;
  height: 18px;
  vertical-align: top;
  margin: 13px 6.25% 0 0;
}
.showtit {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}
.circle {
  width: 22px;
  height: 22px;
  margin: -2px 11px 0 0;
  border-radius: 50px;
  background-color: #007cff;
  text-align: center;
  vertical-align: top;
}
.circle img {
  margin-top: 5px;
}
.total {
  float: right;
  font-size: 14px;
  margin: -6px 3px 0 0;
}
.total span {
  color: #4a90e2;
  margin: 0 2px;
}
.reqList .total {
  float: left;
  margin: -1px 0 0 0;
}
.blue,
.reqDown .el-button--text {
  color: #007cff;
}
.blue:hover {
  color: #007cff;
}
/* 表单样式调整 */
.reqDown .el-form--inline .el-form-item {
  margin: 0 0 32px 0;
}
.reqDown .el-form-item__content {
  float: right;
  line-height: 0;
}
.reqDown .el-form-item__label {
  max-height: 32px;
  line-height: 15px;
  margin-top: 8px;
  padding: 0 0;
  font-weight: inherit;
  text-align: right;
  overflow: hidden;
}
.reqDown .com .el-form-item__label {
  width: 27%;
}
.reqDown .date .el-form-item__label {
  width: 13%;
}
.reqDown .select .el-form-item__label {
  width: 32%;
  margin-top: 12px;
}
.reqDown .com .el-form-item__content {
  width: 64.4%;
}
.reqDown .date .el-form-item__content {
  width: 84%;
}
.reqDown .select .el-form-item__content {
  width: 60%;
}
.btn .el-form-item__content {
  margin: auto;
  margin-right: 25px;
}
/* 输入框和日期样式调整 */
.reqDown .el-date-editor .el-range-separator {
  width: 7%;
}
.reqDown .el-range-editor.el-input__inner {
  padding: 3px 0 3px 10px;
}
.reqDown .el-input--suffix .el-input__inner {
  padding: 0 35px 0 7%;
  font-size: 14px;
}
.reqDown .el-input.is-disabled .el-input__inner {
  color: #606266;
}
.reqDown .select .el-input--suffix .el-input__inner {
  padding-right: 22px;
}
.reqDown .el-input__prefix {
  right: 4px;
  left: auto;
}
.reqDown .el-input__icon {
  vertical-align: top;
}
.reqDown .el-date-editor.el-input,
.reqDown .el-date-editor.el-input__inner {
  width: 100%;
}
.reqDown .input .el-input__suffix {
  right: 0;
}
.reqDown .el-icon-date:before {
  color: #000;
}
// .search .el-button--primary {
//   /* height:42px; */
// }
/* 多选后不换行 */
.reqDown .el-select .el-tag__close.el-icon-close {
  right: 0;
}
.reqDown .el-select__tags {
  white-space: nowrap;
}
.reqDown .el-select .el-tag {
  margin: 0 1px;
}
.reqDown .el-tag--small {
  padding: 0 0;
}
/* 表格调整 */
.table-style1 td{
  font-size: 15px;
}
.reqDown .table-style1 {
  width: 100%;
  margin: 60px 0 30px;
  min-height: calc(100vh - 480px);
}
.reqDown .table-style1 .el-table__header {
  border-top: 0;
}
.reqDown .table-style1 .el-table__header tr th {
  border-left: 0;
}
.reqDown .el-table th {
  padding: 16px 0;
}
.reqDown .el-table td {
  padding: 13px 0;
}
.reqDown .el-table .cell,
.reqDown .el-table th div {
  padding: 0;
  white-space: nowrap;
  text-align: center;
}
.reqDown .reqList .el-button {
  padding: 0 0;
}
/* 输入框背景颜色 */
.reqDown .el-input__inner,
.reqDown .el-range-editor .el-range-input {
  background: rgba(249, 249, 249, 1);
}
/* 弹出框样式调整 */
.reqDown .el-dialog__header {
  padding: 17px 18px 17px 30px;
  background: #007cff;
  display: flex;
  justify-content: space-between;
}
// .reqDown .el-dialog__title,
// .reqDown .el-icon-close:before {
//   // color: #fff;
// }
.reqDown .el-dialog__title {
  color: #fff;
}
.reqDown .el-dialog__body {
  padding: 43px 2.6% 35px 2.17%;
}
.reqDown .el-dialog__footer {
  text-align: center;
  padding: 0 0 36px 0;
}
.reqDown .showdata {
  margin: 11px 0 0 5px;
}
.reqDown .showdata td {
  padding: 16px 0;
}
.reqDown .showdata th {
  padding: 25px 0;
}
.listNum{
  color: #007cff;
  cursor: pointer;
}
</style>
<style>
/* 表单样式调整 */
</style>

