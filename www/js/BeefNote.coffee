# BeefNote.coffee
# main init/app entry point

BN = {} unless BN?
BN.GUI = {} unless BN.GUI?

window.$ = window.jQuery = require('./lib/jquery-2.1.4.min.js')

$(document).ready ->
  $('#BN-splitbar').isDragged = false
  BN.GUI.setUpSplitBar()
  $('#BN-textarea').focus()

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
