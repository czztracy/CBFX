<template>
  <div>
    <div class="cpm-cpm">
      <input :value="suppliers" type="text" disabled="disabled">
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
            v-show="field=== $t('demandManagement.supplier')"
            v-model="checkListS"
            :max="1"
          >
            <el-checkbox v-for="item in provision" :label="item" :key="item.supplierCode">
              <span class="cpm-bottom-list-span">{{ item.coporation }}</span>
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
import { judgeUrl } from '@/utils/api'
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
      currentPage3: 5,
      dialogTableVisible: false,
      field: '',
      // 模糊查询
      provision: [],
      storeProvision: [],
      checkListS: [], // 供应商选中存值
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
  methods: {
    // 搜索框change事件
    changeCpm(val) {
      this.getData()
    },
    // 一共多少页
    getAllPage() {
      this.totalpages = Math.ceil(this.AllData * 1 / this.pageSize)
      // console.log('一共多少页', this.totalpages)
    },
    // 前端加分页调用的方法
    LoadData(value) {
      this.pageNo = value
      this.provision = this.storeProvision.slice((value - 1) * this.pageSize, value * this.pageSize)
    },
    // 前端加分页模糊查询调用方法
    MhLoadData(value) {
      this.pageNo = value
      this.provision = this.provision.slice((value - 1) * this.pageSize, value * this.pageSize)
      this.AllData = this.provision.length
      console.log('前端加分页调用的方法this.provision', this.provision)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageNo = val
      this.LoadData(val)
    },
    cpmOpen(val) {
      this.dialogTableVisible = true
      this.field = val + ''
      // this.checkList = [] // 打开为空
      // this.getData()
    },
    cpmClose() {
      this.dialogTableVisible = false
    },
    cpmSure() {
      if (this.checkListS.length === 0) {
        this.suppliers = ''
        this.suppliersId = ''
        this.dialogTableVisible = false
      } else {
        this.suppliers = this.checkListS[0].coporation
        this.suppliersId = this.checkListS[0].supplierCode
        // console.log('this.suppliers', this.suppliers)
        // console.log('this.suppliersId', this.suppliersId)
        this.dialogTableVisible = false
      }
      // this.suppliersId = this.store[0].supplierCode
      this.dialogTableVisible = false
    },
    getData() {
      if (judgeUrl() !== '002') {
        var res = { 'success': true, 'result': [
          { 'nick': 'V12970', 'coporation': '青岛胜汇塑胶有限公司', 'phone': '13256859167', 'name': '纪洪旭', 'supplierCode': 'V12970', 'email': '13256859167@163.com' },
          { 'nick': 'v12999', 'coporation': '青岛桐欣标签有限公司', 'phone': '13256859167', 'name': '纪洪旭', 'supplierCode': 'V12999', 'email': '13256859167@163.com' },
          { 'nick': 'v98534', 'coporation': '青岛海尔新材料研发有限公司', 'phone': '18663900138', 'name': '杨升建', 'supplierCode': 'V98534', 'email': 'ysj1226@163.com' },
          { 'nick': 'v13076', 'coporation': '青岛金冠家具有限公司', 'phone': '13665325518', 'name': '张冬焱', 'supplierCode': 'V13076', 'email': 'pingdujinguan@163.com' },
          { 'nick': 'v12983', 'coporation': '西玛（青岛）弹簧有限公司', 'phone': '13969849297', 'name': '王洪池', 'supplierCode': 'V12983', 'email': 'allen.wang@cimaqd.com.cn' },
          { 'nick': 'v13064', 'coporation': '青岛东海龙塑钢材料有限公司', 'phone': '13376390199', 'name': '邱吉光', 'supplierCode': 'V13064', 'email': '18766210269@163.com' },
          { 'nick': 'qdxmc', 'coporation': '青岛鑫名川工贸有限公司', 'phone': '18661653188', 'name': '张立红', 'supplierCode': 'V13073', 'email': '72897@163.com' },
          { 'nick': 'v12967', 'coporation': '青岛三和机电部件有限公司', 'phone': '18653219751', 'name': '翟瑞利', 'supplierCode': 'V12967', 'email': 'zrlwy@163.com' },
          { 'nick': 'v13058', 'coporation': '青岛华龙包装有限公司', 'phone': '15315016808', 'name': '姜少伟', 'supplierCode': 'V13058', 'email': 'jiang85689993@126.com' },
          { 'nick': '青岛长电电子有限公司', 'coporation': '青岛长电电子有限公司', 'phone': '13780695601', 'name': '都基敏', 'supplierCode': 'V12920', 'email': 'dujmqd@163.com' },
          { 'nick': 'v13794', 'coporation': '青岛合兴包装有限公司', 'phone': '15606397699', 'name': '冒建军', 'supplierCode': 'V13794', 'email': 'mjj@hxpp.com.cn' }] }
        this.provision = res.result
        this.storeProvision = res.result
        this.AllData = res.result.length// 前端加分页————获取数据总条数
        this.getAllPage()
        this.LoadData(1)// 前端加分页————加载第一个数据
        console.log('this.provision', this.provision, this.storeProvision)
      } else {
        const url = 'http://dbs.haier.net/api/company/findByCorporationForDBS'
        const params = { 'corporation': this.input }
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
        this.$axios({ url, params, method: 'post' })
          .then(res => {
            // console.log('供应商请求成功', res)
            this.provision = res.data.result
            this.storeProvision = res.data.result
            this.AllData = res.data.result.length// 前端加分页————获取数据总条数
            this.getAllPage()
            this.LoadData(1)// 前端加分页————加载第一个数据
            // console.log('this.provision', this.provision)
          }).catch(res => {
            console.log('供应商请求失败')
          })
      }
    }
    // getData() {
    //   if (this.field === this.$t('demandManagement.supplier') && this.checkListS.length === 0) {
    //     // 供应商海尔接口
    //     const url = 'http://dbs.haier.net/api/company/findByCorporationForDBS'
    //     const params = { 'corporation': this.input }
    //     this.$axios({ url, params, method: 'post' })
    //       .then(res => {
    //         console.log('供应商请求成功', res)
    //         this.provision = res.data.result
    //         this.storeProvision = res.data.result
    //         this.AllData = res.data.result.length// 前端加分页————获取数据总条数
    //         this.getAllPage()
    //         this.LoadData(1)// 前端加分页————加载第一个数据
    //         console.log('this.provision', this.provision)
    //       })
    //   }
    // }
  }
}
</script>

<style>
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
  height: 100%;
  border: 0;
  border-radius: 5px;
  background: #f9f9f9;
  overflow: hidden;
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
