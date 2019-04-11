/*
 * @Page: 规则配置
 * @Author: wangyadi
 * @Date: 2018-12-18 09:43:04
 * @Last Modified by: wangyadi
 */
<template>
  <div>
    <div v-loading="loading" class="reqConfig box">
      <!-- 新建弹窗 -->
      <Dialog :ruleDialog="ruleDialogData" @selectList="selectList"/>
      <transition name="slide-fade">
        <div v-if="search" class="ruleSearch topChuck">
          <!-- 查询条件 -->
          <el-row>
            <el-col :span="22">
              <el-form
                ref="queryCriteria"
                :inline="true"
                :model="queryCriteria"
                label-position="right"
              >
                <!-- 第一行 -->
                <!-- 规则库 -->
                <el-form-item :label="$t('ruleConfiguration.ruleBase')" class="offerMan">
                  <el-select
                    v-model="queryCriteria.ruleBaseCode"
                    :placeholder="$t('ruleConfiguration.all')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in ruleBase"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <!-- 规则类型 -->
                <el-form-item :label="$t('ruleConfiguration.ruleType')" class="offerMan">
                  <el-select v-model="queryCriteria.ruleTypeCode" :placeholder="$t('ruleConfiguration.all')" multiple collapse-tags>
                    <el-option
                      v-for="item in ruleType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      class="input"
                    />
                  </el-select>
                </el-form-item>
                <!-- 起止日期 -->
                <el-form-item :label="$t('ruleConfiguration.StartAndStopDates')" class="offerMan">
                  <el-date-picker
                    :end-placeholder="$t('reqcustomization.endDate')"
                    :start-placeholder="$t('reqcustomization.startDate')"
                    v-model="StartAndStopDates"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="-"/>
                </el-form-item>
                <!-- 规则状态 -->
                <el-form-item :label="$t('ruleConfiguration.ruleState')" class="offerMan">
                  <el-select v-model="queryCriteria.ruleStatus" :placeholder="$t('ruleConfiguration.all')" class="input" multiple collapse-tags>
                    <el-option v-for="item in ruleState" :key="item.value" :label="item.label" :value="item.value"/>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="1">
              <!-- 查询按钮 -->
              <el-button type="primary" @click="onSubmit">{{ $t('buttonGroup.search') }}</el-button>
            </el-col>
          </el-row>
        </div>
      </transition>
      <!-- 收缩按钮 -->
      <!-- <span :class="['sePosition', search ? 'lala' : 'lili']" @click="search = !search">
        <i :class="['el-icon-arrow-up',search ? 'downer' : 'upper']"/>
      </span> -->
      <div class="reqList ruleSetting">
        <p class="total">{{ $t('breakDown.total') }}<span>{{ total }}</span>{{ $t('breakDown.record') }}</p>
        <!-- 新建按钮 -->
        <a class="newCreate btnbg" @click="opens"><img src="../../assets/index/images/print.png">{{ $t('ruleConfiguration.newlyBuild') }}</a>
        <!-- 规则列表 -->
        <el-table :data="tableData" stripe class="table-style1" >
          <el-table-column :label="$t('ruleConfiguration.serialNumber')" prop="serialNumber" width="150" type="index"/>
          <!-- 规则库 -->
          <el-table-column :label="$t('ruleConfiguration.ruleBase')" prop="ruleBaseCode">
            <template slot-scope="scope">
              <span v-if="scope.row.ruleBaseCode === '0001'">{{ $t('ruleConfiguration.ruleBase1') }}</span>
              <span v-if="scope.row.ruleBaseCode === '0002'">{{ $t('ruleConfiguration.ruleBase2') }}</span>
            </template>
          </el-table-column>
          <!-- 规则类型 -->
          <el-table-column :label="$t('ruleConfiguration.ruleType')" prop="ruleTypeCode">
            <template slot-scope="scope">
              <span v-if="scope.row.ruleTypeCode === '0001'">{{ $t('ruleConfiguration.ruleType1') }}</span>
              <span v-if="scope.row.ruleTypeCode === '0002'">{{ $t('ruleConfiguration.ruleType2') }}</span>
            </template>
          </el-table-column>
          <!-- 规则 -->
          <el-table-column :label="$t('ruleConfiguration.rule')" prop="rule"/>
          <!-- 起止日期 -->
          <el-table-column :label="$t('ruleConfiguration.StartAndStopDates')" prop="seTime" width="200"/>
          <!-- 是否延期 -->
          <el-table-column :label="$t('ruleConfiguration.overdue')" prop="overdue" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.overdue === '0001'">{{ $t('ruleConfiguration.overdue1') }}</span>
              <span v-if="scope.row.overdue === '0002'">{{ $t('ruleConfiguration.overdue2') }}</span>
            </template>
          </el-table-column>
          <!-- 规则状态 -->
          <el-table-column :label="$t('ruleConfiguration.ruleState')" prop="ruleStatus" width="100">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.ruleStatus" @change="updateRuleState(scope.row.ruleId)"/>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="text-align: center">
          <el-pagination
            :current-page.sync="queryCriteria.currentPage"
            :page-size="queryCriteria.pageSize"
            :total="total"
            :pager-count="5"
            :prev-text="$t('demandForFiltering.previousPage')"
            :next-text="$t('demandForFiltering.nextPage')"
            class="paging"
            background
            layout="prev, pager, next, jumper"
            @current-change="handleCurrentChange"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/css/demand.css'
