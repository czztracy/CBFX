/*
 * @Page: 财务数据维护
 * @Author: cong
 * @Date: 2019-01-08 13:56:30
 * @Last Modified by: wangyadi
 */
<template>
  <div v-loading="loading" class="financialInfo">
    <el-form ref="ruleForm" :model="form" :rules="rules" class="demo-form-inline">
      <el-form-item label="">
        <table cellspacing="0" cellpadding="0">
          <tr>
            <th>
              <div class="theader">
                <div class="out">
                  <span class="thtop">{{ $t('financialInfo.project') }}</span>
                  <span class="thbottom">{{ $t('financialInfo.date') }}</span>
                </div>
              </div>
            </th>
            <th>{{ $t('financialInfo.lendingRate') }}</th>
            <th>{{ $t('financialInfo.discountRate') }}</th>
            <th>{{ $t('financialInfo.operation') }}</th>
          </tr>
          <tr>
            <td class="time">{{ time }}</td>
            <td class="percent">
              <el-form-item prop="discountRate2">
                <el-input v-model="form.discountRate" :placeholder="$t('financialInfo.msg1')">
                  <div slot="append">%</div>
                </el-input>
              </el-form-item>
            </td>
            <td class="percent">
              <el-form-item prop="loan">
                <el-input v-model="form.loan" :placeholder="$t('financialInfo.msg2')">
                  <div slot="append">%</div>
                </el-input>
              </el-form-item>
            </td>
            <td style="text-align:center">
              <el-button type="primary" class="mybtn" @click="add">{{ $t('buttonGroup.save') }}</el-button>
            </td>
          </tr>
        </table>
      </el-form-item>
    </el-form>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('financialInfo.lendingRate2')||$t('financialInfo.discountRate2')" name="first">
        <div class="title">{{ $t('financialInfo.lendingRate2') }}</div>
        <el-table :data="lendingRate" :span-method="objectSpanMethod" border class="table-style2">
          <el-table-column :label="$t('financialInfo.termOfPayment')" prop="name" width="180" />
          <el-table-column :label="$t('financialInfo.date')" prop="days" />
          <el-table-column :label="$t('financialInfo.lendingRate2')" prop="lendingRate" />
        </el-table>
        <div class="title">{{ $t('financialInfo.discountRate2') }}</div>
        <el-table :data="discountRate" :span-method="objectSpanMethod" border class="table-style2">
          <el-table-column :label="$t('financialInfo.termOfPayment')" prop="name" width="180" />
          <el-table-column :label="$t('financialInfo.date')" prop="months" />
          <el-table-column :label="$t('financialInfo.discountRate2')" prop="discount_rate" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('financialInfo.historicalRecord')" name="second">
        <el-table :data="historyRate" border class="table-style2">
          <el-table-column :label="$t('financialInfo.effectiveTime')" prop="timer"/>
          <el-table-column :label="$t('financialInfo.lendingRate2')" prop="discountRate">
            <template slot-scope="scope">
              {{ scope.row.discountRate + '%' }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('financialInfo.discountRate2')" prop="lendingRate">
            <template slot-scope="scope">
              {{ scope.row.lendingRate + '%' }}
            </template>
          </el-table-column>
        </el-table>
        <div class="my-page">
          <el-pagination ref="PAGE" :current-page.sync="form.pageNo" :page-size="form.pageSize" :total="tableNum" :prev-text="$t('demandForFiltering.previousPage')" :next-text="$t('demandForFiltering.nextPage')" background class="paging" layout="prev, pager, next, jumper" @current-change="handleCurrentChange" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { addBtn } from '@/api/financialInfo'
export default {
  name: '',
  data() {
    var validateDiscountRate = (rule, value, callback) => {
      const regExp = /^(\d{1,2}(\.\d{1,3})?|100)$/
      if (!regExp.test(value)) {
        callback(new Error('请输入0-100的数字'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        loan: '',
        discountRate: '',
        pageSize: 10, // 每页条数
        pageNo: 1 // 页码
      },
      tableNum: 0,
      time: '',
      activeName: 'first',
      discountRate: [], // 贴现率
      lendingRate: [], // 贷款利率
      historyRate: [], // 历史数据
      rules: {
        discountRate: {
          validator: validateDiscountRate, trigger: 'blur'
        },
        loan: {
          validator: validateDiscountRate, trigger: 'blur'
        }
      }
    }
  },
  created() {
    this.loading = false
    const date = new Date()
    const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
    let months = Number(date.getMonth()) + 1
    months = (months >= 10 ? months : '0' + months)
    this.time = date.getFullYear() + '.' + months + '.' + day
    this.myInterface({})
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 12 === 0) {
          return {
            rowspan: 12,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    add() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const params = {
            discountRate: this.form.discountRate,
            lendingRate: this.form.loan
          }
          if (this.form.discountRate !== '' && this.form.loan !== '') {
            this.myInterface(params)
          } else if (this.form.discountRate === '') {
            this.$message({
              message: '贷款利率不能为空',
              type: 'error'
            })
          } else if (this.form.loan === '') {
            this.$message({
              message: '贴现率为空',
              type: 'error'
            })
          }
          this.form = {
            loan: '',
            discountRate: ''
          }
          this.$refs['ruleForm'].resetFields()
        }
      })
    },
    myInterface(params) {
      this.loading = true
      addBtn(params)
        .then(res => {
          const discountRate = res.resultData.discountRate
          const lendingRate = res.resultData.lendingRate
          const historyRate = []
          res.resultData.historyRate.historyRateList.forEach(element => {
            if (!element.endTime) {
              element.endTime = '至今'
            }
            const temp = {
              discountRate: element.discountRate,
              lendingRate: element.lendingRate,
              timer: element.startTime + '--' + element.endTime
            }
            historyRate.push(temp)
          })
          this.tableNum = res.resultData.historyRate.count
          if (res.success) {
            // console.log(res)
            this.discountRate = discountRate
            this.discountRate[0].name = '承兑期限（月）'
            this.lendingRate = lendingRate
            this.lendingRate[0].name = '付款条件（天）'
            this.historyRate = historyRate
            this.loading = false
          } else {
            this.$message({
              message: res.errorMsg,
              type: 'error'
            })
          }
        }).catch(err => {
          this.loading = false
          console.log(err)
          this.$message({
            message: '数据请求失败',
            type: 'error'
          })
        })
    },
    handleCurrentChange(val) {
      const params = {
        pageNo: val
      }
      this.myInterface(params)
    }
  }
}
</script>

