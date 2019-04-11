/*
 * @Page: 报价管理-> 物料号维度 -> 历史记录弹框
 * @Author: zp
 * @Date: 2018-11
 * @Last Modified by: zp
 */
<template>
  <el-dialog
    :visible.sync="historybox.dialogTableVisible"
    :title="$t('specialNumberDimension.history')"
    class="dialog-box1"
  >
    <div class="title-top">
      <span>
        {{ $t('specialNumberDimension.total') }}
        <em
          style="color: #4A90E2;"
        >{{ historybox.historyTotal }}</em>
        {{ $t('specialNumberDimension.record') }}
      </span>
      <span>
        <em style="color: #4A90E2;">{{ historybox.historyPage }}</em>
        /{{ historyTotalPage }}
      </span>
      <el-pagination
        :total="historybox.historyTotal"
        :page-size="10"
        :current-page="historybox.historyPage"
        background
        layout="prev, next"
        style = "display: inline-block"
        @current-change="handleCurrentChange"
      />

      <!-- <el-button-group>
        <el-button
          :disabled="historybox.historyPrev"
          type="primary"
          icon="el-icon-arrow-left"
          plain
          size="mini"
          @click="historyP"
        />
        <el-button
          :disabled="historybox.historyNext"
          type="primary"
          icon="el-icon-arrow-right"
          plain
          size="mini"
          @click="historyN"
        />
      </el-button-group> -->
    </div>
    <el-table
      v-loading="historybox.loading"
      :data="historybox.gridData"
      :header-cell-style="{'text-align': 'center'}"
      :cell-style="{'text-align': 'center'}"
      stripe
    >

      <el-table-column :label="$t('specialNumberDimension.serial')" type="index" />
      <el-table-column :label="$t('specialNumberDimension.categoryCode')" property="moduleCode"/>
      <el-table-column :label="$t('specialNumberDimension.supplier')" property="supplierName"/>
      <el-table-column :label="$t('specialNumberDimension.returnPeople')" property="userName"/>
      <el-table-column :label="$t('specialNumberDimension.returnDate')" property="time"/>
      <el-table-column :label="$t('specialNumberDimension.dateCompleted')" property="updateDate"/>
      <el-table-column :label="$t('specialNumberDimension.returnReason')" property="suggestion"/>
      <el-table-column :label="$t('specialNumberDimension.handle')" property="type">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="historyLook(scope.row)">
            <i class="fa fa-search"/>
            {{ $t('specialNumberDimension.look') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default {
  name: 'HistoryBox',
  props: {
    historybox: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    // 历史记录弹框总页数
    historyTotalPage() {
      if (this.historybox.historyTotal === 0) {
        return 1
      } else {
        return Math.ceil(this.historybox.historyTotal / this.historybox.historyPageNo)
      }
    }
  },
  watch: {
    historybox: {
      handler(newVal, oldVal) {
        if (newVal.dialogTableVisible === false) {
          this.historybox.historyPage = 1
          console.log(this.historybox)
        }
      },
      deep: true
    }
  },
  mounted() {
    // console.log(this.historybox)
  },
  methods: {
    // // 历史记录弹框中的点击上页
    // historyP() {
    //   if (this.historybox.historyPage >= 2) {
    //     this.historybox.historyPage--
    //     // console.log('---')
    //     this.$emit('refresh', this.historybox.reportId)
    //     this.historybox.historyPrev = false
    //     this.historybox.historyNext = false
    //     if (this.historybox.historyPage === 1) {
    //       this.historybox.historyPrev = true
    //       this.historybox.historyNext = false
    //     }
    //   } else {
    //     this.historybox.historyPage = 1
    //     this.historybox.historyPrev = true
    //     this.historybox.historyNext = false
    //   }
    //   // console.log(this.historybox.historyPage)
    // },
    // // 历史记录弹框中的点击下页
    // historyN() {
    //   if (this.historybox.historyPage > this.historyTotalPage - 1) {
    //     this.historybox.historyPage = this.historyTotalPage
    //     this.historybox.historyNext = true
    //     this.historybox.historyPrev = false
    //   } else {
    //     this.historybox.historyPage++
    //     // console.log('+++', this.historybox)
    //     this.$emit('refresh', this.historybox.reportId)
    //     this.historybox.historyNext = false
    //     this.historybox.historyPrev = false
    //     if (this.historybox.historyPage === this.historyTotalPage) {
    //       this.historybox.historyNext = true
    //       this.historybox.historyPrev = false
    //     }
    //   }
    //   // console.log(this.historybox.historyPage)
    // },
    // 点击历史记录弹框中的查看
    historyLook(row) {
      this.$emit('seeDialog', row)
      // console.log(row)
    },
    handleCurrentChange(val) {
      this.historybox.historyPage = val
      console.log('val', val)
      this.$emit('refresh', this.historybox.reportId)
    }
  }
}
</script>

<style scoped>
/* 历史记录弹框 */
.el-dialog .title-top {
  text-align: right;
  margin-bottom: 2%;
}
.dialog-box1 .el-dialog .title-top .el-pagination{
  overflow:inherit;
  position: static
}
.dialog-box1 .el-dialog .title-top {
  height:30px;
  line-height:30px
}
.el-dialog .title-top > span {
  margin: 0 1.2%;
}
.dialog-box1 span,
.dialog-box1 em {
  font-style: normal;
  font-size: 14px;
}
</style>
<style>
/* 历史记录弹框 */
.dialog-box1 .el-dialog__header {
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
.dialog-box1 .el-dialog__title,
.dialog-box1 .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
</style>
