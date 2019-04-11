<template>
  <div>
    <el-dialog :visible.sync="dialogTableVisible">
      <div class="cpmSupplier">
        <div class="cpm-top">
          <div class="cpm-top1">{{ field }}</div>
          <div class="close" @click="dialogTableVisible = false">×</div>
        </div>
        <div class="cpm-top2">
          <div class="cpm-top2-left">请输入查找条件</div>
          <div class="cpm-top2-right">
            <el-input v-model="input"/>
            <img src="../../assets/index/images/magnify.png" alt="" @click="changeCpm(input)">
          </div>
        </div>
        <div class="cpm-bottom">
          <!-- 可删除选中的tag(checkBox) -->
          <div class="selectedField">
            <el-tag
              v-for="tag in checkList"
              :key="tag"
              :disable-transitions="false"
              type="success"
              closable
              @close="handleClose(tag)">
              {{ tag }}
            </el-tag>
          </div>
          <div class="cpm-bottom-page">
            <div class="cpm-bottom-page-left">共</div>
            <div class="cpm-bottom-page-left-1">{{ AllData }}</div>
            <div class="cpm-bottom-page-left-2">条记录</div>
            <div class="cpm-bottom-page-left2">{{ pageNo }}</div>
            <div class="cpm-bottom-page-left3">/{{ totalpages }}</div>
            <el-pagination
              :total="AllData"
              class="cpm-bottom-page-right"
              small
              layout="prev, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
          <div class="cpm-bottom-list">
            <el-checkbox-group v-model="checkList">
              <el-checkbox v-for="item in provision" :label="item.coporation" :key="item.coporation"><span class="cpm-bottom-list-span">{{ item.coporation }}</span></el-checkbox>
            </el-checkbox-group>

          </div>
          <div class="cpm-last">
            <el-button type="success" class="cpm-bottom-list-btn" @click="cpmSure">确定</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import { judgeUrl } from '@/utils/api'