<style lang="scss">
.financialInfo {
  padding: 20px;
  width: 80%;
  margin: auto;
  .el-form {
    .el-input__inner {
      border: 1px solid transparent;
    }
    // border-bottom: 2px solid #409eff;
    table {
      width: 100%;
      margin-bottom: 20px;
      th {
        width: 300px;
        background: rgb(245, 247, 250);
        border-left: 1px solid #eee;
        border-bottom: 2px solid #7897a1;
      }
      td {
        border: 1px solid #eee;
      }
      .time {
        text-align: center;
      }
      .theader {
        line-height: 4em;
        width: 300px;
        height: 50px;
        .out {
          border-top: 3.6em rgb(245, 247, 250) solid; /*上边框宽度等于表格第一行行高*/
          border-left: 300px #fff solid; /*左边框宽度等于表格第一行第一格宽度*/
          position: relative; /*让里面的两个子容器绝对定位*/
          color: #444;
          .thtop {
            font-style: normal;
            display: block;
            position: absolute;
            top: -4em;
            left: -200px;
            width: 300px;
          }
          .thbottom {
            font-style: normal;
            display: block;
            position: absolute;
            top: -46px;
            left: -390px;
            width: 300px;
          }
        }
      }
    }
    .mybtn {
      width: 150px;
      margin: 10px auto;
    }
  }
  .title {
    width: 100%;
    text-align: center;
    font-weight: bolder;
    margin: 20px auto;
  }
  .el-table {
    text-align: center;
    width: 100%;
    margin-top: 20px;
    margin: auto;
    th {
      text-align: center;
      background: rgb(245, 247, 250);
    }
  }
  .el-tabs {
    margin: auto;
    .el-tabs__nav {
      width: 100%;
      .el-tabs__item {
        width: 50%;
        text-align: center;
      }
    }
  }
  .my-page {
    text-align: center;
    margin: 20px auto;
  }
  .percent{
    .el-input-group__append{
      border: none;
      background: #ffffff;
    }
    .el-form-item__error{
      padding-top: 25px;
    }
  }
}
</style>
