/*
 * @Page: 模板新建页面
 * @Author: cong
 * @Date: 2019-02-22 15:02:37
 * @Last Modified by: cong
 */

<template>
  <div>
    <!-- 左侧树 -->
    <el-col :span="4">
      <div class="treeLeft" style="margin: 20px;">
        <el-tree
          :data="data"
          :props="defaultProps"
          :allow-drop="allowDrop"
          :allow-drag="allowDrap"
          draggable
          @node-click="handleNodeClick"
          @node-drag-start="handleDragStart"
        />
      </div>
    </el-col>
    <!-- 右侧表区 -->
    <el-col :span="20">
      <div class="newlybuild">
        <div class="btngroup">
          <!-- <el-button type="primary" @click="exportExcel">导出Excel</el-button>
          <div class="importfile">
            <div class="beforechoose">
              {{ filename }}
              <input type="file" accept=".xls, .xlsx" @change="processFile($event)">
            </div>
          </div> -->
          <!-- <el-button type="primary" @click="aaa">表区json</el-button> -->
          <!-- <el-button type="primary" @click="exportPdf">导出PDF</el-button> -->
          <!-- <el-button type="primary" @click="handleSaveTemplate">模板保存</el-button> -->
          <!-- <span>新建模板名称:</span>
          <el-input v-model="templateName" placeholder="请输入内容"/> -->
          <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button id="item1" type="primary">拖拽数据</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="aaa">表区json</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportPdf">导出PDF</el-button>
            </el-form-item>
            <el-form-item label="新建模板名称" class="demo-form-inline">
              <el-input v-model="form.templateName"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveTemplate">模板保存</el-button>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="disabled" type="primary" @click="handleSubmitTemplate">模板发布</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportExcel">导出Excel</el-button>
            </el-form-item>
            <el-form-item>
              <div class="importfile">
                <div class="beforechoose">
                  {{ form.filename }}
                  <input type="file" accept=".xls, .xlsx" @change="processFile($event)">
                </div>
              </div>
            </el-form-item>
          </el-form>
          <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" placeholder="审批人"/>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"/>
                <el-option label="区域二" value="beijing"/>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form> -->
          <!-- <p>1.  <button @click="exportJson">导出json</button> </p> -->
          <!-- <p>2.  <button @click="exportPdf">导出PDF</button> </p> -->
          <!-- <p> <button @click="exportExcel">导出Excel</button> </p>
      <p> <input type='file'
               @change="processFile($event)" />
          <button @click="importExcel">导入Excel</button> </p>-->
        </div>
        <div id="pdfDom" class="spreadContainer">
          <gc-spread-sheets :host-class="'spreadHost'" @workbookInitialized="spreadInitHandle">
            <gc-worksheet :data-source="dataSource" :name="'模板1'">
              <gc-column :data-field="'A'"/>
              <gc-column :data-field="'B'"/>
              <gc-column :data-field="'C'"/>
              <gc-column :data-field="'D'"/>
              <gc-column :data-field="'E'"/>
              <gc-column :data-field="'F'"/>
              <gc-column :data-field="'G'"/>
              <gc-column :data-field="'H'"/>
              <gc-column :data-field="'I'"/>
              <gc-column :data-field="'J'"/>
              <gc-column :data-field="'K'"/>
              <gc-column :data-field="'L'"/>
              <gc-column :data-field="'M'"/>
              <gc-column :data-field="'N'"/>
              <gc-column :data-field="'O'"/>
              <gc-column :data-field="'P'"/>
              <gc-column :data-field="'Q'"/>
              <gc-column :data-field="'R'"/>
              <gc-column :data-field="'S'"/>
              <gc-column :data-field="'T'"/>
            </gc-worksheet>
          </gc-spread-sheets>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import ExcelIO from '@grapecity/spread-excelio' // 新插件excel部分
