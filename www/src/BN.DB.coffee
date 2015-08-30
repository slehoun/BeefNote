# BN.DB.coffee
# deals with storing/retrieving notes from storage (disk)

BN = {} unless BN?
BN.DB = {} unless BN.DB?

BN.DB.noteTree = null
BN.DB.ngApp = null
BN.DB.fs = require 'fs'

BN.DB.init = ->
  BN.DB.noteTree = BN.DB.readFileTree BN.CFG.notebookPath
  BN.DB.ngApp = angular.module 'beefNoteNgApp', []
  BN.DB.ngApp.controller 'sideBarController', ($scope) ->
    $scope.dirTree = BN.DB.noteTree
  console.log 'NoteBook tree:'
  console.log BN.DB.noteTree

BN.DB.readFileTree = (path) ->
  tree = BN.DB.scanPath path
  return tree

BN.DB.scanPath = (path) ->
  tree = {}
  dirTree = {}
  tree.items = []
  # tree.dirs = []
  files = BN.DB.fs.readdirSync(path)

  files.forEach (entry) ->
    fullPath = path + entry
    fStats = BN.DB.fs.statSync fullPath
    if fStats.isDirectory()
      dirTree = BN.DB.scanPath fullPath + '/'
      tree.items.push({name: entry, path: fullPath, isDirectory: true, isOpened: false, tree: dirTree})
    if fStats.isFile()
      tree.items.push({name: entry, path: fullPath, isDirectory: false})

  return tree
