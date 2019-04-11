<template>
  <div>
    <div class="bottom">
      <!-- 筛选 -->
      <div :class="search==1?'condition':'condition-vanish'">
        <div :class="search==1?'condition-left':'vanish'">
          <div class="condition-left-top">
            <div :title="$t('demandManagement.client')" class="li1">{{ $t('demandManagement.client') }}</div>
            <el-select
              v-model="info.customer"
              class="li1-1"
              collapse-tags
              filterable
              default-first-option
              placeholder="请选择">
              <el-option
                v-for="item in client"
                :key="item.customerCode"
                :label="item.name"
                :value="item.name">
                <!-- <el-checkbox>{{ item.name }}</el-checkbox> -->
              </el-option>
            </el-select>
            <div :title="$t('demandManagement.area')" class="li2">{{ $t('demandManagement.area') }}</div>
            <el-select
              v-model="info.region"
              class="li2-1"
              collapse-tags
              filterable
              default-first-option
              placeholder="请选择">
              <el-option
                v-for="item in optionsArea"
                :key="item.code"
                :label="item.name"
                :value="item.name">
                <!-- <el-checkbox>{{ item.name }}</el-checkbox> -->
              </el-option>
            </el-select>
            <div :title="$t('demandNoResolve.reqLine')" class="li3" >{{ $t('demandNoResolve.reqLine') }}</div>
            <el-select
              v-model="industry_idS"
              value-key="industry_name"
              class="li3-1"
              collapse-tags
              filterable
              default-first-option
              placeholder="请选择">
              <el-option
                v-for="item in industry"
                :key="item.industry_id"
                :label="item.industry_name"
                :value="item">
                <!-- <el-checkbox>{{ item.industryName }}</el-checkbox> -->
              </el-option>
            </el-select>
            <div :title="$t('demandManagement.supplier')" class="li4">{{ $t('demandManagement.supplier') }}</div>
            <div class="li4-1">
              <!-- <input :value="suppliers" type="text">
              <span>
                <img src="../../../assets/index/images/search.jpg" alt="" style="height:38px;margin-top:1px;margin-right:1.5px;" @click="cpmOpen($t('demandManagement.supplier'))">
              </span> -->
              <!-- 供应商弹窗换成海尔特供 !!!!!-->
              <!-- <cpm ref="childDistributor" :name="distributor"/> -->
              <cpmAlone ref="childDistributor" :name="distributor"/>
            </div>
            <div :title="$t('demandManagement.materialNumber')" class="li4">{{ $t('demandManagement.materialNumber') }}</div>
            <div class="li4-1">
              <!-- <input :value="material" type="text">
              <span>
                <img src="../../../assets/index/images/search.jpg" alt="" style="height:38px;margin-top:1px;margin-right:1.5px;" @click="cpmOpen($t('demandManagement.materialNumber'))">
              </span> -->
              <cpm ref="childMaterials" :name="materials"/>
            </div>
          </div>
          <div class="condition-left-top2">
            <div :title="$t('demandManagement.sourceOfDemand')" class="top2-li1">{{ $t('demandManagement.sourceOfDemand') }}</div>
            <el-select
              v-model="info.demand_source"
              class="top2-li1-1"
              collapse-tags
              placeholder="请选择">
              <el-option
                v-for="item in sourcereq"
                :key="item.code"
                :label="item.name"
                :value="item.name">
                <!-- <el-checkbox>{{ item.name }}</el-checkbox> -->
              </el-option>
            </el-select>
            <div :title="$t('demandManagement.businessScenario')" class="top-li4">{{ $t('demandManagement.businessScenario') }}</div>
            <div class="top-li4-1">
              <!-- <input type="text">
              <span>
                <img src="../../../assets/index/images/search.jpg" alt="" style="height:38px;margin-top:1px;margin-right:1.5px;" @click="cpmOpen('业务场景')">
              </span> -->
              <cpm ref="childBusiness" :name="business"/>
            </div>
            <div :title="$t('demandManagement.materialType')" class="top-li5">{{ $t('demandManagement.materialType') }}</div>
            <div class="top-li5-1">
              <!-- <input :value="materialTypes" type="text">
              <span>
                <img src="../../../assets/index/images/search.jpg" alt="" style="height:38px;margin-top:1px;margin-right:1.5px;" @click="cpmOpen($t('demandManagement.materialType'))">
              </span> -->
              <cpm ref="childMaterialTypess" :name="materialTypess"/>
            </div>
            <div :title="$t('demandManagement.taskOne')" class="top-li6">{{ $t('demandManagement.taskOne') }}</div>
            <div class="top-li6-1">
              <!-- <input type="text">
              <span>
                <img src="../../../assets/index/images/search.jpg" alt="" style="height:38px;margin-top:1px;margin-right:1.5px;" @click="cpmOpen('任务人')">
              </span> -->
              <cpm ref="childTasker" :name="tasker"/>
            </div>
          </div>
        </div>
        <div :class="search==1?'condition-center':'vanish'"/>
        <div :class="search==1?'condition-right':'vanish'">
          <el-button :title="$t('buttonGroup.confirm')" type="primary" round class="condition-right1" @click="sureAdd">{{ $t('buttonGroup.confirm') }}</el-button>
          <el-button :title="$t('demandManagement.empty')" type="primary" round class="condition-right3" @click="emptyIf">{{ $t('demandManagement.empty') }}</el-button>
        </div>
      </div>
      <!-- 缩放 -->
      <span class="sePosition" @click="hideSearch"><i :class="image" class="el-icon-arrow-up" style="height:12px;line-height:12px;"/></span>
      <div class="bottom1">
        <div class="bottom1-top">
          <div class="bottom1-h">{{ $t('demandManagement.filterCondition') }}</div>
          <div class="bottom1-h-right">
            <!-- 点击弹出一个框请先保存 -->
            <el-button :title="$t('demandManagement.takeEffect')" :disabled="isdisabledFn" type="primary" round class="condition-right2" @click="settingOperant">{{ $t('demandManagement.takeEffect') }}</el-button>
            <el-button v-loading="loadingSave" :title="$t('demandForFiltering.save')" type="primary" round class="condition-right4" @click="settingSave">{{ $t('demandForFiltering.save') }}</el-button>
          </div>
        </div>
        <!-- 展示列表 -->
        <el-table
          :data="userList"
          :loading="loading"
          highlight-current-row
          stripe
          style="width: 100%;padding-left:18px;padding-right:18px;"
        >
          <el-table-column :label="$t('demandForFiltering.serialNumber')" align="center" type="index"/>
          <el-table-column :label="$t('demandNoResolve.custom')" prop="customer" align="center"/>
          <el-table-column :label="$t('demandNoResolve.reqSource')" prop="demand_source" align="center"/>
          <el-table-column :label="$t('demandNoResolve.area')" prop="region" align="center"/>
          <el-table-column :label="$t('demandNoResolve.reqLine')" prop="industry_name" align="center"/>
          <el-table-column :label="$t('demandManagement.businessScenario')" prop="scene_name" align="center"/>
          <el-table-column :label="$t('demandManagement.materialType')" prop="category_cn" align="center"/>
          <el-table-column :label="$t('demandManagement.materialNumber')" prop="module_code" align="center"/>
          <el-table-column :label="$t('demandManagement.supplier')" prop="supplier_name" align="center"/>
          <el-table-column :label="$t('demandManagement.taskOne')" prop="manager" align="center"/>
          <!-- <el-table-column :label="$t('bidManagement.privateNumber')" prop="moduleCode" align="center"/> -->
          <el-table-column
            :label="$t('specialNumberDimension.handle')"
            prop="state"
            align="center">
            <template slot-scope="scope">
              <img src="../../../assets/index/images/operation.jpg" class="operation-pic" @click="deleteRow(scope.$index, userList)">
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>
<script>
import '@/assets/css/reqFilter.css'
import cpm from '@/components/Popup/index'
import cpmAlone from '@/components/Popup/supplierHaier'
import { mapGetters } from 'vuex'
// import Language from '@/utils/language'
import { selects, industryLine, searchDemandFilterListByCS, saveDemandFilter, updateDemandFilter } from '@/api/requirements'
import { judgeUrl } from '@/utils/api'
export default {
  name: 'Reqfiltersetting',
  components: {
    cpm,
    cpmAlone
  },
  // mixins: [Language],
  data() {
    return {
      loadingSave: false,
      loading: true, // 数据加载
      // 保存生效接口参数
      demand_sc_id: '',
      demandsc_state: '',
      // 存userCode
      Name: '',
      // 产业线ID
      industry_idS: { industry_id: '', industry_name: '' },
      info: {
        'customer': '', // 客户
        'region': '', // 区域
        'demand_source': '' // 需求来源
      },
      // 生效按钮禁用
      isdisabledFn: true,
      // 弹窗组件供应商传值
      distributor: this.$t('demandManagement.supplier'),
      // 弹窗组件物料号传值
      materials: this.$t('demandManagement.materialNumber'),
      // 弹窗组件物料类型传值
      materialTypess: this.$t('demandManagement.materialType'),
      // 弹窗组件任务场景传值
      business: this.$t('demandManagement.businessScenario'),
      // 弹窗组件任务人传值
      tasker: this.$t('demandManagement.taskOne'),
      // 页面跳转传来的id22的值
      demandscState: this.$route.query.demandsc_state,
      demandscCode: this.$route.query.demandCode,
      // 分页
      currentPage: 1, // 初始页
      pagesize: 10, //    每页的数据
      // 展示列表
      userList: [],
      // 存储物料号
      material: '',
      // 存储供应商
      suppliers: '',
      // 存储物料类别
      materialTypes: '',
      search: 1,
      image: '',
      cpm: true,
      currentPage3: 5,
      // 条件数据来源区域
      optionsArea: [],
      // 条件数据来源需求来源
      sourcereq: [],
      // 条件数据来源客户
      client: [],
      // 条件数据来源产业线
      industry: []
    }
  },
  computed: {
    ...mapGetters(['avatar', 'name'])
  },
  created() {
    // 筛选请求数据
    this.dataCondition()
    this.sourceReq()
    this.clientCheck()
    this.industryLineF()
    // if (!this.$route.query.demandsc_state) {
    //   this.demandscCode = this.$route.query.demandCode
    //   // _this.demandscCode = ''
    //   this.getFiltList()
    // }
    // console.log(this.$route.query)
    // if (this.$route.query.demandsc_state) {
    //   this.demandscState = ''
    //   this.userList = []
    //   // this.getFiltList()
    // } else if (this.$route.query.Identification === '1') {
    //   this.getFiltList()
    // }
  },
  // 导航切换修改
  activated() {
    // 路由跳转时
    if (this.$route.fullPath !== '/requirements/reqfiltersetting') {
      window.sessionStorage.setItem('reqfilterHref', window.location.href)
      if (this.$route.query.demandsc_state) {
        this.demandscState = ''
        this.userList = []
        // this.getFiltList()
      } else if (this.$route.query.Identification === '1') {
        this.demandscCode = this.$route.query.demandCode
        this.getFiltList()
      }
    } else { // 导航切换进入时
      this.query = window.sessionStorage.getItem('reqfilterHref')
      this.query = this.query.split('?')
      this.query = this.query[1]
      if (this.query.length > 19) {
        this.query = this.query.split('&')
        this.query = this.query[0] + ''
        this.query = this.query.split('=')
        this.demandscCode = this.query[1]
        this.getFiltList()
      } else {
        this.demandscState = ''
        this.userList = []
      }
    }
  },
  methods: {
    // 过滤列表展示
    getFiltList() {
      // id22
      // const url = 'http://47.104.98.71:8780/costmanagement/demandScRule/searchDemandFilterListByCS'
      const data = {
        'demandsc_code': this.demandscCode, // '1'
        'demandsc_state': this.demandscState // ''
      }
      searchDemandFilterListByCS(data).then(res => {
        // console.log('id22请求成功', res)
        if (res.resultData[0].demandScRuleData[0] === null) {
          this.userList = []
        } else if (JSON.stringify(res.resultData[0].demandScRuleData[0]) === JSON.stringify({ category_en: '', industry_name: '', category_cn: '', category_code: '', scene_name: '' })) {
          this.userList = []
        } else {
          this.userList = res.resultData[0].demandScRuleData
        }
        // console.log(this.userList, '列表')
        this.demandsc_state = res.resultData[0].demandScData.demandsc_state
        this.demand_sc_id = res.resultData[0].demandScData.demand_sc_id
        this.loading = false
      }).catch(res => {
        console.log('请求失败')
      })
    },
    // 查询条件显示隐藏
    hideSearch() {
      if (this.search === 1) {
        this.search = 0
        this.image = 'upper'
      } else {
        this.search = 1
        this.image = 'downer'
      }
    },
    // 表格删除一行
    deleteRow(index, rows) {
      // console.log('rows', rows)
      rows.splice(index, 1)
    },
    // 查询条件数据请求
    dataCondition() {
      const params = { typeCodes: '002' }
      selects(params).then(res => {
        // console.log('id-4', res)
        // this.optionsArea = JSON.parse(res.request.response).resultData['002']
        this.optionsArea = res.resultData['002']
        // this.optionsArea.unshift({ code: '0000', name: '全部' })
      }).catch(res => {
        console.log('请求失败', res)
      })
    },
    sourceReq() {
      const params = { typeCodes: '003' }
      selects(params).then(res => {
        // console.log('003', res)
        this.sourcereq = res.resultData['003']
        // this.sourcereq.unshift({ code: '0000', name: '全部' })
      }).catch(res => {
        console.log('需求来源请求失败', res)
      })
    },
    // id7
    clientCheck() {
      const params = { typeCodes: '001' }
      selects(params).then(res => {
        // console.log('001', res)
        this.client = res.resultData['001']
        // this.client.unshift({ code: '0000', name: '全部' })
        // 登陆用户信息获取
        this.Name = this.name
      }).catch(res => {
        console.log('客户请求失败', res)
      })
    },
    industryLineF() {
      industryLine().then(res => {
        // console.log('产业线请求成功', res)
        this.industry = res.resultData
      }).catch(res => {
        console.log('产业线请求失败')
      })
    },
    // 确定按钮操作
    sureAdd() {
      const param = {}
      param['module_code'] = this.$refs.childMaterials.suppliers + '' // 物料号
      param['industry_id'] = this.industry_idS.industry_id // 产业线id
      param['category_en'] = '' // 物料类别en
      param['industry_name'] = this.industry_idS.industry_name // 产业线名
      param['category_cn'] = '' // 物料类别cn
      param['manager'] = this.$refs.childTasker.suppliers + '' // 任务人
      param['category_code'] = '' // 物料类别code
      param['manager_code'] = this.$refs.childTasker.suppliersId // 任务人id
      param['demand_source'] = this.info.demand_source
      param['region'] = this.info.region
      param['supplier_name'] = this.$refs.childDistributor.suppliers + '' // 供应商
      param['supplier_code'] = this.$refs.childDistributor.suppliersId + '' // 供应商编码需要修改！！！！
      param['scene_name'] = this.$refs.childBusiness.suppliers + '' // 业务场景
      param['customer'] = this.info.customer
      if (this.$refs.childMaterialTypess.category[0]) {
        param.category_cn = this.$refs.childMaterialTypess.category[0].categoryCn + ''
        param.category_code = this.$refs.childMaterialTypess.category[0].categoryCode + ''
        param.category_en = this.$refs.childMaterialTypess.category[0].categoryEn + ''
      }
      // const param = Object.assign(param, this.info)
      // this.userList.push(param)
      // console.log(param, '这是当前添加的数据')
      // console.log(this.userList, '这是当前列表数据')
      if (param.category_cn === '' && param.customer === '' && param.demand_source === '' && param.industry_id === '' && param.industry_name === '' && param.manager === '' && param.manager_code === '' && param.module_code === '' && param.region === '' && param.scene_name === '' && param.supplier_code === '' && param.supplier_name === '') {
        this.$message({
          type: 'error',
          message: '请勿添加空数据！'
        })
      } else {
        // console.log(JSON.stringify(param), '这是当前添加的数据')
        for (const i in this.userList) {
          // delete this.userList[i].pur_group // 删除采购组字段，此页面不需要判断此值
          if (JSON.stringify(this.userList[i]).indexOf(JSON.stringify(param)) !== -1) { // 不等于-1为重复
            this.$message({
              type: 'error',
              message: '请勿添加重复数据！'
            })
          }
        }
        this.userList.push(param)
        this.userList = this.deteleObject(this.userList)
      }
      // console.log(this.userList, '这是添加后的列表数据')
    },
    // 去重（过滤列表）
    deteleObject(obj) {
      var uniques = []
      var stringify = {}
      for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i])
        keys.sort(function(a, b) {
          return (Number(a) - Number(b))
        })
        var str = ''
        for (var j = 0; j < keys.length; j++) {
          str += JSON.stringify(keys[j])
          str += JSON.stringify(obj[i][keys[j]])
        }
        if (!stringify.hasOwnProperty(str)) {
          uniques.push(obj[i])
          stringify[str] = true
        }
      }
      // uniques = uniques
      return uniques
    },
    // 保存按钮接口
    settingSave() {
      this.loadingSave = true
      this.isdisabledFn = false
      // id23
      // console.log(this.userList, '保存时的列表')
      if (!this.$route.query.Identification) {
        this.demand_sc_id = ''
        console.log('this.demand_sc_id = ""')
      }
      const data = {
        'demandsc_state': '0003', // '0003'过滤需求状态 保存状态码this.demandsc_state
        'demand_sc_id': this.demand_sc_id, // 需求过滤条件标识this.demand_sc_id
        // 'user_code': this.Name, // '直接保存1234改为生效'
        'datalist': this.userList
      }
      console.log('this.demand_sc_id', this.demand_sc_id)
      // 判断演示，本地，正式环境
      if (judgeUrl() === '001' || judgeUrl() === '003') {
        data.user_code = this.Name // 需求发布人
      }
      // console.log(JSON.stringify(data), '保存时的data')
      // console.log(this.userList, 'this.userList')
      if (this.userList.length === 0) {
        this.$message({
          type: 'error',
          message: '请添加过滤规则！'
        })
        this.isdisabledFn = true // 禁用生效按钮
      } else {
        this.isdisabledFn = false
        saveDemandFilter(data).then(res => {
        // console.log('id23', res)
          console.log('保存返回值', res)
          this.demand_sc_id = res.resultData
          // 要用this.demand_sc_id = res.resultData，先改下清空的方法
          this.$route.query.Identification = '1'
          this.loadingSave = false
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
          console.log(this.demand_sc_id)
        }).catch(res => {
          this.loadingSave = false
          console.log('请求失败', res)
        })
      }
    },
    // 生效按钮接口
    settingOperant() {
      // id24
      this.centerDialogVisible = true
      const data = { 'demand_sc_id': this.demand_sc_id } // this.demand_sc_id
      // this.$axios({
      //   url: 'http://47.104.98.71:8780/costmanagement/demandScRule/updateDemandFilter',
      //   data: { 'demand_sc_id': this.demand_sc_id }, // this.demand_sc_id
      //   method: 'post',
      //   'headers': {
      //     'Content-Type': 'application/json'
      //   }
      // }).then(res => {
      //   console.log('id24', res)
      //   if (res.data.success === false) {
      //     this.$message({
      //       type: 'error',
      //       message: '生效失败!'
      //     })
      //   } else {
      //     this.$message({
      //       type: 'success',
      //       message: '生效成功!'
      //     })
      //   }
      // }).catch(res => {
      //   console.log('id24请求失败', res)
      // })
      updateDemandFilter(data).then(res => {
        // console.log('id24', res)
        if (res.success === false) {
          this.$message({
            type: 'error',
            message: '生效失败!'
          })
        } else {
          this.$message({
            type: 'success',
            message: '生效成功!'
          })
        }
      })
    },
    // 清空选择条件
    emptyIf() {
      this.info['customer'] = ''
      this.info['industry_id'] = []
      this.info['region'] = ''
      this.info['demand_source'] = ''
      this.industry_idS = { industry_id: '', industry_name: '' }
      this.$refs.childDistributor.suppliers = '' // 供应商
      this.$refs.childDistributor.checkListS = [] // 清空供应商弹窗选中的值
      this.$refs.childMaterials.suppliers = '' // 物料号
      this.$refs.childMaterials.checkListMN = [] // 清空物料号弹窗选中的值
      this.$refs.childMaterialTypess.suppliers = '' // 物料类别
      this.$refs.childMaterialTypess.checkListMT = [] // 清空物料类别弹窗选中的值
      this.$refs.childTasker.suppliers = '' // 任务人
      this.$refs.childTasker.checkListT = [] // 清空任务人弹窗选中的值
      this.$refs.childBusiness.suppliers = '' // 业务场景
      this.$refs.childBusiness.checkListBS = [] // 清空业务场景弹窗选中的值
    }
  }

}
</script>
<style scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.head_two{
  width:100%;
  height:72px;
  background:#FFFFFF;
  color:#004EA1;
  font-size:22px;
  text-align:center;
  line-height:72px;
}
.head_two_left{
  width:140px;
  height:20px;
  line-height:20px;
  font-size:14px;
  color:#4A4A4A;
  margin-left:45px;
  margin-top:23px;
  float:left;
}
.head_two-center{
  width:140px;
  height:30px;
  line-height:30px;
  float:left;
  margin-left:556px;
  margin-top:21px;
}
.bottom{
  background:#F4F4F4;
  width:100%;
  /* height:898px; */
  min-height: 898px;
  padding:18px;
  position:relative;
}
.bottom .el-table__body-wrapper{
  padding-bottom: 10px;
}
.condition{
  width:100%;
  height:184px;
  background:#FFFFFF;
  /* padding: 0 18px; */
  border:1px solid #D1D1D1;
}
.condition-left{
  float:left;
  width:82.1%;
  height:168px;
  padding-top:43px;
}
.condition-left-top{
  width:100%;
  height:42px;
}
.condition-left-top2{
  width:100%;
  height:85px;
}
.condition-center{
  float:left;
  width:0px;
  height:114px;
  border-right:1px solid #CECECE;
  margin-top:35px;
}
.condition-right{
  float:left;
  width:17.80%;
  height:168px;
}
.li1{
  float:left;
  width:3.41%;
  height:20px;
  line-height:20px;
  margin-left:3.97%;
  padding-top:11px;
  font-size:14px;
  text-align: right;
}
.li1-1{
  float:left;
  width: 10.29%;
  height: 42px;
  margin-left: 1.21%;
  /* box-shadow:2px 2px 6px 0px rgba(0,0,0,0.22); */
  border-radius: 5px;
  border: 1px solid #cecece;
}
.li2 {
  float: left;
  width:3.41%;
  height: 20px;
  line-height: 20px;
  margin-left:3.45%;
  padding-top: 11px;
  font-size: 14px;
  text-align: right;
}
.li2-1 {
  float: left;
  width: 10.29%;
  height: 42px;
  margin-left:1.29%;
  /* box-shadow:2px 2px 6px 0px rgba(0,0,0,0.22); */
  border-radius: 5px;
  border: 1px solid #cecece;
}
.li3 {
  float: left;
  width: 4.62%;
  height: 20px;
  line-height: 20px;
  margin-left: 4.57%;
  padding-top: 11px;
  font-size: 14px;
  text-align: right;
}
.li3-1 {
  float: left;
  width: 10.29%;
  height: 42px;
  margin-left:0.78%;
  /* box-shadow:2px 2px 6px 0px rgba(0,0,0,0.22); */
  border-radius: 5px;
  border: 1px solid #cecece;
}
.li4 {
  float: left;
  width: 4.62%;
  height: 20px;
  line-height: 20px;
  margin-left: 4.22%;
  margin-top: 11px;
  font-size: 14px;
  word-break: break-all;
  word-wrap: break-word;
  text-align: right;
  overflow: hidden;
}
.li4-1 {
  float: left;
  width: 10.29%;
  height: 40px;
  margin-left: 0.60%;
  border-radius: 5px;
  position: relative;
  /* box-shadow:2px 2px 6px 0px rgba(0,0,0,0.22); */
  border-radius: 5px;
  /* border: 1px solid #cecece; */
}
.li4-1 input {
  float: left;
  width: 100%;
  height: 40px;
  /* border-radius: 5px;
  border: 1px solid #cecece; */
}
.li4-1 span {
  float: right;
  height: 40px;
  position: absolute;
  right: 0;
}
.top2-li1 {
  float: left;
  width: 5.83%;
  height: 20px;
  line-height: 20px;
  margin-left: 2.33%;
  margin-top: 26px;
  font-size: 14px;
  word-break: break-all;
  word-wrap: break-word;
  text-align: right;
  overflow: hidden;
}
.top2-li1-1 {
  float: left;
  margin-top: 16px;
  width: 10.29%;
  height: 42px;
  margin-left: 0.43%;
  border-radius: 5px;
  border: 1px solid #cecece;
}
.top-li4 {
  float: left;
  width:5.83%;
  height: 20px;
  line-height: 20px;
  margin-left: 1.90%;
  margin-top: 26px;
  font-size: 14px;
  word-break: break-all;
  word-wrap: break-word;
  text-align: right;
  overflow: hidden;
}
.top-li4-1 {
  float: left;
  margin-top: 16px;
  width: 10.29%;
  height: 40px;
  margin-left: 0.59%;
  border-radius: 5px;
  position: relative;
}
.top-li4-1 input {
  float: left;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #cecece;
}
.top-li4-1 span {
  height: 38px;
  position: absolute;
  right: 0;
  top: 0.5px;
}
.top-li5 {
  float: left;
  width:5.83%;
  height: 20px;
  line-height: 20px;
  margin-left: 3.1%;
  margin-top: 26px;
  font-size: 14px;
  word-break: break-all;
  word-wrap: break-word;
  text-align: right;
  overflow: hidden;
}
.top-li5-1 {
  float: left;
  margin-top: 16px;
  width: 10.29%;
  height: 40px;
  margin-left: 0.69%;
  border-radius: 5px;
  position: relative;
  /* box-shadow:2px 2px 6px 0px rgba(0,0,0,0.22); */
  border-radius: 5px;
  /* border: 1px solid #cecece; */
}
.top-li5-1 input {
  float: left;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #cecece;
}
.top-li5-1 span {
  height: 38px;
  position: absolute;
  right: 0;
  top: 0.5px;
}
.top-li6 {
  float: left;
  width:4.62%;
  height: 20px;
  line-height: 20px;
  margin-left: 4.4%;
  margin-top: 26px;
  font-size: 14px;
  text-align: right;
  overflow: hidden;
}
.top-li6-1 {
  float: left;
  margin-top: 16px;
  width: 10.29%;
  height: 40px;
  margin-left: 0.60%;
  border-radius: 5px;
  position: relative;
  /* box-shadow:2px 2px 6px 0px rgba(0,0,0,0.22); */
  border-radius: 5px;
  /* border: 1px solid #cecece; */
}
.top-li6-1 input {
  float: left;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #cecece;
}
.top-li6-1 span {
  height: 38px;
  position: absolute;
  right: 0;
  top: 0.5px;
}
.condition-right1 {
  width: 35.97%;
  height: 46px;
  margin-top: 67px;
  margin-left: 8.5%;
  border:0;
  border-radius:4px;
  background: #007cff;
  color: #ffffff;
  font-size: 20px;
  float:left;
}
.condition-right2 {
  width: 35.97%;
  height: 46px;
  margin-top: 20px;
  margin-left: 4.8%;
  border:0;
  border-radius:4px;
  background: #ff9e00;
  color: #ffffff;
  font-size: 20px;
  float: right;
}
.condition-right4 {
  width: 35.97%;
  height: 46px;
  margin-top: 20px;
  margin-left: 4.8%;
  border:0;
  border-radius:4px;
  background: #0ACD08;
  color: #ffffff;
  font-size: 20px;
  float: right;
}
.condition-right3 {
  width: 35.97%;
  height: 46px;
  margin-top: 67px;
  margin-left: 4.8%;
  border: 0;
  border-radius:4px;
  background: #FFFFFF;
  color: #007CFF;
  font-size: 20px;
  border: 1px solid #007CFF;
}
.bottom1 {
  width: 100%;
  /* height: 688px; */
  min-height: 688px;
  background: #fff;
  position:relative;
  border:1px solid #D1D1D1;
  margin-top: 18px;
}
#page{
  text-align:center;
  width:96%;
  position:absolute;
  top:609px;
}
.bottom1-h{
  width:80.1%;
  height:28px;
  padding-top:32px;
  margin-left:18px;
  font-size:20px;
  color:#6C7180;
  font-weight:400;
  line-height:28px;
  float: left;
}
.bottom1-h-right{
  float:right;
  width:17.80%;
  height:100%;
  padding-right:18px;
}
.bottom1-h2{
  margin-top:50px;
  margin-left:53px;
  width:1441px;
  height:22px;
  font-size:16px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(74,74,74,1);
  line-height:22px;
}
.bottom1-h2 li{
  float:left;
  margin-right:40px;
}
.halving{
  margin-top:16px;
  width:92.9%;
  margin-left:31px;
  height:2px;
  background:rgba(140,151,161,1);
}
.bottom1-content{
  width:92.9%;
  height:459px;
}
.cpm{
  width:761px;
  height:591px;
  background:#ccc;
  position:absolute;
  z-index: 6;
  margin-left:19.8%;
  display:block;
  margin-top:42px;
}
.cpm-top{
  width:100%;
  height:60px;
  background:#2EA1F8;

}
.cpm-top1{
  width:96px;
  height:25px;
  color:#FFFFFF;
  font-size: 18px;
  padding-top:18px;
  margin-left:38px;
}
.cpm-top2{
  width:761px;
  height:104px;
  background:#FFFFFF;
}
.cpm-top2-left{
  width:98px;
  height:20px;
  color:#4A4A4A;
  font-size:14px;
  float:left;
  margin-left:133px;
  margin-top:50px;
}
.cpm-top2-right{
  width:350px;
  height:36px;
  float:left;
  margin-left:13px;
  margin-top:43px;
  position:relative;
}
.cpm-top2-right input{
  width:100%;
  height:100%;
  background:#FFFFFF;
}
.cpm-top2-right img{
  position:absolute;
  width:16px;
  height:16px;
  bottom: 9px;
  right: 9px;
}
.cpm-bottom{
  width:100%;
  height:427px;
  background:#FFFFFF;
}
.cpm-bottom-list{
  width:703px;
  height:332px;
  margin-left:29px;
  background:#F8FAFC;
  position:relative;
}
.cpm-bottom-list-block{
  position:absolute;
  top:279px;
  left:246px;
}
.cpm-bottom-list-btn{
  width:28.25%;
  height:36px;
  background:#05CD00;
  text-align: center;
  line-height: 36px;
  margin-left:274px;
  margin-top:16px;
  color: #FFF;
  font-size:14px;
  border:0;
  border-radius: 4px;
  padding:0;
}
.close{
  width:17px;
  height:17px;
  float:right;
  margin-right:18px;
  text-align: center;
  color: #FFF;
}
  .sePosition{
    width:3.15%;
    height:12px;
    line-height: 12px;
    display: block;
    background:#FFF;
    text-align: center;
    cursor: pointer;
    float:left;
    margin-left:48.59%;
    border: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
  }
  .sePosition img{
    height:16px;
  }
  .upper{
    transform: rotate(180deg);
    transition: all .2s linear;
  }
  .downer{
    transform: rotate(360deg);
    transition: all .2s linear;
  }
  .condition-vanish{
    display:none;
  }
  .condition-vanish{
    width:96%;
    height:16px;
    background:#F8F7F7;
    margin-left:2.1%;
  }
  .operation-pic{
    width:16px;
    height:16px;
    margin-left:5px;
  }
  .bottom1-top{
    width: 100%;
    height: 66px;
  }
  /* 对话框高度 */
  .block{
    height: 400px;
    text-align: center;
  }
  .bottom .el-date-editor.el-input{
    width: 66%;
    margin-top:10%;
    margin-bottom: 40%;
  }
</style>
