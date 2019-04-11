/*
 * @Page: 需求管理-> 定制需求创建-> 物料信息
 * @Author: wangjiandong
 * @Date: 2018-11-30 16:13:36
 * @Last Modified by: wangjiandong
 */
<template>
  <!-- 添加物料展示 -->
  <div class="material1">
    <!-- 弹窗 cpm 查找供应商-->
    <cpm ref="childs" :checkarr="checkarr" @success="tosuccess" @materialType="tomaterialType"/>
    <cpm2 ref="childss" :checkarr="checkarr" @successs="tosuccess2" @checkarrT="checkarrC"/>
    <div class="material-top">
      <div class="material-top-leftpg"/>
      <div class="material-top-left">{{ $t('Neednumberdimension.MaterialInformation') }}</div>
      <div v-if="publicStoe" class="material-top-left-add" @click="addmater">
        <span class="material-top-left-add-s1">
          <i class="el-icon-plus"/>
        </span>
        <span class="material-top-left-add-s2">{{ $t('Neednumberdimension.AddMaterial') }}</span>
      </div>
      <!-- <div v-if="publicStoe" class="material-top-left-down">
        <span class="material-top-left-down-s1">
          <img src="../../../assets/index/images/down.png" alt style="vertical-align:middle;">
        </span>
        <span class="material-top-left-down-s2">{{ $t('runTaskManager.batchDownload') }}</span>
      </div> -->
      <!-- 上传 -->
      <!-- <el-upload
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-exceed="handleExceed"
        :file-list="fileList"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <div v-if="publicStoe" class="material-top-left-up">
          <span class="material-top-left-up-s1">
            <img src="../../../assets/index/images/up.png" alt style="vertical-align:middle;">
          </span>
          <span class="material-top-left-up-s2">{{ $t('runTaskManager.batchwounded') }}</span>
        </div>
      </el-upload> -->
      <!-- <div class="material-top-left-up">
        <span class="material-top-left-up-s1">
          <img src="../../../assets/index/images/up.png" alt style="vertical-align:middle;">
        </span>
        <span class="material-top-left-up-s2">{{ $t('runTaskManager.batchwounded') }}</span>
      </div> -->
    </div>
    <el-table :data="data" :header-cell-class-name="must" style="width: 100%;padding-left:15px;padding-right:15px;">
      <el-table-column type="expand" min-width="45">
        <template slot-scope="props">
          <!-- 添加供应商信息 -->
          <div :class="props.row.checkarrs.length>=1?'vanish':'material-add'">
            <div class="material-add-left">{{ $t('Neednumberdimension.NoSupplierInformationYet') }}?</div>
            <div v-if="publicStoe" class="material-add-left-btn" @click="cpmOpen2($t('demandManagement.supplier'),props.$index)">
              <span class="material-add-left-btn-s1">＋</span>
              <span class="material-add-left-btn-s2">{{ $t('Neednumberdimension.AddSupplier') }}</span>
            </div>
          </div>
          <!-- 添加供应商信息完毕后 -->
          <div :class="props.row.checkarrs.length>=1?'material-add-after':'vanish'">
            <div
              v-if="publicStoe"
              class="material-add-left-after-btn"
              @click="cpmOpen2($t('demandManagement.supplier'),props.$index)"
            >
              <span class="material-add-left-after-btn-s1">＋</span>
              <span
                class="material-add-left-after-btn-s2"
              >{{ $t('Neednumberdimension.Accessories') }}</span>
            </div>
            <!-- checkarr问题导致全部添加 二维数组-->
            <!-- <template scope="scope" prop="checkarrs"> -->
            <div class="material-add-after-bottom">
              <div
                v-for="items in props.row.checkarrs"
                :key="items.supplierCode"
                class="material-add-after-initial"
              >
                <div class="img-bf">
                  <img src="../../../assets/index/images/supplier.png" alt>
                </div>
                <div class="initial-one">
                  <div>{{ items.supplierCode }}</div>
                  <div>{{ items.coporation }}</div>
                </div>
                <div class="initial-two"/>
                <div class="img-af">
                  <img
                    v-if="publicStoe"
                    src="../../../assets/index/images/operation.jpg"
                    alt
                    @click="delet(items,props.row.checkarrs)"
                  >
                </div>
              </div>
            </div>
            <!-- </template> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('demandForFiltering.serialNumber')" min-width="40" type="index"/>
      <el-table-column :label="$t('breakDown.MaterialType')" min-width="134.6">
        <template slot-scope="scope">
          <div class="li2">
            <el-input v-model="scope.row.materialType" type="text" disabled="disabled" @change="chuan(scope.row.materialType,0,scope.$index+1)"/>
            <span>
              <img src="../../../assets/index/images/search.jpg" alt="" style="height:34px;margin-top:1px;margin-right:1.5px;" @click="cpmOpen($t('breakDown.MaterialType'),scope.$index)">
            </span>
            <!-- <cpm
              ref="childs"
              :name="materialTypess"
              @success="chuan(scope.row.materialType,1,scope.$index+1)"
              @materialType="tomaterialType"
              @materialChange="tomaterialChange"
            /> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('breakDown.MATNR')" min-width="128.6" prop="MATNR">
        <template slot-scope="scope">
          <div class="li3">
            <el-input
              v-model="scope.row.MATNR"
              type="text"
              @blur="chuan(scope.row.MATNR,1,scope.$index+1)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('breakDown.listMaterialDescription')" min-width="224.6" prop="describe">
        <template slot-scope="scope">
          <div class="li4">
            <el-input v-model="scope.row.describe" type="text"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('breakDown.listBOMLogo')" min-width="117.6" prop="bomTxt">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.bomTxt"
            class="li5"
            placeholder
            @change="chuan(scope.row.bomTxt,2,scope.$index+1)"
          >
            <el-option v-for="item in bom2" :key="item.code" :label="item.name" :value="item.code" value-key="item.name"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label="$t('breakDown.purchaseBOMLogo')" min-width="117.6" prop="bomTxt1">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.bomTxt1"
            class="li5"
            placeholder
            @change="chuan(scope.row.bomTxt1,3,scope.$index+1)"
          >
            <el-option v-for="item in bom1" :key="item.code" :label="item.name" :value="item.code" value-key="item.name"/>
          </el-select>
        </template>
      </el-table-column>
      <!-- 生产工厂 -->
      <el-table-column :label="$t('breakDown.productionFactoryName')" min-width="197.6" prop="production_factory_name">
        <template slot-scope="scope">
          <div class="li7">
            <el-input v-model="scope.row.production_factory_name" type="text"/>
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('breakDown.moduleAttribute')" min-width="197.6" prop="module_attribute">
        <template slot-scope="scope">
          <div class="li7">
            <el-input v-model="scope.row.module_attribute" type="text"/>
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('demandNoResolve.resource')" min-width="96.6" prop="resource">
        <template slot-scope="scope">
          <div class="li6">
            <el-input v-model="scope.row.resource" type="text"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('demandNoResolve.reqPrice')" min-width="99.6" prop="price">
        <template slot-scope="scope">
          <div class="li7">
            <el-input v-model="scope.row.price" type="text"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('breakDown.listPriceUnit')" min-width="118.6">
        <template slot-scope="scope">
          <el-select v-model="scope.row.price_unit" class="li8" placeholder>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <!-- <el-checkbox>{{ item.label }}</el-checkbox> -->
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label="$t('demandNoResolve.purchasingUnit')" min-width="118.6">
        <template slot-scope="scope">
          <el-select v-model="scope.row.purchasing_unit" class="li9" placeholder>
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <!-- <el-checkbox>{{ item.label }}</el-checkbox> -->
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label="$t('breakDown.listCurrency')" min-width="118.6">
        <template slot-scope="scope">
          <el-select v-model="scope.row.currency" class="lix" placeholder>
            <el-option
              v-for="item in optionsM"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <!-- <el-checkbox>{{ item.label }}</el-checkbox> -->
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column :label="$t('breakDown.newOldType')" min-width="112.6">
        <template slot-scope="scope">
          <el-select v-model="scope.row.product_ident" class="li11" placeholder>
            <el-option
              v-for="item in optionsN"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <!-- <el-checkbox>{{ item.label }}</el-checkbox> -->
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column v-if="publicStoe" :label="$t('specialNumberDimension.handle')" min-width="58">
        <template slot-scope="scope">
          <i class="operation-pic el-icon-delete" @click="deleteRow(scope.$index, data)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import '@/assets/css/materialadd.css'
