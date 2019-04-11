<template>
  <div>
    <div class="cpm-cpm">
      <el-input :value="suppliers" type="text" disabled="disabled"/>
      <span>
        <img src="../../assets/index/images/searcho.png" alt @click="cpmOpen(name)">
      </span>
    </div>
    <el-dialog :visible.sync="dialogTableVisible">
      <div class="cpm">
        <div class="cpm-top">
          <div class="cpm-top1">{{ field }}</div>
          <div class="close" @click="dialogTableVisible = false">×</div>
        </div>
        <div class="cpm-top2">
          <div class="cpm-top2-left">{{ $t('demandManagement.PleaseEnterTheSearchCriteria') }}</div>
          <div class="cpm-top2-right">
            <el-input v-model="input"/>
            <img src="../../assets/index/images/magnify.png" alt @click="changeCpm(input)">
          </div>
        </div>
        <div class="cpm-bottom">
          <div class="cpm-bottom-page">
            <div class="cpm-bottom-page-left">共</div>
            <div class="cpm-bottom-page-left-1">{{ AllData }}</div>
            <div class="cpm-bottom-page-left-2">条记录</div>
            <div class="cpm-bottom-page-left2">{{ pageNo }}</div>
            <div class="cpm-bottom-page-left3">/{{ totalpages }}</div>
            <el-pagination
              :total="AllData"
              class="cpm-bottom-page-right"
              style="margin-top:0"
              small
              layout="prev, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
        <div class="cpm-bottom-list">
          <el-checkbox-group
            v-show="field=== $t('demandManagement.materialNumber')"
            v-model="checkListMN"
            :max="1"
          >
            <el-checkbox v-for="item in provision" :label="item" :key="item.moduleCode">
              <!-- {{ item.moduleCode }} -->
              <span class="cpm-bottom-list-span">{{ item.moduleCode }}</span>
            </el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group
            v-show="field=== $t('demandManagement.supplier')"
            v-model="checkListS"
            :max="1"
          >
            <el-checkbox v-for="item in provision" :label="item" :key="item.supplierCode">
              <span class="cpm-bottom-list-span">{{ item.coporation }}</span>
            </el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group
            v-show="field=== $t('demandManagement.materialType')"
            v-model="checkListMT"
            :max="1"
          >
            <el-checkbox v-for="item in provision" :label="item" :key="item.categoryCn">
              <!-- {{ item.categoryCn }} -->
              <span class="cpm-bottom-list-span">{{ item.categoryCn }}</span>
            </el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group
            v-show="field=== $t('demandManagement.businessScenario')"
            v-model="checkListBS"
            :max="1"
          >
            <el-checkbox v-for="item in provision" :label="item" :key="item.code">
              <span class="cpm-bottom-list-span">{{ item.name }}</span>
              <!-- &nbsp;{{ item.type }} -->
            </el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group
            v-show="field=== $t('demandManagement.taskOne')"
            v-model="checkListT"
            :max="1"
          >
            <el-checkbox v-for="item in provision" :label="item" :key="item.managerCode">
              <span class="cpm-bottom-list-span">{{ item.manager }}</span>
              <!-- &nbsp;{{ item.type }} -->
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="cpm-last">
          <el-button type="success" class="cpm-bottom-list-btn" @click="cpmSure">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { categoryList, selects, flagFindData } from '@/api/requirements'
