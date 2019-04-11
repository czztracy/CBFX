/*
 * @Page: 需求管理-> 需求列表-> 需要分解
 * @Author: csg
 * @Date: 2018-11
 * @Last Modified by: csg
 */
<template>
  <div ref="BOX" class="box">
    <div class="chunckBox">
      <!-- 弹窗 -->
      <Dialog :searchbox="searchData" @tolistenChild="getChildData"/>
      <!-- 供应商弹窗 -->
      <!-- <SupplierDialog :supplier-dialog-data="supplierDialogData" @listenSupplier="getSupplier"/> -->
      <!-- 顶部查询栏 -->
      <transition name="el-zoom-in-top">
        <div class="top">
          <el-row>
            <!-- 收缩按钮后只展示第一行查询条件 -->
            <template>
              <el-col v-if="shrinkFirst" :span="22">
                <el-form ref="formInline" :inline="true" :model="formInline" label-position="right">
                  <!-- 第一行 -->
                  <el-form-item :label="$t('breakDown.area')" class="Lab Lab2">
                    <el-select
                      v-model="formInline.region"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in areas"
                        :key="item.dictionaryId"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('breakDown.Source')" class="Lab Lab2">
                    <el-select
                      v-model="formInline.demandSource"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in Sources"
                        :key="item.dictionaryId"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('breakDown.requirementType')" class="Lab Lab2">
                    <el-select
                      v-model="formInline.demandType"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in requirementTypes"
                        :key="item.dictionaryId"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('breakDown.industryLine')" class="Lab Lab2">
                    <el-select
                      v-model="formInline.productLineName"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in productionLines"
                        :key="item.dictionaryId"
                        :label="item.industry_name"
                        :value="item.industry_id"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('breakDown.DemandCoding')" class="Lab Lab2">
                    <el-input v-model="formInline.demandCode" :disabled="true">
                      <span
                        slot="suffix"
                        class="pic"
                        @click="findDemandFilter('2', $t('breakDown.DemandCoding'), 'DemandCoding', formInline.demandCode)"
                      >
                        <img src="../../../assets/index/images/searcho.png" alt>
                      </span>
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <!-- 查询 -->
              <el-col v-if="shrinkFirst" :span="2" class="shrinkTop">
                <el-button type="primary" @click="handleFind">{{ $t('breakDown.Query') }}</el-button>
              </el-col>
            </template>
            <el-col v-if="shrink" :span="22">
              <el-form ref="formInline" :inline="true" :model="formInline" label-position="right">
                <!-- 第一行 -->
                <el-form-item :label="$t('breakDown.area')" class="Lab">
                  <el-select
                    v-model="formInline.region"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in areas"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('breakDown.Source')" class="Lab">
                  <el-select
                    v-model="formInline.demandSource"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in Sources"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('breakDown.requirementType')" class="Lab">
                  <el-select
                    v-model="formInline.demandType"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in requirementTypes"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('breakDown.industryLine')" class="Lab">
                  <el-select
                    v-model="formInline.productLineName"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in productionLines"
                      :key="item.dictionaryId"
                      :label="item.industry_name"
                      :value="item.industry_id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('breakDown.DemandCoding')" class="Lab">
                  <el-input v-model="formInline.demandCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('2', $t('breakDown.DemandCoding'), 'DemandCoding', formInline.demandCode)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 第二行 -->
                <el-form-item :label="$t('breakDown.TaskOne')" class="Lab">
                  <el-input v-model="formInline.managerCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('3', $t('breakDown.TaskOne'), 'taskone', formInline.managerCode)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('breakDown.MATNR')" class="Lab">
                  <el-input v-model="formInline.moduleCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('4', $t('breakDown.MATNR'), 'moduleCode', formInline.moduleCode)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('breakDown.MaterialType')" class="Lab">
                  <el-input v-model="formInline.category" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('5', $t('breakDown.MaterialType'), 'category', formInline.category)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('breakDown.SupplierCode')" class="Lab">
                  <el-input v-model="formInline.supplierCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('6', $t('breakDown.SupplierCode'), 'supplierCode', formInline.supplierCode)"
                    >
                      <!-- @click="handleSupplierDialog($t('breakDown.SupplierCode'), 'supplierCode', formInline.supplierCode)"
                      @click="findDemandFilter('6', $t('breakDown.SupplierCode'), 'supplierCode', formInline.supplierCode)" -->
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('breakDown.SupplierName')" class="Lab">
                  <el-input v-model="formInline.supplierName" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('7', $t('breakDown.SupplierName'), 'supplierName', formInline.supplierName)"
                    >
                      <!-- @click="handleSupplierDialog($t('breakDown.SupplierName'), 'supplierName', formInline.supplierName)" -->
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 第三行 -->
                <el-form-item :label="$t('breakDown.CategoryMatching')" class="Lab">
                  <el-select
                    v-model="formInline.categoryStatus"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in categoryMatchings"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('breakDown.MatchTemplate')" class="Lab">
                  <el-select
                    v-model="formInline.moduleStatus"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in templateMatchings"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('breakDown.dataState')" class="Lab">
                  <el-select
                    v-model="formInline.modelBomStatus"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in BOMStatus"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('breakDown.TaskTransition')" class="Lab">
                  <el-select
                    v-model="formInline.taskStatus"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in taskStatus"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('breakDown.dataState1')" class="Lab">
                  <el-select
                    v-model="formInline.saleBomStatus"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in BOMStatus1"
                      :key="item.dictionaryId"
                      :label="item.name"
                      :value="item.code"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col v-if="shrink" :span="2">
              <el-button type="primary" @click="handleFind">{{ $t('breakDown.Query') }}</el-button>
            </el-col>
          </el-row>
        </div>
      </transition>
      <!-- 收缩按钮 -->
      <div class="controlBox">
        <p class="controlBtn" @click="shrinkChange">
          <span :class="[controlBtn ? 'downer' : 'upper']">
            <i class="fa fa-angle-up"/>
          </span>
        </p>
      </div>
      <!-- 列表部分 -->
      <div class="listChunck">
        <div v-show="demandList.length > 0" class="Btn">
          <!-- <a><img src="../../../assets/index/images/Freeze.png" ></a> -->
          <div
            style="overflow: hidden; display: inline-block;padding-right:30px"
            @click="disabled === false ? Bool = !Bool : '1'"
          >
            <el-button v-if="Bool" :disabled="disabled">
              <i class="fa fa-lock" style="margin-right: 6px;"/>
              {{ $t('breakDown.inkFreezer') }}
            </el-button>
            <el-button v-else>
              <i class="fa fa-unlock-alt" style="margin-right: 6px;"/>
              {{ $t('breakDown.unfreezeAll') }}
            </el-button>
          </div>
          <!-- excel下载 -->
          <div
            style="overflow: hidden; display: inline-block;"
          >
            <i style="display: inline-block;width: 1px;height: 27px;vertical-align: middle;margin-right: 30px;background: #979797;"/>
            <el-button style="color: #4a90e2;" class="totalnumdown" @click="tableDownload">
              <i class="fa fa-download" style="margin-right: 6px;"/>
              <span>{{ $t('buttonGroup.exlUpload') }}</span>
            </el-button>
          </div>
          <div class="total">
            {{ $t('breakDown.total') }}
            <span>{{ total }}</span>
            {{ $t('breakDown.record') }}
          </div>
          <div class="Curr">
            <span>{{ currentPage }}</span>
            / {{ count }}
          </div>
        </div>
        <!-- 滑块 -->
        <div v-if="!Bool" class="block">
          <el-slider v-model="slidingBlock" :show-tooltip="false"/>
        </div>
        <el-table
          v-loading="loading"
          ref="table"
          :data="demandList"
          :header-cell-style="{
            'color': '#4A4A4A',
            'text-align': 'center'
          }"
          :cell-style="{'text-align': 'center'}"
          class="table-style1"
          stripe
          style="width: 100%"
        >
          <el-table-column
            :label="$t('breakDown.listClient')"
            :fixed="silder1"
            prop="customer"
            min-width="80"
          />
          <el-table-column :label="$t('breakDown.area')" :fixed="silder2" prop="region"/>
          <el-table-column
            :label="$t('breakDown.Source')"
            :fixed="silder3"
            prop="demandSource"
            min-width="160"
          />
          <el-table-column
            :label="$t('breakDown.requirementType')"
            :fixed="silder4"
            prop="demandType"
            min-width="160"
          />
          <el-table-column
            :label="$t('breakDown.industryLine')"
            :fixed="silder5"
            prop="industryName"
            min-width="160"
          />
          <el-table-column
            :label="$t('breakDown.DemandCoding')"
            :fixed="silder6"
            prop="demandCode"
            min-width="180"
          />
          <el-table-column
            :label="$t('breakDown.listRequirementDescription')"
            :fixed="silder7"
            prop="remarks"
            min-width="240"
          />
          <el-table-column :label="$t('breakDown.TaskOne')" :fixed="silder8" prop="manager" min-width="100"/>
          <el-table-column :label="$t('breakDown.MATNR')" prop="moduleCode"/>
          <el-table-column
            :label="$t('breakDown.listMaterialDescription')"
            prop="moduleDescribe"
            min-width="240"
          />
          <el-table-column :label="$t('breakDown.MaterialType')" prop="category" min-width="160"/>
          <el-table-column
            :label="$t('breakDown.SupplierCode')"
            prop="supplierCode"
            min-width="140"
          />
          <el-table-column
            :label="$t('breakDown.SupplierName')"
            prop="supplierName"
            min-width="240"
          />
          <el-table-column :label="$t('breakDown.listPrice')" prop="price" min-width="80"/>
          <el-table-column :label="$t('breakDown.listPriceUnit')" prop="priceUnit" min-width="100"/>
          <el-table-column
            :label="$t('breakDown.listProcurementUnit')"
            prop="purchasingUnit"
            min-width="160"
          />
          <el-table-column :label="$t('breakDown.listCurrency')" prop="currency" min-width="120"/>
          <el-table-column
            :label="$t('breakDown.listResource')"
            prop="resourceQuantity"
            min-width="120"
          />
          <!-- <el-table-column
            :label="$t('demandNoResolve.BOMSign1')"
            prop="modelIdent"
            min-width="150"
          />
          <el-table-column
            :label="$t('demandNoResolve.BOMSign2')"
            prop="saleIdent"
            min-width="150"
          /> -->
          <el-table-column :label="$t('breakDown.listResultTime')" prop="resultDate" width="240"/>
          <el-table-column
            :label="$t('breakDown.IndustryLine')"
            prop="industryMatching"
            min-width="180"
          />
          <el-table-column
            :label="$t('breakDown.categoryMatching')"
            prop="categoryMatching"
            min-width="150"
          />
          <el-table-column
            :label="$t('breakDown.templateMatching')"
            prop="templateMatching"
            min-width="150"
          />
          <el-table-column
            :label="$t('breakDown.TemplateBOMMatching')"
            prop="modelBomMatching"
            min-width="200"
          />
          <el-table-column
            :label="$t('breakDown.PurchaseMatching')"
            prop="saleBomMatching"
            min-width="200"
          />
          <el-table-column
            :label="$t('breakDown.newAndOldProduct')"
            prop="productIdent"
            min-width="200"
          />
          <el-table-column
            :label="$t('breakDown.TaskTransitionState')"
            prop="state"
            min-width="160"
          />
        </el-table>
        <el-pagination
          ref="PAGE"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="total"
          :prev-text="$t('breakDown.Prev')"
          :next-text="$t('breakDown.Next')"
          layout="prev, pager, next, jumper"
          class="paging"
          background
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <iframe name = "tempiframe" style="display:none"/>
  </div>
