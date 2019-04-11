/*
 * @Page: 报价单填报 -> 物料号维度
 * @Author: zp
 * @Date: 2018-11
 * @Last Modified by: zp
 */
<template>
  <div ref="BOXEclu" class="exclu-box exclusive">
    <div v-loading="loading" class="exclu">
      <transition name="el-zoom-in-top">
        <div class="req-top">
          <el-row>
            <!-- 收缩按钮后只展示第一行查询条件 -->
            <template>
              <el-col v-if="shrinkFirst" :span="22">
                <el-form ref="searchForm" :inline="true" :model="searchForm" label-position="right">
                  <!-- 第一行 -->
                  <!-- 区域 -->
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
                        :value="item.name"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <!-- 需求来源 -->
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
                        :value="item.name"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <!-- 需求类型 -->
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
                        :value="item.name"
                        :key="item.code"
                      />
                    </el-select>
                  </el-form-item>
                  <!-- 产业线 -->
                  <el-form-item :label="$t('demandNoResolve.reqLine')" class="zhong zhong2">
                    <el-select
                      v-model="searchForm.productLineCode"
                      :placeholder="$t('demandNoResolve.select')"
                      multiple
                      collapse-tags
                    >
                      <el-option
                        v-for="item in productLineCode"
                        :label="item.industry_name"
                        :value="item.industry_id"
                        :key="item.industry_id"
                      />
                    </el-select>
                  </el-form-item>
                  <!-- 需求编码 -->
                  <el-form-item :label="$t('demanddimension.searchbar.demandNum')" class="zhong zhong2">
                    <el-input
                      v-model="searchForm.demandCode"
                      :placeholder="$t('demandNoResolve.all')"
                      :disabled="true"
                    >
                      <span
                        slot="suffix"
                        class="img"
                        @click="findDemandFilter('2', $t('breakDown.DemandCoding'), 'DemandCoding',searchForm.demandCode)"
                      >
                        <img src="../../../assets/index/images/searcho.png" alt>
                      </span>
                    </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <!-- 查询 -->
              <el-col :span="2" class="shrinkTop shrinkTop2">
                <el-button v-if="shrinkFirst" type="primary" @click="searchBon">{{ $t('buttonGroup.search') }}</el-button>
              </el-col>
            </template>
            <!-- 收缩按钮不收缩的适合展示的查询条件 -->
            <el-col v-if="shrink" :span="22">
              <el-form ref="searchForm" :inline="true" :model="searchForm" label-position="right">
                <!-- 第一行 -->
                <!-- 区域 -->
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
                      :value="item.name"
                      :key="item.code"
                    />
                  </el-select>
                </el-form-item>
                <!-- 需求来源 -->
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
                      :value="item.name"
                      :key="item.code"
                    />
                  </el-select>
                </el-form-item>
                <!-- 需求类型 -->
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
                      :value="item.name"
                      :key="item.code"
                    />
                  </el-select>
                </el-form-item>
                <!-- 产业线 -->
                <!-- <el-form-item :label="$t('demandNoResolve.reqLine')" class="zhong">
                  <el-input
                    v-model="searchForm.productLineCode"
                    :placeholder="$t('demandNoResolve.all')"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="findIndustry('', $t('demandNoResolve.reqLine'), 'getIndustry')"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>-->
                <el-form-item :label="$t('demandNoResolve.reqLine')" class="zhong">
                  <el-select
                    v-model="searchForm.productLineCode"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in productLineCode"
                      :label="item.industry_name"
                      :value="item.industry_id"
                      :key="item.industry_id"
                    />
                  </el-select>
                </el-form-item>
                <!-- 需求编码 -->
                <!-- <el-form-item :label="$t('demanddimension.searchbar.demandNum')" class="zhong">
                  <el-select
                    v-model="searchForm.demandCode"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in demandCodes"
                      :label="item.demandCode"
                      :value="item.demandCode"
                      :key="item.demandCode"
                    />
                  </el-select>
                </el-form-item>-->
                <el-form-item :label="$t('demanddimension.searchbar.demandNum')" class="zhong">
                  <el-input
                    v-model="searchForm.demandCode"
                    :placeholder="$t('demandNoResolve.all')"
                    :disabled="true"
                  >
                    <span
                      slot="suffix"
                      class="img"
                      @click="findDemandFilter('2', $t('breakDown.DemandCoding'), 'DemandCoding',searchForm.demandCode)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- 第二行 -->
                <!-- 采购经理 -->
                <el-form-item :label="$t('demandNoResolve.manager')" class="zhong">
                  <el-input v-model="searchForm.manager" :disabled="true">
                    <span
                      slot="suffix"
                      class="img"
                      @click="findDemandFilter('3', $t('demandNoResolve.manager'), 'purchaseMan',searchForm.manager)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t('demandNoResolve.manager')" class="zhong">
                  <el-input v-model="searchForm.manager" :placeholder="$t('demandNoResolve.all')">
                    <span
                      slot="suffix"
                      class="pic"
                      @click="searchInput('customer', searchForm.manager, searchForm.pageNo, $t('demandNoResolve.manager'))"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>-->
                <!-- 物料号 -->

                <el-form-item :label="$t( 'specialNumberDimension.categoryCode' )" class="zhong">
                  <el-input
                    v-model="searchForm.categoryCode"
                    :placeholder="$t('demandNoResolve.all')"
                    :disabled="true"
                  >
                    <span
                      slot="suffix"
                      class="img"
                      @click="findDemandFilter('4', $t('breakDown.MATNR'), 'moduleCode',searchForm.categoryCode)"

                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>

                <!-- <el-form-item :label="$t( 'specialNumberDimension.categoryCode' )" class="zhong">
                  <el-select
                    v-model="searchForm.categoryCode"
                    :placeholder="$t('demandNoResolve.select')"
                    multiple
                    collapse-tags
                  >
                    <el-option
                      v-for="item in categoryCodes"
                      :label="item.moduleCode"
                      :value="item.moduleCode"
                      :key="item.moduleCode"
                    />
                  </el-select>
                </el-form-item> -->
                <!-- 物料类别 -->
                <el-form-item :label="$t('breakDown.MaterialType')" class="zhong">
                  <el-input
                    v-model="searchForm.categoryCn"
                    :placeholder="$t('demandNoResolve.all')"
                    :disabled="true"
                  >
                    <span
                      slot="suffix"
                      class="img"
                      @click="findDemandFilter('5', $t('breakDown.MaterialType'), 'category',searchForm.categoryCn)"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t( 'specialNumberDimension.categoryType' )" class="zhong">
                  <el-input
                    v-model="searchForm.categoryCn"
                    :placeholder="$t('demandNoResolve.all')"
                  >
                    <span
                      slot="suffix"
                      class="pic"
                      @click="searchInput('demand_code', searchForm.categoryCn, searchForm.pageNo, $t('demandNoResolve.select'))"
                    >
                      <img src="../../../assets/index/images/searcho.png" alt>
                    </span>
                  </el-input>
                </el-form-item>-->
                <!-- 任务开始日期 -->
                <el-form-item
                  :label="$t('specialNumberDimension.startDate')"
                  class="zhong time"
                  style="width: 37%"
                >
                  <el-date-picker
                    v-model="searchForm.startDate"
                    type="daterange"
                    range-separator="-"
                    start-placeholder
                    end-placeholder
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
                <!-- 第三行 -->
                <!-- 任务结束日期 -->
                <el-form-item
                  :label="$t('specialNumberDimension.endDate')"
                  class="zhong time time3"
                  style="width: 37%"
                >
                  <el-date-picker
                    v-model="searchForm.endDate"
                    type="daterange"
                    range-separator="-"
                    start-placeholder
                    end-placeholder
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </el-form>
            </el-col>
            <!-- 查询 -->
            <el-col v-if="shrink" :span="2">
              <el-button type="primary" @click="searchBon">{{ $t('buttonGroup.search') }}</el-button>
            </el-col>
          </el-row>
        </div>
      </transition>
      <p class="arrow" @click="rotate">
        <span>
          <i ref="rotate" :class="{rotate: iShow}" class="el-icon-arrow-up"/>
        </span>
      </p>
      <div class="middle"/>
      <div class="req-table">
        <!-- 物料号 -->
        <!-- <div class="catetory">

          <el-row>
            <el-col :span="4">
              {{ $t( 'specialNumberDimension.categoryCode' ) }}
            </el-col>
            <el-col :span="4">
              {{ $t( 'specialNumberDimension.totalCategory' ) }}：
              <span
                style="font-size: 20px;"
              >{{ parseInt(categoryNum.fjz_num) + parseInt(categoryNum.wfj_num) }}</span>
            </el-col>
            <el-col :span="16">
              <div>

                <span
                  style="margin-right:7%"
                >
                  <span style="width:14px;height:14px;background-color:#007cff;margin-bottom:0"/>
                  <span style="line-height:14px;">{{ $t( 'specialNumberDimension.resolving' ) }}：{{ categoryNum.fjz_num }}</span>
                </span>
                <span
                  style="margin-right:7%"
                >
                  <span style="width:14px;height:14px;background-color:#ff9e00;margin-bottom:0"/>
                  <span style="line-height:14px;">{{ $t( 'specialNumberDimension.resolveWill' ) }}：{{ categoryNum.wfj_num }}</span>
                </span>
              </div>

          </el-col></el-row>
        </div> -->
        <!-- 取消冻结行 -->
        <div class="req-table-top">
          <div v-show="tableData" class="btn" @click="freeze">
            <el-button v-show="freezeShow" type="primary" plain>
              <i class="fa fa-lock" style="margin-right: 6px;"/>
              {{ $t('buttonGroup.frozen') }}
            </el-button>
            <el-button v-show="!freezeShow" type="primary" plain>
              <i class="fa fa-unlock-alt" style="margin-right: 6px;"/>
              {{ $t('buttonGroup.unfreeze') }}
            </el-button>
          </div>
          <!-- 上传下载先不用 -->
          <!-- 上传组件 -->
          <!-- 下载 -->
          <div v-show="tableData" class="btn-up-down">
            <i style="display: inline-block;width: 1px;height: 27px;vertical-align: middle;margin-right: 25px;background: #979797;"/>
            <el-button type="primary" plain @click="tableDownload">
              <i class="fa fa-download" style="margin-right: 6px;"/>
              <span>{{ $t('buttonGroup.exlUpload') }}</span>
            </el-button>
          </div>

          <!-- <uploadBox :upload-box="uploadData" :name="$t('buttonGroup.batchUpload')"/> -->

          <!-- <el-button v-if="!tableCheckbox" type="primary" plain @click="tableCheckChange">
              <i class="fa fa-download" style="margin-right: 6px;"/>
              <span>{{ $t('buttonGroup.batchDownload') }}</span>
            </el-button>
            <el-button v-else type="primary" plain @click = "downLoda">
              <i class="fa fa-download" style="margin-right: 6px;"/>
              <span>{{ $t('buttonGroup.download') }}</span>
            </el-button> -->
          <!-- 3.22样式修改 -->
          <span
            style="margin:0 2% 0 13%;height:40px;line-height:40px;min-width:10%;max-width:15%;white-space: nowrap;
           overflow: hidden;
          text-overflow: ellipsis;">
            {{ $t( 'specialNumberDimension.Total' ) }}：
            <span
            >{{ parseInt(categoryNum.fjz_num) + parseInt(categoryNum.wfj_num) }}</span>
          </span>
          <span
            style="margin-right:2%;height:40px;line-height:40px;min-width:10%;max-width:15%;white-space: nowrap;
           overflow: hidden;
          text-overflow: ellipsis;"
          >
            <span style="border-radius:5px;display:inline-block;width:14px;height:14px;background-color:#007cff;margin-bottom:0"/>
            <span style="line-height:14px;">{{ $t( 'specialNumberDimension.resolving' ) }}：{{ categoryNum.fjz_num }}</span>
          </span>
          <span
            style="margin-right:2%;height:40px;line-height:40px;min-width:10%;max-width:15%;white-space: nowrap;
           overflow: hidden;
          text-overflow: ellipsis;"
          >
            <span style="border-radius:5px;display:inline-block;width:14px;height:14px;background-color:#ff9e00;margin-bottom:0"/>
            <span style="line-height:14px;">{{ $t( 'specialNumberDimension.resolveWill' ) }}：{{ categoryNum.wfj_num }}</span>
          </span>

          <div class="table-top-right">
            <span>
              {{ $t('demandNoResolve.total') }}
              <em style="color: #4A90E2;">{{ tableNum }}</em>
              {{ $t('demandNoResolve.records') }}
            </span>
            <!-- <span>
              <em style="color: #4A90E2;">{{ searchForm.pageNo }}</em>/
              <em>{{ tablePaegs }}</em>
            </span>-->
          </div>
        </div>
        <div class="my-table">
          <div v-show="!freezeShow" class="reqno-slide">
            <el-slider v-model="slidingBlock" :show-tooltip="false"/>
          </div>
          <el-table
            :data="tableData"
            :header-cell-style="{'text-align': 'center'}"
            :cell-style="{'text-align': 'center'}"
            stripe
            class="table-style1"
            style="width: 100%"
            @selection-change="chooseRow"
          >
            <el-table-column v-if="tableCheckbox" type="selection" width="35"/>
            <!-- 操作 -->
            <el-table-column :label="$t('specialNumberDimension.handle')" :fixed="silder1" width="150">
              <!-- 查看（已分解） -->
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.reportState==='0003'"
                  type="text"
                  size="small"
                  @click="look(scope.row)"
                >{{ $t('specialNumberDimension.look') }}</el-button>
                <!-- 处理（未分解、分解中） -->
                <!-- <el-button
                  v-if="scope.row.reportState==='0001' || scope.row.reportState==='0002' || scope.row.reportState==='0004'"
                  type="text"
                  size="small"
                  @click="deal(scope.row)"
                >{{ $t('specialNumberDimension.deal') }}</el-button> -->
                <el-button
                  v-if="scope.row.taskState !=='0003' && (scope.row.reportState==='0001' || scope.row.reportState==='0002' || scope.row.reportState==='0004')"
                  type="text"
                  size="small"
                  @click="deal(scope.row)"
                >{{ $t('specialNumberDimension.deal') }}</el-button>
                <el-button
                  v-if="scope.row.taskState ==='0003'"
                  disabled
                  type="text"
                  size="small"
                  @click="deal(scope.row)"
                >{{ $t('specialNumberDimension.deal') }}</el-button>
                <!-- 历史查看(0001,0002不可以点击。0003,0004可以点击) -->
                <el-button
                  v-if="scope.row.reportState === '0001' || scope.row.reportState === '0002'"
                  disabled
                  type="text"
                  size="small"
                >{{ $t('specialNumberDimension.history') }}</el-button>
                <el-button
                  v-if="scope.row.reportState === '0003' || scope.row.reportState === '0004'"
                  type="text"
                  size="small"
                  @click="history(scope.row.reportId)"
                >{{ $t('specialNumberDimension.history') }}</el-button>
              </template>
            </el-table-column>
            <!-- 客户 -->
            <el-table-column
              :label="$t('demandNoResolve.custom')"
              :fixed="silder2"
              prop="customer"
              min-width="80"
            />
            <!-- 区域 -->
            <el-table-column
              :label="$t('demandNoResolve.area')"
              :fixed="silder3"
              prop="region"
              min-width="100"
            />
            <!-- 需求来源 -->
            <el-table-column
              :label="$t('demandNoResolve.reqSource')"
              :fixed="silder4"
              prop="demandSource"
              min-width="80"
            />
            <!-- 需求类型 -->
            <el-table-column
              :label="$t('demandNoResolve.reqType')"
              :fixed="silder5"
              prop="demandType"
              min-width="120"
            />
            <!-- 产业线 -->
            <el-table-column
              :label="$t('demandNoResolve.reqLine')"
              :fixed="silder6"
              prop="industryName"
              min-width="110"
            />
            <!-- 需求编码 -->
            <el-table-column
              :label="$t('demandNoResolve.reqCode')"
              :fixed="silder7"
              prop="demandCode"
              min-width="120"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.demandCode }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.demandCode }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 需求描述 -->
            <el-table-column
              :label="$t('demandNoResolve.reqDesc')"
              :fixed="silder8"
              prop="remarks"
              min-width="160"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.remarks }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.remarks }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 采购经理 -->
            <el-table-column
              :label="$t('demandNoResolve.manager')"
              :fixed="silder9"
              prop="manager"
              min-width="100"
            />
            <!-- 物料号 -->
            <el-table-column
              :label="$t('demandNoResolve.reqHaoW')"
              :fixed="silder10"
              prop="moduleCode"
              min-width="150"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.moduleCode }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.moduleCode }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 物料描述 -->
            <el-table-column
              :label="$t('demandNoResolve.reqDescW')"
              prop="moduleDescribe"
              min-width="160"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.moduleDescribe }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.moduleDescribe }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 物料类型 -->
            <el-table-column
              :label="$t('demandNoResolve.reqTypeW')"
              prop="categoryCn"
              min-width="120"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.categoryCn }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.categoryCn }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 价格 -->
            <el-table-column :label="$t('demandNoResolve.reqPrice')" prop="price" width="80">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.price }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.price }}</div>
                </el-popover>
              </template>
            </el-table-column>
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
              min-width="100"
            />
            <!-- 币种 -->
            <el-table-column
              :label="$t('demandNoResolve.currency')"
              prop="currency"
              min-width="90"
            />
            <!-- 资源量 -->
            <el-table-column
              :label="$t('demandNoResolve.resource')"
              prop="resourceQuantity"
              min-width="80"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="right">
                  <p>{{ scope.row.resourceQuantity }}</p>
                  <div slot="reference" class="unallshow">{{ scope.row.resourceQuantity }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- 模块BOM标识 -->
            <el-table-column
              :label="$t('demandNoResolve.BOMSign1')"
              prop="modelIdentName"
              min-width="110"
            />
            <!-- 购销BOM标识 -->
            <el-table-column
              :label="$t('demandNoResolve.BOMSign2')"
              prop="saleIdentName"
              min-width="120"
            />
            <!-- 任务开始日期 -->
            <el-table-column
              :label="$t('materielNumForTask.taskStart')"
              prop="startReportDate"
              min-width="110"
            />
            <!-- 截止日期 -->
            <el-table-column
              :label="$t('materielNumForTask.expirationDate')"
              prop="endReportDate"
              min-width="130"
            />
            <!-- 任务填写日期 -->
            <el-table-column
              :label="$t('specialNumberDimension.taskDate')"
              prop="reportDate"
              min-width="110"
            />
            <!-- 任务状态 0001：未分解,0002：分解中,0003：已分解,0004：分解中 -->
            <el-table-column
              :label="$t('specialNumberDimension.taskStatus')"
              prop="reportState"
              min-width="110"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.reportState==='0001'">未分解</span>
                <span v-if="scope.row.reportState==='0002'">分解中</span>
                <span v-if="scope.row.reportState==='0003'">已分解</span>
                <span v-if="scope.row.reportState==='0004'">分解中</span>
              </template>
            </el-table-column>
            <!-- 退回次数 -->
            <el-table-column
              :label="$t('specialNumberDimension.return')"
              prop="zcount"
              min-width="80"
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
    <!-- 历史记录 -->
    <historyBox :historybox="historyData" @refresh="history" @seeDialog="lookDetail"/>
    <!-- 历史详情弹窗 -->
    <seeDialog :see-dialog="showData"/>
    <!-- 搜索弹窗 -->
    <searchBox :searchbox="searchData" @tolistenChild="getChildData"/>
    <iframe name = "tempiframe" style="display:none"/>
  </div>
</template>
<script>
import Language from '@/utils/language'
import { timeHandling } from '@/utils/timeHandling'
// 数据请求
import { getResolveModuleProgress, getListPrivate, getReportAudit } from '@/api/offersheet'
import { selects, modules, industryLine } from '@/api/requirements'
import { search } from '@/api/quoteoperational'
// 模糊搜索弹窗
import { flagFindData } from '@/api/requirements'
// 历史记录弹框
import historyBox from '@/components/sheetHistory/historyBox'
// 历史详情弹框
import seeDialog from '@/components/sheetHistory/seeDialog'
// 搜索框弹框
import searchBox from '@/components/Dialog/searchBox'
// 上传弹框
import uploadBox from '@/views/offersheet/listprivate/uploadBox'
import { mapGetters } from 'vuex'
import { judgeUrl } from '@/utils/api'
import { getDemandExcel } from '@/api/downloadurl'
export default {
  name: 'Listprivate',
  components: {
    historyBox,
    searchBox,
    uploadBox,
    seeDialog
  },
  mixins: [Language],
  data() {
    return {
      // 搜索栏提交数据
      selectData: {},
      // 选中的下载数据
      downLodaData: [],
      // 收缩按钮判断是否收缩
      shrink: true,
      shrinkFirst: false,
      // 物料号分解完成度
      categoryNum: {
        sum_num: '0', // 总数量
        wfj_num: '0', // 未分解数量
        yfj_num: '0', // 已分解数量
        fjz_num: '0' // 分解中数量
      },
      // categoryEd: 2505, // 已分解
      // categoryIng: 1506, // 分解中
      // categoryWill: 1000, // 未分解

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
      // 历史记录弹框数据
      historyData: {
        loading: true,
        // 弹框显示
        dialogTableVisible: false,
        // 历史记录弹框当前页数
        historyPage: 1,
        // 历史记录弹框一页条数
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
          // {
          //   'reportCheckId': '91fc9db9098711e9b460fa163e23d187',
          //   'reportVersionId': '1',
          //   'moduleCode': '12',
          //   'supplierName': '2',
          //   'userName': '审核人',
          //   'time': '2018-12-27',
          //   'suggestion': '1',
          //   'type': '1',
          //   'updateDate': '2018-12-10'
          // },
          // {
          //   'reportCheckId': '2',
          //   'reportVersionId': '1',
          //   'moduleCode': '12',
          //   'supplierName': '2',
          //   'userName': '1',
          //   'time': '2018-12-27',
          //   'suggestion': '1',
          //   'type': '1',
          //   'updateDate': '2018-12-10'
          // }

        ]
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
      // 选中的采购经理 managerCodes
      managerCodes: [],
      // 选中的物料类别 categoryCode
      categoryCnCode: [],
      // 搜索条件
      searchForm: {
        region: '', // 区域
        demandSource: '', // 需求来源
        demandType: '', // 需求类型
        demandCode: '', // 需求编码
        productLineCode: '', // 产业线
        manager: '', // 采购经理
        categoryCn: '', // 物料类别
        categoryCode: '', // 物料号
        startDate: '', // 任务开始日期
        endDate: '', // 任务结束日期
        pageSize: 10, // 每页条数
        pageNo: 1 // 页码
      },
      searchForm1: {
        region: '', // 区域
        demand_source: '', // 需求来源
        demand_type: '', // 需求类型
        demand_code: '', // 需求编码
        industry: '', // 产业线
        manager: '', // 采购经理（无）
        category_en: '', // 物料类别
        module_analysis_id: '', // 物料号
        startDate: '', // 任务开始日期
        endDate: '', // 任务结束日期
        pageSize: 10, // 每页条数
        pageNo: 1 // 页码
      },
      // 中间箭头上下
      iShow: false,
      // 冻结按钮
      freezeShow: true,
      // 表格数据之前的loading
      loading: true,
      // 表格复选框是否显示
      tableCheckbox: false,
      // 上传弹框数据
      uploadData: {
        // 是否多选
        multiple: true,
        // 是否自动上传
        autoUpload: false,
        // 上传地址
        // action: 'https://jsonplaceholder.typicode.com/posts/'
        action: 'http://47.104.98.71:8780/costmanagement/file/upload'
      },
      // 表格数据
      tableData: [
        // {
        //   customer: '海尔',
        //   region: '海尔',
        //   demandSource: '海尔',
        //   demandType: '海尔',
        //   productLine: '海尔',
        //   demandCode: '海尔',
        //   remarks: '海尔',
        //   manager: '海尔',
        //   moduleCode: '海尔',
        //   name: '海尔',
        //   categoryCn: '海尔',
        //   supplierCode: '海尔',
        //   supplierName: '海尔',
        //   wuliaohaojindu: '海尔',
        //   price: '海尔',
        //   startdate: '2018-11-20',
        //   deadline: '2018-11-20'
        // },
        // {
        //   'xscount': 1, // 管理稽核次数
        //   'xtcount': 1, // 管理退回次数
        //   'cscount': 0, // 业务查看次数
        //   'ctcount': 1, // 业务退回次数
        //   'zcount': 2,
        //   'purchaseName': '采购经理', // 采购经理
        //   'purchaseGroup': '采购组', // 采购组
        //   'customer': 'haier', // 客户
        //   'region': '33', // 区域
        //   'demandSource': '345', // demandSource
        //   'demandCode': '需求编码', // 需求编码
        //   'demandType': '需求类型', // 需求类型
        //   'remarks': '需求描述', // 需求描述
        //   'manager': '任务人', // 任务人
        //   'managerCode': '任务人工号', // 任务人工号
        //   'moduleCode': '物料号', // 物料号
        //   'moduleDescribe': '物料描述', // 物料描述
        //   'categoryCn': '物料分类', // 物料分类
        //   'supplierCode': '1', // 供应商编码
        //   'supplierName': '4123', // 供应商名称
        //   'price': 12.22, // 价格
        //   'priceUnit': '￥', // 价格单位
        //   'purchasingUnit': '采购单位', // 采购单位
        //   'currency': '币种', // 币种
        //   'resourceQuantity': '2', // 资源量
        //   'resultDate': '2016-06-04 00:00:00.0', // 任务填报日期
        //   'startReportDate': '2018-12-20 10:39:01.0', // 任务开始日期
        //   'endReportDate': '2018-12-20 10:39:09.0', // 任务结束日期
        //   'reportState': '0001', // 任务状态编码 0001：未分解,0002：分解中,0003：已分解,0004：分解中
        //   'reportDate': '2000-01-01 00:00:00.0', // 结果公示日期
        //   'industryName': '测试', // 产业线
        //   'ident': 1,
        //   'reportVersionId': '3', // 报价单id
        //   'saleIdent': '1', // 报价单版本id
        //   'modelIdent': '1', // 购销bom标识
        //   'reportId': '2' // 模板bom标识

        // }
      ],
      // 表格数据总长度
      tableNum: 0,
      // 区域
      regions: [],
      // 需求来源
      demandSources: [],
      // 需求类型
      demandTypes: [],
      // 产业线
      productLineCode: [],
      // 需求编码
      demandCodes: [],
      // 物料类别
      cateorys: [],
      // 物料号
      categoryCodes: [],
      // 总退回次数
      taskStatuss: [],
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
      silder9: false,
      silder10: false
    }
  },
  computed: {
    // 总页数
    tablePaegs() {
      return Math.ceil(this.tableNum / this.searchForm.pageSize)
    },
    // 物料号总数
    categoryTotal() {
      // return this.categoryEd + this.categoryIng + this.categoryWill
      return this.categoryNum.sum_num
    },
    ...mapGetters(['company', 'avatarCode', 'loginName'])
  },
  watch: {
    // 滑块
    slidingBlock(val) {
      // console.log(this.$refs.BOXEclu.clientWidth)
      // console.log(val)

      if (val < 13) {
        this.silder1 = false
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 0
      } else if (val < 19.8) {
        this.silder1 = true
        this.silder2 = false
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 13
      } else if (val < 28.3) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = false
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 19.8
      } else if (val < 35) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = false
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 28.3
      } else if (val < 45.5) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = false
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 35
      } else if (val < 54.9) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = false
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 45.5
      } else if (val < 65) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = false
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 54.9
      } else if (val < 78.8) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = false
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 65
      } else if (val < 87.1) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = true
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 78.8
      } else if (val < 99) {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = true
        this.silder9 = true
        this.silder10 = false
        this.slidingBlock = 87.1
      } else {
        this.silder1 = true
        this.silder2 = true
        this.silder3 = true
        this.silder4 = true
        this.silder5 = true
        this.silder6 = true
        this.silder7 = true
        this.silder8 = true
        this.silder9 = true
        this.silder10 = true
        this.slidingBlock = 100
      }
    },
    freezeShow(val) {
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
        this.silder9 = false
        this.silder10 = false
        this.slidingBlock = 0
      }
    }
  },
  created() {
    if (this.$route.query.demand_code) {
      this.searchForm.demandCode = this.$route.query.demand_code
    }
    // console.log(111, this.supplierCode, this.company)
  },
  mounted() {
    // console.log('this.$store.state', this.$store.state)
    // 表格数据，查询按钮
    // console.log('this.$router', this.$route.query)
    this.search()
    // 下拉框数据
    this.searchSelect()
    // 需求编码
    // flagFindData({ flag: 2 }).then(res => {
    //   this.demandCodes = res.resultData
    // })
    // 物料号categoryCodes: [],
    flagFindData({ flag: 4 }).then(res => {
      this.categoryCodes = res.resultData.filter(function(val, index, arr) {
        if (val !== null && val.moduleCode !== null) {
          return val
        }
      })
    })
    // 产业线数据
    industryLine().then(res => {
      // console.log(res)
      this.productLineCode = res.resultData
    })
    // console.log('this.$store.state', this.$store.state)
  },
  methods: {
    // 点击查看历史详情
    look(row) {
      this.showData.gridData.reportDate = row.reportDate // 任务填报日期
      this.showData.gridData.resultDate = row.resultDate // 结果公示日期
      this.showData.gridData.reportId = row.reportId // 报价单id
      this.showData.gridData.reportState = row.reportState // 报价单状态
      this.showData.gridData.reportVersionId = row.reportVersionId // 填报单版本标识 (填报必填)
      this.showData.gridData.reportCheckId = row.reportCheckId // 填报单审核标识(只查看必填)
      this.showData.dialogTableVisible = true
      // console.log(row)
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
    // 点击处理
    deal(row) {
      if (judgeUrl() !== '003') {
        this.$router.push({
          path: '/offersheet/priceLists',
          query: {
            moduleCode: row.moduleCode,
            reportState: row.reportState,
            reportVersionId: row.reportVersionId,
            reportId: row.reportId,
            reportCheckId: row.reportCheckId,
            // supplierCode: this.loginName,
            company: this.company,
            resultDate: row.resultDate
            // moduleDescribe: row.moduleDescribe
          }
        })
        // this.$router.push({
        //   path: '/index3',
        //   query: {
        //     moduleCode: row.moduleCode,
        //     reportState: row.reportState,
        //     reportVersionId: row.reportVersionId,
        //     reportId: row.reportId,
        //     reportCheckId: row.reportCheckId,
        //     // supplierCode: this.loginName,
        //     company: this.company,
        //     resultDate: row.resultDate
        //     // moduleDescribe: row.moduleDescribe
        //   }
        // })
      } else {
        // this.$router.push({
        //   path: '/offersheet/priceList',
        //   query: {
        //     moduleCode: row.moduleCode,
        //     reportState: row.reportState,
        //     reportVersionId: row.reportVersionId,
        //     reportId: row.reportId,
        //     reportCheckId: row.reportCheckId,
        //     // supplierCode: this.loginName,
        //     company: this.company,
        //     resultDate: row.resultDate
        //     // moduleDescribe: row.moduleDescribe
        //   }
        // })
        this.$router.push({
          path: '/offersheet/priceLists',
          query: {
            moduleCode: row.moduleCode,
            reportState: row.reportState,
            reportVersionId: row.reportVersionId,
            reportId: row.reportId,
            reportCheckId: row.reportCheckId,
            // supplierCode: this.loginName,
            company: this.company,
            resultDate: row.resultDate
            // moduleDescribe: row.moduleDescribe
          }
        })
      }

      // console.log(row)
    },
    // 点击历史记录
    history(row) {
      // console.log(row)
      this.historyData.reportId = row
      this.historyData.loading = true
      var params = {
        report_id: row, // 填报单标识(必填)
        currentPage: this.historyData.historyPage, // 页码
        pageSize: this.historyData.historyPageNo // 页数
      }
      getReportAudit(params).then(res => {
        // console.log('历史记录', res.resultData)
        this.historyData.historyTotal = res.resultData.count
        this.historyData.gridData = res.resultData.data
        this.historyData.loading = false
      }).catch(err => {
        this.historyData.loading = false
        console.log(err)
      })
      this.historyData.dialogTableVisible = true
    },
    // 获取当前选中的页面
    handleCurrentChange(val) {
      // this.searchForm.pageNo = val
      this.search2()
    },
    // 中间灰色箭头
    rotate() {
      this.iShow = !this.iShow
      this.shrink = !this.shrink
      this.shrinkFirst = !this.shrinkFirst
    },
    searchBon() {
      this.searchForm.pageNo = 1
      this.search()
    },
    // 点击查询
    search() {
      this.search1()
      this.search2()
    },
    search1() {
      if (this.searchForm.startDate === null) {
        this.searchForm.startDate = ''
      }
      if (this.searchForm.endDate === null) {
        this.searchForm.endDate = ''
      }
      var data = JSON.parse(JSON.stringify(this.searchForm))
      // console.log('物料号查询', data)
      // var data1 = { 'demand_code': ['111', '345', 'xqh1'] }

      // 采购经理、任务人(编码)
      var manager_code = this.managerCodes.map(function(value, index, array) {
        return value.managerCode
      })
      // 采购经理、任务人(名字)
      var manager = this.managerCodes.map(function(value, index, array) {
        return value.manager
      })
      // 物料类别
      var category_cn_code = this.categoryCnCode.map(function(value, index, array) {
        return value.categoryCode
      })
      // if (data.categoryCn === '') {
      //   data.category_cn = []
      //   // console.log('category_cn22', data)
      // } else if (data.categoryCn !== '') {
      //   data.category_cn = data.categoryCn.split(',')
      //   // console.log('category_cn11', data)
      // }
      // console.log('this.categoryCnCode', this.categoryCnCode)
      if (data.demandCode === '') {
        data.demandCode = []
        // console.log('demandCode22', data)
      } else if (data.demandCode !== '') {
        data.demand_code = data.demandCode.split(',')
        // console.log('demandCode11', data)
      }
      console.log('data2', typeof data.categoryCode === 'string', data.categoryCode !== '', data.categoryCode)
      if (data.categoryCode === '') {
        data.categoryCode = []
        // console.log('demandCode22', data)
      } else if (typeof data.categoryCode === 'string' && data.categoryCode !== '') {
        data.categoryCode = data.categoryCode.split(',')
        // console.log('demandCode11', data)
      }
      console.log('data', data)
      // id28根据筛选条件查询物料号维度的分解情况
      var data1 = {
        // 任务人
        'manager': manager,
        // 任务人工号(采购经理？)
        'manager_code': manager_code,
        // 产业线id
        'industry_id': this.searchForm.productLineCode,
        // 区域
        'region': this.searchForm.region,
        // 需求类型
        'demand_type': this.searchForm.demandType,
        // 需求来源
        'demand_source': this.searchForm.demandSource,
        // 需求编码
        // 'demand_code': this.searchForm.demandCode,
        'demand_code': data.demand_code,
        // 物料号
        'module_code': data.categoryCode,
        // 物料类别
        // 'category_cn': this.searchForm.categoryCn,
        // 'category_cn': data.category_cn,
        'category_code': category_cn_code,
        // 当前页
        // 'currentPage': this.searchForm.pageNo,
        // 每页条数
        // 'pageSize': this.searchForm.pageSize,
        // 任务开始时间开始
        'starttime_begin': this.searchForm.startDate[0],
        // 任务开始时间结束
        'starttime_end': this.searchForm.startDate[1],
        // 任务结束时间开始
        'overtime_begin': this.searchForm.endDate[0],
        // 任务结束时间结束
        'overtime_end': this.searchForm.endDate[1]
        // 'supplier_code': [this.loginName],
        // 'supplier_name': [this.company]
        // 供应商编码(未确定)
        // 'supplier_code': [
        //   '1',
        //   '111',
        //   '4123',
        //   '123'
        // ],
        // 供应商名称(未确定)
        // 'supplier_name': [
        //   '4123',
        //   '昌邑市永富弹簧有限公司',
        //   '123'
        // ]
      }
      // if (judgeUrl() !== '002') {
      //   data1.supplier_code = [this.loginName]
      //   data1.supplier_name = [this.company]
      // }
      // 获取物料号数量（已分解，未分解，分解中）
      getResolveModuleProgress(data1).then(res => {
        // console.log('物料号数量', res)
        // this.loading = false
        this.categoryNum = res.resultData
      }).catch(err => {
        // this.loading = false
        console.log(err)
      })
    },
    search2() {
      if (this.searchForm.startDate === null) {
        this.searchForm.startDate = ''
      }
      if (this.searchForm.endDate === null) {
        this.searchForm.endDate = ''
      }
      var data = JSON.parse(JSON.stringify(this.searchForm))
      // console.log('物料号查询', data)
      // var data1 = { 'demand_code': ['111', '345', 'xqh1'] }

      // 采购经理、任务人(编码)
      var manager_code = this.managerCodes.map(function(value, index, array) {
        return value.managerCode
      })
      // 采购经理、任务人(名字)
      // var manager = this.managerCodes.map(function(value, index, array) {
      //   return value.manager
      // })
      // if (data.categoryCn === '') {
      //   data.category_cn = []
      //   // console.log('category_cn22', data)
      // } else if (data.categoryCn !== '') {
      //   data.category_cn = data.categoryCn.split(',')
      //   // console.log('category_cn11', data)
      // }
      var category_cn_code = this.categoryCnCode.map(function(value, index, array) {
        return value.categoryCode
      })
      if (data.demandCode === '') {
        data.demandCode = []
        // console.log('demandCode22', data)
      } else if (data.demandCode !== '') {
        data.demand_code = data.demandCode.split(',')
        // console.log('demandCode11', data)
      }
      if (data.categoryCode === '') {
        data.categoryCode = []
        // console.log('demandCode22', data)
      } else if (typeof data.categoryCode === 'string' && data.categoryCode !== '') {
        data.categoryCode = data.categoryCode.split(',')
        // console.log('demandCode11', data)
      }
      console.log('data2', data)
      // id14.5物料号维度报价单填报列表
      var data2 = {
        // 报价标识
        'bjflag': 3,
        // 标识
        'flag': 2,
        // 采购经理id
        'manager_code': manager_code,
        // 产业线id
        'industry_id': this.searchForm.productLineCode,
        // 区域
        'region': this.searchForm.region,
        // 需求来源
        'demand_source': this.searchForm.demandSource,
        // 需求类型
        'demand_type': this.searchForm.demandType,
        // 需求编码
        // 'demand_code': this.searchForm.demandCode,
        'demand_code': data.demand_code,
        // 物料号
        'module_code': data.categoryCode,
        // 物料类别
        // 'category_cn': this.searchForm.categoryCn,
        // 'category_cn': data.category_cn,
        'category_cn': category_cn_code,
        // 供应商编码(未确定)
        // 'supplier_code': [this.loginName],
        // 'supplier_name': [this.company],
        // 'supplier_code': [
        //   '1',
        //   '111',
        //   '4123',
        //   '123'
        // ]
        // 当前页
        'currentPage': this.searchForm.pageNo,
        // 每页条数
        'pageSize': this.searchForm.pageSize,
        // 任务开始时间开始
        'start_report_date_s': this.searchForm.startDate[0],
        // 任务开始时间结束
        'start_report_date_e': this.searchForm.startDate[1],
        // 任务结束时间开始
        'end_report_date_s': this.searchForm.endDate[0],
        // 任务结束时间结束
        'end_report_date_e': this.searchForm.endDate[1]
      }
      // if (judgeUrl() !== '002') {
      //   // data2.supplier_code = [this.loginName]
      //   data2.supplier_code = ['V12680']
      //   data2.supplier_name = [this.company]
      // }
      // 获取物料号维度列表
      this.loading = true
      this.selectData = data2
      getListPrivate(data2).then(res => {
        if (res.resultData.count) {
          this.tableNum = res.resultData.count
        } else {
          this.tableNum = 0
          this.freezeShow = true
        }
        if (res.resultData.data) {
          // console.log(1)
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
        this.loading = false
        // console.log('列表', res, this.tableNum, this.tableData)
      }).catch(err => {
        this.loading = false
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
        this.cateorys = res.resultData['009']
        // this.taskStatuss = res.resultData['012']
      })
    },
    // 筛选条件输入框
    searchInput(tableName, tableData, pageNo, name) {
      const data = {
        pageNo: pageNo,
        pageSize: '10'
      }
      data[tableName] = tableData
      modules(data).then(res => {
        console.log(res)
      })
      this.searchData.dialogTableVisible = true
      this.$store.dispatch('Dialog', name)
    },
    // 冻结按钮
    freeze() {
      this.freezeShow = !this.freezeShow
      this.slideVal = 0
    },
    // 点击下载
    tableDownload() {
      var downloadData = {
        'excelName': '4',
        'searchParams': {}
      }
      downloadData.searchParams = JSON.parse(JSON.stringify(this.selectData))
      delete downloadData.searchParams.currentPage
      delete downloadData.searchParams.pageSize
      // downloadData.searchParams.currentPage = 1
      // downloadData.searchParams.pageSize = 10000
      console.log('excel下载', this.selectData, downloadData)
      // window.open(getDemandExcel(downloadData))
      var a = document.createElement('a')
      var url = getDemandExcel(downloadData)
      console.log(url)
      document.body.appendChild(a)
      a.target = 'tempiframe'
      a.href = url
      // a.download = '2.xls'
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    },
    // 点击批量下载(暂时无意)
    tableCheckChange() {
      this.tableCheckbox = !this.tableCheckbox
    },
    // 点击下载按钮
    downLoda() {
      // console.log(this.downLodaData)
      this.tableCheckbox = !this.tableCheckbox
    },
    // 点击表格中需求编码
    // demandCodeClick(row) {
    //   console.log(row)
    // },
    // 点击表格中资源量
    resourceQuantityClick(row) {
      console.log(row, this.downLodaData)
    },
    // 表格复选框选择(下载)
    chooseRow(val) {
      this.downLodaData = val
      console.log(val)
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
    // input上搜索按钮 产业线
    findIndustry(nameVal, searchTitle, name) {
      const params = {}
      this.searchData.searchJian = name
      // console.log(data, 'TableName: ', TableName)
      industryLine(params).then(res => {
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
        // 物料类别
        this.searchForm.categoryCn = val.checkedCities.join(',')
        this.categoryCnCode = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.categoryCn) {
              return value
            }
          }
        })
      } else if (val.inputValue === 'supplierCode') {
        // 供应商编码
        this.searchForm.supplierCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'supplierName') {
        // 供应商名称
        this.searchForm.supplierName = val.checkedCities.join(',')
      } else if (val.inputValue === 'moduleCode') {
        // 物料号
        this.searchForm.categoryCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'DemandCoding') {
        // 需求编码
        this.searchForm.demandCode = val.checkedCities.join(',')
        // console.log(1, this.searchForm.demandCode)
      } else if (val.inputValue === 'taskone') {
        // 任务人
        this.searchForm.manager = val.checkedCities.join(',')
      } else if (val.inputValue === 'getIndustry') {
        // 产业线(val是对象)
        this.searchForm.productLineCode = val.checkedCities.join(',')
      } else if (val.inputValue === 'purchaseMan') {
        // 采购经理
        this.searchForm.manager = val.checkedCities.join(',')
        this.managerCodes = this.searchData.gridData.filter(function(value, index, array) {
          for (var i = 0, len = val.checkedCities.length; i < len; i++) {
            if (val.checkedCities[i] === value.manager) {
              return value
            }
          }
        })
      }
    },
    // 模糊查询输入框
    findBaseList(TableNames, searchTitle) {
      const params = {
        TableName: '',
        pageSize: '1000'
        // pageNo: this.currentPage
      }
      params.TableName = TableNames
      // console.log(params)
      search(params)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      this.searchData.dialogTableVisible = true
      this.$store.dispatch('Dialog', searchTitle)
    }
  }
}
</script>

