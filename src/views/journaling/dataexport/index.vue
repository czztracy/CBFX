
/*
 * @Page: 报表中心->数据导出布局页
 * @Author: cong
 * @Date: 2018-12-11 14:20:34
 * @Last Modified by: cong
 */

<template>
  <el-container>
    <el-aside width="224px">
      <Tree @checkChange="fromChild"/>
    </el-aside>
    <el-main class="dataBox">
      <div class="dataOut">
        <!-- 筛选条件 -->
        <el-form :inline="true" :model="searchData" class="search">
          <el-form-item class="select">
            <!-- <el-select v-model="searchData.select">
              <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"/>
            </el-select> -->
            <el-input v-model="search" placeholder="请输入物料号"/>
          </el-form-item>
          <el-form-item :label="$t('dataexport.date')" class="date">
            <el-date-picker v-model="searchData.date" type="daterange" range-separator="—"/>
          </el-form-item>
          <el-form-item class="check">
            <el-checkbox v-model="searchData.check">{{ $t('dataexport.latestData') }}</el-checkbox>
          </el-form-item>
        </el-form>
        <!-- 数据表格 -->
        <el-table :data="searchNumber" stripe class="table-style3" style="width:100%" @selection-change="handleSelectionChange">
          <!-- <el-table-column :label="$t('dataexport.mainMaterialCost')"> -->
          <el-table-column :render-header="renderHeader" :label="$t('demandNoResolve.reqDescW')" prop="describe" class="lala">
            <template slot-scope="scope">{{ scope.row.describe }}</template>
          </el-table-column>
          <el-table-column :render-header="renderHeader" :label="$t('dataexport.brand')" prop="brand"/>
          <el-table-column :render-header="renderHeader" :label="$t('dataexport.model')" prop="model"/>
          <el-table-column :render-header="renderHeader" :label="$t('dataexport.wireColor')" prop="wireColor"/>
          <el-table-column :render-header="renderHeader" :label="$t('dataexport.material')" prop="material"/>
          <!-- <el-table-column :label="$t('dataexport.auxiliary')">
            <el-table-column :render-header="renderHeader" :label="$t('demandNoResolve.reqDescW')" prop="describe"/>
            <el-table-column :render-header="renderHeader" :label="$t('dataexport.brand')" prop="brand"/>
            <el-table-column :render-header="renderHeader" :label="$t('dataexport.model')" prop="model"/>
            <el-table-column :render-header="renderHeader" :label="$t('dataexport.wireColor')" prop="wireColor"/>
            <el-table-column :render-header="renderHeader" :label="$t('dataexport.material')" prop="material"/>
          </el-table-column> -->
        </el-table>
        <!-- 操作按钮 -->
        <div class="operate">
          <el-button type="primary" @click="dataExport()">{{ $t('dataexport.export') }}</el-button>
          <!-- <el-button type="primary" plain @click="reset()">{{ $t('dataexport.resetting') }}</el-button> -->
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import Tree from '@/views/journaling/components/tree'
export default {
  name: 'Dataexport',
  components: {
    Tree
  },
  data() {
    return {
      newArr: [],
      // 物料号输入框value值
      search: '',
      // 查询条件
      searchData: {
        select: '1', // 查询下拉
        date: '', // 日期
        check: '' // 最新数据
      },
      // 表格数据
      dataOut: [
        {
          materialNumber: 1,
          describe: '传感器1',
          brand: '海达源',
          model: 'A',
          wireColor: '黑色',
          material: '塑料'
        },
        {
          materialNumber: 2,
          describe: '传感器1',
          brand: '海达源',
          model: 'A',
          wireColor: '黑色',
          material: '塑料'
        },
        {
          materialNumber: 3,
          describe: '传感器1',
          brand: '海达源',
          model: 'A',
          wireColor: '黑色',
          material: '塑料'
        }
      ],
      // 查询下拉框
      options: [
        {
          code: '1',
          name: '物料号'
        }
      ]
      // resetting: true // 重置标记
    }
  },
  computed: {
    // 物料号模糊匹配
    searchNumber() {
      const search = this.search
      if (search) {
        return this.dataOut.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.dataOut
    }
  },
  watch: {
    // search(val, oldVal) {
    //   this.dataOut = this.dataOut.filter(item => (~item.describe.indexOf(val)))
    // }
  },
  methods: {
    click1(column, event) {
      console.log(column, event, 99)
    },
    // 导出
    dataExport() {},
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val, 333)
    },
    renderHeader(h, { column, $index }) {
      return h('div',
        [
          h('el-checkbox', {
            style: 'margin-right:8px',
            props: {
              value: this.value
            },
            on: { // self.$emit('input', event.target.value)
              input: value => {
                console.log(column, $index, 44444444444)
                this.$emit('updateparam', value)
              }
              // click: () => {
              //   console.log(column, 111)
              // }
              // change: () => {
              //   this.selects()
              // }
            }
          }),
          h('span', column.label)
        ],
      )
    },
    fromChild(data, checked, id) {
      console.log(data, checked, '子组件传过来的数据')
      this.dataOut = this.dataOut.concat(data)
      this.dataOut = [...new Set(this.dataOut)]
      console.log(this.dataOut, '当前父组件的数组')
      if (checked === false) {
        for (let i = 0, length = this.dataOut.length; i < length; i++) {
          for (let j = 0, length2 = data.length; j < length2; j++) {
            if (this.dataOut[i].materialNumber === data[j].materialNumber) {
              this.dataOut.splice(i, 1)
            }
          }
        }
      }
    }
    // selects(data) {
    //   console.log(data)
    // }
  }
}
</script>

