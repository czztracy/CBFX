/*
 * @Page: 报价管理-> 物料号维度
 * @Author: zp
 * @Date: 2018-11
 * @Last Modified by: zp
 */
<template>
  <div v-loading="loading" ref="BOXEclu" class="exclu-box exclusive">
    <div class="exclu2">
      <transition name="el-zoom-in-top">
        <div class="req-top">
          <el-row>
            <!-- 收缩按钮后只展示第一行查询条件 -->
            <template>
              <el-col v-if="shrinkFirst" :span="22">
                <el-form ref="formInline" :inline="true" :model="formInline" label-position="right">
                  <!-- 第一行 -->
                  <!-- 区域 -->
                  <el-form-item :label="$t('demandNoResolve.area')" class="zhong zhong2">
                    <el-select
                      v-model="formInline.region"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in regions"
                        :label="item.name"
                        :value="item.name"
                        :key="item.name"
                      />
                    </el-select>
                  </el-form-item>
                  <!-- 需求来源 -->
                  <el-form-item :label="$t('demandNoResolve.reqSource')" class="zhong zhong2">
                    <el-select
                      v-model="formInline.demand_source"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in demandSources"
                        :label="item.name"
                        :value="item.dictionaryId"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <!-- 需求类型 -->
                  <el-form-item :label="$t('demandNoResolve.reqType')" class="zhong zhong2">
                    <el-select
                      v-model="formInline.demand_type"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in demandTypes"
                        :label="item.name"
                        :value="item.dictionaryId"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <!-- 产业线 -->
                  <el-form-item :label="$t('demandNoResolve.reqLine')" class="zhong zhong2">
                    <el-select
                      v-model="formInline.industry_id"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in demandCodes"
                        :key="item.industry_id"
                        :label="item.industry_name"
                        :value="item.industry_id"
                        :value-key="item.industry_name"
                      />
                    </el-select>
                  </el-form-item>
                  <!-- 需求编码 -->
                  <el-form-item :label="$t('demandNoResolve.reqCode')" class="zhong zhong2">
                    <el-input
                      v-model="formInline.demand_code"
                      :placeholder="$t('demandNoResolve.all')"
                      :disabled="true"
                    >
                      <span
                        slot="suffix"
                        class="pic"
                        @click="searchInput('2', $t('demandNoResolve.reqCode'), 'DemandCoding', formInline.demand_code)"
                      >
                        <img src="../../../assets/index/images/searcho.png" alt>
                      </span>
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <!-- 查询 -->
              <el-col v-if="shrinkFirst" :span="2" class="shrinkTop">
                <el-button type="primary" @click="searchBtn">{{ $t('demandNoResolve.reqSearch') }}</el-button>
              </el-col>
            </template>
            <el-col v-if="shrink" :span="22">
              <el-form ref="formInline" :inline="true" :model="formInline" label-position="right">
                <!-- 第一行 -->
                <!-- 区域 -->
                <el-form-item :label="$t('demandNoResolve.area')" class="zhong">
                  <el-select
                    v-model="formInline.region"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in regions"
                      :label="item.name"
                      :value="item.name"
                      :key="item.name"
                    />
                  </el-select>
                </el-form-item>
                <!-- 需求来源 -->
                <el-form-item :label="$t('demandNoResolve.reqSource')" class="zhong">
                  <el-select
                    v-model="formInline.demand_source"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in demandSources"
                      :label="item.name"
                      :value="item.dictionaryId"
                      :key="item.code"
                    />
                  </el-select>
                </el-form-item>
                <!-- 需求类型 -->
                <el-form-item :label="$t('demandNoResolve.reqType')" class="zhong">
                  <el-select
                    v-model="formInline.demand_type"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in demandTypes"
                      :label="item.name"
                      :value="item.dictionaryId"
                      :key="item.code"
                    />
                  </el-select>
                </el-form-item>
                <!-- 产业线 -->
                <el-form-item :label="$t('demandNoResolve.reqLine')" class="zhong">
                  <el-select
                    v-model="formInline.industry_id"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in demandCodes"
                      :key="item.industry_id"
                      :label="item.industry_name"
                      :value="item.industry_id"
                      :value-key="item.industry_name"
                    />
                  </el-select>
                </el-form-item>
                <!-- 需求编码 -->
                <el-form-item :label="$t('demandNoResolve.reqCode')" class="zhong">
                  <el-input
                    v-model="formInline.demand_code"
                    :placeholder="$t('demandNoResolve.all')"
                    :disabled="true"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="searchInput('2', $t('demandNoResolve.reqCode'), 'DemandCoding', formInline.demand_code)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 第二行 -->
                <!-- 采购经理 -->
                <el-form-item :label="$t('demandNoResolve.reqTaskP')" class="zhong">
                  <el-input
                    v-model="formInline.manager"
                    :placeholder="$t('demandNoResolve.all')"
                    :disabled="true"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="searchInput('3', $t('demandNoResolve.reqTaskP'), 'taskMans', managerCodes)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 物料号 -->
                <el-form-item :label="$t( 'specialNumberDimension.categoryCode' )" class="zhong">
                  <el-input
                    v-model="formInline.module_code"
                    :placeholder="$t('demandNoResolve.all')"
                    :disabled="true"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="searchInput('4', $t( 'specialNumberDimension.categoryCode' ), 'moduleCode', formInline.module_code)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 物料类别 -->
                <el-form-item :label="$t( 'specialNumberDimension.categoryType' )" class="zhong">
                  <el-input
                    v-model="formInline.category_cn"
                    :placeholder="$t('demandNoResolve.all')"
                    :disabled="true"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="searchInput('5', $t( 'specialNumberDimension.categoryType' ), 'category', formInline.category_cn)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 供应商编码 -->
                <el-form-item :label="$t('demandNoResolve.reqCodeG')">
                  <el-input
                    v-model="formInline.supplier_code"
                    :placeholder="$t('demandNoResolve.all')"
                    :disabled="true"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="searchInput('6', $t('demandNoResolve.reqCodeG'), 'supplierCode', formInline.supplier_code)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 供应商名称 -->
                <el-form-item :label="$t('demandNoResolve.reqNameG')">
                  <el-input
                    v-model="formInline.supplier_name"
                    :placeholder="$t('demandNoResolve.all')"
                    :disabled="true"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="searchInput('7', $t('demandNoResolve.reqNameG'), 'supplierName', formInline.supplier_name)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 第三行 -->
                <!-- 任务开始日期 -->
                <el-form-item
                  :label="$t('specialNumberDimension.startDate')"
                  class="zhong dateLabel"
                  style="width: 27%"
                >
                  <el-date-picker
                    :start-placeholder="$t('reqcustomization.startDate')"
                    :end-placeholder="$t('reqcustomization.endDate')"
                    v-model="startDate"
                    type="daterange"
                    range-separator="-"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
                <!-- 任务截止日期 -->
                <el-form-item
                  :label="$t('specialNumberDimension.endDate')"
                  class="zhong"
                  style="width: 27%"
                >
                  <el-date-picker
                    :start-placeholder="$t('reqcustomization.startDate')"
                    :end-placeholder="$t('reqcustomization.endDate')"
                    v-model="endDate"
                    type="daterange"
                    range-separator="-"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-form>
            </el-col>
            <!-- 查询 -->
            <el-col v-if="shrink" :span="2">
              <el-button type="primary" @click="searchBtn">{{ $t('demandNoResolve.reqSearch') }}</el-button>
            </el-col>
          </el-row>
        </div>
      </transition>
      <p class="arrow" @click="rotate">
        <span>
          <i ref="rotate" :class="{rotate: iShow}" class="el-icon-arrow-up"/>
        </span>
      </p>
      <div class="middle2"/>
      <div class="reqTable">
        <!-- 物料号 -->
        <!-- <div class="catetory">
          <p>{{ $t( 'specialNumberDimension.categoryCode' ) }}</p>
          <el-row>
            <el-col :span="6">
              {{ $t( 'specialNumberDimension.Totalmaterials' ) }}：
              <span
                style="font-size: 20px;"
              >{{ materiasNumberSchedule.sum_num }}</span>
            </el-col>
            <el-col :span="18" class="progress">
              <div>
                <span
                  :style="{'width': materiasNumberSchedule.yfj_num/materiasNumberSchedule.sum_num*100 + '%','max-width':'42.5%', 'min-width':'15%'}"
                >{{ $t( 'specialNumberDimension.resolved' ) }}：{{ materiasNumberSchedule.yfj_num }}</span>
                <span
                  :style="{'width': materiasNumberSchedule.fjz_num/materiasNumberSchedule.sum_num*100 + '%','max-width':'42.5%', 'min-width':'15%'}"
                >{{ $t( 'specialNumberDimension.resolving' ) }}：{{ materiasNumberSchedule.fjz_num }}</span>
                <span
                  :style="{'width': materiasNumberSchedule.wfj_num/materiasNumberSchedule.sum_num*100 + '%','max-width':'42.5%', 'min-width':'15%'}"
                >{{ $t( 'specialNumberDimension.resolveWill' ) }}：{{ materiasNumberSchedule.wfj_num }}</span>
              </div>
              <div class="progressBar">
                <span
                  :style="{'width': materiasNumberSchedule.yfj_num/materiasNumberSchedule.sum_num*100 + '%','max-width':'42.5%', 'min-width':'15%'}"
                  :class="[{'showGreen':materiasNumberSchedule.yfj_num/materiasNumberSchedule.sum_num*100>=15}]"
                >
                  <span
                    :style="{'width': materiasNumberSchedule.yfj_num/materiasNumberSchedule.sum_num*100 + '%','max-width':'42.5%'}"
                    class="showGreen"
                  />
                </span>
                <span
                  :style="{'width': materiasNumberSchedule.fjz_num/materiasNumberSchedule.sum_num*100 + '%','max-width':'42.5%', 'min-width':'15%'}"
                  :class="[{'showBlue':materiasNumberSchedule.fjz_num/materiasNumberSchedule.sum_num*100>=15}]"
                >
                  <span
                    :style="{'width': materiasNumberSchedule.fjz_num/materiasNumberSchedule.sum_num*100 + '%','max-width':'42.5%'}"
                    class="showBlue"
                  />
                </span>
                <span
                  :style="{'width': materiasNumberSchedule.wfj_num/materiasNumberSchedule.sum_num*100 + '%','max-width':'42.5%', 'min-width':'15%'}"
                  :class="[{'showYellow':materiasNumberSchedule.wfj_num/materiasNumberSchedule.sum_num*100>=15}]"
                >
                  <span
                    :style="{'width': materiasNumberSchedule.wfj_num/materiasNumberSchedule.sum_num*100 + '%','max-width':'42.5%'}"
                    class="showYellow"
                  />
                </span>
              </div>
            </el-col>
          </el-row>
        </div> -->
        <!-- 取消冻结行 -->
        <div class="req-table-top">
          <div v-if="isShow" class="btn" @click="freeze">
            <el-button v-show="freezeShow" type="primary" plain>
              <i class="fa fa-lock" style="margin-right: 6px;"/>
              {{ $t('demandNoResolve.freezingFunction') }}
            </el-button>
            <el-button v-show="!freezeShow" type="primary" plain>
              <i class="fa fa-unlock-alt" style="margin-right: 6px;"/>
              {{ $t('demandNoResolve.freezingFunctionNo') }}
            </el-button>
          </div>
          <!-- Excel下载 -->
          <div v-if="isShow" class="uploadTabExl">
            <i v-if="isShow" class="borderLine"/>
            <el-button @click="downloadExcel">
              <i class="fa fa- download" style="margin-right: 6px;"/>
              {{ $t('buttonGroup.exlUpload') }}
            </el-button>
          </div>
          <!-- 总记录条数 -->
          <div class="table-top-right">
            <span>
              {{ $t('demandNoResolve.total') }}
              <em style="color: #4A90E2;">{{ total }}</em>
              {{ $t('demandNoResolve.records') }}
            </span>
            <!-- <span>
              <em style="color: #4A90E2;">{{ formInline.currentPage }}</em>/
              <em>{{ tablePaegs }}</em>
            </span>-->
          </div>
        </div>
        <!-- 表格  :show-tooltip="false"-->
        <div class="my-table">
          <div v-show="!freezeShow" class="reqno-slide">
            <el-slider v-model="slidingBlock" :show-tooltip="false" :disabled="isProhibit"/>
          </div>
          <el-table
            :data="tableData"
            :header-cell-style="{'text-align': 'center'}"
            :cell-style="{'text-align': 'center'}"
            stripe
            class="table-style1"
            style="width: 100%"
          >
            <!-- 客户 -->
            <el-table-column
              :label="$t('demandNoResolve.custom')"
              :fixed="silder1"
              prop="customer"
              min-width="100"
            />
            <!-- 区域 -->
            <el-table-column
              :label="$t('demandNoResolve.area')"
              :fixed="silder2"
              prop="region"
              min-width="100"
            />
            <!-- 需求来源 -->
            <el-table-column
              :label="$t('demandNoResolve.reqSource')"
              :fixed="silder3"
              prop="demandSource"
              min-width="180"
            />
            <!-- 需求类型 -->
            <el-table-column
              :label="$t('demandNoResolve.reqType')"
              :fixed="silder4"
              prop="demandType"
              min-width="160"
            />
            <!-- 产业线 -->
            <el-table-column
              :label="$t('demandNoResolve.reqLine')"
              :fixed="silder5"
              prop="industryName"
              min-width="160"
            />
            <!-- 需求编码 -->
            <el-table-column
              :label="$t('demandNoResolve.reqCode')"
              :fixed="silder6"
              prop="demandCode"
              min-width="150"
            />
            <!-- 需求描述 -->
            <el-table-column
              :label="$t('demandNoResolve.reqDesc')"
              :fixed="silder7"
              prop="remarks"
              min-width="240"
            />
            <!-- 任务人 -->
            <el-table-column
              :label="$t('specialNumberDimension.taskMan')"
              :fixed="silder8"
              prop="manager"
              min-width="100"
            />
            <!-- 物料号 -->
            <el-table-column
              :label="$t('demandNoResolve.reqHaoW')"
              prop="moduleCode"
              min-width="150"
            />
            <!-- 物料描述 -->
            <el-table-column
              :label="$t('demandNoResolve.reqDescW')"
              prop="moduleDescribe"
              min-width="240"
            />
            <!-- 物料类型 -->
            <el-table-column
              :label="$t('demandNoResolve.reqTypeW')"
              prop="categoryCn"
              min-width="160"
            />
            <!-- 供应商编码 -->
            <el-table-column
              :label="$t('demandNoResolve.reqCodeG')"
              prop="supplierCode"
              min-width="140"
            />
            <!-- 供应商名称 -->
            <el-table-column
              :label="$t('demandNoResolve.reqNameG')"
              prop="supplierName"
              min-width="240"
            />
            <!-- 价格 -->
            <el-table-column :label="$t('demandNoResolve.reqPrice')" prop="price" min-width="80"/>
            <!-- 价格单位 -->
            <el-table-column
              :label="$t('demandNoResolve.priceUnit')"
              prop="priceUnit"
              min-width="100"
            />
            <!-- 采购单位 -->
            <el-table-column
              :label="$t('demandNoResolve.purchasingUnit')"
              prop="purchasingUnit"
              min-width="160"
            />
            <!-- 币种 -->
            <el-table-column
              :label="$t('demandNoResolve.currency')"
              prop="currency"
              min-width="120"
            />
            <!-- 资源量 -->
            <el-table-column
              :label="$t('demandNoResolve.resource')"
              prop="resourceQuantity"
              min-width="120"
            />
            <!-- 结果公示 -->
            <el-table-column
              :label="$t('demandNoResolve.publicResult')"
              prop="resultDate"
              min-width="120"
            />
            <!-- 采购组 -->
            <el-table-column
              :label="$t('specialNumberDimension.procurementSection')"
              prop="purGroup"
              min-width="150"
            />
            <!-- 采购经理 -->
            <el-table-column
              :label="$t('specialNumberDimension.purchasingManager')"
              prop="employName"
              min-width="150"
            />
            <!-- 任务开始日期 -->
            <el-table-column
              :label="$t('specialNumberDimension.startDate')"
              prop="startReportDate"
              min-width="120"
            />
            <!-- 任务截止日期 -->
            <el-table-column
              :label="$t('specialNumberDimension.endDate')"
              prop="endReportDate"
              min-width="120"
            />
            <!-- 任务填写日期 -->
            <el-table-column
              :label="$t('specialNumberDimension.taskDate')"
              prop="reportDate"
              min-width="120"
            />
            <!-- 任务状态 -->
            <el-table-column
              :label="$t('specialNumberDimension.taskStatus')"
              prop="reportState"
              min-width="100"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.reportState==='0003'"
                >{{ $t('specialNumberDimension.resolved') }}</span>
              </template>
            </el-table-column>
            <!-- 操作 -> 查看历史报价单 -->
            <!-- 采购组历史只存在已分解的 -->
            <el-table-column :label="$t('specialNumberDimension.handle')" width="150">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.reportState === '0003'"
                  type="text"
                  size="small"
                  @click="history(scope.row.reportId)"
                >{{ $t('specialNumberDimension.history') }}</el-button>
                <!-- 查看pdf(签章成功的) -->
                <el-button
                  v-if="scope.row.signedReportAddress !== ''"
                  :style="{'color': '#409EFF'}"
                  type="text"
                  size="small"
                  class="lookPdf"
                  @click="openPdf(scope.row.signedReportAddress)"
                >PDF</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="my-page">
          <el-pagination
            ref="PAGE"
            :current-page.sync="formInline.currentPage"
            :page-size="formInline.pageSize"
            :total="total"
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
    <iframe name="tempiframe" style="display:none"/>
    <!-- <historyBox :historybox="historyData" @refresh="history"/> -->
    <!-- 历史纪录弹窗 -->
    <historyBox :historybox="historyData" @refresh="history" @seeDialog="lookDetail"/>
    <!-- 历史详情弹窗 -->
    <seeDialog :see-dialog="showData"/>
    <!-- 搜索框弹窗 -->
    <searchBox :searchbox="searchData" @tolistenChild="getChildData"/>
    <!-- 供应商弹窗 -->
    <SupplierDialog :supplier-dialog-data="supplierDialogData" @listenSupplier="getSupplier"/>
  </div>