import Language from '@/utils/language'
import Dialog from '@/components/ruleConfiguration'
import { selectList, updateRuleState } from '@/api/configure'
export default {
  name: 'Reqfilter',
  components: {
    Dialog
  },
  mixins: [Language],
  data() {
    return {
      search: true, // 收缩控制
      total: 0, // 列表总条数
      // 新建规则弹窗
      ruleDialogData: {
        // 控制弹框显隐
        dialogTableVisible: false
      },
      StartAndStopDates: [], // 起止日期
      // 查询条件
      queryCriteria: {
        ruleBaseCode: [], // 规则库
        ruleTypeCode: [], // 规则类型
        startDate: '', // 起始日期
        endtDate: '', // 截止日期
        ruleStatus: [], // 规则状态
        currentPage: 1, // 列表当前页数
        pageSize: 10 // 每页展示条数
      },
      // 规则库
      ruleBase: [
        {
          value: '0001',
          label: '任务自动关闭规则库'
        },
        {
          value: '0002',
          label: '报价任务分解周期规则库'
        }
      ],
      // 规则类型
      ruleType: [
        {
          value: '0001',
          label: '每个供应商5个工作日内报价单任务数不多于50个'
        },
        {
          value: '0002',
          label: '同一物料同一供应商并存多条未分解任务保留最新任务'
        }
      ],
      // 规则状态
      ruleState: [
        {
          value: '0001',
          label: '未使用'
        },
        {
          value: '0002',
          label: '使用中'
        }
      ],
      // 规则配置列表
      tableData: [],
      // 弹窗中的表格
      showData: [],
      loading: false // loading加载
    }
  },
  created() {},
  mounted() {
    this.selectList()
  },
  methods: {
    // 规则配置列表
    selectList() {
      this.getDate() // 格式化日期
      this.tableData = []
      const params = JSON.parse(JSON.stringify(this.queryCriteria))
      params.ruleBaseCode = params.ruleBaseCode.toString()
      params.ruleTypeCode = params.ruleTypeCode.toString()
      params.ruleStatus = params.ruleStatus.toString()
      this.loading = true
      selectList(params).then(res => {
        // console.log(res.resultData, '列表数据')
        this.tableData = res.resultData.ruleList
        if (res.resultData.count) {
          this.total = res.resultData.count
        } else {
          this.total = 0
        }
        // 判断规则状态（未使用/使用中）
        if (res.resultData.ruleList) {
          res.resultData.ruleList.map((val, index) => {
            if (val.ruleStatus === '0002') {
              val.ruleStatus = true
            } else if (val.ruleStatus === '0001') {
              val.ruleStatus = false
            }
          // console.log(val.ruleStatus)
          })
        }
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询按钮
    onSubmit() {
      this.queryCriteria.currentPage = 1
      this.selectList()
    },
    // 格式化日期
    getDate() {
      if (this.StartAndStopDates) {
        this.queryCriteria.startDate = this.StartAndStopDates[0]
        this.queryCriteria.endtDate = this.StartAndStopDates[1]
      } else if (this.StartAndStopDates === null) {
        this.queryCriteria.startDate = ''
        this.queryCriteria.endtDate = ''
      }
    },
    // 修改规则状态
    updateRuleState(ruleId) {
      updateRuleState({ ruleId }).then(res => {
        if (res.success === true) {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
        }
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看弹窗
    opens(val) {
      this.ruleDialogData.dialogTableVisible = true
    },
    // 过滤表格分页
    handleCurrentChange(val) {
      this.queryCriteria.currentPage = val
      this.selectList() // 查询按钮
      // console.log(`当前页: ${val}`)
    },
    // 子元素传来的data
    getChildData(val) {
    }
  }
}
</script>
<style lang="scss" scope>
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
.slide-fade-enter,.slide-fade-leave-to {
  transform: translateY(-103px);
  opacity: 0;
}
/* 整个盒子 */
.reqConfig {
  // padding: 30px 1.9% 26px;
  padding: 18px;
  background-color: #f4f4f4;
}
/* 查询条件部分 */
.ruleSearch {
  border: 1px solid #d1d1d1;
  font-size: 0;
  background-color: #fff;
  padding: 32px 0 0 1.1%;
  margin-bottom: 17px;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
  right: 10px !important;
}
.searchRule {
  display: flex;
  justify-content: space-between
  // justify-content: flex-start
}
.ruleSearch .btn{
  width: 8.6%;
  display: flex;
  border-left: 1px solid #cecece
}
/* 列表部分 */
.reqList {
  border: 1px solid #d1d1d1;
  background-color: #fff;
  padding: 24px 1.54% 32px;
  .btnbg:hover {
    color: #fff
  }
}
.ruleSearch .state {
  line-height: 40px;
}
/* 查询框宽度调整 */
.input img {
  vertical-align: top;
  margin: 10px 7px 0 6px;
  cursor: pointer;
}
.com{
  width: 9%;
}
.date {
  width: 27%;
  .el-select-dropdown__item{
    padding-right: 27px;
  }
}
// .newState{
//   // width: 10%
// }
.select {
  width: 8%;
}
/* 收缩按钮 */
.sePosition {
  width: 3.15%;
  height: 16px;
  border: 1px solid #cecece;
  border-radius: 0 0 5px 5px;
  margin: 0 auto 4px;
  display: block;
  background: #fff;
  text-align: center;
  cursor: pointer;
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
.saves{
  color: #05CD00;
  font-size:14px !important;
}
.failure{
  color: #FF9E00
}
.effective{
  color: #007CFF
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
  text-align: left
}
.circle{
  width: 22px;
  height: 22px;
  margin:-2px 11px 0 0;
  border-radius: 50px;
  background-color: #007CFF;
  text-align: center;
  vertical-align: top
}
.circle img{
  margin-top: 5px
}
.total {
  float: right;
  font-size: 14px;
  margin:-6px 3px 0 0;
}
.total span {
  color: #4a90e2;
  margin: 0 2px;
}
.reqList .total {
  float: left;
  margin:-1px 0 0 0;
}
.blue,.reqConfig .el-button--text{
  color: #007CFF;
}
.blue:hover{
  color: #007CFF;
}
/* 表单样式调整 */
.reqConfig .el-form--inline .el-form-item{
  margin:0 0 24px 0;
}
// 规则库
.ruleLibrary .el-form-item__content{
  width: 75%;
  float: right;
  line-height:0
}
// 规则类型
.ruleTypes{
  .el-select{
    // width: 360px; // 90%
    width: 100%;
    overflow: hidden;
  }
  .el-form--inline .el-form-item__content{
    width:390px;
  }
}
.reqConfig .el-form-item__label{
  min-height: 49px;
  line-height: 26px;
  // margin-top: 8px;
  padding: 0 0;
  font-weight: inherit;
  text-align: right;
  overflow: hidden;
  // margin-right: 10px;
  width: 16%;
  line-height: 22px;
}
.ruleTypes{
  .el-form-item__label{
    width:12%;
    margin-right: 5%;
  }
}
.reqConfig .com .el-form-item__label{
  width: 29%;
}
.reqConfig .date .el-form-item__label{
  // width: 20%;
  float: left;
  margin-right: 10px;
}
.reqConfig .select .el-form-item__label{
  width: 32%;
  margin-top: 12px;
}
.reqConfig .com .el-form-item__content{
  width: 64.4%;
}
.reqConfig .date .el-form-item__content{
  // width: 75%;
  float: left;
}
.reqConfig .select .el-form-item__content{
  width: 60%;
}
.btn .el-form-item__content{
  margin:auto;
  margin-right: 25px
}
/* 输入框和日期样式调整 */
.reqConfig .el-date-editor .el-range-separator{
  width:7%
}
.reqConfig .el-range-editor.el-input__inner{
  padding:3px 0 3px 10px
}
.reqConfig .el-input--suffix .el-input__inner{
    padding:0 35px 0 7%;
    font-size: 14px;
}
.reqConfig .el-input.is-disabled .el-input__inner {
    color: #606266
}
.reqConfig .select .el-input--suffix .el-input__inner{
    padding-right: 22px;
}
.reqConfig .el-input__prefix{
    right: 4px;
    left: auto;
}
.reqConfig .el-input__icon{
    vertical-align: top;
}
.reqConfig .el-date-editor.el-input,.reqConfig .el-date-editor.el-input__inner{
    width: 83%;
}
.reqConfig .input .el-input__suffix{
    right: 0;
}
.reqConfig .el-icon-date:before{
    color: #000;
}
// .searchRule .el-button--primary{
//   /* height:42px; */
// }
/* 多选后不换行 */
.reqConfig .el-select .el-tag__close.el-icon-close{
    right: 0;
}
.reqConfig .el-select__tags{
    white-space: nowrap;
    overflow: hidden;
}
.reqConfig .el-select .el-tag{
    margin: 0 1px;
}
.reqConfig .el-tag--small{
    padding: 0 0;
}
/* 表格调整 */
.reqConfig .table-style1{
  width: 100%;
  margin: 60px 0 30px;
}
.reqConfig .table-style1 .el-table__header{
  border-top:0
}
.reqConfig .table-style1 .el-table__header tr th{
  border-left:0
}
.reqConfig .el-table th{
  padding: 16px 0;
}
.reqConfig .el-table td{
  padding:13px 0;
}
.reqConfig .el-table .cell,.reqConfig .el-table th div{
    padding: 0;
    white-space: nowrap;
    text-align: center;
}
.reqConfig .reqList .el-button{
  padding:0 0
}
/* 输入框背景颜色 */
.reqConfig .el-input__inner,.reqConfig .el-range-editor .el-range-input{
  background: rgba(249, 249, 249, 1);
}
/* 弹出框样式调整 */
.reqConfig .el-dialog__header{
  padding: 14px 19px;
  background: #007CFF;
  // display:flex;
  justify-content: space-between
}
.reqConfig .el-dialog__title,.reqConfig .el-icon-close:before{
  color:#fff;
}
.reqConfig .el-dialog__body{
  padding: 0px;
}
.reqConfig .el-dialog__footer{
  text-align:center;
  padding-bottom: 10px
}
.reqConfig .showdata{
  margin: 11px 0 0 5px;
}
.reqConfig .showdata td{
  padding:16px 0;
}
.reqConfig .showdata th{
  padding: 25px 0;
}
.reqConfig .ruleSetting .table-style1{
  min-height: calc(100vh - 525px);
}
.reqConfig{
  .ruleTypes{
    .el-form--inline .el-form-item{
      width:30%;
    }
  }
}

.ruleDate{
  width: 23%;
  .el-form-item__label{
    width:10%;
    margin-right: 5%;
  }
  .el-form-item__content{
    width:83%;
  }
}
.ruleState{
  width: 22%;
  .el-form-item__label{
    width:10%;
    margin-right: 5%;
  }
  .el-form-item__content{
    width:83%;
  }
}
.box .topChuck{
  padding: 0;
  padding-top: 20px;
  padding-bottom: 11px;
  padding-left: 20px;
}
.box .topChuck .el-row .el-col.el-col-22{
  height: 50px;
}
.box .topChuck .el-button{
  margin-top: 6%;
}
.box .topChuck .el-form--inline .el-form-item{
  width: 18%;
}
.box .topChuck .el-select{
  width: 85%;
}
.box .topChuck .el-form--inline .el-form-item__label{
  width: 17%;
  margin-right: 2%;
}
.box .topChuck .el-form--inline .el-form-item__content{
  width: 81%;
}
.box .topChuck .el-form--inline .el-form-item:nth-child(2) .el-form-item__content{
  width: 83%;
}
.box .topChuck .el-form--inline .el-form-item:nth-child(1) .el-form-item__content{
  width: 77%;
}
.box .topChuck .el-form--inline .el-form-item:nth-child(1) .el-form-item__label{
  width: 21%;
}
.box .topChuck .el-form--inline .el-form-item:nth-child(1){
  width: 20%;
}
.box .topChuck .el-form--inline .el-form-item:nth-child(2){
  width: 34%;
}
.box .topChuck .el-form--inline .el-form-item:nth-child(3){
  width: 30%;
}
.box .topChuck .el-form--inline .el-form-item:nth-child(2) .el-form-item__label{
  width: 15%;
}
.box .topChuck .el-form--inline .el-form-item:nth-child(4) .el-form-item__label{
  width: 30%;
}
.box .topChuck .el-form--inline .el-form-item:nth-child(4){
  width: 16%;
}
.box .topChuck .el-form--inline .el-form-item:nth-child(4) .el-form-item__content{
  width: 68%;
}
</style>

