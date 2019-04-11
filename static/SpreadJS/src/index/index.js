(function() {
  'use strict'
  GC.Spread.Sheets.LicenseKey = 'dbs.haier.net|dev.fineway.com,684218588826482#B0nHv6hDZy44aLBnM5QzRxwkawo7RKdkcqR7S9JHMaVmdhZ5bktEZCVWOwlDOah4MBJXaYhkSslkUQFkTphXVLt4cZlUQCBTWFFTVSJ4cWRUUvpHMDJ4VMl4d8Q7ROtyZzZjUvg5RrxENxNFatRmT4ZzS8QUSrNFR5g7cVhFNRl5a5k5RBpFaqdEbZN5TwsiSCtScKhUM9gGeoNFaM3WVk5UcrMWaLF5SJ9WNCllMpdlUIF5LhtUd6sCakBjQqFWOihDRtNWaPJFOl3iWhZGVNRlRRljREpkS7tyUv2Sc9pme5dTRsFUQYtyKW5UVudna5Imcw3yQW3kTs5UNyoEUJJiOiMlIsICRxETQxcTR5IiOigkIsUjNzUDMwgjM0IicfJye&Qf35VfikkR9IkI0IyQiwiIyEjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsICN4QzMyADI5EzMwkTMwIjI0ICdyNkIsISbvNmL9F6dl9Wam9idlRGL4VmbuIXZpFGauMnYkJiOiMXbEJCLiACuPWOrFWOkZmeicaOgKaekne+rui+tNaej3SeuWaOr0S+lMWuI0ISYONkIsIiM8QjNygDO8UDOxIDN8YjI0ICZJJCL3V6csFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3cmNyFUTU3WUUh6dFdUbWNUMzlUQyZXRQBjSplTRtJUdlplQ8N5KW9GZr4kaFdldaJTTRhGUxdjRFJjbH9UNOp6QOlzR94GZzxGR9hVWFJUbnxkepvVDL'
  var designer = GC.Spread.Sheets.Designer

  var needSuspend
  var tipWidth = 600

  function updateLayout() {
    $('.content').css('height', $('.content').children('.fill-spread-content').height())
    $('.header').css('width', $(window).width() + 'px')
    if ($('.ribbon-bar').data('gcui-gcuiribbon')) {
      $('.ribbon-bar').data('gcui-gcuiribbon').updateRibbonSize()
    }
    var spread = designer.wrapper.spread
    if (spread && spread.isPaintSuspended()) {
      spread.resumePaint()
      spread.refresh()
      needSuspend = true
    }
  }

  var _windowResizeTimer = null

  function _doWindowResize() {
    if (_windowResizeTimer) {
      window.clearTimeout(_windowResizeTimer)
    }
    _windowResizeTimer = window.setTimeout(function() {
      updateLayout()
      _windowResizeTimer = null
      if (needSuspend) {
        needSuspend = false
        window.setTimeout(function() {
          designer.wrapper.spread.suspendPaint()
        }, 300)
      }
    }, 100) // now delay 100ms to resize designer
  }

  $(document).ready(function() {
    designer.loader.loadContent()
    $(window).resize(_doWindowResize)
    $(window).resize()

    $('#verticalSplitter').draggable({
      axis: 'y',
      containment: '.container',
      scroll: false,
      zIndex: 100,
      stop: function(event, ui) {
        var $this = $(this), top = $this.offset().top, offset = top - $('.header').height(), $content = $('.content .fill-spread-content')

        // adjust size of related items
        var oldHeight = $('#formulaBarText').height()
        var newHeight = oldHeight + offset
        var ORIGINAL_FORMULABARTEXT_HEIGHT = 20
        if (newHeight < ORIGINAL_FORMULABARTEXT_HEIGHT) { // 20: original height of formulaBarText
          // reset to default
          $('#formulaBarText').css({ height: ORIGINAL_FORMULABARTEXT_HEIGHT })
          top = top + ORIGINAL_FORMULABARTEXT_HEIGHT - newHeight
        } else {
          $('#formulaBarText').css({ height: newHeight })
        }
        $content.css({ top: top + 10 }) // 10: height of the space for verticalSplitter
        $content.parent().css({ height: $content.height() })
        $('.header').css({ height: top })
        $this.css({ top: 0 })
        designer.wrapper.spread.refresh()
      }
    })

    function disableDragDrop(dataTransfer) {
      if (dataTransfer) {
        dataTransfer.effectAllowed = 'none'
        dataTransfer.dropEffect = 'none'
      }
    }

    window.addEventListener('dragenter', function(e) {
      e = e || event
      e.preventDefault()
      disableDragDrop(e.dataTransfer)
    }, false)
    window.addEventListener('dragover', function(e) {
      e = e || event
      e.preventDefault()
      disableDragDrop(e.dataTransfer)
    }, false)
    window.addEventListener('drop', function(e) {
      e = e || event
      e.preventDefault()
      disableDragDrop(e.dataTransfer)
    }, false)
  })

  designer.loader.ready(function() {
    // To Fix the designer resize performance issues.
    $(window).unbind('resize.gcuiribbon')
    $('#verticalSplitter').show()
    updateLayout()
  })
})()

