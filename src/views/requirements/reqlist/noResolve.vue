/*
 * @Page: 需求管理-> 需求列表-> 不需要分解
 * @Author: zp
 * @Date: 2018-11
 * @Last Modified by: zp
 */
<template>
  <div ref="BOXNo" class="reqno-box">
    <div class="reqno">
      <transition name="el-zoom-in-top">
        <div class="req-top">
          <el-row>
            <!-- 收缩按钮后只展示第一行查询条件 -->
            <template>
              <el-col v-if="shrinkFirst" :span="22">
                <el-form ref="searchForm" :inline="true" :model="searchForm" label-position="right">
                  <!-- 第一行 -->
                  <el-form-item :label="$t('demandNoResolve.area')" class="zhong zhong2">
                    <el-select
                      v-model="searchForm.region"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in regions"
                        :label="item.name"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('demandNoResolve.reqSource')" class="zhong zhong2">
                    <el-select
                      v-model="searchForm.demandSource"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in demandSources"
                        :label="item.name"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('demandNoResolve.reqType')" class="zhong zhong2">
                    <el-select
                      v-model="searchForm.demandType"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in demandTypes"
                        :label="item.name"
                        :value="item.code"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('demandNoResolve.reqLine')" class="zhong zhong2">
                    <el-select
                      v-model="searchForm.productLineName"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in productLine"
                        :label="item.industry_name"
                        :value="item.industry_id"
                        :key="item.dictionaryId"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('demandNoResolve.reqCode')" class="zhong zhong2">
                    <el-input v-model="searchForm.demandCode" :disabled="true">
                      <span
                        slot="suffix"
                        class="pic"
                        @click="findDemandFilter('2', $t('demandNoResolve.reqCode'), 'DemandCoding', searchForm.demandCode)"
                      >
                        <img src="../../../assets/index/images/searcho.png" alt>
                      </span>
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col v-if="shrinkFirst" :span="2" class="shrinkTop">
                <el-button type="primary" @click="search">{{ $t('demandNoResolve.reqSearch') }}</el-button>
              </el-col>
            </template>
            <!-- 收缩按钮不收缩的适合展示的查询条件 -->
            <el-col v-if="shrink" :span="22">
              <el-form ref="searchForm" :inline="true" :model="searchForm" label-position="right">
                <!-- 第一行 -->
                <el-form-item :label="$t('demandNoResolve.area')" class="zhong">
                  <el-select
                    v-model="searchForm.region"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in regions"
                      :label="item.name"
                      :value="item.code"
                      :key="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('demandNoResolve.reqSource')" class="zhong">
                  <el-select
                    v-model="searchForm.demandSource"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in demandSources"
                      :label="item.name"
                      :value="item.code"
                      :key="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('demandNoResolve.reqType')" class="zhong">
                  <el-select
                    v-model="searchForm.demandType"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in demandTypes"
                      :label="item.name"
                      :value="item.code"
                      :key="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('demandNoResolve.reqLine')" class="zhong">
                  <el-select
                    v-model="searchForm.productLineName"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in productLine"
                      :label="item.industry_name"
                      :value="item.industry_id"
                      :key="item.dictionaryId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('demandNoResolve.reqCode')" class="zhong">
                  <el-input v-model="searchForm.demandCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('2', $t('demandNoResolve.reqCode'), 'DemandCoding', searchForm.demandCode)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 第二行 -->
                <el-form-item :label="$t('demandNoResolve.reqTaskP')" class="zhong">
                  <el-input v-model="searchForm.managerCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('3', $t('demandNoResolve.reqTaskP'), 'taskone', searchForm.managerCode)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('demandNoResolve.reqHaoW')" class="zhong">
                  <el-input v-model="searchForm.moduleCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('4', $t('demandNoResolve.reqHaoW'), 'moduleCode', searchForm.moduleCode)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('demandNoResolve.reqTypeW')" class="zhong">
                  <el-input v-model="searchForm.categoryCn" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('5', $t('demandNoResolve.reqTypeW'), 'category', searchForm.categoryCn)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('demandNoResolve.reqCodeG')" class="zhong">
                  <el-input v-model="searchForm.supplierCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('6', $t('demandNoResolve.reqCodeG'), 'supplierCode', searchForm.supplierCode)"
                    >
                      <!-- @click="handleSupplierDialog($t('demandNoResolve.reqCodeG'), 'supplierCode', searchForm.supplierCode)" -->
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('demandNoResolve.reqNameG')" class="zhong">
                  <el-input v-model="searchForm.supplierName" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('7', $t('demandNoResolve.reqNameG'), 'supplierName', searchForm.supplierName)"
                    >
                      <!-- @click="handleSupplierDialog($t('demandNoResolve.reqNameG'), 'supplierName', searchForm.supplierName)" -->
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 第三行 -->
                <el-form-item :label="$t('demandNoResolve.reqLineP')" class="zhong">
                  <el-input v-model="searchForm.filterCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('8', $t('demandNoResolve.reqLineP'), 'productLineStatus', searchForm.filterCode)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col v-if="shrink" :span="2">
              <el-button type="primary" @click="search">{{ $t('demandNoResolve.reqSearch') }}</el-button>
            </el-col>
          </el-row>
        </div>
      </transition>
      <p class="arrow">
        <span @click="rotate">
          <i ref="rotate" :class="[iShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"/>
        </span>
      </p>
      <div class="req-tables">
        <!-- 取消冻结行 -->
        <div v-show="tableData.length > 0" class="req-table-top">
          <div class="btn" @click="disabled === false ? freeze() : '1'">
            <el-button v-if="freezeShow" :disabled="disabled" style="color: #4a90e2;">
              <i class="fa fa-lock" style="margin-right: 6px;"/>
              {{ $t('demandNoResolve.freezingFunction') }}
            </el-button>
            <el-button v-else style="color: #4a90e2;">
              <i class="fa fa-unlock-alt" style="margin-right: 6px;"/>
              {{ $t('demandNoResolve.freezingFunctionNo') }}
            </el-button>
          </div>
          <!-- excel下载 -->
          <div
            style="overflow: hidden; display: inline-block;"
          >
            <i style="display: inline-block;width: 1px;height: 27px;vertical-align: middle;margin-right: 30px;background: #979797;"/>
            <el-button style="color: #4a90e2;" @click="tableDownload">
              <i class="fa fa-download" style="margin-right: 6px;"/>
              <span>{{ $t('buttonGroup.exlUpload') }}</span>
            </el-button>
          </div>
          <div class="table-top-right">
            <span style="margin-right: 20px;">
              {{ $t('demandNoResolve.total') }}
              <em
                style="color: #4A90E2; padding: 0 4px"
              >{{ tableNum }}</em>
              {{ $t('demandNoResolve.records') }}
            </span>
            <span>
              <em style="color: #4A90E2;">{{ searchForm.pageNo }}</em> /
              <em>{{ count }}</em>
            </span>
          </div>
        </div>
        <!-- 表格 -->
        <div class="my-table">
          <div v-show="!freezeShow" class="reqno-slide">
            <el-slider v-model="slidingBlock" :show-tooltip="false"/>
          </div>
          <el-table
            v-loading="loading"
            :data="tableData"
            :header-cell-style="{'text-align': 'center'}"
            :cell-style="{'text-align': 'center'}"
            stripe
            class="table-style1"
            style="width: 100%"
          >
            <el-table-column
              :label="$t('demandNoResolve.custom')"
              :fixed="silder1"
              prop="customer"
              min-width="80"
            />
            <el-table-column :label="$t('demandNoResolve.area')" :fixed="silder2" prop="region"/>
            <el-table-column
              :label="$t('demandNoResolve.reqSource')"
              :fixed="silder3"
              prop="demandSource"
              min-width="160"
            />
            <el-table-column
              :label="$t('demandNoResolve.reqType')"
              :fixed="silder4"
              prop="demandType"
              min-width="160"
            />
            <el-table-column
              :label="$t('demandNoResolve.reqLine')"
              :fixed="silder5"
              prop="industryName"
              min-width="160"
            />
            <el-table-column
              :label="$t('demandNoResolve.reqCode')"
              :fixed="silder6"
              prop="demandCode"
              min-width="180"
            />
            <el-table-column
              :label="$t('demandNoResolve.reqDesc')"
              :fixed="silder7"
              prop="remarks"
              min-width="240"
            />
            <el-table-column
              :label="$t('demandNoResolve.reqTaskP')"
              :fixed="silder8"
              prop="manager"
              min-width="100"
            />
            <el-table-column :label="$t('demandNoResolve.reqHaoW')" prop="moduleCode"/>
            <el-table-column
              :label="$t('demandNoResolve.reqDescW')"
              prop="moduleDescribe"
              min-width="240"
            />
            <el-table-column
              :label="$t('demandNoResolve.reqTypeW')"
              prop="category"
              min-width="160"
            />
            <el-table-column
              :label="$t('demandNoResolve.reqCodeG')"
              prop="supplierCode"
              min-width="140"
            />
            <el-table-column
              :label="$t('demandNoResolve.reqNameG')"
              prop="supplierName"
              min-width="240"
            />
            <el-table-column :label="$t('demandNoResolve.reqPrice')" prop="price" min-width="80"/>
            <el-table-column
              :label="$t('demandNoResolve.priceUnit')"
              prop="priceUnit"
              min-width="100"
            />
            <el-table-column
              :label="$t('demandNoResolve.purchasingUnit')"
              prop="purchasingUnit"
              min-width="160"
            />
            <el-table-column
              :label="$t('demandNoResolve.currency')"
              prop="currency"
              min-width="120"
            />
            <el-table-column
              :label="$t('demandNoResolve.resource')"
              prop="resourceQuantity"
              min-width="120"
            />
            <el-table-column
              :label="$t('demandNoResolve.BOMSign1')"
              prop="modelIdent"
              min-width="150"
            />
            <el-table-column
              :label="$t('demandNoResolve.BOMSign2')"
              prop="saleIdent"
              min-width="150"
            />
            <el-table-column
              :label="$t('demandNoResolve.publicResult')"
              prop="resultDate"
              min-width="240"
            />
            <el-table-column
              :label="$t('demandNoResolve.FilterNumber')"
              prop="demandscCode"
              min-width="180"
            />
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="my-page">
          <el-pagination
            ref="PAGE"
            :current-page.sync="searchForm.pageNo"
            :page-size="searchForm.pageSize"
            :total="tableNum"
            :prev-text="$t('demandForFiltering.previousPage')"
            :next-text="$t('demandForFiltering.nextPage')"
            background
            class="paging"
            layout="prev, pager, next, jumper"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <!-- 模糊查询 -->
    <searchBox :searchbox="searchData" @tolistenChild="getChildData"/>
    <!-- 供应商弹窗 -->
    <!-- <SupplierDialog :supplier-dialog-data="supplierDialogData" @listenSupplier="getSupplier"/> -->
    <iframe name = "tempiframe" style="display:none"/>
  </div>
