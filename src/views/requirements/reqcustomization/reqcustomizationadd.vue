/*
 * @Page: 需求管理-> 定制需求创建-> 需求信息+签章方式
 * @Author: wangjiandong
 * @Date: 2018-11-30 16:13:36
 * @Last Modified by: wangjiandong
 */
<template>
  <div v-loading="loading">
    <div class="reqCreate">
      <!-- 需求信息模块 -->
      <div class="reqInfo req">
        <span class="import">
          <span class="imports">*</span>
          {{ $t('demandCustomizationAdd.mandatory') }}
        </span>
        <p class="reqTit">
          <span/>
          {{ $t('demandCustomizationAdd.demandInformation') }}
        </p>
        <el-table :data="reqInfo" :header-cell-class-name="must" style="width: 100%">
          <el-table-column :label="$t('demandManagement.client')" prop="client" min-width="184"/>
          <el-table-column :label="$t('demandManagement.area')" min-width="173">
            <template slot-scope="scope">
              <el-input v-model="scope.row.select" style="display:none"/>
              <el-select v-model="select" :placeholder="$t('demandNoResolve.select')">
                <el-option v-for="item in optionsArea" :key="item.name" :label="item.name" :value="item.name"/>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column :label="$t('demandManagement.sourceOfDemand')" prop="sourceOfDemand" min-width="173"/>
          <el-table-column :label="$t('demandCustomizationAdd.demandCode')" prop="demandCode" min-width="173">
            <template slot-scope="scope">
              <!-- <p
                :title="scope.row.demandCode"
                style="overflow: hidden;text-overflow: ellipsis;"
              >{{ scope.row.demandCode }}</p> -->
              <input :title="scope.row.demandCode" v-model="scope.row.demandCode" type="text" style="overflow: hidden;text-overflow: ellipsis;height:40px;border-radius: 4px;border:0;border: 1px solid #cecece;width:100%;padding-left:15px;padding-right:15px;">
            </template>
          </el-table-column>
          <el-table-column :label="$t('demandCustomizationAdd.demandDescription')" min-width="173">
            <template slot-scope="scope">
              <el-input v-model="scope.row.reqDes" style="display:none"/>
              <el-input v-model="reqDes" class="focus" clearable @blur="reqDescrip"/>
            </template>
          </el-table-column>
          <!-- 放入产业线 -->
          <el-table-column :label="$t('demandManagement.productLine')" min-width="123">
            <template slot-scope="scope">
              <el-input v-model="scope.row.industryVal" style="display:none"/>
              <el-select
                v-model="industryVal"
                :placeholder="$t('demandNoResolve.select')"
              >
                <el-option
                  v-for="item in options"
                  :key="item.product_line_name"
                  :label="item.product_line_name"
                  :value="item.product_line_name"
                >
                  <!-- <el-checkbox>{{ item.industry_name }}</el-checkbox> -->
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- 需求类型 -->
          <el-table-column :label="$t('demandNoResolve.reqType')" prop="demand_type" min-width="173"/>
          <el-table-column :label="$t('demandCustomizationAdd.demandReleaser')" min-width="173">
            <template slot-scope="scope">
              <el-input v-model="scope.row.Name" style="display:none"/>
              <span>{{ Name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 物料号信息模块 -->
      <materialadd ref="child" :data="data2" @info="info" @deletes="deletes" @delet="info"/>
      <!-- 签章方式模块 -->
      <div class="signature req">
        <p class="reqTit">
          <span/>
          {{ $t('demandCustomizationAdd.signatureWay') }}
        </p>
        <el-table :data="signature" style="width: 100%">
          <el-table-column
            :label="$t('demandForFiltering.serialNumber')"
            type = "index"
            width="106"
          />
          <el-table-column :label="$t('demandCustomizationAdd.supplierCode')" prop="supplierCode"/>
          <el-table-column :label="$t('demandCustomizationAdd.supplierName')" prop="coporation"/>
          <el-table-column :label="$t('demandCustomizationAdd.signatureWay')" prop="signature">
            <template v-if="scope.row.serialNumber !== ''" slot-scope="scope">
              <el-select v-model="scope.row.signature" placeholder="请选择">
                <el-option v-for="item in optionsWay" :key="item.value" :label="item.label" :value="item.label"/>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 保存、发布操作 -->
      <div class="operate">
        <el-button v-if="puablicState" @click="save()">{{ $t('buttonGroup.save') }}</el-button>
        <el-button
          v-if="puablicState"
          type="primary"
          class="btnbg"
          @click="publish()"
        >{{ $t('buttonGroup.publish') }}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import materialadd from '@/views/requirements/reqcustomization/materialadd'
import { selects, searchDemandDeteil, insertDemandInfo, gePl } from '@/api/requirements'
import { mapGetters } from 'vuex'
import { judgeUrl } from '@/utils/api'
export default {
  components: {
    materialadd
  },
  data() {
    return {
      // 数据加载
      loading: true,
      // 当前时间
      clock: '',
      // supplier_analysis_id
      supplier_analysis_id: '',
      // demand_analysis_id获取
      demand_analysis_id: '',
      // this.task_person_id 储存
      task_person_id: '',
      // 产业线v-model
      industryVal: '',
      // 对name更改
      Name: '',
      data2: [],
      // 存id70请求回来的值
      seventT: [],
      // 控制发布状态
      puablicState: true,
      // 路由跳转接参数
      roudata: this.$route.query,
      // 接口数据id50
      moduleAnalysisParams: [],
      // 接口数据id104
      moduleAnalysisParams2: [],
      // 接口供应商名字
      supplier___name: '',
      // 接口供应商ID
      supplier___code: '',
      // 供应商数组集合
      suppliseListArr: [],
      // 本地数据读取
      localS: {},
      // 签章方式
      signatureWay: '',
      // 签章储存
      signatureStore: [],
      // 产业线存
      options: [],
      val: [],
      singel: 0, // 判断必填项是否为空
      reqDes: '', // 需求描述输入框
      select: '', // 区域选项
      // 内网正式数据
      signature: [], // 签章方式数组
      reqinfo2: [],
      reqInfo: [{ // 需求信息渲染
        client: 'Haier',
        sourceOfDemand: 'DBS',
        demand_type: '需求定制',
        demandCode: ''
      }],
      optionsArea: [],
      optionsWay: [
        {
          // 签章选项
          value: '12',
          label: '线上CA签章'
        },
        {
          value: '22',
          label: '线下签章'
        },
        {
          value: '32',
          label: '不需要签章'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['avatar', 'name']),
    ...mapGetters(['userCode', 'token'])
  },
  mounted() {
    const params = {
      typeCodes: '001,002,007'
    }
    selects(params)
      .then(res => {
        // console.log('selects', res)
        this.optionsArea = res.resultData['002']
        this.reqInfo[0].client = res.resultData['001'][0].name
        // this.optionsWay = res.resultData['007']
      })
      .catch(err => {
        console.log(err)
      })

    this.industryLineF()
    // 内网数据
    this.signature = [] // 签章方式数组
    // if (judgeUrl() === '002') {
    //   // 内网数据
    //   this.signature = [] // 签章方式数组
    // } else {
    //   console.log('内网测试签章数据')
    //   // 47测试假数据
    //   this.signature = [{ supplierCode: 'V12970', coporation: '青岛胜汇塑胶有限公司', signature: '线上CA签章' }] // 签章方式数组
    // }
  },
  created() {
    if (this.roudata.state === '0002') {
      this.getStore()
      // this.loading = false
      this.puablicState = false
      this.$nextTick(() => {
        this.$refs.child.publicStoe = false
      })
    } else if (this.roudata.state === '0001') {
      this.getStore()
      // this.loading = false
    } else {
      this.loading = false
    }
  },
  methods: {
    // 当前时间获取处理
    CurentTime() {
      this.clock = ''
      var now = new Date()
      var year = now.getFullYear() // 年
      var month = now.getMonth() + 1 // 月
      var day = now.getDate() // 日
      var hh = now.getHours() // 时
      var mm = now.getMinutes() // 分
      var ss = now.getSeconds() // 秒
      this.clock = year + '-'
      if (month < 10) { this.clock += '0' }
      this.clock += month + '-'
      if (day < 10) { this.clock += '0' }
      this.clock += day + ' '
      if (hh < 10) { this.clock += '0' }
      this.clock += hh + ':'
      if (mm < 10) { this.clock += '0' }
      this.clock += mm + ':'
      if (ss < 10) { this.clock += '0' }
      this.clock += ss
      console.log('this.clock', this.clock)
    },
    // 判断*号
    must(obj) {
      // console.log(obj.columnIndex)
      if (obj.columnIndex === 5 || obj.columnIndex === 3 || obj.columnIndex === 1) {
        return 'must'
      }
    },
    // 接口取值判断状态及数据获取
    getStore() {
      // console.log('this.roudata.demandAnalysisId666', this.roudata.demandAnalysisId)
      const data = { 'demand_analysis_id': this.roudata.demandAnalysisId } // this.roudata.id 615c93160ee446fabc4eb0af14b20334传过来的编码 id70
      searchDemandDeteil(data).then(res => {
        // console.log('成功取值', res)
        this.seventT = res.resultData
        // 对请求的数据进行处理
        for (var i = 0; i < this.seventT.modulelist.length; i++) {
          const aa = {}
          // var _this = this
          // 对供应商进行键名更改
          const supplierObj = []
          for (let k = 0; k < this.seventT.modulelist[i].supplielist.length; k++) {
            const OBJ = {}
            OBJ['signature'] = this.seventT.modulelist[i].supplielist[k].signature
            OBJ['supplierCode'] = this.seventT.modulelist[i].supplielist[k].supplierCode
            OBJ['supplier_analysis_id'] = this.seventT.modulelist[i].supplielist[k].supplier_analysis_id
            OBJ['coporation'] = this.seventT.modulelist[i].supplielist[k].supplierName
            supplierObj.push(OBJ)
          }
          aa.checkarrs = supplierObj
          // aa.checkarrs = this.seventT.modulelist[i].supplielist // 供应商列表
          aa.materialType = this.seventT.modulelist[i].category_cn // 物料类别 categoryId
          aa.category_id = this.seventT.modulelist[i].category_id // 物料类别id
          aa.categoryEn = this.seventT.modulelist[i].category_en // 物料类别en
          aa.categoryId = this.seventT.modulelist[i].category_id
          aa.categoryCode = this.seventT.modulelist[i].category_code

          aa.categoryCn = this.seventT.modulelist[i].category_cn

          aa.MATNR = this.seventT.modulelist[i].module_code // 物料号
          aa.describe = this.seventT.modulelist[i].module_describe // 物料描述（模块描述）
          aa.module_attribute = this.seventT.modulelist[i].module_attribute

          aa.bomTxt = this.seventT.modulelist[i].model_ident // 模块BOM标识
          aa.bomTxt1 = this.seventT.modulelist[i].sale_ident // 购销BOM标识
          // console.log('this.seventT.modulelist[i].factorylist[i].production_factory_name', this.seventT.modulelist[i].factorylist[i])
          // 循环工厂factorylist
          // for (let k = 0; k < this.seventT.modulelist[i].factorylist; k++) {
          //   if (this.seventT.modulelist[i].factorylist[k] === undefined) {
          //     aa.production_factory_name = ''
          //     aa.production_factory_id = ''
          //   } else {
          //     aa.production_factory_name = this.seventT.modulelist[i].factorylist[k].production_factory_name // 生产工厂名称
          //     aa.production_factory_id = this.seventT.modulelist[i].factorylist[k].production_factory_id // 生产工厂id
          //   }
          if (this.seventT.modulelist[i].factorylist[0] === undefined) {
            aa.production_factory_name = ''
            aa.production_factory_id = ''
          } else {
            aa.production_factory_name = this.seventT.modulelist[i].factorylist[0].production_factory_name // 生产工厂名称
            aa.production_factory_id = this.seventT.modulelist[i].factorylist[0].production_factory_id // 生产工厂id
          }
          this.demand_analysis_id = this.seventT.demand.demand_analysis_id // demand_analysis_id赋值
          aa.module_analysis_id = this.seventT.modulelist[i].module_analysis_id // module_analysis_id赋值
          if (this.seventT.modulelist[i].resource_quantity === null) {
            this.seventT.modulelist[i].resource_quantity = ''
            aa.resource = this.seventT.modulelist[i].resource_quantity // 资源量
          } else {
            aa.resource = this.seventT.modulelist[i].resource_quantity // 资源量
          }
          aa.price = this.seventT.modulelist[i].price // 价格
          aa.price_unit = this.seventT.modulelist[i].price_unit // 价格单位
          aa.purchasing_unit = this.seventT.modulelist[i].purchasing_unit // 采购单位
          aa.currency = this.seventT.modulelist[i].currency // 币种
          aa.product_ident = this.seventT.modulelist[i].product_ident // 新老品
          this.data2.push(aa)
          // 签章显示
          this.signature = this.signature.concat(supplierObj)
          // this.signature = this.signature.concat(this.seventT.modulelist[i].supplielist)
          // 此处需要去重
          const obj = {}
          this.signature = this.signature.reduce((cur, next) => {
            obj[next.coporation] ? '' : obj[next.coporation] = true && cur.push(next)
            return cur
          }, []) // 设置cur默认类型为数组，并且初始值为空的数组
          // this.signatureWay = this.seventT.modulelist[i].supplielist.signature
        }
        // })
        // console.log('this.signature', this.signature)
        // 需求信息赋值
        this.select = this.seventT.demand.region // 区域
        this.reqDes = this.seventT.demand.remarks // 需求描述
        if (this.seventT.managerlist.length === 0) {
          this.Name = ''
          this.task_person_id = ''
        } else {
          this.Name = this.seventT.managerlist[0].manager // 需求发布人
          this.task_person_id = this.seventT.managerlist[0].task_person_id // 任务人id
        }
        // this.Name = this.seventT.managerlist[0].manager // 需求发布人
        // this.task_person_id = this.seventT.managerlist[0].task_person_id // 任务人id
        this.industryVal = this.seventT.demand.product_line_name // 产业线名称
        this.reqInfo[0].client = this.seventT.demand.customer // 客户
        this.reqInfo[0].demandCode = this.seventT.demand.demand_code // 需求编码
        this.reqInfo[0].sourceOfDemand = this.seventT.demand.demand_source // 需求来源
      })
      this.loading = false
    },
    // 循环遍历物料信息添加本地数据
    xhmamateriel() {
      // id50接口数据
      console.log('this.data2', this.data2)
      for (let w = 0; w < this.data2.length; w++) {
        this.moduleAnalysisParams[w] = {
          model_ident: '',
          category_cn: '',
          module_describe: '',
          price: '',
          price_unit: '',
          purchasing_unit: '',
          currency: '',
          product_ident: '',
          module_attribute: '',
          sale_ident: '',
          module_code: '',
          category_en: '',
          category_local: '',
          industry_id: '',
          resource_quantity: '', // 资源量
          supplierAnalysisParams: [],
          productionFactoryParams: []

        }
      }
      // id104数据接口
      for (let w = 0; w < this.data2.length; w++) {
        this.moduleAnalysisParams2[w] = {
          model_ident: '',
          category_cn: '',
          // categoryCn: '',
          category_en: '',
          category_id: '',
          category_code: '',
          module_describe: '',
          module_attribute: '',
          price: '',
          price_unit: '',
          purchasing_unit: '',
          currency: '',
          product_ident: '',
          sale_ident: '',
          module_code: '',
          // category_en: '',
          category_local: '',
          industry_id: '',
          demand_analysis_id: '', // 需求id
          resource_quantity: '', // 资源量
          supplierAnalysisParams: [],
          productionFactoryParams: []

        }
      }
      for (var q = 0; q < this.data2.length; q++) {
        // 每条供应商数据数组处理
        this.suppliseListArr = []
        for (let p = 0; p < this.data2[q].checkarrs.length; p++) {
          var supplierList2 = {}
          // console.log('this.data2[qq].checkarrs[p]', this.data2[q].checkarrs[p])
          supplierList2.supplier_name = this.data2[q].checkarrs[p].coporation // 供应商名称
          supplierList2.supplier_code = this.data2[q].checkarrs[p].supplierCode // 供应商ID
          // supplierList2.supply_time = this.clock// 要求供货时间'2018-12-10 18:51:12'
          supplierList2.month_capacity = '' // 高峰月产能111
          supplierList2.result_date = this.clock// result_date'2018-12-10 18:51:12'
          if (this.data2[q].checkarrs[p].signature === undefined) {
            if (judgeUrl() === '002') {
              // 内网正式数据
              this.data2[q].checkarrs[p].signature = '不需要签章'
            } else {
              // 47测试数据测完更改上条
              this.data2[q].checkarrs[p].signature = '线上CA签章'
            }
          }
          supplierList2.signature = this.data2[q].checkarrs[p].signature // 签章方式有问题
          supplierList2.result = '' // 供应商分解结果
          supplierList2.demandsc_code = this.reqInfo[0].demandCode // 需求编码
          if (this.data2[q].checkarrs[p].supplier_analysis_id === undefined) {
            this.data2[q].checkarrs[p].supplier_analysis_id = ''
          }
          supplierList2.supplier_analysis_id = this.data2[q].checkarrs[p].supplier_analysis_id // 供应商id id104 存放位置
          if (this.data2[q].module_analysis_id === undefined) {
            this.data2[q].module_analysis_id = ''
          }
          supplierList2.module_analysis_id = this.data2[q].module_analysis_id// 模块所属id id104
          this.suppliseListArr.push(supplierList2)
        }
        // id50
        this.moduleAnalysisParams[q].model_ident = this.data2[q].bomTxt
        this.moduleAnalysisParams[q].resource_quantity = this.data2[q].resource
        this.moduleAnalysisParams[q].category_cn = this.data2[q].categoryCn // this.data[2].materialType
        this.moduleAnalysisParams[q].category_en = this.data2[q].categoryEn
        this.moduleAnalysisParams[q].category_id = this.data2[q].categoryId
        this.moduleAnalysisParams[q].category_code = this.data2[q].categoryCode

        this.moduleAnalysisParams[q].module_describe = this.data2[q].describe
        this.moduleAnalysisParams[q].module_attribute = this.data2[q].module_attribute
        this.moduleAnalysisParams[q].price = this.data2[q].price
        this.moduleAnalysisParams[q].price_unit = this.data2[q].price_unit
        this.moduleAnalysisParams[q].purchasing_unit = this.data2[q].purchasing_unit
        this.moduleAnalysisParams[q].currency = this.data2[q].currency
        this.moduleAnalysisParams[q].product_ident = this.data2[q].product_ident
        this.moduleAnalysisParams[q].sale_ident = this.data2[q].bomTxt1
        this.moduleAnalysisParams[q].module_code = this.data2[q].MATNR // 模块专用号
        // this.moduleAnalysisParams[q].category_en = '' // 所属品类_英文(最小分类)
        this.moduleAnalysisParams[q].category_local = '' // 所属品类_本地语言(最小分类)
        this.moduleAnalysisParams[q].industry_id = '' // 产业线id
        this.moduleAnalysisParams[q].supplierAnalysisParams = this.suppliseListArr // 供应商
        // 工厂名称判断
        if (this.data2[q].production_factory_name === undefined) {
          this.data2[q].production_factory_name = ''
        }
        this.moduleAnalysisParams[q].productionFactoryParams = [{ 'production_factory_name': this.data2[q].production_factory_name }] // 工厂生产名称
        // id104
        this.moduleAnalysisParams2[q].demand_analysis_id = this.demand_analysis_id // 需求id
        // 判断所属模块id
        if (this.data2[q].module_analysis_id === undefined) {
          this.data2[q].module_analysis_id = ''
        }
        this.moduleAnalysisParams2[q].module_analysis_id = this.data2[q].module_analysis_id // 模块id待处理
        this.moduleAnalysisParams2[q].model_ident = this.data2[q].bomTxt
        this.moduleAnalysisParams2[q].resource_quantity = this.data2[q].resource
        this.moduleAnalysisParams2[q].category_cn = this.data2[q].categoryCn // this.data2[q]. materialType
        this.moduleAnalysisParams2[q].category_en = this.data2[q].categoryEn
        this.moduleAnalysisParams2[q].category_id = this.data2[q].categoryId
        this.moduleAnalysisParams2[q].category_code = this.data2[q].categoryCode

        this.moduleAnalysisParams2[q].module_describe = this.data2[q].describe
        this.moduleAnalysisParams2[q].module_attribute = this.data2[q].module_attribute

        this.moduleAnalysisParams2[q].price = this.data2[q].price
        this.moduleAnalysisParams2[q].price_unit = this.data2[q].price_unit
        this.moduleAnalysisParams2[q].purchasing_unit = this.data2[q].purchasing_unit
        this.moduleAnalysisParams2[q].currency = this.data2[q].currency
        this.moduleAnalysisParams2[q].product_ident = this.data2[q].product_ident
        this.moduleAnalysisParams2[q].sale_ident = this.data2[q].bomTxt1
        this.moduleAnalysisParams2[q].module_code = this.data2[q].MATNR // 模块专用号
        // this.moduleAnalysisParams2[q].category_en = '' // 所属品类_英文(最小分类)
        this.moduleAnalysisParams2[q].category_local = '' // 所属品类_本地语言(最小分类)
        this.moduleAnalysisParams2[q].industry_id = '' // 产业线id
        this.moduleAnalysisParams2[q].supplierAnalysisParams = this.suppliseListArr // 供应商
        // 判断工厂相关
        if (this.data2[q].production_factory_id === undefined) {
          this.data2[q].production_factory_id = ''
        }
        if (this.data2[q].module_analysis_id === undefined) {
          this.data2[q].module_analysis_id = ''
        }
        if (this.data2[q].production_factory_name === undefined) {
          this.data2[q].production_factory_name = ''
        }
        this.moduleAnalysisParams2[q].productionFactoryParams = [{ 'production_factory_name': this.data2[q].production_factory_name, 'production_factory_id': this.data2[q].production_factory_id, 'module_analysis_id': this.data2[q].module_analysis_id }] // 工厂生产名称
      }
      // console.log('moduleAnalysisParams66666', this.moduleAnalysisParams)
    },
    // 添加物料号
    add() {
      this.val.push('', '', '', '')
    },
    // 删除物料号
    deletes(val) {
      this.val.splice(val, 4)
    },
    // 保存、发布验证
    save() {
      // console.log('this.data2', this.data2)
      // 对需求信息必填项进行判断
      if (this.select === '') { // 判断区域
        this.$message({
          type: 'error',
          message: '请选择区域'
        })
        return
      }
      if (this.reqInfo[0].demandCode === '') { // 判断需求编码
        this.$message({
          type: 'error',
          message: '请填写需求编码'
        })
        return
      }
      if (this.industryVal === '') { // 判断产业线
        this.$message({
          type: 'error',
          message: '请选择产业线'
        })
        return
      }
      // 判断供应商是否添加不能为空
      for (var index = 0; index < this.data2.length; index++) {
        // console.log('this.data2[index].checkarrs.length', this.data2[index].checkarrs.length)
        if (this.data2[index].checkarrs.length === 0) {
          this.$message({
            type: 'error',
            message: '请添加供应商'
          })
          return
        }
      }
      // 判断物料类别，物料号，模块BOM标识，购销BOM标识不能为空
      for (let index = 0; index < this.data2.length; index++) {
        // console.log('this.data2[index].materialType', this.data2[index].materialType)
        // console.log('this.data2[index].MATNR', this.data2[index].MATNR)
        // console.log('this.data2[index].bomTxt', this.data2[index].bomTxt)
        // console.log('this.data2[index].bomTxt1', this.data2[index].bomTxt1)
        if (this.data2[index].materialType === undefined) {
          this.$message({
            type: 'error',
            message: '请添加物料类别'
          })
          return
        }
        if (this.data2[index].MATNR === undefined) {
          this.$message({
            type: 'error',
            message: '请添加物料号'
          })
          return
        }
        // 判断物料号是否重复
        for (let jjj = index + 1; jjj < this.data2.length; jjj++) {
          if (this.data2[index].MATNR === this.data2[jjj].MATNR) {
            this.$message({
              type: 'error',
              message: '物料号重复'
            })
            return
          }
        }
        if (this.data2[index].bomTxt === undefined) {
          this.$message({
            type: 'error',
            message: '请添加模块BOM标识'
          })
          return
        }
        if (this.data2[index].bomTxt1 === undefined) {
          this.$message({
            type: 'error',
            message: '请添加购销BOM标识'
          })
          return
        }
        // 判断如果购销BOM为Y工厂名称必填
        if (this.data2[index].bomTxt1 === 'Y') {
          if (this.data2[index].production_factory_name === undefined) {
            this.$message({
              type: 'error',
              message: '请填写工厂名称'
            })
            return
          }
        }
        if (this.data2[index].resource !== '' && !(/^[0-9]+.?[0-9]*$/.test(this.data2[index].resource))) {
          this.$message({
            type: 'error',
            message: '资源量必须为整数'
          })
          return
        }
        if (this.data2[index].price !== '' && !(/^[0-9]+.?[0-9]*$/.test(this.data2[index].price))) {
          this.$message({
            type: 'error',
            message: '价格必须为数字'
          })
          return
        }
      }
      // console.log('this.val', this.val)
      // 当前时间获取
      this.CurentTime()
      this.xhmamateriel()
      // }
      // 请求接口
      // 判断需求this.roudata.demandAnalysisId undefined调用id50
      if (this.demand_analysis_id === '') {
        const params = { 'demand': {
          'demand_code': this.reqInfo[0].demandCode, // 需求号（编码）
          'customer': this.reqInfo[0].client, // 客户
          'region': this.select, // 区域
          'demand_source': this.reqInfo[0].sourceOfDemand, // 需求来源
          'product_line_name': this.industryVal, // 产业线名称
          'demand_type': '定制报价分解', // 需求类型this.reqInfo[0].demand_type
          'state': '0001',
          'scene_name': '', // 业务场景
          'remarks': this.reqDes, // 需求描述
          'locking_time': this.clock // 需求锁定时间
        },
        'moduleAnalysisParams': this.moduleAnalysisParams,
        'taskPersonParams': [{
          // 'manager': this.Name, // 需求发布人
          // 'manager_code': this.token // userCode
          // 'task_person_id': this.userCode, // 任务人id 必填 登陆人userCode
          // 'demand_analysis_id': this.roudata.demandAnalysisId // 需求id
        }] }
        // 判断演示，本地，正式环境
        if (judgeUrl() === '001' || judgeUrl() === '003') {
          params.taskPersonParams[0].manager = this.Name // 需求发布人
          params.taskPersonParams[0].manager_code = this.userCode // userCode
        }
        // console.log('保存JSON', params)
        insertDemandInfo(params).then(res => {
          // console.log('id50请求成功', res)
          this.demand_analysis_id = res.resultData.demand_analysis_id// 保存后更改this.demand_analysis_id
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
        })
      } else {
        // 调用id104保存
        const params2 = { 'demand': {
          'demand_analysis_id': this.demand_analysis_id, // 需求id
          'demand_code': this.reqInfo[0].demandCode, // 需求号（编码）
          'customer': this.reqInfo[0].client, // 客户
          'region': this.select, // 区域
          'demand_source': this.reqInfo[0].sourceOfDemand, // 需求来源
          'product_line_name': this.industryVal, // 产业线名称
          'demand_type': '定制报价分解', // 需求类型this.reqInfo[0].demand_type
          'state': '0001',
          'scene_name': '', // 业务场景
          'remarks': this.reqDes, // 需求描述
          'locking_time': this.clock // 需求锁定时间
        },
        'moduleAnalysisParams': this.moduleAnalysisParams2,
        'taskPersonParams': [{
          // 'manager': this.Name, // 需求发布人
          // 'manager_code': this.token, // userCode
          // 'task_person_id': this.task_person_id, // 任务人id 必填 登陆人userCode
          'demand_analysis_id': this.demand_analysis_id // 需求id
        }] }
        // 判断演示，本地，正式环境
        if (judgeUrl() === '001' || judgeUrl() === '003') {
          params2.taskPersonParams[0].manager = this.Name // 需求发布人
          params2.taskPersonParams[0].manager_code = this.userCode // userCode
          params2.taskPersonParams[0].task_person_id = this.task_person_id // 任务人id 必填 登陆人userCode
        }
        // console.log('保存修改params2', params2)
        insertDemandInfo(params2).then(res => {
        //  console.log('id104请求成功', res)
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
        })
      }
    },
    // 添加供应商后表格数据
    info(value) {
      // console.log('是否触发info')
      this.signatureStore = []
      for (let k = 0; k < this.data2.length; k++) {
        this.signatureStore = this.signatureStore.concat(this.data2[k].checkarrs)
      }
      this.signature = this.signatureStore
      // 此处需要去重
      const obj = {}
      this.signature = this.signature.reduce((cur, next) => {
        obj[next.coporation] ? '' : obj[next.coporation] = true && cur.push(next)
        return cur
      }, []) // 设置cur默认类型为数组，并且初始值为空的数组
    },
    // 线下粘贴内容去空格加逗号
    reqDescrip() {
      this.reqDes = this.$comma(this.reqDes)
    },
    // 产业线业务查询
    industryLineF() {
      // var url = 'http://47.104.98.71:8780/costmanagement/industry/getIndustry'
      // console.log('请求前')
      // this.$axios
      //   .get(url)
      //   .then(res => {
      //     console.log('产业线请求成功', res)
      //     // this.provision = res.data.resultData
      //     this.options = res.data.resultData
      //   })
      //   .catch(res => {
      //     console.log('产业线请求失败', res)
      //   })
      gePl().then(res => {
        // console.log('产业线请求成功', res)
        this.options = res.resultData
      }).catch(res => {
        console.log('产业线请求失败', res)
      })
      this.Name = this.name
    },
    // 发布按钮方法
    publish() {
      // 对需求信息必填项进行判断
      if (this.select === '') { // 判断区域
        this.$message({
          type: 'error',
          message: '请选择区域'
        })
        return
      }
      if (this.reqInfo[0].demandCode === '') { // 判断需求编码
        this.$message({
          type: 'error',
          message: '请填写需求编码'
        })
        return
      }
      if (this.industryVal === '') { // 判断产业线
        this.$message({
          type: 'error',
          message: '请选择产业线'
        })
        return
      }
      // 判断供应商是否添加不能为空
      for (var index = 0; index < this.data2.length; index++) {
        // console.log('this.data2[index].checkarrs.length', this.data2[index].checkarrs.length)
        if (this.data2[index].checkarrs.length === 0) {
          this.$message({
            type: 'error',
            message: '请添加供应商'
          })
          return
        }
      }
      // 判断物料类别，物料号，模块BOM标识，购销BOM标识不能为空
      for (let index = 0; index < this.data2.length; index++) {
        // console.log('this.data2[index].materialType', this.data2[index].materialType)
        // console.log('this.data2[index].MATNR', this.data2[index].MATNR)
        // console.log('this.data2[index].bomTxt', this.data2[index].bomTxt)
        // console.log('this.data2[index].bomTxt1', this.data2[index].bomTxt1)
        if (this.data2[index].materialType === undefined) {
          this.$message({
            type: 'error',
            message: '请添加物料类别'
          })
          return
        }
        if (this.data2[index].MATNR === undefined) {
          this.$message({
            type: 'error',
            message: '请添加物料号'
          })
          return
        }
        // 判断物料号是否重复
        for (let jjj = index + 1; jjj < this.data2.length; jjj++) {
          if (this.data2[index].MATNR === this.data2[jjj].MATNR) {
            this.$message({
              type: 'error',
              message: '物料号重复'
            })
            return
          }
        }
        if (this.data2[index].bomTxt === undefined) {
          this.$message({
            type: 'error',
            message: '请添加模块BOM标识'
          })
          return
        }
        if (this.data2[index].bomTxt1 === undefined) {
          this.$message({
            type: 'error',
            message: '请添加购销BOM标识'
          })
          return
        }
        // 判断如果购销BOM为Y工厂名称必填
        if (this.data2[index].bomTxt1 === 'Y') {
          if (this.data2[index].production_factory_name === undefined) {
            this.$message({
              type: 'error',
              message: '请填写工厂名称'
            })
            return
          }
        }
        if (this.data2[index].resource !== '' && !(/^[0-9]+.?[0-9]*$/.test(this.data2[index].resource))) {
          this.$message({
            type: 'error',
            message: '资源量必须为整数'
          })
          return
        }
        if (this.data2[index].price !== '' && !(/^[0-9]+.?[0-9]*$/.test(this.data2[index].price))) {
          this.$message({
            type: 'error',
            message: '价格必须为数字'
          })
          return
        }
      }
      // 当前时间获取
      this.CurentTime()
      // 处理数据
      this.xhmamateriel()
      // data2进行遍历改键
      // id50
      // for (let w = 0; w < this.data2.length; w++) {
      //   this.moduleAnalysisParams[w] = {
      //     model_ident: '',
      //     category_cn: '',
      //     module_describe: '',
      //     price: '',
      //     price_unit: '',
      //     purchasing_unit: '',
      //     currency: '',
      //     product_ident: '',
      //     sale_ident: '',
      //     module_code: '',
      //     category_en: '',
      //     category_local: '',
      //     industry_id: '',
      //     supplierAnalysisParams: [],
      //     productionFactoryParams: []
      //   }
      // }
      // // id104
      // for (let w = 0; w < this.data2.length; w++) {
      //   this.moduleAnalysisParams2[w] = {
      //     demand_analysis_id: '', // 需求id
      //     module_analysis_id: '', // 模块id
      //     model_ident: '',
      //     category_cn: '',
      //     module_describe: '',
      //     price: '',
      //     price_unit: '',
      //     purchasing_unit: '',
      //     currency: '',
      //     product_ident: '',
      //     sale_ident: '',
      //     module_code: '',
      //     category_en: '',
      //     category_local: '',
      //     industry_id: '',
      //     supplierAnalysisParams: [],
      //     productionFactoryParams: []
      //   }
      // }
      // for (var qq = 0; qq < this.data2.length; qq++) {
      //   // 每条供应商数据数组处理
      //   this.suppliseListArr = []
      //   for (let p = 0; p < this.data2[qq].checkarrs.length; p++) {
      //     var supplierList = {}
      //     console.log('this.data2[qq].checkarrs[p]', this.data2[qq].checkarrs[p])
      //     supplierList.supplier_name = this.data2[qq].checkarrs[p].supplierName // 供应商名称
      //     supplierList.supplier_code = this.data2[qq].checkarrs[p].supplierCode // 供应商ID
      //     supplierList.supply_time = this.clock // 要求供货时间'2018-12-10 18:51:12'
      //     supplierList.month_capacity = '' // 高峰月产能111
      //     supplierList.result_date = this.clock // result_date'2018-12-10 18:51:12'
      //     if (this.data2[qq].checkarrs[p].signature === undefined) {
      //       this.data2[qq].checkarrs[p].signature = '不需要签章'
      //     }
      //     supplierList.signature = this.data2[qq].checkarrs[p].signature // 签章方式有问题
      //     supplierList.result = '' // 供应商分解结果
      //     supplierList.demandsc_code = this.reqInfo[0].demandCode // 需求编码
      //     if (this.data2[qq].checkarrs[p].supplier_analysis_id === undefined) {
      //       this.data2[qq].checkarrs[p].supplier_analysis_id = ''
      //     }
      //     supplierList.supplier_analysis_id = this.data2[qq].checkarrs[p].supplier_analysis_id // 供应商id id104 存放位置 // 供应商id id104
      //     console.log('this.data2[qq].module_analysis_id', this.data2[qq].module_analysis_id)
      //     if (this.data2[qq].module_analysis_id === undefined) {
      //       this.data2[qq].module_analysis_id = ''
      //     }
      //     supplierList.module_analysis_id = this.data2[qq].module_analysis_id// 模块所属id id104
      //     this.suppliseListArr.push(supplierList)
      //   }
      //   // id50
      //   this.moduleAnalysisParams[qq].model_ident = this.data2[qq].bomTxt
      //   this.moduleAnalysisParams[qq].resource_quantity = this.data2[qq].resource
      //   this.moduleAnalysisParams[qq].category_cn = this.data2[qq].materialType
      //   this.moduleAnalysisParams[qq].module_describe = this.data2[qq].describe
      //   this.moduleAnalysisParams[qq].price = this.data2[qq].price
      //   this.moduleAnalysisParams[qq].price_unit = this.data2[qq].price_unit
      //   this.moduleAnalysisParams[qq].purchasing_unit = this.data2[qq].purchasing_unit
      //   this.moduleAnalysisParams[qq].currency = this.data2[qq].currency
      //   this.moduleAnalysisParams[qq].product_ident = this.data2[qq].product_ident
      //   this.moduleAnalysisParams[qq].sale_ident = this.data2[qq].bomTxt1
      //   this.moduleAnalysisParams[qq].module_code = this.data2[qq].MATNR // 模块专用号
      //   this.moduleAnalysisParams[qq].category_en = '' // 所属品类_英文(最小分类)
      //   this.moduleAnalysisParams[qq].category_local = '' // 所属品类_本地语言(最小分类)
      //   this.moduleAnalysisParams[qq].industry_id = '' // 产业线id this.industryVal
      //   this.moduleAnalysisParams[qq].supplierAnalysisParams = this.suppliseListArr
      //   // 生产工厂名称
      //   if (this.data2[qq].production_factory_name === undefined) {
      //     this.data2[qq].production_factory_name = ''
      //   }
      //   this.moduleAnalysisParams[qq].productionFactoryParams = [{ production_factory_name: this.data2[qq].production_factory_name }] // 工厂生产名称
      //   // id104
      //   this.moduleAnalysisParams2[qq].demand_analysis_id = this.demand_analysis_id // 需求id
      //   // 所属模块id判断
      //   if (this.data2[qq].module_analysis_id === undefined) {
      //     this.data2[qq].module_analysis_id = ''
      //   }
      //   this.moduleAnalysisParams2[qq].module_analysis_id = this.data2[qq].module_analysis_id // 模块id待处理
      //   this.moduleAnalysisParams2[qq].model_ident = this.data2[qq].bomTxt
      //   this.moduleAnalysisParams2[qq].resource_quantity = this.data2[qq].resource
      //   this.moduleAnalysisParams2[qq].category_cn = this.data2[qq].materialType
      //   this.moduleAnalysisParams2[qq].module_describe = this.data2[qq].describe
      //   this.moduleAnalysisParams2[qq].price = this.data2[qq].price
      //   this.moduleAnalysisParams2[qq].price_unit = this.data2[qq].price_unit
      //   this.moduleAnalysisParams2[qq].purchasing_unit = this.data2[qq].purchasing_unit
      //   this.moduleAnalysisParams2[qq].currency = this.data2[qq].currency
      //   this.moduleAnalysisParams2[qq].product_ident = this.data2[qq].product_ident
      //   this.moduleAnalysisParams2[qq].sale_ident = this.data2[qq].bomTxt1
      //   this.moduleAnalysisParams2[qq].module_code = this.data2[qq].MATNR // 模块专用号
      //   this.moduleAnalysisParams2[qq].category_en = '' // 所属品类_英文(最小分类)
      //   this.moduleAnalysisParams2[qq].category_local = '' // 所属品类_本地语言(最小分类)
      //   this.moduleAnalysisParams2[qq].industry_id = '' // 产业线id this.industryVal
      //   this.moduleAnalysisParams2[qq].supplierAnalysisParams = this.suppliseListArr
      //   // 判断工厂相关
      //   if (this.data2[qq].production_factory_id === undefined) {
      //     this.data2[qq].production_factory_id = ''
      //   }
      //   if (this.data2[qq].module_analysis_id === undefined) {
      //     this.data2[qq].module_analysis_id = ''
      //   }
      //   if (this.data2[qq].production_factory_name === undefined) {
      //     this.data2[qq].production_factory_name = ''
      //   }
      //   this.moduleAnalysisParams2[qq].productionFactoryParams = [{ 'production_factory_name': this.data2[qq].production_factory_name, 'production_factory_id': this.data2[qq].production_factory_id, 'module_analysis_id': this.data2[qq].module_analysis_id }] // 工厂生产名称
      // }
      // console.log('moduleAnalysisParams999999999999', this.moduleAnalysisParams)
      // 判断需求调用id50
      if (this.demand_analysis_id === '') {
        // 请求id50发布接口
        const params = { 'demand': {
          'demand_code': this.reqInfo[0].demandCode, // 需求号
          'customer': this.reqInfo[0].client, // 客户
          'region': this.select, // 区域
          'product_line_name': this.industryVal, // 产业线名称
          'demand_source': this.reqInfo[0].sourceOfDemand, // 需求来源
          'demand_type': '定制报价分解', // 需求类型 this.reqInfo[0].demand_type
          'state': '0002',
          'scene_name': '', // 业务场景
          'remarks': this.reqDes, // 需求描述
          'locking_time': this.clock // 需求锁定时间
        },
        'moduleAnalysisParams': this.moduleAnalysisParams,
        'taskPersonParams': [{
          // 'manager': this.Name, // 需求发布人
          // 'manager_code': this.token // userCode
        }] }
        // 判断演示，本地，正式环境
        if (judgeUrl() === '001' || judgeUrl() === '003') {
          params.taskPersonParams[0].manager = this.Name // 需求发布人
          params.taskPersonParams[0].manager_code = this.userCode // userCode
        }
        insertDemandInfo(params).then(res => {
          // console.log('id50请求成功', res)
          // 路由跳转
          this.$router.push({ path: 'reqcustomization' })
        })
      } else {
        // 请求id104请求
        const params2 = { 'demand': {
          'demand_analysis_id': this.demand_analysis_id, // 需求id
          'demand_code': this.reqInfo[0].demandCode, // 需求号
          'customer': this.reqInfo[0].client, // 客户
          'region': this.select, // 区域
          'product_line_name': this.industryVal, // 产业线名称
          'demand_source': this.reqInfo[0].sourceOfDemand, // 需求来源
          'demand_type': '定制报价分解', // 需求类型 this.reqInfo[0].demand_type
          'state': '0002',
          'scene_name': '', // 业务场景
          'remarks': this.reqDes, // 需求描述
          'locking_time': this.clock // 需求锁定时间
        },
        'moduleAnalysisParams': this.moduleAnalysisParams2,
        'taskPersonParams': [{
          // 'manager': this.Name, // 需求发布人
          // 'manager_code': this.token, // userCode
          // 'task_person_id': this.task_person_id, // 任务id
          'demand_analysis_id': this.demand_analysis_id // 需求id
        }] }
        // 判断演示，本地，正式环境
        if (judgeUrl() === '001' || judgeUrl() === '003') {
          params2.taskPersonParams[0].manager = this.Name // 需求发布人
          params2.taskPersonParams[0].manager_code = this.userCode // userCode
          params2.taskPersonParams[0].task_person_id = this.task_person_id // 任务人id 必填 登陆人userCode
        }
        insertDemandInfo(params2).then(res => {
          // console.log('id50请求成功', res)
          // 路由跳转
          this.$router.push({ path: 'reqcustomization' })
        })
      }
    }
  }
}
</script>

<style scoped>
span {
  display: inline-block;
}
.reqCreate {
  background-color: #f4f4f4;
  /* padding: 30px 1.9%; */
  padding: 18px;
}
/* 必填项 */
.import {
  position: absolute;
  font-size: 14px;
  color: #4a4a4a;
  right: 1.09%;
  top: -17px;
}
.import span {
  margin-right: 8px;
}
.imports {
  font-size: 21px;
  color: #ff0000;
  vertical-align: top;
}
/* 需求信息模块 签章方式模块 */
.req {
  background-color: #fff;
  border: 1px solid #d1d1d1;
  padding: 18px 15px 31px;
  position: relative;
}
/* .reqInfo {
  margin-bottom: 30px;
} */
.signature {
  margin-top: 18px;
  padding-bottom: 18px;
}
/* 模块标题 */
.reqTit {
  line-height: 30px;
  font-size: 24px;
}
.reqTit span {
  width: 4px;
  height: 30px;
  background: linear-gradient(
    180deg,
    rgba(78, 194, 252, 1) 0%,
    rgba(38, 143, 249, 1) 100%
  );
  border-radius: 0px 28px 28px 0px;
  position: absolute;
  left: 0;
}
.signature .reqTit span {
  background: linear-gradient(
    360deg,
    rgba(42, 179, 20, 1) 0%,
    rgba(94, 219, 73, 1) 100%
  );
}
/* 保存发布操作 */
.operate {
  font-size: 0;
  margin-top: 30px;
  text-align: center;
}
</style>
<style>
/* 表格样式 */
/* .reqInfo .el-table__header tr th:nth-child(2) .cell::before{
  content: '*';
  font-size: 21px;
  color: #ff0000;
  margin: 10px 4px 0 0;
  vertical-align: middle
} */
/* .reqInfo .el-table__header colgroup col:first-child,
.reqInfo .el-table__header colgroup col:nth-child(2),
.reqInfo .el-table__body colgroup col:first-child,
.reqInfo .el-table__body colgroup col:nth-child(2) {
  width: 15.8%;
}
.reqInfo .el-table__header colgroup col:nth-child(3),
.reqInfo .el-table__body colgroup col:nth-child(3) {
  width: 11.63%;
}
.reqInfo .el-table__header colgroup col:nth-child(4),
.reqInfo .el-table__body colgroup col:nth-child(4) {
  width: 8.4%;
}
.reqInfo .el-table__header colgroup col:nth-child(5),
.reqInfo .el-table__body colgroup col:nth-child(5) {
  width: 37.4%;
}
.reqInfo .el-table__header colgroup col:nth-child(6),
.reqInfo .el-table__body colgroup col:nth-child(6) {
  width: 10.96%;
} */
.reqInfo .el-table__row:hover {
  background-color: #fff;
}
.req .el-table td,
.req .el-table th.is-leaf,
.signature .el-table__body tbody tr:nth-last-child(1) td {
  border-bottom: 0;
}
.req .el-table {
  font-size: 14px;
}
.req .el-table::before {
  display: none;
}
.req .el-table__footer-wrapper,
.req .el-table__header-wrapper {
  line-height: 32px;
  font-size: 16px;
  border-bottom: 2px solid #7897a1;
  margin-top: 13px;
}
.req .el-table .cell {
  color: #4a4a4a;
}
.req .el-table .cell,
.req .el-table th div {
  padding: 0;
  white-space: nowrap;
  text-align: center;
}
.reqInfo .el-table td,
.req .el-table th {
  padding: 1px 9px 4px;
}
.signature .el-table td {
  padding: 7px 9px;
}
.reqInfo .el-table td {
  padding-top: 21px;
}
.signature .el-table td {
  border-bottom: 1px solid rgba(120, 151, 161, 0.332);
}
.reqInfo .el-table td:first-child,
.reqInfo .el-table th:first-child {
  padding-left: 0;
}
.reqInfo .el-table td:last-child,
.reqInfo .el-table th:nth-child(6) {
  padding-right: 2px;
}
.req .el-table__row td .cell {
  line-height: 38px;
}
.req .el-table__row td .cell,
.req .el-select .el-input__inner,
.reqInfo .el-table__row td:nth-child(5) .el-input__inner,
.signature .el-table__row td:nth-child(4) .el-input__inner {
  border: 1px solid #cecece;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  height: 40px;
}
.reqInfo .el-table__row td:nth-child(4) .cell,
.reqInfo .el-table__row td:nth-child(2) .cell,
.reqInfo .el-table__row td:nth-child(6) .cell,
.reqCreate .signature .el-table__row td .cell,
.reqInfo .el-table__row td:nth-child(5) .cell {
  border: 0;
  box-shadow: 0 0;
}
/* .req .el-select > .el-input,
.req .focus {
  padding: 4px 4px;
} */
.req .el-select .el-input.is-focus .el-input__inner,
.req .el-input.is-active .el-input__inner,
.reqCreate .reqInfo .el-table__row td:nth-child(5) .el-input__inner:focus {
  box-shadow: 0px 0px 8px 0px rgba(74, 144, 226, 0.46);
  border: 2px solid;
  border-color: #289df5;
}
.signature .el-table__empty-text {
  display: none;
}
.signature .el-table__empty-block {
  min-height: 84px;
}

/* 按钮样式 */
.operate .el-button + .el-button {
  margin-left: 1.54%;
}
.operate .el-button {
  width: 13.782%;
  height: 44px;
  font-size: 20px;
}
.reqCreate .operate .el-button:first-child {
  border-color: #1875f0;
  color: #1875f0;
}
/* 头部*样式 */
.reqInfo table th.must div:before {
	content: '*';
	color: #ff1818;
  position: relative;
  top: 5px;
}
</style>

