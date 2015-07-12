// Generated by CoffeeScript 1.9.3
var BN;

if (typeof BN === "undefined" || BN === null) {
  BN = {};
}

if (BN.GUI == null) {
  BN.GUI = {};
}

window.$ = window.jQuery = require('./lib/jquery-2.1.4.min.js');

$(document).ready(function() {
  $('#BN-splitbar').isDragged = false;
  BN.GUI.setUpSplitBar();
  return $('#BN-textarea').focus();
});

BN.GUI.setUpSplitBar = function() {
  $('#BN-splitbar').mousedown(function(e) {
    var originalWidth;
    if (e.which === 1) {
      e.preventDefault();
      originalWidth = parseFloat($('#BN-sidebar').css('width'));
      $('#BN-splitbar').data('originalWidth', originalWidth);
      $('#BN-splitbar').data('isDragged', true);
      return $('#BN-splitbar').data('startX', e.pageX);
    }
  });
  $(document).mouseup(function(e) {
    if (e.which === 1 && $('#BN-splitbar').data('isDragged')) {
      return $('#BN-splitbar').data('isDragged', false);
    }
  });
  return $(document).mousemove(function(e) {
    var delta, newWidth;
    if ($('#BN-splitbar').data('isDragged')) {
      delta = e.pageX - $('#BN-splitbar').data('startX');
      newWidth = $('#BN-splitbar').data('originalWidth') + delta;
      return $('#BN-sidebar').css('width', newWidth + "px");
    }
  });
};
