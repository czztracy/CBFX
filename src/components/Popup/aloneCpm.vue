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
            <el-input v-model="input" />
            <img src="../../assets/index/images/magnify.png" alt="" @click="changeCpm(input)">
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
              small
              layout="prev, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
          <div class="cpm-bottom-list">
            <el-checkbox-group v-model="checkList" :max="1">
              <el-checkbox v-for="item in provision" :label="item.categoryCn" :key="item.categoryCn"><span class="cpm-bottom-list-span">{{ item.categoryCn }}</span></el-checkbox>
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
import { categoryList } from '@/api/requirements'
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
      storeProvisionDim: [],
      ifSearch: false,
      checkList: [],
      input: '',
      store: [],
      // 分页控制
      pageNo: 1,
      pageSize: 10,
      // pageAll: 0 // 总数据数
      fieldData2: [], // 后一页数据
      totalpages: 0, // 一共页数
      AllData: 0 // 一共多少条数据
    }
  },
  watch: {
    // 模糊查询
    // input(val, old) {
    //   this.checkList = []
    //   if (val || val === '') {
    //     this.provision = this.storeProvision.filter((item, index) => {
    //       return (
    //         item.categoryCn.indexOf(val) !== -1 || (item.categoryEn).indexOf(val) !== -1
    //       )
    //     })
    //     this.AllData = this.provision.length
    //     this.getAllPage()
    //     this.MhLoadData(this.pageNo)
    //     // arr.forEach((item, index, datas) => {
    //     //   this.checkList.push(item.categoryCn)
    //     //   this.store.push(item)
    //     // })
    //   }
    // }
  },
  methods: {
    // 搜索框change事件
    changeCpm(val) {
      this.checkList = []
      if (val || val === '') {
        // JSON.parse(this.storeProvision)
        this.storeProvisionDim = this.storeProvision.filter((item, index) => {
          return (
            (item.categoryCn + '').indexOf(val) !== -1 || (item.name + '').indexOf(val) !== -1
          )
        })
        this.pageNo = 1
        this.AllData = this.storeProvisionDim.length
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
    cpmOpen() {
      this.dialogTableVisible = true
    },
    cpmClose() {
      this.dialogTableVisible = false
    },
    cpmSure() {
      var that = this
      that.checkList.forEach((item, index, arr) => {
        console.log('item', item)
        that.provision.forEach((item2, index, arr) => {
          console.log('item2', item2)
          if (item === item2.categoryCn) {
            that.store.push(item2)
          }
        })
      })
      console.log('this.store', that.store)
      this.$emit('success', this.store, this.index)
      that.store = []
      this.dialogTableVisible = false
    },
    // 请求接口
    getData() {
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
        // 测试数据 待删
        // this.storeProvision.push({ categoryCn: '轮回眼', categoryEn: 'Adhesives RTV/Siliconsssss' })
        this.AllData = res.resultData.length// 前端加分页————获取数据总条数
        this.getAllPage()
        this.LoadData(1)// 前端加分页————加载第一个数据
        console.log('this.provision', this.provision)
      }).catch(res => {
        console.log('物料类别请求失败')
      })
    }
  }
}
</script>

  <style>
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
  height: 36px;
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
  margin-top:0 !important;
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
