/*
 * @Page: 模板管理->模板审核列表页
 * @Author: wangyadi
 * @Date: 2018-12-19 10:55:12
 * @Last Modified by: wangyadi
 */
<template>
  <el-container v-loading="loading1.loading" class="conBox" style="height:100%;">
    <el-aside style="border: 1px solid rgba(209, 209, 209, 1); border-bottom: 0; width: auto; min-width:280px;">
      <Tree :loading1= "loading1" @targetData = "changeList"/>
    </el-aside>
    <el-main style="padding: 0">
      <div class="box clearfix">
        <div class = "show-box clearfix">
          <!--{{ $t('templateManager.editModel') }} -->
          <!-- 查询条件 -->
          <div class="top-show1">
            <el-button plain class="sort" @click="timeSort">{{ $t('myMessage.timeSequence') }}
              <span :class="sortTime"><span/><span/></span>
            </el-button>
            <el-input v-model="news" :placeholder="$t('templateManager.inputKey')" class = "search">
              <span slot="suffix" class="searchclass" @click="search">
                <i class="el-icon-search"/>
              </span>
            </el-input>
            <span class="total">
              {{ $t('demandNoResolve.total') }} {{ total }} {{ $t('templateManager.template') }}
            </span>
          </div>
          <!-- 无模版时展示 -->
          <div v-if = "emptyPage===true" class = "show-box clearfix" style="text-align:center;line-height:100%">
            <img src="../../../assets/index/images/wendang.png" alt="" style="margin-top:8%;height:35%">
            <div style="font-size:20px;color:#9B9B9B;padding:10px 0 100px;"><i class="fa fa-arrow-left"/> <span>{{ $t('templateManager.editionMsg') }}</span></div>
          </div>
          <div v-if = "emptyPage===false" class = "model-content clearfix">
            <!-- 模版展示列表 -->
            <!-- <div style = "height:100px;width:100px;background-color:#d00" @drop.prevent="drop" @dragover.prevent/> -->
            <!-- <div v-for = "(item,index) in listData" :key="index" class="model-list" draggable="true" @drag="moveModel(item)"> -->
            <div v-for = "(item,index) in listData" :key="index" class="model-list">
              <div class="modelState">
                <!-- modelState==='0001'(保存)未提交， modelState='0002'(提交)审批中，modelState==='0003'(通过),modelState==='0004'(驳回)被驳回-->
                <span v-if ="item.templateState==='0002'" class="modelState2">{{ $t('templateManager.auditing') }}</span>
                <span v-if ="item.templateState==='0001'" class="modelState3">{{ $t('templateManager.notSubmitted') }}</span>
                <span v-if ="item.templateState==='0004'" class="modelState4">{{ $t('templateManager.outOfCourt') }}</span>
                <span v-if ="item.templateState==='0003' && item.runState !== '0001' || categoryId === '' && item.templateState==='0003'" class="modelState5">{{ $t('templateManager.checked') }}</span>
              </div>
              <div class="head">
                <span style = "cursor:pointer" @click="Jump(item.templateId, item.createTime)"><img src="../../../assets/index/images/power.png" alt="">
                <span class="moduleName">{{ item.templateName }}</span></span>
              </div>
              <ul>
                <!-- <li><span class="moduleNumber">{{ $t('templateManager.moduleNumber') }}：</span><span>{{ item.templateId }}</span></li> -->
                <li><span class="creationTime">{{ $t('templateManager.creationTime') }}：</span><span>{{ item.createTime }}</span></li>
                <!-- <li><span class="usefulLife">{{ $t('templateManager.usefulLife') }}：</span><span>{{ item.usefulLife }}</span></li> -->
                <li><span class="category">{{ $t('templateManager.category') }}：</span><span>{{ item.categoryCn }}</span></li>
                <li><span class="area">{{ $t('templateManager.area') }}：</span><span>{{ item.areaName }}</span></li>
              </ul>
              <span v-if ="item.templateState==='0001' || item.templateState==='0004'" class="fa fa-trash-o delete_icon" @click="delectModel(item)"/>
            </div>
          </div>
          <br>
          <div style = "height:30px;float:left;width:100%">
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
                @current-change="handleCurrentChange"/>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import Tree from '@/views/modle/components/tree'
