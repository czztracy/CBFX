/*
 * @Page: 报表中心-数据导出-树
 * @Author: cong
 * @Date: 2018-12-11 13:32:17
 * @Last Modified by: cong
 */

<template>
  <div class="treeNav">
    <div class="tree-name">品类（500）</div>
    <div class="tree-search">
      <el-input v-model="filterText" placeholder="请输入内容" prefix-icon="el-icon-search"/>
    </div>
    <div class="tree-con">
      <el-tree
        ref="tree"
        :data="treeList"
        :default-checked-keys="[1]"
        :filter-node-method="filterNode"
        node-key="id"
        class="treeing"
        draggable
        default-expand-all
        show-checkbox
        @check-change="handleCheckChange"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span class="Con">
            <i :class="node.icon"/>
            {{ node.label }}
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tree',
  data() {
    return {
      filterText: '',
      treeList: [
        {
          id: 1,
          label: '物料描述',
          icon: 'fa fa-file-o',
          // disabled: true,
          dataOut: [
            {
              materialNumber: 1,
              describe: '传感器1',
              brand: '海达源',
              model: 'A',
              wireColor: '黑色',
              material: '塑料'
            },
            {
              materialNumber: 2,
              describe: '传感器1',
              brand: '海达源',
              model: 'A',
              wireColor: '黑色',
              material: '塑料'
            },
            {
              materialNumber: 3,
              describe: '传感器1',
              brand: '海达源',
              model: 'A',
              wireColor: '黑色',
              material: '塑料'
            }
          ]
        }, {
          id: 2,
          label: '品牌',
          icon: 'fa fa-file-o',
          dataOut: [
            {
              materialNumber: 11,
              describe: '传感器2',
              brand: '海达源',
              model: 'B',
              wireColor: '黑色',
              material: '塑料'
            },
            {
              materialNumber: 22,
              describe: '传感器2',
              brand: '海达源',
              model: 'B',
              wireColor: '黑色',
              material: '塑料'
            },
            {
              materialNumber: 33,
              describe: '传感器2',
              brand: '海达源',
              model: 'B',
              wireColor: '黑色',
              material: '塑料'
            }
          ]
        }, {
          id: 3,
          label: '规格/型号',
          icon: 'fa fa-file-o',
          dataOut: [
            {
              materialNumber: 111,
              describe: '传感器3',
              brand: '海达源',
              model: 'C',
              wireColor: '黑色',
              material: '塑料'
            },
            {
              materialNumber: 222,
              describe: '传感器3',
              brand: '海达源',
              model: 'C',
              wireColor: '黑色',
              material: '塑料'
            },
            {
              materialNumber: 333,
              describe: '传感器3',
              brand: '海达源',
              model: 'C',
              wireColor: '黑色',
              material: '塑料'
            }
          ]
        }, {
          id: 4,
          label: '线材颜色',
          icon: 'fa fa-file-o',
          dataOut: [
            {
              materialNumber: 1111,
              describe: '传感器4',
              brand: '海达源',
              model: 'D',
              wireColor: '黑色',
              material: '塑料'
            },
            {
              materialNumber: 2222,
              describe: '传感器4',
              brand: '海达源',
              model: 'D',
              wireColor: '黑色',
              material: '塑料'
            },
            {
              materialNumber: 3333,
              describe: '传感器4',
              brand: '海达源',
              model: 'D',
              wireColor: '黑色',
              material: '塑料'
            }
          ]
        }, {
          id: 5,
          label: '材质',
          icon: 'fa fa-file-o',
          dataOut: [
            {
              materialNumber: 11111,
              describe: '传感器5',
              brand: '海达源',
              model: 'E',
              wireColor: '黑色',
              material: '塑料'
            },
            {
              materialNumber: 22222,
              describe: '传感器5',
              brand: '海达源',
              model: 'E',
              wireColor: '黑色',
              material: '塑料'
            },
            {
              materialNumber: 33333,
              describe: '传感器5',
              brand: '海达源',
              model: 'E',
              wireColor: '黑色',
              material: '塑料'
            }
          ]
        }
      ]
      // treeList: [
      //   {
      //     id: 1,
      //     label: '基础信息',
      //     icon: 'fa fa-folder-o',
      //     children: [
      //       {
      //         id: 4,
      //         label: '物料描述',
      //         icon: 'fa fa-file-o'
      //       }, {
      //         id: 5,
      //         label: '品牌',
      //         icon: 'fa fa-file-o'
      //       }, {
      //         id: 6,
      //         label: '规格/型号',
      //         icon: 'fa fa-file-o'
      //       }, {
      //         id: 7,
      //         label: '线材颜色',
      //         icon: 'fa fa-file-o'
      //       }, {
      //         id: 8,
      //         label: '材质',
      //         icon: 'fa fa-file-o'
      //       }
      //     ]
      //   },
      //   {
      //     id: 2,
      //     label: '线束主材料费',
      //     icon: 'fa fa-folder-o',
      //     children: [
      //       {
      //         id: 9,
      //         label: '物料描述',
      //         icon: 'fa fa-file-o'
      //       },
      //       {
      //         id: 10,
      //         label: '品牌',
      //         icon: 'fa fa-file-o'
      //       }, {
      //         id: 11,
      //         label: '规格/型号',
      //         icon: 'fa fa-file-o'
      //       }, {
      //         id: 12,
      //         label: '线材颜色',
      //         icon: 'fa fa-file-o'
      //       }, {
      //         id: 13,
      //         label: '材质',
      //         icon: 'fa fa-file-o'
      //       }
      //     ]
      //   },
      //   {
      //     id: 3,
      //     label: '线束辅材料费',
      //     icon: 'fa fa-folder-o',
      //     children: [
      //       {
      //         id: 14,
      //         label: '物料描述',
      //         icon: 'fa fa-file-o'
      //       },
      //       {
      //         id: 15,
      //         label: '品牌',
      //         icon: 'fa fa-file-o'
      //       }, {
      //         id: 16,
      //         label: '规格/型号',
      //         icon: 'fa fa-file-o'
      //       }, {
      //         id: 17,
      //         label: '线材颜色',
      //         icon: 'fa fa-file-o'
      //       }, {
      //         id: 18,
      //         label: '材质',
      //         icon: 'fa fa-file-o'
      //       }
      //     ]
      //   }
      // ]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    // handleNodeClick(data) {
    //   console.log(data)
    // },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleCheckChange(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate)
      console.log(data.id, checked, indeterminate)
      // console.log(data.dataOut)
      this.$emit('checkChange', data.dataOut, checked, data.id)
    }
  }
}
</script>

<style lang='scss' scoped>
.treeNav {
  width: 100%;
  height: 100%;
  border-right: 1px solid #d1d1d1;
  .tree-name {
    height: 54px;
    line-height: 54px;
    padding-left: 25px;
    color: #4a4a4a;
    font-size: 17px;
    font-weight: 500;
  }
  .tree-search {
    height: 36px;
    line-height: 36px;
  }
  .tree-con {
    width: 100%;
    padding-top: 20px;
  }
}
</style>
<style lang='scss'>
.treeNav {
  .tree-search {
    .el-input {
      .el-input__inner {
        border-radius: 0;
        border-color: #d1d1d1;
        border-right: 0;
      }
    }
  }
}
</style>
