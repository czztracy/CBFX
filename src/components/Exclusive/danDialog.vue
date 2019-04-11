/*
 * @Page: 模糊查询,弹窗单选
 * @Author: cls
 * @Date: 2018-12-18 12:20:03
 * @Last Modified by: cls
 */
<template>
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
        background
        layout="prev, next"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- checkBox渲染部分 -->
    <div class="content-middle">
      <el-radio-group v-model="tochild.checkedCities">
        <el-row>
          <el-col v-for="(item, index) in searchbox.gridData" :key="index" :span="8">
            <!-- 历史报价单 -->
            <el-radio v-if="searchbox.searchJian === 'historyDan'" :label="item.module_describe" :name="item.report_id"/>
          </el-col>
        </el-row>
      </el-radio-group>
    </div>
    <div class="search-sure">
      <el-button
        type="primary"
        @click="searchSure(searchbox.searchJian)"
      >{{ $t('buttonGroup.confirm') }}</el-button>
    </div>
  </el-dialog>
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
        checkedCities: '',
        inputValue: ''
      }
    }
  },
  computed: {
    // 弹窗名称
    searchTitleS() {
      return this.$store.getters.dialogTitle
    }
  },
  watch: {
    // getters 下弹窗名称监听
    searchTitleS(val) {
      this.searchTitle = val
    },
    // 模糊查询
    searchVal(val) {
      this.tochild.checkedCities = ''
      // this.store = []
      if (val || val === '') {
        this.newArr = this.searchbox.gridData.filter((item, index) => {
          return (
            (item.supplierName + '').indexOf(val) !== -1 || (item.name + '').indexOf(val) !== -1 || (item.supplierCode + '').indexOf(val) !== -1 || (item.manager + '').indexOf(val) !== -1 || (item.moduleCode + '').indexOf(val) !== -1 || (item.categoryCn + '').indexOf(val) !== -1 || (item.demandscCode + '').indexOf(val) !== -1 || (item.demandCode + '').indexOf(val) !== -1 || (item.userCode + '').indexOf(val) !== -1
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
    this.$nextTick(() => { })
  },
  methods: {
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
      // this.tochild.checkedCities = []
      if (val || val === '') {
        // 过滤筛选
        this.searchbox.gridData = this.searchbox.Arr.filter((item, index) => {
          return (
            (item.supplierName + '').indexOf(val) !== -1 || (item.name + '').indexOf(val) !== -1 || (item.supplierCode + '').indexOf(val) !== -1 || (item.manager + '').indexOf(val) !== -1 || (item.moduleCode + '').indexOf(val) !== -1 || (item.categoryCn + '').indexOf(val) !== -1 || (item.demandscCode + '').indexOf(val) !== -1 || (item.demandCode + '').indexOf(val) !== -1 || (item.userCode + '').indexOf(val) !== -1
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
      console.log(res)
      this.searchbox.dialogTableVisible = false
      this.tochild.inputValue = res
      this.$emit('tolistenChild', this.tochild)
      // this.$emit('searchChoose', this.checkedCities)
      this.tochild.checkedCities = ''
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
.el-dialog .title-top {
  text-align: right;
  margin-bottom: 2%;
  padding: 30px;
  position: relative;
}
.el-dialog .title-top > span {
  margin: 0 1.2%;
}
.el-dialog .title-top span:nth-child(2) {
  margin-right: 90px;
}
.search-dialog-box span,
.search-dialog-box em {
  font-style: normal;
  font-size: 14px;
}
</style>
<style>
.el-dialog .title-top .el-pagination {
  display: inline-block;
  overflow: hidden;
  margin-top: 0;
  position: absolute;
  right: 2%;
  top: 20px;
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
