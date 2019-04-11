<template>
  <!-- <div>{{ $t('route.editingTaskForTask') }}</div> -->
  <div id="editingtask">
    <div class="setting">
      <div class="setting-top">
        <div class="setting-top-left"/>
        <div class="setting-top-right">{{ $t('runTaskManager.taskdetail') }}</div>
      </div>
      <div class="setting-if">
        <ul class="setting-if-left1-left">
          <li :title="$t('demandManagement.client')">{{ $t('demandManagement.client') }}</li>
          <li :title="$t('demandManagement.area')">{{ $t('demandManagement.area') }}</li>
          <li :title="$t('demandManagement.sourceOfDemand')">{{ $t('demandManagement.sourceOfDemand') }}</li>
          <li :title="$t('demandNoResolve.reqType')">{{ $t('demandNoResolve.reqType') }}</li>
        </ul>
        <ul class="setting-if-left1">
          <li v-for="item in data1" :key="item.id">
            <div class="sp-right">
              <input :value="item.content" type="text" disabled="disabled">
            </div>
          </li>
        </ul>
        <ul class="setting-if-left2-left">
          <li :title="$t('demandNoResolve.reqLine')">{{ $t('demandNoResolve.reqLine') }}</li>
          <li :title="$t('breakDown.DemandCoding')">{{ $t('breakDown.DemandCoding') }}</li>
          <li :title="$t('breakDown.listRequirementDescription')">{{ $t('breakDown.listRequirementDescription') }}</li>
          <li :title="$t('Neednumberdimension.Taskone')">{{ $t('Neednumberdimension.Taskone') }}</li>
        </ul>
        <ul class="setting-if-left2">
          <!-- <li v-for="item in data2" :key="item.id">
            <el-tooltip class="item" effect="light" placement="right-start">
              <div slot="content">{{ item.content }}</div>
              <div class="sp-right">
                <input :value="item.content" type="text" disabled="disabled">
              </div>
            </el-tooltip>
          </li> -->
          <li v-for="item in data2" :key="item.id" :title = "item.content">
            <div class="sp-right">
              <input :value="item.content" type="text" disabled="disabled">
            </div>
          </li>
        </ul>
        <ul class="setting-if-left3-left">
          <li :title="$t('specialNumberDimension.categoryCode')">{{ $t('specialNumberDimension.categoryCode') }}</li>
          <li :title="$t('demandNoResolve.reqDescW')">{{ $t('demandNoResolve.reqDescW') }}</li>
          <li :title="$t('breakDown.MaterialType')">{{ $t('breakDown.MaterialType') }}</li>
          <li :title="$t('breakDown.SupplierCode')">{{ $t('breakDown.SupplierCode') }}</li>
        </ul>
        <ul class="setting-if-left3">
          <li v-for="item in data3" :key="item.id">
            <div :title="item.content" class="sp-right">
              <input :value="item.content" type="text" disabled="disabled">
            </div>
          </li>
        </ul>
        <ul class="setting-if-left4-left">
          <li :title="$t('breakDown.SupplierName')">{{ $t('breakDown.SupplierName') }}</li>
          <li :title="$t('breakDown.listPrice')">{{ $t('breakDown.listPrice') }}</li>
          <li :title="$t('breakDown.listPriceUnit')">{{ $t('breakDown.listPriceUnit') }}</li>
          <li :title="$t('breakDown.listProcurementUnit')">{{ $t('breakDown.listProcurementUnit') }}</li>
        </ul>
        <ul class="setting-if-left4">
          <li v-for="item in data4" :key="item.id">
            <div :title="item.content" class="sp-right">
              <input :value="item.content" type="text" disabled="disabled">
            </div>
          </li>
        </ul>
        <ul class="setting-if-left5-left">
          <li :title="$t('breakDown.listCurrency')">{{ $t('breakDown.listCurrency') }}</li>
          <li :title="$t('breakDown.listResource')">{{ $t('breakDown.listResource') }}</li>
        </ul>
        <ul class="setting-if-left5">

          <li v-for="item in data5" :key="item.id">
            <div :title="item.content" class="sp-right">
              <input :value="item.content" type="text" disabled="disabled">
            </div>
          </li>
        </ul>
        <ul class="setting-if-left6-left">
          <li :title="$t('materielNumForTask.resultPublick')">{{ $t('materielNumForTask.resultPublick') }}</li>
          <li :title="$t('materielNumForTask.taskStartDate')">{{ $t('materielNumForTask.taskStartDate') }}</li>
          <li :title="$t('materielNumForTask.taskDeadline')">{{ $t('materielNumForTask.taskDeadline') }}</li>
          <li :title="$t('materielNumForTask.taskCompleteDate')">{{ $t('materielNumForTask.taskCompleteDate') }}</li>
        </ul>
        <ul class="setting-if-left6">
          <li v-for="item in data6" :key="item.id">
            <div :title="item.content" class="sp-right">
              <input :value="item.content" type="text" disabled="disabled">
            </div>
          </li>
          <li>
            <div class="sp-right">
              <!-- <el-date-picker v-model="startDate1" :picker-options="pickerStart0" :clearable="false" type="date" value-format="yyyy-MM-dd HH:mm:ss"/> -->
              <el-date-picker
                v-model="startDate1"
                :clearable="false"
                :picker-options="pickerStart0"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"/>
            </div>
          </li>
          <li>
            <div class="sp-right">
              <input :value="report_date" type="text" disabled="disabled">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="list">
      <div class="list-top1">
        <div class="list-top1-left"/>
        <div class="list-top1-right">{{ $t('runTaskManager.templateSelection') }}</div>
      </div>
      <div class="list-top2">
        <div class="list-top2-check">
          <el-input v-model="input" placeholder="请输入要查找的模板关键字"/>
          <el-button type="primary" icon="el-icon-search" @click="search"/>
        </div>
        <div class="list-top2-creat">
          <el-button type="primary" @click="skip">{{ $t('demandCustomizationAdd.createTemplate') }}</el-button>
        </div>
      </div>
      <div class="pagination">
        <div class="pagination-left">{{ $t('demandNoResolve.total') }}</div>
        <div class="pagination-left2">{{ total }}</div>
        <div class="pagination-left3">{{ $t('dashboard.entries') }}{{ $t('runTaskManager.runTaskManagerTemplate') }}</div>
        <div class="pagination-right">
          <span class="pagination-right-s1">{{ currentPage }}</span>
          <span class="pagination-right-s2">/{{ AllPage }}</span>
          <!-- 分页 -->
          <el-pagination
            :total="total"
            :page-size="pageSize"
            small
            layout="prev, next"
            @current-change="handleCurrentChange"/>
        </div>
      </div>
      <div v-loading="loading" class="stencil">
        <!-- <el-card class="box-card"> -->
        <el-radio-group v-model="label">
          <div>
            <el-radio v-for="item in list" :label="item" :key="item.templateId" class="checkRadio" @change="outputVertionId(item.templateVersionId)">
              <ul>
                <li class="stencil-li1">
                  <!-- <img :src="require('../../../assets/index/images/'+(item.url))" alt=""> -->
                  <img src="../../../assets/index/images/power.png" alt="">
                  <span>{{ item.templateName }}</span>
                </li>
                <li :title="item.num" class="stencil-li2">{{ $t('templateManager.moduleNumber') }}：{{ item.templateId }}</li>
                <li :title="item.ct" class="stencil-li3">{{ $t('templateManager.creationTime') }}：{{ item.createTime }}</li>
                <li :title="item.limited" class="stencil-li4">{{ $t('templateManager.usefulLife') }}：{{ item.limited }}</li>
                <li :title="item.type" class="stencil-li5">{{ $t('templateManager.category') }}：{{ item.categoryCn }}</li>
                <li :title="item.area" class="stencil-li6">{{ $t('templateManager.area') }}：{{ item.areaName }}</li>
              </ul>
              <!-- 模板删除 -->
              <!-- <div class="stencil-op" @click="deleteModle(item.templateId)">
                <i class="el-icon-delete"/>
              </div> -->
            </el-radio>
          </div>
        </el-radio-group>
        <!-- </el-card> -->
      </div>
      <div class="operation">
        <div class="save" @click="save">{{ $t('demandForFiltering.save') }}</div>
        <div class="cancel" @click="goPre">{{ $t('demandForFiltering.cancel') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
import { getTemplateList, getTaskDetail, update, deleteModle } from '@/api/quoteoperational'
export default {
  name: 'Editingtask',
  data() {
    return {
      // 数据加载
      loading: true,
      // 模板接口品类名
      categoryCn: '',
      label: {},
      // 分页
      AllPage: 1, // 一共的页数
      currentPage: 1, // 当前页数
      pageSize: 8, // 每页条数
      total: 0, // 总数据数量
      // 任务填写日期
      report_date: '',
      // 头部条件接的总数据
      resAll: [],
      // 路由跳转接收的必要数据
      taskId: this.$route.query.taskId,
      operation: '',
      state: this.$route.query.state,
      endReportDate: '',
      templateVersionId: '',
      checkList: [],
      input: '',
      // 已选择的日期储存
      startDate1: '',
      pickerStart0: {
        // 启动日期选择时间范围限制
        disabledDate: time => {
          if (this.startDate2 !== '') {
            return time.getTime() > this.startDate2
          }
        }
      },
      data1: [
        // { id: '1', name: this.$t('runTaskManager.templateSelection'), content: '海尔' },
        // { id: '2', name: '区域', content: '印度' },
        // { id: '3', name: '需求来源', content: '商务中心-日常调价' },
        // { id: '4', name: '需求类型', content: '过程报价分解' }
      ],
      data2: [
        // { id: '1', name: '产业线', content: '冰箱' },
        // { id: '2', name: '需求编码', content: '11259' },
        // { id: '3', name: '需求描述', content: '冷凝干衣机总成交互' },
        // { id: '4', name: '任务人', content: '崔海平' }
      ],
      data3: [
        // { id: '1', name: '物料号', content: '0060209612' },
        // { id: '2', name: '物料描述', content: '滑道总成一组件' },
        // { id: '3', name: '物料类别', content: '滑轨(道)模块' },
        // { id: '4', name: '供应商编码', content: 'V13509' }
      ],
      data4: [
        // { id: '1', name: '供应商名称', content: 'SegosCo,Ltd' },
        // { id: '2', name: '价格', content: '5.12' },
        // { id: '3', name: '价格单位', content: '100' },
        // { id: '4', name: '采购单位', content: 'KG' }
      ],
      data5: [
        // { id: '1', name: '币种', content: 'USD' },
        // { id: '2', name: '资源量', content: '23' }
      ],
      data6: [
        // { id: '1', name: '结果公示日期', content: '2018-7-25' },
        // { id: '2', name: '任务开始日期', content: '2018-7-24' }
      ],
      // 展示模板数据
      list: [
        // { id: 1, name: '电源线模板', num: 'NO1097B1', ct: '2018.06.20', limited: '2018.1.1-2018.12.31', type: '线', area: '中国', url: 'power.png' },
        // { id: 2, name: '电源线模板', num: 'NO1097B1', ct: '2018.06.20', limited: '2018.1.1-2018.12.31', type: '线', area: '中国', url: 'power.png' },
        // { id: 3, name: '线束', num: 'NO1097B1', ct: '2018.06.20', limited: '2018.1.1-2018.12.31', type: '线', area: '中国', url: 'wicking.png' },
        // { id: 4, name: '电源线模板', num: 'NO1097B1', ct: '2018.06.20', limited: '2018.1.1-2018.12.31', type: '线', area: '中国', url: 'power.png' },
        // { id: 5, name: '线束', num: 'NO1097B1', ct: '2018.06.20', limited: '2018.1.1-2018.12.31', type: '线', area: '中国', url: 'wicking.png' }
      ]
    }
  },
  watch: {

  },
  mounted() {
    this.getAll()
    // this.getTemplate()
  },
  methods: {
    // 切换模板时获取当前模板版本id
    outputVertionId(val) {
      this.templateVersionId = val
      // console.log(this.templateVersionId, '选中的模板id')
    },
    // 创建模模板跳转
    skip() {
      // this.$router.push('/modle/newlybuild')
      // console.log(this.resAll[0].category_cn, this.resAll[0].region, 999)
      this.$router.push({
        path: '/index2',
        query: {
          templateClassId: this.resAll[0].category_cn, // 品类
          region: this.resAll[0].region,
          // userCode: this.userCode,
          page: '1' // 1：新建，2：编辑
        }
      })
    },
    // 分页
    handleCurrentChange(val) {
      // console.log('当前页', val)
      this.currentPage = val
      this.getTemplate()
    },
    // 模糊查询
    search() {
      this.currentPage = 1
      this.getTemplate()
    },
    // 模板管理接口
    getTemplate() {
      // const url = 'http://47.104.98.71:8780/costmanagement/template/getTemplateList'
      const params = {
        // 'categoryId': '1', // 品类id this.taskId
        'categoryCn': this.categoryCn, // 品类名字
        'type': '1', // 正序
        'currentPage': this.currentPage, // 当前页数
        'pageSize': this.pageSize, // 每页显示数据
        'templateName': this.input, // 模糊查询
        'templateState': '0003' // 已审核状态
      }
      getTemplateList(params).then(res => {
        // console.log('模板选择列表', res)
        this.list = res.resultData.list
        this.loading = false
        this.total = res.resultData.count
        this.AllPage = Math.ceil(this.total / this.pageSize)
        // 判断选中状态的模板runState 0001来判断
        for (let i = 0; i < res.resultData.list.length; i++) {
          if (res.resultData.list[i].templateVersionId === this.templateVersionId) {
            this.checkList.push(res.resultData.list[i])
            this.label = res.resultData.list[i] // 当前选中的模板
            // console.log(this.label, '当前label')
          }
        }
        // console.log('this.checkList', this.checkList)
      }).catch(res => {
        console.log('模板获取失败')
      })
    },
    // 接口数据获取
    getAll() {
      const params = { task_id: this.taskId } // '1' this.taskId
      getTaskDetail(params).then(res => {
        // console.log('任务详情显示内容', res)
        this.resAll = res.resultData
        this.dataDel()
      }).catch(res => {
        console.log('获取数据失败')
      })
    },
    dataDel() {
      // 数据处理
      // console.log('数据处理中this.resAll', this.resAll)
      // 模板接口传参处理品类名称
      // this.categoryCn = this.resAll[0].category_cn
      // data1
      var data1Obj1 = { id: '1', content: '' }
      data1Obj1.content = this.resAll[0].customer // 客户
      this.data1.push(data1Obj1)
      var data1Obj2 = { id: '2', content: '' }
      data1Obj2.content = this.resAll[0].region // 区域
      this.data1.push(data1Obj2)
      var data1Obj3 = { id: '3', content: '' }
      data1Obj3.content = this.resAll[0].demand_source // 需求来源
      this.data1.push(data1Obj3)
      var data1Obj4 = { id: '4', content: '' }
      data1Obj4.content = this.resAll[0].demand_type // 需求类型
      this.data1.push(data1Obj4)
      // data2
      var data2Obj1 = { id: '1', content: '' }
      data2Obj1.content = this.resAll[0].industry_name // 产业线名称
      this.data2.push(data2Obj1)
      var data2Obj2 = { id: '2', content: '' }
      data2Obj2.content = this.resAll[0].demand_code // 需求编码
      this.data2.push(data2Obj2)
      var data2Obj3 = { id: '3', content: '' }
      data2Obj3.content = this.resAll[0].remarks // 需求描述
      this.data2.push(data2Obj3)
      var data2Obj4 = { id: '4', content: '' }
      data2Obj4.content = this.resAll[0].manager // 任务人
      this.data2.push(data2Obj4)
      // data3
      var data3Obj1 = { id: '1', content: '' }
      data3Obj1.content = this.resAll[0].module_code // 物料号
      this.data3.push(data3Obj1)
      var data3Obj2 = { id: '2', content: '' }
      data3Obj2.content = this.resAll[0].module_describe // 物料描述
      this.data3.push(data3Obj2)
      var data3Obj3 = { id: '3', content: '' }
      data3Obj3.content = this.resAll[0].category_cn // 物料类别
      this.categoryCn = this.resAll[0].category_cn
      this.data3.push(data3Obj3)
      var data3Obj4 = { id: '4', content: '' }
      data3Obj4.content = this.resAll[0].supplier_code // 供应商编码
      this.data3.push(data3Obj4)
      // data4
      var data4Obj1 = { id: '1', content: '' }
      data4Obj1.content = this.resAll[0].supplier_name // 供应商名称
      this.data4.push(data4Obj1)
      var data4Obj2 = { id: '2', content: '' }
      data4Obj2.content = this.resAll[0].price // 价格
      this.data4.push(data4Obj2)
      var data4Obj3 = { id: '3', content: '' }
      data4Obj3.content = this.resAll[0].price_unit // 价格单位
      this.data4.push(data4Obj3)
      var data4Obj4 = { id: '4', content: '' }
      data4Obj4.content = this.resAll[0].purchasing_unit // 采购单位
      this.data4.push(data4Obj4)
      // data5
      var data5Obj1 = { id: '1', content: '' }
      data5Obj1.content = this.resAll[0].currency // 币种
      this.data5.push(data5Obj1)
      var data5Obj2 = { id: '2', content: '' }
      data5Obj2.content = this.resAll[0].resource_quantity // 资源量
      this.data5.push(data5Obj2)
      // data6
      var data6Obj1 = { id: '1', content: '' }
      data6Obj1.content = this.resAll[0].result_date // 结果公示日期
      this.data6.push(data6Obj1)
      var data6Obj2 = { id: '2', content: '' }
      data6Obj2.content = this.resAll[0].start_report_date // 任务开始日期
      this.data6.push(data6Obj2)
      // 任务截止日期
      this.startDate1 = this.resAll[0].end_report_date // this.resAll[0].end_report_date
      // 填报日期
      this.report_date = this.resAll[0].report_date
      // 模板获取调用
      this.getTemplate()
      // 当前模板版本id
      this.templateVersionId = this.resAll[0].template_version_id
      // console.log(this.templateVersionId, '当前模板id')
    },
    // 删除
    deleteModle(templateId) {
      // let arr = []
      // arr = this.list.filter((item, index) => {
      //   return (item.templateId !== this.checkList[0])
      // })
      // this.list = []
      // arr.forEach((item, index) => {
      //   this.list.push(item)
      // })
      const params = { templateId }
      deleteModle(params).then(res => {
        if (res.success === true) {
          this.getTemplate()
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败，请重试！'
          })
        }
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 模糊差询
    inquire() {
      // let arr = []
      // arr = this.list.filter((item, index) => {
      //   return (
      //     item.categoryCn.indexOf(this.input) !== -1
      //   )
      // })
      // arr.forEach((item, index, datas) => {
      //   this.checkList.push(item.templateId)
      // })
      // console.log('this.input', this.input)
      // console.log('checkList', this.check)
      // 后台接口

    },
    save() {
      console.log('选中后的this.checkList', this.checkList)
      // 判断传来的状态启动/停止
      if (this.state === '启动') {
        this.state = '0001'
      }
      if (this.state === '停止') {
        this.state = '0002'
      }
      console.log('this.startDate1', this.startDate1)
      // const url = 'http://47.104.98.71:8780/costmanagement/task/update'
      // const params = { operation: 1, taskId: 1 }
      // 判断模板有无更换，不更换默认
      // if (this.checkList !== []) {
      //   this.checkList.push()
      // }
      const params = {
        operation: '1', // 固定的
        taskId: this.taskId,
        state: this.state,
        endReportDate: this.startDate1,
        templateVersionId: this.templateVersionId
        // this.checkList[0].templateVersionId
      }
      // this.$axios({ url: url, params, method: 'post' }).then(res => { // 这是从本地请求的数据接口，
      //   console.log('任务运行截止日期接口', res)
      //   // this.userList = JSON.parse(res.request.response).resultData.demandSCList
      //   // console.log('this.userList', this.userList)
      //   if (res.data.success === false) {
      //     this.$message({
      //       type: 'error',
      //       message: '保存失败!'
      //     })
      //   } else {
      //     this.$message({
      //       type: 'success',
      //       message: '保存成功!'
      //     })
      //   }
      // }).catch(res => { console.log('任务运行截止日期接口请求失败') })
      update(params).then(res => {
        if (res.success === false) {
          this.$message({
            type: 'error',
            message: '保存失败!'
          })
        } else {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }
      }).catch(res => {
        console.log('任务运行截止日期接口请求失败')
      })
    },
    goPre() {
      this.$router.go(-1)
    }
  }
}

</script>

<style>
.stencil .el-radio-group{
  width: 100%;
}
ul,li{
  padding:0;
  margin:0;
  list-style:none
}
#editingtask{
  background: #F4F4F4;
  padding-top: 30px;
  height: 1463px;
}
.setting{
  width: 96.3%;
  height: 312px;
  margin-left: 1.79%;
  /* margin-top: 30px; */
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid #D1D1D1;
}
.setting-top{
  height: 54px;
  width: 100%;
}
.setting-top-left{
  margin-top: 26px;
  width:4px;
  height:27px;
  background:linear-gradient(180deg,rgba(78,194,252,1) 0%,rgba(38,143,249,1) 100%);
  border-radius:0px 28px 28px 0px;
  float: left;
}
.setting-top-right{
  min-width:6.02%;
  height:30px;
  font-size:22px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(74,74,74,1);
  line-height:30px;
  margin-left: 1.28%;
  margin-top: 24px;
  float: left;
}
.setting-if{
  width: 100%;
  height: 198px;
  margin-top: 25px;
}
/* 设置格式 */
.setting-if-left1{
  /* width: 14.34%; */
  width: 10.5%;
  height: 100%;
  float: left;
  /* margin-left: 1.66%; */
  border-right: 2px solid #CECECE
}
.setting-if-left1-left{
  float: left;
  margin-left: 1.66%;
  height: 36px;
  width: 5.84%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
}
.setting-if-left2-left{
  float: left;
  margin-left: 0.34%;
  height: 36px;
  width: 6.1%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
}
.setting-if-left3-left{
  float: left;
  margin-left: 0.09%;
  height: 36px;
  width: 6.63%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
}
.setting-if-left4-left{
  float: left;
  margin-left: 0.34%;
  height: 36px;
  width: 4.87%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
}
.setting-if-left5-left{
  float: left;
  margin-left: 0.15%;
  height: 36px;
  width: 4.1%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
}
.setting-if-left6-left{
  float: left;
  margin-left: 0.09%;
  height: 36px;
  width: 6.21%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
}
.setting-if-left1 li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
}
.setting-if-left1-left li{
  width: 100%;
  height: 36px;
  line-height: 36px;
  margin-bottom: 16px;
  overflow: hidden;
  text-align: right;
  padding-right: 5px;
}
.setting-if-left2-left li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
  overflow: hidden;
  text-align: right;
  padding-right: 5px;
}
.setting-if-left3-left li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
  overflow: hidden;
  text-align: right;
  padding-right: 5px;
}
.setting-if-left4-left li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
  overflow: hidden;
  text-align: right;
  padding-right: 5px;
}
.setting-if-left5-left li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
  overflow: hidden;
  text-align: right;
  padding-right: 5px;
}
.setting-if-left6-left li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
  overflow: hidden;
  text-align: right;
  padding-right: 5px;
}
/* .sp-left{
  height: 36px;
  width: 25%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
  float: left;
} */
.sp-right{
  width: 89.29%;
  height: 36px;
  float: right;
  margin-right: 10.71%;
}
.sp-right input{
  width: 100%;
  height: 36px;
  border: 0;
  background:rgba(244,244,244,1);
  border-radius:4px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(52,58,64,1);
  line-height:36px;
  padding-left: 7.86%;
}
.setting-if-left2{
  width: 11.52%;
  height: 100%;
  float: left;
  border-right: 2px solid #CECECE
}
.setting-if-left2 li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
}
/* .setting-if-left2 .sp-left{
  height: 36px;
  width: 22.95%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
  float: left;
} */
.setting-if-left2 .sp-right{
  width: 89.29%;
  height: 36px;
  float: right;
  margin-right: 8.61%;
}
.setting-if-left3{
  width: 12.16%;
  height: 100%;
  float: left;
  border-right: 2px solid #CECECE
}
.setting-if-left3 li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
}
/* .setting-if-left3 .sp-left{
  height: 36px;
  width: 25.27%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
  float: left;
} */
.setting-if-left3 .sp-right{
  width: 88.42%;
  height: 36px;
  float: right;
  margin-right: 11.58%;
}
.setting-if-left4{
  width: 12.23%;
  height: 100%;
  float: left;
  border-right: 2px solid #CECECE
}
.setting-if-left4 li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
}
/* .setting-if-left4 .sp-left{
  height: 36px;
  width: 26.22%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
  float: left;
} */
.setting-if-left4 .sp-right{
  width: 87.96%;
  height: 36px;
  float: right;
  margin-right: 12.04%;
}
.setting-if-left5{
  width: 5.44%;
  height: 100%;
  float: left;
  /* margin-left: 1.15%; */
  border-right: 2px solid #CECECE
}
.setting-if-left5 li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
}
.setting-if-left5 .sp-right{
  width: 72.94%;
  height: 36px;
  float: right;
  margin-right: 27.06%;
}
.setting-if-left6{
  width: 11.14%;
  height: 100%;
  float: left;
  /* margin-left: 1.09%; */
}
.setting-if-left6 li{
  width: 100%;
  height: 36px;
  margin-bottom: 16px;
}
/* .setting-if-left6 .sp-left{
  height: 36px;
  width: 31%;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(127,131,144,1);
  line-height:36px;
  float: left;
} */
.setting-if-left6 .sp-right{
  /* width: 80.46%;
  height: 36px;
  float: right;
  margin-right: 19.54%; */
    width: 91.46%;
    height: 36px;
    float: right;
    margin-right: 8.54%;
}
/* 日期选择格式调整 */
/* .setting-if-left6 .el-date-editor{
  position: relative;
} */
.setting-if-left6 .el-input--prefix .el-input__inner{
  padding-left: 7.86%;
  padding-right: 20.86%;
  font-size: 20px;
}
/* 任务截止日期选择格式 */
.setting-if-left6 .el-icon-time:before{
  margin-left:35%
}
.setting-if-left6 .el-date-editor.el-input{
  width: 100%;
}
.setting-if-left6 .sp-right .el-input__prefix::before{
  content: "";
  float: left;
  width: 1px;
  height: 27px;
  margin-top: 5px;
  background: #CECECE;
  margin-left: 5px;
}
.setting-if-left6 .sp-right .el-input__prefix{
  left: 75%!important;
  color: #007CFF
}
.sp-right .el-icon-date:before{
  margin-left: 30%;
}
.sp-right .el-input__icon{
  width: 19px;
}
/* 模板选择样式 */
.list{
  width:96.3%;
  height:915px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid #D1D1D1;
  margin-top: 31px;
  margin-left: 1.79%;
}
.list-top1{
  height: 44px;
  width: 100%;
}
.list-top1-left{
  width:4px;
  height:26px;
  background:linear-gradient(180deg,rgba(78,194,252,1) 0%,rgba(38,143,249,1) 100%);
  border-radius:0px 28px 28px 0px;
  float: left;
  margin-top: 22px;
}
.list-top1-right{
  min-width:5.95%;
  height:22px;
  font-size:22px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(74,74,74,1);
  line-height:22px;
  float: left;
  margin-top: 24px;
  margin-left: 20px;
}
.list-top2{
  width: 100%;
  height: 66px;
  margin-top: 18px;
}
.list-top2-check{
  width: 44.75%;
  height: 66px;
  background:rgba(249,249,249,1);
  border-radius:5px;
  border:1px solid #CECECE;
  margin-left: 26.57%;
  float: left;
}
.list-top2-check .el-input{
  width: 86.98%;
  height: 100%;
}
.list-top2-check .el-input__inner{
  width: 100%;
  height: 100%;
  float: left;
  border: 0;
}
.list-top2-check .el-button--primary{
  width: 13%;
  height: 100%;
  float: right;
  padding: 0;
}
.list-top2-check .el-icon-search{
  width: 24.72%;
  height: 22px;
}
.list-top2-check .el-icon-search::before{
  content: "\E619";
  font-size: 22px;
}
.list-top2-creat{
  float: left;
  min-width: 13.76%;
  height: 44px;
  margin-left: 13.12%;
  margin-top: 9px;
}
.list-top2-creat .el-button--primary{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  line-height: 44px;
}
.list-top2-creat .el-button--primary span{
  display: inline-block;
  min-width: 37.21%;
  height: 19px;
  font-size:20px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(255,255,255,1);
  line-height: 19px;
}
.pagination{
  width: 96.41%;
  height: 36px;
  margin-left: 1.66%;
  margin-top: 10px;
}
.pagination-left{
  float: left;
  /* width: 4.85%; */
  min-width: 1%;
  height: 20px;
  margin-top: 8px;
  font-size: 14px;
}
.pagination-left2{
  float: left;
  min-width: 1%;
  height: 20px;
  margin-top: 8px;
  font-size: 14px;
  color: #4A90E2;
  text-align: center;
}
.pagination-left3{
  float: left;
  min-width: 2.85%;
  height: 20px;
  margin-top: 8px;
  font-size: 14px;
}
.pagination-right{
  float: left;
  width: 10.16%;
  margin-left: 84.99%;
}
.pagination-right-s1{
  float: left;
  display: block;
  width: 7px;
  height:20px;
  font-size:14px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(74,144,226,1);
  line-height:20px;
  margin-top: 8px;
}
.pagination-right-s2{
  float: left;
  display: block;
  width: 22px;
  height:20px;
  font-size:14px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:#354052;
  line-height:20px;
  margin-top: 8px;
  /* margin-right: 24.84%; */
}
/* 翻页按钮格式 */
#editingtask .pagination-right .el-pagination{
  float: right;
  width: 57.52%;
  margin-top:0;
}
.pagination-right .btn-next{
  width: 50%;
  height: 36px;
  border-radius:0 4px 4px 0;
  border:1px solid #E6EAEE;
}
.pagination-right .btn-prev{
  width: 50%;
  height: 36px;
  border-radius:4px 0 0 4px;
  border:1px solid #E6EAEE;
  border-right: 0;
}
/* 三角形 */
.pagination-right .btn-next::before{
  content: url(../../../assets/index/images/next.png);
}
.pagination-right .el-icon-arrow-right:before{
  display: none;
}
.pagination-right .btn-prev::before{
  content: url(../../../assets/index/images/prev.png);
}
.pagination-right .el-icon-arrow-left:before{
  display: none;
}
/* 模板展示样式 */
.stencil{
  width: 98.02%;
  height: 645px;
}
.stencil .el-radio{
  width:23.41%;
  height:288px;
  background:rgba(255,255,255,1);
  opacity:1!important;
  box-shadow:0px 1px 6px 0px rgba(0,0,0,0.1);
  border-radius:5px;
  opacity:0.4917;
  border:1px solid #CECECE;
  margin-left: 1.5%;
  margin-top: 15px;
  overflow: hidden;
}
.stencil .el-radio__label{
  padding: 0;
  /* width: 85.28%; */
  width: 100%;
  overflow: hidden;
}
.stencil .el-radio__input{
  position: absolute;
  top: 14px;
  right: 15px;
  width: 24px;
  height: 24px;
}
/* 单选按钮对勾样式 */
.stencil .el-radio__inner{
  width: 24px;
  height: 24px;
}
.stencil .el-radio__input.is-checked .el-radio__inner::after {
  transform: rotate(45deg) scaleY(1) !important;
}
.stencil .el-radio__input.is-checked .el-radio__inner::after{
  transform: rotate(45deg)!important;
  left: 35%;
  top: 10%;
  width: 8px;
  height: 14px;
  border: 1px solid #cccccc;
  border-radius: 0;
  border-left: 0;
  border-top: 0;
  background: transparent;
}
.stencil ul{
  margin-top: 30px;
  float: left;
  /* width: 81.67%; */
  width: 100%;
}
.stencil ul li{
  margin-left: 30px;
  color: #666666;
    width: 88%;
    overflow: hidden;
    text-overflow: ellipsis;
}
.stencil-li1{
  margin-bottom: 34px;
  height: 54px;
}
.stencil-li1 img{
  width: 54px;
  height: 54px;
  float: left;
}
.stencil-li1 span{
  float: left;
  margin-left: 7.82%;
  /* width:50.49%; */
  width: 67%;
  height:28px;
  font-size:20px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(53,64,82,1);
  line-height:28px;
  margin-top: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stencil-li2,.stencil-li3,.stencil-li4,.stencil-li5,.stencil-li6{
  font-size:17px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:30px;
  height: 30px;
  width: 41.67%;
}
.checkRadio{
  /* position: relative; */
}
.stencil-op{
  /* position: absolute; */
  float: right;
  margin-right: 6.33%;
  margin-top: -6%;
  height: 21px;
  width: 5.56%;
  font-size: 20px;
}
/* 选中按钮样式 */
.stencil .el-checkbox__inner{
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background:#CECECE;
}
.stencil .el-checkbox__inner::after{
  height: 13px;
  left: 7px;
  width: 7px;
}
/* 操作样式 */
#editingtask .operation{
  width: 100%;
  height: 44px;
  padding-top: 24px;
}
.save{
  float: left;
  margin-left: 35.08%;
  width:13.76%;
  height:44px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid #007CFF;
  text-align: center;
  line-height: 44px;
  font-size:20px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(0,124,255,1);
  cursor:pointer;
}
.cancel{
  float: left;
  margin-left: 1.86%;
  width:13.76%;
  height:44px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid #9B9B9B;
  font-size:20px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(155,155,155,1);
  text-align: center;
  line-height: 44px;
  cursor:pointer;
}
</style>
