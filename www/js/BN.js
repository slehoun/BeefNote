// Generated by CoffeeScript 1.9.3
var BN;

if (typeof BN === "undefined" || BN === null) {
  BN = {};
}

window.$ = window.jQuery = require('./lib/jquery-2.1.4.min.js');

$(document).ready(function() {
  BN.GUI.init();
  BN.DB.init();
  return $('#BN-textarea').focus();
});