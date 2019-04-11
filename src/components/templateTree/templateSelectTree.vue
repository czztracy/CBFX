/*
 * @Page: 模板创建 --> 搜索模板组件
 * @Author: csg
 * @Date: 2018-12-11 14:56:03
 * @Last Modified by: csg
 */
<template>
  <div class="templateBoxTree" @click="showTree = !showTree">
    <div v-if="showTree" class="treeBOX">
      <el-input v-model="filterText" placeholder="请输入内容">
        <i slot="prefix" class="el-input__icon el-icon-search"/>
      </el-input>
      <el-tree
        ref="tree2"
        :data="data2"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }" :title="node.label" class="slot-t-node">
          <i class="fa fa-bandcamp"/>
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTree: false,
      filterText: '',
      data2: [{
        id: 1,
        label: '电源线模板'
      }, {
        id: 2,
        label: '线束模板'
      }, {
        id: 3,
        label: '红外传感器模板'
      }, {
        id: 4,
        label: '水位传感器模板'
      }, {
        id: 5,
        label: '电源线模板'
      }, {
        id: 6,
        label: '电源线模板'
      }, {
        id: 7,
        label: '电源线模板'
      }, {
        id: 8,
        label: '电源线模板'
      }, {
        id: 9,
        label: '电源线模板'
      }, {
        id: 10,
        label: '电源线模板'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  mounted() {
    // document.addEventListener('click', () => {
    //   this.showTree = false
    // })
  },
  methods: {
    // 搜索处理
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 点击节点
    handleNodeClick(node, data) {
      console.log(node, data)
      this.showTree = false
    }
  }
}
</script>

<style scoped>
.templateBoxTree {
  width: 54px;
  height: 36px;
  border: 1px solid #cecccc;
  margin: 0 auto;
  position: relative;
  display: inline-block;
  float: left;
}
.treeBOX {
  position: absolute;
  top: 40px;
  min-width: 200px;
  height: 440px;
  /* border: 1px solid #cecccc; */
  display: inline-block;
  box-shadow: 6px 0 25px 0 rgba(0, 0, 0, 0.16);
}
</style>
<style>
.treeBOX .el-tree-node__expand-icon.is-leaf {
  display: none;
}
.treeBOX .el-input--prefix .el-input__inner {
  border: 0;
  border-bottom: 1px solid #cecccc;
  border-radius: 0;
}
.treeBOX .el-input.el-input--prefix i {
  color: #333333;
  font-weight: 600;
}
.treeBOX .el-tree-node__content {
  padding-left: 20px;
  height: 40px;
}
.treeBOX .slot-t-node i {
  margin-right: 10px;
  margin-left: 20px;
  font-size: 24px;
}
.treeBOX .el-tree {
  overflow-y: auto;
  height: 400px;
}
</style>