export default {
  name: 'Popup',
  props: {
    name: {
      type: String, default: ''
    }
  },
  data() {
    return {
      // 存id号的/供应商编码
      suppliersId: '',
      // input框显示内容
      suppliers: '',
      category: {}, // 物料类别
      currentPage3: 5,
      dialogTableVisible: false,
      field: '',
      // 模糊查询
      provision: [],
      storeProvision: [],
      storeProvisionDim: [],
      ifSearch: false,
      checkListMN: [], // 物料号选中存值
      checkListMT: [], // 物料类别选中存值
      checkListS: [], // 供应商选中存值
      checkListBS: [], // 业务场景选中存值
      checkListT: [], // 任务人选中存值
      input: '',
      store: [],
      // 分页控制
      pageNo: 1,
      pageSize: 10,
      // pageAll: 12, // 总页数
      fieldData2: [], // 后一页数据
      totalpages: 0, // 一共页数
      AllData: 0 // 一共多少条数据
    }
  },
  watch: {
    // 模糊查询
    // input(val, old) {
    //   this.checkList = []
    //   // this.store = []
    //   if (val || val === '') {
    //     this.provision = this.storeProvision.filter((item, index) => {
    //       return (
    //         (item.supplierName + '').indexOf(val) !== -1 || (item.name + '').indexOf(val) !== -1 || (item.manager + '').indexOf(val) !== -1
    //       )
    //     })
    //     this.AllData = this.provision.length
    //     this.getAllPage()
    //     this.MhLoadData(this.pageNo)
    //   }
    // }
    // //     arr.forEach((item, index, datas) => {
    // //       this.checkList.push(item.id)
    // //       // this.store.push(item)
    // //     })
    // //   }
    // // }
    // // suppliers(newval, oldval) {
    // //   this.$emit('materialChange', this.suppliers)
    // // }
  },
  methods: {
    // 搜索框change事件
    changeCpm(val) {
      // this.checkList = []
      if (val || val === '') {
        // JSON.parse(this.storeProvision)
        this.storeProvisionDim = this.storeProvision.filter((item, index) => {
          return (
            (item.coporation + '').indexOf(val) !== -1 || (item.name + '').indexOf(val) !== -1 || (item.manager + '').indexOf(val) !== -1 || (item.categoryCn + '').indexOf(val) !== -1 || (item.moduleCode + '').indexOf(val) !== -1
          )
        })
        this.pageNo = 1
        // this.provision = this.storeProvisionDim
        this.AllData = this.storeProvisionDim.length
        // console.log('this.AllData.length', this.AllData.length)
        this.getAllPage()
        this.MhLoadData(this.pageNo)
        // 判断是否进行搜索
        this.ifSearch = true
        // arr.forEach((item, index, datas) => {
        //   this.checkList.push(item.supplierCode)
        //   this.store.push(item)
        // })
      }
    },
    // 一共多少页
    getAllPage() {
      this.totalpages = Math.ceil(this.AllData * 1 / this.pageSize)
      console.log('一共多少页', this.totalpages)
    },
    // 前端加分页调用的方法
    LoadData(value) {
      this.pageNo = value
      this.provision = this.storeProvision.slice((value - 1) * this.pageSize, value * this.pageSize)
    },
    // 前端加分页模糊查询调用方法
    MhLoadData(value) {
      this.pageNo = value
      this.provision = this.storeProvisionDim.slice((value - 1) * this.pageSize, value * this.pageSize)
      // this.AllData = this.provision.length
      console.log('前端加分页调用的方法this.provision', this.provision)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageNo = val
      if (this.ifSearch === true) {
        this.MhLoadData(val)
      } else {
        this.LoadData(val)
      }
    },
    cpmOpen(val) {
      this.dialogTableVisible = true
      this.field = val + ''
      // this.checkList = [] // 打开为空
      this.getData()
    },
    cpmClose() {
      this.dialogTableVisible = false
    },
    cpmSure() {
      // 滞空
      // this.store = []
      // this.checkList.forEach((item, index, arr) => {
      //   this.provision.forEach((item2, index2, arr2) => {
      //     if (item2.id === item) {
      //       console.log('item2', item2)
      //       this.store.push(item2)
      //     }
      //   })
      // })
      this.suppliers = this.name
      // this.store = this.checkList
      if (this.field === this.$t('demandManagement.materialNumber')) {
        // this.$emit('success', this.store)
        // this.$emit('material', this.store)
        if (this.checkListMN.length === 0) {
          this.suppliers = ''
          this.dialogTableVisible = false
        } else {
          this.suppliers = this.checkListMN[0].moduleCode
          this.dialogTableVisible = false
        }
      } else if (this.field === this.$t('demandManagement.supplier')) {
        // this.$emit('supplier', this.store)
        if (this.checkListS.length === 0) {
          this.suppliers = ''
          this.suppliersId = ''
          this.dialogTableVisible = false
        } else {
          this.suppliers = this.checkListS[0].supplierName
          this.suppliersId = this.checkListS[0].supplierCode
          console.log('this.suppliers', this.suppliers)
          console.log('this.suppliersId', this.suppliersId)
          this.dialogTableVisible = false
        }
        // this.suppliersId = this.store[0].supplierCode
        this.dialogTableVisible = false
      } else if (this.field === this.$t('demandManagement.materialType')) {
        // this.$emit('materialType', this.store)
        if (this.checkListMT.length === 0) {
          this.suppliers = ''
          this.dialogTableVisible = false
        } else {
          this.suppliers = this.checkListMT[0].categoryCn
          if (this.checkListMT[0].categoryCn) {
            this.category = this.checkListMT
          }
          // console.log(this.suppliers, '物料类别')
          this.dialogTableVisible = false
        }
      } else if (this.field === this.$t('demandManagement.businessScenario')) {
        // this.$emit('materialType', this.store)
        if (this.checkListBS.length === 0) {
          this.suppliers = ''
          this.dialogTableVisible = false
        } else {
          this.suppliers = this.checkListBS[0].name
          this.dialogTableVisible = false
        }
      } else if (this.field === this.$t('demandManagement.taskOne')) {
        // this.$emit('materialType', this.store)
        if (this.checkListT.length === 0) {
          this.suppliers = ''
          this.suppliersId = ''
          this.dialogTableVisible = false
        } else {
          this.suppliers = this.checkListT[0].manager
          this.suppliersId = this.checkListT[0].managerCode
          this.dialogTableVisible = false
        }
      }
    },
    getData() {
      if (this.field === this.$t('demandManagement.materialNumber') && this.checkListMN.length === 0) {
        // const url = 'http://47.104.98.71:8780/costmanagement/demandFilter/selectInfo'
        const params = { flag: '4' }
        // this.$axios.get(url, { params })
        //   .then(res => {
        //     console.log('物料号请求成功', res)
        //     console.log('checkList', this.checkList)
        //     this.provision = res.data.resultData
        //     this.storeProvision = res.data.resultData
        //     this.AllData = res.data.resultData.length// 前端加分页————获取数据总条数
        //     this.getAllPage()
        //     this.LoadData(1)// 前端加分页————加载第一个数据
        //     console.log('this.provision', this.provision)
        //   })
        //   .catch(res => {
        //     console.log('物料号请求失败')
        //   })
        flagFindData(params).then(res => {
          console.log('物料号请求成功', res)
          console.log('checkList', this.checkList)
          this.provision = res.resultData
          this.storeProvision = res.resultData
          this.AllData = res.resultData.length// 前端加分页————获取数据总条数
          this.getAllPage()
          this.LoadData(1)// 前端加分页————加载第一个数据
          console.log('this.provision', this.provision)
        }).catch(res => {
          console.log('物料号请求失败')
        })
      } else if (this.field === this.$t('demandManagement.supplier') && this.checkListS.length === 0) {
        // 供应商模糊查询
        // const url = 'http://47.104.98.71:8780/costmanagement/demandFilter/selectInfo'
        // const params = { flag: '7' }
        // this.$axios.get(url, { params })
        //   .then(res => {
        //     console.log('供应商请求成功', res)
        //     this.provision = res.data.resultData
        //     this.storeProvision = res.data.resultData
        //     this.AllData = res.data.resultData.length// 前端加分页————获取数据总条数
        //     this.getAllPage()
        //     this.LoadData(1)// 前端加分页————加载第一个数据
        //     console.log('this.provision', this.provision)
        //   })
        //   .catch(res => {
        //     console.log('供应商请求失败')
        //   })
        // flagFindData(params).then(res => {
        //   console.log('供应商请求成功', res)
        //   this.provision = res.resultData
        //   this.storeProvision = res.resultData
        //   this.AllData = res.resultData.length// 前端加分页————获取数据总条数
        //   this.getAllPage()
        //   this.LoadData(1)// 前端加分页————加载第一个数据
        //   console.log('this.provision', this.provision)
        // }).catch(res => {
        //   console.log('供应商请求失败')
        // })
        // 供应商海尔接口
        const url = 'http://dbs.haier.net/api/company/findByCorporationForDBS'
        const params = { 'corporation': '' }
        this.$axios({ url, params, method: 'post' })
          .then(res => {
            console.log('供应商请求成功', res)
            this.provision = res.data.result
            this.storeProvision = res.data.result
            this.AllData = res.data.result.length// 前端加分页————获取数据总条数
            this.getAllPage()
            this.LoadData(1)// 前端加分页————加载第一个数据
            console.log('this.provision', this.provision)
          })
      } else if (this.field === this.$t('demandManagement.materialType') && this.checkListMT.length === 0) {
        // 物料类别查询+分页效果
        // const url = 'http://47.104.98.71:8780/costmanagement/demandFilter/selectInfo'
        // const params = { flag: '5' }
        // this.$axios.get(url, { params })
        //   .then(res => {
        //     console.log('物料类别请求成功', res)
        //     this.provision = res.data.resultData
        //     this.storeProvision = res.data.resultData
        //     this.AllData = res.data.resultData.length// 前端加分页————获取数据总条数
        //     this.getAllPage()
        //     this.LoadData(1)// 前端加分页————加载第一个数据
        //     console.log('this.provision', this.provision)
        //   })
        //   .catch(res => {
        //     console.log('物料类别请求失败')
        //   })
        categoryList().then(res => {
          console.log('物料类别请求成功', res)
          this.provision = res.resultData
          this.storeProvision = res.resultData
          this.AllData = res.resultData.length// 前端加分页————获取数据总条数
          this.getAllPage()
          this.LoadData(1)// 前端加分页————加载第一个数据
          console.log('this.provision', this.provision)
        }).catch(res => {
          console.log('物料类别请求失败')
        })
      } else if (this.field === this.$t('demandManagement.businessScenario') && this.checkListBS.length === 0) {
        // const url = 'http://47.104.98.71:8780/costmanagement/dictionary/list'
        const params = { typeCodes: '034' }
        // this.$axios({ url, params, method: 'post' })
        //   .then(res => {
        //     console.log('业务场景请求成功', res)
        //     this.provision = res.data.resultData['034']
        //     this.storeProvision = res.data.resultData['034']
        //     this.AllData = res.data.resultData['034'].length// 前端加分页————获取数据总条数
        //     this.getAllPage()
        //     this.LoadData(1)// 前端加分页————加载第一个数据
        //     console.log('this.provision', this.provision)
        //   })
        //   .catch(res => {
        //     console.log('业务场景请求失败')
        //   })
        selects(params).then(res => {
          console.log('业务场景请求成功', res)
          this.provision = res.resultData['034']
          this.storeProvision = res.resultData['034']
          this.AllData = res.resultData['034'].length// 前端加分页————获取数据总条数
          this.getAllPage()
          this.LoadData(1)// 前端加分页————加载第一个数据
          console.log('this.provision', this.provision)
        }).catch(res => {
          console.log('业务场景请求失败')
        })
      } else if (this.field === this.$t('demandManagement.taskOne') && this.checkListT.length === 0) {
        // const url = 'http://47.104.98.71:8780/costmanagement/demandFilter/selectInfo'
        const params = { flag: '3' }
        // this.$axios.get(url, { params })
        //   .then(res => {
        //     console.log('任务人请求成功', res)
        //     this.provision = res.data.resultData
        //     this.storeProvision = res.data.resultData
        //     this.AllData = res.data.resultData.length// 前端加分页————获取数据总条数
        //     this.getAllPage()
        //     this.LoadData(1)// 前端加分页————加载第一个数据
        //     console.log('this.provision', this.provision)
        //   })
        //   .catch(res => {
        //     console.log('任务人请求失败')
        //   })
        flagFindData(params).then(res => {
          console.log('任务人请求成功', res)
          this.provision = res.resultData
          this.storeProvision = res.resultData
          this.AllData = res.resultData.length// 前端加分页————获取数据总条数
          this.getAllPage()
          this.LoadData(1)// 前端加分页————加载第一个数据
          console.log('this.provision', this.provision)
        }).catch(res => {
          console.log('任务人请求失败')
        })
      }
    }
  }
}
</script>