</template>
<script>
import Language from '@/utils/language'
// 数据请求
import { selects, industryLine, flagFindData } from '@/api/requirements'
import { getReportAudit } from '@/api/offersheet'
import { materialNumberSchedule, quotationRequest } from '@/api/quotation'
// 历史记录弹框
// import historyBox from '../exclusive/historyBox'
import historyBox from '@/components/sheetHistory/historyBox'
// 历史详情弹框
import seeDialog from '@/components/sheetHistory/seeDialog'
// 搜索框弹框
import searchBox from '@/components/Dialog/searchBox'
// 供应商弹窗
import SupplierDialog from '@/components/supplier/supplierDialog'
import { timeHandling } from '@/utils/timeHandling'
import { getDemandExcel } from '@/api/downloadurl'
export default {
  name: 'NoReqlist',
  components: {
    historyBox,
    searchBox,
    seeDialog,
    SupplierDialog
  },
  mixins: [Language],
  data() {
    return {
      uploadData: {}, // excel下载参数
      isShow: true, // 控制冻结按钮是否隐藏
      // 收缩按钮判断是否收缩
      shrink: true,
      shrinkFirst: false,
      isProhibit: false, // 列表无数据时禁止冻结表头
      // 列表总条数
      total: 0,
      // 历史记录弹框数据
      historyData: {
        // 弹框显示
        dialogTableVisible: false,
        // 历史记录弹框当前页数
        historyPage: 1,
        historyPageNo: 10,
        // 历史记录弹框数据
        // 历史记录弹框上下页按钮
        historyPrev: true,
        historyNext: false,
        // 历史记录弹框总页数
        // historyTotalPage: 0,
        // 历史记录弹框中表格数据总数
        historyTotal: 0,
        gridData: [
          {
            'reportCheckId': '91fc9db9098711e9b460fa163e23d187',
            'reportVersionId': '1',
            'moduleCode': '12',
            'supplierName': '2',
            'userName': '审核人',
            'time': '2018-12-27',
            'suggestion': '1',
            'type': '1',
            'updateDate': '2018-12-10'
          }
        ]
      },
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
        searchTotalPage: 0,
        // 选中的
        checkList: []
      },
      supplierDialogData: {
        dialogVisible: false,
        // 标识
        identification: '',
        // 承接选中的内容数组
        arrCheck: []
      },
      // 搜索条件
      startDate: '', // 任务开始日期
      endDate: '', // 任务结束日期
      managerCodes: [], // 选中的任务人编号
      categoryCnCode: [], // 物料类别 categoryCode（选中的数据）
      formInline: {
        flag: 2, // 类型
        region: [], // 区域
        demand_source: [], // 需求来源
        demand_type: [], // 需求类型
        industry_id: [], // 产业线id
        demand_code: '', // 需求编码
        manager: '', // 任务人
        manager_code: '', // 任务人工号
        module_code: '', // 物料号
        category_cn: '', // 物料类别
        supplier_code: '', // 供应商编码
        supplier_name: '', // 供应商名称
        start_report_date_s: '', // 任务开始时间开始
        start_report_date_e: '', // 任务开始时间结束
        end_report_date_s: '', // 任务结束时间开始
        end_report_date_e: '', // 任务结束时间结束
        returnCount: '', // 总退回次数 / 总返回次数
        pageSize: 10, // 每页条数
        currentPage: 1 // 页码
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
      demandCodes: [],
      // 供应商名称
      supplierName: [],
      // 物料号
      moduleCodes: [],
      // 物料类别
      cateorys: [],
      // 总退回次数
      taskStatuss: [
        {
          name: '0',
          code: '1'
        },
        {
          name: '>0',
          code: '2'
        },
        {
          name: '全部',
          code: '3'
        }
      ],
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
      materiasNumberSchedule: {
        sum_num: 0,
        yfj_num: 0,
        wfj_num: 0,
        fjz_num: 0
      } // 物料号分解情况
    }
  },
  computed: {
    // 总页数
    tablePaegs() {
      return Math.ceil(this.tableNum / this.formInline.pageSize)
    },
    // 总数
    categoryTotal() {
      return this.materiasNumberSchedule.sum_num
    }
  },
  watch: {
    // 滑块
    slidingBlock(val) {
      if (val < 8.4) {
        this.silder1 = false
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 0
      } else if (val < 16.9) {
        this.silder1 = true
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 8.4
      } else if (val < 32) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 16.9
      } else if (val < 45.4) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 32
      } else if (val < 58.9) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 45.4
      } else if (val < 71.2) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 58.9
      } else if (val < 91.5) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = false
        this.silder8 = false
        this.slidingBlock = 71.2
      } else if (val < 100) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = false
        this.slidingBlock = 91.5
      } else {
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
    // 表格数据，查询按钮
    this.search()
    // 下拉框数据
    this.searchSelect()
    // 产业线数据
    industryLine().then(res => {
      // console.log(res)
      this.demandCodes = res.resultData
    })
  },
  methods: {
    // 子传父数据
    sonToParent(val) {
      // console.log(val)
    },
    // 点击历史记录
    history(row) {
      this.historyData.reportId = row
      // console.log(row)
      var params = {
        report_id: row, // 填报单标识(必填)
        currentPage: this.historyData.historyPage, // 页码
        pageSize: this.historyData.historyPageNo // 页数
      }
      getReportAudit(params).then(res => {
        // console.log('历史记录', res.resultData)
        this.historyData.historyTotal = res.resultData.count
        this.historyData.gridData = res.resultData.data
      })
      this.historyData.dialogTableVisible = true
    },
    // 历史记录弹窗的点击查看详情
    lookDetail(row) {
      // 填报单审核记录reportCheckId
      // 填报单版本id  reportVersionId
      // this.showData.gridData.reportId = row.reportId // 报价单id
      this.showData.gridData.reportDate = row.updateDate // 报价单更新日期
      this.showData.gridData.resultDate = row.resultDate // 结果公示日期
      this.showData.gridData.reportVersionId = row.reportVersionId // 填报单版本标识 (填报必填)
      this.showData.gridData.reportCheckId = row.reportCheckId // 填报单审核标识(只查看必填)
      this.showData.dialogTableVisible = true
      // console.log(this.showData.gridData)
    },
    // 获取当前选中的页面
    handleCurrentChange(val) {
      this.formInline.currentPage = val
      this.search()
    },
    // 中间灰色箭头 / 收缩条
    rotate() {
      this.iShow = !this.iShow
      this.shrink = !this.shrink
      this.shrinkFirst = !this.shrinkFirst
    },
    getDate() {
      // 格式化日期
      if (this.startDate) {
        this.formInline.start_report_date_s = this.startDate[0]
        this.formInline.start_report_date_e = this.startDate[1]
      } else if (this.startDate === null) {
        this.formInline.start_report_date_s = ''
        this.formInline.start_report_date_e = ''
      }
      if (this.endDate) {
        this.formInline.end_report_date_s = this.endDate[0]
        this.formInline.end_report_date_e = this.endDate[1]
      } else if (this.endDate === null) {
        this.formInline.end_report_date_s = ''
        this.formInline.end_report_date_e = ''
      }
    },
    // 查询按钮
    searchBtn() {
      this.formInline.currentPage = 1
      this.search()
    },
    // 获取采购组历史维度的列表 id14
    search() {
      this.tableData = []
      // 获取日期
      this.getDate()
      this.loading = true
      // 传参时需求编码/任务人(采购经理)/物料号/供应商编码/供应商名称及所有下拉框必须为数组
      // 优先传入任务人编号
      var tmp = this.managerCodes.map(function(value, index, array) {
        return value.managerCode
      })
      // 物料类别
      const category_cn_code = this.categoryCnCode.map(function(value, index, array) {
        return value.categoryCode
      })
      this.formInline.manager_code = tmp
      // 参数
      let params = {
        'flag': 2, // 标识
        'bjflag': 3, // 报价标识
        'start_report_date_s': this.formInline.start_report_date_s, // 任务开始日期开始
        'start_report_date_e': this.formInline.start_report_date_e, // 任务开始日期结束
        'end_report_date_s': this.formInline.end_report_date_s, // 任务结束日期开始
        'end_report_date_e': this.formInline.end_report_date_e, // 任务结束日期结束
        'pageSize': this.formInline.pageSize, // 每页条数
        'currentPage': this.formInline.currentPage, // 当前页数
        'region': this.formInline.region, // 区域
        'demand_source': this.formInline.demand_source, // 需求来源
        'demand_type': this.formInline.demand_type, // 需求类型
        'industry_id': this.formInline.industry_id, // 产业线id
        'demand_code': this.formInline.demand_code.split(','), // 需求编码
        'employ_code': this.formInline.manager_code, // 任务人编码（采购经理编码）
        'module_code': this.formInline.module_code.split(','), // 物料号
        'category_cn': this.formInline.category_cn.split(','), // 物料类别
        'supplier_code': this.formInline.supplier_code.split(','), // 供应商编码
        'supplier_name': this.formInline.supplier_name.split(','), // 供应商名称
        'report_state': ['0003'] // 采购组历史只能查看已分解的报价单
      }
      params.category_cn = category_cn_code
      // 删除数组中的空字符串
      if (params.demand_code[0] === '') {
        params.demand_code.splice(0, 1)
      }
      if (params.module_code[0] === '') {
        params.module_code.splice(0, 1)
      }
      if (params.supplier_code[0] === '') {
        params.supplier_code.splice(0, 1)
      }
      if (params.supplier_name[0] === '') {
        params.supplier_name.splice(0, 1)
      }
      // if (params.manager_code[0] === '') {
      //   params.manager_code.splice(0, 1)
      // }
      if (params.category_cn[0] === '') {
        params.category_cn.splice(0, 1)
      }
      this.uploadData = params
      params = JSON.parse(JSON.stringify(params))
      // console.log(params, 'params')
      // params.returnCount = params.returnCount.toString()
      quotationRequest(params).then(res => {
        // console.log(res)
        this.loading = false
        // this.tableData = res.resultData.data
        if (res.resultData.data) {
          this.tableData = res.resultData.data.map((value, index, arr) => {
            if (value.startReportDate) {
              value.startReportDate = timeHandling(value.startReportDate)
            // value.startReportDate = value.startReportDate.substring(0, 10)
            }
            if (value.endReportDate) {
              value.endReportDate = timeHandling(value.endReportDate)
            }
            if (value.resultDate) {
              value.resultDate = timeHandling(value.resultDate)
            }
            if (value.reportDate) {
              value.reportDate = timeHandling(value.reportDate)
            }
            return value
          })
        }
        if (res.resultData.count) {
          this.total = res.resultData.count
        } else {
          this.total = 0
        }
        if (this.tableData.length === 0) {
          this.isProhibit = true
          this.isShow = false
        } else {
          this.isProhibit = false
          this.isShow = true
        }
      }).catch(err => {
        if (this.tableData.length === 0) {
          this.isProhibit = true
          this.isShow = false
        } else {
          this.isProhibit = false
          this.isShow = true
        }
        console.log(err)
      })
      this.materialNumberSchedule() // 物料号进度
      // console.log(this.formInline)
    },
    // 物料号进度 id28
    materialNumberSchedule() {
      // 获取日期
      this.getDate()
      // 路由接参的需求编码
      if (this.$route.query.demand_code) {
        this.formInline.demand_code = this.$route.query.demand_code
      }
      var tmp = this.managerCodes.map(function(value, index, array) {
        return value.managerCode
      })
      this.formInline.manager_code = tmp
      let params = {
        region: this.formInline.region, // 区域
        demand_source: this.formInline.demand_source, // 需求来源
        demand_type: this.formInline.demand_type, // 需求类型
        demand_code: this.formInline.demand_code.split(','), // 需求编码
        demand_analysis_id: [], // 需求id
        manager: [], // 任务人
        manager_code: this.formInline.manager_code, // 任务人编号
        supplier_code: this.formInline.supplier_code.split(','), // 供应商编码
        supplier_name: this.formInline.supplier_name.split(','), // 供应商名称
        starttime_begin: this.formInline.start_report_date_s, // 任务开始日期开始
        starttime_end: this.formInline.start_report_date_e, // 任务开始日期结束
        overtime_begin: this.formInline.end_report_date_s, // 任务截止日期开始
        overtime_end: this.formInline.end_report_date_e, // 任务截止日期结束
        industry_id: this.formInline.industry_id, // 产业线id
        progress_begin: this.formInline.crate_s, // 完成率开始
        progress_end: this.formInline.crate_e, // 完成率结束
        module_analysis_id: this.formInline.module_code.split(','), // 物料号
        category_en: [] // 物料类别
      }
      if (params.demand_code[0] === '') {
        params.demand_code.splice(0, 1)
      }
      if (params.module_analysis_id[0] === '') {
        params.module_analysis_id.splice(0, 1)
      }
      if (params.supplier_code[0] === '') {
        params.supplier_code.splice(0, 1)
      }
      if (params.supplier_name[0] === '') {
        params.supplier_name.splice(0, 1)
      }
      if (params.manager_code[0] === '') {
        params.manager_code.splice(0, 1)
      }
      params = JSON.parse(JSON.stringify(params))
      materialNumberSchedule(params).then(res => {
        this.materiasNumberSchedule = res.resultData
        // console.log(this.materiasNumberSchedule, '需求号进度')
      }).catch(err => {
        console.log(err)
      })
    },
    // 筛选条件下拉框
    searchSelect() {
      selects({
        typeCodes: '002,003,004,008,009,010,011,012'
      }).then(res => {
        // console.log(res.resultData)
        this.regions = res.resultData['002']
        this.demandSources = res.resultData['003']
        this.demandTypes = res.resultData['004']
      })
    },
    // 模糊匹配弹框
    searchInput(nameVal, searchTitle, name, checkValue) {
      const params = {
        flag: nameVal
      }
      this.searchData.searchJian = name
      // 传过去回显check数据
      this.searchData.checkList = []
      if (checkValue !== '') {
        if (checkValue === this.managerCodes) {
          this.searchData.checkList = this.managerCodes.map(function(value, index, array) {
            return value.manager
          })
        } else if (checkValue !== '') {
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
        this.formInline.category_cn = val.checkedCities.join(',')
        this.categoryCnCode = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.categoryCn) {
              return value
            }
          }
        })
      } else if (val.inputValue === 'supplierCode') {
        this.formInline.supplier_code = val.checkedCities.join(',')
      } else if (val.inputValue === 'supplierName') {
        this.formInline.supplier_name = val.checkedCities.join(',')
      } else if (val.inputValue === 'moduleCode') {
        this.formInline.module_code = val.checkedCities.join(',')
      } else if (val.inputValue === 'DemandCoding') {
        this.formInline.demand_code = val.checkedCities.join(',')
      } else if (val.inputValue === 'taskMans') {
        this.formInline.manager = val.checkedCities.join(',')
        this.managerCodes = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.manager) {
              return value
            }
          }
        })
        // var val1 = JSON.parse(JSON.stringify(val))
        // this.managerCodes = val.checkedCities
        // // console.log(this.managerCodes, 'this.managerCodes')
        // var tmp1 = val1.checkedCities.map(function(value, index, array) {
        //   return value.manager
        // })
        // this.formInline.manager = tmp1.join(',')
      }
    },
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
    // 供应商数据
    getSupplier(res) {
      if (this.supplierDialogData.identification === 'supplierCode') {
        this.formInline.supplierCode = res.checkList.join(',')
      } else if (this.supplierDialogData.identification === 'supplierName') {
        this.formInline.supplierName = res.checkList.join(',')
      }
    },
    // 冻结按钮
    freeze() {
      this.freezeShow = !this.freezeShow
      this.slidingBlock = 0
    },
    // 打开签章后的pdf
    openPdf(url) {
      window.open(url, '_blank')
    },
    // excel下载
    downloadExcel() {
      const params = {
        // 'excelName': '报价管理-采购组历史维度',
        // 'keyName': ['customer', 'region', 'demandSource', 'demandType', 'industryName', 'demandCode', 'remarks', 'manager', 'moduleCode', 'moduleDescribe', 'categoryCn', 'supplierCode', 'supplierName', 'price', 'priceUnit', 'purchasingUnit', 'currency', 'resourceQuantity', 'resultDate', 'purGroup', 'employName', 'startReportDate', 'endReportDate', 'reportDate', 'reportStateName'],
        'searchParams': {}
        // 'headers': [
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
        //     'headerOne': '结果公示',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '采购组',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '采购经理',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务开始日期',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务截止日期',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务填写日期',
        //     'headerLast': []
        //   },
        //   {
        //     'headerOne': '任务状态',
        //     'headerLast': []
        //   }
        // ]
      }
      params.searchParams = JSON.parse(JSON.stringify(this.uploadData))
      params.searchParams.currentPage = 1
      params.searchParams.pageSize = 10000
      // window.open(getDemandExcel(params))
      const a = document.createElement('a')
      const url = getDemandExcel(params)
      document.body.appendChild(a)
      a.target = 'tempiframe' // 链接错误时不跳转
      a.href = url
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }
  }
}
</script>

