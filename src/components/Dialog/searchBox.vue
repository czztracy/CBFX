/*
 * @Page: 模糊查询
 * @Author: csg
 * @Date: 2018-12-18 12:20:03
 * @Last Modified by: csg
 */
<template>
  <div class="dialogBox">
    <el-dialog
      :visible.sync="searchbox.dialogTableVisible"
      :title="searchTitle"
      class="search-dialog-box"
    >
      <div class="input-suffix">
        <span style="margin-right: 10px;">{{ $t('specialNumberDimension.searchCondition') }}</span>
        <el-input v-model="searchVal" placeholder="请输入内容" style="width: 50%;">
          <span slot="suffix" class="pic" @click="filterNode(searchVal)">
            <img src="@/assets/index/images/magnify.png" alt>
          </span>
        </el-input>
      </div>
      <!-- 可删除选中的tag(checkBox) -->
      <div class="selectedField">
        <el-tag
          v-for="tag in tochild.checkedCities"
          :key="tag"
          :disable-transitions="false"
          type="success"
          closable
          @close="handleClose(tag)">
          {{ tag }}
        </el-tag>
      </div>
      <div class="title-top">
        <span>
          {{ $t('specialNumberDimension.total') }}
          <em
            style="color: #4A90E2;"
          >{{ searchbox.searchTotal }}</em>
          {{ $t('specialNumberDimension.record') }}
        </span>
        <span>
          <em style="color: #4A90E2;">{{ searchbox.searchPage }}</em>
          /{{ searchbox.searchTotalPage }}
        </span>
        <el-pagination
          :total="searchbox.searchTotal"
          :page-size="searchbox.pageSize"
          :current-page="searchbox.searchPage"
          background
          layout="prev, next"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- checkBox渲染部分 -->
      <div class="content-middle">
        <el-checkbox-group v-model="tochild.checkedCities">
          <el-row>
            <el-col v-for="(item, index) in searchbox.gridData" :key="index" :span="8">
              <!-- 物料类别 -->
              <el-checkbox
                v-if="searchbox.searchJian === 'category' && item !== null"
                :label="item.categoryCn"
              />
              <!-- 供应商编号 -->
              <el-checkbox v-if="searchbox.searchJian === 'supplierCode'" :label="item.supplierCode"/>
              <!-- 供应商名称 -->
              <el-checkbox v-if="searchbox.searchJian === 'supplierName'" :label="item.supplierName"/>
              <!-- 物料号 -->
              <el-checkbox v-if="searchbox.searchJian === 'moduleCode'" :label="item.moduleCode"/>
              <!-- 过滤编号 -->
              <el-checkbox
                v-if="searchbox.searchJian === 'DemandCoding' && item !== null"
                :label="item.demandCode"
              />
              <!-- 任务人 -->
              <el-checkbox
                v-if="searchbox.searchJian === 'taskone'"
                :label="item.manager"
                :key="item.managerCode"
                @change="currentSelection(item.managerCode)"
              />
              <!-- 采购经理 -->
              <el-checkbox
                v-if="searchbox.searchJian === 'purchaseMan'"
                :label="item.manager"
              >{{ item.manager }}</el-checkbox>
              <!-- 过滤编号 -->
              <el-checkbox
                v-if="searchbox.searchJian === 'productLineStatus'"
                :label="item.demandscCode"
              />
              <!-- 设置人员 -->
              <el-checkbox v-if="searchbox.searchJian === 'purchase' && item !== null" :label="item.userName">{{ item.userName }}</el-checkbox>
              <!-- 报价管理->任务人 -->
              <el-checkbox
                v-if="searchbox.searchJian === 'taskMans' && item !== null"
                :label="item.manager"
              />
              <!-- 任务运行管理->任务人 -->
              <el-checkbox
                v-if="searchbox.searchJian === 'taskMan' && item !== null"
                :label="item.manager"
              >{{ item.manager }}</el-checkbox>
              <!-- 任务运行管理->物料号 -->
              <el-checkbox
                v-if="searchbox.searchJian === 'materialNumber' && item !== null"
                :label="item.module_code"
              >{{ item.module_code }}</el-checkbox>
              <!-- 任务运行管理->需求编码 -->
              <el-checkbox
                v-if="searchbox.searchJian === 'requirementCoding' && item !== null"
                :label="item.demand_code"
              >{{ item.demand_code }}</el-checkbox>
              <!-- 产业线 -->
              <el-checkbox
                v-if="searchbox.searchJian === 'getIndustry'"
                :label="item"
              >{{ item.industry_name }}</el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
      <div class="search-sure">
        <el-button
          type="primary"
          @click="searchSure(searchbox.searchJian)"
        >{{ $t('buttonGroup.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'SearchBox',
  props: {
    searchbox: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 搜索框输入内容
      searchVal: '',
      searchTitle: '查找',
      tochild: {
        checkedCities: [],
        inputValue: ''
      },
      currentManagerCode: [] // 当前选中的任务人编号
    }
  },
  computed: {
    // 弹窗名称
    searchTitleS() {
      return this.$store.getters.dialogTitle
    }
  },
  watch: {
    // 关闭弹窗时，搜索框中的值为空
    'searchbox.dialogTableVisible': function dialogTableVisible(val) {
      console.log(1111, this.searchbox.dialogTableVisible, val)
      if (val === true) {
        this.searchVal = ''
      } else if (val === false) {
        this.searchbox.searchPage = 1
      }
      // 回显问题 选中的check
      this.tochild.checkedCities = this.searchbox.checkList
      // this.$forceUpdate()
      console.log('1111111this.tochild.checkedCities', this.tochild.checkedCities)
    },
    // getters 下弹窗名称监听
    searchTitleS(val) {
      this.searchTitle = val
    },
    // 模糊查询
    searchVal(val) {
      // this.tochild.checkedCities = []
      // this.store = []
      if (val || val === '') {
        this.newArr = this.searchbox.gridData.filter((item, index) => {
          return (
            (item.supplierName + '').indexOf(val) !== -1 || (item.name + '').indexOf(val) !== -1 || (item.supplierCode + '').indexOf(val) !== -1 || (item.manager + '').indexOf(val) !== -1 || (item.moduleCode + '').indexOf(val) !== -1 || (item.categoryCn + '').indexOf(val) !== -1 || (item.demandscCode + '').indexOf(val) !== -1 || (item.demandCode + '').indexOf(val) !== -1 || (item.userName + '').indexOf(val) !== -1 || (item.manager + '').indexOf(val) !== -1 || (item.demand_code + '').indexOf(val) !== -1 || (item.materialNumber + '').indexOf(val) !== -1 || (item.industry_name + '').indexOf(val) !== -1 || (item.taskMans + '').indexOf(val) !== -1
          )
        })
      }
      this.$nextTick(() => {
        console.log(this.newArr)
      })
      // this.AllData = this.provision.length
      // this.getAllPage()
      // this.MhLoadData(this.pageNo)
    }
  },
  created() {
    // console.log(this.dialogTitle)
  },
  mounted() {
    // console.log(this.searchbox)
    this.$nextTick(() => {

    })
  },
  methods: {
    handleClose(tag) {
      this.tochild.checkedCities.splice(this.tochild.checkedCities.indexOf(tag), 1)
    },
    currentSelection(val) {
      this.currentManagerCode.push(val)
    },
    // 分页触发时
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.tabs(val)
    },
    // 分页数据
    tabs(pageNo) {
      // 当前页
      this.searchbox.searchPage = pageNo
      this.searchbox.gridData = this.searchbox.Arr.slice((pageNo - 1) * this.searchbox.pageSize, pageNo * this.searchbox.pageSize)
    },
    // 过滤按钮
    filterNode(val) {
      // 清空选中
      if (val || val === '') {
        // 过滤筛选
        this.searchbox.gridData = this.searchbox.Arr.filter((item, index) => {
          return (
            (item.supplierName + '').indexOf(val) !== -1 || (item.name + '').indexOf(val) !== -1 || (item.supplierCode + '').indexOf(val) !== -1 || (item.manager + '').indexOf(val) !== -1 || (item.moduleCode + '').indexOf(val) !== -1 || (item.categoryCn + '').indexOf(val) !== -1 || (item.demandscCode + '').indexOf(val) !== -1 || (item.demandCode + '').indexOf(val) !== -1 || (item.userName + '').indexOf(val) !== -1 || (item.manager + '').indexOf(val) !== -1 || (item.demand_code + '').indexOf(val) !== -1 || (item.materialNumber + '').indexOf(val) !== -1 || (item.industry_name + '').indexOf(val) !== -1 || (item.taskMans + '').indexOf(val) !== -1
          )
        })
        // 过滤后的总条数
        this.searchbox.searchTotal = this.searchbox.gridData.length
        // 过滤后总页数
        this.searchbox.searchTotalPage = Math.ceil(this.searchbox.gridData.length / this.searchbox.pageSize)
        // 过滤后分页
        this.searchbox.gridData = this.searchbox.gridData.slice(0, this.searchbox.pageSize)
        this.searchbox.searchPage = 1
      }
    },
    // 点击确定按钮
    searchSure(res) {
      console.log(this.tochild.checkedCities)
      this.searchbox.dialogTableVisible = false
      this.tochild.inputValue = res
      this.$emit('tolistenChild', this.tochild, this.currentManagerCode)
      this.tochild.checkedCities = []
      // this.tochild.checkedCities = this.searchbox.checkList
      // console.log(res)
    }
  }
}
</script>

