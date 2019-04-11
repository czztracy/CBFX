/*
 * @Page: 模版管理->模版树 选择的分组遮罩
 * @Author: 孙中超
 * @Date: 2018-12-11 14:22:14
 * @Last Modified by: 孙中超
 */
<template>
  <!-- 某个品类 添加到 选择的分组遮罩 -->
  <el-dialog :visible.sync="movetogroup.dialogMoveToGroup" :title="$t('templateManager.addCategoryToGroup')" class="movetogroup-shade">
    <el-form :model="form">
      <div class="selectCon">
        <div class="left">
          <el-input v-model="news" :placeholder="$t('templateManager.searchGroup')" suffix-icon="el-icon-search" class = "search" @blur="search"/>
          <el-tree ref="group" :data="dataTree" :filter-node-method="filterNode" @node-click="chooseGroup">
            <div slot-scope="{ node }" class="custom-tree-node" >
              <span class="Con">
                <i class="fa fa-folder-o"/>
                {{ node.label }}
              </span>
            </div>
          </el-tree>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">{{ $t('buttonGroup.confirm') }}</el-button>
      <el-button @click="movetogroup.dialogMoveToGroup = false">{{ $t('buttonGroup.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updateCategoryClass, getAreaTree } from '@/api/modle'
// 获取所有品类
// var box = []
export default {
  name: 'Movetogroup',
  props: {
    movetogroup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      news: '',
      form: {},
      dataTree: [],
      // 选中的组data
      group: {}
      // defaultProps: {
      //   children: 'children',
      //   label: // 'label'
      //           function(data, node) {
      //             // console.log(321, data, node)
      //             if (typeof data.pId === 'string' || data.children instanceof Array || (node.parent.parent !== null && node.parent.parent.parent === null) || data.pId === 0) {
      //               return data.label
      //             } else {
      //               // console.log('23333')
      //               // box.push(data)
      //               node.visible = false
      //             }
      //           }
      // }
    }
  },
  watch: {
    movetogroup: {
      handler(newVal, oldVal) {
        if (newVal.dialogMoveToGroup === true) {
          // 显示时执行
          var params = { templateCode: newVal.targetData.node.parent.data.code }
          getAreaTree(params).then(res => {
            this.dataTree = res.resultData
          })
          // console.log('cur', newVal)
        } else if (newVal.dialogMoveToGroup === false) {
          this.group = {}
          this.news = ''
          // console.log('dialogMoveToGroup')
        }
      },
      deep: true
    },
    news(newVal, oldVal) {
      this.$refs.group.filter(newVal)
    }
  },
  mounted() {
    // console.log('this.movetogroup', this.movetogroup)
  },
  methods: {
    // 搜索框过滤
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 搜索分组
    search() {
      console.log('search')
    },
    chooseGroup(data, node) {
      // if (node.parent.parent !== null && node.parent.parent.parent !== null) {
      if (node.data.level !== '1') {
        this.group = data
      } else {
        this.group = {}
      }
      // console.log('this.group', this.group, node)
    },
    // 确定
    submitForm() {
      if (JSON.stringify(this.group) !== '{}') {
        // 品类（数组）
        var category = this.movetogroup.targetData.data
        // 选的组
        var father = this.group
        // console.log('category', category, 'father', father)
        // 父级模板分类id,必填
        this.form.templateClassId = father.id
        // 模板分类id 必填
        this.form.categoryId = category.id
        updateCategoryClass(this.form).then(res => {
          // console.log(res)
          if (res.success) {
            this.$message({
              message: this.$t('templateManager.toSuccess'),
              type: 'success'
            })
            this.$emit('refreshTree', father)
          }
        }).catch(err => {
          console.log(err)
        })
        this.movetogroup.dialogMoveToGroup = false
      } else {
        this.$message({
          message: this.$t('templateManager.cannotSelectNullOrUser'),
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style  lang='scss'>
.movetogroup-shade{
    min-width:1440px;
    overflow: auto;
    .el-dialog{
      width:34.5%;
      min-height:190px;
      overflow: hidden;
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
        overflow: hidden;
        .el-form{
          .selectCon{
              min-height:400px;
            .left{
              border:1px solid #ccc;
              height:400px;
              overflow: auto;
              float: left;
              width:100%;
              .search {
                .el-input__suffix{
                  left: -90%;
                  bottom:20px;
                  top:-5px;
                }
              }
            }
          }

          .el-form-item__label{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(74,74,74,1);
          }
          .el-input__inner{
            height:31px;
            padding-left: 8%;
          }
        }
      }
      .el-dialog__footer{
        padding: 30px 20px;
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
