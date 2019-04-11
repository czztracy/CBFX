/*
 * @Page: 历史报价单
 * @Author: cong
 * @Date: 2018-11-29 16:47:32
 * @Last Modified by: cong
 */
<template>
  <div ref="BOXH" class="historyoffersheet reusepage">
    <div v-loading = "loading" class="reusepagecon">
      <!-- 查询栏 -->
      <div v-show="searchbar" class="searchbar">
        <el-form ref="postForm" :model="postForm" :inline="true">
          <div class="fomer">
            <!-- 第一行 -->
            <!-- 区域 -->
            <el-form-item
              :label="$t('historyoffersheet.searchbar.region')"
              class="selecter decorate"
            >
              <el-select v-model="postForm.region" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in regions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求来源 -->
            <el-form-item
              :label="$t('historyoffersheet.searchbar.source')"
              class="selecter decorate"
            >
              <el-select v-model="postForm.demand_source" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in sources"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求类型 -->
            <el-form-item
              :label="$t('historyoffersheet.searchbar.category')"
              class="selecter decorate"
            >
              <el-select v-model="postForm.demand_type" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in categorys"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('historyoffersheet.searchbar.industrialLine')"
              class="selecter decorate"
            >
              <!-- 产业线（暂无） -->
              <el-select v-model="postForm.industrialLine" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.industry_id"
                  :label="item.industry_name"
                  :value="item.industry_id"
                />
              </el-select>
            </el-form-item>
            <!-- 第二行 -->
            <!-- 需求编码 -->
            <el-form-item
              :label="$t('historyoffersheet.searchbar.demandNum')"
              class="search-input decorate"
            >
              <el-input :disabled="true" v-model="postForm.demand_code" :placeholder="$t('demandNoResolve.all')">
                <img slot="suffix" src="../../assets/index/images/searcho.png" @click="findDemandFilter('2', $t('breakDown.DemandCoding'), 'DemandCoding',postForm.demand_code)">
              </el-input>
            </el-form-item>
            <!-- <el-form-item :label="$t('breakDown.DemandCoding')" class="Lab">
                  <el-input v-model="formInline.demandCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('2', $t('breakDown.DemandCoding'), 'DemandCoding')"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item> -->
            <!-- 采购经理 -->
            <el-form-item
              :label="$t('historyoffersheet.searchbar.purchasingManager')"
              class="search-input decorate"
            >
              <el-input v-model="postForm.purchasingManager" :disabled="true" :placeholder="$t('demandNoResolve.all')">
                <img
                  slot="suffix"
                  src="../../assets/index/images/searcho.png"
                  @click="findDemandFilter('3', $t('demandNoResolve.manager'), 'purchaseMan',postForm.purchasingManager)"
                >
              </el-input>
            </el-form-item>
            <!-- 物料号 -->
            <el-form-item
              :label="$t('historyoffersheet.searchbar.materialNumber')"
              class="search-input decorate"
            >
              <el-input v-model="postForm.module_code" :disabled="true" :placeholder="$t('demandNoResolve.all')">
                <img slot="suffix" src="../../assets/index/images/searcho.png" @click="findDemandFilter('4', $t('breakDown.MATNR'), 'moduleCode',postForm.module_code)">
              </el-input>
            </el-form-item>
            <!-- <el-form-item :label="$t('breakDown.MATNR')" class="Lab">
                  <el-input v-model="formInline.moduleCode" :disabled="true">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findDemandFilter('4', $t('breakDown.MATNR'), 'moduleCode')"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item> -->
            <!-- 物料类别 -->
            <el-form-item
              :label="$t('historyoffersheet.searchbar.materialCategory')"
              class="search-input decorate"
            >
              <el-input v-model="postForm.category_cn" :disabled="true" :placeholder="$t('demandNoResolve.all')">
                <img slot="suffix" src="../../assets/index/images/searcho.png" @click="findDemandFilter('5', $t('breakDown.MATNR'), 'category',postForm.category_cn)">
              </el-input>
            </el-form-item>
            <!-- <el-form-item :label="$t('historyoffersheet.searchbar.materialCategory')" class="selecter decorate">
              <el-select v-model="postForm.category_cn" multiple collapse-tags>
                <el-option
                  v-for="item in categoryCn"
                  :key="item.categoryCn"
                  :label="item.categoryCn"
                  :value="item.categoryCode"
                />
              </el-select>
            </el-form-item> -->
            <el-form-item :label="$t('historyoffersheet.searchbar.startDate')" class="timer">
              <el-date-picker v-model="postForm.startDate" type="daterange" value-format="yyyy-MM-dd" range-separator="-"/>
            </el-form-item>
            <el-form-item :label="$t('historyoffersheet.searchbar.endDate')" class="timer">
              <el-date-picker v-model="postForm.endDate" type="daterange" value-format="yyyy-MM-dd" range-separator="-"/>
            </el-form-item>
          </div>
          <div class="btn">
            <el-button
              type="primary"
              @click="submitFormBon"
            >{{ $t('buttonGroup.search') }}</el-button>
          </div>
        </el-form>
      </div>
      <div v-show="!searchbar" class="searchbar">
        <el-form ref="postForm" :model="postForm" :inline="true">
          <div class="fomer">
            <!-- 第一行 -->
            <!-- 区域 -->
            <el-form-item
              :label="$t('historyoffersheet.searchbar.region')"
              class="selecter decorate selecter1"
            >
              <el-select v-model="postForm.region" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in regions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求来源 -->
            <el-form-item
              :label="$t('historyoffersheet.searchbar.source')"
              class="selecter decorate selecter1"
            >
              <el-select v-model="postForm.demand_source" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in sources"
                  :key="item.code"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <!-- 需求类型 -->
            <el-form-item
              :label="$t('historyoffersheet.searchbar.category')"
              class="selecter decorate selecter1"
            >
              <el-select v-model="postForm.demand_type" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in categorys"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('historyoffersheet.searchbar.industrialLine')"
              class="selecter decorate selecter1"
            >
              <!-- 产业线（暂无） -->
              <el-select v-model="postForm.industrialLine" multiple collapse-tags placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.industry_id"
                  :label="item.industry_name"
                  :value="item.industry_id"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="btn">
            <el-button
              type="primary"
              @click="submitFormBon"
            >{{ $t('buttonGroup.search') }}</el-button>
          </div>
        </el-form>
      </div>
      <div class="contentlist">
        <!-- 导航栏伸缩按钮 -->
        <el-button type="info" @click="searchbar = !searchbar">
          <i :class="[searchbar ? 'downer' : 'upper']" class="el-icon-arrow-up"/>
        </el-button>
        <div class="listcon">
          <div class="btngroup" >
            <!-- 冻结按钮 -->
            <div v-show="tableData" class="frozen-btn-group" @click="frozen = !frozen">
              <el-button v-if="frozen">
                <i class="fa fa-lock"/>
                {{ $t('buttonGroup.frozen') }}
              </el-button>
              <el-button v-else>
                <i class="fa fa-unlock-alt"/>
                {{ $t('buttonGroup.unfreeze') }}
              </el-button>
            </div>
            <!-- 下载按钮 --><!-- pdf下载 --> <!-- excel下载 -->
            <!-- <div v-if="!tableCheckbox" class="download-btn-group">
              <i/>

              <el-button @click="tableCheckChange">
                <i class="fa fa-download"/>
                {{ $t('buttonGroup.pdfUpload') }}
              </el-button>

              <el-button @click="tableCheckChange">
                <i class="fa fa-download"/>
                {{ $t('buttonGroup.exlUpload') }}
              </el-button>
            </div>
            <div v-else class="download-btn-group">
              <i/>
              <el-button @click="tableCheckChange">
                {{ $t('buttonGroup.download') }}
              </el-button>
            </div> -->
            <!-- excel列表导出 -->
            <div v-show="tableData" class="download-btn-group">
              <i/>
              <el-button @click="tableDownload">
                <i class="fa fa-download"/>
                {{ $t('buttonGroup.exlUpload') }}
              </el-button>
            </div>
            <!-- 数据总数 -->
            <div class="totalnum">{{ $t('demanddimension.tablecon.total') }} <span>{{ total }}</span> {{ $t('demanddimension.tablecon.records') }}</div>
            <!-- 滑块 -->
            <el-slider v-show="!frozen" v-model="slidingBlock" :format-tooltip="formatTooltip" :show-tooltip="false" class="frozen"/>
          </div>
          <!-- 表格 -->
          <el-table :data="tableData" stripe class="table-style1" @selection-change="chooseRow">
            <el-table-column v-if="tableCheckbox" type="selection" width="35"/>
            <!-- 客户customer -->
            <el-table-column :label="$t('historyoffersheet.tablecon.customer')" :fixed="silders[0].silder" prop="customer" width="90px"/>
            <!-- 区域region -->
            <el-table-column :label="$t('historyoffersheet.tablecon.region')" :fixed="silders[1].silder" prop="region" width="90px"/>
            <!-- 需求来源demandSource -->
            <el-table-column :label="$t('historyoffersheet.tablecon.source')" :fixed="silders[2].silder" prop="demandSource" width="80px"/>
            <!-- 需求类型demandType -->
            <el-table-column :label="$t('historyoffersheet.tablecon.category')" :fixed="silders[3].silder" prop="demandType" width="125px"/>
            <!-- 产业线（无） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.industrialLine')" :fixed="silders[4].silder" prop="industryName" width="85px"/>
            <!-- 需求编码（demandCode） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.demandNum')" :fixed="silders[5].silder" prop="demandCode" width="120px">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.demandCode }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.demandCode }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 需求描述（remarks） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.demandDesc')" :fixed="silders[6].silder" prop="remarks" width="160px">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.remarks }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.remarks }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 采购经理（purchaseName） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.purchasingManager')" :fixed="silders[7].silder" prop="manager" width="84px"/>
            <!-- 物料号（moduleCode） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.materialNumber')" :fixed="silders[8].silder" prop="moduleCode" width="120px">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.moduleCode }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.moduleCode }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 物料类别（categoryCn） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.materialCategory')" :fixed="silders[9].silder" prop="categoryCn" width="139px">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.categoryCn }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.categoryCn }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 物料描述（moduleDescribe） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.materialDescription')" prop="moduleDescribe" min-width="133px">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.moduleDescribe }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.moduleDescribe }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 价格（price） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.price')" prop="price" min-width="80px">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.price }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.price }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 价格单位（priceUnit） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.priceUnit')" prop="priceUnit" min-width="110px"/>
            <!-- 采购单位（purchasingUnit） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.purchaseOrder')" prop="purchasingUnit" min-width="96px"/>
            <!-- 币种（purchasingUnit） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.currency')" prop="currency" min-width="87px"/>
            <!-- 资源量（resourceQuantity） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.resources')" prop="resourceQuantity" min-width="97px">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.resourceQuantity }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.resourceQuantity }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- BOM标识（无） -->
            <!-- 模块BOM标识 -->
            <el-table-column :label="$t('demandNoResolve.BOMSign1')" prop="modelIdentName" min-width="110px"/>
            <!-- 购销BOM标识 -->
            <el-table-column :label="$t('demandNoResolve.BOMSign2')" prop="saleIdentName" min-width="115px"/>
            <!-- 任务开始日期（startReportDate） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.startDate')" prop="startReportDate" min-width="110px"/>
            <!-- 任务截止日期（endReportDate） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.endDate')" prop="endReportDate" min-width="110px"/>
            <!-- 任务填写日期（reportDate） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.dateOfCompletingTasks')" prop="reportDate" min-width="110px"/>
            <!-- 任务状态（reportState）说明：0001：未分解，0002：分解中，0003：已分解，0004：分解中 -->
            <el-table-column :label="$t('historyoffersheet.tablecon.state')" prop="reportState" min-width="80px">
              <template slot-scope="scope">
                <span v-if = "scope.row.reportState === '0003'">已分解</span>
                <span v-else-if = "scope.row.reportState === '0002'">分解中</span>
                <span v-else-if = "scope.row.reportState === '0001'">未分解</span>
              </template>
            </el-table-column>
            <!-- 操作（查看） -->
            <el-table-column :label="$t('historyoffersheet.tablecon.operation')" min-width="90px">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="look(scope.row)"
                >{{ $t('historyoffersheet.tablecon.look') }}</el-button>
                <!-- <router-link to="#">{{ $t('historyoffersheet.tablecon.look') }}</router-link> -->
                <!--  v-if = "scope.row.signedReportAddress" -->
                <el-button
                  v-if = "scope.row.signedReportAddress"
                  type="text"
                  size="small"
                  @click="showPDF(scope.row)"
                >PDF</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div id="page">
            <el-pagination
              ref="paging"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              :total="total"
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
    <!-- 弹窗 -->
    <Dialog :searchbox="searchData" @tolistenChild="getChildData"/>
    <!-- 历史详情弹窗 -->
    <seeDialog :see-dialog="showData"/>
    <iframe name = "tempiframe" style="display:none"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { judgeUrl } from '@/utils/api'
