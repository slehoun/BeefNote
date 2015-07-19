# BeefNote cakefile
# cake script for building BeefNote
{exec} = require 'child_process'
electronPath = '"D:\\Projekty\\15-001 Node-webkit\\00_Environment\\electron-v0.29.1-win32-x64\\electron.exe"'

task 'build', 'Compile all BeefNote .coffee files to .js', ->
  exec 'coffee --bare --compile --output www/js/ www/src/', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
  exec 'coffee --bare --compile main.coffee', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'watch', 'Watch BeefNote scripts and recompile if necessary.', ->
  exec 'coffee --watch --bare --compile --output www/js/ www/src/', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'run', 'Run BeefNote', ->
  exec electronPath + ' ./', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
