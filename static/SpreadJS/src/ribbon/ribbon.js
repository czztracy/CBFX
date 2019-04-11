(function() {
  'use strict'

  var Sheets = GC.Spread.Sheets
  var designer = GC.Spread.Sheets.Designer
  var Charts = GC.Spread.Sheets.Charts
  var Chart = Charts.Chart
  var chartHelper = designer.util.chartHelper
  var ColorHelper = designer.ColorHelper
  var keyword_undefined = void 0
  var ChartLayoutPicker = designer.ChartLayoutPicker
  var InsertShapePopup = designer.InsertShapePopup
  var InsertShapePreview = designer.InsertShapePreview
  var shapeStylePreview = designer.shapeStylePreview
  var setShapeWidthAndHeight = designer.setShapeWidthAndHeight
  var shapeHelper = designer.shapeHelper
  var ribbon = {}
  var buttonCommonClass = 'schema-type-button'
  var ztreeID = 'ztree-container'
  var ztContainer = 'ztree-container'
  var slicerType = 'other'
  var _selectedTableStyleName
  var isAutoGenerateLabel = true
  var isModified = false
  var originalDataSource
  var chartIsClick = false
  var ChartColorPicker = designer.ChartColorPicker
  var chartTemplates = designer.chartTemplates
  var AddChartElement = designer.AddChartElement
  var chartSliderPanel = designer.chartSliderPanel
  var shapeSliderPanel = designer.shapeSliderPanel
  var winWidth = 0 // 当前浏览器宽度
  var winHeight = 0 // 当前浏览器高度
  window.onresize = findDimensions
  $('#dialog').dialog({
    autoOpen: false
  })

  // 点击单元格
  var tmpargs = {}

  // 测试地址
  function api() {
    if (judgeUrl() === '003') {
      return 'http://47.104.98.71:8780/costmanagement/'
      // return 'http://dbs.haier.net/reportmanagement/';
    } else if (judgeUrl() === '002') {
      return 'http://dbs.haier.net/reportmanagement/'
    } else if (judgeUrl() === '001') {
      return 'http://47.104.98.71:8680/costmanagement/'
    }
  }

  // code   001演示  002 正式  003 本地
  function judgeUrl() {
    const url = window.location.href
    if (typeof url === 'string') {
      if (url.indexOf('http://127.0.0.1:5500/src/index/index.html') !== -1) {
        const code = '003'
        return code
      } else if (url.indexOf('http://dbs.haier.net') !== -1) {
        const code = '002'
        return code
      } else {
        const code = '001'
        return code
      }
    }
  }
  // 导航切换修改
  function removeSession() {
    window.sessionStorage.removeItem('checkedStatus')
    window.sessionStorage.removeItem('fieldLogicAcquisition')
    window.sessionStorage.removeItem('fieldName')
    window.sessionStorage.removeItem('fieldSelect')
    window.sessionStorage.removeItem('citySel')
  }

  // 分割地址栏参数
  function get_query(string) {
    console.log(string)
    if (window.location.href.indexOf('&') === -1) {
      // alert('入口不正确，请从模板管理进入')
      return
    }
    var arrayModle = string.split('?')[1].split('&')
    var userDatas = '{'
    for (var key in arrayModle) {
      arrayModle[key] = arrayModle[key].replace('=', '":"')
      userDatas += '"' + arrayModle[key].replace('=', '":"') + '",'
    }
    userDatas = userDatas.substr(0, userDatas.length - 1) + '}'
    return JSON.parse(userDatas)
  }
  var userData = get_query(window.location.href)
  // console.log(11111, userData)

  // 鼠标移动事件
  var activetime = 0
  window.addEventListener('mouseover', function(e) {
    activetime = (new Date()).getTime()
    window.sessionStorage.setItem('activetime', activetime)
    // e = e || event
    // e.preventDefault()
  }, false)

  // #endregion
  // #region Init Ribbon
  function initRibbonBar() {
    var delayTime = 200
    var midType = 4 /* Percentile */, midValue = '50'

    var backColorPopup, foreColorPopup, chartColorPopup
    var sparklineColorPopup
    var conditionFormatPopup, highlightCellsRulesPopup, topBottomRulesPopup, dataBarsPopup, colorScalesPopup,
      iconSetsPopup, clearRulesPopup
    var setRowHeightDialog
    var setColumnWidthDialog
    var setStandardRowHeightDialog
    var setStandardColumnWidthDialog
    var fillDialog
    var insertCellsDialog
    var deleteCellsDialog
    var insertShapePopup
    var groupDialog
    var ungroupDialog
    var findDialog
    var sortDialog
    var spreadSettingDialog
    var sheetSettingDialog
    var gotoDialog
    var nameManagerDialog
    var dataValidationDialog
    var insertFunctionDialog
    var buttonCellTypeDialog
    var checkBoxCellTypeDialog
    var comboBoxCellTypeDialog
    var hyperLinkCellTypeDialog
    var groupDirectionDialog
    var setZoomDialog
    var insertSparklineDialog
    var sparklineWeightDialog
    var sparklineMarkerColorDialog
    var formatTablePopup
    // var chartTemplatePopup;

    var createTableDialog
    var resizeTableDialog
    var cellStylesPopup
    var psDialog
    var asDialog
    var ssDialog
    var csDialog
    var bulletSparklineDialog
    var spreadSparklineDialog
    var stackedSparklineDialog
    var hbarSparklineDialog
    var vbarSparklineDialog
    var variSparklineDialog
    var boxplotSparklineDialog
    var cascadeSparklineDialog
    var paretoSparklineDialog
    var newFormattingRuleDialog
    var protectionOptionDialog
    var insertSlicerDialog
    var formatSlicerPopup
    var chartLayoutPopup
    var chartLayoutPicker
    var chartStylesPopup
    var monthSparklineDialog
    var yearSparklineDialog
    var barcodeDialog
    var chartColorPicker
    var addChartElement
    var addChartElementpopup
    var insertShapesPopup
    var changeShapeTypePopup
    var cellValueRuleFormatDialog = new designer.CellValueRuleFormatDialog(),
      textRuleFormatDialog = new designer.TextRuleFormatDialog(),
      dateOccurringFormatDialog = new designer.DateOccurringFormatDialog(),
      duplicateValuesFormatDialog = new designer.DuplicateValuesFormatDialog(),
      top10RuleFormatDialog = new designer.Top10RuleFormatDialog(),
      averageRuleFormatDialog = new designer.AverageRuleFormatDialog(),
      formatRulesManagerDialog = new designer.FormatRulesManagerDialog()
    // 更改默认字体为simkai
    var activeSheet = designer.wrapper.spread.getActiveSheet()
    var theme = activeSheet.currentTheme()
    theme.bodyFont('simkai')
    activeSheet.currentTheme(theme)

    // 导航切换时渲染当前的json
    if ((window.location.href).indexOf('templateClassId') === -1) {
      // console.log(window.sessionStorage.getItem('jsonStr'), '当前json')
      var json = JSON.parse(window.sessionStorage.getItem('jsonStr'))
      designer.wrapper.spread.fromJSON(json)
      // 判断字段设置是否显示
      if (window.sessionStorage.getItem('checkedStatus') == 'true') {
        var activeSheet = designer.wrapper.spread.getActiveSheet()
        var designMode = $('#template-design-mode')
        var designModeText = designMode.find('span.ui-button-text')
        var checkedStatus = designMode.data('checked')
        // console.log(designMode, checkedStatus)
        checkedStatus = !checkedStatus
        if (checkedStatus) {
          // replace celltype paint
          _replacePaint()
          designModeText.addClass('template-design-mode-checked')

          initDesignModeSliderPanel()
          var sliderPanel = $('.slider-panel')
          sliderPanel.sliderpanel('open', 'panel1')
        }
        designMode.data('checked', checkedStatus)
        activeSheet.repaint()
        // 渲染字段搜索
        var value = window.sessionStorage.getItem('citySel')
        $('#citySel').val(value)
        // 渲染字段名称
        $('#fieldName input').val(window.sessionStorage.getItem('fieldName'))
        // 渲染逻辑获取
        var fieldAttribute = window.sessionStorage.getItem('fieldLogicAcquisition')
        if (fieldAttribute === '0002') { // 逻辑获取
          $('#fieldLogicAcquisition #fieldLogicAcquisition1').prop('checked', true)
          $('#fieldLogicalAccessTrue').css({
            'display': 'block'
          })
        } else if (fieldAttribute === '0001') {
          $('#fieldLogicAcquisition #fieldLogicAcquisition2').prop('checked', true)
        }
      } else {
        exitTemplateDesignMode()
      }
    } else {
      window.sessionStorage.removeItem('jsonStr')
      removeSession()
      window.sessionStorage.setItem('href', window.location.href)
    }

    designer.wrapper.spread.bind(GC.Spread.Sheets.Events.CellClick, function(sender, args) {
      // 更改默认字体为simkai
      var activeSheet = designer.wrapper.spread.getActiveSheet()
      var theme = activeSheet.currentTheme()
      theme.bodyFont('simkai')
      activeSheet.currentTheme(theme)
      activetime = (new Date()).getTime()
      window.sessionStorage.setItem('activetime', activetime)
      var jsonStr = designer.wrapper.spread.toJSON('{}')
      // console.log(jsonStr.sheets[args.sheetName].data.dataTable[args.row][args.col])
      const tmpargs1 = args
      if (jsonStr.sheets[args.sheetName].data.dataTable) {
        if (jsonStr.sheets[args.sheetName].data.dataTable[args.row]) {
          if (jsonStr.sheets[args.sheetName].data.dataTable[args.row][args.col]) {
            var tagData = jsonStr.sheets[args.sheetName].data.dataTable[args.row][args.col]
            // 显示name
            if (tagData.value) {
              $('#fieldName input').val(tagData.value)
            } else {
              // 显示name
              $('#fieldName input').val('')
            }
            // 显示是否逻辑和获取
            if (tagData.tag) {
              if (tagData.tag.getWay) {
                if (tagData.tag.getWay.way === '0002') {
                  $('#fieldLogicalAccessTrueSelect').val(tagData.tag.logicalAccess)
                  // 显示逻辑获取的选项
                  $('#fieldLogicAcquisition #fieldLogicAcquisition1').prop('checked', true)
                  console.log('#fieldLogicAcquisition1', $('#fieldLogicAcquisition input:radio:checked').val())
                  $('#fieldLogicalAccessTrue').css({
                    'display': 'block'
                  })
                } else if (tagData.tag.getWay.way === '0001') {
                  $('#fieldLogicalAccessTrueSelect').val('')
                  $('#fieldLogicAcquisition #fieldLogicAcquisition2').prop('checked', true)
                  $('#fieldLogicalAccessTrue').css({
                    'display': 'none'
                  })
                } else {
                  $('#fieldLogicalAccessTrueSelect').val('')
                  $('#fieldLogicAcquisition #fieldLogicAcquisition2').prop('checked', true)
                  $('#fieldLogicalAccessTrue').css({
                    'display': 'none'
                  })
                }
              }
            } else { // 清空字段属性
              // 显示是否逻辑和获取
              $('#fieldLogicalAccessTrueSelect').val('')
              $('#fieldLogicAcquisition #fieldLogicAcquisition1').prop('checked', false)
              $('#fieldLogicAcquisition #fieldLogicAcquisition2').prop('checked', false)
              $('#fieldLogicalAccessTrue').css({
                'display': 'none'
              })
              console.log(1)
            }
          } else { // 清空字段属性
            // 显示name
            $('#fieldName input').val('')
            // 显示是否逻辑和获取
            $('#fieldLogicalAccessTrueSelect').val('')
            $('#fieldLogicAcquisition #fieldLogicAcquisition1').prop('checked', false)
            $('#fieldLogicAcquisition #fieldLogicAcquisition2').prop('checked', false)
            $('#fieldLogicalAccessTrue').css({
              'display': 'none'
            })
            console.log(2)
            // 导航切换修改
            removeSession()
          }
        } else { // 清空字段属性
          // 显示name
          $('#fieldName input').val('')
          // 显示是否逻辑和获取
          $('#fieldLogicalAccessTrueSelect').val('')
          $('#fieldLogicAcquisition #fieldLogicAcquisition1').prop('checked', false)
          $('#fieldLogicAcquisition #fieldLogicAcquisition2').prop('checked', false)
          $('#fieldLogicalAccessTrue').css({
            'display': 'none'
          })
          console.log(3)
          // 导航切换修改
          removeSession()
        }
      } else { // 清空字段属性
        // 显示name
        $('#fieldName input').val('')
        // 显示是否逻辑和获取
        $('#fieldLogicalAccessTrueSelect').val('')
        $('#fieldLogicAcquisition #fieldLogicAcquisition1').prop('checked', false)
        $('#fieldLogicAcquisition #fieldLogicAcquisition2').prop('checked', false)
        $('#fieldLogicalAccessTrue').css({
          'display': 'none'
        })
        console.log(4)
        // 导航切换修改
        removeSession()
      }
      tmpargs = args
      console.log('jsonStr', jsonStr)
      // 导航切换修改
      window.sessionStorage.setItem('jsonStr', JSON.stringify(jsonStr)) // 当前模板json
      window.sessionStorage.setItem('checkedStatus', $('#template-design-mode').data('checked')) // 右侧字段设置显隐
    })

    var showSubItemTicket = [], hideSubItemTicket = [], showingPopup
    var closeConditionalFormatMenu = function() {
      var i
      for (i = 0; i < hideSubItemTicket.length; i++) {
        clearTimeout(hideSubItemTicket[i])
      }
      hideSubItemTicket = []
      for (i = 0; i < showSubItemTicket.length; i++) {
        clearTimeout(showSubItemTicket[i])
      }
      showSubItemTicket = []

      if (showingPopup) {
        showingPopup.children('ul').addClass('hidden')
        showingPopup = keyword_undefined
      }
      $('#condition-format-popup').children('ul').addClass('hidden')
    }
    var spread2 = new GC.Spread.Sheets.Workbook(_getElementById('ss1'), {
      sheetCount: 1
    })
    // 预览时新建预览表
    findDimensions()
    // 自定义插入
    customInsertMenu()
    // 将需要的数据 存入隐藏hidesheet里
    function updateRowCol() {
      let targetData = ''
      const tableTotal = []
      const script = designer.wrapper.spread.toJSON('{}')
      Object.keys(script.sheets).some((element) => {
        if (script.sheets[element].index === 0) {
          targetData = script.sheets[element].data.dataTable
          return true
        }
      })
      for (const rows in targetData) {
        const tableArea = []
        let judgeColor = ''
        for (const cols in targetData[rows]) {
          const cellStyle = targetData[rows][cols].style
          if (targetData[rows][cols].tag) {
            judgeColor = cellStyle.backColor
            // 手动更新tag里的row和col  (防止插入行列不对应)
            targetData[rows][cols].tag.tableHeadInfo.row = +rows
            targetData[rows][cols].tag.tableHeadInfo.col = +cols
            tableArea.push(targetData[rows][cols].tag.tableHeadInfo)
          } else if ((cellStyle) && (cellStyle.backColor === judgeColor)) {
            tableArea.push({
              row: +rows,
              col: +rows,
              logicalAccess: '',
              name: 'column'
            })
          }
        }
        if (tableArea.length) {
          tableTotal.push(tableArea)
        }
      }
      // const tableSave = tagToTables(reconsitutionTag(tableTotal))
      const tableSave = JSON.stringify(tableTotal)
      designer.wrapper.spread.getSheetFromName('hideSheet').setValue(0, 0, tableSave)
    }

    // 是否初始渲染模板
    function start_modle(string) {
      // var tmpSaveJson = JSON.parse(window.localStorage.getItem('hahaha'))
      // console.log(tmpSaveJson)
      // designer.wrapper.spread.fromJSON(tmpSaveJson);
      console.log(window.location.href, 'iframe地址', userData.page == 2)
      if (string.indexOf('&') === -1) {
        return
      }
      if (userData.page == 2) {
        var url_modle = api() + 'template/getTemplate'
        var data_modle = {
          templateId: userData.templateId
        }
        $.ajax({
          type: 'GET',
          url: url_modle,
          data: data_modle,
          dataType: 'json',
          headers: { 'ticket': userData.ticket, 'overtime': userData.overtime, 'Content-Type': 'application/json; charset=UTF-8' },
          // jsonpCallback: 'jsonpProcess', // jsonpProcess自定义函数名
          success: function(data, status, xhr) {
            var tmpSaveJson = JSON.parse(data.resultData.templateScript)
            var overtimeIframe = { overtime: xhr.getResponseHeader('overtime') }
            userData.overtime = overtimeIframe.overtime
            window.parent.postMessage(overtimeIframe, '*')
            if (!tmpSaveJson.hasOwnProperty('sheets')) {
              alert('不是新插件的脚本，无法渲染')
              return
            }
            designer.wrapper.spread.fromJSON(tmpSaveJson)
          },
          error: function(err) {
            console.log(err)
          }
        })
      }
    }
    start_modle(window.location.href)

    // 注册自定义字体
    function registerCustomFont(fontsObj) {
      var fonts = {
        normal: fontsObj['simkai.ttf']
      }
      GC.Spread.Sheets.PDF.PDFFontsManager.registerFont('simkai', fonts)
    }
    // 保存提交请求接口
    function saveOrSubmit(modleState) {
      var fontsObj = fonts
      var activeSheet = designer.wrapper.spread.getActiveSheet()
      // register the specific custom font 注册特定字体
      registerCustomFont(fontsObj)
      // 设置单元格字体为simkai
      // var columnCount = activeSheet.getColumnCount()
      // var rowCount = activeSheet.getRowCount()
      // 更改默认字体为simkai
      var theme = activeSheet.currentTheme()
      theme.bodyFont('simkai')
      activeSheet.currentTheme(theme)
      // designer.wrapper.spread.suspendPaint() // 停止表单重绘
      // // 遍历单元格更改字体
      // for (let c = 0; c < columnCount; c++) {
      //   for (let i = 3; i < rowCount; i++) {
      //     activeSheet.getCell(i, c).font('normal normal 11px simkai')
      //   }
      //   activeSheet.getCell(0, c).font('normal normal 11px simkai')
      //   activeSheet.getCell(1, c).font('normal normal 18px simkai')
      //   activeSheet.getCell(2, c).font('normal normal 18px simkai')
      // }
      // designer.wrapper.spread.resumePaint() // 遍历修改完字体后刷新表单
      if (userData.notable) {
        if (modleState === '0002') {
          if (!designer.wrapper.spread.getSheetFromName('hideSheet')) {
            const newSheetIndex = designer.wrapper.spread.getSheetCount()
            var newsheet = new GC.Spread.Sheets.Worksheet('hideSheet')
            designer.wrapper.spread.addSheet(newSheetIndex, newsheet)
            designer.wrapper.spread.getSheetFromName('hideSheet').visible(false)
          }
          console.log('111111111111', designer.wrapper.spread.getSheetCount())
          updateRowCol()
        }
      }
      var jsonStr = designer.wrapper.spread.toJSON('{}')
      // 模板名称
      var modleName = ''
      for (var keyss in jsonStr.sheets) {
        if (jsonStr.sheets[keyss].index == 0) {
          modleName = keyss
        }
      }
      var url_modle = api() + 'template/saveTemplate'
      // 导航切换修改（从导航进入新建时userData从session中读取）
      if ((window.location.href).indexOf('templateClassId') === -1) {
        userData = get_query(window.sessionStorage.getItem('href'))
      }
      var data_modle = {
        templateId: userData.page == 2 ? userData.templateId : '',
        templateVersionId: userData.page == 2 ? userData.templateVersionId : '',
        templateName: modleName,
        categoryId: userData.templateClassId,
        templateScript: JSON.stringify(jsonStr),
        templateState: modleState
      }
      userData.overtime = window.sessionStorage.getItem('overtime')
      $.ajax({
        type: 'POST',
        url: url_modle,
        data: JSON.stringify(data_modle),
        dataType: 'json',
        crossDomain: true,
        contentType: 'application/json; charset=utf-8',
        headers: { 'ticket': userData.ticket, 'overtime': userData.overtime, 'Content-Type': 'application/json; charset=UTF-8' },
        // jsonpCallback: 'jsonpProcess', // jsonpProcess自定义函数名
        success: function(data, status, xhr) {
          console.log(data)
          var overtimeIframe = { overtime: xhr.getResponseHeader('overtime') }
          userData.overtime = overtimeIframe.overtime
          window.parent.postMessage(overtimeIframe, '*')
          if (data.resultData) {
            alert(data.resultData.data)
            if (modleState === '0001' && userData.page == 1) {
              // 第一次保存
              var refrushModle = window.location.href + '&templateVersionId=' + data.resultData.templateVersionId + '&templateId=' + data.resultData.templateId
              var refrushModles = refrushModle.replace('page=1', 'page=2')
              userData = get_query(refrushModles)
            } else if (modleState === '0002') {
              var getparent = 'http://dbs.haier.net/#/'
              if (userData.getparent == 2) {
                getparent = 'http://localhost:9528/#/'
              } else if (userData.getparent == 3) {
                getparent = 'http://47.104.98.71:18780/CBFX/index.html#/'
              } else if (userData.getparent == 4) {
                getparent = 'http://47.104.98.71/CBFX/index.html#/'
              } else if (userData.getparent == 5) {
                getparent = 'http://dev.fineway.com:18780/CBFX/index.html#/'
              }
              window.parent.location.href = getparent + 'modle/edit/editcon'
            }
          } else {
            alert(data.errorMsg)
          }
        },
        error: function(err) {
          console.log(err)
        }
      })
    }
    // 替换弹窗中的插入
    function customInsertMenu() {
      var MenuData = spread2.contextMenu.menuData
      var newMenuData = []
      MenuData.forEach(function(item) {
        if (item) {
          // 若是左侧插入则移除
          if (item.name === 'gc.spread.insertRows' && item.workArea === 'rowHeader') {
            return
          }
          newMenuData.push(item)
        }
      })
      spread2.contextMenu.menuData = newMenuData

      // 注册插入
      spread2.commandManager().register('insertRowsBehind',
        {
          canUndo: true,
          execute: function(context, options, isUndo) {
            var Commands = GC.Spread.Sheets.Commands
            // 在此加cmd
            options.cmd = 'insertRowsBehind'
            if (isUndo) {
              Commands.undoTransaction(context, options)
              return true
            } else {
              Commands.startTransaction(context, options)
              var sheet = spread2.getActiveSheet()
              var sels = sheet.getSelections()
              if (sels && sels.length > 0) {
                spread2.suspendPaint() // 停止表单重绘
                for (var i = 0; i < sels.length; i++) {
                  var sel = sels[i]
                  var row = sel.row
                  var rowCount = sel.rowCount
                  sheet.addRows(row + 1, rowCount)
                  // 复制上一行行高
                  // sheet.setRowHeight(row + 1, sheet.getRowHeight(row))
                  for (let g = 1; g <= rowCount; g++) {
                    // 复制区域左上起始Y, 复制区域左上起始X, 黏贴区域左上起始Y, 黏贴区域左上起始X, 要复制的行数, 要复制的列数 复制参数.all全复制(查看复制内容console.log(GC.Spread.Sheets.CopyToOptions))
                    sheet.copyTo(row, 0, row + g, 0, 1, sel.colCount, GC.Spread.Sheets.CopyToOptions.all)
                    // 行高问题
                    sheet.setRowHeight(row + g, sheet.getRowHeight(row))
                    for (let j = 0; j < sel.colCount; j++) {
                      sheet.setValue(row + g, j, null)
                      if (sheet.getFormula(row + g, j)) {
                        spread2.getSheet(0).getCell(row + g, j).locked(true)
                      } else {
                        spread2.getSheet(0).getCell(row + g, j).locked(false)
                      }
                      // console.log(sheet.getFormula(row + 1, j))
                    }
                  }
                }
                spread2.resumePaint()
              }
              Commands.endTransaction(context, options)
              return true
            }
          }
        })

      // 获取右键菜单数组
      var menuData = spread2.contextMenu.menuData
      // 定义一个在行头区域执行的右键菜单项
      var insertRowsBehind = {
        // 点击此菜单项后执行的命令操作
        command: 'insertRowsBehind',
        // 菜单项显示的文字
        text: '插入',
        // name只要不重复即可（菜单项名称）
        name: 'insertRowsBehind',
        // 把自己定义好的icon class加在这里（左侧样式）
        iconClass: 'gc-spread-custom-icon',
        // 加到行头
        workArea: 'rowHeader'
      }
      // 将自定义的项，加入到“插入”放到删除之前
      menuData.forEach(function(item, index) {
        if (item && item.name === 'gc.spread.deleteRows') {
          menuData.splice(index - 1, 0, insertRowsBehind)
        }
      })
    }
    // // 自动换行问题
    // function wordWrap() {
    //   console.log('1111111111111111111111111---------11111111111')
    //   var activeSheet = spread2.getActiveSheet()
    //   activeSheet.bind(GC.Spread.Sheets.Events.EditEnd, function(sender, args) {
    //     console.log('Start cell editing.', sender, args)
    //   })
    // }
    // wordWrap()
    $('.ribbon-bar').gcuiribbon({
      click: function(evt, cmd) {
        var spread = designer.wrapper.spread
        var sheet = spread.getActiveSheet()
        var selectedChart = chartHelper.getSelectedChart(sheet)
        var activeShapes = shapeHelper.getActiveShapes(sheet)
        var selections, selectionType, formatCellDialog, firstSelection
        switch (cmd.name) {
        case 'font-family':
          designer.actions.doAction('setFontFamily', spread, $('#' + cmd.commandName).data('font'))
          break
        case 'font-size':
          designer.actions.doAction('setFontSize', spread, $('#' + cmd.commandName).text() + 'pt')
        }

        switch (cmd.commandName) {
        // 预览弹窗
        case 'preview':
          // 获取当前表的json
          document.body.parentNode.style.overflow = 'auto' // 浏览器出现滚动条
          var jsonStrCur = designer.wrapper.spread.toJSON('{}')
          // $( "#dialog" ).draggable( "disable" );
          // $( "#dialog" ).resizable({ disabled: true });
          $('#dialog').dialog({
            width: winWidth - 20,
            height: winHeight - 20,
            draggable: false, // 禁止拖拽
            resizable: false, // 禁止调整大小
            beforeClose: function() { // 弹窗关闭前的事件
              var jsonStr = JSON.stringify(spread2.toJSON())
              // console.log(jsonStr, '预览表json');
              targetButton.text("开启校验")
              spread2.options.highlightInvalidData = false
              targetButton.click(() => {
                if (targetButton.text() === '开启校验') {
                  targetButton.text("关闭校验")
                  spread2.options.highlightInvalidData = true
                } else {
                  targetButton.text("开启校验")
                  spread2.options.highlightInvalidData = false
                }
              });
            }
          })
          // console.log(JSON.stringify(jsonStrCur), '当前表json')
          // 把当前表的json渲染到预览表
          spread2.fromJSON(jsonStrCur)
          // 预览的开启/关闭校验的功能
          const targetButton = $('.openCheck')
          targetButton.click(() => {
            if (targetButton.text() === '开启校验') {
              targetButton.text("关闭校验")
              spread2.options.highlightInvalidData = true
            } else {
              targetButton.text("开启校验")
              spread2.options.highlightInvalidData = false
            }
          });
          // console.log(spread, '原表') // 这是原表
          // console.log(spread2, '预览表') // 这是预览表
          break
        case 'saveTheModle':
          saveOrSubmit('0001')
          break
        case 'submitTheModle':
          saveOrSubmit('0002')
          break
        case 'copy':
          if (designer.util.isSlicerSelected(sheet)) {
            designer.actions.doAction('floatingObjectCopy', spread)
          } else {
            designer.actions.doAction('copy', spread)
          }
          break
        case 'cut':
          if (designer.util.isSlicerSelected(sheet)) {
            designer.actions.doAction('floatingObjectCut', spread)
          } else {
            designer.actions.doAction('cut', spread)
          }
          break
        case 'paste-all':
          designer.actions.doAction('paste', spread, 0 /* All */)
          break
        case 'paste-formulas':
          designer.actions.doAction('paste', designer.wrapper.spread, 3 /* Formulas */)
          break
        case 'paste-values':
          designer.actions.doAction('paste', designer.wrapper.spread, 1 /* Values */)
          break
        case 'paste-formatting':
          designer.actions.doAction('paste', designer.wrapper.spread, 2 /* Formatting */)
          break
        case 'font-weight':
          designer.actions.doAction('setFontWeight', spread, $('#' + cmd.commandName).prop('checked') ? 'bold' : 'normal')
          break
        case 'font-italic':
          designer.actions.doAction('setFontStyle', spread, $('#' + cmd.commandName).prop('checked') ? 'italic' : 'normal')
          break
        case 'font-underline':
          designer.actions.doAction('setUnderline', spread, $('#' + cmd.commandName).prop('checked'))
          if ($('#' + cmd.commandName).prop('checked')) {
            $('.ribbon-bar').gcuiribbon('setButtonChecked', 'font-double-underline', false)
          }
          break
        case 'font-double-underline':
          designer.actions.doAction('setDoubleUnderline', spread, $('#' + cmd.commandName).prop('checked'))
          if ($('#' + cmd.commandName).prop('checked')) {
            $('.ribbon-bar').gcuiribbon('setButtonChecked', 'font-underline', false)
          }
          break
        case 'increase-fontsize':
          var increasedSize = increasedFontSize()
          if (increasedSize) {
            designer.actions.doAction('setFontSize', spread, increasedSize + 'pt')
          }
          break
        case 'decrease-fontsize':
          var decreasedSize = decreasedFontSize()
          if (decreasedSize) {
            designer.actions.doAction('setFontSize', spread, decreasedSize + 'pt')
          }
          break
        case 'bottom-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 1 /* thin */),
            options: { bottom: true }
          })
          break
        case 'top-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 1 /* thin */),
            options: { top: true }
          })
          break
        case 'left-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 1 /* thin */),
            options: { left: true }
          })
          break
        case 'right-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 1 /* thin */),
            options: { right: true }
          })
          break
        case 'no-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: null,
            options: { all: true }
          })
          break
        case 'all-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 1 /* thin */),
            options: { all: true }
          })
          break
        case 'outside-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 1 /* thin */),
            options: { outline: true }
          })
          break
        case 'thickbox-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 5 /* thick */),
            options: { outline: true }
          })
          break
        case 'bottom-double-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 6 /* double */),
            options: { bottom: true }
          })
          break
        case 'thick-bottom-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 5 /* thick */),
            options: { bottom: true }
          })
          break
        case 'top-bottom-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 1 /* thin */),
            options: { bottom: true, top: true }
          })
          break
        case 'top-thick-bottom-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 1 /* thin */),
            options: { top: true }
          })
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 5 /* thick */),
            options: { bottom: true }
          })
          break
        case 'top-double-bottom-border':
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 1 /* thin */),
            options: { top: true }
          })
          designer.actions.doAction('setBorder', spread, {
            lineborder: new Sheets.LineBorder('black', 6 /* double */),
            options: { bottom: true }
          })
          break
        case 'more-border':
          formatCellDialog = designer.formatCellDialog
          if (formatCellDialog === undefined) {
            formatCellDialog = new designer.FormatDialog()
            designer.formatCellDialog = formatCellDialog
          }
          formatCellDialog.open('border')
          break
        case 'backcolor':
          if (!backColorPopup) {
            $('#backcolor-picker').colorpicker({
              valueChanged: function(e, value) {
                if (value.name) {
                  designer.actions.doAction('setBackColor', designer.wrapper.spread, value.name)
                } else {
                  designer.actions.doAction('setBackColor', designer.wrapper.spread, value.color)
                }
              },
              choosedColor: function(e, value) {
                backColorPopup.gcuipopup('hide')
              },
              openColorDialog: function() {
                backColorPopup.gcuipopup('hide')
              }
            })
            backColorPopup = $('#backcolor-popup').gcuipopup({
              autoHide: true,
              position: {
                of: $('#backcolor-button'),
                my: 'left top',
                at: 'left bottom'
              },
              showing: function(e, args) {
                $('#backcolor-picker').colorpicker('option', 'themeColors', designer.wrapper.getThemeColors())
              }
            })
          }
          backColorPopup.gcuipopup('show')
          break
        case 'forecolor':
          if (!foreColorPopup) {
            $('#forecolor-picker').colorpicker({
              valueChanged: function(e, value) {
                if (value.name) {
                  designer.actions.doAction('setForeColor', designer.wrapper.spread, value.name)
                } else {
                  designer.actions.doAction('setForeColor', designer.wrapper.spread, value.color)
                }
              },
              choosedColor: function(e, value) {
                foreColorPopup.gcuipopup('hide')
              },
              openColorDialog: function() {
                foreColorPopup.gcuipopup('hide')
              }
            })
            foreColorPopup = $('#forecolor-popup').gcuipopup({
              autoHide: true,
              position: {
                of: $('#forecolor-button'),
                my: 'left top',
                at: 'left bottom'
              },
              showing: function(e, args) {
                $('#forecolor-picker').colorpicker('option', 'themeColors', designer.wrapper.getThemeColors())
              }
            })
          }
          foreColorPopup.gcuipopup('show')
          break
        case 'top-align':
          designer.actions.doAction('setVAlign', spread, 0 /* top */)
          break
        case 'middle-align':
          designer.actions.doAction('setVAlign', spread, 1 /* center */)
          break
        case 'bottom-align':
          designer.actions.doAction('setVAlign', spread, 2 /* bottom */)
          break
        case 'left-align':
          designer.actions.doAction('setHAlign', spread, 0 /* left */)
          break
        case 'center-align':
          designer.actions.doAction('setHAlign', spread, 1 /* center */)
          break
        case 'right-align':
          designer.actions.doAction('setHAlign', spread, 2 /* right */)
          break
        case 'increase-indent':
          designer.actions.doAction('setIndent', spread, 1)
          break
        case 'vertical-text':
          designer.actions.doAction('setTextVertical', spread, $('#vertical-text').prop('checked'))
          break
        case 'decrease-indent':
          designer.actions.doAction('setIndent', spread, -1)
          break
        case 'wrap-text':
          designer.actions.doAction('setWordWrap', spread, $('#wrap-text').prop('checked'))
          break
        case 'merge-center':
          if ($('#merge-center').prop('checked')) {
            designer.actions.doAction('mergeCenter', spread)
          } else {
            designer.actions.doAction('unmergeCells', spread)
          }
          setTimeout(function() {
            updateCellStyle()
          }, 0)
          break
        case 'merge-center-button':
          designer.actions.doAction('mergeCenter', spread)
          break
        case 'merge-across':
          designer.actions.doAction('mergeAcross', spread)
          break
        case 'merge-cells':
          designer.actions.doAction('mergeCells', spread)
          break
        case 'unmerge-cells':
          designer.actions.doAction('unmergeCells', spread)
          break
        case 'format-general':
          designer.actions.doAction('setFormatter', spread, null)
          break
        case 'format-number':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.Number.format)
          break
        case 'format-currency':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.Currency.format)
          break
        case 'format-accouting':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.Accounting.format)
          break
        case 'format-shortdate':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.ShortDate.format)
          break
        case 'format-longdate':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.LongDate.format)
          break
        case 'format-time':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.Time.format)
          break
        case 'format-percentage':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.Percentage.format)
          break
        case 'format-fraction':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.Fraction.format)
          break
        case 'format-scientific':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.Scientific.format)
          break
        case 'format-text':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.Text.format)
          break
        case 'format-comma':
          designer.actions.doAction('setFormatter', spread, designer.res.commonFormats.Comma.format)
          break
        case 'increase-decimal':
          designer.actions.doAction('increaseDecimal', spread)
          break
        case 'decrease-decimal':
          designer.actions.doAction('decreaseDecimal', spread)
          break
        case 'button-celltype':
          if (buttonCellTypeDialog === undefined) {
            buttonCellTypeDialog = new designer.ButtonCellTypeDialog()
          }
          buttonCellTypeDialog.open()
          break
        case 'checkbox-celltype':
          if (checkBoxCellTypeDialog === undefined) {
            checkBoxCellTypeDialog = new designer.CheckBoxCellTypeDialog()
          }
          checkBoxCellTypeDialog.open()
          break
        case 'combobox-celltype':
          if (comboBoxCellTypeDialog === undefined) {
            comboBoxCellTypeDialog = new designer.ComboBoxCellTypeDialog()
          }
          comboBoxCellTypeDialog.open()
          break
        case 'hyperlink-celltype':
          if (hyperLinkCellTypeDialog === undefined) {
            hyperLinkCellTypeDialog = new designer.HyperLinkCellTypeDialog()
          }
          hyperLinkCellTypeDialog.open()
          break
        case 'clear-celltype':
          designer.actions.doAction('clearCellType', spread)
          break
        case 'conditional-format':
          if (!conditionFormatPopup) {
            conditionFormatPopup = $('#condition-format-popup').gcuipopup({
              autoHide: true,
              position: {
                of: $('#condition-format'),
                my: 'left top',
                at: 'left bottom'
              },
              collision: 'fit fit',
              showing: function(e, args) {
                $('#condition-format-popup-menu').removeClass('hidden')
              },
              hiding: function() {
                return closeConditionalFormatMenu()
              }
            })
          }
          conditionFormatPopup.gcuipopup('show')
          break
        case 'insert-cells': {
          selectionType = designer.spreadActions.getSelectionType(spread)
          switch (selectionType) {
          case 0 /* Sheet */
            :
            designer.MessageBox.show(designer.res.insertCellInSheet, designer.res.title, 2 /* warning */)
            break
          case 2 /* OnlyColumn */
            :
            designer.actions.doAction('insertColumns', spread)
            break
          case 1 /* OnlyRow */
            :
            designer.actions.doAction('insertRows', spread)
            break
          case 4 /* Mixture */
            :
            designer.MessageBox.show(designer.res.insertCellInMixtureRange, designer.res.title, 2 /* warning */)
            break
          case 3 /* OnlyCells */
            :
            if (insertCellsDialog === undefined) {
              insertCellsDialog = new designer.InsertCellsDialog()
            }
            insertCellsDialog.open()
            break
          default:
            break
          }
        }
          break
        case 'insert-rows':
          designer.actions.doAction('insertRows', spread)
          break
        case 'insert-columns':
          designer.actions.doAction('insertColumns', spread)
          break
        case 'insert-sheet':
          designer.actions.doAction('insertSheet', spread)
          break
        case 'delete-cells': {
          selectionType = designer.spreadActions.getSelectionType(spread)
          switch (selectionType) {
          case 0 /* Sheet */
            :
            designer.actions.doAction('clearSheetAllCell', spread)
            break
          case 2 /* OnlyColumn */
            :
            designer.actions.doAction('deleteColumns', spread)
            break
          case 1 /* OnlyRow */
            :
            designer.actions.doAction('deleteRows', spread)
            break
          case 4 /* Mixture */
            :
            designer.MessageBox.show(designer.res.insertCellInMixtureRange, designer.res.title, 2 /* warning */)
            break
          case 3 /* OnlyCells */
            :
            if (deleteCellsDialog === undefined) {
              deleteCellsDialog = new designer.DeleteCellsDialog()
            }
            deleteCellsDialog.open()
            break
          default:
            break
          }
        }
          break
        case 'delete-rows':
          designer.actions.doAction('deleteRows', spread)
          break
        case 'delete-columns':
          designer.actions.doAction('deleteColumns', spread)
          break
        case 'delete-sheet':
          designer.actions.doAction('deleteSheet', spread)
          break
        case 'set-rowheight':
          if (setRowHeightDialog === undefined) {
            setRowHeightDialog = new designer.RowHeightDialog()
          }
          setRowHeightDialog.open()

          break
        case 'set-columnwidth':
          if (setColumnWidthDialog === undefined) {
            setColumnWidthDialog = new designer.ColumnWidthDialog()
          }
          setColumnWidthDialog.open()

          break
        case 'autofit-rowheight':
          designer.actions.doAction('autofitRows', spread)
          break
        case 'default-rowheight':
          if (setStandardRowHeightDialog === undefined) {
            setStandardRowHeightDialog = new designer.StandardRowHeightDialog()
          }
          setStandardRowHeightDialog.open()
          break
        case 'hide-rows':
          designer.actions.doAction('hideRows', spread)
          break
        case 'unhide-rows':
          designer.actions.doAction('unHideRows', spread)
          break
        case 'autofit-columnwidth':
          designer.actions.doAction('autofitColumns', spread)
          break
        case 'default-columnwidth':
          if (setStandardColumnWidthDialog === undefined) {
            setStandardColumnWidthDialog = new designer.StandardColumnWidthDialog()
          }
          setStandardColumnWidthDialog.open()
          break
        case 'hide-columns':
          designer.actions.doAction('hideColumns', spread)
          break
        case 'unhide-columns':
          designer.actions.doAction('unHideColumns', spread)
          break
        case 'protect-sheet':
          if (!protectionOptionDialog) {
            protectionOptionDialog = new designer.ProtectionOptionDialog()
          }
          protectionOptionDialog.open()
          break
        case 'unprotect-sheet':
          designer.actions.doAction('protectSheet', spread, false)
          break
        case 'lock-cells':
          designer.actions.doAction('LockCells', spread, true)
          break
        case 'unlock-cells':
          designer.actions.doAction('LockCells', spread, false)
          break
        case 'auto-sum':
          designer.actions.doAction('setAutoFormula', spread, 'Sum')
          break
        case 'auto-average':
          designer.actions.doAction('setAutoFormula', spread, 'Average')
          break
        case 'auto-count':
          designer.actions.doAction('setAutoFormula', spread, 'Count')
          break
        case 'auto-max':
          designer.actions.doAction('setAutoFormula', spread, 'Max')
          break
        case 'auto-min':
          designer.actions.doAction('setAutoFormula', spread, 'Min')
          break
        case 'fill-down':
          designer.actions.doAction('autoFillByDirection', spread, 3 /* Down */)
          break
        case 'fill-right':
          designer.actions.doAction('autoFillByDirection', spread, 1 /* Right */)
          break
        case 'fill-up':
          designer.actions.doAction('autoFillByDirection', spread, 2 /* Up */)
          break
        case 'fill-left':
          designer.actions.doAction('autoFillByDirection', spread, 0 /* Left */)
          break
        case 'fill-series':
          if (!fillDialog) {
            fillDialog = new designer.FillDialog()
          }
          fillDialog.open()
          break
        case 'clear-all':
          designer.actions.doAction('clearAll', spread)
          break
        case 'clear-format':
          designer.actions.doAction('clearFormat', spread)
          break
        case 'clear-content':
          designer.actions.doAction('clearContent', spread)
          break
        case 'clear-comments':
          designer.actions.doAction('clearComments', spread)
          break
        case 'sort-AZ':
          if (designer.util.isSlicerSelected(sheet)) {
            designer.actions.doAction('sortSlicerItems', spread, 1 /* Ascending */)
          } else {
            designer.actions.doAction('sortRange', spread, true)
          }
          break
        case 'sort-ZA':
          if (designer.util.isSlicerSelected(sheet)) {
            designer.actions.doAction('sortSlicerItems', spread, 2 /* Descending */)
          } else {
            designer.actions.doAction('sortRange', spread, false)
          }
          break
        case 'custom-sort':
          if (!sortDialog) {
            sortDialog = new designer.SortDialog()
          }
          sortDialog.open()
          break
        case 'set-filter':
          designer.actions.doAction('setRowFilter', spread, true)
          break
        case 'clear-filter':
          designer.actions.doAction('clearRowFilter', spread)
          break
        case 'reapply-filter':
          designer.actions.doAction('reApplyRowFilter', spread)
          break
        case 'insert-function':
          if (!insertFunctionDialog) {
            insertFunctionDialog = new designer.InsertFunctionDialog()
          }
          insertFunctionDialog.open()
          break
        case 'calculate-auto':
          designer.actions.doAction('autoCalculate', spread, true)
          break
        case 'calculate-manual':
          designer.actions.doAction('autoCalculate', spread, false)
          break
        case 'calculate-now':
          designer.actions.doAction('calculateNow', spread)
          break
        case 'group':
          selections = sheet.getSelections()
          if (selections.length > 1) {
            designer.MessageBox.show(designer.res.NotExecInMultiRanges, designer.res.title, 2 /* warning */)
            return
          }
          selectionType = designer.spreadActions.getSelectionType(spread)
          if (selectionType === 1 /* OnlyRow */) {
            designer.actions.doAction('groupRows', designer.wrapper.spread)
            break
          } else if (selectionType === 2 /* OnlyColumn */) {
            designer.actions.doAction('groupColumns', designer.wrapper.spread)
            break
          } else {
            if (groupDialog === undefined) {
              groupDialog = new designer.GroupDialog()
            }
            groupDialog.open()
            break
          }
        case 'ungroup':
          selections = sheet.getSelections()
          if (selections.length > 1) {
            designer.MessageBox.show(designer.res.NotExecInMultiRanges, designer.res.title, 2 /* warning */)
            return
          }
          selectionType = designer.spreadActions.getSelectionType(spread)
          if (selectionType === 1 /* OnlyRow */) {
            designer.actions.doAction('ungroupRows', designer.wrapper.spread)
            break
          } else if (selectionType === 2 /* OnlyColumn */) {
            designer.actions.doAction('ungroupColumns', designer.wrapper.spread)
            break
          } else {
            if (ungroupDialog === undefined) {
              ungroupDialog = new designer.UnGroupDialog()
            }
            ungroupDialog.open()
          }
          break
        case 'template-design-mode':
          var activeSheet = spread.getActiveSheet()
          var designMode = $('#template-design-mode')
          var designModeText = designMode.find('span.ui-button-text')
          var checkedStatus = designMode.data('checked')
          // console.log(designMode, checkedStatus)
          checkedStatus = !checkedStatus
          if (checkedStatus) {
            // replace celltype paint
            _replacePaint()
            designModeText.addClass('template-design-mode-checked')

            initDesignModeSliderPanel()
            var sliderPanel = $('.slider-panel')
            sliderPanel.sliderpanel('open', 'panel1')
          } else {
            // removeFieldEle()
            exitTemplateDesignMode()
          }
          designMode.data('checked', checkedStatus)
          activeSheet.repaint()
          break
        case 'clearBindingPath':
          _clearSelectionBindingPath()
          break
        case 'loadSchema':
          _loadDataSource()
          break
        case 'saveSchema':
          _saveDataSource()
          break
        case 'show-detail':
          designer.actions.doAction('expandGroup', spread)
          break
        case 'hide-detail':
          designer.actions.doAction('collapseGroup', spread)
          break
        case 'group-direction':
          if (!groupDirectionDialog) {
            groupDirectionDialog = new designer.GroupDirectionDialog()
          }
          groupDirectionDialog.open()
          break
        case 'showhide-rowheader':
          toggleCheckBoxIcon('showhide-rowheader')
          designer.actions.doAction('showHideRowHeader', spread)
          break
        case 'showhide-columnheader':
          toggleCheckBoxIcon('showhide-columnheader')
          designer.actions.doAction('showHideColumnHeader', spread)
          break
        case 'showhide-vgridline':
          toggleCheckBoxIcon('showhide-vgridline')
          designer.actions.doAction('showHideVGridLine', spread)
          break
        case 'showhide-hgridline':
          toggleCheckBoxIcon('showhide-hgridline')
          designer.actions.doAction('showHideHGridLine', spread)
          break
        case 'showhide-tabstrip':
          toggleCheckBoxIcon('showhide-tabstrip')
          designer.actions.doAction('showHideTabStrip', spread)
          break
        case 'showhide-newtab':
          toggleCheckBoxIcon('showhide-newtab')
          designer.actions.doAction('showHideNewTab', spread)
          break
        case 'zoom':
          if (!setZoomDialog) {
            setZoomDialog = new designer.ZoomDialog()
          }
          setZoomDialog.open()
          break
        case 'zoom-default':
          designer.actions.doAction('zoomDefault', spread)
          break
        case 'zoom-selection':
          designer.actions.doAction('zoomSelection', spread)
          setTimeout(function() {
            updateZoomToStatusBar()
          }, 0)
          break
        case 'freeze-panes':
          designer.actions.doAction('freeze', spread, {
            row: spread.getActiveSheet().getActiveRowIndex(),
            col: spread.getActiveSheet().getActiveColumnIndex()
          })
          break
        case 'freeze-toprow':
          designer.actions.doAction('freeze', spread, {
            row: 1,
            col: 0,
            trailingRow: 0,
            trailingCol: 0
          })
          break
        case 'freeze-firstcolumn':
          designer.actions.doAction('freeze', spread, {
            row: 0,
            col: 1,
            trailingRow: 0,
            trailingCol: 0
          })
          break
        case 'freeze-bottomrow':
          designer.actions.doAction('freeze', spread, {
            row: 0,
            col: 0,
            trailingRow: 1,
            trailingCol: 0
          })
          break
        case 'freeze-lastcolumn':
          designer.actions.doAction('freeze', spread, {
            row: 0,
            col: 0,
            trailingRow: 0,
            trailingCol: 1
          })
          break
        case 'unfreeze-panes':
          designer.actions.doAction('unfreeze', spread)
          break
        case 'fontgroup':
          formatCellDialog = designer.formatCellDialog
          if (formatCellDialog === undefined) {
            formatCellDialog = new designer.FormatDialog()
            designer.formatCellDialog = formatCellDialog
          }
          formatCellDialog.open('font')
          break
        case 'aligngroup':
          formatCellDialog = designer.formatCellDialog
          if (formatCellDialog === undefined) {
            formatCellDialog = new designer.FormatDialog()
            designer.formatCellDialog = formatCellDialog
          }
          formatCellDialog.open('alignment')
          break
        case 'format-more':
        case 'numbergroup':
          formatCellDialog = designer.formatCellDialog
          if (formatCellDialog === undefined) {
            formatCellDialog = new designer.FormatDialog()
            designer.formatCellDialog = formatCellDialog
          }
          formatCellDialog.open('number')
          break
        case 'find':
          if (findDialog === undefined) {
            findDialog = new designer.FindDialog()
          }
          findDialog.open()
          break
        case 'goto':
          if (gotoDialog === undefined) {
            gotoDialog = new designer.GoToDialog()
          }
          gotoDialog.open()
          break
        case 'spark-line':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(0 /* line */)
          break
        case 'spark-column':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(1 /* column */)
          break
        case 'spark-winloss':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(2 /* winloss */)
          break
        case 'spark-pie':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(0 /* pie */, true)
          break
        case 'spark-area':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(1 /* area */, true)
          break
        case 'spark-scatter':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(2 /* scatter */, true)
          break
        case 'spark-bullet':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!bulletSparklineDialog) {
            bulletSparklineDialog = new designer.BulletSparklineDialog()
          }
          bulletSparklineDialog.open()
          break
        case 'spark-spread':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(5 /* spread */, true)
          break
        case 'spark-stacked':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(6 /* stacked */, true)
          break
        case 'spark-hbar':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!hbarSparklineDialog) {
            hbarSparklineDialog = new designer.HbarSparklineDialog()
          }
          hbarSparklineDialog.open()
          break
        case 'spark-vbar':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!vbarSparklineDialog) {
            vbarSparklineDialog = new designer.VbarSparklineDialog()
          }
          vbarSparklineDialog.open()
          break
        case 'spark-variance':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!variSparklineDialog) {
            variSparklineDialog = new designer.VariSparklineDialog()
          }
          variSparklineDialog.open()
          break
        case 'spark-boxplot':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(10 /* boxplot */, true)
          break
        case 'spark-cascade':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(11 /* cascade */, true)
          break
        case 'spark-pareto':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!insertSparklineDialog) {
            insertSparklineDialog = new designer.InsertSparkLineDialog()
          }
          insertSparklineDialog.open(12 /* pareto */, true)
          break
        case 'spark-month':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!monthSparklineDialog) {
            monthSparklineDialog = new designer.CalendarSparklineDialog(0)
          }
          monthSparklineDialog.open()
          break
        case 'spark-year':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!yearSparklineDialog) {
            yearSparklineDialog = new designer.CalendarSparklineDialog(1)
          }
          yearSparklineDialog.open()
          break
        case 'name-manager':
          if (!nameManagerDialog) {
            nameManagerDialog = new designer.NameManagerDialog()
          }
          nameManagerDialog.open()
          break
        case 'spread-setting-general':
          if (!spreadSettingDialog) {
            spreadSettingDialog = new designer.SpreadSettingDialog()
          }
          spreadSettingDialog.open('general')
          break
        case 'spread-setting-scrollbar':
          if (!spreadSettingDialog) {
            spreadSettingDialog = new designer.SpreadSettingDialog()
          }
          spreadSettingDialog.open('scrollbar')
          break
        case 'spread-setting-tabstrip':
          if (!spreadSettingDialog) {
            spreadSettingDialog = new designer.SpreadSettingDialog()
          }
          spreadSettingDialog.open('tabstrip')
          break
        case 'sheet-setting-general':
          if (!sheetSettingDialog) {
            sheetSettingDialog = new designer.SheetSettingDialog()
          }
          sheetSettingDialog.open('general')
          break
        case 'sheet-setting-gridline':
          if (!sheetSettingDialog) {
            sheetSettingDialog = new designer.SheetSettingDialog()
          }
          sheetSettingDialog.open('gridline')
          break
        case 'sheet-setting-calculation':
          if (!sheetSettingDialog) {
            sheetSettingDialog = new designer.SheetSettingDialog()
          }
          sheetSettingDialog.open('calculation')
          break
        case 'sheet-setting-headers':
          if (!sheetSettingDialog) {
            sheetSettingDialog = new designer.SheetSettingDialog()
          }
          sheetSettingDialog.open('headers')
          break
        case 'data-validation':
          if (!dataValidationDialog) {
            dataValidationDialog = new designer.DataValidationDialog()
          }
          dataValidationDialog.open()
          break
        case 'circle-invalid':
          designer.actions.doAction('circleInvalidData', spread)
          break
        case 'clear-circle':
          designer.actions.doAction('unCircleInvalidData', spread)
          break
        case 'insert-table':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!createTableDialog) {
            createTableDialog = new designer.CreateTableDialog()
          }
          createTableDialog.open()
          break
        case 'insert-chart':
          if (!designer.ribbon.selectChartDialog) {
            designer.ribbon.selectChartDialog = new designer.SelectChartDialog()
          }
          var dataRange = sheet.getSelections()[0]
          if (!dataRange || (dataRange.rowCount === 1 && dataRange.colCount === 1 &&
                            designer.wrapper.spread.getActiveSheet().getValue(dataRange.row, dataRange.col) === null)) {
            designer.MessageBox.show(designer.res.selectChartDialog.errorPrompt.emptyDataErrorMsg, designer.res.title, 2 /* warning*/)
            return
          }
          designer.ribbon.selectChartDialog.open(designer.SelectChartDialog.dialogType.insertChart)
          break
        case 'insert-barcode':
          firstSelection = designer.wrapper.spread.getActiveSheet().getSelections()[0]
          if (!firstSelection) {
            designer.MessageBox.show(designer.res.selectionError.selectEmptyArea, designer.res.title, 2 /* warning*/)
            return
          }
          if (!barcodeDialog) {
            barcodeDialog = new designer.CreateBarcodeDialog()
          }
          barcodeDialog.open()
          break
        case 'insert-shapes':
          if (!insertShapesPopup) {
            insertShapesPopup = $('#ribbon-shape-insert-list-popup').gcuipopup({
              autoHide: true,
              position: {
                of: $('#insert-Shapes'),
                my: 'left top',
                at: 'left bottom'
              }
            })
            var insertShapesContainer = $('.shape-insert-list-container')
            insertShapePopup = new InsertShapePopup(insertShapesContainer, 'insert', function() { // NOSONAR
              insertShapesPopup.gcuipopup('hide')
            })
          }
          insertShapesPopup.gcuipopup('show')
          break
        case 'insert-picture':
          var dialogInfo = {
            title: designer.res.insertPictureDialogTitle,
            action: 'insertPicture',
            filters: 'image/*',
            nameFilters: [
              designer.res.pictureFormatFilter.png,
              designer.res.pictureFormatFilter.jpeg,
              designer.res.pictureFormatFilter.bmp,
              designer.res.pictureFormatFilter.allFiles
            ]
          }
          var loadPictureCallBack = function(result) {
            if (result.status === 'cancelled') {
              return
            }
            designer.actions.doAction('insertPicture', spread, result.data)
          }
          app.showOpenDialog(dialogInfo, loadPictureCallBack)
          break
        case 'sparkline-type-line':
          designer.actions.doAction('setSparklineType', spread, 0 /* line */)
          break
        case 'sparkline-type-column':
          designer.actions.doAction('setSparklineType', spread, 1 /* column */)
          break
        case 'sparkline-type-winloss':
          designer.actions.doAction('setSparklineType', spread, 2 /* winloss */)
          break
        case 'sparkline-high-point':
          toggleCheckBoxIcon('sparkline-high-point')
          designer.actions.doAction('setSparklineSetting', spread, [getCheckBoxIconStatus('sparkline-high-point'), 'showHigh'])
          break
        case 'sparkline-low-point':
          toggleCheckBoxIcon('sparkline-low-point')
          designer.actions.doAction('setSparklineSetting', spread, [getCheckBoxIconStatus('sparkline-low-point'), 'showLow'])
          break
        case 'sparkline-first-point':
          toggleCheckBoxIcon('sparkline-first-point')
          designer.actions.doAction('setSparklineSetting', spread, [getCheckBoxIconStatus('sparkline-first-point'), 'showFirst'])
          break
        case 'sparkline-last-point':
          toggleCheckBoxIcon('sparkline-last-point')
          designer.actions.doAction('setSparklineSetting', spread, [getCheckBoxIconStatus('sparkline-last-point'), 'showLast'])
          break
        case 'sparkline-negative-point':
          toggleCheckBoxIcon('sparkline-negative-point')
          designer.actions.doAction('setSparklineSetting', spread, [getCheckBoxIconStatus('sparkline-negative-point'), 'showNegative'])
          break
        case 'sparkline-marker-point':
          toggleCheckBoxIcon('sparkline-marker-point')
          designer.actions.doAction('setSparklineSetting', spread, [getCheckBoxIconStatus('sparkline-marker-point'), 'showMarkers'])
          break
        case 'sparkline-group':
          designer.actions.doAction('groupSparkline', spread)
          break
        case 'sparkline-ungroup':
          designer.actions.doAction('unGroupSparkline', spread)
          break
        case 'sparkline-clear':
          designer.actions.doAction('clearSparkline', spread)
          break
        case 'sparkline-clear-group':
          designer.actions.doAction('clearSparklineGroup', spread)
          break
        case 'sparkline-color':
          if (!sparklineColorPopup) {
            $('#sparklinecolor-picker').colorpicker({
              valueChanged: function(e, value) {
                if (value.name) {
                  designer.actions.doAction('setSparklineSetting', designer.wrapper.spread, [value.name, 'seriesColor'])
                } else {
                  designer.actions.doAction('setSparklineSetting', designer.wrapper.spread, [value.color, 'seriesColor'])
                }
              },
              choosedColor: function(e, value) {
                sparklineColorPopup.gcuipopup('hide')
              },
              openColorDialog: function() {
                sparklineColorPopup.gcuipopup('hide')
              }
            })
            sparklineColorPopup = $('#sparklinecolor-popup').gcuipopup({
              autoHide: true,
              position: {
                of: $('#sparkline-color'),
                my: 'left top',
                at: 'left bottom'
              },
              showing: function(e, args) {
                $('#sparklinecolor-picker').colorpicker('option', 'themeColors', designer.wrapper.getThemeColors())
              }
            })
          }
          sparklineColorPopup.gcuipopup('show')
          break
        case 'sparkline-marker-color':
          if (!sparklineMarkerColorDialog) {
            sparklineMarkerColorDialog = new designer.SparklineMarkerColorDialog()
          }
          sparklineMarkerColorDialog.open()
          break
        case 'sparkline-weight-dot25':
          designer.actions.doAction('setSparklineSetting', spread, [0.25, 'lineWeight'])
          break
        case 'sparkline-weight-dot5':
          designer.actions.doAction('setSparklineSetting', spread, [0.5, 'lineWeight'])
          break
        case 'sparkline-weight-dot75':
          designer.actions.doAction('setSparklineSetting', spread, [0.75, 'lineWeight'])
          break
        case 'sparkline-weight-1':
          designer.actions.doAction('setSparklineSetting', spread, [1, 'lineWeight'])
          break
        case 'sparkline-weight-1dot5':
          designer.actions.doAction('setSparklineSetting', spread, [1.5, 'lineWeight'])
          break
        case 'sparkline-weight-2dot25':
          designer.actions.doAction('setSparklineSetting', spread, [2.25, 'lineWeight'])
          break
        case 'sparkline-weight-3':
          designer.actions.doAction('setSparklineSetting', spread, [3, 'lineWeight'])
          break
        case 'sparkline-weight-4dot5':
          designer.actions.doAction('setSparklineSetting', spread, [4.5, 'lineWeight'])
          break
        case 'sparkline-weight-6':
          designer.actions.doAction('setSparklineSetting', spread, [6, 'lineWeight'])
          break
        case 'sparkline-weight-custom':
          if (!sparklineWeightDialog) {
            sparklineWeightDialog = new designer.SparklineWeightDialog()
          }
          sparklineWeightDialog.open()
          break
        case 'resize-table':
          if (!resizeTableDialog) {
            resizeTableDialog = new designer.ResizeTableDialog()
          }
          resizeTableDialog.open()
          break
        case 'table-header-row':
          toggleCheckBoxIcon('table-header-row')
          designer.actions.doAction('setTableHeaderRow', spread, getCheckBoxIconStatus('table-header-row'))
          break
        case 'table-total-row':
          toggleCheckBoxIcon('table-total-row')
          designer.actions.doAction('setTableTotalRow', spread, getCheckBoxIconStatus('table-total-row'))
          break
        case 'table-banded-rows':
          toggleCheckBoxIcon('table-banded-rows')
          designer.actions.doAction('setTableBandedRows', spread, getCheckBoxIconStatus('table-banded-rows'))
          break
        case 'table-first-column':
          toggleCheckBoxIcon('table-first-column')
          designer.actions.doAction('setTableFirstColumn', spread, getCheckBoxIconStatus('table-first-column'))
          break
        case 'table-last-column':
          toggleCheckBoxIcon('table-last-column')
          designer.actions.doAction('setTableLastColumn', spread, getCheckBoxIconStatus('table-last-column'))
          break
        case 'table-banded-columns':
          toggleCheckBoxIcon('table-banded-columns')
          designer.actions.doAction('setTableBandedColumns', spread, getCheckBoxIconStatus('table-banded-columns'))
          break
        case 'table-filter-button':
          toggleCheckBoxIcon('table-filter-button')
          designer.actions.doAction('setTableFilterButton', spread, getCheckBoxIconStatus('table-filter-button'))
          break
        case 'table-styles':
          if (!formatTablePopup) {
            _initTableFormat()
            formatTablePopup = $('#format-table-popup').gcuipopup({
              autoHide: true,
              showing: function(e, args) {
                $('#format-table-popup span.container-span').removeClass('table-format-item-selected')
                if (_selectedTableStyleName) {
                  $('#format-table-popup span.table-format-preview.' + _selectedTableStyleName).parent().addClass('table-format-item-selected')
                }
                adjustFormatTablePopup()
                $('#format-table-popup').removeClass('hidden')
              }
            })
          }
          _showCustomIcon()
          formatTablePopup.gcuipopup({
            position: {
              of: $('#table-styles-button'),
              my: 'left top',
              at: 'right top'
            }
          })
          formatTablePopup.gcuipopup('show')
          break
        case 'format-table':
          if (!formatTablePopup) {
            _initTableFormat()
            formatTablePopup = $('#format-table-popup').gcuipopup({
              autoHide: true,
              position: {
                of: $('#format-table-button'),
                my: 'left top',
                at: 'left bottom'
              },
              showing: function(e, args) {
                adjustFormatTablePopup()
              }
            })
          }
          _showCustomIcon()

          formatTablePopup.gcuipopup({
            position: {
              of: $('#format-table-button'),
              my: 'left top',
              at: 'left bottom'
            }
          })
          formatTablePopup.gcuipopup('show')
          break
        case 'cell-styles':
          if (!cellStylesPopup) {
            cellStylesPopup = $('#cell-styles-popup').gcuipopup({
              autoHide: true,
              position: {
                of: $('#cell-styles-button'),
                my: 'left top',
                at: 'left bottom'
              },
              showing: function(e, args) {
                $('#cell-styles-popup').removeClass('hidden')
              }
            })
          }
          _createCustomCellStyle()
          cellStylesPopup.gcuipopup('show')
          break
        case 'formulaSparkline-setting':
          var row = sheet.getActiveRowIndex()
          var col = sheet.getActiveColumnIndex()
          var expr = designer.util.parseFormulaSparkline(row, col)
          var functionName = expr.functionName
          var barcodeFunctionName = ['BC_QRCODE', 'BC_EAN13', 'BC_EAN8', 'BC_CODABAR', 'BC_CODE39', 'BC_CODE93', 'BC_CODE128', 'BC_GS1_128', 'BC_CODE49', 'BC_PDF417', 'BC_DATAMATRIX']
          if (!expr) {
            break
          }
          for (var s = 0; s < barcodeFunctionName.length; s++) {
            if (functionName === barcodeFunctionName[s]) {
              if (!barcodeDialog) {
                barcodeDialog = new designer.CreateBarcodeDialog()
              }
              barcodeDialog.open(true)
              break
            }
          }
          var formulaSparkline = designer.wrapper.spread.getSparklineEx(expr.functionName)
          var option = { row: row, col: col }
          if (formulaSparkline) {
            if (formulaSparkline instanceof Sheets.Sparklines.PieSparkline) {
              if (!psDialog) {
                psDialog = new designer.PieSparklineDialog()
              }
              psDialog.open(option)
            } else if (formulaSparkline instanceof Sheets.Sparklines.AreaSparkline) {
              if (!asDialog) {
                asDialog = new designer.AreaSparklineDialog()
              }
              asDialog.open(option)
            } else if (formulaSparkline instanceof Sheets.Sparklines.ScatterSparkline) {
              if (!ssDialog) {
                ssDialog = new designer.ScatterSparklineDialog()
              }
              ssDialog.open(option)
            } else if ((formulaSparkline instanceof Sheets.Sparklines.LineSparkline) ||
                                (formulaSparkline instanceof Sheets.Sparklines.ColumnSparkline) ||
                                (formulaSparkline instanceof Sheets.Sparklines.WinlossSparkline)) {
              if (!csDialog) {
                csDialog = new designer.CompatibleSparklineDialog()
              }
              csDialog.open(option)
            } else if (formulaSparkline instanceof Sheets.Sparklines.BulletSparkline) {
              if (!bulletSparklineDialog) {
                bulletSparklineDialog = new designer.BulletSparklineDialog()
              }
              bulletSparklineDialog.open()
            } else if (formulaSparkline instanceof Sheets.Sparklines.SpreadSparkline) {
              if (!spreadSparklineDialog) {
                spreadSparklineDialog = new designer.SpreadSparklineDialog()
              }
              spreadSparklineDialog.open()
            } else if (formulaSparkline instanceof Sheets.Sparklines.StackedSparkline) {
              if (!stackedSparklineDialog) {
                stackedSparklineDialog = new designer.StackedSparklineDialog()
              }
              stackedSparklineDialog.open()
            } else if (formulaSparkline instanceof Sheets.Sparklines.HBarSparkline) {
              if (!hbarSparklineDialog) {
                hbarSparklineDialog = new designer.HbarSparklineDialog()
              }
              hbarSparklineDialog.open()
            } else if (formulaSparkline instanceof Sheets.Sparklines.VBarSparkline) {
              if (!vbarSparklineDialog) {
                vbarSparklineDialog = new designer.VbarSparklineDialog()
              }
              vbarSparklineDialog.open()
            } else if (formulaSparkline instanceof Sheets.Sparklines.VariSparkline) {
              if (!variSparklineDialog) {
                variSparklineDialog = new designer.VariSparklineDialog()
              }
              variSparklineDialog.open()
            } else if (formulaSparkline instanceof Sheets.Sparklines.BoxPlotSparkline) {
              if (!boxplotSparklineDialog) {
                boxplotSparklineDialog = new designer.BoxPlotSparklineDialog()
              }
              boxplotSparklineDialog.open()
            } else if (formulaSparkline instanceof Sheets.Sparklines.CascadeSparkline) {
              if (!cascadeSparklineDialog) {
                cascadeSparklineDialog = new designer.CascadeSparklineDialog()
              }
              cascadeSparklineDialog.open()
            } else if (formulaSparkline instanceof Sheets.Sparklines.ParetoSparkline) {
              if (!paretoSparklineDialog) {
                paretoSparklineDialog = new designer.ParetoSparklineDialog()
              }
              paretoSparklineDialog.open()
            } else if (formulaSparkline instanceof Sheets.Sparklines.MonthSparkline) {
              if (!monthSparklineDialog) {
                monthSparklineDialog = new designer.CalendarSparklineDialog(0)
              }
              monthSparklineDialog.open(true)
            } else if (formulaSparkline instanceof Sheets.Sparklines.YearSparkline) {
              if (!yearSparklineDialog) {
                yearSparklineDialog = new designer.CalendarSparklineDialog(1)
              }
              yearSparklineDialog.open(true)
              break
            }
          }
          break
        case 'auto-generate-label':
          toggleCheckBoxIcon('auto-generate-label')
          isAutoGenerateLabel = !isAutoGenerateLabel
          break
        case 'insert-slicer':
          var table = sheet.tables.find(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex())
          if (table) {
            if (!insertSlicerDialog) {
              insertSlicerDialog = new designer.InsertSlicerDialog()
            }
            insertSlicerDialog.open(table)
          }
          break
        case 'slicer-styles':
          if (!formatSlicerPopup) {
            _initSlicerFormat()
            formatSlicerPopup = $('#format-slicer-popup').gcuipopup({
              autoHide: true,
              showing: function(e, args) {
                // mark 1st selected slicer's style' corresponding item
                $('#format-slicer-popup span.container-span').removeClass('slicer-format-item-selected')
                var selectedSlicers = designer.util.getSelectedSlicers(sheet)
                var styleName = selectedSlicers && selectedSlicers[0] && selectedSlicers[0].style() && selectedSlicers[0].style().name().toLowerCase() || ''
                if (styleName) {
                  // remove prefix "slicerstyle" to get the shortname
                  styleName = styleName.substr('slicerstyle'.length)
                  $('#format-slicer-popup span.slicer-format-' + styleName).parent().addClass('slicer-format-item-selected')
                }
                $('#format-slicer-popup').removeClass('hidden')
              }
            })
          }
          for (var name in designer.SlicerStyleDialog.customSlicerStyle) {
            if (name) {
              var customPrefix = name.substring(0, name.indexOf('-'))
              $('.custom-format-slicer').css('display', 'block')
              var spanClass = 'slicer-format-' + customPrefix
              $('.' + spanClass).css('display', 'inline-block')
            } else {
              $('.custom-format-slicer').css('display', 'none')
            }
          }
          formatSlicerPopup.gcuipopup({
            position: {
              of: $('#slicer-styles-button'),
              my: 'left top',
              at: 'left bottom'
            }
          })
          formatSlicerPopup.gcuipopup('show')
          break
        case 'slicer-setting':
          if (!ribbon.slicerSettingDialog) {
            ribbon.slicerSettingDialog = new designer.SlicerSettingDialog()
          }
          if (designer.util.isSlicerSelected(sheet)) {
            ribbon.slicerSettingDialog.open()
          }
          break
        case 'quick-layout':
          if (selectedChart) {
            var selectedChartType
            if (chartHelper.getChartGroupString(selectedChart.chartType()) === chartHelper.chartTypeDict['50'].chartGroup) {
              selectedChartType = chartHelper.chartTypeDict['50'].chartGroup
            } else if (selectedChart.series().get(0)) {
              selectedChartType = chartHelper.getChartGroupString(selectedChart.series().get(0).chartType)
            }
            if (!chartLayoutPopup) {
              chartLayoutPopup = $('#ribbon-chart-layout-list-popup').gcuipopup({
                autoHide: true,
                position: {
                  of: $('#quick-layout'),
                  my: 'left top',
                  at: 'left bottom'
                }
              })
              var chartLayoutListContainer = $('.chart-layout-list-container')
              chartLayoutPicker = new ChartLayoutPicker(chartLayoutListContainer, selectedChartType, function(e, value) { // NOSONAR  noUseArguments
                chartLayoutPopup.gcuipopup('hide')
                designer.actions.doAction('setChartLayout', designer.wrapper.spread, {
                  layouts: value
                })
              })
            }
            chartLayoutPicker._setOption(selectedChartType)
            chartLayoutPopup.gcuipopup('show')
          }
          break
        case 'change-colors':
          if (!chartColorPopup) {
            var chartColors = chartTemplates.chartColors
            chartColorPicker = new ChartColorPicker($('#chart-color-picker'), getColorsForChartColorPicker(chartColors))
            chartColorPicker.onSelectedColorChanged = function(selectedColorItem) {
              var group = selectedColorItem.group, index = selectedColorItem.index
              chartColorPopup.gcuipopup('hide')
              designer.actions.doAction('changeChartSeriesColor', designer.wrapper.spread, {
                group: group,
                index: index
              })
            }

            chartColorPopup = $('#chart-color-popup').gcuipopup({
              autoHide: true
            })
            chartColorPopup.gcuipopup({
              position: {
                of: $('#change-colors'),
                my: 'left top',
                at: 'left bottom'
              }
            })
          }
          chartColorPopup.gcuipopup('show')
          var colorItem = selectedChart.colorAndStyle && selectedChart.colorAndStyle.color
          var colorGroup = 'colorful', colorIndex = 0
          if (colorItem) {
            colorGroup = colorItem.group
            colorIndex = colorItem.index
          }
          chartColorPicker.setSelectedItem(colorGroup, colorIndex)
          break
        case 'change-styles':
          if (!chartStylesPopup) {
            chartStylesPopup = $('#ribbon-chart-styles-list-popup').gcuipopup({
              autoHide: true,
              position: {
                of: $('#chart-styles'),
                my: 'left top',
                at: 'left bottom'
              }
            })
          }
          if (selectedChart) {
            updateChartStylesPreview(chartStylesPopup, selectedChart)
            chartStylesPopup.gcuipopup('show')
          }
          break
        case 'switch-row-column':
          designer.actions.doAction('switchChartRowCol', designer.wrapper.spread)
          break
        case 'select-data':
          if (!ribbon.chartSelectDataDialog) {
            ribbon.chartSelectDataDialog = new designer.ChartSelectDataDialog()
          }
          ribbon.chartSelectDataDialog.open(selectedChart)
          break
        case 'change-chart-type':
          if (!ribbon.selectChartDialog) {
            ribbon.selectChartDialog = new designer.SelectChartDialog()
          }
          if (selectedChart) {
            ribbon.selectChartDialog.open(designer.SelectChartDialog.dialogType.changeChartType, selectedChart)
          }
          break
        case 'move-chart':
          if (!ribbon.moveChartDialog) {
            ribbon.moveChartDialog = new designer.MoveChartDialog()
          }
          ribbon.moveChartDialog.open()
          break
        case 'add-chart-element':
          if (!addChartElement) {
            addChartElement = new AddChartElement(document.getElementById('add-chart-element-container'))
            addChartElement._closePopup = function() {
              addChartElementpopup.gcuipopup('hide')
            }
            addChartElementpopup = $('#add-chart-element-popup').gcuipopup({
              autoHide: true,
              position: {
                of: $('#add-chart-element'),
                my: 'left top',
                at: 'left bottom'
              },
              collision: 'fit fit',
              showing: function() {
                addChartElement._beforeShow()
              },
              hiding: function() {
                addChartElement._beforeHide()
              }
            })
          }
          addChartElementpopup.gcuipopup('show')
          break
        case 'change-shape-type':
          if (!shapeHelper.isAllIsAppointedShapeType(activeShapes, 'connectorShapeType')) {
            if (!changeShapeTypePopup) {
              changeShapeTypePopup = $('#ribbon-shape-changeType-list-popup').gcuipopup({
                autoHide: true,
                position: {
                  of: $('#change-shape-type'),
                  my: 'left top',
                  at: 'left bottom'
                }
              })
              var changeShapeTypeContainer = $('.shape-changeType-list-container')
              insertShapePopup = new InsertShapePopup(changeShapeTypeContainer, 'change', function() { // NOSONAR
                changeShapeTypePopup.gcuipopup('hide')
              })
            }
            changeShapeTypePopup.gcuipopup('show')
          } else {
            designer.MessageBox.show(designer.res.selectData.errorPrompt.connectorShapeChangeShapeType, 'Error', 2)
          }
          break
        case 'rotateright90':
          designer.actions.doAction('changeShapeSizeAndProperties', designer.wrapper.spread, {
            selectShape: activeShapes,
            angle: 90,
            rotateFlag: true
          })
          break
        case 'rotateleft90':
          designer.actions.doAction('changeShapeSizeAndProperties', designer.wrapper.spread, {
            selectShape: activeShapes,
            angle: -90,
            rotateFlag: true
          })
          break
        case 'shapegroup':
          if (activeShapes && activeShapes.length > 1) {
            designer.actions.doAction('shapeGroup', designer.wrapper.spread, {
              selectShape: activeShapes,
              type: 'group'
            })
            showShapeTab()
          }
          break
        case 'shapeungroup':
          designer.actions.doAction('shapeGroup', designer.wrapper.spread, {
            selectShape: activeShapes,
            type: 'ungroup'
          })
          showShapeTab()
          break
        }
        switch (cmd.commandName) {
        case 'paste-all':
        case 'paste-formulas':
        case 'paste-values':
        case 'paste-formatting':
          setTimeout(function() {
            $('#paste-options').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-paste')
            $('#paste-options').find('.ui-button-text').text(designer.res.ribbon.home.paste).append('<span class="ui-custom-triangle2"></span>')
          }, 0)
          break
        case 'freeze-panes':
        case 'freeze-toprow':
        case 'freeze-firstcolumn':
        case 'freeze-bottomrow':
        case 'freeze-lastcolumn':
          setTimeout(function() {
            $('#freeze-panes').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-freeze')
            $('#freeze-panes').find('.ui-button-text').html(designer.res.ribbon.view.freezePane).append('<span class="ui-custom-triangle"></span>')
          }, 0)
          break
        case 'format-more':
          setTimeout(function() {
            $('#number-format').find('.ui-button-text').text(designer.res.ribbon.home.general)
          }, 0)
          break
        case 'set-rowheight':
        case 'set-columnwidth':
        case 'autofit-rowheight':
        case 'default-rowheight':
        case 'hide-rows':
        case 'unhide-rows':
        case 'autofit-columnwidth':
        case 'default-columnwidth':
        case 'hide-columns':
        case 'unhide-columns':
        case 'protect-sheet':
        case 'unprotect-sheet':
        case 'lock-cells':
        case 'unlock-cells':
          setTimeout(function() {
            $('#format-row-column').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-format')
            $('#format-row-column').find('.ui-button-text').text(designer.res.ribbon.home.format).append('<span class="ui-custom-triangle2"></span>')
          }, 0)
          break
        case 'find':
        case 'goto':
          setTimeout(function() {
            $('#find-goto').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-find')
            $('#find-goto').find('.ui-button-text').text(designer.res.ribbon.home.find).append('<span class="ui-custom-triangle"></span>')
          }, 0)
          break
        case 'sort-AZ':
        case 'sort-ZA':
        case 'custom-sort':
        case 'set-filter':
        case 'clear-filter':
        case 'reapply-filter':
          setTimeout(function() {
            $('#sort-filter').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-sortfilter')
            $('#sort-filter').find('.ui-button-text').html(designer.res.ribbon.home.sortFilter).append('<span class="ui-custom-triangle"></span>')
          }, 0)
          break
        case 'insert-cells':
        case 'insert-rows':
        case 'insert-columns':
        case 'insert-sheet':
          setTimeout(function() {
            $('#insert-row-column').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-insert')
            $('#insert-row-column').find('.ui-button-text').text(designer.res.ribbon.home.insert).append('<span class="ui-custom-triangle2"></span>')
          }, 0)
          break
        case 'delete-cells':
        case 'delete-rows':
        case 'delete-columns':
        case 'delete-sheet':
          setTimeout(function() {
            $('#delete-row-column').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-delete')
            $('#delete-row-column').find('.ui-button-text').text(designer.res.ribbon.home.Delete).append('<span class="ui-custom-triangle2"></span>')
          }, 0)
          break

        case 'sparkline-weight-dot25':
        case 'sparkline-weight-dot5':
        case 'sparkline-weight-dot75':
        case 'sparkline-weight-1':
        case 'sparkline-weight-1dot5':
        case 'sparkline-weight-2dot25':
        case 'sparkline-weight-3':
        case 'sparkline-weight-4dot5':
        case 'sparkline-weight-6':
        case 'sparkline-weight-custom':
          setTimeout(function() {
            $('#sparkline-weight').find('.ui-button-text').text(designer.res.ribbon.sparkLineDesign.sparklineWeight)
          }, 0)
          break
        case 'bottom-border':
        case 'top-border':
        case 'left-border':
        case 'right-border':
        case 'no-border':
        case 'all-border':
        case 'outside-border':
        case 'thickbox-border':
        case 'bottom-double-border':
        case 'thick-bottom-border':
        case 'top-bottom-border':
        case 'top-thick-bottom-border':
        case 'top-double-bottom-border':
        case 'more-border':
          setTimeout(function() {
            $('#borders').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-bottomborder')
          }, 0)
          break
        case 'rotateright90':
        case 'rotateleft90':
          setTimeout(function() {
            $('#rotate-shape-button').find('.ui-button-text').text(designer.res.ribbon.shapeDesign.rotate)
            $('#rotate-shape-button').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-rotate-shape')
          }, 0)
          break
        case 'shapegroup':
        case 'shapeungroup':
          setTimeout(function() {
            $('#group-shape-button').find('.ui-button-text').text(designer.res.ribbon.shapeDesign.group)
            $('#group-shape-button').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-group-shape')
          }, 0)
          break
        }
        switch (cmd.commandName) {
        case 'protect-sheet':
          $('.ribbon-bar').find('#protect-sheet').addClass('hidden')
          $('.ribbon-bar').find('#unprotect-sheet').removeClass('hidden')
          break
        case 'unprotect-sheet':
          $('.ribbon-bar').find('#protect-sheet').removeClass('hidden')
          $('.ribbon-bar').find('#unprotect-sheet').addClass('hidden')
          break
        case 'lock-cells':
          $('.ribbon-bar').find('#lock-cells').addClass('hidden')
          $('.ribbon-bar').find('#unlock-cells').removeClass('hidden')
          break
        case 'unlock-cells':
          $('.ribbon-bar').find('#lock-cells').removeClass('hidden')
          $('.ribbon-bar').find('#unlock-cells').addClass('hidden')
          break
        }
      }
    })

    $('#rotate-text-popup-menu').addClass('hidden')
    function getColorsForChartColorPicker(chartColors) {
      var newColors = {}
      for (var group in chartColors) {
        if (chartColors.hasOwnProperty(group)) {
          var chartColorGroup = chartColors[group]
          var colorGroup = {}
          colorGroup.name = chartColorGroup.name
          colorGroup.colors = processChartGroupColors(chartColorGroup.colors, 6)
          newColors[group] = colorGroup
        }
      }
      return newColors
    }

    function processChartGroupColors(chartGroupColors, count) {
      var colors = []
      chartGroupColors.forEach(function(chartGroupColor) {
        var groupColor = {}
        groupColor.tip = chartGroupColor.tip
        var chartGroupColorItem = chartGroupColor.items
        if (!(chartGroupColorItem instanceof Array)) {
          chartGroupColorItem = chartHelper.getGradientThemeColor(chartGroupColorItem.startColor, chartGroupColorItem.stopColor, count)
        }
        groupColor.items = processGroupColorItems(chartGroupColorItem)
        colors.push(groupColor)
      })
      return colors
    }

    function processGroupColorItems(chartGroupColorItem) {
      var theme = designer.wrapper.spread.getActiveSheet().currentTheme()
      return chartGroupColorItem.map(function(item) {
        return ColorHelper.parse(item, theme).color
      })
    }

    function adjustFormatTablePopup() {
      var SCROLLBAR_WIDRH = 18
      var $formatTabelPopup = $('#format-table-popup')
      var maxHeight = $(window).height() - $('.ribbon').height()
      if ($formatTabelPopup.height() >= maxHeight) {
        if (!$formatTabelPopup.hasClass('scroll')) {
          $formatTabelPopup.addClass('scroll')
          $formatTabelPopup.width($formatTabelPopup.width() + SCROLLBAR_WIDRH)
        }
        $formatTabelPopup.height(maxHeight)
      } else {
        if ($formatTabelPopup.hasClass('scroll')) {
          $formatTabelPopup.width($formatTabelPopup.width() - SCROLLBAR_WIDRH)
        }
        $formatTabelPopup.removeClass('scroll')
      }
    }
    var createSubMenuItem = function(subpopupitem, button) {
      var submenu = subpopupitem.find('ul')

      return subpopupitem.gcuipopup({
        autoHide: true,
        position: { of: button, my: 'left top', at: 'right top' },
        collision: 'fit fit',
        showing: function(e, args) {
          submenu.removeClass('hidden')
        }
      })
    }

    var hideSubPopupMenu = function(popup, delay) {
      var ticket
      if (delay === undefined) {
        ticket = setTimeout(function() {
          popup.children('ul').addClass('hidden')
          hideSubItemTicket.splice(hideSubItemTicket.indexOf(ticket), 1)
          showingPopup = keyword_undefined
        }, 0)
        hideSubItemTicket.push(ticket)
      } else {
        ticket = setTimeout(function() {
          popup.children('ul').addClass('hidden')
          hideSubItemTicket.splice(hideSubItemTicket.indexOf(ticket), 1)
          showingPopup = keyword_undefined
        }, delay)
        hideSubItemTicket.push(ticket)
      }
    }

    var showSubPopupMenu = function(popup, button, delay) {
      if (showingPopup && showingPopup.is(popup) && showingPopup.gcuipopup('isVisible')) {
        return
      }
      if (showingPopup) {
        hideSubPopupMenu(showingPopup)
      }

      for (var i = 0; i < showSubItemTicket.length; i++) {
        clearTimeout(showSubItemTicket[i])
      }
      showSubItemTicket = []
      var ticket
      if (delay === undefined) {
        ticket = setTimeout(function() {
          popup.gcuipopup('show')
          showSubItemTicket.splice(showSubItemTicket.indexOf(ticket), 1)
          showingPopup = popup
        }, 0)
        showSubItemTicket.push(ticket)
      } else {
        ticket = setTimeout(function() {
          popup.gcuipopup('show')
          showSubItemTicket.splice(showSubItemTicket.indexOf(ticket), 1)
          showingPopup = popup
        }, delay)
        showSubItemTicket.push(ticket)
      }
    }

    $('#condition-format-popup button').on('mouseenter', function(e) {
      var el = e.currentTarget

      var hoverElement = $(el).children('span.ui-button-text-big')
      if (hoverElement.length === 0) {
        hoverElement = $(el).children('span.ui-button-text-small')
        if (hoverElement.length === 0) {
          hoverElement = $(el).children('span.icon-button-container')
        }
      }
      $(hoverElement).addClass('ui-state-hover')
      switch (el.name) {
      case 'highlight-cells-rules':
        if (!highlightCellsRulesPopup) {
          highlightCellsRulesPopup = createSubMenuItem($('#highlight-cells-rules-popup'), $(el))
        }
        showSubPopupMenu(highlightCellsRulesPopup, $(el), delayTime)
        break
      case 'top-bottom-rules':
        if (!topBottomRulesPopup) {
          topBottomRulesPopup = createSubMenuItem($('#top-bottom-rules-popup'), $(el))
        }
        showSubPopupMenu(topBottomRulesPopup, $(el), delayTime)
        break
      case 'data-bars':
        if (!dataBarsPopup) {
          dataBarsPopup = createSubMenuItem($('#data-bars-popup'), $(el))
        }
        showSubPopupMenu(dataBarsPopup, $(el), delayTime)
        break
      case 'color-scales':
        if (!colorScalesPopup) {
          colorScalesPopup = createSubMenuItem($('#color-scales-popup'), $(el))
        }
        showSubPopupMenu(colorScalesPopup, $(el), delayTime)
        break
      case 'icon-sets':
        if (!iconSetsPopup) {
          iconSetsPopup = createSubMenuItem($('#icon-sets-popup'), $(el))
        }
        showSubPopupMenu(iconSetsPopup, $(el), delayTime)
        break
      case 'clear-rules':
        if (!clearRulesPopup) {
          clearRulesPopup = createSubMenuItem($('#clear-rules-popup'), $(el))
        }
        showSubPopupMenu(clearRulesPopup, $(el), delayTime)
        break
      case 'new-rule':
      case 'manage-rules':
        for (var i = 0; i < showSubItemTicket.length; i++) {
          clearTimeout(showSubItemTicket[i])
        }
        showSubItemTicket = []
        if (showingPopup) {
          hideSubPopupMenu(showingPopup)
        }
        break
      default:
      }
    })

    $('#condition-format-popup button').on('mouseleave', function(e) {
      var el = e.currentTarget

      var hoverElement = $(el).children('span.ui-button-text-big')
      if (hoverElement.length === 0) {
        hoverElement = $(el).children('span.ui-button-text-small')
        if (hoverElement.length === 0) {
          hoverElement = $(el).children('span.icon-button-container')
        }
      }
      $(hoverElement).removeClass('ui-state-hover')
    })

    var addDataBarAutoRule = function(color, isGradient) {
      var rule
      var sheet = designer.wrapper.spread.getActiveSheet()
      var ranges = sheet.getSelections()
      if (arguments.length === 0) {
        rule = new GC.Spread.Sheets.ConditionalFormatting.DataBarRule()
      } else {
        rule = new GC.Spread.Sheets.ConditionalFormatting.DataBarRule(5 /* Automin */, '(Automatic)', 7 /* Automax */, '(Automatic)', color, ranges)
      }
      rule.gradient(isGradient)
      designer.actions.doAction('addRule', designer.wrapper.spread, { rule: rule, isRemove: true })
    }

    var addColorScaleAutoRule = function(color1, color2, color3) {
      var rule
      var sheet = designer.wrapper.spread.getActiveSheet()
      var ranges = sheet.getSelections()
      var maxType = 2 /* HighestValue */, maxValue = null, maxColor = color1, minType = 1 /* LowestValue */,
        minValue = null, minColor = color2

      if (color3) {
        var midColor = color2
        minColor = color3
        rule = new Sheets.ConditionalFormatting.ScaleRule(11 /* ThreeScaleRule */, minType, minValue, minColor, midType, midValue, midColor, maxType, maxValue, maxColor, ranges)
      } else {
        rule = new Sheets.ConditionalFormatting.ScaleRule(10 /* TwoScaleRule */, minType, minValue, minColor, null, null, null, maxType, maxValue, maxColor, ranges)
      }

      designer.actions.doAction('addRule', designer.wrapper.spread, { rule: rule, isRemove: true })
    }

    var addIconSetAutoRule = function(iconSetType) {
      var sheet = designer.wrapper.spread.getActiveSheet()
      var ranges = sheet.getSelections()
      var rule = new Sheets.ConditionalFormatting.IconSetRule(iconSetType, ranges)
      designer.actions.doAction('addRule', designer.wrapper.spread, { rule: rule, isRemove: true })
    }

    $('#condition-format-popup button').on('click', function(evt) {
      var el = evt.currentTarget

      switch (el.name) {
      case 'highlight-cells-rules':
        if (!highlightCellsRulesPopup) {
          highlightCellsRulesPopup = createSubMenuItem($('#highlight-cells-rules-popup'), $(el))
        }
        showSubPopupMenu(highlightCellsRulesPopup, $(el))
        break
      case 'top-bottom-rules':
        if (!topBottomRulesPopup) {
          topBottomRulesPopup = createSubMenuItem($('#top-bottom-rules-popup'), $(el))
        }
        showSubPopupMenu(topBottomRulesPopup, $(el))
        break
      case 'data-bars':
        if (!dataBarsPopup) {
          dataBarsPopup = createSubMenuItem($('#data-bars-popup'), $(el))
        }
        showSubPopupMenu(dataBarsPopup, $(el))
        break
      case 'color-scales':
        if (!colorScalesPopup) {
          colorScalesPopup = createSubMenuItem($('#color-scales-popup'), $(el))
        }
        showSubPopupMenu(colorScalesPopup, $(el))
        break
      case 'icon-sets':
        if (!iconSetsPopup) {
          iconSetsPopup = createSubMenuItem($('#icon-sets-popup'), $(el))
        }
        showSubPopupMenu(iconSetsPopup, $(el))
        break
      case 'clear-rules':
        if (!clearRulesPopup) {
          clearRulesPopup = createSubMenuItem($('#clear-rules-popup'), $(el))
        }
        showSubPopupMenu(clearRulesPopup, $(el))
        break
      case 'manage-rules':
        formatRulesManagerDialog.open()
        closeConditionalFormatMenu()
        break

      case 'highlight-cells-rules-greater-than':
        cellValueRuleFormatDialog.open(0 /* greaterThan */)
        closeConditionalFormatMenu()
        break
      case 'highlight-cells-rules-less-than':
        cellValueRuleFormatDialog.open(1 /* lessThan */)
        closeConditionalFormatMenu()
        break
      case 'highlight-cells-rules-between':
        cellValueRuleFormatDialog.open(2 /* between */)
        closeConditionalFormatMenu()
        break
      case 'highlight-cells-rules-equal-to':
        cellValueRuleFormatDialog.open(3 /* equalTo */)
        closeConditionalFormatMenu()
        break
      case 'highlight-cells-rules-text-contains':
        textRuleFormatDialog.open()
        closeConditionalFormatMenu()
        break
      case 'highlight-cells-rules-a-date-occurring':
        dateOccurringFormatDialog.open()
        closeConditionalFormatMenu()
        break
      case 'highlight-cells-rules-duplicate-values':
        duplicateValuesFormatDialog.open()
        closeConditionalFormatMenu()
        break
      case 'highlight-cells-rules-more-rules':
        if (!newFormattingRuleDialog) {
          newFormattingRuleDialog = new designer.NewFormattingRuleDialog()
          $(newFormattingRuleDialog).on('dialogClose', function(e, args) {
            newFormattingRuleDialog = null
          })
        }
        newFormattingRuleDialog.open(1 /* formatContain */, true, undefined, undefined, undefined, 4)
        closeConditionalFormatMenu()
        break

      case 'top-bottom-rules-top-10-items':
        top10RuleFormatDialog.open(4 /* top */)
        closeConditionalFormatMenu()
        break
      case 'top-bottom-rules-bottom-10-items':
        top10RuleFormatDialog.open(5 /* bottom */)
        closeConditionalFormatMenu()
        break
      case 'top-bottom-rules-above-average':
        averageRuleFormatDialog.open(6 /* above */)
        closeConditionalFormatMenu()
        break
      case 'top-bottom-rules-below-average':
        averageRuleFormatDialog.open(7 /* below */)
        closeConditionalFormatMenu()
        break
      case 'top-bottom-rules-more-rules':
        if (!newFormattingRuleDialog) {
          newFormattingRuleDialog = new designer.NewFormattingRuleDialog()
          $(newFormattingRuleDialog).on('dialogClose', function(e, args) {
            newFormattingRuleDialog = null
          })
        }
        newFormattingRuleDialog.open(2 /* formatRankedValue */, true)
        closeConditionalFormatMenu()
        break

      case 'gradient-fill-blue-data-bar':
        addDataBarAutoRule('blue', true)
        closeConditionalFormatMenu()
        break
      case 'gradient-fill-green-data-bar':
        addDataBarAutoRule('green', true)
        closeConditionalFormatMenu()
        break
      case 'gradient-fill-red-data-bar':
        addDataBarAutoRule('red', true)
        closeConditionalFormatMenu()
        break
      case 'gradient-fill-orange-data-bar':
        addDataBarAutoRule('orange', true)
        closeConditionalFormatMenu()
        break
      case 'gradient-fill-lightblue-data-bar':
        addDataBarAutoRule('lightblue', true)
        closeConditionalFormatMenu()
        break
      case 'gradient-fill-purple-data-bar':
        addDataBarAutoRule('purple', true)
        closeConditionalFormatMenu()
        break
      case 'solid-fill-blue-data-bar':
        addDataBarAutoRule('blue', false)
        closeConditionalFormatMenu()
        break
      case 'solid-fill-green-data-bar':
        addDataBarAutoRule('green', false)
        closeConditionalFormatMenu()
        break
      case 'solid-fill-red-data-bar':
        addDataBarAutoRule('red', false)
        closeConditionalFormatMenu()
        break
      case 'solid-fill-orange-data-bar':
        addDataBarAutoRule('orange', false)
        closeConditionalFormatMenu()
        break
      case 'solid-fill-lightblue-data-bar':
        addDataBarAutoRule('lightblue', false)
        closeConditionalFormatMenu()
        break
      case 'solid-fill-purple-data-bar':
        addDataBarAutoRule('purple', false)
        closeConditionalFormatMenu()
        break
      case 'data-bars-more-rules':
        if (!newFormattingRuleDialog) {
          newFormattingRuleDialog = new designer.NewFormattingRuleDialog()
          $(newFormattingRuleDialog).on('dialogClose', function(e, args) {
            newFormattingRuleDialog = null
          })
        }
        newFormattingRuleDialog.open(0 /* formatOnValue */, true, 2 /* dataBar */)
        closeConditionalFormatMenu()
        break

      case 'gyr-color-scale':
        addColorScaleAutoRule('green', 'yellow', 'red')
        closeConditionalFormatMenu()
        break
      case 'ryg-color-scale':
        addColorScaleAutoRule('red', 'yellow', 'green')
        closeConditionalFormatMenu()
        break
      case 'gwr-color-scale':
        addColorScaleAutoRule('green', 'white', 'red')
        closeConditionalFormatMenu()
        break
      case 'rwg-color-scale':
        addColorScaleAutoRule('red', 'white', 'green')
        closeConditionalFormatMenu()
        break
      case 'bwr-color-scale':
        addColorScaleAutoRule('blue', 'white', 'red')
        closeConditionalFormatMenu()
        break
      case 'rwb-color-scale':
        addColorScaleAutoRule('red', 'white', 'blue')
        closeConditionalFormatMenu()
        break
      case 'wr-color-scale':
        addColorScaleAutoRule('white', 'red')
        closeConditionalFormatMenu()
        break
      case 'rw-color-scale':
        addColorScaleAutoRule('red', 'white')
        closeConditionalFormatMenu()
        break
      case 'gw-color-scale':
        addColorScaleAutoRule('green', 'white')
        closeConditionalFormatMenu()
        break
      case 'wg-color-scale':
        addColorScaleAutoRule('white', 'green')
        closeConditionalFormatMenu()
        break
      case 'gy-color-scale':
        addColorScaleAutoRule('green', 'yellow')
        closeConditionalFormatMenu()
        break
      case 'yg-color-scale':
        addColorScaleAutoRule('yellow', 'green')
        closeConditionalFormatMenu()
        break
      case 'new-rule':
      case 'color-scales-more-rules':
        if (!newFormattingRuleDialog) {
          newFormattingRuleDialog = new designer.NewFormattingRuleDialog()
          $(newFormattingRuleDialog).on('dialogClose', function(e, args) {
            newFormattingRuleDialog = null
          })
        }
        newFormattingRuleDialog.open(0 /* formatOnValue */, true, 0 /* color2 */)
        closeConditionalFormatMenu()
        break

      case '3-arrows-icon-set':
        addIconSetAutoRule(0 /* ThreeArrowsColored */)
        closeConditionalFormatMenu()
        break
      case '3-arrows-gray-icon-set':
        addIconSetAutoRule(1 /* ThreeArrowsGray */)
        closeConditionalFormatMenu()
        break
      case '3-triangles-icon-set':
        addIconSetAutoRule(2 /* ThreeTriangles */)
        closeConditionalFormatMenu()
        break
      case '3-traffic-lights-unrimmed-icon-set':
        addIconSetAutoRule(5 /* ThreeTrafficLightsUnrimmed */)
        closeConditionalFormatMenu()
        break
      case '3-traffic-lights-rimmed-icon-set':
        addIconSetAutoRule(6 /* ThreeTrafficLightsRimmed */)
        closeConditionalFormatMenu()
        break
      case '3-signs-icon-set':
        addIconSetAutoRule(7 /* ThreeSigns */)
        closeConditionalFormatMenu()
        break
      case '3-symbols-circled-icon-set':
        addIconSetAutoRule(8 /* ThreeSymbolsCircled */)
        closeConditionalFormatMenu()
        break
      case '3-symbols-uncircled-icon-set':
        addIconSetAutoRule(9 /* ThreeSymbolsUncircled */)
        closeConditionalFormatMenu()
        break
      case '3-flags-icon-set':
        addIconSetAutoRule(4 /* ThreeFlags */)
        closeConditionalFormatMenu()
        break
      case '3-stars-icon-set':
        addIconSetAutoRule(3 /* ThreeStars */)
        closeConditionalFormatMenu()
        break
      case '4-arrows-gray-icon-set':
        addIconSetAutoRule(11 /* FourArrowsGray */)
        closeConditionalFormatMenu()
        break
      case '4-arrows-icon-set':
        addIconSetAutoRule(10 /* FourArrowsColored */)
        closeConditionalFormatMenu()
        break
      case '4-traffic-lights-icon-set':
        addIconSetAutoRule(14 /* FourTrafficLights */)
        closeConditionalFormatMenu()
        break
      case 'red-to-black-icon-set':
        addIconSetAutoRule(12 /* FourRedToBlack */)
        closeConditionalFormatMenu()
        break
      case '4-ratings-icon-set':
        addIconSetAutoRule(13 /* FourRatings */)
        closeConditionalFormatMenu()
        break
      case '5-arrows-gray-icon-set':
        addIconSetAutoRule(16 /* FiveArrowsGray */)
        closeConditionalFormatMenu()
        break
      case '5-arrows-icon-set':
        addIconSetAutoRule(15 /* FiveArrowsColored */)
        closeConditionalFormatMenu()
        break
      case '5-quarters-icon-set':
        addIconSetAutoRule(18 /* FiveQuarters */)
        closeConditionalFormatMenu()
        break
      case '5-ratings-icon-set':
        addIconSetAutoRule(17 /* FiveRatings */)
        closeConditionalFormatMenu()
        break
      case '5-boxes-icon-set':
        addIconSetAutoRule(19 /* FiveBoxes */)
        closeConditionalFormatMenu()
        break
      case 'icon-sets-more-rules':
        if (!newFormattingRuleDialog) {
          newFormattingRuleDialog = new designer.NewFormattingRuleDialog()
          $(newFormattingRuleDialog).on('dialogClose', function(e, args) {
            newFormattingRuleDialog = null
          })
        }
        newFormattingRuleDialog.open(0 /* formatOnValue */, true, 3 /* iconSets */)
        closeConditionalFormatMenu()
        break

      case 'clear-rules-from-cells':
        designer.actions.doAction('clearRule', designer.wrapper.spread, false)
        designer.actions.isFileModified = true
        closeConditionalFormatMenu()
        break
      case 'clear-rules-from-sheet':
        designer.actions.doAction('clearRule', designer.wrapper.spread, true)
        designer.actions.isFileModified = true
        closeConditionalFormatMenu()
        break

      default:
      }
    })

    $(document).on('click', function(e) {
      if ($('#condition-format-popup').height() === 0 || !$('#condition-format-popup').is(':visible')) {
        return
      }
      var srcElement = e.target
      if ($.contains($('#condition-format-popup')[0], srcElement) === false) {
        closeConditionalFormatMenu()
      }
    })

    // Set special class
    // For now, I fixed some ribbon layout bugs by this function,
    // If Ribbon team fix them in the future, I will remove this function.
    setSpecialClass()

    // Hide Sparkline Tab and Table Tab
    hideSparklineTab()
    hideTableTab()
    hideFormulaSparklineTab()
    hideSlicerTab()
    hideChartTab()
    hideShapeTab()
  }

  // handle button
  function toggleCheckBoxIcon(id) {
    $('#' + id).find('.ui-icon').toggleClass('gcui-ribbon-checked').toggleClass('gcui-ribbon-unchecked')
  }

  // Get if a element is checked
  function getCheckBoxIconStatus(id) {
    return $('#' + id).find('.ui-icon').hasClass('gcui-ribbon-checked')
  }

  function setCheckBoxIconStatus(id, checked) {
    var ele = $('#' + id).find('.ui-icon').removeClass('gcui-ribbon-checked').removeClass('gcui-ribbon-unchecked')
    if (checked) {
      ele.addClass('gcui-ribbon-checked')
    } else {
      ele.addClass('gcui-ribbon-unchecked')
    }
  }

  // Increase FontSize
  function increasedFontSize() {
    var sizeArray = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72]
    var fontEle = $('#font-size').find('.ui-button-text')
    var currentSize = Number(fontEle.text())
    if (currentSize >= sizeArray[sizeArray.length - 1]) {
      return
    }
    for (var i = 0; i < sizeArray.length; i++) {
      if (currentSize < sizeArray[i]) {
        fontEle.text(sizeArray[i])
        return sizeArray[i]
      }
      if (currentSize === sizeArray[i]) {
        fontEle.text(sizeArray[i + 1])
        return sizeArray[i + 1]
      }
    }
  }

  // Decrease FontSize
  function decreasedFontSize() {
    var sizeArray = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72]
    var fontEle = $('#font-size').find('.ui-button-text')
    var currentSize = Number(fontEle.text())
    if (currentSize <= sizeArray[0]) {
      return
    }
    for (var i = sizeArray.length - 1; i > 0; i--) {
      if (currentSize > sizeArray[i]) {
        fontEle.text(sizeArray[i])
        return sizeArray[i]
      }
      if (currentSize === sizeArray[i]) {
        fontEle.text(sizeArray[i - 1])
        return sizeArray[i - 1]
      }
    }
  }

  // Set special class
  // For now, I fixed some ribbon layout bugs by this function,
  // If Ribbon team fix them in the future, I will remove this function.
  function setSpecialClass() {
    $('#font-family').addClass('gcui-ribbon-fontfamily')
    $('#font-size').addClass('gcui-ribbon-fontsize')
    $('#number-format').addClass('gcui-ribbon-number')
    $('#paste-options').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-paste')
    $('#paste-options').find('.ui-button-text').append('<span class="ui-custom-triangle2"></span>')
    $('#freeze-panes').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-freeze')
    $('#freeze-panes').find('.ui-button-text').append('<span class="ui-custom-triangle"></span>')
    $('#find-goto').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-find')
    $('#find-goto').find('.ui-button-text').append('<span class="ui-custom-triangle"></span>')
    $('#sort-filter').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-sortfilter')
    $('#sort-filter').find('.ui-button-text').append('<span class="ui-custom-triangle"></span>')
    $('#condition-format').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-conditionalformat')
    $('#insert-row-column').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-insert')
    $('#insert-row-column').find('.ui-button-text').append('<span class="ui-custom-triangle2"></span>')
    $('#delete-row-column').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-delete')
    $('#delete-row-column').find('.ui-button-text').append('<span class="ui-custom-triangle2"></span>')
    $('#format-row-column').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-format')
    $('#format-row-column').find('.ui-button-text').append('<span class="ui-custom-triangle2"></span>')
    $('#calculate-option').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-calculateoption')
    $('#calculate-option').find('.ui-button-text').append('<span class="ui-custom-triangle"></span>')
    $('#borders').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-bottomborder')
    $('#borders').find('.ui-button-text').text('borders')
    $('#group-shape-button').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-group-shape')
    $('#rotate-shape-button').find('.ui-icon').removeClass().addClass('ui-button-icon-primary ui-icon gcui-ribbon-rotate-shape')
    $('#rotateright90').find('.ui-button-text').addClass('add-image-icon add-rotateright90-icon')
    $('#rotateleft90').find('.ui-button-text').addClass('add-image-icon add-rotateleft90-icon')
    $('#shapegroup').find('.ui-button-text').addClass('add-image-icon add-shapegroup-icon')
    $('#shapeungroup').find('.ui-button-text').addClass('add-image-icon add-shapeungroup-icon')
    $('.gcui-ribbon-bigbutton').each(function(i, ele) {
      var $ele = $(ele)
      if ($ele.data('button-size')) {
        $ele.width($ele.data('button-size'))
      } else {
        $ele.width($ele.width() + 10)
      }
    })
    $('.gcui-ribbon-slicerbigbutton').each(function(i, ele) {
      var $ele = $(ele)
      if ($ele.data('button-size')) {
        $ele.width($ele.data('button-size'))
      }
    })
    $('#showhide-vgridline').parents('.gcui-ribbon-list').addClass('gcui-ribbon-marginright')
    $('#showhide-columnheader').parents('.gcui-ribbon-list').addClass('gcui-ribbon-marginright')
    $('#add-chart-element').find('.ui-button-text').append('<span class="ui-custom-triangle"></span>')
    $('#quick-layout').find('.ui-button-text').append('<span class="ui-custom-triangle"></span>')
    $('#chart-styles').find('.ui-button-text').append('<span class="ui-custom-triangle"></span>')
    $('#change-colors').find('.ui-button-text').append('<span class="ui-custom-triangle"></span>')
  }

  function hideSparklineTab() {
    if ($('a[href=\'#sparklineTab\']').is(':visible')) {
      $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'sparklineTab', false)
    }
  }

  function showSparklineTab() {
    $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'sparklineTab', true)
    $('.ribbon-bar').gcuitabs('select', 'sparklineTab')
  }

  function showFormulaSparklineTab() {
    $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'formulaSparklineTab', true)
    $('.ribbon-bar').gcuitabs('select', 'formulaSparklineTab')
  }

  function hideFormulaSparklineTab() {
    if ($('a[href=\'#formulaSparklineTab\']').is(':visible')) {
      $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'formulaSparklineTab', false)
    }
  }

  function hideTableTab() {
    if ($('a[href=\'#tableTab\']').is(':visible')) {
      $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'tableTab', false)
    }
  }

  function hideChartTab() {
    if ($('a[href=\'#chartTab\']').is(':visible')) {
      $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'chartTab', false)
    }
  }

  function showChartTab() {
    $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'chartTab', true)
    $('.ribbon-bar').gcuitabs('select', 'chartTab')
  }

  function hideShapeTab() {
    if ($('a[href=\'#shapeTab\']').is(':visible')) {
      $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'shapeTab', false)
    }
  }
  function showShapeTab() {
    $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'shapeTab', true)
    $('.ribbon-bar').gcuitabs('select', 'shapeTab')
    addShapeStyleView()
    addShapeWidthAndHeightView()
  }
  function addShapeStyleView() {
    var shapePartStylePreview = $('#change-shape-part-style')
    var insertshapePreview = $('#reInsert-shape-preview')
    var sheet = designer.wrapper.spread.getActiveSheet()
    var selectShapes = shapeHelper.getActiveShapes(sheet)
    if (shapePartStylePreview.children.length !== 0) {
      shapePartStylePreview.empty()
    }
    if (insertshapePreview.children.length !== 0) {
      insertshapePreview.empty()
    }
    if (shapeHelper.isAllIsAppointedShapeType(selectShapes, 'connectorShapeType')) {
      new shapeStylePreview(shapePartStylePreview, false, 'connectorShapeType')// NOSONAR
    } else {
      new shapeStylePreview(shapePartStylePreview, false, 'autoShapeType')// NOSONAR
    }
    new InsertShapePreview(insertshapePreview)// NOSONAR
  }
  function addShapeWidthAndHeightView() {
    var container = $('#shapeTab #change-shape-size')
    var sheet = designer.wrapper.spread.getActiveSheet()
    var selectShape = shapeHelper.getActiveShapes(sheet)
    if (container.children.length !== 0) {
      container.empty()
    }
    designer.wrapper.spread.getActiveSheet().unbind(GC.Spread.Sheets.Events.ShapeChanged)
    var setShapeHeightOption = new setShapeWidthAndHeight(container, designer.res.ribbon.shapeDesign.height, function(height) {
      designer.actions.doAction('changeShapeSizeAndProperties', designer.wrapper.spread, {
        selectShape: selectShape,
        height: height
      })
    }, { min: 0, max: 900 })
    var setShapeWidthOption = new setShapeWidthAndHeight(container, designer.res.ribbon.shapeDesign.width, function(width) {
      designer.actions.doAction('changeShapeSizeAndProperties', designer.wrapper.spread, {
        selectShape: selectShape,
        width: width
      })
    }, { min: 0, max: 900 })
    setShapeWidthOption.value = shapeHelper.updataSize(sheet)[0]
    setShapeWidthOption.updateValue()
    setShapeHeightOption.value = shapeHelper.updataSize(sheet)[1]
    setShapeHeightOption.updateValue()
    designer.wrapper.spread.getActiveSheet().bind(GC.Spread.Sheets.Events.ShapeChanged, function(e, info) {
      setShapeWidthOption.value = shapeHelper.updataSize(sheet)[0]
      setShapeWidthOption.updateValue()
      setShapeHeightOption.value = shapeHelper.updataSize(sheet)[1]
      setShapeHeightOption.updateValue()
    })
  }
  function updateChartStylesPreview(chartStylesPopup, chart) {
    var container = $('#chart-styles-list-container')
    var spread = designer.wrapper.spread
    var activeSheet = spread.getActiveSheet()
    var selectedChartSeries = chart.series().get()
    var seriesWithoutStyle = chartHelper.getSeriesWithoutStyle(selectedChartSeries)
    var colorAndStyle = chart.colorAndStyle
    var baseChart = new Charts.Chart(activeSheet, 'chartForGetDefaultStyle', undefined, 20, 20, 480, 288, null)
    baseChart.series().add(seriesWithoutStyle)
    var defaultColor = chart.colorAndStyle && chart.colorAndStyle.color
    chartHelper.applyChartSeriesTheme(baseChart, defaultColor || {})
    var defaultChartStyle = getChartStyles(baseChart)
    defaultChartStyle.colorAndStyle = colorAndStyle
    var chartTypeStr = chartHelper.getChartTypeString(chart.chartType())
    var templatesChartStyle = chartTemplates.chartStyles[chartTypeStr]
    templatesChartStyle.colorAndStyle = colorAndStyle
    if (chartHelper.getChartGroupString(chart.chartType()) === chartHelper.chartTypeDict['52'].chartGroup) {
      specialProcessingStyleForStockChart(defaultChartStyle, chart)
    }
    var chartPreviewer = designer.chartPreviewer
    chartPreviewer.synchronizeData(designer.wrapper.spread)
    var charts = chartPreviewer.getPreviewCharts(defaultChartStyle, templatesChartStyle)
    designer.wrapper.spread.focus()

    container.empty()
    for (var i = 0; i < charts.length; i++) {
      var previewChart = charts[i]
      if (previewChart && previewChart instanceof Charts.Chart) {
        var base64Image = chartHelper.getImageFromChart(previewChart)
        createPreviewImage(base64Image, container, i)
      } else {
        continue
      }
    }
    container.off('click')
    container.on('click', {
      templatesChartStyle: templatesChartStyle,
      defaultChartStyle: defaultChartStyle
    }, function(e) {
      chartStylesPopup.gcuipopup('hide')
      var $style = $(e.target)
      $('.chart-style-preview-image').removeClass('chart-style-preview-image-selected')
      $style.addClass('chart-style-preview-image-selected')
      var styleIndex = $style.index('.chart-style-preview-image')
      designer.actions.doAction('setChartStyle', designer.wrapper.spread, {
        chartStyle: {
          templatesChartStyle: e.data.templatesChartStyle[styleIndex],
          defaultChartStyle: e.data.defaultChartStyle
        }
      })
    })
  }

  // stock and bubble chart's series chart type is line.So do special processing here,
  // to tell chart previewer use dataFormula to create preview chart
  function specialProcessingStyleForStockChart(styles, chart) {
    var i = 0, count = styles.length
    var chartType = chart.chartType()
    var dataFormula = chart.dataRange()
    for (; i < count; i++) {
      var style = styles[i]
      style.chartType = chartHelper.getChartTypeString(chartType)
      style.category = chartHelper.getChartGroupString(chartType)
      style.dataFormula = dataFormula
    }
  }

  function getChartStyles(chart) {
    var chartStyle = {}
    chartStyle.chartArea = chart.chartArea()
    chartStyle.axes = chart.axes()
    chartStyle.dataLabels = chart.dataLabels()
    chartStyle.title = chart.title()
    chartStyle.legend = chart.legend()
    chartStyle.series = chart.series().get()
    return chartStyle
  }

  function createPreviewImage(base64Image, container, i) {
    var previewImage = $('<span></span>')
    previewImage.addClass('chart-style-preview-image')
    previewImage.attr('title', 'Style ' + (i + 1))
    previewImage.css('background-image', 'url(\'' + base64Image + '\')')
    previewImage.appendTo(container)
  }

  function updateChartTab(chart) {
    var sheet = designer.wrapper.spread.getActiveSheet()
    var selectedChart = chart || chartHelper.getSelectedChart(sheet)
    if (selectedChart && selectedChart.isSelected() && (sheet.options.protectionOptions.allowEditObjects || !(sheet.options.isProtected && selectedChart.isLocked()))) {
      showChartTab()
    } else {
      hideChartTab()
    }
  }

  ribbon.updateChartTab = updateChartTab
  function updateShapeTab(shape) {
    var sheet = designer.wrapper.spread.getActiveSheet()
    var selectedShape = (shape && shape[0]) || shapeHelper.getActiveShapes(sheet)[0]
    if (selectedShape && selectedShape.isSelected() && (sheet.options.protectionOptions.allowEditObjects || !(sheet.options.isProtected && selectedShape.isLocked()))) {
      showShapeTab()
    } else {
      hideShapeTab()
    }
  }
  ribbon.updateShapeTab = updateShapeTab

  function showTableTab() {
    $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'tableTab', true)
    $('.ribbon-bar').gcuitabs('select', 'tableTab')
  }

  function setDropDownContent(selector, value) {
    $(selector).button('option', 'label', value)
  }

  function updateUndoRedo() {
    var undoManager = designer.wrapper.spread.undoManager()
    if (undoManager) {
      if (undoManager.canUndo()) {
        $('.quick-access-bar').find('[data-action="undo"]').prop('disabled', false)
        $('.quick-access-bar').find('[data-action="undo"]').fadeTo('faster', 1)
      } else {
        $('.quick-access-bar').find('[data-action="undo"]').prop('disabled', true)
        $('.quick-access-bar').find('[data-action="undo"]').fadeTo('faster', 0.2)
      }
      if (undoManager.canRedo()) {
        $('.quick-access-bar').find('[data-action="redo"]').prop('disabled', false)
        $('.quick-access-bar').find('[data-action="redo"]').fadeTo('faster', 1)
      } else {
        $('.quick-access-bar').find('[data-action="redo"]').prop('disabled', true)
        $('.quick-access-bar').find('[data-action="redo"]').fadeTo('faster', 0.2)
      }
    }
  }
  ribbon.updateUndoRedo = updateUndoRedo
  function updateCellStyle() {
    var sheet = designer.wrapper.spread.getActiveSheet()
    var style = sheet.getActualStyle(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex())

    $('.ribbon-bar').gcuiribbon('setButtonsChecked', {
      'font-weight': false,
      'font-italic': false,
      'font-underline': false,
      'font-double-underline': false
    })

    // TODO: reset font style and font size;
    var font
    if (style && style.font) {
      font = designer.util.parseFont(style.font)
      if (font.fontWeight !== 'normal') {
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'font-weight', true)
      }
      if (font.fontStyle !== 'normal') {
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'font-italic', true)
      }
      if (font.fontSize) {
        setDropDownContent('#font-size', font.fontSize.substring(0, font.fontSize.length - 2))
      }
      if (font.fontFamily) {
        var families = font.fontFamily.split(',')
        var family = families[0]
        if (family.match(/^["'].*["']$/)) {
          family = family.substring(1, family.length - 1)
        }

        var regex = new RegExp('^(.*,\s*)?["\']?' + family + '["\']?\s*(,.*)?$')

        for (var fontKey in designer.res.ribbon.fontFamilies) {
          if (regex.test(designer.res.ribbon.fontFamilies[fontKey].name)) {
            family = designer.res.ribbon.fontFamilies[fontKey].text
            break
          }
        }
        var subString = getSubStrByDom($('#font-family').children('.ui-button-text'), family)
        setDropDownContent('#font-family', subString)
      }
    } else {
      font = designer.util.parseFont(designer.res.defaultFont)
      setDropDownContent('#font-size', font.fontSize.substring(0, font.fontSize.length - 2))
      setDropDownContent('#font-family', font.fontFamily)
    }
    if (style && style.textDecoration && (style.textDecoration & 1 /* Underline */)) {
      $('.ribbon-bar').gcuiribbon('setButtonChecked', 'font-underline', true)
    }
    if (style && style.textDecoration && (style.textDecoration & 8 /* Double Underline */)) {
      $('.ribbon-bar').gcuiribbon('setButtonChecked', 'font-double-underline', true)
    }
    $('.ribbon-bar').gcuiribbon('setButtonsChecked', {
      'left-align': false,
      'center-align': false,
      'right-align': false
    })
    if (style && style.hAlign !== undefined) {
      switch (style.hAlign) {
      case 0 /* left */
        :
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'left-align', true)
        break
      case 1 /* center */
        :
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'center-align', true)
        break
      case 2 /* right */
        :
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'right-align', true)
        break
      }
    }

    $('.ribbon-bar').gcuiribbon('setButtonsChecked', {
      'top-align': false,
      'middle-align': false,
      'bottom-align': false
    })
    if (style && style.vAlign !== undefined) {
      switch (style.vAlign) {
      case 0 /* top */
        :
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'top-align', true)
        break
      case 1 /* center */
        :
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'middle-align', true)
        break
      case 2 /* bottom */
        :
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'bottom-align', true)
        break
      }
    }
    if (style && style.wordWrap) {
      $('.ribbon-bar').gcuiribbon('setButtonChecked', 'wrap-text', true)
    } else {
      $('.ribbon-bar').gcuiribbon('setButtonChecked', 'wrap-text', false)
    }
    if (style && style.isVerticalText) {
      $('.ribbon-bar').gcuiribbon('setButtonChecked', 'vertical-text', true)
    } else {
      $('.ribbon-bar').gcuiribbon('setButtonChecked', 'vertical-text', false)
    }
  }

  ribbon.updateCellStyle = updateCellStyle
  function getSubStrByDom($dom, text) {
    return $('.ribbon-bar').gcuiribbon('getDropdownLabelSubstr', text, $dom, $dom.width())
  }

  function updateFormat() {
    var sheet = designer.wrapper.spread.getActiveSheet()
    var style = sheet.getActualStyle(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex())

    if (!style || !style.formatter || style.formatter === 'general') {
      setDropDownContent('#number-format', designer.res.generalFormat)
    } else {
      for (var format in designer.res.commonFormats) { /* NOSONAR: Forin*/
        var o = designer.res.commonFormats[format]
        if (o.format === style.formatter) {
          setDropDownContent('#number-format', o.label)
          return
        }
      }
      setDropDownContent('#number-format', designer.res.customFormat)
    }
  }

  ribbon.updateFormat = updateFormat
  function updateMerge() {
    var sheet = designer.wrapper.spread.getActiveSheet()
    var ranges = sheet.getSelections()
    for (var i = 0; i < ranges.length; i++) {
      var spans = sheet.getSpans(ranges[i])
      if (spans.length > 0) {
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'merge-center', true)
        return
      }
    }
    $('.ribbon-bar').gcuiribbon('setButtonChecked', 'merge-center', false)
  }

  ribbon.updateMerge = updateMerge

  function updateSparkline() {
    hideFormulaSparklineTab()
    hideSparklineTab()
    var sheet = designer.wrapper.spread.getActiveSheet()
    var row = sheet.getActiveRowIndex()
    var col = sheet.getActiveColumnIndex()
    var selections = sheet.getSelections()
    if (selections && selections.length === 0) {
      return
    }
    if (sheet.getSparkline(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex()) instanceof Sheets.Sparklines.Sparkline) {
      // Show sparkline tab
      showSparklineTab()

      // Update sparkline type
      var sparkline = sheet.getSparkline(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex())
      $('.ribbon-bar').gcuiribbon('setButtonChecked', 'sparkline-type-line', false)
      $('.ribbon-bar').gcuiribbon('setButtonChecked', 'sparkline-type-column', false)
      $('.ribbon-bar').gcuiribbon('setButtonChecked', 'sparkline-type-winloss', false)
      switch (sparkline.sparklineType()) {
      case 0 /* line */
        :
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'sparkline-type-line', true)
        break
      case 1 /* column */
        :
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'sparkline-type-column', true)
        break
      case 2 /* winloss */
        :
        $('.ribbon-bar').gcuiribbon('setButtonChecked', 'sparkline-type-winloss', true)
        break
      }

      // Update sparkline point
      var sparklineSetting = sparkline.setting()
      setCheckBoxIconStatus('sparkline-high-point', sparklineSetting.options.showHigh)
      setCheckBoxIconStatus('sparkline-low-point', sparklineSetting.options.showLow)
      setCheckBoxIconStatus('sparkline-first-point', sparklineSetting.options.showFirst)
      setCheckBoxIconStatus('sparkline-last-point', sparklineSetting.options.showLast)
      setCheckBoxIconStatus('sparkline-negative-point', sparklineSetting.options.showNegative)
      setCheckBoxIconStatus('sparkline-marker-point', sparklineSetting.options.showMarkers)
    } else if (designer.util.parseFormulaSparkline(row, col)) {
      showFormulaSparklineTab()
    }
  }

  ribbon.updateSparkline = updateSparkline

  function updateTable() {
    var sheet = designer.wrapper.spread.getActiveSheet()
    var selections = sheet.getSelections()
    if (selections && selections.length === 0) {
      return
    }
    if (sheet.tables.find(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex()) instanceof Sheets.Tables.Table) {
      // show table tab
      showTableTab()

      // disable insert table item
      $('.ribbon-bar').gcuiribbon('setButtonDisabled', 'insert-table', true)

      // update table tab
      var table = sheet.tables.find(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex())
      setCheckBoxIconStatus('table-header-row', table.showHeader())
      setCheckBoxIconStatus('table-total-row', table.showFooter())
      setCheckBoxIconStatus('table-banded-rows', table.bandRows())
      setCheckBoxIconStatus('table-first-column', table.highlightFirstColumn())
      setCheckBoxIconStatus('table-last-column', table.highlightLastColumn())
      setCheckBoxIconStatus('table-banded-columns', table.bandColumns())
      setCheckBoxIconStatus('table-filter-button', table.filterButtonVisible())
      $('.designer-table-name').val(table.name())

      // save table style' name which can be used to mark corresponding style item in table style popup
      var style = table.style(),
        styleName = style.name()
      _selectedTableStyleName = (styleName && styleName.toLowerCase()) || ''
    } else {
      hideTableTab()

      // enable insert table item
      $('.ribbon-bar').gcuiribbon('setButtonDisabled', 'insert-table', false)
    }
  }

  ribbon.updateTable = updateTable

  function updateShowHide() {
    var sheet = designer.wrapper.spread.getActiveSheet()
    setCheckBoxIconStatus('showhide-columnheader', sheet.options.colHeaderVisible)
    setCheckBoxIconStatus('showhide-rowheader', sheet.options.rowHeaderVisible)
    setCheckBoxIconStatus('showhide-hgridline', sheet.options.gridline.showHorizontalGridline)
    setCheckBoxIconStatus('showhide-vgridline', sheet.options.gridline.showVerticalGridline)
    setCheckBoxIconStatus('showhide-tabstrip', designer.wrapper.spread.options.tabStripVisible)
    setCheckBoxIconStatus('showhide-newtab', designer.wrapper.spread.options.newTabVisible)
  }

  ribbon.updateShowHide = updateShowHide

  function updateProtectLock() {
    var sheet = designer.wrapper.spread.getActiveSheet()
    if (sheet.options.isProtected) {
      $('.ribbon-bar').find('#protect-sheet').addClass('hidden')
      $('.ribbon-bar').find('#unprotect-sheet').removeClass('hidden')
    } else {
      $('.ribbon-bar').find('#protect-sheet').removeClass('hidden')
      $('.ribbon-bar').find('#unprotect-sheet').addClass('hidden')
    }
    if (sheet.getCell(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex()).locked()) {
      $('.ribbon-bar').find('#lock-cells').addClass('hidden')
      $('.ribbon-bar').find('#unlock-cells').removeClass('hidden')
    } else {
      $('.ribbon-bar').find('#lock-cells').removeClass('hidden')
      $('.ribbon-bar').find('#unlock-cells').addClass('hidden')
    }
  }

  ribbon.updateProtectLock = updateProtectLock

  function updateZoomToStatusBar() {
    var sheet = designer.wrapper.spread.getActiveSheet()
    $('.statusBar').find('.statusbar-zoom-value').text(Math.round(sheet.zoom() * 100) + '%')
  }

  ribbon.updateZoomToStatusBar = updateZoomToStatusBar

  function exitTemplateDesignMode() {
    // exit template mode.
    var designMode = $('#template-design-mode')
    var designModeText = designMode.find('span.ui-button-text')
    var indicatorContainer = $('#data-binding-setting-indicator')
    var indicatorIcon = $('.designer-data-binding-icon')
    var sliderPanel = $('.slider-panel')

    _restorePaint() // restore cell type paint
    designModeText.removeClass('template-design-mode-checked')
    indicatorContainer.attr('hidden', 'hidden')
    indicatorIcon.unbind('click.indicator')
    if (originalDataSource) {
      var sheet = designer.wrapper.spread.getActiveSheet()
      sheet.setDataSource(originalDataSource)
    }
    if (sliderPanel.is(':visible')) {
      sliderPanel.sliderpanel('close', 'panel1')
    }
    designMode.data('checked', false)
    _detachEvent()
  }

  function _createCustomCellStyle() {
    $('.custom-cell-styles-preview').empty()
    _cellStyleLayout(designer.CellStyleDialog.existedCustomCellStyle, $('.custom-cell-styles-preview'), true)
    _reAttachCustomCellStyleEvent()
  }

  function resetSpreadNamedStyle() {
    var spread = designer.wrapper.spread
    $('.custom-cell-styles-preview').children().remove()
    $('.good-bad-style-preview').children().remove()
    $('.data-model-style-preview').children().remove()
    $('.titles-headings-preview').children().remove()
    $('.themed-preview').children().remove()
    $('.number-format-preview').children().remove()
    designer.CellStyleDialog.existedCustomCellStyle = {}
    designer.CellStyleDialog.buildInCellStyle = {}

    var goodBadStyle = _buildInGoodBadStyle(spread)
    var dataAndModelStyle = _buildInDataAndModelStyle(spread)
    var headingsStyles = _buildInTitlesAndHeadingsStyles(spread)
    var themedCellStyles = _buildInThemedCellStyles(spread)
    var numberFormatStyles = _buildInNumberFormatStyles(spread)
    _addBuildInNamedStyle(goodBadStyle, dataAndModelStyle, headingsStyles, themedCellStyles, numberFormatStyles)

    // reset named style dialog appearance.
    var namedStyles = spread.getNamedStyles()
    for (var i = 0; i < namedStyles.length; i++) {
      var name = namedStyles[i].name
      if (name) {
        var key = name.toLowerCase()
        if (key.substr(0, 9) !== '__builtin' && !designer.CellStyleDialog.buildInCellStyle.hasOwnProperty(key)) {
          designer.CellStyleDialog.existedCustomCellStyle[key] = namedStyles[i]
        }
      }
    }
    if (_isEmptyObject(designer.CellStyleDialog.existedCustomCellStyle)) {
      $('.cell-style-custom-li').addClass('hidden')
      $('.custom-cell-styles-preview').parent().addClass('hidden')
    }

    _cellStyleLayout(designer.res.cellStylesDialog.goodBadAndNeutralContent, $('.good-bad-style-preview'), false, goodBadStyle)
    _cellStyleLayout(designer.res.cellStylesDialog.dataAndModelContent, $('.data-model-style-preview'), false, dataAndModelStyle)
    _cellStyleLayout(designer.res.cellStylesDialog.titlesAndHeadingsContent, $('.titles-headings-preview'), false, headingsStyles)
    _cellStyleLayout(designer.res.cellStylesDialog.themedCellStyleContent, $('.themed-preview'), false, themedCellStyles)
    _cellStyleLayout(designer.res.cellStylesDialog.numberFormatContent, $('.number-format-preview'), false, numberFormatStyles)

    _attchCellStyleEvent()
  }

  ribbon.resetSpreadNamedStyle = resetSpreadNamedStyle

  // #region build in namedStyle
  function _buildInGoodBadStyle(spread) {
    var nameSet = ['normal', 'bad', 'good', 'neutral']
    var goodBadAndNeutralStyles = {}
    for (var i = 0; i < nameSet.length; i++) {
      var namedStyle = spread.getNamedStyle(nameSet[i])
      var name = nameSet[i]
      if (namedStyle) {
        goodBadAndNeutralStyles[name] = namedStyle
      } else {
        switch (name) {
        case 'normal':
          goodBadAndNeutralStyles['normal'] = { name: 'Normal' }
          break
        case 'bad':
          goodBadAndNeutralStyles['bad'] = {
            name: 'Bad',
            backColor: '#FFC7CE',
            foreColor: '#9C0006'
          }
          break
        case 'good':
          goodBadAndNeutralStyles['good'] = {
            name: 'Good',
            backColor: '#C6EFCE',
            foreColor: '#006100'
          }
          break
        case 'neutral':
          goodBadAndNeutralStyles['neutral'] = {
            name: 'Neutral',
            backColor: '#FFEB9C',
            foreColor: '#9C6500'
          }
          break
        default:
          break
        }
      }
    }
    return goodBadAndNeutralStyles
  }

  function _buildInDataAndModelStyle(spread) {
    var nameSet = ['calculation', 'check cell', 'explanatory text', 'input', 'linked cell', 'note', 'output', 'warning text']
    var dataAndModelStyles = {}
    for (var i = 0; i < nameSet.length; i++) {
      var namedStyle = spread.getNamedStyle(nameSet[i])
      var name = nameSet[i]
      if (namedStyle) {
        dataAndModelStyles[name] = namedStyle
      } else {
        switch (name) {
        case 'calculation':
          dataAndModelStyles['calculation'] = {
            name: 'Calculation',
            backColor: '#F2F2F2',
            foreColor: '#FCA957',
            border: 'thin solid black',
            font: 'bold 13px Arial'
          }
          break
        case 'check cell':
          dataAndModelStyles['check cell'] = {
            name: 'Check Cell',
            backColor: '#A5A5A5',
            foreColor: '#FFFFFF',
            border: 'medium double black',
            font: 'bold 13px Arial'
          }
          break
        case 'explanatory text':
          dataAndModelStyles['explanatory text'] = {
            name: 'Explanatory Text',
            foreColor: '#7F7F7F',
            font: 'italic bold 13px Arial'
          }
          break
        case 'input':
          dataAndModelStyles['input'] = {
            name: 'Input',
            foreColor: '#3F3F76',
            backColor: '#FFCC99',
            border: 'thin solid black',
            font: 'bold 13px Arial'
          }
          break
        case 'linked cell':
          dataAndModelStyles['linked cell'] = {
            name: 'Linked Cell',
            foreColor: '#FCA957',
            borderBottom: 'medium double #FDD3A9',
            font: 'bold 13px Arial'
          }
          break
        case 'note':
          dataAndModelStyles['note'] = {
            name: 'Note',
            backColor: '#FFFFCC',
            border: 'thin solid black',
            font: '13px Arial'
          }
          break
        case 'output':
          dataAndModelStyles['output'] = {
            name: 'Output',
            backColor: '#F2F2F2',
            border: 'thin solid black',
            font: 'bold 13px Arial'
          }
          break
        case 'warning text':
          dataAndModelStyles['warning text'] = {
            name: 'Warning Text',
            foreColor: '#FF3030',
            font: '13px Arial'
          }
          break
        default:
          break
        }
      }
    }
    return dataAndModelStyles
  }

  function _buildInTitlesAndHeadingsStyles(spread) {
    var nameSet = ['heading 1', 'heading 2', 'heading 3', 'heading 4', 'title', 'total']
    var titlesAndHeadingsStyles = {}
    for (var i = 0; i < nameSet.length; i++) {
      var namedStyle = spread.getNamedStyle(nameSet[i])
      var name = nameSet[i]
      if (namedStyle) {
        titlesAndHeadingsStyles[name] = namedStyle
      } else {
        switch (name) {
        case 'heading 1':
          titlesAndHeadingsStyles['heading 1'] = {
            name: 'Heading 1',
            foreColor: '#1F497D',
            font: 'bold 17px Arial',
            borderBottom: 'medium solid #4F81BD'
          }
          break
        case 'heading 2':
          titlesAndHeadingsStyles['heading 2'] = {
            name: 'Heading 2',
            foreColor: '#1F497D',
            font: 'bold 15px Arial',
            borderBottom: 'medium solid #A4BDDD'
          }
          break
        case 'heading 3':
          titlesAndHeadingsStyles['heading 3'] = {
            name: 'Heading 3',
            foreColor: '#1F497D',
            font: 'bold 13px Arial',
            borderBottom: 'thin solid #93B1D7'
          }
          break
        case 'heading 4':
          titlesAndHeadingsStyles['heading 4'] = {
            name: 'Heading 4',
            foreColor: '#1F497D',
            font: 'bold 13px Arial'
          }
          break
        case 'title':
          titlesAndHeadingsStyles['title'] = {
            name: 'Title',
            foreColor: '#1F497D',
            font: 'bold 17px Century'
          }
          break
        case 'total':
          titlesAndHeadingsStyles['total'] = {
            name: 'Total',
            font: 'bold 13px Arial',
            borderTop: 'thin solid #1F497D',
            borderBottom: 'medium double #1F497D'
          }
          break
        default:
          break
        }
      }
    }
    return titlesAndHeadingsStyles
  }

  function _buildInThemedCellStyles(spread) {
    var themedCellStyles = {}
    var themes = designer.res.cellStylesDialog.themedCellStyleContent
    var fontColor = 'black'
    for (var item in themes) { /* NOSONAR: Forin*/
      var key = item.toLowerCase()
      var namedStyle = spread.getNamedStyle(item)
      if (namedStyle) {
        themedCellStyles[key] = namedStyle
      } else {
        var themeColor
        var colorDetails = item.split('-')
        var num
        if (colorDetails.length === 1) {
          num = colorDetails[0].substr(colorDetails[0].length - 1)
          themeColor = 'Accent ' + num + ' 0'
          fontColor = 'white'
        } else if (colorDetails.length === 2) {
          num = colorDetails[1].substr(colorDetails[1].length - 1)
          var colorDarker = 100 - parseInt(colorDetails[0])
          themeColor = 'Accent ' + num + ' ' + colorDarker + '%'
          if (colorDarker <= 50) {
            fontColor = 'white'
          } else {
            fontColor = 'black'
          }
        }
        themeColor = designer.ColorHelper.parse(themeColor, designer.wrapper.spread.getActiveSheet().currentTheme().colors())
        themedCellStyles[key] = { name: item, backColor: themeColor.color, foreColor: fontColor }
      }
    }
    return themedCellStyles
  }

  function _buildInNumberFormatStyles(spread) {
    var nameSet = ['comma', 'comma [0]', 'currency', 'currency [0]', 'percent']
    var numberFormatStyles = {}
    for (var i = 0; i < nameSet.length; i++) {
      var namedStyle = spread.getNamedStyle(nameSet[i])
      var name = nameSet[i]
      if (namedStyle) {
        numberFormatStyles[name] = namedStyle
      } else {
        switch (name) {
        case 'comma':
          numberFormatStyles['comma'] = {
            name: 'Comma',
            formatter: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)'
          }
          break
        case 'comma [0]':
          numberFormatStyles['comma [0]'] = {
            name: 'Comma [0]',
            formatter: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)'
          }
          break
        case 'currency':
          numberFormatStyles['currency'] = {
            name: 'Currency',
            formatter: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)'
          }
          break
        case 'currency [0]':
          numberFormatStyles['currency [0]'] = {
            name: 'Currency [0]',
            formatter: '_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)'
          }
          break
        case 'percent':
          numberFormatStyles['percent'] = { name: 'Percent', formatter: '0%' }
          break
        default:
          break
        }
      }
    }
    return numberFormatStyles
  }

  // #endregion build in namedStyle
  function _addBuildInNamedStyle() {
    var args = []
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
      args[_i] = arguments[_i + 0]
    }
    var length = args.length
    for (var i = 0; i < length; i++) {
      var styleAssembly = args[i]
      for (var item in styleAssembly) { /* NOSONAR: Forin*/
        var currentStyle = styleAssembly[item]
        if (!(currentStyle instanceof Sheets.Style)) {
          _convertToSpreadStyle(currentStyle)
        }
        var name = currentStyle.name.toLowerCase()
        designer.CellStyleDialog.buildInCellStyle[name] = currentStyle
      }
    }
  }

  function _convertToSpreadStyle(style) {
    if (style.borderTop) {
      style.borderTop = _parseCssBorderStyle(style.borderTop)
    }
    if (style.borderBottom) {
      style.borderBottom = _parseCssBorderStyle(style.borderBottom)
    }
    if (style.borderLeft) {
      style.borderLeft = _parseCssBorderStyle(style.borderLeft)
    }
    if (style.borderRight) {
      style.borderRight = _parseCssBorderStyle(style.borderRight)
    }
    if (style.border) {
      style.borderTop = _parseCssBorderStyle(style.border)
      style.borderBottom = _parseCssBorderStyle(style.border)
      style.borderLeft = _parseCssBorderStyle(style.border)
      style.borderRight = _parseCssBorderStyle(style.border)
    }
  }

  function _parseCssBorderStyle(borderStyle) {
    if (!borderStyle) {
      return undefined
    }
    var styles = borderStyle.split(' ')
    var lineStyle = 1 /* thin */
    var lineColor
    if (styles.length === 3) {
      if (styles[0] === 'thin' || styles[0] === 'medium' || styles[0] === 'thick') {
        lineStyle = Sheets.LineStyle[styles[0]]
      }
      if (styles[1] !== 'solid') {
        lineStyle = Sheets.LineStyle[styles[1]]
      }
      lineColor = styles[2]
      return new Sheets.LineBorder(lineColor, lineStyle)
    }
  }

  var measureSpan

  function composeFont(font, fontFamily) {
    if (!fontFamily) {
      return font
    }
    if (!measureSpan) {
      measureSpan = document.createElement('span')
    }
    $(measureSpan).css('font', font)
    $(measureSpan).css('fontFamily', fontFamily)
    return $(measureSpan).css('font')
  }

  function _convertToCSSStyle(cssStyle, spreadStyleObject) {
    $.extend(cssStyle, spreadStyleObject)
    for (var prop in spreadStyleObject) {
      if ((prop === 'backColor' || prop === 'foreColor') && spreadStyleObject[prop]) {
        var colorItem = designer.ColorHelper.parse(spreadStyleObject[prop], designer.wrapper.spread.getActiveSheet().currentTheme().colors())
        cssStyle[prop] = colorItem.color
      } else if (prop === 'hAlign' && spreadStyleObject[prop]) {
        cssStyle['textAlign'] = Sheets.HorizontalPosition[spreadStyleObject[prop]]
      }
    }
    if (cssStyle.font && cssStyle.themeFont) {
      cssStyle.font = composeFont(cssStyle.font, designer.util.getThemeFont(cssStyle.themeFont))
    }
    if (cssStyle.borderBottom) {
      cssStyle['borderBottom'] = _getCSSBorder(cssStyle.borderBottom)
    }
    if (cssStyle.borderLeft) {
      cssStyle['borderLeft'] = _getCSSBorder(cssStyle.borderLeft)
    }
    if (cssStyle.borderRight) {
      cssStyle['borderRight'] = _getCSSBorder(cssStyle.borderRight)
    }
    if (cssStyle.borderTop) {
      cssStyle['borderTop'] = _getCSSBorder(cssStyle.borderTop)
    }
    if (cssStyle.textDecoration) {
      cssStyle['textDecoration'] = designer.util.toCSSTextDecoration(cssStyle.textDecoration)
    }
  }

  function _getCSSBorder(border) {
    if (typeof border === 'string') {
      return border
    }
    var cssborder = []
    var borderStyle = ['dotted', 'solid', 'double', 'dashed']
    var lineName = ''
    var i
    if (border.style) {
      for (i in Sheets.LineStyle) {
        if (border.style === Sheets.LineStyle[i]) {
          switch (border.style) {
          case 0:
            lineName = 'empty'
            break
          case 1:
            lineName = 'thin'
            break
          case 2:
            lineName = 'medium'
            break
          case 3:
            lineName = 'dashed'
            break
          case 4:
            lineName = 'dotted'
            break
          case 5:
            lineName = 'thick'
            break
          case 6:
            lineName = 'double'
            break
          case 7:
            lineName = 'hair'
            break
          case 8:
            lineName = 'mediumDashed'
            break
          case 9:
            lineName = 'dashDot'
            break
          case 10:
            lineName = 'mediumDashDot'
            break
          case 11:
            lineName = 'dashDotDot'
            break
          case 12:
            lineName = 'mediumDashDotDot'
            break
          }
        }
      }
      lineName = lineName.toLowerCase()
      cssborder[0] = _getBorderWidth(border.style) + 'px'
      for (i = 0; i < borderStyle.length; i++) {
        if (lineName.indexOf(borderStyle[i]) !== -1) {
          cssborder[1] = borderStyle[i]
        }
      }
      if (!cssborder[1]) {
        if (lineName.indexOf('dot') !== -1) {
          cssborder[1] = 'dotted'
        } else if (lineName.indexOf('dash') !== -1) {
          cssborder[1] = 'dashed'
        } else {
          cssborder[1] = 'solid'
        }
      }
    }
    var colorItem
    if (border.color) {
      colorItem = designer.ColorHelper.parse(border.color, designer.wrapper.spread.getActiveSheet().currentTheme().colors())
      cssborder[2] = colorItem.color
    } else {
      colorItem = designer.ColorHelper.parse('Text 1', designer.wrapper.spread.getActiveSheet().currentTheme().colors())
      cssborder[2] = colorItem.color
    }
    var result = ''

    // thin and double can't exist at the same time
    if (cssborder[0] === 'thin' && cssborder[1] === 'double') {
      cssborder[0] = keyword_undefined
    }
    for (i = 0; i < cssborder.length; i++) {
      if (cssborder[i]) {
        result = result + cssborder[i] + ' '
      }
    }
    result = result.substring(0, result.lastIndexOf(' '))
    return result
  }

  function _getBorderWidth(style) {
    switch (style) {
    case 9 /* dashDot */
      :
    case 1 /* thin */
      :
    case 3 /* dashed */
      :
    case 4 /* dotted */
      :
    case 7 /* hair */
      :
    case 11 /* dashDotDot */
      :
      return 1
    case 2 /* medium */
      :
    case 10 /* mediumDashDot */
      :
    case 12 /* mediumDashDotDot */
      :
    case 8 /* mediumDashed */
      :
    case 13 /* slantedDashDot */
      :
      return 2
    case 5 /* thick */
      :
    case 6 /* double */
      :
      return 3
    }
    return 0
  }
  // 预览
  function findDimensions() { // 获取当前浏览器宽高
    // 获取窗口宽度
    if (window.innerWidth) { winWidth = window.innerWidth } else if ((document.body) && (document.body.clientWidth)) { winWidth = document.body.clientWidth }
    // 获取窗口高度
    if (window.innerHeight) { winHeight = window.innerHeight } else if ((document.body) && (document.body.clientHeight)) { winHeight = document.body.clientHeight }
    // 通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
      winHeight = document.documentElement.clientHeight
      winWidth = document.documentElement.clientWidth
    }
    // console.log(winHeight, winWidth, 888)
  }
  function _getElementById(id) {
    return document.getElementById(id)
  }

  // generate layout for cell style
  function _cellStyleLayout(data, parent, isCustomCellStyle, styles) {
    var item
    var outerSpan, div
    if (isCustomCellStyle) {
      if (!_isEmptyObject(data)) {
        $('.cell-style-custom-li').removeClass('hidden')
        $('.custom-cell-styles-preview').parent().removeClass('hidden')
        for (item in data) { /* NOSONAR: Forin*/
          var customStyleName = data[item].name
          outerSpan = $('<span></span>').attr({
            'title': customStyleName,
            'data-name': customStyleName
          }).addClass('cell-style-outer-span')
          div = $('<div></div>').text(customStyleName).addClass('custom-cell-style-symbol').appendTo(outerSpan)
          outerSpan.appendTo(parent)
          var cssStyle = {}
          _convertToCSSStyle(cssStyle, data[item])
          _setPreivewStyle(cssStyle, div)
          _addNamedStyle(customStyleName, designer.wrapper.spread) // Keep custom cellstyle when user create it.
        }
      }
    } else {
      for (item in data) { /* NOSONAR: Forin*/
        var key = item.toLowerCase()
        outerSpan = $('<span></span>').attr({
          'title': item,
          'data-name': item
        }).addClass('cell-style-outer-span')
        div = $('<div></div>').text(data[item]).addClass('cell-style-symbol').appendTo(outerSpan)
        outerSpan.appendTo(parent)
        if (styles) {
          _setPreivewStyle(styles[key], div)
        }
      }
    }
  }

  function _isEmptyObject(obj) {
    return obj ? (typeof obj === 'object') && (Object.keys(obj).length === 0) : true
  }

  function _setPreivewStyle(style, target) {
    if (style) {
      var colorItem
      if (style.backColor) {
        colorItem = designer.ColorHelper.parse(style.backColor, designer.wrapper.spread.getActiveSheet().currentTheme().colors())
        target.css('background-color', colorItem.color)
      }
      if (style.border) {
        target.css('border', style.border)
      }
      if (style.foreColor) {
        colorItem = designer.ColorHelper.parse(style.foreColor, designer.wrapper.spread.getActiveSheet().currentTheme().colors())
        target.css('color', colorItem.color)
      }
      if (style.font) {
        if (style.themeFont) {
          style.font = composeFont(style.font, designer.util.getThemeFont(style.themeFont))
        }
        target.css('font', style.font)
      }
      if (style.borderLeft) {
        target.css('border-left', _getCSSBorder(style.borderLeft))
      }
      if (style.borderRight) {
        target.css('border-right', _getCSSBorder(style.borderRight))
      }
      if (style.borderBottom) {
        target.css('border-bottom', _getCSSBorder(style.borderBottom))
      }
      if (style.borderTop) {
        target.css('border-top', _getCSSBorder(style.borderTop))
      }
      if (style.textAlign) {
        target.css('text-align', style.textAlign)
      }
      if (style.textDecoration) {
        if (!isNaN(style.textDecoration)) {
          target.css('text-decoration', designer.util.toCSSTextDecoration(style.textDecoration))
        } else {
          target.css('text-decoration', style.textDecoration)
        }
      }
    }
  }

  // event
  var cellStylefFormatDialog
  var modifyStyle
  var selectedStyleName
  var selectedParent
  var cellStyleSelectItem = function(evt, ui) {
    var cellStyleSpread = designer.wrapper.spread
    var cellStyleSheet = cellStyleSpread.getActiveSheet()
    switch (ui.item[0].id) {
    case 'cellstyle-modify':
      if (!cellStylefFormatDialog) {
        cellStylefFormatDialog = new designer.FormatDialog()
      }
      $('#cell-styles-popup').gcuipopup('hide')
      _addNamedStyle(selectedStyleName, designer.wrapper.spread)
      modifyStyle = cellStyleSpread.getNamedStyle(selectedStyleName)
      cellStylefFormatDialog.open('numbers', undefined, modifyStyle, true) // for format dialog open, rewrite the setting.
      cellStylefFormatDialog.setFormatDirectly(false) // don't set style for spread directly, instead, to trigger okClicked event.
      $(cellStylefFormatDialog).on('okClicked', function(e, args) {
        if (designer.CellStyleDialog.existedCustomCellStyle.hasOwnProperty(selectedStyleName)) {
          $.extend(designer.CellStyleDialog.existedCustomCellStyle[selectedStyleName], args)
        } else if (designer.CellStyleDialog.buildInCellStyle.hasOwnProperty(selectedStyleName)) {
          $.extend(designer.CellStyleDialog.buildInCellStyle[selectedStyleName], args)
        }
        var sheets = cellStyleSpread.sheets
        for (var i = 0; i < sheets.length; i++) {
          if (sheets[i].getNamedStyle(selectedStyleName)) {
            $.extend(sheets[i].getNamedStyle(selectedStyleName), args)
          }
        }
        if (cellStyleSpread.getNamedStyle(selectedStyleName)) {
          $.extend(cellStyleSpread.getNamedStyle(selectedStyleName), args)
        }
        cellStyleSheet.repaint()
        var cssStyle = {}
        _convertToCSSStyle(cssStyle, args)
        _setPreivewStyle(cssStyle, $(selectedParent).children())
        designer.actions.isFileModified = true // remind user file is modified.
      })
      break
    case 'cellstyle-delete':
      $(selectedParent).remove()
      if (designer.CellStyleDialog.existedCustomCellStyle.hasOwnProperty(selectedStyleName)) {
        delete designer.CellStyleDialog.existedCustomCellStyle[selectedStyleName]
        if (_isEmptyObject(designer.CellStyleDialog.existedCustomCellStyle)) {
          $('.cell-style-custom-li').addClass('hidden')
          $('.custom-cell-styles-preview').parent().addClass('hidden')
        }
      } else if (designer.CellStyleDialog.buildInCellStyle.hasOwnProperty(selectedStyleName)) {
        delete designer.CellStyleDialog.buildInCellStyle[selectedStyleName]
      }
      if (cellStyleSheet.getNamedStyle(selectedStyleName)) {
        cellStyleSheet.removeNamedStyle(selectedStyleName)
      }
      if (cellStyleSpread.getNamedStyle(selectedStyleName)) {
        cellStyleSpread.removeNamedStyle(selectedStyleName)
      }
      designer.actions.isFileModified = true // remind user file is modified.
      break
    default:
      break
    }
  }

  function cellStyleMouseEnter(e) {
    var o = e.srcElement || e.target
    var parent = o.parentElement
    var ele = parent
    $(ele).addClass('ui-state-hover')
  }

  function cellStyleMouseOut(e) {
    var o = e.srcElement || e.target
    var parent = o.parentElement
    var ele = parent
    $(ele).removeClass('ui-state-hover')
  }

  function cellStyleClick(e) {
    var o = e.srcElement || e.target
    var ele = o.parentElement
    var styleName
    if (ele.title) {
      styleName = ele.title
    } else {
      styleName = ele.innerText
    }

    designer.actions.doAction('baseDialogCommand', designer.wrapper.spread, {
      value: { styleName: styleName },
      execute: designer.spreadActions.dialogAction.addAndSetStyleByName
    })
    $('#cell-styles-popup').gcuipopup('hide')
  }

  function _addNamedStyle(name, spread) {
    var key = name.toLowerCase()
    if (!spread.getNamedStyle(name)) {
      if (designer.CellStyleDialog.buildInCellStyle.hasOwnProperty(key)) {
        designer.actions.doAction('addNamedStyle', spread, designer.CellStyleDialog.buildInCellStyle[key])
      } else if (designer.CellStyleDialog.existedCustomCellStyle.hasOwnProperty(key)) {
        designer.actions.doAction('addNamedStyle', spread, designer.CellStyleDialog.existedCustomCellStyle[key])
      }
    }
  }

  function cellStyleContextMenu(e) {
    var o = e.srcElement || e.target
    selectedParent = o.parentElement
    selectedStyleName = $(selectedParent).attr('data-name').toLowerCase()

    $('#cellstyle-menu-container').css({
      'position': 'absolute',
      'top': e.offsetY,
      'left': e.offsetX
    })

    $('.cellstyle-menu').removeClass('hidden')
    $('.cellstyle-menu').position({
      my: 'left top',
      of: e
    })
    designer.util.cancelDefault(e)
  }

  ribbon.cellStyleDialog
  function _attchCellStyleEvent() {
    $('.new-cell-style-text').unbind()
    $('.cell-style-symbol').unbind()

    $('.cellstyle-menu').menu({ select: cellStyleSelectItem })
    $('.cell-style-symbol').bind('mouseenter', cellStyleMouseEnter)
    $('.cell-style-symbol').bind('mouseout', cellStyleMouseOut)
    $('.cell-style-symbol').bind('click', cellStyleClick)
    $('.cell-style-symbol').bind('contextmenu', cellStyleContextMenu)

    $('.new-cell-style-text, .new-cell-style-button').bind('mouseout', function() {
      $('.new-cell-style-text').removeClass('ui-state-hover')
    })
    $('.new-cell-style-text, .new-cell-style-button').bind('mouseenter', function() {
      $('.new-cell-style-text').addClass('ui-state-hover')
    })
    $('.new-cell-style-button').bind('click', function() {
      $('#cell-styles-popup').gcuipopup('hide')
      if (ribbon.cellStyleDialog === undefined) {
        ribbon.cellStyleDialog = new designer.CellStyleDialog()
      }
      ribbon.cellStyleDialog.open()
    })

    $(document).bind('mouseup', function(e) {
      if (e.button !== 2 && (!$('.cellstyle-menu').hasClass('hidden'))) {
        $('.cellstyle-menu').addClass('hidden')
      }
    })
  }

  function _reAttachCustomCellStyleEvent() {
    $('.custom-cell-style-symbol').unbind()
    $('.custom-cell-style-symbol').bind('mouseenter', cellStyleMouseEnter)
    $('.custom-cell-style-symbol').bind('mouseout', cellStyleMouseOut)
    $('.custom-cell-style-symbol').bind('click', cellStyleClick)
    $('.custom-cell-style-symbol').bind('contextmenu', cellStyleContextMenu)
  }

  function _initTableFormat() {
    var lightCount = 21
    var mediumCount = 28
    var darkCount = 11
    var customCount = 7
    var formatTableDialog
    _createTableFormat('custom-preview', 'custom', customCount)
    _createTableFormat('light-preview', 'light', lightCount)
    _createTableFormat('medium-preview', 'medium', mediumCount)
    _createTableFormat('dark-preview', 'dark', darkCount)

    $('.table-format-preview, .table-format-preview-button').mouseenter(function(e) {
      var o = (e.srcElement || e.target)
      var $span = $(o).closest('button').find('span.container-span')
      if (!$span.children().hasClass('hiddenCustomStyle')) {
        $span.addClass('ui-state-hover')
      }
    })
    $('.table-format-preview, .table-format-preview-button').mouseout(function(e) {
      var o = (e.srcElement || e.target)
      $(o).closest('button').find('span.container-span').removeClass('ui-state-hover')
    })
    $('.table-format-preview-button').mouseup(function(e) {
      var spread = designer.wrapper.spread
      var o = e.srcElement || e.target
      var ele = ($(o).closest('button').find('span span')[0])
      var className = ele.className
      var style = ''
      var styles = className.split(' ')
      for (var i = 0; i < styles.length; i++) {
        if (styles[i].indexOf('table-format') === -1) {
          style = styles[i]
          break
        }
      }
      if (style.indexOf('custom') === -1) {
        designer.actions.doAction('formatAsTable', spread, Sheets.Tables.TableThemes[style])
        updateTable()
      } else {
        var arr = designer.FormatTableDialog.customTableStyle
        for (var name in arr) { /* NOSONAR: Forin*/
          var customPrefix = name.substring(0, name.indexOf('-'))
          if (customPrefix === style) {
            designer.actions.doAction('formatAsTable', spread, arr[name])
            updateTable()
          }
        }
      }
      $('#format-table-popup').gcuipopup('hide')
    })
    $('.new-table-style').click(function() {
      $('#format-table-popup').gcuipopup('hide')
      if (formatTableDialog === undefined) {
        formatTableDialog = new designer.FormatTableDialog()
      } else {
        formatTableDialog.refresh()
      }
      formatTableDialog.open()
    }).mouseenter(function() {
      $(this).css('background', '#DBDBDB')
    }).mouseleave(function() {
      $(this).css('background', 'white')
    })
  }

  function _showCustomIcon() {
    var position = 1
    for (var name in designer.FormatTableDialog.customTableStyle) {
      if (name) {
        var customPrefix = name.substring(0, name.indexOf('-'))
        $('.custom-format-table').css('display', 'block')
        var spanClass = 'table-format-' + customPrefix
        $('.' + spanClass).css('display', 'inline-block').removeClass('hiddenCustomStyle')
        _addCustomIConTip(name, position)
        position++
      } else {
        $('.custom-format-table').css('display', 'none')
      }
    }
  }

  function _addCustomIConTip(name, position) {
    var formatType = 'custom'
    var tableFormatClassPrefix = 'table-format-'
    var formatClass = tableFormatClassPrefix + formatType + position
    var tableStyleName = name.substring(name.indexOf('-') + 1)
    $('.' + formatClass).attr('title', tableStyleName)
  }

  function _createTableFormat(previewClass, formatType, formatTypeNumber) {
    var tableFormatClassPrefix = 'table-format-'
    var commonClass = 'table-format-preview'
    var formatSpan
    for (var i = 1; i <= formatTypeNumber; i++) {
      var formatClass = tableFormatClassPrefix + formatType + i
      if (formatType === 'custom') {
        formatSpan = $('<span></span>').addClass(formatClass + ' ' + commonClass + ' ' + formatType + i).addClass('hiddenCustomStyle')
      } else {
        formatSpan = $('<span></span>').attr('title', formatType + i).addClass(formatClass + ' ' + commonClass + ' ' + formatType + i)
      }
      var formatContainer = $('<span></span>').append(formatSpan).addClass(formatClass + '-container' + ' ' + 'container-span')
      $('<button></button>').append(formatContainer).addClass(formatClass + '-button' + ' ' + commonClass + '-button').appendTo($('.' + previewClass))
    }
  }

  function updateRibbonBarStyle() {
    updateUndoRedo()
    updateCellStyle()
    updateFormat()
    updateMerge()
    updateSparkline()
    updateTable()
    updateShowHide()
    updateProtectLock()
    hideSlicerTab()
    resetSpreadNamedStyle()
    exitTemplateDesignMode()
    isModified = false
  }

  ribbon.updateRibbonBarStyle = updateRibbonBarStyle

  function validationError(args) {
    var oldValue = args.sheet.getValue(args.row, args.col)
    var validator = args.validator
    var errorTitle = validator.errorTitle()
    var errorMessage = validator.errorMessage()
    if (!errorTitle) {
      errorTitle = designer.res.title
    }
    if (validator.showErrorMessage()) {
      args.validationResult = 0 /* ForceApply */
      if (validator.errorStyle() === 0 /* Stop */) {
        if (!errorMessage) {
          errorMessage = designer.res.dataValidationDialog.errorMessage1
        }
        designer.MessageBox.show(errorMessage, errorTitle, 3 /* error */, 1 /* okCancel */, function(e, dialogResult) {
          switch (dialogResult) {
          case 1 /* ok */
            :
            // Simulate Retry
            args.sheet.setActiveCell(args.row, args.col)
            args.sheet.setValue(args.row, args.col, oldValue)
            args.sheet.startEdit(true)
            break
          case 4 /* cancel */
            :
            // Simulate Discard
            args.sheet.setValue(args.row, args.col, oldValue)
            break
          }
        })
      }

      if (validator.errorStyle() === 1 /* Warning */) {
        if (!errorMessage) {
          errorMessage = designer.res.dataValidationDialog.errorMessage2
        }
        designer.MessageBox.show(errorMessage, errorTitle, 2 /* warning */, 2 /* yesNoCancel */, function(e, dialogResult) {
          switch (dialogResult) {
          case 2 /* yes */
            :
            break
          case 3 /* no */
            :
            // Simulate Retry
            args.sheet.setActiveCell(args.row, args.col)
            args.sheet.setValue(args.row, args.col, oldValue)
            args.sheet.startEdit(true)
            break
          case 4 /* cancel */
            :
            // Simulate Discard
            args.sheet.setValue(args.row, args.col, oldValue)
            break
          }
        })
      }

      if (validator.errorStyle() === 2 /* Information */) {
        if (!errorMessage) {
          errorMessage = designer.res.dataValidationDialog.errorMessage1
        }
        designer.MessageBox.show(errorMessage, errorTitle, 1 /* info */, 1 /* okCancel */, function(e, dialogResult) {
          switch (dialogResult) {
          case 1 /* ok */
            :
            break
          case 4 /* cancel */
            :
            // Simulate Discard
            args.sheet.setValue(args.row, args.col, oldValue)
            break
          }
        })
      }
    } else {
      args.validationResult = 0 /* ForceApply */
    }
  }

  ribbon.validationError = validationError

  // flag to avoid bind event multi-times
  ribbon.eventAttached = false

  function attachEvent(rebind) {
    if (!rebind && ribbon.eventAttached) {
      return
    }

    var isRibbonDirty
    var isMergeDirty
    var spread = designer.wrapper.spread,
      host = spread.getHost(),
      spreadElement = designer.wrapper.spreadElement

    function onSpreadEnterCell(event, data) {
      isRibbonDirty = true

      setTimeout(function() {
        if (isRibbonDirty) {
          isRibbonDirty = false
          updateCellStyle()
          updateFormat()
          updateSparkline()
          hideShapeTab()
          updateTable()
          hideChartTab()
          updateProtectLock()
          hideSlicerTab()
          hideShowRibbonPasteItem()
          hideSliderPanel()
        }
      }, 100)
    }

    function hideSliderPanel() {
      var sliderPanel = $('.slider-panel')
      if ($('.slider-panel-panel2', sliderPanel).is(':visible')) {
        sliderPanel.sliderpanel('close', 'panel2')
      }
    }

    spread.bind(Sheets.Events.EnterCell, onSpreadEnterCell)
    spreadElement.bind(Sheets.Events.EnterCell, onSpreadEnterCell)

    function onSpreadSelectionChanged(event, data) {
      isMergeDirty = true
      setTimeout(function() {
        if (isMergeDirty) {
          isMergeDirty = false
          updateMerge()
        }
      }, 100)
    }

    spread.bind(Sheets.Events.SelectionChanged, onSpreadSelectionChanged)
    spreadElement.bind(Sheets.Events.SelectionChanged, onSpreadSelectionChanged)

    updateUndoRedo()
    spread.bind(Sheets.Events.ActiveSheetChanged, function(event, data) {
      updateShowHide()
      updateZoomToStatusBar()
    })
    spread.bind(Sheets.Events.EditorStatusChanged, function(event, data) {
      var editStatus = $('.statusBar').find('.statusbar-edit-status')
      switch (data.newStatus) {
      case 2 /* Edit */
        :
        editStatus.text(designer.res.statusBar.edit)
        break
      case 1 /* Enter */
        :
        editStatus.text(designer.res.statusBar.enter)
        break
      case 0 /* Ready */
        :
        editStatus.text(designer.res.statusBar.ready)
        break
      }
    })

    spread.bind(Sheets.Events.UserZooming, function(event, data) {
      updateZoomToStatusBar()
    })

    spread.bind(Sheets.Events.ValidationError, function(event, args) {
      validationError(args)
    })

    spread.bind(GC.Spread.Sheets.Events.SlicerChanged, function(event, args) {
      bindSlicerEvents(args.sheet, args.slicer, args.propertyName)
    })

    spread.bind(GC.Spread.Sheets.Events.FloatingObjectChanged, function(event, args) {
      var floatingObject = args.floatingObject
      if (floatingObject && floatingObject instanceof Sheets.Charts.Chart) {
        bindChartEvents(args.sheet, floatingObject, args.propertyName)
      }
    })

    function clickAction(e) {
      var sheet = designer.wrapper.spread.getActiveSheet()
      var selectShapes = shapeHelper.getActiveShapes(sheet)
      if (selectShapes.length !== 0) {
        shapeSliderPanel.refreshSliderPanel(selectShapes)
      }
      updateShapeTab(selectShapes)
    }
    function dbAction(e) {
      shapeClicked()
    }
    host.addEventListener('click', clickAction)
    host.addEventListener('dblclick', dbAction)
    spread.bind(GC.Spread.Sheets.Events.FloatingObjectRemoved, function(event, args) {
      hideSliderPanel()
    })
    spread.bind(GC.Spread.Sheets.Events.ShapeRemoved, function(e, info) {
      hideShapeTab()
      hideSliderPanel()
    })

    spread.bind(GC.Spread.Sheets.Events.ChartClicked, chartClicked)

    // only need bind once for other items except spread
    if (!ribbon.eventAttached) {
      $(designer).bind('updateRibbon', function(event, data) {
        updateCellStyle()
      })

      $('.designer-table-name').blur(function() {
        designer.actions.doAction('setTableName', designer.wrapper.spread, $(this).val())
      })
    }

    ribbon.eventAttached = true

    designer.util.bindDesignerEvent('chartChanged', function(name, data) {
      chartSliderPanel.refreshSliderPanel(data)
    })
    designer.util.bindDesignerEvent('shapeChanged', function() {
      var sheet = designer.wrapper.spread.getActiveSheet()
      var selectShapes = shapeHelper.getActiveShapes(sheet)
      shapeSliderPanel.refreshSliderPanel(selectShapes)
    })
  }

  ribbon.attachEvent = attachEvent

  // #region BindingPath Popup
  var isMouseCaptured = false
  var relatedTable
  var detailsPosition = { row: 0, col: 0 }

  function _attachEvent() {
    // event
    var selectionChangedBindingPath = Sheets.Events.SelectionChanged + '.bindingPath'
    var clickIndicator = 'click.indicator'
    var clickOK = 'click.ok'
    var clickCancel = 'click.cancel'
    var topRowChangedBindingPath = Sheets.Events.TopRowChanged + '.bindingPath'
    var clickAuto = 'click.autoGenetateColumns'
    var clickDataFieldType = 'click.dataFieldType'

    // dom element
    var tableBindingSpread = designer.wrapper.spread
    var indicator = $('.designer-data-binding-icon')
    var okButton = $('.ok-table-binding-button')
    var cancelButton = $('.cancel-table-binding-button')
    var bindingPathSheet = designer.wrapper.spread.getActiveSheet()
    var autoInput = $('.auto-generate-columns')
    var dataFieldTypeButton = $('.data-binding-celltype-button')

    // unbind
    _detachEvent()

    // bind
    dataFieldTypeButton.bind(clickDataFieldType, function(event, data) {
      $('.data-binding-celltype-option').gcuipopup('hide')
      var node
      var ztreeObj = $.fn.zTree.getZTreeObj('ztree-container')
      if (ztreeObj) {
        var nodes = ztreeObj.getSelectedNodes()
        if (nodes && nodes.length >= 0) {
          node = nodes[0]
        }
      }
      if (!node) {
        return
      }
      var dataFieldType = $(this).data('datafieldtype')
      var container = $('#' + node.tId + '_a')
      if (dataFieldType && container.length > 0) {
        container.find('.' + buttonCommonClass).remove()
        node.dataFieldType = dataFieldType
        var specialTypeClass = dataFieldType + '-icon'
        var typeStr = '<span class=\'button ' + buttonCommonClass + ' ' + specialTypeClass + '\' title=\'' + designer.res.ribbon.data[dataFieldType] + '\'></span>'
        container.prepend(typeStr)
        if (dataFieldType === designer.util.DataFieldType.table || dataFieldType === designer.util.DataFieldType.combox) {
          _refreshSchemaTreeView('ztree-container', node.children)
        }
      }
    })
    tableBindingSpread.bind(selectionChangedBindingPath, function(event, data) {
      _refreshBindingPathIndicator()
    })
    indicator.bind(clickIndicator, function(event) {
      var sheet = designer.wrapper.spread.getActiveSheet()
      if (!sheet) {
        return
      }
      var table = sheet.tables.find(sheet.getActiveRowIndex(), sheet.getActiveColumnIndex())
      if (!table) {
        return
      }
      relatedTable = table
      // UI
      var dataBindingPopup = $('#data-binding-setting-popup')
      dataBindingPopup.gcuipopup({
        autoHide: true,
        showing: function(e, args) {
          $('.data-binding-path-overlay').removeAttr('hidden')
          dataBindingPopup.removeAttr('hidden')
        },
        hiding: function(e, args) {
          $('.data-binding-path-overlay').attr('hidden', 'hidden')
          dataBindingPopup.attr('hidden', 'hidden')
        }
      })
      dataBindingPopup.gcuipopup('show')
      dataBindingPopup.offset({
        top: $(this).offset().top + 8,
        left: $(this).offset().left + 8
      })

      // Value
      var isAuto = table.autoGenerateColumns()
      $('.auto-generate-columns').prop('checked', isAuto)
      var bindingPathInput = $('.table-binding-path-input')
      if (bindingPathInput.length > 0) {
        var tableBindingPath = table.bindingPath()
        if (!tableBindingPath) {
          tableBindingPath = null
        }
        bindingPathInput.val(tableBindingPath)
      }
      var dataFieldContainer = $('.table-column-data-field')
      dataFieldContainer.empty()
      var documentFragment = $(document.createDocumentFragment())

      // create select
      var datafieldCount = 0
      var ztreeObj = $.fn.zTree.getZTreeObj('ztree-container')
      var tableBindingPathArray = bindingPathInput.val().split('.')
      var treeNode = ztreeObj.getNodeByParam('name', tableBindingPathArray[tableBindingPathArray.length - 1])
      if (treeNode && treeNode.children && treeNode.dataFieldType === designer.util.DataFieldType.table) {
        datafieldCount = treeNode.children.length
      }
      var select = $('<select>').addClass('data-field-select')
      for (var c = 0; c <= datafieldCount; c++) {
        if (treeNode && treeNode.children) {
          var child = treeNode.children[c]
          if (child && child.name) {
            $('<option>').val(child.name).text(child.name).appendTo(select)
          }
        }
        if (c === datafieldCount) {
          $('<option>').val('(empty)').text('(empty)').appendTo(select)
        }
      }

      var range = table.range()
      if (range) {
        var length = range.colCount
        for (var i = 0; i < length; i++) {
          var datafield = table.getColumnDataField(i)
          var dataFieldDiv = $('<div>').addClass('data-field-container').appendTo(documentFragment)
          $('<label>').addClass('data-field-block1').text('Column' + i + ': ').appendTo(dataFieldDiv)
          var newSelect = select.clone()
          if (isAuto) {
            newSelect.attr('disabled', 'disabled')
          }
          var selectedOption = newSelect.find('option[value=' + datafield + ']')
          if (selectedOption.length !== 0) {
            selectedOption.attr('selected', 'selected')
          } else {
            newSelect.find('option[value=\'(empty)\']').attr('selected', 'selected')
          }

          newSelect.appendTo(dataFieldDiv)
        }
        documentFragment.appendTo(dataFieldContainer)
      }
    })
    okButton.bind(clickOK, function(evt) {
      $('#data-binding-setting-popup').gcuipopup('hide')
      var selects = $('.data-field-select')
      var length = selects.length
      if (length <= 0) {
        return
      }
      var table = relatedTable
      if (!table) {
        return
      }
      var sheet = designer.wrapper.spread.getActiveSheet()
      if (!sheet) {
        return
      }
      var columns = []
      var i, tableColumnInfo
      for (i = 0; i < length; i++) {
        tableColumnInfo = new Sheets.Tables.TableColumn(i)
        var value = $(selects[i]).val()
        if (!value || value === '(empty)') {
          value = null
        }
        tableColumnInfo.dataField(value)
        tableColumnInfo.name(value)
        columns.push(tableColumnInfo)
      }
      table.bindColumns(columns)

      // auto generate columns
      var isAuto = $('.auto-generate-columns').prop('checked')
      if (isAuto) {
        var tableRowCount = table.endRow() - table.startRow() + 1
        var tableColumnCount = table.endColumn() - table.startColumn() + 1
        var ztreeObj = $.fn.zTree.getZTreeObj('ztree-container')
        if (!ztreeObj) {
          return
        }
        var bindingPathInput = $('.table-binding-path-input')
        var datafields = _getDataField(bindingPathInput.val())
        var expectedColumnCount = datafields.length
        if (expectedColumnCount !== tableColumnCount) {
          designer.MessageBox.show(designer.res.ribbon.data.warningTable, designer.res.title, 2 /* warning */, 1 /* okCancel */, function(event, result) {
            if (result === 1 /* ok */) {
              table.autoGenerateColumns(isAuto)
              columns = []
              for (i = 0; i < expectedColumnCount; i++) {
                tableColumnInfo = new Sheets.Tables.TableColumn(i)
                tableColumnInfo.dataField(datafields[i])
                tableColumnInfo.name(datafields[i])
                columns.push(tableColumnInfo)
              }
              sheet.tables.resize(table, new Sheets.Range(table.startRow(), table.startColumn(), tableRowCount, expectedColumnCount))
              table.bindColumns(columns)
              _refreshBindingPathIndicator()
              sheet.repaint()
              return
            }
          })
        }
      }
      table.autoGenerateColumns(isAuto)
      sheet.repaint()
    })
    cancelButton.bind(clickCancel, function(event) {
      $('#data-binding-setting-popup').gcuipopup('hide')
    })
    bindingPathSheet.bind(topRowChangedBindingPath, function(event, data) {
      _refreshBindingPathIndicator()
    })
    autoInput.bind(clickAuto, function(event, data) {
      var select = $('.data-field-select')
      if (select.length <= 0) {
        return
      }
      var isAuto = $(this).prop('checked')
      if (isAuto) {
        select.attr('disabled', 'disabled')
      } else {
        select.removeAttr('disabled')
      }
    })
  }

  function _detachEvent() {
    // event
    var selectionChangedBindingPath = Sheets.Events.SelectionChanged + '.bindingPath'
    var clickIndicator = 'click.indicator'
    var clickOK = 'click.ok'
    var clickCancel = 'click.cancel'
    var topRowChangedBindingPath = Sheets.Events.TopRowChanged + '.bindingPath'
    var clickAuto = 'click.autoGenetateColumns'
    var clickDataFieldType = 'click.dataFieldType'

    // dom element
    var tableBindingSpread = designer.wrapper.spread
    var indicator = $('.designer-data-binding-icon')
    var okButton = $('.ok-table-binding-button')
    var cancelButton = $('.cancel-table-binding-button')
    var bindingPathSheet = designer.wrapper.spread.getActiveSheet()
    var autoInput = $('.auto-generate-columns')
    var dataFieldTypeButton = $('.data-binding-celltype-button')

    // unbind
    tableBindingSpread.unbind(selectionChangedBindingPath)
    indicator.unbind(clickIndicator)
    okButton.unbind(clickOK)
    cancelButton.unbind(clickCancel)
    bindingPathSheet.unbind(topRowChangedBindingPath)
    autoInput.unbind(clickAuto)
    dataFieldTypeButton.unbind(clickDataFieldType)
  }

  function _refreshBindingPathIndicator() {
    var sheet = designer.wrapper.spread.getActiveSheet()
    if (!sheet) {
      return
    }
    var indicator = $('#data-binding-setting-indicator')
    var row = sheet.getActiveRowIndex()
    var column = sheet.getActiveColumnIndex()
    var table = sheet.tables.find(row, column)
    if (table) {
      var bindingPath = table.bindingPath()
      if (bindingPath !== null && bindingPath !== undefined && bindingPath !== '') {
        var range = table.range()
        var rects = _getSpecifiedRect(range)
        var cellRects = _getSpecifiedRect(new Sheets.Range(row, column, 1, 1))
        if (rects.length === 0) {
          indicator.attr('hidden', 'hidden')
        }
        if (cellRects.length === 0) {
          return
        }
        var rect = cellRects[0]
        for (var i = 0; i < rects.length; i++) {
          var sr = rects[i]
          if ((sr.x <= rect.x) && (rect.x + rect.width <= sr.x + sr.width) && (sr.y <= rect.y) && (rect.y + rect.height <= sr.y + sr.height)) {
            indicator.css({
              'left': sr.x + sr.width - indicator.width(),
              'top': sr.y
            }).removeAttr('hidden')
            return
          }
        }
      }
    }
    indicator.attr('hidden', 'hidden')
  }

  function _clearSelectionBindingPath() {
    var sheet = designer.wrapper.spread.getActiveSheet()
    if (!sheet) {
      return
    }
    var selections = sheet.getSelections()
    var rowCount = sheet.getRowCount()
    var colCount = sheet.getColumnCount()
    for (var k = 0; k < selections.length; k++) {
      var selection = selections[k]
      var row = selection.row
      var col = selection.col
      var i, j
      if (selection.col === -1 && selection.row === -1) {
        for (i = 0; i < rowCount; i++) {
          for (j = 0; j < colCount; j++) {
            _clearBindingPath(i, j)
          }
        }
      } else if (selection.row === -1) {
        for (i = 0; i < rowCount; i++) {
          for (j = col; j < col + selection.colCount; j++) {
            _clearBindingPath(i, j)
          }
        }
      } else if (selection.col === -1) {
        for (i = row; i < row + selection.rowCount; i++) {
          for (j = 0; j < colCount; j++) {
            _clearBindingPath(i, j)
          }
        }
      } else {
        for (i = row; i < row + selection.rowCount; i++) {
          for (j = col; j < col + selection.colCount; j++) {
            _clearBindingPath(i, j)
          }
        }
      }
    }
  }

  function _clearBindingPath(row, col) {
    var sheet = designer.wrapper.spread.getActiveSheet()
    if (!sheet) {
      return
    }
    var table = sheet.tables.find(row, col)
    if (table && table.bindingPath()) {
      table.bindingPath(null)
    }
    if (sheet.getBindingPath(row, col)) {
      sheet.setBindingPath(row, col, null)
    }
  }

  function _loadDataSource() {
    var dialogInfo = {
      title: designer.res.ribbon.data.loadSchema,
      nameFilters: [
        designer.res.ribbon.data.loadDataSourceFilter.json,
        designer.res.ribbon.data.loadDataSourceFilter.txt
      ]
    }
    var callback = function(result) {
      if (result.status === 'cancelled') {
        return
      }
      _openBindingPathData(result)
    }
    app.showOpenDialog(dialogInfo, callback)
  }

  function _markObjectArray(node) {
    if ($.isArray(node)) {
      $.each(node, function(index, subNode) {
        _markObjectArray(subNode)
      })
    } else if (node['children'] && $.isArray(node['children'])) {
      $.each(node.children, function(index, subNode) {
        _markObjectArray(subNode)
      })
    }
    if (node['isArray']) {
      node.type = 'array'
    }
  }

  function _saveDataSource() {
    var dialogInfo = {
      title: designer.res.ribbon.data.saveSchema,
      nameFilters: [
        designer.res.ribbon.data.saveDataSourceFilter.json
      ]
    }
    var callback = function(result) {
      if (result.status === 'cancelled') {
        return
      }
      var zTree = $.fn.zTree.getZTreeObj('ztree-container')
      var zTreeRootNode = zTree.getNodesByParam('level', 0)[0]
      var parent = []
      if (zTreeRootNode.children) {
        treeNodeToArray(zTreeRootNode.children, parent)
      }

      app.save(result.fileName, JSON.stringify(designer.util.saveJSONSchema(parent)), function(data) {
        if (data.status === 'failed') {
          designer.MessageBox.show(data.message, designer.res.title, 3 /* error */)
        }
      }, false)
    }
    app.showSaveDialog(dialogInfo, callback)
  }

  function _openBindingPathData(result) {
    if (result.status === 'failed') {
      designer.MessageBox.show(result.message, designer.res.title, 3 /* error */)
    } else {
      try {
        var data = JSON.parse(result.data)
        if ($('#' + ztContainer).length === 0) {
          initDesignModeSliderPanel()
        }

        var zTreeNode = []
        if (data['$schema']) {
          zTreeNode = designer.util.parseJsonSchema(data)
        } else if ($.isArray(data)) {
          if (_isNativeTreeViewJSON(data)) {
            data.splice(data.length - 1)
            _markObjectArray(data)
            zTreeNode = data
          } else {
            _genZtreeNode(data[0], zTreeNode) // keep the real data source.
          }
        } else {
          _genZtreeNode(data, zTreeNode)
          originalDataSource = new Sheets.Bindings.CellBindingSource(data) // keep the real data source.
        }
        var source = { name: 'Source' }
        if (zTreeNode.length > 0) {
          source['children'] = zTreeNode
        }
        _initZTree(ztContainer, [source], true)
        _refreshSchemaTreeView(ztContainer)
      } catch (e) {
        designer.MessageBox.show(designer.res.ribbon.data.loadDataError, designer.res.title, 3 /* error */)
      }
    }
  }

  function _isNativeTreeViewJSON(jsonObj) {
    var length = jsonObj.length
    if (length === 0) {
      return false
    }
    var mark = jsonObj[length - 1]
    if (mark['designerNativeSchemaMark'] && mark['designerNativeSchemaMark'] === 1) {
      return true
    }
    return false
  }

  function _refreshSchemaTreeView(container, nodes) {
    // Mark corresponding node as corresponding icon.
    var treeObj = $.fn.zTree.getZTreeObj(container)
    if (!treeObj) {
      return
    }
    // treeObj.expandAll(true); // 树一开始全部展开
    _addMarker((nodes && nodes.length > 0) ? nodes : treeObj.getNodes())
  }

  function _addMarker(treeNodes) {
    var length = treeNodes.length
    for (var i = 0; i < length; i++) {
      var treeNode = treeNodes[i]
      _addMarkerCore(treeNode)
      if (treeNode && treeNode.children && treeNode.children.length > 0) {
        _addMarker(treeNode.children)
      }
    }
  }

  function _addMarkerCore(node) {
    // default cell type is text cell type.
    if (!node || node.level === 0) {
      // don't mark the root node
      return
    }
    var nodeDOM = $('#' + node.tId + '_a')
    if (!nodeDOM || nodeDOM.length <= 0) {
      return
    }
    if (nodeDOM.find('.' + buttonCommonClass).length > 0) {
      nodeDOM.children('.' + buttonCommonClass).remove()
    }
    if (hasTableParent(node) || hasComboxParent(node)) {
      return
    }
    var dataFieldType
    if (node.dataFieldType) {
      // Check whether dataFieldType existing firstly.
      dataFieldType = node.dataFieldType
    } else if (node['enum']) {
      dataFieldType = designer.util.DataFieldType.combox
    } else if (node.type && designer.util.DefaultTypeDic[node.type]) {
      // Then check whether node type existing.
      dataFieldType = designer.util.DefaultTypeDic[node.type]
    }
    if (!dataFieldType) {
      dataFieldType = designer.util.DataFieldType.text
    }
    var specialTypeClass = dataFieldType + '-icon'
    var typeStr = '<span class=\'button ' + buttonCommonClass + ' ' + specialTypeClass + '\' title=\'' + designer.res.ribbon.data[dataFieldType] + '\'></span>'
    nodeDOM.prepend(typeStr)
    node.dataFieldType = dataFieldType
  }

  function realTypeOf(value) {
    if (typeof value === designer.util.BasicDataType.Object) {
      if (value === null) {
        return designer.util.BasicDataType.Null
      }
      if (value.constructor === [].constructor) {
        return designer.util.BasicDataType.Array
      }
      return designer.util.BasicDataType.Object
    }
    return typeof (value)
  }

  var originalTextCellTypeGetTextLogic = Sheets.CellTypes.Text.prototype['getText']
  var originalCheckboxCellTypeGetTextLogic = Sheets.CellTypes.CheckBox.prototype['getText']
  var originalButtonCellTypeGetTextLogic = Sheets.CellTypes.Button.prototype['getText']
  var originalHyperlinkCellTypeGetTextLogic = Sheets.CellTypes.HyperLink.prototype['getText']
  var originalComboBoxCellTypeGetTextLogic = Sheets.CellTypes.ComboBox.prototype['getText']

  function _replacePaint() {
    Sheets.CellTypes.Text.prototype['getText'] = function(value, context) {
      var bp = context.sheet.getBindingPath(context.row, context.col)
      if (bp) {
        return '[' + bp + ']'
      }
      return originalTextCellTypeGetTextLogic.apply(this, arguments)
    }
    Sheets.CellTypes.CheckBox.prototype['getText'] = function(value, options) {
      var bp = options.sheet.getBindingPath(options.row, options.col)
      if (bp) {
        return '[' + bp + ']'
      } else {
        return originalCheckboxCellTypeGetTextLogic.apply(this, arguments)
      }
    }
    Sheets.CellTypes.Button.prototype['getText'] = function(value, options) {
      var bp = options.sheet.getBindingPath(options.row, options.col)
      if (bp) {
        return '[' + bp + ']'
      }
      return originalButtonCellTypeGetTextLogic.apply(this, arguments)
    }
    Sheets.CellTypes.HyperLink.prototype['getText'] = function(value, options) {
      var bp = options.sheet.getBindingPath(options.row, options.col)
      if (bp) {
        return '[' + bp + ']'
      } else {
        return originalHyperlinkCellTypeGetTextLogic.apply(this, arguments)
      }
    }
    Sheets.CellTypes.ComboBox.prototype['getText'] = function(value, options) {
      var bp = options.sheet.getBindingPath(options.row, options.col)
      if (bp) {
        return '[' + bp + ']'
      } else {
        return originalComboBoxCellTypeGetTextLogic.apply(this, arguments)
      }
    }
  }

  function _restorePaint() {
    Sheets.CellTypes.Text.prototype['getText'] = originalTextCellTypeGetTextLogic
    Sheets.CellTypes.CheckBox.prototype['getText'] = originalCheckboxCellTypeGetTextLogic
    Sheets.CellTypes.Button.prototype['getText'] = originalButtonCellTypeGetTextLogic
    Sheets.CellTypes.HyperLink.prototype['getText'] = originalHyperlinkCellTypeGetTextLogic
    Sheets.CellTypes.ComboBox.prototype['getText'] = originalComboBoxCellTypeGetTextLogic
  }

  // #endregion BindingPath Popup
  // #region ZTree
  var zNodes = []
  function _initZTree(container, data, isForce) {
    if ($.fn.zTree.getZTreeObj(container) !== null) {
      if (isForce) {
        $.fn.zTree.destroy(container)
      } else {
        return
      }
    }
    var setting = {
      view: {
        showIcon: false,
        // addHoverDom: function (treeId, treeNode) {
        //     addHoverDom(treeId, treeNode);
        // },
        removeHoverDom: removeHoverDom,
        selectedMulti: false,
        showLine: true // 显示节点之间的连线
      },
      edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false,
        drag: {
          isCopy: false, // 所有操作都是move
          isMove: true,
          prev: true,
          next: true,
          inner: true
        }
      },
      data: {
        key: {
          name: 'name',
          children: 'childFieldClassList'
        },
        simpleData: {
          enable: true,
          idKey: 'fieldClassId',
          pIdKey: 'pFieldClassId',
          rootPid: '',
          group: 'group'
        },
        keep: {
          leaf: true,
          parent: true
        }
      },
      callback: {
        onDblClick: function(event, treeId, treeNode) {
          zTreeOnDblClick(event, treeNode)
        },
        beforeDrop: function(treeId, treeNodes, targetNode, moveType) {
          return false
        },
        // beforeDrag: function zTreeBeforeDrag(treeId, treeNodes, targetNode, moveType) {
        //   // if(treeNodes[0].group === '1'){
        //   //   console.log(111111111111111111111)
        //   //   return false;
        //   // }
        //   return false
        //   console.log('id', treeId, 'nodes', treeNodes)
        // },
        onDrop: function(event, treeId, treeNodes, targetNode, moveType) {
          zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType)
        },
        onClick: function(event, treeId, treeNode) {
          console.log(designer.wrapper.spread.toJSON('{}'), treeNode)
        },
        onMouseDown: function(event, treeId, treeNode) {
          zTreeOnMouseDown(event, treeNode)
        }
        // beforeRemove: function (treeId, treeNode) {
        //     return zTreeBeforeRemove(treeId, treeNode);
        // }
      }
    }
    $('#' + container).empty()
    $.fn.zTree.init($('#' + container), setting, zNodes)
    _refreshSchemaTreeView(container)
    // input 搜索
    $('#citySel').keyup(function(e) {
      // 导航切换修改（存储字段搜索input值）
      window.sessionStorage.setItem('citySel', $('#citySel').val())
      if ($('#citySel').val().length > 0) {
        // 哪颗节点树(treeDemo)
        var treeObj = $.fn.zTree.getZTreeObj(container)
        // input 搜索的内容
        var value = $('#citySel').val()
        // 根据input中的value值 查找树中存在的字段
        var nodeList = treeObj.getNodesByParamFuzzy('name', value)
        // 取消节点的选中状态。
        treeObj.cancelSelectedNode()
        // 取消的所有节点选中状态
        var nodes = treeObj.getNodes()
        for (var j = 0; j < nodes[0].childFieldClassList.length; j++) {
          treeObj.expandNode(nodes[0].childFieldClassList[j], false, true, false)
        }
        if (value) {
          if (nodeList.length > 0) {
            for (var i = 0; i < nodeList.length; i++) {
              // 需要展开的节点
              treeObj.expandNode(nodeList[i], true, false, false)
              treeObj.selectNode(nodeList[i], true)
            }
          }
        }
      } else {
        // 字段还原
        $.fn.zTree.init($('#' + container), setting, zNodes)
      }

      // if ($('#citySel').val().length > 0) {
      //     // 字段还原
      //     $.fn.zTree.init($("#" + container), setting, zNodes);
      //     // 哪颗节点树(treeDemo)
      //     var zTree = $.fn.zTree.getZTreeObj(container);
      //     console.log('1111111', zTree)
      //     // 根据input中的value值 查找树中存在的字段
      //     var nodeList = zTree.getNodesByParamFuzzy("name", $('#citySel').val());
      //     console.log('2222222',nodeList)
      //     //将找到的nodelist节点更新至Ztree内
      //     $.fn.zTree.init($("#" + container), setting, nodeList);
      // } else {
      //     // 字段还原
      //     $.fn.zTree.init($("#" + container), setting, zNodes);
      // }
    })
    // console.log($('#citySel'))
  }

  // 树形图接口调取
  function jsonp_jquery() {
    var ticket = ''
    if (window.location.href.indexOf('?') !== -1) {
      var arrayModle = window.location.href.split('?')[1].split('&')
      var userData = '{'
      for (var key in arrayModle) {
        arrayModle[key] = arrayModle[key].replace('=', '":"')
        userData += '"' + arrayModle[key].replace('=', '":"') + '",'
      }
      userData = userData.substr(0, userData.length - 1) + '}'
      userData = JSON.parse(userData)
      ticket = userData.ticket
    }
    var url = api() + 'fieldList/searchFieldList'
    var data = ''
    $.ajax({
      type: 'GET',
      url: url,
      data: data,
      dataType: 'json',
      headers: { 'ticket': userData.ticket, 'overtime': userData.overtime, 'Content-Type': 'application/json;charset=UTF-8' },
      jsonpCallback: 'jsonpProcess', // jsonpProcess自定义函数名
      success: function(res, status, xhr) {
        zNodes = res.resultData
        console.log(res, xhr.getResponseHeader('overtime'), window.parent)
        var overtimeIframe = { overtime: xhr.getResponseHeader('overtime') }
        userData.overtime = overtimeIframe.overtime
        // iframe传参
        window.parent.postMessage(overtimeIframe, '*')
      },
      error: function(err) {
        console.log(err)
      }
    })
  }

  jsonp_jquery()
  function zTreeBeforeRemove(treeId, treeNode) {
    if (treeNode && treeNode.children && treeNode.children.length > 0) {
      designer.MessageBox.show(designer.res.ribbon.data.removeNodeWarning, designer.res.title, 2 /* warning */, 1 /* okCancel */, function(event, result) {
        var ztreeObj = $.fn.zTree.getZTreeObj('ztree-container')
        if (result === 1 /* ok */) {
          ztreeObj.removeNode(treeNode, false)
        }
      })
      return false
    } else {
      return true
    }
  }

  function showRemoveBtn(treeId, treeNode) {
    return treeNode.level !== 0
  }

  function showRenameBtn(treeId, treeNode) {
    return treeNode.level !== 0
  }

  function addHoverDom(container, treeNode) {
    var sObj = $('#' + treeNode.tId + '_span')

    // add button
    if (treeNode.editNameFlag || $('#addBtn_' + treeNode.tId).length > 0) {
      return
    }
    var addStr = '<span class=\'button add\' id=\'addBtn_' + treeNode.tId + '\' title=\'' + designer.res.ribbon.data.addNode + '\'></span>'
    sObj.after(addStr)
    var btn = $('#addBtn_' + treeNode.tId)
    if (btn) {
      btn.bind('click', function() {
        var zTree = $.fn.zTree.getZTreeObj(container)
        var newNode = zTree.addNodes(treeNode, [{ name: genNewNodeName(zTree, treeNode) }])
        zTree.cancelEditName()
        zTree.editName(newNode[0])
        _addMarkerCore(newNode[0])
        return false
      })
    }

    // select celltype button
    if ($('#arrayBtn_' + treeNode.tId).length <= 0 && treeNode.level !== 0) {
      var arrayStr = '<span class=\'button options\' id=\'arrayBtn_' + treeNode.tId + '\' title=\'' + designer.res.ribbon.data.selectOptions + '\' onfocus=\'this.blur();\'></span>'
      var containerObj = $('#' + treeNode.tId + '_a')
      containerObj.append(arrayStr)
      var arrayBtn = $('#arrayBtn_' + treeNode.tId)
      if (arrayBtn) {
        arrayBtn.bind('click', function(event) {
          var zTreeObj = $.fn.zTree.getZTreeObj(container)
          zTreeObj.selectNode(treeNode)
          var buttons = $('.data-binding-celltype-button')
          buttons.button()
          var cellTypeSettingPopup = $('.data-binding-celltype-option').gcuipopup({
            autoHide: true,
            position: { of: $('.button.options'), my: 'center top', at: 'center bottom' }
          })
          cellTypeSettingPopup.gcuipopup('show')
          return false
        })
      }
    }
    if (hasTableParent(treeNode) || hasComboxParent(treeNode)) {
      $('#addBtn_' + treeNode.tId).remove()
      $('#arrayBtn_' + treeNode.tId).remove()
    }
  }

  function genNewNodeName(zTreeObj, parent) {
    var name = 'field-'
    var length = parent.children ? parent.children.length : 0
    if (parent.level === 0) {
      name += length
    } else {
      var result = []
      result.push(length)
      while (!parent || parent.level !== 0) {
        result.splice(0, 0, zTreeObj.getNodeIndex(parent))
        parent = parent.getParentNode()
      }
      if (result.length > 0) {
        name += result.join('')
      }
    }
    return name
  }

  function removeHoverDom(treeId, treeNode) {
    $('#addBtn_' + treeNode.tId).unbind().remove()
    $('#arrayBtn_' + treeNode.tId).unbind().remove()
  }

  function zTreeOnDblClick(event, treeNode) {
    var sheet = designer.wrapper.spread.getActiveSheet()
    if (!sheet) {
      return
    }
    var selections = sheet.getSelections()
    if (selections.length <= 0) {
      return
    }
    if (!treeNode) {
      return
    }
    var sel = selections[0]
    preSetting(treeNode, sel.row, sel.col, function() {
      beginSetting(treeNode, sel.row, sel.col)
    })
  }

  function zTreeOnMouseDown(event, treeNode) {
    handleDocumentMouseMove(treeNode)
  }

  function handleDocumentMouseMove(treeNode) {
    if (!isMouseCaptured) {
      $(document).bind('mousemove.bindingPath', function(event) {
        doMouseMove(event, treeNode)
      }).bind('mouseup.bindingPath', function(event) {
        doMouseUp(event, treeNode)
      })
      isMouseCaptured = true
    }
  }

  function doMouseMove(event, treeNode) {
    // highlight area priority: tableArea > selection > cell
    var ztreeObj = $.fn.zTree.getZTreeObj('ztree-container')
    if (!ztreeObj) {
      return
    }
    var activeSheet = designer.wrapper.spread.getActiveSheet()
    var hitInfo = getHitTestInfo(event)
    if (isNaN(hitInfo.row) || isNaN(hitInfo.col)) {
      return
    }
    var rects = [], range
    var table = activeSheet.tables.find(hitInfo.row, hitInfo.col)
    var selectedNode = ztreeObj.getSelectedNodes()[0]

    if (table) {
      var tableRange = table.range()
      var startRow = tableRange.row
      var parentNode = selectedNode.getParentNode()
      if (parentNode && getBindingPath(parentNode) === table.bindingPath() && parentNode.dataFieldType === designer.util.DataFieldType.table) {
        // the data field
        range = new Sheets.Range(startRow, hitInfo.col, tableRange.rowCount, 1)
      } else {
        // the whole table
        range = tableRange
      }
      rects = _getSpecifiedRect(range)
    } else {
      if (hasTableParent(selectedNode)) {
        // To make datafield only can be set in table. So, it shouldn't highlight in common cell when drag a datafield.
        rects = []
      } else if (hasComboxParent(selectedNode) && activeSheet.getCellType(hitInfo.row, hitInfo.col).constructor !== Sheets.CellTypes.ComboBox) {
        // policy is similiar with table data field.
        rects = []
      } else {
        var selections = activeSheet.getSelections()
        if (selections && selections.length > 0) {
          range = selections[0]
          if (range.contains(hitInfo.row, hitInfo.col, 1, 1)) {
            rects = _getSpecifiedRect(range)
          } else {
            range = new Sheets.Range(hitInfo.row, hitInfo.col, 1, 1)
            rects = _getSpecifiedRect(range)
          }
        }
      }
    }
    _highlightBlock(rects)
  }

  function doMouseUp(event) {
    $(document).unbind('mousemove.bindingPath')
    $(document).unbind('mouseup.bindingPath')
    var decoration = $('.data-binding-decoration')
    decoration.remove()
    isMouseCaptured = false

    var hitTestInfo = getHitTestInfo(event)
    var row = hitTestInfo.row, col = hitTestInfo.col
    if (isNaN(row) || isNaN(col)) {
      return
    }
    var ztreeObj = $.fn.zTree.getZTreeObj('ztree-container')
    if (!ztreeObj) {
      return
    }
    var selectedNode = ztreeObj.getSelectedNodes()[0]
    preSetting(selectedNode, row, col, function() {
      beginSetting(selectedNode, row, col)
    })
  }

  function beginSetting(selectedNode, row, col) {
    var activeSheet = designer.wrapper.spread.getActiveSheet()
    if (!activeSheet) {
      return
    }
    var parentNode = selectedNode.getParentNode()
    var table = activeSheet.tables.find(row, col)
    var currentCellType = activeSheet.getCellType(row, col)
    var selection = activeSheet.getSelections()[0]
    if (selectedNode.dataFieldType && selectedNode.dataFieldType === designer.util.DataFieldType.table) {
      var bindingPathValue = getBindingPath(selectedNode)
      var datafields = _getDataField(bindingPathValue)
      if (table) {
        // set binding path for table
        _setBindingPath(table, bindingPathValue, datafields)
      } else {
        // generate table
        if (selection.contains(row, col, 1, 1)) {
          _addTableByArray(selection, bindingPathValue, datafields)
        } else {
          var newSelection = new Sheets.Range(row, col, 1, 1)
          _addTableByArray(newSelection, bindingPathValue, datafields)
        }
      }
    } else if (table && parentNode && getBindingPath(parentNode) === table.bindingPath() && parentNode.dataFieldType === designer.util.DataFieldType.table) {
      // set data field for table
      var arr = getBindingPath(selectedNode).split('.')
      _bindTableColumns(col - table.range().col, arr[arr.length - 1], table)
    } else if (currentCellType && currentCellType.constructor === Sheets.CellTypes.ComboBox && parentNode && parentNode.dataFieldType === designer.util.DataFieldType.combox) {
      var comboxItems = currentCellType.items()
      if (comboxItems.indexOf(selectedNode.name) === -1) {
        comboxItems.push(selectedNode.name)
        currentCellType.items(comboxItems)
      }
    } else {
      if (hasTableParent(selectedNode)) {
        designer.MessageBox.show(designer.res.ribbon.data.unallowableTableBindingTip, designer.res.title, 2 /* warning */, 0 /* ok */)
        return
      }
      if (hasComboxParent(selectedNode)) {
        designer.MessageBox.show(designer.res.ribbon.data.unallowComboxBindingTip, designer.res.title, 2 /* warning */, 0 /* ok */)
        return
      }
      if (selection.contains(row, col, 1, 1)) {
        detailsPosition.row = selection.row
        detailsPosition.col = selection.col
      } else {
        detailsPosition.row = row
        detailsPosition.col = col
      }
      setDetails(selectedNode)
    }
  }

  function preSetting(selectedNode, startRow, startColumn, callback) {
    // whether to overwrite some celltype
    if (!selectedNode || isNaN(startRow) || isNaN(startColumn)) {
      return
    }
    var ztreeObj = $.fn.zTree.getZTreeObj('ztree-container')
    if (!ztreeObj) {
      return
    }
    var activeSheet = designer.wrapper.spread.getActiveSheet()
    var leafNodes = ztreeObj.getNodesByFilter(isCommonNode, false, selectedNode)
    var delta = 0
    var i
    for (i = 0; i < leafNodes.length; i++) {
      var temp = leafNodes[i].level - selectedNode.level
      delta = Math.max(delta, temp)
    }
    var endColumn = isAutoGenerateLabel ? startColumn + delta + 1 : startColumn + delta
    var endRow = startRow + leafNodes.length
    var isSuccess = true
    for (i = startRow; i <= endRow; i++) {
      for (var j = startColumn; j <= endColumn; j++) {
        if (activeSheet.getCellType(i, j).constructor !== Sheets.CellTypes.Text) {
          isSuccess = false
          break
        }
      }
    }
    if (isSuccess) {
      callback()
    } else {
      designer.MessageBox.show(designer.res.ribbon.data.overwriteCellTypeWarning, designer.res.title, 2 /* warning */, 1 /* okCancel */, function(event, result) {
        if (result === 1 /* ok */) {
          callback()
        }
        return
      })
    }
  }

  function isCommonNode(node, moveType) {
    if (!node) {
      return false
    }
    if (!hasTableParent(node) && !hasComboxParent(node)) {
      return true
    } else if (moveType) {
      return (moveType === 'prev' || moveType === 'next')
    }
    return false
  }

  function hasTableParent(node) {
    var tempNode = $.extend({}, node.getParentNode())
    if (!tempNode || $.isEmptyObject(tempNode)) {
      return false
    }
    while (tempNode && tempNode.dataFieldType !== designer.util.DataFieldType.table && tempNode.level !== 0) {
      tempNode = tempNode.getParentNode()
    }
    if (tempNode && tempNode.level === 0) {
      return false
    }
    return true
  }

  function hasComboxParent(node) {
    var tempNode = $.extend({}, node.getParentNode())
    if (!tempNode || $.isEmptyObject(tempNode)) {
      return false
    }
    while (tempNode && tempNode.dataFieldType !== designer.util.DataFieldType.combox && tempNode.level !== 0) {
      tempNode = tempNode.getParentNode()
    }
    if (tempNode && tempNode.level === 0) {
      return false
    }
    return true
  }

  function setDetails(treeNode) {
    // need to check "detailsPosition"
    var ztreeObj = $.fn.zTree.getZTreeObj('ztree-container')
    if (!ztreeObj) {
      return
    }
    var selectedNode = ztreeObj.getSelectedNodes()[0]
    var delta = 0
    if (selectedNode.level === 0) {
      delta = treeNode.level - selectedNode.level - 1
    } else {
      delta = treeNode.level - selectedNode.level
    }
    var activeSheet = designer.wrapper.spread.getActiveSheet()
    var bindingPath = getBindingPath(treeNode)
    if (treeNode.dataFieldType === designer.util.DataFieldType.table) {
      // generate table by array binding path
      var datafields = _getDataField(getBindingPath(treeNode))
      var newSelection = new Sheets.Range(detailsPosition.row, detailsPosition.col + delta, 1, 1)
      var result = _addTableByArray(newSelection, bindingPath, datafields)
      if (result) {
        detailsPosition.row += 2 // default table column count is 2.
      }
      return
    } else if (treeNode.dataFieldType === designer.util.DataFieldType.combox) {
      var comboBoxCellType = new Sheets.CellTypes.ComboBox()
      var comboxItems = treeNode['enum'] ? treeNode['enum'] : _getDataField(getBindingPath(treeNode))
      if (comboxItems && comboxItems.length > 0) {
        comboBoxCellType.items(comboxItems)
      }
      if (isAutoGenerateLabel && treeNode.group !== '1') {
        activeSheet.setValue(detailsPosition.row, detailsPosition.col + delta, treeNode.name)
        var sheet = designer.wrapper.spread.getSheet(0)
        var resData = {
          getWay: treeNode,
          logicalAccess: treeNode.logicAcquisition,
          tableHeadInfo: {
            row: detailsPosition.row,
            col: detailsPosition.col + delta,
            logicalAccess: treeNode.logicAcquisition,
            name: treeNode.name
          }
        }
        sheet.setTag(detailsPosition.row, detailsPosition.col + delta, resData)
        console.log(designer.wrapper.spread.toJSON())
        // activeSheet.getCell(detailsPosition.row, detailsPosition.col + delta + 1).bindingPath(bindingPath);
        // activeSheet.setCellType(detailsPosition.row, detailsPosition.col + delta + 1, comboBoxCellType);
      } else {
        // activeSheet.getCell(detailsPosition.row, detailsPosition.col + delta).bindingPath(bindingPath);
        // activeSheet.setCellType(detailsPosition.row, detailsPosition.col + delta, comboBoxCellType);
      }
      detailsPosition.row++
      return
    }
    var subNodes = treeNode.children
    if (subNodes && subNodes.length > 0) {
      if (treeNode.level !== 0) {
        // add marks
        // activeSheet.setValue(detailsPosition.row, detailsPosition.col + delta, treeNode.name);
        // detailsPosition.row++;
      }
      for (var i = 0; i < subNodes.length; i++) {
        setDetails(subNodes[i])
      }
    } else {
      var row = 0, col = 0
      if (isAutoGenerateLabel && treeNode.group !== '1') {
        row = detailsPosition.row
        col = detailsPosition.col + delta + 1
        activeSheet.setValue(row, col - 1, treeNode.name)
        var sheet = designer.wrapper.spread.getSheet(0)
        var resData = {
          // getWay: treeNode.way,
          getWay: treeNode,
          logicalAccess: treeNode.logicAcquisition,
          tableHeadInfo: {
            row: detailsPosition.row,
            col: detailsPosition.col + delta,
            logicalAccess: treeNode.logicAcquisition,
            name: treeNode.name
          }
        }
        sheet.setTag(detailsPosition.row, detailsPosition.col + delta, resData)
        console.log(designer.wrapper.spread.toJSON())
        // activeSheet.getCell(row, col).bindingPath(bindingPath);
      } else {
        row = detailsPosition.row
        col = detailsPosition.col + delta
        // activeSheet.getCell(row, col).bindingPath(bindingPath);
      }
      detailsPosition.row++
      var cellType
      switch (treeNode.dataFieldType) {
      case designer.util.DataFieldType.button:
        cellType = new Sheets.CellTypes.Button()
        cellType.text('Button')
        break
      case designer.util.DataFieldType.checkbox:
        cellType = new Sheets.CellTypes.CheckBox()
        cellType.caption('CheckBox')
        break
      case designer.util.DataFieldType.hyperlink:
        cellType = new Sheets.CellTypes.HyperLink()
        cellType.text('Hyperlink')
        break
      default:
        break
      }
      if (cellType) {
        activeSheet.setCellType(row, col, cellType)
      }
    }
  }

  function getHitTestInfo(event) {
    var activeSheet = designer.wrapper.spread.getActiveSheet()
    if (!activeSheet) {
      return
    }
    var t = $(designer.util.getCanvas(designer.wrapper.spread)).offset()
    return activeSheet.hitTest(event.pageX - t.left, event.pageY - t.top)
  }

  function getBindingPath(treeNode) {
    var pathCache = []
    var tempNode = treeNode
    while (tempNode.level !== 0) {
      pathCache.splice(0, 0, tempNode.name)
      tempNode = tempNode.getParentNode()
    }
    return pathCache.join('.')
  }

  function zTreeBeforeDrop(treeId, treeNodes, targetNode, moveType) {
    if (targetNode === null || (moveType !== 'inner' && !targetNode.parentTId)) {
      return false
    }
    if (!isCommonNode(targetNode, moveType)) {
      return false
    }
    var nodeType = targetNode.dataFieldType
    var DataFieldType = designer.util.DataFieldType
    if ((nodeType === DataFieldType.table || nodeType === DataFieldType.combox) && treeNodes[0].children && treeNodes[0].children.length > 0) {
      // Don't allow node with children is added to table or combox.
      return false
    }
    return true
  }

  function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
    _refreshSchemaTreeView(treeId, treeNodes)
  }

  function treeNodeToArray(treeNodes, parent) {
    if (!treeNodes) {
      return
    }
    var length = treeNodes.length
    for (var i = 0; i < length; i++) {
      var node = {}
      node['name'] = treeNodes[i].name
      if (treeNodes[i].type) {
        node['type'] = treeNodes[i].type
      }
      if (treeNodes[i].dataFieldType) {
        node['dataFieldType'] = treeNodes[i].dataFieldType
      }
      if (treeNodes[i]['enum']) {
        node['enum'] = treeNodes[i]['enum']
      }
      if (treeNodes[i].children && treeNodes[i].children.length > 0) {
        node['children'] = []
        treeNodeToArray(treeNodes[i].children, node['children'])
      }
      parent.push(node)
    }
  }

  ribbon.treeNodeToArray = treeNodeToArray
  function _genZtreeNode(data, parent) {
    // format a json object to a ztree node mode.
    $.each(data, function(property, value) {
      var node = {}
      node['name'] = property
      if (realTypeOf(value) === 'array') {
        node.type = 'array'
      }
      if (realTypeOf(value) === 'object') {
        node['children'] = []
        _genZtreeNode(value, node['children'])
      }
      parent.push(node)
    })
  }

  function _getSpecifiedRect(range) {
    var sheet = designer.wrapper.spread.getActiveSheet()
    if (!sheet) {
      return
    }
    var t = $(designer.util.getCanvas(designer.wrapper.spread)).offset()
    var rects = []
    for (var r = 0; r <= 2; r++) {
      for (var c = 0; c <= 2; c++) {
        var leftColumn = sheet.getViewportLeftColumn(c)
        var rightColumn = sheet.getViewportRightColumn(c)
        var topRow = sheet.getViewportTopRow(r)
        var bottomRow = sheet.getViewportBottomRow(r)
        var ra = new Sheets.Range(topRow, leftColumn, bottomRow - topRow + 1, rightColumn - leftColumn + 1)
        var intersect = range.getIntersect(ra, Math.max(ra.rowCount, range.rowCount), Math.max(ra.colCount, range.colCount))
        if (intersect) {
          var rect = new Sheets.Rect()
          var tempRect = sheet.getRangeRect(r, c, intersect)
          rect.x = tempRect.x + t.left
          rect.y = tempRect.y + t.top
          rect.width = tempRect.width - 2
          rect.height = tempRect.height - 2
          rects.push(rect)
        }
      }
    }
    return rects
  }

  function _bindTableColumns(index, dataField, table) {
    var sheet = designer.wrapper.spread.getActiveSheet()
    if (!table || !dataField || !sheet) {
      return
    }
    var isAuto = table.autoGenerateColumns()
    if (isAuto) {
      designer.MessageBox.show(designer.res.ribbon.data.warningDataField, designer.res.title, 2 /* warning */, 1 /* okCancel */, function(event, result) {
        if (result === 4 /* cancel */) {
          return
        } else {
          table.autoGenerateColumns(false)
          table.setColumnName(index, dataField)
          table.setColumnDataField(index, dataField)
          sheet.repaint()
        }
      })
    } else {
      table.setColumnName(index, dataField)
      table.setColumnDataField(index, dataField)
      sheet.repaint()
    }
  }

  function _highlightBlock(rects) {
    var container = $('.data-binding-decoration-container')
    container.empty()
    if (!rects || rects.length <= 0) {
      return
    }
    var fragment = $(document.createDocumentFragment())
    for (var i = 0; i < rects.length; i++) {
      var decoration = $('<div>').addClass('data-binding-decoration').appendTo(fragment)
      var rect = rects[i]

      decoration.css({
        width: rect.width,
        height: rect.height,
        'display': 'inline-block'
      })
      decoration.offset({
        left: rect.x,
        top: rect.y
      })
    }
    fragment.appendTo(container)
  }

  function _getTableName() {
    var spread = designer.wrapper.spread
    var sheets = spread.sheets, count = sheets.length
    for (var i = 0; i < 100000; i++) {
      var name = 'gcTable' + i
      for (var j = 0; j < count; j++) {
        var sheet = sheets[j]
        var table = sheet.tables.findByName(name)
        if (table) {
          break
        }
        if (j === count - 1) {
          return name
        }
      }
    }
  }

  function _getDataField(parent) {
    var result = []
    if (!parent) {
      return
    }
    var ztreeObj = $.fn.zTree.getZTreeObj('ztree-container')
    if (!ztreeObj) {
      return
    }
    var parentStr
    var arr = parent.split('.')
    if (arr.length > 0) {
      parentStr = arr[arr.length - 1]
    }
    var treeNode = ztreeObj.getNodeByParam('name', parentStr)
    if (treeNode && treeNode.children) {
      for (var i = 0; i < treeNode.children.length; i++) {
        result.push(treeNode.children[i].name)
      }
    }
    return result
  }

  function _setBindingPath(table, bindingPath, datafield) {
    // When setting binding path on table, need to set data field at the same time.
    if (!table) {
      return
    }
    var sheet = designer.wrapper.spread.getActiveSheet()
    if (!sheet) {
      return
    }
    table.bindingPath(bindingPath)
    table.autoGenerateColumns(false)
    var dataFieldLength = datafield ? datafield.length : 0
    var tableColumnCount = table.endColumn() - table.startColumn() + 1
    var length = Math.max(dataFieldLength, tableColumnCount)
    var columns = []
    table.bindColumns(columns)
    if (length > 0) {
      for (var i = 0; i < length; i++) {
        var df = null
        var tableColumnInfo = new Sheets.Tables.TableColumn(i)
        if (datafield && datafield[i]) {
          df = datafield[i]
          tableColumnInfo.name(df)
        }
        tableColumnInfo.dataField(df)
        columns.push(tableColumnInfo)
      }
      table.bindColumns(columns)
    }
    _refreshBindingPathIndicator()
    sheet.repaint()
  }

  function _addTableByArray(selection, bindingPath, datafield) {
    if (!selection) {
      return
    }
    var sheet = designer.wrapper.spread.getActiveSheet()
    var length = datafield ? datafield.length : 0
    var rowCount = Math.max(2, selection.rowCount)
    var colCount = Math.max(length, selection.colCount)
    var row = selection.row === -1 ? 0 : selection.row
    var col = selection.col === -1 ? 0 : selection.col
    var table = null
    try {
      if (isAutoGenerateLabel) {
        var name = bindingPath.split('.').pop()
        sheet.setValue(row, col, name)
        var sheet = designer.wrapper.spread.getSheet(0)
        var resData = {
          // getWay: treeNode.way,
          getWay: treeNode,
          logicalAccess: treeNode.logicAcquisition,
          tableHeadInfo: {
            row: row,
            col: col,
            logicalAccess: treeNode.logicAcquisition,
            name: name
          }
        }
        sheet.setTag(row, col, resData)
        console.log(designer.wrapper.spread.toJSON())
        table = sheet.tables.add(_getTableName(), row, col + 1, rowCount, colCount)
      } else {
        table = sheet.tables.add(_getTableName(), row, col, rowCount, colCount)
      }
      _setBindingPath(table, bindingPath, datafield)
      sheet.clearSelection()
      sheet.setSelection(row, isAutoGenerateLabel ? col + 1 : col, rowCount, colCount)
    } catch (e) {
      designer.MessageBox.show(e.message, designer.res.title, 3 /* error */, 0 /* ok */)
      return
    }
    return table
  }

  function initDesignModeSliderPanel() {
    // console.log(111)
    var activeSheet = designer.wrapper.spread.getActiveSheet()

    // slider panel
    var sliderPanel = $('.slider-panel')
    sliderPanel.sliderpanel()
    var sliderPanelContainer = sliderPanel.sliderpanel('getContainer', 'panel1')
    // header
    var designModePanelHeader = $('.design-mode-panel-header')
    if (designModePanelHeader.length <= 0) {
      var sliderPanelHeader = $('<div>').css({
        'width': '250px',
        'height': '42px',
        'background': '-webkit-gradient(linear, left top, left bottom, color-stop(15%,#E4E5E8), color-stop(85%, rgb(211, 211, 211)))',
        'color': 'rgba(0, 0, 0, 0.6)'
      }).addClass('design-mode-panel-header').appendTo(sliderPanelContainer)
      var mainHeader = $('<div>').css({
        padding: '10px 5px'
      }).appendTo(sliderPanelHeader)
      $('<label>').text(designer.res.sliderPanel.title).css({
        font: 'Bold 12pt Calibri'
      }).appendTo(mainHeader)
    }
    // content
    var designModePanelContent = $('.design-mode-panel-content')
    if (designModePanelContent.length <= 0) {
      var sliderPanelContent = $('<div>').css({
        'width': '250px',
        'overflow': 'auto',
        'position': 'absolute',
        'top': '42px',
        'bottom': '0'
      }).addClass('slider-panel-content design-mode-panel-content').appendTo(sliderPanelContainer)
      // input字段搜索部分
      sliderPanelContent.append('<div class="list" style="margin: 20px 0 12px 8px;">' + '<form>' + '<label for="">字段搜索&ensp;</label>' + '<input id="citySel" autocomplete="off"  type="text" style="width: 150px;" onkeydown="if(event.keyCode==13){return false;}" />' + '</form>' + '</div>')
      var ztreeContainer = $('#' + ztreeID)
      if (ztreeContainer.length <= 0) {
        $('<div>').attr('id', ztreeID).addClass('ztree').appendTo(sliderPanelContent)
      }
    }
    // 字段属性
    if (designModePanelContent.length <= 0) {
      // console.log(222)
      var attributeContent = $('<div>').css({
        'width': '246px',
        'overflow': 'auto',
        'position': 'absolute',
        'right': '2px',
        'top': '0',
        'bottom': '0',
        'border-left': '2px solid #ccc'
      }).attr('id', 'fieldAttributeCon').addClass('slider-panel-content design-mode-panel-content').appendTo(sliderPanelContainer)
      attributeContent.append(
        '<div id ="fieldAttribute">' +
          '<div id= "fieldAttributeHead" >' +
            '字段属性' +
          '</div>' +
          '<form action="">' +
          '<div id= "fieldName">' +
            '<label for="">字段名称&ensp;</label>' +
            '<input type="text"  onkeydown="if(event.keyCode==13){return false;}">' +
          '</div>' +
          // '<div id= "fieldPromptMessage">'+
          //     '<label for="">提示信息&ensp;</label>'+
          //     '<input type="text">'+
          // '</div>'+
          // '<div id= "fieldRequired">'+
          //     '<label for="">是否必填</label>&emsp;&emsp;&emsp;'+
          //     '<input id="fieldRequired1" type="radio" name="fieldRequired" value="0001"/>是'+
          //     '<input id="fieldRequired2" type="radio" name="fieldRequired" value="0002"/>否'+
          // '</div>'+
          // '<div id= "fieldGanged">'+
          //     '<label for="">是否联动</label>&emsp;&emsp;&emsp;'+
          //     '<input type="radio" name="fieldGanged" value="true"/>是'+
          //     '<input type="radio" name="fieldGanged" value="false" />否'+
          // '</div>'+
          '<div id= "fieldLogicAcquisition">' +
              '<label for="">是否逻辑获取</label>&emsp;' +
              '<input id="fieldLogicAcquisition1" type="radio" name="fieldLogicAcquisition" value="0002"/><label for="fieldLogicAcquisition1">是</label>&emsp;' +
              '<input id="fieldLogicAcquisition2" type="radio" name="fieldLogicAcquisition" value="0001" /><label for="fieldLogicAcquisition2">否</label>' +
          '</div>' +
          '<div id= "fieldLogicalAccessTrue">' +
              '<select id="fieldLogicalAccessTrueSelect">' +
                  '<option value="0001">BOM数据</option>' +
                  '<option value="0002">财务数据</option>' +
                  '<option value="0003">需求数据</option>' +
                  '<option value="0004">付款条件</option>' +
                  '<option value="0005">贷款利率</option>' +
                  '<option value="0006">承兑期限</option>' +
                  '<option value="0007">贴现率</option>' +
              '</select>' +
          '</div>' +
          '<div id = "fieldButton">' +
            '<input id = "fieldConfirm" type="button" value = "确定">' +
            '<input id = "fieldCancel" type="reset" value = "重置">' +
          '</div>' +
          '</form>' +
        '</div>')
    }
    // 导航切换修改（存储字段名称）
    $(" #fieldName input ").keyup(function(e) {
      window.sessionStorage.setItem('fieldName', $(" #fieldName input ").val())
    })
    // 显隐逻辑获取下拉
    $('#fieldLogicAcquisition :radio').click(function() {
      var fieldLogicAcquisition = $('#fieldLogicAcquisition input:radio:checked').val()
      console.log(456, fieldLogicAcquisition)
      // 导航切换修改（存储字段属性）
      // 是否逻辑获取（0001否 0002是）
      window.sessionStorage.setItem('fieldName', $(" #fieldName input ").val())
      window.sessionStorage.setItem('fieldLogicAcquisition', $('#fieldLogicAcquisition input:radio:checked').val())
      if (fieldLogicAcquisition === '0002') {
        console.log(456, fieldLogicAcquisition)
        $('#fieldLogicalAccessTrue').css({
          'display': 'block'
        })
      } else if (fieldLogicAcquisition === '0001') {
        $('#fieldLogicalAccessTrue').css({
          'display': 'none'
        })
      }
    })

    // 导航切换修改（存储select下拉值）
    $("#fieldLogicalAccessTrueSelect").change(function() {
      window.sessionStorage.setItem('fieldSelect', $('#fieldLogicalAccessTrueSelect').val())
    })
    $('#fieldConfirm').unbind('click').click(
      function() {
        if (!(JSON.stringify(tmpargs) === '{}')) {
          // 字段名称
          var fieldName = $('#fieldName input').val()
          // var fieldPromptMessage = $('#fieldPromptMessage input').val() // 字段提示信息
          // var fieldRequired = $('#fieldRequired input:radio:checked').val() // 是否必填
          // var fieldGanged = $('#fieldGanged input:radio:checked').val()  // 是否联动
          var fieldLogicAcquisition = $('#fieldLogicAcquisition input:radio:checked').val() // 是否逻辑获取
          var fieldLogicalAccessTrue = '' // 逻辑获取方式
          if (fieldLogicAcquisition === '0002') {
            fieldLogicalAccessTrue = $('#fieldLogicalAccessTrueSelect').val()
          } else if (fieldLogicAcquisition === '0001') {
            fieldLogicalAccessTrue = ''
          }
          console.log(tmpargs)
          console.log('fieldLogicalAccessTrue', fieldLogicalAccessTrue)
          console.log('fieldLogicalAccessTrue', fieldLogicalAccessTrue)
          var sheet = designer.wrapper.spread.getActiveSheet()

          if (fieldName) {
            if (fieldLogicAcquisition === '0002') { // 设置逻辑获取
              if (fieldLogicalAccessTrue) {
                sheet.setValue(tmpargs.row, tmpargs.col, fieldName)
                console.log('111111', sheet.getTag(tmpargs.row, tmpargs.col))
                if (sheet.getTag(tmpargs.row, tmpargs.col) && sheet.getTag(tmpargs.row, tmpargs.col).getWay && sheet.getTag(tmpargs.row, tmpargs.col).getWay.type) {
                  sheet.setTag(tmpargs.row, tmpargs.col,
                    { getWay: {
                      way: fieldLogicAcquisition,
                      logicAcquisition: fieldLogicalAccessTrue,
                      type: sheet.getTag(tmpargs.row, tmpargs.col).getWay.type
                    },
                    logicalAccess: fieldLogicalAccessTrue,
                    tableHeadInfo: {
                      row: tmpargs.row,
                      col: tmpargs.col,
                      logicalAccess: fieldLogicalAccessTrue,
                      name: fieldName
                    }
                    })
                } else {
                  sheet.setTag(tmpargs.row, tmpargs.col,
                    { getWay: {
                      way: fieldLogicAcquisition,
                      logicAcquisition: fieldLogicalAccessTrue
                    },
                    logicalAccess: fieldLogicalAccessTrue,
                    tableHeadInfo: {
                      row: tmpargs.row,
                      col: tmpargs.col,
                      logicalAccess: fieldLogicalAccessTrue,
                      name: fieldName
                    }
                    })
                }

                alert('属性添加成功！')
              } else {
                alert('请添加逻辑获取方式！')
              }
            } else if (fieldLogicAcquisition === '0001') { // 设置非逻辑获取
              sheet.setValue(tmpargs.row, tmpargs.col, fieldName)
              console.log('2222', sheet.getTag(tmpargs.row, tmpargs.col))

              if (sheet.getTag(tmpargs.row, tmpargs.col) && sheet.getTag(tmpargs.row, tmpargs.col).getWay && sheet.getTag(tmpargs.row, tmpargs.col).getWay.type) {
                sheet.setTag(tmpargs.row, tmpargs.col,
                  { getWay: {
                    way: fieldLogicAcquisition,
                    logicAcquisition: fieldLogicalAccessTrue,
                    type: sheet.getTag(tmpargs.row, tmpargs.col).getWay.type
                  },
                  logicalAccess: fieldLogicalAccessTrue,
                  tableHeadInfo: {
                    row: tmpargs.row,
                    col: tmpargs.col,
                    logicalAccess: fieldLogicalAccessTrue,
                    name: fieldName
                  }
                  })
              } else {
                sheet.setTag(tmpargs.row, tmpargs.col,
                  { getWay: {
                    way: fieldLogicAcquisition,
                    logicAcquisition: fieldLogicalAccessTrue
                  },
                  logicalAccess: fieldLogicalAccessTrue,
                  tableHeadInfo: {
                    row: tmpargs.row,
                    col: tmpargs.col,
                    logicalAccess: fieldLogicalAccessTrue,
                    name: fieldName
                  }
                  })
              }
              alert('属性添加成功！')
            } else {
              alert('请选择是否逻辑获取')
            }
          } else {
            alert('请添加字段名称！')
          }
        } else {
          alert('请选择单元格！')
        }
      })
    // load data
    var bindingPathData = {
      name: 'Source'
    }
    if (designer.wrapper.spread['designerBindingPathSchema'] && !isModified) {
      var data = designer.wrapper.spread['designerBindingPathSchema']
      if (data['$schema']) {
        // load standard cell binding template json schema.
        bindingPathData['children'] = designer.util.parseJsonSchema(data)
        _initZTree('ztree-container', [bindingPathData], true)
      } else if ($.isArray(data) && _isNativeTreeViewJSON(data)) {
        // load old version cell binding template json schema.
        data.splice(data.length - 1)
        _markObjectArray(data)
        bindingPathData['children'] = data
        _initZTree('ztree-container', bindingPathData, true)
      }

      isModified = true
    } else {
      // init data
      _initZTree('ztree-container', [bindingPathData])
    }
    if (activeSheet.getDataSource()) {
      activeSheet.setDataSource(null)
    }

    // event
    _attachEvent()
  }

  function chartClicked(event, data) {
    if (chartIsClick) {
      chartIsClick = false
      chartDoubleClicked(event, data)
    } else {
      chartIsClick = true
      setTimeout(function() {
        chartIsClick = false
      }, 500)
    }
  }
  function removeFieldEle() {
    $('#fieldAttributeCon').remove()
  }

  ribbon.chartClicked = chartClicked
  function chartDoubleClicked(event, data) {
    var chartElementType = chartHelper.chartElementType
    var selectedItem, category = /* chartHelper.getChartSeriesNames(data.chart)*/data.options.category
    var chart = data.chart
    var dataPointIndex
    if (data.elementType === 0) {
      var index = data.options.info && data.options.info.index
      selectedItem = chartElementType[data.elementType] + ' ' + category[index]
      dataPointIndex = data.options.info && data.options.info.dataPointIndex
    } else if (data.elementType === 1) {
      var type = (data.options.info && data.options.info.axisType) === 'x' ? 'Category' : 'Value' // x; y
      var position = data.options.info && data.options.info.axisPosition // primary; secondary

      if (chartHelper.isBarGroup(chart)) { // bar charts's axis info is invcontry to others charts's axis; but when comb chart carrying bar series, the axis info is indetermination.
        type = (data.options.info && data.options.info.axisType) === 'y' ? 'Category' : 'Value'
      }
      selectedItem = position + type
    }
    var chartElement = chartElementType[data.elementType]
    selectedItem = selectedItem || chartElement
    chartSliderPanel.initChartSliderPanel(chart, chartElement, selectedItem, category, dataPointIndex)
  }

  ribbon.chartDoubleClicked = chartDoubleClicked

  function shapeClicked() {
    var sheet = designer.wrapper.spread.getActiveSheet()
    var selectShapes = shapeHelper.getActiveShapes(sheet)
    if (selectShapes.length !== 0) {
      shapeSliderPanel.initShapeSliderPanel(selectShapes)
    }
  }
  ribbon.shapeClicked = shapeClicked
  // #region Slicer

  function insertTableSlicer() {
    var spread = designer.wrapper.spread
    var sheet = spread.getActiveSheet()
    var slicer = designer.util.getSelectedSlicers(sheet)[0]
    hideTableTab()
    showSlicerTab()
    if (slicer) {
      initSlicerTab(slicer)
    }
  }

  ribbon.insertTableSlicer = insertTableSlicer

  function hideSlicerTab() {
    if ($('a[href=\'#slicerTab\']').is(':visible')) {
      $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'slicerTab', false)
    }
  }

  function showSlicerTab() {
    $('.ribbon-bar').gcuiribbon('setTabPageVisible', 'slicerTab', true)
    $('.ribbon-bar').gcuitabs('select', 'slicerTab')

    var $slicerButtonDiv = $('#slicerTab>ul').find('li:eq(2)')
    var columnsButtonWidth = $slicerButtonDiv.find('button:eq(0)').width() + 1
    var heightButtonWidth = $slicerButtonDiv.find('button:eq(1)').width() + 1
    var widthButtonWidth = $slicerButtonDiv.find('button:eq(1)').width() + 1
    var maxButtonDivNumber = (columnsButtonWidth > heightButtonWidth) ? columnsButtonWidth : heightButtonWidth
    maxButtonDivNumber = (maxButtonDivNumber > widthButtonWidth) ? maxButtonDivNumber : widthButtonWidth

    var $slicerSizeDiv = $('#slicerTab>ul').find('li:eq(3)')
    var shapeHeightButtonWidth = $slicerSizeDiv.find('button:eq(0)').width() + 1
    var shapeWidthButtonWidth = $slicerSizeDiv.find('button:eq(1)').width() + 1
    var maxSizeDivNumber = (shapeHeightButtonWidth > shapeWidthButtonWidth) ? shapeHeightButtonWidth : shapeWidthButtonWidth
    $('#slicerTab>ul').find('li:eq(2)').find('button').width(maxButtonDivNumber)
    $('#slicerTab>ul').find('li:eq(3)').find('button').width(maxSizeDivNumber)
    $('#slicerTab>ul').find('li:gt(1)').find('button').find('span:gt(0)').css('text-align', 'start')
  }

  ribbon.showSlicerTab = showSlicerTab

  function initSlicerTab(slicer) {
    if (!slicer) {
      return
    }

    hideTableTab()
    $('.slicer-ribbon-icon').attr('disabled', true)
    $('.slicer-caption-name').val(slicer.captionName())
    $('#slicer-shape-width').val(Math.round(slicer.width()))
    $('#slicer-shape-height').val(Math.round(slicer.height()))
    $('#slicer-column-count').val(slicer.columnCount())
    $('#slicer-item-height').val(Math.round(slicer.itemHeight()))
    var item_width = designer.util.getSlicerItemWidth(slicer.columnCount(), slicer.width())
    $('#slicer-item-width').val(item_width)
    showSlicerTab()

    bindInputEvent('caption-name', $('.slicer-caption-name'))
    bindInputEvent('shape-width', $('#slicer-shape-width'))
    bindInputEvent('shape-height', $('#slicer-shape-height'))
    bindInputEvent('column-count', $('#slicer-column-count'))
    bindInputEvent('item-height', $('#slicer-item-height'))
    bindInputEvent('item-width', $('#slicer-item-width'))
  }

  function clearSlicerTab() {
    $('.slicer-caption-name').val('')
    $('#slicer-shape-width').val('')
    $('#slicer-shape-height').val('')
    $('#slicer-column-count').val('')
    $('#slicer-item-height').val('')
    $('#slicer-item-width').val('')
    hideSlicerTab()

    unbindInputEvent($('.slicer-caption-name'))
    unbindInputEvent($('#slicer-shape-width'))
    unbindInputEvent($('#slicer-shape-height'))
    unbindInputEvent($('#slicer-column-count'))
    unbindInputEvent($('#slicer-item-height'))
    unbindInputEvent($('#slicer-item-width'))

    hideShowRibbonPasteItem()
  }

  ribbon.clearSlicerTab = clearSlicerTab

  function bindSlicerEvents(sheet, slicer, propertyName) {
    if (!slicer) {
      return
    }
    if (propertyName === 'isSelected') {
      if (slicer.isSelected()) {
        if (sheet.options.protectionOptions.allowEditObjects || !(sheet.options.isProtected && slicer.isLocked())) {
          initSlicerTab(slicer)
          $('#clipboardgroup li:gt(0)').hide()
        }
      } else {
        clearSlicerTab()
      }
    } else {
      changeSlicerInfo(slicer, propertyName)
    }
  }

  function bindChartEvents(sheet, chart, propertyName) {
    if (propertyName === 'isSelected') {
      updateChartTab(chart)
    }
  }

  function unbindInputEvent(selector) {
    selector.unbind('input')
  }

  function bindInputEvent(property, selector) {
    var spread = designer.wrapper.spread
    selector.bind('input', { 'spread': spread }, function(event) {
      var workbook = event.data && event.data.spread
      var sheet = workbook.getActiveSheet()
      if (!designer.util.isSlicerSelected(sheet)) {
        return
      }
      var selectedSlicers = designer.util.getSelectedSlicers(sheet)
      var value = selector.val()
      setSlicerProperty(property, selectedSlicers, value)
    })
  }

  function setSlicerProperty(property, selectedSlicers, value) {
    if (!selectedSlicers || selectedSlicers.length === 0) {
      return
    }
    if (!$.isNumeric(value) && property !== 'caption-name') {
      return
    }
    var slicer, width
    switch (property) {
    case 'caption-name':
      var captionName = value
      designer.actions.doAction('slicerPropertyChanged', designer.wrapper.spread, ['captionName', captionName, selectedSlicers])
      break
    case 'shape-width':
      width = designer.util.formatNumber(value)
      designer.actions.doAction('slicerPropertyChanged', designer.wrapper.spread, ['width', width, selectedSlicers])
      if (selectedSlicers.length > 0) {
        slicer = selectedSlicers[selectedSlicers.length - 1]
        $('#slicer-item-width').val(designer.util.getSlicerItemWidth(slicer.columnCount(), slicer.width()))
      }
      break
    case 'shape-height':
      var height = designer.util.formatNumber(value)
      designer.actions.doAction('slicerPropertyChanged', designer.wrapper.spread, ['height', height, selectedSlicers])
      break
    case 'column-count':
      var columnCount = designer.util.formatNumber(value)
      designer.actions.doAction('slicerPropertyChanged', designer.wrapper.spread, ['columnCount', columnCount, selectedSlicers])
      if (selectedSlicers.length > 0) {
        slicer = selectedSlicers[selectedSlicers.length - 1]
        $('#slicer-item-width').val(designer.util.getSlicerItemWidth(slicer.columnCount(), slicer.width()))
      }
      break
    case 'item-height':
      var itemHeight = designer.util.formatNumber(value)
      designer.actions.doAction('slicerPropertyChanged', designer.wrapper.spread, ['itemHeight', itemHeight, selectedSlicers])
      break
    case 'item-width':
      var itemWidth = designer.util.formatNumber(value)
      var itemWidthArray = []
      for (var i = 0; i < selectedSlicers.length; i++) {
        slicer = selectedSlicers[i]
        width = designer.util.getSlicerWidthFromItem(slicer.columnCount(), itemWidth)
        itemWidthArray.push(width)
      }
      designer.actions.doAction('slicerPropertyChanged', designer.wrapper.spread, ['width', itemWidthArray, selectedSlicers])
      if (selectedSlicers.length > 0) {
        $('#slicer-shape-width').val(itemWidthArray[itemWidthArray.length - 1])
      }
      break
    }
  }

  function changeSlicerInfo(slicer, propertyName) {
    if (!slicer) {
      return
    }

    switch (propertyName) {
    case 'width':
      $('#slicer-shape-width').val(slicer.width())
      $('#slicer-item-width').val(designer.util.getSlicerItemWidth(slicer.columnCount(), slicer.width()))
      break
    case 'height':
      $('#slicer-shape-height').val(slicer.height())
      break
    case 'columnCount':
      $('#slicer-column-count').val(slicer.columnCount())
      break
    case 'itemHeight':
      $('#slicer-item-height').val(slicer.itemHeight())
      break
    case 'captionName':
      $('.slicer-caption-name').val(slicer.captionName())
      break
    }
  }

  function changeSlicerStyle(sheet, value) {
    if (!designer.util.isSlicerSelected(sheet)) {
      return
    }
    var slicerStyle = null
    switch (value) {
    case 'light1':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.light1()
      break
    case 'light2':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.light2()
      break
    case 'light3':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.light3()
      break
    case 'light4':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.light4()
      break
    case 'light5':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.light5()
      break
    case 'light6':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.light6()
      break
    case 'other1':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.other1()
      break
    case 'other2':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.other2()
      break
    case 'dark1':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.dark1()
      break
    case 'dark2':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.dark2()
      break
    case 'dark3':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.dark3()
      break
    case 'dark4':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.dark4()
      break
    case 'dark5':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.dark5()
      break
    case 'dark6':
      slicerStyle = GC.Spread.Sheets.Slicers.SlicerStyles.dark6()
      break
    }
    return slicerStyle
  }

  function _initSlicerFormat() {
    var customCount = 8
    var lightCount = 8
    var darkCount = 6
    var formatSlicerDialog
    _createSlicerFormat('slicer-custom-preview', 'custom', customCount)
    _createSlicerFormat('slicer-light-preview', 'light', lightCount)
    _createSlicerFormat('slicer-dark-preview', 'dark', darkCount)

    $('.slicer-format-preview, .slicer-format-preview-button').mouseenter(function(e) {
      var o = (e.srcElement || e.target)
      $(o).closest('button').find('span.container-span').addClass('ui-state-hover')
    })
    $('.slicer-format-preview, .slicer-format-preview-button').mouseout(function(e) {
      var o = (e.srcElement || e.target)
      $(o).closest('button').find('span.container-span').removeClass('ui-state-hover')
    })
    $('.slicer-format-preview-button').mouseup(function(e) {
      var spread = designer.wrapper.spread
      var o = e.srcElement || e.target
      var ele = ($(o).closest('button').find('span span')[0])
      var className = ele.className
      var style
      var styles = className.split(' ')
      var sheet = spread.getActiveSheet()
      for (var i = 0; i < styles.length; i++) {
        if (styles[i].indexOf('slicer-format') === -1) {
          style = styles[i]
          break
        }
      }
      var slicerStyle
      if (style && style.indexOf('custom') === -1) {
        slicerStyle = changeSlicerStyle(sheet, style)
      } else {
        var arr = designer.SlicerStyleDialog.customSlicerStyle
        for (var name in arr) { /* NOSONAR: Forin*/
          var customPrefix = name.substring(0, name.indexOf('-'))
          if (customPrefix === style) {
            slicerStyle = designer.SlicerStyleDialog.customSlicerStyle[name]
            break
          }
        }
      }
      var slicerStyleOptions = {
        slicerStyle: slicerStyle
      }
      designer.actions.doAction('setSlicerStyle', spread, slicerStyleOptions)
      $('#format-slicer-popup').gcuipopup('hide')
    })
    $('.new-slicer-style').click(function() {
      $('#format-slicer-popup').gcuipopup('hide')
      if (formatSlicerDialog === undefined) {
        formatSlicerDialog = new designer.SlicerStyleDialog()
      } else {
        formatSlicerDialog.refresh()
      }
      formatSlicerDialog.open()
    }).mouseenter(function() {
      $(this).css('background', '#DBDBDB')
    }).mouseleave(function() {
      $(this).css('background', 'white')
    })
  }

  function _createSlicerFormat(previewClass, formatType, formatTypeNumber) {
    var slicerFormatClassPrefix = 'slicer-format-'
    var commonClass = 'slicer-format-preview'
    var formatSpan
    for (var i = 1; i <= formatTypeNumber; i++) {
      var formatClass = slicerFormatClassPrefix + formatType + i
      if (formatType === 'custom') {
        formatSpan = $('<span></span>').addClass(formatClass + ' ' + commonClass + ' ' + formatType + i)
      } else if (formatType === 'light' && i > 6) {
        var value = i - 6
        formatClass = slicerFormatClassPrefix + slicerType + value
        formatSpan = $('<span></span>').attr('title', slicerType + value).addClass(formatClass + ' ' + commonClass + ' ' + slicerType + value)
      } else {
        formatSpan = $('<span></span>').attr('title', formatType + i).addClass(formatClass + ' ' + commonClass + ' ' + formatType + i)
      }
      var formatContainer = $('<span></span>').append(formatSpan).addClass(formatClass + '-container' + ' ' + 'container-span')
      $('<button></button>').append(formatContainer).addClass(formatClass + '-button' + ' ' + commonClass + '-button').appendTo($('.' + previewClass))
    }
  }

  // #endregion Slicer
  // #region hide or show paste option
  function hideShowRibbonPasteItem() {
    var activeSheet = designer.wrapper.spread.getActiveSheet()
    var sheet = activeSheet
    // TODO : isPasteFloatingObject
    if (sheet.isPasteFloatingObject()) {
      $('#clipboardgroup li:gt(0)').hide()
    } else {
      $('#clipboardgroup li:gt(0)').show()
    }
  }

  function addLocalFonts() {
    var res = designer.res, name = res.name || 'en',
      fontFamilies = res.ribbon.fontFamilies,
      prefix = name + 'ff',
      fontName = fontFamilies[prefix + '1']
    if (fontName) {
      var $fontFamily = $('#font-family'), $ul = $fontFamily.next('ul')
      var i = 1, id = prefix + i, items = []
      while (fontFamilies[id]) {
        items.push(('<li>' +
                    '<input type="radio" id="font-family-{id}" name="font-family" />' +
                    '<label for="font-family-{id}" name="{id}" id="{id}" data-bind="text: res.ribbon.fontFamilies.{id}.text, attr: { title: res.ribbon.fontFamilies.{id}.text, \'data-font\': res.ribbon.fontFamilies.{id}.name }"></label>' +
                    '</li>').replace(/\{id\}/g, id))
        i++
        id = prefix + i
      }
      $ul.children().first().before(items.join(''))
    }
  }
  ribbon.addLocalFonts = addLocalFonts

  function updateRibbonAll() {
    updateUndoRedo()
    updateCellStyle()
    updateFormat()
    updateSparkline()
    updateTable()
    updateChartTab()
    updateShapeTab()
    updateProtectLock()
    updateMerge()
  }

  ribbon.updateRibbonAll = updateRibbonAll

  // #endregion
  // #region Loader.Ready
  designer.loader.ready(function() {
    initRibbonBar()
    if (!designer.wrapper.spread.notWorking) {
      attachEvent()
    }
  })
  designer.ribbon = ribbon
})(designer.ribbon || ({}))
