# BeefNote.coffee
# main init/app entry point

BN = {} unless BN?

window.$ = window.jQuery = require('./lib/jquery-2.1.4.min.js')

$(document).ready ->
  BN.GUI.init()
  BN.DB.init()
  $('#BN-textarea').focus()