<style scoped>
span {
  display: inline-block;
}
/* 整个盒子 */
.dataOut {
  padding: 24px 1.62% 20px;
  border-radius:3px;
  border:1px solid rgba(209,209,209,1);
  background: #fff
}
/* 筛选样式 */
.select{
  width: 10.94%;
  margin-right: 3.53%
}
.date{
  width: 33.19%;
  margin-right: 6.266%;
  white-space: nowrap !important
}
/* 按钮操作 */
.operate{
  text-align: center;
}
</style>
<style>
/* 表格调整 */
.dataOut .table-style3{
  margin-bottom:32px;
  border:0;
  min-height: calc(100vh - 355px);
}
.dataOut .table-style3::after{
  display:none
}
.dataOut .table-style3 th{
  padding:5px 0;
  border-left:1px solid rgba(120,151,161,0.29)
}
.dataOut .el-table--border th,.dataOut .el-table__fixed-right-patch{
  border-color:rgba(120,151,161,0.29)
}
.dataOut .el-table--border td,.dataOut .el-table--border th,.dataOut .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
  border-right:0
}
.dataOut .el-table .cell,.dataOut .el-table th div{
  padding: 0 0 !important
}
.dataOut .el-table th div{
  line-height:0;
}
.dataOut .el-table thead tr:first-child th div{
  line-height:15px;
}
.dataOut .el-table td{
  padding:9px 0;
}
/* 筛选样式 */
.dataOut .date .el-form-item__content{
  width: 85.42%;
}
.dataOut .el-range-editor.el-input__inner{
  width:100%
}
.dataOut .el-checkbox__label{
  font-weight: bold
}
.dataOut .el-form--inline .el-form-item__label{
  font-weight: inherit
}
.dataOut .el-form-item{
  margin-bottom:16px
}
/* 输入框背景颜色 */
.dataOut .el-input__inner,.dataOut .el-range-editor .el-range-input{
  background: rgba(249, 249, 249, 1);
}
.dataOut .el-icon-date:before{
    color: #000;
}
/* 按钮 */
.dataOut .el-button--primary{
  width:19%;
  font-size:18px
}
.dataOut .el-button--primary.is-plain{
  margin-left:2.2%
}
.dataBox{
  background: #f4f4f4
}
</style>