import FaverSaver from 'file-saver'
// import { downloadPdf } from "@/utils/PDF";
import { saveTemplate, getTemplate } from '@/api/template'
export default {
  name: 'Newlybuild',
  data() {
    return {
      dataSource: [
        {
          G: '',
          H: '',
          I: '',
          J: '',
          K: '',
          L: '',
          M: '',
          N: '',
          O: '',
          P: '',
          Q: '',
          R: '',
          S: '',
          T: '',
          A: '',
          B: '',
          C: '',
          D: '',
          E: '',
          F: ''
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        // 模板名称
        templateName: '',
        filename: '导入Excel'
      },
      // 模板版本
      templateVersionId: '',
      // 模板id
      templateId: '',
      // 提交按钮控制
      disabled: true,
      // 表区
      S: ''
    }
  },
  mounted() {
    if (this.$route.query.templateName) {
      this.form.templateName = this.$route.query.templateName
    }
    if (this.$route.query.page === '1') {
      this.disabled = true
    } else {
      this.disabled = false
      // 模板查询
      const params = {
        templateId: this.$route.query.templateId
      }
      getTemplate(params).then(res => {
        console.log(res, JSON.parse(res.resultData.templateScript))
        this.dataSource = JSON.parse(res.resultData.templateScript)
      }).catch(err => {
        console.log(err)
      })
    }

    // if (this.$route.query.page === '1') {
    //   this.form.templateName = ''
    //   this.templateVersionId = ''
    //   this.templateId = ''
    //   this.disabled = true
    // } else {
    //   this.form.templateName = this.$route.query.templateName
    //   this.templateVersionId = this.$route.query.templateVersionId
    //   this.templateId = this.$route.query.templateId
    //   this.disabled = false
    // }
  },
  methods: {
    // 模板提交
    handleSubmitTemplate() {
      console.log('模板发布')
      if (this.$route.query.page === '2') {
        this.templateVersionId = this.$route.query.templateVersionId
        this.templateId = this.$route.query.templateId
      }
      const params = {
        templateName: this.form.templateName,
        categoryId: this.$route.query.templateClassId,
        templateScript: JSON.stringify(this.dataSource),
        templateState: '0002',
        templateVersionId: this.templateVersionId,
        templateId: this.templateId
      }
      saveTemplate(params)
        .then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: res.resultData.data
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 模板保存
    handleSaveTemplate() {
      console.log(this.$route.query, this._spread.toJSON())
      if (this.$route.query.page === '1') {
        var params = {
          templateName: this.form.templateName,
          categoryId: this.$route.query.templateClassId,
          templateState: '0001',
          templateScript: JSON.stringify(this.dataSource),
          templateVersionId: this.templateVersionId,
          templateId: this.templateId
        }
        saveTemplate(params)
          .then(res => {
            console.log(res)
            this.templateVersionId = res.resultData.templateVersionId
            this.templateId = res.resultData.templateId
            this.disabled = false
            this.$message({
              type: 'success',
              message: res.resultData.data
            })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        var data = {
          templateName: this.form.templateName,
          categoryId: this.$route.query.templateClassId,
          templateState: '0001',
          templateScript: JSON.stringify(this.dataSource),
          templateVersionId: this.$route.query.templateVersionId,
          templateId: this.$route.query.templateId
        }
        saveTemplate(data)
          .then(res => {
            console.log(res)
            this.templateVersionId = res.resultData.templateVersionId
            this.templateId = res.resultData.templateId
            this.disabled = false
            this.$message({
              type: 'success',
              message: res.resultData.data
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
      // alert("模板保存");
    },
    // 拖拽
    addQ(spread) {
      var td = document.getElementById('item1')
      td.draggable = true
      td.addEventListener('dragstart', function(ev) {
        // 存储相关的拖拽元素
        dragged = ev.target
        // 设置拖拽元素的透明度
        ev.target.style.opacity = 0.5
        console.log('开始拖动 ')
      }, false)
      /* 事件在拖拽元素上触发 */
      document.addEventListener('dragend', function(ev) {
        // 重设透明度
        event.target.style.opacity = ''
      }, false)

      /* 事件在目标区域触发 */
      document.addEventListener('dragover', function(event) {
        // 默认情况下是无法允许一个元素放置在另一个元素上的，要放置必须阻止默认行为
        event.preventDefault()
        console.log('已经在目标区域 ')
      }, false)

      /* 事件在目标区域触发 */
      document.addEventListener('dragenter', function(event) {
        // 当拖拽元素进入潜在放置区域时，高亮处理
        if (event.target.className === 'dropzone') {
          event.target.style.background = 'purple'
        }

        console.log('已经触发')
      }, false)

      /* 事件在目标区域触发 */
      document.addEventListener('dragleave', function(event) {
        // 当拖拽元素离开潜在放置区域时重置该目标区域的背景
        if (event.target.className === 'dropzone') {
          event.target.style.background = ''
        }
        console.log('离开目标区域！')
      }, false)

      /* 松开鼠标，触发 drop */
      document.addEventListener('drop', function(event) {
        // 阻止默认行为（drop的默认处理方式是当初链接处理）
        event.preventDefault()
        // 把拖拽元素移入目标区域
        // 这里要经过两步处理
        // 1、先把拖拽元素从原父元素中删除（这步不是必须的）
        // /2、然后再添加到目标区域
        if (event.target.className === 'dropzone') {
          event.target.style.background = ''
          dragged.parentNode.removeChild(dragged)
          event.target.appendChild(dragged)
        }
        // 获取拖动物理在屏幕的位置
        var offsetL = document.getElementById('pdfDom').offsetLeft
        var offsetT = document.getElementById('pdfDom').offsetTop
        // 获取拖动块的值
        var tab_value = document.getElementById('item1').innerText
        console.log(tab_value)
        var x = event.pageX - offsetL
        var y = event.pageY - offsetT
        // 获取单元格的位置
        var target = spread.hitTest(x, y)
        console.log(target)
        console.log('列： ' + target.worksheetHitInfo.col + '行: ' + target.worksheetHitInfo.row)
        var sheet = spread.getActiveSheet()
        sheet.setValue(target.worksheetHitInfo.row, target.worksheetHitInfo.col, tab_value)

        console.log('执行完毕 ')
      })
    },
    // 表区json
    aaa() {
      var json = this._spread.toJSON()
      console.log('导出JSON', json)
      // console.log(this._spread.toJSON().sheets.Sheet2.data.dataTable)
      // this._spread.toJSON().sheets.Sheet2.data.dataTable = [{ value: 1 }, { value: 2 }]
    },
    // 初始化spread
    spreadInitHandle: function(spread) {
      this._spread = spread
      spread.refresh()
      // this.addQ(spread)
      // console.log(11111111, spread, this._spread, this.$GC.Spread.Sheets)
      // var sheet = this._spread.getActiveSheet();
      // var tableStyle = this.$GC.Sheets.Tables.TableThemes.light1;
      // var table = sheet.tables.add("table1", 0, 0, 4, 4, tableStyle);
      // set value to the table
      // sheet.setArray([
      //   ['Id', Name', 'Age', 'Grade'],
      //   [1000, 'Tom', 23, 98],
      //   [1001, 'Bob', 22, 80],
      //   [1002, 'Tony', 23, 99]
      // ]);
      // var person = { name: 'Wang feng', age: 25, sex: 'male', address: { postcode: '710075' } };
      // sheet.setBindingPath(2, 1, "name");
      // sheet.setBindingPath(3, 1, 'age');
      // sheet.setBindingPath(4, 1, 'sex');
      // sheet.setBindingPath(5, 1, 'address.postcode');
      // sheet.setDataSource(source);
    },
    // 文件流
    processFile(event) {
      this.filename = event.target.files[0].name
      this.excelFile = event.target.files[0]
      this.importExcel()
    },
    // Excel导入
    importExcel() {
      var excelIO = new ExcelIO.IO()
      console.log(excelIO)
      var self = this
      excelIO.open(self.excelFile, function(json) {
        self._spread.fromJSON(json)
        console.log(json)
      })
    },
    exportJson() {
      // debugger
      console.log(this._spread.Excel)
      // this.excelIo = new ExcelIO.IO()
      // var jsonStr = null
      // // export
      // jsonStr = JSON.stringify(this._spread.toJSON())
      // import
      // spread.fromJSON(JSON.parse(jsonStr));
    },
    // 导出PDF
    exportPdf() {
      console.log(this._spread)
      // downloadPdf();
      // this.registerServerFont('微软雅黑', 'normal', 'font/msyh.ttf')
      this._spread.savePDF(
        function(blob) {
          saveAs(blob, 'download.pdf')
        },
        console.log,
        {
          title: 'Test Title',
          author: 'Test Author',
          subject: 'Test Subject',
          keywords: 'Test Keywords',
          creator: 'test Creator'
        }
      )
    },
    registerServerFont(name, type, serverPath) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', serverPath, true)
      xhr.responseType = 'blob'

      xhr.onload = function(e) {
        if (this.status === 200) {
          // get binary data as a response
          var blob = this.response

          // 将Blob 对象转换成 ArrayBuffer
          var reader = new FileReader()
          reader.onload = function(e) {
            var fontrrayBuffer = reader.result
            var fonts =
              this._spread.Sheets.PDF.PDFFontsManager.getFont(name) || {}
            fonts[type] = fontrrayBuffer
            this._spread.Sheets.PDF.PDFFontsManager.registerFont(name, fonts)
          }
          reader.readAsArrayBuffer(blob)
        }
      }

      xhr.send()
    },
    // 导出Excel
    exportExcel() {
      var excelIO = new ExcelIO.IO()
      // 数据源序列化 includeBindingSource: true
      // 导出列头第一行 frozenRowsAsColumnHeaders:true
      var json = this._spread.toJSON({
        includeBindingSource: true,
        frozenRowsAsColumnHeaders: true
      })
      console.log(111111, json)
      excelIO.save(
        json,
        function(blob) {
          FaverSaver.saveAs(blob, 'export.xlsx')
        },
        function(e) {
          console.log(e)
        }
      )
    },
    handleNodeClick(data, node) {
      console.log(data, node)
    },
    // 拖拽不能在节点之间放置
    allowDrop(draggingNode, dropNode, type) {
      // console.log(draggingNode, dropNode, type)
      // return type !== 'inner'
      // 同级拖拽
      if (draggingNode.level === dropNode.level) {
        // id相同才可拖拽放入
        if (draggingNode.id === dropNode.id) {
          return type === 'prev'
        }
      } else {
        // 不同级进行处理
      }
    },
    // 组不能拖拽
    allowDrap(draggingNode) {
      // console.log(draggingNode)
      return draggingNode.isLeaf === true
    },
    // 拖拽
    handleDragStart(node, ev, item, _spread) {
      console.log(ev, node.data)
      // var target = _spread.hitTest(x, y)
      // console.log(target)
    }
  }
}
</script>

<style scoped lang="scss">
.newlybuild {
  width: 96%;
  min-width: 900px;
  margin: 20px;
  .btngroup {
    // margin: 20px auto;
    // text-align: right;
    .importfile {
      display: inline-block;
      .beforechoose {
        margin: auto 20px;
        font-size: 14px;
        padding: 0 20px;
        /*height: 34px;*/
        // line-height: 28px;
        position: relative;
        cursor: pointer;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        border-radius: 4px;
        // overflow: hidden;
        display: inline-block;
        // display: inline;
        zoom: 1;
        input {
          position: absolute;
          font-size: 100px;
          right: 0;
          top: 0;
          opacity: 0;
          width: 100%;
          height: 100%;
          filter: alpha(opacity=0);
          cursor: pointer;
        }
        &:hover {
          color: #ffffff;
          background: #66b1ff;
          border-color: #66b1ff;
          text-decoration: none;
        }
      }
    }
  }
  .spreadContainer {
    height: 600px;
    box-shadow: 0 0 20px grey;
    .spreadHost {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