// import { flagFindData } from '@/api/requirements'
export default {
  name: 'Popup',
  props: { type: Array }['checkarr'],
  data() {
    return {
      dialogTableVisible: false,
      field: '',
      // 下标
      index: '',
      // 模糊查询
      provision: [],
      storeProvision: [],
      checkList: [],
      input: '',
      store: [],
      // 分页控制
      pageNo: 1, // 当前页
      pageSize: 10,
      totalpages: 0, // 一共页数
      AllData: 0 // 一共多少条数据
    }
  },
  watch: {
    checkList(val) {
      console.log('checkList', val)
    }
    // 模糊查询
    // input(val, old) {
    //   this.checkList = []
    //   if (val || val === '') {
    //     // JSON.parse(this.storeProvision)
    //     this.provision = this.storeProvision.filter((item, index) => {
    //       return (
    //         item.supplierName.indexOf(val) !== -1 || (item.name + '').indexOf(val) !== -1
    //       )
    //     })
    //     this.AllData = this.provision.length
    //     this.getAllPage()
    //     this.MhLoadData(this.pageNo)
    //     // arr.forEach((item, index, datas) => {
    //     //   this.checkList.push(item.supplierCode)
    //     //   this.store.push(item)
    //     // })
    //   }
    // }
  },
  methods: {
    handleClose(tag) {
      this.checkList.splice(this.checkList.indexOf(tag), 1)
    },
    // 搜索框change事件
    // changeCpm(val) {
    //   // this.checkList = []
    //   if (val || val === '') {
    //     // JSON.parse(this.storeProvision)
    //     this.provision = this.storeProvision.filter((item, index) => {
    //       return (
    //         item.supplierName.indexOf(val) !== -1 || (item.name + '').indexOf(val) !== -1
    //       )
    //     })
    //     this.AllData = this.provision.length
    //     this.getAllPage()
    //     this.MhLoadData(this.pageNo)
    //   }
    // },
    changeCpm(val) {
      this.getData()
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
      console.log('前端加分页调用的方法this.provision', this.provision)
    },
    // 前端加分页模糊查询调用方法
    MhLoadData(value) {
      this.pageNo = value
      this.provision = this.provision.slice((value - 1) * this.pageSize, value * this.pageSize)
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
    cpmOpen() {
      this.dialogTableVisible = true
    },
    cpmClose() {
      this.dialogTableVisible = false
    },
    cpmSure() {
      var that = this
      that.checkList.forEach((item, index, arr) => {
        that.storeProvision.forEach((item2, index, arr) => {
          console.log(item2)
          if (item === item2.coporation) {
            that.store.push(item2)
          }
        })
      })
      console.log('that.storeProvision', that.storeProvision)
      console.log('this.store供应商', that.store)
      console.log('供应商this.index', this.index)
      this.$emit('successs', this.store, this.index)
      this.$emit('checkarrT', this.index)
      that.store = []
      this.dialogTableVisible = false
    },
    // 请求接口
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
        console.log('this.provision', this.provision)
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
            console.log('供应商请求成功', res)
            this.provision = res.data.result
            this.storeProvision = res.data.result
            this.AllData = res.data.result.length// 前端加分页————获取数据总条数
            this.getAllPage()
            this.LoadData(1)// 前端加分页————加载第一个数据
            console.log('this.provision', this.provision)
          }).catch(res => {
            console.log('供应商请求失败')
          })
      }
    }
  }
}
</script>
<style scoped>
/* 选中的tag 带有删除按钮 */
.selectedField{
    position: absolute !important;
    width: 40%;
    /* line-height: 76px; */
    /* float: left; */
    display: inline-block;
    margin-left: 5%;
    height: 40px;
    overflow-x: auto;
    /* padding-bottom: 10px; */
    overflow-y: hidden;
    white-space: nowrap;
}
/*滚动条整体样式 高宽分别对应横竖滚动条的尺寸*/
.selectedField::-webkit-scrollbar {
  width: 4px;
  height: 5px;
}
/*滚动条里面小方块*/
.selectedField::-webkit-scrollbar-thumb {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
/*滚动条里面轨道*/
.selectedField::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
</style>

  <style>
  .selectedField .el-tag + .el-tag {
  margin-left: 10px;
}
  .cpmSupplier{
  width:1128px;
  height:570px;
  background:#FFFFFF;
  position:absolute;
  z-index: 6;
  /* margin-left:19.8%; */
  display:block;
  margin-top:42px;
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
.cpm-top2{
  width:100%;
  height:119px;
  background:#F5F3F3;
}
.cpm-top2-left{
  min-width:98px;
  height:20px;
  color:#4A4A4A;
  font-size:14px;
  float:left;
  margin-left:249px;
  margin-top:54px;
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
.cpm-top2-right input{
  width:100%;
  /* height:100%; */
  height: 49px!important;
  background:#FFFFFF;
}
.cpm-top2-right img{
  position:absolute;
  width:22px;
  height:22px;
  top: 14px;
  right: 20px;
  cursor:pointer;
}
.cpm-bottom{
  width:100%;
  /* height:427px; */
  height: 36px;
  background:#FFFFFF;
}
.cpm-bottom-list{
  width:100%;
  height:274px;
  /* margin-left:29px; */
  background:#F8FAFC;
  position:relative;
}
.cpm-bottom-list-block {
  position: absolute;
  top: 279px;
  left: 15%;
}
.cpm-bottom .cpm-bottom-list-block .el-pagination__jump::before {
  left: -44px !important;
}
.cpm-bottom-list-btn{
  width:19.06%!important;
  height:36px!important;
  background:#27A1F2;
  text-align: center;
  line-height: 36px;
  margin-left:456px;
  margin-top:22px!important;
  color: #FFF;
  font-size:14px;
  border:0;
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
  cursor:pointer;
}
/* input框样式 */
.cpm-cpm {
  float: left;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  position: relative;
  box-shadow:2px 2px 6px 0px rgba(0,0,0,0.22);
  border-radius: 5px;
  border: 1px solid #cecece;
  background: #F9F9F9;
}
.cpm-cpm input {
  float: left;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 5px;
  background: #F9F9F9;
}
.cpm-cpm span {
  float: right;
  height: 27px;
  line-height: 15px;
  position: absolute;
  top: 6px;
  right: 0;
  width: 25%;
  border-left:1px solid #CECECE;
  padding-top: 7px;
  padding-bottom: 6px;
  text-align: center;
}
.cpm-cpm span img{
  height: 14px!important;
  /* margin-top: 2px!important; */
  width:18px!important;
  cursor:pointer;
}
/* 展示样式调整 */
.cpmSupplier .cpm-bottom-list .el-checkbox{
  width: 285px;
  height: 20px;
  margin-top: 18px;
  margin-left: 82px!important;
}
/* 分页 */
.cpm-bottom-page{
  height: 40px;
  margin-top: 7px;
  line-height: 29px;
}
.cpm-bottom-page-left{
  float: left;
  margin-left: 842px;
  /* width: 90px; */
  width: 14px;
  height: 20px;
  font-size: 14px;
  color: #354052;
  margin-top: 7px;
}
.cpm-bottom-page-left-1{
  float: left;
  /* margin-left: 842px; */
  min-width: 18px;
  max-width: 59px;
  height: 20px;
  font-size: 14px;
  color: #4A90E2;
  margin-top: 7px;
}
.cpm-bottom-page-left-2{
  float: left;
  /* margin-left: 842px; */
  width: 42px;
  height: 20px;
  font-size: 14px;
  color: #354052;
  margin-top: 7px;
}
.cpm-bottom-page-left2{
  float: left;
  margin-left: 21px;
  min-width: 7px;
  height: 20px;
  margin-top: 7px;
  color: #4A90E2;
}
.cpm-bottom-page-left3{
  float: left;
  width: 20px;
  height: 20px;
  margin-top: 7px;
}
.cpm-bottom-page-right{
  float: right;
  width: 88px;
  height: 36px;
  margin-right: 3.1%;
}
/* 分页按钮样式 */
.cpm-bottom .el-pagination .btn-next{
  width: 50%;
  height: 34px;
  border-radius:0 4px 4px 0;
  border:1px solid #E6EAEE;
}
.cpm-bottom .el-pagination .btn-prev{
  width: 50%;
  height: 34px;
  border-radius:4px 0 0 4px;
  border:1px solid #E6EAEE;
  border-right: 0;
}
.cpm-bottom .el-icon-arrow-right::before{
  display: block;
}
.cpm-last{
  width: 100%;
  height: 80;
  background: #F5F3F3;
  line-height: 80px;
  text-align: left;
}
.cpm-bottom-list-span{
  margin-left: 20px;
}
</style>
