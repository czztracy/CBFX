/*
 * @Page: 字段库设置
 * @Author: csg
 * @Date: 2018-11
 * @Last Modified by: csg
 */
<template>
  <el-container class="RightBox">
    <!-- 导航切换修改 -->
    <el-aside
      style="border: 1px solid rgba(209, 209, 209, 1); border-bottom: 0; width: auto; min-width:280px;"
    >
      <Tree/>
    </el-aside>
    <el-main style="background: rgba(244, 244, 244, 1);">
      <div class="right">
        <div class="Content">
          <div class="title">{{ $t('fieldInTheLibrary.fieldSet') }}</div>
          <div class="conForm">
            <el-form ref="form" :model="form" label-width="100px" class="Form">
              <el-form-item :label="$t('fieldInTheLibrary.fieldName')">
                <el-input v-model="form.fieldName"/>
              </el-form-item>
              <el-form-item :label="$t('fieldInTheLibrary.required')">
                <el-select
                  v-model="form.ngRequired"
                  :placeholder="$t('fieldInTheLibrary.pleaseSelectWhetherItIsRequiredOrNot')"
                >
                  <el-option
                    v-for="(item, index) in ngRequiredOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('fieldInTheLibrary.information')">
                <el-input v-model="form.notice"/>
              </el-form-item>
              <el-form-item :label="$t('fieldInTheLibrary.type')">
                <el-select
                  v-model="form.type"
                  :placeholder="$t('fieldInTheLibrary.pleaseSelectTheType')"
                  @change="handleTypeSelect($event)"
                >
                  <el-option
                    v-for="(item, index) in typeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('fieldInTheLibrary.getTheWay')">
                <el-select
                  v-model="form.access"
                  :placeholder="$t('fieldInTheLibrary.selectHowToGetIt')"
                  @change="handleAccessSelect($event)"
                >
                  <el-option
                    v-for="(item, index) in accessOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="form.access === '0002'"
                :label="$t('fieldInTheLibrary.logicalAccess')"
              >
                <el-select
                  v-model="form.logicalAccess"
                  :placeholder="$t('fieldInTheLibrary.selectHowToGetIt')"
                >
                  <el-option
                    v-for="(item, index) in logicalAccessList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="form.access === '0003'"
                :label="$t('fieldInTheLibrary.formulaComputing')"
              >
                <el-select
                  v-model="form.formulaMode"
                  :placeholder="$t('fieldInTheLibrary.selectHowToGetIt')"
                >
                  <el-option
                    v-for="(item, index) in formulaModeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleConfirm">{{ $t('buttonGroup.confirm') }}</el-button>
                <el-button
                  style="margin-left: 30px;"
                  @click="handleReset"
                >{{ $t('buttonGroup.reset') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import Bus from '@/bus.js'
import { fieldUpdate, searchFieldList } from '@/api/field'
import Tree from '@/views/field/field'
export default {
  name: 'Field',
  components: {
    // FieldMsgList
    Tree
  },
  data() {
    return {
      form: {
        fieldName: '', // 字段名称
        ngRequired: '是', // 是否必填
        notice: '物料描述提示信息', // 提示信息
        type: '枚举类型', // 类型
        access: '填写', // 获取方式
        treeId: 0, // 接受id
        logicalAccess: '', // 逻辑获取
        formulaMode: '' // 计算方式
      },
      // 是否必填
      ngRequiredOptions: [
        {
          value: '0001',
          label: '是'
        },
        {
          value: '0002',
          label: '否'
        }
      ],
      // 类型
      typeOptions: [
        {
          value: '0001',
          label: '枚举类型'
        },
        {
          value: '0002',
          label: '文本类型'
        },
        {
          value: '0003',
          label: '数值类型'
        },
        {
          value: '0004',
          label: '日期类型'
        }
      ],
      // 获取方式
      accessOptions: [
        {
          value: '0001',
          label: '手动填写'
        },
        {
          value: '0002',
          label: '逻辑获取'
        },
        {
          value: '0003',
          label: '公式计算'
        }
      ],
      // 逻辑获取
      logicalAccessList: [
        {
          value: '0001',
          label: 'BOM数据'
        },
        {
          value: '0002',
          label: '财务数据'
        },
        {
          value: '0003',
          label: '需求数据'
        }
      ],
      // 计算方式
      formulaModeList: [
        {
          value: '0001',
          label: '单元格间计算'
        },
        {
          value: '0002',
          label: '单元格内计算'
        }
      ],
      obj: {
        data: [],
        list: []
      }
    }
  },
  computed: {
    // ...mapGetters(['fieBool'])
    queryData() {
      return this.$route.query
    },
    type() {
      return this.form.type
    }
  },
  watch: {
    queryData(res) {
      // console.log(res)
      this.form.fieldName = this.$route.query.name
      this.form.notice = this.$route.query.message
      this.form.type = this.$route.query.type
      this.form.access = this.$route.query.way
      this.form.ngRequired = this.$route.query.state
      this.form.logicalAccess = this.$route.query.logicAcquisition
      this.form.formulaMode = this.$route.query.computingMode
    },
    type(val) {
      if (val === '0001') {
        this.accessOptions = [{ value: '0001', label: '手动填写' }]
      } else if (val === '0002' || val === '0004') {
        this.accessOptions = [
          { value: '0001', label: '手动填写' },
          { value: '0002', label: '逻辑获取' }
        ]
      } else if (val === '0003') {
        this.accessOptions = [
          { value: '0001', label: '手动填写' },
          { value: '0002', label: '逻辑获取' },
          { value: '0003', label: '公式计算' }
        ]
        this.logicalAccessList = [
          { value: '0001', label: 'BOM数据' },
          { value: '0003', label: '需求数据' },
          { value: '0004', label: '付款条件' },
          { value: '0005', label: '贷款利率' },
          { value: '0006', label: '承兑期限' },
          { value: '0007', label: '贴现率' }
        ]
      } else if (val === '') {
        this.accessOptions = []
      }
    }
  },
  mounted() {
    this.form.fieldName = this.$route.query.name
    this.form.notice = this.$route.query.message
    this.form.type = this.$route.query.type
    this.form.access = this.$route.query.way
    this.form.ngRequired = this.$route.query.state
    this.form.logicalAccess = this.$route.query.logicAcquisition
    this.form.formulaMode = this.$route.query.computingMode
  },
  methods: {
    // 确定按钮
    handleConfirm() {
      const params = {
        fieldId: this.$route.query.fieldId,
        fieldClassId: this.$route.query.fieldClassId,
        name: this.form.fieldName,
        state: this.form.ngRequired,
        way: this.form.access,
        type: this.form.type,
        message: this.form.notice,
        computingMode: this.form.formulaMode,
        logicAcquisition: this.form.logicalAccess
      }
      // 字段修改
      fieldUpdate(params)
        .then(res => {
          // console.log(res)
          // this.dialogVisibleReName = false
          this.obj.list = params.fieldClassId
          this.getTreeData()
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        })
        .catch(err => {
          console.log(err)
        })
      console.log('字段的修改')
      // console.log('确定!', this.$route.query)
    },
    // 重置按钮
    handleReset() {
      console.log('重置')
      // this.form.fieldName = ''
      this.form.ngRequired = ''
      this.form.access = ''
      this.form.type = ''
      // this.form.notice = ''
      this.form.logicalAccess = ''
      this.form.formulaMode = ''
    },
    // tree data
    getTreeData() {
      searchFieldList()
        .then(res => {
          console.log(res.resultData)
          this.obj.data = res.resultData
          Bus.$emit('TreeData', this.obj)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 类型
    handleTypeSelect(value) {
      console.log(value, this.form.type)
      // 获取方式
      this.form.access = ''
      // 逻辑获取
      this.form.logicalAccess = ''
      // 计算方式
      this.form.formulaMode = ''
      if (this.form.type === '0001') {
        this.accessOptions = [{ value: '0001', label: '手动填写' }]
      } else if (this.form.type === '0002' || this.form.type === '0004') {
        this.accessOptions = [
          { value: '0001', label: '手动填写' },
          { value: '0002', label: '逻辑获取' }
        ]
      } else if (this.form.type === '0003') {
        this.accessOptions = [
          { value: '0001', label: '手动填写' },
          { value: '0002', label: '逻辑获取' },
          { value: '0003', label: '公式计算' }
        ]
      }
    },
    // 获取方式
    handleAccessSelect(value) {
      console.log(value, this.form.access)
      // 逻辑获取
      this.form.logicalAccess = ''
      // 计算方式
      this.form.formulaMode = ''
      if (this.form.type === '0003' && this.form.access === '0002') {
        this.logicalAccessList = [
          { value: '0001', label: 'BOM数据' },
          { value: '0003', label: '需求数据' },
          { value: '0004', label: '付款条件' },
          { value: '0005', label: '贷款利率' },
          { value: '0006', label: '承兑期限' },
          { value: '0007', label: '贴现率' }
        ]
      } else {
        this.logicalAccessList = [
          { value: '0001', label: 'BOM数据' },
          { value: '0002', label: '财务数据' },
          { value: '0003', label: '需求数据' }
        ]
      }
    }
  }
}
</script>

<style scoped>
.RightBox {
  width: 100%;
  /* height: 100%; */
  /* min-height: 100%; */
}
.RightBox .right .Content .Form .el-form-item {
  margin-bottom: 30px;
}
.RightBox .right .Content .Form .el-form-item:last-child {
  margin-top: 50px;
}
.RightBox .right .Content .Form .el-select {
  width: 100%;
}
.RightBox .right .Content .Form .el-form-item__label {
  text-align: left;
}
.RightBox .right .Content .Form .el-select .el-input__inner {
  background: #f9f9f9;
}
.RightBox .right {
  padding: 60px 300px;
}
.RightBox .right .Content {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 30px;
  min-width: 600px;
  border: 1px solid rgba(209, 209, 209, 1);
}
.RightBox .right .Content .title {
  text-align: center;
  color: #333333;
  font-weight: 600;
  font-size: 20px;
  margin-top: 40px;
}
.RightBox .right .Content .conForm {
  /* text-align: center; */
  margin-top: 50px;
  overflow: hidden;
  text-align: center;
}
.RightBox .right .Content .Form {
  display: inline-block;
  width: 80%;
}
</style>
<style>
.RightBox .right .Content .Form .el-form-item {
  margin-bottom: 30px 90;
}
.RightBox .right .Content .Form .el-form-item:last-child {
  margin-top: 50px;
}
.RightBox .right .Content .Form .el-select {
  width: 100%;
}
.RightBox .right .Content .Form .el-form-item__label {
  text-align: left;
}
.RightBox .right .Content .Form .el-select .el-input__inner {
  background: #f9f9f9;
}
.RightBox .right .Content .Form .el-form-item__content:last-child {
  margin-left: 0;
}
.RightBox .right .Content .conForm .el-form-item:last-child .el-form-item__content {
  margin-left: 0 !important;
}
</style>

