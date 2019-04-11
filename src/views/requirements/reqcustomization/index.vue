/*
 * @Page: 需求管理的需求定制
 * @Author: cong
 * @Date: 2018-11-28 10:32:15
 * @Last Modified by: cong
 */
<template>
  <div class="reqcustomization reusepage">
    <!-- 弹窗 -->
    <Dialog :searchbox="searchData" @tolistenChild="getChildData"/>
    <div v-loading="loading" class="reusepagecon">
      <!-- 搜索栏 -->
      <div v-show="searchbar" class="searchbar">
        <el-form ref="postForm" :model="postForm" :inline="true">
          <div class="fomer">
            <el-form-item :label="$t('reqcustomization.region')" class="selecter">
              <el-select v-model="postForm.region" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in regiondata"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求号码弹窗 -->
            <!-- <el-form-item :label="$t('reqcustomization.demandNum')" class="search-input">
              <cpm ref="childBusiness" :name="business"/>
            </el-form-item>-->
            <el-form-item :label="$t('reqcustomization.demandNum')" class="search-input">
              <el-input v-model="postForm.demandCode" :disabled="true">
                <img
                  slot="suffix"
                  src="../../../assets/index/images/searcho.png"
                  @click="findDemandFilter('1', $t('breakDown.DemandCoding'), 'DemandCoding', postForm.demandCode)"
                >
              </el-input>
            </el-form-item>

            <!-- <el-form-item :label="$t('reqcustomization.demandNum')" class="search-input">
              <el-input v-model="postForm.demandNum">
                <img slot="suffix" src="../../../assets/index/images/searcho.png" @click="handleOpen($t('Neednumberdimension.Taskone'))">
              </el-input>
            </el-form-item>-->
            <el-form-item :label="$t('reqcustomization.demandDec')" class="search-input">
              <el-input v-model="postForm.remarks"/>
            </el-form-item>
            <el-form-item :label="$t('reqcustomization.privateNum')" class="num-input">
              <el-input v-model="postForm.moduleCount"/>
            </el-form-item>
            <el-form-item :label="$t('reqcustomization.suppliersNum')" class="num-input">
              <el-input v-model="postForm.supplierCount"/>
            </el-form-item>
            <el-form-item :label="$t('reqcustomization.date')" class="timer">
              <el-date-picker
                v-model="date"
                :start-placeholder="$t('reqcustomization.startDate')"
                :end-placeholder="$t('reqcustomization.endDate')"
                type="daterange"
                range-separator="-"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item :label="$t('reqcustomization.state')" class="selecter towrowstate">
              <el-select v-model="postForm.state" multiple collapse-tags style="margin-left: 20px;">
                <el-option
                  v-for="item in state"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="btn">
            <el-button type="primary" @click="submitFormBon">{{ $t('buttonGroup.search') }}</el-button>
          </div>
        </el-form>
      </div>
      <div class="contentlist">
        <!-- 搜索栏伸缩按钮 -->
        <br>
        <!-- <el-button type="info" @click="searchbar = !searchbar">
          <i :class="[searchbar ? 'downer' : 'upper']" class="el-icon-arrow-up"/>
        </el-button> -->
        <div class="listcon">
          <!-- 新建按钮 -->
          <router-link to="reqcustomizationadd">
            <el-button type="primary" class="addbut">
              <i class="iconfont">&#xe62d;</i>
              {{ $t('buttonGroup.new') }}
            </el-button>
          </router-link>
          <!-- 表格 -->
          <el-table :data="tableData" stripe class="table-style1">
            <el-table-column :label="$t('reqcustomization.customer')" prop="customer"/>
            <el-table-column :label="$t('reqcustomization.region')" prop="region"/>
            <el-table-column :label="$t('reqcustomization.demandNum')" prop="demandCode"/>
            <el-table-column :label="$t('reqcustomization.demandDec')" prop="remarks"/>
            <el-table-column :label="$t('reqcustomization.privateNum')" prop="moduleCount"/>
            <el-table-column :label="$t('reqcustomization.suppliersNum')" prop="supplierCount"/>
            <el-table-column :label="$t('reqcustomization.releasetime')" prop="createTime"/>
            <el-table-column :label="$t('reqcustomization.state')" prop="state">
              <template slot-scope="scope">
                <!-- 0001未发布，0002已发布 -->
                <span
                  :class="[scope.row.state == '0001' ? 'stateinvalid' : 'statevalid']"
                  class="statebtn"
                  @click="toNew(scope)"
                >{{ scope.row.state == '0001' ? $t('reqcustomization.unpublished') : $t('reqcustomization.published') }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div id="page">
            <el-pagination
              ref="paging"
              :current-page.sync="currentPage3"
              :page-size="pageSize"
              :total="tatalNum"
              :pager-count="5"
              :prev-text="$t('demandForFiltering.previousPage')"
              :next-text="$t('demandForFiltering.nextPage')"
              background
              layout="prev, pager, next, jumper"
              class="paging"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Language from '@/utils/language'
import { flagFindData, searchDemandCustomList } from '@/api/requirements'
import { selects } from '@/api/requirements'
import Dialog from '@/components/Dialog/searchBox'
export default {
  name: 'Reqcustomization',
  components: { // 弹窗组件
    Dialog
  },
  mixins: [Language],
  data() {
    return {
      loading: true,
      // 弹窗组件任务场景传值
      business: this.$t('demandManagement.materialNumber'),
      // 搜索框弹框数据
      searchData: {
        // 查询的键名
        searchJian: '',
        // 弹框显示
        dialogTableVisible: false,
        // 搜索弹框当前页数
        searchPage: 1,
        // 搜索弹框中表格数据总数
        searchTotal: 1,
        // 循环的内容
        gridData: [],
        // TableName
        tableName: '',
        // 承接的数组
        Arr: [],
        // 每页显示的条数
        pageSize: 9,
        // 总页数
        searchTotalPage: 0,
        // 选中的
        checkList: []
      },
      searchbar: 'true', // 搜索框是否展开
      postForm: { // 表单数据
        region: '', // 区域
        demandCode: '', // 需求编码
        remarks: '', // 需求描述
        moduleCount: '', // 专用号数量
        supplierCount: '', // 供应商数量
        state: [] // 状态
      },
      date: [], // 设置日期
      regiondata: [],
      state: [
        // {
        //   value: '选项1',
        //   label: '选项1'
        // },
        // {
        //   value: '选项2',
        //   label: '选项2'
        // },
        // {
        //   value: '选项3',
        //   label: '选项3'
        // }
      ],
      tatalNum: 0, // 总条数
      pageSize: 10, // 每页条数
      currentPage3: 1, // 跳到第几页
      tableData: [
        // { customer: '', // 用户
        //   demandAnalysisId: '123',
        //   demandCode: '123', // 需求编码
        //   region: '123', // 区域
        //   remarks: '123', // 需求描述
        //   state: '123', // 定制需求状态
        //   createTime: '2018-12-18', // 创建时间
        //   moduleCount: 0, // 物料号数量
        //   supplierCount: 0 // 供应商数量
        // }
      ]
    }
  },
  watch: {
    // 清空date时间
    date(cur, old) {
      if (cur === null) {
        this.date = ''
      }
    }
  },
  created() {
    const params = {
      typeCodes: '002,005'

    }
    selects(params)
      .then(res => {
        this.regiondata = res.resultData['002']
        // this.state = res.resultData['005']
        this.state = res.resultData['005'].map(function(value, index, array) {
          if (value.code === '0001') {
            value.name = '未发布'
            return value
          }
          if (value.code === '0002') {
            value.name = '已发布'
            return value
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted() {
    this.submitForm()
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.submitForm()
    },
    // 跳转到新建编辑
    toNew(scope) {
      // console.log(scope.row.demandAnalysisId)
      this.$router.push({
        path: '/requirements/reqcustomizationadd',
        query: {
          demandAnalysisId: scope.row.demandAnalysisId,
          state: scope.row.state
        }
      })
    },
    submitFormBon() {
      this.currentPage3 = 1
      this.submitForm()
    },
    // 需求定制查询列表
    submitForm() {
      // console.log('this.postForm', this.postForm, this.date)
      var params = JSON.parse(JSON.stringify(this.postForm))
      if (!isNaN(Number(params.moduleCount))) {
        if (params.moduleCount.indexOf('.') === -1) {
          if (!isNaN(Number(params.supplierCount))) {
            if (params.supplierCount.indexOf('.') === -1) {
              this.getData(params)
            } else {
              this.$message({
                message: '供应商必须是整数',
                type: 'warning'
              })
            }
          } else {
            this.$message({
              message: '供应商必须是整数',
              type: 'warning'
            })
          // console.log('供应商不能为字符串')
          }
        } else {
          this.$message({
            message: '物料号必须是整数',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '物料号必须是整数',
          type: 'warning'
        })
        // console.log('物料号不能为字符串')
      }
    },
    getData(params) {
      this.loading = true
      params.region = params.region.toString()
      params.state = params.state.toString()
      if (this.date !== '' || this.date !== null) {
        params.createTimeStart = this.date[0]
        params.createTimeEnd = this.date[1]
      }
      params.currentPage = this.currentPage3
      params.pageSize = this.pageSize
      this.deleteEmptyProperty(params)
      // console.log('this.postForm', this.postForm, params)
      searchDemandCustomList(params).then(res => {
        // console.log('定制需求列表', res.resultData)
        this.tatalNum = res.resultData.count
        this.tableData = res.resultData.data
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
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
    // input上搜索按钮
    // input上搜索按钮
    findDemandFilter(nameVal, searchTitle, name, checkValue) {
      const params = {
        flag: nameVal
      }
      this.searchData.searchJian = name
      // 传过去回显check数据
      this.searchData.checkList = []
      if (checkValue !== '') {
        this.searchData.checkList = checkValue.split(',')
      }
      // console.log(data, 'TableName: ', TableName)
      flagFindData(params).then(res => {
        // 总条数
        this.searchData.searchTotal = res.resultData.length
        // 总的数据 check的数据
        this.searchData.gridData = res.resultData
        // 承接的数据
        this.searchData.Arr = res.resultData
        // 总页数
        this.searchData.searchTotalPage = Math.ceil(res.resultData.length / this.searchData.pageSize)
        // 第一页数据
        this.searchData.gridData = this.searchData.gridData.slice(0, this.searchData.pageSize)
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // 弹窗控制按钮
      this.searchData.dialogTableVisible = true
      // 请求得TableName值
      this.searchData.tableName = nameVal
      this.$store.dispatch('Dialog', searchTitle)
    },
    // 子元素传来的data
    getChildData(val) {
      // console.log(val)
      this.postForm.demandCode = val.checkedCities.join(',')
      // if (val.inputValue === 'category') {
      //   this.formInline.category = postForm.demandNum
      // } else if (val.inputValue === 'supplierCode') {
      //   this.formInline.supplierCode = val.checkedCities.join(',')
      // } else if (val.inputValue === 'supplierName') {
      //   this.formInline.supplierName = val.checkedCities.join(',')
      // } else if (val.inputValue === 'moduleCode') {
      //   this.formInline.moduleCode = val.checkedCities.join(',')
      // }
    }
  }
}
</script>
<style scoped>
.el-select-dropdown__item {
  padding: 0px 32px !important;
}
@media screen and (max-width:1620px){
  .reqcustomization .searchbar .el-form .selecter {
    width: 14%;
  }
  .reqcustomization .searchbar .el-form .search-input {
    width: 14%;
  }
  .reqcustomization .searchbar .el-form .num-input {
    width: 11%;
  }
  .towrowstate{
    margin-top:25px
  }
}
</style>

<style lang="scss">
@import "src/styles/mixin.scss";
@import "src/styles/reusepagecon.scss";
.reqcustomization {
  .searchbar {
    .el-select__tags {
      white-space: nowrap;
    }
    //  // 组件样式修改
    // .el-dialog{
    //   .el-dialog__header{
    //     display: none;
    //   }
    //   .el-dialog__body{
    //     padding:0;
    //     .cpm-top2-right {
    //       img {
    //         position: absolute;
    //         width: 25px !important;
    //         height: 28px !important;
    //         top: 25px !important;
    //         right: 10px !important;
    //         cursor: pointer;
    //       }
    //     }
    //   }
    // }
    .el-form {
      margin: 36px 22px;
      .fomer {
        width: 92%;
        display: inline-block;
        border-right: 1px solid #cecece;
        vertical-align: middle;
        // // 组件样式修改
        // .cpm-cpm {
        //   span {
        //     border-left:0;
        //     width: 13%;
        //     height:100%;
        //     padding:0;
        //     top:0;
        //     img{
        //       height:20px !important;
        //       width:25px !important
        //     }
        //   }
        // }
      }
      .btn {
        width: 7%;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        .el-form-item__content {
          margin-left: 0 !important;
        }
      }
      .el-form-item {
        margin-right: 0.5%;
        margin-bottom: 0;
        .el-form-item__label {
          width: 30px;
          font-size: 14px;
          padding: 0;
          color: #4a4a4a;
          line-height: 20px;
          font-weight: normal;
        }
        .el-form-item__content {
          vertical-align: middle;
          width: 73%;
          margin-left: 9px;
        }
      }
      .selecter {
        width: 13%;
        .el-select {
          margin-left: 0 !important;
          .el-select__tags {
            max-width: 100% !important;
          }
        }
      }
      .search-input {
        width: 13%;
        position: relative;
        img {
          cursor: pointer;
        }
        // img {
        //   position: absolute;
        //   right: 1px;
        //   top: 50%;
        //   transform: translateY(-50%);
        //   border-left: 1px solid #cecece;
        //   padding-left: 5px;
        // }
      }
      .num-input {
        width: 9.7%;
        .el-form-item__label {
          width: 45px;
          text-align: center;
        }
        .el-form-item__content {
          width: 50%;
        }
      }
      .timer {
        width: 22.1%;
        .el-form-item__content {
          width: 83%;
          .el-range__close-icon {
            width: 14px;
          }
          .el-input__inner {
            width: 100%;
          }
          .el-range-separator {
            padding: 0;
          }
          .el-date-editor {
            width: 100%;
            background-color: #f9f9f9;
          }
        }
      }
      @media screen and (max-width: 1600px) {
        .selecter .el-form-item__content {
          width: 68%;
          .el-select {
            margin-left: 0 !important;
            .el-select__tags {
              max-width: 100% !important;
            }
            .el-tag {
              margin: 0;
              padding: 0;
              .el-icon-close {
                right: 0;
              }
            }
          }
        }
        .timer .el-form-item__content {
          width: 80%;
        }
        .num-input .el-form-item__content {
          width: 41%;
        }
        .search-input .el-form-item__content {
          width: 68%;
          // img {
          //   position: absolute;
          //   right: 0px;
          //   top: 50%;
          //   transform: translateY(-50%);
          //   border-left: 1px solid #cecece;
          // }
        }
        .el-input__inner {
          padding: 0;
        }
      }
    }
  }
  .contentlist {
    .listcon {
      @include clearfix;
      .el-button {
        @include btnbg;
        float: right;
        margin: 20px 30px;
        font-size: 16px;
        i {
          margin-right: 5px;
          font-size: 18px;
        }
      }
      .statebtn {
        display: inline-block;
        // width: 90px;
        padding: 0 5px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        border-radius: 4px;
      }
      .statevalid {
        border: 1px solid #007cff;
        color: #007cff;
        cursor: pointer;
      }
      .stateinvalid {
        border: 1px solid #7f8390;
        color: #7f8390;
        cursor: pointer;
      }
    }
  }
}
</style>
