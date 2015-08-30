// Generated by CoffeeScript 1.9.3
var BN;

if (typeof BN === "undefined" || BN === null) {
  BN = {};
}

if (BN.DB == null) {
  BN.DB = {};
}

BN.DB.noteTree = null;

BN.DB.ngApp = null;

BN.DB.fs = require('fs');

BN.DB.init = function() {
  BN.DB.noteTree = BN.DB.readFileTree(BN.CFG.notebookPath);
  BN.DB.ngApp = angular.module('beefNoteNgApp', []);
  BN.DB.ngApp.controller('sideBarController', function($scope) {
    return $scope.dirTree = BN.DB.noteTree;
  });
  console.log('NoteBook tree:');
  return console.log(BN.DB.noteTree);
};

BN.DB.readFileTree = function(path) {
  var tree;
  tree = BN.DB.scanPath(path);
  return tree;
};

BN.DB.scanPath = function(path) {
  var dirTree, files, tree;
  tree = {};
  dirTree = {};
  tree.items = [];
  files = BN.DB.fs.readdirSync(path);
  files.forEach(function(entry) {
    var fStats, fullPath;
    fullPath = path + entry;
    fStats = BN.DB.fs.statSync(fullPath);
    if (fStats.isDirectory()) {
      dirTree = BN.DB.scanPath(fullPath + '/');
      tree.items.push({
        name: entry,
        path: fullPath,
        isDirectory: true,
        isOpened: false,
        tree: dirTree
      });
    }
    if (fStats.isFile()) {
      return tree.items.push({
        name: entry,
        path: fullPath,
        isDirectory: false
      });
    }
  });
  return tree;
};