<style>
.zhong .el-select__tags {
  white-space: nowrap;
}
.zhong .el-tag--small {
  padding: 0px 5px;
}
.zhong .el-date-editor .el-range__icon {
  color: #606266;
}
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
  height: 24px; /* border: 2px solid #409eff; */
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
.exclu-box .el-form--inline .el-form-item {
  width: 18%;
}
.exclu-box .el-form--inline .el-form-item__label {
  width: 30%;
  line-height: 20px;
}
.dateLabel .el-form--inline .el-form-item__label {
  width: 21%;
}
.exclu-box .el-form--inline .el-form-item:nth-child(1).el-form-item__label {
  width: 21%;
}
.exclu-box label {
  font-weight: normal;
}
.exclu-box .el-form-item.zhong label {
  position: relative;
  top: 50%;
  margin-top: 8px;
}
.exclu-box .el-form-item.zhong2 {
  margin-bottom: 0;
}
.exclu-box.exclusive .el-row .el-input__inner,
.exclu-box.exclusive .el-range-editor .el-range-input {
  width: 100%;
  background-color: #f9f9f9;
  box-shadow: none;
}
.exclu-box .el-form--inline .el-form-item__content {
  width: 70%;
}
.exclu-box .el-row .el-col.el-col-22 {
  border-right: 1px solid #cecece;
}
/* 查询按钮 */
.req-top .el-input.is-disabled .el-input__inner {
  color: #606266;
}
.req-top .el-input--suffix .el-input__inner {
  padding-right: 36px;
}
.exclu-box .req-top .el-button {
  position: relative;
  left: 24%;
  margin-top: 50%;
}
.exclu-box .req-top .shrinkTop .el-button {
  margin-top: 0;
}
.exclu-box .req-top .el-form .el-input span.pic {
  border-left: 1px solid #cecece;
  display: inline-block;
  height: 24px;
  width: 32px;
  margin-top: 24%;
  padding-left: 0 20%;
}
.exclu-box .req-top .el-form .el-input span.pic img {
  display: inline-block;
  padding: 0;
  margin-bottom: 15%;
  cursor: pointer;
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
.reqTable .el-table th,
.reqTable .el-table tr {
  color: #4a4a4a;
}
/* .reqTable .el-table th {
  border-top: 2px solid #7897a1;
} */
.reqTable .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #f4f4f4;
}
.reqTable .el-button--small {
  font-size: 14px;
}
</style>