import { getTemplateList } from '@/api/modle' // getTemplate
export default {
  name: 'Edit',
  components: {
    Tree
  },
  data() {
    return {
      loading1: {
        loading: true,
        count: 0
      },
      // loading: true,
      targetdata: {},
      page: '',
      emptyPage: false, // 空页面
      currentPage: 1, // 当前页
      pageSize: 6, // 每页条数
      radio: '', // 置顶的模块编号
      moduleNumber: '', // 确定置顶的编号
      topIndex: '', // 置顶的下标
      templateState: '0002', // 模板状态
      templateName: '', // 模板名称
      categoryId: '', // 品类id
      type: '', // 时间排序标识 1为正序，2为倒序
      prioritySetting: false,
      news: '',
      sortTime: 'sortIcon big', // 时间排序样式控制
      value: '', // 状态选中项
      total: 0, // 模版总量
      listData: []
    }
  },
  watch: {
    // 点击品类显示相应模板
    targetdata(cur, old) {
      // console.log('edition targetdata', this.targetdata)
      // const params = { templateId: cur.id }
      this.categoryId = cur.id
      this.initList()
    },
    // 状态监听
    templateState(cur, old) {
      this.initList()
    }
  },
  created() {
    // 取消浏览器默认右键
    document.oncontextmenu = function() {
      return false
    }
  },
  destroyed() {
    // 恢复浏览器默认右键
    document.oncontextmenu = function() {
      return true
    }
  },
  mounted() {
    this.initList() // 获取右侧模板
  },
  methods: {
    // 跳转到模板审核详情页预览
    Jump(templateId, mobleTime) {
      // const audit = 1;
      // this.$router.push({ name: 'Review', params: { templateId, mobleTime, audit }})
      this.$router.push({ path: 'Review', query: { templateId, mobleTime }})
    },
    initList() {
      this.loading1.loading = true
      var params = {
        categoryId: this.categoryId, // 品类id
        currentPage: this.currentPage, // 当前页
        pageSize: this.pageSize, // 每页显示数量
        type: this.type, // 时间排序标识 1正 2倒
        templateName: this.news, // 模板名称
        templateState: '0002' // 模板状态（提交，所有提交状态都需审核）
      }
      getTemplateList(params).then(res => {
        this.listData = []
        // 列表数据 res
        if (res.resultData.count) {
          this.emptyPage = false
          this.total = res.resultData.count
        } else {
          this.emptyPage = true
          this.total = 0
        }
        this.loading1.loading = false
        this.listData = res.resultData.list
        // this.total = this.listData.length
        if (this.total === 0) {
          this.emptyPage = true
        } else {
          this.emptyPage = false
        }
        // this.listData = res.resultData.list
        console.log('右侧模版列表初始化-->提交状态', res)
      }).catch(err => {
        this.loading1.loading = false
        console.log(err)
      })
    },
    changeList(data) {
      this.targetdata = data
      console.log('targetdata', this.targetdata)
    },
    // 时间排序
    timeSort() {
      if (this.sortTime === 'sortIcon big') {
        this.sortTime = 'sortIcon small'
        this.type = '2' // 1是正序
        this.initList()
      } else {
        this.sortTime = 'sortIcon big'
        this.type = '1' // 2是倒序
        this.initList()
      }
    },
    search() { // 查询
      // this.templateName = this.news
      // console.log(this.templateName)
      // this.initList()
      this.currentPage = 1
      this.initList()
      // console.log('搜索框', this.news)
    },
    changeTrue() {
      this.prioritySetting = true
    },
    // 分页获取当前页
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
      this.initList()
    }
  }
}
</script>

<style scoped>
/* .clearfix:after{content:".";clear:both;display:block;height:0;overflow:hidden;visibility:hidden;} */
.box{
  background:rgba(244,244,244,1);
  min-width:1216px;
  min-height:100%;
  /* min-height:783px; */
  padding: 18px
}
.show-box{
  /* min-width:1167px; */
  width:100%;
 /* min-height:100%; */
 min-height: calc(100vh - 202px);
  overflow: hidden;
  /* min-height:733px; */
  background: #fff;
  padding-bottom:60px
}
.top-show1{
  padding:28px;
  color:#6C7180 !important;
  font-size: 16px
}
.top-show1 .el-button{
  font-size: 16px
}
.top-show1 .sort{
  /* min-width:134px; */
  min-width:11.48% !important;
  height:41px;
  background:rgba(244,244,244,1);
  margin-right:1.54%;
  margin-left:0
}
.top-show1 .sort2{
  background:rgba(244,244,244,1) url(../../../assets/index/images/zhidingxian.png) no-repeat 14%;
}
.sort img{
height:15px;
min-width:15px;
}
.top-show1 .search input{
  color:#9B9B9B !important;
  font-size: 14px
}
.top-show1 .search span {
    display: inline;
}
.top-show1 .search{
  display: inline-flex;
  width:36%;
  height:41px;
  margin:0 3.8% 0 2.0%
}

