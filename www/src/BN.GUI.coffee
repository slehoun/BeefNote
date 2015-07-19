# BN.GUI.coffee
# GUI stuff for application

BN = {} unless BN?
BN.GUI = {} unless BN.GUI?

BN.GUI.init = ->
  BN.GUI.setUpSplitBar()
  $('#BN-textarea').keydown BN.GUI.catchTab

BN.GUI.setUpSplitBar = ->
  $('#BN-splitbar').mousedown (e) ->
    if e.which is 1
      e.preventDefault()
      originalWidth = parseFloat($('#BN-sidebar').css 'width')
      $('#BN-splitbar').data 'originalWidth', originalWidth
      $('#BN-splitbar').data 'isDragged', true
      $('#BN-splitbar').data 'startX', e.pageX
  $(document).mouseup (e) ->
    if e.which is 1 and $('#BN-splitbar').data 'isDragged'
      $('#BN-splitbar').data 'isDragged', false

  $(document).mousemove (e) ->
    if $('#BN-splitbar').data 'isDragged'
      delta = e.pageX - $('#BN-splitbar').data 'startX'
      newWidth = $('#BN-splitbar').data('originalWidth') + delta
      $('#BN-sidebar').css 'width', "#{newWidth}px"

BN.GUI.catchTab = (e) ->
  if e.which is 9 # TAB was pressed
    start = this.selectionStart
    end = this.selectionEnd
    target = e.target
    value = target.value
    target.value = value.substring(0, start) + '\t' + value.substring(end)
    this.selectionStart = this.selectionEnd = start + 1
    e.preventDefault()