<style scope>
.exclu .unallshow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 历史记录弹框 */
.dialog-box .el-dialog__header {
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
.dialog-box .el-dialog__title,
.dialog-box .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.dialog-box .el-dialog__footer {
  text-align: center;
}
/* 滑块样式 */
/* 滑块 */
/* .el-slider__runway {
  background-color: #ffffff;
} */
.el-slider__runway {
  width: 100%;
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
.exclu-box .el-form--inline .time.zhong .el-form-item__label {
  width: 20%;
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
  margin-bottom:0
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
.exclu-box .el-form--inline .time.zhong .el-form-item__content {
  width: 66%;
}
.exclu-box .el-row .el-col.el-col-22 {
  border-right: 1px solid #cecece;
}
/* 查询按钮 */
.exclu-box .req-top img {
  cursor: pointer;
}
@media screen and (min-width:1793px){
  .exclu-box .req-top .el-button {
    position: relative;
    left: 24%;
    margin-top: 50%;
  }
}
@media screen and (max-width:1500px){
  .exclu-box .req-top .el-button {
    position: relative;
    left: 24%;
    margin-top: 84%;
  }
}
@media screen and (min-width:1500px) and (max-width:1793px){
  .exclu-box .req-top .el-button {
    position: relative;
    left: 24%;
    margin-top: 70%;
  }
}

.exclu-box .req-top .shrinkTop .el-button {
  margin-top: 12%;
}
.exclu-box .req-top .shrinkTop2 .el-button {
  margin-top: 0;
}
.exclusive .exclu-box .req-top .el-form .el-input .img {
  /* border-left: 1px solid #cecece; */
  display: inline-block;
  height: 60%;
  width: 32px;
  margin-top: 24%;
  padding-left: 0 20%;
  border: 0;
}
.exclu-box .req-top .el-form .el-input .img img {
  display: inline-block;
  padding: 0;
  margin-bottom: -10%;
  border-left: 1px solid #cecece;
  padding-left: 5px;
}
/* 取消冻结 */
.req-table-top .btn .el-button--primary.is-plain,
.req-table-top .btn-up-down .el-button--primary.is-plain {
  background-color: #fff;
  color: #1875f0;
  border-color: #4a90e2;
}
.req-table-top .btn .el-button--primary.is-plain:hover,
.req-table-top .btn-up-down .el-button--primary.is-plain:hover {
  background-color: #ecf5ff;
}
.req-table-top .btn .el-button + .el-button {
  margin-left: 0px;
}
/* 表格 */
.req-table .el-table th,
.req-table .el-table tr {
  color: #4a4a4a;
}
/* .req-table .el-table th {
  border-top: 2px solid #7897a1;
} */
.req-table .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #f4f4f4;
}
.req-table .el-button--small {
  font-size: 16px;
}
/* 表格复选框 */
.exclu-box.exclusive .el-table-column--selection .cell {
  padding: 0;
}
</style>

<style scoped>

.el-table th div,
.el-table th > .cell {
  padding: 0;
}
/* 物料号 */
.catetory {
  font-size: 20px;
  line-height:24px;
  border-bottom: 1px solid #cecece;
  padding-bottom: 1.2%;
  margin-bottom: 1%;
}
.catetory p {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 1%;
}
.catetory .el-col div {
  display: flex;
  margin-bottom: 2px;
}
.catetory .el-col div span {
  display: inline-block;
  text-align: center;
  margin: 0 2px;
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
.exclu .catetory .el-col div span {
  text-align: left;
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
.exclu {
  background-color: #fff;
  /* border: 1px solid #d1d1d1; */
}
.exclu .req-top {
  padding: 34px 34px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  position: relative;
  border-radius: 4px;
}
.exclu .req-top .time3 {
  margin-bottom: 0;
}
.exclu .middle {
  height: 1.5vw;
  background-color: #f4f4f4;
}
/* 中间灰色小箭头 */
.exclu .arrow {
  width: 100%;
  transition: all 0.5s;
  background-color: #f4f4f4;
  position: relative;
}
.exclu .arrow span {
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
.exclu .arrow span i.rotate {
  transform: rotate(180deg);
}
/* 下面表格 */
.req-table {
  padding: 1% 15px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
}
.req-table-top {
  overflow: hidden;
  margin-bottom: 0.5%;
}
.req-table-top .btn,
.req-table-top .btn-up-down {
  float: left;
  margin-right: 30px;
}
.req-table-top .btn-up-down {
  /* width: 25%; */
  /* padding-left: 2%;
  border-left: 1px solid #979797; */
}
.req-table-top .btn-up-down .upload-demo {
  display: inline-block;
}
.req-table-top .btn-up-down .el-button {
  /* margin-left: 2%; */
}
.req-table-top .btn img {
  cursor: pointer;
}
.req-table-top .table-top-right {
  float: right;
  margin-top: 15px;
}

.req-table .my-table {
  /* position: relative;
  padding-top: 1.5%; */
}
.req-table .my-table .reqno-slide {
  /* position: absolute;
  left: 0;
  top: 0;
  z-index: 10; */
  width: 100%;
}
.req-table .my-table .reqno-slide span {
  display: inline-block;
  width: 2%;
  border-top: 2px dashed #1875f0;
  margin-top: -0.5%;
  background-color: #1875f0;
  vertical-align: middle;
}
.req-table .my-table .reqno-slide .img-move {
  cursor: pointer;
  position: relative;
}
/* 分页 */
.req-table .my-page {
  padding: 20px 0;
  text-align: center;
}
.req-table-top span{
  display: inline-block
}
</style>
<style>
.exclu .req-top .el-select__tags {
  white-space: nowrap;
}
.exclu .req-table .my-table .reqno-slide {
  width: 1170px;
}
</style>