.top-show1 .el-select{
  /* min-width:134px; */
  width:11.48%;
  min-width:134px;
  height:41px
}
.top-show1 .el-select .el-input{
  min-width:11.48% !important;
}
.el-select-dropdown{
  min-width: 11.48% !important;
}
.total{
  font-size: 13px;
  color:#354052;
  float: right;
  height:41px;
  line-height: 41px;
  margin-right:1.57%
}
.sortIcon{
    display: inline-flex;
    flex-direction: column;
    vertical-align: top;
    margin-top:-4px;
  }
  .sortIcon span{
    border:6px solid rgba(0,0,0,0);
    margin-bottom: 2px;
  }
  .big span:first-child{
    border-bottom-color:rgba(155,155,155,1);
  }
  .big span:last-child{
    border-top-color:rgba(74,74,74,1);
  }
  .small span:first-child{
    border-bottom-color:rgba(74,74,74,1);
  }
  .small span:last-child{
    border-top-color:rgba(155,155,155,1);
  }
.model-content{
  width:100%;
  height:586px
  /* height:78%; */
  /* overflow: auto */
}
.model-list{
  width:31%;
  min-width:354px;
  height:269px;
  border:1px solid #ccc;
  margin:0 0 24px 25px;
  padding:25px;
  float: left;
  position: relative;
}
.modelState{
  min-width:25px;
  height:15px;
  font-size:15px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  line-height:17px;
  position: absolute;
  top:25px;
  right:16px;
}
.modelState2{
  color: #007CFF
}
.modelState3{
  color: #FF9E00
}
.modelState4{
  color: #D0021B
}
.modelState5{
  color: #CD7F32
}
.topLogo{
  background:rgba(0,124,255,1);
  color:#fff;
  font-size: 12px;
  padding:1px 5px
}
.head{
  height:50px;
  color:#354052;
  line-height:50px
}
.model-list img{
  float: left;
  min-width:50px;
  height:50px;
}
.head .moduleName{
  float: left;
  min-width:145px;
  height:50px;
  font-size:18px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(53,64,82,1);
  line-height:50px;
  margin-left:20px
}
ul li{
  padding:0;
  margin:0;
  list-style:none
}
ul{
  padding-top: 20px;
}
li{
  font-size:16px;
  min-height:28px;
  line-height:28px;
  font-weight: 500;
  color:rgba(142,142,142,1)
}
.delete_icon{
  cursor: pointer;
  padding:20px;
  color:rgba(142,142,142,1);
  font-size: 30px;
  position: absolute;
  bottom:0;
  right: 0;
}
.el-select-dropdown .el-select-dropdown__item{
  padding-left: 0 !important;
  text-align: center
}
</style>
<style>
.top-show1 .el-input__inner{
  background:rgba(244,244,244,1);
}
.top-show1 .search input{
  font-size:14px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:#6C7180;
}
.top-show1 .search .el-input__suffix{
  cursor:pointer;
  right: 0;
  /* min-width:66px; */
  min-width: 15.38%;
  background: rgba(6,124,255,1)
}
.top-show1 .search .el-input__suffix .searchclass{
  padding:10px 30px;text-align:center;line-height:41px;height:41px
}
.top-show1 .search .el-input__suffix .searchclass .el-icon-search{
  font-weight: 900;
  color:#fff !important
}
/* 单选框 */
.modelState1 .el-radio__inner{
  width: 24px;
  height: 24px;
}
.modelState1 .el-radio__input.is-checked .el-radio__inner::after {
  transform: rotate(45deg) scaleY(1) !important;
}
.modelState1 .el-radio__inner::after {
  box-sizing: content-box;
  content: "";
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 14px;
  left: 7px;
  position: absolute;
  top: 1px;
  transform: rotate(45deg) scaleY(0);
  width: 6px;
  transition: transform .15s ease-in .05s;
  transform-origin: center;
  border-radius: 0;
  background-color: #409EFF;
}
</style>