</template>
<script>
import Language from '@/utils/language'
// 数据请求
import { searchDemandList, selects, industryLine, flagFindData } from '@/api/requirements'
// 搜索框弹框
import searchBox from '@/components/Dialog/searchBox'
// 供应商弹窗
// import SupplierDialog from '@/components/supplier/supplierDialog'

import { exportDemandList } from '@/api/downloadurl'

export default {
  name: 'NoReqlist',
  components: {
    searchBox
    // SupplierDialog
  },
  mixins: [Language],
  data() {
    return {
      // 搜索栏提交数据
      selectData: {},
      // 收缩按钮判断是否收缩
      shrink: true,
      shrinkFirst: false,
      // 搜索条件
      cateCode: '', // 物料类别Code
      searchForm: {
        // 存一下任务人的数据
        taskOneList: [],
        region: '', // 区域
        demandSource: '', // 需求来源
        demandType: '', // 需求类型
        demandCode: '', // 需求编码
        productLineName: '', // 产业线
        filterCode: '', // 过滤编号
        managerCode: '', // 任务人
        categoryCn: '', // 物料类型
        supplierCode: '', // 供应商编码
        supplierName: '', // 供应商名称
        moduleCode: '', // 物料号
        pageSize: 10, // 每页条数
        pageNo: 1, // 页码
        result: '0002'
      },
      // 冻结按钮点击控制
      disabled: true,
      supplierDialogData: {
        dialogVisible: false,
        // 标识
        identification: '',
        // 承接选中的内容数组
        arrCheck: []
      },
      // 搜索框弹框数据
      searchData: {
        // 查询的键名
        searchJian: '',
        // 弹框显示
        dialogTableVisible: false,
        // 搜索弹框当前页数
        searchPage: 1,
        // 搜索弹框总页数
        // historyTotalPage: 0,
        // 搜索弹框中表格数据总数
        searchTotal: 0,
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
      // 中间箭头上下
      iShow: false,
      // 冻结按钮
      freezeShow: true,
      // 表格数据之前的loading
      loading: true,
      // 表格数据
      tableData: [],
      // 表格数据总长度
      tableNum: 0,
      // 区域
      regions: [],
      // 需求来源
      demandSources: [],
      // 需求类型
      demandTypes: [],
      // 产业线
      productLine: [],
      // 滑块距离
      slidingBlock: 0,
      silder1: false, // 滑块滑动部分
      silder2: false,
      silder3: false,
      silder4: false,
      silder5: false,
      silder6: false,
      silder7: false,
      silder8: false,
      count: 1
    }
  },
  computed: {
    // // 总页数
    // tablePaegs() {
    //   // return Math.ceil(this.tableNum / this.searchForm.pageSize)
    //   return Math.ceil(this.searchbox.searchTotal / 10)
    // }
  },
  watch: {
    // 滑块
    slidingBlock(val) {
      if (val >= 7) {
        this.silder1 = true
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 7
      } else {
        this.silder1 = false
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 0
      }
      if (val >= 14) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 14
      }
      if (val >= 27.6) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 27.6
      }
      if (val >= 41.5) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 41.5
      }
      if (val >= 55) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 55
      }
      if (val >= 70.5) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 70.5
      }
      if (val >= 91.2) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = false
        this.slidingBlock = 91.2
      }
      if (val >= 100) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = true
        this.slidingBlock = 100
      }
    }
  },
  mounted() {
    // 查询按钮
    this.search()
    // 下拉框数据
    this.searchSelect()
    // 输入框数据
    // this.searchInput('demand_source', '1')
    // 产业线数据
    industryLine().then(res => {
      console.log(res)
      this.productLine = res.resultData
    })
  },
  methods: {
    // excel下载
    tableDownload() {
      // var downloadData = JSON.parse(JSON.stringify(this.selectData))
      var downloadData = {}
      if (this.selectData.region) {
        downloadData.regionList = this.selectData.region.split(',')
      }
      if (this.selectData.demandSource) {
        downloadData.demandSourceList = this.selectData.demandSource.split(',')
      }
      if (this.selectData.demandType) {
        downloadData.demandTypeList = this.selectData.demandType.split(',')
      }
      if (this.selectData.productLineName) {
        downloadData.productLineNameList = this.selectData.productLineName.split(',')
      }
      if (this.selectData.demandCode) {
        downloadData.demandCodeList = this.selectData.demandCode.split(',')
      }
      if (this.selectData.managerCode) {
        downloadData.managerCodeList = this.selectData.managerCode.split(',')
      }
      if (this.selectData.category) {
        downloadData.categoryList = this.selectData.category.split(',')
      }
      if (this.selectData.supplierCode) {
        downloadData.supplierCodeList = this.selectData.supplierCode.split(',')
      }
      if (this.selectData.supplierName) {
        downloadData.supplierNameList = this.selectData.supplierName.split(',')
      }
      if (this.selectData.moduleCode) {
        downloadData.moduleCodeList = this.selectData.moduleCode.split(',')
      }
      if (this.selectData.filterCode) {
        downloadData.filterCodeList = this.selectData.filterCode.split(',')
      }
      downloadData.result = '0002'
      // downloadData.pageNo = 1
      // downloadData.pageSize = 10000
      // downloadData.excelName = '过滤需求列表'
      // downloadData.keyName = ['customer', 'region', 'demandSource', 'demandType', 'industryName', 'demandCode', 'remarks', 'manager', 'moduleCode', 'moduleDescribe', 'category', 'supplierCode', 'supplierName', 'price', 'priceUnit', 'purchasingUnit', 'currency', 'resourceQuantity', 'modelIdent', 'saleIdent', 'resultDate', 'demandscCode']
      // downloadData.headers = [
      //   {
      //     'headerOne': '客户',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '区域',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '需求来源',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '需求类型',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '产业线',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '需求编码',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '需求描述',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '任务人',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '物料号',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '物料描述',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '物料类型',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '供应商编码',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '供应商名称',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '价格',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '价格单位',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '采购单位',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '币种',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '资源量',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '模块BOM标识',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '购销BOM标识',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '结果公示',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '过滤编号',
      //     'headerLast': []
      //   }
      // ]
      // window.open(exportDemandList(downloadData))
      var a = document.createElement('a')
      var url = exportDemandList(downloadData)
      document.body.appendChild(a)
      a.target = 'tempiframe'
      a.href = url
      // a.download = '2.xls'
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      // console.log('excel下载', exportDemandList(downloadData), this.selectData, downloadData)
    },
    // exportExcel(form) {
    //   return this.$axios({ // 用axios发送post请求
    //     method: 'post',
    //     url: 'http://47.104.98.71:8780/costmanagement/demand/exportDemandList', // 请求地址
    //     data: form, // 参数
    //     responseType: 'blob' // 表明返回服务器返回的数据类型
    //     // headers: {
    //     //   'Content-Type': 'application/json'
    //     // }
    //   })
    // },
    // 获取当前选中的页面
    handleCurrentChange(val) {
      this.searchForm.pageNo = val
      this.search()
    },
    // 中间灰色箭头
    rotate() {
      this.iShow = !this.iShow
      this.shrink = !this.shrink
      this.shrinkFirst = !this.shrinkFirst
    },
    // 点击查询
    search() {
      console.log('数据', this.searchForm)
      var params = JSON.parse(JSON.stringify(this.searchForm))
      params.region = params.region.toString()
      params.demandSource = params.demandSource.toString()
      params.demandType = params.demandType.toString()
      params.demandCode = params.demandCode.toString()
      params.productLineName = params.productLineName.toString()
      params.managerCode = params.managerCode.toString()
      params.categoryCn = this.cateCode
      console.log(params.cateCode, 11111111)
      // 任务人转为转状态码
      if (params.managerCode !== '') {
        var list = []
        params.managerCode.split(',').forEach(element => {
          this.taskOneList.forEach(item => {
            if (item.manager === element) {
              list.push(item.managerCode)
            }
          })
        })
        params.managerCode = list.join(',')
      }
      this.deleteEmptyProperty(params)
      console.log('数据', this.searchForm, params)
      this.loading = true
      this.selectData = params
      searchDemandList(params).then(res => {
        // console.log(res.resultData)
        this.loading = false
        this.tableNum = parseInt(res.resultData.demandCount)
        this.tableData = res.resultData.demandList
        if (this.tableData.length !== 0) {
          this.disabled = false
        } else {
          this.disabled = true
        }
        this.count = Math.ceil(this.tableNum / this.searchForm.pageSize)
      }).catch(err => {
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
    // 筛选条件下拉框
    searchSelect() {
      selects({
        typeCodes: '002,003,004,016,019,017,018,020,021'
      }).then(res => {
        // console.log(res.resultData)
        this.regions = res.resultData['002']
        this.demandSources = res.resultData['003']
        this.demandTypes = res.resultData['004']
        this.productLines = res.resultData['019']
        this.cateorys = res.resultData['017']
        this.modules = res.resultData['018']
        this.boms = res.resultData['020']
        this.boms1 = res.resultData['021']
        this.taskStatuss = res.resultData['016']
      })
    },
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
        // checkBox 数据
        this.searchData.gridData = res.resultData
        // 承接的数据
        this.searchData.Arr = res.resultData
        // 总页数
        this.searchData.searchTotalPage = Math.ceil(res.resultData.length / this.searchData.pageSize)
        // 第一页数据
        this.searchData.gridData = this.searchData.gridData.slice(0, this.searchData.pageSize)
        // 任务人
        if (nameVal === '3') {
          this.taskOneList = res.resultData
          console.log('33333333333333', this.taskOneList)
        }
        console.log(res)
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
      console.log(val)
      if (val.inputValue === 'category') {
        this.searchForm.categoryCn = val.checkedCities.join(',')
        // this.formInline.category = val.checkedCities.join(',')
        const arr = this.searchForm.categoryCn.split(',')
        this.searchData.Arr.map((item, itemIndex) => {
          if (item.categoryCn === arr[itemIndex]) {
            this.$set(arr, itemIndex, item.categoryCode)
          }
        })
        this.cateCode = arr.join(',')
        console.log('111111111111111111111', this.searchData.Arr, this.formInline.category, this.cateCode)
      } else if (val.inputValue === 'supplierCode') {
        this.searchForm.supplierCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'supplierName') {
        this.searchForm.supplierName = val.checkedCities.join(',')
      } else if (val.inputValue === 'moduleCode') {
        this.searchForm.moduleCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'productLineStatus') {
        this.searchForm.filterCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'DemandCoding') {
        this.searchForm.demandCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'taskone') {
        this.searchForm.managerCode = val.checkedCities.join(',')
      }
    },
    // 点击输入框搜索按钮
    clickSearch(code) {
      console.log(code)
    },
    // 冻结按钮
    freeze() {
      this.freezeShow = !this.freezeShow
      this.slidingBlock = 0
    }
    // 供应商弹窗
    // handleSupplierDialog(searchTitle, identification, modelValue) {
    //   // 传过去回显check数据
    //   this.supplierDialogData.arrCheck = []
    //   // 回显问题
    //   if (modelValue !== '') {
    //     this.supplierDialogData.arrCheck = modelValue.split(',')
    //   }
    //   // 标识
    //   this.supplierDialogData.identification = identification
    //   // 中英文
    //   this.$store.dispatch('Dialog', searchTitle)
    //   // 供应商弹窗出现
    //   this.supplierDialogData.dialogVisible = true
    // },
    // // 供应商数据
    // getSupplier(res) {
    //   if (this.supplierDialogData.identification === 'supplierCode') {
    //     this.searchForm.supplierCode = res.checkList.join(',')
    //   } else if (this.supplierDialogData.identification === 'supplierName') {
    //     this.searchForm.supplierName = res.checkList.join(',')
    //   }
    // }
  }
}
</script>

<style>
/* 滑块样式 */
/* 滑块 */
/* .el-slider__runway {
  background-color: #ffffff;
} */
.el-slider__runway {
  background: #ffffff;
}
.el-slider__button {
  width: 14px;
  height: 24px;
  /* border: 2px solid #409eff; */
  background-color: #409eff;
  border-radius: 0;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
}
.el-slider__button-wrapper {
  top: -12px;
}
.el-slider__bar {
  height: 0;
  /* background-color: #409EFF; */
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 2px dashed #409eff;
  background-color: #ffffff;
  position: absolute;
}
/*  */
.reqno-box .el-form--inline .el-form-item {
  width: 18%;
}
.reqno-box .el-form--inline .el-form-item__label {
  width: 30%;
  line-height: 20px;
}
.reqno-box label {
  font-weight: normal;
}
.reqno-box .el-form-item.zhong label {
  position: relative;
  top: 50%;
  margin-top: 8px;
}
.reqno-box .el-form-item.zhong2 {
  margin-bottom: 0;
}
.reqno-box .el-row .el-input__inner {
  width: 100%;
  background-color: #f9f9f9;
  /* box-shadow: 2px 2px 6px #cecece; */
}

.reqno-box .el-form--inline .el-form-item__content {
  width: 70%;
}
.reqno-box .el-row .el-col.el-col-22 {
  border-right: 1px solid #cecece;
}
/* 查询按钮 */
.reqno-box .req-top .el-button {
  position: relative;
  left: 24%;
  margin-top: 50%;
}
.reqno-box .req-top .shrinkTop .el-button {
  margin-top: 0;
}
.reqno-box .req-top .el-form .el-input span.pic {
  border-left: 1px solid #cecece;
  display: inline-block;
  height: 24px;
  width: 32px;
  margin-top: 24%;
  padding-left: 0 20%;
  cursor:pointer;
}
.reqno-box .req-top .el-form .el-input span.pic img {
  display: inline-block;
  padding: 0;
  margin-bottom: 15%;
}
/* 取消冻结 */
.req-table-top .btn .el-button--primary.is-plain {
  background-color: #fff;
  color: #1875f0;
  border-color: #4a90e2;
}
.req-table-top .btn .el-button--primary.is-plain:hover {
  background-color: #ecf5ff;
}
.req-table-top .btn .el-button + .el-button {
  margin-left: 0px;
}
/* 表格 */
.req-tables .el-table th,
.req-tables .el-table tr {
  color: #4a4a4a;
}
/* .req-tables .el-table th {
  border-bottom: 2px solid #7897a1;
} */
.req-tables .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #f4f4f4;
}
</style>