<style scoped>
/* 搜索康 */
.search-dialog-box .input-suffix,
.search-dialog-box .search-sure {
  padding: 5% 0;
  background-color: #f5f3f3;
  text-align: center;
}
.search-dialog-box .input-suffix:hover {
  cursor: pointer;
}
/* 确定按钮 */
.search-dialog-box .search-sure {
  padding: 2.5% 0;
}
.search-dialog-box .search-sure .el-button {
  width: 20%;
}
/* 内容展示部分中间 */
.search-dialog-box .content-middle {
  padding: 0 30px 20px;
  text-align: center;
  font-size: 16px;
}
.search-dialog-box .content-middle .el-col {
  margin-bottom: 2%;
}
/* 历史记录弹框 */
.dialogBox .el-dialog .title-top {
  display: inline-block;
  text-align: right;
  margin-bottom: 2%;
  padding: 20px;
  padding-top: 30px;
  position: relative;
}
.el-dialog .title-top > span {
  /* margin: 0 1.2%; */
}
.el-dialog .title-top span:nth-child(2) {
  margin-right: 90px;
}
.search-dialog-box span,
.search-dialog-box em {
  font-style: normal;
  font-size: 14px;
}
/* 选中的tag 带有删除按钮 */
.selectedField{
    width: 62%;
    line-height: 76px;
    float: left;
    display: inline-block;
    margin-left: 10%;
    height: 66px;
    overflow-x: auto;
    /* padding-bottom: 10px; */
    overflow-y: hidden;
    white-space: nowrap;
}
/*滚动条整体样式 高宽分别对应横竖滚动条的尺寸*/
.selectedField::-webkit-scrollbar {
  width: 4px;
  height: 4px;
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
.dialogBox .el-dialog {
  min-width: 900px;
}
.selectedField .el-tag + .el-tag {
  margin-left: 10px;
}
.dialogBox .el-dialog .title-top .el-pagination {
  display: inline-block;
  overflow: hidden;
  margin-top: 0;
  position: absolute;
  top: 20px;
  right: 0;
}
/* 历史记录弹框 */
.search-dialog-box .el-dialog__header {
  background: -webkit-linear-gradient(
    360deg,
    #1990ea,
    #2ea1f8
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    360deg,
    #1990ea,
    #2ea1f8
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    360deg,
    #1990ea,
    #2ea1f8
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(360deg, #1990ea, #2ea1f8);
  /* 标准的语法 */
}
.search-dialog-box .el-dialog__title,
.search-dialog-box .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.search-dialog-box .el-dialog__body {
  padding: 0;
}
/* input搜索图标 */
.search-dialog-box .el-input__suffix {
  margin-top: 12px;
  margin-right: 10px;
}
.search-dialog-box .el-input--suffix .el-input__inner {
  box-shadow: 2px 2px 6px #cecece;
}
.content-middle .el-row {
  text-align: left;
  padding-left: 8%;
}
</style>