</template>

<script>
import Language from '@/utils/language'
import { searchDemandList, selects, industryLine, flagFindData } from '@/api/requirements'
import Dialog from '@/components/Dialog/searchBox'
// import SupplierDialog from '@/components/supplier/supplierDialog'
import { judgeUrl } from '@/utils/api'
import { exportDemandList } from '@/api/downloadurl'

export default {
  name: 'Reqlist',
  components: {
    Dialog
    // SupplierDialog
  },
  mixins: [Language],
  data() {
    return {
      selectData: {},
      // 收缩按钮判断是否收缩
      shrink: true,
      shrinkFirst: false,
      // 搜索框弹框数据
      searchData: {
        // 查询的键名
        searchJian: '',
        // 弹框显示
        dialogTableVisible: false,
        // 搜索弹框当前页数
        searchPage: 1,
        // 搜索弹框中表格数据总数
        searchTotal: 0,
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
      // 冻结按钮点击控制
      disabled: true,
      supplierDialogData: {
        dialogVisible: false,
        // 标识
        identification: '',
        // 承接选中的内容数组
        arrCheck: []
      },
      cateCode: '', // 物料类别Code
      formInline: {
        region: '', // 区域
        demandSource: '', // 需求来源
        demandType: '', // 需求类型
        demandCode: '', // 需求编码
        productLineName: '', // 产业线
        managerCode: '', // 任务人
        category: '', // 物料类别
        supplierCode: '', // 供应商编码
        supplierName: '', // 供应商名称
        productLineStatus: '', // 生产线匹配
        moduleCode: '', // 物料号
        categoryStatus: '', // 品类匹配
        moduleStatus: '', // 模板匹配
        modelBomStatus: '', // 模块BOM数据状态
        saleBomStatus: '', // 购销BOM数据状态
        taskStatus: '' // 任务转化状态
      },
      // 存一下任务人的数据
      taskOneList: [],
      areas: [], // select 区域
      Sources: [], // select 需求来源
      requirementTypes: [], // select 需求类型
      productionLines: [], // select 产业线
      matchingLines: [], // select 产业线匹配
      categoryMatchings: [], // select 品类匹配
      templateMatchings: [], // select 模板匹配
      BOMStatus: [], // select 模块BOM数据状态
      BOMStatus1: [], // select 模块BOM数据状态
      taskStatus: [], // select 任务转换状态
      controlBtn: true, // 控制收缩
      demandList: [], // 表格列表
      currentPage: 1, // 当前页
      total: 0, // 总条目数
      pageSize: 10, // 一页显示多少条
      count: 0, // 显示的浮点数
      Bool: true, // 冻结功能控制
      areaBool: false, // 地区fixed控制
      slidingBlock: 0, // 滑块
      silder1: false, // 滑块滑动部分
      silder2: false,
      silder3: false,
      silder4: false,
      silder5: false,
      silder6: false,
      silder7: false,
      silder8: false,
      loading: true // loading加载
    }
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
      if (val >= 27.5) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 27.5
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
      if (val >= 70.6) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 70.6
      }
      if (val >= 91.3) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = false
        this.slidingBlock = 91.3
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
    },
    // 滑块按钮监听
    Bool(val) {
      // console.log(val)
      if (val) {
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
    }
  },
  created() {
  },
  mounted() {
    // 里边渲染
    this.findDemandList()
    // 字典查询下拉框
    this.dictionaryList()
    // 产业线数据
    industryLine().then(res => {
      console.log(res)
      this.productionLines = res.resultData
    })
    console.log(11111111111111111111, judgeUrl())
  },
  methods: {
    // excel 下载
    tableDownload() {
      var downLoadData = {}
      if (this.selectData.region) {
        downLoadData.regionList = this.selectData.region.split(',')
      }
      if (this.selectData.demandSource) {
        downLoadData.demandSourceList = this.selectData.demandSource.split(',')
      }
      if (this.selectData.demandType) {
        downLoadData.demandTypeList = this.selectData.demandType.split(',')
      }
      if (this.selectData.demandCode) {
        downLoadData.demandCodeList = this.selectData.demandCode.split(',')
      }
      if (this.selectData.productLineName) {
        downLoadData.productLineNameList = this.selectData.productLineName.split(',')
      }
      if (this.selectData.categoryStatus) {
        downLoadData.categoryStatusList = this.selectData.categoryStatus.split(',')
      }
      if (this.selectData.moduleStatus) {
        downLoadData.moduleStatusList = this.selectData.moduleStatus.split(',')
      }
      if (this.selectData.modelBomStatus) {
        downLoadData.modelBomStatusList = this.selectData.modelBomStatus.split(',')
      }
      if (this.selectData.saleBomStatus) {
        downLoadData.saleBomStatusList = this.selectData.saleBomStatus.split(',')
      }
      if (this.selectData.taskStatus) {
        downLoadData.taskStatusList = this.selectData.taskStatus.split(',')
      }
      if (this.selectData.managerCode) {
        downLoadData.managerCodeList = this.selectData.managerCode.split(',')
      }
      // 未完待续
      downLoadData.result = '0001'
      // downLoadData.excelName = '分解报价需求列表'
      // downLoadData.keyName = ['customer', 'region', 'demandSource', 'demandType', 'industryName', 'demandCode', 'remarks', 'manager', 'moduleCode', 'moduleDescribe', 'category', 'supplierCode', 'supplierName', 'price', 'priceUnit', 'purchasingUnit', 'currency', 'resourceQuantity', 'modelIdent', 'saleIdent', 'resultDate', 'industryMatching', 'categoryMatching', 'templateMatching', 'modelBomMatching', 'saleBomMatching', 'productIdent', 'state']
      // downLoadData.headers = [
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
      //     'headerOne': '物料类别',
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
      //     'headerOne': '结果公示时间',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '产业线匹配',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '品类匹配',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '模板匹配',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '模板BOM数据匹配',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '购销BOM数据匹配',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '新老品',
      //     'headerLast': []
      //   },
      //   {
      //     'headerOne': '任务转化状态',
      //     'headerLast': []
      //   }
      // ]
      // var params = { param: encodeURIComponent(JSON.stringify(downLoadData)) }
      // window.open('http://47.104.98.71:8780/costmanagement/demand/exportDemandList?param=' + encodeURIComponent(JSON.stringify(downLoadData)))
      // // window.open('http://192.168.43.102:8083/haiercostsupport/demand/exportDemandList?param=' + encodeURIComponent(JSON.stringify(downLoadData)))
      // console.log(11, 'http://192.168.43.102:8083/haiercostsupport/demand/exportDemandList?param=' + encodeURIComponent(JSON.stringify(downLoadData)))
      // window.open(exportDemandList(downLoadData))
      // var downloadElement = document.createElement('a')
      // var href = window.URL.createObjectURL(exportDemandList(downLoadData)) // 创建下载的链接

      var a = document.createElement('a')
      var url = exportDemandList(downLoadData)
      // console.log(url)
      document.body.appendChild(a)
      a.target = 'tempiframe'
      a.href = url
      // a.download = '2.xls'
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    },
    // 收缩按钮方法
    shrinkChange() {
      this.shrink = !this.shrink
      this.shrinkFirst = !this.shrinkFirst
      this.controlBtn = !this.controlBtn
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.findDemandList()
    },
    handleBOM(index, row) {
      console.log(row)
    },
    // 字典查询下拉框数据
    dictionaryList() {
      const params = {
        typeCodes: '002,003,004,016,019,017,018,020,021'
      }
      selects(params)
        .then(res => {
          this.areas = res.resultData['002']
          this.Sources = res.resultData['003']
          this.requirementTypes = res.resultData['004']
          this.matchingLines = res.resultData['019']
          this.categoryMatchings = res.resultData['017']
          this.templateMatchings = res.resultData['018']
          this.BOMStatus = res.resultData['020']
          this.BOMStatus1 = res.resultData['021']
          this.taskStatus = res.resultData['016']
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 查询
    handleFind() {
      this.currentPage = 1
      this.findDemandList()
    },
    // 查询按钮
    findDemandList() {
      console.log('数据---------', this.$store.getters.avatarCode)
      var params = JSON.parse(JSON.stringify(this.formInline))
      params.region = params.region.toString()
      params.demandSource = params.demandSource.toString()
      params.demandType = params.demandType.toString()
      params.demandCode = params.demandCode.toString()
      params.productLineName = params.productLineName.toString()
      params.categoryStatus = params.categoryStatus.toString()
      params.moduleStatus = params.moduleStatus.toString()
      params.modelBomStatus = params.modelBomStatus.toString()
      params.saleBomStatus = params.saleBomStatus.toString()
      params.taskStatus = params.taskStatus.toString()
      params.managerCode = params.managerCode.toString()
      params.pageSize = this.pageSize.toString()
      params.pageNo = this.currentPage.toString()
      params.category = this.cateCode
      console.log(params.cateCode, 11111111)
      if (this.$store.getters.avatarCode !== '0003') {
        params.result = '0001'
      } else {
        delete params.result
      }
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
      // 添加参数
      if (judgeUrl() === '001') {
        if (this.$store.getters.avatarCode === '0003' || this.$store.getters.avatarCode === '0004' || this.$store.getters.avatarCode === '0005') {
          params.managercode = this.$store.getters.userCode
        } else {
          params.managercode = ''
        }
      }
      this.deleteEmptyProperty(params)
      console.log('数据', this.formInline, typeof params.region, params.region)
      // id172存储
      this.selectData = params
      this.loading = true
      searchDemandList(params)
        .then(res => {
          this.loading = false
          this.demandList = res.resultData.demandList
          if (this.demandList.length !== 0) {
            this.disabled = false
          } else {
            this.disabled = true
          }
          this.total = Number(res.resultData.demandCount)
          this.count = Math.ceil(this.total / this.pageSize)
          console.log(res)
        })
        .catch(err => {
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
        } else {
          if (value === '' || value === null || value === undefined) {
            delete object[i]
          }
        }
      }
    },
    // input上搜索按钮
    findDemandFilter(nameVal, searchTitle, name, checkValue) {
      const params = {
        flag: nameVal
      }
      this.searchData.searchJian = name
      // console.log('-------------------', checkValue.split(','))
      // 传过去回显check数据
      this.searchData.checkList = []
      if (checkValue !== '') {
        this.searchData.checkList = checkValue.split(',')
      }
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
        // 任务人
        if (nameVal === '3') {
          this.taskOneList = res.resultData
          // console.log('33333333333333', this.taskOneList)
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
      console.log('子组件传来的值------------', val)
      if (val.inputValue === 'category') {
        this.formInline.category = val.checkedCities.join(',')
        const arr = this.formInline.category.split(',')
        this.searchData.Arr.map((item, itemIndex) => {
          if (item.categoryCn === arr[itemIndex]) {
            this.$set(arr, itemIndex, item.categoryCode)
          }
        })
        this.cateCode = arr.join(',')
        console.log('111111111111111111111', this.searchData.Arr, this.formInline.category, this.cateCode)
        // this.searchData.Arr.map((item, itemIndex) => {
        //   if(this.)
        // })
      } else if (val.inputValue === 'supplierCode') {
        this.formInline.supplierCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'supplierName') {
        this.formInline.supplierName = val.checkedCities.join(',')
      } else if (val.inputValue === 'moduleCode') {
        this.formInline.moduleCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'DemandCoding') {
        this.formInline.demandCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'taskone') {
        this.formInline.managerCode = val.checkedCities.join(',')
      }
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
    //     this.formInline.supplierCode = res.checkList.join(',')
    //   } else if (this.supplierDialogData.identification === 'supplierName') {
    //     this.formInline.supplierName = res.checkList.join(',')
    //   }
    // }
  }
}
</script>

<style scoped>
.box {
  background: rgba(244, 244, 244, 1);
  padding: 18px;
  min-height: calc(100vh - 153px);
}
.box .chunckBox .top {
  padding: 34px;
  position: relative;
  border: 1px solid #cecece;
  border-radius: 4px;
  background: rgba(255, 255, 255, 1);
}
/* 收缩按钮 */
.controlBox {
  overflow: hidden;
  background: rgba(244, 244, 244, 1);
  position: relative;
  height: 24px;
  min-width: 1440px;
}
.controlBtn span {
  display: inline-block;
  height: 16px;
  color: #666666;
  position: absolute;
  left: 50%;
  padding: 0 15px;
  margin-left: -20px;
  top: -1px;
  cursor: pointer;
}
.controlBtn {
  width: 3.15%;
  height: 16px;
  margin: 0 auto;
  display: block;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  cursor: pointer;
  border-radius: 0 0 5px 5px;
  border: 1px solid #cecece;
  border-top: 0;
}
.upper {
  transform: rotate(180deg);
  transition: all 0.3s ease;
}
.downer {
  transform: rotate(360deg);
  transition: all 0.3s ease;
}

/* 列表部分 */
.box .chunckBox .listChunck {
  padding: 15px;
  border: 1px solid #cecece;
  border-radius: 4px;
  position: relative;
  background: rgba(255, 255, 255, 1);
  /* margin-top: 30px; */
}
.box .chunckBox .listChunck .Btn {
  overflow: hidden;
  color: #4a90e2;
  margin-bottom: 1%;
  position: relative;
  /* height: 40px; */
}
/* .box .chunckBox .totalnumdown{
  color: #409EFF;
  background: #fff
}
.box .chunckBox .totalnumdown:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
}
.box .chunckBox .totalnumdown:hover {
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
} */

.box .chunckBox .listChunck .block {
  width: 1162px;
}
.box .chunckBox .listChunck .Btn .total {
  display: inline-block;
  position: absolute;
  right: 50px;
  height: 40px;
  line-height: 20px;
  padding: 10px;
  color: #4a4a4a;
  font-size: 14px;
  margin-top: 0;
}
.box .chunckBox .listChunck .Btn .total span {
  color: #4a90e2;
  padding: 0 4px;
}
.box .chunckBox .listChunck .Btn .Curr {
  display: inline-block;
  position: absolute;
  right: 0;
  height: 40px;
  line-height: 20px;
  padding: 10px;
  color: #4a4a4a;
  font-size: 14px;
}
.box .chunckBox .listChunck .Btn .Curr span {
  color: #4a90e2;
}
</style>
<style>
.box .chunckBox .top .el-select__tags {
  white-space: nowrap;
}
.box .chunckBox .top label {
  font-weight: normal;
}
.box .chunckBox .top .el-form--inline .el-form-item {
  width: 18%;
}
.box .chunckBox .top .el-form--inline .el-form-item:nth-child(15) {
  margin-bottom: 0;
}
.box .chunckBox .top .el-form--inline .Lab:nth-child(13) {
  width: 37%;
}
.box .chunckBox .top .el-form--inline .Lab:nth-child(15) {
  width: 37%;
}
.box .chunckBox .top .el-form--inline .Lab:nth-child(15) .el-form-item__label {
  width: 15%;
}
.box .chunckBox .top .el-form--inline .Lab:nth-child(13) .el-form-item__label {
  width: 15%;
  margin-top: 0;
}
.box
  .chunckBox
  .top
  .el-form--inline
  .Lab:nth-child(13)
  .el-form-item__content {
  width: 85%;
}
.box
  .chunckBox
  .top
  .el-form--inline
  .Lab:nth-child(15)
  .el-form-item__content {
  width: 85%;
}
.box
  .chunckBox
  .top
  .el-form--inline
  .Lab:nth-child(13)
  .el-form-item__content
  .el-select {
  width: 100%;
}
.box
  .chunckBox
  .top
  .el-form--inline
  .Lab:nth-child(15)
  .el-form-item__content
  .el-select {
  width: 100%;
}
.box .chunckBox .top .el-form--inline .el-form-item__label {
  width: 30%;
  line-height: 20px;
}
.box .chunckBox .top .el-form-item.Lab label {
  position: relative;
  top: 50%;
  margin-top: 8px;
}
.box .chunckBox .top .el-form-item.Lab2 {
  margin-bottom: 0;
}
.box .chunckBox .top .el-input__inner {
  width: 100%;
  background-color: #f9f9f9;
  /* box-shadow: 2px 2px 6px #cecece; */
}
.box .chunckBox .top .el-form--inline .el-form-item__content {
  width: 70%;
}
.box .chunckBox .top .el-row .el-col.el-col-22 {
  border-right: 1px solid #cecece;
}
/* 查询 */
.box .chunckBox .top .el-button {
  position: relative;
  left: 24%;
  margin-top: 80%;
}
.box .chunckBox .top .shrinkTop .el-button {
  margin-top: 0;
}
.box .chunckBox .top .el-input span.pic {
  border-left: 1px solid #cecece;
  display: inline-block;
  height: 24px;
  width: 32px;
  margin-top: 24%;
  padding: 0 20%;
  cursor:pointer;
}
.box .chunckBox .top .el-input span.pic img {
  display: inline-block;
  padding: 0;
  margin-bottom: 18%;
}
.box .chunckBox .top .el-input span.pic img:hover {
  cursor: pointer;
}
.el-pagination {
  margin-top: 30px;
  text-align: center;
}
.el-pagination .btn-next span {
  display: inline-block;
  padding: 0 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #c5c5c5;
}
.el-pagination .btn-prev span {
  display: inline-block;
  padding: 0 10px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #c5c5c5;
}
.el-pagination__jump {
  position: relative;
  display: inline-block;
  padding-left: 20px;
}
.el-button--default {
  border: 1px solid #4a90e2;
}
.box .el-button--default span {
  color: #4a90e2;
}
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
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border: 2px dashed #409eff;
  background-color: #ffffff;
  position: absolute;
}
</style>