import cpm from '@/components/Popup/aloneCpm'
import cpm2 from '@/components/Popup/supplierCpm'
import { selects } from '@/api/requirements'
// import { judgeUrl } from '@/utils/api'
export default {
  name: 'Materialadd',
  components: {
    cpm,
    cpm2
  },
  props: {
    data: { type: Array, required: true }
  },
  data() {
    return {
      // 控制发布状态
      publicStoe: true,
      // 上传文件
      fileList: [],
      // 弹窗组件物料类型传值
      materialTypess: this.$t('demandManagement.materialType'),
      // 物料类别
      materialType: '',
      categoryId: '',
      categoryCode: '',
      categoryEn: '',
      categoryCn: '',
      MATNR: '',
      // 物料描述
      describe: '',
      // 生产工厂
      production_factory_name: '',
      // 模块属性
      module_attribute: '',
      // 资源量
      resource: '',
      // 价格
      price: '',
      // 查询选中的数组
      checkarr: [],
      // 下拉框相关
      price_unit: '', // 价格单位
      purchasing_unit: '', // 采购单位
      currency: '', // 币种
      product_ident: '', // 新老品
      options: [
        { label: '1', value: '1' },
        { label: '10', value: '10' },
        { label: '100', value: '100' }
      ],
      optionsN: [
        { label: '新品', value: '新品' },
        { label: '老品', value: '老品' }
      ],
      optionsM: [
        { label: 'USD', value: 'USD' },
        { label: 'CNY', value: 'CNY' }
      ],
      options1: [
        { label: '洗涤', value: '洗涤' },
        { label: '全部1', value: '全部1' }
      ],
      options2: [
        { label: 'EA', value: 'EA' },
        { label: 'KG', value: 'KG' },
        { label: 'G', value: 'G' },
        { label: 'JUA', value: 'JUA' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'BOT', value: 'BOT' },
        { label: 'ML', value: 'ML' },
        { label: 'ZHI', value: 'ZHI' },
        { label: 'KAN', value: 'KAN' }
      ],
      // 添加物料展示列表
      number: 0,
      // data: [],
      // 产业线存储
      industry: [],
      // 物料类别存储
      materialTypes: [],
      // bom状态存储
      bom2: [{ name: '空', code: '' }, { name: '否', code: 'N' }],
      bom1: [{ name: '空', code: '' }, { name: '否', code: 'N' }, { name: '是', code: 'Y' }],
      // bom默认值否
      bomTxt: '否',
      bomTxt1: '否'
    }
  },
  created() {
    // 产业线下拉请求
    this.bomState()
    // this.readType()
  },
  methods: {
    setmany(jsonArr, jsonArr2) {
      var length1 = jsonArr.length
      var length2 = jsonArr2.length
      for (var i = 0; i < length1; i++) {
        for (var j = 0; j < length2; j++) {
          // 判断添加的数组是否为空了
          if (jsonArr.length > 0) {
            if (jsonArr[i]['coporation'] === jsonArr2[j]['coporation']) {
              jsonArr.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
              length1--
            }
          }
        }
      }

      for (var n = 0; n < jsonArr2.length; n++) {
        jsonArr.push(jsonArr2[n])
      }
    },
    checkarrC(res) {
      // var num = this.number - 1
      // 进行判断过滤
      this.setmany(this.data[res].checkarrs, this.checkarr)
      // console.log('this.data[res].checkarrs', this.data[res].checkarrs)
      this.$emit('info')
      // this.data[num].checkarrs = this.data[num].checkarrs.concat(this.checkarr)
      // console.log('this.data[num].checkarrs', this.data[num].checkarrs)
    },
    // 物料类别读取赋值
    readType() {
      // console.log('this.allow', this.allow)
      if (sessionStorage['demandSetting'] && this.allow) {
        // console.log('this.data[type]6666', this.data['type'])
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.$refs.childs.suppliers = this.data['type']
            // console.log('this.$refs.childs.suppliers', this.$refs.childs.suppliers)
          })
        })
      }
    },
    // 文件上传
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    chuan(val, val1, valss) {
      // console.log(val, val1, valss, 999999)
      this.$emit('mandatory', val, val1, valss)
    },
    // 弹窗组件物料类别
    cpmOpen(val, index) {
      this.$refs.childs.dialogTableVisible = true
      this.$refs.childs.field = val + ''
      this.$refs.childs.index = index
      // this.$refs.childs.checkList = [] // 打开弹窗清空选中
      if (this.$refs.childs.checkList.length === 0) {
        this.$refs.childs.getData()
      }
    },
    cpmClose() {
      this.$refs.childs.dialogTableVisible = false
    },
    tosuccess(res, index) {
      // console.log('res.length', res.length)
      if (res.length === 0) {
        this.materialType = ''
        // 此处需要接id传后台
        this.categoryId = ''
        // 此处需要接code传后台
        this.categoryEn = ''
        this.categoryCn = ''
        this.categoryCode = ''
      } else {
        this.materialType = res[0].categoryCn
        // 此处需要接id传后台
        this.categoryId = res[0].categoryId
        // 此处需要接code传后台
        this.categoryEn = res[0].categoryEn
        this.categoryCn = res[0].categoryCn
        this.categoryCode = res[0].categoryCode
      }
      this.$set(this.data[index], 'materialType', this.materialType)
      this.$set(this.data[index], 'categoryId', this.categoryId)
      this.$set(this.data[index], 'categoryEn', this.categoryEn)
      this.$set(this.data[index], 'categoryCn', this.categoryCn)
      this.$set(this.data[index], 'categoryCode', this.categoryCode)
      // this.chuan(res[0].categoryCn, 0, index + 1)
      // console.log('确定后的物料类别', this.materialType)
      // 把this.checkarr赋给data[].checkarrs
      // var leng = this.data.length
      // this.data[index].checkarrs = this.checkarr
      // this.$emit('info', this.checkarr)
      // console.log('data', this.data)
    },
    tomaterialType(res) {
      // console.log('弹窗物料类别', res)
      this.materialTypes = res[0].categoryEn
    },
    // 弹窗供应商
    cpmOpen2(val, index) {
      this.$refs.childss.dialogTableVisible = true
      this.$refs.childss.field = val + ''
      this.$refs.childss.index = index
      // this.$refs.childss.checkList = [] // 打开供应商
      if (this.$refs.childss.checkList.length === 0) {
        this.$refs.childss.getData()
      }
    },
    cpmClose2() {
      this.$refs.childss.dialogTableVisible = false
    },
    tosuccess2(res, index) {
      this.checkarr = res
      // console.log('供应商res', res)
      // this.$emit('info', this.checkarr)
    },
    // 添加物料
    addmater() {
      this.number = this.number + 1
      //  arr = {}
      const arr = { id: '' + this.number, checkarrs: [] }
      // if (judgeUrl() === '002') {
      //   // 内网正式数据
      //   arr = { id: '' + this.number, checkarrs: [] }
      // } else {
      //   // 47测试假数据
      //   arr = { id: '' + this.number, checkarrs: [{ supplierCode: 'V12970', coporation: '青岛胜汇塑胶有限公司' }] }
      // }
      this.data.push(arr)
      this.$parent.add()
    },
    // 删除添加的物料
    deleteRow(index, rows) {
      rows.splice(index, 1)
      this.$emit('deletes', index * 4)
    },
    // 删除供应商信息 整体删除
    delet(item, arr) {
      var length = arr.length
      for (var i = 0; i < length; i++) {
        if (arr[i] === item) {
          if (i === 0) {
            arr.shift() // 删除并返回数组的第一个元素
            // console.log('删除后的1', arr)
            this.$emit('delet')
            return arr
          } else if (i === length - 1) {
            arr.pop() // 删除并返回数组的最后一个元素
            // console.log('删除后的2', arr)
            this.$emit('delet')
            return arr
          } else {
            arr.splice(i, 1) // 删除下标为i的元素
            // console.log('删除后的3', arr)
            this.$emit('delet')
            return arr
          }
        }
      }
    },
    // BOM状态后台数据请求
    bomState() {
      const params = { typeCodes: '011' }
      selects(params).then(res => {
        // console.log('BOM状态', res)
        // this.optionsArea = JSON.parse(res.request.response).resultData['002']
        this.bom = res.resultData['011']
        this.bom.unshift({ code: '0000', name: '全部' })
      }).catch(res => {
        console.log('BOM状态请求失败', res)
      })
      // this.$axios({
      //   url: 'http://115.28.57.244:8082/haiercostsupport/dictionary/list',
      //   params: { typeCodes: '011' },
      //   method: 'post'
      // }).then(res => {
      //   // console.log(res)
      //   // console.log(JSON.parse(res.request.response).resultData['002'])
      //   this.bom = JSON.parse(res.request.response).resultData['011']
      //   this.bom.unshift({ code: '0000', name: '全部' })
      //   // console.log('bom', this.bom)
      // }).catch(res => {
      //   console.log('请求失败', res)
      // })
    },
    // 判断*号
    must(obj) {
      // console.log(obj.columnIndex)
      if (obj.columnIndex === 6 || obj.columnIndex === 5 || obj.columnIndex === 2 || obj.columnIndex === 3) {
        return 'must'
      }
    }
  }
}
</script>
<style scoped>
.material1 {
  width: 100%;
  min-height: 325px;
  /* margin-left: 1.99%; */
  margin-top: 17px;
  border: 1px solid #d1d1d1;
  background: rgba(255, 255, 255, 1);
  position: relative;
}
.material-top {
  height: 61px;
  width: 100%;
  padding-top: 17px;
}
.material-top-leftpg {
  float: left;
  width: 0.26%;
  height: 30px;
  background: linear-gradient(
    360deg,
    rgba(245, 147, 26, 1) 0%,
    rgba(247, 107, 28, 1) 100%
  );
  border-radius: 0px 28px 28px 0px;
}
.material-top-left {
  float: left;
  margin-left: 15px;
  font-size: 24px;
  color: #222222;
  height: 28px;
  padding-top: 2px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  line-height: 28px;
  /* width: 11.01%; */
  width: 12.01%;
}
.material-top-left-add {
  float: left;
  /* min-width: 140px; */
  min-width: 8.97%;
  height: 39px;
  background: #28A1F2;
  border-radius: 4px;
  border: 1px solid #4A90E2;
  margin-left: 47.19%;
  margin-top: 5px;
  color: #FFF;
  font-size: 14px;
  position:relative;
  cursor: pointer;
}
.material-top-left-add-s1 {
  /* width: 16px; */
  float: left;
  width: 13.33%;
  height: 16px;
  /* margin-left: 17.14%;
  margin-top: 12px; */
  top: 12px;
  left: 17.14%;
  font-size: 14px;
  position: absolute;
}
.material-top-left-add-s2{
  float: left;
  min-width: 64.29%;
  height:22px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  line-height:22px;
  font-size: 14px;
  top: 8px;
  left: 29.29%;
  position: absolute;
}
.material-top-left-down {
  float: left;
  min-width: 7.69%;
  height: 39px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid #4a90e2;
  margin-top: 5px;
  margin-left: 1.41%;
  line-height: 39px;
  color: #4A90E2;
  cursor: pointer;
}
.material-top-left-down-s1{
    width: 13.33%;
    height: 16px;
    float: left;
    margin-left: 11px;
}
.material-top-left-down-s2{
  min-width:54.16%;
  height:22px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  line-height:22px;
  float: left;
  margin-top: 8px;
  margin-left: 14px;
  word-wrap: break-word;
  word-break: normal;
}
.material-top-left-up {
  float: left;
  /* min-width:7.69%; */
  width: 100%;
  height:39px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid #4A90E2;
  margin-top: 5px;
  margin-left: 1.35%;
  color: #4A90E2;
  /* text-align: center; */
  line-height: 39px;
}
.material-top-left-up-s1 {
  /* width: 16px; */
  width: 13.33%;
  height: 16px;
  float: left;
  margin-left: 11px;
}
.material1-top-left-up-s2 {
  /* width:65px; */
  min-width: 54.16%;
  height:22px;
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  line-height:22px;
  float: left;
  margin-top: 8px;
  margin-left: 14px;
  word-wrap: break-word;
  word-break: normal;
}
/* 展示列表下拉框尺寸 */
.material1 .li1 {
  width: 110px;
  height: 40px;
}
.material1 .li1 input {
  height: 100%;
  width: 108px;
  border-radius: 5px;
  border: 1px solid #cecece;
}
/* 展示列别下模糊查询 */
.material1 .li2 {
  width: 116px;
  height: 40px;
  /* margin-left: 0.60%; */
  border-radius: 5px;
  /* border: 1px solid #cecece; */
  position: relative;
  box-shadow: 2px 2px 6px -3px rgba(0, 0, 0, 0.22);
}
.material1 .li2 input {
  float: left;
  width: 116px;
  height: 40px;
  border: 0;
  border-radius: 5px;
  border: 1px solid #cecece;
  /* background: #FFF; */
}
.material1 .li2 span {
  float: right;
  height: 34px;
  position: absolute;
  right: 0;
  top: 2px;
}
.material1 .li2 img {
  cursor: pointer;
}
.material1 .li3 {
  width: 110px;
  height: 40px;
  /* border: 1px solid #d1d1d1; */
  box-shadow: 2px 2px 2px -3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.material1 .li3 input {
  width: 100%;
  height: 98%;
  border: 0;
  border-radius: 4px;
}
.material1 .li4 {
  width: 216px;
  height: 40px;
  /* border: 1px solid #d1d1d1; */
  box-shadow: 2px 2px 2px -3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.material1 .li4 input {
  width: 100%;
  height: 98%;
  border: 0;
  border-radius: 4px;
}
.material1 .li5 {
  width: 88px;
}
.material1 .li6 {
  width: 78px;
  height: 40px;
  /* border: 1px solid #d1d1d1; */
  box-shadow: 2px 2px 2px -3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.material1 .li6 input {
  width: 100%;
  height: 98%;
  border: 0;
  border-radius: 4px;
}
.material1 .li7 {
  /* width: 91px; */
  width: 90%;
  height: 40px;
  /* border: 1px solid #d1d1d1; */
  box-shadow: 2px 2px 2px -3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  text-align: center;
}
.material1 .li7 input {
  width: 100%;
  height: 98%;
  border: 0;
  border-radius: 4px;
}
.material1 .li8 {
  width: 100px;
}
.material1 .li9 {
  width: 100px;
}
.material1 .lix {
  width: 100px;
}
.material1 .li11 {
  width: 100px;
}
/* 添加供应商信息 */
.material-add {
  width: 97.44%;
  height: 76px;
  background: rgba(246, 246, 246, 1);
  margin-left: 2.62%;
  display: block;
}
.material-add-left {
  width: 10.17%;
  height: 20px;
  margin-left: 1.39%;
  float: left;
  padding-top: 28px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(34, 34, 34, 1);
  line-height: 20px;
}
.material-add-left-btn {
  float: left;
  margin-left: 0.69%;
  width: 11.02%;
  height: 35px;
  line-height: 35px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid #1875f0;
  text-align: center;
  color: #1875f0;
  margin-top: 20px;
  cursor: pointer;
}
.material-add-left-btn-s1 {
  width: 10px;
  height: 10px;
}
.material-add-left-btn-s2 {
  width: 65.62%;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(24, 117, 240, 1);
  line-height: 22px;
}
/* 添加完供应商后展示样式 */
.material-add-after {
  width: 97.44%;
  min-height: 181px;
  background: rgba(246, 246, 246, 1);
  margin-left: 2.62%;
  display: block;
  float: left;
}
.material-add-left-after-btn {
  float: left;
  margin-left: 1.72%;
  width: 11.02%;
  height: 35px;
  line-height: 35px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid #1875f0;
  text-align: center;
  color: #1875f0;
  margin-top: 23px;
  cursor: pointer;
}
.material-add-left-after-btn-s1 {
  width: 10px;
  height: 10px;
}
.material-add-left-after-btn-s2 {
  width: 65.62%;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(24, 117, 240, 1);
  line-height: 22px;
}
.material-add-after-bottom {
  width: 96.28%;
  margin-left: 1.72%;
  min-height: 76px;
  float: left;
  margin-top: 21px;
}
.material-add-after-initial {
  width: 30.76%;
  height: 76px;
  float: left;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  margin-right: 2.08%;
  margin-bottom: 21px;
}
.img-bf {
  width: 41px;
  height: 41px;
  margin-top: 18px;
  margin-left: 21px;
  float: left;
}
.initial-one {
  width: 51.57%;
  height: 46px;
  margin-left: 19px;
  margin-top: 15px;
  float: left;
}
.initial-one div {
  width: 100%;
  height: 20px;
}
.initial-two {
  width: 3px;
  height: 45px;
  float: left;
  margin-top: 16px;
  margin-left: 72px;
  background: #cecece;
}
.img-af {
  height: 36px;
  width: 8.74%;
  float: left;
  margin-top: 20px;
  /* margin-left: 1.57%; */
  text-align: center;
}
.img-af img {
  width: 41.03%;
  margin-top: 10px;
}
.vanish {
  display: none;
}
/* 删除操作图标样式 */
.operation-pic {
  width: 16px;
  height: 16px;
  color: #4a90e2;
  margin-top: 14px;
}
.cpm-cpm input{
  background: #FFF!important;
}
</style>
