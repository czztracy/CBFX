/*
 * @Page: 模版管理->模版树 选择的品类遮罩
 * @Author: 孙中超
 * @Date: 2018-12-11 14:22:14
 * @Last Modified by: 孙中超
 */
<template>
  <!-- 选择品类 添加到确定的分组遮罩 -->
  <el-dialog :visible.sync="addtogroup.dialogAddGroup" :title="$t('templateManager.addCategoryToGroup')+' ' + addtogroup.name" class="addtogroup-shade">
    <!-- <el-tree ref="group" :data="addtogroup.data" default-expand-all>
      <div slot-scope="{ node, data }" class="custom-tree-node" >
        <span class="Con">
          <i class="fa fa-folder-o"/>
          {{ node.label }}
        </span>
      </div>
    </el-tree> -->
    <el-form :model="form">
      <div class="selectCon">
        <div class="left">
          <el-input v-model="news" :placeholder="$t('templateManager.searchCategoryName')" suffix-icon="el-icon-search" class = "search"/>

          <!-- <div class="title-top">
            <span>
              <em style="color: #4A90E2;font-style:normal">1</em>
              /1
            </span>
            <el-pagination
              :total="100"
              :page-size="10"
              background
              layout="prev, next"
              style = "display: inline-block"
              @current-change="handleCurrentChange"
            />
          </div> -->

          <el-checkbox-group v-model="form.selectedData">
            <el-checkbox v-for="(item,index) in box2" :key="index" :label="item" class="dataListStyle">
              <i class="fa fa-file-o"/>
              {{ item.categoryCn }}
            </el-checkbox>
          </el-checkbox-group>

        </div>
        <div class="right">
          <p>{{ $t('templateManager.selected') }} {{ form.selectedData.length }}/{{ box2.length }}</p>
          <br>
          <ul>
            <li v-for="(item,index) in form.selectedData" :key="index" :label="item.id">
              <i class="fa fa-file-o"/>
              {{ item.categoryCn }}
            </li>
          </ul>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">{{ $t('buttonGroup.confirm') }}</el-button>
      <el-button @click="addtogroup.dialogAddGroup = false">{{ $t('buttonGroup.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { updateCategoryClass, getAreaCategory } from '@/api/modle'
// var box = [] // 承接品类的变量
export default {
  name: 'Addtogroup',
  props: {
    addtogroup: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      box1: [], // 所有的品类
      box2: [], // 过滤后的品类
      news: '', // 输入框内容
      form: {
        name: '',
        dataList: [
          // { label: '传感器', id: 1 }
        ],
        selectedData: []
      },
      form2: {}
      // defaultProps: {
      //   children: 'children',
      //   label: // 'label'
      //           function(data, node) {
      //             // console.log(321, data, node)
      //             // if (data.pId || data.pId === 0) {
      //             if (typeof data.pId === 'string' || data.children instanceof Array || (node.parent.parent !== null && node.parent.parent.parent === null)) {
      //               return data.label
      //             } else {
      //               // console.log('23333')
      //               box.push(data)
      //               node.visible = false
      //             }
      //           }
      // }
    }
  },
  watch: {
    addtogroup: {
      handler(newVal, oldVal) {
        if (newVal.dialogAddGroup === true) {
          // 显示时执行
          var params = { templateCode: newVal.targetData.node.data.code }
          getAreaCategory(params).then(res => {
            this.box1 = res.resultData
          })
          // console.log('当前的类', newVal)
          // console.log('box', box)
          // for (let i = 0, length = newVal.length; i < length; i++) {
          //   console.log(1111, box)
          // }
        } else if (newVal.dialogAddGroup === false) {
          this.form.selectedData = []
          this.news = ''
          // box = []
          // console.log(this.form.selectedData)
          // console.log(22222)
        }
      },
      deep: true
    },
    box1(newVal, oldVal) {
      this.box2 = newVal
    },
    news(newVal, oldVal) {
      this.box2 = this.search(newVal, this.box1)
      // console.log('news', newVal, this.box2)
    }
  },
  created() {
    // console.log('box created', box)
  },
  mounted() {
    // console.log('box mounted', box)
    // console.log(this.addtogroup)
  },
  beforeUpdate() {
    // console.log('box beforeUpdate', this.box1)
  },
  // update 给列表赋值
  updated() {
    // if (this.box1 !== box) {
    //   this.box1 = box
    //   console.log('this.box1 updated', this.box1)
    // }
  },
  methods: {
    // 搜索过滤
    search(val, arr) {
      arr = arr.filter(function(item, index, array) {
        return item.categoryCn.indexOf(val) !== -1
      })
      // console.log('search', arr)
      return arr
    },
    // 确定
    submitForm() {
      if (this.form.selectedData !== undefined && this.form.selectedData.length !== 0) {
      // 选中的品类 ，数组格式
        var category = this.form.selectedData
        // 移入的组
        var father = this.addtogroup.targetData.data
        // console.log('category', category, 'father', father)

        // 父级模板分类id,必填
        this.form2.templateClassId = father.id
        // 模板分类id 必填
        // var tmpId = category.map
        var tmp1 = category.map(function(value, index, array) {
          return value.categoryId
        })
        this.form2.categoryId = tmp1.join(',')

        updateCategoryClass(this.form2).then(res => {
          // console.log(res)
          if (res.success) {
            this.$message({
              message: '移入成功',
              type: 'success'
            })
            this.$emit('refreshTree', father)
          }
        }).catch(err => {
          console.log(err)
        })

        this.addtogroup.dialogAddGroup = false
      } else {
        this.$message({
          message: '没有选择品类',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style  lang='scss'>
.addtogroup-shade{
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
        .el-tree{
          height:0;
          width:0;
          overflow: hidden;
        }
        .el-form{
          .selectCon{
              min-height:400px;
            .left{
              border:1px solid #ccc;
              height:400px;
              //overflow: auto;
              float: left;
              width:50%;
              .search {
                .el-input__suffix{
                  left: -90%;
                  bottom:20px;
                  top:-5px;
                }
              }
              .el-checkbox-group{
                height:350px;
                overflow-y:scroll;
                overflow-x:scroll;
                .dataListStyle{
                  //overflow:auto;
                  display: block;
                  padding-left: 20%;
                  padding-top: 10px
                }
              }
              .el-checkbox+.el-checkbox {
                margin-left: 0;
              }

            }
            .right{
              height:400px;
              overflow:auto;
              border:1px solid #ccc;
              float: left;
              width:50%;
              padding-left:20px;
              padding-top: 20px;
              ul li {
                list-style: none;
                padding:5px
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
            padding-left: 30px;
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