<style scoped>
/* 物料号 */
.catetory {
  border-bottom: 1px solid #cecece;
  padding-bottom: 1%;
  margin-bottom: 1%;
  position: relative;
}
.progress {
  position: absolute;
  right: 0;
  top: -25px;
}
.catetory p {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
}
.catetory .el-col div {
  display: flex;
  margin-bottom: 2px;
}
.catetory .el-col div span {
  display: inline-block;
  text-align: left;
  margin: 0 2px 10px 2px;
  font-size: 16px;
}
.catetory .el-col div:last-child span:nth-of-type(1) {
  height: 14px;
  /* background-color: #05cd00; */
  border-radius: 4px;
}
.catetory .el-col div:last-child span:nth-of-type(2) {
  height: 14px;
  /* background-color: #007cff; */
  border-radius: 4px;
}
.catetory .el-col div:last-child span:nth-of-type(3) {
  height: 14px;
  /* background-color: #ff9e00; */
  border-radius: 4px;
}
.showGreen {
  background-color: #05cd00;
}
.showBlue {
  background-color: #007cff;
}
.showYellow {
  background-color: #ff9e00;
}

/* 背景大盒子 */
.exclu-box {
  background-color: #f4f4f4;
  padding: 18px;
}
.exclu-box span,
.exclu-box em {
  font-style: normal;
  font-size: 14px;
}
/* 里面盒子 */
.exclu2 {
  /* background-color: #fff; */
  /* border: 1px solid #d1d1d1; */
}
.exclu2 .req-top {
  padding: 34px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  position: relative;
  border-radius: 4px;
}
.exclu2 .middle2 {
  height: 1vw;
  background-color: #f4f4f4;
}
/* 中间灰色小箭头 */
.exclu2 .arrow {
  width: 100%;
  transition: all 0.5s;
  background-color: #f4f4f4;
  position: relative;
}
.exclu2 .arrow span {
  display: inline-block;
  width: 3.15%;
  height: 16px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-top: none;
  border-radius: 0 0 5px 5px;
  color: #333;
  position: absolute;
  left: 50%;
  top: 0;
  text-align: center;
  margin-left: -25px;
  cursor: pointer;
}
.exclu2 .arrow span i.rotate {
  transform: rotate(180deg);
}
/* 下面表格 */
.reqTable {
  padding: 12px 15px;
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
}
.req-table-top .btn img {
  cursor: pointer;
}
.req-table-top .table-top-right {
  float: right;
  margin-top: 15px;
}

.reqTable .my-table {
  /* position: relative;
  padding-top: 1.5%; */
}
.reqTable .my-table .reqno-slide {
  /* position: absolute;
  left: 0;
  top: 0;
  z-index: 10; */
  width: 1192px;
}
.reqTable .my-table .reqno-slide span {
  display: inline-block;
  width: 2%;
  border-top: 2px dashed #1875f0;
  margin-top: -0.5%;
  background-color: #1875f0;
  vertical-align: middle2;
}
.reqTable .my-table .reqno-slide .img-move {
  cursor: pointer;
  position: relative;
}
/* 分页 */
.reqTable .my-page {
  padding: 20px 0;
  text-align: center;
}
/* 进度条字体 */
.catetory .progressBar {
  font-size: 16px;
}
.lookPdf{
  margin-left: 10px;
}
.uploadTabExl{
  margin-left: 25px;
  float: left;
}
.uploadTabExl .el-button{
  color: #1875f0;
  border-color: #4a90e2;
}
.borderLine{
    display: inline-block;
    width: 1px;
    height: 27px;
    vertical-align: middle;
    margin-right: 22px;
    background: #979797;
}
</style>
