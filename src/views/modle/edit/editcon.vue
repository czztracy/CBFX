/*
 * @Page: 模版管理->模版编辑内容
 * @Author: 孙中超
 * @Date: 2018-12-11 14:22:14
 * @Last Modified by: 孙中超
 */
<template>
  <div class="box clearfix">
    <div class = "show-box clearfix">
      <!--{{ $t('templateManager.editModel') }} -->
      <!-- 查询条件 -->
      <div class="top-show1">
        <el-button plain class="sort" @click="timeSort">{{ $t('myMessage.timeSequence') }}
          <span :class="sortTime"><span/><span/></span>
        </el-button>
        <!-- 优先设置 -->
        <span v-show ="categoryId !== ''">
          <el-button v-if="prioritySetting === false" plain class="sort sort2" @click="changeTrue">
            <!-- <img src="../../../assets/index/images/zhidingxian.png" alt=""> -->
            &emsp;{{ $t('templateManager.prioritySetting') }}
          </el-button>
          <el-button v-if="prioritySetting === true" :loading="upLoading" plain class="sort" @click="changeFalse">{{ $t('buttonGroup.confirm') }}</el-button>
        </span>
        <!-- <el-input v-model="news" placeholder="请输入要查找的模版关键字" suffix-icon="el-icon-search" class = "search" @blur="search"/> -->
        <el-input v-model="news" :placeholder="$t('templateManager.inputKey')" class = "search">
          <span slot="suffix" class="searchclass" @click="search">
            <i class="el-icon-search"/>
          </span>
        </el-input>

        <el-select v-model="value" :placeholder="$t('templateManager.allState')" clearable>
          <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code" style="padding-left:10px"/>
        </el-select>
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
            <!-- 单选置顶 -->
            <span v-if ="item.templateState==='0003' && prioritySetting===true" class="modelState1">
              <el-radio v-model="radio" :label="item.templateId" @change="topEventSelect(item,index)">&nbsp;</el-radio>
            </span>
            <!-- 置顶 -->
            <span v-if ="item.templateState==='0003' && item.runState === '0001' && categoryId !== ''" class="topLogo">
              {{ $t('templateManager.top') }}
            </span>
          </div>
          <div class="head">
            <span style = "cursor:pointer" @click="showTemplate(item)"><img src="../../../assets/index/images/power.png" alt="">
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
          <!-- <div class="test">
            <span class="moduleNumber">模块编号：</span><span>{{ item.moduleNumber }}</span>
          </div>
          <div class="test">
            <span class="creationTime">创建时间：</span><span>{{ item.creationTime }}</span>
          </div>
          <div class="test">
            <span class="usefulLife">有效期：</span><span>{{ item.usefulLife }}</span>
          </div>
          <div class="test">
            <span class="category">品类：</span><span>{{ item.category }}</span>
          </div>
          <div class="test">
            <span class="area">区域：</span><span>{{ item.area }}</span>
          </div> -->
        </div>
        <!-- <div style = "height:30px;float:left;width:100%">

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
        </div> -->
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
    <templateDialog :template-dialog="templateDialog"/>
  </div>
