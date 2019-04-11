/*
 * @Page: 供应商弹窗
 * @Author: csg
 * @Date: 2019-01-21 19:33:10
 * @Last Modified by: csg
 */
<template>
  <el-dialog
    :title="searchTitle"
    :visible.sync="supplierDialogData.dialogVisible"
    class="search-dialog-box"
  >
    <div class="input-suffix">
      <span style="margin-right: 10px;">{{ $t('specialNumberDimension.searchCondition') }}</span>
      <el-input v-model="supplierValue" placeholder="请输入内容" style="width: 50%;">
        <span slot="suffix" class="pic" @click="findData()">
          <img src="@/assets/index/images/magnify.png" alt>
        </span>
      </el-input>
    </div>
    <div class="title-top">
      <span>
        {{ $t('specialNumberDimension.total') }}
        <em style="color: #4A90E2;">{{ supplierSum }}</em>
        {{ $t('specialNumberDimension.record') }}
      </span>
      <span>
        <em style="color: #4A90E2;">{{ searchPage }}</em>
        / {{ CurrentNumber }}
      </span>
      <el-pagination
        :total="supplierSum"
        :page-size="pageSize"
        background
        layout="prev, next"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- checkBox渲染部分 -->
    <div class="content-middle">
      <el-checkbox-group v-model="tochild.checkList">
        <el-row>
          <el-col v-for="(item, index) in checkData" :key="index" :span="8">
            <!-- 供应商名称 -->
            <el-checkbox
              v-if="supplierDialogData.identification === 'supplierName'"
              :label="item.coporation"
            />
            <!-- 供应商编码 -->
            <el-checkbox
              v-if="supplierDialogData.identification === 'supplierCode'"
              :label="item.supplierCode"
            />
          </el-col>
        </el-row>
      </el-checkbox-group>
    </div>

    <div class="search-sure">
      <el-button type="primary" @click="supplierSure">{{ $t('buttonGroup.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'SupplierDialogData',
  props: {
    supplierDialogData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 弹窗所搜v-model
      supplierValue: '',
      // 弹窗标题 中英文切换
      searchTitle: '',
      tochild: {
        // 多选监听
        checkList: []
      },
      // 多选data
      checkData: [],
      // 搜索弹框当前页数
      searchPage: 1,
      // 每页显示多少条
      pageSize: 9,
      // 总页数
      supplierSum: 0,
      // 共多少页
      CurrentNumber: 0,
      // 中间承接数组
      Arr: [],
      checked: false
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
    supplierDialogData: {
      handler(newValue, oldValue) {
        // 回显问题 选中的check
        this.tochild.checkList = this.supplierDialogData.arrCheck
        console.log(newValue)
      },
      deep: true
    }
  },
  mounted() {

  },
  methods: {
    // 弹窗中放大镜查询按钮
    findData() {
      // 参数
      const params = {
        corporation: this.supplierValue
      }
      // 请求地址
      const url = 'http://dbs.haier.net/api/company/findByCorporationForDBS'
      this.$axios({ method: 'post', params, url }).then(res => {
        // 总条数
        this.supplierSum = res.data.result.length
        // check总数居
        this.checkData = res.data.result
        // 总页数
        this.CurrentNumber = Math.ceil(res.data.result.length / this.pageSize)
        // 承接数据
        this.Arr = res.data.result
        // 第一页数据
        this.checkData = this.checkData.slice(0, this.pageSize)
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 分页触发时
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.tabs(val)
    },
    // 分页数据
    tabs(pageNo) {
      // 当前页
      this.searchPage = pageNo
      this.checkData = this.Arr.slice((pageNo - 1) * this.pageSize, pageNo * this.pageSize)
    },
    // 确定选择按钮
    supplierSure() {
      // 关闭弹窗
      this.supplierDialogData.dialogVisible = false
      // 给父组件的数据
      this.$emit('listenSupplier', this.tochild)
      // 清空数据
      this.tochild.checkList = []
    }
  },
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
