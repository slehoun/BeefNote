# BN.DB.coffee
# deals with storing/retrieving notes from storage (disk)

BN = {} unless BN?
BN.DB = {} unless BN.DB?

BN.DB.noteTree = null
BN.DB.fs = require 'fs'

BN.DB.init = ->
  BN.DB.noteTree = BN.DB.readFileTree BN.CFG.notebookPath
  console.log 'NoteBook tree:'
  console.log BN.DB.noteTree

BN.DB.readFileTree = (path) ->
  tree = BN.DB.scanPath path
  return tree

BN.DB.scanPath = (path) ->
  tree = {}
  dirTree = {}
  tree.files = []
  tree.dirs = []
  files = BN.DB.fs.readdirSync(path)

  files.forEach (entry) ->
    fullPath = path + entry
    fStats = BN.DB.fs.statSync(fullPath)
    if fStats.isDirectory()
      dirTree = BN.DB.scanPath fullPath + '/'
      tree.dirs.push({name: entry, path: fullPath, isOpened: false, tree: dirTree})
    if fStats.isFile()
      tree.files.push({name: entry, path: fullPath})

  return tree