</template>
<script>
import { getTemplateList, getTemplate, updateTemplate, deleteTemplate } from '@/api/modle'
import { selects } from '@/api/requirements'
// 已审核模版弹窗
import templateDialog from '@/views/modle/components/templateDialog'
import { mapGetters } from 'vuex'
import { judgeUrl } from '@/utils/api'
export default {
  name: 'Edit',
  components: {
    templateDialog
  },
  props: {
    targetdata: {
      type: Object,
      required: true
    },
    loading1: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 拖动数据
      dragData: {},
      // 置顶 loading
      upLoading: false,
      // loading: true,
      // 已审核模版弹窗
      templateDialog: {
        // 弹框显示
        dialogTableVisible: false,
        // 弹出窗数据
        gridData: {}
      },
      emptyPage: false, // 空页面
      currentPage: 1, // 当前页
      pageSize: 6, // 每页条数
      categoryId: '', // 品类id
      type: '1', // 1是正序 2是倒序
      radio: '', // 置顶的模块编号
      templateDetail: { // 置顶模版信息
        // areaName: '', // 区域
        templateId: '', // 模板id
        templateName: '', // 模板名称
        templateScript: '', // 模板回显脚本
        templateState: '', // 模板状态
        templateVersionId: '' // 模板版本id
      },
      moduleNumber: '', // 确定置顶的编号
      topIndex: '', // 置顶的下标
      prioritySetting: false,
      news: '',
      sortTime: 'sortIcon big', // 时间排序样式控制
      options: [],
      // options: [{
      //   value: '0001',
      //   label: '未提交'
      // },
      // {
      //   value: '0002',
      //   label: '审批中'
      // },
      // {
      //   value: '0003',
      //   label: '已通过'
      // },
      // {
      //   value: '0004',
      //   label: '被驳回'
      // }],
      value: '', // 状态选中项
      total: 0, // 模版总量
      listData: [
        // {
        //   categoryCn: '电线', // 品类中文名称 category
        //   categoryEn: 'xianshu', // 品类英文名称
        //   createTime: '2018-12-21', // 创建时间 creationTime
        //   region: '1', // 区域 area
        //   templateId: 'HR181026154821313167360', // 模板idmoduleNumber
        //   templateName: '10', // 模板名称 moduleName
        //   templateState: '0003' // 模板状态 modelState
        // },

      ]
    }
  },
  computed: {
    ...mapGetters({ userCode: 'userCode' })
  },
  watch: {
    targetdata(cur, old) {
      // console.log('edition targetdata', this.targetdata)
      // const params = { templateId: cur.id }
      this.categoryId = cur.id
      this.initList()
    },
    // 状态监听
    value(cur, old) {
      this.currentPage = 1
      this.initList()
    }
  },
  created() {
    const params = {
      typeCodes: '029'

    }
    selects(params)
      .then(res => {
        this.options = res.resultData['029'].map(function(value, index, array) {
          if (value.code === '0001') {
            value.name = '未提交'
            return value
          } else if (value.code === '0002') {
            value.name = '审批中'
            return value
          } else if (value.code === '0003') {
            value.name = '已审核'
            return value
          } else if (value.code === '0004') {
            value.name = '被驳回'
            return value
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted() {
    this.initList()
  },
  methods: {
    // drag
    moveModel(item) {
      this.dragData = item
      console.log('拖动的模版信息', item)
    },
    drop(ev) {
      ev.preventDefault()
      console.log('拖动的模版信息', this.dragData, ev)
    },
    // 点击模版
    showTemplate(item) {
      // console.log('点击模版信息', item)
      //
      if (item.templateState !== '0003' && item.templateState !== '0002') {
        if (judgeUrl() !== '003') {
          this.$router.push({
            path: '/index2',
            query: {
              templateClassId: item.categoryId,
              templateId: item.templateId,
              templateVersionId: item.templateVersionId,
              templateName: item.templateName,
              // userCode: this.userCode,
              page: '2'
              // templateState: "0001",
            }
          })
          // this.$router.push({
          //   name: 'ModifyModle',
          //   params: {
          //     templateClassId: item.categoryId,
          //     templateId: item.templateId,
          //     templateVersionId: item.templateVersionId,
          //     // userCode: this.userCode,
          //     page: '2'
          //     // templateState: "0001",
          //   }
          // })
        } else {
          this.$router.push({
            path: '/index2',
            query: {
              templateClassId: item.categoryId,
              templateId: item.templateId,
              templateVersionId: item.templateVersionId,
              templateName: item.templateName,
              // userCode: this.userCode,
              page: '2'
              // templateState: "0001",
            }
          })
          // this.$router.push({
          //   name: 'ModifyModle',
          //   params: {
          //     templateClassId: item.categoryId,
          //     templateId: item.templateId,
          //     templateVersionId: item.templateVersionId,
          //     // userCode: this.userCode,
          //     page: '2'
          //     // templateState: "0001",
          //   }
          // })
        }
      } else {
        this.templateDialog.gridData = {
          templateClassId: item.categoryId,
          templateId: item.templateId,
          templateName: item.templateName,
          createTime: item.createTime,
          templateVersionId: item.templateVersionId
          // userCode: this.userCode
        }
        this.templateDialog.dialogTableVisible = true
        // console.log('弹窗')
      }
    },
    // json对象去空键值对
    deleteEmptyProperty(object) {
      for (var i in object) {
        var value = object[i]
        if (typeof value === 'object') {
          if (Array.isArray(value)) {
            if (value.length === 0) {
              delete object[i]
              continue
            }
          }
          this.deleteEmptyProperty(value)
          if (this.isEmpty(value)) {
            delete object[i]
          }
        } else {
          if (value === '' || value === null || value === undefined) {
            delete object[i]
          }
        }
      }
    },
    // 初始化
    initList() {
      this.loading1.loading = true
      var params = {
        categoryId: this.categoryId, // 品类id
        type: this.type, // 时间排序标识, 必填 1是正序 2是倒序
        templateName: this.news, // 模板名称,选填（模糊查询）
        templateState: this.value, // 模板状态
        // 品类名称 categoryCn (选填)
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.deleteEmptyProperty(params)
      getTemplateList(params).then(res => {
      // 列表数据 res
        if (res.resultData.count === 0) {
          this.emptyPage = true
        } else if (res.resultData.count !== 0) {
          this.emptyPage = false
        }
        if (res.resultData.count) {
          this.total = res.resultData.count
        } else {
          this.total = 0
        }
        this.listData = res.resultData.list
        this.loading1.loading = false
        // console.log('右侧模版列表初始化', res)
      }).catch(err => {
        this.loading1.loading = false
        console.log(err)
      })
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
    search() {
      this.currentPage = 1
      this.initList()
      // console.log('搜索框', this.news)
      // 查询
    },
    changeTrue() {
      this.prioritySetting = true
    },
    // 根据模版id获取详细信息getTemplate
    getTemplateDetail(id) {
      this.upLoading = true
      var params = { templateId: id }
      getTemplate(params).then(res => {
        this.templateDetail = res.resultData
        this.upLoading = false
        // console.log('模版详细信息', this.templateDetail)
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择置顶
    topEventSelect(item, index) {
      this.topIndex = index
      this.getTemplateDetail(this.radio)
      // console.log(23333, item, index)
    },
    // 确定置顶
    changeFalse() {
      if (this.topIndex !== '') {
        // var tmp = this.listData.splice(this.topIndex, 1)
        // this.listData.unshift(tmp[0])
        // console.log(this.listData)
        this.moduleNumber = this.radio
        // this.getTemplateDetail(this.radio)
        var data = {
          templateId: this.templateDetail.templateId, // 模板id
          categoryId: this.targetdata.id, // 品类id
          templateVersionId: this.templateDetail.templateVersionId, // 模板版本id
          templateName: this.templateDetail.templateName, // 模板名称
          // region: this.templateDetail.region,
          templateScript: this.templateDetail.templateScript, //
          // userCode: this.userCode,
          firstInstall: '1'
        }
        this.loading1.loading = true
        updateTemplate(data).then(res => {
          if (res.success === true) {
            this.$message({
              message: '置顶成功',
              type: 'success'
            })
          }
          this.initList()
        }).catch(err => {
          this.loading1.loading = false
          console.log(err)
        })
        // console.log('this.moduleNumber', this.moduleNumber, data)
        this.radio = ''
        this.topIndex = ''
      }
      this.prioritySetting = false
    },
    // 删除未提交、被驳回模版
    delectModel(item) {
      this.$confirm('此操作将永久删除该模版, 是否继续?', '提示').then(() => {
        // console.log('删除', item.templateId)
        var params = { templateId: item.templateId }
        deleteTemplate(params).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.loading1.count--
          }
          this.initList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页获取当前页
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
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
