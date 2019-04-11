/*
 * @Page: 模版管理->模版树组的新建
 * @Author: 孙中超
 * @Date: 2018-12-11 14:22:14
 * @Last Modified by: 孙中超
 */
<template>
  <!-- 新建分组遮罩 -->
  <el-dialog :visible.sync="shadedata.dialogFormVisible" :title="$t('templateManager.amongst') +' “'+shadedata.name + '” ' + $t('templateManager.addGroupingTo')" class="tree-shade">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item :label="$t('templateManager.groupName')" label-width="120px" prop="templateClassName">
        <el-input v-model="form.templateClassName" :placeholder="$t('templateManager.newGroupKey')" auto-complete="off"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmName('form')">{{ $t('buttonGroup.confirm') }}</el-button>
      <el-button @click="shadedata.dialogFormVisible = false">{{ $t('buttonGroup.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { saveTemplateClass } from '@/api/modle'
export default {
  name: 'NewGroup',
  props: {
    shadedata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        templateClassId: '', // 模板分类id,选填
        templateClassName: '', // 模板分类名称,必填
        ptemplateClassId: '', // 父级模板分类id,必填
        templateCode: '', // templateCode,选填
        templateLevel: '' // 所属区域id,必填

      },
      rules: {
        templateClassName: [
          { required: true, message: '请输入分组名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    shadedata: {
      handler(newVal, oldVal) {
        if (newVal.dialogFormVisible === false) {
          this.form.templateClassName = ''
        }
      },
      deep: true
    }
  },
  mounted() {
    // console.log(123, this.shadedata)
  },
  methods: {
    // 确定
    confirmName(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 父级模板分类id,必填
          this.form.ptemplateClassId = this.shadedata.targetData.data.id
          var father = this.shadedata.targetData.data
          // 模板分类级别,必填（级别为1和2的不能修改）level=3 在下一层加分组
          this.form.templateLevel = '3'
          // 模板分类代码 必填
          this.form.templateCode = this.shadedata.targetData.data.code
          // console.log(this.shadedata.targetRegion.data.level, this.form.templateLevel)
          // 模板分类id 选填
          // this.form.templateClassId = this.shadedata.targetData.data.id
          // this.form.templateClassId = Math.random()
          saveTemplateClass(this.form).then(res => {
            // console.log(res)
            if (res.success) {
              this.$message({
                message: '添加分组成功',
                type: 'success'
              })
              this.$emit('refreshTree', father)
            }
          }).catch(err => {
            console.log(err)
          })
          this.shadedata.dialogFormVisible = false
          // console.log(this.shadedata, this.form)
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style  lang='scss'>
.tree-shade{
    min-width:1440px;
    overflow: auto;
    .el-dialog{
      width:26%;
      min-height:190px;
      .el-dialog__header{
        padding:0 20px;
        background: rgba(36,146,242,1);
        height:37px;
        line-height:37px;
        span{
          font-size:14px;
          color:#fff;
        }
        .el-dialog__headerbtn{
          i{
            color:#fff;
          }
          top:10px
        }
      }
      .el-dialog__body{
        padding: 30px 20px 10px;
        .el-form{
          .el-form-item__label{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(74,74,74,1);
          }
          .el-input__inner{
            height:31px;
          }
        }
      }
      .el-dialog__footer{
        padding: 10px 20px 10px;
        background:rgba(220,232,252,1);
        .dialog-footer{
          text-align:center;
          .el-button{
            margin:0 10%;
            padding: 10px 9%;
          }
        }
      }
    }
  }
</style>