<style scoped>
/* 背景大盒子 */
.reqno-box {
  background-color: #f4f4f4;
  padding: 18px;
  min-height: calc(100vh - 138px);
}
.reqno-box span,
.reqno-box em {
  font-style: normal;
  font-size: 14px;
}
/* 里面盒子 */
.reqno .req-top {
  padding: 34px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  position: relative;
  border-radius: 4px;
}
/* 中间灰色小箭头 */
.reqno .arrow {
  position: relative;
  width: 100%;
  height: 24px;
  background-color: #f4f4f4;
}
.reqno .arrow span {
  display: inline-block;
  width: 3.15%;
  height: 16px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-top: none;
  border-radius: 0 0 5px 5px;
  /* color: #ddd; */
  position: absolute;
  left: 50%;
  top: 0;
  text-align: center;
  margin-left: -25px;
  cursor: pointer;
}
.req-top .arrow span.rotate {
  transform: rotate(180deg);
  transition: all 0.5s;
}
/* 下面表格 */
.req-tables {
  padding: 15px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  background: #ffffff;
}
.req-table-top {
  overflow: hidden;
  margin-bottom: 1%;
}
.req-table-top .btn {
  float: left;
  padding-right:30px
}
.req-table-top .btn img {
  cursor: pointer;
}
.req-table-top .table-top-right {
  float: right;
  margin-top: 15px;
}

.req-tables .my-table .reqno-slide {
  /* position: absolute;
  left: 0;
  top: 0;
  z-index: 10; */
  width: 1162px;
}
.req-tables .my-table .reqno-slide span {
  display: inline-block;
  width: 2%;
  border-top: 2px dashed #1875f0;
  margin-top: -0.5%;
  background-color: #1875f0;
  vertical-align: middle;
}
.req-tables .my-table .reqno-slide .img-move {
  cursor: pointer;
  position: relative;
}
/* 分页 */
.req-tables .my-page {
  text-align: center;
}
.reqno-box .el-form--inline .el-form-item:nth-child(11) {
  margin-bottom: 0;
}
</style>