<style scoped>
.cpm {
  width: 1128px;
  height: 570px;
  background: #ffffff;
  position: absolute;
  z-index: 6;
  display: block;
  margin-top: 42px;
}
.cpm-top {
  width: 100%;
  height: 60px;
  background: #2ea1f8;
}
.cpm-top1 {
  width: 96px;
  height: 25px;
  color: #ffffff;
  font-size: 18px;
  padding-top: 18px;
  margin-left: 38px;
  float: left;
}
.cpm-top2 {
  width: 100%;
  height: 119px;
  background: #f5f3f3;
}
.cpm-top2-left {
  min-width: 98px;
  height: 20px;
  color: #4a4a4a;
  font-size: 14px;
  float: left;
  margin-left: 249px;
  margin-top: 54px;
  line-height: 20px;
}
.cpm-top2-right {
  width: 350px;
  height: 36px;
  float: left;
  margin-left: 13px;
  margin-top: 43px;
  position: relative;
}
.cpm-top2-right input {
  width: 100%;
  /* height:100%; */
  height: 49px !important;
  background: #ffffff;
}
.cpm-top2-right img {
  position: absolute;
  width: 22px;
  height: 22px;
  top: 14px;
  right: 20px;
  cursor: pointer;
}
.cpm-bottom {
  width: 100%;
  /* height:427px; */
  height: 36px;
  background: #ffffff;
}
.cpm-bottom-list {
  width: 100%;
  height: 274px;
  /* margin-left:29px; */
  background: #f8fafc;
  position: relative;
}
.cpm-bottom-list-block {
  position: absolute;
  top: 279px;
  left: 15%;
}
.cpm-bottom .cpm-bottom-list-block .el-pagination__jump::before {
  left: -44px !important;
}
.cpm-bottom-list-btn {
  width: 19.06% !important;
  height: 36px !important;
  background: #27a1f2;
  text-align: center;
  line-height: 36px;
  margin-left: 456px;
  margin-top: 22px !important;
  color: #fff;
  font-size: 14px;
  border: 0;
  border-radius: 4px;
  padding: 0;
}
.close {
  width: 17px;
  height: 17px;
  float: right;
  margin-right: 18px;
  text-align: center;
  color: #fff;
  font-size: 36px;
  margin-top: 10px;
  cursor: pointer;
}
/* input框样式 */
.cpm-cpm {
  float: left;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  position: relative;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.22);
  border-radius: 5px;
  border: 1px solid #cecece;
  background: #f9f9f9;
}
.cpm-cpm input {
  float: left;
  width: 75%;
  height: 99%;
  border: 0;
  border-radius: 5px;
  /* background: #f9f9f9; */
  overflow: hidden;
}
.cpm-cpm .el-input{
  height: 99%
}
.cpm-cpm .el-input.is-disabled .el-input__inner{
  background: #f9f9f9
}
.cpm-cpm span {
  float: right;
  height: 27px;
  line-height: 15px;
  position: absolute;
  top: 6px;
  right: 0;
  width: 25%;
  border-left: 1px solid #cecece;
  padding-top: 7px;
  padding-bottom: 6px;
  text-align: center;
}
.cpm-cpm span img {
  height: 14px !important;
  width: 18px !important;
  cursor: pointer;
}
/* 分页 */
.cpm-bottom-page {
  height: 36px;
  margin-top: 7px;
  line-height: 29px;
}
.cpm-bottom-page-left {
  float: left;
  margin-left: 842px;
  width: 14px;
  height: 20px;
  font-size: 14px;
  color: #354052;
  margin-top: 7px;
}
.cpm-bottom-page-left-1 {
  float: left;
  text-align: center;
  min-width: 18px;
  max-width: 59px;
  height: 20px;
  font-size: 14px;
  color: #4a90e2;
  margin-top: 7px;
}
.cpm-bottom-page-left-2 {
  float: left;
  width: 42px;
  height: 20px;
  font-size: 14px;
  color: #354052;
  margin-top: 7px;
}
.cpm-bottom-page-left2 {
  float: left;
  margin-left: 21px;
  min-width: 7px;
  height: 20px;
  margin-top: 7px;
  color: #4a90e2;
}
.cpm-bottom-page-left3 {
  float: left;
  width: 20px;
  height: 20px;
  margin-top: 7px;
}
.cpm-bottom-page-right {
  float: right;
  width: 88px;
  height: 36px;
  margin-right: 3.1%;
}
/* 展示样式调整 */
.bottom .cpm-bottom-list .el-checkbox {
  width: 285px;
  height: 20px;
  margin-top: 18px;
  margin-left: 82px !important;
}
.cpm-bottom-list-span {
  margin-left: 20px;
}
/* 分页按钮样式 */
.cpm-bottom .el-pagination .btn-next {
  width: 50%;
  height: 34px;
  border-radius: 0 4px 4px 0;
  border: 1px solid #e6eaee;
}
.cpm-bottom .el-pagination .btn-prev {
  width: 50%;
  height: 34px;
  border-radius: 4px 0 0 4px;
  border: 1px solid #e6eaee;
  border-right: 0;
}
.cpm-bottom .el-icon-arrow-right::before {
  display: block;
}
.cpm-last {
  width: 100%;
  height: 80;
  background: #f5f3f3;
  line-height: 80px;
  text-align: left;
}
.cpm .el-dialog__header {
  display: none;
}
.cpm .el-dialog__body {
  padding: 0;
}
</style>