import { timeHandling } from '@/utils/timeHandling'
import Language from '@/utils/language'
import { selects, modules } from '@/api/quoteoperational'
import { flagFindData } from '@/api/requirements'
import { getHistoryList } from '@/api/historyoffersheet'
import { getDemandExcel } from '@/api/downloadurl'
// 模糊搜索弹窗
import Dialog from '@/components/Dialog/searchBox'
// 历史详情弹框
import seeDialog from '@/components/sheetHistory/seeDialog'
export default {
  name: 'Historyoffersheet',
  components: {
    Dialog,
    seeDialog
  },
  mixins: [Language],
  data() {
    return {
      // 搜索栏提交数据
      selectData: {},
      // 表格复选框是否显示
      tableCheckbox: false,
      // 历史详情弹框数据
      showData: {
        // 弹框显示
        dialogTableVisible: false,
        // 弹出窗数据
        gridData: {
          reportVersionId: '', // 填报单版本标识 (填报必填)
          reportCheckId: '' // 填报单审核标识(只查看必填)
        }
      },
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
        searchTotalPage: 0
      },
      frozen: true, // 冻结
      slidingBlock: 0, // 滑块距离
      silders: [ // 表格是否固定
        { silder: false },
        { silder: false },
        { silder: false },
        { silder: false },
        { silder: false },
        { silder: false },
        { silder: false },
        { silder: false },
        { silder: false },
        { silder: false }
      ],
      // 选中的采购经理
      managerCodes: [],
      // 选中的物料类型
      categoryCnCode: [],
      postForm: { // 查询提交表单
        region: [], // 区域
        demand_source: [], // 需求来源
        demand_type: [], // 需求类型
        demand_code: '', // 需求编码
        industrialLine: [], // 产业线(未修改)
        purchasingManager: '', // 采购经理
        category_cn: '', // 物料类别
        module_code: '', // 物料号
        startDate: '', // 任务开始日期
        endDate: '', // 任务截止日期
        state: [] // 任务启停状态
      },
      loading: false, // 查询加载
      searchbar: true, // 查询栏伸缩
      regions: [], // option 区域
      sources: [], // option 需求来源
      categorys: [], // option 需求类型
      currentPage: 1,
      pageSize: 8,
      total: 0,
      options: [ // option 样例数据

      ],
      categoryCn: [],
      tableData: [ // 表格 样例数据
        // {
        //   customer: '海尔',
        //   region: '上海市',
        //   source: '定制',
        //   category: '定制报价分解',
        //   industrialLine: '冰箱',
        //   demandNum: '0612345',
        //   demandDesc: '冷暖干衣机总成交互',
        //   taskman: '崔海平',
        //   materialNum: '05',
        //   suppliersNum: '02',
        //   startDate: '2016-05-02',
        //   endDate: '2016-05-02',
        //   templateNum: '1',
        //   state: true
        // }
      ]
    }
  },
  computed: {
    ...mapGetters(['loginName'])
  },
  watch: {
    frozen(val) {
      // console.log(val)
      if (val) {
        this.silders[0].silder = false
        this.silders[1].silder = false
        this.silders[2].silder = false
        this.silders[3].silder = false
        this.silders[4].silder = false
        this.silders[5].silder = false
        this.silders[6].silder = false
        this.silders[7].silder = false
        this.silders[8].silder = false
        this.silders[9].silder = false
        this.slidingBlock = 0
      }
    }
  },
  mounted() {
    const params = {
      typeCodes: '002,003,004'
    }
    selects(params)
      .then(res => {
        this.regions = res.resultData['002']
        this.sources = res.resultData['003']
        this.categorys = res.resultData['004']
      })
      .catch(err => {
        console.log(err)
      })
    this.submitForm()
  },
  created() { // 产业线选项渲染
    const params = {}
    modules(params)
      .then(res => {
        this.options = res.resultData
      })
      .catch(err => {
        console.log(err)
      })
    // 物料类别选项渲染
    const params1 = { flag: '5' }
    flagFindData(params1)
      .then(res => {
        this.categoryCn = res.resultData.filter(function(value, item, array) {
          if (value !== null) {
            return true
          } else {
            return false
          }
        })
        // console.log(this.categoryCn)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    tableDownload() {
      var downloadData = {
        'excelName': '5',
        'searchParams': {}
      }
      downloadData.searchParams = JSON.parse(JSON.stringify(this.selectData))
      // downloadData.searchParams.currentPage = 1
      // downloadData.searchParams.pageSize = 10000
      delete downloadData.searchParams.currentPage
      delete downloadData.searchParams.pageSize
      // delete downloadData.searchParams.supplierCode
      // console.log('excel下载', this.selectData, downloadData, this.$t('historyoffersheet.tablecon.customer'))
      // window.open(getDemandExcel(downloadData))
      var a = document.createElement('a')
      var url = getDemandExcel(downloadData)
      document.body.appendChild(a)
      a.target = 'tempiframe'
      a.href = url
      // a.download = '2.xls'
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      // window.open('http://192.168.43.102:8083/haiercostsupport/excelFile/getDemandExcel?param=' + encodeURIComponent(JSON.stringify(downloadData)))
    },
    // 点击批量下载
    tableCheckChange() {
      this.tableCheckbox = !this.tableCheckbox
    },
    // 表格复选框选择(下载)
    chooseRow(val) {
      console.log('chooseRow', val)
    },
    // 历史详情弹窗
    look(row) {
      this.showData.gridData.reportDate = row.reportDate // 任务填报日期
      this.showData.gridData.resultDate = row.resultDate // 结果公示日期
      this.showData.gridData.reportId = row.reportId // 报价单id
      this.showData.gridData.reportState = row.reportState // 报价单状态
      this.showData.gridData.reportVersionId = row.reportVersionId // 填报单版本标识 (填报必填)
      // this.showData.gridData.reportCheckId = row.reportCheckId // 填报单审核标识(只查看必填)
      this.showData.dialogTableVisible = true
      console.log('历史弹窗数据', this.showData.gridData)
    },
    // 查看pdf签章
    showPDF(row) {
      window.open(row.signedReportAddress)
      // console.log('PDF', row.signedReportAddress)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.submitForm()
      // console.log(`当前页: ${val}`)
    },
    submitFormBon() {
      this.currentPage = 1
      this.submitForm()
    },
    submitForm() { // 查询栏提交
      this.loading = true
      // console.log(this.postForm.region, this.postForm.demand_source)
      // 采购经理 id
      var employ_code = this.managerCodes.map(function(value, index, array) {
        return value.managerCode
      })
      var category_cn = this.categoryCnCode.map(function(value, index, array) {
        return value.categoryCode
      })
      if (this.postForm.startDate === null) {
        this.postForm.startDate = ''
      }
      if (this.postForm.endDate === null) {
        this.postForm.endDate = ''
      }
      var tmp = {
        // supplierCode: [this.loginName],
        manager_code: employ_code, // 采购经理
        industry_id: this.postForm.industrialLine,
        flag: 2,
        report_state: ['0003'], // 已分解
        // report_state: [],
        region: this.postForm.region,
        demand_source: this.postForm.demand_source,
        demand_type: this.postForm.demand_type,
        demand_code: this.postForm.demand_code,
        category_cn: category_cn,
        module_code: this.postForm.module_code,
        start_report_date_s: this.postForm.startDate[0],
        start_report_date_e: this.postForm.startDate[1],
        end_report_date_s: this.postForm.endDate[0],
        end_report_date_e: this.postForm.endDate[1],
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      // if (judgeUrl() !== '002') {
      //   tmp.supplierCode = [this.loginName]
      // }
      if (this.postForm.startDate !== '' && this.postForm.startDate !== null) {
        tmp.start_report_date_s = this.postForm.startDate[0]
        tmp.start_report_date_e = this.postForm.startDate[1]
      } else {
        tmp.start_report_date_s = ''
        tmp.start_report_date_e = ''
      }
      if (this.postForm.endDate !== '' && this.postForm.endDate !== null) {
        tmp.end_report_date_s = this.postForm.endDate[0]
        tmp.end_report_date_e = this.postForm.endDate[1]
      } else {
        tmp.end_report_date_s = ''
        tmp.end_report_date_e = ''
      }
      var data = JSON.parse(JSON.stringify(tmp))
      // console.log('data', data)
      // 需求编码
      if (data.demand_code === '') {
        data.demand_code = []
      } else {
        data.demand_code = data.demand_code.split(',')
      }
      // 物料号
      if (data.module_code === '') {
        data.module_code = []
      } else {
        data.module_code = data.module_code.split(',')
      }
      // 采购经理
      // id14.3历史报价单接口
      this.selectData = data
      getHistoryList(data).then(res => {
        // console.log(res.resultData)
        if (res.resultData.count) {
          this.total = res.resultData.count
        } else {
          this.total = 0
          this.frozen = true
        }
        this.tableData = res.resultData.data
        if (res.resultData.data) {
          this.tableData = res.resultData.data.map(function(value, index, array) {
            // if (value.modelIdent === 'N') {
            //   value.modelIdent = '否'
            // } else if (value.modelIdent === 'Y') {
            //   value.modelIdent = '是'
            // } else {
            //   value.modelIdent = '空'
            // }
            // if (value.saleIdent === 'N') {
            //   value.saleIdent = '否'
            // } else if (value.saleIdent === 'Y') {
            //   value.saleIdent = '是'
            // } else {
            //   value.saleIdent = '空'
            // }
            if (value.endReportDate) {
              value.endReportDate = timeHandling(value.endReportDate)
            }
            if (value.reportDate) {
              value.reportDate = timeHandling(value.reportDate)
            }
            if (value.resultDate) {
              value.resultDate = timeHandling(value.resultDate)
            }
            if (value.startReportDate) {
              value.startReportDate = timeHandling(value.startReportDate)
            }
            return value
          })
        } else {
          this.tableData = res.resultData.data
        }
        // this.tableData = res.resultData.data
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
      // console.log(this.postForm)
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
    findDemandFilter(nameVal, searchTitle, name, checkValue) {
      const params = {
        flag: nameVal
      }
      this.searchData.searchJian = name
      this.searchData.checkList = []
      if (checkValue !== '') {
        if (name === 'purchaseMan') {
          // 采购经理
          this.searchData.checkList = this.managerCodes.map(function(value, index, array) {
            return value.manager
          })
        } else if (name === 'category') {
          this.searchData.checkList = this.categoryCnCode.map(function(value, index, array) {
            return value.categoryCn
          })
        } else {
          this.searchData.checkList = checkValue.split(',')
        }
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
      if (val.inputValue === 'category') {
        // this.formInline.category = val.checkedCities.join(',')
        // 物料类别
        this.postForm.category_cn = val.checkedCities.join(',')
        this.categoryCnCode = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.categoryCn) {
              return value
            }
          }
        })
      } else if (val.inputValue === 'supplierCode') {
        this.formInline.supplierCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'supplierName') {
        this.formInline.supplierName = val.checkedCities.join(',')
      } else if (val.inputValue === 'moduleCode') {
        // 物料号
        this.postForm.module_code = val.checkedCities.join(',')
      } else if (val.inputValue === 'DemandCoding') {
        // 需求编码
        this.postForm.demand_code = val.checkedCities.join(',')
      } else if (val.inputValue === 'taskone') {
        this.formInline.managerCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'purchaseMan') {
        // 采购经理
        this.postForm.purchasingManager = val.checkedCities.join(',')
        this.managerCodes = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.manager) {
              return value
            }
          }
        })
        // var val1 = JSON.parse(JSON.stringify(val))
        // this.managerCodes = val.checkedCities
        // var tmp1 = val1.checkedCities.map(function(value, index, array) {
        //   return value.manager
        // })
        // this.postForm.purchasingManager = tmp1.join(',')
      }
    },
    formatTooltip(val) { // 滑块
      if (this.$refs.BOXH) {
        // console.log(this.$refs.BOXH.clientWidth)
        var arr = [8.4, 16.5, 24, 35.3, 43, 54, 68.7, 76.3, 87.3, 100]
      }

      // const arr = [6, 12, 21, 31, 37, 49, 64, 70, 79, 90]
      if (val < 8.4) {
        this.silders.forEach((item, index) => {
          index < 0 ? (item.silder = true) : (item.silder = false)
        })
        this.slidingBlock = 0
      } else {
        arr.forEach((a, b) => {
          if (val >= a) {
            this.silders.forEach((item, index) => {
              index < (b + 1) ? (item.silder = true) : (item.silder = false)
            })
            this.slidingBlock = a
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.totalnum{
  float: right;
  font-size: 0.8vw;
  padding:10px
}
@media screen and (max-width:1530px){
  .timer .el-date-editor{
    width:350px !important;
  }
}

</style>

<style lang='scss'>
@import 'src/styles/reusepagecon.scss';
.historyoffersheet{
  // .el-form {
  //   margin: 22px 22px 0 !important;
  // }
  .fomer{
    .el-select__tags{
        white-space: nowrap;
    }
    .decorate{
      width: 23.5%;
      &>label{
        width: 26%;
        padding: 0;
        margin-right: 2%;
        text-align: right;
        overflow: hidden;
      }
      img{
        cursor:pointer
      }
      .el-form-item__content{
        width: 70%;
        overflow: hidden;
        .el-select{
          width: 100%;
        }
      }
    }
    .timer{
      margin-bottom:0;
    }
    .selecter1{
      margin-bottom:0
    }
  }
  // .el-slider__runway {
  //   width: 100%;
  // }
}
.historyoffersheet .el-slider__runway {
    width: 1093px;
}
</style>
