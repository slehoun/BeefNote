# BN.DB.coffee
# deals with storing/retrieving notes from storage (disk)

BN = {} unless BN?
BN.DB = {} unless BN.DB?

BN.DB.noteTree = null
BN.DB.fs = require 'fs'

BN.DB.readFileTree = (path) ->
  files = BN.DB.fs.readdirSync(path)
  console.log(files)
