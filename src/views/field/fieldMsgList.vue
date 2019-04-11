/*
 * @Page: 字段信息列表
 * @Author: zp
 * @Date: 2018-12
 * @Last Modified by: zp
 */
<template>
  <el-container>
    <!-- 导航切换修改 -->
    <el-aside
      style="border: 1px solid rgba(209, 209, 209, 1); border-bottom: 0; width: auto; min-width:280px;"
    >
      <Tree/>
    </el-aside>
    <el-main style="background: rgba(244, 244, 244, 1);">
      <!-- 字段信息列表 -->
      <div class="fieldMsgList">
        <h3 style="position: relative;">{{ $t('fieldInTheLibrary.fieldInformation') }}
          <!-- 下载按钮 -->
          <div v-show="fieldData" class="download-btn-group">
            <!-- <el-button @click="tableDownload"> -->
            <el-button @click="downLoad">
              <i class="fa fa-download"/>
              {{ $t('buttonGroup.exlUpload') }}
            </el-button>
          </div>
        </h3>

        <el-table :data="fieldData" stripe class="table-style1" style="width: 75%;">
          <el-table-column :label="$t('fieldInTheLibrary.number')" type="index"/>
          <el-table-column :label="$t('fieldInTheLibrary.fieldName')" prop="name"/>
          <el-table-column :label="$t('fieldInTheLibrary.required')" prop="state">
            <!-- <template slot-scope="scope">
              <span v-if="scope.row.required">{{ $t('fieldInTheLibrary.yes') }}</span>
              <span v-else>{{ $t('fieldInTheLibrary.no') }}</span>
            </template> -->
          </el-table-column>
          <el-table-column :label="$t('fieldInTheLibrary.fillInThePromptInformation')" prop="message"/>
          <el-table-column :label="$t('fieldInTheLibrary.type')" prop="type"/>
          <el-table-column :label="$t('fieldInTheLibrary.getTheWay')" prop="way"/>
        </el-table>
        <!-- 分页 -->
        <div style="text-align: center;margin-top: 7%;">
          <!-- <el-input v-model.number="pageSize" class="pageSizePer"/> -->
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[10,15,20,25,30]"
            :total="total"
            :pager-count="5"
            :prev-text="$t('demandForFiltering.previousPage')"
            :next-text="$t('demandForFiltering.nextPage')"
            class="paging"
            background
            layout="prev, pager, next, jumper,sizes"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
        <iframe name = "tempiframe" style="display:none"/>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import Language from '@/utils/language'
import { list } from '@/api/field'
import { FizelistToExcel } from '@/api/downloadurl'
import Tree from '@/views/field/field'
import Eventbus from '@/bus.js'
// import { mapGetters } from 'vuex'
// import { fieldList } from '@/api/requirements'
export default {
  name: 'FieldMsgList',
  components: {
    // FieldMsgList
    Tree
  },
  mixins: [Language],
  data() {
    return {
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页数据数量
      total: 1, // 总数据数量
      // 表格 样例数据
      fieldData: []
    }
  },
  computed: {
    // ...mapGetters(['fieBool'])
  },
  watch: {
    pageSize(val) {
      // this.getData()
    }
  },
  mounted() {
    this.getData()
    Eventbus.$on('total', (total) => {
      this.$nextTick(() => {
        this.getData()
      })
    })
  },
  methods: {
    // excel下载
    downLoad() {
      const params = {
        // 'excelName': '字段信息', // excel名称
        // 'keyName': ['num', 'name', 'state', 'message', 'type', 'way'],
        // 'headers': [
        //   {
        //     'headerOne': '序号',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '字段名称',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '是否必填',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '填写提示信息',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '类型',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '获取方式',
        //     'headerLast': []
        //   }
        // ],
        'fieldVo': {
          'pageNo': 1,
          'pageSize': 10000
        }
      }
      // window.open(FizelistToExcel(params))
      var a = document.createElement('a')
      var url = FizelistToExcel(params)
      document.body.appendChild(a)
      a.href = url
      // a.download = '2.xls'
      a.target = 'tempiframe'
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    },
    // 分页
    handleCurrentChange(val) {
      console.log('this.pageSize', this.pageSize)
      this.currentPage = val
      console.log('当前页数', this.currentPage)
      this.getData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log('当前条数', this.pageSize, this.currentPage)
      this.getData()
    },
    getData() {
      // const url = 'http://47.104.98.71:8780/costmanagement/field/list'
      const params = {
        pageSize: this.pageSize,
        pageNo: this.currentPage
      }
      list(params).then(
        res => {
          console.log('字段信息请求成功', res)
          this.fieldData = res.resultData.data
          this.total = res.resultData.count // 需要修改
          // Eventbus.$emit('total', this.total) // 事件总线
          console.log('this.fieldData', this.fieldData)
        }
      ).catch(res => {
        console.log('字段信息请求失败')
      })
    }
  }
}
</script>

<style>
.fieldMsgList {
  background-color: #fff;
  border: 1px solid #d1d1d1;
  margin: 1% 1% 0;
  height: 100%;
  overflow: auto;
}
.fieldMsgList h3 {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 30px 0;
}
.fieldMsgList .el-table {
  margin: 0 auto;
  padding-bottom: 3%;
  /* height: 500px; */
}
.fieldMsgList .pageSizePer {
  width: 50px;
  /* margin-left: 45% */
}
.fieldMsgList .el-pagination .el-select .el-input .el-input__inner{
  margin-top: 8px;
}
/* 下载按钮样式 */
.fieldMsgList .download-btn-group{
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 12.3%;
}
.fieldMsgList .el-button{
  border: 1px solid #4a90e2;
  color: #4a90e2;
}
.fieldMsgList .download-btn-group .i-center{
  display: inline-block;
  width: 1px;
  height: 27px;
  vertical-align: middle;
  margin-right: 30px;
  background: #979797;
}
.fieldMsgList .download-btn-group .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
